"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Target, Dumbbell, Apple, Clock, CheckCircle2, Sparkles } from "lucide-react"

interface QuizAnswer {
  question: string
  answer: string
}

export default function OnboardingFlow({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])

  // Copy motivacional
  const welcomeContent = {
    title: "Transforme Sua Vida com o SnapFit",
    subtitle: "Sua jornada para uma vida mais saudável começa agora",
    benefits: [
      "Escaneie refeições e receba análise nutricional instantânea",
      "Acompanhe seus macros e calorias em tempo real",
      "Receba receitas personalizadas para seus objetivos",
      "Treinos adaptados ao seu nível e disponibilidade"
    ]
  }

  // Quiz de perfil
  const quizQuestions = [
    {
      id: 1,
      question: "Qual é o seu principal objetivo?",
      icon: Target,
      options: [
        { label: "Perder peso", value: "perder_peso" },
        { label: "Ganhar massa muscular", value: "ganhar_massa" },
        { label: "Manter peso saudável", value: "manter_peso" },
        { label: "Melhorar saúde geral", value: "saude_geral" }
      ]
    },
    {
      id: 2,
      question: "Qual é o seu nível de atividade física?",
      icon: Dumbbell,
      options: [
        { label: "Sedentário (pouco ou nenhum exercício)", value: "sedentario" },
        { label: "Levemente ativo (1-3 dias/semana)", value: "leve" },
        { label: "Moderadamente ativo (3-5 dias/semana)", value: "moderado" },
        { label: "Muito ativo (6-7 dias/semana)", value: "muito_ativo" }
      ]
    },
    {
      id: 3,
      question: "Você tem alguma restrição alimentar?",
      icon: Apple,
      options: [
        { label: "Nenhuma restrição", value: "nenhuma" },
        { label: "Vegetariano", value: "vegetariano" },
        { label: "Vegano", value: "vegano" },
        { label: "Intolerância (lactose, glúten, etc)", value: "intolerancia" }
      ]
    },
    {
      id: 4,
      question: "Quanto tempo você tem para treinar?",
      icon: Clock,
      options: [
        { label: "15-30 minutos por dia", value: "15_30" },
        { label: "30-45 minutos por dia", value: "30_45" },
        { label: "45-60 minutos por dia", value: "45_60" },
        { label: "Mais de 1 hora por dia", value: "60_plus" }
      ]
    }
  ]

  const handleAnswer = (question: string, answer: string) => {
    setAnswers([...answers, { question, answer }])
    if (step < quizQuestions.length) {
      setStep(step + 1)
    }
  }

  const handleComplete = () => {
    // Salvar respostas no localStorage ou estado global
    localStorage.setItem('snapfit_onboarding', JSON.stringify(answers))
    onComplete()
  }

  // Step 0: Welcome Copy
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border-orange-500/20 p-8 sm:p-12 shadow-2xl">
          <div className="space-y-8 text-center">
            {/* Icon Hero */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl flex items-center justify-center border border-orange-500/30">
                <Sparkles className="w-10 h-10 text-orange-400" />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {welcomeContent.title}
              </h1>
              <p className="text-lg text-white/60">
                {welcomeContent.subtitle}
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4 text-left">
              {welcomeContent.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80">{benefit}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button
              onClick={() => setStep(1)}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6 text-lg rounded-2xl shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-[1.02]"
            >
              Começar Minha Jornada
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-white/40 text-sm">
              Leva apenas 2 minutos para personalizar sua experiência
            </p>
          </div>
        </Card>
      </div>
    )
  }

  // Steps 1-4: Quiz Questions
  if (step <= quizQuestions.length) {
    const currentQuestion = quizQuestions[step - 1]
    const Icon = currentQuestion.icon

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border-orange-500/20 p-8 sm:p-12 shadow-2xl">
          <div className="space-y-8">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>Pergunta {step} de {quizQuestions.length}</span>
                <span>{Math.round((step / quizQuestions.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                  style={{ width: `${(step / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl flex items-center justify-center border border-orange-500/30">
                  <Icon className="w-8 h-8 text-orange-400" />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.question, option.value)}
                  className="w-full bg-[#1A1A1A] hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 border border-white/10 hover:border-orange-500/50 text-white p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] text-left font-medium"
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Back button */}
            {step > 1 && (
              <button
                onClick={() => {
                  setStep(step - 1)
                  setAnswers(answers.slice(0, -1))
                }}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                ← Voltar
              </button>
            )}
          </div>
        </Card>
      </div>
    )
  }

  // Step 5: Results
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border-orange-500/20 p-8 sm:p-12 shadow-2xl">
        <div className="space-y-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl flex items-center justify-center border border-emerald-500/30 animate-pulse">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Perfil Criado com Sucesso!
            </h1>
            <p className="text-lg text-white/60">
              Personalizamos sua experiência com base nas suas respostas
            </p>
          </div>

          {/* Personalized Recommendations */}
          <div className="space-y-4 text-left bg-white/5 rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg mb-4">Seu Plano Personalizado:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Meta Calórica Diária</p>
                  <p className="text-white/60 text-sm">2000 kcal baseado no seu objetivo</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Dumbbell className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Treinos Recomendados</p>
                  <p className="text-white/60 text-sm">3-4x por semana, adaptados ao seu nível</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Apple className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Receitas Personalizadas</p>
                  <p className="text-white/60 text-sm">Filtradas pelas suas preferências alimentares</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={handleComplete}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6 text-lg rounded-2xl shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-[1.02]"
          >
            Começar a Usar o SnapFit
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
