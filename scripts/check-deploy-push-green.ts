import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { waitForCIStatus, getRemoteRepo } from './verify-ci-status';

function run(cmd: string, echo = false): string {
  if (echo) {
    console.log(`> ${cmd}`);
  }
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch (err: unknown) {
    const error = err as { stdout?: string; stderr?: string; message: string };
    throw new Error(error.stderr || error.stdout || error.message);
  }
}

export async function checkDeployPushGreen(): Promise<void> {
  const args = process.argv.slice(2);
  const skipCiWait = args.includes('--skip-ci-wait');
  const dryRun = args.includes('--dry-run');
  const deployVercel = args.includes('--deploy-vercel');

  let messageArg = '';
  const msgIdx = args.indexOf('--message');
  if (msgIdx !== -1 && args[msgIdx + 1]) {
    messageArg = args[msgIdx + 1];
  }

  let remoteArg = '';
  const remoteIdx = args.indexOf('--remote');
  if (remoteIdx !== -1 && args[remoteIdx + 1]) {
    remoteArg = args[remoteIdx + 1];
  }

  console.log('================================================================');
  console.log('SNPI-Web Standard Check, Deploy, Push & Green Verification Gate');
  console.log('================================================================\n');

  // Gate 1: Code Formatting Audit & Auto-Fix
  console.log('[1/9] Verifying code formatting (Prettier)...');
  try {
    run('npm run format:check');
    console.log('      [PASS] Code formatting is 100% compliant.');
  } catch {
    console.log('      [FIX] Prettier format issues detected. Running prettier auto-format...');
    run('npx prettier --write .');
    console.log('      [PASS] Code formatted successfully.');
  }

  // Gate 2: Full ESLint Quality Gate
  console.log('\n[2/9] Running ESLint Quality Gate...');
  try {
    run('npm run lint');
    console.log('      [PASS] ESLint passed with 0 errors.');
  } catch (err: unknown) {
    const error = err as Error;
    console.error('      [FAILED] ESLint checks failed:');
    console.error(error.message);
    throw new Error('Push blocked by ESLint Quality Gate.');
  }

  // Gate 3: TypeScript Static Analysis
  console.log('\n[3/9] Running TypeScript static typecheck (tsc --noEmit)...');
  try {
    run('npm run typecheck');
    console.log('      [PASS] TypeScript static analysis passed with 0 errors.');
  } catch (err: unknown) {
    const error = err as Error;
    console.error('      [FAILED] TypeScript typecheck failed:');
    console.error(error.message);
    throw new Error('Push blocked by TypeScript Quality Gate.');
  }

  // Gate 4: Production Build
  console.log('\n[4/9] Verifying production Next.js compilation (npm run build)...');
  try {
    run('npm run build');
    console.log('      [PASS] Production build compiled successfully.');
  } catch (err: unknown) {
    const error = err as Error;
    console.error('      [FAILED] Production build failed:');
    console.error(error.message);
    throw new Error('Push blocked by Production Build Gate.');
  }

  // Gate 5: Vitest Test Suite
  console.log('\n[5/9] Executing Vitest unit & component test suites...');
  try {
    run('npm test');
    console.log('      [PASS] All Vitest test suites passed.');
  } catch (err: unknown) {
    const error = err as Error;
    console.error('      [FAILED] Tests failed:');
    console.error(error.message);
    throw new Error('Push blocked by Vitest Test Suite.');
  }

  // Gate 6: Deployment Manifest & Vercel Verification Gate
  console.log('\n[6/9] Verifying deployment manifests & Vercel configuration...');
  const vercelJsonPath = path.resolve(process.cwd(), 'vercel.json');
  if (!fs.existsSync(vercelJsonPath)) {
    throw new Error('Missing vercel.json configuration file.');
  }
  try {
    JSON.parse(fs.readFileSync(vercelJsonPath, 'utf-8'));
    console.log('      [PASS] vercel.json is valid JSON.');
  } catch (err: unknown) {
    throw new Error(`Invalid vercel.json: ${(err as Error).message}`);
  }

  const nextDir = path.resolve(process.cwd(), '.next');
  if (!fs.existsSync(nextDir)) {
    throw new Error('Missing .next build output directory.');
  }
  console.log('      [PASS] .next production build output verified.');

  // Gate 7: Commit Changes
  console.log('\n[7/9] Staging modifications and committing locally...');
  const statusOutput = run('git status --porcelain');
  const currentBranch = run('git rev-parse --abbrev-ref HEAD');

  if (statusOutput.length > 0) {
    console.log('      Uncommitted changes detected in working tree. Staging and committing...');
    run('git add -A');
    let commitMsg = messageArg || 'feat(web): automated checkpoint and quality gate pass';
    if (
      !commitMsg.startsWith('feat(web') &&
      !commitMsg.startsWith('fix(web') &&
      !commitMsg.startsWith('docs(web') &&
      !commitMsg.startsWith('chore(web')
    ) {
      commitMsg = `feat(web): ${commitMsg}`;
    }
    run(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`);
    console.log(`      [PASS] Committed: "${commitMsg}"`);
  } else {
    console.log('      Working tree clean. No uncommitted modifications.');
  }

  const headSha = run('git rev-parse HEAD');
  console.log(`      Target HEAD Commit SHA: ${headSha}`);

  if (dryRun) {
    console.log('\n[DRY RUN] All quality gates passed. Skipping remote push.');
    return;
  }

  // Gate 8: Remote Push
  console.log('\n[8/9] Pushing to GitHub remotes...');
  const availableRemotes = run('git remote')
    .split('\n')
    .map((r) => r.trim())
    .filter(Boolean);
  const targetRemotes: string[] = [];

  if (remoteArg) {
    targetRemotes.push(remoteArg);
  } else {
    if (availableRemotes.includes('origin')) {
      targetRemotes.push('origin');
    }
    if (availableRemotes.includes('org')) {
      targetRemotes.push('org');
    }
    if (availableRemotes.includes('personal')) {
      targetRemotes.push('personal');
    }
    if (targetRemotes.length === 0 && availableRemotes.length > 0) {
      targetRemotes.push(availableRemotes[0]);
    }
  }

  run('git config http.postBuffer 524288000');
  for (const r of targetRemotes) {
    console.log(`      Pushing ${currentBranch} to remote "${r}"...`);
    try {
      run(`git push ${r} ${currentBranch}`);
      console.log(`      [PASS] Pushed to ${r}/${currentBranch}.`);
    } catch (pushErr: unknown) {
      console.warn(`      [WARN] Push to ${r} failed: ${(pushErr as Error).message}`);
    }
  }

  if (skipCiWait) {
    console.log('\n[INFO] Skipping CI wait as --skip-ci-wait flag was provided.');
    return;
  }

  // Gate 9: Real-time GitHub Actions CI Monitoring Until 100% Green
  console.log('\n[9/10] Initiating automated live monitoring of GitHub Actions CI/CD workflows...');
  const repoToMonitor = targetRemotes.includes('origin')
    ? getRemoteRepo('origin')
    : getRemoteRepo('org');

  await waitForCIStatus({
    commitSha: headSha,
    repo: repoToMonitor,
    pollIntervalMs: 4000, // Optimized fast polling interval
    timeoutMinutes: 15,
    minWorkflows: 4,
  });

  // Gate 10: Automatic Vercel Production Deploy (ONLY after GitHub Actions is 100% Green)
  if (deployVercel) {
    console.log('\n[10/10] GitHub Actions CI is 100% green! Deploying verified build to Vercel Production...');
    run('vercel deploy --archive=tgz --prod', true);
    console.log('       [PASS] Production deployment to Vercel completed successfully.');
  }

  console.log('\n================================================================');
  console.log('[COMPLETED] Standard check, deploy, push & 100% green verified!');
  console.log('================================================================\n');
}

if (require.main === module) {
  checkDeployPushGreen()
    .then(() => {
      process.exit(0);
    })
    .catch((err: Error) => {
      console.error(`\n[FAILED] Pipeline aborted: ${err.message}`);
      process.exit(1);
    });
}
