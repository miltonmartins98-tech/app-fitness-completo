"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, TrendingUp, Award, Image as ImageIcon } from "lucide-react"

export default function CommunityTab() {
  const [newPost, setNewPost] = useState("")

  const posts = [
    {
      user: {
        name: "Maria Silva",
        avatar: "MS",
        badge: "Emagrecimento"
      },
      content: "Perdi 5kg em 2 meses! Muito feliz com os resultados. A chave foi consistência na dieta e exercícios 4x por semana. 💪",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      likes: 124,
      comments: 18,
      timeAgo: "2h atrás"
    },
    {
      user: {
        name: "João Santos",
        avatar: "JS",
        badge: "Ganho de Massa"
      },
      content: "Progresso de 6 meses de treino! De 70kg para 78kg de massa magra. Foco total na dieta hipercalórica e treino pesado!",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop",
      likes: 256,
      comments: 34,
      timeAgo: "5h atrás"
    },
    {
      user: {
        name: "Ana Costa",
        avatar: "AC",
        badge: "Emagrecimento"
      },
      content: "Minha refeição pós-treino favorita: frango grelhado com batata doce e brócolis. Simples, nutritivo e delicioso! 🍽️",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      likes: 89,
      comments: 12,
      timeAgo: "1 dia atrás"
    },
    {
      user: {
        name: "Carlos Mendes",
        avatar: "CM",
        badge: "Ganho de Massa"
      },
      content: "Completei 100 dias consecutivos de treino! A disciplina é tudo. Quem mais está na jornada? 🔥",
      image: null,
      likes: 178,
      comments: 25,
      timeAgo: "1 dia atrás"
    }
  ]

  const topMembers = [
    { name: "Pedro Lima", points: 2450, avatar: "PL", badge: "🏆" },
    { name: "Julia Rocha", points: 2180, avatar: "JR", badge: "🥈" },
    { name: "Rafael Souza", points: 1920, avatar: "RS", badge: "🥉" }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Comunidade</h2>
            <p className="text-sm text-blue-50">12.5k membros ativos</p>
          </div>
        </div>
      </Card>

      {/* Top Membros */}
      <Card className="p-6 bg-white shadow-lg border-blue-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Membros da Semana</h3>
        <div className="space-y-3">
          {topMembers.map((member, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-white rounded-xl">
              <span className="text-2xl">{member.badge}</span>
              <Avatar className="w-10 h-10 border-2 border-blue-200">
                <AvatarFallback className="bg-blue-600 text-white text-sm font-semibold">
                  {member.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">{member.name}</div>
                <div className="text-xs text-gray-500">{member.points} pontos</div>
              </div>
              <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Seguir
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Criar Post */}
      <Card className="p-4 bg-white shadow-lg border-blue-100">
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="w-10 h-10 border-2 border-blue-200">
            <AvatarFallback className="bg-blue-600 text-white text-sm font-semibold">
              VC
            </AvatarFallback>
          </Avatar>
          <Textarea
            placeholder="Compartilhe sua evolução..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-[80px] border-blue-200 focus:border-blue-400"
          />
        </div>
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-blue-600">
            <ImageIcon className="w-4 h-4 mr-2" />
            Adicionar Foto
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Publicar
          </Button>
        </div>
      </Card>

      {/* Feed de Posts */}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <Card key={index} className="overflow-hidden bg-white shadow-lg border-blue-100">
            {/* Header do Post */}
            <div className="p-4 pb-3">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-10 h-10 border-2 border-blue-200">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-semibold">
                    {post.user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 text-sm">{post.user.name}</span>
                    <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                      {post.user.badge}
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-500">{post.timeAgo}</span>
                </div>
              </div>

              {/* Conteúdo */}
              <p className="text-sm text-gray-700 mb-3">{post.content}</p>
            </div>

            {/* Imagem do Post */}
            {post.image && (
              <div className="w-full aspect-video bg-gray-100">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Ações */}
            <div className="p-4 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                  <Heart className="w-4 h-4 mr-2" />
                  <span className="text-sm">{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">{post.comments}</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                  <Share2 className="w-4 h-4 mr-2" />
                  <span className="text-sm">Compartilhar</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Desafios da Comunidade */}
      <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Desafio de Março</h3>
            <p className="text-sm text-white/90 mb-3">
              Perca 3kg em 30 dias! Participe e ganhe badges exclusivas.
            </p>
            <Button className="bg-white text-purple-600 hover:bg-white/90">
              Participar Agora
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
