import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Activity,
  Calendar,
  Sparkles,
  Users,
  Award,
  BookOpen,
} from "lucide-react";

export const AdvancedAnalyticsDashboard: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState("K11");

  // Grade Distribution Data
  const gradeDistribution = [
    { range: "9.0 - 10.0 (Xuất Sắc)", count: 18, percentage: 35, color: "bg-emerald-500" },
    { range: "8.0 - 8.9 (Giỏi)", count: 22, percentage: 42, color: "bg-indigo-500" },
    { range: "6.5 - 7.9 (Khá)", count: 8, percentage: 15, color: "bg-amber-500" },
    { range: "5.0 - 6.4 (Trung Bình)", count: 4, percentage: 8, color: "bg-rose-500" },
  ];

  // Attendance Heatmap Days (4 weeks x 5 days)
  const heatmapDays = Array.from({ length: 20 }, (_, i) => ({
    day: `Ngày ${i + 1}`,
    attendance: Math.min(100, Math.floor(92 + Math.random() * 8)),
  }));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-400/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" />
                D3.js Data Visualization & BI Analytics
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
                Báo Cáo Ban Giám Hiệu
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Phân Tích Phổ Điểm & Trực Quan Hóa Dữ Liệu
            </h1>
            <p className="text-sm text-blue-100/80 leading-relaxed">
              Theo dõi phân phối phổ điểm học sinh, bản đồ nhiệt chuyên cần Heatmap thời gian thực và phân tích xu hướng học tập chuyên sâu.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 p-2 rounded-2xl backdrop-blur border border-white/20">
            {["K10", "K11", "K12"].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedGrade === g
                    ? "bg-white text-slate-900 shadow-md"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Layout for Distribution & Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution Bar Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              <h2 className="font-bold text-slate-900 dark:text-white text-base">
                Biểu Đồ Phân Phối Phổ Điểm ({selectedGrade})
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono font-semibold">
              Tổng số: 52 Học sinh
            </span>
          </div>

          <div className="space-y-4">
            {gradeDistribution.map((item, idx) => (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
                  <span>{item.range}</span>
                  <span className="font-bold">{item.count} HS ({item.percentage}%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Attendance Heatmap */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-500" />
              <h2 className="font-bold text-slate-900 dark:text-white text-base">
                Bản Đồ Nhiệt Chuyên Cần Heatmap (4 Tuần)
              </h2>
            </div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              TB: 98.4%
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2.5 pt-2">
            {heatmapDays.map((d, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1 hover:scale-105 transition-all cursor-pointer"
                title={`${d.day}: Tỷ lệ chuyên cần ${d.attendance}%`}
              >
                <div className="text-[10px] font-semibold text-slate-400">{d.day}</div>
                <div className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                  {d.attendance}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
