import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Lead = {
  id: string;
  name?: string;
  email?: string;
  phone: string;
  message?: string;
  interest?: string;
  source: 'contact_form' | 'newsletter' | 'popup';
  status: 'new' | 'contacted' | 'removed';
  created_at: string;
  updated_at: string;
};
