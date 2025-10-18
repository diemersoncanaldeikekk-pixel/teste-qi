"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Play, Clock, Target, Trophy, Users } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Hero Section - Compacto para mobile */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <Brain className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-600 mr-3" />
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-800">Teste de QI</h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 px-4">
            Descubra seu nível de inteligência com nosso teste científico completo. 
            30 perguntas cuidadosamente elaboradas para avaliar suas habilidades cognitivas.
          </p>
          
          {/* Botão principal mais chamativo e gordinho */}
          <Link href="/teste">
            <Button 
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 px-12 text-2xl rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none border-4 border-white min-h-[80px]"
              size="lg"
            >
              <Play className="w-8 h-8 mr-4" />
              INICIAR TESTE DE QI
            </Button>
          </Link>
        </div>

        {/* Features compactas - apenas as principais */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <div className="mx-auto mb-2 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">Cronômetro</h3>
            <p className="text-xs text-gray-600">Tempo real</p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-2 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">30 Questões</h3>
            <p className="text-xs text-gray-600">Científicas</p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-2 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">Resultado</h3>
            <p className="text-xs text-gray-600">Detalhado</p>
          </div>
        </div>

        {/* Estatística social */}
        <div className="flex items-center justify-center text-sm text-gray-500">
          <Users className="w-4 h-4 mr-2" />
          <span>Mais de 10.000 testes realizados</span>
        </div>
      </div>
    </div>
  )
}