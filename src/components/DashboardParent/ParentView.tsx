import React, { useState } from "react";
import {
  Heart,
  Bus,
  Utensils,
  CreditCard,
  MessageSquare,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  ShieldCheck,
  Download,
  Send,
  AlertCircle,
} from "lucide-react";
import { StudentProfile } from "../../types";
import { INITIAL_STUDENTS } from "../../data/mockData";

export const ParentView: React.FC<{ onAskAI: (prompt: string) => void }> = ({ onAskAI }) => {
  const [student] = useState<StudentProfile>(INITIAL_STUDENTS[0]); // Nguyen Minh Khang
  const [activeTab, setActiveTab] = useState<"BUS_GATE" | "CANTEEN" | "FINANCE" | "COMMUNICATION">("BUS_GATE");
  const [tuitionPaid, setTuitionPaid] = useState(false);
  const [parentMessage, setParentMessage] = useState("");
  const [sentMessages, setSentMessages] = useState<string[]>([]);

  const handlePayTuition = () => {
    setTuitionPaid(true);
  };

  const handleSendMessage = () => {
    if (!parentMessage.trim()) return;
    setSentMessages((prev) => [...prev, parentMessage]);
    setParentMessage("");
  };

  return (
    <div className="space-y-6">
      {/* Parent Welcome Header */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-teal-700/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/30 text-teal-300 border border-teal-400/30 uppercase tracking-wider">
              Cổng Thông Tin Phụ Huynh (SEME Parent Portal)
            </span>
            <h2 className="text-xl font-black text-white mt-1">
              Kính chào Phụ huynh {student.parentName}
            </h2>
            <p className="text-xs text-teal-200/80 mt-0.5">
              Đồng hành cùng con <strong>{student.fullName}</strong> (Lớp {student.className}) • Năm học 2026 - 2027
            </p>
          </div>

          <button
            onClick={() => onAskAI(`Hãy tổng hợp tình hình học tập và đưa ra lời khuyên dành cho phụ huynh em ${student.fullName}.`)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Hỏi Cố Vấn Sư Phạm Gia Đình AI</span>
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/10 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab("BUS_GATE")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "BUS_GATE"
                ? "bg-white text-emerald-950 shadow-sm"
                : "text-teal-200 hover:text-white"
            }`}
          >
            <Bus className="w-3.5 h-3.5" />
            <span>Đưa Đón & Cổng Trường</span>
          </button>
          <button
            onClick={() => setActiveTab("CANTEEN")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "CANTEEN"
                ? "bg-white text-emerald-950 shadow-sm"
                : "text-teal-200 hover:text-white"
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Bán Trú & Dinh Dưỡng</span>
          </button>
          <button
            onClick={() => setActiveTab("FINANCE")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "FINANCE"
                ? "bg-white text-emerald-950 shadow-sm"
                : "text-teal-200 hover:text-white"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Học Phí Minh Bạch</span>
          </button>
          <button
            onClick={() => setActiveTab("COMMUNICATION")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "COMMUNICATION"
                ? "bg-white text-emerald-950 shadow-sm"
                : "text-teal-200 hover:text-white"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Trao Đổi Với GVCN</span>
          </button>
        </div>
      </div>

      {/* TAB 1: BUS & GATE TELEMETRY */}
      {activeTab === "BUS_GATE" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Smart Bus GPS Tracker Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Bus className="w-4 h-4 text-emerald-600" />
                <span>Xe Đưa Đón Thông Minh SEME Bus #09</span>
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Đang vận hành an toàn
              </span>
            </div>

            {/* Synthetic Map Preview */}
            <div className="h-44 bg-slate-950 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500 animate-bounce" />
                  <span className="font-bold">Vị trí hiện tại: Đường Nguyễn Văn Huyên</span>
                </div>
                <span className="font-mono text-emerald-400">Tốc độ: 32 km/h</span>
              </div>

              <div className="p-3 bg-white/10 backdrop-blur rounded-lg text-xs text-white">
                <strong>Điểm trả dự kiến:</strong> 17:15 tại Tòa R2 Vincom Royal City (Còn ~12 phút)
              </div>
            </div>

            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>Tài xế: Bác Trần Văn Tuấn (0912.888.777)</span>
              <span className="text-emerald-600 font-semibold">✓ Đã thắt dây an toàn</span>
            </div>
          </div>

          {/* Gate FaceID Check-in Log */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Nhật Ký Check-in FaceID Tại Cổng Trường Hôm Nay</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    IN
                  </div>
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200 block">Vào Cổng Chính (Làn AI 02)</strong>
                    <span className="text-slate-400 text-[11px]">Đúng giờ • Thân nhiệt: 36.5°C</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">07:14:22</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    LAB
                  </div>
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200 block">Vào Phòng STEM Lab 01</strong>
                    <span className="text-slate-400 text-[11px]">Tiết 3 Vật Lý Ứng Dụng</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">09:30:05</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SMART CANTEEN & NUTRITION */}
      {activeTab === "CANTEEN" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Thực Đơn Bán Trú & Kiểm Soát Dị Ứng Thông Minh
              </h3>
              <p className="text-xs text-slate-400">
                Lượng calo và thành phần dinh dưỡng được chuyên gia y tế học đường kiểm duyệt
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold">
              820 kcal / Bữa trưa (Chuẩn)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1.5 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Món chính</span>
              <strong className="text-slate-800 dark:text-slate-200 block text-sm">
                Cá Hồi Áp Chảo Sốt Cam & Bò Xào Nấm
              </strong>
              <p className="text-slate-500">Giàu Omega-3 và Protein cho não bộ</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1.5 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Rau củ & Canh</span>
              <strong className="text-slate-800 dark:text-slate-200 block text-sm">
                Salad Dầu Giấm & Canh Rong Biển Hạt Sen
              </strong>
              <p className="text-slate-500">Bổ sung chất xơ và khoáng chất thiết yếu</p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1.5 text-xs">
              <span className="text-emerald-700 dark:text-emerald-300 block text-[10px] uppercase font-bold">
                Cảnh báo Dị ứng (Allergen Filter)
              </span>
              <strong className="text-slate-900 dark:text-white block text-sm">
                0 Thành phần Đậu phộng / Hải sản có vỏ
              </strong>
              <p className="text-emerald-600 dark:text-emerald-400">
                Phù hợp 100% với hồ sơ sức khỏe của học sinh
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FINANCIAL TRANSPARENCY & TUITION PAYMENT */}
      {activeTab === "FINANCE" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Minh Bạch Tài Chính & Học Phí Tháng 09/2026
              </h3>
              <p className="text-xs text-slate-400">
                Toàn bộ thu chi được đối soát qua ví điện tử và lưu trữ nhật ký kiểm toán số
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                tuitionPaid
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                  : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
              }`}
            >
              {tuitionPaid ? "Đã thanh toán (Audit Verified ✓)" : "Chờ phụ huynh thanh toán"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Breakdown table */}
            <div className="lg:col-span-2 space-y-2 text-xs">
              <div className="flex justify-between py-2 px-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                <span className="text-slate-700 dark:text-slate-300">Học phí chương trình STEM & AI Quốc tế</span>
                <strong className="font-mono text-slate-900 dark:text-white">4,500,000 đ</strong>
              </div>
              <div className="flex justify-between py-2 px-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                <span className="text-slate-700 dark:text-slate-300">Tiền ăn bán trú dinh dưỡng (22 bữa)</span>
                <strong className="font-mono text-slate-900 dark:text-white">1,320,000 đ</strong>
              </div>
              <div className="flex justify-between py-2 px-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                <span className="text-slate-700 dark:text-slate-300">Phí xe buýt thông minh đưa đón tận nơi</span>
                <strong className="font-mono text-slate-900 dark:text-white">1,200,000 đ</strong>
              </div>
              <div className="flex justify-between py-2 px-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-emerald-800 dark:text-emerald-300">
                <span>Học bổng Tài năng STEM Khối 11 (Giảm trừ)</span>
                <strong className="font-mono">- 1,000,000 đ</strong>
              </div>

              <div className="flex justify-between py-3 px-4 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-sm text-slate-900 dark:text-white mt-3">
                <span>TỔNG CỘNG CẦN THANH TOÁN:</span>
                <span className="text-emerald-600 font-mono text-base">6,020,000 đ</span>
              </div>
            </div>

            {/* Action card */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-2">
                  Cổng Thanh Toán Một Chạm
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Hỗ trợ VietQR, MoMo, ZaloPay, Thẻ ATM/Visa. Tự động xuất hóa đơn điện tử VAT chuẩn CQT.
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handlePayTuition}
                  disabled={tuitionPaid}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>{tuitionPaid ? "Đã Hoàn Tất Thanh Toán" : "Thanh Toán Ngay 6,020,000 đ"}</span>
                </button>

                <button
                  onClick={() => alert("Đang tải hóa đơn điện tử e-Invoice PDF có ký số cơ quan thuế...")}
                  className="w-full py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải Hóa Đơn Điện Tử VAT</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COMMUNICATION WITH HOMEROOM TEACHER */}
      {activeTab === "COMMUNICATION" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Kênh Trao Đổi Trực Tiếp Với Giáo Viên Chủ Nhiệm Lớp 11A1
              </h3>
              <p className="text-xs text-slate-400">
                Cô Nguyễn Thị Mai • Thạc sĩ Sư phạm Toán • Hotline: 0988.123.456
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 block">Tin nhắn từ Cô Mai (Hôm qua 16:30):</strong>
              <p className="text-slate-600 dark:text-slate-400">
                "Chào anh chị, em Khang tuần này rất năng nổ tham gia vào dự án STEM thực tế ảo. Gia đình tiếp tục động viên em nhé!"
              </p>
            </div>

            {sentMessages.map((msg, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-xs text-emerald-900 dark:text-emerald-200 ml-8 border border-emerald-200 dark:border-emerald-800">
                <strong className="block text-[11px] text-emerald-700 dark:text-emerald-400 mb-0.5">Phụ huynh gửi:</strong>
                <p>{msg}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={parentMessage}
              onChange={(e) => setParentMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Nhập lời nhắn gửi đến Giáo viên chủ nhiệm..."
              className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
