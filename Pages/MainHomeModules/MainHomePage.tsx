import * as React from "react-native"
import { SafeAreaView, Pressable, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib"
import { useWindowDimensions } from "react-native";
import { useCustomFonts } from "../../assets/fonts/fontDeclarations";
import StreaksModule from "./StreaksModule";
import CalendarModule from "./CalendarModule";
import HabitsModule from "./HabitsModule";


export default function MainHomePage({ navigation }) {
    const user = "user";
    const { width, height } = useWindowDimensions()
    useCustomFonts();
    return (

        <SafeAreaView style={{ height: '100%' }}>
            <ScrollView showsVerticalScrollIndicator={true}>
                <View style={{ justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <Text style={styles.Subheading}>
                        Calendar
                    </Text>
                    <CalendarModule />
                    <Text style={styles.Subheading}>
                        Habits
                    </Text>
                    <HabitsModule habitName={"Defeating The Harkonnens"} time={"10"} index={0} navigation={navigation} />
                    <HabitsModule habitName={"Talk to Jannii"} time={"7"} index={1} navigation={navigation} />
                    <HabitsModule habitName={"Fight the Holy War"} time={"12"} index={2} navigation={navigation} />

                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    Subheading: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 22,
        marginBottom: "4%",
        marginTop: "4%",
        justifyContent: "flex-start",
        alignSelf: "flex-start",
        marginLeft: '7%'
    }
})