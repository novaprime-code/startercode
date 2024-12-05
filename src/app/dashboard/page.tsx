'use client'

import { redirect } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { motion } from 'framer-motion'

export default function Dashboard() {
    const { user, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>
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
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p>Welcome, {user.email}!</p>
            {/* Add more dashboard content */}
        </motion.div>
    )
}