"use client"

import { Camera, Flame, Target, TrendingUp, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function HomeTab() {
  const caloriesConsumed = 1450
  const caloriesGoal = 2000
  const caloriesProgress = (caloriesConsumed / caloriesGoal) * 100

  const macros = [
    { name: "Proteínas", value: 85, goal: 150, unit: "g", color: "from-emerald-400 to-emerald-600" },
    { name: "Carboidratos", value: 180, goal: 250, unit: "g", color: "from-cyan-400 to-cyan-600" },
    { name: "Gorduras", value: 45, goal: 65, unit: "g", color: "from-purple-400 to-purple-600" },
  ]

  const recentMeals = [
    { name: "Café da Manhã", calories: 420, time: "08:30", items: "Ovos, Pão Integral, Café" },
    { name: "Almoço", calories: 680, time: "12:45", items: "Frango Grelhado, Arroz, Salada" },
    { name: "Lanche", calories: 350, time: "16:20", items: "Iogurte Grego, Granola, Frutas" },
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Hero Card - Calorias Diárias */}
      <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border-white/10 p-6 sm:p-8 shadow-2xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium mb-1">Calorias Hoje</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl sm:text-5xl font-bold text-white">{caloriesConsumed}</h2>
                <span className="text-white/40 text-lg">/ {caloriesGoal}</span>
              </div>
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 rounded-3xl flex items-center justify-center border border-emerald-400/30">
              <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
            </div>
          </div>

          <div className="space-y-2">
            <Progress value={caloriesProgress} className="h-3 bg-white/5" />
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>{caloriesGoal - caloriesConsumed} kcal restantes</span>
              <span>{Math.round(caloriesProgress)}%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Action - Scan Refeição */}
      <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-bold py-5 rounded-2xl shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/40 flex items-center justify-center gap-3">
        <Camera className="w-6 h-6" />
        <span className="text-lg">Escanear Refeição</span>
      </button>

      {/* Macros Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {macros.map((macro) => (
          <Card key={macro.name} className="bg-[#1A1A1A] border-white/10 p-5 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-white/60 text-xs font-medium">{macro.name}</p>
                <Zap className="w-4 h-4 text-white/40" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">{macro.value}</span>
                <span className="text-white/40 text-sm">/ {macro.goal}{macro.unit}</span>
              </div>
              <Progress 
                value={(macro.value / macro.goal) * 100} 
                className={`h-2 bg-white/5`}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Refeições Recentes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Refeições Recentes</h3>
          <button className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors">
            Ver todas
          </button>
        </div>

        <div className="space-y-3">
          {recentMeals.map((meal, index) => (
            <Card key={index} className="bg-[#1A1A1A] border-white/10 p-4 hover:border-white/20 transition-all duration-300 hover:scale-[1.01]">
              <div className="flex items-center justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="text-white font-semibold">{meal.name}</h4>
                    <span className="text-white/40 text-xs">{meal.time}</span>
                  </div>
                  <p className="text-white/60 text-sm">{meal.items}</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-bold text-lg">{meal.calories}</p>
                  <p className="text-white/40 text-xs">kcal</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-[#1A1A1A] border-white/10 p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
              <Target className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Meta Semanal</p>
              <p className="text-white font-bold text-lg">5/7 dias</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1A1A1A] border-white/10 p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Sequência</p>
              <p className="text-white font-bold text-lg">12 dias</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
