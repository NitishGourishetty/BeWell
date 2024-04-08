import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, View, Alert } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Session } from '@supabase/supabase-js'
import { getUserProfile, updateProfile, addHabit, getUsersHabits } from '../lib/backend'

export default function Account() {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [habitText, setHabitText] = useState('')
  const [session, setSession] = useState<Session | null>(null)

  //This could be passed in to account, but doesn't work with how stack if formed
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)

    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if (session) setProfileAttributes()
  }, [session])

  async function setProfileAttributes() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')
      let data = await getUserProfile(session); //calling from backend
      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function getHabitInfo() {
    try {
      if (!session?.user) throw new Error('No user on the session!')
      let data = await getUsersHabits(session);
      if(data) {
       //Do Stuff with data
       alert(data.length)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
        alert("ERROR")
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Website" value={website || ''} onChangeText={(text) => setWebsite(text)} />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({session, username, website, avatar_url: avatarUrl })}
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>

      <View style={styles.verticallySpaced}>
        <Input label="Website" value={habitText || ''} onChangeText={(text) => setHabitText(text)} />
      </View>

      {/* <View style={styles.verticallySpaced}>
        <Button title="Create Habit" onPress={() => addHabit(session, habitText)} />
      </View> */}

      <View style={styles.verticallySpaced}>
        <Button title="Get Habit" onPress={() => getHabitInfo()} />
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})