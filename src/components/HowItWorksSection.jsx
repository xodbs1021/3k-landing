const platformSteps = [
  { n: 1, title: '라이브 스트리밍', desc: '스트리머가 방송을 시작합니다' },
  { n: 2, title: 'AI 실시간 분석', desc: '채팅 + 영상 동시 처리' },
  { n: 3, title: '하이라이트 구간 확정', desc: 'AI가 고반응 구간을 결정' },
  { n: 4, title: '클립 자동 추출', desc: '해당 구간 클립 생성' },
  { n: 5, title: '치지직·SOOP 자동 업로드', desc: '플랫폼 API 통해 즉시 전송' },
  { n: 6, title: '시청자 즉시 시청 가능 ✓', desc: '방송 중에 이미 올라가 있습니다', highlight: true },
]

const editorSteps = [
  { n: 1, title: '라이브 스트리밍', desc: '스트리머가 방송을 시작합니다' },
  { n: 2, title: 'AI 실시간 분석', desc: '채팅 + 영상 동시 처리' },
  { n: 3, title: '채팅 반응 시각화 + 자동 태깅', desc: '편집자 대시보드에 표시' },
  { n: 4, title: '편집자 확인 및 최종 판단', desc: 'VOD 전체 시청 없이 즉시 파악' },
  { n: 5, title: '추가 편집 작업', desc: '핵심 구간만 빠르게 작업' },
  { n: 6, title: '유튜브 업로드 ✓', desc: '기존 대비 훨씬 빠른 업로드', highlight: true },
]

function FlowColumn({ label, emoji, steps, color }) {
  return (
    <div className="flex-1 bg-slate-800/30 border border-slate-700 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-8">
        <span className="text-xl">{emoji}</span>
        <span className={`font-semibold text-sm ${color}`}>{label}</span>
      </div>
      <div className="flex flex-col gap-0">
        {steps.map((step, i) => (
          <div key={step.n} className="flex flex-col">
            <div className={`flex items-start gap-3 ${step.highlight ? 'opacity-100' : ''}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${step.highlight ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                {step.n}
              </div>
              <div className="pt-0.5">
                <p className={`text-sm font-medium ${step.highlight ? 'text-emerald-400' : 'text-slate-200'}`}>{step.title}</p>
                <p className="text-slate-500 text-xs mt-0.5">{step.desc}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="ml-3.5 w-px h-5 bg-slate-700 my-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-slate-900 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            두 가지 경로로 동시에 처리됩니다
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            시청자용 플랫폼 자동 업로드와 편집자용 작업 보조가 동시에 진행됩니다.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <FlowColumn
            label="① 플랫폼 자동화 흐름 (시청자용)"
            emoji="📺"
            steps={platformSteps}
            color="text-indigo-400"
          />
          <FlowColumn
            label="② 편집자 작업 흐름 (유튜브용)"
            emoji="✂️"
            steps={editorSteps}
            color="text-amber-400"
          />
        </div>
      </div>
    </section>
  )
}
