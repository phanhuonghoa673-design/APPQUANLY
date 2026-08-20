import React from "react";
import {
  ShieldCheck,
  Activity,
  Cpu,
  Layers,
  Sparkles,
  Building2,
  UserCheck,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Wifi,
  WifiOff,
  Bell,
  Lock,
  Key,
} from "lucide-react";
import { PersonaType, PersonaInfo } from "../types";
import { PERSONAS } from "../data/mockData";

interface HeaderProps {
  currentPersona: PersonaType;
  onSelectPersona: (persona: PersonaType) => void;
  onOpenArchitecture?: () => void;
  onOpenAdvisor?: () => void;
  onOpenSettings?: () => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  unreadAlertCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPersona,
  onSelectPersona,
  onOpenArchitecture,
  onOpenAdvisor,
  onOpenSettings,
  isOffline,
  onToggleOffline,
  unreadAlertCount = 0,
}) => {
  const getPersonaIcon = (id: PersonaType) => {
    switch (id) {
      case "BOARD":
        return <Building2 className="w-4 h-4" />;
      case "HOMEROOM_TEACHER":
        return <UserCheck className="w-4 h-4" />;
      case "SUBJECT_TEACHER":
        return <BookOpen className="w-4 h-4" />;
      case "ADMIN_STAFF":
        return <ShieldCheck className="w-4 h-4" />;
      case "STUDENT":
        return <GraduationCap className="w-4 h-4" />;
      case "PARENT":
        return <HeartHandshake className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      {/* Top micro-bar: Zero Trust & Microservices Status */}
      <div className="bg-slate-950 px-4 py-1.5 border-b border-slate-800/80 text-[11px] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Zero Trust Gateway: Active</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>Microservices: <strong className="text-slate-200">6/6 Healthy</strong></span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Unique ID & MFA: <strong className="text-slate-200">Enforced</strong></span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Blockchain Ledger: <strong className="text-slate-200">Block #184,290</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Offline/Online toggle simulator */}
          <button
            onClick={onToggleOffline}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              isOffline
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300"
            }`}
            title="Mô phỏng chế độ mất mạng và kích hoạt Hybrid Cloud Offline Sync"
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3 h-3 text-amber-400" />
                <span>Offline Cache Mode</span>
              </>
            ) : (
              <>
                <Wifi className="w-3 h-3 text-emerald-400" />
                <span>Hybrid Cloud Live</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenArchitecture}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 border border-indigo-700/50 text-[11px] transition-colors"
          >
            <Layers className="w-3 h-3" />
            <span>Kiến trúc Hệ thống</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-200 to-white bg-clip-text text-transparent">
                QUẢN LÝ LỚP
              </h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300">
                Google Sheets &amp; AI
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Hệ Thống Quản Lý Lớp Học &amp; Giáo Dục Thông Minh
            </p>
          </div>
        </div>

        {/* Persona Role Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          <button
            onClick={() => onSelectPersona("ALL")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              currentPersona === "ALL"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/50"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Strategic Hub</span>
          </button>

          {PERSONAS.map((p) => {
            const isActive = currentPersona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPersona(p.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? `${p.badgeColor} shadow-md ring-2 ring-white/20 font-semibold`
                    : "bg-slate-800/70 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
                title={p.roleDescription}
              >
                {getPersonaIcon(p.id)}
                <span>{p.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 text-xs font-bold transition-all"
            title="Cấu hình Model AI & Gemini API Key cá nhân"
          >
            <Key className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span className="text-rose-400 font-extrabold">Settings (API Key):</span>
            <span className="text-rose-200 underline font-semibold">Lấy API key để sử dụng app</span>
          </button>

          <button
            onClick={onOpenAdvisor}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Hỏi Cố Vấn AI</span>
          </button>

          <div className="relative">
            <button
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Thông báo hệ thống"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {unreadAlertCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
