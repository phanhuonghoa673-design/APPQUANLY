import React, { useState, useEffect } from "react";
import {
  Key,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  X,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import {
  getStoredApiKey,
  setStoredApiKey,
  getStoredModel,
  setStoredModel,
  MODEL_FALLBACK_LIST,
} from "../../services/geminiService";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-3-flash-preview");
  const [showKey, setShowKey] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getStoredApiKey());
      setSelectedModel(getStoredModel());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredApiKey(apiKey);
    setStoredModel(selectedModel);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1000);
  };

  const MODEL_CARDS = [
    {
      id: "gemini-3-flash-preview",
      name: "Gemini 3 Flash",
      badge: "Mặc định (Default)",
      desc: "Tốc độ phản hồi cực nhanh, tối ưu cho xử lý dữ liệu và cố vấn giáo dục hàng ngày.",
      color: "border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    },
    {
      id: "gemini-3-pro-preview",
      name: "Gemini 3 Pro",
      badge: "Tối Ưu Phân Tích",
      desc: "Mô hình lập luận chuyên sâu cho ma trận đề thi và kế hoạch bài dạy phức tạp.",
      color: "border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      id: "gemini-2.5-flash",
      name: "Gemini 2.5 Flash",
      badge: "Dự Phòng (Backup)",
      desc: "Mô hình dự phòng ổn định khi hệ thống gặp lỗi quá tải Quota API.",
      color: "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Thiết Lập Model AI &amp; API Key
              </h3>
              <p className="text-xs text-slate-500">
                Nhập Gemini API Key cá nhân để mở khóa toàn bộ tính năng AI Advisor.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Link to Google AI Studio */}
        <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-500/30 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span className="font-bold text-rose-700 dark:text-rose-300">
              Chưa có Gemini API Key?
            </span>
          </div>
          <a
            href="https://aistudio.google.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-md transition-all whitespace-nowrap"
          >
            <span>Lấy API key miễn phí</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <form onSubmit={handleSave} className="space-y-5 text-xs">
          {/* Model Selection Cards */}
          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-2">
              Chọn Model AI Mặc Định &amp; Chuỗi Dự Phòng (Fallback Chain):
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {MODEL_CARDS.map((card) => {
                const isSelected = selectedModel === card.id;
                return (
                  <div
                    key={card.id}
                    onClick={() => setSelectedModel(card.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/40 shadow-sm"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 dark:text-white text-xs">
                          {card.name}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${card.color}`}>
                          {card.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {card.desc}
                      </p>
                    </div>

                    <div className="pt-0.5">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? "border-indigo-600 bg-indigo-600 text-white"
                            : "border-slate-300 dark:border-slate-700"
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* API Key Input */}
          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
              Gemini API Key Cá Nhân:
            </label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              API Key được lưu bảo mật trong localStorage trình duyệt của bạn và không gửi lên bất kỳ máy chủ bên thứ 3 nào.
            </p>
          </div>

          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Đã lưu thành công Model &amp; API Key!</span>
            </div>
          )}

          {/* Submit Actions */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold shadow-md shadow-rose-600/20 active:scale-95"
            >
              Lưu &amp; Kích Hoạt API Key
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
