import client from '@/apis/axios';
import { MessageType } from '@/apis/types/messages.type';
import { API_CONVERSATIONS } from '@/constants/API';

export const conversationRequests = Object.freeze({
  getAll: async () => {
    const { data } = await client.get(API_CONVERSATIONS.GET_ALL);
    console.log(data);
    return data;
  },
});
