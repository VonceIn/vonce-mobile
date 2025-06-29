import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function TabsLayout() {

    return (
        <>
            <StatusBar barStyle='dark-content' />
            <Stack>
                <Stack.Screen name="home/index" options={{ headerShown: false }} />
            </Stack>
        </>
    );
}
