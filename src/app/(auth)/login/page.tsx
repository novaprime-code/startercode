'use client'

import { LoginForm } from '@/components/auth/LoginForm'
import { motion } from 'framer-motion'

export default function LoginPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
            className="min-h-screen flex items-center justify-center bg-gray-100 p-4"
        >
            <div className="w-full max-w-md bg-gray-100 shadow-lg text-gray-700 border-4 hover:shadow-2xl  rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
                <LoginForm />
            </div>
        </motion.div>
    )
}