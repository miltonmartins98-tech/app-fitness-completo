"use client"

import { useState } from "react"
import { Search, Clock, Flame, ChefHat, Heart, Filter, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Recipe {
  id: number
  name: string
  image: string
  calories: number
  protein: number
  carbs: number
  fat: number
  time: number
  difficulty: "Fácil" | "Médio" | "Difícil"
  category: string
  likes: number
  ingredients: string[]
  instructions: string[]
}

const mockRecipes: Recipe[] = [
  {
    id: 1,
    name: "Frango Grelhado com Batata Doce",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
    calories: 450,
    protein: 45,
    carbs: 35,
    fat: 12,
    time: 30,
    difficulty: "Fácil",
    category: "Almoço",
    likes: 234,
    ingredients: [
      "300g de peito de frango",
      "200g de batata doce",
      "Azeite de oliva",
      "Temperos a gosto"
    ],
    instructions: [
      "Tempere o frango com sal, pimenta e alho",
      "Grelhe o frango por 6-8 minutos de cada lado",
      "Asse a batata doce no forno a 200°C por 25 minutos",
      "Sirva quente"
    ]
  },
  {
    id: 2,
    name: "Omelete de Claras com Espinafre",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
    calories: 180,
    protein: 24,
    carbs: 8,
    fat: 6,
    time: 15,
    difficulty: "Fácil",
    category: "Café da Manhã",
    likes: 189,
    ingredients: [
      "4 claras de ovo",
      "1 xícara de espinafre",
      "Queijo cottage",
      "Sal e pimenta"
    ],
    instructions: [
      "Bata as claras levemente",
      "Refogue o espinafre",
      "Adicione as claras na frigideira",
      "Finalize com queijo cottage"
    ]
  },
  {
    id: 3,
    name: "Salmão com Legumes Assados",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    calories: 520,
    protein: 38,
    carbs: 28,
    fat: 26,
    time: 35,
    difficulty: "Médio",
    category: "Jantar",
    likes: 312,
    ingredients: [
      "200g de salmão",
      "Brócolis, cenoura, abobrinha",
      "Azeite e limão",
      "Ervas finas"
    ],
    instructions: [
      "Tempere o salmão com limão e ervas",
      "Corte os legumes em pedaços médios",
      "Asse tudo junto a 180°C por 25 minutos",
      "Sirva com um fio de azeite"
    ]
  },
  {
    id: 4,
    name: "Bowl de Quinoa com Frango",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    calories: 480,
    protein: 42,
    carbs: 45,
    fat: 14,
    time: 25,
    difficulty: "Fácil",
    category: "Almoço",
    likes: 267,
    ingredients: [
      "150g de quinoa cozida",
      "200g de frango desfiado",
      "Abacate, tomate, alface",
      "Molho de iogurte"
    ],
    instructions: [
      "Cozinhe a quinoa conforme embalagem",
      "Grelhe e desfie o frango",
      "Monte o bowl com todos os ingredientes",
      "Finalize com molho de iogurte"
    ]
  },
  {
    id: 5,
    name: "Panqueca Proteica de Banana",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop",
    calories: 320,
    protein: 28,
    carbs: 38,
    fat: 8,
    time: 10,
    difficulty: "Fácil",
    category: "Café da Manhã",
    likes: 421,
    ingredients: [
      "1 banana madura",
      "2 ovos",
      "30g de whey protein",
      "Canela a gosto"
    ],
    instructions: [
      "Amasse a banana com um garfo",
      "Misture os ovos e o whey",
      "Adicione canela",
      "Frite em frigideira antiaderente"
    ]
  },
  {
    id: 6,
    name: "Wrap de Atum Integral",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop",
    calories: 380,
    protein: 32,
    carbs: 42,
    fat: 10,
    time: 12,
    difficulty: "Fácil",
    category: "Lanche",
    likes: 198,
    ingredients: [
      "1 tortilha integral",
      "1 lata de atum",
      "Alface, tomate, cenoura",
      "Iogurte grego"
    ],
    instructions: [
      "Escorra o atum",
      "Misture com iogurte grego",
      "Adicione os vegetais",
      "Enrole a tortilha"
    ]
  }
]

const categories = ["Todos", "Café da Manhã", "Almoço", "Jantar", "Lanche"]
const difficulties = ["Todos", "Fácil", "Médio", "Difícil"]

export default function RecipesTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todos")
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  const filteredRecipes = mockRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || recipe.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "Todos" || recipe.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Receitas Fitness</h2>
            <p className="text-sm text-white/50">Refeições saudáveis e deliciosas</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <Input
            type="text"
            placeholder="Buscar receitas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-2xl focus:ring-2 focus:ring-orange-500/50"
          />
        </div>

        {/* Filters */}
        <div className="space-y-3">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Difficulty */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-white/50" />
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedDifficulty === difficulty
                      ? "bg-white/20 text-white border border-white/30"
                      : "bg-white/5 text-white/50 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/10"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Badges on Image */}
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className="bg-black/60 backdrop-blur-sm text-white border-white/20">
                  {recipe.category}
                </Badge>
              </div>
              
              <div className="absolute top-3 right-3">
                <button className="w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-colors">
                  <Heart className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Time & Difficulty */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-white" />
                  <span className="text-xs font-medium text-white">{recipe.time} min</span>
                </div>
                <div className="bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                  <span className="text-xs font-medium text-white">{recipe.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-white text-lg line-clamp-2 group-hover:text-orange-400 transition-colors">
                {recipe.name}
              </h3>

              {/* Macros */}
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                  <div className="flex items-center gap-1 mb-1">
                    <Flame className="w-3 h-3 text-orange-400" />
                    <span className="text-[10px] text-white/50">Calorias</span>
                  </div>
                  <p className="text-sm font-bold text-white">{recipe.calories}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                  <p className="text-[10px] text-white/50 mb-1">Proteína</p>
                  <p className="text-sm font-bold text-emerald-400">{recipe.protein}g</p>
                </div>
                <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                  <p className="text-[10px] text-white/50 mb-1">Carbs</p>
                  <p className="text-sm font-bold text-blue-400">{recipe.carbs}g</p>
                </div>
                <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                  <p className="text-[10px] text-white/50 mb-1">Gordura</p>
                  <p className="text-sm font-bold text-yellow-400">{recipe.fat}g</p>
                </div>
              </div>

              {/* Likes */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                  <span className="text-xs text-white/50">{recipe.likes} curtidas</span>
                </div>
                <button className="text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors">
                  Ver receita →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="bg-[#0D0D0D] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Header */}
            <div className="relative h-64 overflow-hidden rounded-t-3xl">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-black/50 to-transparent" />
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <span className="text-white text-xl">×</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Title & Info */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">{selectedRecipe.name}</h2>
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
                    {selectedRecipe.category}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-white/70">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{selectedRecipe.time} minutos</span>
                  </div>
                  <div className="text-sm text-white/70">
                    Dificuldade: <span className="text-white font-medium">{selectedRecipe.difficulty}</span>
                  </div>
                </div>
              </div>

              {/* Macros Grid */}
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                  <Flame className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{selectedRecipe.calories}</p>
                  <p className="text-xs text-white/50 mt-1">Calorias</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-emerald-400">{selectedRecipe.protein}g</p>
                  <p className="text-xs text-white/50 mt-1">Proteína</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                  <div className="w-5 h-5 bg-blue-400 rounded-full mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-400">{selectedRecipe.carbs}g</p>
                  <p className="text-xs text-white/50 mt-1">Carboidratos</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                  <div className="w-5 h-5 bg-yellow-400 rounded-full mx-auto mb-2" />
                  <p className="text-2xl font-bold text-yellow-400">{selectedRecipe.fat}g</p>
                  <p className="text-xs text-white/50 mt-1">Gordura</p>
                </div>
              </div>

              {/* Ingredients */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Ingredientes</h3>
                <ul className="space-y-2">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-white/70 bg-white/5 rounded-xl p-3 border border-white/10"
                    >
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Modo de Preparo</h3>
                <ol className="space-y-3">
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-white/70 bg-white/5 rounded-xl p-4 border border-white/10"
                    >
                      <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-4 rounded-2xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:scale-[1.02]">
                Adicionar ao Plano Alimentar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <ChefHat className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/50">Nenhuma receita encontrada</p>
          <p className="text-white/30 text-sm mt-2">Tente ajustar os filtros</p>
        </div>
      )}
    </div>
  )
}
