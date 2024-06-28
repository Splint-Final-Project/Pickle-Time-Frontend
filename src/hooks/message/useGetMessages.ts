import { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import { messages } from '@/apis/messages.api';

export const useGetMessagesInOneToOne = () => {
  const [loading, setLoading] = useState(false);
  const { messages: stateOfMessage, setMessages, leaderId, pickleId, setNextPage } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const data = await messages.getByLeaderId(leaderId, pickleId);
        if (data.error) throw new Error(data.error);

        setNextPage(data.nextPage)
        setMessages([data, ...stateOfMessage]);
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

export const useGetMessages = (page: number) => {
  const [loading, setLoading] = useState(false);
  const { messages: stateOfMessage, setMessages, conversationId, setNextPage } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      
      try {
        const data = await messages.getByConversationId(conversationId, page);
        if (data.error) throw new Error(data.error);
        
        setNextPage(data.nextPage)
        setMessages([...data.messages, ...stateOfMessage]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (conversationId) getMessages();
  }, [conversationId, setMessages, page]);

  return { messages: stateOfMessage, loading };
}
