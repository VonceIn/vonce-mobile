import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import clsx from 'clsx';

interface Props {
    onPress?: () => void;
    text?: string;
    textClassName?: string;
    buttonClassName?: string;
}

export default function Button({ onPress, text, textClassName, buttonClassName }: Props) {

    return (
        <TouchableOpacity 
            className={clsx('bg-secondary w-full h-[50px] items-center justify-center rounded-full', buttonClassName)} 
            onPress={onPress}
        >
            <Text 
                className={clsx(
                    'text-primary font-ubuntu font-bold text-[18px] text-center',textClassName
                )}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
}
