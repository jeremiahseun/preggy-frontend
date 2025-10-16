import 'react-native-get-random-values';
import { Alert } from 'react-native';
import { create } from 'zustand';
import { getChatHistory, getConversationMessages } from '../core/services/supabaseService';
import { ChatMessage } from '@/src/interfaces/db';
import { useAuthStore } from './auth_store';
import { v4 as uuidv4 } from 'uuid';
import { sendAiChatMessage } from '../core/services/aiService';

// Define the shape of the store's state and actions
interface ChatState {
    chatHistory: ChatMessage[];
    activeConversationMessages: ChatMessage[];
    isLoading: boolean;
    isLoadingConversation: boolean;
    isSendingMessage: boolean;
    error: string | null;
    fetchChatHistory: () => Promise<void>;
    fetchConversationMessages: (conversationId: string) => Promise<void>;
    sendMessage: (content: string) => Promise<void>;
    clearActiveConversation: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
    // --- INITIAL STATE ---
    chatHistory: [],
    activeConversationMessages: [],
    isLoading: false,
    isLoadingConversation: false,
    isSendingMessage: false,
    error: null,

    // --- ACTIONS ---

    fetchChatHistory: async () => {
        set({ isLoading: true, error: null });
        try {
            const history = await getChatHistory();
            set({ chatHistory: history, isLoading: false });
        } catch (e: any) {
            set({ error: e.message, isLoading: false });
        }
    },

    fetchConversationMessages: async (conversationId: string) => {
        set({ isLoadingConversation: true, error: null });
        try {
            const messages = await getConversationMessages(conversationId);
            set({ activeConversationMessages: messages, isLoadingConversation: false });
        } catch (e: any) {
            set({ error: e.message, isLoadingConversation: false });
        }
    },

    sendMessage: async (content: string) => {
        set({ isSendingMessage: true, error: null });
        const { user } = useAuthStore.getState();
        if (!user) {
            set({ error: "User not authenticated", isSendingMessage: false });
            return;
        }

        let conversationId = get().activeConversationMessages[0]?.conversation_id;
        if (!conversationId) {
            conversationId = uuidv4();
        }

        const tempUserMessage: ChatMessage = {
            id: Math.random(),
            created_at: new Date().toISOString(),
            conversation_id: conversationId,
            message_type: 'user',
            content: content,
            food_item_details: null,
        };

        set(state => ({
            activeConversationMessages: [...state.activeConversationMessages, tempUserMessage]
        }));

        try {
            const aiData = await sendAiChatMessage(content, conversationId);
            const aiResponse = aiData.response || aiData;

            const assistantMessage: ChatMessage = {
                id: aiResponse.id || Math.random(), // Use random id if not provided
                created_at: new Date().toISOString(),
                conversation_id: conversationId,
                message_type: 'assistant',
                content: aiResponse.content,
                food_item_details: aiResponse.foodItem || null,
            };

            set(state => ({
                activeConversationMessages: [...state.activeConversationMessages, assistantMessage]
            }));

        } catch (e: any) {
            Alert.alert('Error sending message', e.message);
            set({ error: e.message });
            // Revert optimistic update
            set(state => ({
                activeConversationMessages: state.activeConversationMessages.filter(
                    msg => msg.id !== tempUserMessage.id
                )
            }));
        } finally {
            set({ isSendingMessage: false });
        }
    },

    clearActiveConversation: () => {
        set({ activeConversationMessages: [] });
    }
}));
