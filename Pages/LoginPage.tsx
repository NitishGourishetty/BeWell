import * as React from "react"
import { useState, useEffect } from "react";
import { TextInput } from "react-native";
import { useCustomFonts } from "../assets/fonts/fontDeclarations";
import { ScrollView, AppState, Alert, View, StyleSheet, Text, Dimensions, Linking, TouchableOpacity } from "react-native";
import { Image, Button, TextField } from 'react-native-ui-lib';
import SignUpStack from "../Navigation/SignUpStack";
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '../lib/supabase'


// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})
import LoginStack from "../Navigation/SignUpStack";
import { useNavigation } from "@react-navigation/native";
import KeyboardAvoidingContainer from '../assets/components/KeyboardAvoidingContainer';

const height = Dimensions.get("window").height * 0.9;
export default function LoginPage({ navigation }) {
    useCustomFonts();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        if (!error) handleLogin()
        setLoading(false)
    }

    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }

    const handleLogin = () => {
        console.log("Username:", email);
        console.log("Password:", password);
        if (email && password) {
            setPassword('')
            setEmail('')
            navigation.navigate('MainStack')
        }
    };

    return (
        <KeyboardAvoidingContainer>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.content}>
                    <View style={{ aspectRatio: 71 / 25, maxHeight: "20%", marginBottom: 30 }}>
                        <Image
                            source={require('../assets/img/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.textFieldsContainer}>
                        <TextField
                            color="#80828C"
                            containerStyle={styles.textField}
                            placeholder={'Username'}
                            selectionColor="#AFC689"
                            // floatingPlaceholderColor="#80828C"
                            // floatingPlaceholder
                            enableErrors
                            validate={['required', (value) => value.length > 6]}
                            validationMessage={['Field is required', 'Password is too short']}
                            onChangeText={text => setEmail(text)}
                        />
                        <TextField
                            color="#80828C"
                            containerStyle={styles.textField}
                            placeholder={'Password'}
                            // floatingPlaceholderColor="#80828C"
                            // floatingPlaceholder
                            enableErrors
                            validate={['required', (value) => value.length > 6]}
                            validationMessage={['Field is required', 'Password is too short']}
                            onChangeText={text => setPassword(text)}
                        />
                    </View>
                    <Button
                        label="Login"
                        backgroundColor="#5D8E74"
                        color="white"
                        borderRadius={10}
                        style={styles.button}
                        labelStyle={{
                            fontFamily: "Poppins-SemiBold",
                            fontSize: 17,
                            textAlign: "center",
                            flex: 1
                        }}
                        onPress={signInWithEmail}
                    />
                    <View style={styles.signUp}>
                        <Text style={{ color: '#80828C', fontFamily: "Poppins-Regular", marginRight: 3 }}>
                            New user?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Sign Up")} style={{ alignSelf: "flex-end" }}>
                            {/* don't know how to link properly */}
                            <Text style={{ color: '#5D8E74', fontFamily: "Poppins-Regular" }}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: "#FFFFFF"
    },
    content: {
        width: "80%",
        alignItems: "center",
    },
    logo: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    textFieldsContainer: {
        width: "100%",
        marginBottom: 30
    },
    textField: {
        marginBottom: 15,
        backgroundColor: "#F1F3F6",
        borderRadius: 10,
        paddingLeft: 20,
        paddingTop: 20
    },
    button: {
        marginBottom: 5,
        height: height * 0.08,
        width: "100%"
    },
    signUp: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end"
    }
});
