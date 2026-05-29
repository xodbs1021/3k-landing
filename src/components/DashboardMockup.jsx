import { useState } from "react";
import DashboardEditorTab from "./DashboardEditorTab";
import DashboardLiveTab from "./DashboardLiveTab";

const TABS = [
  { id: "editor", label: "편집자 대시보드" },
  { id: "live", label: "라이브 실시간 분석" },
];

export default function DashboardMockup() {
  const [activeTab, setActiveTab] = useState("editor");

  return (
    <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-[#0d1117] w-full">
      {/* 브라우저 크롬 */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#161b22] border-b border-slate-700">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-[#1c2128] border border-slate-700 rounded-md px-3 py-1 w-72">
            <svg className="w-3 h-3 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-[11px] text-slate-400 truncate">app.hipick.ai / dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 bg-[#1c2128] border border-slate-700 rounded-md px-2 py-1">
            <span className="text-[10px] font-bold text-indigo-400">Hi</span>
            <span className="text-[10px] font-bold text-amber-400">Pick</span>
          </div>
        </div>
      </div>

      {/* 탭 바 */}
      <div className="flex items-center gap-1 px-4 pt-2 pb-0 bg-[#161b22] border-b border-slate-700">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-t-md transition-colors ${
                isActive
                  ? "bg-[#0d1117] text-slate-100 border border-b-0 border-slate-700"
                  : "text-slate-500 hover:text-slate-300 hover:bg-[#1c2128]"
              }`}
            >
              {tab.id === "live" && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
              )}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 탭 콘텐츠 */}
      <div>
        {activeTab === "editor" ? <DashboardEditorTab /> : <DashboardLiveTab />}
      </div>
    </div>
  );
}
