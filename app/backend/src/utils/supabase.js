import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL and SUPABASE_KEY environment variables are required');
}

// Criar cliente Supabase com chave de serviço (pode fazer operações admin)
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Criar cliente Supabase com chave anon (para uso no frontend)
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
export const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
