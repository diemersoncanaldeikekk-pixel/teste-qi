"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Brain, ArrowRight, CreditCard, Clock, Home } from 'lucide-react'
import Link from 'next/link'

// Banco de 30 perguntas de QI
const questions = [
  {
    id: 1,
    question: "Qual número vem a seguir na sequência: 2, 4, 8, 16, ?",
    options: ["24", "32", "30", "28"],
    correct: 1
  },
  {
    id: 2,
    question: "Se todos os gatos são animais e alguns animais são selvagens, então:",
    options: ["Todos os gatos são selvagens", "Alguns gatos podem ser selvagens", "Nenhum gato é selvagem", "Todos os animais são gatos"],
    correct: 1
  },
  {
    id: 3,
    question: "Qual palavra não pertence ao grupo: Maçã, Banana, Cenoura, Laranja",
    options: ["Maçã", "Banana", "Cenoura", "Laranja"],
    correct: 2
  },
  {
    id: 4,
    question: "Complete a analogia: Livro está para Ler assim como Comida está para:",
    options: ["Cozinhar", "Comer", "Comprar", "Guardar"],
    correct: 1
  },
  {
    id: 5,
    question: "Qual é o próximo número: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "13", "15", "10"],
    correct: 1
  },
  {
    id: 6,
    question: "Se João é mais alto que Pedro e Pedro é mais alto que Maria, então:",
    options: ["Maria é mais alta que João", "João é mais baixo que Maria", "João é mais alto que Maria", "Não é possível determinar"],
    correct: 2
  },
  {
    id: 7,
    question: "Quantos triângulos você pode ver na figura? (Imagine um triângulo grande dividido em 4 triângulos menores)",
    options: ["4", "5", "6", "8"],
    correct: 1
  },
  {
    id: 8,
    question: "Qual número está faltando: 3, 6, 12, 24, ?",
    options: ["36", "48", "42", "30"],
    correct: 1
  },
  {
    id: 9,
    question: "Se CASA = 31 e MESA = 41, quanto vale PESO?",
    options: ["45", "52", "48", "50"],
    correct: 2
  },
  {
    id: 10,
    question: "Qual forma geométrica tem exatamente 5 lados?",
    options: ["Hexágono", "Pentágono", "Octógono", "Heptágono"],
    correct: 1
  },
  {
    id: 11,
    question: "Complete a sequência: A, C, F, J, ?",
    options: ["M", "N", "O", "P"],
    correct: 2
  },
  {
    id: 12,
    question: "Se um trem viaja 60 km em 45 minutos, qual sua velocidade em km/h?",
    options: ["75", "80", "85", "90"],
    correct: 1
  },
  {
    id: 13,
    question: "Qual é o oposto de 'abundante'?",
    options: ["Escasso", "Muito", "Grande", "Pequeno"],
    correct: 0
  },
  {
    id: 14,
    question: "Em uma sala há 4 cantos. Em cada canto há um gato. Cada gato vê 3 gatos. Quantos gatos há na sala?",
    options: ["12", "16", "4", "7"],
    correct: 2
  },
  {
    id: 15,
    question: "Qual número multiplicado por si mesmo resulta em 144?",
    options: ["11", "12", "13", "14"],
    correct: 1
  },
  {
    id: 16,
    question: "Se hoje é terça-feira, que dia será daqui a 100 dias?",
    options: ["Segunda", "Terça", "Quarta", "Quinta"],
    correct: 0
  },
  {
    id: 17,
    question: "Quantas letras tem a palavra que significa 'medo de espaços fechados'?",
    options: ["11", "12", "13", "14"],
    correct: 2
  },
  {
    id: 18,
    question: "Se A=1, B=2, C=3... quanto vale a palavra 'VIDA'?",
    options: ["50", "52", "54", "56"],
    correct: 1
  },
  {
    id: 19,
    question: "Qual é o menor número primo maior que 20?",
    options: ["21", "22", "23", "24"],
    correct: 2
  },
  {
    id: 20,
    question: "Complete: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correct: 1
  },
  {
    id: 21,
    question: "Se você reorganizar as letras de 'LISTEN', qual palavra pode formar?",
    options: ["SILENT", "ENLIST", "TINSEL", "Todas as anteriores"],
    correct: 3
  },
  {
    id: 22,
    question: "Quantos cubos pequenos formam um cubo 3x3x3?",
    options: ["9", "18", "27", "36"],
    correct: 2
  },
  {
    id: 23,
    question: "Se 5 máquinas fazem 5 produtos em 5 minutos, quantas máquinas fazem 100 produtos em 100 minutos?",
    options: ["5", "20", "25", "100"],
    correct: 0
  },
  {
    id: 24,
    question: "Qual é a próxima letra na sequência: D, H, L, P, ?",
    options: ["S", "T", "U", "V"],
    correct: 1
  },
  {
    id: 25,
    question: "Se um relógio marca 3:15, qual é o ângulo entre os ponteiros?",
    options: ["0°", "7.5°", "15°", "22.5°"],
    correct: 1
  },
  {
    id: 26,
    question: "Quantas vezes a letra 'F' aparece na frase: 'FINISHED FILES ARE THE RESULT OF YEARS OF SCIENTIFIC STUDY'?",
    options: ["3", "4", "5", "6"],
    correct: 3
  },
  {
    id: 27,
    question: "Se você tem 6 fósforos, como pode formar 4 triângulos equiláteros?",
    options: ["É impossível", "Formando uma pirâmide", "Em linha reta", "Em círculo"],
    correct: 1
  },
  {
    id: 28,
    question: "Qual número vem depois: 1, 4, 9, 16, 25, ?",
    options: ["30", "35", "36", "49"],
    correct: 2
  },
  {
    id: 29,
    question: "Se AMOR = 1234 e ROMA = 4321, quanto vale RAMO?",
    options: ["4123", "4132", "4213", "4231"],
    correct: 2
  },
  {
    id: 30,
    question: "Em um grupo de 100 pessoas, 70 falam inglês, 80 falam espanhol. Quantas falam ambos os idiomas no mínimo?",
    options: ["50", "60", "70", "80"],
    correct: 0
  }
]

