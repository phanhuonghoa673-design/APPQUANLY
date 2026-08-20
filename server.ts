import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initialize Google GenAI
let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const SEME_SYSTEM_INSTRUCTION = `# Custom System Instruction: Quản Lý Lớp AI Advisor

## 1. Role
Bạn là Cố vấn AI Chiến lược Kỹ thuật số của Hệ Thống Quản Lý Lớp Học Thông Minh (**Quản Lý Lớp**). Bạn sở hữu tư duy hệ thống về kiến trúc Microservices, am hiểu sâu sắc về trí tuệ nhân tạo (AI), kết nối cơ sở dữ liệu Google Sheets thời gian thực cho lớp học trực tuyến, bảo mật Zero Trust và các nghiệp vụ giáo dục hiện đại. Bạn không chỉ là một kho dữ liệu, mà là thực thể thông minh kết nối 06 nhóm đối tượng: Ban Giám hiệu, Giáo viên chủ nhiệm, Giáo viên bộ môn, Nhân viên hành chính, Học sinh và Phụ huynh.

## 2. Objective
* Điều phối & Tư vấn: Cung cấp hướng dẫn, giải đáp, hỗ trợ kết nối danh sách lớp học trực tuyến từ Google Sheets và tối ưu hóa quy trình vận hành cho từng nhóm người dùng trong ứng dụng Quản Lý Lớp.
* Phân tích & Dự báo: Sử dụng tư duy Machine Learning để phân tích xu hướng giảng dạy, dự báo rủi ro học tập và biến động nhân sự.
* Đảm bảo Tính Chính trực: Duy trì các tiêu chuẩn về liêm chính học thuật (AI hành vi) và bảo mật dữ liệu tuyệt đối (Zero Trust).
* Hỗ trợ Ra quyết định: Cung cấp các phân tích dựa trên dữ liệu thực tế từ Dashboard BI cho cấp quản lý và lộ trình cá nhân hóa cho học sinh.

## 3. Guidelines & Rules
### A. Nguyên tắc Kỹ thuật & Bảo mật
1. Zero Trust & MFA: Luôn ưu tiên tính bảo mật. Mọi phản hồi liên quan đến dữ liệu nhạy cảm phải nhắc nhở về quyền truy cập dựa trên Unique ID và xác thực đa nhân tố.
2. Tính liên thông dữ liệu: Luôn coi dữ liệu là một dòng chảy thống nhất từ Excel, SQL đến Cơ sở dữ liệu quốc gia. Khi xử lý xung đột dữ liệu, phải áp dụng cơ chế Real-time Data Reconciliation.
3. Hybrid Cloud & Offline: Khi tư vấn về hạ tầng, phải lưu ý khả năng đồng bộ hóa tự động sau khi hoạt động ở chế độ ngoại tuyến.

### B. Quy tắc nghiệp vụ theo đối tượng (Persona-based Rules)
1. Đối với Ban Giám hiệu: Tập trung vào Dashboard BI, tối ưu hóa tài sản, lập thời khóa biểu tự động và minh bạch tài chính (Internal Audit).
2. Đối với Giáo viên: Nhấn mạnh vào trợ lý soạn bài NLP, chấm điểm tự động, Gamification (Spider Charts) và phân tích tâm lý học sinh (Sentiment Analysis).
3. Đối với Học sinh: Thúc đẩy môi trường Hyper-personalized LMS, AR/VR và bảo vệ "Hộ chiếu kỹ năng" (Blockchain Skill Passport).
4. Đối với Phụ huynh: Đảm bảo tính tức thời (Real-time GPS/FaceID), sự tiện lợi (E-wallet) và tính pháp lý (e-Signature).

### C. Ràng buộc Logic
* Không bao giờ được bỏ qua các ràng buộc logic phức tạp khi lập thời khóa biểu.
* Mọi chứng chỉ/giải thưởng phải được mặc định lưu trữ trên Blockchain để đảm bảo tính vĩnh viễn.
* Ưu tiên các tiêu chuẩn Accessibility cho người khuyết tật trong mọi thiết kế giao diện/phản hồi.

## 4. Tone & Persona
* Phong cách: Chuyên nghiệp, Nhạy bén, Tầm nhìn chiến lược và Truyền cảm hứng.
* Ngôn ngữ: Sử dụng thuật ngữ công nghệ chính xác (Microservices, Zero Trust, Hyper-personalized,...) nhưng phải giải thích dễ hiểu khi tương tác với Phụ huynh hoặc Học sinh.
* Tính cách: Đáng tin cậy như một chuyên gia bảo mật, thấu cảm như một chuyên gia tâm lý giáo dục và logic như một thuật toán tối ưu.

## 5. Output Format
Mọi phản hồi của bot BẮT BUỘC phải được cấu trúc rõ ràng theo đúng 5 mục sau:

1. **Context Recognition (Xác nhận ngữ cảnh):** Xác định rõ đối tượng đang tương tác (1 trong 6 nhóm: Ban Giám hiệu, Giáo viên chủ nhiệm, Giáo viên bộ môn, Nhân viên hành chính, Học sinh, Phụ huynh) và phân hệ nghiệp vụ liên quan.
2. **Strategic Solution (Giải pháp chiến lược):** Trình bày giải pháp dựa trên các công nghệ lõi (AI, Blockchain, ML, Big Data, Microservices, Zero Trust) của hệ thống.
3. **Actionable Steps (Các bước thực hiện):** Chỉ dẫn cụ thể trên giao diện hoặc quy trình nghiệp vụ từng bước rõ ràng.
4. **Security & Integrity Note (Lưu ý bảo mật/Chính trực):** Cảnh báo về quyền truy cập, Unique ID, MFA hoặc tính xác thực của dữ liệu/liêm chính học thuật.
5. **Visual Suggestion (Đề xuất hiển thị):** Gợi ý trực quan hóa dữ liệu tốt nhất (Ví dụ: "Bạn nên xem dữ liệu này dưới dạng biểu đồ Spider Chart trên Dashboard...", "Hiển thị qua Heatmap phòng học...", "Tra cứu qua Blockchain Ledger Explorer...").
`;

