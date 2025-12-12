/**
 * OpenAI Vision API Integration
 * Analisa imagens de refeições e retorna informações nutricionais
 */

export interface MealAnalysis {
  name: string
  calories: number
  confidence: number
  macros: {
    protein: number
    carbs: number
    fat: number
  }
  ingredients: string[]
}

/**
 * Analisa uma imagem de refeição usando OpenAI Vision API (gpt-4o)
 * @param imageBase64 - Imagem em formato base64
 * @returns Análise nutricional completa
 */
export async function analyzeMealImage(imageBase64: string): Promise<MealAnalysis> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

  if (!apiKey) {
    throw new Error('OpenAI API Key não configurada')
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `Você é um nutricionista especializado em análise de refeições. 
            Analise a imagem fornecida e retorne APENAS um JSON válido com as seguintes informações:
            {
              "name": "Nome descritivo da refeição",
              "calories": número total de calorias estimadas,
              "confidence": porcentagem de confiança na análise (0-100),
              "macros": {
                "protein": gramas de proteína,
                "carbs": gramas de carboidratos,
                "fat": gramas de gordura
              },
              "ingredients": ["lista", "de", "ingredientes", "identificados"]
            }
            
            Seja preciso e realista nas estimativas. Considere porções visuais.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analise esta refeição e forneça as informações nutricionais detalhadas.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`,
                  detail: 'high'
                }
              }
            ]
          }
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`OpenAI API Error: ${errorData.error?.message || response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error('Resposta vazia da OpenAI API')
    }

    // Parse do JSON retornado
    const analysis: MealAnalysis = JSON.parse(content)

    // Validação básica
    if (!analysis.name || !analysis.calories || !analysis.macros) {
      throw new Error('Resposta da API incompleta')
    }

    return analysis
  } catch (error) {
    console.error('Erro ao analisar imagem:', error)
    throw error
  }
}

/**
 * Converte um arquivo File para base64
 * @param file - Arquivo de imagem
 * @returns String base64 da imagem
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64 = reader.result as string
      // Remove o prefixo "data:image/...;base64,"
      const base64Data = base64.split(',')[1]
      resolve(base64Data)
    }
    reader.onerror = (error) => reject(error)
  })
}
