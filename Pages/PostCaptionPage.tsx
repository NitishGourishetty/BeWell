import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, Image, ScrollView, View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { useCustomFonts } from "../assets/fonts/fontDeclarations";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import KeyboardAvoidingContainer from '../assets/components/KeyboardAvoidingContainer';

const height = Dimensions.get("window").height * 0.9;
export default function PostCaptionPage({ navigation }) {
    useCustomFonts();
    const [imageSource, setImageSource] = useState(null);
    useEffect(()=>console.log("Image Source:", imageSource), [imageSource]);
    const handlePress = () => {
        if(imageSource == null){
            Alert.alert(
                "Confirmation",
                `Are you sure you don't want to pick a profile picture?`,
                [
                    {text: 'Yes', onPress: () => navigation.navigate("MainTabs") , isPreferred : true},
                    {text: 'No', onPress: () => console.log('Canceled'), style: 'cancel'},
                ]
            )
        }
        else{
            setImageSource(null);
                }
    }
    const openImagePicker = async () => {
        let result = await launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            aspect : [16, 9]
        })
        if (!result.canceled) {
            setImageSource(result.assets?.[0]?.uri);
        } else {
            alert('You did not select any image.');
        }
    }
    return (
        <KeyboardAvoidingContainer>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>
                    {'Add a Post'}
                </Text>
                <View style={styles.content}>
                    <TouchableOpacity onPress={openImagePicker}>
                        {imageSource ? (
                            <Image
                                source={{ uri: imageSource }}
                                style={{ width: "100%" }}
                            />
                        ) : (
                            <FontAwesome name="camera" size={200} color="black" />
                        )}
                    </TouchableOpacity>
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
    button: {
        borderBottomColor: '#AFC689',
        borderBottomWidth: 1,
        marginBottom: 20
    },
    arrow: {
        alignSelf: 'flex-end',
        marginTop: 50
    }
});