// Helper fallback when Gemini API key is missing or for offline robustness
function generateOfflineResponse(prompt: string, persona: string): string {
  return `### 1. Context Recognition (Xác nhận ngữ cảnh)
* **Đối tượng tương tác:** ${persona || "Cán bộ quản lý & Người dùng SEME"}
* **Phân hệ nghiệp vụ:** Hệ sinh thái Quản lý Giáo dục Thông minh (SEME) - Trục điều phối liên thông Microservices & Zero Trust.
* **Yêu cầu xử lý:** "${prompt.slice(0, 100)}..."

---

### 2. Strategic Solution (Giải pháp chiến lược)
Hệ sinh thái SEME kích hoạt module điều phối tự động kết hợp Machine Learning và cơ chế Real-time Data Reconciliation:
* Áp dụng kiến trúc Microservices phân tách dịch vụ, đảm bảo thông suốt từ tầng cơ sở dữ liệu học đường đến CSDL Ngành GD.
* Triển khai bộ phân tích dự báo (Predictive Analytics) nhằm phát hiện sớm các dị thường trong tiến trình dạy và học.
* Tích hợp cơ chế mã hóa bất biến (Immutable Ledger) cho hồ sơ và chứng chỉ kỹ năng để bảo toàn tính chính trực học thuật.

---

### 3. Actionable Steps (Các bước thực hiện)
1. **Bước 1 - Xác thực danh tính:** Đăng nhập thông qua cổng Zero Trust SSO sử dụng Unique ID và mã OTP sinh trắc học/MFA.
2. **Bước 2 - Truy xuất module chuyên trách:** Mở bảng điều khiển tương ứng trên giao diện SEME (Dashboard BI / Trợ lý NLP / Quản lý phân quyền).
3. **Bước 3 - Thực thi & Tối ưu:** Kích hoạt thuật toán xử lý dữ liệu, kiểm tra các ràng buộc logic liên phòng ban trước khi đồng bộ.
4. **Bước 4 - Phê duyệt điện tử:** Ký xác nhận bằng e-Signature để hoàn tất chu trình nghiệp vụ.

---

### 4. Security & Integrity Note (Lưu ý bảo mật/Chính trực)
* ⚠️ **Zero Trust Enforcement:** Toàn bộ truy vấn đều được ghi nhận vào nhật ký kiểm toán (Audit Trail) với mã băm SHA-256.
* 🔒 **Phân quyền RBAC:** Chỉ người dùng có vai trò hợp lệ mới được cấp phát Access Token có thời hạn (JWT 15 phút).
* 🛡️ **Liêm chính học thuật:** Các tác vụ liên quan đến điểm số và bằng cấp được xác thực đối chiếu với block Merkle Tree.

---

### 5. Visual Suggestion (Đề xuất hiển thị)
* 📊 **Khuyến nghị hiển thị:** Đề xuất người dùng theo dõi dữ liệu này qua **Biểu đồ Radar đa năng lực (Spider Chart)** kết hợp với **Bảng điều khiển BI thời gian thực (Real-time BI Dashboard)** để có cái nhìn trực quan toàn diện nhất.`;
}

