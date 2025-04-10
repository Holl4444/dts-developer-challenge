import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types.js';
import dotenv from 'dotenv';

// Grab .env variables
dotenv.config();


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error(`Missing supabase environment variables`);
}

// Manages connections to Supabase. No need for pooling.
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
