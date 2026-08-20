import React, { useState } from "react";
import {
  TrendingUp,
  Calendar,
  Building,
  ShieldCheck,
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Check,
  RefreshCw,
  Cpu,
  BarChart3,
  Search,
} from "lucide-react";
import { TimetableSlot, FacilityAsset, AuditLogEntry } from "../../types";
import { INITIAL_TIMETABLE, INITIAL_ASSETS, INITIAL_AUDIT_LOGS } from "../../data/mockData";

export const BoardView: React.FC<{ onAskAI: (prompt: string) => void }> = ({ onAskAI }) => {
  const [activeTab, setActiveTab] = useState<"BI" | "TIMETABLE" | "ASSETS" | "AUDIT">("BI");
  const [timetable, setTimetable] = useState<TimetableSlot[]>(INITIAL_TIMETABLE);
  const [assets, setAssets] = useState<FacilityAsset[]>(INITIAL_ASSETS);
  const [auditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [isSolvingTimetable, setIsSolvingTimetable] = useState(false);
  const [timetableSolved, setTimetableSolved] = useState(false);

  const conflicts = timetable.filter((t) => t.hasConflict);

  const handleAutoSolveTimetable = () => {
    setIsSolvingTimetable(true);
    setTimeout(() => {
      setTimetable((prev) =>
        prev.map((slot) => {
          if (slot.id === "TT-04") {
            return {
              ...slot,
              room: "Lab STEM 02 (Tầng 2)",
              hasConflict: false,
              conflictReason: undefined,
            };
          }
          return slot;
        })
      );
      setIsSolvingTimetable(false);
      setTimetableSolved(true);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-Navigation */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              Phân hệ Cấp cao
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Bàn Làm Việc Ban Giám Hiệu (School Board & Executive BI)
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Điều hành chiến lược • Tối ưu nguồn lực • Kiểm toán nội bộ • Thuật toán lập thời khóa biểu
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("BI")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "BI"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Dashboard BI</span>
          </button>
          <button
            onClick={() => setActiveTab("TIMETABLE")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "TIMETABLE"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>TKB Thông Minh</span>
            {conflicts.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                {conflicts.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("ASSETS")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "ASSETS"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Tối ưu Tài sản</span>
          </button>
          <button
            onClick={() => setActiveTab("AUDIT")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "AUDIT"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Kiểm toán Nội bộ</span>
          </button>
        </div>
      </div>

      {/* TAB 1: EXECUTIVE BI DASHBOARD */}
      {activeTab === "BI" && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
                <span>Tổng số Học sinh</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-0.5 text-[11px]">
                  +4.2% YoY
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">2,450</div>
              <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
                <span>Tỷ lệ chuyên cần FaceID:</span>
                <strong className="text-slate-700 dark:text-slate-200">98.4%</strong>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
                <span>Đội ngũ Cán bộ / GV</span>
                <span className="text-blue-600 font-semibold text-[11px]">100% Đạt chuẩn</span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">128</div>
              <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
                <span>Định mức giờ giảng STEM:</span>
                <strong className="text-slate-700 dark:text-slate-200">94.8%</strong>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
                <span>Hiệu suất Khai thác Phòng Lab</span>
                <span className="text-indigo-600 font-semibold text-[11px]">Tối ưu hóa AI</span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">88.5%</div>
              <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
                <span>Tiết kiệm điện thông minh:</span>
                <strong className="text-emerald-600">-18.2 kWh</strong>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
                <span>Minh bạch Thu chi Học phí</span>
                <span className="text-emerald-600 font-semibold text-[11px]">Audit 100%</span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">99.2%</div>
              <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
                <span>Thu qua Ví E-Wallet:</span>
                <strong className="text-slate-700 dark:text-slate-200">2,428 / 2,450</strong>
              </div>
            </div>
          </div>

          {/* AI Strategy Alert & Predictive Risk Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Phân tích Dự báo & Xu hướng Giảng dạy (ML Predictive Engine)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Phát hiện sớm rủi ro học tập và biến động phân bổ nhân sự tuần tới
                  </p>
                </div>
                <button
                  onClick={() =>
                    onAskAI(
                      "Hãy phân tích chi tiết dữ liệu dự báo rủi ro học sinh vắng tiết và đề xuất giải pháp tối ưu cho BGH."
                    )
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-semibold transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Hỏi Cố Vấn Chiến Lược</span>
                </button>
              </div>

              {/* Synthetic Visual Chart Bars */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-700 dark:text-slate-300">
                      Năng lực Toán & Khoa học Tự nhiên (STEM)
                    </span>
                    <span className="font-bold text-indigo-600">89.4% (Mục tiêu: 90%)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full w-[89.4%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-700 dark:text-slate-300">
                      Tỷ lệ hoàn thành chứng chỉ Blockchain Skill Passport
                    </span>
                    <span className="font-bold text-purple-600">76.2% (Đang tăng)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full rounded-full w-[76.2%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-700 dark:text-slate-300">
                      Chỉ số Cân bằng Tải Giáo viên (Workload Balance)
                    </span>
                    <span className="font-bold text-emerald-600">93.1% (Tối ưu)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full w-[93.1%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-700 dark:text-slate-300">
                      Cảnh báo Học sinh có nguy cơ sụt giảm động lực (Sentiment AI)
                    </span>
                    <span className="font-bold text-amber-600">3.4% (83 học sinh)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full w-[3.4%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Strategic Actions */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Quyết Định Chiến Lược Nhanh</span>
                </div>
                <h4 className="font-bold text-base text-white mb-2">
                  Chu kỳ Lập Kế hoạch Tuần 3 - Học kỳ I
                </h4>
                <p className="text-xs text-indigo-200/80 leading-relaxed mb-4">
                  Hệ thống đề xuất mở thêm 02 ca thực hành tại Lab STEM 02 để giảm tải cho Lab 01 và phê duyệt danh sách học bổng Blockchain.
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("TIMETABLE")}
                  className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Mở Trình Xử Lý Thời Khóa Biểu</span>
                </button>
                <button
                  onClick={() => setActiveTab("AUDIT")}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Xem Sổ Cái Kiểm Toán Số</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SMART TIMETABLE OPTIMIZER */}
      {activeTab === "TIMETABLE" && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Bộ Lập Thời Khóa Biểu Tự Động & Giải Quyết Ràng Buộc Logic
              </h3>
              <p className="text-xs text-slate-400">
                Tuân thủ ràng buộc: Tối đa 4 tiết liên tiếp / Không xung đột phòng thực hành / Phân bổ giáo viên cân đối
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAutoSolveTimetable}
                disabled={isSolvingTimetable || conflicts.length === 0}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  conflicts.length === 0
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 cursor-default"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30"
                }`}
              >
                {isSolvingTimetable ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang chạy thuật toán tối ưu hóa ràng buộc...</span>
                  </>
                ) : conflicts.length === 0 ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Thời khóa biểu hoàn hảo (0 xung đột)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Kích hoạt AI Tối ưu Hóa & Xử lý {conflicts.length} Xung Đột</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {conflicts.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <strong className="font-bold text-rose-800 dark:text-rose-300">
                  Phát hiện 01 xung đột tài nguyên vật lý:
                </strong>
                <p className="text-rose-700 dark:text-rose-400 mt-0.5">
                  Lớp 11A2 đăng ký Hóa học phân tích tại Lab STEM 01 vào Tiết 4 Thứ Hai, trùng với phiên thực hành kéo dài của Lớp 11A1.
                </p>
              </div>
            </div>
          )}

          {timetableSolved && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <strong className="font-bold text-emerald-800 dark:text-emerald-300">
                  Thuật toán đã điều chuyển tự động thành công!
                </strong>
                <p className="text-emerald-700 dark:text-emerald-400 mt-0.5">
                  Tiết 4 Hóa học 11A2 được chuyển sang <strong>Lab STEM 02 (Tầng 2)</strong> với đầy đủ thiết bị tương đương. Không ảnh hưởng giáo viên.
                </p>
              </div>
            </div>
          )}

          {/* Timetable Grid View */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-semibold uppercase">
                <tr>
                  <th className="py-3 px-4">Thứ / Tiết</th>
                  <th className="py-3 px-4">Lớp</th>
                  <th className="py-3 px-4">Môn Học</th>
                  <th className="py-3 px-4">Giáo Viên Giảng Dạy</th>
                  <th className="py-3 px-4">Phòng / Không Gian Học Tập</th>
                  <th className="py-3 px-4">Trạng Thái Logic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {timetable.map((slot) => (
                  <tr
                    key={slot.id}
                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors ${
                      slot.hasConflict
                        ? "bg-rose-50/60 dark:bg-rose-950/20"
                        : ""
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {slot.day} - Tiết {slot.period}
                    </td>
                    <td className="py-3 px-4 font-bold text-indigo-600 dark:text-indigo-400">
                      {slot.className}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                      {slot.subject}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      {slot.teacher}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          slot.hasConflict
                            ? "bg-rose-200 text-rose-900 font-bold"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {slot.room}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {slot.hasConflict ? (
                        <span className="inline-flex items-center gap-1 text-rose-600 font-bold text-[11px]">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Xung đột tài nguyên</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Hợp lệ</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ASSET & LAB OPTIMIZATION */}
      {activeTab === "ASSETS" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300">
                      {asset.category}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mt-1">
                      {asset.name}
                    </h4>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      asset.status === "Đang sử dụng"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {asset.status}
                  </span>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl">
                  <strong>Đang phục vụ:</strong> {asset.currentBooking || "Sẵn sàng nhận lịch mới"}
                </div>

                {/* IoT Smart Sensors telemetry */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">Nhiệt độ IoT</span>
                    <strong className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {asset.smartSensors.temperature}°C
                    </strong>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">Tiêu thụ điện</span>
                    <strong className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {asset.smartSensors.powerConsumptionKwh} kWh
                    </strong>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">Chất lượng KK</span>
                    <strong className="text-xs font-bold text-emerald-600">
                      AQI {asset.smartSensors.airQualityAqi} (Tốt)
                    </strong>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Tỷ lệ lấp đầy tuần:</span>
                    <strong className="text-slate-700 dark:text-slate-200">
                      {asset.utilizationRate}%
                    </strong>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${asset.utilizationRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INTERNAL AUDIT LEDGER */}
      {activeTab === "AUDIT" && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Nhật Ký Kiểm Toán Nội Bộ & Bảo Toàn Dữ Liệu Bất Biến (Immutable Audit Trail)
              </h3>
              <p className="text-xs text-slate-400">
                Toàn bộ hành động quản trị được đóng dấu thời gian, gắn Unique ID và mã băm SHA-256
              </p>
            </div>
            <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-mono text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              SHA-256 Validated • 0 Tampering
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-semibold uppercase">
                <tr>
                  <th className="py-3 px-4">Thời gian</th>
                  <th className="py-3 px-4">Người thực hiện</th>
                  <th className="py-3 px-4">Vai trò / Unique ID</th>
                  <th className="py-3 px-4">Tác vụ thực thi</th>
                  <th className="py-3 px-4">Mã Băm SHA-256</th>
                  <th className="py-3 px-4">MFA</th>
                  <th className="py-3 px-4">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                    <td className="py-3 px-4 font-sans font-semibold text-slate-800 dark:text-slate-200">
                      {log.actor}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-mono">
                        {log.uniqueId}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-700 dark:text-slate-300">
                      {log.action}
                    </td>
                    <td className="py-3 px-4 text-[10px] text-slate-400 max-w-[140px] truncate" title={log.sha256Hash}>
                      {log.sha256Hash.slice(0, 16)}...
                    </td>
                    <td className="py-3 px-4">
                      {log.mfaVerified ? (
                        <span className="text-emerald-600 font-bold text-[11px]">✓ MFA</span>
                      ) : (
                        <span className="text-rose-600 font-bold text-[11px]">✗ No MFA</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          log.status === "Success"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
