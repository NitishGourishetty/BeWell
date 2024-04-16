import * as React from "react";
import { View, Text, Image } from "react-native-ui-lib";
import { Dimensions, useWindowDimensions, StyleSheet } from "react-native";
import { useFonts } from 'expo-font'
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo'

function HabitsContent({ habitName, time }: HabitsProps) {
    const [imageSource, setImageSource] = useState(null);
    const openCamera = async() =>{
        const status = await ImagePicker.requestCameraPermissionsAsync();
        if(!status.granted){
            alert("Camera permission is required to take photos")
            return;
        }
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        })
        if (!result.canceled) {
            setImageSource(result.assets?.[0]?.uri);
        } else {
            alert('You did not select any image.');
        }
    }

    return (
        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
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
                {/*<Image
                    source={{ uri: imageSource }}
                    style={{ width: "20%", borderRadius : 10}}
                />*/}
            <TouchableOpacity style={{ justifyContent: 'center' }} onPress={openCamera}>
                <AntDesign name="plus" size={45} />
            </TouchableOpacity>
        </View>

    )
}
interface HabitsProps {
    habitName: String,
    time: String,
    index?: number
}
export default function HabitsModule({ habitName, time, index }: HabitsProps) {
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
                <HabitsContent habitName={habitName} time={time} />
            </View>
        </View >
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