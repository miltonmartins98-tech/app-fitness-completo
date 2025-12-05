"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flame, Droplet, Beef, Cookie, TrendingUp, Bell, Plus, Minus, Target, Calendar, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomeTab() {
  const [dailyGoal] = useState(2000)
  const [consumed, setConsumed] = useState(1450)
  const [water, setWater] = useState(1800) // ml
  const waterGoal = 2000 // ml
  
  const remaining = dailyGoal - consumed
  const percentConsumed = (consumed / dailyGoal) * 100

  // Dados dos macronutrientes
  const [macros, setMacros] = useState({
    protein: { current: 85, goal: 150 },
    carbs: { current: 180, goal: 250 },
    fat: { current: 45, goal: 65 }
  })

  const mealButtons = [
    {
      name: "Café da Manhã",
      icon: "🍳",
      color: "from-orange-500/80 to-orange-600/80",
      image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop",
      calories: 450
    },
    {
      name: "Almoço",
      icon: "🥗",
      color: "from-emerald-500/80 to-emerald-600/80",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      calories: 650
    },
    {
      name: "Lanche",
      icon: "🍎",
      color: "from-purple-500/80 to-purple-600/80",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop",
      calories: 200
    },
    {
      name: "Jantar",
      icon: "🍽️",
      color: "from-cyan-500/80 to-cyan-600/80",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
      calories: 550
    }
  ]

  const addWater = (amount: number) => {
    setWater(Math.min(water + amount, waterGoal + 1000))
  }

  const addMealCalories = (calories: number) => {
    setConsumed(consumed + calories)
  }

  return (
    <div className="space-y-4">
      {/* Header com Data - Estilo Cal.ai */}
      <Card className="bg-gradient-to-br from-[#111111] to-[#1a1a1a] text-white p-6 border border-white/5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-[#00D9FF]" />
              <span className="text-xs font-medium text-white/60">Hoje</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </h2>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold bg-gradient-to-r from-[#00D9FF] to-[#0099FF] bg-clip-text text-transparent">{consumed}</div>
            <div className="text-xs text-white/60">kcal consumidas</div>
          </div>
        </div>
      </Card>

      {/* Tracker Principal de Calorias - Estilo Cal.ai Minimalista */}
      <Card className="p-6 bg-[#111111] border border-white/5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Calorias Diárias</h2>
          <div className="flex items-center gap-2 text-xs text-[#00D9FF] font-medium bg-[#00D9FF]/10 px-3 py-1.5 rounded-full border border-[#00D9FF]/20">
            <Target className="w-3 h-3" />
            <span>{dailyGoal} kcal</span>
          </div>
        </div>

        {/* Círculo de Progresso Principal - Estilo Cal.ai */}
        <div className="flex flex-col items-center py-6">
          <div className="relative w-52 h-52 mb-6">
            <svg className="w-full h-full transform -rotate-90">
              {/* Círculo de fundo */}
              <circle
                cx="104"
                cy="104"
                r="92"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="12"
                fill="none"
              />
              {/* Círculo de progresso com gradiente cyan */}
              <circle
                cx="104"
                cy="104"
                r="92"
                stroke="url(#cyanGradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${percentConsumed * 5.78} 578`}
                strokeLinecap="round"
                className="transition-all duration-700 drop-shadow-[0_0_8px_rgba(0,217,255,0.5)]"
              />
              <defs>
                <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D9FF" />
                  <stop offset="100%" stopColor="#0099FF" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00D9FF] to-[#0099FF] rounded-2xl flex items-center justify-center mb-3 shadow-lg shadow-cyan-500/30">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <span className="text-5xl font-bold text-white">{remaining}</span>
              <span className="text-xs text-white/50 mt-1">kcal restantes</span>
              <div className="mt-3 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <span className="text-xs font-medium text-[#00D9FF]">
                  {percentConsumed.toFixed(0)}% concluído
                </span>
              </div>
            </div>
          </div>

          {/* Estatísticas Rápidas - Estilo Cal.ai */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-md">
            <div className="text-center p-3 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">{dailyGoal}</div>
              <div className="text-[10px] text-white/50 mt-1">Meta</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-[#00D9FF]/10 to-[#0099FF]/10 rounded-2xl border border-[#00D9FF]/20">
              <div className="text-2xl font-bold text-[#00D9FF]">{consumed}</div>
              <div className="text-[10px] text-white/50 mt-1">Consumido</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">{remaining}</div>
              <div className="text-[10px] text-white/50 mt-1">Restante</div>
            </div>
          </div>
        </div>

        {/* Barra de Progresso Linear Minimalista */}
        <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-white/70">Progresso do Dia</span>
            <span className="text-xs font-bold text-[#00D9FF]">{percentConsumed.toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00D9FF] to-[#0099FF] rounded-full transition-all duration-700 shadow-lg shadow-cyan-500/30"
              style={{ width: `${percentConsumed}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Tracker de Água - Estilo Cal.ai */}
      <Card className="p-5 bg-[#111111] border border-white/5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Droplet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Hidratação</h3>
              <p className="text-[10px] text-white/50">{water}ml / {waterGoal}ml</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-cyan-400">
              {((water / waterGoal) * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700 shadow-lg shadow-cyan-500/30"
            style={{ width: `${(water / waterGoal) * 100}%` }}
          />
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={() => addWater(250)}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/20 border-0 rounded-xl h-10 text-xs font-medium"
          >
            <Plus className="w-3 h-3 mr-1" />
            250ml
          </Button>
          <Button 
            onClick={() => addWater(500)}
            className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/20 border-0 rounded-xl h-10 text-xs font-medium"
          >
            <Plus className="w-3 h-3 mr-1" />
            500ml
          </Button>
          <Button 
            onClick={() => setWater(Math.max(0, water - 250))}
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl h-10 px-3"
          >
            <Minus className="w-3 h-3" />
          </Button>
        </div>
      </Card>

      {/* Macronutrientes - Estilo Cal.ai Minimalista */}
      <Card className="p-5 bg-[#111111] border border-white/5 shadow-2xl backdrop-blur-xl">
        <h3 className="text-sm font-bold text-white mb-4">Macronutrientes</h3>
        <div className="space-y-4">
          {/* Proteínas */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                  <Beef className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <span className="text-xs font-medium text-white/70">Proteínas</span>
              </div>
              <span className="text-xs font-bold text-white">
                {macros.protein.current}g / {macros.protein.goal}g
              </span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700"
                style={{ width: `${(macros.protein.current / macros.protein.goal) * 100}%` }}
              />
            </div>
          </div>

          {/* Carboidratos */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20">
                  <Cookie className="w-3.5 h-3.5 text-orange-400" />
                </div>
                <span className="text-xs font-medium text-white/70">Carboidratos</span>
              </div>
              <span className="text-xs font-bold text-white">
                {macros.carbs.current}g / {macros.carbs.goal}g
              </span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-700"
                style={{ width: `${(macros.carbs.current / macros.carbs.goal) * 100}%` }}
              />
            </div>
          </div>

          {/* Gorduras */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-yellow-500/10 rounded-xl flex items-center justify-center border border-yellow-500/20">
                  <Droplet className="w-3.5 h-3.5 text-yellow-400" />
                </div>
                <span className="text-xs font-medium text-white/70">Gorduras</span>
              </div>
              <span className="text-xs font-bold text-white">
                {macros.fat.current}g / {macros.fat.goal}g
              </span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full transition-all duration-700"
                style={{ width: `${(macros.fat.current / macros.fat.goal) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Refeições Rápidas - Estilo Cal.ai com Imagens */}
      <Card className="p-5 bg-[#111111] border border-white/5 shadow-2xl backdrop-blur-xl">
        <h3 className="text-sm font-bold text-white mb-4">Adicionar Refeição</h3>
        <div className="grid grid-cols-2 gap-3">
          {mealButtons.map((meal, index) => (
            <button 
              key={index}
              onClick={() => addMealCalories(meal.calories)}
              className="relative h-32 rounded-2xl overflow-hidden border border-white/10 hover:border-[#00D9FF]/50 transition-all duration-300 group"
            >
              {/* Imagem de fundo */}
              <div className="absolute inset-0">
                <img 
                  src={meal.image} 
                  alt={meal.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${meal.color} mix-blend-multiply`}></div>
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
              
              {/* Conteúdo */}
              <div className="relative h-full flex flex-col items-center justify-center text-white p-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-2 border border-white/20">
                  <span className="text-2xl">{meal.icon}</span>
                </div>
                <span className="text-xs font-semibold drop-shadow-lg">{meal.name}</span>
                <span className="text-[10px] text-white/80 mt-1 bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  ~{meal.calories} kcal
                </span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Notificação - Estilo Cal.ai */}
      <Card className="bg-gradient-to-br from-[#00D9FF]/10 to-[#0099FF]/10 border border-[#00D9FF]/20 p-4 shadow-2xl backdrop-blur-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/5 to-transparent"></div>
        <div className="relative flex items-start gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#00D9FF] to-[#0099FF] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-white">Você está indo muito bem!</h3>
            <p className="text-xs text-white/60 mt-1">
              Continue assim! Você já consumiu {percentConsumed.toFixed(0)}% da sua meta diária.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
