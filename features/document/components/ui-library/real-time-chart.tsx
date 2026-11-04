'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Layers,
  Activity,
  Cpu,
  Database,
  Radio,
} from '@/components/icons';

// ============================================================================
// DATA STRUCTURES
// ============================================================================

export interface ChartSeries {
  id: string;
  name: string;
  color: string;
  glowColor: string;
  fillColorStart: string;
  fillColorEnd: string;
  unit: string;
  data: number[];
}

export interface RealTimeChartProps {
  theme?: 'light' | 'dark';
  height?: number;
  className?: string;
  pointsCount?: number;
}

// ============================================================================
// REAL-TIME CANVAS STREAMING CHART COMPONENT
// ============================================================================

// Static series configuration for legend and identity
const DEFAULT_SERIES_CONFIG = [
  { id: 'cpu', name: 'CPU / Node Ingress', color: '#0056FF', unit: '%' },
  { id: 'db', name: 'DB Throughput', color: '#10B981', unit: ' ops/s' },
  { id: 'mem', name: 'Heap Allocation', color: '#F59E0B', unit: ' MB' },
];

export function RealTimeChart({
  theme = 'light',
  height = 340,
  className,
  pointsCount = 45,
}: RealTimeChartProps) {
  const isDark = theme === 'dark';
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Streaming & interaction state
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const [speedMs, setSpeedMs] = React.useState<number>(1000);
  const [hoveredPoint, setHoveredPoint] = React.useState<{
    x: number;
    y: number;
    tooltipLeft: number;
    tooltipTop: number;
    index: number;
    timeLabel: string;
    values: { name: string; color: string; value: number; unit: string }[];
  } | null>(null);

  // Series data stored in ref to ensure 60fps render loop doesn't recreate arrays
  const seriesRef = React.useRef<ChartSeries[]>([
    {
      id: 'cpu',
      name: 'CPU / Node Ingress',
      color: '#0056FF',
      glowColor: isDark ? 'rgba(56, 189, 248, 0.65)' : 'rgba(0, 86, 255, 0.45)',
      fillColorStart: isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(0, 86, 255, 0.22)',
      fillColorEnd: isDark ? 'rgba(56, 189, 248, 0.00)' : 'rgba(0, 86, 255, 0.00)',
      unit: '%',
      data: Array.from({ length: pointsCount }, (_, i) => 42 + Math.sin(i * 0.4) * 16),
    },
    {
      id: 'db',
      name: 'DB Throughput',
      color: '#10B981',
      glowColor: 'rgba(16, 185, 129, 0.65)',
      fillColorStart: isDark ? 'rgba(16, 185, 129, 0.30)' : 'rgba(16, 185, 129, 0.20)',
      fillColorEnd: 'rgba(16, 185, 129, 0.00)',
      unit: ' ops/s',
      data: Array.from({ length: pointsCount }, (_, i) => 65 + Math.cos(i * 0.35) * 18),
    },
    {
      id: 'mem',
      name: 'Heap Allocation',
      color: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.65)',
      fillColorStart: isDark ? 'rgba(245, 158, 11, 0.25)' : 'rgba(245, 158, 11, 0.16)',
      fillColorEnd: 'rgba(245, 158, 11, 0.00)',
      unit: ' MB',
      data: Array.from({ length: pointsCount }, (_, i) => 28 + Math.sin(i * 0.25 + 1) * 12),
    },
  ]);

  // Track latest values for 08 Legend
  const [latestValues, setLatestValues] = React.useState<{ [key: string]: number }>({
    cpu: 45,
    db: 68,
    mem: 31,
  });

  // Ticking interval: push new data point and shift old point
  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const series = seriesRef.current;
      const newLatest: { [key: string]: number } = {};

      series.forEach((s) => {
        const last = s.data[s.data.length - 1];
        // Organic bounded random walk
        let delta = (Math.random() - 0.48) * 8;
        if (s.id === 'cpu') {
          delta += Math.sin(Date.now() / 1500) * 4;
        }
        const next = Math.max(10, Math.min(95, last + delta));
        s.data.push(Math.round(next * 10) / 10);
        if (s.data.length > pointsCount) {
          s.data.shift();
        }
        newLatest[s.id] = Math.round(next * 10) / 10;
      });

      setLatestValues(newLatest);
    }, speedMs);

    return () => clearInterval(interval);
  }, [isPaused, speedMs, pointsCount]);

  // Mouse hover tracking for 09 Crosshair and 10 Tooltip
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const paddingLeft = 45;
    const paddingRight = 20;
    const chartWidth = rect.width - paddingLeft - paddingRight;

    if (mouseX < paddingLeft || mouseX > rect.width - paddingRight) {
      setHoveredPoint(null);
      return;
    }

    const ratio = (mouseX - paddingLeft) / chartWidth;
    const index = Math.round(ratio * (pointsCount - 1));
    const clampedIndex = Math.max(0, Math.min(pointsCount - 1, index));

    const offsetSeconds = (pointsCount - 1 - clampedIndex) * (speedMs / 1000);
    const timeLabel = offsetSeconds === 0 ? 'Now' : `-${Math.round(offsetSeconds)}s`;

    const values = seriesRef.current.map((s) => ({
      name: s.name,
      color: s.color,
      value: s.data[clampedIndex] ?? 0,
      unit: s.unit,
    }));

    const tooltipLeft = Math.min(mouseX + 12, (rect.width || 600) - 180);
    const tooltipTop = Math.max(10, mouseY - 45);

    setHoveredPoint({
      x: mouseX,
      y: mouseY,
      tooltipLeft,
      tooltipTop,
      index: clampedIndex,
      timeLabel,
      values,
    });
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  // 60FPS Hardware-accelerated Canvas Rendering Loop
  React.useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // 01 Canvas Element: devicePixelRatio scaling
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const width = rect.width;
      const chartHeight = rect.height;
      const paddingLeft = 45;
      const paddingRight = 20;
      const paddingTop = 25;
      const paddingBottom = 35;
      const plotWidth = width - paddingLeft - paddingRight;
      const plotHeight = chartHeight - paddingTop - paddingBottom;

      // Clear Canvas
      ctx.clearRect(0, 0, width, chartHeight);

      // 02 Dot Grid: Subtle 40px interval dot pattern
      const dotSpacing = 40;
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
      for (let gx = paddingLeft; gx <= width - paddingRight; gx += dotSpacing) {
        for (let gy = paddingTop; gy <= chartHeight - paddingBottom; gy += dotSpacing) {
          ctx.beginPath();
          ctx.arc(gx, gy, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 03 Gridlines & 07 Axis Labels (Y-Axis: 0%, 25%, 50%, 75%, 100%)
      const yTicks = [0, 25, 50, 75, 100];
      ctx.font = '10px monospace';
      ctx.fillStyle = isDark ? 'rgba(148, 163, 184, 0.7)' : 'rgba(100, 116, 139, 0.8)';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      yTicks.forEach((tick) => {
        const y = paddingTop + plotHeight - (tick / 100) * plotHeight;

        // Dashed reference lines
        ctx.beginPath();
        ctx.setLineDash([4, 5]);
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.07)';
        ctx.moveTo(paddingLeft, y);
        ctx.lineTo(width - paddingRight, y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Label
        ctx.fillText(`${tick}%`, paddingLeft - 8, y);
      });

      // 07 Axis Labels (X-Axis: Time markers along bottom)
      const xTicksCount = 5;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      for (let i = 0; i <= xTicksCount; i++) {
        const ratio = i / xTicksCount;
        const x = paddingLeft + ratio * plotWidth;
        const secondsAgo = Math.round((1 - ratio) * (pointsCount * (speedMs / 1000)));
        const label = secondsAgo === 0 ? 'Now' : `-${secondsAgo}s`;

        ctx.fillText(label, x, chartHeight - paddingBottom + 8);
      }

      // Draw Series: 04 Bezier Curves, 05 Gradient Fills, 06 Glow Effects
      const seriesList = seriesRef.current;

      seriesList.forEach((series) => {
        const points = series.data.map((val, idx) => {
          const x = paddingLeft + (idx / (pointsCount - 1)) * plotWidth;
          const y = paddingTop + plotHeight - (val / 100) * plotHeight;
          return { x, y };
        });

        if (points.length < 2) return;

        // Path generator using cubic midpoint Bezier curves
        const createSmoothPath = (targetCtx: CanvasRenderingContext2D) => {
          targetCtx.beginPath();
          targetCtx.moveTo(points[0].x, points[0].y);

          for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i];
            const p1 = points[i + 1];
            const midX = (p0.x + p1.x) / 2;
            const midY = (p0.y + p1.y) / 2;
            targetCtx.quadraticCurveTo(p0.x, p0.y, midX, midY);
          }

          const lastPoint = points[points.length - 1];
          targetCtx.lineTo(lastPoint.x, lastPoint.y);
        };

        // 05 Gradient Fill
        ctx.save();
        createSmoothPath(ctx);
        const lastPoint = points[points.length - 1];
        ctx.lineTo(lastPoint.x, paddingTop + plotHeight);
        ctx.lineTo(points[0].x, paddingTop + plotHeight);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, paddingTop, 0, paddingTop + plotHeight);
        grad.addColorStop(0, series.fillColorStart);
        grad.addColorStop(1, series.fillColorEnd);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();

        // 06 Glow Effects & 04 Bezier Line Stroke
        ctx.save();
        ctx.shadowColor = series.glowColor;
        ctx.shadowBlur = 10;
        ctx.strokeStyle = series.color;
        ctx.lineWidth = 2.4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        createSmoothPath(ctx);
        ctx.stroke();
        ctx.restore();

        // End Pulse Dot
        const endDot = points[points.length - 1];
        ctx.save();
        ctx.beginPath();
        ctx.arc(endDot.x, endDot.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = series.color;
        ctx.shadowColor = series.glowColor;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
      });

      // 09 Crosshair: Vertical tracking line & snapped intersection dots
      if (hoveredPoint) {
        const snapX = paddingLeft + (hoveredPoint.index / (pointsCount - 1)) * plotWidth;

        // Vertical tracking crosshair
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.6)' : 'rgba(0, 86, 255, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.moveTo(snapX, paddingTop);
        ctx.lineTo(snapX, paddingTop + plotHeight);
        ctx.stroke();
        ctx.restore();

        // Snap dots for each series
        seriesList.forEach((s) => {
          const val = s.data[hoveredPoint.index] ?? 0;
          const snapY = paddingTop + plotHeight - (val / 100) * plotHeight;

          ctx.save();
          ctx.beginPath();
          ctx.arc(snapX, snapY, 5, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.strokeStyle = isDark ? '#000B26' : '#ffffff';
          ctx.lineWidth = 2;
          ctx.shadowColor = s.glowColor;
          ctx.shadowBlur = 14;
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        });
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDark, hoveredPoint, pointsCount, speedMs]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full border-slate-200 bg-white p-5 shadow-xs transition-colors select-none max-sm:rounded-none max-sm:border-x-0 max-sm:border-y sm:rounded-2xl sm:border',
        className,
      )}
    >
      {/* Chart Header & 08 Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Activity className="size-4 shrink-0 text-[#0056FF]" />
            <h3 className="font-sans text-sm font-bold text-slate-900">
              Real-Time Metrics Telemetry
            </h3>
            {isPaused && (
              <span className="rounded-[4px] border border-amber-500/30 bg-amber-50 px-2 py-0.5 font-mono text-[9px] font-bold text-amber-700">
                PAUSED
              </span>
            )}
          </div>
          <p className="font-sans text-xs text-slate-500">
            60fps Canvas streaming engine &middot; Click canvas to pause/resume
          </p>
        </div>

        {/* 08 Legend: Color swatches & live values */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          {DEFAULT_SERIES_CONFIG.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2 rounded-[4px] border border-slate-200 bg-slate-50 px-2.5 py-1 transition-colors"
            >
              <span
                className="size-2 rounded-full shadow-xs"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-[11px] text-slate-500">{s.name}:</span>
              <span className="font-bold text-slate-900">
                {latestValues[s.id] ?? 0}
                {s.unit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative mt-3 cursor-crosshair">
        <canvas
          ref={canvasRef}
          onClick={() => setIsPaused(!isPaused)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ width: '100%', height: `${height}px` }}
          className="block w-full touch-none"
        />

        {/* 10 Tooltip: Floating data card snapped to crosshair */}
        {hoveredPoint && (
          <div
            style={{
              left: `${hoveredPoint.tooltipLeft}px`,
              top: `${hoveredPoint.tooltipTop}px`,
            }}
            className={cn(
              'pointer-events-none absolute z-20 w-44 rounded-[4px] border border-[#CAD3F5] bg-white p-2.5 text-slate-900 shadow-none transition-all duration-75',
            )}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 font-mono text-[10px] dark:border-slate-800">
              <span className="text-slate-400">TIMELINE:</span>
              <span className="font-bold text-[#0056FF] dark:text-[#38BDF8]">
                {hoveredPoint.timeLabel}
              </span>
            </div>

            <div className="mt-2 space-y-1.5">
              {hoveredPoint.values.map((v, i) => (
                <div key={i} className="flex items-center justify-between font-mono text-xs">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: v.color }}
                    />
                    <span className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                      {v.name.split('/')[0]}
                    </span>
                  </div>
                  <span className="font-bold">
                    {v.value}
                    {v.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Control Footer */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className={cn(
              'flex items-center gap-1.5 rounded-[4px] border px-3 py-1 font-bold transition-colors',
              isPaused
                ? 'border-emerald-500/30 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100',
            )}
          >
            {isPaused ? <Play className="size-3" /> : <Pause className="size-3" />}
            <span>{isPaused ? 'Resume Stream' : 'Pause Stream'}</span>
          </button>

          <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
            <span className="text-[11px] text-slate-400">RATE:</span>
            {[500, 1000, 2000].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => setSpeedMs(rate)}
                className={cn(
                  'rounded-[4px] px-2 py-0.5 text-[10px] font-bold transition-colors',
                  speedMs === rate
                    ? 'bg-[#0056FF] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                )}
              >
                {rate === 500 ? '2x' : rate === 1000 ? '1x' : '0.5x'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <Radio className="size-3 text-[#0056FF]" />
          <span>Canvas 60fps &middot; Zero Libs</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// INTERACTIVE DOCUMENTATION DEMO: RealTimeChartDemo
// ============================================================================

export function RealTimeChartDemo() {
  return (
    <div className="w-full space-y-6">
      {/* Control Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
            Telemetry Feed:
          </span>
          <span className="inline-flex items-center rounded-[4px] border border-blue-200 bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
            LIVE 60FPS
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs text-slate-500">
          <Sparkles className="size-3.5 text-[#0056FF]" />
          <span>Hardware Canvas Rendering &middot; Zero D3 / Chart.js</span>
        </div>
      </div>

      {/* The Real-Time Chart Instance */}
      <RealTimeChart theme="light" height={340} />

      {/* 10 Architectural Feature Badges */}
      <div className="grid grid-cols-2 gap-2.5 text-center font-mono text-[11px] sm:grid-cols-5">
        <div className="rounded-[4px] border border-slate-200 bg-white p-2 shadow-2xs">
          <span className="text-slate-400">01</span>
          <p className="font-bold text-slate-700">Canvas Surface</p>
        </div>
        <div className="rounded-[4px] border border-slate-200 bg-white p-2 shadow-2xs">
          <span className="text-slate-400">02</span>
          <p className="font-bold text-slate-700">40px Linear Grid</p>
        </div>
        <div className="rounded-[4px] border border-slate-200 bg-white p-2 shadow-2xs">
          <span className="text-slate-400">03</span>
          <p className="font-bold text-slate-700">Dashed Lines</p>
        </div>
        <div className="rounded-[4px] border border-slate-200 bg-white p-2 shadow-2xs">
          <span className="text-slate-400">04</span>
          <p className="font-bold text-slate-700">Bezier Splines</p>
        </div>
        <div className="rounded-[4px] border border-slate-200 bg-white p-2 shadow-2xs">
          <span className="text-slate-400">05</span>
          <p className="font-bold text-slate-700">Gradient Fills</p>
        </div>
        <div className="rounded-[4px] border border-slate-200 bg-white p-2 shadow-2xs">
          <span className="text-slate-400">06</span>
          <p className="font-bold text-slate-700">Glow Halos</p>
        </div>
        <div className="rounded-[4px] border border-slate-200 bg-white p-2 shadow-2xs">
          <span className="text-slate-400">07</span>
          <p className="font-bold text-slate-700">Dynamic Axes</p>
        </div>
        <div className="rounded-[4px] border border-slate-200 bg-white p-2 shadow-2xs">
          <span className="text-slate-400">08</span>
          <p className="font-bold text-slate-700">Live Legend</p>
        </div>
        <div className="rounded-[4px] border border-slate-200 bg-white p-2 shadow-2xs">
          <span className="text-slate-400">09</span>
          <p className="font-bold text-slate-700">Crosshair Snap</p>
        </div>
        <div className="rounded-[4px] border border-slate-200 bg-white p-2 shadow-2xs">
          <span className="text-slate-400">10</span>
          <p className="font-bold text-slate-700">Float Tooltip</p>
        </div>
      </div>
    </div>
  );
}
