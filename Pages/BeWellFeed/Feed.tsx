import * as React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, useWindowDimensions } from 'react-native';
import * as backend from '../../lib/backend';

import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useCustomFonts } from '../../assets/fonts/fontDeclarations';
import { Image } from 'react-native';
import moment from 'moment-timezone'

interface Post {
    img_url: String,
    caption: String,
    created_at: string,
    habit: String,
    likes: String[],
    id: Number

}
const DoubleTapImage = () => {
    const [lastTap, setLastTap] = useState(0);

    const handleDoubleTap = () => {
        const now = Date.now();
        if (now - lastTap < 300) {
            // Perform the action for double tap
            console.log('Double tap detected!');
            // Reset the lastTap state
            setLastTap(0);
            return;
        }
        setLastTap(now);
    };
}


function FeedModule({ post }: { post: Post }) {
    const img: String = post.img_url
    const caption: String = post.caption;
    const likes = post.likes.length;
    const time = post.created_at;
    console.log("Type: s", typeof (time))
    const habit = post.habit;

    const timestamp = moment(time);
    const formattedTime = timestamp.format("hh:mm A dddd")


    // Get the day of the month (1-31)

    return (

        <View style={{ marginTop: 20, width: '100%' }}>
            <Text style={{ fontFamily: 'Poppins-Bold' }}> TATATA</Text>
            <Text style={{ marginBottom: -30, fontFamily: 'Poppins-Regular' }}>{formattedTime}</Text>
            <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignSelf: 'center' }}>
                <Image src={img} style={{ width: '100%', height: '70%', borderRadius: 20, borderColor: 'rgba(192,192,192, 0.5)', borderWidth: 1 }} />
                <Text style={{ fontFamily: 'Poppins-Regular', maxWidth: '75%', marginLeft: 10 }}>{caption}</Text>
                <Text>Likes: {likes}</Text>
            </View>
        </View>
    );
}



export default function Feed() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [habitData, setHabitData] = useState([]); // Initialize as an empty array instead of null
    const [postsData, setPostsData] = useState([]);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: session }) => { // You're destructuring session here, so use it directly
            setSession(session);
        });
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    async function getHabitInfo() {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');
            let data = await backend.getUsersHabits(session);
            if (data) {
                // Do Stuff with data
                console.log("FEEED", data);
                setHabitData(data);
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log("ERROR", error); // Use console.log instead of alert for debugging
            }
        } finally {
            setLoading(false);
        }
    }

    async function retrievePosts() {
        try {
            setLoading(true);
            if (!session?.user) { throw new Error('No user  retrieval on the session!'); }
            console.log(session);
            const data = await backend.getFriendsPosts(session);
            if (data) {
                // Do Stuff with data
                console.log(typeof (data))
                setPostsData(data);
                console.log("posts: ", data);

            }
        } catch (error) {
            if (error instanceof Error) {
                console.log("ERROR", error); // Use console.log instead of alert for debugging
            }
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (session) {
            retrievePosts();
        }
        const channel = supabase.channel('table_db_changes').on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'posts',
            filter: '' //change this later so that it's by friends
        },
            (payload) => {
                const eventType = payload.eventType;
                const newRecord = payload.new as Post; // Type assertion for newRecord
                const oldRecord = payload.old as Post; // Type assertion for oldRecord
                // Handle different types of events (insert, update, delete)
                if (eventType === 'INSERT') {
                    setPostsData(prevPostsData => [...prevPostsData, newRecord]);
                } else if (eventType === 'UPDATE') {
                    setPostsData(prevPostsData =>
                        prevPostsData.map(post => (post?.id === newRecord?.id ? newRecord : post))
                    );
                } else if (eventType === 'DELETE') {
                    setPostsData(prevPostsData =>
                        prevPostsData.filter(post => post?.id !== oldRecord?.id)
                    );
                }
            }).subscribe();

        // Clean up subscription when component unmounts
        return () => {
            channel.unsubscribe();
        };
    }, [session]);
    const { width, height } = useWindowDimensions();
    const user = "user";
    useCustomFonts();

    return (
        <SafeAreaView style={{ height: '100%' }}>
            <ScrollView showsVerticalScrollIndicator={true}>
                <View style={{ justifyContent: 'center', flexDirection: 'column', alignSelf: 'center', width: '100%', height: 400 }}>
                    {postsData.map((post, index) => (
                        <FeedModule key={index} post={post} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}
