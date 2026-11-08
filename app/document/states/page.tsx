import type { Metadata } from 'next';
import { AccessibleDesignPrinciples } from '@/features/document/components/ui-library';

export const metadata: Metadata = {
  title: 'Interaction States Architecture',
  description:
    'Authoritative Material 3 Interaction States & State Layers: Enabled, Disabled, Hover, Focused, Pressed, Dragged, Component Inheritance, and Opacity Overlays.',
};

export default function StatesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Title & Breadcrumb Header */}
      <div className="space-y-1.5 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
          <span>SNPI-SMS DOCS</span>
          <span>/</span>
          <span className="font-bold text-[#0056FF]">INTERACTION STATES</span>
        </div>
        <h1 className="font-sans text-2xl font-black tracking-tight text-[#020617] sm:text-3xl">
          Interaction States &amp; State Layers Architecture
        </h1>
        <p className="max-w-3xl font-sans text-xs text-slate-500 sm:text-sm">
          States communicate the interaction status of a component or UI element. State layers
          provide visual cues across Enabled, Disabled, Hover, Focused, Pressed, and Dragged states
          with standardized opacity overlays and component inheritance rules.
        </p>
      </div>

      {/* Interactive States Architecture Workbench */}
      <AccessibleDesignPrinciples initialTab="states" />
    </div>
  );
}
