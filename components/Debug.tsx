import { Text, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAtomValue } from 'jotai';
import { userIdAtom, userProfileAtom } from '@/atoms/atoms';
import { supabase } from '@/lib/supabase';
import { API_URL } from '@/utils/backendUrl';

const Debug = () => {
    const [visible, setVisible] = useState(false);
    const userId = useAtomValue(userIdAtom);
    const profile = useAtomValue(userProfileAtom);

    const logAsyncStorage = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const stores = await AsyncStorage.multiGet(keys);
            console.log('📦 AsyncStorage contents:');
            stores.forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
            });
        } catch (err) {
            console.error('❌ Error reading AsyncStorage:', err);
        }
    };

    const cleareAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('🧹 AsyncStorage cleared!');
        } catch (err) {
            console.error('❌ Error clearing AsyncStorage:', err);
        }
    };

    const testMatchUsersEdge = async () => {
        const res = await fetch(`${API_URL}/api/match-users-edge-test`);
        const json = await res.json();

        if (!res.ok) {
            console.error(json.error);
            console.log(json);
            return;
        }

        console.log(json);
    };

    return (
        <>
            <TouchableOpacity 
                className='absolute top-[120px] right-4 bg-green-400 rounded-xl p-2'
                onPress={() => setVisible(true)}
            >
                <Text className='text-blue-800'>
                    Debug
                </Text>
            </TouchableOpacity>

            <Modal
                animationType='slide'
                transparent={false}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <SafeAreaView className='items-center gap-4 pt-10'>
                    <TouchableOpacity onPress={() => setVisible(false)} className='bg-secondary p-4 rounded-xl'>
                        <Text className='text-primary'>Close</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={logAsyncStorage} className='bg-secondary p-4 rounded-xl'>
                        <Text className='text-primary'>Print Async Storage</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={cleareAsyncStorage} className='bg-secondary p-4 rounded-xl'>
                        <Text className='text-primary'>Clear Async Storage</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => console.log(userId)} className='bg-secondary p-4 rounded-xl'>
                        <Text className='text-primary'>Print Session User ID</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => console.log(profile)} className='bg-secondary p-4 rounded-xl'>
                        <Text className='text-primary'>Print Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={async() => await supabase.auth.signOut()} className='bg-secondary p-4 rounded-xl'>
                        <Text className='text-primary'>Sign Out</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={testMatchUsersEdge} className='bg-secondary p-4 rounded-xl'>
                        <Text className='text-primary'>Test Edge Function</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>
        </>
    );
}

export default Debug;
