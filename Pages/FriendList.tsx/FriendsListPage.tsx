import React from "react-native";
import {SafeAreaView, Pressable,ScrollView, StyleSheet } from "react-native";
import {TextField, Text, View} from "react-native-ui-lib"
import { useWindowDimensions } from "react-native";
import FriendEntry from "./FriendListComponents/FriendsEntry";



export default function FriendsListPage(){
    return(
       
        <SafeAreaView style = {{marginTop: 8}}>
            
            <TextField placeholder={'Search Friends'} enableErrors style={{backgroundColor:'grey'}}/>
           
            <View>
                <FriendEntry/>
            </View>
        </SafeAreaView>
    )
}