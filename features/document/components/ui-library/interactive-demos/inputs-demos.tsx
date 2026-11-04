'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Clock, Key, Eye, EyeOff, Check, Plus } from '@/components/icons';

// 1. Duration Picker
export function DurationPickerDemo() {
  const [minutes, setMinutes] = React.useState(45);
  const presets = [15, 30, 45, 60, 90, 120];

  return (
    <div className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-slate-600">
          <Clock className="size-4 text-[#0056FF]" />
          <span className="font-mono text-xs font-semibold">Selected Duration:</span>
        </div>
        <span className="rounded-full bg-[#E3E7FC] px-2.5 py-0.5 font-mono text-xs font-bold text-[#0056FF]">
          {minutes < 60
            ? `${minutes}m`
            : `${Math.floor(minutes / 60)}h ${minutes % 60 ? `${minutes % 60}m` : ''}`}
        </span>
      </div>

      {/* Preset Pills */}
      <div className="flex flex-wrap gap-1.5">
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setMinutes(p)}
            className={cn(
              'rounded-full border px-3 py-1 font-mono text-xs font-bold transition-all',
              minutes === p
                ? 'border-[#0056FF] bg-[#0056FF] text-white shadow-xs'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300',
            )}
          >
            {p < 60 ? `${p}m` : `${p / 60}h`}
          </button>
        ))}
      </div>

      {/* Fine-Tuning Stepper */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-2.5">
        <span className="font-sans text-xs text-slate-600">Custom Adjustment:</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMinutes(Math.max(5, minutes - 5))}
            className="flex size-7 items-center justify-center rounded-lg border border-slate-200 bg-white font-mono font-bold text-slate-700 hover:bg-slate-100"
          >
            -
          </button>
          <span className="min-w-[40px] text-center font-mono text-xs font-bold text-slate-900">
            {minutes}m
          </span>
          <button
            type="button"
            onClick={() => setMinutes(minutes + 5)}
            className="flex size-7 items-center justify-center rounded-lg border border-slate-200 bg-white font-mono font-bold text-slate-700 hover:bg-slate-100"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

// 2. Password Input with Live Strength Meter
export function PasswordInputDemo() {
  const [password, setPassword] = React.useState('SNPI@SecPass2026');
  const [show, setShow] = React.useState(false);

  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const score = [hasLength, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
  const strength = ['None', 'Weak', 'Fair', 'Good', 'Strong'][score] || 'None';
  const strengthColor =
    score <= 1
      ? 'bg-rose-500'
      : score === 2
        ? 'bg-amber-500'
        : score === 3
          ? 'bg-blue-500'
          : 'bg-emerald-500';

  return (
    <div className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 pr-10 font-mono text-xs font-semibold text-slate-900 transition-all focus:border-[#0056FF] focus:bg-white focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      {/* Strength Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between font-mono text-[10px] font-bold">
          <span className="text-slate-400">Strength:</span>
          <span className="text-slate-700">{strength}</span>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={cn(
                'h-1.5 rounded-full transition-all',
                score >= step ? strengthColor : 'bg-slate-100',
              )}
            />
          ))}
        </div>
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-2 gap-1.5 font-sans text-[11px]">
        {[
          { label: '8+ characters', met: hasLength },
          { label: 'Uppercase letter', met: hasUpper },
          { label: 'Number (0-9)', met: hasNumber },
          { label: 'Symbol (#$!@)', met: hasSpecial },
        ].map((c, i) => (
          <div
            key={i}
            className={cn(
              'flex items-center gap-1.5 font-medium',
              c.met ? 'text-emerald-700' : 'text-slate-400',
            )}
          >
            <Check className={cn('size-3.5', c.met ? 'text-emerald-600' : 'opacity-30')} />
            <span>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 6. Task List (Interactive Checklist with Animations)
export function TaskListDemo() {
  const [tasks, setTasks] = React.useState([
    { id: 1, title: 'Verify semester roster checksums', done: true },
    { id: 2, title: 'Export tuition ledger to Central Bank', done: true },
    { id: 3, title: 'Publish academic timetable revision', done: false },
    { id: 4, title: 'Synchronize RFID campus gate logs', done: false },
  ]);
  const [newTitle, setNewTitle] = React.useState('');

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: newTitle.trim(), done: false }]);
    setNewTitle('');
  };

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <span className="font-sans text-xs font-bold tracking-wider text-slate-800 uppercase">
          Interactive Task List
        </span>
        <span className="font-mono text-xs font-bold text-[#0056FF]">
          {doneCount} of {tasks.length} Done
        </span>
      </div>

      <div className="space-y-1.5">
        {tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            onClick={() => toggleTask(task.id)}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-all',
              task.done
                ? 'border-slate-100 bg-slate-50 text-slate-400'
                : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300',
            )}
          >
            <div
              className={cn(
                'flex size-5 shrink-0 items-center justify-center rounded-md border transition-all',
                task.done
                  ? 'border-[#0056FF] bg-[#0056FF] text-white'
                  : 'border-slate-300 bg-white',
              )}
            >
              {task.done && <Check className="size-3.5" />}
            </div>
            <span
              className={cn('flex-1 font-sans text-xs font-medium', task.done && 'line-through')}
            >
              {task.title}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={addTask} className="flex gap-2 pt-1">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add next operational task..."
          className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 font-sans text-xs text-slate-900 focus:border-[#0056FF] focus:bg-white focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center gap-1 rounded-xl bg-[#0056FF] px-3 py-1.5 font-sans text-xs font-bold text-white hover:bg-blue-700"
        >
          <Plus className="size-3.5" />
          <span>Add</span>
        </button>
      </form>
    </div>
  );
}
