export interface DevEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  summary: string;
  permission: string;
  scopeHeader: boolean;
  requestBody?: Record<string, unknown>;
  responseBody: Record<string, unknown>;
}

export interface DevSection {
  id: string;
  title: string;
  tagline: string;
  description: string;
  endpoints: DevEndpoint[];
}

export const DEVELOPER_SECTIONS: DevSection[] = [
  {
    id: 'quickstart',
    title: 'Quickstart & Auth',
    tagline: 'Connect in under 2 minutes',
    description:
      'All requests require standard REST headers. Acquire a JWT token via /auth/login and supply X-Branch-Id for campus data isolation.',
    endpoints: [
      {
        id: 'auth-login',
        method: 'POST',
        path: '/api/v1/auth/login',
        summary: 'Authenticate credentials and obtain JWT access token',
        permission: 'Public',
        scopeHeader: false,
        requestBody: {
          identifier: '<SERVICE_ACCOUNT_IDENTIFIER>',
          password: '<SECURE_AUTHENTICATION_CREDENTIAL>',
        },
        responseBody: {
          success: true,
          message: 'Login successful',
          data: {
            accessToken: '<JWT_ACCESS_TOKEN_SAMPLE>',
            user: {
              id: '<USER_UUID>',
              username: '<AUTHORIZED_OPERATOR>',
              email: '<AUTHORIZED_USER_EMAIL>',
              roles: ['super_admin'],
              branchAccess: 'all',
            },
          },
        },
      },
      {
        id: 'auth-me',
        method: 'GET',
        path: '/api/v1/auth/me',
        summary: 'Retrieve authenticated profile, roles, and branch scopes',
        permission: 'Authenticated Session',
        scopeHeader: false,
        responseBody: {
          success: true,
          message: 'Current user profile retrieved',
          data: {
            id: '6720d1a...',
            username: 'admin_local',
            roles: ['super_admin'],
            permissions: ['*'],
            branchAccess: 'all',
          },
        },
      },
    ],
  },
  {
    id: 'students-academic',
    title: 'Students & Academic',
    tagline: 'Student records, enrollments, and classes',
    description:
      'Manage student admission records, class enrollments, and academic year calendars scoped to specific branches.',
    endpoints: [
      {
        id: 'get-students',
        method: 'GET',
        path: '/api/v1/students',
        summary: 'Query paginated student directory with search filters',
        permission: 'student.view.own_branch',
        scopeHeader: true,
        responseBody: {
          success: true,
          message: 'Students retrieved successfully',
          data: [
            {
              id: '6720d9...',
              studentCode: 'STU-2026-0001',
              firstNameEn: 'Dara',
              lastNameEn: 'Sok',
              gender: 'male',
              status: 'enrolled',
            },
          ],
          meta: { page: 1, limit: 20, total: 1 },
        },
      },
      {
        id: 'create-student',
        method: 'POST',
        path: '/api/v1/students',
        summary: 'Register a new student record with guardian details',
        permission: 'student.create.own_branch',
        scopeHeader: true,
        requestBody: {
          firstNameEn: 'Dara',
          lastNameEn: 'Sok',
          gender: 'male',
          dob: '2012-05-15',
          status: 'active',
        },
        responseBody: {
          success: true,
          message: 'Student registered successfully',
          data: {
            id: '6720d9...',
            studentCode: 'STU-2026-0001',
            fullName: 'Sok Dara',
            status: 'active',
          },
        },
      },
      {
        id: 'get-enrollments',
        method: 'GET',
        path: '/api/v1/enrollments',
        summary: 'List active student enrollments by academic period and class',
        permission: 'enrollment.view.own_branch',
        scopeHeader: true,
        responseBody: {
          success: true,
          message: 'Enrollments retrieved successfully',
          data: [],
          meta: { page: 1, limit: 20, total: 0 },
        },
      },
      {
        id: 'get-classes',
        method: 'GET',
        path: '/api/v1/classes',
        summary: 'List campus classes, grade levels, and room capacities',
        permission: 'class.view.own_branch',
        scopeHeader: true,
        responseBody: {
          success: true,
          message: 'Classes retrieved successfully',
          data: [],
          meta: { page: 1, limit: 20, total: 0 },
        },
      },
    ],
  },
  {
    id: 'operations-finance',
    title: 'Operations & Finance',
    tagline: 'Attendance, scoring, and tuition payments',
    description:
      'Daily roll-call tracking, assessment scores, and ACID transaction-backed tuition billing.',
    endpoints: [
      {
        id: 'get-attendance',
        method: 'GET',
        path: '/api/v1/attendance',
        summary: 'Query student attendance records by class and date',
        permission: 'attendance.view.own_branch',
        scopeHeader: true,
        responseBody: {
          success: true,
          message: 'Attendance retrieved successfully',
          data: [],
          meta: { page: 1, limit: 20, total: 0 },
        },
      },
      {
        id: 'get-scores',
        method: 'GET',
        path: '/api/v1/scores',
        summary: 'Retrieve student examination and grading scores',
        permission: 'score.view.own_branch',
        scopeHeader: true,
        responseBody: {
          success: true,
          message: 'Scores retrieved successfully',
          data: [],
          meta: { page: 1, limit: 20, total: 0 },
        },
      },
      {
        id: 'get-payments',
        method: 'GET',
        path: '/api/v1/payments',
        summary: 'Query tuition payments, receipts, and invoice status',
        permission: 'payment.view.own_branch',
        scopeHeader: true,
        responseBody: {
          success: true,
          message: 'Payments retrieved successfully',
          data: [],
          meta: { page: 1, limit: 20, total: 0 },
        },
      },
    ],
  },
  {
    id: 'security-rbac',
    title: 'Security & System',
    tagline: 'Permissions, core roles, and health probes',
    description:
      'Inspect 356 system permissions, 13 core roles, and system liveness and readiness probes.',
    endpoints: [
      {
        id: 'get-permissions',
        method: 'GET',
        path: '/api/v1/permissions',
        summary: 'List all 356 canonical system permissions',
        permission: 'permission.view.all_branches',
        scopeHeader: false,
        responseBody: {
          success: true,
          message: 'Permissions retrieved successfully',
          data: [
            { code: 'school.view.all_branches', category: 'school', action: 'view' },
            { code: 'student.create.own_branch', category: 'student', action: 'create' },
          ],
          meta: { total: 356 },
        },
      },
      {
        id: 'get-roles',
        method: 'GET',
        path: '/api/v1/roles',
        summary: 'List all 13 core roles and system definitions',
        permission: 'role.view.all_branches',
        scopeHeader: false,
        responseBody: {
          success: true,
          message: 'Roles retrieved successfully',
          data: [
            { code: 'super_admin', name: 'Super Admin', isSystem: true },
            { code: 'teacher', name: 'Teacher', isSystem: true },
          ],
          meta: { total: 13 },
        },
      },
      {
        id: 'get-health',
        method: 'GET',
        path: '/api/v1/health',
        summary: 'Check API service vitality and MongoDB connection status',
        permission: 'Public',
        scopeHeader: false,
        responseBody: {
          success: true,
          message: 'Service is healthy',
          data: {
            service: 'SNPI-SMS API',
            status: 'healthy',
            database: 'connected',
            version: '0.2.7',
            timestamp: '2026-10-29T12:00:00.000Z',
          },
        },
      },
    ],
  },
];
