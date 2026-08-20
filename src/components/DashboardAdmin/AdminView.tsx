import React, { useState } from "react";
import {
  ShieldCheck,
  RefreshCw,
  FileSpreadsheet,
  Database,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Wifi,
  WifiOff,
  Sparkles,
  ArrowRight,
  PenTool,
  Upload,
} from "lucide-react";
import { DataConflictItem } from "../../types";
import { INITIAL_CONFLICTS } from "../../data/mockData";

export const AdminView: React.FC<{
  onAskAI: (prompt: string) => void;
  isOffline: boolean;
  onToggleOffline: () => void;
}> = ({ onAskAI, isOffline, onToggleOffline }) => {
  const [activeTab, setActiveTab] = useState<"RECONCILIATION" | "OFFLINE_SYNC" | "ZERO_TRUST">("RECONCILIATION");
  const [conflicts, setConflicts] = useState<DataConflictItem[]>(INITIAL_CONFLICTS);
  const [isReconciling, setIsReconciling] = useState(false);
  const [reconciledCount, setReconciledCount] = useState(0);

  const handleResolveConflict = (id: string) => {
    setConflicts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Đã đồng bộ" } : c))
    );
    setReconciledCount((prev) => prev + 1);
  };

  const handleRunBatchReconciliation = () => {
    setIsReconciling(true);
    setTimeout(() => {
      setConflicts((prev) =>
        prev.map((c) => ({
          ...c,
          status: "Đã đồng bộ",
        }))
      );
      setIsReconciling(false);
      setReconciledCount(conflicts.length);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
              Phân hệ Quản trị Dữ liệu
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Trung Tâm Quản Trị Hành Chính & Liên Thông Dữ Liệu
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time Data Reconciliation (Excel ↔ SQL ↔ CSDL Quốc gia) • Hybrid Cloud Offline Sync • Zero Trust RBAC
          </p>
        </div>

        {/* Sub-tab navigation */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("RECONCILIATION")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "RECONCILIATION"
                ? "bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Đối Soát Dữ Liệu (3 Nguồn)</span>
            {conflicts.filter((c) => c.status === "Chưa xử lý").length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
                {conflicts.filter((c) => c.status === "Chưa xử lý").length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("OFFLINE_SYNC")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "OFFLINE_SYNC"
                ? "bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5 text-rose-500" /> : <Wifi className="w-3.5 h-3.5 text-emerald-500" />}
            <span>Hybrid Cloud & Offline</span>
          </button>
          <button
            onClick={() => setActiveTab("ZERO_TRUST")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "ZERO_TRUST"
                ? "bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Bảo Mật Zero Trust & MFA</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DATA RECONCILIATION ENGINE */}
      {activeTab === "RECONCILIATION" && (
        <div className="space-y-6">
          {/* Data Flow Diagram Banner */}
          <div className="bg-gradient-to-r from-amber-900/40 via-indigo-950/40 to-slate-900 border border-amber-500/20 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Dòng chảy dữ liệu thống nhất (Continuous Data Pipeline)
                </span>
                <h3 className="font-bold text-white text-base mt-0.5">
                  Cơ Chế Real-time Data Reconciliation Đa Tầng
                </h3>
              </div>

              <button
                onClick={handleRunBatchReconciliation}
                disabled={isReconciling}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
              >
                {isReconciling ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang đối soát & tự động hợp nhất...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Chạy Đối Soát Tự Động Toàn Bộ CSDL</span>
                  </>
                )}
              </button>
            </div>

            {/* 3 Data Streams Visual Node */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <FileSpreadsheet className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <strong className="text-white block">1. Excel Nhập Liệu</strong>
                  <span className="text-slate-400 text-[11px]">2,450 bản ghi • 0 lỗi cấu trúc</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <Database className="w-6 h-6 text-blue-400 shrink-0" />
                <div>
                  <strong className="text-white block">2. SQL CSDL Trường</strong>
                  <span className="text-slate-400 text-[11px]">2,446 bản ghi • Khớp 99.8%</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <Globe className="w-6 h-6 text-cyan-400 shrink-0" />
                <div>
                  <strong className="text-white block">3. CSDL Ngành & Quốc Gia</strong>
                  <span className="text-slate-400 text-[11px]">2,442 bản ghi • 3 xung đột</span>
                </div>
              </div>
            </div>
          </div>

          {/* Discrepancies Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Danh Sách Xung Đột Cần Xử Lý (Data Discrepancies Desk)
              </h3>
              <span className="text-xs text-slate-400">
                Đã xử lý: <strong>{reconciledCount}</strong> / {conflicts.length}
              </span>
            </div>

            <div className="space-y-3">
              {conflicts.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all ${
                    item.status === "Đã đồng bộ"
                      ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60"
                      : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-black/5 dark:border-white/5 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {item.studentName}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500">
                        ({item.studentId} • Lớp {item.class})
                      </span>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === "Đã đồng bộ"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-2.5 text-xs">
                    <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Excel File:</span>
                      <strong className="text-slate-700 dark:text-slate-300">{item.excelField}</strong>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">SQL Database:</span>
                      <strong className="text-slate-700 dark:text-slate-300">{item.sqlField}</strong>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">CSDL Quốc Gia:</span>
                      <strong className="text-rose-600 dark:text-rose-400">{item.nationalDbField}</strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] italic">
                      💡 <strong>Đề xuất AI:</strong> {item.suggestedResolution}
                    </p>

                    {item.status !== "Đã đồng bộ" && (
                      <button
                        onClick={() => handleResolveConflict(item.id)}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Chấp nhận & Đồng bộ</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HYBRID CLOUD & OFFLINE SYNC */}
      {activeTab === "OFFLINE_SYNC" && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Mô Hình Hybrid Cloud & Bộ Nhớ Đệm Ngoại Tuyến (Offline-First Storage)
              </h3>
              <p className="text-xs text-slate-400">
                Cho phép giáo viên điểm danh, chấm điểm và nhập liệu ngay cả khi ngắt kết nối mạng
              </p>
            </div>

            <button
              onClick={onToggleOffline}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isOffline
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                  : "bg-rose-600 hover:bg-rose-500 text-white"
              }`}
            >
              {isOffline ? (
                <>
                  <Wifi className="w-4 h-4" />
                  <span>Khôi phục kết nối Online (Đồng bộ ngay)</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4" />
                  <span>Mô phỏng ngắt kết nối mạng (Bật Offline)</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 dark:text-slate-200">
                Trạng thái bộ đệm cục bộ (IndexedDB Hybrid Cache):
              </span>
              <span className="text-emerald-600 font-bold">100% Sẵn sàng</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Hàng đợi đồng bộ (Sync Queue): <strong>0 tác vụ đang chờ</strong>. Mọi thao tác offline sẽ được gom thành gói tin có ký số để đối soát khi nối lại Internet.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: ZERO TRUST RBAC & MFA */}
      {activeTab === "ZERO_TRUST" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Chính Sách Bảo Mật Zero Trust & Định Danh Đa Nhân Tố (MFA / Unique ID)
              </h3>
              <p className="text-xs text-slate-400">
                Nguyên tắc: "Never Trust, Always Verify" • Cấp phát token 15 phút • Rà soát quyền truy cập RBAC
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold">
              Zero Trust: BẮT BUỘC
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 block mb-1">MFA Biometric / FIDO2</span>
              <strong className="text-slate-900 dark:text-white text-sm">100% Kích hoạt</strong>
              <p className="text-[11px] text-slate-400 mt-1">Toàn bộ 128 cán bộ & GV</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 block mb-1">Thời hạn Access Token</span>
              <strong className="text-indigo-600 text-sm">15 phút (JWT)</strong>
              <p className="text-[11px] text-slate-400 mt-1">Tự động xoay khóa bí mật</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 block mb-1">Kiểm toán Truy vấn Nhạy cảm</span>
              <strong className="text-emerald-600 text-sm">100% Ghi Log Bất biến</strong>
              <p className="text-[11px] text-slate-400 mt-1">Mã hóa SHA-256 vào Blockchain</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
