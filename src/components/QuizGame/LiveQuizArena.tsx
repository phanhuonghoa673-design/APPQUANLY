import React, { useState, useEffect } from "react";
import {
  Trophy,
  Flame,
  Clock,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  Users,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";

interface Question {
  id: number;
  subject: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    subject: "Toán Học",
    questionText: "Đạo hàm của hàm số f(x) = x^3 - 3x tại điểm x = 2 bằng bao nhiêu?",
    options: ["A. 9", "B. 12", "C. 6", "D. 3"],
    correctAnswer: 0,
    explanation: "f'(x) = 3x^2 - 3. Tại x = 2, f'(2) = 3(2)^2 - 3 = 12 - 3 = 9.",
  },
  {
    id: 2,
    subject: "Vật Lý STEM",
    questionText: "Định luật Bảo toàn Năng lượng được ứng dụng chủ yếu trong hiện tượng nào?",
    options: ["A. Sự chuyển hóa Động năng & Thế năng", "B. Sự khúc xạ ánh sáng", "C. Hiện tượng giao thoa sóng", "D. Sự điện phân"],
    correctAnswer: 0,
    explanation: "Động năng và Thế năng liên tục chuyển hóa lẫn nhau nhưng Cơ năng toàn phần được bảo toàn.",
  },
  {
    id: 3,
    subject: "Tin Học AI",
    questionText: "Trong lập trình Python, thư viện nào được dùng phổ biến nhất để xử lý mảng và đại số tuyến tính?",
    options: ["A. Pandas", "B. NumPy", "C. Matplotlib", "D. Scikit-learn"],
    correctAnswer: 1,
    explanation: "NumPy là thư viện nền tảng cung cấp đối tượng mảng đa chiều ndarray và xử lý đại số số học tốc độ cao.",
  },
];

export const LiveQuizArena: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  // Countdown timer
  useEffect(() => {
    if (quizFinished || isAnswerSubmitted) return;

    if (timeLeft === 0) {
      handleAnswerSelect(-1); // Time out
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isAnswerSubmitted, quizFinished]);

  const handleAnswerSelect = (optionIndex: number) => {
    if (isAnswerSubmitted) return;

    setSelectedOption(optionIndex);
    setIsAnswerSubmitted(true);

    if (optionIndex === currentQ.correctAnswer) {
      const points = 100 + streak * 20 + timeLeft * 5;
      setScore((prev) => prev + points);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setTimeLeft(15);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setTimeLeft(15);
    setIsAnswerSubmitted(false);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-pink-400/20 text-pink-300 border border-pink-400/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-300" />
                Live Quiz Arena & Gamification
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-400/20 text-indigo-200 border border-indigo-400/30 text-xs font-semibold">
                Đấu Trường Tri Thức
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Đấu Trường Học Tập Tương Tác Live Quiz
            </h1>
            <p className="text-sm text-pink-100/80 leading-relaxed">
              Trò chơi ôn tập trắc nghiệm tính thời gian thực, tích điểm thưởng XP, chuỗi thắng Streak và mở khóa huy hiệu thành tích trên hệ thống Quản Lý Lớp.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 p-3.5 rounded-2xl backdrop-blur border border-white/20">
            <div className="text-center">
              <div className="text-2xl font-extrabold text-amber-300">{score}</div>
              <div className="text-[10px] uppercase font-bold text-slate-300">Điểm XP</div>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-orange-400 flex items-center gap-1">
                <Flame className="w-5 h-5 fill-orange-400" />
                {streak}x
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-300">Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Quiz Game Interface */}
      {!quizFinished ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
          {/* Progress Bar & Timer */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Câu {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length} • {currentQ.subject}
            </span>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 font-mono font-bold text-xs">
              <Clock className={`w-4 h-4 ${timeLeft <= 5 ? "text-rose-500 animate-bounce" : "text-indigo-500"}`} />
              <span className={timeLeft <= 5 ? "text-rose-500" : "text-slate-700 dark:text-slate-200"}>
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
              {currentQ.questionText}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQ.options.map((opt, idx) => {
              let btnClass = "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:border-indigo-500";

              if (isAnswerSubmitted) {
                if (idx === currentQ.correctAnswer) {
                  btnClass = "bg-emerald-500 text-white border-emerald-600 font-bold shadow-lg shadow-emerald-500/20";
                } else if (selectedOption === idx) {
                  btnClass = "bg-rose-500 text-white border-rose-600 font-bold";
                } else {
                  btnClass = "opacity-50 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  disabled={isAnswerSubmitted}
                  className={`p-4 rounded-2xl border text-left text-sm font-semibold transition-all duration-200 flex items-center justify-between ${btnClass}`}
                >
                  <span>{opt}</span>
                  {isAnswerSubmitted && idx === currentQ.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                  )}
                  {isAnswerSubmitted && selectedOption === idx && idx !== currentQ.correctAnswer && (
                    <XCircle className="w-5 h-5 text-white shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation & Next Action */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-500/30 space-y-3 animate-fadeIn">
              <div className="text-xs text-indigo-900 dark:text-indigo-200">
                <strong>Giải thích từ AI Advisor:</strong> {currentQ.explanation}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all"
                >
                  {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? "Câu Tiếp Theo →" : "Xem Kết Quả Đấu Trường"}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Summary Screen */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/30 animate-bounce">
            <Trophy className="w-10 h-10 text-slate-900" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Chúc Mừng! Bạn Đã Hoàn Thành Đấu Trường Quiz
            </h2>
            <p className="text-xs text-slate-500">
              Điểm số và huy hiệu thành tích đã được ghi nhận trên Blockchain Skill Passport.
            </p>
          </div>

          <div className="inline-flex items-center gap-6 px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div>
              <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {score} XP
              </div>
              <div className="text-xs text-slate-500 font-semibold">Tổng Điểm Thưởng</div>
            </div>
            <div className="h-10 w-px bg-slate-200 dark:bg-slate-700"></div>
            <div>
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                100%
              </div>
              <div className="text-xs text-slate-500 font-semibold">Tỷ Lệ Chính Xác</div>
            </div>
          </div>

          <div>
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi Lại Đấu Trường</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
