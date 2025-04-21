import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bquapwikzprietppinbh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxdWFwd2lrenByaWV0cHBpbmJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNjY4NDUsImV4cCI6MjA2MDg0Mjg0NX0.7qUP2GPDK3erw_wzScRcVXIzIiW-t2MmlMlCEoq2W90';

export const supabase = createClient(supabaseUrl, supabaseKey);
