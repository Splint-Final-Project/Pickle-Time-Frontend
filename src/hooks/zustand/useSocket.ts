import { create } from 'zustand';
import io from 'socket.io-client';

interface SocketType {
  socket: any | null;
  initializeSocket: (authUserId: string) => void;
}

const useSocket = create<SocketType>((set) => ({
  socket: null,
  initializeSocket: (authUserId: string) => {
    if (authUserId) {
      const socket = io("http://localhost:8080", {
        query: {
          userId: authUserId,
        },
      });

      // socket.on("getOnlineUsers", (users) => {
      //   set({ onlineUsers: users });
      // });

      set({ socket });

      // socket.on('disconnect', () => {
      //   set({ socket: null });
      // });

      return () => {
        socket.close();
        set({ socket: null });
      };
    }
  },
  // closeSocket: () => {
  //   const socket = get().socket;
  //   if (socket) {
  //     socket.close();
  //     set({ socket: null });
  //   }
  // },
}));

export default useSocket;