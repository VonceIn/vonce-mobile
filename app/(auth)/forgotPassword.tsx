import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import InputText from '@/components/InputText';
import Button from '@/components/Button';

const forgotPassword = () => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className='flex-1 w-full bg-primary items-center justify-start px-4 pt-10 gap-4'>
                <Text className='font-[700] text-[24px] w-[300px] text-center'>
                    Enter Your Email
                </Text>

                <InputText 
                    placeholder='Email' 
                    className='w-full h-[56px] border-0 bg-[#F5F0F0]' 
                    placeholderClassName='font-[400] text-[16px] text-[#8C5E5E]' 
                    placeholderTextColor='#8C5E5E' 
                />

                <Button text='Send Reset Link' textClassName='font-[700] text-[16px]' />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default forgotPassword;