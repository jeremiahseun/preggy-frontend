import { getRecentFoods } from "@/core/services/supabaseService";
import { create } from "zustand";

interface HomeStore {
    recentFoods: any[];
    isLoading: boolean;
    error: string | null;
    fetchRecentFoods: () => Promise<any>;
}


export const useHomeStore = create<HomeStore>((set, get) => ({
    recentFoods: [],
    isLoading: false,
    error: null,

    fetchRecentFoods: async () => {
        console.log("Fetching recent foods...");
        set({ isLoading: true, error: null });
        try {
            const { data, error } = await getRecentFoods();
            if (error) {
                console.log(`Error fetching recent foods: ${error.message}`);
                set({ error: error.message, isLoading: false, recentFoods: [] });
            } else if (data) {
                console.log("Recent foods fetched successfully!");
                set({ recentFoods: data, isLoading: false });
            }
        } catch (e: any) {
            console.log(`An unexpected error occurred: ${e.message}`);
            set({ error: e.message, isLoading: false, recentFoods: [] });
        }
    }
}));
