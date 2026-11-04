'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Bell,
  BookOpen,
  Building,
  ChevronRight,
  CircleDollarSign,
  Layers3,
  Lock,
  Settings2,
  Sliders,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { SettingPanelAcademic } from '@/features/system-settings/components/setting-panel-academic';
import { SettingPanelFinance } from '@/features/system-settings/components/setting-panel-finance';
import { SettingPanelGeneral } from '@/features/system-settings/components/setting-panel-general';
import { SettingPanelNotification } from '@/features/system-settings/components/setting-panel-notification';
import { SettingPanelSecurity } from '@/features/system-settings/components/setting-panel-security';
import { SystemSettingManager } from '@/features/system-settings/components/system-setting-manager';
import { useTranslation } from '@/lib/i18n';

type SettingsTab = 'general' | 'academic' | 'finance' | 'security' | 'notification' | 'advanced';

export default function SettingsPage() {
  const { t, isKhmer } = useTranslation();
  const [activeTab, setActiveTab] = React.useState<SettingsTab>('general');

  const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
    { id: 'general', label: isKhmer ? 'ព័ត៌មានទូទៅ & សាលា' : 'General & Identity', icon: Building },
    { id: 'academic', label: isKhmer ? 'គោលការណ៍សិក្សា' : 'Academic Policies', icon: BookOpen },
    {
      id: 'finance',
      label: isKhmer ? 'ហិរញ្ញវត្ថុ & រូបិយប័ណ្ណ' : 'Finance & Billing',
      icon: CircleDollarSign,
    },
    {
      id: 'security',
      label: isKhmer ? 'សុវត្ថិភាព & សម័យប្រជុំ' : 'Security & Session',
      icon: Lock,
    },
    { id: 'notification', label: isKhmer ? 'ការជូនដំណឹង' : 'Notifications', icon: Bell },
    { id: 'advanced', label: isKhmer ? 'បញ្ជីកម្រិតខ្ពស់' : 'Advanced Registry', icon: Sliders },
  ];

  return (
    <PermissionGuard requiredPermission="setting.view.all_branches">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {t.settings.title}
              </h1>
              <Badge tone="neutral">{isKhmer ? 'រដ្ឋបាលប្រព័ន្ធ' : 'Administration'}</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">{t.settings.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Settings2 className="size-4 text-[#00509d]" />
            <span>{isKhmer ? 'ការគ្រប់គ្រងប្រព័ន្ធ' : 'System Administration'}</span>
          </div>
        </div>

        {/* Technical Blueprint Navigation Link */}
        <Link
          href="/settings/system-info"
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 transition-all hover:border-[#00509d]/30 hover:bg-blue-50/20"
        >
          <div className="flex items-center gap-3">
            <Layers3 className="size-6 shrink-0 text-[#00509d]" />
            <div>
              <p className="text-xs font-semibold text-slate-900">{t.settings.systemBlueprint}</p>
              <p className="text-xs text-slate-500">{t.settings.systemBlueprintDesc}</p>
            </div>
          </div>
          <ChevronRight className="size-4 text-slate-400" />
        </Link>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto rounded-xl border border-slate-200 bg-slate-100/75 p-1 text-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 font-medium transition-all ${
                  isActive
                    ? 'bg-white text-[#00509d] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className={`size-3.5 ${isActive ? 'text-[#00509d]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Panels */}
        <div className="transition-all">
          {activeTab === 'general' && <SettingPanelGeneral />}
          {activeTab === 'academic' && <SettingPanelAcademic />}
          {activeTab === 'finance' && <SettingPanelFinance />}
          {activeTab === 'security' && <SettingPanelSecurity />}
          {activeTab === 'notification' && <SettingPanelNotification />}
          {activeTab === 'advanced' && <SystemSettingManager />}
        </div>
      </div>
    </PermissionGuard>
  );
}
