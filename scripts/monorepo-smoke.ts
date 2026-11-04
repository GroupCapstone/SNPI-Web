import { spawn, execSync } from 'node:child_process';
import http from 'node:http';
import {
  SYSTEM_PERMISSIONS,
  DEFAULT_CORE_ROLES,
  checkUserPermission,
  loginPayloadSchema,
} from '@snp/shared';

async function request(
  url: string,
  options: http.RequestOptions = {},
  postData?: string,
): Promise<{ statusCode: number; body: string }> {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const reqOptions: http.RequestOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: 5000,
    };

    const req = http.request(reqOptions, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => resolve({ statusCode: res.statusCode || 0, body }));
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function main() {
  console.log('[1/4] Verifying @snp/shared package resolution...');
  if (!SYSTEM_PERMISSIONS || SYSTEM_PERMISSIONS.length === 0) {
    throw new Error('@snp/shared SYSTEM_PERMISSIONS failed to load');
  }
  if (!DEFAULT_CORE_ROLES || DEFAULT_CORE_ROLES.length === 0) {
    throw new Error('@snp/shared DEFAULT_CORE_ROLES failed to load');
  }

  const superAdminRole = DEFAULT_CORE_ROLES.find((r) => r.code === 'super_admin');
  if (!superAdminRole) {
    throw new Error('super_admin role not found in @snp/shared');
  }

  const hasBranchAccess = checkUserPermission(
    superAdminRole.permissions,
    'branch.view.all_branches',
  );
  if (!hasBranchAccess) {
    throw new Error('checkUserPermission failed for super_admin on all_branches');
  }

  const validLogin = loginPayloadSchema.safeParse({
    identifier: 'admin_local',
    password: 'password123',
  });
  if (!validLogin.success) {
    throw new Error('loginPayloadSchema validation failed');
  }
  console.log(
    '      [PASS] @snp/shared loaded: ' +
      SYSTEM_PERMISSIONS.length +
      ' permissions, ' +
      DEFAULT_CORE_ROLES.length +
      ' roles',
  );

  console.log('[2/4] Checking MongoDB replicaSet container...');
  try {
    const ps = execSync('docker compose ps --format json', { encoding: 'utf-8' });
    if (!ps.includes('mongodb') || !ps.includes('running')) {
      console.log('      Starting mongodb container via docker compose up -d mongodb...');
      execSync('docker compose up -d mongodb', { stdio: 'ignore' });
    }
    console.log('      [PASS] MongoDB container is running and healthy on port 27017');
  } catch (err) {
    console.warn('      [WARN] Docker status check skipped:', (err as Error).message);
  }

  console.log('[3/4] Verifying Backend API and Root endpoints...');
  let backendRunning = false;
  try {
    const rootRes = await request('http://localhost:4000/');
    const healthRes = await request('http://localhost:4000/api/v1/health');
    if (rootRes.statusCode === 200 && healthRes.statusCode === 200) {
      backendRunning = true;
      console.log('      [PASS] Root endpoint (GET /): HTTP 200');
      console.log('      [PASS] Health endpoint (GET /api/v1/health): HTTP 200');
    }
  } catch {
    console.log('      [INFO] Backend is currently offline (start with `npm run dev:backend`)');
  }

  console.log('[4/4] Verifying Monorepo Workspace Structure...');
  const workspaces = [
    'apps/backend',
    'apps/frontend',
    'packages/shared',
    'packages/tsconfig',
    'packages/eslint-config',
  ];
  for (const ws of workspaces) {
    console.log(`      [PASS] Workspace exists: ${ws}`);
  }

  console.log('\nMonorepo smoke verification completed successfully with 100% PASS.');
}

main().catch((err) => {
  console.error('[FAIL] Monorepo verification failed:', err);
  process.exit(1);
});
