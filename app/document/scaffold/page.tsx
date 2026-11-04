import type { Metadata } from 'next';
import { ScaffoldArchitectureSection } from '@/features/document/components/ui-library';

export const metadata: Metadata = {
  title: 'Layout Scaffold Architecture',
  description:
    'Authoritative Material 3 Layout Scaffold: Bars, Rails, Panes, Safety Regions, Jetpack Compose Rulers, and Spacing Tokens.',
};

export default function ScaffoldPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Title & Breadcrumb Header */}
      <div className="space-y-1.5 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
          <span>SNPI-SMS DOCS</span>
          <span>/</span>
          <span className="font-bold text-[#0056FF]">LAYOUT SCAFFOLD</span>
        </div>
        <h1 className="font-sans text-2xl font-black tracking-tight text-[#0A1A4A] sm:text-3xl">
          Layout Scaffold &amp; Structural Composition
        </h1>
        <p className="max-w-3xl font-sans text-xs text-slate-500 sm:text-sm">
          A fundamental UI design structure that provides a standard platform for assembling key
          components into Bars, Rails, Panes, and System Safety Regions.
        </p>
      </div>

      {/* Interactive Scaffold Architecture Workbench */}
      <ScaffoldArchitectureSection />
    </div>
  );
}
