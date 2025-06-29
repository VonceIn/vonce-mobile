import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import './globals.css';

export default function TabsLayout() {
    const session = false;

    return (
        <>
            <Stack>
                <Stack.Protected guard={session}>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack.Protected>
                <Stack.Protected guard={!session}>
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                </Stack.Protected>
            </Stack>
        </>
    );
}
