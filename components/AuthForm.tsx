'use client';

import { useState } from "react";

interface Props {
  type: "signin" | "signup";
}

export default function AuthForm({ type }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${type === 'signin' ? '로그인' : '회원가입'} 시도: ${email}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-20">
      <h2 className="text-xl font-bold text-center">
        {type === "signin" ? "로그인" : "회원가입"}
      </h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 rounded">
        {type === "signin" ? "로그인" : "회원가입"}
      </button>
    </form>
  );
}
