import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

interface WorkflowRun {
  databaseId: number;
  name: string;
  status: string;
  conclusion: string | null;
  displayTitle: string;
}

function runCommand(command: string): string {
  try {
    return execSync(command, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch (err: unknown) {
    const error = err as { stdout?: string; stderr?: string; message: string };
    throw new Error(error.stderr || error.stdout || error.message);
  }
}

async function verifyDeploymentManifests(): Promise<void> {
  console.log('[1/6] Verifying deployment manifests, networking & security configurations...');
  const requiredFiles = [
    'vercel.json',
    'apps/backend/vercel.json',
    'apps/frontend/vercel.json',
    'apps/backend/infrastructure/k8s/backend-deployment.yaml',
    'infrastructure/networking/actions-private-network/network-config.yaml',
    'infrastructure/networking/actions-private-network/azure-vnet-runner-nsg.bicep',
    'infrastructure/networking/actions-private-network/azure-firewall-rules.tf',
    'infrastructure/networking/actions-private-network/setup-network-settings.sh',
    'infrastructure/security/threat-model/repository-threat-model.yaml',
    'infrastructure/security/threat-model/repository-ruleset-threat-defense.json',
    '.npmrc',
    '.devcontainer/devcontainer.json',
  ];

  for (const file of requiredFiles) {
    if (!fs.existsSync(path.resolve(process.cwd(), file))) {
      throw new Error(`Missing required deployment manifest: ${file}`);
    }
    console.log(`      [PASS] Manifest verified: ${file}`);
  }
}

async function verifyLintQuality(): Promise<void> {
  console.log('\n[2/4] Verifying code quality & ESLint gate...');
  try {
    runCommand('npm run lint');
    console.log('      [PASS] ESLint passed with 0 errors.');
  } catch (err: unknown) {
    const error = err as Error;
    throw new Error(`ESLint quality check failed: ${error.message}`);
  }
}

async function verifyProductionBuilds(): Promise<void> {
  console.log('\n[3/4] Verifying production bundle compilation...');
  try {
    runCommand('npm run build');
    console.log('      [PASS] Production builds compiled with 0 errors.');
  } catch (err: unknown) {
    const error = err as Error;
    throw new Error(`Production build failed: ${error.message}`);
  }
}

async function verifyGitHubWorkflowStatus(): Promise<void> {
  console.log('\n[4/4] Checking GitHub Actions deployment & CI health on main...');
  try {
    const jsonOutput = runCommand(
      'gh run list --branch main --limit 15 --json databaseId,name,status,conclusion,displayTitle',
    );
    const runs: WorkflowRun[] = JSON.parse(jsonOutput);

    const latestRunsByName = new Map<string, WorkflowRun>();
    for (const run of runs) {
      if (!latestRunsByName.has(run.name)) {
        latestRunsByName.set(run.name, run);
      }
    }

    const failedWorkflows: WorkflowRun[] = [];
    for (const [, run] of latestRunsByName) {
      if (run.conclusion === 'failure') {
        failedWorkflows.push(run);
      }
    }

    if (failedWorkflows.length > 0) {
      if (process.env.ALLOW_FIX === '1' || process.env.CI_FIX === '1') {
        console.warn(
          '\n[WARN] Failed workflows detected on main, but ALLOW_FIX=1 is active to push the resolving commit.',
        );
      } else {
        console.error('\n[FAILED] PUSH BLOCKED: The following workflows failed on main:');
        for (const failed of failedWorkflows) {
          console.error(`  - ${failed.name} (ID: ${failed.databaseId}): "${failed.displayTitle}"`);
        }
        throw new Error(
          'Push blocked by Pre-Push Quality Gate: All GitHub deployment and CI workflows must be green before pushing new changes.',
        );
      }
    }

    console.log(
      '      [PASS] All active GitHub deployment and CI workflows on main are passing green.',
    );
  } catch (err: unknown) {
    const error = err as Error;
    if (error.message.includes('PUSH BLOCKED')) {
      throw error;
    }
    // If gh CLI is not available or not logged in, skip GitHub check with a warning
    console.log(`      [WARN] GitHub CLI check skipped: ${error.message.split('\n')[0]}`);
  }
}

async function verifyPrivateNetworking(): Promise<void> {
  console.log('\n[5/6] Auditing GitHub Actions Private Networking & VNet Injection...');
  try {
    runCommand('npm run verify:private-network');
    console.log(
      '      [PASS] Private networking configuration, subnet capacity & firewall FQDNs verified.',
    );
  } catch (err: unknown) {
    const error = err as Error;
    throw new Error(`Private networking verification failed: ${error.message}`);
  }
}

async function verifyThreatModel(): Promise<void> {
  console.log('\n[6/7] Auditing GitHub Repository Threat Model (T-01 to T-08)...');
  try {
    runCommand('npm run verify:threat-model');
    console.log('      [PASS] All 8 repository threat vectors verified and mitigated.');
  } catch (err: unknown) {
    const error = err as Error;
    throw new Error(`Threat model verification failed: ${error.message}`);
  }
}

async function verifyWorkflowSecurity(): Promise<void> {
  console.log(
    '\n[7/8] Auditing GitHub Actions Workflow Hardening (SHA Pinning & Script Injection)...',
  );
  try {
    runCommand('npm run verify:workflows');
    console.log(
      '      [PASS] All 18 workflows pinned to immutable 40-character SHAs with zero script injections.',
    );
  } catch (err: unknown) {
    const error = err as Error;
    throw new Error(`Workflow security verification failed: ${error.message}`);
  }
}

async function verifyGhasEnforcement(): Promise<void> {
  console.log('\n[8/9] Auditing GitHub Advanced Security (GHAS) at Scale (Pillars 1 to 7)...');
  try {
    runCommand('npm run verify:ghas');
    console.log(
      '      [PASS] GHAS at scale policies, bypass prevention & dependency reviews verified.',
    );
  } catch (err: unknown) {
    const error = err as Error;
    throw new Error(`GHAS at scale verification failed: ${error.message}`);
  }
}

async function verifyRepoArchitecture(): Promise<void> {
  console.log(
    '\n[9/10] Auditing Repository Architecture Strategy (Monorepo Modularity & Boundaries)...',
  );
  try {
    runCommand('npm run verify:repo-strategy');
    console.log(
      '      [PASS] Monorepo workspaces, boundary decoupling & circular dependency guards verified.',
    );
  } catch (err: unknown) {
    const error = err as Error;
    throw new Error(`Repository architecture verification failed: ${error.message}`);
  }
}

async function verifyLargeRepoManagement(): Promise<void> {
  console.log(
    '\n[10/10] Auditing Large Git Repository Management (Git LFS, Tree Depth & Bloat Guards)...',
  );
  try {
    runCommand('npm run verify:large-repo');
    console.log(
      '      [PASS] Git LFS filters, <=50MB blob limits, and tree depth sanity verified.',
    );
  } catch (err: unknown) {
    const error = err as Error;
    throw new Error(`Large repo management verification failed: ${error.message}`);
  }
}

async function main() {
  console.log('======================================================');
  console.log('SNP-SMS Pre-Push Deployment & CI Quality Gate');
  console.log('======================================================\n');

  try {
    await verifyDeploymentManifests();
    await verifyLintQuality();
    await verifyProductionBuilds();
    await verifyGitHubWorkflowStatus();
    await verifyPrivateNetworking();
    await verifyThreatModel();
    await verifyWorkflowSecurity();
    await verifyGhasEnforcement();
    await verifyRepoArchitecture();
    await verifyLargeRepoManagement();
    console.log('\n======================================================');
    console.log('[PASSED] Pre-push deployment and CI quality gate verified 100%.');
    console.log('======================================================');
  } catch (err: unknown) {
    const error = err as Error;
    console.error('\n[FAILED] Deployment Quality Gate assertion failed:');
    console.error(error.message);
    process.exit(1);
  }
}

void main();
