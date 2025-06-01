"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";

export default function AddQuizPage() {
  const [showForm, setShowForm] = useState(false);
  const [quizInput, setQuizInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [description, setDescription] = useState("");
  const [savedQuizData, setSavedQuizData] = useState([]);

  const handleSave = () => {
    if (!quizInput.trim() || !answer) {
      alert("문제와 정답은 필수입니다.");
      return;
    }
    const newQuiz = {
      id: Date.now(),
      title: quizInput,
      answer,
      description,
    };
    setSavedQuizData([newQuiz, ...savedQuizData]);
    setQuizInput("");
    setAnswer("");
    setDescription("");
    setShowForm(false);
  };

  return (
    <main className="flex flex-col justify-between min-h-screen">
      <div className="p-4">
        <button
          className="w-full bg-green-500 text-white py-3 rounded-xl text-lg hover:bg-green-600"
          onClick={() => setShowForm(!showForm)}
        >
          ➕ 문제 추가하기
        </button>

        {showForm && (
          <div className="mt-6 bg-white p-6 rounded-2xl shadow">
            <label className="block text-sm font-medium mb-1">문제 *</label>
            <input
              type="text"
              className="w-full border rounded-xl px-3 py-2 mb-4"
              placeholder="문제를 입력하세요"
              value={quizInput}
              onChange={(e) => setQuizInput(e.target.value)}
            />

            <label className="block text-sm font-medium mb-1">정답 (O / X) *</label>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setAnswer("O")}
                className={`flex-1 py-2 rounded-xl border ${answer === "O" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
              >
                O
              </button>
              <button
                onClick={() => setAnswer("X")}
                className={`flex-1 py-2 rounded-xl border ${answer === "X" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
              >
                X
              </button>
            </div>

            <label className="block text-sm font-medium mb-1">설명 (선택)</label>
            <textarea
              className="w-full border rounded-xl px-3 py-2 mb-4"
              rows={3}
              placeholder="문제에 대한 설명을 입력하세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button
              className="w-full bg-indigo-500 text-white py-3 rounded-xl hover:bg-indigo-600"
              onClick={handleSave}
            >
              저장하기
            </button>
          </div>
        )}

        {savedQuizData.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">내가 만든 문제</h2>
            <ul className="space-y-4">
              {savedQuizData.map((quiz) => (
                <li key={quiz.id} className="bg-white p-4 rounded-xl shadow">
                  <h3 className="font-medium">{quiz.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">정답: {quiz.answer}</p>
                  {quiz.description && <p className="text-sm mt-1 text-gray-500 italic">{quiz.description}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <BottomNav />
    </main>
  );
}
