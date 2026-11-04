'use client';

import * as React from 'react';
import {
  AlertCircle,
  Award,
  BookOpen,
  CheckCircle2,
  Edit2,
  Layers,
  Plus,
  Search,
  Trash2,
  X,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useAuth } from '@/features/auth/context/auth-context';

import { useDeleteSkillMutation, useSkillsQuery } from '../hooks/use-skills';
import type { Skill, SkillCategory, SkillFilters } from '../types';
import { SkillDialog } from './skill-dialog';
import { useTranslation } from '@/lib/i18n';

export const SkillTable = () => {
  const { t } = useTranslation();
  const { hasPermission } = useAuth();

  const categories: Array<{ id: SkillCategory | ''; label: string }> = [
    { id: '', label: t.skills.allCategories },
    { id: 'pedagogy', label: t.skills.pedagogy },
    { id: 'technical', label: t.skills.technical },
    { id: 'leadership', label: t.skills.leadership },
    { id: 'administration', label: t.skills.administration },
    { id: 'communication', label: t.skills.communication },
    { id: 'domain', label: t.skills.domain },
    { id: 'general', label: t.skills.general },
  ];
  const [filters, setFilters] = React.useState<SkillFilters>({
    search: '',
    category: undefined,
    isActive: undefined,
    page: 1,
    limit: 50,
  });

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedSkill, setSelectedSkill] = React.useState<Skill | null>(null);
  const [actionError, setActionError] = React.useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useSkillsQuery(filters);
  const deleteMutation = useDeleteSkillMutation();

  const skills = data?.data ?? [];

  // Metrics
  const totalSkills = skills.length;
  const activeSkills = skills.filter((s) => s.isActive).length;
  const pedagogySkills = skills.filter((s) => s.category === 'pedagogy').length;
  const technicalSkills = skills.filter((s) => s.category === 'technical').length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleCategorySelect = (cat: SkillCategory | '') => {
    setFilters((prev) => ({ ...prev, category: cat || undefined, page: 1 }));
  };

  const handleCreate = () => {
    setActionError(null);
    setSelectedSkill(null);
    setDialogOpen(true);
  };

  const handleEdit = (skill: Skill) => {
    setActionError(null);
    setSelectedSkill(skill);
    setDialogOpen(true);
  };

  const handleDelete = async (skill: Skill) => {
    try {
      setActionError(null);
      if (
        window.confirm(
          `Are you sure you want to delete skill definition "${skill.name}" (${skill.code})?`,
        )
      ) {
        await deleteMutation.mutateAsync(skill._id);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete skill';
      setActionError(msg);
    }
  };

  const getCategoryBadgeTone = (
    cat: SkillCategory,
  ): 'success' | 'warning' | 'danger' | 'neutral' => {
    switch (cat) {
      case 'pedagogy':
        return 'success';
      case 'technical':
        return 'neutral';
      case 'leadership':
        return 'warning';
      case 'domain':
        return 'danger';
      case 'communication':
      default:
        return 'neutral';
    }
  };

  return (
    <div className="space-y-4">
      {actionError && (
        <div className="flex items-start justify-between gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-900">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-rose-600" />
            <div className="space-y-0.5">
              <span className="font-semibold text-rose-950">Action Blocked</span>
              <p className="text-rose-800">{actionError}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActionError(null)}
            className="text-rose-500 hover:text-rose-800"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">
                {t.skills.totalCompetencies}
              </span>
              <Award className="size-5 shrink-0 text-[#00509d]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{totalSkills}</div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">
                {t.skills.activeCatalog}
              </span>
              <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{activeSkills}</div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">
                {t.skills.pedagogySkills}
              </span>
              <BookOpen className="size-5 shrink-0 text-amber-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{pedagogySkills}</div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">
                {t.skills.technicalSkills}
              </span>
              <Layers className="size-5 shrink-0 text-purple-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{technicalSkills}</div>
          </CardContent>
        </Card>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          <div className="relative max-w-xs min-w-[220px] flex-1">
            <Search className="absolute top-2.5 left-3 size-4 text-slate-400" />
            <Input
              placeholder={t.skills.searchPlaceholder}
              value={filters.search}
              onChange={handleSearchChange}
              className="h-9 pl-9 text-xs"
            />
          </div>

          <Select
            value={filters.category ?? ''}
            onChange={(e) => handleCategorySelect(e.target.value as SkillCategory | '')}
            className="h-9 w-48 text-xs"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </Select>
        </div>

        {hasPermission('skill.create.own_branch') && (
          <Button
            onClick={handleCreate}
            size="sm"
            className="bg-[#023e8a] text-xs hover:bg-[#00509d]"
          >
            <Plus className="mr-1 size-3.5" />
            {t.skills.addSkill}
          </Button>
        )}
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold text-slate-600 uppercase">
              <tr>
                <th className="px-4 py-3">{t.skills.code}</th>
                <th className="px-4 py-3">{t.skills.skillName}</th>
                <th className="px-4 py-3">{t.skills.category}</th>
                <th className="px-4 py-3">{t.skills.description}</th>
                <th className="px-4 py-3">{t.common.status}</th>
                <th className="px-4 py-3 text-right">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="size-4 animate-spin rounded-full border-2 border-[#00509d] border-t-transparent" />
                      <span>{t.skills.loadingCatalog}</span>
                    </div>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-rose-500">
                    <p>{t.skills.loadError}</p>
                    <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-2">
                      {t.common.retry}
                    </Button>
                  </td>
                </tr>
              ) : skills.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    {t.skills.noSkillsFound}
                  </td>
                </tr>
              ) : (
                skills.map((skill) => (
                  <tr key={skill._id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-mono font-medium text-[#00509d]">{skill.code}</td>

                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">{skill.name}</div>
                    </td>

                    <td className="px-4 py-3">
                      <Badge tone={getCategoryBadgeTone(skill.category)}>
                        {skill.category.toUpperCase()}
                      </Badge>
                    </td>

                    <td className="px-4 py-3 text-slate-500">
                      <div className="max-w-xs truncate text-xs">{skill.description || '—'}</div>
                    </td>

                    <td className="px-4 py-3">
                      <Badge tone={skill.isActive ? 'success' : 'neutral'}>
                        {skill.isActive ? t.common.active : t.common.inactive}
                      </Badge>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {hasPermission('skill.edit.own_branch') && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(skill)}
                            className="size-8 p-0 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            title={t.common.edit}
                          >
                            <Edit2 className="size-4" />
                          </Button>
                        )}
                        {hasPermission('skill.delete.own_branch') && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(skill)}
                            className="size-8 p-0 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                            title={t.common.delete}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SkillDialog open={dialogOpen} onOpenChange={setDialogOpen} skill={selectedSkill} />
    </div>
  );
};
