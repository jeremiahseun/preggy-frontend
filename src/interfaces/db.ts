export type MessageSenderType = 'user' | 'assistant';

export interface ChatMessage {
    id: number;
    created_at: string;
    conversation_id: string;
    message_type: MessageSenderType;
    content: string | null;
    foods?: any | null; // Or a more specific type if available
    food_id?: string | null;
}

/**
 *
 * User:
 * Name
 * Country
 * Region (Gotten from the country)
 * Trimester Stage
 * Current Week
 * Due date
 * FOOD
 * Everyday meals: (Can eat everything / fish and no meat/ no fish or meat)
 * Food to avoid: (eggs, wheat flour etc) A LIST
 * Anything else (food instructions)
 *
 */
