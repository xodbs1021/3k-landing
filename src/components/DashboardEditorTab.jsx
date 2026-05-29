import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TOTAL_MINUTES = 187;

const SEGMENTS = [
  { id: 1, label: "방송 준비",       icon: "📡", start: 0,    end: 0.05, bg: "#1f2937", border: "#374151", text: "#9ca3af" },
  { id: 2, label: "인사 & 근황 토크", icon: "👋", start: 0.05, end: 0.13, bg: "#1e1b4b", border: "#3730a3", text: "#a5b4fc" },
  { id: 3, label: "솔로 랭크 #1",    icon: "🎮", start: 0.13, end: 0.33, bg: "#022c22", border: "#065f46", text: "#6ee7b7" },
  { id: 4, label: "시청자 Q&A",      icon: "💬", start: 0.33, end: 0.42, bg: "#1e1b4b", border: "#3730a3", text: "#a5b4fc" },
  { id: 5, label: "솔로 랭크 #2",    icon: "🎮", start: 0.42, end: 0.60, bg: "#022c22", border: "#065f46", text: "#6ee7b7" },
  { id: 6, label: "식사 중 방송",    icon: "🍜", start: 0.60, end: 0.69, bg: "#1c1407", border: "#92400e", text: "#fcd34d" },
  { id: 7, label: "다른 클립 리뷰",  icon: "📺", start: 0.69, end: 0.77, bg: "#1a1025", border: "#6d28d9", text: "#c4b5fd" },
  { id: 8, label: "팀 랭크",         icon: "🏆", start: 0.77, end: 1.0,  bg: "#022c22", border: "#065f46", text: "#6ee7b7" },
];

const HIGHLIGHTS = [
  { id: 1,  start: 0.08,  end: 0.10,  score: 73, label: "신규 팬 1000명 돌파 이벤트" },  // 인사 구간
  { id: 2,  start: 0.17,  end: 0.195, score: 81, label: "솔로 킬 스트릭 5연속" },         // 솔로#1
  { id: 3,  start: 0.255, end: 0.285, score: 89, label: "1v3 역전 클리어" },              // 솔로#1
  { id: 4,  start: 0.36,  end: 0.385, score: 76, label: "\"그거 실화냐\" 폭소 타임" },    // Q&A
  { id: 5,  start: 0.455, end: 0.485, score: 94, label: "연속 에이스 킬!" },              // 솔로#2
  { id: 6,  start: 0.535, end: 0.558, score: 66, label: "예상 못한 역대급 실수" },        // 솔로#2
  { id: 7,  start: 0.625, end: 0.648, score: 77, label: "먹다가 채팅 폭발 반응" },       // 식사
  { id: 8,  start: 0.705, end: 0.73,  score: 82, label: "다른 스트리머 클립 리액션" },   // 클립리뷰
  { id: 9,  start: 0.80,  end: 0.825, score: 87, label: "5인 팀 완벽 조합 성공" },       // 팀랭크
  { id: 10, start: 0.875, end: 0.905, score: 98, label: "역전 불가 상황 극적 승리!" },   // 팀랭크
  { id: 11, start: 0.945, end: 0.968, score: 70, label: "0.1초 차 아슬아슬한 생존" },   // 팀랭크
];

const CHAT_DATA = [
  { min: 0,   v: 12 },  { min: 5,   v: 18 },  { min: 9,   v: 15 },
  { min: 12,  v: 187 }, { min: 14,  v: 143 }, // 인사 이벤트 스파이크
  { min: 20,  v: 48 },  { min: 28,  v: 67 },  { min: 32,  v: 43 },
  { min: 37,  v: 112 }, { min: 39,  v: 145 }, // 솔로#1 킬스
  { min: 44,  v: 67 },  { min: 50,  v: 198 }, { min: 53,  v: 256 }, { min: 56, v: 189 }, // 1v3 클리어
  { min: 62,  v: 78 },  { min: 66,  v: 43 },  { min: 70,  v: 89 },
  { min: 75,  v: 134 }, { min: 76,  v: 167 }, // Q&A 폭소
  { min: 85,  v: 48 },  { min: 90,  v: 67 },
  { min: 95,  v: 234 }, { min: 97,  v: 298 }, { min: 99,  v: 187 }, // 에이스 킬
  { min: 105, v: 67 },  { min: 110, v: 45 },  { min: 112, v: 89 },
  { min: 117, v: 43 },  { min: 120, v: 38 },
  { min: 125, v: 156 }, { min: 127, v: 178 }, // 먹방 폭발
  { min: 133, v: 54 },  { min: 138, v: 67 },
  { min: 143, v: 189 }, { min: 145, v: 213 }, // 클립 리액션
  { min: 152, v: 67 },  { min: 158, v: 89 },
  { min: 164, v: 198 }, { min: 167, v: 245 }, // 팀 조합
  { min: 172, v: 134 }, { min: 177, v: 178 },
  { min: 180, v: 312 }, { min: 183, v: 287 }, { min: 185, v: 198 }, // 역전 승리!
  { min: 187, v: 134 },
];

