import React from "react";
import { View, Text } from 'react-native-ui-lib'
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FriendsEntry from "./FriendsEntry";

export default function FriendsListPage() {

    return (

        <ScrollView style={{ height: "100%", width: '100%', paddingTop: 8 }}>
            <FriendsEntry />
            <FriendsEntry />
            <FriendsEntry />
            <FriendsEntry />
        </ScrollView>

    )
}