import * as React from "react";
import { useCustomFonts } from "../assets/fonts/fontDeclarations";
import { ScrollView, View, StyleSheet, TouchableOpacity, Dimensions, Image, Alert } from "react-native";
import { Text, Button } from 'react-native-ui-lib';
import { AntDesign } from '@expo/vector-icons';
import KeyboardAvoidingContainer from '../assets/components/KeyboardAvoidingContainer';
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";


const height = Dimensions.get("window").height * 0.9;
export default function SetGoalsPage({ route, navigation }) {
    useCustomFonts();
    const [session, setSession] = React.useState<Session | null>(null)
    const [data, setData] = React.useState(null)
    React.useEffect(() => {
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

    // const isFocused = useIsFocused();

    React.useEffect(() => {
        console.log("called");
 
        // Call only when screen open or when back on screen 
        if(route.params!=undefined){ 
            // let {ha} = habit_info
           alert(JSON.stringify(route.params))
        }
        console.log("hello")
    }, [route.params]);


    return (
        <KeyboardAvoidingContainer>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        {'Set Your Goals'}
                    </Text>
                    <View style={styles.buttonsContainer}>
                        <Button
                            backgroundColor="lightgrey"
                            color="black"
                            borderRadius={5}
                            style={{
                                marginBottom: 20,
                                height: "20%",
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                            iconSource={() => <AntDesign name="plus" size={40} color="black" />}
                            onPress={handlePress}
                        />
                        <Button
                            backgroundColor="lightgrey"
                            color="black"
                            borderRadius={5}
                            style={{
                                marginBottom: 20,
                                height: "20%",
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                            iconSource={() => <AntDesign name="plus" size={40} color="black" />}
                            onPress={handlePress}

                        />
                        <Button
                            backgroundColor="lightgrey"
                            color="black"
                            borderRadius={5}
                            style={{
                                marginBottom: 20,
                                height: "20%",
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                            iconSource={() => <AntDesign name="plus" size={40} color="black" />}
                            onPress={handlePress}
                        />
                    </View>
                    <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate("MainStack")}>
                        <AntDesign name="arrowright" size={45}/>
                    </TouchableOpacity>
                </View>
                <Image
                    source={require("../assets/img/habit_set_footer.png")}
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
        marginBottom: 20
    },
    buttonsContainer: {
        width: "100%",
        justifyContent: 'center',
    },
    button: {
        alignSelf: 'flex-end',
        marginTop: 50
    },
    arrow: {
        alignSelf: 'flex-end',
    }
});
