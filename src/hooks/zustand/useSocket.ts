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
        transports: ['websocket'], // 사용할 전송 프로토콜 지정
      }); 
      

      // socket.on("getOnlineUsers", (users) => {
      //   set({ onlineUsers: users });
      // });

      set({ socket });

      socket.on('disconnect', () => {
        set({ socket: null });
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