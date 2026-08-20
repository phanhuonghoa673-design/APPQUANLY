import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  FileText,
  Copy,
  Check,
  RefreshCw,
  Layers,
  ShieldCheck,
  AlertTriangle,
  Download,
  Presentation,
} from "lucide-react";
import {
  exportLessonPlanToWord,
  exportExamToWord,
  exportLessonToPowerPoint,
} from "../../utils/documentExporter";

export const SubjectTeacherView: React.FC<{ onAskAI: (prompt: string) => void }> = ({ onAskAI }) => {
  const [activeTab, setActiveTab] = useState<"LESSON_PLAN" | "GRADING" | "QUESTION_BANK">("LESSON_PLAN");

  // Lesson Plan form state
  const [subject, setSubject] = useState("Toán học (Giải tích)");
  const [grade, setGrade] = useState("11");
  const [topic, setTopic] = useState("Đạo hàm và Ứng dụng trong Tối ưu hóa Thực tiễn");
  const [duration, setDuration] = useState("2 tiết (90 phút)");
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [copiedPlan, setCopiedPlan] = useState(false);

  // Grading state
  const [submissionText, setSubmissionText] = useState(
    `Để tìm điểm cực trị của hàm số doanh thu R(x) = -2x^2 + 120x, ta tính đạo hàm bậc nhất R'(x) = -4x + 120.
Cho R'(x) = 0 <=> x = 30 (sản phẩm).
Đạo hàm bậc hai R''(x) = -4 < 0 => x = 30 là điểm cực đại của hàm doanh thu.
Doanh thu tối đa đạt được là R(30) = -2(30)^2 + 120(30) = 1800 triệu VNĐ.
Em đã sử dụng mô phỏng đồ thị trên phần mềm GeoGebra để đối chiếu kết quả hình học.`
  );
  const [gradingResult, setGradingResult] = useState<{
    score: number;
    integrityScore: number;
    aiGeneratedLikelihood: number;
    feedback: string;
    rubrics: { criterion: string; score: string }[];
  } | null>({
    score: 9.5,
    integrityScore: 98,
    aiGeneratedLikelihood: 12,
    feedback: "Lời giải mạch lạc, lập luận toán học chặt chẽ. Học sinh có sự kết hợp đối chiếu mô phỏng thực tế đáng khen ngợi.",
    rubrics: [
      { criterion: "Tính đúng đắn của đạo hàm & điểm cực trị", score: "4.0 / 4.0" },
      { criterion: "Lập luận cực đại bằng đạo hàm bậc hai", score: "3.0 / 3.0" },
      { criterion: "Tính toán kết quả doanh thu tối đa", score: "1.5 / 1.5" },
      { criterion: "Mô phỏng trực quan & Liêm chính học thuật", score: "1.0 / 1.0" },
    ],
  });

  const handleGenerateLessonPlan = async () => {
    setIsGeneratingPlan(true);
    try {
      const res = await fetch("/api/ai/lesson-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          grade,
          topic,
          duration,
          competencies: "Tư duy logic, Mô hình hóa toán học, Ứng dụng công nghệ STEM",
        }),
      });
      const data = await res.json();
      setGeneratedPlan(data.plan);
    } catch (err) {
      setGeneratedPlan(
        `### KẾ HOẠCH BÀI DẠY: ${topic}\n**Môn:** ${subject} | **Khối:** ${grade} | **Thời lượng:** ${duration}\n\n#### I. MỤC TIÊU\n1. Năng lực toán học: Vận dụng đạo hàm vào bài toán tối ưu hóa chi phí sản xuất.\n2. Phẩm chất: Tính cẩn trọng, trung thực trong nghiên cứu khoa học.\n\n#### II. THIẾT BỊ SỐ & AR/VR\n- Kính thực tế ảo SEME VR Lab để tương tác đồ thị 3D không gian.\n\n#### III. TIẾN TRÌNH 4 HOẠT ĐỘNG (Công văn 5512)\n1. Khởi động: Tình huống tối ưu hóa kinh tế thực tế.\n2. Khám phá: Xây dựng thuật toán tìm cực trị.\n3. Luyện tập: Giải bài toán qua hệ thống LMS phân hóa.\n4. Vận dụng: Báo cáo số hóa vào Hộ chiếu kỹ năng Blockchain.`
      );
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
              Phân hệ Chuyên môn
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Không Gian Làm Việc Giáo Viên Bộ Môn (STEM & Toán Học)
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Trợ lý soạn bài NLP (Chuẩn Công văn 5512) • Chấm điểm AI & Liêm chính học thuật • Ngân hàng đề ma trận
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("LESSON_PLAN")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "LESSON_PLAN"
                ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trợ Lý Soạn Bài NLP</span>
          </button>
          <button
            onClick={() => setActiveTab("GRADING")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "GRADING"
                ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Chấm Điểm & Liêm Chính</span>
          </button>
          <button
            onClick={() => setActiveTab("QUESTION_BANK")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "QUESTION_BANK"
                ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Ngân Hàng Ma Trận Đề</span>
          </button>
        </div>
      </div>

      {/* TAB 1: NLP LESSON PLAN GENERATOR */}
      {activeTab === "LESSON_PLAN" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Configuration Form */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Thiết Lập Kế Hoạch Bài Dạy (CV 5512)</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-500 font-medium mb-1">Môn học:</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                >
                  <option>Toán học (Giải tích & Hình học)</option>
                  <option>Vật lý (Cơ học & Sóng âm)</option>
                  <option>Hóa học (Hóa hữu cơ & Polyme)</option>
                  <option>Tin học & Trí Tuệ Nhân Tạo (AI)</option>
                  <option>Tiếng Anh STEM & Giao tiếp Quốc tế</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Khối lớp:</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                >
                  <option value="10">Khối 10</option>
                  <option value="11">Khối 11</option>
                  <option value="12">Khối 12</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Tên bài học / Chủ đề:</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Thời lượng giảng dạy:</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                />
              </div>

              <button
                onClick={handleGenerateLessonPlan}
                disabled={isGeneratingPlan}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/20 transition-all disabled:opacity-50"
              >
                {isGeneratingPlan ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang Khởi Tạo Giáo Án Chuẩn...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Khởi Tạo Giáo Án NLP Chuẩn 5512</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Plan Output Area */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Kế Hoạch Bài Dạy Chuẩn Hóa Phẩm Chất & Năng Lực
                </h3>
                <p className="text-xs text-slate-400">
                  Tích hợp học liệu số, mô phỏng STEM AR/VR và tiêu chuẩn đánh giá Rubric
                </p>
              </div>

              {generatedPlan && (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      exportLessonPlanToWord({
                        title: topic,
                        subject,
                        grade,
                        duration,
                        teacherName: "ThS. Nguyễn Văn A",
                        objectives: {
                          knowledge: "Nắm vững bản chất đạo hàm, ứng dụng tối ưu hóa doanh thu và cực trị hàm số trong bài toán thực tế.",
                          skills: "Rèn luyện kỹ năng lập mô hình toán học, giải phương trình đạo hàm và trình bày báo cáo.",
                          attitude: "Chủ động, tích cực tham gia thảo luận nhóm và ứng dụng công nghệ trong học tập.",
                        },
                        activities: [
                          {
                            step: "Hoạt động 1: Khởi động & Đặt vấn đề",
                            content: "Đặt bài toán tối ưu hóa doanh thu bán hàng thực tế. Cho học sinh dự đoán điểm cực đại.",
                            method: "Thảo luận nhóm & Thí nghiệm mô phỏng",
                          },
                          {
                            step: "Hoạt động 2: Khám phá kiến thức mới",
                            content: "Xây dựng định lý đạo hàm bậc nhất và bậc hai trong bài toán tìm cực trị hàm số.",
                            method: "Giảng giải kết hợp hình ảnh trực quan",
                          },
                          {
                            step: "Hoạt động 3: Luyện tập & Vận dụng",
                            content: "Giải bài tập tình huống thực tế và đối chiếu mô phỏng đồ thị GeoGebra.",
                            method: "Làm việc cá nhân & Phiếu học tập số",
                          },
                        ],
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm transition-all"
                    title="Xuất file Word chuẩn 5512 Bộ Giáo Dục & Đào Tạo"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Xuất File Word (.docx)</span>
                  </button>

                  <button
                    onClick={() => {
                      exportLessonToPowerPoint({
                        title: topic,
                        subject,
                        teacherName: "ThS. Nguyễn Văn A",
                        slides: [
                          {
                            slideNumber: 1,
                            title: "Mục Tiêu Bài Học (Công văn 5512)",
                            bullets: [
                              "Nắm vững ứng dụng đạo hàm trong thực tiễn kinh tế - xã hội.",
                              "Phát triển kỹ năng mô hình hóa toán học và tư duy logic.",
                              "Tăng cường khả năng hợp tác nhóm và làm chủ công nghệ.",
                            ],
                          },
                          {
                            slideNumber: 2,
                            title: "Đặt Vấn Đề & Khám Phá Kiến Thức",
                            bullets: [
                              "Bài toán: Tối ưu hóa hàm doanh thu R(x) = -2x^2 + 120x.",
                              "Đạo hàm bậc nhất R'(x) = -4x + 120 = 0 => x = 30.",
                              "Đạo hàm bậc hai R''(x) = -4 < 0 => Đạt cực đại tại x = 30.",
                            ],
                          },
                          {
                            slideNumber: 3,
                            title: "Luyện Tập & Thí Nghiệm Trực Quan",
                            bullets: [
                              "Sử dụng GeoGebra kiểm chứng đồ thị Parabol hướng bề lõm xuống dưới.",
                              "Tính toán doanh thu tối đa R(30) = 1800 triệu VNĐ.",
                              "Nộp bài làm trực tuyến trên hệ thống Quản Lý Lớp LMS.",
                            ],
                          },
                        ],
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-sm transition-all"
                    title="Tự động tạo bộ Slide thuyết trình PowerPoint (.pptx)"
                  >
                    <Presentation className="w-3.5 h-3.5" />
                    <span>Tạo Slide PowerPoint (.pptx)</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedPlan);
                      setCopiedPlan(true);
                      setTimeout(() => setCopiedPlan(false), 2000);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    {copiedPlan ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Đã Sao Chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao Chép</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {generatedPlan ? (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[480px] overflow-y-auto">
                {generatedPlan}
              </div>
            ) : (
              <div className="p-12 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center text-xs text-slate-400 space-y-3">
                <BookOpen className="w-10 h-10 text-purple-400 mx-auto opacity-50" />
                <p>
                  Nhấn <strong>"Khởi Tạo Giáo Án NLP Chuẩn 5512"</strong> để trợ lý AI xây dựng giáo án phát triển năng lực toàn diện.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: AUTOMATED GRADING & ACADEMIC INTEGRITY */}
      {activeTab === "GRADING" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Submission Input */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Bài Làm Học Sinh (Lớp 11A1 - Nguyễn Minh Khang)
            </h3>
            <textarea
              rows={8}
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono"
            />
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Đề bài: Ứng dụng đạo hàm tìm doanh thu cực đại</span>
              <span className="text-indigo-600 font-semibold">Tự động quét AI Sentinel</span>
            </div>
          </div>

          {/* AI Sentinel Assessment Card */}
          {gradingResult && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Kết Quả Chấm Điểm & Liêm Chính Học Thuật
                  </h3>
                  <span className="text-xs text-slate-400">
                    Mô hình AI Hành vi & So khớp Bất biến
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-purple-600">
                    {gradingResult.score} / 10
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold">Grade A+ (Xuất sắc)</span>
                </div>
              </div>

              {/* Integrity Indicators */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold block">
                    Độ Liêm Chính Học Thuật
                  </span>
                  <div className="text-lg font-black text-emerald-600 mt-0.5">
                    {gradingResult.integrityScore}% (Hợp lệ)
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 font-bold block">
                    Xác suất Tạo bởi Bot AI
                  </span>
                  <div className="text-lg font-black text-blue-600 mt-0.5">
                    {gradingResult.aiGeneratedLikelihood}% (Thấp - Tự làm)
                  </div>
                </div>
              </div>

              {/* Rubric Breakdown */}
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Tiêu chí Rubric Đánh giá:
                </span>
                {gradingResult.rubrics.map((r, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-xs py-1 px-2.5 rounded-lg bg-slate-50 dark:bg-slate-800"
                  >
                    <span className="text-slate-700 dark:text-slate-300">{r.criterion}</span>
                    <strong className="text-purple-600 font-mono">{r.score}</strong>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-xs text-purple-900 dark:text-purple-200">
                <strong>Nhận xét tự động:</strong> {gradingResult.feedback}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: QUESTION MATRIX BANK */}
      {activeTab === "QUESTION_BANK" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Ngân Hàng Câu Hỏi & Ma Trận Đề Kiểm Tra Định Hướng Năng Lực
              </h3>
              <p className="text-xs text-slate-400">
                Phân hóa 4 cấp độ nhận thức: Nhận biết • Thông hiểu • Vận dụng • Vận dụng cao
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  exportExamToWord({
                    examTitle: "ĐỀ KIỂM TRA ĐỊNH KỲ GIỮA KỲ I - MÔN TOÁN 11",
                    subject: "Toán Học (Giải Tích & Hình Học)",
                    duration: "45 phút",
                    teacherName: "ThS. Nguyễn Văn A",
                    questions: [
                      {
                        id: 1,
                        question: "Tính đạo hàm của hàm số y = 3x^3 - 2x^2 + 5x - 1 tại điểm x = 1.",
                        options: ["f'(1) = 10", "f'(1) = 12", "f'(1) = 8", "f'(1) = 14"],
                        answer: "A",
                      },
                      {
                        id: 2,
                        question: "Cho hàm số y = -x^2 + 6x - 5. Giá trị cực đại của hàm số đạt được tại điểm x bằng bao nhiêu?",
                        options: ["x = 3", "x = 6", "x = 4", "x = 5"],
                        answer: "A",
                      },
                      {
                        id: 3,
                        question: "Ứng dụng trong kinh tế: Cho hàm chi phí C(x) = x^2 + 10x + 100. Chi phí biên tại mức sản xuất x = 20 là bao nhiêu?",
                        options: ["C'(20) = 50", "C'(20) = 40", "C'(20) = 30", "C'(20) = 60"],
                        answer: "A",
                      },
                      {
                        id: 4,
                        question: "Đồ thị hàm số y = x^3 - 3x có bao nhiêu điểm cực trị?",
                        options: ["2 điểm cực trị", "1 điểm cực trị", "0 điểm cực trị", "3 điểm cực trị"],
                        answer: "A",
                      },
                    ],
                  });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm transition-all"
                title="Xuất đề thi trắc nghiệm và đáp án ra file Word chuẩn BGD&ĐT"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất Đề Thi Word (.docx)</span>
              </button>

              <button
                onClick={() => onAskAI("Hãy xây dựng ma trận đề kiểm tra 1 tiết môn Toán 11 gồm 4 mức độ.")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tạo Ma Trận Đề Bằng AI</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 font-semibold uppercase">
                <tr>
                  <th className="py-2.5 px-3">Mã câu hỏi</th>
                  <th className="py-2.5 px-3">Chủ đề</th>
                  <th className="py-2.5 px-3">Mức độ nhận thức</th>
                  <th className="py-2.5 px-3">Năng lực hướng tới</th>
                  <th className="py-2.5 px-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-2.5 px-3 font-mono text-slate-500">Q-TOAN-1101</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    Đạo hàm hàm đa thức
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-medium text-[10px]">
                      Nhận biết (40%)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    Tính toán đại số cơ bản
                  </td>
                  <td className="py-2.5 px-3 text-emerald-600 font-semibold">Đã duyệt</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-2.5 px-3 font-mono text-slate-500">Q-TOAN-1102</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    Bài toán Tối ưu hóa Thể tích Hộp
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-medium text-[10px]">
                      Vận dụng cao (20%)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    Mô hình hóa hình học STEM
                  </td>
                  <td className="py-2.5 px-3 text-emerald-600 font-semibold">Đã duyệt</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
