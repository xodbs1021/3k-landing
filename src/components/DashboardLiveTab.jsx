import { useState, useEffect, useRef } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TAGS = ["채팅 폭발", "킬!", "웃음 폭발", "보스 등장"];

const INITIAL_HIGHLIGHTS = [
  { id: 1, time: "01:23:12", tag: "극적 역전!", score: 95, status: "uploaded", platform: "치지직" },
  { id: 2, time: "00:47:33", tag: "보스 클리어", score: 88, status: "uploaded", platform: "SOOP" },
  { id: 3, time: "00:12:04", tag: "채팅 폭발", score: 76, status: "pending", platform: null },
];

function pad(n) {
  return String(n).padStart(2, "0");
}

function formatElapsed(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${pad(m)}:${pad(s)}`;
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function StatusBadge({ status }) {
  if (status === "uploaded") {
    return (
      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded px-1.5 py-0.5">
        ✓ 업로드됨
      </span>
    );
  }
  if (status === "uploading") {
    return (
      <span className="text-[10px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded px-1.5 py-0.5">
        자동 업로드 중...
      </span>
    );
  }
  return (
    <span className="text-[10px] bg-slate-500/20 text-slate-400 border border-slate-600 rounded px-1.5 py-0.5">
      ⏳ 검토 대기
    </span>
  );
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1c2128] border border-slate-700 rounded px-2 py-1 text-xs text-slate-200">
        {payload[0].value}개/분
      </div>
    );
  }
  return null;
}

export default function DashboardLiveTab() {
  const [elapsed, setElapsed] = useState(0);
  const [viewers, setViewers] = useState(12847);
  const [chartData, setChartData] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({ t: i, count: randomBetween(50, 200) }))
  );
  const [currentSpeed, setCurrentSpeed] = useState(187);
  const [peakSpeed, setPeakSpeed] = useState(312);
  const [avgSpeed, setAvgSpeed] = useState(187);
  const [spike, setSpike] = useState(false);
  const [highlights, setHighlights] = useState(INITIAL_HIGHLIGHTS);
  const [nextId, setNextId] = useState(4);
  const tickRef = useRef(0);
  const hlTimerRef = useRef(0);

  useEffect(() => {
    const secondTimer = setInterval(() => {
      setElapsed((e) => e + 1);
      setViewers((v) => v + randomBetween(-50, 80));
    }, 1000);

    const chartTimer = setInterval(() => {
      tickRef.current += 1;
      const isSpike = Math.random() < 0.12;
      const count = isSpike ? randomBetween(280, 350) : randomBetween(50, 220);
      setCurrentSpeed(count);
      setPeakSpeed((p) => Math.max(p, count));
      setAvgSpeed((a) => Math.round(a * 0.85 + count * 0.15));
      setChartData((prev) => {
        const next = [...prev.slice(-19), { t: tickRef.current, count }];
        return next;
      });
      if (count >= 250) {
        setSpike(true);
        setTimeout(() => setSpike(false), 3000);
      }
    }, 2000);

    const hlTimer = setInterval(() => {
      hlTimerRef.current += 1;
      const score = randomBetween(70, 95);
      const tag = TAGS[Math.floor(Math.random() * TAGS.length)];
      const status = score > 85 ? "uploading" : "pending";
      const newItem = {
        id: hlTimerRef.current + 10,
        time: formatElapsed(elapsed + hlTimerRef.current * 15),
        tag,
        score,
        status,
        platform: null,
      };
      setHighlights((prev) => [newItem, ...prev].slice(0, 5));
      setNextId((n) => n + 1);

      if (score > 85) {
        setTimeout(() => {
          setHighlights((prev) =>
            prev.map((h) =>
              h.id === newItem.id ? { ...h, status: "uploaded", platform: Math.random() > 0.5 ? "치지직" : "SOOP" } : h
            )
          );
        }, 2000);
      }
    }, 15000);

    return () => {
      clearInterval(secondTimer);
      clearInterval(chartTimer);
      clearInterval(hlTimer);
    };
  }, []);

  const chijikCount = highlights.filter((h) => h.platform === "치지직").length;
  const soopCount = highlights.filter((h) => h.platform === "SOOP").length;

  return (
    <div className="bg-[#0d1117] h-[520px] flex flex-col">
      {/* 상단 상태 바 */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#161b22] border-b border-slate-700">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
          <span className="text-xs font-bold text-red-400">LIVE</span>
        </div>
        <div className="h-4 w-px bg-slate-700" />
        <div className="flex items-center gap-1.5">
          <span className="text-lg">🎮</span>
          <span className="text-xs font-semibold text-slate-200">게임스트림TV</span>
        </div>
        <div className="h-4 w-px bg-slate-700" />
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-500">경과</span>
          <span className="text-xs font-mono text-slate-200">{formatElapsed(elapsed)}</span>
        </div>
        <div className="h-4 w-px bg-slate-700" />
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-500">시청자</span>
          <span className="text-xs font-mono text-slate-200">{viewers.toLocaleString()}</span>
        </div>
        <div className="ml-auto">
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full px-2 py-0.5">
            실시간 분석 중
          </span>
        </div>
      </div>

      {/* 메인 2컬럼 */}
      <div className="flex-1 flex min-h-0">
        {/* 왼쪽: 채팅 속도 그래프 */}
        <div className="flex-1 border-r border-slate-700 flex flex-col p-4">
          {spike && (
            <div className="mb-2 flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-md px-3 py-2 animate-pulse">
              <span className="text-sm">⚡</span>
              <span className="text-xs text-amber-400 font-semibold">채팅 급증 감지!</span>
            </div>
          )}

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-bold text-slate-100">{currentSpeed}</span>
            <span className="text-sm text-slate-400">/ 분</span>
            <span className="text-xs text-slate-500 ml-auto">실시간 채팅 속도</span>
          </div>

          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="chatGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" hide />
                <YAxis tick={{ fontSize: 8, fill: "#64748b" }} domain={[0, 400]} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#chatGrad)"
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <div>
              <p className="text-[10px] text-slate-500">평균</p>
              <p className="text-xs font-semibold text-slate-300">{avgSpeed}/분</p>
            </div>
            <div className="h-6 w-px bg-slate-700" />
            <div>
              <p className="text-[10px] text-slate-500">피크</p>
              <p className="text-xs font-semibold text-amber-400">{peakSpeed}/분</p>
            </div>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="w-72 flex flex-col overflow-hidden">
          {/* 하이라이트 피드 */}
          <div className="flex-1 border-b border-slate-700 flex flex-col min-h-0">
            <div className="px-3 py-2 border-b border-slate-700/50 flex items-center justify-between flex-shrink-0">
              <span className="text-xs font-semibold text-slate-200">하이라이트 감지 피드</span>
              <span className="text-[10px] text-slate-500">{highlights.length}개</span>
            </div>
            <div className="flex-1 overflow-y-auto py-1.5 px-2 space-y-1.5">
              {highlights.map((h) => (
                <div
                  key={h.id}
                  className="bg-[#1c2128] rounded-md px-2.5 py-2 border border-slate-700/50"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">{h.score > 85 ? "🔥" : "⚡"}</span>
                      <span className="text-[10px] font-mono text-slate-400">{h.time}</span>
                    </div>
                    <span className="text-xs font-bold text-amber-400">{h.score}점</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] rounded px-1.5 py-0.5 font-medium ${
                      h.score > 85
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    }`}>
                      {h.tag}
                    </span>
                    <StatusBadge status={h.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 플랫폼 업로드 현황 */}
          <div className="px-3 py-2.5 border-b border-slate-700">
            <p className="text-[10px] text-slate-500 mb-2">플랫폼 업로드 현황</p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between bg-[#1c2128] rounded-md px-2.5 py-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-emerald-600 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white">치</span>
                  </div>
                  <span className="text-xs text-slate-300">치지직</span>
                </div>
                <span className="text-[10px] text-emerald-400">
                  ✓ {Math.max(chijikCount, 2)}개 업로드됨
                </span>
              </div>
              <div className="flex items-center justify-between bg-[#1c2128] rounded-md px-2.5 py-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white">S</span>
                  </div>
                  <span className="text-xs text-slate-300">SOOP</span>
                </div>
                <span className="text-[10px] text-emerald-400">
                  ✓ {Math.max(soopCount, 1)}개 업로드됨
                </span>
              </div>
            </div>
          </div>

          {/* AI 분석 상태 */}
          <div className="px-3 py-2.5">
            <p className="text-[10px] text-slate-500 mb-2">AI 분석 상태</p>
            <div className="space-y-1.5">
              {[
                { icon: "🎬", label: "영상 분석", pct: 80 },
                { icon: "🗨️", label: "채팅 분석", pct: 100 },
              ].map((a) => (
                <div key={a.label} className="flex items-center gap-2">
                  <span className="text-xs w-4">{a.icon}</span>
                  <span className="text-[10px] text-slate-400 w-16">{a.label}</span>
                  <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${a.pct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-emerald-400 w-6 text-right">활성</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
