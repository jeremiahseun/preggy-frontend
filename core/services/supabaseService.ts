import 'react-native-url-polyfill/auto'; // Required for Supabase to work in React Native
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';
import { Profile, UpdateProfileParams } from '@/src/interfaces/profile';
import { ChatMessage } from '@/src/interfaces/db';

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

// --- FOODS --- //
/**
 * Fetches the latest 5 (recent) foods
 */
export async function getRecentFoods(): Promise<{ data: any[] | null, error: any | null }> {
    const { data, error } = await supabase
        .from('foods')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    if (error) {
        console.error('Error fetching foods:', error);
        return { data: null, error };
    }
    return { data: data || [], error: null };
}

/**
 * Fetches a single food by its ID.
 * @param foodId The ID of the food to fetch.
 */
export async function getFoodById(foodId: string): Promise<{ data: any | null, error: any | null }> {
    const { data, error } = await supabase
        .from('foods')
        .select('*')
        .eq('id', foodId)
        .single();

    if (error) {
        console.error(`Error fetching food with id ${foodId}:`, error);
        return { data: null, error };
    }

    return { data, error: null };
}


// --- PROFILE FUNCTIONS ---

/**
 * Fetches the profile for the currently logged-in user.
 */
export async function getProfile() {
    // First, get the current user session
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No authenticated user found.");

    // Then, fetch the profile corresponding to the user's ID
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single(); // .single() returns one object instead of an array

    if (error && error.code !== 'PGRST116') { // PGRST116: "exact one row not found" is okay on first login
        console.error('Error fetching profile:', error);
        throw error;
    }

    return data as Profile | null;
}

/**
 * Updates the profile for the currently logged-in user.
 * @param profileData The profile fields to update.
 */
export async function updateProfile(profileData: UpdateProfileParams) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No authenticated user found.");

    const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
        .select() // .select() returns the updated data
        .single();

    if (error) {
        console.error('Error updating profile:', error);
        throw error;
    }

    return data as Profile;
}

// --- CHAT FUNCTIONS ---

/**
 * Fetches the most recent message for each conversation for the current user.
 */
export async function getChatHistory() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No authenticated user found.");

    const { data, error } = await supabase
        .from('chat_messages')
        .select('id, conversation_id, content, created_at, message_type, food_item_details')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching chat history:', error);
        throw error;
    }

    if (!data) {
        return [];
    }

    // Process to get only the latest message for each conversation
    const latestMessages = data.reduce((acc, message) => {
        if (!acc[message.conversation_id]) {
            acc[message.conversation_id] = message;
        }
        return acc;
    }, {} as Record<string, typeof data[0]>);

    // The history is the array of these latest messages, sorted by most recent first.
    const history = Object.values(latestMessages).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return history;
}

/**
 * Fetches all messages for a specific conversation.
 * @param conversationId The ID of the conversation to fetch.
 */
export async function getConversationMessages(conversationId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No authenticated user found.");

    const { data, error } = await supabase
        .from('chat_messages')
        .select('*') // Select all fields for the conversation view
        .eq('conversation_id', conversationId)
        .eq('user_id', user.id) // Ensure user can only access their own messages
        .order('created_at', { ascending: true }); // Order from oldest to newest

    if (error) {
        console.error('Error fetching conversation messages:', error);
        throw error;
    }

    return data as ChatMessage[];
}
