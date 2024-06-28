import {  useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messages } from '@/apis/messages.api';

// 한 채팅방 안에서의 메시지들을 받음.
export const useGetInfiniteMessages = (conversationId: string) => {
  return useInfiniteQuery({
    queryKey: ['messages', conversationId],
    initialPageParam: 1,
    queryFn: async ({ pageParam=1 }) => await messages.getByConversationId(conversationId, pageParam),
    getNextPageParam: (lastPage: any) => {
      const total = lastPage.totalPages;
      const current = lastPage.currentPage;
      if (total > current) {
        return current + 1;
      }
    },
    select: (data) => {
      const flattenResult = data.pages
        .slice()                        // 원본 배열을 변경하지 않기 위해 복사
        .reverse()                      // pages 배열을 역순으로 정렬
        .flatMap(page => page.messages); 
      return flattenResult;
    },
  });
};

export const useSendMessage = (conversationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({message, socket} : {message: string, socket: any}) => 
    {  
      
      socket.emit('chatBotMessage', message);
      
      socket?.on('newMessage', (newMessage: any) => {
        queryClient.setQueryData(['messages', conversationId], (oldData: any) => {
          return {
            ...oldData,
            pages: oldData.pages.map((page: any, index: number) => {
              // 마지막 페이지에 새로운 메시지를 추가
              if (index === oldData.pages.length - 1) {
                return {
                  ...page,
                  messages: [...page.messages, newMessage]
                };
              }
              return page;
            })
          };
        });
      });
      () => socket?.off('newMessage')

      socket?.on('chatBotMessage', (newMessage: any) => {
        queryClient.setQueryData(['messages', conversationId], (oldData: any) => {
          return {
            ...oldData,
            pages: oldData.pages.map((page: any, index: number) => {
              // 마지막 페이지에 새로운 메시지를 추가
              if (index === oldData.pages.length - 1) {
                return {
                  ...page,
                  messages: [...page.messages, newMessage]
                };
              }
              return page;
            })
          };
        });
      });
      () => socket?.off('chatBotMessage')

      await messages.sendByConversationId({message: message}, conversationId);
    },
    onError: error => console.error('에러발생: ' + error),
  });
};

export const useGetInfiniteMessagesInOneToOne = (leaderId: string, pickleId: string) => {
  return useInfiniteQuery({
    queryKey: ['messages', pickleId, leaderId],
    initialPageParam: 1,
    queryFn: async ({ pageParam=1 }) => await messages.getByLeaderId(leaderId, pickleId , pageParam),
    getNextPageParam: (lastPage: any) => {
      const total = lastPage.totalPages;
      const current = lastPage.currentPage;
      if (total > current) {
        return current + 1;
      }
    },
    select: (data) => {
      const flattenResult = data.pages
        .slice()                        // 원본 배열을 변경하지 않기 위해 복사
        .reverse()                      // pages 배열을 역순으로 정렬
        .flatMap(page => page.messages); 
      return flattenResult;
    },
  });
}

export const useSendMessageOneToOne = (leaderId: string, pickleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({message, socket} : {message: string, socket: any}) => 
    {  
      
      socket.emit('chatBotMessage', message);
      
      socket?.on('newMessage', (newMessage: any) => {
        queryClient.setQueryData(['messages', pickleId, leaderId], (oldData: any) => {
          return {
            ...oldData,
            pages: oldData.pages.map((page: any, index: number) => {
              // 마지막 페이지에 새로운 메시지를 추가
              if (index === oldData.pages.length - 1) {
                return {
                  ...page,
                  messages: [...page.messages, newMessage]
                };
              }
              return page;
            })
          };
        });
      });
      () => socket?.off('newMessage')

      await messages.sendByLeaderId({message: message}, leaderId, pickleId);
    },
    onError: error => console.error('에러발생: ' + error),
  });
}