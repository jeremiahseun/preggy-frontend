export type MessageSenderType = 'user' | 'assistant';

export interface ChatMessage {
    id: number;
    created_at: string;
    user_id: string;
    conversation_id: string;
    message_type: MessageSenderType;
    content: string | null;
    food_item_details: any | null; // Or a more specific type if available
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