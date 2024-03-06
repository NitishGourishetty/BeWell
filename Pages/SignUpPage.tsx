import React from "react";
import { View, Pressable } from "react-native";
import { Text, TextField } from 'react-native-ui-lib'
import { Dimensions } from "react-native" 

export default function SignUpPage(){
    const width = Dimensions.get("window").width * 0.9;
    const height = Dimensions.get("window").height * 0.9;
    return(
        <View style={{flex : 1, alignItems : "center", justifyContent : "center", position : "absolute"}}>
            <Text style={{fontSize : height/10, position : "absolute", bottom : height/3, textAlign : "center", color : "#498C68", fontFamily : "Helvetica", width : width}}>
                Sign Up
            </Text>
            <View style={{}}>
                <TextField
                color="#498C68"
                containerStyle={{width : width / 2, borderBottomColor: '#AFC689', borderBottomWidth: 1, height : height / 17}}
                fieldStyle={{}}
                placeholder={'username'}
                floatingPlaceholderColor="#AFC689"
                floatingPlaceholder
                // onChangeText={}
                enableErrors
                validate={['required', (value) => value.length > 6]}
                // useful code: validate={['required', 'email', (value) => value.length > 6]}
                validationMessage={['Field is required', 'Password is too short']}
                // showCharCounter
                // maxLength={30}
                underlineColorAndroid="#AFC689"
            />
            </View>


            <View style={{}}>
                <TextField
                color="#498C68"
                containerStyle={{width : width / 2, borderBottomColor: '#AFC689', borderBottomWidth: 1, height : height / 17}}
                fieldStyle={{}}
                placeholder={'password'}
                floatingPlaceholderColor="#AFC689"
                floatingPlaceholder
                // onChangeText={}
                enableErrors
                validate={['required', (value) => value.length > 6]}
                // useful code: validate={['required', 'email', (value) => value.length > 6]}
                validationMessage={['Field is required', 'Password is too short']}
                // showCharCounter
                // maxLength={30}
            />
            </View>
        </View>

        // password
    )
}
