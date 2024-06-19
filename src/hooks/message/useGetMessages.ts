import { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import { messages } from '@/apis/messages.api';

export const useGetMessagesInOneToOne = () => {
  const [loading, setLoading] = useState(false);
  const { messages: stateOfMessage, setMessages, leaderId, pickleId } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const data = await messages.getByLeaderId(leaderId, pickleId);

        if (data.error) throw new Error(data.error);

        setMessages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (leaderId) getMessages();
  }, [leaderId, setMessages, pickleId]);

  return { messages: stateOfMessage, loading };
};

export const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages: stateOfMessage, setMessages, conversationId } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      
      try {
        const data = await messages.getByConversationId(conversationId);

        if (data.error) throw new Error(data.error);

        setMessages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (conversationId) getMessages();
  }, [conversationId, setMessages]);

  return { messages: stateOfMessage, loading };
}
