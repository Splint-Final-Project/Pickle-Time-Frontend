import { useEffect } from 'react';
import {  useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messages } from '@/apis/messages.api';

// 한 채팅방 안에서의 메시지들을 받음.
export const useGetInfiniteMessages = (conversationId: string, socket: any) => {
  return useInfiniteQuery({
    queryKey: ['messages', conversationId],
    initialPageParam: 1,
    queryFn: async ({ pageParam=1 }) => {
      // socket?.on('unReadMessage', (unReadNumber: any) => {
      //   console.log(unReadNumber);
      // });
      return await messages.getByConversationId(conversationId, pageParam)
    },
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
  return useMutation({
    mutationFn: async ({ message, socket }: { message: string, socket: any }) => {
      // 메시지 전송
      socket.emit('chatBotMessage', message);

      // 메시지를 서버에 전송
      await messages.sendByConversationId({ message: message }, conversationId);
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
  return useMutation({
    mutationFn: async ({message} : {message: string}) => await messages.sendByLeaderId({message: message}, leaderId, pickleId),
    onError: error => console.error('에러발생: ' + error),
  });
}

export const useMessageSocket = (socket: any, conversationId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleNewMessage = (newMessage: any) => {
      queryClient.setQueryData(['messages', conversationId], (oldData: any) => {
        if (!oldData) return oldData;

        // 최신 데이터를 기반으로 상태 업데이트
        const updatedPages = oldData.pages.map((page: any, index: number) => {
          // 마지막 페이지에 새로운 메시지를 추가
          if (index === 0) {
            return {
              ...page,
              messages: [...page.messages, newMessage],
            };
          }
          return page;
        });

        return {
          ...oldData,
          pages: updatedPages,
        };
      });
    };

    const handleUnreadMessage = (newMassage: any) => {
      console.log(newMassage)
    }

    socket?.on('newMessage', handleNewMessage);
    socket?.on('unReadMessage', handleUnreadMessage)
    socket?.on('chatBotMessage', handleNewMessage);

    // 이벤트 리스너 제거
    return () => {
      socket?.off('newMessage', handleNewMessage);
      socket?.off('chatBotMessage', handleNewMessage);
    };
  }, [socket, conversationId, queryClient]);
};

export const useMessageSocketInOneToOne = (socket: any, leaderId: string, pickleId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleNewMessage = (newMessage: any) => {
      queryClient.setQueryData(['messages', pickleId, leaderId], (oldData: any) => {
        console.log(newMessage);
        if (!oldData) return oldData;

        // 최신 데이터를 기반으로 상태 업데이트
        const updatedPages = oldData.pages.map((page: any, index: number) => {
          // 마지막 페이지에 새로운 메시지를 추가
          if (index === oldData.pages.length - 1) {
            return {
              ...page,
              messages: [...page.messages, newMessage],
            };
          }
          return page;
        });

        return {
          ...oldData,
          pages: updatedPages,
        };
      });
    };

    socket?.on('newMessage', handleNewMessage);

    // 이벤트 리스너 제거
    return () => {
      socket?.off('newMessage', handleNewMessage);
    };
  }, [socket, pickleId, leaderId, queryClient]);
};