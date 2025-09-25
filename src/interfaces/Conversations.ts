
interface Message {
    id: string;
    type: 'user' | 'assistant' | 'welcome';
    content: string;
    timestamp: string;
    foodItem?: FoodItem;
}

type FoodItem = {
    name: string;
    status: 'safe' | 'avoid' | 'limit';
    description: string;
    reason?: string;
    alternatives?: string[];
    guidelines?: string[];
    benefits?: string[];
    trimester?: TrimesterInfo;
    lastVerified?: string;
    sources?: Array<Sources>;
}

type TrimesterInfo = {
    trimesterStage?: "1st" | "2nd" | "3rd" | null;
    trimesterNote?: string;
}

type Sources = {
    name: string;
    description: string;
    updated: string;
    verified: boolean;
}

export {Sources, TrimesterInfo, FoodItem, Message}
