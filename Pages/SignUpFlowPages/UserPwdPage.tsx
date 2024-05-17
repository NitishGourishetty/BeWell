import * as React from "react";
import { useState, useEffect } from "react";
import { useCustomFonts } from "../../assets/fonts/fontDeclarations";
import { ScrollView, View, StyleSheet, Text, Dimensions, Linking, Alert } from "react-native";
import { Image, Button, TextField } from 'react-native-ui-lib';
import KeyboardAvoidingContainer from '../../assets/components/KeyboardAvoidingContainer';
import { supabase } from "../../lib/supabase";

const height = Dimensions.get("window").height * 0.9;
export default function UserPwdPage({navigation}){
    useCustomFonts();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [loading, setLoading] = useState(false)
    // useEffect(()=>console.log("Email: ", email), [email]);
    // useEffect(()=>console.log("Password: ", password), [password]);
    // useEffect(()=>console.log("Confirmed Password: ", confirmedPassword), [confirmedPassword]);

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
        if(!error) navigation.navigate("Name")
        if (!session) Alert.alert('Session error')
        setLoading(false)
    }
    const handleLogin = () => {
        Alert.alert(
            "Confirmation",
            `Email: ${email}\nPassword: ${password}`,
            [
                {text: 'Confirm', onPress: () => signUpWithEmail() , isPreferred : true},
                {text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel'},
            ]
        )
    };

    return(
        <KeyboardAvoidingContainer>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.content}>
                    <View style={{aspectRatio: 71/25, maxHeight: "20%", marginBottom: 30}}>
                        <Image 
                            source={require('../../assets/img/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.textFieldsContainer}>
                        <TextField
                            color="#80828C"
                            containerStyle={styles.textField}
                            placeholder={'Please enter your email'}
                            selectionColor="#AFC689"
                            // floatingPlaceholderColor="#80828C"
                            // floatingPlaceholder
                            enableErrors
                            validate={['required', (value) => value.length > 6]}
                            validationMessage={['Field is required', 'Email is too short']}
                            onChangeText={text => setEmail(text)}
                            typ
                        />
                        <TextField
                            color="#80828C"
                            containerStyle={styles.textField}
                            placeholder={'Please choose a password'}
                            // floatingPlaceholderColor="#80828C"
                            // floatingPlaceholder
                            enableErrors
                            onChangeText={text => setPassword(text)}
                        />
                        <TextField
                            color="#80828C"
                            containerStyle={styles.textField}
                            placeholder={'Confirm password'}
                            // floatingPlaceholderColor="#80828C"
                            // floatingPlaceholder
                            enableErrors
                            validateOnChange
                            validate={['required']} // (value) => password ? value==password : null
                            validationMessage={['Field is required']} // "Password is too short"
                            onChangeText={text => setConfirmedPassword(text)}
                        />
                    </View>
                    <Button 
                        label="Continue"
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
                        onPress={handleLogin}
                        disabled={!(password.length > 6 && email.length > 6 && password == confirmedPassword)}
                    />
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
        flexDirection : "row",
        justifyContent : "flex-end"
    }
});
