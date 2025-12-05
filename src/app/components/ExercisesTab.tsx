"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Flame, Clock, Zap, Play } from "lucide-react"

export default function ExercisesTab() {
  const exercises = [
    {
      name: "HIIT - Queima Rápida",
      duration: "20 min",
      calories: 250,
      intensity: "Alta",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
      description: "Treino intervalado de alta intensidade",
      color: "from-red-500 to-orange-500"
    },
    {
      name: "Caminhada Rápida",
      duration: "30 min",
      calories: 150,
      intensity: "Moderada",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop",
      description: "Ótimo para iniciantes",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Corrida Leve",
      duration: "25 min",
      calories: 200,
      intensity: "Moderada",
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=600&fit=crop",
      description: "Melhora resistência cardiovascular",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Treino de Força",
      duration: "40 min",
      calories: 180,
      intensity: "Alta",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
      description: "Desenvolvimento muscular",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Yoga Flow",
      duration: "30 min",
      calories: 120,
      intensity: "Baixa",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
      description: "Flexibilidade e equilíbrio",
      color: "from-indigo-500 to-purple-500"
    },
    {
      name: "Ciclismo Indoor",
      duration: "35 min",
      calories: 280,
      intensity: "Alta",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=600&fit=crop",
      description: "Queima calórica intensa",
      color: "from-yellow-500 to-orange-500"
    }
  ]

  const metabolismTips = [
    {
      title: "Treino em Jejum",
      description: "Exercícios matinais aceleram o metabolismo por até 12h",
      icon: "⏰",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
    },
    {
      title: "HIIT 3x/Semana",
      description: "Intervalados aumentam queima calórica pós-treino",
      icon: "🔥",
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=300&fit=crop"
    },
    {
      title: "Musculação Regular",
      description: "Mais músculos = metabolismo mais acelerado",
      icon: "💪",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop"
    }
  ]

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "Alta":
        return "bg-red-100 text-red-700 border-red-200"
      case "Moderada":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Baixa":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Exercícios</h2>
            <p className="text-sm text-blue-50">Acelere seu metabolismo</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4" />
            <span>830 kcal queimadas hoje</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>95 min ativos</span>
          </div>
        </div>
      </Card>

      {/* Dicas de Metabolismo com Imagens */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Aumente seu Metabolismo</h3>
        <div className="grid grid-cols-1 gap-3">
          {metabolismTips.map((tip, index) => (
            <Card key={index} className="overflow-hidden shadow-lg border-blue-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-0">
                {/* Imagem lateral */}
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                  <img 
                    src={tip.image} 
                    alt={tip.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Conteúdo */}
                <div className="flex-1 p-4 bg-white">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{tip.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{tip.title}</h4>
                      <p className="text-xs text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Lista de Exercícios com Imagens Reais */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Treinos Recomendados</h3>
        <div className="grid grid-cols-1 gap-4">
          {exercises.map((exercise, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              {/* Imagem de Fundo */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={exercise.image} 
                  alt={exercise.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${exercise.color} opacity-85`}></div>
                
                {/* Conteúdo sobre a imagem */}
                <div className="absolute inset-0 p-4 text-white flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{exercise.name}</h3>
                      <p className="text-sm text-white/90">{exercise.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      <span>{exercise.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Flame className="w-3 h-3" />
                      <span>{exercise.calories} kcal</span>
                    </div>
                    <Badge className={`${getIntensityColor(exercise.intensity)} border backdrop-blur-sm`}>
                      {exercise.intensity}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg">
                  <Play className="w-4 h-4 mr-2" />
                  Iniciar Treino
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Estatísticas Semanais */}
      <Card className="p-6 bg-white shadow-xl border-blue-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Esta Semana</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md">
            <div className="text-3xl font-bold text-blue-600">5</div>
            <div className="text-xs text-gray-600 mt-1">Treinos Completos</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-md">
            <div className="text-3xl font-bold text-orange-600">1,240</div>
            <div className="text-xs text-gray-600 mt-1">Calorias Queimadas</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md">
            <div className="text-3xl font-bold text-green-600">285</div>
            <div className="text-xs text-gray-600 mt-1">Minutos Ativos</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md">
            <div className="text-3xl font-bold text-purple-600">12</div>
            <div className="text-xs text-gray-600 mt-1">Dias de Sequência</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
