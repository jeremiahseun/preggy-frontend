export type Profile = {
    id: string;
    name: string | null;
    country: string | null;
    region: string | null;
    trimester_stage: number | null;
    current_week: number | null;
    due_date: string | null; // Supabase returns dates as strings
    everyday_meals: 'all' | 'pescatarian' | 'vegetarian' | null;
    foods_to_avoid: string[] | null;
    anything_else: string | null;
    created_at: string;
};


// Type for the data passed to the update function
export type UpdateProfileParams = Partial<Omit<Profile, 'id' | 'created_at'>>;
