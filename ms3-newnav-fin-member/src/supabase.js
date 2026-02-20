import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://schviayybzixriqnipgg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjaHZpYXl5YnppeHJpcW5pcGdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ3MzQ3NzcsImV4cCI6MjAwMDMxMDc3N30.wrueB4QaGQWpLyw5LopZAUJdMjI_lIp3nV7Ua-P-9DU"
);
