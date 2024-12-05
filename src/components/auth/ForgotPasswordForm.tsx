// components/auth/ForgotPasswordForm.tsx
"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Form } from '@/components/ui/Form'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'

const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address")
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export const ForgotPasswordForm = () => {
    const { resetPassword } = useAuth()
    const { showToast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema)
    })

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsSubmitting(true)

        try {
            const { data: resetData, error } = await resetPassword(data.email)

            if (error) {
                showToast({
                    message: error.message || "Password reset failed",
                    type: "error"
                })
            } else {
                showToast({
                    message: "Password reset link sent to your email",
                    type: "success"
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
                    Reset Your Password
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Enter your email to receive a password reset link
                </p>
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

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending Reset Link...' : 'Reset Password'}
                    </Button>
                </div>
            </Form>

            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Remember your password? {' '}
                    <Link
                        href="/login"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Back to Login
                    </Link>
                </p>
            </div>
        </motion.div>
    )
}