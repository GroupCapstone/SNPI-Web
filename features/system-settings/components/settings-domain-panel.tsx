'use client';

import * as React from 'react';
import { Building2, Lock, RotateCcw, Save, Undo2 } from '@/components/icons';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useAuth } from '@/features/auth/context/auth-context';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useTranslation } from '@/lib/i18n';

import {
  useCreateSystemSettingMutation,
  useDeleteSystemSettingMutation,
  useSystemSettingsQuery,
  useUpdateSystemSettingMutation,
} from '../hooks/use-system-settings';
import type { SystemSetting, SystemSettingCategory, SystemSettingType } from '../types';

export interface DomainFieldDefinition {
  key: string;
  label: string;
  labelKh?: string;
  description: string;
  descriptionKh?: string;
  type: 'string' | 'number' | 'boolean';
  defaultValue: string | number | boolean;
  options?: { value: string | number | boolean; label: string; labelKh?: string }[];
  placeholder?: string;
  isReadOnly?: boolean;
}

interface SettingsDomainPanelProps {
  title: string;
  titleKh?: string;
  description: string;
  descriptionKh?: string;
  category: SystemSettingCategory;
  fields: DomainFieldDefinition[];
}

export const SettingsDomainPanel = ({
  title,
  titleKh,
  description,
  descriptionKh,
  category,
  fields,
}: SettingsDomainPanelProps) => {
  const { user, hasPermission } = useAuth();
  const { isKhmer } = useTranslation();
  const canEdit = hasPermission('setting.edit.all_branches');
  const schoolId = typeof user?.schoolId === 'string' ? user.schoolId : user?.schoolId?._id;

  // Active Scope: 'central' or branch ID
  const [selectedBranchId, setSelectedBranchId] = React.useState<string>('central');

  // Fetch branches for scope switcher
  const { data: branchesData } = useBranchesQuery({ limit: 100 });
  const branches = branchesData?.data ?? [];

  // Query active scope settings
  const {
    data: currentScopeData,
    isLoading,
    isError,
    refetch,
  } = useSystemSettingsQuery(category, selectedBranchId);

  // Query central fallback settings
  const { data: centralData, refetch: refetchCentral } = useSystemSettingsQuery(
    category,
    'central',
  );

  const updateMutation = useUpdateSystemSettingMutation();
  const createMutation = useCreateSystemSettingMutation();
  const deleteMutation = useDeleteSystemSettingMutation();

  const currentSettings = React.useMemo(
    () => currentScopeData?.data ?? [],
    [currentScopeData?.data],
  );
  const centralSettings = React.useMemo(() => centralData?.data ?? [], [centralData?.data]);

  const currentSettingsMap = React.useMemo(() => {
    const map = new Map<string, SystemSetting>();
    for (const s of currentSettings) {
      map.set(s.key.toUpperCase(), s);
    }
    return map;
  }, [currentSettings]);

  const centralSettingsMap = React.useMemo(() => {
    const map = new Map<string, SystemSetting>();
    for (const s of centralSettings) {
      map.set(s.key.toUpperCase(), s);
    }
    return map;
  }, [centralSettings]);

  const [userEdits, setUserEdits] = React.useState<Record<string, string | number | boolean>>({});
  const [isSaving, setIsSaving] = React.useState(false);

  const getFieldValue = React.useCallback(
    (fieldKey: string, defaultValue: string | number | boolean) => {
      if (userEdits[fieldKey] !== undefined) {
        return userEdits[fieldKey];
      }
      const fieldKeyUpper = fieldKey.toUpperCase();
      const branchSetting =
        selectedBranchId !== 'central' ? currentSettingsMap.get(fieldKeyUpper) : undefined;
      const centralSetting = centralSettingsMap.get(fieldKeyUpper);

      if (branchSetting !== undefined && branchSetting.value !== undefined) {
        return branchSetting.value as string | number | boolean;
      }
      if (centralSetting !== undefined && centralSetting.value !== undefined) {
        return centralSetting.value as string | number | boolean;
      }
      return defaultValue;
    },
    [userEdits, selectedBranchId, currentSettingsMap, centralSettingsMap],
  );

  const handleChange = (key: string, val: string | number | boolean) => {
    setUserEdits((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit || !schoolId) return;

    try {
      setIsSaving(true);
      let updatedCount = 0;

      for (const field of fields) {
        if (field.isReadOnly) continue;

        const value = getFieldValue(field.key, field.defaultValue);
        const fieldKeyUpper = field.key.toUpperCase();
        const existing = currentSettingsMap.get(fieldKeyUpper);

        if (existing) {
          if (existing.value !== value) {
            await updateMutation.mutateAsync({
              id: existing._id,
              value: value as never,
            });
            updatedCount++;
          }
        } else {
          const centralSetting = centralSettingsMap.get(fieldKeyUpper);
          const centralVal = centralSetting?.value ?? field.defaultValue;

          if (selectedBranchId !== 'central' && centralVal === value) {
            continue;
          }

          await createMutation.mutateAsync({
            key: fieldKeyUpper,
            value,
            type: field.type as SystemSettingType,
            category,
            schoolId,
            branchId: selectedBranchId !== 'central' ? selectedBranchId : undefined,
            description: field.description,
            isEditable: true,
          });
          updatedCount++;
        }
      }

      setUserEdits({});
      await Promise.all([refetch(), refetchCentral()]);
      if (updatedCount > 0) {
        toast.success(
          isKhmer
            ? `បានរក្សាទុកការកំណត់ចំនួន ${updatedCount} ដោយជោគជ័យ`
            : `Successfully saved ${updatedCount} configuration parameter(s)`,
        );
      } else {
        toast.info(
          isKhmer ? 'គ្មានការផ្លាស់ប្តូរត្រូវបានរកឃើញទេ' : 'No configuration changes detected',
        );
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : isKhmer
            ? 'បរាជ័យក្នុងការរក្សាទុក'
            : 'Failed to save configuration';
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRevertBranchOverride = async (key: string) => {
    const existing = currentSettingsMap.get(key.toUpperCase());
    if (!existing || selectedBranchId === 'central') return;

    try {
      await deleteMutation.mutateAsync(existing._id);
      setUserEdits((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      await Promise.all([refetch(), refetchCentral()]);
      toast.success(
        isKhmer
          ? 'បានលុបការកំណត់ផ្ទាល់ខ្លួន និងត្រឡប់ទៅប្រើតម្លៃសាលាកណ្តាល'
          : 'Reverted branch override back to central school default',
      );
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to revert override');
    }
  };

  const handleReset = () => {
    setUserEdits({});
    toast.info(
      isKhmer ? 'បានកំណត់តម្លៃទម្រង់ឡើងវិញដូចដើម' : 'Form values restored to last saved state',
    );
  };

  if (isLoading) {
    return (
      <Card className="border-slate-200">
        <CardContent className="p-12 text-center text-xs text-slate-500">
          <div className="flex items-center justify-center gap-2">
            <div className="size-4 animate-spin rounded-full border-2 border-[#00509d] border-t-transparent" />
            <span>
              {isKhmer ? 'កំពុងទាញយកការកំណត់ប្រព័ន្ធ...' : 'Loading configuration parameters...'}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="border-slate-200">
        <CardContent className="p-8 text-center text-xs text-rose-500">
          <p>
            {isKhmer ? 'បរាជ័យក្នុងការទាញយកការកំណត់' : 'Failed to load configuration parameters.'}
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-2">
            {isKhmer ? 'ព្យាយាមម្តងទៀត' : 'Retry'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-slate-900">
              {isKhmer && titleKh ? titleKh : title}
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              {isKhmer && descriptionKh ? descriptionKh : description}
            </CardDescription>
          </div>

          {/* Scope Selector: Central School vs Specific Branch */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <Building2 className="size-3.5 text-[#00509d]" />
              <span>{isKhmer ? 'វិសាលភាពកំណត់:' : 'Configuration Scope:'}</span>
            </span>
            <Select
              value={selectedBranchId}
              onChange={(e) => {
                setSelectedBranchId(e.target.value);
                setUserEdits({});
              }}
              className="h-8 w-60 text-xs font-medium"
            >
              <option value="central">
                {isKhmer
                  ? 'សាលាកណ្តាល (ការកំណត់រួមទូទាំងប្រព័ន្ធ)'
                  : 'Central School (Global Default)'}
              </option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  {isKhmer ? b.branchNameKh || b.branchNameEn : b.branchNameEn}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {fields.map((field) => {
              const currentVal = getFieldValue(field.key, field.defaultValue);
              const fieldKeyUpper = field.key.toUpperCase();
              const isOverriddenOnBranch =
                selectedBranchId !== 'central' && currentSettingsMap.has(fieldKeyUpper);
              const centralVal = centralSettingsMap.get(fieldKeyUpper)?.value ?? field.defaultValue;

              const labelText = isKhmer && field.labelKh ? field.labelKh : field.label;
              const descText =
                isKhmer && field.descriptionKh ? field.descriptionKh : field.description;

              return (
                <div
                  key={field.key}
                  className={`space-y-2 rounded-xl border p-4 transition-all ${
                    isOverriddenOnBranch
                      ? 'border-blue-200 bg-blue-50/20'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <label htmlFor={field.key} className="text-xs font-semibold text-slate-900">
                          {labelText}
                        </label>
                        {field.isReadOnly && (
                          <Badge tone="neutral" className="gap-1 text-[10px]">
                            <Lock className="size-2.5" />
                            <span>{isKhmer ? 'ជាប់សោ' : 'Read-Only'}</span>
                          </Badge>
                        )}
                        {selectedBranchId !== 'central' &&
                          (isOverriddenOnBranch ? (
                            <Badge tone="success" className="text-[10px]">
                              {isKhmer ? 'កំណត់ដោយសាខា' : 'Branch Override'}
                            </Badge>
                          ) : (
                            <span className="text-[11px] text-slate-400">
                              (
                              {isKhmer
                                ? 'ទទួលស្វ័យប្រវត្តិតាមសាលាកណ្តាល'
                                : 'Inherited from Central'}
                              )
                            </span>
                          ))}
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">{descText}</p>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 uppercase">
                      {field.key}
                    </span>
                  </div>

                  {/* Input Rendering */}
                  {field.type === 'boolean' ? (
                    <div className="flex items-center gap-3 pt-1">
                      <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-700">
                        <input
                          id={field.key}
                          type="checkbox"
                          disabled={!canEdit || field.isReadOnly}
                          checked={Boolean(currentVal)}
                          onChange={(e) => handleChange(field.key, e.target.checked)}
                          className="size-4 rounded border-slate-300 text-[#00509d] focus:ring-[#00509d]"
                        />
                        <span>
                          {Boolean(currentVal)
                            ? isKhmer
                              ? 'បើកដំណើរការ (Enabled)'
                              : 'Enabled'
                            : isKhmer
                              ? 'បិទដំណើរការ (Disabled)'
                              : 'Disabled'}
                        </span>
                      </label>
                    </div>
                  ) : field.options && field.options.length > 0 ? (
                    <Select
                      id={field.key}
                      disabled={!canEdit || field.isReadOnly}
                      value={String(currentVal)}
                      onChange={(e) => {
                        const val =
                          field.type === 'number' ? Number(e.target.value) : e.target.value;
                        handleChange(field.key, val);
                      }}
                      className="h-9 text-xs"
                    >
                      {field.options.map((opt) => (
                        <option key={String(opt.value)} value={String(opt.value)}>
                          {isKhmer && opt.labelKh ? opt.labelKh : opt.label}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      id={field.key}
                      disabled={!canEdit || field.isReadOnly}
                      type={field.type === 'number' ? 'number' : 'text'}
                      value={String(currentVal)}
                      onChange={(e) => {
                        const val =
                          field.type === 'number'
                            ? e.target.value === ''
                              ? ''
                              : Number(e.target.value)
                            : e.target.value;
                        handleChange(field.key, val);
                      }}
                      placeholder={field.placeholder}
                      className="h-9 text-xs"
                    />
                  )}

                  {/* Branch Override Controls */}
                  {selectedBranchId !== 'central' && (
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <span className="text-slate-400">
                        {isKhmer ? 'តម្លៃសាលាកណ្តាល:' : 'Central Value:'}{' '}
                        <strong className="font-mono text-slate-600">
                          {typeof centralVal === 'boolean'
                            ? centralVal
                              ? 'true'
                              : 'false'
                            : String(centralVal)}
                        </strong>
                      </span>
                      {isOverriddenOnBranch && canEdit && (
                        <button
                          type="button"
                          onClick={() => handleRevertBranchOverride(field.key)}
                          className="flex items-center gap-1 font-medium text-amber-600 transition-colors hover:text-amber-800"
                        >
                          <Undo2 className="size-3" />
                          <span>
                            {isKhmer ? 'ត្រឡប់ទៅប្រើតម្លៃសាលាកណ្តាល' : 'Revert to Central'}
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {canEdit && (
            <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={isSaving}
                className="gap-1.5 text-xs text-slate-600"
              >
                <RotateCcw className="size-3.5" />
                <span>{isKhmer ? 'បោះបង់ការផ្លាស់ប្តូរ' : 'Discard Changes'}</span>
              </Button>

              <Button
                type="submit"
                size="sm"
                disabled={isSaving}
                className="gap-1.5 bg-[#023e8a] text-xs font-semibold text-white hover:bg-[#00509d]"
              >
                <Save className="size-3.5" />
                <span>
                  {isSaving
                    ? isKhmer
                      ? 'កំពុងរក្សាទុក...'
                      : 'Saving...'
                    : isKhmer
                      ? 'រក្សាទុកការកំណត់'
                      : 'Save Configuration'}
                </span>
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};