function fmt(minutes) {
  const h = Math.floor(minutes / 60);
  const m = Math.floor(minutes % 60);
  const s = Math.floor((minutes % 1) * 60);
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function scoreColor(score) {
  if (score >= 90) return "#ef4444";
  if (score >= 80) return "#f97316";
  if (score >= 70) return "#eab308";
  return "#6366f1";
}

function scoreBadge(score) {
  if (score >= 90) return "bg-red-500/20 text-red-400 border-red-500/40";
  if (score >= 80) return "bg-orange-500/20 text-orange-400 border-orange-500/40";
  if (score >= 70) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
  return "bg-indigo-500/20 text-indigo-400 border-indigo-500/40";
}

const byScore = [...HIGHLIGHTS].sort((a, b) => b.score - a.score);
const byTime = [...HIGHLIGHTS].sort((a, b) => a.start - b.start);

export default function DashboardEditorTab() {
  const [selectedId, setSelectedId] = useState(5);
  const [sortTab, setSortTab] = useState("score");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredSeg, setHoveredSeg] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);

  const clips = sortTab === "score" ? byScore : byTime;
  const sel = HIGHLIGHTS.find((h) => h.id === selectedId);

  return (
    <div className="flex flex-col bg-[#0d1117] text-slate-100" style={{ height: 580 }}>

      {/* ── Row 1: Video + Chat stats ── */}
      <div className="flex flex-1 min-h-0">

        {/* Video player (left 62%) */}
        <div className="flex flex-col border-r border-[#21262d]" style={{ width: "62%" }}>
          {/* Broadcast info bar */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22] border-b border-[#21262d] flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-200">🎮 게임스트림TV</span>
              <span className="text-[10px] text-slate-500">발로란트 마스터 도전기 EP.12</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500">총 3:07:15</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                클립 {HIGHLIGHTS.length}개
              </span>
            </div>
          </div>

          {/* Video area */}
          <div
            className="relative flex-1 flex items-center justify-center bg-[#0d1117] overflow-hidden min-h-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 25% 55%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse at 75% 30%, rgba(16,185,129,0.06) 0%, transparent 55%)",
            }}
          >
            {sel && (
              <>
                <div className="absolute top-2 left-2 bg-black/60 rounded px-2 py-0.5 text-[10px] text-slate-300">
                  {fmt(sel.start * TOTAL_MINUTES)} ~ {fmt(sel.end * TOTAL_MINUTES)}
                </div>
                <div className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded border ${scoreBadge(sel.score)}`}>
                  {sel.score}점
                </div>
                <div className="absolute bottom-2 left-2 bg-black/60 rounded px-2 py-0.5 text-[10px] text-white font-medium">
                  {sel.label}
                </div>
              </>
            )}
            <div className="absolute bottom-2 right-2 text-[10px] text-slate-600">1920×1080 · 치지직</div>

            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all cursor-pointer text-xl"
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
          </div>

          {/* Transport controls */}
          <div className="flex items-center gap-2 px-3 py-2 bg-[#161b22] border-t border-[#21262d] flex-shrink-0 text-slate-400">
            <button className="hover:text-white text-sm">⏮</button>
            <button className="hover:text-white text-sm">◀◀</button>
            <button className="hover:text-white text-sm cursor-pointer" onClick={() => setIsPlaying((p) => !p)}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button className="hover:text-white text-sm">▶▶</button>
            <button className="hover:text-white text-sm">⏭</button>
            <span className="text-[10px] ml-1 text-slate-500">
              {sel ? fmt(sel.start * TOTAL_MINUTES) : "00:00"} / 3:07:15
            </span>
            <div className="flex-1" />
            <span className="text-xs">🔊</span>
            <input type="range" className="w-12 h-0.5 accent-indigo-500" defaultValue={80} />
          </div>
        </div>

        {/* Chat analysis panel (right 38%) */}
        <div className="flex flex-col overflow-y-auto px-3 py-3 gap-3" style={{ width: "38%" }}>
          <div className="text-[11px] font-semibold text-slate-300">채팅 반응 분석</div>

          <div>
            <div className="text-[10px] text-slate-500 mb-0.5">평균 채팅 속도</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-slate-100">187</span>
              <span className="text-[10px] text-slate-400">/ 분</span>
            </div>
            <div className="text-[10px] text-slate-500">피크: 312/분 · 02:01:45</div>
          </div>

          <div>
            <div className="text-[10px] text-slate-500 mb-1.5">감정 분석</div>
            {[
              { emoji: "😂", label: "웃음", pct: 42, color: "#f59e0b" },
              { emoji: "😮", label: "놀람", pct: 31, color: "#6366f1" },
              { emoji: "❤️", label: "호감", pct: 27, color: "#ef4444" },
            ].map((e) => (
              <div key={e.label} className="flex items-center gap-1.5 mb-1">
                <span className="text-sm w-5">{e.emoji}</span>
                <span className="text-[10px] text-slate-400 w-7">{e.pct}%</span>
                <div className="flex-1 bg-slate-700/50 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full" style={{ width: `${e.pct}%`, backgroundColor: e.color }} />
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="text-[10px] text-slate-500 mb-1.5">인기 키워드</div>
            {[
              { kw: "ㅋㅋㅋ", n: 1234 }, { kw: "ㄷㄷㄷ", n: 876 },
              { kw: "실화냐", n: 543 }, { kw: "와", n: 421 },
            ].map((k) => (
              <div key={k.kw} className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] text-slate-300 font-mono w-10">{k.kw}</span>
                <div className="flex-1 bg-slate-700/50 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: `${(k.n / 1234) * 100}%` }} />
                </div>
                <span className="text-[9px] text-slate-500 w-9 text-right">{k.n.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {sel && (
            <div className="rounded-lg p-2 border border-indigo-500/30 bg-indigo-500/5 mt-auto">
              <div className="text-[10px] text-indigo-400 mb-0.5">선택된 클립</div>
              <div className="text-[11px] font-medium text-slate-200">{sel.label}</div>
              <div className="text-[10px] text-slate-400">
                {fmt(sel.start * TOTAL_MINUTES)} ~ {fmt(sel.end * TOTAL_MINUTES)}
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${scoreBadge(sel.score)}`}>
                  {sel.score}점
                </span>
                <span className="text-[10px] text-slate-500">
                  {Math.round((sel.end - sel.start) * TOTAL_MINUTES * 60)}초
                </span>
              </div>
              <div className="flex gap-1 mt-2">
                <button className="text-[10px] px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 cursor-pointer">
                  다운로드
                </button>
                <button className="text-[10px] px-2 py-1 rounded bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 cursor-pointer">
                  유튜브 내보내기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Row 2: Timeline ── */}
      <div className="flex-shrink-0 border-t border-[#21262d] bg-[#161b22] px-4 pt-2.5 pb-2">
        {/* Legend */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-slate-300">타임라인 분석</span>
          <div className="flex items-center gap-3 text-[9px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-[2px]" style={{ background: "#3730a3" }} />잡담
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-[2px]" style={{ background: "#065f46" }} />게임
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-[2px]" style={{ background: "#92400e" }} />기타
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-6 h-1.5 rounded-sm" style={{ background: "#f97316" }} />하이라이트
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#fbbf24" }} />피크
            </span>
          </div>
        </div>

        {/* Layer 1: 구간 태깅 */}
        <div className="relative flex h-6 rounded overflow-hidden mb-1">
          {SEGMENTS.map((seg) => (
            <div
              key={seg.id}
              className="relative flex items-center justify-center overflow-hidden cursor-pointer transition-opacity hover:brightness-125"
              style={{
                width: `${(seg.end - seg.start) * 100}%`,
                background: seg.bg,
                borderRight: `1px solid ${seg.border}`,
              }}
              onMouseEnter={() => setHoveredSeg(seg.id)}
              onMouseLeave={() => setHoveredSeg(null)}
            >
              <span className="text-[10px] font-medium truncate px-1 select-none" style={{ color: seg.text }}>
                {(seg.end - seg.start) > 0.07 ? `${seg.icon} ${seg.label}` : seg.icon}
              </span>
              {hoveredSeg === seg.id && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-20 pointer-events-none bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[10px] text-slate-200 whitespace-nowrap shadow-lg">
                  {seg.icon} {seg.label} · {fmt(seg.start * TOTAL_MINUTES)} ~ {fmt(seg.end * TOTAL_MINUTES)}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Layer 2: 하이라이트 바 */}
        <div className="relative h-8 mb-0.5">
          {HIGHLIGHTS.map((h) => {
            const heightPct = 35 + (h.score / 100) * 65;
            const color = scoreColor(h.score);
            const isSelected = selectedId === h.id;
            return (
              <div
                key={h.id}
                className="absolute bottom-0 rounded-t cursor-pointer transition-all"
                style={{
                  left: `${h.start * 100}%`,
                  width: `max(${(h.end - h.start) * 100}%, 3px)`,
                  height: `${heightPct}%`,
                  backgroundColor: color,
                  opacity: isSelected ? 1 : 0.55,
                  outline: isSelected ? `1.5px solid ${color}` : "none",
                  outlineOffset: "1px",
                  zIndex: isSelected ? 2 : 1,
                }}
                onClick={() => setSelectedId(h.id)}
                onMouseEnter={() => setHoveredBar(h.id)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {hoveredBar === h.id && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-20 pointer-events-none bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[10px] text-slate-200 whitespace-nowrap shadow-lg">
                    {h.label} · {h.score}점
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Layer 3: 피크 점 */}
        <div className="relative h-3 mb-0.5">
          {HIGHLIGHTS.map((h) => {
            const pos = (h.start + h.end) / 2;
            return (
              <div
                key={h.id}
                className="absolute w-2 h-2 rounded-full cursor-pointer top-0.5"
                style={{
                  left: `${pos * 100}%`,
                  transform: "translateX(-50%)",
                  backgroundColor: scoreColor(h.score),
                  boxShadow: `0 0 5px ${scoreColor(h.score)}88`,
                  opacity: selectedId === h.id ? 1 : 0.6,
                }}
                onClick={() => setSelectedId(h.id)}
              />
            );
          })}
        </div>

        {/* Layer 4: 채팅 반응 그래프 */}
        <div className="h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CHAT_DATA} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="min" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 6, fontSize: 10 }}
                formatter={(v) => [`${v}/분`, "채팅 속도"]}
                labelFormatter={(l) => fmt(Number(l))}
              />
              <Area
                type="monotone"
                dataKey="v"
                stroke="#6366f1"
                strokeWidth={1.5}
                fill="url(#cg)"
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Time labels */}
        <div className="flex justify-between text-[9px] text-slate-600 mt-0.5 select-none">
          {["0:00", "46:45", "1:33:30", "2:20:15", "3:07:15"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── Row 3: Clip cards ── */}
      <div className="flex-shrink-0 border-t border-[#21262d] bg-[#0d1117]">
        {/* Header with sort tabs */}
        <div className="flex items-center justify-between px-4 pt-2 pb-1.5">
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-slate-500 mr-1">감지된 클립 {HIGHLIGHTS.length}개</span>
            {["score", "time"].map((t) => (
              <button
                key={t}
                onClick={() => setSortTab(t)}
                className={`text-[10px] px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${
                  sortTab === t
                    ? "bg-indigo-500 text-white"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {t === "score" ? "점수순" : "시간순"}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            <button className="text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer">
              선택 다운로드
            </button>
            <button className="text-[10px] px-2 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 cursor-pointer">
              유튜브 내보내기 →
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          className="flex gap-2 px-4 pb-3 overflow-x-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#334155 transparent" }}
        >
          {clips.map((clip, idx) => (
            <div
              key={clip.id}
              onClick={() => setSelectedId(clip.id)}
              className="flex-shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all"
              style={{
                width: 130,
                border: selectedId === clip.id
                  ? `1.5px solid ${scoreColor(clip.score)}`
                  : "1.5px solid #21262d",
                background: selectedId === clip.id ? "#1c2128" : "#161b22",
              }}
            >
              {/* Thumbnail */}
              <div
                className="relative flex items-center justify-center"
                style={{
                  height: 72,
                  background: `radial-gradient(ellipse at 50% 50%, ${scoreColor(clip.score)}22 0%, #161b22 70%)`,
                }}
              >
                <span className="text-2xl">🎮</span>
                <span className="absolute top-1 left-1.5 text-[9px] font-bold text-slate-300">
                  #{idx + 1}
                </span>
                <span
                  className={`absolute bottom-1 right-1 text-[9px] font-bold px-1.5 py-0.5 rounded border ${scoreBadge(clip.score)}`}
                >
                  {clip.score}
                </span>
              </div>

              {/* Info */}
              <div className="px-2 py-1.5">
                <div className="text-[10px] font-medium text-slate-200 truncate">{clip.label}</div>
                <div className="text-[9px] text-slate-500 mt-0.5">
                  {fmt(clip.start * TOTAL_MINUTES)} · {Math.round((clip.end - clip.start) * TOTAL_MINUTES * 60)}초
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
