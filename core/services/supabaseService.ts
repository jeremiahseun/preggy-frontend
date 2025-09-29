import 'react-native-url-polyfill/auto'; // Required for Supabase to work in React Native
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';

// --- INITIALIZATION ---
// You should store these in an environment file (e.g., .env)
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'YOUR_SUPABASE_PUBLISHABLE_KEY';

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
        storage: AsyncStorage, // Use AsyncStorage for session persistence in React Native
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false, // Important for React Native's deep linking
    },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When closed, sessions will remain active.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
});


// --- AUTHENTICATION FUNCTIONS ---

/**
 * Registers a new user.
 */
export async function register({ email, password, fullName }: { email: string, password: string, fullName: string }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName: fullName, // This data is passed to your database trigger
            },
        },
    });
    return { data, error };
}

/**
 * Logs in an existing user.
 */
export async function login({ email, password }: { email: string, password: string }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
}

/**
 * Logs out the current user.
 */
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
}

/**
 * Sends a password reset email to the user.
 */
export async function forgotPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        // This is the deep link your mobile app will open
        redirectTo: 'yourapp://reset-password',
    });
    return { data, error };
}
