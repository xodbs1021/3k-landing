import { useState, useEffect, useRef } from "react";

const TOTAL_SEC = 390 * 60; // 6h30m in seconds

const TRADITIONAL_STEPS = [
  { id: 1, label: "VOD 다운로드 & 재생 준비",    done: true,  time: "~10분" },
  { id: 2, label: "처음부터 끝까지 전체 시청",   done: false, time: "~6시간+",  active: true },
  { id: 3, label: "하이라이트 타임코드 수동 메모", done: false, time: "~30분" },
  { id: 4, label: "편집 소프트웨어에 클립 임포트", done: false, time: "~20분" },
  { id: 5, label: "자막 / 효과 추가 후 렌더링",  done: false, time: "~1시간" },
];

const HIPICK_STEPS = [
  { id: 1, label: "방송 연동 (최초 1회)",          done: true },
  { id: 2, label: "AI 실시간 분석 (방송 중 자동)",  done: true },
  { id: 3, label: "구간 태깅 + 하이라이트 감지",   done: true },
  { id: 4, label: "원하는 클립 선택 후 편집 시작", done: true },
  { id: 5, label: "내보내기 → 유튜브 업로드",      done: true },
];

const SEGMENTS_PREVIEW = [
  { label: "인사",   w: "8%",  color: "#3730a3" },
  { label: "솔로#1", w: "20%", color: "#065f46" },
  { label: "Q&A",   w: "9%",  color: "#3730a3" },
  { label: "솔로#2", w: "18%", color: "#065f46" },
  { label: "식사",   w: "9%",  color: "#92400e" },
  { label: "클립리뷰",w:"8%",  color: "#6d28d9" },
  { label: "팀 랭크", w: "23%", color: "#065f46" },
];

const HIGHLIGHT_DOTS = [0.13, 0.27, 0.38, 0.50, 0.64, 0.72, 0.83, 0.90, 0.96];

