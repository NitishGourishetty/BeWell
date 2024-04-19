import React from "react";
import { ScrollView, View, StyleSheet, Alert } from "react-native";
import { Text, TextField } from 'react-native-ui-lib';
import { Dimensions, TouchableOpacity } from "react-native";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Session } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { updateProfile } from "../../lib/backend";
import { supabase } from "../../lib/supabase";
import { useCustomFonts } from "../../assets/fonts/fontDeclarations";
import KeyboardAvoidingContainer from "../../assets/components/KeyboardAvoidingContainer";



const height = Dimensions.get("window").height * 0.9;

export default function NamePage({ navigation }) {
    const [session, setSession] = useState<Session | null>(null)
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    
    //Pass in session next time, when revamping code

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
    
        })
        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
      }, [])

      async function setProfileAttributes() {
        if(first_name.length == 0 || last_name.length == 0){
            alert("Please complete all fields.");
            return;
        }
        try {
            updateProfile({session, first_name, last_name});
        } catch (error) {
          if (error instanceof Error) {
            Alert.alert(error.message)
          }
        }
        finally {
            navigation.navigate("Profile Picture");
        }
      }
      useCustomFonts();
    
    return (
        <KeyboardAvoidingContainer>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        {'What should \n we call you?'}
                    </Text>
                    {/* <Image 
                        source={require('../assets/img/sign-up.png')}
                        style={{resizeMode : "center"}}
                    /> */}
                    <View style={styles.textFieldsContainer}>
                        <TextField
                            color="#498C68"
                            containerStyle={styles.textField}
                            placeholder={'first'}
                            selectionColor="#AFC689"
                            floatingPlaceholderColor="#AFC689"
                            floatingPlaceholder
                            enableErrors
                            validate={['required', (value) => value.length > 6]}
                            validationMessage={['Field is required', 'Password is too short']}
                            underlineColorAndroid="#AFC689"
                            onChangeText={(text) => setFirstName(text)}
                        />
                        <TextField
                            color="#498C68"
                            containerStyle={styles.textField}
                            placeholder={'last'}
                            floatingPlaceholderColor="#AFC689"
                            floatingPlaceholder
                            enableErrors
                            validate={['required', (value) => value.length > 6]}
                            validationMessage={['Field is required', 'Password is too short']}
                            underlineColorAndroid="#AFC689"
                            onChangeText={(text) => setLastName(text)}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => { setProfileAttributes() }}>
                        <AntDesign name="arrowright" size={45} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "E6D6B8"
    },
    content: {
        width: "80%",
        alignItems: "center",
    },
    title: {
        fontSize: height / 20,
        textAlign: "center",
        color: "#498C68",
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 50
    },
    textFieldsContainer: {
        width: "100%",
        marginBottom: 20,
    },
    textField: {
        borderBottomColor: '#AFC689',
        borderBottomWidth: 1,
        marginBottom: 20
    },
    button: {
        alignSelf: 'flex-end',
        marginTop: 50
    }
});