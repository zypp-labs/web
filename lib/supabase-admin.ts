// lib/supabase-admin.ts - Server-side Supabase client with service role key (bypasses RLS)
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn(
    "Missing Supabase admin credentials. Admin operations may fail due to RLS policies."
  );
}

// Create an admin client with service role key that bypasses RLS
// WARNING: Only use this in server-side admin API routes!
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;
