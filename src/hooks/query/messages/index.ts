import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageType } from '@/apis/types/messages.type';
import { messages } from '@/apis/messages.api';

// 한 채팅방 안에서의 메시지들을 받음.
// export const useGetMessages = (receiverId: string) => {
//   return useQuery({
//     queryKey: ['messages'],
//     queryFn: async () => await messages.get(receiverId),
//   });
// };

// export const useSendMessage = (receiverId: string) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({message, socket} : {message: string, socket: any}) => 
//     { 
//       socket.emit('newMessage', message);
//       return await messages.send({message: message}, receiverId)
//     },
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }),
//     onError: error => console.error('에러발생: ' + error),
//   });
// };