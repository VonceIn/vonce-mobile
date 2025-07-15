import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sampleMessages } from '@/utils/sampleMessagesData';
import ChatMessage from '@/components/ChatMessage';
import { ChatMessageType, matchAtom, otherProfileAtom, userProfileAtom } from '@/atoms/atoms';
import { useAtomValue } from 'jotai';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import InputText from '@/components/InputText';

const ChatsScreen = () => {
    const profile = useAtomValue(userProfileAtom);
    const otherProfile = useAtomValue(otherProfileAtom);
    const match = useAtomValue(matchAtom);
    const [messages, setMessages] = useState<ChatMessageType[]>(sampleMessages);
    const [currentMessage, setCurrentMessage] = useState('');

    const addMessage = () => {
        if (!currentMessage) {
            return;
        }

        const newMsg: ChatMessageType = {
            id: '123',
            match_id: match!.id,
            sender_id: profile!.id,
            content: currentMessage,
            created_at: new Date().toISOString()
        }

        setMessages(prev => [...prev, newMsg]);
        setCurrentMessage('');
    };

    // Function which return message's id
    const keyExtractor = (item: ChatMessageType) => item.id;

    return (
        <View className='bg-primary w-full h-full'>
            <View className='h-[50px] flex-row items-center gap-6 px-4 mt-10'>
                <Link asChild href='/(tabs)/(home)'>
                     <Ionicons name="arrow-back-outline" size={30} color="black" />
                </Link>

                <View>
                    <Text className='text-black  fontFam-Jakarta700  text-[18px]'>
                        {otherProfile?.full_name}
                    </Text>
                </View>

                {/* <View>
                    <Ionicons name="call-outline" size={24} color="black" />
                </View> */}
            </View>

            <FlatList
                data={messages}
                keyExtractor={keyExtractor}
                renderItem={
                    ({ item }) => <ChatMessage 
                        message={item} 
                        myId={profile?.id === item.sender_id} 
                    />
                }
                // inverted
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingTop: 8,
                    paddingBottom: 12,
                    gap: 16
                }}
            />

           <View className='w-full px-4 relative mb-2'>
                <InputText 
                    placeholder='Type a message...' 
                    className='border-0 bg-light placeholder:text-brown placeholder:fontFam-Jakarta400 text-[16px] items-center max-h-[100px]' 
                    // multiline
                    // textAlignVertical='center'
                    value={currentMessage}
                    onChangeText={setCurrentMessage}
                />

                <View className='absolute top-0 right-6 h-full w-12 items-center justify-center'>
                    <TouchableOpacity 
                        className='bg-secondary p-2 rounded-full'
                        onPress={addMessage}
                    >
                        <MaterialIcons 
                            name="send" 
                            size={24} 
                            color="#fff7eb" 
                        />
                    </TouchableOpacity>
                </View>
           </View>
        </View>
    );
}

export default ChatsScreen;
