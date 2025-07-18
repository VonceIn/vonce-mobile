import { matchAtom, otherProfileAtom, userProfileAtom } from "@/atoms/atoms";
import Button from "@/components/Button";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import { supabase } from "@/lib/supabase";
import { useMatchLitstener } from "@/hooks/useMatchListener";
import { Redirect } from "expo-router";
import { useRouter } from "expo-router";

export default function HomeScreen() {
    // return (
    //     <Redirect href='/(tabs)/chats' />
    // ); // Only for Dev

    const profile = useAtomValue(userProfileAtom);
    const [otherProfile, setOtherProfile] = useAtom(otherProfileAtom);
    const [status, setStatus] = useState<'matched' | 'searching' | 'idle'>('idle');
    const router = useRouter();
    const [match, setMatch] = useAtom(matchAtom);

    useEffect(() => {
        async function getMatch() {
            const { data: matches, error } = await supabase
                .from('matches')
                .select('*')
                .or(`user1_id.eq.${profile!.id},user2_id.eq.${profile!.id}`)

            if (error) {
                console.error('Error occured in trying to fetch a match', error);
                return;
            }

            if (!matches.length) {
                return;
            }

            const currentMatch = matches[0];

            const otherUserId = currentMatch.user1_id === profile?.id ? currentMatch.user2_id : currentMatch.user1_id;

            const { data: otherProfile, error: otherProfileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', otherUserId)
                .single();

            if (otherProfileError) {
                console.error('Error occured in trying to fetch other profile', error);
                return;
            }

            if (!otherProfile) {
                return;
            }

            setMatch(currentMatch);
            setOtherProfile(otherProfile);
            setStatus('matched');
        }

        getMatch();
    }, []); // In future move this as a function to useSupabaseSession hook and make status as an atom instead of useState

    useMatchLitstener({
        userId: profile!.id,
        enabled: status === 'searching',
        onMatchFound: (match) => {
            setMatch(match);
            setStatus('matched');
        }
    });

    // Heartbeat function which only runs when status is 'searching' and updated last_seen-at every 5 seconds
    useEffect(() => {
        if (status !== 'searching') return;

        const interval = setInterval(async () => {
            await supabase
                .from('match_queue')
                .update({ last_seen_at: new Date().toISOString() })
                .eq('user_id', profile?.id);
        }, 5000);

        return () => clearInterval(interval);
    }, [status, profile?.id]);

    const makeMatchQueueEntry = async () => {
        const { error } = await supabase
            .from('match_queue')
            .insert({
                user_id: profile?.id
            });

        if (error) {
            Alert.alert('An Error Has Occured', 'Please Try Again!');
            console.error(error);
            return false;
        }

        return true;
    };

    const removeMatchQueueEntry = async () => {
        const { error } = await supabase
            .from('match_queue')
            .delete()
            .eq('user_id', profile?.id);

        if (error) {
            Alert.alert('An Error Has Occured', 'Please Try Again!');
            console.error(error);
            return false;
        }

        return true;
    };

    if (!profile) return null;

    return (
        <SafeAreaView className="bg-primary flex-1 items-center justify-center gap-10 pt-10">
            <Image 
                source={require('../../../assets/images/vonce_logo_mail.png')}
                resizeMode="contain"
                className="w-[137px] h-[70px] absolute top-6 left-4"
            />

            {status === 'idle' && (
                <Animatable.View 
                    animation="slideInDown"
                    duration={400}
                    className="w-[358px] min-h-[100px] items-center justify-center gap-10"
                >
                    <Text className="fontFam-Ubuntu700 text-[48px] text-center text-wrap">
                        Want To Engage?
                    </Text>

                    <Button
                        text="Find Match!" 
                        buttonClassName="w-[140px] h-[140px] rounded-full" 
                        textClassName="text-[#FCF7F7] fontFam-Jakarta700 text-[20px]"
                        onPress={async () => {
                            const result = await makeMatchQueueEntry();
                            if (result) setStatus('searching');
                        }}
                    />
                </Animatable.View>
            )}

            {status === 'searching' && (
                <Animatable.View 
                    className="w-[358px] min-h-[100px] items-center justify-center gap-10"
                    animation="slideInUp"
                    duration={400}
                >
                    <Text className="fontFam-Ubuntu700 text-[48px] text-center text-wrap">
                        Finding A Match...
                    </Text>

                    <LottieView
                        source={require('../../../assets/animations/loader.json')}
                        autoPlay
                        loop
                        style={{ width: 100, height: 100 }}
                    />

                    <Button
                        text="Cancel Search" 
                        buttonClassName="w-max h-[52px] rounded-full bg-transparent  border-2 border-secondary px-4"
                        textClassName="text-secondary fontFam-Jakarta700 text-[16px]"
                        onPress={async () => {
                            const result = await removeMatchQueueEntry();
                            if (result) setStatus('idle');
                        }}
                    />
                </Animatable.View>
            )}

            {status === 'matched' && (
                <Animatable.View
                    animation="fadeIn"
                    duration={400}
                    className="gap-4"
                >
                    <View className="w-[358px] min-h-[100px] items-center justify-center">
                        <Text className="fontFam-Ubuntu700 text-[48px] text-center text-wrap">
                            You've been matched!
                        </Text>
                    </View>

                    <View className="w-max h-max items-center">
                        {otherProfile?.avatar == 'default' ? (
                            <Image 
                                source={require('../../../assets/images/default_profile_male.png')}
                                resizeMode="contain"
                                className="w-[270px] h-[270px] rounded-full"
                            />
                        ) : (
                            <Image 
                                source={{ uri: otherProfile?.avatar }}
                                resizeMode="contain"
                                className="w-[270px] h-[270px] rounded-full"
                            />
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
                                    {otherProfile?.full_name}
                                </Text>
                            </View>

                            <View className="w-[239px] max-h-[60px]">
                                <ScrollView>
                                    <Text className="fontFam-Ubuntu400 text-[16px] text-center">
                                        {otherProfile?.bio}
                                    </Text>
                                </ScrollView>
                            </View>
                        </View>
                    </View>

                    <View className="w-full h-[72px] items-center justify-center gap-4 flex-row mt-4">
                        <Button
                            text="Say Hi" 
                            buttonClassName="w-[136px] h-[48px]" 
                            textClassName="text-[#FCF7F7] fontFam-Jakarta700 text-[16px]"
                        />

                        <Button
                            text="View Messages" 
                            buttonClassName="w-[210px] h-[48px] bg-[#F5E5E5]" 
                            textClassName="text-[#1C0D0D] fontFam-Jakarta700 text-[16px]"
                            onPress={() => router.push('/(tabs)/chats')}
                        />
                    </View>
                </Animatable.View>
            )}
        </SafeAreaView>
    );
}
