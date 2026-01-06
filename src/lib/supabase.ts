import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export type UserProfile = {
  id: string
  user_id: string
  name: string
  age?: number
  weight?: number
  height?: number
  goal?: 'perder_peso' | 'ganhar_massa' | 'manter_peso' | 'definicao'
  activity_level?: 'sedentario' | 'leve' | 'moderado' | 'intenso' | 'muito_intenso'
  dietary_restrictions?: string[]
  available_time?: number
  created_at: string
  updated_at: string
}

export type NutritionPlan = {
  id: string
  user_id: string
  plan_data: any
  calories_target?: number
  protein_target?: number
  carbs_target?: number
  fat_target?: number
  created_at: string
  updated_at: string
}

export type WorkoutPlan = {
  id: string
  user_id: string
  plan_data: any
  focus_area?: string
  difficulty_level?: string
  created_at: string
  updated_at: string
}
