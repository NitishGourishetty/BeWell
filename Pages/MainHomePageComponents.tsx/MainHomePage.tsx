import React from "react-native"
import {SafeAreaView, Pressable,ScrollView, StyleSheet } from "react-native";
import {Text, View} from "react-native-ui-lib"
import CalendarModule from "./MainHomeModules/CalendarModule";
import { useWindowDimensions } from "react-native";
import { useCustomFonts } from "../../assets/fonts/fontDeclarations";
type Subsection = {
    header: string;
    
}

export default function MainHomePage(){
    const user = "user";
    const {width, height} = useWindowDimensions()
    useCustomFonts();
    return(
        
        <SafeAreaView style = {{height: '100%'}}>
            <ScrollView showsVerticalScrollIndicator = {true}>
                <View style = {{ justifyContent: "center", flexDirection: "column", alignItems:"center"}}>
                    <Text style ={styles.Subheading}>
                        Calendar
                    </Text>
                    <CalendarModule/>
                    

                    <Text style = {styles.Subheading}>
                        Streaks
                    </Text>

                    <Text style = {styles.Subheading}>
                        Habits
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    Subheading:{
        fontFamily: "Poppins-SemiBold", 
        fontSize: 22, 
        marginBottom: "2%",
        marginTop:"2%", 
        justifyContent:"flex-start", 
        alignSelf:"flex-start", 
        marginLeft: '7%'
    }
})