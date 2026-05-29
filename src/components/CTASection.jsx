import { useState } from 'react'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <section id="cta" className="bg-gradient-to-br from-indigo-900 to-slate-900 py-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          방송 효율을 지금 바로 높여보세요
        </h2>
        <p className="text-indigo-200 text-base mb-10">
          치지직·SOOP 스트리머라면 누구나 무료로 데모를 신청할 수 있습니다
        </p>

        {submitted ? (
          <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl px-6 py-8">
            <div className="text-3xl mb-3">✅</div>
            <p className="text-emerald-300 font-semibold text-lg">신청되었습니다!</p>
            <p className="text-emerald-400/80 text-sm mt-1">빠른 시일 내 연락드리겠습니다.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-10">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소 입력"
              required
              className="flex-1 bg-slate-800/80 border border-slate-600 focus:border-indigo-500 focus:outline-none text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm transition-colors"
            />
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-6 py-3 text-sm font-semibold transition-colors whitespace-nowrap shadow-lg shadow-indigo-500/30"
            >
              데모 신청하기 →
            </button>
          </form>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          {['소프트웨어 마에스트로 2025', '치지직 전용', 'SOOP 전용'].map((badge) => (
            <span
              key={badge}
              className="bg-white/10 border border-white/20 text-indigo-200 text-xs px-3 py-1.5 rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
