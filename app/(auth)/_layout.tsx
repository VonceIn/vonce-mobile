import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function AuthLayout() {
    return (
        <>
            <StatusBar barStyle='dark-content' />
            <Stack>
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="signup" options={{ headerShown: false }} />
            </Stack>
        </>
    );
}