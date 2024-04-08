import * as React from "react";
import { useState } from "react";
import { useCustomFonts } from "../assets/fonts/fontDeclarations";
import { ScrollView, View, StyleSheet, Text, Dimensions, Linking, TouchableOpacity } from "react-native";
import { Image, Button, TextField } from 'react-native-ui-lib';
import { AntDesign } from '@expo/vector-icons';

const height = Dimensions.get("window").height * 0.9;
export default function LoginPage(){
    useCustomFonts();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = () => {
        console.log("Username:", username);
        console.log("Password:", password);
    };

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.content}>
                <View style={{aspectRatio: 71/25, maxHeight: "20%", marginBottom: 30}}>
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
                        onChangeText={text => setUsername(text)}
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
                    onPress={handleLogin}
                />
                <View style={styles.signUp}>
                    <Text style={{color: '#80828C', fontFamily : "Poppins-Regular", marginRight : 3}}>
                        New user?
                    </Text>
                    <TouchableOpacity onPress={() => Linking.openURL('https://youtu.be/dQw4w9WgXcQ')} style={{alignSelf: "flex-end"}}> 
                        {/* don't know how to link properly */}
                        <Text style={{color: '#5D8E74', fontFamily : "Poppins-Regular"}}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </ScrollView>
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
