import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Image, View, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { useCustomFonts } from "../assets/fonts/fontDeclarations";

export default function ProfilePicturePage(){
    useCustomFonts();
    const [imageSource, setImageSource] = useState(null);
    const openImagePicker = () => {
        ImagePicker.launchImageLibrary({ mediaType : "photo"}, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('Image picker error: ', response.errorMessage);
          } else {
            let imageUri = response.assets?.[0]?.uri;
            setImageSource(imageUri);
          }
        });
      };
        return (
            <View style={styles.container}>
                {imageSource && (
                    <Image source={{ uri: imageSource }} style={styles.image} resizeMode="cover" />
                )}
                <Button title="Select Image" onPress={openImagePicker} color="#AFC689"/>
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