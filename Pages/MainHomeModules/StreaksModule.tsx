import * as React from "react";
import { View, Text } from "react-native-ui-lib";
import { Dimensions, useWindowDimensions, StyleSheet } from "react-native";
import { useFonts } from 'expo-font'

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function StreaksModule({ days, color }) {
    return (
        <View style={{ flexDirection: 'row', backgroundColor: color, borderRadius: 15, padding: 10, alignSelf : "center" }}>
            <Text style={{ color: 'white' }}>
                {days}
            </Text>
            <MaterialCommunityIcons color={'white'} name="fire" size={20} />
        </View>
    )
}