'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Edit2,
  Globe,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  School as SchoolIcon,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { useSchoolsQuery } from '../hooks/use-school';
import type { School } from '../types';
import { SchoolDialog } from './school-dialog';
import { useTranslation } from '@/lib/i18n';

export const SchoolProfileCard = () => {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedSchool, setSelectedSchool] = React.useState<School | null>(null);

  const { data, isLoading, isError, refetch } = useSchoolsQuery({ limit: 10 });
  const schools = data?.data ?? [];
  const primarySchool = schools[0];

  const handleEdit = (school: School) => {
    setSelectedSchool(school);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedSchool(null);
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="space-y-4 p-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-sm font-medium text-rose-600">{t.school.loadError}</p>
          <Button onClick={() => void refetch()} variant="outline" size="sm" className="mt-3">
            <RefreshCw className="size-3.5" /> {t.common.retry}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!primarySchool) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <SchoolIcon className="mx-auto size-12 text-slate-300" />
          <p className="mt-3 text-base font-semibold text-slate-800">{t.school.noSchoolFound}</p>
          <p className="mt-1 text-sm text-slate-500">{t.school.createPrompt}</p>
          <Button
            onClick={handleCreate}
            className="mt-4 bg-[#023e8a] text-white hover:bg-[#00509d]"
          >
            {t.school.setupSchoolProfile}
          </Button>
          <SchoolDialog open={dialogOpen} onOpenChange={setDialogOpen} school={null} />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50/50 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white p-1">
              <Image
                src="/images/logo.png"
                alt="SNPI International School Logo"
                width={52}
                height={52}
                className="size-full object-contain"
                priority
              />
            </div>
            <div>
              <CardTitle className="text-xl text-slate-900">{primarySchool.nameEn}</CardTitle>
              <p className="text-sm font-medium text-[#00509d]">{primarySchool.nameKh}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge tone={primarySchool.status === 'active' ? 'success' : 'neutral'}>
              {primarySchool.status === 'active' ? t.common.active : t.common.inactive}
            </Badge>
            <Button
              onClick={() => handleEdit(primarySchool)}
              className="bg-[#023e8a] text-white hover:bg-[#00509d]"
              size="sm"
            >
              <Edit2 className="size-3.5" />
              {t.school.editSchool}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-slate-100 bg-white p-4">
            <p className="text-xs font-semibold tracking-normal text-slate-500 uppercase">
              {t.school.schoolCode}
            </p>
            <p className="mt-1 font-mono text-base font-bold text-slate-900">
              {primarySchool.code}
            </p>
          </div>

          <div className="rounded-lg border border-slate-100 bg-white p-4">
            <p className="text-xs font-semibold tracking-normal text-slate-500 uppercase">
              {t.school.phone}
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-800">
              <Phone className="size-4 text-slate-400" />
              {primarySchool.phone || '—'}
            </p>
          </div>

          <div className="rounded-lg border border-slate-100 bg-white p-4">
            <p className="text-xs font-semibold tracking-normal text-slate-500 uppercase">
              {t.school.email}
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-800">
              <Mail className="size-4 text-slate-400" />
              {primarySchool.email ? (
                <a
                  href={`mailto:${primarySchool.email}`}
                  className="text-[#00509d] hover:underline"
                >
                  {primarySchool.email}
                </a>
              ) : (
                '—'
              )}
            </p>
          </div>

          <div className="rounded-lg border border-slate-100 bg-white p-4">
            <p className="text-xs font-semibold tracking-normal text-slate-500 uppercase">
              {t.school.website}
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-800">
              <Globe className="size-4 text-slate-400" />
              {primarySchool.website ? (
                <a
                  href={primarySchool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00509d] hover:underline"
                >
                  {primarySchool.website}
                </a>
              ) : (
                '—'
              )}
            </p>
          </div>

          <div className="rounded-lg border border-slate-100 bg-white p-4 sm:col-span-2">
            <p className="text-xs font-semibold tracking-normal text-slate-500 uppercase">
              {t.school.headquarters}
            </p>
            <p className="mt-1 flex items-start gap-2 text-sm text-slate-800">
              <MapPin className="mt-0.5 size-4 shrink-0 text-slate-400" />
              {primarySchool.address || '—'}
            </p>
          </div>
        </CardContent>
      </Card>

      <SchoolDialog open={dialogOpen} onOpenChange={setDialogOpen} school={selectedSchool} />
    </div>
  );
};
