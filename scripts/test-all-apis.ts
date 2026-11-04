import fs from 'node:fs';

const BASE_URL = 'http://localhost:4000';

function loadEnv(filePath: string): Record<string, string> {
  const env: Record<string, string> = {};
  if (!fs.existsSync(filePath)) return env;
  const content = fs.readFileSync(filePath, 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx !== -1) {
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  }
  return env;
}

const env = loadEnv('apps/backend/.env');

interface ApiTestResult {
  endpoint: string;
  method: string;
  status: number;
  durationMs: number;
  success: boolean;
  itemCount?: number;
}

async function run() {
  console.log('Starting comprehensive live API test suite across all 47 domain modules...\n');

  // Step 1: Authentication
  console.log('[Auth] Authenticating as Super Admin (admin_local)...');
  const authPayload = {
    identifier: process.env.SUPER_ADMIN_USERNAME || env.SUPER_ADMIN_USERNAME || 'admin_local',
    password:
      process.env.SUPER_ADMIN_PASSWORD ||
      env.SUPER_ADMIN_PASSWORD ||
      '***REMOVED***',
  };

  const loginRes = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(authPayload),
  });

  if (!loginRes.ok) {
    const errText = await loginRes.text();
    throw new Error(`Authentication failed: ${loginRes.status} ${errText}`);
  }

  const loginData = await loginRes.json();
  const token = loginData.data?.accessToken;
  if (!token) {
    throw new Error('No accessToken returned in login response');
  }
  console.log('Super Admin authenticated successfully. Access token acquired.\n');

  // Step 2: All 47 modules mapped to exact endpoints
  const endpoints = [
    { method: 'GET', path: '/' },
    { method: 'GET', path: '/api/v1/health' },
    { method: 'GET', path: '/api/v1/auth/me' },
    { method: 'GET', path: '/api/v1/schools' },
    { method: 'GET', path: '/api/v1/branches' },
    { method: 'GET', path: '/api/v1/departments' },
    { method: 'GET', path: '/api/v1/positions' },
    { method: 'GET', path: '/api/v1/employees' },
    { method: 'GET', path: '/api/v1/students' },
    { method: 'GET', path: '/api/v1/registrations' },
    { method: 'GET', path: '/api/v1/placement-tests' },
    { method: 'GET', path: '/api/v1/enrollments' },
    { method: 'GET', path: '/api/v1/classes' },
    { method: 'GET', path: '/api/v1/classrooms' },
    { method: 'GET', path: '/api/v1/subjects' },
    { method: 'GET', path: '/api/v1/programs' },
    { method: 'GET', path: '/api/v1/levels' },
    { method: 'GET', path: '/api/v1/curriculum' },
    { method: 'GET', path: '/api/v1/study-modes' },
    { method: 'GET', path: '/api/v1/time-slots' },
    { method: 'GET', path: '/api/v1/class-schedules' },
    { method: 'GET', path: '/api/v1/academic-years' },
    { method: 'GET', path: '/api/v1/academic-periods' },
    { method: 'GET', path: '/api/v1/academic-rules' },
    { method: 'GET', path: '/api/v1/teacher-assignments' },
    { method: 'GET', path: '/api/v1/attendance' },
    { method: 'GET', path: '/api/v1/attendance-leaves' },
    { method: 'GET', path: '/api/v1/assessments' },
    { method: 'GET', path: '/api/v1/scores' },
    { method: 'GET', path: '/api/v1/term-results' },
    { method: 'GET', path: '/api/v1/tuition-fees' },
    { method: 'GET', path: '/api/v1/payments' },
    { method: 'GET', path: '/api/v1/payment-plans' },
    { method: 'GET', path: '/api/v1/finance-operations/discount-policies' },
    { method: 'GET', path: '/api/v1/finance-operations/cashier-shifts' },
    { method: 'GET', path: '/api/v1/users' },
    { method: 'GET', path: '/api/v1/roles' },
    { method: 'GET', path: '/api/v1/permissions' },
    { method: 'GET', path: '/api/v1/permissions/grouped' },
    { method: 'GET', path: '/api/v1/student-transfers' },
    { method: 'GET', path: '/api/v1/notifications' },
    { method: 'GET', path: '/api/v1/announcements' },
    { method: 'GET', path: '/api/v1/audit-logs' },
    { method: 'GET', path: '/api/v1/system-settings' },
    { method: 'GET', path: '/api/v1/rollovers' },
    { method: 'GET', path: '/api/v1/historical-corrections' },
    { method: 'GET', path: '/api/v1/skills' },
    { method: 'GET', path: '/api/v1/intakes' },
    { method: 'GET', path: '/api/v1/reports/catalog' },
    { method: 'GET', path: '/api/v1/reports/documents' },
    { method: 'GET', path: '/api/v1/reports/monthly-overview' },
    { method: 'GET', path: '/api/v1/dashboard/action-items' },
    { method: 'GET', path: '/api/v1/dashboard/finance-pulse' },
    { method: 'GET', path: '/api/v1/dashboard/student-affairs-pulse' },
    { method: 'GET', path: '/api/v1/dashboard/hr-pulse' },
    { method: 'GET', path: '/api/v1/dashboard/academic-honor-roll' },
  ];

  const results: ApiTestResult[] = [];

  for (const ep of endpoints) {
    const start = performance.now();
    try {
      const res = await fetch(`${BASE_URL}${ep.path}`, {
        method: ep.method,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const durationMs = Math.round(performance.now() - start);
      const isSuccess = res.status >= 200 && res.status < 300;
      let count = undefined;

      try {
        const json = await res.json();
        if (Array.isArray(json.data)) {
          count = json.data.length;
        } else if (json.data && Array.isArray(json.data.items)) {
          count = json.data.items.length;
        } else if (json.pagination) {
          count = json.pagination.total;
        }
      } catch {}

      results.push({
        endpoint: ep.path,
        method: ep.method,
        status: res.status,
        durationMs,
        success: isSuccess,
        itemCount: count,
      });

      const indicator = isSuccess ? '[PASS]' : '[FAIL]';
      const countStr = count !== undefined ? `(${count} records)` : '';
      console.log(
        `${indicator} ${ep.method.padEnd(5)} ${ep.path.padEnd(46)} -> ${res.status} (${durationMs}ms) ${countStr}`,
      );
    } catch (err) {
      const durationMs = Math.round(performance.now() - start);
      results.push({
        endpoint: ep.path,
        method: ep.method,
        status: 0,
        durationMs,
        success: false,
      });
      console.log(
        `[ERR]  ${ep.method.padEnd(5)} ${ep.path.padEnd(46)} -> ERROR (${(err as Error).message})`,
      );
    }
  }

  // Summary
  const passed = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;
  const avgLatency = Math.round(results.reduce((acc, r) => acc + r.durationMs, 0) / results.length);

  console.log('\n======================================================');
  console.log(`LIVE API TEST SUMMARY:`);
  console.log(`Total Endpoints Tested: ${results.length}`);
  console.log(`Passed:                 ${passed}`);
  console.log(`Failed:                 ${failed}`);
  console.log(`Average Latency:        ${avgLatency}ms`);
  console.log('======================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error('[FATAL]', err);
  process.exit(1);
});
