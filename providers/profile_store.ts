import { create } from 'zustand';
import { getProfile, updateProfile } from '../core/services/supabaseService';
import { Profile, UpdateProfileParams } from '@/src/interfaces/profile';

// Define the shape of the store's state and actions
interface ProfileState {
    profile: Profile | null;
    isLoading: boolean;
    error: string | null;
    fetchProfile: () => Promise<void>;
    updateProfile: (updates: UpdateProfileParams) => Promise<void>;
    updateTrimesterDetails: (params: { dueDate?: Date | null, trimester?: number | null, current_week?: number | null }) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
    // --- INITIAL STATE ---
    profile: null,
    isLoading: false,
    error: null,

    // --- ACTIONS ---

    /**
     * Fetches the user's profile from Supabase and updates the store.
     * This should be called once after the user logs in.
     */
    fetchProfile: async () => {
        set({ isLoading: true, error: null });
        try {
            const profileData = await getProfile();
            set({ profile: profileData, isLoading: false });
        } catch (e: any) {
            set({ error: e.message, isLoading: false });
        }
    },

    /**
     * Updates the user's profile in Supabase and in the local store.
     * Use this for saving data from your onboarding flow.
     * @param updates An object containing the profile fields to update.
     */
    updateProfile: async (updates: UpdateProfileParams) => {
        // If there's no profile yet, we can't update it.
        if (!get().profile) {
            // Probably it has not been loaded, so we try loading it.
            await get().fetchProfile()
        };

        if (!get().profile) return;

        set({ isLoading: true, error: null });
        try {
            // The service function handles the API call
            const updatedProfile = await updateProfile(updates);
            // Update the local state with the new profile data from the server
            set({ profile: updatedProfile, isLoading: false });
        } catch (e: any) {
            set({ error: e.message, isLoading: false });
        }
    },

    /**
   * NEW: Calculates and saves trimester, week, and due date based on user input.
   * This centralizes the business logic for the onboarding step.
   * @param params An object containing either a `dueDate` OR a `trimester`.
   */
    updateTrimesterDetails: async ({ dueDate, trimester, current_week }) => {
        set({ isLoading: true, error: null });

        let profileUpdates: UpdateProfileParams = {};

        if (dueDate) {
            // User provided a due date, so we calculate from that
            const { current_week, trimester_stage } = calculateDetailsFromDueDate(dueDate);
            profileUpdates = {
                due_date: dueDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
                current_week,
                trimester_stage,
            };
        } else if (trimester && current_week) {
            // User selected a trimester and current week, so we estimate the details
            const { due_date } = estimateDetailsFromTrimester(trimester, current_week);
            profileUpdates = {
                due_date,
                current_week,
                trimester_stage: trimester,
            };
        } else if (trimester) {
            // User selected a trimester, so we estimate the details
            const { current_week, due_date } = estimateDetailsFromTrimester(trimester);
            profileUpdates = {
                due_date,
                current_week,
                trimester_stage: trimester,
            };
        } else {
            set({ error: "Either a due date or a trimester must be provided.", isLoading: false });
            return;
        }

        try {
            await get().updateProfile(profileUpdates);
        } catch (e: any) {
            // The error will be set by the underlying updateProfile action
            set({ error: e });
        } finally {
            set({ isLoading: false });
        }
    },
}));


// --- Helper Functions for Date Calculations ---

/**
 * Calculates the current week and trimester based on a due date.
 * A standard pregnancy is 40 weeks (280 days).
 */
const calculateDetailsFromDueDate = (dueDate: Date) => {
    const today = new Date();
    const msInDay = 1000 * 60 * 60 * 24;
    const daysRemaining = Math.round((dueDate.getTime() - today.getTime()) / msInDay);

    if (daysRemaining < 0 || daysRemaining > 280) {
        // Handle edge cases or invalid dates
        return { current_week: null, trimester_stage: null };
    }

    const daysPregnant = 280 - daysRemaining;
    const current_week = Math.floor(daysPregnant / 7) + 1;

    let trimester_stage = 1;
    if (current_week >= 27) {
        trimester_stage = 3;
    } else if (current_week >= 14) {
        trimester_stage = 2;
    }

    return { current_week, trimester_stage };
};

/**
 * Estimates a due date and current week based on a selected trimester.
 * This makes a reasonable assumption for users who don't know their exact due date.
 * If current_week is provided, it will be used instead of the assumed middle-of-trimester week.
 */
const estimateDetailsFromTrimester = (trimester: number, current_week_param?: number | null) => {
    const today = new Date();
    // Assume middle of each trimester:
    // Trimester 1: Week 7 (middle of weeks 1-13)
    // Trimester 2: Week 20 (middle of weeks 14-26)
    // Trimester 3: Week 33 (middle of weeks 27-40)
    const assumedWeeks: Record<number, number> = { 1: 7, 2: 20, 3: 33 };
    const current_week = current_week_param ?? assumedWeeks[trimester] ?? 20; // Use provided week, then assumed, then fallback

    const weeksRemaining = 40 - current_week;
    const daysRemaining = weeksRemaining * 7;

    const dueDate = new Date(today.getTime() + daysRemaining * (1000 * 60 * 60 * 24));

    return { current_week, due_date: dueDate.toISOString().split('T')[0] }; // Format as YYYY-MM-DD
};
