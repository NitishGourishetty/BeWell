import * as React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
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



function FeedModule({ post, Session, username }: { post: Post, Session: Session, username: Object }) {
    const img: String = post.img_url
    const caption: String = post.caption;
    const time = post.created_at;
    const habit = post.habit;
    const post_id = post.id;
    const [likes, setLikes] = useState(post.likes.length);
    const timestamp = moment(time);
    const formattedTime = timestamp.format("hh:mm A MMMM Do, YYYY")

    const [lastTap, setLastTap] = useState(0);
    useEffect(()=>{
        // Clean up subscription when component unmounts
        const handlePostUpdates = (payload) => {
            setLikes(payload.new.likes.length);
        }
        
        // Listen to inserts
        supabase
          .channel('posts')
          .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'posts' }, handlePostUpdates)
          .subscribe()

          return () => {
              supabase.channel('posts').unsubscribe()
          }
    }, [likes])
    const handleDoubleTap = async () => {
        const now = Date.now();
        if (now - lastTap < 300) {
            // Perform the action for double tap
            console.log('Double tap detected!');
            await backend.addLikes(Session, post.id)
            // Reset the lastTap state
            setLastTap(0);
            return;
        }
        setLastTap(now);
    };
    return (
        <View style={{ marginTop: 20, width: '100%' }}>
            <Text style={{ fontFamily: 'Poppins-Bold' }}>{username.username}</Text>
            <Text style={{ marginBottom: -15, fontFamily: 'Poppins-Regular' }}>{formattedTime}</Text>
            <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignSelf: 'center' }}>
                <TouchableOpacity activeOpacity={1} onPress={handleDoubleTap}>
                    <Image src={img} style={{ width: '100%', height: '80%', borderRadius: 20, borderColor: 'rgba(192,192,192, 0.5)', borderWidth: 1 }} />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Poppins-Regular', maxWidth: '100%', marginLeft: 10, marginTop: -50 }}>{caption}</Text>
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
    const [name, setName] = useState({})

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
            if (!session) { throw new Error('No user  retrieval on the session!'); }
            const data = await backend.getFriendsPosts(session);
            if (data) {
                // Do Stuff with data
                const postData = data.data
                setPostsData(postData);
                setName(data.profileName)

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
    }, [session]);
    const { width, height } = useWindowDimensions();
    const user = "user";
    useCustomFonts();
    return (
        <SafeAreaView style={{ height: '100%' }}>
            <ScrollView showsVerticalScrollIndicator={true}>
                <View style={{ justifyContent: 'center', flexDirection: 'column', alignSelf: 'center', width: '100%', height: 400 }}>
                    {postsData.map((post, index) => (
                        <FeedModule key={index} post={post} Session={session} username = {name} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}
