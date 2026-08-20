import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Bot,
  User,
  Copy,
  Check,
  RefreshCw,
  Layers,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import { AdvisorMessage, PersonaType } from "../../types";
import { PERSONAS, QUICK_PROMPTS_BY_PERSONA } from "../../data/mockData";
import { generateWithFallback } from "../../services/geminiService";

interface AIAdvisorViewProps {
  currentPersona: PersonaType;
  onNavigateToModule?: (tab: string) => void;
  initialPrompt?: string;
}

export const AIAdvisorView: React.FC<AIAdvisorViewProps> = ({
  currentPersona,
  onNavigateToModule,
  initialPrompt,
}) => {
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>(
    currentPersona === "ALL" ? "BOARD" : currentPersona
  );

  const [messages, setMessages] = useState<AdvisorMessage[]>([
    {
      id: "msg-welcome",
      sender: "ai",
      timestamp: "19:11",
      personaContext: "ALL",
      rawText: `Xin chào! Tôi là **Kiến trúc sư Trưởng và Cố vấn Chiến lược Kỹ thuật số (SEME Strategic Architect & Digital Advisor)**. 

Tôi sẵn sàng hỗ trợ điều phối đa phân hệ cho **06 nhóm đối tượng**: Ban Giám hiệu, Giáo viên chủ nhiệm, Giáo viên bộ môn, Nhân viên hành chính, Học sinh và Phụ huynh trên nền tảng Microservices, Zero Trust và AI/Blockchain.

---

### 1. Context Recognition (Xác nhận ngữ cảnh)
* **Đối tượng:** Toàn thể người dùng và Ban điều hành Hệ sinh thái SEME.
* **Trạng thái:** Hệ sinh thái đang hoạt động ổn định ở chế độ Real-time Monitoring.
* **Cơ chế xác thực:** Zero Trust & MFA với Unique ID đã kích hoạt.

---

### 2. Strategic Solution (Giải pháp chiến lược)
Hệ sinh thái SEME vận hành theo cơ chế kiến trúc Microservices phân lớp độc lập, kết hợp tầng bảo mật Zero Trust và công cụ phân tích dự báo Machine Learning. Dữ liệu được liên thông đa chiều từ Excel, SQL đến Cơ sở dữ liệu quốc gia thông qua luồng Data Reconciliation thời gian thực.

---

### 3. Actionable Steps (Các bước thực hiện)
1. **Chọn vai trò:** Chọn nhóm đối tượng của bạn ở thanh điều hướng phía trên.
2. **Khai thác module:** Truy cập vào Dashboard BI, Trợ lý NLP 5512, Phân tích Tâm lý học sinh, Đối soát CSDL hoặc Hộ chiếu Blockchain.
3. **Đặt câu hỏi chiến lược:** Nhập yêu cầu hoặc chọn từ danh sách câu hỏi gợi ý bên dưới để nhận hướng dẫn theo cấu trúc chuẩn 5 phần.

---

### 4. Security & Integrity Note (Lưu ý bảo mật/Chính trực)
* 🔒 **Zero Trust Compliance:** Mọi dữ liệu nhạy cảm được bảo vệ bởi mã hóa kép và kiểm soát phân quyền RBAC nghiêm ngặt.
* 🛡️ **Liêm chính học thuật:** Bài làm và chứng chỉ được đối soát với mạng Blockchain bất biến.

---

### 5. Visual Suggestion (Đề xuất hiển thị)
* 📊 Bạn có thể xem tổng quan qua **Bảng điều khiển BI** hoặc **Biểu đồ Radar Năng lực (Spider Chart)** để có cái nhìn trực quan nhất.`,
      mode: "online-gemini",
    },
  ]);

  const [inputQuery, setInputQuery] = useState(initialPrompt || "");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentPersona !== "ALL") {
      setSelectedPersona(currentPersona);
    }
  }, [currentPersona]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMsg: AdvisorMessage = {
      id: `msg-user-${Date.now()}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      rawText: query,
      personaContext: selectedPersona,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const personaInfo = PERSONAS.find((p) => p.id === selectedPersona);
      const personaLabel = personaInfo ? personaInfo.title : "Cán bộ quản lý";

      const systemInstruction = `Bạn là Cố vấn AI Chiến lược Kỹ thuật số của Hệ Thống Quản Lý Lớp Học Thông Minh (Quản Lý Lớp) hỗ trợ vai trò: ${personaLabel}. Hãy trả lời theo đúng 5 cấu trúc chuẩn: 1. Context Recognition, 2. Strategic Solution, 3. Actionable Steps, 4. Security & Integrity Note, 5. Visual Suggestion.`;

      const result = await generateWithFallback(query, systemInstruction);

      const aiMsg: AdvisorMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        rawText: result.text,
        personaContext: selectedPersona,
        mode: result.isError ? "offline-fallback" : "online-gemini",
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error("Advisor request error:", err);
      const errorMsg: AdvisorMessage = {
        id: `msg-err-${Date.now()}`,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        rawText: `### 1. Context Recognition (Xác nhận ngữ cảnh)
* **Đối tượng:** ${selectedPersona}
* **Trạng thái:** Kết nối ngoại tuyến tạm thời.

### 2. Strategic Solution (Giải pháp chiến lược)
Hệ thống kích hoạt cơ chế Offline Fallback tự động. Toàn bộ logic Zero Trust và quy trình nghiệp vụ Microservices vẫn được đảm bảo thông suốt qua bộ nhớ đệm cục bộ (Local Hybrid Storage).

### 3. Actionable Steps (Các bước thực hiện)
1. Kiểm tra kết nối mạng hoặc tiếp tục làm việc trên bộ nhớ đệm.
2. Dữ liệu sẽ tự động đồng bộ hóa lên CSDL Quốc gia ngay khi kết nối được tái thiết lập.

### 4. Security & Integrity Note (Lưu ý bảo mật/Chính trực)
* ⚠️ Chế độ Offline tuân thủ quy tắc bảo mật Zero Trust cục bộ.

### 5. Visual Suggestion (Đề xuất hiển thị)
* 📊 Vui lòng theo dõi qua **Bảng điều khiển Offline Sync** của phân hệ Hành chính.`,
        personaContext: selectedPersona,
        mode: "offline-fallback",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activePersonaPrompts =
    selectedPersona !== "ALL"
      ? QUICK_PROMPTS_BY_PERSONA[selectedPersona] || []
      : QUICK_PROMPTS_BY_PERSONA["BOARD"] || [];

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-6xl mx-auto p-2 sm:p-4 gap-4">
      {/* Top Advisor Header & Persona Context Switch */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-slate-800 dark:text-slate-100 text-base">
                  SEME Strategic Architect & Digital Advisor
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Online Real-time
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Hạt nhân điều phối AI • Cấu trúc 5 phần chuẩn hóa • Bảo mật Zero Trust
              </p>
            </div>
          </div>

          {/* Persona selector for contextualized advisor answers */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Ngữ cảnh đối tượng:
            </span>
            <select
              value={selectedPersona}
              onChange={(e) => setSelectedPersona(e.target.value as PersonaType)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {PERSONAS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick prompt pills for this persona */}
        <div className="pt-3">
          <div className="flex items-center gap-1.5 mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Kịch bản tình huống đề xuất ({PERSONAS.find((p) => p.id === selectedPersona)?.shortTitle}):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {activePersonaPrompts.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.prompt)}
                className="text-xs text-left px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800/80 dark:hover:bg-indigo-950/60 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-indigo-500 shrink-0" />
                <span className="truncate max-w-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "ai" && (
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-3xl rounded-2xl p-4 sm:p-5 shadow-sm text-sm transition-all ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white ml-12 rounded-tr-none"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none"
              }`}
            >
              {/* Header meta */}
              <div className="flex items-center justify-between gap-3 mb-3 text-xs opacity-75 border-b border-black/10 dark:border-white/10 pb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {msg.sender === "user"
                      ? "Người dùng SEME"
                      : "SEME Strategic Architect & Digital Advisor"}
                  </span>
                  {msg.personaContext && (
                    <span className="px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10 text-[10px]">
                      {msg.personaContext}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span>{msg.timestamp}</span>
                  {msg.sender === "ai" && (
                    <button
                      onClick={() => copyToClipboard(msg.id, msg.rawText)}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                      title="Sao chép câu trả lời"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Message Content with 5-Section Highlights */}
              <div className="space-y-3 leading-relaxed">
                {msg.sender === "user" ? (
                  <p className="whitespace-pre-wrap">{msg.rawText}</p>
                ) : (
                  <StructuredAIResponse
                    rawText={msg.rawText}
                    onNavigateToModule={onNavigateToModule}
                  />
                )}
              </div>
            </div>

            {msg.sender === "user" && (
              <div className="w-8 h-8 rounded-lg bg-slate-700 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-tl-none p-4 shadow-sm max-w-md">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Đang điều phối phân tích đa luồng & kiểm tra Zero Trust...</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse w-3/4"></div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse w-full"></div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse w-5/6"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 sm:p-3 border border-slate-200 dark:border-slate-800 shadow-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={`Hỏi Kiến trúc sư Trưởng SEME về chiến lược, TKB, tâm lý học sinh, bảo mật Zero Trust...`}
              disabled={isLoading}
              className="w-full text-xs sm:text-sm pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            />
            <span className="absolute right-3 top-2.5 text-[10px] font-mono text-slate-400 hidden sm:inline">
              Enter ↵
            </span>
          </div>

          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all active:scale-95 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Gửi câu hỏi</span>
          </button>
        </form>
      </div>
    </div>
  );
};

// Sub-component to render the 5 standardized sections cleanly
const StructuredAIResponse: React.FC<{
  rawText: string;
  onNavigateToModule?: (tab: string) => void;
}> = ({ rawText, onNavigateToModule }) => {
  // Simple markdown renderer with section split
  return (
    <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200">
      {rawText.split(/(?=### [1-5]\. )/g).map((section, idx) => {
        const trimmed = section.trim();
        if (!trimmed) return null;

        // Check section type
        if (trimmed.includes("1. Context Recognition") || trimmed.includes("Xác nhận ngữ cảnh")) {
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60"
            >
              <div className="flex items-center gap-2 font-bold text-blue-800 dark:text-blue-300 text-xs uppercase tracking-wider mb-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px]">
                  1
                </span>
                <span>Context Recognition • Xác nhận ngữ cảnh</span>
              </div>
              <div className="text-slate-700 dark:text-slate-300 text-xs space-y-1">
                {renderFormattedContent(trimmed.replace(/### 1\..*?\n/, ""))}
              </div>
            </div>
          );
        }

        if (trimmed.includes("2. Strategic Solution") || trimmed.includes("Giải pháp chiến lược")) {
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60"
            >
              <div className="flex items-center gap-2 font-bold text-purple-800 dark:text-purple-300 text-xs uppercase tracking-wider mb-2">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[11px]">
                  2
                </span>
                <span>Strategic Solution • Giải pháp chiến lược</span>
              </div>
              <div className="text-slate-700 dark:text-slate-300 text-xs space-y-1.5">
                {renderFormattedContent(trimmed.replace(/### 2\..*?\n/, ""))}
              </div>
            </div>
          );
        }

        if (trimmed.includes("3. Actionable Steps") || trimmed.includes("Các bước thực hiện")) {
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60"
            >
              <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 text-xs uppercase tracking-wider mb-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px]">
                  3
                </span>
                <span>Actionable Steps • Các bước thực hiện</span>
              </div>
              <div className="text-slate-700 dark:text-slate-300 text-xs space-y-1.5">
                {renderFormattedContent(trimmed.replace(/### 3\..*?\n/, ""))}
              </div>
            </div>
          );
        }

        if (trimmed.includes("4. Security & Integrity Note") || trimmed.includes("Lưu ý bảo mật/Chính trực")) {
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60"
            >
              <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 text-xs uppercase tracking-wider mb-2">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[11px]">
                  4
                </span>
                <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Security & Integrity Note • Bảo mật Zero Trust & Liêm chính</span>
              </div>
              <div className="text-slate-700 dark:text-slate-300 text-xs space-y-1">
                {renderFormattedContent(trimmed.replace(/### 4\..*?\n/, ""))}
              </div>
            </div>
          );
        }

        if (trimmed.includes("5. Visual Suggestion") || trimmed.includes("Đề xuất hiển thị")) {
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80"
            >
              <div className="flex items-center justify-between gap-2 font-bold text-indigo-800 dark:text-indigo-300 text-xs uppercase tracking-wider mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px]">
                    5
                  </span>
                  <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Visual Suggestion • Đề xuất trực quan hóa</span>
                </div>
              </div>
              <div className="text-slate-700 dark:text-slate-300 text-xs space-y-1">
                {renderFormattedContent(trimmed.replace(/### 5\..*?\n/, ""))}
              </div>
            </div>
          );
        }

        // Generic fallback section
        return (
          <div key={idx} className="space-y-2">
            {renderFormattedContent(trimmed)}
          </div>
        );
      })}
    </div>
  );
};

function renderFormattedContent(text: string) {
  // Simple markdown styling
  const lines = text.split("\n");
  return lines.map((line, lIdx) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return <div key={lIdx} className="h-1" />;

    // Bold replacement
    let formattedText: React.ReactNode = line;

    return (
      <p key={lIdx} className="leading-relaxed">
        {line.startsWith("* ") || line.startsWith("- ") ? (
          <span className="inline-flex items-start gap-1.5">
            <span className="text-indigo-500 font-bold">•</span>
            <span>{renderInlineStyles(line.substring(2))}</span>
          </span>
        ) : /^\d+\.\s/.test(line) ? (
          <span className="inline-flex items-start gap-1.5">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {line.match(/^\d+\./)?.[0]}
            </span>
            <span>{renderInlineStyles(line.replace(/^\d+\.\s*/, ""))}</span>
          </span>
        ) : (
          renderInlineStyles(line)
        )}
      </p>
    );
  });
}

function renderInlineStyles(text: string): React.ReactNode {
  // Render **bold** and `code`
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 font-mono text-[11px]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
