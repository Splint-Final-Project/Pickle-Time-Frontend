import { useQuery } from '@tanstack/react-query';
import { conversationRequests } from '@/apis/conversations.api';

export const useGetConversations = () => {
  return useQuery({
    queryKey: ['messages'],
    queryFn: async () => await conversationRequests.getAll(),
  });
};