import { create } from 'zustand';
import io from 'socket.io-client';

interface SocketType {
  socket: any | null;
  initializeSocket: (authUserId: string) => void;
  closeSocket: () => void;
}

const useSocket = create<SocketType>((set, get) => ({
  socket: null,
  initializeSocket: (authUserId: string) => {
    if (authUserId) {
      const socket = io("http://localhost:8080", {
        query: {
          userId: authUserId,
        },
        timeout: 5000, // 타임아웃 설정 (예: 5초)
        reconnectionAttempts: 5, // 재연결 시도 횟수 제한
        transports: ['polling', 'websocket'],  // 폴링과 웹소켓을 모두 지원
        withCredentials: true
      });

      set({ socket });

      socket.on('disconnect', () => {
        set({ socket: null });
      });
      
      socket.on("connect_error", (err: any) => {
        // the reason of the error, for example "xhr poll error"
        console.log(err.message);
      
        // some additional description, for example the status code of the initial HTTP response
        console.log(err.description);
      
        // some additional context, for example the XMLHttpRequest object
        console.log(err.context);
      });

      return () => {
        socket.close();
        set({ socket: null });
      };
    }
  },
  closeSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();
      set({ socket: null });
    }
  },
}));

export default useSocket;
