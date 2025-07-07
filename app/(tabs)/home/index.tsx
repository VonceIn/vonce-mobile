import { userProfileAtom } from "@/atoms/atoms";
import Button from "@/components/Button";
import { useAtomValue } from "jotai";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const profile = useAtomValue(userProfileAtom);
    if (!profile) return null;

    return (
        <SafeAreaView className="bg-primary flex-1 items-center justify-center gap-10 pt-10">
            <Image 
                source={require('../../../assets/images/vonce_logo_mail.png')}
                resizeMode="contain"
                className="w-[137px] h-[70px] absolute top-6 left-4"
            />

            <View className="w-[358px] min-h-[100px] items-center justify-center">
                <Text className="fontFam-Ubuntu700 text-[48px] text-center text-wrap">
                    You've been matched!
                </Text>
            </View>

            <View className="w-max h-max">
                {profile.avatar == 'default' ? (
                    <Image 
                        source={require('../../../assets/images/default_profile_male.png')}
                        resizeMode="contain"
                        className="w-[270px] h-[270px] rounded-full"
                    />
                ) : (
                    null // Load Matched Persons Avatar
                )}

                <View 
                    style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 4,
                    }}
                    className="w-[265px] min-h-[145px] bg-white rounded-[12px] mt-[-20px] items-center justify-center gap-5 pt-2 pb-2"
                >
                    <View className="min-w-[175px] min-h-[40px] items-center justify-center">
                        <Text className="fontFam-Ubuntu700 text-[32px] text-wrap text-center">
                            Liam
                        </Text>
                    </View>

                    <View className="w-[239px] max-h-[60px]">
                        <ScrollView>
                            <Text className="fontFam-Ubuntu400 text-[16px] text-center">
                                Software Engineer - Google,
                                Loves Movies
                                Aspiring Entrepreneur
                                Software Engineer - Google,
                                Loves Movies
                                Aspiring Entrepreneur
                            </Text>
                        </ScrollView>
                    </View>
                </View>
            </View>

            <View className="w-full h-[72px] items-center justify-center gap-4 flex-row">
                <Button
                    text="Say Hi" 
                    buttonClassName="w-[136px] h-[48px]" 
                    textClassName="text-[#FCF7F7] fontFam-Jakarta700 text-[16px]"
                />

                <Button
                    text="View Messages" 
                    buttonClassName="w-[210px] h-[48px] bg-[#F5E5E5]" 
                    textClassName="text-[#1C0D0D] fontFam-Jakarta700 text-[16px]"
                />
            </View>
        </SafeAreaView>
    );
}
