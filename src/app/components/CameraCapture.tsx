"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, X, RotateCcw, Check, Loader2, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { foodDatabase } from "@/lib/foodDatabase"

interface FoodAnalysisResult {
  name: string
  confidence: number
  calories: number
  protein: number
  carbs: number
  fat: number
  portion: string
}

interface CameraCaptureProps {
  onClose: () => void
  onFoodDetected: (result: FoodAnalysisResult) => void
}

export default function CameraCapture({ onClose, onFoodDetected }: CameraCaptureProps) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<FoodAnalysisResult | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error("Erro ao acessar câmera:", error)
      alert("Não foi possível acessar a câmera. Verifique as permissões do navegador.")
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }, [stream])

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg", 0.9)
        setCapturedImage(imageData)
        stopCamera()
      }
    }
  }, [stopCamera])

  const analyzeImage = useCallback(async () => {
    setIsAnalyzing(true)
    
    // Simula análise de imagem com IA
    // Em produção, aqui seria feita uma chamada para API de visão computacional
    // como Google Vision API, AWS Rekognition, ou modelo customizado
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    // Seleciona um alimento aleatório do banco de dados (simulação de reconhecimento)
    const randomFood = foodDatabase[Math.floor(Math.random() * foodDatabase.length)]
    const confidence = Math.floor(Math.random() * 15) + 85 // 85-100%
    
    const result: FoodAnalysisResult = {
      name: randomFood.name,
      calories: randomFood.calories,
      protein: randomFood.protein,
      carbs: randomFood.carbs,
      fat: randomFood.fat,
      portion: randomFood.portion,
      confidence
    }
    
    setAnalysisResult(result)
    setIsAnalyzing(false)
  }, [])

  const confirmFood = useCallback(() => {
    if (analysisResult) {
      onFoodDetected(analysisResult)
      onClose()
    }
  }, [analysisResult, onFoodDetected, onClose])

  const retakePhoto = useCallback(() => {
    setCapturedImage(null)
    setAnalysisResult(null)
    startCamera()
  }, [startCamera])

  // Inicia a câmera ao montar o componente
  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [])

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Escanear Alimento</h2>
              <p className="text-xs text-blue-200">Reconhecimento com IA</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              stopCamera()
              onClose()
            }}
            className="text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Camera/Image View */}
      <div className="flex-1 relative flex items-center justify-center bg-black">
        {!capturedImage ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
            
            {/* Guia de enquadramento */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                <div className="w-80 h-80 border-4 border-white/30 rounded-3xl relative">
                  {/* Cantos destacados */}
                  <div className="absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-blue-500 rounded-tl-3xl"></div>
                  <div className="absolute -top-1 -right-1 w-12 h-12 border-t-4 border-r-4 border-blue-500 rounded-tr-3xl"></div>
                  <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-4 border-l-4 border-blue-500 rounded-bl-3xl"></div>
                  <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-blue-500 rounded-br-3xl"></div>
                  
                  {/* Linha central */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-blue-400 rounded-full opacity-50"></div>
                </div>
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full text-center">
                  <p className="text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
                    Posicione o alimento no centro
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4">
            <img
              src={capturedImage}
              alt="Captured food"
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
          </div>
        )}
      </div>

      {/* Analysis Result */}
      {analysisResult && (
        <div className="absolute inset-x-4 top-24 z-20 animate-in slide-in-from-top duration-300">
          <Card className="bg-white/95 backdrop-blur-md p-5 shadow-2xl border-0">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">{analysisResult.name}</h3>
                  <Badge className="bg-green-100 text-green-700 border-0 font-semibold">
                    {analysisResult.confidence}%
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4">📏 Porção: {analysisResult.portion}</p>
                
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-blue-600">{analysisResult.calories}</div>
                    <div className="text-xs text-gray-600 font-medium mt-1">kcal</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-purple-600">{analysisResult.protein}g</div>
                    <div className="text-xs text-gray-600 font-medium mt-1">Prot.</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-orange-600">{analysisResult.carbs}g</div>
                    <div className="text-xs text-gray-600 font-medium mt-1">Carb.</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-yellow-600">{analysisResult.fat}g</div>
                    <div className="text-xs text-gray-600 font-medium mt-1">Gord.</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 pb-8">
        {!capturedImage ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-white/80 text-sm text-center">
              Aponte a câmera para o alimento e tire uma foto
            </p>
            <Button
              size="lg"
              onClick={capturePhoto}
              className="w-20 h-20 rounded-full bg-white hover:bg-gray-100 shadow-2xl p-0 relative"
            >
              <div className="w-16 h-16 rounded-full border-4 border-blue-600 absolute inset-0 m-auto"></div>
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            {!analysisResult ? (
              <>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={retakePhoto}
                  className="flex-1 bg-white/95 hover:bg-white border-0 h-14 text-base font-semibold"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Tirar Novamente
                </Button>
                <Button
                  size="lg"
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 h-14 text-base font-semibold"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analisando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Analisar com IA
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={retakePhoto}
                  className="flex-1 bg-white/95 hover:bg-white border-0 h-14 text-base font-semibold"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Refazer
                </Button>
                <Button
                  size="lg"
                  onClick={confirmFood}
                  className="flex-1 bg-green-600 hover:bg-green-700 h-14 text-base font-semibold"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Confirmar e Adicionar
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
