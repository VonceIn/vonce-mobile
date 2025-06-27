import { TextInput } from "react-native";

interface Props {
    onPress?: () => void;
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void
}

export default function InputText({ onPress, placeholder, value, onChangeText }: Props) {

    return (
        <TextInput 
            className='border border-secondary px-5 h-[50px] rounded-2xl text-[16px]' 
            onPress={onPress}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor='rgba(0,0,0,0.4)'
        />
    );
}
