import { View, Text } from 'react-native';
import React from 'react';
import { ChatMessageType } from '@/atoms/atoms';

const ChatMessage = ({ 
    message,
    myId
}: {
    message: ChatMessageType;
    myId: boolean
}) => {
    return (
        <View className='w-full h-max'>
            <View 
                className={`w-max max-w-[300px] rounded-[12px] h-max ${myId ? 'self-end bg-secondary' : 'self-start bg-[#F5F0F0]'} px-[16px] py-[12px]`}
            >
                <Text 
                    className={`text-wrap fontFam-Jakarta400 text-[16px] ${myId && 'text-primary'}`}
                >
                    {message.content}
                </Text>
            </View>
        </View>
    );
}

export default ChatMessage;
