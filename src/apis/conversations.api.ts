import client from '@/apis/axios';
import { API_CONVERSATIONS } from '@/constants/API';

export const conversationRequests = Object.freeze({
  getAll: async (currentCategory: string) => {
    const { data } = await client.get(API_CONVERSATIONS.GET_ALL, {
      params: { category: currentCategory },
    });
    return data;
  },
});
