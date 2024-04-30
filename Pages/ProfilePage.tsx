import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, Image, ScrollView, View, StyleSheet, Text, Alert } from 'react-native';
import { Button } from 'react-native-ui-lib'
import { launchImageLibraryAsync } from 'expo-image-picker';
import { useCustomFonts } from "../assets/fonts/fontDeclarations";
import { FontAwesome, AntDesign } from '@expo/vector-icons';

const height = Dimensions.get("window").height * 0.9;

export default function ProfilePage({ navigation }) {
    const imageSource = "NITISH PULL FROM DB!!!"
    useCustomFonts();
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                {'Profile'}
            </Text>
            <View style={styles.pic_user}>
                {/* <Image
                    source={{ uri: imageSource }}
                    style={{ width: 200, height: 200, borderRadius: 100 }}
                /> */}
                <FontAwesome name="user-circle" size={200} color="black" />
                <Text style={styles.username}>
                    {'username'}
                </Text>
            </View>
            <View style={styles.user_info}>
                <Text style={styles.subtitle}>
                        {'first'}
                </Text>
                <Text style={styles.content}>
                        {'abhi'}
                </Text>

                <Text style={styles.subtitle}>
                        {'last'}
                </Text>
                <Text style={styles.content}>
                        {'tata'}
                </Text>

                <Text style={styles.subtitle}>
                        {'email'}
                </Text>
                <Text style={styles.content}>
                        {'abhinavtata21@gmail.com'}
                </Text>
            </View>
            <Button
                label="Log Out"
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
            />
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "E6D6B8"
    },
    pic_user: {
        width: "80%",
        alignItems: "center",
    },
    user_info: {
        width: "80%",
        alignItems: "flex-start",
    },
    title: {
        fontSize: height / 20,
        textAlign: "center",
        color: "#498C68",
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 20,
        marginTop : 20
    },
    username: {
        fontSize: height / 40,
        textAlign: "center",
        color: "#498C68",
        fontFamily: 'Poppins-SemiBold',
        marginTop: 20,
        marginBottom : 10
    },
    subtitle: {
        fontSize: height / 40,
        textAlign: "left",
        color: "#498C68",
        fontFamily: 'Poppins-SemiBold',
    },
    content: {
        fontSize: height / 50,
        textAlign: "left",
        color: "black",
        fontFamily: 'Poppins-Regular',
        marginBottom : 20
    },
    button: {
        borderBottomColor: '#AFC689',
        borderBottomWidth: 1,
        marginTop: 10,
        width : "50%"
    },
    
});
