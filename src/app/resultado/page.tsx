"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Share2, Trophy, Target, Clock, CheckCircle, Home } from 'lucide-react'
import Link from 'next/link'

interface TestResult {
  score: number
  correctAnswers: number
  totalQuestions: number
  percentage: number
  completedAt: string
  timeSpent: number
}

export default function ResultPage() {
  const [result, setResult] = useState<TestResult | null>(null)
  const [showShareOptions, setShowShareOptions] = useState(false)

  useEffect(() => {
    const savedResult = localStorage.getItem('iq-test-result')
    if (savedResult) {
      setResult(JSON.parse(savedResult))
    }
  }, [])

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const getIQCategory = (score: number) => {
    if (score >= 130) return { category: "Superdotado", color: "text-purple-600", bgColor: "bg-purple-50" }
    if (score >= 120) return { category: "Superior", color: "text-blue-600", bgColor: "bg-blue-50" }
    if (score >= 110) return { category: "Acima da Média", color: "text-green-600", bgColor: "bg-green-50" }
    if (score >= 90) return { category: "Média", color: "text-yellow-600", bgColor: "bg-yellow-50" }
    if (score >= 80) return { category: "Abaixo da Média", color: "text-orange-600", bgColor: "bg-orange-50" }
    return { category: "Baixo", color: "text-red-600", bgColor: "bg-red-50" }
  }

  const handleShare = () => {
    setShowShareOptions(true)
  }

  const shareToWhatsApp = () => {
    if (!result) return
    const { category } = getIQCategory(result.score)
    const timeText = result.timeSpent ? ` em ${formatTime(result.timeSpent)}` : ''
    const message = `🧠 Acabei de fazer um teste de QI e meu resultado foi ${result.score} pontos (${category})!${timeText}
    
Acertei ${result.correctAnswers} de ${result.totalQuestions} questões (${result.percentage}%).

Que tal você também testar sua inteligência? Faça o teste aqui: ${window.location.origin}

#TesteQI #Inteligencia`
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const shareToFacebook = () => {
    if (!result) return
    const { category } = getIQCategory(result.score)
    const timeText = result.timeSpent ? ` em ${formatTime(result.timeSpent)}` : ''
    const message = `Acabei de fazer um teste de QI e meu resultado foi ${result.score} pontos (${category})!${timeText} Faça você também: ${window.location.origin}`
    
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(message)}`
    window.open(facebookUrl, '_blank')
  }

  const shareToTwitter = () => {
    if (!result) return
    const { category } = getIQCategory(result.score)
    const timeText = result.timeSpent ? ` em ${formatTime(result.timeSpent)}` : ''
    const message = `🧠 Meu QI é ${result.score} pontos (${category})!${timeText} Teste o seu também: ${window.location.origin} #TesteQI`
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`
    window.open(twitterUrl, '_blank')
  }

  const copyToClipboard = () => {
    if (!result) return
    const { category } = getIQCategory(result.score)
    const timeText = result.timeSpent ? ` em ${formatTime(result.timeSpent)}` : ''
    const message = `🧠 Acabei de fazer um teste de QI e meu resultado foi ${result.score} pontos (${category})!${timeText}

Acertei ${result.correctAnswers} de ${result.totalQuestions} questões (${result.percentage}%).

Que tal você também testar sua inteligência? Faça o teste aqui: ${window.location.origin}`
    
    navigator.clipboard.writeText(message).then(() => {
      alert('Texto copiado para a área de transferência!')
    })
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="text-center py-12">
            <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Nenhum resultado encontrado</h2>
            <p className="text-gray-600 mb-6">
              Você precisa completar o teste primeiro para ver seus resultados.
            </p>
            <Link href="/">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Fazer Teste de QI
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { category, color, bgColor } = getIQCategory(result.score)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-12 h-12 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Seus Resultados</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Parabéns! Aqui estão os resultados do seu teste de QI
          </p>
        </div>

        {/* Main Result Card */}
        <Card className="w-full mb-8">
          <CardHeader className="text-center">
            <div className={`mx-auto mb-4 w-24 h-24 ${bgColor} rounded-full flex items-center justify-center`}>
              <Brain className={`w-12 h-12 ${color}`} />
            </div>
            <CardTitle className="text-5xl font-bold text-gray-800 mb-2">
              {result.score}
            </CardTitle>
            <p className={`text-2xl font-semibold ${color}`}>
              {category}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <div className="text-center">
                <div className="bg-green-50 rounded-lg p-4">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">{result.correctAnswers}</p>
                  <p className="text-sm text-gray-600">Respostas Corretas</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-50 rounded-lg p-4">
                  <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{result.percentage}%</p>
                  <p className="text-sm text-gray-600">Taxa de Acerto</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-50 rounded-lg p-4">
                  <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">{result.totalQuestions}</p>
                  <p className="text-sm text-gray-600">Questões Respondidas</p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-indigo-50 rounded-lg p-4">
                  <Clock className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-indigo-600">
                    {result.timeSpent ? formatTime(result.timeSpent) : '--:--'}
                  </p>
                  <p className="text-sm text-gray-600">Tempo Total</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interpretation Card */}
        <Card className="w-full mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Interpretação do Resultado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className={`${bgColor} rounded-lg p-4`}>
                <h3 className={`text-lg font-semibold ${color} mb-2`}>
                  Seu QI: {result.score} - {category}
                </h3>
                <p className="text-gray-700">
                  {result.score >= 130 && "Parabéns! Você possui uma inteligência excepcional, presente em apenas 2% da população. Suas habilidades cognitivas estão muito acima da média."}
                  {result.score >= 120 && result.score < 130 && "Excelente! Sua inteligência está significativamente acima da média, característica de cerca de 9% da população. Você demonstra ótimas habilidades de raciocínio."}
                  {result.score >= 110 && result.score < 120 && "Muito bom! Sua inteligência está acima da média, presente em aproximadamente 16% da população. Você possui boas habilidades cognitivas."}
                  {result.score >= 90 && result.score < 110 && "Seu resultado está dentro da faixa média de inteligência, onde se encontra a maioria da população (cerca de 50%). Isso indica habilidades cognitivas normais."}
                  {result.score >= 80 && result.score < 90 && "Seu resultado está ligeiramente abaixo da média. Com prática e estudo, é possível desenvolver ainda mais suas habilidades cognitivas."}
                  {result.score < 80 && "Seu resultado indica que há espaço para desenvolvimento. Lembre-se que a inteligência pode ser desenvolvida através de prática, estudo e exercícios mentais."}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Escala de QI:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 130+: Superdotado (2% da população)</li>
                  <li>• 120-129: Superior (7% da população)</li>
                  <li>• 110-119: Acima da Média (16% da população)</li>
                  <li>• 90-109: Média (50% da população)</li>
                  <li>• 80-89: Abaixo da Média (16% da população)</li>
                  <li>• Abaixo de 80: Baixo (9% da população)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Share Section */}
        <Card className="w-full mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 text-center">
              Compartilhe seu Resultado
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              Mostre para seus amigos e desafie eles a fazerem o teste também!
            </p>
            
            <Button 
              onClick={handleShare}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 text-lg mb-6"
              size="lg"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Compartilhar com Amigos
            </Button>

            {showShareOptions && (
              <div className="bg-gray-50 rounded-lg p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Escolha como compartilhar:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    onClick={shareToWhatsApp}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    WhatsApp
                  </Button>
                  <Button 
                    onClick={shareToFacebook}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Facebook
                  </Button>
                  <Button 
                    onClick={shareToTwitter}
                    className="bg-sky-500 hover:bg-sky-600 text-white"
                  >
                    Twitter
                  </Button>
                  <Button 
                    onClick={copyToClipboard}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    Copiar Texto
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-4">
            <Link href="/">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Home className="w-4 h-4 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
            
            <Link href="/teste">
              <Button variant="outline">
                Fazer Teste Novamente
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-gray-500">
            Teste realizado em: {new Date(result.completedAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  )
}