// src/app/dashboard/page.tsx
'use client'

import { redirect } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { motion } from 'framer-motion'

export default function Dashboard() {
    const { user, loading, handleSignOut } = useAuth()

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
        )
    }

    if (!user) {
        redirect('/login')
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

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Welcome, {user.email}!</h2>
                <div className="grid gap-4">
                    <div className="border rounded p-4">
                        <h3 className="font-medium mb-2">Account Details</h3>
                        <p>Email: {user.email}</p>
                        <p>Last Sign In: {new Date(user.last_sign_in_at || '').toLocaleString()}</p>
                    </div>
                    {/* Add more dashboard sections here */}
                </div>
            </div>
        </motion.div>
    )
}