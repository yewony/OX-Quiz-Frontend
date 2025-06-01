'use client'

export default function ErrorPage() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold text-red-600">로그인 실패</h1>
      <p className="mt-2">이메일 또는 비밀번호가 잘못되었습니다.</p>
    </div>
  )
}
