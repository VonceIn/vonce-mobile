import { TextInput, TextInputProps } from "react-native";
import { cn } from "@/lib/utils";

interface Props extends TextInputProps {
    onPress?: () => void;
    placeholder: string;
    value?: string;
    defaultValue?: string;
    onChangeText?: (text: string) => void;
    className? :string;
    placeholderClassName? :string;
    placeholderTextColor?: string;
}

export default function InputText({ onPress, placeholder, value, onChangeText, className, placeholderClassName, placeholderTextColor, defaultValue, ...rest }: Props) {

    return (
        <TextInput 
            className={cn('border border-secondary px-5 h-[50px] rounded-2xl text-[16px]', className)} 
            onPress={onPress}
            placeholder={placeholder}
            placeholderClassName={placeholderClassName}
            value={value}
            defaultValue={defaultValue}
            onChangeText={onChangeText}
            placeholderTextColor={placeholderTextColor ?? 'rgba(0,0,0,0.4)'}
            {...rest}
        />
    );
}
