'use client';

import * as React from 'react';
import {
  Bell,
  Calendar,
  FileText,
  Users,
  Settings,
  BarChart,
  IconGlassWrapper,
} from '@/components/icons';

/**
 * IconGlassDemo
 * 
 * Demonstrates the glassmorphic icon container style with:
 * - Subtle glass border with rounded corners
 * - No movement or animation on hover/tap (stable icons)
 * - Consistent styling across all sizes
 */
export function IconGlassDemo() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-3">
        <h2 className="font-sans text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
          Glassmorphic Icon Containers
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Icons with subtle glass borders and stable hover states (no animation or movement)
        </p>
      </div>

      {/* Size Variations */}
      <div className="space-y-4">
        <h3 className="font-sans text-base font-bold text-slate-950">Size Variations</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <IconGlassWrapper size="xs">
              <Bell />
            </IconGlassWrapper>
            <span className="text-xs text-slate-600">Extra Small</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <IconGlassWrapper size="sm">
              <Calendar />
            </IconGlassWrapper>
            <span className="text-xs text-slate-600">Small</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <IconGlassWrapper size="md">
              <FileText />
            </IconGlassWrapper>
            <span className="text-xs text-slate-600">Medium</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <IconGlassWrapper size="lg">
              <Users />
            </IconGlassWrapper>
            <span className="text-xs text-slate-600">Large</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu Example */}
      <div className="space-y-4">
        <h3 className="font-sans text-base font-bold text-slate-950">
          Navigation Menu Example
        </h3>
        <div className="flex flex-col gap-3">
          {[
            { icon: Bell, label: 'Notifications' },
            { icon: Calendar, label: 'Calendar' },
            { icon: FileText, label: 'Documents' },
            { icon: Users, label: 'Users' },
            { icon: Settings, label: 'Settings' },
            { icon: BarChart, label: 'Analytics' },
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors hover:bg-slate-50"
            >
              <IconGlassWrapper size="sm">
                <item.icon />
              </IconGlassWrapper>
              <span className="font-sans text-sm font-medium text-slate-950">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Hover Test */}
      <div className="space-y-4">
        <h3 className="font-sans text-base font-bold text-slate-950">
          Hover Test (Icons Stay Stable)
        </h3>
        <p className="text-sm text-slate-600">
          Hover over these icons - they should remain completely stable with no movement or
          animation.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:bg-slate-50"
          >
            <IconGlassWrapper size="md">
              <Bell />
            </IconGlassWrapper>
          </button>

          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:bg-slate-50"
          >
            <IconGlassWrapper size="md">
              <Calendar />
            </IconGlassWrapper>
          </button>

          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:bg-slate-50"
          >
            <IconGlassWrapper size="md">
              <Settings />
            </IconGlassWrapper>
          </button>
        </div>
      </div>

      {/* Code Example */}
      <div className="space-y-3">
        <h3 className="font-sans text-base font-bold text-slate-950">Usage Example</h3>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <pre className="overflow-x-auto p-4 font-mono text-xs text-slate-800">
            {`import { Bell, IconGlassWrapper } from '@/components/icons';

<IconGlassWrapper size="sm">
  <Bell />
</IconGlassWrapper>`}
          </pre>
        </div>
      </div>
    </div>
  );
}
