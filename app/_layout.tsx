import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import './globals.css';

export default function TabsLayout() {
    return (
        <>
            <Stack>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </>
    );
}
