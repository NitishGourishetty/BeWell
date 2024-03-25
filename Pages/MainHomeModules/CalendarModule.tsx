import React from "react";
import { View, Text } from "react-native-ui-lib";
import { Dimensions, useWindowDimensions, StyleSheet, ScrollView } from "react-native";
import { useFonts } from 'expo-font'
import { useCustomFonts } from "../../assets/fonts/fontDeclarations";

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

function DateBlock() {
    // Get the current date
    const currentDate = new Date();
    // Get the day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
    const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    // Get the day of the month (1-31)
    const dayOfMonth = currentDate.getDate();

    return (
        <View style={{ marginLeft: 10, marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontFamily: 'Poppins-Regular' }}>
                {dayOfWeek}
            </Text>
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 38, fontWeight: "bold" }}>
                {dayOfMonth}
            </Text>
        </View>
    )
}
interface HabitBlockProps {
    title: string;
    beginningTime: number;
    endingTime: number;
}
const HabitBlock: React.FC<HabitBlockProps> = ({ title, beginningTime, endingTime }) => {
    return (
        <View style={{ backgroundColor: "rgba(27, 49, 43, 0.5)", paddingHorizontal: 25, paddingVertical: 4, marginVertical: 5, marginHorizontal: 10, borderRadius: 12, width: 200 }}>
            <Text style={{ fontFamily: "Poppins-Regular", color: "#FFFEFC" }}>
                {title}
            </Text>
            <Text style={{ fontFamily: "Poppins-Regular", color: "#FFFEFC" }}>
                {beginningTime} P.M - {endingTime} P.M
            </Text>
        </View>
    );
};

export default function CalendarModule() {
    const [fontsLoaded, fontError] = useCustomFonts();
    return (
        <View style={ModuleStyles.Module}>
            <DateBlock />
            <View style={{ height: '80%', width: 9, backgroundColor: "#FFFFFF", alignSelf: "center", borderRadius: 4, marginLeft: "10%" }}></View>

            <View style={{ flexDirection: "column", marginVertical: 10 }}>
                <HabitBlock title={"Reading Dune Messiah"} beginningTime={1} endingTime={2} />
                <HabitBlock title={"Restore House Atreides"} beginningTime={3} endingTime={5} />
                <HabitBlock title={"Fight the Harkonnens"} beginningTime={8} endingTime={11} />
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