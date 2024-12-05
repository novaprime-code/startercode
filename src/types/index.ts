export type AuthFormData = {
    email: string;
    password: string;
    confirmPassword?: string;
};

export type AuthProviders = 'google' | 'github';