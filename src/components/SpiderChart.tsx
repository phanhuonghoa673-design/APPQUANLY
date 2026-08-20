import React, { useState } from "react";

interface SpiderChartProps {
  data: {
    logic: number;
    creativity: number;
    collaboration: number;
    autonomy: number;
    communication: number;
    digital: number;
  };
  benchmarkData?: {
    logic: number;
    creativity: number;
    collaboration: number;
    autonomy: number;
    communication: number;
    digital: number;
  };
  title?: string;
  size?: number;
  showLabels?: boolean;
}

const AXES = [
  { key: "logic", label: "Tư duy Logic" },
  { key: "creativity", label: "Sáng tạo" },
  { key: "collaboration", label: "Hợp tác" },
  { key: "autonomy", label: "Tự chủ" },
  { key: "communication", label: "Giao tiếp" },
  { key: "digital", label: "Kỹ năng Số" },
];

export const SpiderChart: React.FC<SpiderChartProps> = ({
  data,
  benchmarkData,
  title = "Biểu đồ Mạng nhện 6 Năng lực Cốt lõi",
  size = 300,
  showLabels = true,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const center = size / 2;
  const radius = size * 0.36;
  const numAxes = AXES.length;
  const angleStep = (Math.PI * 2) / numAxes;

  // Calculate polygon points for value
  const getCoordinates = (value: number, index: number) => {
    const r = (value / 100) * radius;
    // Rotate so first axis points straight up (-PI/2)
    const angle = index * angleStep - Math.PI / 2;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const currentPoints = AXES.map((axis, i) => {
    const val = data[axis.key as keyof typeof data] || 0;
    const { x, y } = getCoordinates(val, i);
    return `${x},${y}`;
  }).join(" ");

  const benchmarkPoints = benchmarkData
    ? AXES.map((axis, i) => {
        const val = benchmarkData[axis.key as keyof typeof benchmarkData] || 0;
        const { x, y } = getCoordinates(val, i);
        return `${x},${y}`;
      }).join(" ")
    : null;

  // Grid concentric rings at 25%, 50%, 75%, 100%
  const rings = [0.25, 0.5, 0.75, 1];

  // Calculate overall average score
  const scores = AXES.map((a) => data[a.key as keyof typeof data] || 0);
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  return (
    <div className="flex flex-col items-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm transition-all">
      {title && (
        <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              {title}
            </span>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">
            TB: {avgScore} điểm
          </span>
        </div>
      )}

      <div className="relative">
        <svg width={size} height={size} className="overflow-visible select-none">
          {/* Background concentric polygons */}
          {rings.map((ringScale, idx) => {
            const ringPoints = AXES.map((_, i) => {
              const r = ringScale * radius;
              const angle = i * angleStep - Math.PI / 2;
              const x = center + r * Math.cos(angle);
              const y = center + r * Math.sin(angle);
              return `${x},${y}`;
            }).join(" ");

            return (
              <g key={idx}>
                <polygon
                  points={ringPoints}
                  fill={idx === rings.length - 1 ? "rgba(99, 102, 241, 0.03)" : "none"}
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-800"
                  strokeWidth={1}
                  strokeDasharray={idx < 3 ? "3 3" : undefined}
                />
                {/* Level indicator text */}
                <text
                  x={center + 3}
                  y={center - ringScale * radius + 10}
                  className="text-[9px] fill-slate-400 dark:fill-slate-600 font-mono font-semibold"
                >
                  {Math.round(ringScale * 100)}%
                </text>
              </g>
            );
          })}

          {/* Axis spokes */}
          {AXES.map((axis, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);

            // Label placement with offset
            const labelRadius = radius + 24;
            const lx = center + labelRadius * Math.cos(angle);
            const ly = center + labelRadius * Math.sin(angle);

            const value = data[axis.key as keyof typeof data] || 0;
            const isHovered = hoveredIndex === i;

            return (
              <g
                key={axis.key}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                <line
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="currentColor"
                  className={isHovered ? "text-indigo-500" : "text-slate-200 dark:text-slate-800"}
                  strokeWidth={isHovered ? 2 : 1}
                />
                {showLabels && (
                  <text
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`text-[10px] font-bold transition-all ${
                      isHovered
                        ? "fill-indigo-600 dark:fill-indigo-400 text-xs scale-110"
                        : "fill-slate-700 dark:fill-slate-300"
                    }`}
                  >
                    {axis.label}
                    <tspan
                      x={lx}
                      dy="11"
                      className="font-bold fill-indigo-600 dark:fill-indigo-400 text-[9px]"
                    >
                      ({value}đ)
                    </tspan>
                  </text>
                )}
              </g>
            );
          })}

          {/* Benchmark Area if provided */}
          {benchmarkPoints && (
            <polygon
              points={benchmarkPoints}
              fill="rgba(148, 163, 184, 0.15)"
              stroke="#94a3b8"
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
          )}

          {/* Current Student Area */}
          <polygon
            points={currentPoints}
            fill="rgba(79, 70, 229, 0.3)"
            stroke="#4f46e5"
            strokeWidth={2.5}
            className="transition-all duration-300 hover:fill-indigo-500/40"
          />

          {/* Value Points Nodes */}
          {AXES.map((axis, i) => {
            const val = data[axis.key as keyof typeof data] || 0;
            const { x, y } = getCoordinates(val, i);
            const isHovered = hoveredIndex === i;

            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 7 : 4.5}
                  className="fill-white stroke-indigo-600 stroke-2 transition-all duration-200 shadow-md"
                />
                {isHovered && (
                  <circle
                    cx={x}
                    cy={y}
                    r={12}
                    className="fill-indigo-500/20 animate-ping"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend & Hover Info Box */}
      <div className="w-full mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-indigo-600/80 inline-block"></span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">Học sinh</span>
          </div>
          {benchmarkData && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-slate-300 border border-dashed border-slate-400 inline-block"></span>
              <span className="text-slate-500 dark:text-slate-400">Trung bình Khối</span>
            </div>
          )}
        </div>

        {hoveredIndex !== null ? (
          <div className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold text-[11px] animate-fadeIn">
            {AXES[hoveredIndex].label}: {data[AXES[hoveredIndex].key as keyof typeof data]}đ
          </div>
        ) : (
          <div className="text-slate-400 italic text-[10px]">
            Rê chuột vào đỉnh để xem chi tiết
          </div>
        )}
      </div>
    </div>
  );
};
