import { atom } from 'jotai';

interface ProfileType {
    id: string;
    created_at: string;
    full_name: string;
    email: string;
    username: string;
    avatar: string;
    updated_at: string;
    age: number;
    city: string;
    state: string;
    country: string;
    gender: string;
    bio: string;
};

interface MatchType  {
    id: string;
    user1_id: string;
    user2_id: string;
    create_at: string;
};

export interface ChatMessageType {
    id: string;
    match_id: string;
    sender_id: string;
    content: string;
    created_at: string;
}

export const isAuthenticatedAtom = atom(false);

export const userIdAtom = atom<null | string>();

export const userProfileAtom = atom<ProfileType | null>();

export const otherProfileAtom = atom<ProfileType | null>();

export const sessionProcessedAtom = atom(false);

export const matchAtom = atom<MatchType | null>(null);