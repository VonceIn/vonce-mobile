import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

export function useMatchLitstener({
    userId,
    enabled,
    onMatchFound
}: {
    userId: string;
    enabled: boolean;
    onMatchFound: (matched: any) => void;
}) {
    useEffect(() => {
        if (!enabled) return;

        const channel = supabase
            .channel('match-listener')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'matches',
                    filter: `user1_id=eq.${userId},user2_id=eq.${userId}`
                },
                (payload) => {
                    const match = payload.new;
                    console.log('Match Found!', match);
                    onMatchFound(match);
                }
            )
            .subscribe();

            return () => {
                supabase.removeChannel(channel);
            }
    }, [userId, enabled, onMatchFound]);
}
