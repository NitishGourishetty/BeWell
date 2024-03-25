import React from "react";
import { View, Text, Button } from 'react-native-ui-lib'
import { ScrollView, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCustomFonts } from "../../assets/fonts/fontDeclarations";
import { Ionicons } from '@expo/vector-icons'
export default function FriendsEntry() {
    useCustomFonts();
    return (

        <View style={{ flexDirection: "row", justifyContent: "space-evenly", height: 70, width: '100%', marginVertical: 10 }}>
            <Image source={{ uri: "https://assets-prd.ignimgs.com/2024/03/05/austin-butler-kiss-1709636975059.jpg" }} style={{ height: '100%', width: 70, borderRadius: 200 }} />
            <View >
                <Text style={styles.name}>
                    Abhinav Tata
                </Text>
                <Text style={styles.username}>
                    @TATATATATATAT
                </Text>
            </View>
            <Button style={{ height: '50%', backgroundColor: "#AFC689" }}>
                <Ionicons name="person-add" size={17} />
            </Button>
        </View>

    )

}
const styles = StyleSheet.create({
    name: {
        fontFamily: "Poppins-Bold",
        fontSize: 16
    },
    add: {
        fontFamily: "Poppins-Regular",
        color: '#80828C',
    },
    username: {
        fontFamily: 'Poppins-Regular',
        color: '#498C68',
        fontSize: 14
    }
})