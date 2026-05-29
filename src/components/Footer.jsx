export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <span className="text-lg font-bold text-white">Hi<span className="text-indigo-400">Pick</span></span>
          <span className="text-base">⚡</span>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-slate-500 text-sm">
            소프트웨어 마에스트로 팀 프로젝트 | 국내 한정
          </p>
          <p className="text-slate-600 text-xs mt-1">
            치지직 · SOOP 전용 | © 2025 HiPick
          </p>
        </div>
      </div>
    </footer>
  )
}
