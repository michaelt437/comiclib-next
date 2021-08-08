import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SB_URL!,
  process.env.NEXT_PUBLIC_SB_PUBLIC_KEY!
);
export default supabase;
