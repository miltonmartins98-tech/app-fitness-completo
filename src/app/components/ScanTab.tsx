"use client"

import { useState, useRef } from "react"
import { Camera, Sparkles, Upload, X, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { analyzeMealImage, fileToBase64, type MealAnalysis } from "@/lib/openai"

export default function ScanTab() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<MealAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleImageAnalysis = async (file: File) => {
    try {
      setIsScanning(true)
      setError(null)
      
      // Criar preview da imagem
      const previewUrl = URL.createObjectURL(file)
      setPreviewImage(previewUrl)

      // Converter para base64
      const base64Image = await fileToBase64(file)

      // Analisar com OpenAI Vision API
      const analysis = await analyzeMealImage(base64Image)
      
      setScanResult(analysis)
      setIsScanning(false)
    } catch (err) {
      console.error('Erro na análise:', err)
      setError(err instanceof Error ? err.message : 'Erro ao analisar imagem')
      setIsScanning(false)
      setPreviewImage(null)
    }
  }

  const handleCameraClick = () => {
    cameraInputRef.current?.click()
  }

  const handleGalleryClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleImageAnalysis(file)
    }
  }

  const handleReset = () => {
    setScanResult(null)
    setIsScanning(false)
    setError(null)
    setPreviewImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (cameraInputRef.current) cameraInputRef.current.value = ''
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Escanear Refeição</h2>
        <p className="text-white/60 text-sm">Tire uma foto e descubra as calorias instantaneamente</p>
      </div>

      {/* Error Message */}
      {error && (
        <Card className="bg-red-500/10 border-red-500/30 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-red-400 font-semibold text-sm">Erro na análise</p>
              <p className="text-red-300/80 text-xs">{error}</p>
              <button
                onClick={handleReset}
                className="text-red-400 text-xs underline hover:text-red-300 transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Scan Area */}
      {!scanResult && !isScanning && (
        <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border-white/10 p-8 sm:p-12 shadow-2xl">
          <div className="space-y-8">
            {/* Camera Preview Area */}
            <div className="aspect-square sm:aspect-video bg-black/40 rounded-3xl border-2 border-dashed border-white/20 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5"></div>
              <div className="relative z-10 text-center space-y-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-400/30">
                  <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400" />
                </div>
                <p className="text-white/60 text-sm">Posicione sua refeição no centro</p>
                <p className="text-white/40 text-xs">Análise com IA OpenAI GPT-4o</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={handleCameraClick}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-bold py-6 rounded-2xl shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] text-base"
              >
                <Camera className="w-5 h-5 mr-2" />
                Tirar Foto
              </Button>
              <Button
                onClick={handleGalleryClick}
                variant="outline"
                className="bg-white/5 border-white/20 hover:bg-white/10 text-white font-bold py-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] text-base"
              >
                <Upload className="w-5 h-5 mr-2" />
                Galeria
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Scanning Animation */}
      {isScanning && (
        <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border-white/10 p-8 sm:p-12 shadow-2xl">
          <div className="space-y-8 text-center">
            {/* Preview da imagem sendo analisada */}
            {previewImage && (
              <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-400/30">
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className="w-full h-auto max-h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            )}
            
            <div className="relative">
              <div className="w-32 h-32 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full animate-pulse opacity-20"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full animate-ping opacity-30"></div>
                <div className="absolute inset-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-black animate-spin" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Analisando com IA...</h3>
              <p className="text-white/60">OpenAI GPT-4o identificando ingredientes e calculando nutrientes</p>
            </div>
          </div>
        </Card>
      )}

      {/* Scan Result */}
      {scanResult && (
        <div className="space-y-6 animate-fadeIn">
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border-emerald-500/30 p-6 sm:p-8 shadow-2xl shadow-emerald-500/10">
            <div className="space-y-6">
              {/* Preview da imagem analisada */}
              {previewImage && (
                <div className="relative rounded-2xl overflow-hidden border border-white/10">
                  <img 
                    src={previewImage} 
                    alt="Refeição analisada" 
                    className="w-full h-auto max-h-48 object-cover"
                  />
                </div>
              )}

              {/* Header com Close */}
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-emerald-400 text-xs font-medium">
                      {scanResult.confidence}% de confiança
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{scanResult.name}</h3>
                </div>
                <button
                  onClick={handleReset}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              {/* Calorias Destaque */}
              <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl p-6 border border-emerald-400/30">
                <div className="text-center">
                  <p className="text-white/60 text-sm mb-2">Total de Calorias</p>
                  <p className="text-5xl sm:text-6xl font-bold text-white">{scanResult.calories}</p>
                  <p className="text-white/40 text-sm mt-1">kcal</p>
                </div>
              </div>

              {/* Macros */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#1A1A1A] rounded-xl p-4 border border-white/10">
                  <p className="text-white/60 text-xs mb-2">Proteínas</p>
                  <p className="text-2xl font-bold text-emerald-400">{scanResult.macros.protein}g</p>
                </div>
                <div className="bg-[#1A1A1A] rounded-xl p-4 border border-white/10">
                  <p className="text-white/60 text-xs mb-2">Carboidratos</p>
                  <p className="text-2xl font-bold text-cyan-400">{scanResult.macros.carbs}g</p>
                </div>
                <div className="bg-[#1A1A1A] rounded-xl p-4 border border-white/10">
                  <p className="text-white/60 text-xs mb-2">Gorduras</p>
                  <p className="text-2xl font-bold text-purple-400">{scanResult.macros.fat}g</p>
                </div>
              </div>

              {/* Ingredientes */}
              <div className="space-y-3">
                <h4 className="text-white font-semibold">Ingredientes Detectados</h4>
                <div className="space-y-2">
                  {scanResult.ingredients.map((ingredient: string, index: number) => (
                    <div
                      key={index}
                      className="bg-[#1A1A1A] rounded-lg p-3 border border-white/10 flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-white/80 text-sm">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Button
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-bold py-5 rounded-xl"
                >
                  Adicionar ao Diário
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="bg-white/5 border-white/20 hover:bg-white/10 text-white font-bold py-5 rounded-xl"
                >
                  Nova Foto
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
