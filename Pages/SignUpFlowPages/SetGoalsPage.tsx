import * as React from "react";
import { useEffect, useState } from "react";
import { useCustomFonts } from "../../assets/fonts/fontDeclarations";
import { ScrollView, View, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { Text, Button } from 'react-native-ui-lib';
import { AntDesign } from '@expo/vector-icons';
import { Session } from "@supabase/supabase-js";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import KeyboardAvoidingContainer from '../../assets/components/KeyboardAvoidingContainer';
import { supabase } from "../../lib/supabase";
import { addHabit, finishOnboarding } from "../../lib/backend";
import HabitSetupModule from "./HabitSetupModule";


const height = Dimensions.get("window").height * 0.9;
export default function SetGoalsPage({ route, navigation }) {
    useCustomFonts();
    const [session, setSession] = useState<Session | null>(null)
    const [habit1, setHabit1] = useState("")
    const [habit2, setHabit2] = useState("")
    const [habit3, setHabit3] = useState("")
    const [time1, setTime1] = useState("")
    const [time2, setTime2] = useState("")
    const [time3, setTime3] = useState("")
    const [privacy1, setPrivacy1] = useState(false)
    const [privacy2, setPrivacy2] = useState(false)
    const [privacy3, setPrivacy3] = useState(false)
    const [numGoals, setNumGoals] = useState(0)
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    const handlePress = () => {
        navigation.navigate("GoalSetup")
    }

    function completeOnboarding() {
        finishOnboarding(session)
        navigation.navigate("MainStack")
    }

    // const isFocused = useIsFocused();
    useEffect(() => {
        console.log("goal useEffect being called");
        // Call only when screen open or when back on screen 
        if (route.params != undefined) {
            let { habitInfo, startTime, endTime, visibility } = route.params;
            console.log("old:", numGoals)
            setNumGoals(numGoals + 1)
            console.log("new:", numGoals)
            alert(habitInfo + "\n" + startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + "\n" + endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + "\n" + (visibility ? "Just for Me" : "With Friends") + "\n" + numGoals)
            addHabit(session, habitInfo, startTime, endTime, visibility)
            if(numGoals == 0){
                setHabit1(habitInfo)
                setTime1(startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
                setPrivacy1(visibility)
            }
            else if(numGoals == 1){
                setHabit2(habitInfo)
                setTime2(startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
                setPrivacy2(visibility)
            }
            else{
                setHabit3(habitInfo)
                setTime3(startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
                setPrivacy3(visibility)
            }
        }
    }, [route.params]);

    return (
        <KeyboardAvoidingContainer>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        {'Set Your Goals'}
                    </Text>
                    <View style={styles.buttonsContainer}>
                        {numGoals > 0 && route.params ?
                            <HabitSetupModule
                                habitName={habit1}
                                time={time1} 
                                index={1}
                                privacy={privacy1}
                            /> : 
                            <Button
                                backgroundColor="lightgrey"
                                color="black"
                                borderRadius={5}
                                style={{
                                    marginBottom: 20,
                                    height: "20%",
                                    alignItems: 'center'
                                }}
                                iconSource={() => <AntDesign name="plus" size={40} color="black" />}
                                onPress={handlePress}
                            />
                        }
                        {numGoals > 1 && route.params ?
                            <HabitSetupModule
                                habitName={habit2}
                                time={time2} 
                                index={2}
                                privacy={privacy2}
                            /> : 
                            <Button
                                backgroundColor="lightgrey"
                                color="black"
                                borderRadius={5}
                                style={{
                                    marginBottom: 20,
                                    height: "20%",
                                    alignItems: 'center'
                                }}
                                iconSource={() => <AntDesign name="plus" size={40} color="black" />}
                                onPress={handlePress}
                            />
                        }
                        {numGoals > 2 && route.params ?
                            <HabitSetupModule
                                habitName={habit3}
                                time={time3} 
                                index={3}
                                privacy={privacy3}
                            /> : 
                            <Button
                                backgroundColor="lightgrey"
                                color="black"
                                borderRadius={5}
                                style={{
                                    marginBottom: 20,
                                    height: "20%",
                                    alignItems: 'center'
                                }}
                                iconSource={() => <AntDesign name="plus" size={40} color="black" />}
                                onPress={handlePress}
                            />
                        }
                    </View>
                    <TouchableOpacity style={styles.arrow} onPress={() => { completeOnboarding() }}>
                        <AntDesign name="arrowright" size={45} />
                    </TouchableOpacity>
                </View>
                <Image
                    source={require("../../assets/img/habit_set_footer.png")}
                    style={{ width: "100%", height: "125%", position: "absolute", zIndex: -1 }}

                />
            </ScrollView>
        </KeyboardAvoidingContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "E6D6B8",
    },
    content: {
        width: "80%",
        alignItems: "center",
    },
    title: {
        fontSize: height / 20,
        textAlign: "center",
        color: "#498C68",
        fontFamily: 'Poppins-Bold',
        marginBottom: 50
    },
    buttonsContainer: {
        width: "100%",
        justifyContent: "space-evenly",
        height: "50%"
    },
    arrow: {
        alignSelf: 'flex-end',
        marginTop: 50
    },
});
