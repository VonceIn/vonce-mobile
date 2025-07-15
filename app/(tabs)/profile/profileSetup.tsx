import { View, Text, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Button from '@/components/Button';
import InputText from '@/components/InputText';
import { supabase } from '@/lib/supabase';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import { userProfileAtom } from '@/atoms/atoms';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';

const ProfileSetup = () => {
    const [profile, setProfile] = useAtom(userProfileAtom);
    if (!profile) return null;

    const router = useRouter();
    const [fullName, setFullName] = useState(profile.full_name);
    const [bio, setBio] = useState(profile.bio ?? '');
    const [isUploading, setIsUploading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const uploadProfilePhoto = async () => {
        setIsUploading(true);

        // Letting user choose the image
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (result.canceled) {
            setIsUploading(false);
            return;
        }

        try {
            // Createing a blob and uploading to storage

            const photo = result.assets[0];

            const fileUri = photo.uri;
            const fileName = `${profile.id}`;
            const mimeType = photo.type ?? 'image/jpeg';

            const base64Data = await FileSystem.readAsStringAsync(fileUri, {
                encoding: FileSystem.EncodingType.Base64
            });

            const fileBuffer = Buffer.from(base64Data, 'base64');

            const { error: uploadProfilePhotoError } = await supabase.storage
                .from('avatars')
                .upload(fileName, fileBuffer, {
                    contentType: mimeType,
                    upsert: true,
                });

            if (uploadProfilePhotoError) {
                Alert.alert('Upload failed', uploadProfilePhotoError.message);
                return;
            }

            // Getting the publicUrl (permanent) and making a unique newAvatarUrl to avoid caching and storing newAvatarUrl in DB
            const { data: publicUrlData  } = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName);

            const profileUrlData = publicUrlData.publicUrl;
            const newAvatarUrl = `${profileUrlData}?t=${Date.now()}`;

            const { data, error: profileUrlUploadError } = await supabase
                .from('profiles')
                .update({ avatar: newAvatarUrl})
                .eq('id', profile.id)
                .select()
                .single();

            if (profileUrlUploadError) {
                Alert.alert('Error saving profile photo');
                return;
            }

            setProfile(data);
            Alert.alert('Success!', 'Profile photo updated.');
        } catch (e) {
            Alert.alert('Error', 'Something went wrong.');
            console.log(e);
        } finally {
            setIsUploading(false);
        }
    };

    const updateProfile = async () => {
        try {
            if (!fullName) {
                Alert.alert('Full Name Is Required!');
                return;
            }

            const { data, error } = await supabase
                .from('profiles')
                .update({
                    full_name: fullName,
                    bio
                })
                .eq('id', profile.id)
                .select()
                .single();

            if (error || !data) {
                Alert.alert('Unable To Update Profile, Please Try Again!');
                return;
            }

            setProfile(data);
            Alert.alert('Updated Profile Successfully!');

            router.back();
        } catch(e) {
            Alert.alert('Error', 'Something went wrong.');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className='bg-primary size-full gap-6 px-5 pt-8'>
                {isUploading && (
                    <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 items-center justify-center z-50">
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                )}

                {isModalVisible && (
                    <View className="absolute inset-0 bg-black/70 z-50 items-center justify-center">
                        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                            <View className="absolute inset-0" />
                        </TouchableWithoutFeedback>

                        <Button
                            buttonClassName="bg-transparent w-max absolute right-4 top-4"
                            textClassName="text-dark fontFam-Jakarta700 text-[16px]"
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Ionicons name="close" size={44} color="#ff5757" />
                        </Button>

                        <View className="p-4 rounded-lg">
                            <Image 
                                source={{ uri: profile.avatar }}
                                contentFit="contain"
                                style={{ width: 350, height: 350 }}
                            />
                        </View>
                    </View>
                )}

                <View className='items-center w-full gap-4'>
                    {profile.avatar === 'default' ? (
                        <Image 
                            source={require('../../../assets/images/default_profile_male.png')}
                            contentFit="contain"
                            style={{ width: 128, height: 128, borderRadius: 64 }}
                        />
                    ) : (
                        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                            <Image 
                                source={{ uri: profile.avatar }}
                                contentFit="contain"
                                style={{ width: 128, height: 128, borderRadius: 64 }}
                            />
                        </TouchableOpacity>
                    )}

                    <View className='items-center'>
                        {profile.avatar === 'default' && (
                            <Text className='text-dark fontFam-Jakarta700 text-[22px]'>
                                Add Profile Photo
                            </Text>
                        )}

                        <Text className='fontFam-Jakarta400 text-[16px] text-brown'>
                            Choose a photo that represents you.
                        </Text>
                    </View>
                </View>

                <View className='w-full gap-7'>
                    <Button
                        text="Upload Photo" 
                        buttonClassName="w-full h-[48px] bg-light" 
                        textClassName="text-[#1C0D0D] fontFam-Jakarta700 text-[16px]"
                        onPress={uploadProfilePhoto}
                    />

                    <InputText 
                        placeholder='Full Name' 
                        className='border-0 bg-light placeholder:text-brown placeholder:fontFam-Jakarta400 text-[16px]' 
                        value={fullName}
                        onChangeText={setFullName}
                    />

                    <InputText 
                        placeholder='Enter Your Bio' 
                        className='border-0 bg-light placeholder:text-brown placeholder:fontFam-Jakarta400 text-[16px] min-h-[144px]' 
                        multiline
                        textAlignVertical='top'
                        value={bio}
                        onChangeText={setBio}
                    />
                </View>

                <View className='w-screen absolute bottom-5 items-center px-5'>
                    <Button
                        buttonClassName='bg-light'
                        text='Save Profile'
                        textClassName='fontFam-Jakarta700 text-[16px] text-dark'
                        onPress={updateProfile}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default ProfileSetup;