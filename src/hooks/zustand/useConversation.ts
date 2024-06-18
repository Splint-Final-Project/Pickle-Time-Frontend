import { create } from "zustand";

interface conversationType {
	selectedConversation: any;
	pickleId: string;
	messages: [];
	setSelectedConversation: (selectedConversation: any) => void;
	setPickleId: (pickleId: string) => void;
	setMessages: (messages: any) => void;
}

const useConversation = create<conversationType>((set) => ({
	selectedConversation: null,
	pickleId: "",
	messages: [],
	setPickleId: (pickleId: string) => set({ pickleId }),
	setSelectedConversation: (selectedConversation: any) => set({ selectedConversation }),
	setMessages: (messages: any) => set({ messages }),
}));

export default useConversation;