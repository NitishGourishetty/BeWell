import * as React from 'react';
import { useState } from 'react';
import { Dimensions, Image, ScrollView, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { useCustomFonts } from "../assets/fonts/fontDeclarations";
import { FontAwesome, AntDesign } from '@expo/vector-icons';

const height = Dimensions.get("window").height * 0.9;

export default function ProfilePicturePage({ navigation }) {
    useCustomFonts();
    const [imageSource, setImageSource] = useState(null);
    const handlePress = () => {
        setImageSource(null);
        navigation.navigate("SetGoals")
    }
    const openImagePicker = async () => {
        let result = await launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        })
        if (!result.canceled) {
            setImageSource(result.assets?.[0]?.uri);
        } else {
            alert('You did not select any image.');
        }
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                {'Add a Profile \n Picture'}
            </Text>
            <View style={styles.content}>
                <TouchableOpacity onPress={openImagePicker}>
                    {imageSource ? (
                        <Image
                            source={{ uri: imageSource }}
                            style={{ width: 200, height: 200, borderRadius: 100 }}
                        />
                    ) : (
                        <FontAwesome name="user-circle" size={200} color="black" />
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrow} onPress={handlePress}>
                    <AntDesign name="arrowright" size={45} />
                </TouchableOpacity>
            </View>
        </ScrollView>
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
