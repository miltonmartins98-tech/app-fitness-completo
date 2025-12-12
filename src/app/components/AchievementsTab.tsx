"use client"

import { Card } from "@/components/ui/card"
import { Trophy, Star, Flame, Target, TrendingUp, Award, Zap, Crown } from "lucide-react"

export default function AchievementsTab() {
  const achievements = [
    {
      id: 1,
      title: "Primeira Semana",
      description: "Complete 7 dias consecutivos",
      icon: Flame,
      progress: 100,
      unlocked: true,
      color: "from-orange-400 to-red-500",
      points: 50,
    },
    {
      id: 2,
      title: "Meta Perfeita",
      description: "Atinja sua meta diária 5 vezes",
      icon: Target,
      progress: 100,
      unlocked: true,
      color: "from-emerald-400 to-cyan-500",
      points: 100,
    },
    {
      id: 3,
      title: "Sequência de Ouro",
      description: "Mantenha 30 dias de sequência",
      icon: Crown,
      progress: 40,
      unlocked: false,
      color: "from-yellow-400 to-orange-500",
      points: 250,
    },
    {
      id: 4,
      title: "Explorador Nutricional",
      description: "Escaneie 50 refeições diferentes",
      icon: Star,
      progress: 68,
      unlocked: false,
      color: "from-purple-400 to-pink-500",
      points: 150,
    },
    {
      id: 5,
      title: "Mestre do Equilíbrio",
      description: "Balance macros perfeitamente 10 vezes",
      icon: Award,
      progress: 30,
      unlocked: false,
      color: "from-cyan-400 to-blue-500",
      points: 200,
    },
    {
      id: 6,
      title: "Velocista",
      description: "Registre refeições em menos de 30s",
      icon: Zap,
      progress: 100,
      unlocked: true,
      color: "from-yellow-300 to-yellow-500",
      points: 75,
    },
  ]

  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0)
  const unlockedCount = achievements.filter(a => a.unlocked).length

  const levels = [
    { name: "Iniciante", min: 0, max: 100 },
    { name: "Intermediário", min: 100, max: 300 },
    { name: "Avançado", min: 300, max: 600 },
    { name: "Expert", min: 600, max: 1000 },
    { name: "Mestre", min: 1000, max: 9999 },
  ]

  const currentLevel = levels.find(l => totalPoints >= l.min && totalPoints < l.max) || levels[0]
  const nextLevel = levels[levels.indexOf(currentLevel) + 1]
  const levelProgress = nextLevel ? ((totalPoints - currentLevel.min) / (nextLevel.max - currentLevel.min)) * 100 : 100

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Conquistas</h2>
        <p className="text-white/60 text-sm">Continue progredindo e desbloqueie recompensas</p>
      </div>

      {/* Level Card */}
      <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border-white/10 p-6 sm:p-8 shadow-2xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-white/60 text-sm">Nível Atual</p>
              <h3 className="text-3xl font-bold text-white">{currentLevel.name}</h3>
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-3xl flex items-center justify-center border border-yellow-400/30">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Progresso para {nextLevel?.name || "Máximo"}</span>
              <span className="text-emerald-400 font-bold">{totalPoints} / {nextLevel?.max || currentLevel.max} pts</span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <p className="text-white/60 text-xs mb-1">Conquistas</p>
              <p className="text-2xl font-bold text-white">{unlockedCount}/{achievements.length}</p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-xs mb-1">Pontos Totais</p>
              <p className="text-2xl font-bold text-emerald-400">{totalPoints}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Achievements Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Todas as Conquistas</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <Card
                key={achievement.id}
                className={`border-white/10 p-5 transition-all duration-300 hover:scale-[1.02] ${
                  achievement.unlocked
                    ? "bg-[#1A1A1A] hover:border-white/20"
                    : "bg-[#1A1A1A]/50 opacity-60"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          achievement.unlocked
                            ? `bg-gradient-to-br ${achievement.color}`
                            : "bg-white/5"
                        }`}
                      >
                        <Icon className={`w-6 h-6 ${achievement.unlocked ? "text-white" : "text-white/40"}`} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="text-white font-semibold text-sm">{achievement.title}</h4>
                        <p className="text-white/60 text-xs">{achievement.description}</p>
                      </div>
                    </div>
                    {achievement.unlocked && (
                      <div className="bg-emerald-500/20 px-2 py-1 rounded-full border border-emerald-400/30">
                        <span className="text-emerald-400 text-xs font-bold">+{achievement.points}</span>
                      </div>
                    )}
                  </div>

                  {!achievement.unlocked && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/60">Progresso</span>
                        <span className="text-white/80 font-medium">{achievement.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${achievement.color} rounded-full transition-all duration-500`}
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {achievement.unlocked && (
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span>Desbloqueado</span>
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Motivational Card */}
      <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-400/30 p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-black" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-semibold mb-1">Continue assim!</h4>
            <p className="text-white/60 text-sm">Você está a apenas {nextLevel ? nextLevel.max - totalPoints : 0} pontos do próximo nível</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
