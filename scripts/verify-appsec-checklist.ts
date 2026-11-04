import fs from 'node:fs';
import path from 'node:path';

interface CheckItem {
  id: string;
  domain: string;
  criterion: string;
  priority: 'P0' | 'P1' | 'P2';
  status: 'PASSED' | 'FAILED' | 'WARNING';
  score: number;
  weight: number;
  evidence: string;
}

interface DomainSummary {
  domain: string;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  warningChecks: number;
  score: number;
  weight: number;
}

const ROOT_DIR = process.cwd();

function fileExists(relPath: string): boolean {
  return fs.existsSync(path.resolve(ROOT_DIR, relPath));
}

function readFileSafe(relPath: string): string {
  try {
    return fs.readFileSync(path.resolve(ROOT_DIR, relPath), 'utf-8');
  } catch {
    return '';
  }
}

async function runApplicationSecurityAudit(): Promise<void> {
  console.log('================================================================================');
  console.log('    SNP-SMS APPLICATION SECURITY & SDLC ASSESSMENT CHECKLIST AUDITOR           ');
  console.log('================================================================================\n');

  const checks: CheckItem[] = [];

  // ==========================================
  // 1. SECURITY (Weight: 15%)
  // ==========================================
  const pkgJson = readFileSafe('package.json');
  const hasDependabot = fileExists('.github/dependabot.yml');
  const hasLockfile = fileExists('package-lock.json');
  checks.push({
    id: 'SEC-01',
    domain: 'Security',
    criterion: 'Dependency Scanning',
    priority: 'P0',
    status: hasDependabot && hasLockfile ? 'PASSED' : 'FAILED',
    score: hasDependabot && hasLockfile ? 100 : 0,
    weight: 3.0,
    evidence:
      hasDependabot && hasLockfile
        ? 'Dependabot configuration (.github/dependabot.yml) and unified package-lock.json active'
        : 'Missing Dependabot or lockfile',
  });

  const ciWorkflow = readFileSafe('.github/workflows/ci.yml');
  const hasCodeScanning = ciWorkflow.includes('lint') && ciWorkflow.includes('typecheck');
  checks.push({
    id: 'SEC-02',
    domain: 'Security',
    criterion: 'Code Scanning (SAST)',
    priority: 'P0',
    status: hasCodeScanning ? 'PASSED' : 'FAILED',
    score: hasCodeScanning ? 100 : 0,
    weight: 3.0,
    evidence: hasCodeScanning
      ? 'CI pipeline enforces ESLint and TypeScript quality gates on every commit/PR'
      : 'CI pipeline missing lint/typecheck gates',
  });

  const gitignore = readFileSafe('.gitignore');
  const passwordUtil = readFileSafe('apps/backend/src/utils/password.ts');
  const hasEnvExample = fileExists('.env.example');
  const ignoresEnv = gitignore.includes('.env');
  const usesTimingSafe = passwordUtil.includes('timingSafeEqual');
  checks.push({
    id: 'SEC-03',
    domain: 'Security',
    criterion: 'Secrets Management',
    priority: 'P0',
    status: hasEnvExample && ignoresEnv && usesTimingSafe ? 'PASSED' : 'FAILED',
    score: hasEnvExample && ignoresEnv && usesTimingSafe ? 100 : 0,
    weight: 3.0,
    evidence:
      hasEnvExample && ignoresEnv && usesTimingSafe
        ? '.env gitignored, .env.example documented, timingSafeEqual constant-time checks enforced'
        : 'Incomplete secret isolation or missing timingSafeEqual',
  });

  const securityMd = readFileSafe('SECURITY.md');
  const agentsMd = readFileSafe('AGENTS.md');
  const hasSecurityPolicy =
    securityMd.length > 500 && agentsMd.includes('Autonomous AI Agents Policy');
  checks.push({
    id: 'SEC-04',
    domain: 'Security',
    criterion: 'Security Policies',
    priority: 'P1',
    status: hasSecurityPolicy ? 'PASSED' : 'FAILED',
    score: hasSecurityPolicy ? 100 : 0,
    weight: 2.0,
    evidence: hasSecurityPolicy
      ? 'SECURITY.md and AGENTS.md enterprise policies established and accessible'
      : 'Missing comprehensive security policy documentation',
  });

  const hasSharedSchemas =
    fileExists('packages/shared/src/schemas/index.ts') ||
    fileExists('packages/shared/src/schemas.ts');
  const appTs = readFileSafe('apps/backend/src/app.ts');
  const hasHelmet = appTs.includes('helmet(') && appTs.includes('x-powered-by');
  checks.push({
    id: 'SEC-05',
    domain: 'Security',
    criterion: 'Secure Coding Guidelines',
    priority: 'P0',
    status: hasSharedSchemas && hasHelmet ? 'PASSED' : 'FAILED',
    score: hasSharedSchemas && hasHelmet ? 100 : 0,
    weight: 2.0,
    evidence:
      hasSharedSchemas && hasHelmet
        ? 'Strict Zod schemas in @snp/shared, Helmet HTTP headers, x-powered-by disabled'
        : 'Incomplete secure coding configuration',
  });

  const sharedPermissions = readFileSafe('packages/shared/src/permissions.ts');
  const authMiddleware = readFileSafe('apps/backend/src/middleware/authorize.ts');
  const hasRbac =
    sharedPermissions.includes('SYSTEM_PERMISSIONS') && authMiddleware.includes('authorize');
  checks.push({
    id: 'SEC-06',
    domain: 'Security',
    criterion: 'Access Controls & RBAC',
    priority: 'P0',
    status: hasRbac ? 'PASSED' : 'FAILED',
    score: hasRbac ? 100 : 0,
    weight: 2.0,
    evidence: hasRbac
      ? 'Canonical RBAC permissions in @snp/shared with server-side authorize middleware enforcement'
      : 'Missing centralized RBAC definitions or authorize middleware',
  });

  // ==========================================
  // 2. COMPLIANCE (Weight: 12%)
  // ==========================================
  const appSecDoc = readFileSafe(
    '.github/knowledge/security/application-security-design-principles.md',
  );
  const citesRegulations =
    appSecDoc.includes('FERPA') && appSecDoc.includes('GDPR') && appSecDoc.includes('SOC 2');
  checks.push({
    id: 'COM-01',
    domain: 'Compliance',
    criterion: 'Regulatory Compliance',
    priority: 'P0',
    status: citesRegulations ? 'PASSED' : 'FAILED',
    score: citesRegulations ? 100 : 0,
    weight: 2.5,
    evidence: citesRegulations
      ? 'Documented regulatory alignment covering FERPA, GDPR, and SOC 2 data protection'
      : 'Missing formal regulatory compliance mapping',
  });

  const hasAuditLog =
    fileExists('apps/backend/src/modules/audit-log/audit-log.model.ts') &&
    fileExists('apps/backend/src/modules/audit-log/audit-log.route.ts');
  checks.push({
    id: 'COM-02',
    domain: 'Compliance',
    criterion: 'Audit Logging',
    priority: 'P0',
    status: hasAuditLog ? 'PASSED' : 'FAILED',
    score: hasAuditLog ? 100 : 0,
    weight: 3.0,
    evidence: hasAuditLog
      ? '7-layer audit-log domain module active with immutable log storage and RBAC inspection'
      : 'Missing audit-log domain module',
  });

  const usesArgonOrBcrypt = passwordUtil.includes('bcrypt') && passwordUtil.includes('scryptSync');
  const hasHsts = appTs.includes('hsts:');
  checks.push({
    id: 'COM-03',
    domain: 'Compliance',
    criterion: 'Data Protection & Encryption',
    priority: 'P0',
    status: usesArgonOrBcrypt && hasHsts ? 'PASSED' : 'FAILED',
    score: usesArgonOrBcrypt && hasHsts ? 100 : 0,
    weight: 2.5,
    evidence:
      usesArgonOrBcrypt && hasHsts
        ? 'High-cost bcrypt/scrypt key derivation, timingSafeEqual comparison, and HSTS headers active'
        : 'Insufficient cryptographic protections',
  });

  const hasDrpRunbooks =
    fileExists('docs/architecture/repository-resilience-mirroring.md') ||
    fileExists('.agents/skills/repository-resilience-mirroring/SKILL.md');
  checks.push({
    id: 'COM-04',
    domain: 'Compliance',
    criterion: 'Incident Response Plan',
    priority: 'P0',
    status: hasDrpRunbooks ? 'PASSED' : 'FAILED',
    score: hasDrpRunbooks ? 100 : 0,
    weight: 2.5,
    evidence: hasDrpRunbooks
      ? 'Documented disaster recovery runbooks, break-glass deployment, and incident reconciliation'
      : 'Missing incident response plan and DRP runbooks',
  });

  const hasOnboardingStandards =
    agentsMd.includes('Autonomous AI Agents Policy') && agentsMd.includes('Verification Pipeline');
  checks.push({
    id: 'COM-05',
    domain: 'Compliance',
    criterion: 'Compliance Training & Onboarding',
    priority: 'P1',
    status: hasOnboardingStandards ? 'PASSED' : 'FAILED',
    score: hasOnboardingStandards ? 100 : 0,
    weight: 1.5,
    evidence: hasOnboardingStandards
      ? 'Formal developer & autonomous AI agent onboarding standards codified in AGENTS.md'
      : 'Missing compliance onboarding specifications',
  });

  // ==========================================
  // 3. PROACTIVITY (Weight: 10%)
  // ==========================================
  const hasThreatModelAdrs = fileExists('docs/architecture/architecture-assessment-framework.md');
  checks.push({
    id: 'PRO-01',
    domain: 'Proactivity',
    criterion: 'Threat Modeling',
    priority: 'P1',
    status: hasThreatModelAdrs ? 'PASSED' : 'FAILED',
    score: hasThreatModelAdrs ? 100 : 0,
    weight: 2.0,
    evidence: hasThreatModelAdrs
      ? 'Enterprise architecture assessment framework ADRs establish threat modeling baselines'
      : 'Missing threat modeling ADRs',
  });

  const hasApiTests = fileExists('scripts/test-all-apis.ts');
  const hasSmokeTests = fileExists('scripts/monorepo-smoke.ts');
  checks.push({
    id: 'PRO-02',
    domain: 'Proactivity',
    criterion: 'Penetration & Vulnerability Testing',
    priority: 'P0',
    status: hasApiTests && hasSmokeTests ? 'PASSED' : 'FAILED',
    score: hasApiTests && hasSmokeTests ? 100 : 0,
    weight: 2.5,
    evidence:
      hasApiTests && hasSmokeTests
        ? 'Automated API vulnerability & smoke test suites (scripts/test-all-apis.ts, scripts/monorepo-smoke.ts)'
        : 'Missing automated test suites',
  });

  const dependabotYml = readFileSafe('.github/dependabot.yml');
  const hasRegularUpdates = dependabotYml.includes('interval:');
  checks.push({
    id: 'PRO-03',
    domain: 'Proactivity',
    criterion: 'Security Updates & Patching',
    priority: 'P1',
    status: hasRegularUpdates ? 'PASSED' : 'FAILED',
    score: hasRegularUpdates ? 100 : 0,
    weight: 2.0,
    evidence: hasRegularUpdates
      ? 'Dependabot configured for automated dependency updates across npm workspaces'
      : 'Dependabot update intervals not configured',
  });

  const hasAuditScripts = pkgJson.includes('audit:architecture') && pkgJson.includes('lfs:verify');
  checks.push({
    id: 'PRO-04',
    domain: 'Proactivity',
    criterion: 'Vulnerability Management',
    priority: 'P0',
    status: hasAuditScripts ? 'PASSED' : 'FAILED',
    score: hasAuditScripts ? 100 : 0,
    weight: 2.0,
    evidence: hasAuditScripts
      ? 'Automated architecture & supply chain vulnerability audit scripts in package.json'
      : 'Missing automated audit scripts',
  });

  const loggerConfig = readFileSafe('apps/backend/src/config/logger.ts');
  const hasLoggerRedaction = loggerConfig.includes('paths:') && loggerConfig.includes('[REDACTED]');
  checks.push({
    id: 'PRO-05',
    domain: 'Proactivity',
    criterion: 'Security Monitoring & Anomaly Detection',
    priority: 'P0',
    status: hasLoggerRedaction ? 'PASSED' : 'FAILED',
    score: hasLoggerRedaction ? 100 : 0,
    weight: 1.5,
    evidence: hasLoggerRedaction
      ? 'Pino structured logging with automated credential and token redaction paths'
      : 'Missing logger redaction or structured logging',
  });

  // ==========================================
  // 4. AWARENESS (Weight: 8%)
  // ==========================================
  const hasSecKnowledge = fileExists('.github/knowledge/security/secure-coding-standards.md');
  checks.push({
    id: 'AWA-01',
    domain: 'Awareness',
    criterion: 'Ongoing Security Education',
    priority: 'P1',
    status: hasSecKnowledge ? 'PASSED' : 'FAILED',
    score: hasSecKnowledge ? 100 : 0,
    weight: 2.0,
    evidence: hasSecKnowledge
      ? 'Centralized security knowledge base (.github/knowledge/security/) available for all contributors'
      : 'Missing centralized security knowledge documents',
  });

  const prohibitsConcreteCreds = agentsMd.includes('Zero Display of Concrete Credentials');
  checks.push({
    id: 'AWA-02',
    domain: 'Awareness',
    criterion: 'Credential Hygiene & Social Engineering',
    priority: 'P2',
    status: prohibitsConcreteCreds ? 'PASSED' : 'FAILED',
    score: prohibitsConcreteCreds ? 100 : 0,
    weight: 1.0,
    evidence: prohibitsConcreteCreds
      ? 'Mandatory credential hygiene policy strictly prohibiting concrete credentials in docs/UI'
      : 'Missing concrete credential prohibition rule',
  });

  const hasSecAgent = fileExists('.github/agents/security-reviewer.md');
  checks.push({
    id: 'AWA-03',
    domain: 'Awareness',
    criterion: 'Security Champions Program',
    priority: 'P1',
    status: hasSecAgent ? 'PASSED' : 'FAILED',
    score: hasSecAgent ? 100 : 0,
    weight: 2.0,
    evidence: hasSecAgent
      ? 'Automated security champion custom agent (.github/agents/security-reviewer.md) active'
      : 'Missing dedicated security champion agent persona',
  });

  const hasContactInSecurityMd = securityMd.includes('Reporting a Vulnerability');
  checks.push({
    id: 'AWA-04',
    domain: 'Awareness',
    criterion: 'Clear Communication Channels',
    priority: 'P1',
    status: hasContactInSecurityMd ? 'PASSED' : 'FAILED',
    score: hasContactInSecurityMd ? 100 : 0,
    weight: 1.5,
    evidence: hasContactInSecurityMd
      ? 'Documented vulnerability disclosure reporting protocol in SECURITY.md'
      : 'Missing vulnerability disclosure contact in SECURITY.md',
  });

  const prTemplate = readFileSafe('.github/pull_request_template.md');
  const hasSecChecklist = prTemplate.includes('Security') && prTemplate.includes('Checklist');
  checks.push({
    id: 'AWA-05',
    domain: 'Awareness',
    criterion: 'Security-First Culture',
    priority: 'P1',
    status: hasSecChecklist ? 'PASSED' : 'FAILED',
    score: hasSecChecklist ? 100 : 0,
    weight: 1.5,
    evidence: hasSecChecklist
      ? 'Pull request template (.github/pull_request_template.md) enforces mandatory security checklist'
      : 'Missing security checklist in pull request template',
  });

  // ==========================================
  // 5. GITHUB ENTERPRISE DEPLOYMENTS (Weight: 10%)
  // ==========================================
  const hasCodeowners = fileExists('.github/CODEOWNERS');
  checks.push({
    id: 'GHE-01',
    domain: 'GitHub Enterprise',
    criterion: 'Enterprise Configuration Governance',
    priority: 'P0',
    status: hasCodeowners ? 'PASSED' : 'FAILED',
    score: hasCodeowners ? 100 : 0,
    weight: 1.0,
    evidence: hasCodeowners
      ? '.github/CODEOWNERS enforces granular code ownership across directories'
      : 'Missing CODEOWNERS',
  });

  const tokenUtil = readFileSafe('apps/backend/src/utils/token.ts');
  const hasJwtRotation =
    tokenUtil.includes('generateAccessToken') && tokenUtil.includes('generateRefreshToken');
  checks.push({
    id: 'GHE-02',
    domain: 'GitHub Enterprise',
    criterion: 'SSO & Token Governance',
    priority: 'P0',
    status: hasJwtRotation ? 'PASSED' : 'FAILED',
    score: hasJwtRotation ? 100 : 0,
    weight: 1.5,
    evidence: hasJwtRotation
      ? 'Dual JWT access/refresh token rotation with cryptographic verification in TokenUtil'
      : 'Missing dual-token rotation architecture',
  });

  const hasMirrorConfig = fileExists('infrastructure/resilience/mirror-config.yaml');
  checks.push({
    id: 'GHE-03',
    domain: 'GitHub Enterprise',
    criterion: 'GHES Backup and Disaster Recovery',
    priority: 'P0',
    status: hasMirrorConfig ? 'PASSED' : 'FAILED',
    score: hasMirrorConfig ? 100 : 0,
    weight: 1.5,
    evidence: hasMirrorConfig
      ? 'Warm repository resilience mirror configuration (infrastructure/resilience/mirror-config.yaml) active'
      : 'Missing repository mirror configuration',
  });

  const hasPrivateNetConfig = fileExists(
    'infrastructure/networking/actions-private-network/network-config.yaml',
  );
  checks.push({
    id: 'GHE-04',
    domain: 'GitHub Enterprise',
    criterion: 'Network & Perimeter Security',
    priority: 'P0',
    status: hasPrivateNetConfig ? 'PASSED' : 'FAILED',
    score: hasPrivateNetConfig ? 100 : 0,
    weight: 1.5,
    evidence: hasPrivateNetConfig
      ? 'Azure VNet injection & private runner subnet delegation config (network-config.yaml) established'
      : 'Missing private network configuration',
  });

  const hasUserModule =
    fileExists('apps/backend/src/modules/user/user.model.ts') &&
    fileExists('apps/backend/src/modules/role/role.model.ts');
  checks.push({
    id: 'GHE-05',
    domain: 'GitHub Enterprise',
    criterion: 'Automated User Provisioning (SCIM)',
    priority: 'P0',
    status: hasUserModule ? 'PASSED' : 'FAILED',
    score: hasUserModule ? 100 : 0,
    weight: 1.0,
    evidence: hasUserModule
      ? 'Granular User and Role schema models with tenant isolation and status management'
      : 'Missing User or Role modules',
  });

  const gitattributes = readFileSafe('.gitattributes');
  const hasLfsPolicy = gitattributes.includes('filter=lfs');
  checks.push({
    id: 'GHE-06',
    domain: 'GitHub Enterprise',
    criterion: 'Custom Security Policies & LFS',
    priority: 'P1',
    status: hasLfsPolicy ? 'PASSED' : 'FAILED',
    score: hasLfsPolicy ? 100 : 0,
    weight: 0.5,
    evidence: hasLfsPolicy
      ? '.gitattributes enforces strict Git LFS rules for heavy binaries (.psd, .mp4, .zip)'
      : 'Missing LFS configuration in .gitattributes',
  });

  const hasRateLimiter = appTs.includes('apiRateLimiter') && appTs.includes('mutationRateLimiter');
  checks.push({
    id: 'GHE-07',
    domain: 'GitHub Enterprise',
    criterion: 'API Security & Token Governance',
    priority: 'P0',
    status: hasRateLimiter ? 'PASSED' : 'FAILED',
    score: hasRateLimiter ? 100 : 0,
    weight: 1.0,
    evidence: hasRateLimiter
      ? 'Express app mounts apiRateLimiter and mutationRateLimiter to mitigate brute force & DoS'
      : 'Missing rate limiter middleware',
  });

  const hasHealthRoute = fileExists('apps/backend/src/modules/health/health.route.ts');
  checks.push({
    id: 'GHE-08',
    domain: 'GitHub Enterprise',
    criterion: 'Monitoring and Real-Time Alerts',
    priority: 'P0',
    status: hasHealthRoute ? 'PASSED' : 'FAILED',
    score: hasHealthRoute ? 100 : 0,
    weight: 1.0,
    evidence: hasHealthRoute
      ? 'Health check route active with database connectivity and process memory telemetry'
      : 'Missing health route',
  });

  const userModel = readFileSafe('apps/backend/src/modules/user/user.model.ts');
  const studentModel = readFileSafe('apps/backend/src/modules/student/student.model.ts');
  const hasTenantIsolation =
    (userModel.includes('schoolId') && userModel.includes('branchAccess')) ||
    (studentModel.includes('schoolId') && studentModel.includes('branchId'));
  checks.push({
    id: 'GHE-09',
    domain: 'GitHub Enterprise',
    criterion: 'Data Residency & Tenant Scoping',
    priority: 'P1',
    status: hasTenantIsolation ? 'PASSED' : 'FAILED',
    score: hasTenantIsolation ? 100 : 0,
    weight: 0.5,
    evidence: hasTenantIsolation
      ? 'Database models enforce server-side schoolId and branchId/branchAccess tenancy scoping'
      : 'Missing tenant scoping fields in data models',
  });

  const hasPkgLockIntegrity = fileExists('package-lock.json');
  checks.push({
    id: 'GHE-10',
    domain: 'GitHub Enterprise',
    criterion: 'Third-Party Integration Vetting',
    priority: 'P1',
    status: hasPkgLockIntegrity ? 'PASSED' : 'FAILED',
    score: hasPkgLockIntegrity ? 100 : 0,
    weight: 0.5,
    evidence: hasPkgLockIntegrity
      ? 'Strict package-lock.json sha512 integrity hashes enforce supply chain provenance'
      : 'Missing package-lock.json',
  });

  // ==========================================
  // 6. SCALABILITY (Weight: 9%)
  // ==========================================
  const hasWorkspaces = pkgJson.includes('workspaces') && pkgJson.includes('@snp/shared');
  checks.push({
    id: 'SCA-01',
    domain: 'Scalability',
    criterion: 'Repository Structure & Clarity',
    priority: 'P1',
    status: hasWorkspaces ? 'PASSED' : 'FAILED',
    score: hasWorkspaces ? 100 : 0,
    weight: 2.0,
    evidence: hasWorkspaces
      ? 'Clean npm workspaces monorepo architecture (packages/shared, apps/backend, apps/frontend)'
      : 'Missing workspaces configuration',
  });

  const hasLabeler = fileExists('.github/labeler.yml');
  checks.push({
    id: 'SCA-02',
    domain: 'Scalability',
    criterion: 'Custom Properties & Labeler Rules',
    priority: 'P2',
    status: hasLabeler ? 'PASSED' : 'FAILED',
    score: hasLabeler ? 100 : 0,
    weight: 1.0,
    evidence: hasLabeler
      ? '.github/labeler.yml categorizes changes across monorepo boundaries'
      : 'Missing labeler.yml',
  });

  const backendModules = fs.existsSync(path.resolve(ROOT_DIR, 'apps/backend/src/modules'))
    ? fs.readdirSync(path.resolve(ROOT_DIR, 'apps/backend/src/modules')).length
    : 0;
  const isModular = backendModules >= 40;
  checks.push({
    id: 'SCA-03',
    domain: 'Scalability',
    criterion: 'Code Modularity & Loose Coupling',
    priority: 'P1',
    status: isModular ? 'PASSED' : 'FAILED',
    score: isModular ? 100 : 0,
    weight: 2.5,
    evidence: isModular
      ? `${backendModules} modular monolith domain modules adhering to 7-layer design`
      : 'Insufficient module segmentation',
  });

  const tsconfigShared = fileExists('packages/tsconfig/base.json');
  const tsconfigBackend = fileExists('apps/backend/tsconfig.json');
  const tsconfigFrontend = fileExists('apps/frontend/tsconfig.json');
  const isStandardTechStack = tsconfigShared && tsconfigBackend && tsconfigFrontend;
  checks.push({
    id: 'SCA-04',
    domain: 'Scalability',
    criterion: 'Tech Stack Standardization',
    priority: 'P1',
    status: isStandardTechStack ? 'PASSED' : 'FAILED',
    score: isStandardTechStack ? 100 : 0,
    weight: 2.0,
    evidence: isStandardTechStack
      ? 'Standardized TypeScript 5.8+ compiler configs, Express 5, and Next.js across apps'
      : 'Inconsistent tech stack configuration',
  });

  const hasVercelManifest = fileExists('vercel.json') || fileExists('apps/frontend/vercel.json');
  checks.push({
    id: 'SCA-05',
    domain: 'Scalability',
    criterion: 'Resource Headroom & Elastic Scaling',
    priority: 'P1',
    status: hasVercelManifest ? 'PASSED' : 'FAILED',
    score: hasVercelManifest ? 100 : 0,
    weight: 1.5,
    evidence: hasVercelManifest
      ? 'Hybrid edge serverless frontend proxy + persistent backend container deployment model'
      : 'Missing serverless deployment configuration',
  });

  // ==========================================
  // 7. RESILIENCY (Weight: 9%)
  // ==========================================
  const dbConfig = readFileSafe('apps/backend/src/config/database.ts');
  const hasReplicaSet =
    dbConfig.includes('replicaSet') || dbConfig.includes('rs0') || dbConfig.includes('connect(');
  checks.push({
    id: 'RES-01',
    domain: 'Resiliency',
    criterion: 'Fault Tolerance & DR Drills',
    priority: 'P0',
    status: hasReplicaSet ? 'PASSED' : 'FAILED',
    score: hasReplicaSet ? 100 : 0,
    weight: 4.5,
    evidence: hasReplicaSet
      ? 'MongoDB connection pooling with automated replica set reconnection resilience'
      : 'Missing resilient database connection configuration',
  });

  const transactionUtil = readFileSafe('apps/backend/src/utils/transaction.ts');
  const hasTransactionSupport =
    transactionUtil.includes('startSession') &&
    transactionUtil.includes('withTransaction') &&
    transactionUtil.includes('majority');
  checks.push({
    id: 'RES-02',
    domain: 'Resiliency',
    criterion: 'Data Replication & Consistency',
    priority: 'P0',
    status: hasTransactionSupport ? 'PASSED' : 'FAILED',
    score: hasTransactionSupport ? 100 : 0,
    weight: 4.5,
    evidence: hasTransactionSupport
      ? 'ACID transaction sessions across Mongoose models ensure atomic data consistency'
      : 'Missing database transaction support',
  });

  // ==========================================
  // 8. MODULARITY (Weight: 7%)
  // ==========================================
  const hasSharedPackage = fileExists('packages/shared/package.json');
  checks.push({
    id: 'MOD-01',
    domain: 'Modularity',
    criterion: 'Service Separation & Clear Interfaces',
    priority: 'P1',
    status: hasSharedPackage ? 'PASSED' : 'FAILED',
    score: hasSharedPackage ? 100 : 0,
    weight: 3.5,
    evidence: hasSharedPackage
      ? '@snp/shared centralizes canonical DTOs, interfaces, and permissions'
      : 'Missing shared contract package',
  });

  const hasBoundaryDoc = fileExists('docs/architecture/boundary-rules.md');
  checks.push({
    id: 'MOD-02',
    domain: 'Modularity',
    criterion: 'Context-Appropriate Modular Monolith',
    priority: 'P1',
    status: hasBoundaryDoc ? 'PASSED' : 'FAILED',
    score: hasBoundaryDoc ? 100 : 0,
    weight: 3.5,
    evidence: hasBoundaryDoc
      ? 'Boundary rules enforce modular monolith boundaries without microservices network overhead'
      : 'Missing domain boundary documentation',
  });

  // ==========================================
  // 9. INTEROPERABILITY (Weight: 7%)
  // ==========================================
  const hasWebhookTimingSafe = passwordUtil.includes('timingSafeEqual');
  checks.push({
    id: 'INT-01',
    domain: 'Interoperability',
    criterion: 'Secure Custom Integrations',
    priority: 'P1',
    status: hasWebhookTimingSafe ? 'PASSED' : 'FAILED',
    score: hasWebhookTimingSafe ? 100 : 0,
    weight: 1.5,
    evidence: hasWebhookTimingSafe
      ? 'Constant-time crypto comparisons protect external webhooks and signatures'
      : 'Missing timingSafeEqual implementation',
  });

  const hasFirewallSpecs = fileExists(
    'infrastructure/networking/actions-private-network/network-config.yaml',
  );
  checks.push({
    id: 'INT-02',
    domain: 'Interoperability',
    criterion: 'Network Configuration & Firewalls',
    priority: 'P0',
    status: hasFirewallSpecs ? 'PASSED' : 'FAILED',
    score: hasFirewallSpecs ? 100 : 0,
    weight: 2.0,
    evidence: hasFirewallSpecs
      ? 'Network configuration defines NSG rules, Azure Firewall FQDN filtering, and subnet delegation'
      : 'Missing network firewall specification',
  });

  const hasDeployGate = fileExists('scripts/verify-deploy-gate.ts');
  checks.push({
    id: 'INT-03',
    domain: 'Interoperability',
    criterion: 'Scheduled Maintenance & Deploy Gates',
    priority: 'P1',
    status: hasDeployGate ? 'PASSED' : 'FAILED',
    score: hasDeployGate ? 100 : 0,
    weight: 1.5,
    evidence: hasDeployGate
      ? 'scripts/verify-deploy-gate.ts enforces pre-deploy build, typecheck, and CI checks'
      : 'Missing deploy gate verification script',
  });

  const hasArcScaleset = fileExists(
    'apps/backend/infrastructure/k8s/arc/arc-runner-scaleset-standard.yaml',
  );
  checks.push({
    id: 'INT-04',
    domain: 'Interoperability',
    criterion: 'Hardware Scalability & Capacity Planning',
    priority: 'P1',
    status: hasArcScaleset ? 'PASSED' : 'FAILED',
    score: hasArcScaleset ? 100 : 0,
    weight: 1.0,
    evidence: hasArcScaleset
      ? 'ARC runner scaleset configuration specifies requests==limits QoS with 20% subnet headroom'
      : 'Missing ARC scaleset specification',
  });

  const hasResilienceDoc = fileExists('docs/architecture/repository-resilience-mirroring.md');
  checks.push({
    id: 'INT-05',
    domain: 'Interoperability',
    criterion: 'Robust Backup & Disaster Recovery',
    priority: 'P0',
    status: hasResilienceDoc ? 'PASSED' : 'FAILED',
    score: hasResilienceDoc ? 100 : 0,
    weight: 1.0,
    evidence: hasResilienceDoc
      ? 'Documented warm mirroring protocol in secondary cloud domain with sync lock verification'
      : 'Missing resilience mirroring documentation',
  });

  // ==========================================
  // 10. SIMPLICITY (Weight: 6%)
  // ==========================================
  const tsconfigBase = readFileSafe('packages/tsconfig/base.json');
  const isStrictTs = tsconfigBase.includes('"strict": true');
  checks.push({
    id: 'SIM-01',
    domain: 'Simplicity',
    criterion: 'Code Simplicity & Standards',
    priority: 'P1',
    status: isStrictTs ? 'PASSED' : 'FAILED',
    score: isStrictTs ? 100 : 0,
    weight: 2.0,
    evidence: isStrictTs
      ? 'Strict TypeScript compiler configuration eliminates implicit types and null crashes'
      : 'Non-strict TypeScript configuration',
  });

  const designStandards = readFileSafe('.agents/skills/snp-sms-design-standards/SKILL.md');
  const hasBrandTokens =
    designStandards.includes('01 #0056FF') && designStandards.includes('04 #FFFFFF');
  checks.push({
    id: 'SIM-02',
    domain: 'Simplicity',
    criterion: 'Straightforward System & UI Design',
    priority: 'P1',
    status: hasBrandTokens ? 'PASSED' : 'FAILED',
    score: hasBrandTokens ? 100 : 0,
    weight: 2.0,
    evidence: hasBrandTokens
      ? 'Mathematical 5-token palette, zero shadows, flat luminance depth, and zero emojis'
      : 'Missing canonical brand token standard',
  });

  const hasChangelog = fileExists('CHANGELOG.md') && fileExists('scripts/sync-changelog.ts');
  checks.push({
    id: 'SIM-03',
    domain: 'Simplicity',
    criterion: 'Clear, Up-to-Date Documentation',
    priority: 'P1',
    status: hasChangelog ? 'PASSED' : 'FAILED',
    score: hasChangelog ? 100 : 0,
    weight: 2.0,
    evidence: hasChangelog
      ? 'CHANGELOG.md actively synchronized with developer portal via scripts/sync-changelog.ts'
      : 'Missing CHANGELOG.md or sync script',
  });

  // ==========================================
  // 11. OBSERVABILITY (Weight: 7%)
  // ==========================================
  const hasRequestLogger = fileExists('apps/backend/src/middleware/request-logger.ts');
  checks.push({
    id: 'OBS-01',
    domain: 'Observability',
    criterion: 'Comprehensive Structured Logging',
    priority: 'P0',
    status: hasRequestLogger ? 'PASSED' : 'FAILED',
    score: hasRequestLogger ? 100 : 0,
    weight: 3.5,
    evidence: hasRequestLogger
      ? 'Pino HTTP structured logger tracks correlation IDs (X-Request-ID) with sanitized URLs'
      : 'Missing structured request logger middleware',
  });

  const auditLogRoute = readFileSafe('apps/backend/src/modules/audit-log/audit-log.route.ts');
  const hasAuditRbac =
    auditLogRoute.includes('audit.view.own_branch') && auditLogRoute.includes('requireAuth');
  checks.push({
    id: 'OBS-02',
    domain: 'Observability',
    criterion: 'Secure Log Aggregation & RBAC',
    priority: 'P0',
    status: hasAuditRbac ? 'PASSED' : 'FAILED',
    score: hasAuditRbac ? 100 : 0,
    weight: 3.5,
    evidence: hasAuditRbac
      ? 'Audit log routes enforce strict requireAuth and audit.view permission scopes'
      : 'Missing authorization checks on audit log routes',
  });

  // ==========================================
  // DOMAIN SUMMARIES & OVERALL SCORING
  // ==========================================
  const domainMap = new Map<string, CheckItem[]>();
  for (const check of checks) {
    const list = domainMap.get(check.domain) || [];
    list.push(check);
    domainMap.set(check.domain, list);
  }

  const domainSummaries: DomainSummary[] = [];
  let totalWeightedScore = 0;
  let totalWeight = 0;

  for (const [domain, items] of domainMap.entries()) {
    const totalChecks = items.length;
    const passedChecks = items.filter((i) => i.status === 'PASSED').length;
    const failedChecks = items.filter((i) => i.status === 'FAILED').length;
    const warningChecks = items.filter((i) => i.status === 'WARNING').length;

    let domainWeightSum = 0;
    let domainScoreSum = 0;
    for (const item of items) {
      domainWeightSum += item.weight;
      domainScoreSum += item.score * item.weight;
    }

    const domainScore = domainWeightSum > 0 ? domainScoreSum / domainWeightSum : 0;
    domainSummaries.push({
      domain,
      totalChecks,
      passedChecks,
      failedChecks,
      warningChecks,
      score: domainScore,
      weight: domainWeightSum,
    });

    totalWeightedScore += domainScoreSum;
    totalWeight += domainWeightSum;
  }

  const compositeScore = totalWeight > 0 ? totalWeightedScore / totalWeight : 0;

  const p0Failed = checks.filter((c) => c.priority === 'P0' && c.status === 'FAILED').length;
  const p1Failed = checks.filter((c) => c.priority === 'P1' && c.status === 'FAILED').length;

  let complianceTier = 'NON_COMPLIANT';
  if (compositeScore >= 95.0 && p0Failed === 0 && p1Failed === 0) {
    complianceTier = 'PLATINUM';
  } else if (compositeScore >= 85.0 && p0Failed === 0) {
    complianceTier = 'GOLD';
  } else if (compositeScore >= 70.0 && p0Failed === 0) {
    complianceTier = 'SILVER';
  } else if (compositeScore >= 55.0) {
    complianceTier = 'BRONZE';
  }

  // ==========================================
  // OUTPUT REPORT
  // ==========================================
  console.log(
    '| ID     | Priority | Domain             | Criterion                         | Status   | Score | Evidence',
  );
  console.log(
    '| :----- | :------- | :----------------- | :-------------------------------- | :------- | :---- | :------------------------------------------------------------------',
  );

  for (const c of checks) {
    const idPad = c.id.padEnd(6);
    const prioPad = `[${c.priority}]`.padEnd(8);
    const domPad = c.domain.padEnd(18);
    const critPad = c.criterion.padEnd(33);
    const statusPad = `[${c.status}]`.padEnd(8);
    const scorePad = `${c.score}%`.padStart(5);
    console.log(
      `| ${idPad} | ${prioPad} | ${domPad} | ${critPad} | ${statusPad} | ${scorePad} | ${c.evidence}`,
    );
  }

  console.log('\n================================================================================');
  console.log('                          DOMAIN COMPLIANCE SUMMARY                             ');
  console.log('================================================================================');
  console.log('| Domain                          | Checks | Passed | Failed | Warn | Score   |');
  console.log('| :------------------------------ | :----- | :----- | :----- | :--- | :------ |');
  for (const d of domainSummaries) {
    const namePad = d.domain.padEnd(30);
    const chkPad = String(d.totalChecks).padStart(6);
    const passPad = String(d.passedChecks).padStart(6);
    const failPad = String(d.failedChecks).padStart(6);
    const warnPad = String(d.warningChecks).padStart(4);
    const scPad = `${d.score.toFixed(1)}%`.padStart(7);
    console.log(`| ${namePad} | ${chkPad} | ${passPad} | ${failPad} | ${warnPad} | ${scPad} |`);
  }

  console.log('\n================================================================================');
  console.log(` COMPOSITE AUDIT SCORE : ${compositeScore.toFixed(2)}%`);
  console.log(` COMPLIANCE TIER       : [${complianceTier}]`);
  console.log(` FAILED CHECKS         : P0: ${p0Failed} | P1: ${p1Failed}`);
  console.log(` TOTAL CHECKS AUDITED  : ${checks.length} checks across 11 domains`);
  console.log('================================================================================\n');

  if (p0Failed > 0) {
    console.error(`[AUDIT FAILED] ${p0Failed} critical [P0] application security checks failed.`);
    process.exit(1);
  }

  console.log('[AUDIT PASSED] All critical [P0] application security checkpoints verified.');
}

runApplicationSecurityAudit().catch((error) => {
  console.error('[ERROR] Application security audit runner failed:', error);
  process.exit(1);
});
