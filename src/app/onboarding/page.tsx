"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { generateNutritionPlan, generateWorkoutPlan, type UserGoalData } from "@/lib/openai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { Target, Activity, Clock, Utensils, Loader2 } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  // Estados do formulário
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [goal, setGoal] = useState<string>("")
  const [activityLevel, setActivityLevel] = useState<string>("")
  const [availableTime, setAvailableTime] = useState("")
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([])

  const restrictionsOptions = [
    { id: "vegetariano", label: "Vegetariano" },
    { id: "vegano", label: "Vegano" },
    { id: "sem_lactose", label: "Sem lactose" },
    { id: "sem_gluten", label: "Sem glúten" },
    { id: "diabetes", label: "Diabetes" },
  ]

  const handleRestrictionToggle = (restrictionId: string) => {
    setDietaryRestrictions(prev =>
      prev.includes(restrictionId)
        ? prev.filter(id => id !== restrictionId)
        : [...prev, restrictionId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Obter usuário atual
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Usuário não autenticado')

      // Preparar dados do usuário
      const userData: UserGoalData = {
        name,
        age: parseInt(age),
        weight: parseFloat(weight),
        height: parseFloat(height),
        goal: goal as any,
        activity_level: activityLevel as any,
        dietary_restrictions: dietaryRestrictions,
        available_time: parseInt(availableTime),
      }

      // 1. Salvar perfil do usuário
      const { error: profileError } = await supabase
        .from('users_profile')
        .insert({
          user_id: user.id,
          name: userData.name,
          age: userData.age,
          weight: userData.weight,
          height: userData.height,
          goal: userData.goal,
          activity_level: userData.activity_level,
          dietary_restrictions: userData.dietary_restrictions,
          available_time: userData.available_time,
        })

      if (profileError) throw profileError

      // 2. Gerar plano de nutrição com IA
      setStep(2)
      const nutritionPlan = await generateNutritionPlan(userData)

      const { error: nutritionError } = await supabase
        .from('nutrition_plans')
        .insert({
          user_id: user.id,
          plan_data: nutritionPlan.weekly_plan,
          calories_target: nutritionPlan.calories_target,
          protein_target: nutritionPlan.protein_target,
          carbs_target: nutritionPlan.carbs_target,
          fat_target: nutritionPlan.fat_target,
        })

      if (nutritionError) throw nutritionError

      // 3. Gerar plano de treino com IA
      setStep(3)
      const workoutPlan = await generateWorkoutPlan(userData)

      const { error: workoutError } = await supabase
        .from('workout_plans')
        .insert({
          user_id: user.id,
          plan_data: workoutPlan.weekly_plan,
          focus_area: workoutPlan.focus_area,
          difficulty_level: workoutPlan.difficulty_level,
        })

      if (workoutError) throw workoutError

      // 4. Redirecionar para dashboard
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Erro ao processar dados')
      setStep(1)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] flex items-center justify-center p-4">
        <Card className="bg-[#1A1A1A]/80 border-orange-500/20 backdrop-blur-xl max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Loader2 className="w-16 h-16 text-orange-400 animate-spin mx-auto" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">
                  {step === 1 && "Salvando seus dados..."}
                  {step === 2 && "Gerando seu plano de nutrição personalizado..."}
                  {step === 3 && "Criando seu treino de academia..."}
                </h3>
                <p className="text-white/60 text-sm">
                  Nossa IA está analisando seus dados para criar o plano perfeito para você!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] p-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Vamos conhecer você melhor!
          </h1>
          <p className="text-white/60">
            Preencha seus dados para criarmos seu plano personalizado
          </p>
        </div>

        <Card className="bg-[#1A1A1A]/80 border-orange-500/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-6 h-6 text-orange-400" />
              Seus Objetivos
            </CardTitle>
            <CardDescription className="text-white/60">
              Essas informações nos ajudarão a criar o melhor plano para você
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-orange-400" />
                  Dados Pessoais
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Nome</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-[#0D0D0D]/50 border-white/10 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-white">Idade</Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="bg-[#0D0D0D]/50 border-white/10 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-white">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="bg-[#0D0D0D]/50 border-white/10 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-white">Altura (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="bg-[#0D0D0D]/50 border-white/10 text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Objetivo */}
              <div className="space-y-2">
                <Label htmlFor="goal" className="text-white">Qual seu objetivo?</Label>
                <Select value={goal} onValueChange={setGoal} required>
                  <SelectTrigger className="bg-[#0D0D0D]/50 border-white/10 text-white">
                    <SelectValue placeholder="Selecione seu objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perder_peso">Perder peso</SelectItem>
                    <SelectItem value="ganhar_massa">Ganhar massa muscular</SelectItem>
                    <SelectItem value="manter_peso">Manter peso</SelectItem>
                    <SelectItem value="definicao">Definição muscular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Nível de Atividade */}
              <div className="space-y-2">
                <Label htmlFor="activity" className="text-white">Nível de atividade física</Label>
                <Select value={activityLevel} onValueChange={setActivityLevel} required>
                  <SelectTrigger className="bg-[#0D0D0D]/50 border-white/10 text-white">
                    <SelectValue placeholder="Selecione seu nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentario">Sedentário</SelectItem>
                    <SelectItem value="leve">Levemente ativo</SelectItem>
                    <SelectItem value="moderado">Moderadamente ativo</SelectItem>
                    <SelectItem value="intenso">Muito ativo</SelectItem>
                    <SelectItem value="muito_intenso">Extremamente ativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tempo Disponível */}
              <div className="space-y-2">
                <Label htmlFor="time" className="text-white flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Tempo disponível para treinar (minutos/dia)
                </Label>
                <Input
                  id="time"
                  type="number"
                  value={availableTime}
                  onChange={(e) => setAvailableTime(e.target.value)}
                  className="bg-[#0D0D0D]/50 border-white/10 text-white"
                  placeholder="Ex: 60"
                  required
                />
              </div>

              {/* Restrições Alimentares */}
              <div className="space-y-3">
                <Label className="text-white flex items-center gap-2">
                  <Utensils className="w-4 h-4" />
                  Restrições alimentares (opcional)
                </Label>
                <div className="space-y-2">
                  {restrictionsOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={dietaryRestrictions.includes(option.id)}
                        onCheckedChange={() => handleRestrictionToggle(option.id)}
                        className="border-white/20"
                      />
                      <label
                        htmlFor={option.id}
                        className="text-sm text-white/80 cursor-pointer"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-6 text-lg"
              >
                Gerar meu plano personalizado
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
