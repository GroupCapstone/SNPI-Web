'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Clock, Eye, EyeOff, Check, Plus } from '@/components/icons';
import {
  WHILE_TAP_SCALE,
  MOTION_EASE_OUT,
  successPulseVariants,
  listRowVariants,
  listContainerVariants,
  iconCrossfadeBlurVariants,
} from '@/lib/motion';

// 1. Duration Picker with Motion Law 4: Scale 0.97 on press & Ease-out
export function DurationPickerDemo() {
  const [minutes, setMinutes] = React.useState(45);
  const presets = [15, 30, 45, 60, 90, 120];

  return (
    <div className="w-full max-w-md space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5 shadow-xs">
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

      {/* Preset Pills with Motion Law 4: Scale 0.97 on press */}
      <div className="flex flex-wrap gap-1.5">
        {presets.map((p) => (
          <motion.button
            key={p}
            type="button"
            whileTap={{ scale: WHILE_TAP_SCALE }}
            onClick={() => setMinutes(p)}
            className={cn(
              'rounded-full border px-3 py-1 font-mono text-xs font-bold transition-colors',
              minutes === p
                ? 'border-[#0056FF] bg-[#0056FF] text-white shadow-xs'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300',
            )}
          >
            {p < 60 ? `${p}m` : `${p / 60}h`}
          </motion.button>
        ))}
      </div>

      {/* Fine-Tuning Stepper with Motion Law 4 */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-2.5">
        <span className="font-sans text-xs text-slate-600">Custom Adjustment:</span>
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: WHILE_TAP_SCALE }}
            onClick={() => setMinutes(Math.max(5, minutes - 5))}
            className="flex size-7 items-center justify-center rounded-lg border border-slate-200 bg-white font-mono font-bold text-slate-700 hover:bg-slate-100"
          >
            -
          </motion.button>
          <span className="min-w-[40px] text-center font-mono text-xs font-bold text-slate-900">
            {minutes}m
          </span>
          <motion.button
            type="button"
            whileTap={{ scale: WHILE_TAP_SCALE }}
            onClick={() => setMinutes(minutes + 5)}
            className="flex size-7 items-center justify-center rounded-lg border border-slate-200 bg-white font-mono font-bold text-slate-700 hover:bg-slate-100"
          >
            +
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// 2. Password Input with Live Strength Meter & Motion Law 18: Icon Blur Crossfade
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
    <div className="w-full max-w-md space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5 shadow-xs">
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="h-11 w-full rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF] px-4 pr-12 font-sans text-sm font-medium text-[#020617] transition-colors focus:border-[#0056FF] focus:bg-white focus:outline-none"
        />
        {/* Motion Law 18: Crossfade Icons + Blur */}
        <motion.button
          type="button"
          whileTap={{ scale: WHILE_TAP_SCALE }}
          onClick={() => setShow(!show)}
          className="absolute top-1/2 right-1 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[4px] text-[#020617] transition-colors hover:bg-[#E3E7FC]"
        >
          <AnimatePresence mode="wait">
            {show ? (
              <motion.div
                key="eye-off"
                variants={iconCrossfadeBlurVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <EyeOff className="size-5" />
              </motion.div>
            ) : (
              <motion.div
                key="eye-on"
                variants={iconCrossfadeBlurVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Eye className="size-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
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
                'h-1.5 rounded-full transition-all duration-200',
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
              'flex items-center gap-1.5 font-medium transition-colors duration-150',
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

// 6. Task List (Interactive Checklist with Animations applying Laws 1, 3, 4, 8, 15)
export function TaskListDemo() {
  const [tasks, setTasks] = React.useState([
    { id: 1, title: 'Verify semester roster checksums', done: true },
    { id: 2, title: 'Export tuition ledger to Central Bank', done: true },
    { id: 3, title: 'Publish academic timetable revision', done: false },
    { id: 4, title: 'Synchronize RFID campus gate logs', done: false },
  ]);
  const [newTitle, setNewTitle] = React.useState('');
  const [lastToggledId, setLastToggledId] = React.useState<number | null>(null);

  const toggleTask = (id: number) => {
    setLastToggledId(id);
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
    <div className="w-full max-w-md space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <span className="font-sans text-xs font-bold tracking-wider text-slate-800 uppercase">
          Interactive Task List
        </span>
        <span className="font-mono text-xs font-bold text-[#0056FF]">
          {doneCount} of {tasks.length} Done
        </span>
      </div>

      {/* Motion Law 3: Stagger list rows by 30ms */}
      <motion.div
        variants={listContainerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-1.5"
      >
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.button
              key={task.id}
              type="button"
              layout
              variants={listRowVariants}
              whileTap={{ scale: WHILE_TAP_SCALE }}
              onClick={() => toggleTask(task.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-colors select-none',
                task.done
                  ? 'border-slate-100 bg-slate-50 text-slate-400'
                  : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300',
              )}
            >
              {/* Motion Law 8: Pulse to confirm success */}
              <motion.div
                variants={successPulseVariants}
                animate={task.done && lastToggledId === task.id ? 'success' : 'idle'}
                className={cn(
                  'flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors',
                  task.done
                    ? 'border-[#0056FF] bg-[#0056FF] text-white'
                    : 'border-slate-300 bg-white',
                )}
              >
                {task.done && <Check className="size-3.5" />}
              </motion.div>
              <span
                className={cn('flex-1 font-sans text-xs font-medium', task.done && 'line-through')}
              >
                {task.title}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <form onSubmit={addTask} className="flex gap-2 pt-1">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add task"
          className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 font-sans text-xs text-slate-900 focus:border-[#0056FF] focus:bg-white focus:outline-none"
        />
        {/* Motion Law 4: Scale 0.97 on press */}
        <motion.button
          type="submit"
          whileTap={{ scale: WHILE_TAP_SCALE }}
          className="flex items-center gap-1 rounded-xl bg-[#0056FF] px-3 py-1.5 font-sans text-xs font-bold text-white hover:bg-blue-700"
        >
          <Plus className="size-3.5" />
          <span>Add</span>
        </motion.button>
      </form>
    </div>
  );
}
