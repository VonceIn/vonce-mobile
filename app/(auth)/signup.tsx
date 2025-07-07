import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import InputText from '@/components/InputText';
import Button from '@/components/Button';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { isAuthenticatedAtom } from '@/atoms/atoms';
import { useAtom } from 'jotai';

export default function signup() {
    const router = useRouter();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

    const signUpWithEmail = async () => {
        setLoading(true);

        const {
            data: { user, session },
            error
        } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            Alert.alert(error.message);
            setLoading(false);
            return;
        }

        if (!session) {
            Alert.alert('Please check your inbox for email verification!');
            setLoading(false);
        } else {
            Alert.alert('Welcome to Vonce!');
            setIsAuthenticated(true);
        }

        const { error: profileError } = await supabase
            .from('profiles')
            .insert({
                id: user!.id,
                full_name: fullName,
                email,
                username,
                avatar: 'default',
                updated_at: new Date().toISOString()
            });

        if (profileError) {
            Alert.alert(profileError.message);
            console.log(profileError);
        }

        setLoading(false);
    }

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
                    <InputText 
                        placeholder='Full Name' 
                        className='fontFam-Ubuntu400' 
                        onChangeText={setFullName} 
                        value={fullName} 
                    />

                    <InputText 
                        placeholder='Email' 
                        className='fontFam-Ubuntu400' 
                        onChangeText={setEmail} 
                        value={email} 
                    />

                    <InputText 
                        placeholder='Username' 
                        className='fontFam-Ubuntu400' 
                        onChangeText={setUsername} 
                        value={username} 
                    />

                    <InputText 
                        placeholder='Password' 
                        className='fontFam-Ubuntu400' 
                        onChangeText={setPassword} 
                        value={password} 
                    />

                    <Button text='Sign Up' textClassName='fontFam-Ubuntu500' onPress={signUpWithEmail} disabled={loading} />
                </View>

                <View className='w-[220px] items-center justify-center h-max mt-20'>
                    <Text className='text-center fontFam-Ubuntu300 text-[#909090] text-[12px]'>
                        By signing up you agree to our <Text className='text-[#909090] fontFam-Ubuntu500'>Terms</Text>, <Text className='text-[#909090] fontFam-Ubuntu500'>Data Policy</Text> and <Text className='text-[#909090] fontFam-Ubuntu500'>Cookies Policy</Text>.
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
