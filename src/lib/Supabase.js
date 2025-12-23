import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://obyjenwljdrihtguguba.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ieWplbndsamRyaWh0Z3VndWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MTkzMzMsImV4cCI6MjA4MTk5NTMzM30.Eh9Iq8458P_nV35JDdWYshmUZfzSex0utZ5u-NapCWA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// اختبار بسيط عشان لو في خطأ يبان فوراً في Console
console.log("Supabase Client initialized ✅");
console.log("URL:", SUPABASE_URL);
