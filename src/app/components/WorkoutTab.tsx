"use client"

import { useState } from "react"
import { Dumbbell, Flame, Clock, Target, Play, Check, Video, X } from "lucide-react"

interface Exercise {
  id: number
  name: string
  sets: string
  reps: string
  calories: number
  duration: string
  category: string
  difficulty: "Iniciante" | "Intermediário" | "Avançado"
  completed: boolean
  videoUrl: string
  description: string
}

export default function WorkoutTab() {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: 1,
      name: "Esteira - Corrida Intervalada",
      sets: "1",
      reps: "20 min",
      calories: 250,
      duration: "20 min",
      category: "Cardio",
      difficulty: "Intermediário",
      completed: false,
      videoUrl: "https://www.youtube.com/embed/gcW38Y4gKaM",
      description: "Alterne entre corrida intensa (1 min) e caminhada (1 min) para maximizar a queima de gordura."
    },
    {
      id: 2,
      name: "Burpees",
      sets: "4",
      reps: "15",
      calories: 180,
      duration: "12 min",
      category: "HIIT",
      difficulty: "Avançado",
      completed: false,
      videoUrl: "https://www.youtube.com/embed/dZgVxmf6jkA",
      description: "Exercício completo que trabalha corpo inteiro. Mantenha o core contraído durante todo movimento."
    },
    {
      id: 3,
      name: "Mountain Climbers",
      sets: "3",
      reps: "20",
      calories: 120,
      duration: "10 min",
      category: "HIIT",
      difficulty: "Intermediário",
      completed: false,
      videoUrl: "https://www.youtube.com/embed/nmwgirgXLYM",
      description: "Movimento rápido que eleva frequência cardíaca. Mantenha quadril alinhado e core ativado."
    },
    {
      id: 4,
      name: "Bicicleta Ergométrica",
      sets: "1",
      reps: "30 min",
      calories: 300,
      duration: "30 min",
      category: "Cardio",
      difficulty: "Iniciante",
      completed: false,
      videoUrl: "https://www.youtube.com/embed/DmVWG4riz7Y",
      description: "Cardio de baixo impacto. Ajuste resistência para manter 70-80% da frequência cardíaca máxima."
    },
    {
      id: 5,
      name: "Jump Rope (Pular Corda)",
      sets: "5",
      reps: "2 min",
      calories: 200,
      duration: "15 min",
      category: "Cardio",
      difficulty: "Intermediário",
      completed: false,
      videoUrl: "https://www.youtube.com/embed/FJmRQ5iTXKE",
      description: "Excelente para coordenação e queima calórica. Use tênis com amortecimento adequado."
    },
    {
      id: 6,
      name: "Agachamento com Salto",
      sets: "4",
      reps: "12",
      calories: 150,
      duration: "10 min",
      category: "HIIT",
      difficulty: "Avançado",
      completed: false,
      videoUrl: "https://www.youtube.com/embed/A-cFYWvaHr0",
      description: "Movimento explosivo que trabalha pernas e glúteos. Aterrisse suavemente para proteger joelhos."
    },
    {
      id: 7,
      name: "Prancha Dinâmica",
      sets: "3",
      reps: "45 seg",
      calories: 90,
      duration: "8 min",
      category: "Core",
      difficulty: "Intermediário",
      completed: false,
      videoUrl: "https://www.youtube.com/embed/pvIjsG5Svck",
      description: "Fortalece abdômen e estabilizadores. Mantenha corpo alinhado da cabeça aos pés."
    },
    {
      id: 8,
      name: "Elíptico",
      sets: "1",
      reps: "25 min",
      calories: 280,
      duration: "25 min",
      category: "Cardio",
      difficulty: "Iniciante",
      completed: false,
      videoUrl: "https://www.youtube.com/embed/4Rl7G8RF_hQ",
      description: "Cardio de baixo impacto que trabalha corpo todo. Varie inclinação e resistência."
    },
    {
      id: 9,
      name: "Kettlebell Swing",
      sets: "4",
      reps: "15",
      calories: 160,
      duration: "12 min",
      category: "Funcional",
      difficulty: "Intermediário",
      completed: false,
      videoUrl: "https://www.youtube.com/embed/YSxHifyI6s8",
      description: "Movimento de quadril explosivo. Use força dos glúteos, não dos braços."
    },
    {
      id: 10,
      name: "Box Jump",
      sets: "4",
      reps: "10",
      calories: 140,
      duration: "10 min",
      category: "HIIT",
      difficulty: "Avançado",
      completed: false,
      videoUrl: "https://www.youtube.com/embed/NBY9-kTuHEk",
      description: "Pliometria para potência de pernas. Comece com altura baixa e progrida gradualmente."
    }
  ])

  const [filter, setFilter] = useState<string>("Todos")
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  const toggleComplete = (id: number) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, completed: !ex.completed } : ex
    ))
  }

  const categories = ["Todos", "Cardio", "HIIT", "Core", "Funcional"]
  
  const filteredExercises = filter === "Todos" 
    ? exercises 
    : exercises.filter(ex => ex.category === filter)

  const totalCalories = exercises.filter(ex => ex.completed).reduce((sum, ex) => sum + ex.calories, 0)
  const completedCount = exercises.filter(ex => ex.completed).length

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "Iniciante": return "text-green-400 bg-green-500/10 border-green-500/20"
      case "Intermediário": return "text-orange-400 bg-orange-500/10 border-orange-500/20"
      case "Avançado": return "text-red-400 bg-red-500/10 border-red-500/20"
      default: return "text-gray-400 bg-gray-500/10 border-gray-500/20"
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Treino para Emagrecimento
          </h2>
          <p className="text-sm text-white/60">
            Exercícios focados em queima de gordura
          </p>
        </div>
        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
          <Dumbbell className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-white/60">Calorias Queimadas</p>
              <p className="text-xl font-bold text-white">{totalCalories}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-white/60">Exercícios Feitos</p>
              <p className="text-xl font-bold text-white">{completedCount}/{exercises.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              filter === cat
                ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/20"
                : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Exercise List */}
      <div className="space-y-3">
        {filteredExercises.map((exercise, index) => (
          <div
            key={exercise.id}
            className={`bg-white/5 backdrop-blur-xl rounded-2xl p-4 border transition-all duration-300 hover:scale-[1.02] ${
              exercise.completed 
                ? "border-orange-500/30 bg-orange-500/5" 
                : "border-white/10 hover:border-orange-500/20"
            }`}
            style={{
              animationDelay: `${index * 50}ms`
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={`font-semibold ${exercise.completed ? "text-orange-400" : "text-white"}`}>
                    {exercise.name}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-lg border ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Dumbbell className="w-4 h-4 text-white/40" />
                    <span className="text-xs text-white/60">{exercise.sets} séries</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-white/40" />
                    <span className="text-xs text-white/60">{exercise.reps} reps</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-white/40" />
                    <span className="text-xs text-white/60">{exercise.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-orange-400 font-medium">{exercise.calories} kcal</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-lg bg-white/5 text-white/60 border border-white/10">
                    {exercise.category}
                  </span>
                  <button
                    onClick={() => setSelectedExercise(exercise)}
                    className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-all duration-300"
                  >
                    <Video className="w-3.5 h-3.5" />
                    Ver vídeo
                  </button>
                </div>
              </div>

              <button
                onClick={() => toggleComplete(exercise.id)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  exercise.completed
                    ? "bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/20"
                    : "bg-white/5 text-white/40 hover:bg-white/10 border border-white/10"
                }`}
              >
                {exercise.completed ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tips Card */}
      <div className="bg-gradient-to-br from-orange-500/10 to-red-600/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-orange-400" />
          Dicas para Maximizar Resultados
        </h3>
        <ul className="space-y-2 text-sm text-white/70">
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">•</span>
            <span>Mantenha a frequência cardíaca elevada durante os exercícios HIIT</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">•</span>
            <span>Descanse 30-60 segundos entre as séries para otimizar queima de gordura</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">•</span>
            <span>Combine com alimentação balanceada para melhores resultados</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-1">•</span>
            <span>Hidrate-se bem antes, durante e após o treino</span>
          </li>
        </ul>
      </div>

      {/* Video Modal */}
      {selectedExercise && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedExercise(null)}
        >
          <div 
            className="bg-[#0D0D0D] rounded-3xl border border-white/10 max-w-4xl w-full overflow-hidden shadow-2xl animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {selectedExercise.name}
                </h3>
                <p className="text-sm text-white/60">
                  Vídeo explicativo do exercício
                </p>
              </div>
              <button
                onClick={() => setSelectedExercise(null)}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-300"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={selectedExercise.videoUrl}
                title={selectedExercise.name}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Exercise Details */}
            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white/80 mb-2">Descrição</h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  {selectedExercise.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <p className="text-xs text-white/60 mb-1">Séries</p>
                  <p className="text-lg font-bold text-white">{selectedExercise.sets}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <p className="text-xs text-white/60 mb-1">Repetições</p>
                  <p className="text-lg font-bold text-white">{selectedExercise.reps}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <p className="text-xs text-white/60 mb-1">Duração</p>
                  <p className="text-lg font-bold text-white">{selectedExercise.duration}</p>
                </div>
                <div className="bg-orange-500/10 rounded-xl p-3 border border-orange-500/20">
                  <p className="text-xs text-orange-400/80 mb-1">Calorias</p>
                  <p className="text-lg font-bold text-orange-400">{selectedExercise.calories}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs px-3 py-1.5 rounded-lg border ${getDifficultyColor(selectedExercise.difficulty)}`}>
                  {selectedExercise.difficulty}
                </span>
                <span className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/60 border border-white/10">
                  {selectedExercise.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
