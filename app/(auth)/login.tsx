import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import React, { useState } from 'react'
import InputText from '@/components/InputText';
import Button from '@/components/Button';
import { Link } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function signInWithEmail() {
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className='flex-1 w-full bg-primary items-center justify-center px-4'>
                <Image 
                    source={require('../../assets/images/vonce_logo_secondary.png')} 
                    className='w-[130px] h-[130px] mb-[120px]'
                    resizeMode="contain"
                />

                <View className='w-full gap-6 mb-20'>
                    <InputText 
                        placeholder='Email' 
                        className='fontFam-Ubuntu400' 
                        onChangeText={setEmail} 
                        value={email} 
                    />

                    <InputText 
                        placeholder='Password' 
                        className='fontFam-Ubuntu400' 
                        onChangeText={setPassword} 
                        value={password} 
                    />

                    <Button text='Log In' textClassName='fontFam-Ubuntu500' onPress={signInWithEmail} disabled={loading} />

                    <Link asChild href='/(auth)/forgotPassword'>
                        <Button 
                            buttonClassName='bg-transparent' 
                            textClassName='text-secondary text-[18px] fontFam-Ubuntu500' text='Forgot Password?'
                            disabled={loading}
                        />
                    </Link>
                </View>

                <View className='w-[240px] items-center justify-center'>
                    <Link asChild href='/(auth)/signup'>
                        <Button 
                            buttonClassName='border-[3px] border-secondary w-[240px] h-[50px] items-center justify-center rounded-full bg-transparent' 
                            textClassName='text-secondary text-[18px] fontFam-Ubuntu700' 
                            text='Create an account'
                            disabled={loading}
                        />
                    </Link>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
