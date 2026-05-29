const features = [
  {
    icon: '🗨️',
    title: '실시간 채팅 분석',
    desc: '채팅 속도 급증, 키워드 반복, 이모티콘 폭발을 실시간으로 감지합니다',
    subs: ['채팅 속도 수치화', 'ㅋㅋㅋ/ㄷㄷ/실화냐 키워드 감지', '감정 반응 분석'],
  },
  {
    icon: '🎬',
    title: 'AI 영상 분석',
    desc: '킬, 보스 클리어, 극적 역전 등 장르별 하이라이트를 자동 감지합니다',
    subs: ['게임/보이는라디오 분리 설계', '채팅 점수와 복합 분석', '정확도 70%+'],
  },
  {
    icon: '🏷️',
    title: '자동 태깅 + 시각화',
    desc: '타임라인에 자동 태그를 부착하고 채팅 반응을 시각화합니다',
    subs: ['구간별 자동 태그', '채팅 히트맵 시각화', '원하는 구간 즉시 이동'],
  },
  {
    icon: '⬆️',
    title: '클립 자동 업로드',
    desc: '감지된 하이라이트를 치지직·SOOP에 즉시 자동 업로드합니다',
    subs: ['라이브 중 업로드', '시청자 유입 즉시 확보', 'SOOP/치지직 전용 최적화'],
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-slate-950 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            MVP 핵심 기능 4가지
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">핵심 기능</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-indigo-500/50 transition-colors group"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-indigo-300 transition-colors">
                {f.title}
              </h3>
              <p className="text-slate-400 text-sm mb-5 leading-relaxed">{f.desc}</p>
              <ul className="flex flex-col gap-2">
                {f.subs.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-slate-500 text-sm">
                    <span className="w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
