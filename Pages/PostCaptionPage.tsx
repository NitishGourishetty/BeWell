import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, Image, ScrollView, View, TouchableOpacity, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
import { launchCameraAsync, requestCameraPermissionsAsync } from 'expo-image-picker';
import { useCustomFonts } from "../assets/fonts/fontDeclarations";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import KeyboardAvoidingContainer from '../assets/components/KeyboardAvoidingContainer';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { addPost } from '../lib/backend';
import { TextField } from 'react-native-ui-lib';
const height = Dimensions.get("window").height * 0.9;

export default function PostCaptionPage({ navigation }) {
    useCustomFonts();
    const [imageSource, setImageSource] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const [habitData, setHabitData] = useState(null)
    const [caption, setCaptionData] = useState("");
  
  

    useEffect(() => {
        console.log("Image Source:", imageSource);
    }, [imageSource]);

    //Pass in next time
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])

    const handlePress = async () => {
        if (imageSource == null) {
            Alert.alert(
                "Confirmation",
                `Are you sure you don't want to upload a picture`,
                [
                    { text: 'Yes', onPress: () => navigation.navigate("MainTabs"), isPreferred: true },
                    { text: 'No', onPress: () => console.log('Canceled'), style: 'cancel' },
                ]
            );
        } else {
            // await saveImageToSupabase();
            saveImageUrl(imageSource)
            setImageSource(null);
            navigation.navigate("MainTabs");
        }
    };

    const openCamera = async () => {
        const { status } = await requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        let result = await launchCameraAsync({
            allowsEditing: true,
            quality: 1,
            aspect: [16, 9]
        });

        if (!result.canceled) {
            const imageUri = result.assets?.[0]?.uri || result.uri;
            setImageSource(imageUri);
        } else {
            alert('You did not take any image.');
        }
    };

    //Move to backend.ts -> Adding something to bucket -> Implement public URL stuff later
    // const saveImageToSupabase = async () => {
    //     alert("SAVING");
    //     if (!imageSource) {
    //         console.warn('No image source provided');
    //         return;
    //     }
    
    //     setUploading(true);
    
    //     try {
    //         const response = await fetch(imageSource);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch image from source');
    //         }
    
    //         const blob = await response.blob();
    //         const filename = imageSource.substring(imageSource.lastIndexOf('/') + 1);
    
    //         const { data, error } = await supabase
    //             .storage
    //             .from('avatars') // Bucket Name - avatars
    //             .upload(`public/${filename}`, imageSource, {
    //                 cacheControl: '3600',
    //                 upsert: false
    //             });
    
    //         if (error) {
    //             console.error('Error uploading image: ', error.message);
    //             throw new Error('Failed to upload image');
    //         }
    
    //         const { publicURL, error: urlError } = supabase
    //             .storage
    //             .from('avatars')
    //             .getPublicUrl(`public/${filename}`);
    
    //         if (urlError) {
    //             console.error('Error getting public URL: ', urlError.message);
    //             throw new Error('Failed to get public URL');
    //         }
    
    //         await saveImageUrl(publicURL);
    //     } catch (err) {
    //         console.error('Error in saveImageToSupabase: ', err.message);
    //     } finally {
    //         setUploading(false);
    //     }
    // };

    const saveImageUrl = async (url) => {
        await addPost(session, imageSource, caption, 1);
    };

    return (
        <KeyboardAvoidingContainer>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>
                    {'Add a Post'}
                </Text>
                <View style={styles.content}>
                    <TouchableOpacity onPress={openCamera}>
                        {uploading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : imageSource ? (
                            <Image
                                source={{ uri: imageSource }}
                                style={styles.image}
                            />
                        ) : (
                            <FontAwesome name="camera" size={200} color="black" />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.arrow} onPress={handlePress}>
                        <AntDesign name="arrowright" size={45} />
                    </TouchableOpacity>
                </View>

                <View style={styles.textFieldsContainer}>
                        <TextField
                            color="#498C68"
                            containerStyle={styles.textField}
                            placeholder={'caption'}
                            selectionColor="#AFC689"
                            floatingPlaceholderColor="#AFC689"
                            floatingPlaceholder
                            enableErrors
                            validate={['required', (value) => value.length > 6]}
                            validationMessage={['Field is required', 'Password is too short']}
                            underlineColorAndroid="#AFC689"
                            onChangeText={(text) => setCaptionData(text)}
                        />
                    </View>
            </ScrollView>

        </KeyboardAvoidingContainer>
    );
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
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10
    },
    textFieldsContainer: {
        width: "80%",
        marginBottom: 20,
    },
    textField: {
        borderBottomColor: '#AFC689',
        borderBottomWidth: 1,
        marginBottom: 20
    },
});
