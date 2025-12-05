"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Utensils, Dumbbell, Users, Target } from "lucide-react"
import HomeTab from "./components/HomeTab"
import NutritionTab from "./components/NutritionTab"
import ExercisesTab from "./components/ExercisesTab"
import CommunityTab from "./components/CommunityTab"
import ProgressTab from "./components/ProgressTab"

export default function CalorieCounterApp() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header Minimalista - Estilo Cal.ai */}
      <header className="bg-[#111111] border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl bg-opacity-80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-[#00D9FF] to-[#0099FF] rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Cal.ai
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-white/70">Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="home" className="mt-0">
            <HomeTab />
          </TabsContent>
          <TabsContent value="nutrition" className="mt-0">
            <NutritionTab />
          </TabsContent>
          <TabsContent value="exercises" className="mt-0">
            <ExercisesTab />
          </TabsContent>
          <TabsContent value="community" className="mt-0">
            <CommunityTab />
          </TabsContent>
          <TabsContent value="progress" className="mt-0">
            <ProgressTab />
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation - Estilo Cal.ai */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#111111] border-t border-white/5 shadow-2xl z-50 backdrop-blur-xl bg-opacity-90">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 ${
                activeTab === "home"
                  ? "bg-gradient-to-br from-[#00D9FF]/20 to-[#0099FF]/20 text-[#00D9FF] border border-[#00D9FF]/30"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px] font-medium">Início</span>
            </button>
            <button
              onClick={() => setActiveTab("nutrition")}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 ${
                activeTab === "nutrition"
                  ? "bg-gradient-to-br from-[#00D9FF]/20 to-[#0099FF]/20 text-[#00D9FF] border border-[#00D9FF]/30"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              <Utensils className="w-5 h-5" />
              <span className="text-[10px] font-medium">Nutrição</span>
            </button>
            <button
              onClick={() => setActiveTab("exercises")}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 ${
                activeTab === "exercises"
                  ? "bg-gradient-to-br from-[#00D9FF]/20 to-[#0099FF]/20 text-[#00D9FF] border border-[#00D9FF]/30"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              <Dumbbell className="w-5 h-5" />
              <span className="text-[10px] font-medium">Exercícios</span>
            </button>
            <button
              onClick={() => setActiveTab("community")}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 ${
                activeTab === "community"
                  ? "bg-gradient-to-br from-[#00D9FF]/20 to-[#0099FF]/20 text-[#00D9FF] border border-[#00D9FF]/30"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="text-[10px] font-medium">Comunidade</span>
            </button>
            <button
              onClick={() => setActiveTab("progress")}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 ${
                activeTab === "progress"
                  ? "bg-gradient-to-br from-[#00D9FF]/20 to-[#0099FF]/20 text-[#00D9FF] border border-[#00D9FF]/30"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              <Target className="w-5 h-5" />
              <span className="text-[10px] font-medium">Progresso</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}
