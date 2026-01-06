"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Dumbbell, Mail, Lock, User } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Estados para login
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Estados para cadastro
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      })

      if (error) throw error

      // Verificar se usuário já tem perfil
      const { data: profile } = await supabase
        .from('users_profile')
        .select('*')
        .eq('user_id', data.user.id)
        .single()

      if (profile) {
        router.push('/dashboard')
      } else {
        router.push('/onboarding')
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: {
            name: signupName,
          }
        }
      })

      if (error) throw error

      // Redirecionar para onboarding
      router.push('/onboarding')
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-2xl">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              SnapFit
            </h1>
          </div>
          <p className="text-white/60 text-sm">
            Seu personal trainer e nutricionista com IA
          </p>
        </div>

        <Card className="bg-[#1A1A1A]/80 border-orange-500/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white text-center">Bem-vindo!</CardTitle>
            <CardDescription className="text-white/60 text-center">
              Entre ou crie sua conta para começar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#0D0D0D]/50">
                <TabsTrigger value="login" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500">
                  Entrar
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500">
                  Cadastrar
                </TabsTrigger>
              </TabsList>

              {/* Login */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-white">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-10 bg-[#0D0D0D]/50 border-white/10 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-white">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-10 bg-[#0D0D0D]/50 border-white/10 text-white"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
                  >
                    {loading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </TabsContent>

              {/* Cadastro */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-white">Nome</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Seu nome"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="pl-10 bg-[#0D0D0D]/50 border-white/10 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-white">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="pl-10 bg-[#0D0D0D]/50 border-white/10 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-white">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="pl-10 bg-[#0D0D0D]/50 border-white/10 text-white"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
                  >
                    {loading ? 'Criando conta...' : 'Criar conta'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
