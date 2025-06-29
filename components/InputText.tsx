import { TextInput } from "react-native";
import clsx from "clsx";

interface Props {
    onPress?: () => void;
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    className? :string;
    placeholderClassName? :string;
    placeholderTextColor?: string;
}

export default function InputText({ onPress, placeholder, value, onChangeText, className, placeholderClassName, placeholderTextColor }: Props) {

    return (
        <TextInput 
            className={clsx('border border-secondary px-5 h-[50px] rounded-2xl text-[16px]', className)} 
            onPress={onPress}
            placeholder={placeholder}
            placeholderClassName={placeholderClassName}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={placeholderTextColor ?? 'rgba(0,0,0,0.4)'}
        />
    );
}
