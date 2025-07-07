import {  Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
    onPress?: () => void;
    text?: string;
    textClassName?: string;
    buttonClassName?: string;
    disabled?: boolean;
    children?: React.ReactNode;
}

export default function Button({ 
    onPress, 
    text, 
    textClassName, 
    buttonClassName, 
    disabled,
    children
}: Props) {

    return (
        <TouchableOpacity 
            className={cn('bg-secondary w-full h-[50px] items-center justify-center rounded-full disabled:opacity-50', buttonClassName)}
            onPress={onPress}
            disabled={disabled}
        >
            {text && (
                <Text 
                    className={cn(
                        'text-primary text-[18px] text-center',textClassName
                    )}
                >
                    {text}
                </Text>
            )}
            {children}
        </TouchableOpacity>
    );
}
