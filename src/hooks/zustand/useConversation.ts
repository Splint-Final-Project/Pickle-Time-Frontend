import { create } from "zustand";

interface conversationType {
	leaderId: string;
	pickleId: string;
	conversationId: string;
	messages: [];
	setLeaderId: (leaderId: string) => void;
	setPickleId: (pickleId: string) => void;
	setMessages: (messages: any) => void;
	setConversationId: (conversationId: string) => void;
	clear: () => void;
}

const useConversation = create<conversationType>((set) => ({
	leaderId: "",
	pickleId: "",
	messages: [],
	conversationId: "",
	setPickleId: (pickleId: string) => set({ pickleId }),
	setLeaderId: (leaderId: string) => set({ leaderId }),
	setMessages: (messages: any) => set({ messages }),
	setConversationId: (conversationId: string) => set({ conversationId }),
	clear: () => set({leaderId:'', pickleId: '', messages: [], conversationId: ''})
}));

export default useConversation;