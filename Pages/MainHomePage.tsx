import React from "react-native"
import {SafeAreaView, Pressable,ScrollView } from "react-native";
import {Text, View} from "react-native-ui-lib"
import CalendarModule from "./MainHomeModules/CalendarModule";
import { useWindowDimensions } from "react-native";
type Subsection = {
    header: string;
    
}

function Subsections(){

}

export default function MainHomePage(){
    const user = "user";
    const {width, height} = useWindowDimensions()
    return(
        
        <SafeAreaView style = {{height: '100%'}}>
            <ScrollView>
                <View style = {{ justifyContent: "center", flexDirection: "column", alignItems:"center"}}>
                    <Text>
                        Home Page
                    </Text>


                    <CalendarModule/>
                    

                    <Text>
                        Streaks
                    </Text>

                    <Text>
                        Habits
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}