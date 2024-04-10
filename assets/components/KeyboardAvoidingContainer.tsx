import * as React from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';

export default function KeyboardAvoidingContainer({children}){
    return(
        <SafeAreaView style={{flex:1}}>
            <KeyboardAvoidingView style={{ flex : 1, marginVertical: -20}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                {children}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}