import Api from '../api/api';
import { useAuthStore } from '@/providers/auth_store';

const api = new Api();

/**
 * Sends a message to the AI backend and returns the response.
 * @param content The user's message content.
 * @param conversationId The ID of the conversation, or null for a new one.
 */
export async function sendAiChatMessage(content: string, conversationId: string | null) {
    const { token } = useAuthStore.getState();

    if (!token) {
        throw new Error("User is not authenticated.");
    }

    const body = {
        content: content,
        conversationId: conversationId,
    };

    const response = await api.authPost({
        url: 'ai/chat',
        formData: JSON.stringify(body),
        token: token,
    });

    const data = await response.json();

    if (!response.ok || data.status === false) {
        throw new Error(data.message || 'Failed to send message.');
    }

    return data.data; // Contains { response: { content, foodItem, ... } }
}
