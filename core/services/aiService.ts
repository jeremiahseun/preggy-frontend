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

export async function confirmFoodPhoto(image: { uri: string; type: string; name: string }) {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error('User not authenticated');

    const formData = new FormData();
    formData.append('picture', {
        uri: image.uri,
        name: image.name,
        type: image.type,
    } as any);

    const response = await api.authPost({
        url: 'ai/confirm-food-photo',
        formData,
        token,
        isFormData: true,
    });

    return response.json();
}

export async function searchFoodByName(foodName: string) {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error('User not authenticated');

    const response = await api.authGet({
        url: `ai/search-food`,
        token,
        queryParams: { foodName },
        formData: null,
    });

    return response.json();
}
