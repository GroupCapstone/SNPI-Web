'use client';

import * as React from 'react';
import { AlertTriangle, BookOpen, CheckCircle2, PieChart, XCircle } from '@/components/icons';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/lib/i18n';
import type { ClassAvailabilitySummary } from '../types';

interface ClassAvailabilityKpisProps {
  summary?: ClassAvailabilitySummary;
  isLoading: boolean;
  activeAvailability?: string;
  onSelectAvailability: (availability: string) => void;
}

export const ClassAvailabilityKpis: React.FC<ClassAvailabilityKpisProps> = ({
  summary,
  isLoading,
  activeAvailability = '',
  onSelectAvailability,
}) => {
  const { t, language } = useTranslation();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="border-slate-200">
            <CardContent className="p-3.5 sm:p-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-2 h-7 w-12" />
              <Skeleton className="mt-1 h-3 w-28" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const data = summary ?? {
    totalClasses: 0,
    availableClasses: 0,
    nearCapacityClasses: 0,
    fullClasses: 0,
    completedOrCancelledClasses: 0,
    totalCapacity: 0,
    totalEnrolled: 0,
    occupancyRate: 0,
  };

  const availableSeatsCount = Math.max(0, data.totalCapacity - data.totalEnrolled);

  const kpiItems = [
    {
      id: '',
      title: t.classes.kpis.totalClasses,
      value: data.totalClasses,
      subtitle: `${data.totalEnrolled} / ${data.totalCapacity} ${t.classes.kpis.totalSpots.toLowerCase()}`,
      icon: BookOpen,
      iconColor: 'text-[#023e8a]',
      iconBg: 'bg-blue-50',
      activeRing: 'ring-2 ring-[#023e8a] border-[#023e8a] bg-blue-50/40',
      hoverBorder: 'hover:border-[#023e8a]/50',
    },
    {
      id: 'available',
      title: t.classes.kpis.availableClasses,
      value: data.availableClasses,
      subtitle: `${availableSeatsCount} ${language === 'kh' ? 'កៅអីទំនេរ' : 'seats open'}`,
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      activeRing: 'ring-2 ring-emerald-600 border-emerald-600 bg-emerald-50/40',
      hoverBorder: 'hover:border-emerald-500/50',
      badge: language === 'kh' ? 'មានកន្លែង' : 'Open',
      badgeTone: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'near_capacity',
      title: t.classes.kpis.nearCapacityClasses,
      value: data.nearCapacityClasses,
      subtitle: language === 'kh' ? 'សល់ <= ៣ ឬ >= ៨០%' : 'Remaining <= 3 or >= 80%',
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      activeRing: 'ring-2 ring-amber-500 border-amber-500 bg-amber-50/40',
      hoverBorder: 'hover:border-amber-400/50',
      badge: language === 'kh' ? 'ជិតពេញ' : 'Filling',
      badgeTone: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'full',
      title: t.classes.kpis.fullClasses,
      value: data.fullClasses,
      subtitle: language === 'kh' ? 'ពេញចំណុះ ១០០%' : '100% capacity reached',
      icon: XCircle,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-50',
      activeRing: 'ring-2 ring-rose-500 border-rose-500 bg-rose-50/40',
      hoverBorder: 'hover:border-rose-400/50',
      badge: language === 'kh' ? 'ពេញ' : 'Full',
      badgeTone: 'bg-rose-100 text-rose-800',
    },
    {
      id: 'occupancy',
      title: t.classes.kpis.occupancyRate,
      value: `${data.occupancyRate}%`,
      subtitle: `${data.totalEnrolled} ${language === 'kh' ? 'សិស្សបានចុះ' : 'students enrolled'}`,
      icon: PieChart,
      iconColor: 'text-[#00509d]',
      iconBg: 'bg-sky-50',
      activeRing: 'border-sky-300 bg-sky-50/20',
      hoverBorder: 'hover:border-sky-300',
      progressPercent: Math.min(100, Math.max(0, data.occupancyRate)),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {kpiItems.map((item) => {
        const Icon = item.icon;
        const isClickable = item.id !== 'occupancy';
        const isActive = isClickable && activeAvailability === item.id;

        return (
          <Card
            key={item.title}
            onClick={() => {
              if (!isClickable) return;
              if (activeAvailability === item.id) {
                onSelectAvailability('');
              } else {
                onSelectAvailability(item.id);
              }
            }}
            className={`transition-all duration-150 select-none ${
              isClickable ? 'cursor-pointer' : 'cursor-default'
            } ${item.hoverBorder} ${
              isActive ? item.activeRing : 'border-slate-200 bg-white hover:shadow-sm'
            }`}
          >
            <CardContent className="p-3.5 sm:p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="line-clamp-1 text-xs font-medium text-slate-500">
                  {item.title}
                </span>
                <div
                  className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}
                >
                  <Icon className={`size-4 ${item.iconColor}`} />
                </div>
              </div>

              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  {item.value}
                </span>
                {item.badge && (
                  <span
                    className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${item.badgeTone}`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              {item.progressPercent !== undefined ? (
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full transition-all duration-300 ${
                        item.progressPercent >= 100
                          ? 'bg-rose-500'
                          : item.progressPercent >= 80
                            ? 'bg-amber-500'
                            : 'bg-[#00509d]'
                      }`}
                      style={{ width: `${item.progressPercent}%` }}
                    />
                  </div>
                  <p className="truncate text-xs text-slate-500">{item.subtitle}</p>
                </div>
              ) : (
                <p className="mt-1.5 truncate text-xs text-slate-500">{item.subtitle}</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
