import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
// import {SUPABASE_ANON_KEY, SUPABASE_URL} from '@env'

const supabaseUrl = "https://kkfymzngylqtwamuqvtk.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrZnltem5neWxxdHdhbXVxdnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1MzcwNDMsImV4cCI6MjAyNzExMzA0M30.3YeFs6yZS8lIOvFrPtj0Brf325PlGH6AMxMX7CmIr-o"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})