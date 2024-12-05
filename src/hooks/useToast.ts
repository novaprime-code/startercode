import { useState } from 'react'

export function useToast() {
    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error' | 'info';
    } | null>(null)

    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setToast({ message, type })
        setTimeout(() => setToast(null), 3000)
    }

    return { toast, showToast }
}