import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import BottomNav from "@/components/BottomNav";

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const email = session.user.email

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">환영합니다, {email} 님!!@?@?</h1>
      </div>
      <div className="flex gap-4">
        <a
          href="/quiz"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl"
        >
          퀴즈 시작
        </a>
        <form action="/logout" method="post">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl"
          >
            로그아웃
          </button>
        </form>
        <BottomNav />
      </div>
    </div>
    
  )
}
