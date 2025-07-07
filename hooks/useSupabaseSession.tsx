import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { isAuthenticatedAtom, sessionProcessedAtom, userIdAtom, userProfileAtom } from "@/atoms/atoms";
import { API_URL } from "@/utils/backendUrl";

export default async function useSupabaseSession() {
    const [session, setSession] = useState<Session | null>(null);
    const [userId, setUserId] = useAtom(userIdAtom);
    const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
    const [profile, setProfile] = useAtom(userProfileAtom);
    const [sessionProcessed, setSessionProcessed] = useAtom(sessionProcessedAtom);

    const fetchUserDetails = async (access_token: string) => {
        try {
            const res = await fetch(`${API_URL}/api/get-user-profile`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });

            const json = await res.json();

            if (res.ok) {
                setProfile(json.profile);
                // console.log('✅ Profile loaded from backend:', json.profile);
            } else {
                 console.warn('⚠️ Failed to fetch profile:', json.error);
            }
        } catch (error) {
            console.error('❌ fetchUserDetails error:', error);
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (session) {
                const { data, error } = await supabase.auth.getUser();

                if (data?.user) {
                    setSession(session);
                    setUserId(data.user.id);
                    // console.log('✅ Valid session:', data.user.id);

                    // await fetchUserDetails(session.access_token);
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    setProfile(profile);

                    setSessionProcessed(true);
                    setIsAuthenticated(true);
                } else {
                    console.warn('❌ Session token is invalid or user deleted');
                    await supabase.auth.signOut(); // Clean up token

                    setSessionProcessed(true);
                    setIsAuthenticated(false);
                }
            }
        });

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                supabase.auth.getUser().then(async ({ data, error }) => {
                    if (data?.user) {
                        setSession(session);
                        setUserId(data.user.id);
                        // console.log('✅ Valid session via auth change:', data.user.id);

                        // await fetchUserDetails(session.access_token);
                        const { data: profile } = await supabase
                            .from('profiles')
                            .select('*')
                            .eq('id', session.user.id)
                            .single();

                        setProfile(profile);

                        setSessionProcessed(true);
                        setIsAuthenticated(true);
                    } else {
                        console.warn('❌ Invalid session via auth change');
                        await supabase.auth.signOut();

                        setSessionProcessed(true);
                        setIsAuthenticated(false);
                    }
                });
            } else {
                setSession(null);
                setProfile(null);

                setSessionProcessed(true);
                setIsAuthenticated(false);
            }
        });

        return () => {
            authListener.subscription?.unsubscribe();
        };
    }, []);
}