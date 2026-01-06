"use client"

import { useEffect, useState } from "react"
import { supabase, type UserProfile, type NutritionPlan, type WorkoutPlan } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, LogOut, Utensils, Dumbbell, User, Target } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null)
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
        return
      }

      // Carregar perfil
      const { data: profileData } = await supabase
        .from('users_profile')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (!profileData) {
        router.push('/onboarding')
        return
      }

      setProfile(profileData)

      // Carregar plano de nutrição
      const { data: nutritionData } = await supabase
        .from('nutrition_plans')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      setNutritionPlan(nutritionData)

      // Carregar plano de treino
      const { data: workoutData } = await supabase
        .from('workout_plans')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      setWorkoutPlan(workoutData)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-orange-400 animate-spin" />
      </div>
    )
  }

  const goalLabels = {
    perder_peso: 'Perder peso',
    ganhar_massa: 'Ganhar massa muscular',
    manter_peso: 'Manter peso',
    definicao: 'Definição muscular'
  }

  const weekDays = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo']
  const weekDaysLabels: Record<string, string> = {
    segunda: 'Segunda-feira',
    terca: 'Terça-feira',
    quarta: 'Quarta-feira',
    quinta: 'Quinta-feira',
    sexta: 'Sexta-feira',
    sabado: 'Sábado',
    domingo: 'Domingo'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D]">
      {/* Header */}
      <header className="bg-[#1A1A1A]/95 border-b border-orange-500/10 sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                SnapFit
              </h1>
              <p className="text-white/60 text-sm">Olá, {profile?.name}!</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-orange-500/20 text-white hover:bg-orange-500/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Perfil do Usuário */}
        <Card className="bg-[#1A1A1A]/80 border-orange-500/20 backdrop-blur-xl mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-6 h-6 text-orange-400" />
              Seu Perfil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-white/60 text-sm">Idade</p>
                <p className="text-white font-semibold">{profile?.age} anos</p>
              </div>
              <div className="space-y-1">
                <p className="text-white/60 text-sm">Peso</p>
                <p className="text-white font-semibold">{profile?.weight} kg</p>
              </div>
              <div className="space-y-1">
                <p className="text-white/60 text-sm">Altura</p>
                <p className="text-white font-semibold">{profile?.height} cm</p>
              </div>
              <div className="space-y-1">
                <p className="text-white/60 text-sm">Objetivo</p>
                <p className="text-white font-semibold">{profile?.goal ? goalLabels[profile.goal] : '-'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs de Nutrição e Treino */}
        <Tabs defaultValue="nutrition" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#0D0D0D]/50 mb-6">
            <TabsTrigger
              value="nutrition"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500"
            >
              <Utensils className="w-4 h-4 mr-2" />
              Nutrição
            </TabsTrigger>
            <TabsTrigger
              value="workout"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500"
            >
              <Dumbbell className="w-4 h-4 mr-2" />
              Treino
            </TabsTrigger>
          </TabsList>

          {/* Plano de Nutrição */}
          <TabsContent value="nutrition" className="space-y-4">
            {nutritionPlan ? (
              <>
                {/* Metas Nutricionais */}
                <Card className="bg-[#1A1A1A]/80 border-orange-500/20 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-orange-400" />
                      Suas Metas Diárias
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                        <p className="text-white/60 text-sm mb-1">Calorias</p>
                        <p className="text-2xl font-bold text-orange-400">{nutritionPlan.calories_target}</p>
                        <p className="text-white/40 text-xs">kcal</p>
                      </div>
                      <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                        <p className="text-white/60 text-sm mb-1">Proteínas</p>
                        <p className="text-2xl font-bold text-blue-400">{nutritionPlan.protein_target}</p>
                        <p className="text-white/40 text-xs">gramas</p>
                      </div>
                      <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                        <p className="text-white/60 text-sm mb-1">Carboidratos</p>
                        <p className="text-2xl font-bold text-green-400">{nutritionPlan.carbs_target}</p>
                        <p className="text-white/40 text-xs">gramas</p>
                      </div>
                      <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                        <p className="text-white/60 text-sm mb-1">Gorduras</p>
                        <p className="text-2xl font-bold text-yellow-400">{nutritionPlan.fat_target}</p>
                        <p className="text-white/40 text-xs">gramas</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Plano Semanal */}
                {weekDays.map((day) => {
                  const dayPlan = nutritionPlan.plan_data[day]
                  if (!dayPlan) return null

                  return (
                    <Card key={day} className="bg-[#1A1A1A]/80 border-orange-500/20 backdrop-blur-xl">
                      <CardHeader>
                        <CardTitle className="text-white">{weekDaysLabels[day]}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {['cafe_manha', 'lanche_manha', 'almoco', 'lanche_tarde', 'jantar'].map((meal) => {
                          const mealData = dayPlan[meal]
                          if (!mealData || !Array.isArray(mealData)) return null

                          const mealLabels: Record<string, string> = {
                            cafe_manha: '☕ Café da Manhã',
                            lanche_manha: '🍎 Lanche da Manhã',
                            almoco: '🍽️ Almoço',
                            lanche_tarde: '🥤 Lanche da Tarde',
                            jantar: '🌙 Jantar'
                          }

                          return (
                            <div key={meal} className="space-y-2">
                              <h4 className="font-semibold text-orange-400">{mealLabels[meal]}</h4>
                              <div className="space-y-1">
                                {mealData.map((item: any, idx: number) => (
                                  <div key={idx} className="flex justify-between items-center bg-[#0D0D0D]/50 rounded-lg p-3">
                                    <div>
                                      <p className="text-white font-medium">{item.alimento}</p>
                                      <p className="text-white/60 text-sm">{item.quantidade}</p>
                                    </div>
                                    <p className="text-orange-400 font-semibold">{item.calorias} kcal</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </CardContent>
                    </Card>
                  )
                })}
              </>
            ) : (
              <Card className="bg-[#1A1A1A]/80 border-orange-500/20 backdrop-blur-xl">
                <CardContent className="py-12 text-center">
                  <p className="text-white/60">Nenhum plano de nutrição encontrado</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Plano de Treino */}
          <TabsContent value="workout" className="space-y-4">
            {workoutPlan ? (
              <>
                {/* Info do Plano */}
                <Card className="bg-[#1A1A1A]/80 border-orange-500/20 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white">Informações do Treino</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-white/60 text-sm">Foco</p>
                        <p className="text-white font-semibold">{workoutPlan.focus_area}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-white/60 text-sm">Nível</p>
                        <p className="text-white font-semibold capitalize">{workoutPlan.difficulty_level}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Treino Semanal */}
                {weekDays.map((day) => {
                  const dayWorkout = workoutPlan.plan_data[day]
                  if (!dayWorkout) return null

                  return (
                    <Card key={day} className="bg-[#1A1A1A]/80 border-orange-500/20 backdrop-blur-xl">
                      <CardHeader>
                        <CardTitle className="text-white">{weekDaysLabels[day]}</CardTitle>
                        <CardDescription className="text-orange-400">
                          {dayWorkout.grupo_muscular || 'Descanso'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {dayWorkout.aquecimento && (
                          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                            <h4 className="font-semibold text-blue-400 mb-2">🔥 Aquecimento</h4>
                            <p className="text-white/80">{dayWorkout.aquecimento}</p>
                          </div>
                        )}

                        {dayWorkout.exercicios && Array.isArray(dayWorkout.exercicios) && (
                          <div className="space-y-3">
                            <h4 className="font-semibold text-orange-400">💪 Exercícios</h4>
                            {dayWorkout.exercicios.map((exercise: any, idx: number) => (
                              <div key={idx} className="bg-[#0D0D0D]/50 rounded-lg p-4 space-y-2">
                                <div className="flex justify-between items-start">
                                  <h5 className="text-white font-semibold">{exercise.nome}</h5>
                                  <span className="text-orange-400 text-sm font-medium">
                                    {exercise.series}x{exercise.repeticoes}
                                  </span>
                                </div>
                                <div className="flex gap-4 text-sm">
                                  <span className="text-white/60">Descanso: {exercise.descanso}</span>
                                </div>
                                {exercise.observacoes && (
                                  <p className="text-white/60 text-sm italic">{exercise.observacoes}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {dayWorkout.alongamento && (
                          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                            <h4 className="font-semibold text-green-400 mb-2">🧘 Alongamento</h4>
                            <p className="text-white/80">{dayWorkout.alongamento}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </>
            ) : (
              <Card className="bg-[#1A1A1A]/80 border-orange-500/20 backdrop-blur-xl">
                <CardContent className="py-12 text-center">
                  <p className="text-white/60">Nenhum plano de treino encontrado</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
