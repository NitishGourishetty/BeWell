import * as React from 'react';
import { useState } from 'react';
import { Dimensions, SafeAreaView, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import { TextField } from "react-native-ui-lib"
import { useCustomFonts } from "../../assets/fonts/fontDeclarations";
import { AntDesign } from '@expo/vector-icons';
import KeyboardAvoidingContainer from '../../assets/components/KeyboardAvoidingContainer';

const height = Dimensions.get("window").height * 0.9;

export default function GoalSetupPage({ route, navigation }) {
    useCustomFonts();
    const [goalName, setGoalName] = useState(null);
    //Pass the Session into this next time
    async function handlePress() {
        //addHabit(session, goalName)
        navigation.navigate("TimePage", {habitInfo: goalName})
    }
    return (
        <KeyboardAvoidingContainer>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>
                    {'What goal do you \n want to reach?'}
                </Text>
                <View style={styles.content}>
                    <Text style={styles.subtitle}>
                        {'Name'}
                    </Text>
                    <TextField
                        color="#80828C"
                        containerStyle={styles.textField}
                        placeholder={'E.g. Sleep before 1 AM'}
                        selectionColor="#AFC689"
                        enableErrors
                        validate={['required', (value) => value.length > 6]}
                        validationMessage={['Field is required', 'Password is too short']}
                        onChangeText={(text) => setGoalName(text)}
                    />
                    <TouchableOpacity style={styles.arrow} onPress={handlePress}>
                        <AntDesign name="arrowright" size={45} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingContainer>
    )
};

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
    title: {
        fontSize: height / 20,
        textAlign: "center",
        color: "#498C68",
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 50
    },
    subtitle: {
        fontSize: height / 30,
        textAlign: "center",
        color: "black",
        fontFamily: 'Poppins-SemiBold',
        alignSelf: "flex-start"
    },
    arrow: {
        alignSelf: 'flex-end',
        marginTop: 50
    },
    textField: {
        marginBottom: 15,
        backgroundColor: "#F1F3F6",
        borderRadius: 10,
        paddingLeft: 20,
        paddingTop: 20,
        width: "100%"
    }
});
