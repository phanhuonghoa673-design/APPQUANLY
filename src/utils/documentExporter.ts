import { OnlineClass } from "../types";

/**
 * Exports Online Classes dataset to a UTF-8 BOM CSV file for Excel
 */
export const exportClassesToCSV = (classes: OnlineClass[], filename = "Danh_Sach_Lop_Truc_Tuyen_Google_Sheet.csv") => {
  const headers = [
    "Mã Lớp",
    "Tên Lớp Học",
    "Môn Học",
    "Giáo Viên Phụ Trách",
    "Thời Gian / Lịch Học",
    "Link Phòng Học Online",
    "Sĩ Số Học Sinh",
    "Trạng Thái",
    "Ghi Chú",
  ];

  const rows = classes.map((c) => [
    `"${c.classCode}"`,
    `"${c.className}"`,
    `"${c.subject}"`,
    `"${c.teacherName}"`,
    `"${c.schedule}"`,
    `"${c.meetingUrl}"`,
    c.studentCount,
    `"${c.status === "LIVE" ? "Đang diễn ra" : c.status === "UPCOMING" ? "Sắp bắt đầu" : "Đã kết thúc"}"`,
    `"${(c.notes || "").replace(/"/g, '""')}"`,
  ]);

  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Generates and downloads a Word Document (.docx) for Lesson Plans (Giáo Án Chuẩn 5512 BGD&ĐT)
 */
export const exportLessonPlanToWord = ({
  title,
  subject,
  grade,
  duration,
  teacherName,
  objectives,
  activities,
}: {
  title: string;
  subject: string;
  grade: string;
  duration: string;
  teacherName: string;
  objectives: { knowledge: string; skills: string; attitude: string };
  activities: { step: string; content: string; method: string }[];
}) => {
  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.4; color: #000; padding: 20px; }
        .header-table { width: 100%; margin-bottom: 20px; border-collapse: collapse; }
        .header-table td { border: none; font-size: 12pt; text-align: center; vertical-align: top; }
        .title { text-align: center; font-size: 16pt; font-weight: bold; text-transform: uppercase; margin: 20px 0 10px 0; }
        .subtitle { text-align: center; font-size: 13pt; font-style: italic; margin-bottom: 20px; }
        h2 { font-size: 14pt; font-weight: bold; text-transform: uppercase; margin-top: 15px; margin-bottom: 8px; color: #002060; }
        table.content-table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 15px; }
        table.content-table th, table.content-table td { border: 1px solid #000; padding: 8px; text-align: left; font-size: 12pt; }
        table.content-table th { background-color: #f2f2f2; font-weight: bold; text-align: center; }
        .signature-table { width: 100%; margin-top: 30px; border-collapse: collapse; }
        .signature-table td { border: none; text-align: center; vertical-align: top; font-size: 12pt; }
      </style>
    </head>
    <body>
      <table class="header-table">
        <tr>
          <td style="width: 45%;">
            <strong>TRƯỜNG THPT CHUYÊN CHU VĂN AN</strong><br/>
            TỔ BỘ MÔN: ${subject.toUpperCase()}<br/>
            -------------------
          </td>
          <td style="width: 55%;">
            <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br/>
            <strong>Độc lập - Tự do - Hạnh phúc</strong><br/>
            -------------------
          </td>
        </tr>
      </table>

      <div class="title">KẾ HOẠCH BÀI DẠY (GIÁO ÁN 5512)</div>
      <div class="subtitle"><strong>Tên bài dạy: ${title}</strong><br/>
      Môn học: ${subject} | Lớp: ${grade} | Thời lượng: ${duration}
      </div>

      <h2>I. MỤC TIÊU BÀI HỌC</h2>
      <p><strong>1. Về kiến thức:</strong> ${objectives.knowledge}</p>
      <p><strong>2. Về kỹ năng:</strong> ${objectives.skills}</p>
      <p><strong>3. Về phẩm chất & thái độ:</strong> ${objectives.attitude}</p>

      <h2>II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU</h2>
      <p>• <strong>Giáo viên:</strong> Máy tính, máy chiếu, bài giảng điện tử PowerPoint, tài liệu mô phỏng AR/VR, phiếu học tập.</p>
      <p>• <strong>Học sinh:</strong> Sách giáo khoa, vở ghi, thiết bị học tập thông minh.</p>

      <h2>III. TIẾN TRÌNH DẠY HỌC (CÁC HOẠT ĐỘNG HỌC TẬP)</h2>
      <table class="content-table">
        <thead>
          <tr>
            <th style="width: 25%;">Hoạt động</th>
            <th style="width: 50%;">Nội dung & Nhiệm vụ</th>
            <th style="width: 25%;">Phương pháp / Sản phẩm</th>
          </tr>
        </thead>
        <tbody>
          ${activities
            .map(
              (act) => `
            <tr>
              <td><strong>${act.step}</strong></td>
              <td>${act.content}</td>
              <td>${act.method}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <h2>IV. HƯỚNG DẪN VỀ NHÀ & DẶN DÒ</h2>
      <p>• Ôn tập toàn bộ kiến thức bài học trên hệ thống Quản Lý Lớp LMS.</p>
      <p>• Hoàn thành các bài tập rèn luyện trực tuyến và chuẩn bị nội dung bài tiếp theo.</p>

      <table class="signature-table">
        <tr>
          <td style="width: 50%;">
            <strong>DUYỆT CỦA TỔ TRƯỞNG CHUYÊN MÔN</strong><br/><br/><br/><br/>
            ________________________
          </td>
          <td style="width: 50%;">
            <em>Ngày ..... tháng ..... năm 2026</em><br/>
            <strong>GIÁO VIÊN SOẠN BÀI</strong><br/><br/><br/><br/>
            <strong>${teacherName}</strong>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(["\ufeff", htmlContent], {
    type: "application/msword;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Giao_An_5512_${title.replace(/[^a-zA-Z0-9_]/g, "_")}.docx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Generates and downloads a Word Document (.docx) for Exams & Quizzes
 */
export const exportExamToWord = ({
  examTitle,
  subject,
  duration,
  teacherName,
  questions,
}: {
  examTitle: string;
  subject: string;
  duration: string;
  teacherName: string;
  questions: { id: number; question: string; options: string[]; answer: string }[];
}) => {
  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${examTitle}</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.4; color: #000; padding: 20px; }
        .header-table { width: 100%; margin-bottom: 15px; border-collapse: collapse; }
        .header-table td { border: none; font-size: 12pt; text-align: center; vertical-align: top; }
        .exam-title { text-align: center; font-size: 15pt; font-weight: bold; text-transform: uppercase; margin: 15px 0 5px 0; }
        .info-box { border: 1px solid #000; padding: 10px; margin-bottom: 20px; font-size: 12pt; }
        .question-title { font-weight: bold; margin-top: 15px; margin-bottom: 5px; }
        .options { margin-left: 20px; margin-bottom: 10px; }
        .answer-key { margin-top: 30px; border-top: 2px solid #000; padding-top: 15px; }
      </style>
    </head>
    <body>
      <table class="header-table">
        <tr>
          <td style="width: 45%;">
            <strong>TRƯỜNG THPT CHUYÊN CHU VĂN AN</strong><br/>
            MÔN: ${subject.toUpperCase()}<br/>
            -------------------
          </td>
          <td style="width: 55%;">
            <strong>ĐỀ KIỂM TRA ĐỊNH KỲ NĂM HỌC 2026 - 2027</strong><br/>
            <em>Thời gian làm bài: ${duration}</em><br/>
            -------------------
          </td>
        </tr>
      </table>

      <div class="exam-title">${examTitle}</div>

      <div class="info-box">
        Họ và tên học sinh: ............................................................................ Lớp: ............. Mã số HS: ....................
      </div>

      <h2>I. PHẦN CÂU HỎI TRẮC NGHIỆM</h2>
      ${questions
        .map(
          (q, idx) => `
        <div class="question-title">Câu ${idx + 1}: ${q.question}</div>
        <div class="options">
          ${q.options.map((opt, oIdx) => `<div>${String.fromCharCode(65 + oIdx)}. ${opt}</div>`).join("")}
        </div>
      `
        )
        .join("")}

      <div class="answer-key">
        <h2>II. ĐÁP ÁN VÀ HƯỚNG DẪN CHẤM</h2>
        <table border="1" style="border-collapse: collapse; width: 100%; text-align: center;">
          <tr>
            ${questions.map((_, idx) => `<td style="background-color: #f2f2f2; font-weight: bold;">Câu ${idx + 1}</td>`).join("")}
          </tr>
          <tr>
            ${questions.map((q) => `<td style="color: #c00; font-weight: bold;">${q.answer}</td>`).join("")}
          </tr>
        </table>
        <p style="margin-top: 15px;"><em>Đề thi được tạo tự động bởi Hệ Thống Quản Lý Lớp AI Advisor. Giáo viên phụ trách: ${teacherName}</em></p>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(["\ufeff", htmlContent], {
    type: "application/msword;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `De_Thi_${subject}_${examTitle.replace(/[^a-zA-Z0-9_]/g, "_")}.docx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Generates and downloads a PowerPoint Presentation (.pptx)
 */
export const exportLessonToPowerPoint = ({
  title,
  subject,
  teacherName,
  slides,
}: {
  title: string;
  subject: string;
  teacherName: string;
  slides: { slideNumber: number; title: string; bullets: string[] }[];
}) => {
  const htmlContent = `
    <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:p="urn:schemas-microsoft-com:office:powerpoint" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        .slide { page-break-after: always; width: 960px; height: 540px; padding: 40px; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); color: #fff; font-family: Arial, sans-serif; box-sizing: border-box; margin-bottom: 20px; border-radius: 12px; }
        .slide-title { font-size: 28pt; font-weight: bold; color: #38bdf8; margin-bottom: 20px; border-bottom: 2px solid #38bdf8; padding-bottom: 10px; }
        .slide-content { font-size: 18pt; line-height: 1.6; color: #f1f5f9; }
        .slide-content li { margin-bottom: 12px; }
        .title-slide { text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; background: linear-gradient(135deg, #312e81 0%, #4c1d95 100%); }
        .title-slide h1 { font-size: 36pt; color: #fbbf24; margin-bottom: 10px; }
        .title-slide h2 { font-size: 22pt; color: #e0e7ff; font-weight: normal; }
      </style>
    </head>
    <body>
      <!-- Title Slide -->
      <div class="slide title-slide">
        <h1>${title}</h1>
        <h2>Môn học: ${subject}</h2>
        <p style="font-size: 16pt; color: #a5b4fc; margin-top: 30px;">Giáo viên giảng dạy: ${teacherName}</p>
        <p style="font-size: 12pt; color: #94a3b8;">Hệ Thống Quản Lý Lớp • 2026 - 2027</p>
      </div>

      <!-- Content Slides -->
      ${slides
        .map(
          (slide) => `
        <div class="slide">
          <div class="slide-title">Slide ${slide.slideNumber}: ${slide.title}</div>
          <div class="slide-content">
            <ul>
              ${slide.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
            </ul>
          </div>
        </div>
      `
        )
        .join("")}
    </body>
    </html>
  `;

  const blob = new Blob(["\ufeff", htmlContent], {
    type: "application/vnd.ms-powerpoint;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Bai_Giang_PowerPoint_${title.replace(/[^a-zA-Z0-9_]/g, "_")}.pptx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
