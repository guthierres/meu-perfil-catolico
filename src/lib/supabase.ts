import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://btmptqhvlouzeuykcitl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0bXB0cWh2bG91emV1eWtjaXRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMzY3MzAsImV4cCI6MjA3NjcxMjczMH0.SgQz93etzWZN-pHcR9mmM0n5dLGk4jZRiBn8cWGiw6s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
