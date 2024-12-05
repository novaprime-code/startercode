// components/auth/RegisterForm.tsx
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

const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must include uppercase, lowercase, number, and special character"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

type RegisterFormData = z.infer<typeof registerSchema>

export const RegisterForm = () => {
    const router = useRouter()
    const { handleSignUp } = useAuth()
    const { showToast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: RegisterFormData) => {
        setIsSubmitting(true)

        try {
            const success = await handleSignUp(data)

            if (success) {
                showToast({
                    message: "Registration successful! Please check your email.",
                    type: "success"
                })
                router.push('/login')
            } else {
                showToast({
                    message: "Registration failed. Please try again.",
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
                    Create Your Account
                </h2>
            </div>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            {...register('username')}
                            error={errors.username?.message}
                            placeholder="Choose a username"
                        />
                    </div>

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
                            placeholder="Create a strong password"
                        />
                    </div>

                    <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            {...register('confirmPassword')}
                            error={errors.confirmPassword?.message}
                            placeholder="Confirm your password"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </Button>
                </div>
            </Form>

            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Already have an account? {' '}
                    <Link
                        href="/login"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Login Here
                    </Link>
                </p>
            </div>

            <SocialLogins />
        </motion.div>
    )
}