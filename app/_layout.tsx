import { Stack } from "expo-router";
import { SplashScreen } from "expo-router";
import './globals.css';
import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { isAuthenticatedAtom, sessionProcessedAtom, userProfileAtom } from "@/atoms/atoms";

import Debug from "@/components/Debug";
import { useFontsLoader } from "@/hooks/useFontsLoader";
import useSupabaseSession from "@/hooks/useSupabaseSession";

export default function TabsLayout() {
    SplashScreen.preventAutoHideAsync();

    const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
    const sessionProcessed = useAtomValue(sessionProcessedAtom);
    const profile = useAtomValue(userProfileAtom);

    const { loaded: fontsLoaded } = useFontsLoader();

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    useSupabaseSession();

    // useEffect(() => {
    //     const handleDeepLink = async (url: string) => {
    //         console.log("🔗 Received URL:", url);
    //         const { queryParams } = Linking.parse(url);
    //         const access_token = queryParams?.access_token;
    //         const refresh_token = queryParams?.refresh_token;

    //         if (access_token && refresh_token) {
    //             const { error } = await supabase.auth.setSession({
    //                 access_token,
    //                 refresh_token
    //             });
    //             setIsAuthenticated(true);

    //             if (error) {
    //                 console.error('Error restoring session:', error.message);
    //             } else {
    //                 console.log('✅ User signed in via deep link');
    //             }
    //         }
    //     };

    //     const checkInitialUrl = async () => {
    //             const initialUrl = await Linking.getInitialURL();
    //             if (initialUrl) {
    //             handleDeepLink(initialUrl);
    //         }
    //     };

    //     checkInitialUrl(); // Handles app opened from cold start

    //     const subscription = Linking.addEventListener('url', (event) => {
    //         handleDeepLink(event.url); // Handles app already open
    //     });

    //     return () => subscription.remove();
    // }, []);

    if (!fontsLoaded || !sessionProcessed) return null;

    return (
        <>
            <Stack>
                <Stack.Protected guard={isAuthenticated}>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack.Protected>

                <Stack.Protected guard={!isAuthenticated}>
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                </Stack.Protected>
            </Stack>

            <Debug />
        </>
    );
}
