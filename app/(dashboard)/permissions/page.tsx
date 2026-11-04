import { Key, ShieldCheck } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'Permissions Directory · SNP-SMS',
  description: 'Full catalog of RBAC granular permission keys across all system modules',
};

const PERMISSION_GROUPS = [
  {
    module: 'School & Organization',
    permissions: [
      {
        key: 'school.view.all_branches',
        desc: 'View global school profile and organizational settings',
      },
      {
        key: 'school.edit.all_branches',
        desc: 'Modify school organization profile and contact info',
      },
      {
        key: 'branch.view.all_branches',
        desc: 'View all campus branches across the school network',
      },
      { key: 'branch.create.all_branches', desc: 'Provision new campus branches' },
      { key: 'branch.edit.all_branches', desc: 'Modify campus branch parameters' },
      { key: 'branch.delete.all_branches', desc: 'Deactivate campus branch records' },
    ],
  },
  {
    module: 'Departments & Positions',
    permissions: [
      { key: 'department.view.own_branch', desc: 'View departments in permitted branches' },
      { key: 'department.create.own_branch', desc: 'Create departments in permitted branches' },
      { key: 'department.edit.own_branch', desc: 'Update departmental structure' },
      { key: 'position.view.own_branch', desc: 'View staff job positions and titles' },
      { key: 'position.create.own_branch', desc: 'Create staff job positions' },
      { key: 'position.edit.own_branch', desc: 'Modify job position properties' },
    ],
  },
  {
    module: 'Employees & Users',
    permissions: [
      { key: 'employee.view.own_branch', desc: 'View employee directory in permitted branches' },
      { key: 'employee.create.own_branch', desc: 'Register staff members and teachers' },
      {
        key: 'employee.edit.own_branch',
        desc: 'Update employee demographic and placement details',
      },
      { key: 'employee.delete.own_branch', desc: 'Soft-delete employee master records' },
      { key: 'user.view.all_branches', desc: 'View all provisioned user accounts' },
      { key: 'user.create.all_branches', desc: 'Provision new user credentials and roles' },
      { key: 'user.edit.all_branches', desc: 'Modify credentials, roles, and branch boundaries' },
      { key: 'user.delete.all_branches', desc: 'Deactivate user accounts' },
    ],
  },
  {
    module: 'Academic Core',
    permissions: [
      { key: 'program.view.own_branch', desc: 'View educational curriculum programs' },
      { key: 'program.create.own_branch', desc: 'Create curriculum programs' },
      { key: 'level.view.own_branch', desc: 'View grade levels within programs' },
      { key: 'level.create.own_branch', desc: 'Create grade levels' },
      { key: 'subject.view.own_branch', desc: 'View course subjects' },
      { key: 'subject.create.own_branch', desc: 'Create course subjects' },
      { key: 'class.view.own_branch', desc: 'View class rosters and sections' },
      { key: 'class.create.own_branch', desc: 'Create classroom sections' },
      { key: 'academic_year.view.all_branches', desc: 'View academic year cycles' },
      { key: 'classroom.view.own_branch', desc: 'View physical classrooms' },
    ],
  },
  {
    module: 'System & Security',
    permissions: [
      { key: 'audit.view.own_branch', desc: 'Stream audit logs in permitted branches' },
      { key: 'audit.view.all_branches', desc: 'Stream global security and audit events' },
      { key: 'setting.view.all_branches', desc: 'Inspect system settings and parameters' },
      { key: 'setting.edit.all_branches', desc: 'Modify system parameters and safeguards' },
    ],
  },
];

export default function PermissionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              Permissions Matrix
            </h1>
            <Badge tone="neutral">V0.1 Core Foundation</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Granular permission dictionary governing resource operations across own-branch and
            all-branch scopes.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Key className="size-4 text-[#00509d]" />
          <span>RBAC Keys Directory</span>
        </div>
      </div>

      <div className="space-y-4">
        {PERMISSION_GROUPS.map((group) => (
          <Card key={group.module} className="border border-slate-200 bg-white">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#00509d]" />
                <h2 className="text-sm font-bold text-slate-900">{group.module}</h2>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {group.permissions.map((p) => (
                  <div
                    key={p.key}
                    className="rounded-md border border-slate-100 bg-slate-50/60 p-2.5 transition-colors hover:bg-slate-50"
                  >
                    <code className="block font-mono text-xs font-semibold text-[#00509d]">
                      {p.key}
                    </code>
                    <p className="mt-1 text-xs text-slate-500">{p.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
