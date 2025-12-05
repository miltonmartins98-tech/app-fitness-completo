// Banco de Dados Completo de Alimentos
export interface FoodItem {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber?: number
  portion: string
  category: string
  image: string
  keywords: string[]
}

export const foodDatabase: FoodItem[] = [
  // Proteínas
  {
    id: "1",
    name: "Peito de Frango Grelhado",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    portion: "100g",
    category: "Proteína",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop",
    keywords: ["frango", "chicken", "peito", "grelhado", "proteína"]
  },
  {
    id: "2",
    name: "Ovo Cozido",
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
    fiber: 0,
    portion: "2 unidades",
    category: "Proteína",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=300&fit=crop",
    keywords: ["ovo", "egg", "cozido", "proteína"]
  },
  {
    id: "3",
    name: "Salmão Grelhado",
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 13,
    fiber: 0,
    portion: "100g",
    category: "Proteína",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    keywords: ["salmão", "salmon", "peixe", "fish", "grelhado"]
  },
  {
    id: "4",
    name: "Carne Bovina Magra",
    calories: 250,
    protein: 26,
    carbs: 0,
    fat: 15,
    fiber: 0,
    portion: "100g",
    category: "Proteína",
    image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400&h=300&fit=crop",
    keywords: ["carne", "beef", "boi", "magra"]
  },
  {
    id: "5",
    name: "Atum em Lata",
    calories: 116,
    protein: 26,
    carbs: 0,
    fat: 0.8,
    fiber: 0,
    portion: "100g",
    category: "Proteína",
    image: "https://images.unsplash.com/photo-1580217593608-61931cefc821?w=400&h=300&fit=crop",
    keywords: ["atum", "tuna", "peixe", "lata"]
  },

  // Carboidratos
  {
    id: "6",
    name: "Arroz Integral",
    calories: 216,
    protein: 5,
    carbs: 45,
    fat: 1.8,
    fiber: 3.5,
    portion: "1 xícara (195g)",
    category: "Carboidrato",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    keywords: ["arroz", "rice", "integral", "carboidrato"]
  },
  {
    id: "7",
    name: "Batata Doce",
    calories: 180,
    protein: 4,
    carbs: 41,
    fat: 0.3,
    fiber: 6.6,
    portion: "1 unidade média (200g)",
    category: "Carboidrato",
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400&h=300&fit=crop",
    keywords: ["batata", "doce", "sweet potato", "carboidrato"]
  },
  {
    id: "8",
    name: "Aveia",
    calories: 150,
    protein: 5,
    carbs: 27,
    fat: 3,
    fiber: 4,
    portion: "1/2 xícara (40g)",
    category: "Carboidrato",
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&h=300&fit=crop",
    keywords: ["aveia", "oats", "cereal", "carboidrato"]
  },
  {
    id: "9",
    name: "Pão Integral",
    calories: 247,
    protein: 13,
    carbs: 41,
    fat: 4,
    fiber: 7,
    portion: "2 fatias (80g)",
    category: "Carboidrato",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    keywords: ["pão", "bread", "integral", "carboidrato"]
  },
  {
    id: "10",
    name: "Macarrão Integral",
    calories: 174,
    protein: 7.5,
    carbs: 37,
    fat: 0.9,
    fiber: 6,
    portion: "1 xícara cozido (140g)",
    category: "Carboidrato",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    keywords: ["macarrão", "pasta", "integral", "carboidrato"]
  },

  // Vegetais
  {
    id: "11",
    name: "Brócolis Cozido",
    calories: 55,
    protein: 3.7,
    carbs: 11,
    fat: 0.6,
    fiber: 5.1,
    portion: "1 xícara (156g)",
    category: "Vegetal",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=300&fit=crop",
    keywords: ["brócolis", "broccoli", "vegetal", "verdura"]
  },
  {
    id: "12",
    name: "Espinafre",
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    fiber: 2.2,
    portion: "1 xícara (180g)",
    category: "Vegetal",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop",
    keywords: ["espinafre", "spinach", "vegetal", "verdura"]
  },
  {
    id: "13",
    name: "Tomate",
    calories: 22,
    protein: 1.1,
    carbs: 4.8,
    fat: 0.2,
    fiber: 1.5,
    portion: "1 unidade média (123g)",
    category: "Vegetal",
    image: "https://images.unsplash.com/photo-1546470427-227e9e1c0f8f?w=400&h=300&fit=crop",
    keywords: ["tomate", "tomato", "vegetal"]
  },
  {
    id: "14",
    name: "Alface",
    calories: 5,
    protein: 0.5,
    carbs: 1,
    fat: 0.1,
    fiber: 0.5,
    portion: "1 xícara (36g)",
    category: "Vegetal",
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop",
    keywords: ["alface", "lettuce", "salada", "vegetal"]
  },

  // Frutas
  {
    id: "15",
    name: "Banana",
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.4,
    fiber: 3.1,
    portion: "1 unidade média (118g)",
    category: "Fruta",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
    keywords: ["banana", "fruta"]
  },
  {
    id: "16",
    name: "Maçã",
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fat: 0.3,
    fiber: 4.4,
    portion: "1 unidade média (182g)",
    category: "Fruta",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
    keywords: ["maçã", "apple", "fruta"]
  },
  {
    id: "17",
    name: "Morango",
    calories: 49,
    protein: 1,
    carbs: 12,
    fat: 0.5,
    fiber: 3,
    portion: "1 xícara (152g)",
    category: "Fruta",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop",
    keywords: ["morango", "strawberry", "fruta"]
  },
  {
    id: "18",
    name: "Abacaxi",
    calories: 82,
    protein: 0.9,
    carbs: 22,
    fat: 0.2,
    fiber: 2.3,
    portion: "1 fatia (165g)",
    category: "Fruta",
    image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=300&fit=crop",
    keywords: ["abacaxi", "pineapple", "fruta"]
  },

  // Gorduras Saudáveis
  {
    id: "19",
    name: "Abacate",
    calories: 160,
    protein: 2,
    carbs: 9,
    fat: 15,
    fiber: 7,
    portion: "1/2 unidade (100g)",
    category: "Gordura Saudável",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop",
    keywords: ["abacate", "avocado", "gordura"]
  },
  {
    id: "20",
    name: "Castanha do Pará",
    calories: 186,
    protein: 4,
    carbs: 3,
    fat: 19,
    fiber: 2.1,
    portion: "6 unidades (28g)",
    category: "Gordura Saudável",
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=400&h=300&fit=crop",
    keywords: ["castanha", "nuts", "oleaginosa"]
  },
  {
    id: "21",
    name: "Amendoim",
    calories: 161,
    protein: 7,
    carbs: 6,
    fat: 14,
    fiber: 2.4,
    portion: "28g",
    category: "Gordura Saudável",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop",
    keywords: ["amendoim", "peanut", "oleaginosa"]
  },

  // Laticínios
  {
    id: "22",
    name: "Iogurte Grego Natural",
    calories: 100,
    protein: 17,
    carbs: 6,
    fat: 0.7,
    fiber: 0,
    portion: "1 pote (170g)",
    category: "Laticínio",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
    keywords: ["iogurte", "yogurt", "grego", "laticínio"]
  },
  {
    id: "23",
    name: "Queijo Cottage",
    calories: 98,
    protein: 11,
    carbs: 3.4,
    fat: 4.3,
    fiber: 0,
    portion: "1/2 xícara (113g)",
    category: "Laticínio",
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&h=300&fit=crop",
    keywords: ["queijo", "cheese", "cottage", "laticínio"]
  },
  {
    id: "24",
    name: "Leite Desnatado",
    calories: 83,
    protein: 8,
    carbs: 12,
    fat: 0.2,
    fiber: 0,
    portion: "1 copo (240ml)",
    category: "Laticínio",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop",
    keywords: ["leite", "milk", "desnatado", "laticínio"]
  },

  // Lanches Saudáveis
  {
    id: "25",
    name: "Barra de Proteína",
    calories: 200,
    protein: 20,
    carbs: 22,
    fat: 7,
    fiber: 3,
    portion: "1 unidade (60g)",
    category: "Lanche",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4cbc4d23?w=400&h=300&fit=crop",
    keywords: ["barra", "proteína", "protein bar", "lanche"]
  },
  {
    id: "26",
    name: "Whey Protein",
    calories: 120,
    protein: 24,
    carbs: 3,
    fat: 1.5,
    fiber: 0,
    portion: "1 scoop (30g)",
    category: "Suplemento",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=300&fit=crop",
    keywords: ["whey", "proteína", "protein", "suplemento"]
  }
]

// Função para buscar alimentos
export function searchFoods(query: string): FoodItem[] {
  const lowerQuery = query.toLowerCase()
  return foodDatabase.filter(food =>
    food.name.toLowerCase().includes(lowerQuery) ||
    food.keywords.some(keyword => keyword.includes(lowerQuery))
  )
}

// Função para obter alimento por ID
export function getFoodById(id: string): FoodItem | undefined {
  return foodDatabase.find(food => food.id === id)
}

// Função para obter alimentos por categoria
export function getFoodsByCategory(category: string): FoodItem[] {
  return foodDatabase.filter(food => food.category === category)
}

// Categorias disponíveis
export const categories = [
  "Proteína",
  "Carboidrato",
  "Vegetal",
  "Fruta",
  "Gordura Saudável",
  "Laticínio",
  "Lanche",
  "Suplemento"
]
