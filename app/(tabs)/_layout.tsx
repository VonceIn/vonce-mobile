import { Redirect, Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function TabsLayout() {
    const session = false;
    if (!session) return <Redirect href='/(auth)/login' />

    return (
        <>
            <StatusBar hidden />
            <Stack>
                <Stack.Screen name="home/index" options={{ headerShown: false }} />
            </Stack>
        </>
    );
}
