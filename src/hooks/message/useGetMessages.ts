import { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import { messages } from '@/apis/messages.api';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages: stateOfMessage, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const data = await messages.get(selectedConversation);

        if (data.error) throw new Error(data.error);

        setMessages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation) getMessages();
  }, [selectedConversation, setMessages]);

  return { messages: stateOfMessage, loading };
};

export default useGetMessages;
