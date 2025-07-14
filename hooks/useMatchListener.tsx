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
                    table: 'matches'
                },
                (payload) => {
                    const match = payload.new;
                    if (match.user1_id !== userId && match.user2_id !== userId) {
                        return;
                    }

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
