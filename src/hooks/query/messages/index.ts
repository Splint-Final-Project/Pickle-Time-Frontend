import { useQuery, useMutation } from "@tanstack/react-query";
import { MessageType } from "@/apis/types/messages.type";

import { messages } from "@/apis/index";

export const useGetMessages = (data: MessageType, receiverId: string) => {
  return useQuery({
    queryKey: ['messages', receiverId],
    queryFn: async () => await messages.get(data, receiverId),
  })
}