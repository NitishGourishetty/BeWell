import * as React from 'react'
import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { getUsersHabits } from '../../lib/backend'
import { supabase } from '../../lib/supabase'
import { Session } from '@supabase/supabase-js'

export default function Feed() {

    const [session, setSession] = useState<Session | null>(null)
    async function getHabits() {
        const data = await getUsersHabits(session);
        console.log(data);
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])


    return (
        <View>

        </View>
    )
}