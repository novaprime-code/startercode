// types/supabase.ts
export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    updated_at?: string
                    username?: string
                    full_name?: string
                    avatar_url?: string
                }
                Insert: {
                    id: string
                    updated_at?: string
                    username?: string
                    full_name?: string
                    avatar_url?: string
                }
                Update: {
                    id?: string
                    updated_at?: string
                    username?: string
                    full_name?: string
                    avatar_url?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}