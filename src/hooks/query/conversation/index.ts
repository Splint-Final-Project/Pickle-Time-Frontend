import { useQuery } from '@tanstack/react-query';
import { conversationRequests } from '@/apis/conversations.api';

export const useGetConversations = (currentCategory: string) => {
  return useQuery({
    queryKey: ['conversations', currentCategory],
    queryFn: async () => await conversationRequests.getAll(currentCategory),
  });
};