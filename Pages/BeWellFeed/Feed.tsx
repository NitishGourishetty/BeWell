import * as React from 'react'
import { useState, useEffect } from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { getUsersHabits } from '../../lib/backend'
import { supabase } from '../../lib/supabase'
import { Session } from '@supabase/supabase-js'

export default function Feed() {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchSession() {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setSession(session);
            } catch (error) {
                console.error('Error fetching session:', error.message);
            }
        }

        fetchSession();

        const authListener = (_event: string, session: Session | null) => {
            setSession(session);
        };

        const removeListener = supabase.auth.onAuthStateChange(authListener);

        return () => {
            removeListener();
        };
    }, []);

    useEffect(() => {
        if (session) {
            getHabitInfo();
        }
    }, [session]);

    async function getHabitInfo() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')
            let data = await getUsersHabits(session);
            if (data) {
                //Do Stuff with data
                console.log("DATA: ", data);
                console.log("type: ", typeof (data))
                setData(data);
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
                alert("ERROR")
            }
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (session) getHabitInfo()
    }, [session])
    const user = "user";


    return (
        <SafeAreaView>
            <Text>
                Hello
            </Text>
        </SafeAreaView>
    );
}
