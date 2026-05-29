export default function ProblemSection() {
  return (
    <section id="problem" className="bg-slate-900 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            편집자의 시간을 돌려드립니다
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            하루 6~8시간씩 VOD를 통째로 시청하는 작업, 이제 끝낼 수 있습니다.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          <div className="flex-1 bg-slate-800/50 border border-red-500/30 rounded-xl p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">❌</span>
              <span className="text-red-400 font-semibold text-sm uppercase tracking-wide">기존 방식</span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-bold text-white">6~8시간</span>
            </div>
            <p className="text-slate-400 text-sm mb-6">📺 VOD 전체 시청 필수</p>
            <div className="border-t border-slate-700 pt-6 flex flex-col gap-3">
              {[
                '처음부터 끝까지 시청',
                '하이라이트 구간 수동 메모',
                '편집 시작까지 수 시간 소요',
                '유튜브 업로드 지연',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">·</span>
                  <span className="text-slate-400 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center lg:flex-col gap-2 py-4 lg:py-0 lg:px-4">
            <div className="hidden lg:flex flex-col items-center gap-2">
              <div className="w-px h-8 bg-slate-700" />
              <div className="bg-indigo-500/20 border border-indigo-500/40 rounded-full px-4 py-2 text-center">
                <span className="text-indigo-300 font-semibold text-sm">HiPick</span>
                <span className="text-lg ml-1">⚡</span>
              </div>
              <div className="w-px h-8 bg-slate-700" />
            </div>
            <div className="lg:hidden flex items-center gap-2 text-slate-500 font-medium">
              <span>→ HiPick AI ⚡ →</span>
            </div>
          </div>

          <div className="flex-1 bg-slate-800/50 border border-emerald-500/30 rounded-xl p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✅</span>
              <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wide">HiPick 사용 시</span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-bold text-white">0분</span>
            </div>
            <p className="text-slate-400 text-sm mb-6">⏱️ 방송 시작과 동시에 분석 중</p>
            <div className="border-t border-slate-700 pt-6 flex flex-col gap-3">
              {[
                '라이브 도중 자동 감지',
                '채팅 반응 시각화로 즉시 파악',
                '방송 끝나자마자 편집 착수',
                '클립 자동 업로드 완료',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">·</span>
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6 text-center">
          <p className="text-slate-300 text-base sm:text-lg italic leading-relaxed">
            "라이브가 끝난 뒤가 아니라,<br className="sm:hidden" />
            방송 중에 이미 하이라이트가 정리되고 플랫폼에 업로드되어 있다"
          </p>
        </div>
      </div>
    </section>
  )
}
