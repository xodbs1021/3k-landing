import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => scrollTo('top')}>
            <span className="text-xl font-bold text-white">Hi<span className="text-indigo-400">Pick</span></span>
            <span className="text-lg">⚡</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('features')} className="text-slate-400 hover:text-white text-sm transition-colors">특징</button>
            <button onClick={() => scrollTo('how-it-works')} className="text-slate-400 hover:text-white text-sm transition-colors">작동원리</button>
            <button onClick={() => scrollTo('comparison')} className="text-slate-400 hover:text-white text-sm transition-colors">비교</button>
          </div>

          <div className="hidden md:flex items-center">
            <button
              onClick={() => scrollTo('cta')}
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              데모 신청 →
            </button>
          </div>

          <button
            className="md:hidden text-slate-400 hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴 열기"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-slate-800 py-4 flex flex-col gap-4">
            <button onClick={() => scrollTo('features')} className="text-slate-400 hover:text-white text-sm text-left transition-colors">특징</button>
            <button onClick={() => scrollTo('how-it-works')} className="text-slate-400 hover:text-white text-sm text-left transition-colors">작동원리</button>
            <button onClick={() => scrollTo('comparison')} className="text-slate-400 hover:text-white text-sm text-left transition-colors">비교</button>
            <button
              onClick={() => scrollTo('cta')}
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors w-fit"
            >
              데모 신청 →
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
