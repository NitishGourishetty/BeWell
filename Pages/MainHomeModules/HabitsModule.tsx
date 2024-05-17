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

function HabitsContent({ habitName, time, index }: HabitsProps) {
    return (
        <View>
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.habit}>
                    {habitName}
                </Text>
                <Text style={styles.time}>
                    @{time} A.M
                </Text>
            </View>
        </View>
    )
}
interface HabitsProps {
    habitName: String,
    time: Number,
    index?: number
    navigation?: any
}
export default function HabitsModule({ habitName, time, index , navigation }: HabitsProps) {
    const [backgroundColor, setBackgroundColor] = useState("#AFC689")
    const toCaptionPage = async() =>{
        navigation.navigate("PostCaptionPage")
    }
    const viewGallery = () => {
        alert("Lol show past pictures taken")
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
                    <HabitsContent habitName={habitName} time={time}/>
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
        width: 180
    },
    time: {
        fontFamily: 'Poppins-Regular',
        width: 180,
        fontSize: 14
    }
})