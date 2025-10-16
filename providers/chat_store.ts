import { create } from 'zustand';
import { getChatHistory } from '../core/services/supabaseService';
import { ChatMessage } from '@/src/interfaces/db';

// Define the shape of the store's state and actions
interface ChatState {
    chatHistory: ChatMessage[];
    isLoading: boolean;
    error: string | null;
    fetchChatHistory: () => Promise<void>;
}

export const useChatStore = create<ChatState>((set) => ({
    // --- INITIAL STATE ---
    chatHistory: [],
    isLoading: false,
    error: null,

    // --- ACTIONS ---

    /**
     * Fetches the user's chat history from Supabase and updates the store.
     */
    fetchChatHistory: async () => {
        set({ isLoading: true, error: null });
        try {
            const history = await getChatHistory();
            set({ chatHistory: history, isLoading: false });
        } catch (e: any) {
            set({ error: e.message, isLoading: false });
        }
    },
}));
