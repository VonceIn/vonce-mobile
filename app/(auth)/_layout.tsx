import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function AuthLayout() {
    return (
        <>
            <StatusBar barStyle='dark-content' />
            <Stack>
                <Stack.Screen name="login" options={{ 
                        headerShown: false,
                        title: 'Login'
                    }} 
                />
                <Stack.Screen name="signup" options={{ 
                        headerShown: false,
                        title: 'Sign Up'
                    }} 
                />
                <Stack.Screen 
                    name="forgotPassword" 
                    options={{
                        title: 'Forgot Password',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#fff7eb'
                        },
                        headerShadowVisible: false,
                        headerTitleStyle: {
                            fontWeight: 'bold', // or 'normal', '600', etc.
                            fontSize: 18,
                        },
                    }} 
                />
            </Stack>
        </>
    );
}