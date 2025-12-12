"use client"

import { Card } from "@/components/ui/card"
import { Heart, MessageCircle, Share2, Bookmark, TrendingUp, Users, ChefHat } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function CommunityTab() {
  const posts = [
    {
      id: 1,
      user: {
        name: "Maria Silva",
        avatar: "MS",
        level: "Expert",
      },
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
      title: "Salada Mediterrânea Completa",
      description: "Perfeita para o almoço! Rica em proteínas e fibras 🥗",
      calories: 420,
      likes: 234,
      comments: 45,
      time: "2h atrás",
      tags: ["Saudável", "Vegetariano", "Mediterrâneo"],
    },
    {
      id: 2,
      user: {
        name: "João Santos",
        avatar: "JS",
        level: "Avançado",
      },
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
      title: "Pizza Fit de Frango",
      description: "Quem disse que pizza não pode ser saudável? 🍕",
      calories: 580,
      likes: 189,
      comments: 32,
      time: "5h atrás",
      tags: ["Fitness", "Alto Proteína"],
    },
    {
      id: 3,
      user: {
        name: "Ana Costa",
        avatar: "AC",
        level: "Intermediário",
      },
      image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&h=400&fit=crop",
      title: "Bowl de Açaí Energético",
      description: "Pré-treino perfeito! Cheio de energia 💪",
      calories: 380,
      likes: 312,
      comments: 58,
      time: "1d atrás",
      tags: ["Pré-Treino", "Energético", "Frutas"],
    },
  ]

  const trendingRecipes = [
    { name: "Smoothie Verde Detox", views: "12.5k", trend: "+45%" },
    { name: "Frango Grelhado Perfeito", views: "8.2k", trend: "+32%" },
    { name: "Panqueca de Aveia", views: "6.8k", trend: "+28%" },
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Comunidade</h2>
        <p className="text-white/60 text-sm">Compartilhe e descubra receitas saudáveis</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-[#1A1A1A] border-white/10 p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Seguidores</p>
              <p className="text-white font-bold text-lg">1.2k</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1A1A1A] border-white/10 p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Receitas</p>
              <p className="text-white font-bold text-lg">24</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Trending Recipes */}
      <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border-white/10 p-6 shadow-2xl">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Em Alta Agora</h3>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="space-y-3">
            {trendingRecipes.map((recipe, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{recipe.name}</p>
                    <p className="text-white/60 text-xs">{recipe.views} visualizações</p>
                  </div>
                </div>
                <span className="text-emerald-400 text-xs font-bold">{recipe.trend}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Feed */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Feed da Comunidade</h3>

        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="bg-[#1A1A1A] border-white/10 overflow-hidden hover:border-white/20 transition-all">
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-emerald-400/30">
                    <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-cyan-500 text-black font-bold">
                      {post.user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-semibold text-sm">{post.user.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-white/60 text-xs">{post.time}</span>
                      <span className="text-emerald-400 text-xs">• {post.user.level}</span>
                    </div>
                  </div>
                </div>
                <button className="text-white/60 hover:text-white transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Post Image */}
              <div className="relative aspect-video bg-black/20">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                  <span className="text-white text-xs font-bold">{post.calories} kcal</span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <h4 className="text-white font-bold text-lg">{post.title}</h4>
                  <p className="text-white/70 text-sm">{post.description}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-white/5 px-3 py-1 rounded-full text-white/60 text-xs border border-white/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors group">
                      <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-white/60 hover:text-cyan-400 transition-colors group">
                      <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </button>
                  </div>
                  <button className="text-white/60 hover:text-yellow-400 transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Post Button */}
      <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-bold py-5 rounded-2xl shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3">
        <ChefHat className="w-6 h-6" />
        <span className="text-lg">Compartilhar Receita</span>
      </button>
    </div>
  )
}
