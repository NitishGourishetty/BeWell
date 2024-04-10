import * as React from "react";
import { useState, useEffect } from "react";
import { useCustomFonts } from "../assets/fonts/fontDeclarations";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import { Image, Button } from 'react-native-ui-lib';
import { FontAwesome } from '@expo/vector-icons';

const height = Dimensions.get("window").height * 0.9;
export default function PrivacySetupPage({ navigation }) {
    useCustomFonts();

    const [isPrivate, setPrivate] = useState(false);

    const handlePrivate = () => {
        setPrivate(true)
        navigation.navigate("SetGoals")

    }
    const handlePublic = () => {
        setPrivate(false)
        navigation.navigate("SetGoals")
    }
    useEffect(() => console.log("Private: ", isPrivate), [isPrivate]);
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/img/privacy_header.png')}
                style={styles.topRightSplash}
            />
            <View style={styles.content}>
                <Text style={styles.title}>
                    {'Privacy Status'}
                </Text>
                <View style={styles.buttonsContainer}>
                    <Button
                        label="Private"
                        backgroundColor="#498C68"
                        color="black"
                        borderRadius={5}
                        style={styles.button}
                        labelStyle={{
                            fontFamily: "Poppins-SemiBold",
                            fontSize: 25,
                            color: "white",
                            textAlign: "center",
                            flex: 1,
                            flexDirection: "column",
                            paddingVertical: 10,
                        }}
                        iconSource={() => <FontAwesome name="lock" size={45} color="white" />}
                        onPress={handlePrivate}
                    />
                    <Text style={styles.subtext}>
                        {"In private mode, no one can see the progress on your habit."}
                    </Text>
                    <Button
                        label="Public"
                        backgroundColor="#AFC689"
                        color="black"
                        borderRadius={5}
                        style={styles.button}
                        labelStyle={{
                            fontFamily: "Poppins-SemiBold",
                            fontSize: 25,
                            color: "white",
                            textAlign: "center",
                            flex: 1,
                            flexDirection: "column",
                            paddingVertical: 10,
                        }}
                        iconSource={() => <FontAwesome name="users" size={45} color="white" />}
                        onPress={handlePublic}
                    />
                    <Text style={styles.subtext}>
                        {"In public mode, all friends who post will see your progress on your chosen habit."}
                    </Text>
                </View>
            </View>
            <Image
                source={require('../assets/img/privacy_footer.png')}
                style={styles.bottomLeftSplash}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#FFFFFF",
        width: "100%",
    },
    content: {
        width: "80%",
        alignItems: "center",
    },
    topRightSplash: {
        position: "absolute",
        top: 0,
        right: 0,
        width: "70%",
        height: "20.5%",
        resizeMode: "contain"
    },
    bottomLeftSplash: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "70%",
        height: "20.5%",
        resizeMode: "contain"
    },
    buttonsContainer: {
        width: "100%",
        marginBottom: 30
    },
    button: {
        marginBottom: 10,
        height: height * 0.13,
        flexDirection: 'row',
        alignItems: 'center'
    },
    signUp: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    title: {
        fontSize: height / 20,
        textAlign: "center",
        color: "black",
        fontFamily: 'Poppins-Bold',
        marginBottom: 50
    },
    subtext: {
        fontSize: 12,
        textAlign: "left",
        color: "black",
        fontFamily: 'Poppins-Regular',
        marginBottom: 5
    }
});