export default function IQTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [testCompleted, setTestCompleted] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  // Carregar respostas salvas do localStorage
  useEffect(() => {
    const savedAnswers = localStorage.getItem('iq-test-answers')
    const savedProgress = localStorage.getItem('iq-test-progress')
    const savedStartTime = localStorage.getItem('iq-test-start-time')
    
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers))
    }
    
    if (savedProgress) {
      setCurrentQuestion(parseInt(savedProgress))
    }

    // Iniciar timer automaticamente quando a página carrega
    if (savedStartTime) {
      setStartTime(parseInt(savedStartTime))
    } else {
      const now = Date.now()
      setStartTime(now)
      localStorage.setItem('iq-test-start-time', now.toString())
    }
  }, [])

  // Timer effect - atualiza a cada segundo
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (startTime && !testCompleted) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [startTime, testCompleted])

  // Salvar progresso no localStorage
  useEffect(() => {
    localStorage.setItem('iq-test-answers', JSON.stringify(answers))
    localStorage.setItem('iq-test-progress', currentQuestion.toString())
  }, [answers, currentQuestion])

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = selectedAnswer
      setAnswers(newAnswers)
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        // Calcular e salvar resultado final
        const correctAnswers = newAnswers.reduce((count, answer, index) => {
          return count + (answer === questions[index].correct ? 1 : 0)
        }, 0)
        
        const iqScore = Math.round(85 + (correctAnswers / questions.length) * 45)
        
        localStorage.setItem('iq-test-result', JSON.stringify({
          score: iqScore,
          correctAnswers,
          totalQuestions: questions.length,
          percentage: Math.round((correctAnswers / questions.length) * 100),
          completedAt: new Date().toISOString(),
          timeSpent: elapsedTime
        }))
        
        setTestCompleted(true)
      }
    }
  }

  const handlePayment = () => {
    window.open('https://pay.kirvano.com/75f8f528-fcb7-4a89-9c6f-6fbb514a0503', '_blank')
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (testCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800">
              Teste Concluído!
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Parabéns por completar todas as 30 questões do nosso teste de QI.
            </p>
            
            {/* Mostrar tempo gasto */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <div className="flex items-center justify-center text-blue-700">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-semibold">Tempo total: {formatTime(elapsedTime)}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">
                🔒 Resultado Protegido
              </h3>
              <p className="text-yellow-700">
                Suas respostas foram salvas com segurança. Para acessar seu resultado detalhado e descobrir seu QI, complete o pagamento abaixo.
              </p>
            </div>
            
            <Button 
              onClick={handlePayment}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 text-lg"
              size="lg"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Pague para acessar seu resultado
            </Button>
            
            <p className="text-sm text-gray-500">
              Após o pagamento, você será redirecionado automaticamente para ver seus resultados.
            </p>

            
            <Link href="/">
              <Button variant="outline" className="mt-4">
                <Home className="w-4 h-4 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Teste de QI</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Descubra seu nível de inteligência com nosso teste científico
          </p>
        </div>

        {/* Timer Card - Destaque especial */}
        <Card className="mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <CardContent className="py-4">
            <div className="flex items-center justify-center">
              <Clock className="w-6 h-6 mr-3" />
              <div className="text-center">
                <p className="text-sm opacity-90">Tempo decorrido</p>
                <p className="text-2xl font-bold">{formatTime(elapsedTime)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% concluído
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedAnswer === index
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium">{String.fromCharCode(65 + index)})</span>
                  <span className="ml-2">{option}</span>
                </div>
              </button>
            ))}
            
            <div className="pt-6">
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3"
                size="lg"
              >
                {currentQuestion === questions.length - 1 ? 'Finalizar Teste' : 'Próxima Pergunta'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="text-center mt-8">
          <Link href="/">
            <Button variant="outline">
              <Home className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Este teste é baseado em padrões científicos de avaliação de QI</p>
        </div>
      </div>
    </div>
  )
}