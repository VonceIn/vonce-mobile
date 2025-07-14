import { tabIcons } from "@/utils/icons";
import { Tabs } from "expo-router";
import { Image, ImageBackground, ImageSourcePropType, StatusBar, View } from "react-native";

const TabIcon = ({
    focused,
    icon,
    iconFilled,
    title
}: {
    focused: boolean;
    icon: ImageSourcePropType;
    iconFilled: ImageSourcePropType
    title: string
}) => {
    const validIcon = focused ? iconFilled : icon;

    return (
        <View className="w-full h-full justify-center items-center">
            <Image
                source={validIcon} 
                style={{ 
                    width: 30, 
                    height: 30,
                }}
                resizeMode="contain" 
                tintColor='#FFF7EB'
            />
        </View>
    );
}

export default function TabsLayout() {

    return (
        <>
            <StatusBar barStyle='dark-content' />
            <Tabs
                screenOptions={{
                     tabBarShowLabel: false,
                     tabBarStyle: {
                        height: 65,
                        borderTopStartRadius: 18,
                        borderTopEndRadius: 18,
                        backgroundColor: '#FF5757'
                     },
                     tabBarItemStyle: {
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 13
                    },
                }}
            >
                <Tabs.Screen 
                    name="(home)/index"
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon
                                focused={focused}
                                icon={tabIcons.home}
                                iconFilled={tabIcons.homeFill}
                                title='Home'
                            />
                        )
                    }}
                />

                <Tabs.Screen 
                    name="chats/index"
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon
                                focused={focused}
                                icon={tabIcons.chat}
                                iconFilled={tabIcons.chatFill}
                                title='Chat'
                            />
                        )
                    }}
                />

                <Tabs.Screen 
                    name="profile"
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon
                                focused={focused}
                                icon={tabIcons.user}
                                iconFilled={tabIcons.userFill}
                                title='User'
                            />
                        )
                    }}
                />
            </Tabs>
        </>
    );
}
