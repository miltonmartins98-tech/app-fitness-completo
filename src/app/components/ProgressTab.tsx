"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Calendar, Flame } from "lucide-react"

export default function ProgressTab() {
  const weeklyData = [
    { day: "Seg", calories: 1850, goal: 2000 },
    { day: "Ter", calories: 2100, goal: 2000 },
    { day: "Qua", calories: 1920, goal: 2000 },
    { day: "Qui", calories: 1780, goal: 2000 },
    { day: "Sex", calories: 2050, goal: 2000 },
    { day: "Sáb", calories: 2200, goal: 2000 },
    { day: "Dom", calories: 1950, goal: 2000 },
  ]

  const maxCalories = Math.max(...weeklyData.map(d => d.calories), ...weeklyData.map(d => d.goal))

  const stats = [
    { label: "Média Semanal", value: "1,978", unit: "kcal", trend: "up", change: "+5%" },
    { label: "Melhor Dia", value: "Sexta", unit: "", trend: "up", change: "2,050 kcal" },
    { label: "Peso Atual", value: "75.2", unit: "kg", trend: "down", change: "-1.2kg" },
    { label: "Meta Mensal", value: "85%", unit: "", trend: "up", change: "+12%" },
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Seu Progresso</h2>
        <p className="text-white/60 text-sm">Acompanhe sua evolução semanal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-[#1A1A1A] border-white/10 p-5 hover:border-white/20 transition-all duration-300">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-white/60 text-xs font-medium">{stat.label}</p>
                {stat.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-cyan-400" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  {stat.unit && <span className="text-white/40 text-sm">{stat.unit}</span>}
                </div>
                <p className={`text-xs font-medium ${stat.trend === "up" ? "text-emerald-400" : "text-cyan-400"}`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Weekly Chart */}
      <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border-white/10 p-6 sm:p-8 shadow-2xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Consumo Semanal</h3>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <Calendar className="w-4 h-4 text-white/60" />
              <span className="text-xs text-white/60">Últimos 7 dias</span>
            </div>
          </div>

          {/* Chart */}
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-2 h-48">
              {weeklyData.map((data, index) => {
                const height = (data.calories / maxCalories) * 100
                const isOverGoal = data.calories > data.goal
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full h-full flex items-end">
                      {/* Goal Line Indicator */}
                      <div
                        className="absolute w-full border-t-2 border-dashed border-white/20"
                        style={{ bottom: `${(data.goal / maxCalories) * 100}%` }}
                      ></div>
                      
                      {/* Bar */}
                      <div
                        className={`w-full rounded-t-xl transition-all duration-500 hover:scale-105 cursor-pointer relative group ${
                          isOverGoal
                            ? "bg-gradient-to-t from-orange-500 to-orange-400"
                            : "bg-gradient-to-t from-emerald-500 to-cyan-400"
                        }`}
                        style={{ height: `${height}%` }}
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black/90 text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap border border-white/20">
                            {data.calories} kcal
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="text-white/60 text-xs font-medium">{data.day}</span>
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-emerald-500 to-cyan-400 rounded-full"></div>
                <span className="text-xs text-white/60">Dentro da meta</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-orange-500 to-orange-400 rounded-full"></div>
                <span className="text-xs text-white/60">Acima da meta</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Monthly Overview */}
      <Card className="bg-[#1A1A1A] border-white/10 p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Visão Mensal</h3>
            <Flame className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-white/60 text-xs">Dias na Meta</p>
              <p className="text-2xl font-bold text-white">23/30</p>
            </div>
            <div className="space-y-1">
              <p className="text-white/60 text-xs">Sequência Atual</p>
              <p className="text-2xl font-bold text-emerald-400">12 dias</p>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-xs">Progresso do Mês</span>
              <span className="text-emerald-400 text-sm font-bold">77%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" style={{ width: "77%" }}></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
