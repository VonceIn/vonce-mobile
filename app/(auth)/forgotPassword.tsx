import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import InputText from '@/components/InputText';
import Button from '@/components/Button';

const forgotPassword = () => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className='flex-1 w-full bg-primary items-center justify-start px-4 pt-10 gap-4'>
                <Text className='text-[24px] w-[300px] text-center fontFam-Jakarta700'>
                    Enter your Email
                </Text>

                <InputText 
                    placeholder='Email' 
                    className='w-full h-[56px] border-0 bg-[#F5F0F0]' 
                    placeholderClassName='text-[16px] text-[#8C5E5E] fontFam-Jakarta400' 
                    placeholderTextColor='#8C5E5E' 
                />

                <Button text='Send Reset Link' textClassName='text-[16px] fontFam-Jakarta700' />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default forgotPassword;