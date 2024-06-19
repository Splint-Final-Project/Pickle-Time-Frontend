import client from '@/apis/axios';
import { MessageType } from '@/apis/types/messages.type';
import { API_CHAT } from '@/constants/API';

export const messages = Object.freeze({
  sendByConversationId: async (body: MessageType, conversationId: string) => {
    const { data } = await client.post(API_CHAT.INQUIRY(conversationId), body);
    return data;
  },

  sendByLeaderId: async (body: MessageType, receiverId: string, pickleId: string) => {
    const { data } = await client.post(API_CHAT.INQUIRY_ONE_TO_ONE(receiverId, pickleId), body);
    return data;
  },

  getByConversationId: async (conversationId: string) => {
    const { data } = await client.get(API_CHAT.MESSAGES_IN_CONVERSATION(conversationId));
    return data;
  },

  getByLeaderId: async (receiverId: string, pickleId: string) => {
    const { data } = await client.get(API_CHAT.MESSAGE_ONE_TO_ONE(receiverId, pickleId));
    return data;
  },
});
