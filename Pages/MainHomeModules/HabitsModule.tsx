import React from "react";
import { View, Text } from "react-native-ui-lib";
import { Dimensions, useWindowDimensions, StyleSheet } from "react-native";
import { useFonts } from 'expo-font'
import { ModuleStyles } from "./CalendarModule";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

const HabitsContent = () => {
    return (
        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.habit}>
                        Defeat The Harkonnens
                    </Text>
                    <Text style={styles.time}>
                        @10 A.M
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={{ justifyContent: 'center' }}>
                <AntDesign name="plus" size={60} />
            </TouchableOpacity>
        </View>

    )
}

export default function HabitsModule() {
    return (
        <View style={styles.module}>
            <View style={{ backgroundColor: '#F1F3F6', margin: 10, borderRadius: 12, padding: 10 }}>
                <HabitsContent />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    module: {
        flex: 1,
        borderRadius: 12,
        backgroundColor: '#B1BC9E',
        flexDirection: 'row',
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