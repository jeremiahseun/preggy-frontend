import { getRecentFoods, searchFoodsByName } from "@/core/services/supabaseService";
import { create } from "zustand";

interface HomeStore {
    recentFoods: any[];
    searchedFoods: any[];
    isLoading: boolean;
    error: string | null;
    fetchRecentFoods: () => Promise<any>;
    searchFoods: (query: string) => Promise<void>;
    setSearchedFoods: (foods: any[]) => void;
}


export const useHomeStore = create<HomeStore>((set, get) => ({
    recentFoods: [],
    searchedFoods: [],
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
    },

    searchFoods: async (query: string) => {
        console.log(`Searching for foods with query: ${query}`);
        set({ isLoading: true, error: null });
        try {
            const { data, error } = await searchFoodsByName(query);
            if (error) {
                console.log(`Error searching foods: ${error.message}`);
                set({ error: error.message, isLoading: false, searchedFoods: [] });
            } else if (data) {
                console.log("Foods searched successfully!");
                set({ searchedFoods: data, isLoading: false });
            }
        } catch (e: any) {
            console.log(`An unexpected error occurred: ${e.message}`);
            set({ error: e.message, isLoading: false, searchedFoods: [] });
        }
    },

    setSearchedFoods: (foods: any[]) => {
        set({ searchedFoods: foods });
    }
}));
