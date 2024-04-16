import * as React from "react";
import { View, Text, Image } from "react-native-ui-lib";
import { Dimensions, useWindowDimensions, StyleSheet } from "react-native";
import { useFonts } from 'expo-font'
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo'

function HabitsContent({ habitName, time, privacy }: HabitsProps) {
    return (
        <View style={{ width: '90%', marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.habit}>
                        {habitName}
                    </Text>
                    <Text style={styles.time}>
                        @{time}
                    </Text>
                </View>
            </View>
            {privacy ? <FontAwesome name="lock" size={45} /> : <FontAwesome name="users" size={45} />}
        </View>

    )
}
interface HabitsProps {
    habitName: String,
    time: String,
    privacy: Boolean,
    index?: number
}
export default function HabitSetupModule({ habitName, time, index, privacy }: HabitsProps) {
    const [backgroundColor, setBackgroundColor] = useState("")
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
        <View style={[styles.module, { backgroundColor: backgroundColor }]}>
            <View style={{ backgroundColor: '#F1F3F6', margin: 10, borderRadius: 12, padding: 10 }}>
                <HabitsContent habitName={habitName} time={time} privacy={privacy}/>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    module: {
        flex: 1,
        borderRadius: 12,
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: "center",
        height: 200
    },
    habit: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 20,
        width: 180
    },
    time: {
        fontFamily: 'Poppins-Regular',
        width: 180,
        fontSize: 14
    }
})