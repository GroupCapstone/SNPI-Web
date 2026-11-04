'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  Edit2,
  FileText,
  Heart,
  Home,
  Mail,
  MapPin,
  Phone,
  Printer,
  ShieldCheck,
  User,
  Users,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmployeeSkillTab } from '@/features/skills/components/employee-skill-tab';
import { useAuth } from '@/features/auth/context/auth-context';

import { useEmployeeQuery } from '../hooks/use-employees';
import type { EmployeeStatus } from '../types';

interface EmployeeProfileProps {
  id: string;
}

type ProfileTab =
  | 'overview'
  | 'employment'
  | 'personal'
  | 'contact'
  | 'education'
  | 'competencies'
  | 'family'
  | 'documents';

export const EmployeeProfile = ({ id }: EmployeeProfileProps) => {
  const router = useRouter();
  const { hasPermission } = useAuth();
  const canViewDirectory =
    hasPermission('employee.view.own_department') ||
    hasPermission('employee.view.own_branch') ||
    hasPermission('employee.view.all_branches');
  const canEdit =
    hasPermission('employee.edit.own_branch') || hasPermission('employee.edit.all_branches');
  const canViewUsers =
    hasPermission('user.view.own_branch') || hasPermission('user.view.all_branches');
  const [activeTab, setActiveTab] = React.useState<ProfileTab>('overview');
  const { data, isLoading, isError, refetch } = useEmployeeQuery(id);

  const employee = data?.data;

  const getStatusTone = (status?: EmployeeStatus) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'on_leave':
        return 'warning';
      case 'suspended':
      case 'terminated':
        return 'danger';
      case 'resigned':
      case 'inactive':
      default:
        return 'neutral';
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-slate-500">
          <div className="size-5 animate-spin rounded-full border-2 border-[#00509d] border-t-transparent" />
          <span>Loading employee profile...</span>
        </div>
      </div>
    );
  }

  if (isError || !employee) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-8 text-center">
        <p className="text-sm font-semibold text-rose-900">Failed to load employee profile</p>
        <p className="mt-1 text-xs text-rose-700">
          The requested staff record could not be found or you lack permission.
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(canViewDirectory ? '/employees' : '/dashboard')}
          >
            Back to Directory
          </Button>
          <Button size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const branchName =
    typeof employee.branchId === 'object' && employee.branchId !== null
      ? `${employee.branchId.branchCode} · ${employee.branchId.branchNameEn}`
      : String(employee.branchId);

  const departmentName =
    typeof employee.departmentId === 'object' && employee.departmentId !== null
      ? `${employee.departmentId.code} · ${employee.departmentId.nameEn}`
      : String(employee.departmentId);

  const positionName =
    typeof employee.positionId === 'object' && employee.positionId !== null
      ? `${employee.positionId.code} — ${employee.positionId.nameEn}`
      : String(employee.positionId);

  const schoolName =
    typeof employee.schoolId === 'object' && employee.schoolId !== null
      ? `${employee.schoolId.code} · ${employee.schoolId.nameEn}`
      : String(employee.schoolId);

  const primaryPhone = employee.primaryPhone || employee.phone || 'Not provided';

  return (
    <div className="space-y-6">
      {/* Top Header Navigation */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(canViewDirectory ? '/employees' : '/dashboard')}
            className="h-9 w-9 p-0"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950">Employee Master</h1>
              <Badge tone="neutral">{employee.employeeId}</Badge>
              <Badge tone={getStatusTone(employee.status)}>{employee.status}</Badge>
            </div>
            <p className="mt-0.5 text-xs text-slate-500">Staff Member · {branchName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="text-xs text-slate-600"
          >
            <Printer className="mr-1.5 size-3.5" />
            Print Profile
          </Button>
          {canEdit && (
            <Button
              size="sm"
              onClick={() => router.push(`/employees/${employee._id}/edit`)}
              className="bg-[#023e8a] hover:bg-[#00509d]"
            >
              <Edit2 className="mr-1.5 size-3.5" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Hero Profile Card */}
      <Card className="border border-slate-200 bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {employee.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={employee.photo}
                  alt={employee.firstName}
                  className="size-20 rounded-2xl border-2 border-slate-100 object-cover"
                />
              ) : (
                <div className="flex size-20 items-center justify-center rounded-2xl bg-blue-50 text-2xl font-bold text-[#00509d]">
                  {employee.firstName.charAt(0)}
                  {employee.lastName.charAt(0)}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">
                    {employee.firstName} {employee.lastName}
                  </h2>
                  <span className="text-base font-normal text-slate-500">
                    ({employee.khmerName})
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="size-3.5 text-[#00509d]" />
                    <span className="font-semibold text-slate-800">{positionName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Building2 className="size-3.5 text-slate-400" />
                    <span>{departmentName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-slate-400" />
                    <span>{branchName}</span>
                  </div>
                </div>

                <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-700 capitalize">
                    {employee.employmentType.replace('_', ' ')}
                  </span>
                  {employee.legacyEmployeeNumber && (
                    <span className="rounded-md bg-amber-50 px-2 py-0.5 font-mono text-xs font-medium text-amber-800">
                      Excel Ref: #{employee.legacyEmployeeNumber}
                    </span>
                  )}
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">
                    Joined: {new Date(employee.joiningDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50/75 p-4 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="size-3.5 text-[#00509d]" />
                <span className="font-medium">{primaryPhone}</span>
              </div>
              {employee.email && (
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="size-3.5 text-[#00509d]" />
                  <span>{employee.email}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-700">
                <Calendar className="size-3.5 text-[#00509d]" />
                <span>DOB: {new Date(employee.dateOfBirth).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-2">
        {(
          [
            { key: 'overview', label: 'Overview', icon: Users },
            { key: 'employment', label: 'Employment', icon: Building2 },
            { key: 'personal', label: 'Personal & Birthplace', icon: User },
            { key: 'contact', label: 'Contact & Address', icon: Home },
            { key: 'education', label: 'Education & Degrees', icon: BookOpen },
            { key: 'competencies', label: 'Skills & Competencies', icon: Award },
            { key: 'family', label: 'Family Information', icon: Heart },
            { key: 'documents', label: 'Documents', icon: FileText },
          ] as {
            key: ProfileTab;
            label: string;
            icon: React.ComponentType<{ className?: string }>;
          }[]
        ).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#023e8a] text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="size-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Key Facts Card */}
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Key Staff Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Gender</span>
                <span className="font-medium text-slate-900 capitalize">{employee.gender}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Nationality</span>
                <span className="font-medium text-slate-900">
                  {employee.nationality || 'Cambodian'}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">National ID</span>
                <span className="font-mono font-medium text-slate-900">
                  {employee.nationalIdNumber || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Marital Status</span>
                <span className="font-medium text-slate-900 capitalize">
                  {employee.maritalStatus || 'Single'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Education</span>
                <span className="font-medium text-slate-900 capitalize">
                  {employee.educationLevel?.replace('_', ' ') || 'Bachelor'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Placement & Organization */}
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Organizational Hierarchy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4 text-xs">
              <div>
                <span className="text-xs text-slate-500">School Organization</span>
                <p className="font-medium text-slate-900">{schoolName}</p>
              </div>
              <div>
                <span className="text-xs text-slate-500">Branch Campus</span>
                <p className="font-medium text-slate-900">{branchName}</p>
              </div>
              <div>
                <span className="text-xs text-slate-500">Department</span>
                <p className="font-medium text-slate-900">{departmentName}</p>
              </div>
              <div>
                <span className="text-xs text-slate-500">Position</span>
                <p className="font-medium text-[#00509d]">{positionName}</p>
              </div>
            </CardContent>
          </Card>

          {/* System Account & Actions */}
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                <ShieldCheck className="size-4 text-[#00509d]" />
                User Account & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 text-xs">
              <p className="text-slate-500">
                Employees can be linked to a system login account for dashboard and module access.
              </p>
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                <span className="text-xs font-semibold text-slate-600 uppercase">User Account</span>
                <p className="mt-0.5 text-slate-900">
                  Manage accounts under System / User Management
                </p>
              </div>
              {canViewUsers && (
                <Link href="/users">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    View User Accounts
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB CONTENT: EMPLOYMENT */}
      {activeTab === 'employment' && (
        <Card className="border border-slate-200 bg-white">
          <CardHeader className="border-b border-slate-100 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-900">
              Employment Details & History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6 text-xs">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <span className="text-slate-400">Employee ID</span>
                <p className="mt-0.5 font-mono text-sm font-bold text-slate-900">
                  {employee.employeeId}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Legacy Employee Number (Excel)</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800">
                  {employee.legacyEmployeeNumber || 'None'}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Employment Status</span>
                <div className="mt-0.5">
                  <Badge tone={getStatusTone(employee.status)}>{employee.status}</Badge>
                </div>
              </div>
              <div>
                <span className="text-slate-400">Employment Type</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800 capitalize">
                  {employee.employmentType.replace('_', ' ')}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Joining Date</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800">
                  {new Date(employee.joiningDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Record Created</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800">
                  {new Date(employee.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB CONTENT: PERSONAL & BIRTHPLACE */}
      {activeTab === 'personal' && (
        <div className="space-y-6">
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Personal Identification
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 p-6 text-xs sm:grid-cols-3">
              <div>
                <span className="text-slate-400">Full Name (Khmer)</span>
                <p className="mt-0.5 text-sm font-bold text-slate-900">{employee.khmerName}</p>
              </div>
              <div>
                <span className="text-slate-400">First Name (Latin)</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800">{employee.firstName}</p>
              </div>
              <div>
                <span className="text-slate-400">Last Name (Latin)</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800">{employee.lastName}</p>
              </div>
              <div>
                <span className="text-slate-400">Gender</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800 capitalize">
                  {employee.gender}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Date of Birth</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800">
                  {new Date(employee.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-slate-400">National ID Number</span>
                <p className="mt-0.5 font-mono text-sm font-medium text-slate-800">
                  {employee.nationalIdNumber || 'Not provided'}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Nationality</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800">
                  {employee.nationality || 'Cambodian'}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Ethnicity</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800">
                  {employee.ethnicity || 'Khmer'}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Marital Status & Children</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800 capitalize">
                  {employee.maritalStatus || 'Single'} · {employee.numberOfChildren ?? 0} Child(ren)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Birthplace */}
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Birthplace Information (ទីកន្លែងកំណើត)
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 p-6 text-xs sm:grid-cols-4">
              <div>
                <span className="text-slate-400">Province / Capital</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800">
                  {employee.birthplace?.province || 'Not provided'}
                </p>
              </div>
              <div>
                <span className="text-slate-400">District / Khan</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800">
                  {employee.birthplace?.district || 'Not provided'}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Commune / Sangkat</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800">
                  {employee.birthplace?.commune || 'Not provided'}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Village / Phum</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800">
                  {employee.birthplace?.village || 'Not provided'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB CONTENT: CONTACT & ADDRESS */}
      {activeTab === 'contact' && (
        <div className="space-y-6">
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Contact Channels
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 p-6 text-xs sm:grid-cols-3">
              <div>
                <span className="text-slate-400">Primary Phone (ខ្សែទី១)</span>
                <p className="mt-0.5 text-sm font-semibold text-slate-900">{primaryPhone}</p>
              </div>
              <div>
                <span className="text-slate-400">Secondary Phone (ខ្សែទី២)</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800">
                  {employee.secondaryPhone || 'Not provided'}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Work Email</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800">
                  {employee.email || 'Not provided'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Current Residential Address (អាសយដ្ឋានបច្ចុប្បន្ន)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6 text-xs">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div>
                  <span className="text-slate-400">Province / Capital</span>
                  <p className="mt-0.5 text-sm font-medium text-slate-800">
                    {employee.currentAddress?.province || 'Not provided'}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">District / Khan</span>
                  <p className="mt-0.5 text-sm font-medium text-slate-800">
                    {employee.currentAddress?.district || 'Not provided'}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Commune / Sangkat</span>
                  <p className="mt-0.5 text-sm font-medium text-slate-800">
                    {employee.currentAddress?.commune || 'Not provided'}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Village / Phum</span>
                  <p className="mt-0.5 text-sm font-medium text-slate-800">
                    {employee.currentAddress?.village || 'Not provided'}
                  </p>
                </div>
              </div>

              {(employee.currentAddress?.additionalAddress || employee.address) && (
                <div>
                  <span className="text-slate-400">Street / Additional Address</span>
                  <p className="mt-0.5 text-sm text-slate-800">
                    {employee.currentAddress?.additionalAddress || employee.address}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB CONTENT: EDUCATION & SKILLS */}
      {activeTab === 'education' && (
        <Card className="border border-slate-200 bg-white">
          <CardHeader className="border-b border-slate-100 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-900">
              Educational Qualifications & Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-6 text-xs">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <span className="text-slate-400">Highest Degree Level</span>
                <p className="mt-0.5 text-sm font-semibold text-slate-900 capitalize">
                  {employee.educationLevel?.replace('_', ' ') || 'Bachelor'}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Major / Specialization</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800">
                  {employee.major || 'Not specified'}
                </p>
              </div>
            </div>

            <div>
              <span className="text-slate-400">Foreign Languages</span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {employee.foreignLanguages && employee.foreignLanguages.length > 0 ? (
                  employee.foreignLanguages.map((lang) => (
                    <span
                      key={lang}
                      className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-[#00509d]"
                    >
                      {lang}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 italic">None listed</span>
                )}
              </div>
            </div>

            <div>
              <span className="text-slate-400">Other Skills & Competencies</span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {employee.otherSkills && employee.otherSkills.length > 0 ? (
                  employee.otherSkills.map((sk) => (
                    <span
                      key={sk}
                      className="rounded-md bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800"
                    >
                      {sk}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 italic">None listed</span>
                )}
              </div>
            </div>

            {employee.workExperienceSummary && (
              <div>
                <span className="text-slate-400">Work Experience Summary</span>
                <p className="mt-1 rounded-lg border border-slate-100 bg-slate-50 p-3 whitespace-pre-line text-slate-800">
                  {employee.workExperienceSummary}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* TAB CONTENT: COMPETENCIES & SKILLS */}
      {activeTab === 'competencies' && <EmployeeSkillTab employeeId={id} />}

      {/* TAB CONTENT: FAMILY */}
      {activeTab === 'family' && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Father Details (ឪពុក)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-5 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Name</span>
                <span className="font-semibold text-slate-900">
                  {employee.father?.name || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Age</span>
                <span className="text-slate-800">{employee.father?.age ?? '—'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Living Status</span>
                <span className="font-medium text-slate-800 capitalize">
                  {employee.father?.livingStatus || 'Living'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Occupation</span>
                <span className="text-slate-800">{employee.father?.occupation || '—'}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Mother Details (ម្តាយ)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-5 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Name</span>
                <span className="font-semibold text-slate-900">
                  {employee.mother?.name || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Age</span>
                <span className="text-slate-800">{employee.mother?.age ?? '—'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Living Status</span>
                <span className="font-medium text-slate-800 capitalize">
                  {employee.mother?.livingStatus || 'Living'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Occupation</span>
                <span className="text-slate-800">{employee.mother?.occupation || '—'}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB CONTENT: DOCUMENTS */}
      {activeTab === 'documents' && (
        <Card className="border border-slate-200 bg-white">
          <CardHeader className="border-b border-slate-100 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-900">
              Attached Documents & Certificates
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-xs">
            {employee.documents && employee.documents.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {employee.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <FileText className="size-5 shrink-0 text-[#00509d]" />
                      <div>
                        <span className="font-semibold text-slate-900">{doc.documentType}</span>
                        <p className="text-xs text-slate-500">{doc.fileName}</p>
                      </div>
                    </div>
                    {doc.fileUrl && (
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-medium text-[#00509d] hover:underline"
                      >
                        View File
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400">
                <FileText className="mx-auto size-8 text-slate-300" />
                <p className="mt-2 text-xs">No documents attached for this staff member.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
