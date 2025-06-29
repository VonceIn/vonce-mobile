import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react'
import InputText from '@/components/InputText';
import Button from '@/components/Button';
import { Link } from 'expo-router';

export default function Login() {

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className='flex-1 w-full bg-primary items-center justify-center px-4'>
                        <Image 
                            source={require('../../assets/images/vonce_logo_secondary.png')} 
                            className='w-[130px] h-[130px] mb-[120px]'
                            resizeMode="contain"
                        />

                        <View className='w-full gap-6 mb-20'>
                            <InputText placeholder='Email' />

                            <InputText placeholder='Password' />

                            <Button text='Log In' />

                            <Link asChild href='/(auth)/forgotPassword'>
                                <Button 
                                    buttonClassName='bg-transparent' 
                                    textClassName='text-secondary font-[500] font-ubuntu text-[18px]' text='Forgot Password?' 
                                />
                            </Link>
                        </View>

                        <View className='w-[240px] items-center justify-center'>
                            <Link asChild href='/(auth)/signup'>
                                <Button 
                                    buttonClassName='border-[3px] border-secondary w-[240px] h-[50px] items-center justify-center rounded-full bg-transparent' 
                                    textClassName='text-secondary font-ubuntu font-bold text-[18px]' 
                                    text='Create an account' 
                                />
                            </Link>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
    );
}
