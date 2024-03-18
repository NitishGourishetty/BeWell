import React from "react";
import { View, Text } from "react-native-ui-lib";
import { Dimensions, useWindowDimensions, StyleSheet } from "react-native";
import {useFonts} from 'expo-font'

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

function DateBlock (){
    return(
        <View style = {{marginLeft:10, marginTop: 10}}>
            <Text style = {{fontSize: 18, fontFamily: 'Poppins-Regular'}}>
                Tuesday
            </Text>
            <Text style={{ fontFamily:'Poppins-Bold', fontSize: 38, fontWeight:"bold"}}>
                5
            </Text>
        </View>
    )
}
function HabitBlock(){
    return(
        <View style={{ backgroundColor:"rgba(27, 49, 43, 0.5)", opacity:"50%", paddingHorizontal: 25, paddingVertical: 4, marginVertical:5, marginHorizontal: 10, borderRadius: 12}}>
            <Text style= {{fontFamily: "Poppins-Regular", color:"#FFFEFC"}}>
                Physical Activity
            </Text>
            <Text style= {{fontFamily: "Poppins-Regular", color:"#FFFEFC"}}>
                3:00 P.M - 5:00 P.M
            </Text>
        </View>
    )
}

export default function CalendarModule(){
    const [fontsLoaded, fontError] = useFonts({
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require("../../assets/fonts/Poppins-Bold.ttf")
    })
    return (
        <View style ={ModuleStyles.Module}>
            <DateBlock/>
            <View style={{height: '80%', width: 9, backgroundColor: "#FFFFFF", alignSelf:"center", borderRadius: 4, marginLeft:"10%"}}></View>
            
            <View style={{flexDirection: "column", marginVertical: 10}}>
                <HabitBlock/>
                <HabitBlock/>
                <HabitBlock/>
            </View>
            
            
        </View>
    )
}

export const ModuleStyles = StyleSheet.create({
    Module: {
        flex: 1,
        borderRadius: 12, 
        backgroundColor: '#B1BC9E',
        flexDirection: 'row',
        alignItems: "flex-start"
    },
  });