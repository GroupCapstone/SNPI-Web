export interface EndpointParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface EndpointSpec {
  id: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  path: string;
  title: string;
  description: string;
  permission?: string;
  headers?: Array<{ name: string; required: boolean; description: string; example: string }>;
  queryParams?: EndpointParam[];
  bodyParams?: EndpointParam[];
  sampleRequest?: Record<string, unknown>;
  sampleResponse: Record<string, unknown>;
}

export interface DomainDoc {
  id: string;
  name: string;
  category: string;
  description: string;
  permissionPrefix: string;
  layerPattern: string;
  scoping: string;
  endpoints: EndpointSpec[];
}

export interface DocCategory {
  id: string;
  title: string;
  description: string;
  domains: DomainDoc[];
}

export const DOC_CATEGORIES: DocCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description:
      'Core concepts, authentication, headers, and standard response envelopes for developers.',
    domains: [
      {
        id: 'overview',
        name: 'API Overview & Standards',
        category: 'Getting Started',
        description:
          'SNPI-SMS delivers a 7-layer modular monolith API serving 47 domain modules across 193 REST endpoints. All endpoints return standardized JSON envelopes.',
        permissionPrefix: 'None (Public)',
        layerPattern:
          'route -> controller -> service -> repository -> model -> validation -> types',
        scoping: 'schoolId, branchId (Multi-tenant enforced server-side)',
        endpoints: [
          {
            id: 'root-info',
            method: 'GET',
            path: '/',
            title: 'API Root Metadata',
            description: 'Returns API server name, version, base path, and health endpoint link.',
            sampleResponse: {
              success: true,
              message: 'SNPI-SMS Backend API',
              version: '0.2.7',
              apiBase: '/api/v1',
              health: '/api/v1/health',
            },
          },
          {
            id: 'health-check',
            method: 'GET',
            path: '/api/v1/health',
            title: 'Health Check & DB Status',
            description: 'Inspects API vitality and active MongoDB replica set connection state.',
            sampleResponse: {
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
      {
        id: 'authentication',
        name: 'Authentication & Session',
        category: 'Getting Started',
        description:
          'Authentication uses short-lived JWT access tokens (15m) paired with long-lived HttpOnly refresh cookies (7d) rotated upon each refresh.',
        permissionPrefix: 'Public & Bearer Auth',
        layerPattern: 'JWT Bearer + HttpOnly Cookie Refresh Rotation',
        scoping: 'Global Authentication Scope',
        endpoints: [
          {
            id: 'auth-login',
            method: 'POST',
            path: '/api/v1/auth/login',
            title: 'User Sign In',
            description:
              'Authenticates with username/email and password, returning a JWT access token and setting the refresh cookie.',
            bodyParams: [
              {
                name: 'identifier',
                type: 'string',
                required: true,
                description: 'User email or username',
              },
              {
                name: 'password',
                type: 'string',
                required: true,
                description: 'Plaintext password (min 12 chars)',
              },
            ],
            sampleRequest: {
              identifier: '<SERVICE_ACCOUNT_IDENTIFIER>',
              password: '<SECURE_AUTHENTICATION_CREDENTIAL>',
            },
            sampleResponse: {
              success: true,
              message: 'Login successful',
              data: {
                accessToken: '<JWT_ACCESS_TOKEN_SAMPLE>',
                user: {
                  id: '<USER_UUID>',
                  username: '<AUTHORIZED_OPERATOR>',
                  email: '<AUTHORIZED_USER_EMAIL>',
                  roles: ['super_admin'],
                  permissions: ['*'],
                  branchAccess: 'all',
                },
              },
            },
          },
          {
            id: 'auth-me',
            method: 'GET',
            path: '/api/v1/auth/me',
            title: 'Current User Profile',
            description:
              'Retrieves authenticated user details, permissions, roles, and branch access scopes.',
            permission: 'Authenticated Session',
            headers: [
              {
                name: 'Authorization',
                required: true,
                description: 'Bearer access token',
                example: 'Bearer eyJhbGci...',
              },
            ],
            sampleResponse: {
              success: true,
              message: 'Current user profile retrieved',
              data: {
                id: '6720d...',
                username: '<AUTHORIZED_OPERATOR>',
                email: '<AUTHORIZED_USER_EMAIL>',
                roles: ['super_admin'],
                permissions: ['*'],
                branchAccess: 'all',
                departmentAccess: 'all',
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: 'organization',
    title: 'Core Organization',
    description:
      'Schools, campus branches, departments, job positions, and employee workforce records.',
    domains: [
      {
        id: 'schools',
        name: 'Schools Management',
        category: 'Core Organization',
        description:
          'Manages top-level school institutional profiles and general campus configurations.',
        permissionPrefix: 'school.*',
        layerPattern:
          'school.route -> school.controller -> school.service -> school.repository -> school.model',
        scoping: 'Global School Entity',
        endpoints: [
          {
            id: 'get-schools',
            method: 'GET',
            path: '/api/v1/schools',
            title: 'List School Profiles',
            description: 'Retrieves paginated school organization profiles.',
            permission: 'school.view.all_branches',
            queryParams: [
              {
                name: 'search',
                type: 'string',
                required: false,
                description: 'Filter by school name or code',
              },
              {
                name: 'page',
                type: 'number',
                required: false,
                description: 'Page number (default 1)',
              },
              {
                name: 'limit',
                type: 'number',
                required: false,
                description: 'Items per page (default 20)',
              },
            ],
            sampleResponse: {
              success: true,
              message: 'Schools retrieved successfully',
              data: [
                {
                  id: '6720d1...',
                  code: 'SNPI',
                  nameEn: 'SNPI International School',
                  nameKh: 'សាលាអន្តរជាតិ អេសអិនភីអាយ',
                  email: '<CONTACT_EMAIL_PLACEHOLDER>',
                  status: 'active',
                },
              ],
              meta: { page: 1, limit: 20, total: 1 },
            },
          },
          {
            id: 'create-school',
            method: 'POST',
            path: '/api/v1/schools',
            title: 'Create School Profile',
            description: 'Registers a new school institutional profile.',
            permission: 'school.create.all_branches',
            sampleRequest: {
              code: 'SNPI',
              nameEn: 'SNPI International School',
              nameKh: 'សាលាអន្តរជាតិ អេសអិនភីអាយ',
              email: '<CONTACT_EMAIL_PLACEHOLDER>',
              phone: '+855 23 888 999',
              address: 'Phnom Penh, Cambodia',
              status: 'active',
            },
            sampleResponse: {
              success: true,
              message: 'School created successfully',
              data: {
                id: '6720d1...',
                code: 'SNPI',
                nameEn: 'SNPI International School',
                status: 'active',
              },
            },
          },
        ],
      },
      {
        id: 'branches',
        name: 'Branches & Campuses',
        category: 'Core Organization',
        description:
          'Multi-campus branch management with branch-level data isolation via X-Branch-Id header.',
        permissionPrefix: 'branch.*',
        layerPattern:
          'branch.route -> branch.controller -> branch.service -> branch.repository -> branch.model',
        scoping: 'schoolId, branchId (X-Branch-Id header)',
        endpoints: [
          {
            id: 'get-branches',
            method: 'GET',
            path: '/api/v1/branches',
            title: 'List Campus Branches',
            description: 'Retrieves branches filtered by user access scope.',
            permission: 'branch.view.own_branch | branch.view.all_branches',
            sampleResponse: {
              success: true,
              message: 'Branches retrieved successfully',
              data: [
                {
                  id: '6720d2...',
                  schoolId: '6720d1...',
                  code: 'MAIN',
                  nameEn: 'Main Campus',
                  nameKh: 'សាខាកណ្តាល',
                  status: 'active',
                },
              ],
              meta: { page: 1, limit: 20, total: 1 },
            },
          },
        ],
      },
      {
        id: 'departments',
        name: 'Departments',
        category: 'Core Organization',
        description: 'Organizational departments (e.g. Academic, Administration, IT, Finance).',
        permissionPrefix: 'department.*',
        layerPattern:
          'department.route -> department.controller -> department.service -> department.repository -> department.model',
        scoping: 'schoolId, branchId',
        endpoints: [
          {
            id: 'get-departments',
            method: 'GET',
            path: '/api/v1/departments',
            title: 'List Departments',
            description: 'Retrieves organizational departments with branch-scoping.',
            permission: 'department.view.own_branch | department.view.all_branches',
            sampleResponse: {
              success: true,
              message: 'Departments retrieved successfully',
              data: [],
              meta: { page: 1, limit: 20, total: 0 },
            },
          },
        ],
      },
      {
        id: 'employees',
        name: 'Employee Workforce',
        category: 'Core Organization',
        description: 'Teachers, faculty, administrators, and staff member directory.',
        permissionPrefix: 'employee.*',
        layerPattern:
          'employee.route -> employee.controller -> employee.service -> employee.repository -> employee.model',
        scoping: 'schoolId, branchId, departmentId',
        endpoints: [
          {
            id: 'get-employees',
            method: 'GET',
            path: '/api/v1/employees',
            title: 'List Employees',
            description:
              'Retrieves paginated employee directory with role and department relationships.',
            permission: 'employee.view.own_branch | employee.view.all_branches',
            sampleResponse: {
              success: true,
              message: 'Employees retrieved successfully',
              data: [],
              meta: { page: 1, limit: 20, total: 0 },
            },
          },
        ],
      },
    ],
  },
  {
    id: 'students',
    title: 'Student Lifecycle',
    description: 'Admissions, placement tests, enrollments, student records, and campus transfers.',
    domains: [
      {
        id: 'students-dir',
        name: 'Students Directory',
        category: 'Student Lifecycle',
        description:
          'Core student records, demographic information, guardian profiles, and academic standing.',
        permissionPrefix: 'student.*',
        layerPattern:
          'student.route -> student.controller -> student.service -> student.repository -> student.model',
        scoping: 'schoolId, branchId',
        endpoints: [
          {
            id: 'get-students',
            method: 'GET',
            path: '/api/v1/students',
            title: 'List Students',
            description:
              'Retrieves paginated students directory with multi-field search and filters.',
            permission: 'student.view.own_branch | student.view.all_branches',
            queryParams: [
              {
                name: 'search',
                type: 'string',
                required: false,
                description: 'Search by student name or code',
              },
              {
                name: 'status',
                type: 'string',
                required: false,
                description: 'active | enrolled | transferred | graduated',
              },
              { name: 'page', type: 'number', required: false, description: 'Page number' },
              { name: 'limit', type: 'number', required: false, description: 'Page limit' },
            ],
            sampleResponse: {
              success: true,
              message: 'Students retrieved successfully',
              data: [],
              meta: { page: 1, limit: 20, total: 0 },
            },
          },
          {
            id: 'create-student',
            method: 'POST',
            path: '/api/v1/students',
            title: 'Create Student Record',
            description: 'Registers a new student profile with initial guardian information.',
            permission: 'student.create.own_branch | student.create.all_branches',
            sampleRequest: {
              firstNameEn: 'Dara',
              lastNameEn: 'Sok',
              firstNameKh: 'ដារ៉ា',
              lastNameKh: 'សុខ',
              gender: 'male',
              dob: '2012-05-15',
              status: 'active',
            },
            sampleResponse: {
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
        ],
      },
      {
        id: 'enrollments',
        name: 'Enrollments',
        category: 'Student Lifecycle',
        description: 'Assigns students to academic years, periods, programs, levels, and classes.',
        permissionPrefix: 'enrollment.*',
        layerPattern:
          'enrollment.route -> enrollment.controller -> enrollment.service -> enrollment.repository -> enrollment.model',
        scoping: 'schoolId, branchId, academicYearId',
        endpoints: [
          {
            id: 'get-enrollments',
            method: 'GET',
            path: '/api/v1/enrollments',
            title: 'List Class Enrollments',
            description: 'Retrieves student enrollment records with class association.',
            permission: 'enrollment.view.own_branch',
            sampleResponse: {
              success: true,
              message: 'Enrollments retrieved successfully',
              data: [],
              meta: { page: 1, limit: 20, total: 0 },
            },
          },
        ],
      },
      {
        id: 'registrations',
        name: 'Online Admissions & Inquiries',
        category: 'Student Lifecycle',
        description: 'New applicant intake, inquiry processing, and admission status tracking.',
        permissionPrefix: 'registration.*',
        layerPattern:
          'registration.route -> registration.controller -> registration.service -> registration.repository -> registration.model',
        scoping: 'schoolId, branchId',
        endpoints: [
          {
            id: 'get-registrations',
            method: 'GET',
            path: '/api/v1/registrations',
            title: 'List Inquiries & Registrations',
            description: 'Retrieves admissions registrations queue.',
            permission: 'registration.view.own_branch',
            sampleResponse: {
              success: true,
              message: 'Registrations retrieved successfully',
              data: [],
              meta: { page: 1, limit: 20, total: 0 },
            },
          },
        ],
      },
    ],
  },
  {
    id: 'academic',
    title: 'Academic Structure',
    description:
      'Academic years, terms, curricula, programs, levels, subjects, classes, and schedules.',
    domains: [
      {
        id: 'academic-years',
        name: 'Academic Years & Terms',
        category: 'Academic Structure',
        description:
          'Configures school calendar years, terms, semesters, and active academic periods.',
        permissionPrefix: 'academic_year.*',
        layerPattern:
          'academic-year.route -> academic-year.controller -> academic-year.service -> academic-year.repository -> academic-year.model',
        scoping: 'schoolId',
        endpoints: [
          {
            id: 'get-ay',
            method: 'GET',
            path: '/api/v1/academic-years',
            title: 'List Academic Years',
            description: 'Retrieves configured academic years and marks the active calendar year.',
            permission: 'academic_year.view.all_branches',
            sampleResponse: {
              success: true,
              message: 'Academic years retrieved successfully',
              data: [
                {
                  id: '6720d3...',
                  code: '2026-2027',
                  name: 'Academic Year 2026-2027',
                  startDate: '2026-09-01T00:00:00.000Z',
                  endDate: '2027-06-30T00:00:00.000Z',
                  isCurrent: true,
                  status: 'active',
                },
              ],
              meta: { page: 1, limit: 20, total: 1 },
            },
          },
        ],
      },
      {
        id: 'classes',
        name: 'Classes & Classrooms',
        category: 'Academic Structure',
        description:
          'Physical classrooms, assigned grade classes, capacity tracking, and homeroom teachers.',
        permissionPrefix: 'class.*',
        layerPattern:
          'class.route -> class.controller -> class.service -> class.repository -> class.model',
        scoping: 'schoolId, branchId, academicYearId',
        endpoints: [
          {
            id: 'get-classes',
            method: 'GET',
            path: '/api/v1/classes',
            title: 'List Classes',
            description: 'Retrieves all classes assigned to a branch for an academic year.',
            permission: 'class.view.own_branch',
            sampleResponse: {
              success: true,
              message: 'Classes retrieved successfully',
              data: [],
              meta: { page: 1, limit: 20, total: 0 },
            },
          },
        ],
      },
    ],
  },
  {
    id: 'attendance',
    title: 'Attendance & Operations',
    description:
      'Daily student attendance recording, leave applications, and teacher assignment rosters.',
    domains: [
      {
        id: 'attendance-rec',
        name: 'Daily Attendance',
        category: 'Attendance & Operations',
        description:
          'Bulk roll-call recording for student attendance (Present, Absent, Late, Excused).',
        permissionPrefix: 'attendance.*',
        layerPattern:
          'attendance.route -> attendance.controller -> attendance.service -> attendance.repository -> attendance.model',
        scoping: 'schoolId, branchId, classId, date',
        endpoints: [
          {
            id: 'get-attendance',
            method: 'GET',
            path: '/api/v1/attendance',
            title: 'Query Attendance Records',
            description: 'Retrieves attendance entries by date, classId, and studentId.',
            permission: 'attendance.view.own_branch',
            sampleResponse: {
              success: true,
              message: 'Attendance retrieved successfully',
              data: [],
              meta: { page: 1, limit: 20, total: 0 },
            },
          },
        ],
      },
    ],
  },
  {
    id: 'finance',
    title: 'Finance & Payments',
    description:
      'Tuition fees, payment plans, cashier shifts, student invoices, and payment receipts.',
    domains: [
      {
        id: 'payments',
        name: 'Payments & Invoices',
        category: 'Finance & Payments',
        description:
          'Student tuition fee invoicing, partial payments, receipts, and ACID transaction recording.',
        permissionPrefix: 'payment.*',
        layerPattern:
          'payment.route -> payment.controller -> payment.service -> payment.repository -> payment.model',
        scoping: 'schoolId, branchId',
        endpoints: [
          {
            id: 'get-payments',
            method: 'GET',
            path: '/api/v1/payments',
            title: 'List Transactions & Invoices',
            description: 'Retrieves paginated financial payments with receipt numbers and status.',
            permission: 'payment.view.own_branch',
            sampleResponse: {
              success: true,
              message: 'Payments retrieved successfully',
              data: [],
              meta: { page: 1, limit: 20, total: 0 },
            },
          },
        ],
      },
    ],
  },
  {
    id: 'access-control',
    title: 'Access Control & RBAC',
    description: '356 system permissions, 13 core roles, user accounts, and immutable audit logs.',
    domains: [
      {
        id: 'permissions-domain',
        name: 'Permissions & Roles',
        category: 'Access Control & RBAC',
        description:
          'Granular RBAC permission hierarchy with 356 permissions across all 47 domain modules.',
        permissionPrefix: 'permission.*, role.*',
        layerPattern: 'permission.route -> permission.controller -> @snp/shared',
        scoping: 'System-wide RBAC Matrix',
        endpoints: [
          {
            id: 'get-permissions',
            method: 'GET',
            path: '/api/v1/permissions',
            title: 'List All 356 Permissions',
            description: 'Returns the full canonical list of system permissions.',
            permission: 'permission.view.all_branches',
            sampleResponse: {
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
            title: 'List Core Roles',
            description:
              'Returns the 13 system roles (super_admin, branch_director, teacher, cashier, etc.).',
            permission: 'role.view.all_branches',
            sampleResponse: {
              success: true,
              message: 'Roles retrieved successfully',
              data: [
                { code: 'super_admin', name: 'Super Admin', isSystem: true },
                { code: 'branch_director', name: 'Branch Director', isSystem: true },
                { code: 'teacher', name: 'Teacher', isSystem: true },
              ],
              meta: { total: 13 },
            },
          },
        ],
      },
    ],
  },
];
