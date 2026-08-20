import React, { useRef, useEffect, useState } from "react";
import { Sparkles, Play, Pause, RefreshCw, Sliders, Cpu } from "lucide-react";

export const AlgorithmicCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [frequency, setFrequency] = useState(3);
  const [amplitude, setAmplitude] = useState(80);
  const [speed, setSpeed] = useState(0.02);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = "rgba(99, 102, 241, 0.08)";
      ctx.lineWidth = 1;
      const step = 30;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Algorithmic Lissajous Math Wave
      ctx.beginPath();
      ctx.lineWidth = 3;
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "#818cf8");
      gradient.addColorStop(0.5, "#c084fc");
      gradient.addColorStop(1, "#38bdf8");
      ctx.strokeStyle = gradient;

      const centerY = canvas.height / 2;
      for (let x = 0; x < canvas.width; x += 2) {
        const y =
          centerY +
          Math.sin((x * frequency * 0.01) + phase) * amplitude +
          Math.cos((x * 0.005) + phase * 0.5) * (amplitude * 0.3);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      if (isPlaying) {
        phase += speed;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [frequency, amplitude, speed, isPlaying]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-violet-950 via-purple-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-purple-400/20 text-purple-300 border border-purple-400/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Algorithmic Art &amp; p5.js STEM Canvas
              </span>
              <span className="px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 text-xs font-semibold">
                Toán Học Trực Quan
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Phòng Thí Nghiệm Sáng Tạo Thuật Toán &amp; Đồ Họa Toán Học
            </h1>
            <p className="text-sm text-purple-100/80 leading-relaxed">
              Mô phỏng sóng đồ thị hàm số lượng giác Lissajous, thuật toán sinh hình học và góc sáng tạo STEM dành cho học sinh.
            </p>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition-all active:scale-95"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? "Tạm Dừng Mô Phỏng" : "Tiếp Tục Chạy"}</span>
          </button>
        </div>
      </div>

      {/* Canvas & Control Sliders */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-2">
          <canvas
            ref={canvasRef}
            width={700}
            height={360}
            className="w-full h-auto rounded-xl select-none"
          />
        </div>

        {/* Sliders */}
        <div className="space-y-5 text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white text-sm">
            <Sliders className="w-4 h-4 text-purple-500" />
            <span>Điều Chỉnh Tần Số &amp; Biên Độ Sóng</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <span>Tần số (Frequency):</span>
              <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">{frequency}</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={0.5}
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full accent-purple-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <span>Biên độ (Amplitude):</span>
              <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">{amplitude}px</span>
            </div>
            <input
              type="range"
              min={20}
              max={140}
              value={amplitude}
              onChange={(e) => setAmplitude(Number(e.target.value))}
              className="w-full accent-purple-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <span>Tốc độ lan truyền:</span>
              <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">{speed.toFixed(3)}</span>
            </div>
            <input
              type="range"
              min={0.005}
              max={0.08}
              step={0.005}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-purple-600"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-500/30 text-purple-900 dark:text-purple-200 text-[11px] leading-relaxed">
            💡 <strong>Phương trình sóng lượng giác:</strong> y = A · sin(k·x + φ) + A/3 · cos(0.5·k·x + φ/2). Học sinh thay đổi tham số để trực quan hóa sự biến thiên của hàm số.
          </div>
        </div>
      </div>
    </div>
  );
};
