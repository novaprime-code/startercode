export type AuthFormData = {
    email: string;
    password: string;
    confirmPassword?: string;
};

export type AuthProviders = 'google' | 'github';


export interface AuthError {
    message: string;
}

export interface AuthResponse {
    authData?: any;
    error?: AuthError;
}