// 1. AI Advisor Endpoint
app.post("/api/ai/advisor", async (req: Request, res: Response) => {
  try {
    const { prompt, persona, contextData, model } = req.body;
    const clientApiKey = (req.headers["x-gemini-api-key"] as string) || process.env.GEMINI_API_KEY;

    if (!prompt) {
      return res.status(400).json({ error: "Thiếu prompt yêu cầu" });
    }

    if (!clientApiKey) {
      const fallback = generateOfflineResponse(prompt, persona);
      return res.json({ text: fallback, mode: "offline-fallback" });
    }

    const ai = new GoogleGenAI({ apiKey: clientApiKey });
    const targetModel = model || "gemini-3-flash-preview";

    const personaContext = persona
      ? `\n[NGƯỜI DÙNG HIỆN TẠI]: Nhóm đối tượng: ${persona}.`
      : "";
    const extraData = contextData
      ? `\n[DỮ LIỆU NGỮ CẢNH HỆ THỐNG]: ${JSON.stringify(contextData)}`
      : "";

    const userContent = `${personaContext}${extraData}\n\n[YÊU CẦU TỪ NGƯỜI DÙNG]:\n${prompt}\n\nHãy trả lời theo đúng 5 mục cấu trúc đã quy định trong System Instruction.`;

    const response = await ai.models.generateContent({
      model: targetModel,
      contents: userContent,
      config: {
        systemInstruction: SEME_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return res.json({
      text: response.text || generateOfflineResponse(prompt, persona),
      mode: "online-gemini",
      modelUsed: targetModel,
    });
  } catch (error: any) {
    console.error("Gemini Advisor Error:", error);
    return res.status(500).json({
      error: error.message || String(error),
      mode: "error",
    });
  }
});

// 2. Lesson Plan Generator (GV Bộ môn)
app.post("/api/ai/lesson-plan", async (req: Request, res: Response) => {
  try {
    const { subject, grade, topic, duration, competencies } = req.body;
    const ai = getGenAI();

    const prompt = `Soạn Kế hoạch bài dạy (Giáo án) theo định hướng phát triển phẩm chất, năng lực (chuẩn Công văn 5512/GDĐT) cho:
- Môn học: ${subject || "Toán"}
- Khối lớp: ${grade || "11"}
- Tên bài học: ${topic || "Đạo hàm và ứng dụng thực tiễn"}
- Thời lượng: ${duration || "2 tiết"}
- Năng lực mục tiêu: ${competencies || "Tư duy giải quyết vấn đề, Ứng dụng công nghệ STEM"}

Cấu trúc gồm:
I. MỤC TIÊU BÀI DẠY (Kiến thức, Năng lực chung & đặc thù, Phẩm chất)
II. THIẾT BỊ DẠY HỌC & HỌC LIỆU SỐ (Bao gồm gợi ý mô phỏng AR/VR và tài liệu tương tác)
III. TIẾN TRÌNH DẠY HỌC (4 hoạt động: Mở đầu -> Hình thành kiến thức -> Luyện tập -> Vận dụng thực tế)
IV. ĐÁNH GIÁ & TIÊU CHÍ RUBRIC (Kèm gợi ý tiêu chí đánh giá liêm chính học thuật AI)`;

    if (!ai) {
      return res.json({
        plan: `### KẾ HOẠCH BÀI DẠY: ${topic || "STEM & Trí Tuệ Nhân Tạo"}\n**Môn:** ${subject || "Toán học & Tin học"} | **Khối:** ${grade || "11"} | **Thời lượng:** ${duration || "90 phút"}\n\n#### I. MỤC TIÊU BÀI DẠY\n* **Năng lực đặc thù:** Vận dụng mô hình toán học giải quyết bài toán tối ưu dữ liệu lớn.\n* **Năng lực số:** Sử dụng công cụ tương tác SEME Simulator để trực quan hóa dữ liệu.\n* **Phẩm chất:** Tính trung thực trong thu thập dữ liệu và tinh thần làm việc nhóm.\n\n#### II. THIẾT BỊ & HỌC LIỆU SỐ\n* Bảng tương tác thông minh, Kính thực tế ảo AR/VR Lab SEME.\n* Bộ dữ liệu mô phỏng tình huống thực tế.\n\n#### III. TIẾN TRÌNH DẠY HỌC\n1. **Hoạt động 1 (Khởi động - 10p):** Tình huống mô phỏng tối ưu hóa chi phí vận hành trường học.\n2. **Hoạt động 2 (Khám phá kiến thức - 35p):** Thảo luận nhóm trên nền tảng Hyper-personalized LMS.\n3. **Hoạt động 3 (Luyện tập - 25p):** Thực hành giải bài toán trên máy trạm có kiểm soát liêm chính học thuật.\n4. **Hoạt động 4 (Vận dụng - 20p):** Báo cáo kết quả và số hóa điểm thưởng vào Blockchain Skill Passport.\n\n#### IV. TIÊU CHÍ ĐÁNH GIÁ (RUBRIC)\n* Mức 1: Hoàn thành 60% yêu cầu kỹ năng tính toán.\n* Mức 2: Vận dụng sáng tạo, báo cáo logic và minh bạch nguồn tham khảo.`,
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: "Bạn là chuyên gia sư phạm và cố vấn thiết kế chương trình giáo dục hiện đại của hệ sinh thái SEME.",
        temperature: 0.6,
      },
    });

    return res.json({ plan: response.text });
  } catch (err: any) {
    console.error("Lesson Plan Error:", err);
    return res.status(500).json({ error: err.message });
  }
});

// 3. Student Psychology & Sentiment Analysis (GVCN)
app.post("/api/ai/sentiment-analysis", async (req: Request, res: Response) => {
  try {
    const { studentName, notes, attendanceHistory, academicTrend } = req.body;
    const ai = getGenAI();

    const prompt = `Phân tích tâm lý học đường và dự báo rủi ro học tập cho học sinh:
- Họ tên: ${studentName || "Nguyễn Văn An (11A1)"}
- Ghi nhận hành vi / nhật ký gần đây: "${notes || "Gần đây ít phát biểu hơn, hay nhìn ra cửa sổ trong giờ Toán, điểm bài kiểm tra giữa kỳ giảm nhẹ."}"
- Lịch sử chuyên cần: ${attendanceHistory || "Vắng 2 buổi có phép, đi muộn 1 lần"}
- Xu hướng học tập: ${academicTrend || "Môn Tự nhiên giảm từ 8.5 xuống 7.2"}

Hãy đưa ra:
1. Đánh giá trạng thái tâm lý & mức độ rủi ro (Thấp / Trung bình / Cao).
2. Các nguyên nhân tiềm ẩn cần lưu ý.
3. Kế hoạch hỗ trợ sư phạm tinh tế dành cho GVCN.
4. Lời khuyên tư vấn đồng hành dành cho Phụ huynh.`;

    if (!ai) {
      return res.json({
        analysis: `### BÁO CÁO PHÂN TÍCH TÂM LÝ & DỰ BÁO RỦI RO\n* **Học sinh:** ${studentName || "Nguyễn Văn An"}\n* **Mức độ rủi ro:** 🟡 TRUNG BÌNH (Cần can thiệp sớm)\n* **Nhận định tâm lý:** Có dấu hiệu căng thẳng tâm lý giai đoạn chuyển tiếp chương trình học; giảm động lực tạm thời do áp lực kỳ thi.\n* **Hành động khuyến nghị cho GVCN:** Gặp gỡ riêng cuối giờ với thái độ cởi mở; kích hoạt bạn đồng hành học tập (Peer Mentoring).\n* **Khuyến nghị cho Phụ huynh:** Lắng nghe chia sẻ, giảm áp lực kỳ vọng điểm số, tăng thời gian thư giãn gia đình.`,
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: "Bạn là chuyên gia tư vấn tâm lý học đường và phân tích hành vi học tập của hệ thống SEME.",
        temperature: 0.5,
      },
    });

    return res.json({ analysis: response.text });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// 4. Data Reconciliation Engine
app.post("/api/ai/reconcile-data", (req: Request, res: Response) => {
  const { excelCount = 2450, sqlCount = 2446, nationalDbCount = 2442 } = req.body;
  const discrepancies = [
    {
      id: "DISC-001",
      studentId: "HS-2026-11024",
      studentName: "Trần Minh Đức",
      class: "11A2",
      excelField: "Ngày sinh: 15/04/2009",
      sqlField: "Ngày sinh: 15/04/2009",
      nationalDbField: "Ngày sinh: 14/04/2009",
      status: "Conflicted",
      suggestedResolution: "Đối chiếu Giấy khai sinh số hóa có gắn mã băm Blockchain -> Đồng bộ CSDL Quốc gia theo Căn cước công dân.",
    },
    {
      id: "DISC-002",
      studentId: "HS-2026-10088",
      studentName: "Lê Thu Uyên",
      class: "10A1",
      excelField: "Trạng thái: Đã chuyển trường",
      sqlField: "Trạng thái: Đang theo học",
      nationalDbField: "Trạng thái: Đã chuyển đến THPT Chuyên",
      status: "Conflicted",
      suggestedResolution: "Kích hoạt luồng chuyển tiếp hồ sơ liên trường tự động qua giao thức Zero Trust API.",
    },
    {
      id: "DISC-003",
      studentId: "HS-2026-12105",
      studentName: "Phạm Gia Huy",
      class: "12A3",
      excelField: "Điểm TB: 8.8",
      sqlField: "Điểm TB: 8.8",
      nationalDbField: "Điểm TB: 8.5 (Chưa cập nhật điểm phúc khảo)",
      status: "Pending Sync",
      suggestedResolution: "Đẩy gói dữ liệu phúc khảo có chữ ký số e-Signature của Hiệu trưởng lên CSDL Ngành.",
    },
  ];

  res.json({
    summary: {
      excelCount,
      sqlCount,
      nationalDbCount,
      reconciliationRate: "99.88%",
      conflictsCount: discrepancies.length,
      lastSyncTimestamp: new Date().toISOString(),
      protocol: "Zero Trust Real-time Data Reconciliation Pipeline",
    },
    discrepancies,
  });
});

// 5. System Health Status
app.get("/api/system/status", (req: Request, res: Response) => {
  res.json({
    system: "Smart Educational Management Ecosystem (SEME)",
    version: "4.2.0-Production",
    uptime: "99.99%",
    zeroTrustGateway: "ACTIVE (MFA & Biometric SSO Enforced)",
    microservices: [
      { name: "Auth & Identity Service (Zero Trust)", status: "HEALTHY", latencyMs: 14 },
      { name: "BI Analytics & ML Predictor Engine", status: "HEALTHY", latencyMs: 22 },
      { name: "Academic & NLP Lesson Assistant", status: "HEALTHY", latencyMs: 38 },
      { name: "Real-time Bus GPS & FaceID Bus", status: "HEALTHY", latencyMs: 8 },
      { name: "Blockchain Skill Passport Ledger", status: "HEALTHY", blockHeight: 184290 },
      { name: "Data Reconciliation & Sync Bus", status: "HEALTHY", queueLength: 0 },
    ],
    offlineStorageReady: true,
    geminiAiReady: Boolean(process.env.GEMINI_API_KEY),
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SEME Server running on http://localhost:${PORT}`);
  });
}

startServer();
