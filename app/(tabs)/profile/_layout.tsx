import { Stack } from 'expo-router';

export default function ProfileLayout() {
    return (
        <Stack>
            <Stack.Screen 
                name="index" 
                options={{ 
                    title: 'Profile',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#fff7eb'
                    },
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        fontWeight: 700,
                        fontSize: 18,
                        fontFamily: 'fontFam-Jakarta700'
                    },
                }} 
            />

            <Stack.Screen 
                name="profileSetup" 
                options={{ 
                    title: 'Profile Setup',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#fff7eb'
                    },
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        fontWeight: 700,
                        fontSize: 18,
                        fontFamily: 'fontFam-Jakarta700'
                    }
                }}
            />
        </Stack>
    );
}