function fmt(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function EditingComparisonSection() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (running && elapsed < TOTAL_SEC) {
      timerRef.current = setInterval(() => {
        setElapsed((p) => {
          if (p >= TOTAL_SEC) { clearInterval(timerRef.current); return TOTAL_SEC; }
          return p + 60; // 1 real second = 1 sim minute (sped up)
        });
      }, 80);
    } else if (!running) {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [running, elapsed]);

  const progress = Math.min(elapsed / TOTAL_SEC, 1);
  const isDone = elapsed >= TOTAL_SEC;

  const handleStart = () => {
    setElapsed(0);
    setRunning(true);
  };
  const handleReset = () => {
    setRunning(false);
    setElapsed(0);
  };

  return (
    <section className="bg-slate-950 py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs bg-slate-800 text-slate-400 border border-slate-700 mb-4">
            편집 워크플로우 비교
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
            같은 6시간 방송,<br />
            <span className="text-indigo-400">얼마나 다른</span> 편집 경험인가요?
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            아래 시뮬레이션을 실행해보세요. 기존 방식이 얼마나 걸리는지 눈으로 확인할 수 있습니다.
          </p>

          <div className="flex justify-center gap-3 mt-6">
            {!running && !isDone && (
              <button
                onClick={handleStart}
                className="px-5 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-sm transition-colors cursor-pointer"
              >
                ▶ 시뮬레이션 시작
              </button>
            )}
            {(running || isDone) && (
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium text-sm transition-colors cursor-pointer"
              >
                ↺ 다시 시작
              </button>
            )}
          </div>
        </div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ── LEFT: Traditional ── */}
          <div className="rounded-2xl border border-red-500/20 bg-slate-900/60 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 bg-red-500/10 border-b border-red-500/20">
              <div className="flex items-center gap-2">
                <span className="text-red-400 text-lg">✗</span>
                <span className="text-sm font-semibold text-red-300">기존 편집 방식</span>
              </div>
              <span className="text-xs text-slate-500">프리미어 프로 / 다빈치 리졸브 등</span>
            </div>

            <div className="p-5 space-y-5">
              {/* Fake editor timeline */}
              <div>
                <div className="text-xs text-slate-500 mb-2 font-mono">
                  편집 타임라인 — 6:30:00 원본 영상
                </div>
                <div className="relative rounded overflow-hidden" style={{ height: 52, background: "#111" }}>
                  {/* Raw timeline — grey, unlabeled */}
                  <div className="absolute inset-0 flex items-center px-2">
                    <div className="w-full h-5 rounded bg-slate-700/60 relative overflow-hidden">
                      {/* no segment labels, just raw bar */}
                      <div className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: "repeating-linear-gradient(90deg, transparent 0px, transparent 28px, rgba(255,255,255,0.08) 28px, rgba(255,255,255,0.08) 29px)",
                        }}
                      />
                    </div>
                  </div>
                  {/* Progress cursor */}
                  <div
                    className="absolute top-0 h-full w-0.5 bg-red-400 transition-none"
                    style={{ left: `${Math.max(progress * 96 + 2, 2)}%` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-red-400 -translate-x-[3px] mt-1" />
                  </div>
                  {/* No segment labels shown */}
                  <div className="absolute bottom-1 left-2 text-[9px] text-slate-600 font-mono">0:00</div>
                  <div className="absolute bottom-1 right-2 text-[9px] text-slate-600 font-mono">6:30:00</div>
                </div>

                {/* Time counter */}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-slate-500">현재 시청 위치</span>
                  <span className="text-sm font-mono text-red-300">{fmt(elapsed)}</span>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-2">
                {TRADITIONAL_STEPS.map((step, i) => {
                  const stepProgress = i / (TRADITIONAL_STEPS.length - 1);
                  const isActive = running && !isDone && Math.abs(progress - stepProgress) < 0.22;
                  const isStepDone = step.done || (isDone && i < TRADITIONAL_STEPS.length - 1) || progress > stepProgress + 0.1;
                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive ? "bg-red-500/10 border border-red-500/30" :
                        isStepDone ? "opacity-60" : "opacity-35"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                        isStepDone ? "bg-slate-700 text-slate-400" :
                        isActive ? "bg-red-500/20 text-red-400 border border-red-500/50" :
                        "bg-slate-800 text-slate-600"
                      }`}>
                        {isStepDone ? "✓" : step.id}
                      </div>
                      <span className={`text-xs flex-1 ${isActive ? "text-slate-200" : isStepDone ? "text-slate-400" : "text-slate-600"}`}>
                        {step.label}
                      </span>
                      <span className={`text-[10px] font-mono flex-shrink-0 ${
                        isActive ? "text-red-400" : "text-slate-600"
                      }`}>
                        {step.time}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Total time */}
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-center">
                <div className="text-xs text-slate-500 mb-1">총 예상 소요 시간</div>
                <div className="text-2xl font-bold text-red-400">
                  {isDone ? "8시간 30분+" : running ? fmt(elapsed) : "8시간 30분+"}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  VOD 시청 6:30 + 메모 30분 + 편집 1:30
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: HiPick ── */}
          <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 bg-emerald-500/10 border-b border-emerald-500/20">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-lg">⚡</span>
                <span className="text-sm font-semibold text-emerald-300">HiPick 사용</span>
              </div>
              <span className="text-xs text-slate-500">방송 시작과 동시에 AI 분석</span>
            </div>

            <div className="p-5 space-y-5">
              {/* HiPick timeline preview */}
              <div>
                <div className="text-xs text-slate-500 mb-2 font-mono">
                  AI 분석 타임라인 — 구간·하이라이트 자동 태깅
                </div>
                <div className="rounded overflow-hidden" style={{ height: 52, background: "#0d1117" }}>
                  {/* Segment layer */}
                  <div className="flex h-5">
                    {SEGMENTS_PREVIEW.map((seg, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-center overflow-hidden text-[9px] font-medium"
                        style={{ width: seg.w, background: seg.color + "55", borderRight: "1px solid rgba(255,255,255,0.05)" }}
                      >
                        <span style={{ color: seg.color === "#065f46" ? "#6ee7b7" : seg.color === "#3730a3" ? "#a5b4fc" : seg.color === "#92400e" ? "#fcd34d" : "#c4b5fd" }}
                          className="truncate px-0.5">
                          {seg.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Highlight dots layer */}
                  <div className="relative h-4 mx-1">
                    {HIGHLIGHT_DOTS.map((pos, i) => (
                      <div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full -translate-x-1/2 top-1"
                        style={{
                          left: `${pos * 100}%`,
                          backgroundColor: pos > 0.87 ? "#ef4444" : pos > 0.75 ? "#f97316" : "#eab308",
                          boxShadow: `0 0 4px ${pos > 0.87 ? "#ef444488" : "#f9731688"}`,
                        }}
                      />
                    ))}
                  </div>
                  {/* Labels */}
                  <div className="flex justify-between px-1">
                    <span className="text-[9px] text-slate-600 font-mono">0:00</span>
                    <span className="text-[9px] text-emerald-500 font-mono">✓ 분석 완료</span>
                    <span className="text-[9px] text-slate-600 font-mono">6:30:00</span>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-2">
                {HIPICK_STEPS.map((step) => (
                  <div key={step.id} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      ✓
                    </div>
                    <span className="text-xs text-slate-300 flex-1">{step.label}</span>
                    <span className="text-[10px] text-emerald-500 font-mono">완료</span>
                  </div>
                ))}
              </div>

              {/* Total time */}
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-center">
                <div className="text-xs text-slate-500 mb-1">편집자 추가 소요 시간</div>
                <div className="text-2xl font-bold text-emerald-400">0분</div>
                <div className="text-[10px] text-slate-500 mt-1">
                  방송 종료 즉시 클립 선택 → 바로 편집 착수
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="mt-10 text-center">
          <div className="inline-block rounded-2xl border border-indigo-500/20 bg-indigo-500/5 px-8 py-5 max-w-2xl">
            <div className="text-slate-200 font-semibold text-lg mb-2">
              하이라이트를 찾는 데 쓰던 <span className="text-red-400 line-through">8시간+</span>
              <br />이제는 <span className="text-emerald-400 font-bold text-xl">클립 선택</span>에만 집중하세요.
            </div>
            <p className="text-slate-400 text-sm">
              AI가 구간 태깅, 하이라이트 감지, 클립 추출까지 자동으로 처리합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
