import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gfogtntpamezfdrjzvzt.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdmb2d0bnRwYW1lemZkcmp6dnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMjAyMTEsImV4cCI6MjA3NDc5NjIxMX0.ZobZKNA_WNTjf2azXJptchpm2-XsBYGBcnNqJtOf3kg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)