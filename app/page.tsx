"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";

export default function App() {
  const [savedQuizData, setSavedQuizData] = useState([
    {
      id: 1,
      title: "Quiz 1 : 1 + 1 = 2",
      answer: "O",
      description: "1 더하기 1은 2가 맞습니다.",
    },
    {
      id: 2,
      title: "Quiz 2 : 3 * 7 = 24",
      answer: "X",
      description: "3 * 7은 21이므로 틀렸습니다.",
    },
  ]);

  const [currentQuizIndex, setCurrentQuizIndex] = useState(null);
  const [showResult, setShowResult] = useState(null);
  const [answered, setAnswered] = useState(false);

  const startQuiz = () => {
    if (savedQuizData.length > 0) {
      const randomIndex = Math.floor(Math.random() * savedQuizData.length);
      setCurrentQuizIndex(randomIndex);
      setShowResult(null);
      setAnswered(false);
    }
  };

  const checkAnswer = (answer) => {
    const currentQuiz = savedQuizData[currentQuizIndex];
    const isCorrect = answer === currentQuiz.answer;
    setShowResult(isCorrect);
    setAnswered(true);
  };

  const nextQuiz = () => {
    const randomIndex = Math.floor(Math.random() * savedQuizData.length);
    setCurrentQuizIndex(randomIndex);
    setShowResult(null);
    setAnswered(false);
  };

  const stopQuiz = () => {
    setCurrentQuizIndex(null);
    setShowResult(null);
    setAnswered(false);
  };

  return (
    <main className="flex flex-col justify-between min-h-screen">
      <div className="p-4 text-center">
        <div className="bg-white mt-6 p-6 rounded-2xl shadow-lg">
          <button
            className="w-full bg-indigo-500 text-white text-lg py-3 rounded-xl hover:bg-indigo-600"
            onClick={startQuiz}
          >
            퀴즈 시작
          </button>

          {currentQuizIndex !== null && (
            <div className="mt-6 text-left">
              <h2 className="text-xl font-semibold mb-4">
                {savedQuizData[currentQuizIndex].title}
              </h2>
              <div className="flex justify-center gap-6">
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600"
                  onClick={() => checkAnswer("O")}
                  disabled={answered}
                >
                  O
                </button>
                <button
                  className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600"
                  onClick={() => checkAnswer("X")}
                  disabled={answered}
                >
                  X
                </button>
              </div>

              {answered && (
                <div className="mt-6">
                  <p
                    className={`text-lg font-bold mb-2 ${showResult ? "text-green-600" : "text-red-600"}`}
                  >
                    {showResult ? "정답입니다!" : "틀렸습니다!"}
                  </p>
                  <p className="text-gray-700 italic">
                    {savedQuizData[currentQuizIndex].description}
                  </p>
                  <div className="mt-6 flex justify-between gap-4">
                    <button
                      className="w-full bg-gray-300 text-gray-800 py-2 rounded-xl hover:bg-gray-400"
                      onClick={stopQuiz}
                    >
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
          )}
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
