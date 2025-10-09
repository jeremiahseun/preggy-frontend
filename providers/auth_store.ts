import Api from "@/core/api/api";
import { create } from 'zustand'
import { Session, User } from '@supabase/supabase-js';
import {
    register as registerService,
    login as loginService,
    signOut as signOutService,
    forgotPassword as forgotPasswordService,
    supabase
} from '../core/services/supabaseService';
import { StorageService } from "@/core/services/storageService";
import { useProfileStore } from "./profile_store";

const api = new Api();

type AuthState = {
    token: string | null,
    session: Session | null;
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    isFirstTime: boolean;

    getToken: () => Promise<string | null>;
    initializeAuth: () => () => void; // Returns the unsubscribe function
    register: (params: Parameters<typeof registerService>[0]) => Promise<void>;
    login: (params: Parameters<typeof loginService>[0]) => Promise<void>;
    signOut: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    setIsFirstTime: (isFirstTime: boolean) => void;
}

const tokenValue: string = 'token';
const isFirstTimeValue: string = 'isFirstTime';


export const useAuthStore = create<AuthState>((set, get) => ({
    // Initial state
    session: null,
    user: null,
    isAuthenticated: false,
    isLoading: true, // Start as true to check initial session
    error: null,
    token: null,
    isFirstTime: true,

    // --- ACTIONS ---

    // Get token from saved storage
    getToken: async () => {
        console.log("Getting token...")
        const token = await StorageService.getData(tokenValue);
        console.log(`Token: ${token}`)
        const isFirstTime = await StorageService.getData(isFirstTimeValue);
        console.log(`Is first time: ${isFirstTime}`);
        if (isFirstTime !== null) {
            set({ isFirstTime });
        }
        if (token) {
            set({ token });
        }
        return token;
    },

    // Initialize the auth state by listening to Supabase's auth changes
    initializeAuth: () => {
        console.log('Initializing auth...');
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log(`Initializing auth...: ${JSON.stringify(session)}`);
            set({ session, user: session?.user ?? null, isAuthenticated: !!session, isLoading: false });
            set({ token: session?.access_token ?? null });
            StorageService.saveData(session?.access_token, tokenValue);
        });

        // Return the unsubscribe function for cleanup
        return () => {
            console.log('Unsubscribing from auth...');
            subscription.unsubscribe();
        };
    },

    // Register a new user
    register: async ({ email, password, fullName }) => {
        set({ isLoading: true, error: null });
        const { data, error } = await registerService({ email, password, fullName });
        if (error) {
            set({ error: error.message, isLoading: false });
        } else {
            // The onAuthStateChange listener will handle setting the session
            set({ isLoading: false });
        }
    },

    // Log in an existing user
    login: async ({ email, password }) => {
        set({ isLoading: true, error: null });
        const { error } = await loginService({ email, password });
        if (error) {
            set({ error: error.message, isLoading: false });
        } else {
            // The onAuthStateChange listener will handle setting the session
            set({ isLoading: false });
        }
    },

    // Log out the current user
    signOut: async () => {
        set({ isLoading: true, error: null });
        const { error } = await signOutService();
        if (error) {
            set({ error: error.message, isLoading: false });
        } else {
            // The onAuthStateChange listener will handle clearing the session
            useProfileStore.getState().clearProfile()
            set({ session: null, user: null, isAuthenticated: false, isLoading: false });
        }
    },

    // Send a password reset email
    forgotPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        const { error } = await forgotPasswordService(email);
        if (error) {
            set({ error: error.message, isLoading: false });
        } else {
            set({ isLoading: false });
            // You can add logic here to show a confirmation message to the user
        }
    },

    // Setting isFirstTime
    setIsFirstTime: (isFirstTime: boolean) => {
        set({ isFirstTime });
        if (isFirstTime !== null) {
            StorageService.saveData(isFirstTime, isFirstTimeValue);
        }
    }
}))
