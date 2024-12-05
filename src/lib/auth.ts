// lib/auth.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AuthProviders, AuthFormData } from '../types';

export const signUp = async (data: AuthFormData) => {
    const supabase = createClientComponentClient();

    const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            emailRedirectTo: `${location.origin}/auth/callback`
        }
    });

    return { authData, error };
};

export const signIn = async (data: AuthFormData) => {
    const supabase = createClientComponentClient();

    const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
    });

    return { authData, error };
};

export const signInWithProvider = async (provider: AuthProviders) => {
    const supabase = createClientComponentClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${location.origin}/auth/callback`
        }
    });

    return { data, error };
};

export const signOut = async () => {
    const supabase = createClientComponentClient();
    return await supabase.auth.signOut();
};

export const resetPassword = async (email: string) => {
    const supabase = createClientComponentClient();

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/auth/reset-password`
    });

    return { data, error };
};