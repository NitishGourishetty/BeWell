import * as React from 'react'
import { useState, useEffect } from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { getUsersHabits } from '../../lib/backend'

import { supabase } from '../../lib/supabase'
import { Session } from '@supabase/supabase-js'
import { useCustomFonts } from '../../assets/fonts/fontDeclarations'

function FeedModule() {
    return (
        <View style={{ backgroundColor: 'green', width: '70%', height: '25%' }}>

        </View>
    )
}

export default function Feed() {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const [habitData, setHabitData] = useState([]) // Initialize as an empty array instead of null


    useEffect(() => {
        supabase.auth.getSession().then(({ data: session }) => { // You're destructuring session here, so use it directly
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
                // Do Stuff with data
                console.log("FEEED", data)
                setHabitData(data)
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log("ERROR", error); // Use console.log instead of alert for debugging
            }
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (session) getHabitInfo()
    }, [session])
    const user = "user";
    useCustomFonts();

    return (
        <SafeAreaView>
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 25, textAlign: 'center' }}>
                Social Feed
            </Text>
            <View>
                {habitData.map((habit, index) => (
                    <Text key={index}>
                        {habit.habit_info}
                    </Text>
                ))}
            </View>
        </SafeAreaView>
    );
}
