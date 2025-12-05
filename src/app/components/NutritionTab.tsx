"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Flame, TrendingDown, TrendingUp, Camera, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import CameraCapture from "./CameraCapture"
import { foodDatabase, searchFoods, type FoodItem } from "@/lib/foodDatabase"

export default function NutritionTab() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCamera, setShowCamera] = useState(false)
  const [addedFoods, setAddedFoods] = useState<FoodItem[]>([])
  const [todayCalories, setTodayCalories] = useState(0)

  // Filtra alimentos baseado na busca
  const filteredFoods = searchQuery.length > 0 
    ? searchFoods(searchQuery) 
    : foodDatabase.slice(0, 12) // Mostra os primeiros 12 por padrão

  const dietPlans = [
    {
      name: "Dieta de Emagrecimento",
      description: "Déficit calórico controlado para perda de peso saudável",
      calories: 1600,
      icon: <TrendingDown className="w-5 h-5" />,
      color: "from-red-500 to-orange-500",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop",
      macros: { protein: 120, carbs: 150, fat: 45 }
    },
    {
      name: "Ganho de Massa Muscular",
      description: "Superávit calórico com alta proteína para hipertrofia",
      calories: 2800,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
      image: "https://images.unsplash.com/photo-1532384816664-01b8b7238c8d?w=800&h=600&fit=crop",
      macros: { protein: 180, carbs: 350, fat: 70 }
    }
  ]

  const handleFoodDetected = (result: any) => {
    const newFood: FoodItem = {
      id: Date.now().toString(),
      name: result.name,
      calories: result.calories,
      protein: result.protein,
      carbs: result.carbs,
      fat: result.fat,
      image: "📸",
      category: "Detectado",
      portion: result.portion,
      keywords: []
    }
    setAddedFoods([newFood, ...addedFoods])
    setTodayCalories(todayCalories + result.calories)
  }

  const handleAddFood = (food: FoodItem) => {
    setAddedFoods([food, ...addedFoods])
    setTodayCalories(todayCalories + food.calories)
  }

  return (
    <div className="space-y-6">
      {/* Camera Modal */}
      {showCamera && (
        <CameraCapture
          onClose={() => setShowCamera(false)}
          onFoodDetected={handleFoodDetected}
        />
      )}

      {/* Botão de Câmera em Destaque */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 border-0 shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Escanear Alimento com IA
            </h3>
            <p className="text-sm text-blue-50">
              Tire uma foto do seu prato e nossa IA calcula as calorias automaticamente
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => setShowCamera(true)}
            className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl w-full sm:w-auto font-semibold"
          >
            <Camera className="w-5 h-5 mr-2" />
            Abrir Câmera
          </Button>
        </div>
      </Card>

      {/* Alimentos Adicionados Hoje */}
      {addedFoods.length > 0 && (
        <Card className="p-6 bg-white shadow-xl border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">✅ Adicionados Hoje</h3>
            <Badge className="bg-blue-100 text-blue-700 border-0 text-base px-3 py-1">
              {todayCalories} kcal
            </Badge>
          </div>
          <div className="space-y-3">
            {addedFoods.map((food, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {food.image.startsWith('http') ? (
                    <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">{food.image}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-gray-900 truncate">{food.name}</h4>
                  <p className="text-xs text-gray-600">{food.portion}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-700 text-base">{food.calories} kcal</div>
                  <div className="text-xs text-gray-600">
                    P:{food.protein}g C:{food.carbs}g G:{food.fat}g
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Busca de Alimentos */}
      <Card className="p-4 bg-white shadow-xl border-blue-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar alimentos no banco de dados..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-blue-200 focus:border-blue-400"
          />
        </div>
        {searchQuery && (
          <p className="text-xs text-gray-500 mt-2">
            {filteredFoods.length} alimento(s) encontrado(s)
          </p>
        )}
      </Card>

      {/* Planos de Dieta com Imagens Reais */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">🎯 Planos de Dieta</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dietPlans.map((plan, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              {/* Imagem de Fundo */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={plan.image} 
                  alt={plan.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${plan.color} opacity-90`}></div>
                
                {/* Conteúdo sobre a imagem */}
                <div className="absolute inset-0 p-6 text-white flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      {plan.icon}
                    </div>
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
                      {plan.calories} kcal/dia
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                    <p className="text-sm text-white/90 mb-3">{plan.description}</p>
                    
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                        <div className="font-bold">{plan.macros.protein}g</div>
                        <div className="text-white/80">Proteína</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                        <div className="font-bold">{plan.macros.carbs}g</div>
                        <div className="text-white/80">Carbs</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                        <div className="font-bold">{plan.macros.fat}g</div>
                        <div className="text-white/80">Gordura</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-white">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg">
                  Ver Plano Completo
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Lista de Alimentos */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">🍽️ Banco de Alimentos</h2>
          <Badge variant="outline" className="border-blue-200 text-blue-700">
            {foodDatabase.length} alimentos
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {filteredFoods.map((food) => (
            <Card key={food.id} className="p-4 bg-white shadow-lg border-blue-100 hover:shadow-xl transition-all duration-300 hover:border-blue-300">
              <div className="flex items-center gap-4">
                {/* Imagem do Alimento */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md overflow-hidden">
                  <img 
                    src={food.image} 
                    alt={food.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Informações */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{food.name}</h3>
                    <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 flex-shrink-0">
                      {food.category}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-gray-500 mb-2">{food.portion}</p>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-orange-500" />
                      <span className="font-medium">{food.calories} kcal</span>
                    </div>
                    <span>P: {food.protein}g</span>
                    <span>C: {food.carbs}g</span>
                    <span>G: {food.fat}g</span>
                  </div>

                  <Button 
                    size="sm" 
                    onClick={() => handleAddFood(food)}
                    className="h-7 text-xs bg-blue-600 hover:bg-blue-700 shadow-md"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Adicionar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredFoods.length === 0 && searchQuery && (
          <Card className="p-8 text-center bg-gray-50">
            <p className="text-gray-500">Nenhum alimento encontrado para "{searchQuery}"</p>
            <p className="text-sm text-gray-400 mt-2">Tente usar a câmera para escanear o alimento</p>
          </Card>
        )}
      </div>

      {/* Dica Nutricional */}
      <Card className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xl">💡</span>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-1">Dica do Dia</h3>
            <p className="text-xs text-blue-50">
              Use a câmera para escanear seus alimentos e obter informações nutricionais precisas instantaneamente! 
              Nossa IA reconhece mais de 26 alimentos diferentes.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
