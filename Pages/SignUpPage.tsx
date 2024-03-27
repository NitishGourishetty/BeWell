import React from "react";
import { useCustomFonts } from "../assets/fonts/fontDeclarations";
import { ScrollView, View, Pressable, StyleSheet } from "react-native";
import { Image, Text, Button } from 'react-native-ui-lib';
import { Dimensions, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MARGIN_KEY_PATTERN } from "react-native-ui-lib/src/commons/modifiers";

const width = Dimensions.get("window").width * 0.9;
const height = Dimensions.get("window").height * 0.9;
export default function SignUpPage(){
    useCustomFonts();

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    {'Sign Up'}
                </Text>
                <View style={styles.buttonsContainer}>
                    <Button 
                        label="Google Login"
                        backgroundColor="lightgrey"
                        color="black"
                        borderRadius={5}
                        style={{
                            marginBottom: 20,
                            height: height * 0.08,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        labelStyle={{
                            fontFamily: "Poppins-Regular",
                            fontSize: 17,
                            textAlign: "center",
                            flex: 1
                        }}
                        iconSource={() => <AntDesign name="google" size={24} color="black" />}
                    />
                    <Button
                        label="Facebook Login"
                        backgroundColor="lightgrey"
                        color="black"
                        borderRadius={5}
                        style={{
                            marginBottom: 20,
                            height: height * 0.08,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        labelStyle={{
                            fontFamily: "Poppins-Regular",
                            fontSize: 17,
                            textAlign: "center",
                            flex: 1
                        }}
                        iconSource={() => <AntDesign name="facebook-square" size={24} color="black" />}
                    />
                    <Button
                        label="Apple ID Login"
                        backgroundColor="lightgrey"
                        color="black"
                        borderRadius={5}
                        style={{
                            marginBottom: 20,
                            height: height * 0.08,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        labelStyle={{
                            fontFamily: "Poppins-Regular",
                            fontSize: 17,
                            textAlign: "center",
                            flex: 1
                        }}
                        iconSource={() => <AntDesign name="apple1" size={24} color="black" />}
                    />
                </View>
                {/*not sure why we have this because you would have to choose one of the htree optins above, not continue*/}
                <TouchableOpacity style={styles.button}>
                    <AntDesign name="arrowright" size={45} />
                </TouchableOpacity>
            </View>
        </ScrollView>
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
        fontSize: height/20,
        textAlign: "center",
        color: "#498C68",
        fontFamily: 'Poppins-Bold',
        marginBottom: 50
    },
    buttonsContainer: {
        width: "100%",
        justifyContent: 'center',
    },
    button: {
        alignSelf: 'flex-end',
        marginTop: 50
    }
});
