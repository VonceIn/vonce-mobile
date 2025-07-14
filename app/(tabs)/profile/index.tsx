import { View, Text, Image } from 'react-native';
import React from 'react';
import Button from '@/components/Button';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { userProfileAtom } from '@/atoms/atoms';
import { useAtomValue } from 'jotai';
import { supabase } from '@/lib/supabase';

const ProfileScreen = () => {
    const profile = useAtomValue(userProfileAtom);
    if (!profile) return null;

    const year = new Date(profile.created_at).getFullYear();

    return (
        <View className='w-full h-full bg-primary px-[16px] pt-4'>
            <View className='items-center justify-center w-full h-max gap-[20px]'>
                {profile.avatar == 'default' ? (
                    <Image 
                        source={require('../../../assets/images/default_profile_male.png')}
                        resizeMode="contain"
                        className="w-[128px] h-[128px] rounded-full"
                    />
                ) : (
                    <Image 
                        source={{ uri: profile.avatar }}
                        resizeMode="contain"
                        className="w-[128px] h-[128px] rounded-full"
                    />
                )}

                <View className='items-center gap-1'>
                    <Text className='fontFam-Jakarta700 text-[22px] text-dark'>
                    {profile.full_name}
                    </Text>

                    <Text className='text-center fontFam-Jakarta400 text-[16px] text-[#856666]'>
                        {profile.bio}
                    </Text>

                    <Text className='text-center fontFam-Jakarta400 text-[16px] text-[#856666]'>
                        Vonce since {year}
                    </Text>
                </View>

                <Link asChild href='/profile/profileSetup'>
                    <Button 
                        text='Edit Profile'
                        buttonClassName='border-[1px] border-secondary h-[50px] items-center justify-center rounded-full bg-transparent' 
                        textClassName='text-secondary text-[18px] fontFam-Ubuntu700' 
                    />
                </Link>
            </View>

            <View>
                <View className='w-full p-[16px] gap-[10px]'>
                    <Text className='fontFam-Jakarta700 text-[18px]'>Settings</Text>

                    <Button
                        buttonClassName='bg-transparent flex-row justify-start rounded-none gap-[10px]'
                        textClassName='text-secondary text-[18px] fontFam-Ubuntu700' 
                    >
                        <View  className='bg-[#F5F2F2] size-[40px] items-center justify-center rounded-[8px]'>
                            <Feather name="settings" size={24} color="dark" />
                        </View>

                        <Text className='fontFam-Jakarta400 text-[16px] text-dark'>
                            Settings
                        </Text>
                    </Button>

                    <Button
                        buttonClassName='bg-transparent flex-row justify-start rounded-none gap-[10px]'
                        textClassName='text-secondary text-[18px] fontFam-Ubuntu700' 
                    >
                        <View  className='bg-[#F5F2F2] size-[40px] items-center justify-center rounded-[8px]'>
                            <AntDesign name="questioncircleo" size={24} color="dark" />
                        </View>

                        <Text className='fontFam-Jakarta400 text-[16px] text-dark'>
                            Contact Us
                        </Text>
                    </Button>

                    <Button
                        buttonClassName='bg-transparent flex-row justify-start rounded-none gap-[10px]'
                        textClassName='text-secondary text-[18px] fontFam-Ubuntu700' 
                    >
                        <View  className='bg-[#F5F2F2] size-[40px] items-center justify-center rounded-[8px]'>
                            <MaterialIcons name="feedback" size={24} color="dark" />
                        </View>

                        <Text className='fontFam-Jakarta400 text-[16px] text-dark'>
                            Feedback
                        </Text>
                    </Button>

                    <Button
                        buttonClassName='bg-transparent flex-row justify-start rounded-none gap-[10px]'
                        textClassName='text-secondary text-[18px] fontFam-Ubuntu700' 
                        onPress={async() => await supabase.auth.signOut()}
                    >
                        <View  className='bg-[#F5F2F2] size-[40px] items-center justify-center rounded-[8px]'>
                            <MaterialIcons name="logout" size={24} color="black" />
                        </View>

                        <Text className='fontFam-Jakarta400 text-[16px] text-dark'>
                            Sign Out
                        </Text>
                    </Button>
                </View>
            </View>
        </View>
    );
}

export default ProfileScreen;