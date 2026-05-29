const rows = [
  { label: '클립 생성', before: '❌ 시청자 수동 클립', after: '✅ AI 자동 감지 및 추출' },
  { label: '분석 기반', before: '❌ 영상 단독 분석', after: '✅ 영상 + 실시간 채팅 복합 분석' },
  { label: '처리 시점', before: '❌ VOD 사후 분석', after: '✅ 라이브 도중 실시간 처리' },
  { label: '플랫폼 업로드', before: '❌ 수동 업로드', after: '✅ 하이라이트 클립 자동 업로드' },
  { label: '편집자 지원', before: '❌ VOD 직접 탐색', after: '✅ 채팅 반응 시각화 + 자동 태깅' },
  { label: '국내 플랫폼', before: '❌ 미지원', after: '✅ 치지직·SOOP 전용 최적화' },
]

export default function ComparisonSection() {
  return (
    <section id="comparison" className="bg-slate-950 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">기존 방식과 비교</h2>
          <p className="text-slate-400 text-base">한눈에 보는 HiPick의 차별점</p>
        </div>

        <div className="rounded-xl overflow-hidden border border-slate-700">
          <div className="grid grid-cols-3 bg-slate-800 text-xs font-semibold uppercase tracking-wide">
            <div className="px-6 py-4 text-slate-400">구분</div>
            <div className="px-6 py-4 text-red-400 border-l border-slate-700">기존 방식</div>
            <div className="px-6 py-4 text-emerald-400 border-l border-slate-700">HiPick</div>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 border-t border-slate-700 ${i % 2 === 0 ? 'bg-slate-900/50' : ''}`}
            >
              <div className="px-6 py-4 text-slate-300 text-sm font-medium">{row.label}</div>
              <div className="px-6 py-4 text-red-400 text-sm border-l border-slate-700">{row.before}</div>
              <div className="px-6 py-4 text-emerald-400 text-sm border-l border-slate-700">{row.after}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
