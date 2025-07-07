import { View, Text, Image, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import React, { useState } from 'react';
import Button from '@/components/Button';
import InputText from '@/components/InputText';
import { supabase } from '@/lib/supabase';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import { userProfileAtom } from '@/atoms/atoms';

const ProfileSetup = () => {
    const [profile, setProfile] = useAtom(userProfileAtom);
    if (!profile) return null;

    const router = useRouter();
    const [fullName, setFullName] = useState(profile.full_name);
    const [bio, setBio] = useState(profile.bio ?? '');
    const [profilePhotoUri, setProfilePhotoUri] = useState(profile.avatar);

    const uploadProfilePhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (result.canceled) {
            return;
        }

        setProfilePhotoUri(result.assets[0].uri);
    }

    const updateProfile = async () => {
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
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className='bg-primary size-full gap-6 px-5 pt-8'>
                <View className='items-center w-full gap-4'>
                    {profilePhotoUri === 'default' ? (
                        <Image 
                            source={require('../../../assets/images/default_profile_male.png')}
                            resizeMode="contain"
                            className="w-[128px] h-[128px] rounded-full"
                        />
                    ) : (
                        <Image 
                            source={{ uri: profilePhotoUri }}
                            resizeMode="contain"
                            className="w-[128px] h-[128px] rounded-full"
                        />
                    )}

                    <View className='items-center'>
                        {profilePhotoUri === 'default' && (
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