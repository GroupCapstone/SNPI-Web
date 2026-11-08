'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { GeometricButton } from './geometric-tag-primitives';

export interface DualModeSystemUIProps {
  className?: string;
}

// Weather Icon Component (Pure SVG Vector Paths, Zero Emojis)
function WeatherIcon({ type, isDark }: { type: 'rain' | 'cloud'; isDark?: boolean }) {
  const strokeColor = isDark ? '#FFFFFF' : '#0F172A';
  if (type === 'rain') {
    return (
      <svg
        className="size-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M16 14v6" />
        <path d="M8 14v6" />
        <path d="M12 16v6" />
      </svg>
    );
  }
  return (
    <svg
      className="size-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function MiniWeatherIcon({ type, isDark }: { type: string; isDark?: boolean }) {
  const strokeColor = isDark ? '#94A3B8' : '#64748B';
  if (type === 'rain') {
    return (
      <svg
        className="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M16 15v3" />
        <path d="M8 15v3" />
        <path d="M12 17v3" />
      </svg>
    );
  }
  return (
    <svg
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

export function DualModeSystemUI({ className }: DualModeSystemUIProps) {
  // Interactive widget states
  const [selectedHour, setSelectedHour] = React.useState<string>('4 PM');
  const [completedEvents, setCompletedEvents] = React.useState<Record<string, boolean>>({});
  const [activeView, setActiveView] = React.useState<'side-by-side' | 'light' | 'dark'>(
    'side-by-side',
  );
  const [progressPercent, setProgressPercent] = React.useState<number>(31);

  const hourlyForecast = [
    { time: '4 PM', icon: 'rain', temp: '23°' },
    { time: '5 PM', icon: 'rain', temp: '22°' },
    { time: '6 PM', icon: 'rain', temp: '21°' },
    { time: '7 PM', icon: 'cloud', temp: '21°' },
    { time: '8 PM', icon: 'cloud', temp: '21°' },
    { time: '9 PM', icon: 'cloud', temp: '21°' },
  ];

  const events = [
    {
      id: 'event-1',
      title: 'Meeting with Jen',
      category: 'Work',
      time: '9:00 AM',
      endTime: '10:30 AM',
    },
    {
      id: 'event-2',
      title: 'Dental appointment',
      category: 'Personal',
      time: '2:00 PM',
      endTime: '2:30 PM',
    },
  ];

  const toggleEvent = (id: string) => {
    setCompletedEvents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 48 Dots Matrix (4 rows of 12)
  const totalDots = 48;
  const filledDotsCount = Math.round((progressPercent / 100) * totalDots);

  return (
    <div className={cn('space-y-6', className)}>
      {/* View Switcher Ribbon (Default Corner, Zero Glow, Zero Shadows) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <span className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
            SPECIFICATION BLUEPRINT
          </span>
          <h3 className="font-sans text-lg font-black text-slate-950 sm:text-xl">
            Dual Mode System UI (Light & Dark)
          </h3>
        </div>

        <div className="flex items-center gap-2 font-sans text-xs">
          <GeometricButton
            size="sm"
            variant={activeView === 'side-by-side' ? 'blue' : 'outline'}
            isActive={activeView === 'side-by-side'}
            onClick={() => setActiveView('side-by-side')}
          >
            Side by Side
          </GeometricButton>
          <GeometricButton
            size="sm"
            variant={activeView === 'light' ? 'blue' : 'outline'}
            isActive={activeView === 'light'}
            onClick={() => setActiveView('light')}
          >
            Light Only
          </GeometricButton>
          <GeometricButton
            size="sm"
            variant={activeView === 'dark' ? 'blue' : 'outline'}
            isActive={activeView === 'dark'}
            onClick={() => setActiveView('dark')}
          >
            Dark Only
          </GeometricButton>
        </div>
      </div>

      <p className="font-sans text-xs leading-relaxed text-slate-600 sm:text-sm">
        High-fidelity manifestation of the second-mode Dark UI architecture alongside Light Mode.
        Adheres strictly to zero glow and zero blur shadows policy. Border radius is locked to
        default 90-degree square corners per instructions. Tap any widget element to inspect live
        interaction.
      </p>

      {/* Grid: Light vs Dark Widgets (Matching Image 2) */}
      <div
        className={cn(
          'grid gap-8',
          activeView === 'side-by-side' && 'grid-cols-1 lg:grid-cols-2',
          activeView === 'light' && 'mx-auto max-w-lg grid-cols-1',
          activeView === 'dark' && 'mx-auto max-w-lg grid-cols-1',
        )}
      >
        {/* ===================== COLUMN 1: LIGHT MODE ===================== */}
        {(activeView === 'side-by-side' || activeView === 'light') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 font-mono text-xs">
              <span className="font-bold tracking-wider text-slate-900 uppercase">
                Light Mode System UI
              </span>
              <span className="text-slate-500">Surface: #FFFFFF / Border: #E2E8F0</span>
            </div>

            {/* Widget 1: Weather (Light) */}
            <div className="rounded-none border border-slate-200 bg-white p-5 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <WeatherIcon type="rain" />
                  <span className="font-sans text-3xl font-bold tracking-tight text-slate-900">
                    23°
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-sans text-sm font-bold text-slate-900">Rain</div>
                  <div className="font-sans text-xs text-slate-500">Singapore</div>
                </div>
              </div>

              {/* Hourly Forecast */}
              <div className="mt-6 grid grid-cols-6 gap-2 border-t border-slate-100 pt-4 text-center">
                {hourlyForecast.map((h) => {
                  const isSelected = selectedHour === h.time;
                  return (
                    <button
                      key={h.time}
                      type="button"
                      onClick={() => setSelectedHour(h.time)}
                      className={cn(
                        'flex flex-col items-center gap-1.5 rounded-none p-1 transition-colors select-none',
                        isSelected
                          ? 'bg-slate-100 font-bold text-[#0056FF]'
                          : 'text-slate-600 hover:bg-slate-50',
                      )}
                    >
                      <span className="font-mono text-[10px] text-slate-500">{h.time}</span>
                      <MiniWeatherIcon type={h.icon} />
                      <span className="font-mono text-xs">{h.temp}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Widget 2: Today Events Schedule (Light) */}
            <div className="rounded-none border border-slate-200 bg-white p-5 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-sans text-base font-bold text-slate-900">Today</span>
                <span className="font-mono text-xs font-semibold text-slate-500">4 events</span>
              </div>

              <div className="mt-4 space-y-3">
                {events.map((ev) => {
                  const isDone = Boolean(completedEvents[ev.id]);
                  return (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => toggleEvent(ev.id)}
                      className="group flex w-full items-center justify-between text-left transition-colors select-none"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={cn(
                            'mt-0.5 h-8 w-[3px] rounded-none transition-colors',
                            isDone ? 'bg-slate-300' : 'bg-slate-900',
                          )}
                        />
                        <div>
                          <div
                            className={cn(
                              'font-sans text-sm font-semibold transition-colors',
                              isDone ? 'text-slate-400 line-through' : 'text-slate-900',
                            )}
                          >
                            {ev.title}
                          </div>
                          <div className="font-sans text-xs text-slate-500">{ev.category}</div>
                        </div>
                      </div>

                      <div className="text-right font-mono text-xs text-slate-500">
                        <div>{ev.time}</div>
                        <div>{ev.endTime}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Widget 3: Year Progress Matrix (Light) */}
            <div className="rounded-none border border-slate-200 bg-white p-5 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-sans text-base font-bold text-slate-900">Year</span>
                <span className="font-mono text-sm font-bold text-slate-900">
                  {progressPercent}%
                </span>
              </div>

              <div className="mt-4 grid grid-cols-12 gap-2">
                {Array.from({ length: totalDots }).map((_, idx) => {
                  const isFilled = idx < filledDotsCount;
                  return (
                    <button
                      key={`dot-light-${idx}`}
                      type="button"
                      onClick={() => setProgressPercent(Math.round(((idx + 1) / totalDots) * 100))}
                      title={`Progress step ${idx + 1}/${totalDots}`}
                      className="flex h-5 w-5 items-center justify-center select-none"
                    >
                      <span
                        className={cn(
                          'h-2.5 w-2.5 rounded-[2px] transition-colors',
                          isFilled ? 'bg-slate-900' : 'bg-slate-200',
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===================== COLUMN 2: DARK MODE ===================== */}
        {(activeView === 'side-by-side' || activeView === 'dark') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2 font-mono text-xs">
              <span className="font-bold tracking-wider text-slate-200 uppercase">
                Dark Mode System UI
              </span>
              <span className="text-slate-400">Surface: #0B0E14 / Border: #1E232F</span>
            </div>

            {/* Widget 1: Weather (Dark) */}
            <div className="rounded-none border border-neutral-800 bg-[#0B0E14] p-5 text-white transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <WeatherIcon type="rain" isDark />
                  <span className="font-sans text-3xl font-bold tracking-tight text-white">
                    23°
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-sans text-sm font-bold text-white">Rain</div>
                  <div className="font-sans text-xs text-neutral-400">Singapore</div>
                </div>
              </div>

              {/* Hourly Forecast */}
              <div className="mt-6 grid grid-cols-6 gap-2 border-t border-neutral-800 pt-4 text-center">
                {hourlyForecast.map((h) => {
                  const isSelected = selectedHour === h.time;
                  return (
                    <button
                      key={h.time}
                      type="button"
                      onClick={() => setSelectedHour(h.time)}
                      className={cn(
                        'flex flex-col items-center gap-1.5 rounded-none p-1 transition-colors select-none',
                        isSelected
                          ? 'bg-neutral-800 font-bold text-[#60A5FA]'
                          : 'text-neutral-400 hover:bg-neutral-900',
                      )}
                    >
                      <span className="font-mono text-[10px] text-neutral-400">{h.time}</span>
                      <MiniWeatherIcon type={h.icon} isDark />
                      <span className="font-mono text-xs text-white">{h.temp}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Widget 2: Today Events Schedule (Dark) */}
            <div className="rounded-none border border-neutral-800 bg-[#0B0E14] p-5 text-white transition-colors">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="font-sans text-base font-bold text-white">Today</span>
                <span className="font-mono text-xs font-semibold text-neutral-400">4 events</span>
              </div>

              <div className="mt-4 space-y-3">
                {events.map((ev) => {
                  const isDone = Boolean(completedEvents[ev.id]);
                  return (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => toggleEvent(ev.id)}
                      className="group flex w-full items-center justify-between text-left transition-colors select-none"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={cn(
                            'mt-0.5 h-8 w-[3px] rounded-none transition-colors',
                            isDone ? 'bg-neutral-700' : 'bg-white',
                          )}
                        />
                        <div>
                          <div
                            className={cn(
                              'font-sans text-sm font-semibold transition-colors',
                              isDone ? 'text-neutral-500 line-through' : 'text-white',
                            )}
                          >
                            {ev.title}
                          </div>
                          <div className="font-sans text-xs text-neutral-400">{ev.category}</div>
                        </div>
                      </div>

                      <div className="text-right font-mono text-xs text-neutral-400">
                        <div>{ev.time}</div>
                        <div>{ev.endTime}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Widget 3: Year Progress Matrix (Dark) */}
            <div className="rounded-none border border-neutral-800 bg-[#0B0E14] p-5 text-white transition-colors">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="font-sans text-base font-bold text-white">Year</span>
                <span className="font-mono text-sm font-bold text-white">{progressPercent}%</span>
              </div>

              <div className="mt-4 grid grid-cols-12 gap-2">
                {Array.from({ length: totalDots }).map((_, idx) => {
                  const isFilled = idx < filledDotsCount;
                  return (
                    <button
                      key={`dot-dark-${idx}`}
                      type="button"
                      onClick={() => setProgressPercent(Math.round(((idx + 1) / totalDots) * 100))}
                      title={`Progress step ${idx + 1}/${totalDots}`}
                      className="flex h-5 w-5 items-center justify-center select-none"
                    >
                      <span
                        className={cn(
                          'h-2.5 w-2.5 rounded-[2px] transition-colors',
                          isFilled ? 'bg-white' : 'bg-neutral-800',
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
