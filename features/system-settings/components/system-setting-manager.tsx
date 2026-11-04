'use client';

import * as React from 'react';
import { Plus, Save, Trash2 } from '@/components/icons';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useAuth } from '@/features/auth/context/auth-context';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';

import {
  useCreateSystemSettingMutation,
  useDeleteSystemSettingMutation,
  useSystemSettingsQuery,
  useUpdateSystemSettingMutation,
} from '../hooks/use-system-settings';
import type {
  SystemSetting,
  SystemSettingCategory,
  SystemSettingType,
  SystemSettingValue,
} from '../types';

const categories: SystemSettingCategory[] = [
  'general',
  'academic',
  'finance',
  'student',
  'employee',
  'security',
  'notification',
  'document',
  'sequence',
];

const parseValue = (value: string, type: SystemSettingType): SystemSettingValue => {
  if (type === 'number') return Number(value);
  if (type === 'boolean') return value === 'true';
  if (type === 'json') return JSON.parse(value) as Record<string, unknown>;
  return value;
};

export const SystemSettingManager = () => {
  const { user, hasPermission } = useAuth();
  const [category, setCategory] = React.useState<SystemSettingCategory | ''>('');
  const [branchFilter, setBranchFilter] = React.useState<string>('');
  const [drafts, setDrafts] = React.useState<Record<string, string>>({});
  const [showCreate, setShowCreate] = React.useState(false);
  const [form, setForm] = React.useState({
    key: '',
    value: '',
    type: 'string' as SystemSettingType,
    category: 'general' as SystemSettingCategory,
    branchId: '' as string,
    description: '',
  });

  const { data: branchesData } = useBranchesQuery({ limit: 100 });
  const branches = branchesData?.data ?? [];

  const { data, isLoading, isError, refetch } = useSystemSettingsQuery(
    category || undefined,
    branchFilter || undefined,
  );
  const createMutation = useCreateSystemSettingMutation();
  const updateMutation = useUpdateSystemSettingMutation();
  const deleteMutation = useDeleteSystemSettingMutation();
  const canEdit = hasPermission('setting.edit.all_branches');
  const settings = data?.data ?? [];
  const schoolId = typeof user?.schoolId === 'string' ? user.schoolId : user?.schoolId._id;

  const displayValue = (setting: SystemSetting) =>
    typeof setting.value === 'object' ? JSON.stringify(setting.value) : String(setting.value);

  const save = async (setting: SystemSetting) => {
    try {
      const raw = drafts[setting._id] ?? displayValue(setting);
      await updateMutation.mutateAsync({
        id: setting._id,
        value: parseValue(raw, setting.type) as never,
      });
      toast.success(`${setting.key} updated`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to update setting');
    }
  };

  const create = async () => {
    if (!schoolId) return;
    try {
      await createMutation.mutateAsync({
        ...form,
        branchId: form.branchId ? form.branchId : undefined,
        schoolId,
        value: parseValue(form.value, form.type),
      });
      setForm({
        key: '',
        value: '',
        type: 'string',
        category: 'general',
        branchId: '',
        description: '',
      });
      setShowCreate(false);
      toast.success('System setting created');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to create setting');
    }
  };

  return (
    <Card className="border-slate-200">
      <CardHeader className="border-b border-slate-100">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base">Dynamic Configuration Store</CardTitle>
            <p className="mt-1 text-xs text-slate-500">
              School and optional branch settings with typed values and immutable change history.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={branchFilter}
              onChange={(event) => setBranchFilter(event.target.value)}
              className="w-44 text-xs"
            >
              <option value="">All scopes</option>
              <option value="central">Central School (Global)</option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.branchNameEn}
                </option>
              ))}
            </Select>
            <Select
              value={category}
              onChange={(event) => setCategory(event.target.value as SystemSettingCategory | '')}
              className="w-36 text-xs"
            >
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            {canEdit && (
              <Button size="sm" onClick={() => setShowCreate((value) => !value)}>
                <Plus className="mr-1 size-3.5" /> Add Setting
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        {showCreate && (
          <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 md:grid-cols-2">
            <Input
              placeholder="Key, e.g. ACADEMIC_PASSING_AVERAGE"
              value={form.key}
              onChange={(event) => setForm((value) => ({ ...value, key: event.target.value }))}
            />
            <Input
              placeholder="Value"
              value={form.value}
              onChange={(event) => setForm((value) => ({ ...value, value: event.target.value }))}
            />
            <Select
              value={form.type}
              onChange={(event) =>
                setForm((value) => ({ ...value, type: event.target.value as SystemSettingType }))
              }
            >
              {['string', 'number', 'boolean', 'json'].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Select
              value={form.category}
              onChange={(event) =>
                setForm((value) => ({
                  ...value,
                  category: event.target.value as SystemSettingCategory,
                }))
              }
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Select
              value={form.branchId}
              onChange={(event) => setForm((value) => ({ ...value, branchId: event.target.value }))}
              className="md:col-span-2"
            >
              <option value="">Central School (Global Default)</option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.branchNameEn} (Branch Override)
                </option>
              ))}
            </Select>
            <Input
              className="md:col-span-2"
              placeholder="Description"
              value={form.description}
              onChange={(event) =>
                setForm((value) => ({ ...value, description: event.target.value }))
              }
            />
            <div className="flex justify-end md:col-span-2">
              <Button size="sm" onClick={() => void create()} disabled={createMutation.isPending}>
                Create Setting
              </Button>
            </div>
          </div>
        )}

        {isLoading ? (
          <p className="py-8 text-center text-sm text-slate-500">Loading settings…</p>
        ) : isError ? (
          <div className="py-8 text-center text-sm text-rose-600">
            Unable to load settings.{' '}
            <button className="underline" onClick={() => void refetch()}>
              Retry
            </button>
          </div>
        ) : settings.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">
            No persistent settings in this category yet.
          </p>
        ) : (
          <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
            {settings.map((setting) => (
              <div key={setting._id} className="grid gap-3 p-4 lg:grid-cols-[1fr_1.2fr_auto]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-slate-900">
                      {setting.key}
                    </span>
                    <Badge tone="neutral">{setting.category}</Badge>
                    {setting.branchId ? (
                      <Badge tone="success" className="text-[10px]">
                        {typeof setting.branchId === 'object' && 'branchNameEn' in setting.branchId
                          ? String(setting.branchId.branchNameEn)
                          : 'Branch Override'}
                      </Badge>
                    ) : (
                      <Badge tone="neutral" className="text-[10px]">
                        Central
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {setting.description || setting.type}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {setting.auditHistory.length} change record(s)
                  </p>
                </div>
                <Input
                  value={drafts[setting._id] ?? displayValue(setting)}
                  disabled={!canEdit || !setting.isEditable}
                  onChange={(event) =>
                    setDrafts((value) => ({ ...value, [setting._id]: event.target.value }))
                  }
                />
                {canEdit && setting.isEditable && (
                  <div className="flex justify-end gap-1">
                    <Button variant="outline" size="sm" onClick={() => void save(setting)}>
                      <Save className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-rose-600"
                      onClick={async () => {
                        if (confirm(`Delete setting ${setting.key}?`)) {
                          await deleteMutation.mutateAsync(setting._id);
                        }
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
