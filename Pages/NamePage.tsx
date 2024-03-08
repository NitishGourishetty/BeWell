import React from "react";
import { ScrollView, View, Pressable } from "react-native";
import { Image, Text, TextField } from 'react-native-ui-lib';
import { Dimensions } from "react-native";
import { useFonts } from "expo-font";
import { MARGIN_KEY_PATTERN } from "react-native-ui-lib/src/commons/modifiers";

export default function SignUpPage(){
    const width = Dimensions.get("window").width * 0.9;
    const height = Dimensions.get("window").height * 0.9;
    const [fontsLoaded, fontError] = useFonts({
        'proxima-nova-regular': require('../assets/fonts/proxima-nova/proxima-nova-regular.otf'),
        'proxima-nova-bold' : require('../assets/fonts/proxima-nova/proxima-nova-bold.otf'),
        'proxima-nova-semibold' : require('../assets/fonts/proxima-nova/proxima-nova-semibold.otf')
    });

    return(
        <ScrollView contentContainerStyle={{flex : 1, alignItems : "center", justifyContent : "center", backgroundColor : "E6D6B8"}}>
            <Text style={{fontSize : height/20, textAlign : "center", color : "#498C68", fontFamily : 'proxima-nova-semibold', marginBottom : 50}}>
                {'What should \n we call you?'}
            </Text>
            {/* <Image 
                source={require('../assets/img/sign-up.png')}
                style={{resizeMode : "center"}}
            /> */}
            <View style={{width: width * 0.8}}>
                <TextField
                    color="#498C68"
                    containerStyle={{borderBottomColor: '#AFC689', borderBottomWidth: 1}}
                    placeholder={'username'}
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
                    containerStyle={{borderBottomColor: '#AFC689', borderBottomWidth: 1}}
                    placeholder={'password'}
                    floatingPlaceholderColor="#AFC689"
                    floatingPlaceholder
                    enableErrors
                    validate={['required', (value) => value.length > 6]}
                    validationMessage={['Field is required', 'Password is too short']}
                    underlineColorAndroid="#AFC689"
                />
            </View>
        </ScrollView>
    )
}
