// src/app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const router = useRouter();
    const { user, loading, handleSignOut } = useAuth();

    useEffect(() => {
        console.log('Dashboard mounted', { user, loading });
    }, [user, loading]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Loading...
                </motion.div>
            </div>
        );
    }

    // Add a small delay before redirect to ensure state is properly updated
    if (!user) {
        console.log('No user found, redirecting to login');
        setTimeout(() => {
            router.push('/login');
        }, 100);
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto p-6"
        >
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <button
                    onClick={handleSignOut}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                    Sign Out
                </button>
            </div>

            <pre className="bg-gray-100 p-4 rounded">
                {JSON.stringify({ user }, null, 2)}
            </pre>
        </motion.div>
    );
}