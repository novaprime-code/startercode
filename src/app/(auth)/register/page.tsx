'use client'

import { RegisterForm } from '@/components/auth/RegisterForm'
import { motion } from 'framer-motion'

export default function RegisterPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-gray-100 p-4"
        >
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
                <RegisterForm />
            </div>
        </motion.div>
    )
}