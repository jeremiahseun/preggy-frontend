
interface Message {
    id: string;
    type: 'user' | 'assistant' | 'welcome';
    content: string;
    timestamp: string;
    foodItem?: FoodItem;
}

export type Sources = {
    name: string;
    url: string;
}

// Similar/Alternative Food Item
type SimilarFoodItem = {
    name: string;
    type: "safe" | "limit" | "avoid";
    description: string;
    image: string;
};

// Avoid Food Item Types
type WhyAvoidRisk = {
    nameOfRisk: string;
    levelOfRisk: string;
    description: string;
    causesOfRisk: string[];
};

type FoodsContainingSelectedFoodItem = {
    name: string;
    description: string;
};

// Base Food Item
type BaseFoodItem = {
    id: string;
    name: string;
    sources: string;
    verifiedDate: string;
    trimesterNotes: string;
    details: any;
};

// Safe Food Item
export type SafeFoodItem = BaseFoodItem & {
    safety_type: "safe";
    description: string;
    nutritionalBenefits: string[];
    preparationGuidelines: string[];
    whyItThisSafe: string;
    ingredientsToWatch: string[];
    similarFoods: SimilarFoodItem[];
};

// Limit Food Item
export type LimitFoodItem = BaseFoodItem & {
    safety_type: "limit";
    description: string;
    safeConsumptionGuidelines: string[];
    healthConsiderations: string[];
    betterAlternatives: string[];
    whyLimitThisFood: string;
    ifYouChooseToConsume: string[];
    saferAlternatives: SimilarFoodItem[];
};

// Avoid Food Item
export type AvoidFoodItem = BaseFoodItem & {
    safety_type: "avoid";
    whyAvoidDescription: string;
    whyAvoidRisk: WhyAvoidRisk[];
    otherConsiderations: string[];
    betterAlternatives: string[];
    safeCookingGuidelines: string[];
    foodsContainingSelectedFoods: FoodsContainingSelectedFoodItem[];
};

export type FoodItem = SafeFoodItem | LimitFoodItem | AvoidFoodItem;

export {Message}
