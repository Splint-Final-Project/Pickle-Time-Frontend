import { useEffect } from 'react';

import useSocket from '@/hooks/zustand/useSocket';
import useConversation from '../zustand/useConversation';

const useListenMessages = (user: any) => {
  const { socket, initializeSocket, closeSocket } = useSocket();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    initializeSocket(user._id);

    return () => {
      closeSocket();
    };
  }, [user._id, initializeSocket, closeSocket]);
  
  useEffect(() => {
    socket?.on('newMessage', (newMessage: any) => {
      console.log(newMessage);
      // newMessage.shouldShake = true;ㅌ
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off('newMessage');
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
