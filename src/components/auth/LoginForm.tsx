// components/auth/LoginForm.tsx
"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Form } from '@/components/ui/Form'
import { SocialLogins } from './SocialLogins'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

type LoginFormData = z.infer<typeof loginSchema>

export const LoginForm = () => {
    const router = useRouter()
    const { handleSignIn } = useAuth()
    const { showToast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginFormData) => {
        setIsSubmitting(true)

        try {
            const success = await handleSignIn(data)

            if (success) {
                showToast({
                    message: "Login successful!",
                    type: "success"
                })
                router.push('/dashboard')
            } else {
                showToast({
                    message: "Login failed. Please check your credentials.",
                    type: "error"
                })
            }
        } catch (error) {
            showToast({
                message: "An unexpected error occurred",
                type: "error"
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg"
        >
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">
                    Login to Your Account
                </h2>
            </div>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register('email')}
                            error={errors.email?.message}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register('password')}
                            error={errors.password?.message}
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging In...' : 'Login'}
                    </Button>
                </div>
            </Form>

            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account? {' '}
                    <Link
                        href="/register"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Register Here
                    </Link>
                </p>
            </div>

            <SocialLogins />
        </motion.div>
    )
}