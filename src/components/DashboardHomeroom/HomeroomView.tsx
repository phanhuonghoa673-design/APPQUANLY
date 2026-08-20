import React, { useState } from "react";
import {
  UserCheck,
  Smile,
  AlertTriangle,
  Send,
  Sparkles,
  Phone,
  Calendar,
  CheckCircle2,
  XCircle,
  Eye,
  Heart,
  Radar,
  RefreshCw,
  Search,
} from "lucide-react";
import { StudentProfile } from "../../types";
import { INITIAL_STUDENTS } from "../../data/mockData";
import { SpiderChart } from "../SpiderChart";

export const HomeroomView: React.FC<{ onAskAI: (prompt: string) => void }> = ({ onAskAI }) => {
  const [students, setStudents] = useState<StudentProfile[]>(INITIAL_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile>(INITIAL_STUDENTS[0]);
  const [activeSubTab, setActiveSubTab] = useState<"ATTENDANCE" | "SENTIMENT" | "SPIDER" | "CONTACT">("ATTENDANCE");
  const [isAnalyzingSentiment, setIsAnalyzingSentiment] = useState(false);
  const [aiSentimentResult, setAiSentimentResult] = useState<string | null>(null);
  const [attendanceFilter, setAttendanceFilter] = useState<"ALL" | "PRESENT" | "ABSENT">("ALL");

  // Class benchmark averages
  const classBenchmark = {
    logic: 84,
    creativity: 88,
    collaboration: 85,
    autonomy: 82,
    communication: 86,
    digital: 89,
  };

  const handleAnalyzeSentiment = async (student: StudentProfile) => {
    setIsAnalyzingSentiment(true);
    setAiSentimentResult(null);

    try {
      const res = await fetch("/api/ai/sentiment-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: `${student.fullName} (${student.className})`,
          notes: student.sentimentNotes,
          attendanceHistory: `Tỷ lệ chuyên cần: ${student.attendanceRate}%, vắng mặt: ${
            student.attendanceRate < 95 ? "2 buổi" : "0 buổi"
          }`,
          academicTrend: `GPA hiện tại: ${student.gpa}/10, Hạnh kiểm: ${student.conduct}`,
        }),
      });
      const data = await res.json();
      setAiSentimentResult(data.analysis);
    } catch (err) {
      setAiSentimentResult(
        `### ĐÁNH GIÁ TÂM LÝ SƯ PHẠM (Offline Mode)\n* **Học sinh:** ${student.fullName}\n* **Nhận định:** Cần tiếp tục duy trì sự lắng nghe và phân công nhiệm vụ phù hợp để kích thích sự sáng tạo.`
      );
    } finally {
      setIsAnalyzingSentiment(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
              Phân hệ Sư phạm & Lớp học
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Quản Lý Lớp Chủ Nhiệm 11A1 (42 Học sinh)
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Điểm danh FaceID thời gian thực • Phân tích tâm lý học sinh • Gamification Spider Chart • Sổ liên lạc số
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab("ATTENDANCE")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === "ATTENDANCE"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Điểm danh FaceID</span>
          </button>
          <button
            onClick={() => setActiveSubTab("SENTIMENT")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === "SENTIMENT"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Smile className="w-3.5 h-3.5" />
            <span>Tâm Lý & Dự Báo Rủi Ro</span>
          </button>
          <button
            onClick={() => setActiveSubTab("SPIDER")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === "SPIDER"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Radar className="w-3.5 h-3.5" />
            <span>Spider Chart Năng Lực</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: REAL-TIME FACEID ATTENDANCE */}
      {activeSubTab === "ATTENDANCE" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Roster Table */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Danh Sách Điểm Danh FaceID Ngày 19/08/2026
                </h3>
                <p className="text-xs text-slate-400">
                  Camera AI cổng trường & cửa lớp tự động nhận diện và gửi tin nhắn tức thời
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                Có mặt: 41 / 42 (97.6%)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 font-semibold uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Mã định danh</th>
                    <th className="py-2.5 px-3">Học sinh</th>
                    <th className="py-2.5 px-3">Giờ FaceID</th>
                    <th className="py-2.5 px-3">Trạng thái</th>
                    <th className="py-2.5 px-3">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {students.map((st) => (
                    <tr
                      key={st.id}
                      onClick={() => setSelectedStudent(st)}
                      className={`cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                        selectedStudent.id === st.id
                          ? "bg-indigo-50/70 dark:bg-indigo-950/30"
                          : ""
                      }`}
                    >
                      <td className="py-2.5 px-3 font-mono text-slate-500">{st.studentCode}</td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={st.avatar}
                            alt={st.fullName}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {st.fullName}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">
                        {st.id === "HS-03" ? "--:--" : "07:14:22"}
                      </td>
                      <td className="py-2.5 px-3">
                        {st.id === "HS-03" ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                            Vắng có phép
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            ✓ Đúng giờ
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStudent(st);
                            setActiveSubTab("SENTIMENT");
                          }}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-indigo-900 text-slate-700 dark:text-slate-300 text-[11px] font-medium transition-colors"
                        >
                          Hồ sơ & Tâm lý
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Notice to Parents */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Send className="w-4 h-4 text-indigo-600" />
              <span>Gửi Thông Báo Tức Thời Đến Phụ Huynh</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-500 dark:text-slate-400 block mb-1 font-medium">
                  Học sinh được chọn:
                </label>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                  {selectedStudent.fullName} (Phụ huynh: {selectedStudent.parentName} - {selectedStudent.parentPhone})
                </div>
              </div>

              <div>
                <label className="text-slate-500 dark:text-slate-400 block mb-1 font-medium">
                  Mẫu thông báo thông minh:
                </label>
                <textarea
                  rows={3}
                  defaultValue={`Kính gửi phụ huynh ${selectedStudent.parentName}, em ${selectedStudent.fullName} đã hoàn thành tiết học sáng nay an toàn và tích cực phát biểu trong giờ học STEM.`}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                />
              </div>

              <button
                onClick={() => alert(`Đã gửi thông báo số hóa đến phụ huynh ${selectedStudent.parentName} qua Zalo & SEME Parent App!`)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi Đi Qua Cổng Zero Trust</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: STUDENT PSYCHOLOGY & SENTIMENT ANALYSIS */}
      {activeSubTab === "SENTIMENT" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Selector List */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Chọn Học Sinh Để Phân Tích
            </h3>
            {students.map((st) => (
              <div
                key={st.id}
                onClick={() => {
                  setSelectedStudent(st);
                  setAiSentimentResult(null);
                }}
                className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                  selectedStudent.id === st.id
                    ? "bg-emerald-50/70 border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-700"
                    : "bg-slate-50 dark:bg-slate-800/60 border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={st.avatar}
                    alt={st.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                      {st.fullName}
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      GPA: {st.gpa} • {st.conduct}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    st.sentimentRisk === "Cao"
                      ? "bg-rose-100 text-rose-700"
                      : st.sentimentRisk === "Trung bình"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {st.sentimentRisk} Rủi ro
                </span>
              </div>
            ))}
          </div>

          {/* AI Sentiment Detail Card */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Hồ Sơ Tâm Lý & Dự Báo Cảm Xúc (Sentiment Analysis AI)
                </h3>
                <p className="text-xs text-slate-400">
                  Đang xem: <strong>{selectedStudent.fullName}</strong> ({selectedStudent.studentCode})
                </p>
              </div>

              <button
                onClick={() => handleAnalyzeSentiment(selectedStudent)}
                disabled={isAnalyzingSentiment}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
              >
                {isAnalyzingSentiment ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang Phân Tích...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Chạy Phân Tích Tâm Lý AI</span>
                  </>
                )}
              </button>
            </div>

            {/* Current Behavior Observation */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">
                Ghi chú hành vi của GVCN / GV Bộ môn:
              </span>
              <p className="text-slate-800 dark:text-slate-200 italic">
                "{selectedStudent.sentimentNotes}"
              </p>
            </div>

            {/* AI Result Area */}
            {aiSentimentResult ? (
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                {aiSentimentResult}
              </div>
            ) : (
              <div className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center text-xs text-slate-400 space-y-2">
                <Smile className="w-8 h-8 text-emerald-500 mx-auto opacity-60" />
                <p>Nhấn <strong>"Chạy Phân Tích Tâm Lý AI"</strong> để kích hoạt mô hình NLP lượng giá trạng thái cảm xúc của học sinh.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: SPIDER CHART NĂNG LỰC */}
      {activeSubTab === "SPIDER" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Học sinh đang xem
              </h3>
              {students.map((st) => (
                <div
                  key={st.id}
                  onClick={() => setSelectedStudent(st)}
                  className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                    selectedStudent.id === st.id
                      ? "bg-indigo-50/70 border-indigo-300 dark:bg-indigo-950/40 dark:border-indigo-700"
                      : "bg-slate-50 dark:bg-slate-800/60 border-transparent hover:border-slate-200"
                  }`}
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                    {st.fullName}
                  </span>
                  <span className="text-[11px] font-bold text-indigo-600">
                    GPA {st.gpa}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col items-center">
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
              Biểu Đồ Mạng Nhện Đánh Giá Năng Lực Toàn Diện
            </h3>
            <p className="text-xs text-slate-400 mb-4 text-center">
              So sánh 6 trục năng lực của <strong>{selectedStudent.fullName}</strong> so với Trung bình Khối 11
            </p>

            <SpiderChart
              data={selectedStudent.skills}
              benchmarkData={classBenchmark}
              size={320}
              title={`Hồ sơ Năng lực: ${selectedStudent.fullName}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};
