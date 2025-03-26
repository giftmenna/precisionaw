// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ekrgotbtktogzzoqrvxv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrcmdvdGJ0a3RvZ3p6b3Fydnh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NzExOTMsImV4cCI6MjA1ODQ0NzE5M30.vkOQIaZ1uhbPgBYKPilE7cbfYRKT5wV2MJ309afUfdE';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);