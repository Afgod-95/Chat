import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Ionicons from '@expo/vector-icons/Ionicons';

const UserProfile = () => {
    //profile image state 
    const [profile, setProfile] = useState('https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg')

    //image picker
    const handleImagePickerResult = async (result) => {
        if (!result.cancelled) {
            const imageUri = result.assets[0].uri;
            const fileInfo = await FileSystem.getInfoAsync(imageUri);
            if (fileInfo.exists && fileInfo.isDirectory === false) {
                setProfile(imageUri);
            } else {
                console.log('Selected image is not a file');
            }
        } else {
            console.log('Failed to setUserProfile');
        }
    };


    //select image from files 
    const pickImage = async () => {
        Alert.alert(
            'Select Image Source',
            'Choose the source of the image',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Camera',
                    onPress: async () => {
                        let result = await ImagePicker.launchCameraAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 1,
                        });

                        console.log(result)
                        handleImagePickerResult(result);
                    },
                },
                {
                    text: 'Gallery',
                    onPress: async () => {
                        let result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 1,
                        });

                        handleImagePickerResult(result);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.imageContainer}>
            <Image
                source={{
                    uri: profile
                }}
                style={styles.image}
            />
            <Pressable style={styles.camera} onPress={pickImage}>
                <Ionicons name="camera-outline" size={35} color="#fff" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
      width: 150,
      height: 150,
      position: 'relative',
  
    },
  
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 500,
    },
  
    camera: {
      width: 50,
      height: 50,
      flex: 1,
      backgroundColor: buttonColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 500,
      position: 'absolute',
      top: 100,
      right: 1,
    }
})

export default UserProfile