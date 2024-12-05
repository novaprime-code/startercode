// hooks/useAuth.ts
import { useState } from 'react';
import { AuthFormData } from '../types';
import { signUp, signIn, signInWithProvider, signOut, resetPassword } from '../lib/auth';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignUp = async (data: AuthFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const { authData, error } = await signUp(data);

            if (error) {
                setError(error.message);
                return false;
            }

            return true;
        } catch (err) {
            setError('An unexpected error occurred');
            console.log(err);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignIn = async (data: AuthFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const { authData, error } = await signIn(data);

            if (error) {
                setError(error.message);
                return false;
            }

            return true;
        } catch (err) {
            setError('An unexpected error occurred');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        handleSignUp,
        handleSignIn,
        signInWithProvider,
        signOut,
        resetPassword,
        isLoading,
        error
    };
};