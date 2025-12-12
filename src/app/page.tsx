"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Camera, TrendingUp, Trophy, Users, ChefHat, Dumbbell } from "lucide-react"
import HomeTab from "./components/HomeTab"
import ScanTab from "./components/ScanTab"
import ProgressTab from "./components/ProgressTab"
import AchievementsTab from "./components/AchievementsTab"
import CommunityTab from "./components/CommunityTab"
import RecipesTab from "./components/RecipesTab"
import WorkoutTab from "./components/WorkoutTab"

export default function SnapFitApp() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] font-inter">
      {/* Header Premium */}
      <header className="bg-gradient-to-r from-[#1A1A1A]/95 to-[#0D0D0D]/95 border-b border-orange-500/10 sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/c28516d3-cb7b-44ec-a0a5-348e402fe550.webp" 
              alt="SnapFit Logo" 
              className="h-24 w-auto sm:h-32 object-contain mix-blend-lighten"
            />
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 px-4 py-2 rounded-full border border-orange-500/20">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-orange-400">Premium</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 pb-28">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="home" className="mt-0">
            <HomeTab />
          </TabsContent>
          <TabsContent value="scan" className="mt-0">
            <ScanTab />
          </TabsContent>
          <TabsContent value="recipes" className="mt-0">
            <RecipesTab />
          </TabsContent>
          <TabsContent value="workout" className="mt-0">
            <WorkoutTab />
          </TabsContent>
          <TabsContent value="progress" className="mt-0">
            <ProgressTab />
          </TabsContent>
          <TabsContent value="achievements" className="mt-0">
            <AchievementsTab />
          </TabsContent>
          <TabsContent value="community" className="mt-0">
            <CommunityTab />
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation Premium */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D]/95 border-t border-orange-500/10 shadow-2xl z-50 backdrop-blur-xl">
        <div className="container mx-auto px-1 sm:px-2">
          <div className="flex items-center justify-around py-3">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex flex-col items-center gap-1 px-2 sm:px-3 py-2 rounded-2xl transition-all duration-300 ${
                activeTab === "home"
                  ? "bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-400 scale-105"
                  : "text-white/40 hover:text-white/70 hover:scale-105"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[9px] sm:text-[10px] font-medium">Início</span>
            </button>
            <button
              onClick={() => setActiveTab("scan")}
              className={`flex flex-col items-center gap-1 px-2 sm:px-3 py-2 rounded-2xl transition-all duration-300 ${
                activeTab === "scan"
                  ? "bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-400 scale-105"
                  : "text-white/40 hover:text-white/70 hover:scale-105"
              }`}
            >
              <Camera className="w-5 h-5" />
              <span className="text-[9px] sm:text-[10px] font-medium">Scan</span>
            </button>
            <button
              onClick={() => setActiveTab("recipes")}
              className={`flex flex-col items-center gap-1 px-2 sm:px-3 py-2 rounded-2xl transition-all duration-300 ${
                activeTab === "recipes"
                  ? "bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-400 scale-105"
                  : "text-white/40 hover:text-white/70 hover:scale-105"
              }`}
            >
              <ChefHat className="w-5 h-5" />
              <span className="text-[9px] sm:text-[10px] font-medium">Receitas</span>
            </button>
            <button
              onClick={() => setActiveTab("workout")}
              className={`flex flex-col items-center gap-1 px-2 sm:px-3 py-2 rounded-2xl transition-all duration-300 ${
                activeTab === "workout"
                  ? "bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-400 scale-105"
                  : "text-white/40 hover:text-white/70 hover:scale-105"
              }`}
            >
              <Dumbbell className="w-5 h-5" />
              <span className="text-[9px] sm:text-[10px] font-medium">Treino</span>
            </button>
            <button
              onClick={() => setActiveTab("progress")}
              className={`flex flex-col items-center gap-1 px-2 sm:px-3 py-2 rounded-2xl transition-all duration-300 ${
                activeTab === "progress"
                  ? "bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-400 scale-105"
                  : "text-white/40 hover:text-white/70 hover:scale-105"
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span className="text-[9px] sm:text-[10px] font-medium">Progresso</span>
            </button>
            <button
              onClick={() => setActiveTab("achievements")}
              className={`flex flex-col items-center gap-1 px-2 sm:px-3 py-2 rounded-2xl transition-all duration-300 ${
                activeTab === "achievements"
                  ? "bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-400 scale-105"
                  : "text-white/40 hover:text-white/70 hover:scale-105"
              }`}
            >
              <Trophy className="w-5 h-5" />
              <span className="text-[9px] sm:text-[10px] font-medium">Conquistas</span>
            </button>
            <button
              onClick={() => setActiveTab("community")}
              className={`flex flex-col items-center gap-1 px-2 sm:px-3 py-2 rounded-2xl transition-all duration-300 ${
                activeTab === "community"
                  ? "bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-400 scale-105"
                  : "text-white/40 hover:text-white/70 hover:scale-105"
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="text-[9px] sm:text-[10px] font-medium">Social</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}
