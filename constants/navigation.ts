import type { LucideIcon } from '@/components/icons';
import {
  ArrowRightLeft,
  Award,
  Bell,
  BookMarked,
  BookOpen,
  BookOpenCheck,
  Building2,
  Calendar,
  CalendarCheck,
  CalendarDays,
  CalendarRange,
  ClipboardList,
  Clock,
  ContactRound,
  DollarSign,
  FileCheck,
  FileClock,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  History,
  Layers,
  LayoutDashboard,
  MapPinHouse,
  MessageSquare,
  PanelsTopLeft,
  Receipt,
  ReceiptText,
  School,
  Settings2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  UsersRound,
  CircleDollarSign,
} from '@/components/icons';

import { checkUserPermission } from '@/lib/permissions';

export interface NavigationItem {
  label: string;
  labelKh?: string;
  href: string;
  icon: LucideIcon;
  permission?: string;
  allowedPermissions?: string[];
}

export interface NavigationGroup {
  id?: string;
  label?: string;
  labelKh?: string;
  icon?: LucideIcon;
  items: NavigationItem[];
}

export const navigationGroups: NavigationGroup[] = [
  {
    id: 'dashboard',
    label: 'Dashboards',
    labelKh: 'ផ្ទាំងគ្រប់គ្រង',
    icon: LayoutDashboard,
    items: [
      {
        label: 'Overview',
        labelKh: 'ទិដ្ឋភាពទូទៅ',
        href: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        label: 'Executive',
        labelKh: 'ថ្នាក់ដឹកនាំ',
        href: '/dashboard/executive',
        icon: TrendingUp,
        allowedPermissions: ['report.view.own_branch', 'report.view.all_branches'],
      },
      {
        label: 'Staff & Teachers',
        labelKh: 'បុគ្គលិក និងគ្រូ',
        href: '/dashboard/staff-teacher',
        icon: GraduationCap,
        allowedPermissions: [
          'class.view.assigned_class',
          'class.view.own_branch',
          'class.view.all_branches',
          'attendance.view.assigned_class',
          'attendance.view.own_branch',
          'attendance.view.all_branches',
          'score.view.assigned_subject',
          'score.view.own_branch',
          'score.view.all_branches',
          'teacher_assignment.view.own_branch',
          'teacher_assignment.view.all_branches',
          'employee.view.own_record',
          'employee.view.own_department',
          'report.academic.view.own_branch',
          'report.academic.view.all_branches',
        ],
      },
      {
        label: 'Students',
        labelKh: 'សិស្ស',
        href: '/dashboard/students',
        icon: Users,
        allowedPermissions: [
          'student.view.assigned_class',
          'student.view.own_branch',
          'student.view.all_branches',
          'registration.view.own_branch',
          'registration.view.all_branches',
          'enrollment.view.own_branch',
          'enrollment.view.all_branches',
          'student_case.view.own_branch',
          'student_case.view.all_branches',
        ],
      },
      {
        label: 'Finance & Tuition',
        labelKh: 'ហិរញ្ញវត្ថុ និងថ្លៃសិក្សា',
        href: '/dashboard/finance',
        icon: CircleDollarSign,
        allowedPermissions: [
          'payment.view.own_branch',
          'payment.view.all_branches',
          'tuition.view.own_branch',
          'tuition.view.all_branches',
          'report.finance.view.own_branch',
          'report.finance.view.all_branches',
          'finance.payment.create.own_branch',
          'finance.payment.create.all_branches',
        ],
      },
      {
        label: 'HR & Workforce',
        labelKh: 'ធនធានមនុស្ស និងបុគ្គលិក',
        href: '/dashboard/hr',
        icon: UsersRound,
        allowedPermissions: ['employee.view.own_branch', 'employee.view.all_branches'],
      },
    ],
  },
  {
    id: 'organization',
    label: 'Organization',
    labelKh: 'រចនាសម្ព័ន្ធស្ថាប័ន',
    icon: Building2,
    items: [
      {
        label: 'School',
        labelKh: 'ព័ត៌មានសាលារៀន',
        href: '/organization/school',
        icon: School,
        permission: 'school.view.all_branches',
      },
      {
        label: 'Branches',
        labelKh: 'គ្រប់គ្រងសាខា',
        href: '/organization/branches',
        icon: Building2,
        permission: 'branch.view.own_branch',
      },
      {
        label: 'Departments',
        labelKh: 'ផ្នែក និងដេប៉ាតឺម៉ង់',
        href: '/organization/departments',
        icon: PanelsTopLeft,
        permission: 'department.view.own_branch',
        allowedPermissions: [
          'department.view.own_department',
          'department.view.own_branch',
          'department.view.all_branches',
        ],
      },
      {
        label: 'Positions',
        labelKh: 'មុខតំណែង និងតួនាទី',
        href: '/organization/positions',
        icon: ContactRound,
        permission: 'position.view.own_branch',
      },
    ],
  },
  {
    id: 'people',
    label: 'People',
    labelKh: 'បុគ្គលិក និងធនធានមនុស្ស',
    icon: UsersRound,
    items: [
      {
        label: 'Employees',
        labelKh: 'បញ្ជីបុគ្គលិក',
        href: '/employees',
        icon: UsersRound,
        permission: 'employee.view.own_branch',
        allowedPermissions: [
          'employee.view.own_department',
          'employee.view.own_branch',
          'employee.view.all_branches',
        ],
      },
    ],
  },
  {
    id: 'student-management',
    label: 'Student Management',
    labelKh: 'ការគ្រប់គ្រងសិស្ស',
    icon: Users,
    items: [
      {
        label: 'Students',
        labelKh: 'បញ្ជីសិស្ស',
        href: '/students',
        icon: Users,
        permission: 'student.view.own_branch',
        allowedPermissions: [
          'student.view.assigned_class',
          'student.view.own_branch',
          'student.view.all_branches',
        ],
      },
      {
        label: 'Guardians & Parents',
        labelKh: 'អាណាព្យាបាល និងឪពុកម្តាយ',
        href: '/guardians',
        icon: ContactRound,
        permission: 'student.view.own_branch',
      },
      {
        label: 'Student Status History',
        labelKh: 'ប្រវត្តិស្ថានភាពសិស្ស',
        href: '/student-status-history',
        icon: History,
        permission: 'student.view.own_branch',
      },
    ],
  },
  {
    id: 'admissions',
    label: 'Admissions',
    labelKh: 'ការចុះឈ្មោះចូលរៀន',
    icon: ClipboardList,
    items: [
      {
        label: 'Registrations',
        labelKh: 'ពាក្យស្នើសុំចុះឈ្មោះ',
        href: '/admissions/registrations',
        icon: ClipboardList,
        permission: 'registration.view.own_branch',
      },
      {
        label: 'Placement Tests',
        labelKh: 'តេស្តវាស់កម្រិត',
        href: '/admissions/placement-tests',
        icon: FileCheck,
        permission: 'placement_test.view.own_branch',
      },
      {
        label: 'Enrollments',
        labelKh: 'ការចុះឈ្មោះចូលថ្នាក់',
        href: '/enrollments',
        icon: UserCheck,
        permission: 'enrollment.view.own_branch',
      },
    ],
  },
  {
    id: 'academic-setup',
    label: 'Academic Setup',
    labelKh: 'ការរៀបចំកម្មវិធីសិក្សា',
    icon: BookOpen,
    items: [
      {
        label: 'Programs',
        labelKh: 'កម្មវិធីសិក្សា',
        href: '/programs',
        icon: GraduationCap,
        permission: 'program.view.own_branch',
      },
      {
        label: 'Levels',
        labelKh: 'កម្រិតសិក្សា',
        href: '/levels',
        icon: Layers,
        permission: 'level.view.own_branch',
      },
      {
        label: 'Subjects',
        labelKh: 'មុខវិជ្ជា',
        href: '/subjects',
        icon: BookOpen,
        permission: 'subject.view.own_branch',
        allowedPermissions: [
          'subject.view.assigned_subject',
          'subject.view.own_branch',
          'subject.view.all_branches',
        ],
      },
      {
        label: 'Curriculum',
        labelKh: 'កម្មវិធីសិក្សាលម្អិត',
        href: '/curriculum',
        icon: BookMarked,
        permission: 'curriculum.view.own_branch',
      },
      {
        label: 'Academic Years',
        labelKh: 'ឆ្នាំសិក្សា',
        href: '/academic-years',
        icon: CalendarRange,
        permission: 'academic_year.view.all_branches',
      },
      {
        label: 'Academic Periods / Terms',
        labelKh: 'ឆមាស និងវគ្គសិក្សា',
        href: '/academic-periods',
        icon: CalendarDays,
        permission: 'academic_period.view.own_branch',
      },
      {
        label: 'Classrooms',
        labelKh: 'បន្ទប់រៀន',
        href: '/classrooms',
        icon: MapPinHouse,
        permission: 'classroom.view.own_branch',
      },
      {
        label: 'Grade Schemes & Policy',
        labelKh: 'កម្រិតពិន្ទុ និងគោលការណ៍',
        href: '/academic/rules',
        icon: Award,
        permission: 'academic_rule.view.own_branch',
        allowedPermissions: ['academic_rule.view.own_branch', 'academic_rule.view.all_branches'],
      },
    ],
  },
  {
    id: 'academic-operations',
    label: 'Academic Operations',
    labelKh: 'ប្រតិបត្តិការសិក្សា',
    icon: GraduationCap,
    items: [
      {
        label: 'Intakes / Offerings',
        labelKh: 'វគ្គបើកថ្មី (Intakes)',
        href: '/intakes',
        icon: Calendar,
        permission: 'intake.view.own_branch',
      },
      {
        label: 'Classes',
        labelKh: 'គ្រប់គ្រងថ្នាក់រៀន',
        href: '/classes',
        icon: Users,
        permission: 'class.view.own_branch',
        allowedPermissions: [
          'class.view.assigned_class',
          'class.view.own_branch',
          'class.view.all_branches',
        ],
      },
      {
        label: 'Teacher Roster & Matrix',
        labelKh: 'បន្ទុកបង្រៀន និងបញ្ជីគ្រូ-សិស្ស',
        href: '/teacher-assignments',
        icon: UserCheck,
        permission: 'teacher_assignment.view.own_branch',
      },
      {
        label: 'Timetable',
        labelKh: 'កាលវិភាគសិក្សា',
        href: '/timetable',
        icon: Clock,
        permission: 'class.view.own_branch',
        allowedPermissions: [
          'class.view.assigned_class',
          'class.view.own_branch',
          'class.view.all_branches',
        ],
      },
      {
        label: 'Attendance',
        labelKh: 'កត់ត្រាវត្តមាន',
        href: '/attendance',
        icon: CalendarCheck,
        permission: 'attendance.view.own_branch',
        allowedPermissions: [
          'attendance.view.assigned_class',
          'attendance.view.own_branch',
          'attendance.view.all_branches',
        ],
      },
      {
        label: 'Leave & Medical Excuses',
        labelKh: 'ច្បាប់ឈប់ និងលិខិតពេទ្យ',
        href: '/attendance/leaves',
        icon: FileClock,
        permission: 'attendance.view.own_branch',
        allowedPermissions: [
          'attendance.view.assigned_class',
          'attendance.view.own_branch',
          'attendance.view.all_branches',
        ],
      },
      {
        label: 'Assessments & Exams',
        labelKh: 'ការវាយតម្លៃ និងប្រឡង',
        href: '/assessments',
        icon: GraduationCap,
        permission: 'assessment.view.own_branch',
        allowedPermissions: [
          'assessment.view.assigned_subject',
          'assessment.view.own_branch',
          'assessment.view.all_branches',
        ],
      },
      {
        label: 'Score Entry',
        labelKh: 'បញ្ចូលពិន្ទុ',
        href: '/scores',
        icon: FileSpreadsheet,
        permission: 'score.view.own_branch',
        allowedPermissions: [
          'score.view.assigned_subject',
          'score.view.own_branch',
          'score.view.all_branches',
        ],
      },
      {
        label: 'Term Results & Progression',
        labelKh: 'លទ្ធផលឆមាស និងឡើងថ្នាក់',
        href: '/term-results',
        icon: TrendingUp,
        permission: 'term_result.view.own_branch',
        allowedPermissions: [
          'term_result.view.assigned_class',
          'term_result.view.own_branch',
          'term_result.view.all_branches',
        ],
      },
      {
        label: 'Student Transfers',
        labelKh: 'ការផ្ទេរសិស្សរវាងសាខា',
        href: '/student-transfers',
        icon: ArrowRightLeft,
        permission: 'student_transfer.view.own_branch',
      },
      {
        label: 'Period & Year Rollover',
        labelKh: 'ផ្ទេរបញ្ចប់វគ្គ/ឆ្នាំ',
        href: '/academic-periods/rollover',
        icon: Sparkles,
        permission: 'rollover.view.own_branch',
      },
      {
        label: 'Certificates & Honors',
        labelKh: 'វិញ្ញាបនបត្រ និងកិត្តិយស',
        href: '/academic/certificates',
        icon: Award,
        permission: 'report_card.view.own_branch',
        allowedPermissions: [
          'report_card.view.own_branch',
          'report_card.view.all_branches',
          'report_card.generate.own_branch',
          'report_card.generate.all_branches',
        ],
      },
    ],
  },
  {
    id: 'finance',
    label: 'Finance & Billing',
    labelKh: 'ហិរញ្ញវត្ថុ និងការទូទាត់',
    icon: CircleDollarSign,
    items: [
      {
        label: 'Tuition Fees',
        labelKh: 'កម្រៃសិក្សា',
        href: '/finance/tuition',
        icon: DollarSign,
        permission: 'tuition.view.own_branch',
      },
      {
        label: 'Payments & Receipts',
        labelKh: 'ការទូទាត់ និងបង្កាន់ដៃ',
        href: '/finance/payments',
        icon: Receipt,
        permission: 'payment.view.own_branch',
      },
      {
        label: 'Finance Operations',
        labelKh: 'ប្រតិបត្តិការហិរញ្ញវត្ថុ',
        href: '/finance/operations',
        icon: CircleDollarSign,
        permission: 'payment.view.own_branch',
      },
      {
        label: 'Installment Plans',
        labelKh: 'ផែនការបង់រំលស់',
        href: '/finance/payment-plans',
        icon: ReceiptText,
        permission: 'payment.view.own_branch',
        allowedPermissions: [
          'payment.view.own_branch',
          'payment.view.all_branches',
          'finance.payment.create.own_branch',
          'finance.payment.create.all_branches',
        ],
      },
    ],
  },
  {
    id: 'communication',
    label: 'Communication',
    labelKh: 'ការប្រាស្រ័យទាក់ទង',
    icon: MessageSquare,
    items: [
      {
        label: 'Announcements',
        labelKh: 'សេចក្តីជូនដំណឹងទូទៅ',
        href: '/announcements',
        icon: Bell,
        permission: 'announcement.view.own_branch',
      },
      {
        label: 'Notifications & Outreach',
        labelKh: 'សារ និងការទំនាក់ទំនង',
        href: '/notifications',
        icon: MessageSquare,
        permission: 'notification.view.own_branch',
      },
    ],
  },
  {
    id: 'reporting',
    label: 'Reporting',
    labelKh: 'របាយការណ៍ និងស្ថិតិ',
    icon: FileText,
    items: [
      {
        label: 'Report Center',
        labelKh: 'មជ្ឈមណ្ឌលរបាយការណ៍',
        href: '/reports',
        icon: FileText,
        permission: 'report.view.own_branch',
      },
      {
        label: 'Student Reports',
        labelKh: 'របាយការណ៍សិស្ស',
        href: '/reports/students',
        icon: Users,
        permission: 'report.student.view.own_branch',
      },
      {
        label: 'Staff Reports',
        labelKh: 'របាយការណ៍បុគ្គលិក',
        href: '/reports/staff',
        icon: UserCheck,
        permission: 'employee.view.own_branch',
      },
      {
        label: 'Academic Reports',
        labelKh: 'របាយការណ៍លទ្ធផលសិក្សា',
        href: '/reports/academic',
        icon: GraduationCap,
        permission: 'report.academic.view.own_branch',
      },
      {
        label: 'Attendance Reports',
        labelKh: 'របាយការណ៍វត្តមាន',
        href: '/reports/attendance',
        icon: BookOpenCheck,
        permission: 'report.academic.view.own_branch',
      },
      {
        label: 'Financial Reports',
        labelKh: 'របាយការណ៍ហិរញ្ញវត្ថុ',
        href: '/reports/finance',
        icon: ReceiptText,
        permission: 'report.finance.view.own_branch',
      },
    ],
  },
  {
    id: 'users',
    label: 'User Management',
    labelKh: 'ការគ្រប់គ្រងគណនី',
    icon: ShieldCheck,
    items: [
      {
        label: 'Users',
        labelKh: 'គណនីអ្នកប្រើប្រាស់',
        href: '/users',
        icon: UsersRound,
        permission: 'user.view.own_branch',
      },
      {
        label: 'Roles & Permissions',
        labelKh: 'តួនាទី និងសិទ្ធិប្រើប្រាស់',
        href: '/roles',
        icon: ShieldCheck,
        permission: 'role.view.all_branches',
      },
    ],
  },
  {
    id: 'skills',
    label: 'Competency & Skills',
    labelKh: 'ជំនាញ និងសមត្ថភាព',
    icon: Award,
    items: [
      {
        label: 'Skills Catalog',
        labelKh: 'បញ្ជីជំនាញ',
        href: '/skills',
        icon: Award,
        permission: 'skill.view.own_branch',
      },
      {
        label: 'Skill Gap Analysis',
        labelKh: 'ការវិភាគគម្លាតជំនាញ',
        href: '/skills/gap-analysis',
        icon: TrendingUp,
        permission: 'skill_gap.view.own_branch',
        allowedPermissions: [
          'skill_gap.view.own_record',
          'skill_gap.view.own_branch',
          'skill_gap.view.all_branches',
        ],
      },
    ],
  },
  {
    id: 'system',
    label: 'System',
    labelKh: 'ប្រព័ន្ធ',
    icon: Settings2,
    items: [
      {
        label: 'Audit Logs',
        labelKh: 'កំណត់ត្រាសវនកម្ម',
        href: '/audit-logs',
        icon: FileClock,
        permission: 'audit.view.own_branch',
      },
      {
        label: 'Settings',
        labelKh: 'ការកំណត់ទូទៅ',
        href: '/settings',
        icon: Settings2,
        permission: 'setting.view.all_branches',
      },
    ],
  },
];

export const getVisibleNavigation = (
  permissions?: ReadonlySet<string>,
  userRoles?: string[],
): NavigationGroup[] => {
  if (!permissions) {
    return navigationGroups;
  }

  return navigationGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        if (item.allowedPermissions && item.allowedPermissions.length > 0) {
          return item.allowedPermissions.some((permission) =>
            checkUserPermission(permissions, permission, userRoles ?? []),
          );
        }
        if (!item.permission) return true;
        const alternatives = [item.permission];
        if (item.permission.endsWith('.own_branch')) {
          const prefix = item.permission.slice(0, -'.own_branch'.length);
          alternatives.push(`${prefix}.all_branches`);
        }
        return alternatives.some((permission) =>
          checkUserPermission(permissions, permission, userRoles ?? []),
        );
      }),
    }))
    .filter((group) => group.items.length > 0);
};
