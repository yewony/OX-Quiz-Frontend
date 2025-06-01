'use client'

import { useState, useEffect } from 'react'
import BottomNav from '@/components/BottomNav'

export default function QuizApp({ email }: { email: string }) {
  const [savedQuizData] = useState([
    {
      id: 1,
      title: '1 + 1 = 2',
      answer: 'O',
      description: '1 더하기 1은 2입니다.',
    },
    {
      id: 2,
      title: '3 * 7 = 24',
      answer: 'X',
      description: '3 * 7은 21이므로 틀렸습니다.',
    },
  ])

  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0)
  const [showResult, setShowResult] = useState<boolean | null>(null)
  const [answered, setAnswered] = useState(false)

  // 페이지 진입 시 퀴즈 랜덤 시작
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * savedQuizData.length)
    setCurrentQuizIndex(randomIndex)
  }, [savedQuizData.length])

  const checkAnswer = (answer: string) => {
    const currentQuiz = savedQuizData[currentQuizIndex]
    const isCorrect = answer === currentQuiz.answer
    setShowResult(isCorrect)
    setAnswered(true)
  }

  const nextQuiz = () => {
    const randomIndex = Math.floor(Math.random() * savedQuizData.length)
    setCurrentQuizIndex(randomIndex)
    setShowResult(null)
    setAnswered(false)
  }

  const stopQuiz = () => {
    setShowResult(null)
    setAnswered(false)
  }

  return (
    <main className="flex flex-col justify-between min-h-screen">
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-6 bg-white rounded-xl shadow-lg text-center w-full max-w-md">
          
          <h2 className="mt-6 text-xl font-semibold">
            {savedQuizData[currentQuizIndex].title}
          </h2>

          <div className="flex justify-center gap-6 mt-4">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600"
              onClick={() => checkAnswer('O')}
              disabled={answered}
            >
              O
            </button>
            <button
              className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600"
              onClick={() => checkAnswer('X')}
              disabled={answered}
            >
              X
            </button>
          </div>

          {answered && (
            <div className="mt-6">
              <p
                className={`text-lg font-bold ${showResult ? 'text-green-600' : 'text-red-600'}`}
              >
                {showResult ? '정답입니다!' : '틀렸습니다!'}
              </p>
              <p className="text-gray-700 mt-2">
                {savedQuizData[currentQuizIndex].description}
              </p>
              <div className="mt-6 flex justify-between gap-4">
                <button className="w-full bg-gray-300 py-2 rounded-xl" onClick={stopQuiz}>
                  그만풀기
                </button>
                <button
                  className="w-full bg-indigo-500 text-white py-2 rounded-xl hover:bg-indigo-600"
                  onClick={nextQuiz}
                >
                  다음문제
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
