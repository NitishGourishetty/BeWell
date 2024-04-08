import {supabase} from './supabase'
//Session and Session Information can be passed into this function as well -> Improvements for the future - Nitish
import { Session } from '@supabase/supabase-js'
import { useState } from 'react'
import { Alert } from 'react-native'

//Some functions will need to have a seperate await and loading states when implemented
export async function getUserProfile(session) {
    try {
        if (!session?.user) throw new Error('No usser on the session!')
  
        const { data, error, status } = await supabase
          .from('profiles')
          .select(`username, website, avatar_url`)
          .eq('id', session?.user.id)
          .single()
        if (error && status !== 406) {
          throw error
        }
  
        return data;
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message)
          return null;
        }
      } finally {
      }
}

export async function updateProfile({
    session,
    username,
    website,
    avatar_url,
  }: {
    session: Session
    username: string
    website: string
    avatar_url: string
  }) {
    try {
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
    }
  }


export async function addHabit(session, habitText) {
    try {
      if (!session?.user) throw new Error('No user on the session!')
      const { error } = await supabase
      .from('habits')
      .insert({habit_info: habitText, profile: session?.user.id })

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    }
  }

export async function getUsersHabits(session) {
    try {
        if (!session?.user) throw new Error('No usser on the session!')
  
        const { data, error, status } = await supabase
          .from('habits')
          .select('habit_info, public, id')
          .eq('profile', session?.user.id)
        if (error && status !== 406) {
          throw error
        }
        return data;
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message)
          return null;
        }
      } finally {
      }
}

export function getHabit({ session }: { session: Session }) {
    
}

