import * as React from 'react'
import { useState, useEffect } from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { getUsersHabits } from '../../lib/backend'

import { supabase } from '../../lib/supabase'
import { Session } from '@supabase/supabase-js'
import { useCustomFonts } from '../../assets/fonts/fontDeclarations'


export default function Feed() {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const [habitData, setHabitData] = useState(null)


    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })


    }, [])


    async function getHabitInfo() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')
            let data = await getUsersHabits(session);
            if (data) {
                //Do Stuff with data
                setHabitData(data)
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
                alert("ERROR")
            }
        } finally {
            setLoading(false)
            console.log(habitData)
        }
    }
    useEffect(() => {
        if (session) getHabitInfo()
    }, [session])
    const user = "user";
    useCustomFonts();

    return (
        <SafeAreaView>
            <Text>
                Feed
            </Text>
        </SafeAreaView>
    );
}
