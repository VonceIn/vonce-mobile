import { View, Text, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { sampleMessages } from '@/utils/sampleMessagesData';
import ChatMessage from '@/components/ChatMessage';
import { ChatMessageType, matchAtom, otherProfileAtom, userProfileAtom } from '@/atoms/atoms';
import { useAtomValue } from 'jotai';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import InputText from '@/components/InputText';
import uuid from 'react-native-uuid';

const ChatsScreen = () => {
    const profile = useAtomValue(userProfileAtom);
    const otherProfile = useAtomValue(otherProfileAtom);
    const match = useAtomValue(matchAtom);
    const [messages, setMessages] = useState<ChatMessageType[]>(sampleMessages);
    const [currentMessage, setCurrentMessage] = useState('');
    const flatListRef = useRef<FlatList>(null);
    const [inputHeight, setInputHeight] = useState(50);

    // useEffect(() => {
    //     if (messages.length && flatListRef.current) {
    //         setTimeout(() => {
    //             flatListRef.current?.scrollToIndex({
    //             index: 0,
    //             animated: true,
    //             });
    //         }, 100);
    //     }
    // }, [messages]);

    const addMessage = () => {
        if (!currentMessage.trim()) {
            return;
        }

        const newMsg: ChatMessageType = {
            id: uuid.v4(),
            match_id: match!.id,
            sender_id: profile!.id,
            content: currentMessage.trim(),
            created_at: new Date().toISOString()
        }

        setMessages(prev => [newMsg, ...prev]);
        setCurrentMessage('');
    };

    // Function which return message's id
    const keyExtractor = (item: ChatMessageType) => item.id;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            // keyboardVerticalOffset={80}
        >
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
                    ref={flatListRef}
                    data={messages}
                    inverted
                    keyExtractor={keyExtractor}
                    renderItem={
                        ({ item }) => <ChatMessage 
                            message={item} 
                            myId={profile?.id === item.sender_id} 
                        />
                    }
                    contentContainerStyle={{
                        paddingHorizontal: 12,
                        paddingTop: 8,
                        paddingBottom: 12,
                        gap: 12
                    }}
                />

                <View className='w-full px-[12px] relative mb-2 flex-row'>
                    <InputText 
                        placeholder='Type a message...' 
                        className={`bg-light placeholder:text-brown placeholder:fontFam-Jakarta400 text-[16px] items-center h-[${inputHeight}px] max-h-[140px] py-[14px] flex-1`} 
                        multiline
                        // textAlignVertical='center'
                        value={currentMessage}
                        onChangeText={setCurrentMessage}
                        onContentSizeChange={(e) => {
                            const newHeight = e.nativeEvent.contentSize.height;
                            if (newHeight < 100) {
                                setInputHeight(newHeight);
                            } else {
                                setInputHeight(100);
                            }
                        }}
                    />

                    <View className='w-14 items-end justify-center'>
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
        </KeyboardAvoidingView>
    );
}

export default ChatsScreen;
