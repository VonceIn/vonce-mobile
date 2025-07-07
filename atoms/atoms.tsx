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

export const isAuthenticatedAtom = atom(false);
export const userIdAtom = atom<null | string>();
export const userProfileAtom = atom<ProfileType | null>();
export const sessionProcessedAtom = atom(false);