'use client';

import * as React from 'react';
import {
  CheckCircle2,
  Clock,
  MessageSquare,
  Phone,
  PhoneCall,
  Search,
  User,
  Users,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTranslation } from '@/lib/i18n';
import { useParentContactLogsQuery } from '../hooks/use-notifications';
import type { ContactOutcome, ContactPurpose, ContactType, ParentContactLogItem } from '../types';

interface ParentContactLogTableProps {
  branchId?: string;
  studentId?: string;
}

export const ParentContactLogTable: React.FC<ParentContactLogTableProps> = ({
  branchId,
  studentId,
}) => {
  const { isKhmer } = useTranslation();
  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [contactType, setContactType] = React.useState<ContactType | ''>('');
  const [purpose, setPurpose] = React.useState<ContactPurpose | ''>('');
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError, refetch } = useParentContactLogsQuery({
    page,
    limit: 15,
    branchId: branchId && branchId !== 'all' ? branchId : undefined,
    studentId: studentId || undefined,
    contactType: contactType || undefined,
    purpose: purpose || undefined,
    search: debouncedSearch || undefined,
  });

  const logs = data?.data ?? [];
  const pagination = data?.pagination;

  const renderContactTypeBadge = (type: ContactType) => {
    switch (type) {
      case 'phone_call':
        return (
          <Badge className="flex items-center gap-1 bg-[#023e8a] px-2 py-0.5 text-xs font-medium text-white hover:bg-[#00509d]">
            <Phone className="size-3.5" />
            {isKhmer ? 'ទូរស័ព្ទ' : 'Phone Call'}
          </Badge>
        );
      case 'telegram':
        return (
          <Badge className="flex items-center gap-1 bg-[#0088cc] px-2 py-0.5 text-xs font-medium text-white hover:bg-[#0077b5]">
            <SendIcon className="size-3.5" />
            Telegram
          </Badge>
        );
      case 'sms':
        return (
          <Badge className="flex items-center gap-1 bg-[#4361ee] px-2 py-0.5 text-xs font-medium text-white hover:bg-[#3a0ca3]">
            <MessageSquare className="size-3.5" />
            SMS
          </Badge>
        );
      case 'in_person':
        return (
          <Badge className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 text-xs font-medium text-white">
            <Users className="size-3.5" />
            {isKhmer ? 'ជួបផ្ទាល់' : 'In Person'}
          </Badge>
        );
      default:
        return <Badge tone="neutral">{type}</Badge>;
    }
  };

  const renderPurposeBadge = (pur: ContactPurpose) => {
    switch (pur) {
      case 'absence':
        return (
          <Badge className="border border-rose-200 bg-rose-50 text-rose-700">
            {isKhmer ? 'អវត្តមាន' : 'Absence'}
          </Badge>
        );
      case 'tuition':
        return (
          <Badge className="border border-amber-200 bg-amber-50 text-amber-800">
            {isKhmer ? 'ថ្លៃសិក្សា' : 'Tuition'}
          </Badge>
        );
      case 'behavior':
        return (
          <Badge className="border border-purple-200 bg-purple-50 text-purple-700">
            {isKhmer ? 'វិន័យ' : 'Behavior'}
          </Badge>
        );
      case 'academic':
        return (
          <Badge className="border border-blue-200 bg-blue-50 text-blue-700">
            {isKhmer ? 'ការសិក្សា' : 'Academic'}
          </Badge>
        );
      default:
        return <Badge tone="neutral">{pur}</Badge>;
    }
  };

  const renderOutcomeBadge = (outcome: ContactOutcome) => {
    switch (outcome) {
      case 'reached':
        return (
          <Badge className="flex items-center gap-1 border border-emerald-200 bg-emerald-50 text-emerald-700">
            <CheckCircle2 className="size-3 text-emerald-600" />
            {isKhmer ? 'បានជួប' : 'Reached'}
          </Badge>
        );
      case 'no_answer':
        return (
          <Badge className="flex items-center gap-1 border border-rose-200 bg-rose-50 text-rose-700">
            <Clock className="size-3 text-rose-500" />
            {isKhmer ? 'មិនលើក' : 'No Answer'}
          </Badge>
        );
      case 'left_message':
        return (
          <Badge className="flex items-center gap-1 border border-blue-200 bg-blue-50 text-blue-700">
            <MessageSquare className="size-3 text-blue-500" />
            {isKhmer ? 'ផ្ញើសារទុក' : 'Left Message'}
          </Badge>
        );
      case 'callback_requested':
        return (
          <Badge className="flex items-center gap-1 border border-amber-200 bg-amber-50 text-amber-800">
            <PhoneCall className="size-3 text-amber-600" />
            {isKhmer ? 'ស្នើតេត្រឡប់' : 'Callback Req'}
          </Badge>
        );
      case 'resolved':
        return (
          <Badge className="flex items-center gap-1 border border-emerald-300 bg-emerald-100 font-semibold text-emerald-800">
            <CheckCircle2 className="size-3 text-emerald-700" />
            {isKhmer ? 'ដោះស្រាយរួច' : 'Resolved'}
          </Badge>
        );
      default:
        return <Badge tone="neutral">{outcome}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <div className="relative min-w-[220px] flex-1 sm:max-w-xs">
            <Search className="absolute top-2.5 left-2.5 size-4 text-slate-400" />
            <Input
              type="search"
              placeholder={
                isKhmer
                  ? 'ស្វែងរកតាមឈ្មោះសិស្ស, អាណាព្យាបាល...'
                  : 'Search by student, guardian, notes...'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9 text-xs"
            />
          </div>

          <select
            value={contactType}
            onChange={(e) => {
              setContactType(e.target.value as ContactType);
              setPage(1);
            }}
            className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm focus:border-[#023e8a] focus:outline-none"
          >
            <option value="">{isKhmer ? 'គ្រប់មធ្យោបាយ' : 'All Channels'}</option>
            <option value="phone_call">{isKhmer ? 'ការហៅទូរស័ព្ទ' : 'Phone Call'}</option>
            <option value="telegram">Telegram</option>
            <option value="sms">SMS</option>
            <option value="in_person">{isKhmer ? 'ជួបផ្ទាល់' : 'In Person'}</option>
          </select>

          <select
            value={purpose}
            onChange={(e) => {
              setPurpose(e.target.value as ContactPurpose);
              setPage(1);
            }}
            className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm focus:border-[#023e8a] focus:outline-none"
          >
            <option value="">{isKhmer ? 'គ្រប់គោលបំណង' : 'All Purposes'}</option>
            <option value="absence">{isKhmer ? 'អវត្តមាន' : 'Absence'}</option>
            <option value="tuition">{isKhmer ? 'ថ្លៃសិក្សា' : 'Tuition'}</option>
            <option value="behavior">{isKhmer ? 'វិន័យ' : 'Behavior'}</option>
            <option value="academic">{isKhmer ? 'ការសិក្សា' : 'Academic'}</option>
            <option value="general">{isKhmer ? 'ទូទៅ' : 'General'}</option>
          </select>
        </div>

        <Button variant="outline" size="sm" onClick={() => refetch()} className="h-9 text-xs">
          {isKhmer ? 'ផ្ទុកឡើងវិញ' : 'Refresh'}
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/80">
              <TableHead className="w-[140px] text-xs font-semibold text-slate-700">
                {isKhmer ? 'កាលបរិច្ឆេទ' : 'Date & Time'}
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">
                {isKhmer ? 'សិស្ស' : 'Student'}
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">
                {isKhmer ? 'អាណាព្យាបាល' : 'Guardian Contact'}
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">
                {isKhmer ? 'មធ្យោបាយ' : 'Method'}
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">
                {isKhmer ? 'គោលបំណង' : 'Purpose'}
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">
                {isKhmer ? 'លទ្ធផល' : 'Outcome'}
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">
                {isKhmer ? 'អ្នកកត់ត្រា' : 'Recorded By'}
              </TableHead>
              <TableHead className="min-w-[180px] text-xs font-semibold text-slate-700">
                {isKhmer ? 'កំណត់សម្គាល់' : 'Notes'}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell colSpan={8} className="py-3">
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-xs text-rose-500">
                  {isKhmer
                    ? 'មានបញ្ហាក្នុងការទាញយកកំណត់ត្រា'
                    : 'Failed to load parent contact logs.'}
                </TableCell>
              </TableRow>
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-xs text-slate-500">
                  <User className="mx-auto mb-2 size-8 text-slate-300" />
                  <p className="font-medium text-slate-600">
                    {isKhmer ? 'មិនមានកំណត់ត្រាទំនាក់ទំនងទេ' : 'No parent outreach logs found'}
                  </p>
                  <p className="mt-1 text-slate-400">
                    {isKhmer
                      ? 'កំណត់ត្រានឹងបង្ហាញនៅទីនេះនៅពេលបុគ្គលិកធ្វើការទាក់ទងអាណាព្យាបាល'
                      : 'Logs appear here when staff reach out to guardians.'}
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              logs.map((item: ParentContactLogItem) => {
                const s = item.studentId;
                const studentDisplayName =
                  typeof s === 'object' && s !== null
                    ? `${s.lastName} ${s.firstName} ${s.khmerName ? `(${s.khmerName})` : ''}`
                    : 'Unknown Student';
                const studentCode = typeof s === 'object' && s !== null ? s.studentId : '';

                return (
                  <TableRow key={item._id} className="hover:bg-slate-50/50">
                    <TableCell className="text-xs whitespace-nowrap text-slate-600">
                      {new Date(item.contactDate || item.createdAt).toLocaleDateString(
                        isKhmer ? 'km-KH' : 'en-US',
                        {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        },
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-900">
                          {studentDisplayName}
                        </span>
                        {studentCode && (
                          <span className="font-mono text-xs text-slate-500">{studentCode}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-slate-800">
                          {item.guardianName}
                        </span>
                        {item.guardianPhone && (
                          <span className="font-mono text-xs text-slate-500">
                            {item.guardianPhone}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{renderContactTypeBadge(item.contactType)}</TableCell>
                    <TableCell>{renderPurposeBadge(item.purpose)}</TableCell>
                    <TableCell>{renderOutcomeBadge(item.outcome)}</TableCell>
                    <TableCell className="text-xs text-slate-600">
                      {item.staffName || 'System'}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-xs text-slate-600">
                      {item.notes}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-xs text-slate-600">
            <div>
              {isKhmer
                ? `ទំព័រទី ${pagination.page} នៃ ${pagination.totalPages} (${pagination.total} កំណត់ត្រា)`
                : `Page ${pagination.page} of ${pagination.totalPages} (${pagination.total} total)`}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="h-8 text-xs"
              >
                {isKhmer ? 'ថយក្រោយ' : 'Previous'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="h-8 text-xs"
              >
                {isKhmer ? 'បន្ទាប់' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
