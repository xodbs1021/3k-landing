import DashboardMockup from './DashboardMockup'

export default function HeroSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="top"
      className="min-h-screen bg-slate-950 flex flex-col items-center justify-start pt-32 pb-16 px-4 relative overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-full px-4 py-1.5 text-xs text-slate-400 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          소프트웨어마에스트로 2026 · 치지직 · SOOP
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          라이브가 끝나기 전에,<br />
          <span className="text-indigo-400">하이라이트는 이미</span> 완성됩니다
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
          AI가 실시간으로 채팅과 영상을 분석해 하이라이트 클립을 자동 추출·업로드합니다.<br className="hidden sm:inline" />
          편집자는 이제 VOD 전체를 보지 않아도 됩니다.
        </p>

        <div className="flex items-center gap-3 mb-10">
          <span className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md">치지직</span>
          <span className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md">SOOP</span>
          <span className="text-slate-500 text-xs">전용 최적화</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <button
            onClick={() => scrollTo('cta')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-6 py-3 text-base font-semibold transition-colors shadow-lg shadow-indigo-500/20"
          >
            데모 신청하기 →
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg px-6 py-3 text-base font-semibold transition-colors"
          >
            작동 원리 보기 ↓
          </button>
        </div>

        <p className="text-slate-600 text-sm mb-10">↓ 아래에서 실제 대시보드를 체험해보세요</p>

        <div className="w-full">
          <DashboardMockup />
        </div>
      </div>
    </section>
  )
}
