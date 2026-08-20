import React, { useState } from "react";
import { PersonaType } from "./types";
import { Header } from "./components/Header";
import { AIAdvisorView } from "./components/AIAdvisor/AIAdvisorView";
import { BoardView } from "./components/DashboardBoard/BoardView";
import { HomeroomView } from "./components/DashboardHomeroom/HomeroomView";
import { SubjectTeacherView } from "./components/DashboardSubject/SubjectTeacherView";
import { AdminView } from "./components/DashboardAdmin/AdminView";
import { StudentView } from "./components/DashboardStudent/StudentView";
import { ParentView } from "./components/DashboardParent/ParentView";
import { OnlineClassManager } from "./components/OnlineClassManager/OnlineClassManager";
import { MoodleIntegration } from "./components/MoodleIntegration/MoodleIntegration";
import { LiveQuizArena } from "./components/QuizGame/LiveQuizArena";
import { AdvancedAnalyticsDashboard } from "./components/AnalyticsD3/AdvancedAnalyticsDashboard";
import { AlgorithmicCanvas } from "./components/AlgorithmicCanvas/AlgorithmicCanvas";
import { ApiKeyModal } from "./components/ApiKeyModal/ApiKeyModal";
import { getStoredApiKey } from "./services/geminiService";
import {
  Sparkles,
  LayoutDashboard,
  FileSpreadsheet,
  Globe,
  Trophy,
  BarChart3,
  Cpu,
} from "lucide-react";

export type MainTabType =
  | "WORKSPACE"
  | "ONLINE_CLASSES"
  | "MOODLE_LMS"
  | "QUIZ_ARENA"
  | "D3_ANALYTICS"
  | "MATH_CANVAS"
  | "AI_ADVISOR";

export default function App() {
  const [currentPersona, setCurrentPersona] = useState<PersonaType>("BOARD");
  const [activeMainTab, setActiveMainTab] = useState<MainTabType>("WORKSPACE");
  const [isOffline, setIsOffline] = useState(false);
  const [externalPrompt, setExternalPrompt] = useState<string | null>(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(() => {
    return !getStoredApiKey(); // Auto open if no API key is saved
  });

  const handleAskAIFromModule = (prompt: string) => {
    setExternalPrompt(prompt);
    setActiveMainTab("AI_ADVISOR");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* API Key Settings Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />

      {/* Top Application Header */}
      <Header
        currentPersona={currentPersona}
        onSelectPersona={(persona) => {
          setCurrentPersona(persona);
        }}
        onOpenSettings={() => setIsApiKeyModalOpen(true)}
        onOpenAdvisor={() => setActiveMainTab("AI_ADVISOR")}
        isOffline={isOffline}
        onToggleOffline={() => setIsOffline(!isOffline)}
      />

      {/* Navigation Sub-bar */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between py-2.5 gap-3">
          {/* Main Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveMainTab("WORKSPACE")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeMainTab === "WORKSPACE"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Bàn Làm Việc Nghiệp Vụ</span>
            </button>

            <button
              onClick={() => setActiveMainTab("ONLINE_CLASSES")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeMainTab === "ONLINE_CLASSES"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-300" />
              <span>Google Sheet Live DB</span>
            </button>

            <button
              onClick={() => setActiveMainTab("MOODLE_LMS")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeMainTab === "MOODLE_LMS"
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>Moodle LMS API</span>
            </button>

            <button
              onClick={() => setActiveMainTab("QUIZ_ARENA")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeMainTab === "QUIZ_ARENA"
                  ? "bg-pink-600 text-white shadow-md shadow-pink-600/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>Đấu Trường Quiz</span>
            </button>

            <button
              onClick={() => setActiveMainTab("D3_ANALYTICS")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeMainTab === "D3_ANALYTICS"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-cyan-300" />
              <span>Phổ Điểm D3</span>
            </button>

            <button
              onClick={() => setActiveMainTab("MATH_CANVAS")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeMainTab === "MATH_CANVAS"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-purple-300" />
              <span>STEM Canvas</span>
            </button>

            <button
              onClick={() => setActiveMainTab("AI_ADVISOR")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeMainTab === "AI_ADVISOR"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Cố Vấn AI Quản Lý Lớp</span>
            </button>
          </div>

          {/* Quick Context Pill */}
          <div className="hidden xl:flex items-center gap-2 text-xs text-slate-500">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Skill Education Complete: 14/14</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {activeMainTab === "ONLINE_CLASSES" ? (
          <OnlineClassManager onAskAI={handleAskAIFromModule} />
        ) : activeMainTab === "MOODLE_LMS" ? (
          <MoodleIntegration />
        ) : activeMainTab === "QUIZ_ARENA" ? (
          <LiveQuizArena />
        ) : activeMainTab === "D3_ANALYTICS" ? (
          <AdvancedAnalyticsDashboard />
        ) : activeMainTab === "MATH_CANVAS" ? (
          <AlgorithmicCanvas />
        ) : activeMainTab === "AI_ADVISOR" ? (
          <AIAdvisorView
            currentPersona={currentPersona}
            isOffline={isOffline}
            initialPrompt={externalPrompt || undefined}
          />
        ) : (
          <div>
            {currentPersona === "BOARD" && (
              <BoardView onAskAI={handleAskAIFromModule} />
            )}
            {currentPersona === "HOMEROOM_TEACHER" && (
              <HomeroomView onAskAI={handleAskAIFromModule} />
            )}
            {currentPersona === "SUBJECT_TEACHER" && (
              <SubjectTeacherView onAskAI={handleAskAIFromModule} />
            )}
            {currentPersona === "ADMIN_STAFF" && (
              <AdminView
                onAskAI={handleAskAIFromModule}
                isOffline={isOffline}
                onToggleOffline={() => setIsOffline(!isOffline)}
              />
            )}
            {currentPersona === "STUDENT" && (
              <StudentView onAskAI={handleAskAIFromModule} />
            )}
            {currentPersona === "PARENT" && (
              <ParentView onAskAI={handleAskAIFromModule} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-4 px-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>Hệ Thống Quản Lý Lớp Học Thông Minh (Quản Lý Lớp) • 2026 - 2027</span>
          <span className="font-mono text-[11px]">
            Google Sheets DB • Moodle LMS • Live Quiz Arena • D3 Analytics • STEM Canvas • Gemini AI
          </span>
        </div>
      </footer>
    </div>
  );
}
