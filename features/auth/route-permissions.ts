interface RoutePermissionRule {
  pattern: RegExp;
  permissions: string[];
}

const branchScopedView = (module: string): string[] => [
  `${module}.view.own_branch`,
  `${module}.view.all_branches`,
  `${module}.manage.own_branch`,
  `${module}.manage.all_branches`,
];

const resourceScopedView = (module: string): string[] => [
  `${module}.view.assigned_class`,
  `${module}.view.assigned_subject`,
  `${module}.view.own_department`,
  `${module}.view.own_branch`,
  `${module}.view.all_branches`,
  `${module}.manage.own_branch`,
  `${module}.manage.all_branches`,
];

export const dashboardRoutePermissionRules: RoutePermissionRule[] = [
  {
    pattern: /^\/dashboard\/executive\/?$/,
    permissions: ['report.view.own_branch', 'report.view.all_branches'],
  },
  {
    pattern: /^\/dashboard\/staff-teacher\/?$/,
    permissions: [
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
    pattern: /^\/dashboard\/students\/?$/,
    permissions: [
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
    pattern: /^\/dashboard\/finance\/?$/,
    permissions: [
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
    pattern: /^\/dashboard\/hr\/?$/,
    permissions: ['employee.view.own_branch', 'employee.view.all_branches'],
  },
  {
    pattern: /^\/employees\/new\/?$/,
    permissions: ['employee.create.own_branch', 'employee.create.all_branches'],
  },
  {
    pattern: /^\/employees\/[^/]+\/edit\/?$/,
    permissions: ['employee.edit.own_branch', 'employee.edit.all_branches'],
  },
  {
    pattern: /^\/employees\/[^/]+\/?$/,
    permissions: ['employee.view.own_record', ...branchScopedView('employee')],
  },
  {
    pattern: /^\/employees\/?$/,
    permissions: ['employee.view.own_department', ...branchScopedView('employee')],
  },
  {
    pattern: /^\/students\/new\/?$/,
    permissions: ['student.create.own_branch', 'student.create.all_branches'],
  },
  {
    pattern: /^\/students\/[^/]+\/edit\/?$/,
    permissions: ['student.edit.own_branch', 'student.edit.all_branches'],
  },
  { pattern: /^\/students(?:\/[^/]+)?\/?$/, permissions: resourceScopedView('student') },
  { pattern: /^\/guardians\/?$/, permissions: branchScopedView('student') },
  { pattern: /^\/student-status-history\/?$/, permissions: branchScopedView('student') },
  {
    pattern: /^\/skills\/gap-analysis\/?$/,
    permissions: [
      'skill_gap.view.own_record',
      'skill_gap.view.own_branch',
      'skill_gap.view.all_branches',
    ],
  },
  {
    pattern: /^\/skills\/?$/,
    permissions: [
      ...branchScopedView('skill'),
      'role_skill.view.all_branches',
      'role_skill.edit.all_branches',
      'employee_skill.view.own_record',
      'employee_skill.view.own_branch',
      'employee_skill.view.all_branches',
    ],
  },
  {
    pattern: /^\/organization\/school\/?$/,
    permissions: ['school.view.all_branches', 'school.edit.all_branches'],
  },
  { pattern: /^\/organization\/branches\/?$/, permissions: branchScopedView('branch') },
  {
    pattern: /^\/organization\/departments\/?$/,
    permissions: ['department.view.own_department', ...branchScopedView('department')],
  },
  { pattern: /^\/organization\/positions\/?$/, permissions: branchScopedView('position') },
  {
    pattern: /^\/organization\/?$/,
    permissions: [...branchScopedView('school'), ...branchScopedView('branch')],
  },
  { pattern: /^\/admissions\/registrations\/?$/, permissions: branchScopedView('registration') },
  {
    pattern: /^\/admissions\/placement-tests\/?$/,
    permissions: branchScopedView('placement_test'),
  },
  { pattern: /^\/enrollments\/?$/, permissions: branchScopedView('enrollment') },
  { pattern: /^\/programs\/?$/, permissions: branchScopedView('program') },
  { pattern: /^\/levels\/?$/, permissions: branchScopedView('level') },
  { pattern: /^\/subjects\/?$/, permissions: resourceScopedView('subject') },
  { pattern: /^\/curriculum\/?$/, permissions: branchScopedView('curriculum') },
  { pattern: /^\/academic\/rules\/?$/, permissions: branchScopedView('academic_rule') },
  {
    pattern: /^\/academic\/certificates\/?$/,
    permissions: [
      'report_card.view.own_branch',
      'report_card.view.all_branches',
      'report_card.generate.own_branch',
      'report_card.generate.all_branches',
    ],
  },
  {
    pattern: /^\/academic-years\/?$/,
    permissions: ['academic_year.view.all_branches', 'academic_year.edit.all_branches'],
  },
  { pattern: /^\/academic-periods\/?$/, permissions: branchScopedView('academic_period') },
  { pattern: /^\/academic-periods\/rollover\/?$/, permissions: branchScopedView('rollover') },
  { pattern: /^\/intakes\/?$/, permissions: branchScopedView('intake') },
  { pattern: /^\/classes(?:\/[^/]+)?\/?$/, permissions: resourceScopedView('class') },
  { pattern: /^\/classrooms\/?$/, permissions: branchScopedView('classroom') },
  {
    pattern: /^\/teacher-assignments\/?$/,
    permissions: branchScopedView('teacher_assignment'),
  },
  { pattern: /^\/timetable\/?$/, permissions: resourceScopedView('class') },
  { pattern: /^\/attendance(?:\/leaves)?\/?$/, permissions: resourceScopedView('attendance') },
  { pattern: /^\/assessments\/?$/, permissions: resourceScopedView('assessment') },
  { pattern: /^\/scores\/?$/, permissions: resourceScopedView('score') },
  { pattern: /^\/term-results\/?$/, permissions: resourceScopedView('term_result') },
  {
    pattern: /^\/term-completion\/?$/,
    permissions: ['term_result.finalize.own_branch', 'term_result.finalize.all_branches'],
  },
  { pattern: /^\/promotions\/?$/, permissions: resourceScopedView('term_result') },
  {
    pattern: /^\/student-transfers\/?$/,
    permissions: branchScopedView('student_transfer'),
  },
  {
    pattern: /^\/finance\/tuition\/?$/,
    permissions: [
      ...branchScopedView('tuition'),
      'finance.fee_structure.manage.own_branch',
      'finance.fee_structure.manage.all_branches',
    ],
  },
  {
    pattern: /^\/finance\/payments\/?$/,
    permissions: [
      ...branchScopedView('payment'),
      'finance.payment.create.own_branch',
      'finance.payment.create.all_branches',
      'finance.receipt.print.own_branch',
      'finance.receipt.print.all_branches',
      'finance.void.request.own_branch',
      'finance.void.request.all_branches',
    ],
  },
  {
    pattern: /^\/finance\/operations\/?$/,
    permissions: [
      ...branchScopedView('payment'),
      'finance.discount.apply.own_branch',
      'finance.discount.apply.all_branches',
      'finance.payment.create.own_branch',
      'finance.payment.create.all_branches',
      'finance.receipt.print.own_branch',
      'finance.receipt.print.all_branches',
    ],
  },
  {
    pattern: /^\/finance\/payment-plans\/?$/,
    permissions: [
      'payment.view.own_branch',
      'payment.view.all_branches',
      'finance.payment.create.own_branch',
      'finance.payment.create.all_branches',
    ],
  },
  { pattern: /^\/announcements\/?$/, permissions: branchScopedView('announcement') },
  { pattern: /^\/notifications\/?$/, permissions: branchScopedView('notification') },
  {
    pattern: /^\/reports\/students\/?$/,
    permissions: [
      ...branchScopedView('report'),
      'report.student.view.own_branch',
      'report.student.view.all_branches',
    ],
  },
  {
    pattern: /^\/reports\/staff\/?$/,
    permissions: [
      ...branchScopedView('report'),
      'employee.view.own_branch',
      'employee.view.all_branches',
    ],
  },
  {
    pattern: /^\/reports\/academic\/?$/,
    permissions: [
      ...branchScopedView('report'),
      'report.academic.view.own_branch',
      'report.academic.view.all_branches',
    ],
  },
  {
    pattern: /^\/reports\/attendance\/?$/,
    permissions: [
      ...branchScopedView('report'),
      'report.academic.view.own_branch',
      'report.academic.view.all_branches',
      'attendance.view.own_branch',
      'attendance.view.all_branches',
    ],
  },
  {
    pattern: /^\/reports\/finance\/?$/,
    permissions: [
      ...branchScopedView('report'),
      'report.finance.view.own_branch',
      'report.finance.view.all_branches',
    ],
  },
  {
    pattern: /^\/reports\/?$/,
    permissions: [
      ...branchScopedView('report'),
      'report.student.view.own_branch',
      'report.student.view.all_branches',
      'report.academic.view.own_branch',
      'report.academic.view.all_branches',
      'report.finance.view.own_branch',
      'report.finance.view.all_branches',
    ],
  },
  { pattern: /^\/users\/?$/, permissions: branchScopedView('user') },
  {
    pattern: /^\/roles\/?$/,
    permissions: ['role.view.all_branches', 'role.edit.all_branches'],
  },
  {
    pattern: /^\/permissions\/?$/,
    permissions: ['role.view.all_branches', 'role.edit.all_branches'],
  },
  { pattern: /^\/audit-logs\/?$/, permissions: branchScopedView('audit') },
  {
    pattern: /^\/settings(?:\/system-info)?\/?$/,
    permissions: ['setting.view.all_branches', 'setting.edit.all_branches'],
  },
];

export const getRequiredPermissionsForPath = (pathname: string): string[] | null => {
  if (/^\/(?:dashboard|unauthorized)\/?$/.test(pathname)) return null;
  return (
    dashboardRoutePermissionRules.find((rule) => rule.pattern.test(pathname))?.permissions ?? [
      '__route_not_authorized__',
    ]
  );
};
