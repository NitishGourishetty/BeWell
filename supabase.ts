import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://zxsybmmxkmbkgxuybbrb.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4c3libW14a21ia2d4dXliYnJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwODgzMDcsImV4cCI6MjAyNDY2NDMwN30.TPjea4rtiLqh4W6hywhZvwFDjB7KqhM0lk9FNX5dRrk"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})