import { create } from 'zustand';
import { FoodDetails } from '../src/interfaces/db';
import { confirmFoodPhoto, searchFoodByName } from '../core/services/aiService';

interface PhotoCheckState {
    imageUri: string | null;
    foodList: string[];
    foodItem: FoodDetails | null;
    loading: 'confirm' | 'search' | false;
    error: string | null;
    confirmFoodPhoto: (image: { uri: string; type: string; name: string }) => Promise<boolean>;
    searchFood: (foodName: string) => Promise<boolean>;
    clearStore: () => void;
}

export const usePhotoCheckStore = create<PhotoCheckState>((set) => ({
    imageUri: null,
    foodList: [],
    foodItem: null,
    loading: false,
    error: null,

    confirmFoodPhoto: async (image) => {
        set({ imageUri: image.uri, loading: 'confirm', error: null });
        try {
            const response = await confirmFoodPhoto(image);
            if (response.status) {
                set({ foodList: response.data.foodList, loading: false });
                return true;
            } else {
                set({ error: response.message, loading: false });
                return false;
            }
        } catch (error: any) {
            set({ error: error?.message || 'An unknown error occurred.', loading: false });
            return false;
        }
    },

    searchFood: async (foodName) => {
        set({ loading: 'search', error: null });
        try {
            const response = await searchFoodByName(foodName);
            if (response.status) {
                set({ foodItem: response.data, loading: false });
                return true;
            } else {
                set({ error: response.message, loading: false });
                return false;
            }
        } catch (error: any) {
            set({ error: error?.message || 'An unknown error occurred.', loading: false });
            return false;
        }
    },

    clearStore: () => set({ foodList: [], foodItem: null, loading: false, error: null }),
}));
