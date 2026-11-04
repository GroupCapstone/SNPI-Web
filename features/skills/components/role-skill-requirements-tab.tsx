'use client';

import * as React from 'react';
import { Check, Plus, Trash2, X } from '@/components/icons';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';

import {
  useAddRoleRequirementMutation,
  useDeleteRoleRequirementMutation,
  useRoleRequirementsQuery,
  useSkillsQuery,
} from '../hooks/use-skills';
import type { RoleSkillRequirement } from '../types';

interface RoleSkillRequirementsTabProps {
  roleId: string;
}

export const RoleSkillRequirementsTab = ({ roleId }: RoleSkillRequirementsTabProps) => {
  const { data: requirementsData, isLoading } = useRoleRequirementsQuery(roleId);
  const { data: allSkillsData } = useSkillsQuery({ isActive: true, limit: 100 });

  const addMutation = useAddRoleRequirementMutation();
  const deleteMutation = useDeleteRoleRequirementMutation();

  const requirements = requirementsData?.data ?? [];
  const allSkills = allSkillsData?.data ?? [];

  const [isAdding, setIsAdding] = React.useState(false);
  const [selectedSkillId, setSelectedSkillId] = React.useState('');
  const [selectedLevel, setSelectedLevel] = React.useState<number>(3);
  const [isRequired, setIsRequired] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Filter out skills already assigned
  const assignedSkillIds = new Set(
    requirements.map((r) =>
      typeof r.skillId === 'object' && r.skillId !== null ? r.skillId._id : String(r.skillId),
    ),
  );
  const availableSkills = allSkills.filter((s) => !assignedSkillIds.has(s._id));

  const handleAdd = async () => {
    try {
      setError(null);
      if (!selectedSkillId) {
        setError('Please select a skill');
        return;
      }

      await addMutation.mutateAsync({
        roleId,
        skillId: selectedSkillId,
        requiredLevel: selectedLevel,
        isRequired,
      });

      setIsAdding(false);
      setSelectedSkillId('');
      setSelectedLevel(3);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to assign requirement';
      setError(msg);
    }
  };

  const handleDelete = async (req: RoleSkillRequirement) => {
    const skillName =
      typeof req.skillId === 'object' && req.skillId !== null ? req.skillId.name : 'Skill';
    if (window.confirm(`Remove required competency "${skillName}" from role?`)) {
      await deleteMutation.mutateAsync(req._id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-900">
            Required Competencies & Proficiency Targets ({requirements.length})
          </h4>
          <p className="text-xs text-slate-500">
            Define institutional competency benchmarks for this role.
          </p>
        </div>

        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            size="sm"
            className="bg-[#023e8a] text-xs hover:bg-[#00509d]"
          >
            <Plus className="mr-1 size-3.5" />
            Add Requirement
          </Button>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-700">
          {error}
        </div>
      )}

      {/* ADD REQUIREMENT FORM */}
      {isAdding && (
        <Card className="border border-blue-200 bg-blue-50/30 p-3.5">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-blue-100 pb-2">
              <span className="text-xs font-bold text-[#00509d]">Assign Skill Requirement</span>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Competency</label>
                <Select
                  value={selectedSkillId}
                  onChange={(e) => setSelectedSkillId(e.target.value)}
                  className="h-8 text-xs"
                >
                  <option value="">Select a skill from catalog...</option>
                  {availableSkills.map((s) => (
                    <option key={s._id} value={s._id}>
                      [{s.code}] {s.name} ({s.category})
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Target Level</label>
                <Select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(Number(e.target.value))}
                  className="h-8 text-xs"
                >
                  <option value={1}>Level 1 - Basic</option>
                  <option value={2}>Level 2 - Developing</option>
                  <option value={3}>Level 3 - Competent</option>
                  <option value={4}>Level 4 - Advanced</option>
                  <option value={5}>Level 5 - Expert</option>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={isRequired}
                  onChange={(e) => setIsRequired(e.target.checked)}
                  className="size-4 rounded border-slate-300 text-[#00509d]"
                />
                <span>Mandatory Requirement (blocks role certification if unmet)</span>
              </label>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleAdd}
                  disabled={addMutation.isPending}
                  className="bg-[#023e8a] text-xs hover:bg-[#00509d]"
                >
                  {addMutation.isPending ? 'Saving...' : 'Save Requirement'}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* REQUIREMENTS LIST */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold text-slate-600">
            <tr>
              <th className="px-4 py-2.5">Competency Code & Title</th>
              <th className="px-4 py-2.5">Category</th>
              <th className="px-4 py-2.5 text-center">Required Proficiency</th>
              <th className="px-4 py-2.5 text-center">Mandatory</th>
              <th className="px-4 py-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-xs text-slate-500">
                  Loading role requirements...
                </td>
              </tr>
            ) : requirements.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400">
                  No competency requirements defined for this role.
                </td>
              </tr>
            ) : (
              requirements.map((req) => {
                const skillObj = req.skillId;
                const skillName =
                  typeof skillObj === 'object' && skillObj !== null ? skillObj.name : 'Skill';
                const skillCode =
                  typeof skillObj === 'object' && skillObj !== null ? skillObj.code : '';
                const category =
                  typeof skillObj === 'object' && skillObj !== null ? skillObj.category : 'general';

                return (
                  <tr key={req._id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-2.5">
                      <div className="flex min-w-0 flex-col">
                        <span className="font-semibold text-slate-900">{skillName}</span>
                        {skillCode && (
                          <span className="font-mono text-xs text-slate-500">{skillCode}</span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-2.5">
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-semibold text-slate-700 uppercase">
                        {category}
                      </span>
                    </td>

                    <td className="px-4 py-2.5 text-center">
                      <span className="rounded bg-blue-50 px-2 py-0.5 font-bold text-[#00509d]">
                        Level {req.requiredLevel} / 5
                      </span>
                    </td>

                    <td className="px-4 py-2.5 text-center">
                      {req.isRequired ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                          <Check className="size-3.5 text-emerald-600" />
                          Mandatory
                        </span>
                      ) : (
                        <span className="text-slate-400">Optional</span>
                      )}
                    </td>

                    <td className="px-4 py-2.5 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(req)}
                        className="size-7 p-0 text-slate-400 hover:text-rose-600"
                        title="Delete Requirement"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
