import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageType } from '@/apis/types/messages.type';
import { messages } from '@/apis/messages.api';

// export const useGetConversationList = (receiverId: string) => {
//   return useQuery({
//     queryKey: ['messages', receiverId],
//     queryFn: async () => await messages.get(receiverId),
//   });
// }

// 한 채팅방 안에서의 메시지들을 받음.
export const useGetMessages = (receiverId: string) => {
  return useQuery({
    queryKey: ['messages', receiverId],
    queryFn: async () => await messages.get(receiverId),
  });
};

export const useSendMessage = (data: MessageType, receiverId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await messages.send(data, receiverId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages', receiverId] }),
    onError: error => console.error('에러발생: ' + error),
  });
};