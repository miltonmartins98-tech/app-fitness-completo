"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingDown, 
  TrendingUp, 
  Target, 
  Calendar,
  Award,
  Flame,
  Droplet,
  Activity
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export default function ProgressTab() {
  const weightData = [
    { date: "Sem 1", weight: 85 },
    { date: "Sem 2", weight: 84.2 },
    { date: "Sem 3", weight: 83.5 },
    { date: "Sem 4", weight: 82.8 },
    { date: "Sem 5", weight: 82.1 },
    { date: "Sem 6", weight: 81.5 },
    { date: "Sem 7", weight: 81.0 },
    { date: "Sem 8", weight: 80.3 }
  ]

  const caloriesData = [
    { day: "Seg", consumed: 1850, goal: 2000 },
    { day: "Ter", consumed: 1920, goal: 2000 },
    { day: "Qua", consumed: 2100, goal: 2000 },
    { day: "Qui", consumed: 1780, goal: 2000 },
    { day: "Sex", consumed: 1950, goal: 2000 },
    { day: "Sáb", consumed: 2200, goal: 2000 },
    { day: "Dom", consumed: 1890, goal: 2000 }
  ]

  const goals = [
    {
      title: "Meta de Peso",
      current: 80.3,
      target: 75,
      unit: "kg",
      progress: 70,
      icon: <TrendingDown className="w-5 h-5" />,
      color: "from-blue-500 to-blue-600",
      status: "Em progresso"
    },
    {
      title: "Calorias Diárias",
      current: 1450,
      target: 2000,
      unit: "kcal",
      progress: 72.5,
      icon: <Flame className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
      status: "No caminho"
    },
    {
      title: "Hidratação",
      current: 2.1,
      target: 3,
      unit: "L",
      progress: 70,
      icon: <Droplet className="w-5 h-5" />,
      color: "from-cyan-500 to-blue-500",
      status: "Bom"
    },
    {
      title: "Exercícios Semanais",
      current: 4,
      target: 5,
      unit: "treinos",
      progress: 80,
      icon: <Activity className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
      status: "Quase lá"
    }
  ]

  const achievements = [
    { title: "7 Dias Consecutivos", icon: "🔥", unlocked: true },
    { title: "Primeira Meta Atingida", icon: "🎯", unlocked: true },
    { title: "10kg Perdidos", icon: "⚡", unlocked: false },
    { title: "30 Dias de Sequência", icon: "💪", unlocked: false },
    { title: "Mestre da Dieta", icon: "👑", unlocked: false },
    { title: "100 Treinos", icon: "🏆", unlocked: false }
  ]

  return (
    <div className="space-y-6">
      {/* Header com Resumo */}
      <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Seu Progresso</h2>
              <p className="text-sm text-blue-50">Acompanhe suas conquistas</p>
            </div>
          </div>
          <Badge className="bg-white/20 text-white border-0 px-3 py-1">
            <Calendar className="w-3 h-3 mr-1" />
            Dia 56
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-3">
            <div className="text-2xl font-bold">-4.7kg</div>
            <div className="text-xs text-blue-50">Peso perdido</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <div className="text-2xl font-bold">94%</div>
            <div className="text-xs text-blue-50">Taxa de sucesso</div>
          </div>
        </div>
      </Card>

      {/* Gráfico de Peso */}
      <Card className="p-6 bg-white shadow-lg border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Evolução de Peso</h3>
          <Badge variant="outline" className="border-green-200 text-green-700">
            <TrendingDown className="w-3 h-3 mr-1" />
            -4.7kg
          </Badge>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={weightData}>
            <defs>
              <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" stroke="#6B7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} domain={[78, 86]} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="weight" 
              stroke="#3B82F6" 
              strokeWidth={3}
              fill="url(#colorWeight)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Gráfico de Calorias Semanais */}
      <Card className="p-6 bg-white shadow-lg border-blue-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Calorias Esta Semana</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={caloriesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="day" stroke="#6B7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="consumed" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="goal" 
              stroke="#9CA3AF" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Metas Individuais */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Suas Metas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {goals.map((goal, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-lg">
              <div className={`bg-gradient-to-br ${goal.color} p-4 text-white`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    {goal.icon}
                  </div>
                  <Badge className="bg-white/20 text-white border-0 text-xs">
                    {goal.status}
                  </Badge>
                </div>
                <h4 className="font-semibold text-sm mb-1">{goal.title}</h4>
                <div className="text-2xl font-bold mb-1">
                  {goal.current} <span className="text-sm font-normal">/ {goal.target} {goal.unit}</span>
                </div>
              </div>
              <div className="p-4 bg-white">
                <Progress value={goal.progress} className="h-2 bg-gray-100" />
                <div className="text-xs text-gray-500 mt-2 text-right">{goal.progress}% completo</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Conquistas */}
      <Card className="p-6 bg-white shadow-lg border-blue-100">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">Conquistas</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl text-center transition-all ${
                achievement.unlocked
                  ? "bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300"
                  : "bg-gray-50 border-2 border-gray-200 opacity-50"
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <div className="text-xs font-medium text-gray-700">{achievement.title}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Estatísticas Gerais */}
      <Card className="p-6 bg-white shadow-lg border-blue-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Estatísticas Gerais</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600">56</div>
            <div className="text-xs text-gray-600 mt-1">Dias Ativos</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-3xl font-bold text-green-600">42</div>
            <div className="text-xs text-gray-600 mt-1">Treinos Completos</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <div className="text-3xl font-bold text-orange-600">8,450</div>
            <div className="text-xs text-gray-600 mt-1">Calorias Queimadas</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600">94%</div>
            <div className="text-xs text-gray-600 mt-1">Taxa de Sucesso</div>
          </div>
        </div>
      </Card>

      {/* Botão de Compartilhar */}
      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-6">
        <Award className="w-5 h-5 mr-2" />
        Compartilhar Progresso na Comunidade
      </Button>
    </div>
  )
}
