import React, { useState, useEffect } from 'react';
import { Image, View, Button, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useCustomFonts } from "../assets/fonts/fontDeclarations";
import { PERMISSIONS, request } from 'react-native-permissions'

export default function ProfilePicturePage(){
    useCustomFonts();
    const [imageSource, setImageSource] = useState(null);
    // useEffect(() => {
    //     request(PERMISSIONS.IOS.MEDIA_LIBRARY); // Request permission on component mount
    // }, []);
    const selectImage = () => {
        console.log("start");
        launchImageLibrary({ mediaType : "photo"}, (response) => {
            console.log("fake success");
            if (!response.didCancel) {
                console.log("real success");
                setImageSource({ uri: response.assets[0].uri  });
            }
        });
        console.log("end");
    }
        return (
            <View style={styles.container}>
                {imageSource && (
                    <Image source={{ uri: imageSource }} style={styles.image} resizeMode="cover" />
                )}
                <Button title="Select Image" onPress={selectImage} color="#AFC689"/>
            </View>
        )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});