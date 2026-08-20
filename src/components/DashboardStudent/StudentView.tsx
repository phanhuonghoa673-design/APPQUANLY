import React, { useState } from "react";
import {
  GraduationCap,
  Award,
  Compass,
  CheckCircle2,
  Sparkles,
  QrCode,
  Copy,
  Check,
  Glasses,
  Play,
  RotateCcw,
  Zap,
  ExternalLink,
} from "lucide-react";
import confetti from "canvas-confetti";
import { StudentProfile, BlockchainCredential } from "../../types";
import { INITIAL_STUDENTS } from "../../data/mockData";
import { SpiderChart } from "../SpiderChart";

export const StudentView: React.FC<{ onAskAI: (prompt: string) => void }> = ({ onAskAI }) => {
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENTS[0]); // Nguyen Minh Khang
  const [activeTab, setActiveTab] = useState<"LMS" | "BLOCKCHAIN_PASSPORT" | "AR_VR" | "SKILLS">("BLOCKCHAIN_PASSPORT");
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [selectedCred, setSelectedCred] = useState<BlockchainCredential>(student.blockchainPassports[0]);
  const [isMintingNewBadge, setIsMintingNewBadge] = useState(false);

  // STEM Lab simulation state
  const [reactantA, setReactantA] = useState(50); // Al
  const [reactantB, setReactantB] = useState(50); // Fe2O3
  const [reactionActive, setReactionActive] = useState(false);
  const [heatOutput, setHeatOutput] = useState(0);

  const handleTriggerReaction = () => {
    setReactionActive(true);
    const calculatedHeat = Math.round((reactantA * reactantB * 3.4) / 10);
    setHeatOutput(calculatedHeat);
    setTimeout(() => {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    }, 800);
  };

  const handleMintNewBadge = () => {
    setIsMintingNewBadge(true);
    setTimeout(() => {
      const newCred: BlockchainCredential = {
        id: `BC-CERT-00${student.blockchainPassports.length + 1}`,
        title: "Chứng nhận Hoàn thành Thí nghiệm STEM Thực tế ảo (VR Lab)",
        issuedDate: "19/08/2026",
        issuer: "SEME AI STEM Metaverse",
        category: "STEM & Sáng tạo",
        scoreOrGrade: "Đạt (100%)",
        txHash: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
        blockNumber: 184291,
        merkleRoot: "0xfa91028374102938471029384710293847102938",
        status: "Verified",
      };

      setStudent((prev) => ({
        ...prev,
        blockchainPassports: [newCred, ...prev.blockchainPassports],
      }));
      setSelectedCred(newCred);
      setIsMintingNewBadge(false);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }, 1200);
  };

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Student Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-indigo-700/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={student.avatar}
              alt={student.fullName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400/50 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">{student.fullName}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                  Lớp {student.className} • {student.studentCode}
                </span>
              </div>
              <p className="text-xs text-indigo-200/80 mt-1">
                Lộ trình cá nhân hóa AI • Hộ chiếu kỹ năng Blockchain • Phòng Lab AR/VR
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onAskAI("Hãy tư vấn lộ trình học tập cá nhân hóa môn Toán và STEM để chuẩn bị thi học sinh giỏi.")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Hỏi Cố Vấn Lộ Trình AI</span>
            </button>
          </div>
        </div>

        {/* Sub-nav tabs */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/10 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab("BLOCKCHAIN_PASSPORT")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "BLOCKCHAIN_PASSPORT"
                ? "bg-white text-indigo-900 shadow-sm"
                : "text-indigo-200 hover:text-white"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Hộ Chiếu Kỹ Năng Blockchain ({student.blockchainPassports.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("LMS")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "LMS"
                ? "bg-white text-indigo-900 shadow-sm"
                : "text-indigo-200 hover:text-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>LMS Cá Nhân Hóa</span>
          </button>
          <button
            onClick={() => setActiveTab("AR_VR")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "AR_VR"
                ? "bg-white text-indigo-900 shadow-sm"
                : "text-indigo-200 hover:text-white"
            }`}
          >
            <Glasses className="w-3.5 h-3.5" />
            <span>Phòng Thí Nghiệm AR/VR</span>
          </button>
          <button
            onClick={() => setActiveTab("SKILLS")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "SKILLS"
                ? "bg-white text-indigo-900 shadow-sm"
                : "text-indigo-200 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Spider Chart Năng Lực</span>
          </button>
        </div>
      </div>

      {/* TAB 1: BLOCKCHAIN SKILL PASSPORT */}
      {activeTab === "BLOCKCHAIN_PASSPORT" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Certificate List */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Chứng chỉ Bất Biến (Immutable)
              </h3>
              <button
                onClick={handleMintNewBadge}
                disabled={isMintingNewBadge}
                className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Thêm Chứng chỉ Mới</span>
              </button>
            </div>

            {student.blockchainPassports.map((cred) => (
              <div
                key={cred.id}
                onClick={() => setSelectedCred(cred)}
                className={`p-3.5 rounded-xl cursor-pointer border transition-all space-y-1.5 ${
                  selectedCred.id === cred.id
                    ? "bg-indigo-50/80 border-indigo-400 dark:bg-indigo-950/40 dark:border-indigo-700 shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800/60 border-transparent hover:border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {cred.title}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Verified ✓
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{cred.issuer}</span>
                  <span>{cred.issuedDate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Verifiable Blockchain Credential Card */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  {selectedCred.category}
                </span>
                <h3 className="font-black text-slate-900 dark:text-white text-lg mt-1">
                  {selectedCred.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đơn vị cấp: <strong>{selectedCred.issuer}</strong> • Ngày cấp: {selectedCred.issuedDate}
                </p>
              </div>

              <div className="text-right">
                <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {selectedCred.scoreOrGrade}
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold">
                  Block #{selectedCred.blockNumber}
                </span>
              </div>
            </div>

            {/* Cryptographic Proof Details */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">Mã băm giao dịch (Transaction Hash - SHA-256):</span>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-[11px] text-slate-700 dark:text-slate-300 break-all">
                  <span className="flex-1">{selectedCred.txHash}</span>
                  <button
                    onClick={() => copyHash(selectedCred.txHash)}
                    className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors shrink-0"
                    title="Sao chép Tx Hash"
                  >
                    {copiedHash === selectedCred.txHash ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Gốc cây Merkle (Merkle Root):</span>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-[11px] text-slate-500">
                  {selectedCred.merkleRoot}
                </div>
              </div>
            </div>

            {/* QR Code & Share to University Application */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-indigo-600">
                  <QrCode className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                    Mã QR Xác Thực Vĩnh Viễn
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Dùng cho hồ sơ du học, xét tuyển Đại học Quốc tế & Đơn vị tuyển dụng
                  </p>
                </div>
              </div>

              <button
                onClick={() => alert(`Đã tạo liên kết chia sẻ chứng chỉ bảo mật: https://seme.edu.vn/verify/${selectedCred.txHash.slice(0, 16)}`)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Sao Chép Link Xác Thực</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HYPER-PERSONALIZED LMS */}
      {activeTab === "LMS" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Lộ Trình Học Tập Thích Ứng (AI Hyper-personalized Learning Path)
              </h3>
              <p className="text-xs text-slate-400">
                Tự động đề xuất bài học tiếp theo dựa trên tốc độ và điểm mạnh/yếu của bạn
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 text-xs font-bold">
              Tiến độ: 84% Hoàn thành
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Đang Học • Bước 1
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Tối Ưu Hóa Hàm Số Trong Trí Tuệ Nhân Tạo (AI Math)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Khám phá thuật toán Gradient Descent và ứng dụng của đạo hàm.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => alert("Đang tải bài giảng tương tác 3D...")}
                  className="w-full py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                >
                  Tiếp Tục Bài Học
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Tiếp Theo • Bước 2
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Lập Trình Thị Giác Máy Tính với OpenCV
              </h4>
              <p className="text-xs text-slate-500">
                Xây dựng mô hình nhận diện khuôn mặt điểm danh FaceID cơ bản.
              </p>
              <div className="pt-2">
                <span className="text-[11px] text-indigo-600 font-semibold">Mở khóa sau Bước 1</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Mục Tiêu • Bước 3
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Dự Án Tốt Nghiệp STEM Cấp Thành Phố
              </h4>
              <p className="text-xs text-slate-500">
                Bảo vệ trước Hội đồng Khoa học và đúc chứng chỉ Blockchain.
              </p>
              <div className="pt-2">
                <span className="text-[11px] text-slate-400 font-semibold">Dự kiến: Tháng 11/2026</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STEM AR/VR VIRTUAL LAB */}
      {activeTab === "AR_VR" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Phòng Thí Nghiệm STEM Ảo (Interactive Virtual Chemistry Lab)
              </h3>
              <p className="text-xs text-slate-400">
                Mô phỏng Phản ứng Nhiệt nhôm (Thermite Reaction: 2Al + Fe₂O₃ → Al₂O₃ + 2Fe + Q)
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 text-xs font-bold">
              3D AR/VR Ready
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interactive sliders */}
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Nồng độ Bột Nhôm (Al):</span>
                  <span className="text-indigo-600">{reactantA} gam</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={reactantA}
                  onChange={(e) => setReactantA(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Nồng độ Sắt(III) Oxit (Fe₂O₃):</span>
                  <span className="text-purple-600">{reactantB} gam</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={reactantB}
                  onChange={(e) => setReactantB(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleTriggerReaction}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/20"
                >
                  <Play className="w-4 h-4" />
                  <span>Kích Hoạt Phản Ứng Tỏa Nhiệt</span>
                </button>
                <button
                  onClick={() => {
                    setReactionActive(false);
                    setHeatOutput(0);
                  }}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  title="Đặt lại"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Reaction Chamber Visualizer */}
            <div className="bg-slate-950 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[180px] text-center relative overflow-hidden border border-slate-800">
              {reactionActive ? (
                <div className="space-y-2 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-rose-600 mx-auto animate-ping opacity-75"></div>
                  <div className="text-amber-300 font-bold text-sm">
                    Phản ứng bùng nổ nhiệt lượng: {heatOutput} kJ!
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Sắt nóng chảy đạt 2,500°C • Phản ứng hoàn tất an toàn trong môi trường ảo SEME
                  </p>
                </div>
              ) : (
                <div className="text-slate-500 text-xs space-y-1">
                  <Glasses className="w-8 h-8 text-purple-400 mx-auto opacity-50 mb-1" />
                  <p>Buồng phản ứng mô phỏng đang ở trạng thái cân bằng.</p>
                  <p className="text-[10px]">Kéo thanh nồng độ và nhấn "Kích Hoạt" để quan sát.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SPIDER CHART NĂNG LỰC */}
      {activeTab === "SKILLS" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col items-center">
          <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
            Biểu Đồ Mạng Nhện Năng Lực Cá Nhân Của {student.fullName}
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Được cập nhật tự động qua các bài kiểm tra AI và dự án thực hành
          </p>

          <SpiderChart
            data={student.skills}
            benchmarkData={{ logic: 84, creativity: 88, collaboration: 85, autonomy: 82, communication: 86, digital: 89 }}
            size={320}
          />
        </div>
      )}
    </div>
  );
};
