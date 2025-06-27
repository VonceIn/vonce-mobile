import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import InputText from '@/components/InputText';
import Button from '@/components/Button';
import { AntDesign } from '@expo/vector-icons';

export default function login() {
    const router = useRouter();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className='flex-1 w-full bg-primary items-center justify-center px-4'>
                <TouchableOpacity className='absolute top-14 right-4' onPress={() => router.back()}>
                    <AntDesign name="close" size={35} color="#170F0F" />
                </TouchableOpacity>

                <Image 
                    source={require('../../assets/images/vonce_logo_mail.png')} 
                    className='w-[220px] h-[220px] mt-[-60px]'
                    resizeMode="contain"
                />

                <View className='w-full gap-6 mb-20'>
                    <InputText placeholder='Full Name' />

                    <InputText placeholder='Email' />

                    <InputText placeholder='Username' />

                    <InputText placeholder='Password' />

                    <Button text='Log In' />
                </View>

                <View className='w-[220px] items-center justify-center h-max mt-20'>
                    <Text className='text-center font-radnika text-[#909090] text-[12px]'>
                        By signing up you agree to our <Text className='text-[#909090] font-bold'>Terms</Text>, <Text className='text-[#909090] font-bold'>Data Policy</Text> and <Text className='text-[#909090] font-bold'>Cookies Policy</Text>.
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
