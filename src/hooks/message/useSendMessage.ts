import { useState } from 'react';
import useConversation from '../zustand/useConversation';
import { messages } from '@/apis/messages.api';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages: stateOfMessage, setMessages, selectedConversation, pickleId } = useConversation();

  const sendMessage = async (message: any) => {
    setLoading(true);

    try {
      const data = await messages.send({ message }, selectedConversation, pickleId);

      console.log(data);

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
export default useSendMessage;
