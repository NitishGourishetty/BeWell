import * as React from "react";
import { View, Text, Image } from "react-native-ui-lib";
import { Dimensions, useWindowDimensions, StyleSheet } from "react-native";
import { useFonts } from 'expo-font'
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo'
import StreaksModule from "../MainHomeModules/StreaksModule"
import { useNavigation } from '@react-navigation/native';
import { getPostsForHabit, getSpecificHabit } from "../../lib/backend";
import { Session } from "@supabase/supabase-js";

function timeConverter(time) {
    const date = new Date(time);

    // Extract hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine AM/PM and convert to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format minutes
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Combine hours and minutes
    const formattedTime = `${hours}:${formattedMinutes} ${ampm}`;
    return formattedTime;
}

function HabitsContent({ habitName, time_start, time_end, index }: HabitsProps) {
    return (
        <View>
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.habit}>
                    {habitName}
                </Text>
                <Text style={styles.time}>
                    {timeConverter(time_start)} - {timeConverter(time_end)}
                </Text>
            </View>
        </View>
    )
}
interface HabitsProps {
    habitName: String,
    time_start: String,
    time_end: String,
    streak: Number,
    id: Number,
    index?: number,
    session: Session
}
export default function HabitsModule({ habitName, time_start, time_end, index, streak, id, session }: HabitsProps) {
    const [backgroundColor, setBackgroundColor] = useState("#AFC689")
    const navigation = useNavigation(); 
    
    const toCaptionPage = async () => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        
        const startTime = new Date();
        const endTime = new Date();
        const habitStartTime = new Date(time_start);
        const habitEndTime = new Date(time_end);

        startTime.setHours(habitStartTime.getHours(), habitStartTime.getMinutes(), 0, 0);
        endTime.setHours(habitEndTime.getHours(), habitEndTime.getMinutes(), 0, 0);

        if (currentHour >= habitStartTime.getHours() && currentHour <= habitEndTime.getHours() &&
        !(currentMinute <= habitEndTime.getMinutes() && currentHour == habitEndTime.getHours())) {
                let data = await getPostsForHabit(session, id);
                // let date_created = new Date();
                // date_created.setDate(date_created.getDate() - 1);
                if(data && data!=undefined && data.length >= 1) {
                    let date = (data[data.length-1].created_at)
                    let date_created = new Date(date);
                    habitStartTime.setFullYear(currentTime.getMonth(), currentTime.getDay())
                    if (date_created > habitStartTime ) {
                        alert("Error, You cannot create a post within 24 hours of your last post.");
                        return;
                    }
                }
                // let lastPost = new Date(date_created)

                navigation.navigate("PostCaptionPage", { habit: id, session: session });
        } else {
            alert("Error, Current time is not within the habit time range.");
        }
    };
    const viewGallery = async () => {
        let data = await getPostsForHabit(session, id);
        alert("You have made " + data.length + " posts")
    }
    useEffect(() => {
        if (index % 3 === 0) {
            setBackgroundColor("#AFC689");
        } else if (index % 3 === 1) {
            setBackgroundColor("#7AAD79");
        } else {
            setBackgroundColor("#498C68")
        }
    }, [])
    return (
        <TouchableOpacity style={[styles.module, { backgroundColor: backgroundColor }]} onPress={viewGallery}>
            <View style={{ backgroundColor: '#F1F3F6', margin: 10, borderRadius: 12, padding: 10 }}>
                <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <HabitsContent habitName={habitName} time_start={time_start} time_end={time_end}/>
                    <StreaksModule days={10} color={backgroundColor}/>
                    <TouchableOpacity style={{ justifyContent: 'center', marginLeft : 15, zIndex : 1, padding : 10}} onPress={toCaptionPage}>
                        <AntDesign name="camera" size={45} color={backgroundColor}/>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    module: {
        flex: 1,
        borderRadius: 12,
        flexDirection: 'row',
        marginVertical: 10
    },
    habit: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 20,
        width: 160
    },
    time: {
        fontFamily: 'Poppins-Regular',
        width: 180,
        fontSize: 14
    }
})