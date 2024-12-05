'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { FaGoogle, FaGithub } from 'react-icons/fa'

export function SocialLogins() {
    const supabase = createClient()

    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
        if (error) console.error('Google Sign In Error:', error)
    }

    const signInWithGitHub = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
        if (error) console.error('GitHub Sign In Error:', error)
    }

    return (
        <div className="flex space-x-4">
            <Button
                onClick={signInWithGoogle}
                className="flex items-center justify-center space-x-2"
            >
                <FaGoogle /> <span>Google</span>
            </Button>
            <Button
                onClick={signInWithGitHub}
                className="flex items-center justify-center space-x-2"
            >
                <FaGithub /> <span>GitHub</span>
            </Button>
        </div>
    )
}