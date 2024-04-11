import * as React from "react";
import { useCustomFonts } from "../../assets/fonts/fontDeclarations";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text, TextField } from 'react-native-ui-lib';
import { Dimensions, TouchableOpacity } from "react-native";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import KeyboardAvoidingContainer from '../../assets/components/KeyboardAvoidingContainer';


const height = Dimensions.get("window").height * 0.9;
export default function NamePage({ navigation }) {
    useCustomFonts();
    return (
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
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("Profile Picture") }}>
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