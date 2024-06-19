import { useState } from 'react';
import useConversation from '../zustand/useConversation';
import { messages } from '@/apis/messages.api';

export const useSendMessageOneToOne = () => {
  const [loading, setLoading] = useState(false);
  const { messages: stateOfMessage, setMessages, leaderId, pickleId } = useConversation();

  const sendMessage = async (message: any) => {
    setLoading(true);

    try {
      const data = await messages.sendByLeaderId({ message }, leaderId, pickleId);

      if (data.error) throw new Error(data.error);

      setMessages([...stateOfMessage, data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages: stateOfMessage, setMessages, conversationId } = useConversation();

  const sendMessage = async (message: any) => {
    setLoading(true);

    try {
      const data = await messages.sendByConversationId({ message }, conversationId);

      if (data.error) throw new Error(data.error);

      setMessages([...stateOfMessage, data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
}



