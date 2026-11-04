'use client';

import * as React from 'react';
import { Plus } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnnouncementDialog } from '@/features/announcements/components/announcement-dialog';
import { AnnouncementList } from '@/features/announcements/components/announcement-list';
import type { AnnouncementItem } from '@/features/announcements/types';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { useAuth } from '@/features/auth/context/auth-context';
import { useTranslation } from '@/lib/i18n';

export default function AnnouncementsPage() {
  const { isKhmer } = useTranslation();
  const { currentBranchId, hasPermission } = useAuth();

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = React.useState<AnnouncementItem | null>(
    null,
  );

  const canCreate =
    hasPermission('announcement.create.own_branch') ||
    hasPermission('announcement.create.all_branches');

  const effectiveBranchId = currentBranchId !== 'all' ? currentBranchId : undefined;

  const handleCreateNew = () => {
    setEditingAnnouncement(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (announcement: AnnouncementItem) => {
    setEditingAnnouncement(announcement);
    setIsDialogOpen(true);
  };

  return (
    <PermissionGuard
      requiredAnyPermission={['announcement.view.own_branch', 'announcement.view.all_branches']}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {isKhmer ? 'សេចក្តីជូនដំណឹងទូទៅ' : 'Campus Announcements'}
              </h1>
              <Badge className="bg-[#023e8a] text-white">V1.1B Hub</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {isKhmer
                ? 'ផ្សព្វផ្សាយដំណឹងផ្លូវការ ការជូនដំណឹងបន្ទាន់ និងសារស្វាគមន៍ទូទាំងស្ថាប័ន'
                : 'Publish institutional notices, emergency advisories, and campus broadcasts.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {canCreate && (
              <Button
                onClick={handleCreateNew}
                className="bg-[#023e8a] text-white hover:bg-[#00509d]"
              >
                <Plus className="mr-2 size-4" />
                {isKhmer ? 'បង្កើតសេចក្តីជូនដំណឹង' : 'Post Announcement'}
              </Button>
            )}
          </div>
        </div>

        <React.Suspense
          fallback={
            <div className="p-8 text-center text-xs text-slate-500">
              {isKhmer ? 'កំពុងផ្ទុកសេចក្តីជូនដំណឹង...' : 'Loading announcements...'}
            </div>
          }
        >
          <AnnouncementList
            branchId={effectiveBranchId}
            onEdit={handleEdit}
            onCreateNew={handleCreateNew}
          />
        </React.Suspense>

        <AnnouncementDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          branchId={effectiveBranchId}
          announcement={editingAnnouncement}
        />
      </div>
    </PermissionGuard>
  );
}
