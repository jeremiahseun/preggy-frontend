import { getFoodById } from "@/core/services/supabaseService";
import { FoodItem } from "@/src/interfaces/Conversations";
import { create } from "zustand";

interface FoodDetailsStore {
    foodDetails: FoodItem | any | null;
    isLoading: boolean;
    error: string | null;
    fetchFoodDetails: (id: string) => Promise<void>;
    setFoodDetails: (foodDetails: FoodItem) => void;
}

export const useFoodDetailsStore = create<FoodDetailsStore>((set) => ({
    foodDetails: null,
    isLoading: false,
    error: null,

    fetchFoodDetails: async (id: string) => {
        console.log(`Fetching food details for id: ${id}`);
        set({ isLoading: true, error: null });
        try {
            const { data, error } = await getFoodById(id);
            if (error) {
                console.log(`Error fetching food details: ${error.message}`);
                set({ error: error.message, isLoading: false });
            } else if (data) {
                console.log(`Successfully fetched food details: ${JSON.stringify(data)}`);
                set({ foodDetails: data, isLoading: false });
            }
        } catch (e: any) {
            console.log(`An unexpected error occurred: ${e.message}`);
            set({ error: e.message, isLoading: false });
        }
    },

    setFoodDetails: (foodDetails: FoodItem) => {
        set({ foodDetails, isLoading: false, error: null });
    },
}));
