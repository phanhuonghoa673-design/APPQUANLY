import React, { useState } from "react";
import {
  Globe,
  RefreshCw,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  GraduationCap,
  Sparkles,
  Link2,
  ExternalLink,
  Layers,
  Database,
  Users,
} from "lucide-react";

interface MoodleCourse {
  id: number;
  fullname: string;
  shortname: string;
  category: string;
  studentCount: number;
  assignmentsCount: number;
  completionRate: number;
}

const INITIAL_MOODLE_COURSES: MoodleCourse[] = [
  {
    id: 101,
    fullname: "Toán Học 11 - Đại Số & Giải Tích Nâng Cao",
    shortname: "TOAN11-NC",
    category: "Khối 11",
    studentCount: 42,
    assignmentsCount: 8,
    completionRate: 92,
  },
  {
    id: 102,
    fullname: "Vật Lý 11 - Cơ Học & Thí Nghiệm AR/VR",
    shortname: "LY11-STEM",
    category: "Khối 11",
    studentCount: 38,
    assignmentsCount: 6,
    completionRate: 88,
  },
  {
    id: 103,
    fullname: "Luyện Thi IELTS Intensive 12 - Speaking & Writing",
    shortname: "ENG12-IELTS",
    category: "Khối 12",
    studentCount: 35,
    assignmentsCount: 12,
    completionRate: 95,
  },
  {
    id: 104,
    fullname: "Nhập Môn Lập Trình Python & Trí Tuệ Nhân Tạo (AI)",
    shortname: "TIN10-AI",
    category: "Khối 10",
    studentCount: 30,
    assignmentsCount: 5,
    completionRate: 85,
  },
];

export const MoodleIntegration: React.FC = () => {
  const [serverUrl, setServerUrl] = useState("https://lms.quanlylophoc.edu.vn/webservice/rest/server.php");
  const [userToken, setUserToken] = useState("wstoken_8f93a1029c4e8b7d6a5f4e3d2c1b0a9f");
  const [isConnected, setIsConnected] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [courses, setCourses] = useState<MoodleCourse[]>(INITIAL_MOODLE_COURSES);
  const [lastSyncTime, setLastSyncTime] = useState(
    new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
  );

  const handleTestConnection = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsConnected(true);
      setLastSyncTime(new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-950 via-amber-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Moodle External Web Service API
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
                LMS Interoperability
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Liên Thông Dữ Liệu LMS Moodle
            </h1>
            <p className="text-sm text-amber-100/80 leading-relaxed">
              Tự động đồng bộ khóa học, bài tập nộp trực tuyến, bài kiểm tra Quiz và bảng điểm từ hệ thống Moodle LMS về ứng dụng Quản Lý Lớp.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTestConnection}
              disabled={isSyncing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Đang Đồng Bộ Moodle..." : "Đồng Bộ Moodle LMS"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Connection Config Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-amber-500" />
            <h2 className="font-bold text-slate-900 dark:text-white text-base">
              Cấu Hình Moodle Web Service Endpoint
            </h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Moodle Live Connection Active (Đã đồng bộ lúc {lastSyncTime})
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Moodle REST API Server URL:
            </label>
            <input
              type="text"
              value={serverUrl}
              onChange={(e) => setServerUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Moodle Web Service User Token:
            </label>
            <input
              type="password"
              value={userToken}
              onChange={(e) => setUserToken(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
            />
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-amber-500/50 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 font-mono text-[11px] font-bold">
                  {course.shortname}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                  {course.fullname}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shrink-0">
                {course.completionRate}% Tiến độ
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center text-xs">
              <div>
                <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                  {course.studentCount}
                </div>
                <div className="text-[11px] text-slate-500">Học sinh</div>
              </div>
              <div>
                <div className="font-extrabold text-amber-600 dark:text-amber-400 text-sm">
                  {course.assignmentsCount}
                </div>
                <div className="text-[11px] text-slate-500">Bài nộp Moodle</div>
              </div>
              <div>
                <div className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                  100%
                </div>
                <div className="text-[11px] text-slate-500">Đã chấm AI</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-500">Danh mục: <strong>{course.category}</strong></span>
              <a
                href={`${serverUrl.replace('/webservice/rest/server.php', '')}/course/view.php?id=${course.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold hover:underline"
              >
                <span>Mở trong Moodle</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
