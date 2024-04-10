import React from "react";
import { View, Text } from "react-native-ui-lib";
import { Dimensions, useWindowDimensions, StyleSheet } from "react-native";
import { useFonts } from 'expo-font'

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function StreaksModule({ days }) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: "#5D8E74", borderRadius: 15, padding: 10 }}>
            <Text style={{ color: 'white' }}>
                {days}
            </Text>
            <MaterialCommunityIcons color={'white'} name="fire" size={20} />
        </View>
    )
}