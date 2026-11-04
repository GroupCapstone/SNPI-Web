import { execSync } from 'node:child_process';
import { waitForCIStatus } from './verify-ci-status';

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

function getNextPatchTag(): string {
  try {
    const latestTag = run('git tag --sort=-v:refname | head -n 1');
    if (!latestTag || !latestTag.startsWith('v')) {
      return 'v0.1.0';
    }
    const parts = latestTag.replace(/^v/, '').split('.');
    if (parts.length === 3) {
      const major = parseInt(parts[0], 10);
      const minor = parseInt(parts[1], 10);
      const patch = parseInt(parts[2], 10) + 1;
      return `v${major}.${minor}.${patch}`;
    }
    return `${latestTag}.1`;
  } catch {
    return 'v0.1.0';
  }
}

export async function runAutomatedPushCheckpoint(): Promise<void> {
  const args = process.argv.slice(2);
  const skipCiWait = args.includes('--skip-ci-wait');
  const dryRun = args.includes('--dry-run');

  // Parse --tag <val>
  let tagArg = '';
  const tagIdx = args.indexOf('--tag');
  if (tagIdx !== -1 && args[tagIdx + 1]) {
    tagArg = args[tagIdx + 1];
  }

  // Parse --message <val>
  let messageArg = '';
  const msgIdx = args.indexOf('--message');
  if (msgIdx !== -1 && args[msgIdx + 1]) {
    messageArg = args[msgIdx + 1];
  }

  console.log('======================================================');
  console.log('SNP-SMS Automated Push, Checkpoint & CI Verification Gate');
  console.log('======================================================\n');

  // Step 1: Code Formatting Audit & Auto-Fix
  console.log('[1/9] Verifying code formatting (Prettier)...');
  try {
    run('npm run format:check');
    console.log('      [PASS] Code formatting is 100% compliant.');
  } catch {
    console.log('      [FIX] Prettier format issues detected. Running npm run format...');
    run('npm run format');
    console.log('      [PASS] Code formatted successfully.');
  }

  // Step 2: Full ESLint Quality Gate
  console.log('\n[2/9] Running ESLint Quality Gate across all workspaces...');
  try {
    run('npm run lint');
    console.log('      [PASS] ESLint passed with 0 errors.');
  } catch (err: unknown) {
    const error = err as Error;
    console.error('      [FAILED] ESLint checks failed! PUSH BLOCKED:');
    console.error(error.message);
    throw new Error('Push blocked by ESLint Quality Gate.');
  }

  // Step 3: TypeScript Static Analysis
  console.log('\n[3/9] Running TypeScript static typechecking...');
  try {
    run('npm run typecheck');
    console.log('      [PASS] TypeScript static analysis passed with 0 errors.');
  } catch (err: unknown) {
    const error = err as Error;
    console.error('      [FAILED] TypeScript typechecking failed! PUSH BLOCKED:');
    console.error(error.message);
    throw new Error('Push blocked by TypeScript Quality Gate.');
  }

  // Step 4: Monorepo Smoke Tests
  console.log('\n[4/9] Executing monorepo smoke verification...');
  try {
    run('npm run smoke');
    console.log('      [PASS] Monorepo smoke tests passed.');
  } catch (err: unknown) {
    const error = err as Error;
    console.error('      [FAILED] Smoke test failed! PUSH BLOCKED:');
    console.error(error.message);
    throw new Error('Push blocked by Smoke Verification Gate.');
  }

  // Step 5: Pre-Push Deployment Manifests & Build Gate
  console.log('\n[5/9] Verifying deployment manifests, bundles & remote CI state on main...');
  try {
    run('npm run deploy:verify');
    console.log('      [PASS] Deployment verification gate passed.');
  } catch (err: unknown) {
    const error = err as Error;
    console.error('      [FAILED] Deployment verification failed! PUSH BLOCKED:');
    console.error(error.message);
    throw new Error('Push blocked by Pre-Push Deployment Quality Gate.');
  }

  // Step 6: Dual-Developer Git Reconciliation & Merge Gate
  console.log('\n[6/9] Dual-developer git reconciliation & merge gate...');
  try {
    run('npm run git:sync');
    console.log('      [PASS] Local branch synchronized with remote collaborator commits.');
  } catch (err: unknown) {
    const error = err as Error;
    console.error('      [FAILED] Git reconciliation failed! PUSH BLOCKED:');
    console.error(error.message);
    throw new Error('Push blocked by Dual-Developer Reconciliation Gate.');
  }

  // Step 7: Real-Time Changelog Synchronization
  console.log('\n[7/9] Synchronizing real-time changelog to developer portal...');
  try {
    run('npm run changelog:sync');
    console.log('      [PASS] Real-time changelog synchronized.');
  } catch (err: unknown) {
    const error = err as Error;
    console.error('      [FAILED] Changelog sync failed! PUSH BLOCKED:');
    console.error(error.message);
    throw new Error('Push blocked by Changelog Synchronization Gate.');
  }

  // Step 8: Git Commit & Release Checkpoint Tagging
  console.log('\n[8/9] Evaluating working tree & release checkpoint tags...');
  const statusOutput = run('git status --porcelain');
  const currentBranch = run('git rev-parse --abbrev-ref HEAD');

  if (statusOutput.length > 0) {
    console.log('      Uncommitted changes detected in working tree. Staging and committing...');
    run('git add -A');
    const commitMsg =
      messageArg || 'feat(automation): checkpoint & live ci deploy verification [PASSED]';
    run(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`);
    console.log(`      [PASS] Committed changes: "${commitMsg}"`);
  } else {
    console.log('      Working tree is clean. No uncommitted modifications.');
  }

  const nextTag = tagArg || getNextPatchTag();
  console.log(`      Target release checkpoint tag: ${nextTag}`);

  // Check if tag already exists
  let tagExists = false;
  try {
    run(`git rev-parse ${nextTag}`);
    tagExists = true;
  } catch {
    tagExists = false;
  }

  if (!tagExists) {
    const tagAnnotation =
      messageArg ||
      `Release Checkpoint ${nextTag}: Automated deployment and quality gate verified [PASSED]`;
    run(`git tag -a ${nextTag} -m "${tagAnnotation.replace(/"/g, '\\"')}"`);
    console.log(`      [PASS] Created annotated release checkpoint tag: ${nextTag}`);
  } else {
    console.log(`      [INFO] Tag ${nextTag} already exists on commit.`);
  }

  if (dryRun) {
    console.log(
      '\n[DRY RUN] Completed all quality gates, commit, and tagging. Skipping remote push.',
    );
    return;
  }

  // Step 9: Git Remote Push & Post-Push CI Waiter
  console.log('\n[9/9] Configuring push buffer & pushing commits and tags to GitHub...');
  run('git config http.postBuffer 524288000');
  run(`git push origin ${currentBranch} --tags`);
  console.log(`      [PASS] Commits and tags pushed to origin/${currentBranch}.`);

  const headSha = run('git rev-parse HEAD');
  console.log(`      Pushed HEAD Commit SHA: ${headSha}`);

  if (skipCiWait) {
    console.log('\n[INFO] Skipping CI wait as --skip-ci-wait flag was provided.');
    return;
  }

  console.log('\nInitiating automated live monitoring of GitHub Actions CI/CD workflows...');
  await waitForCIStatus({
    commitSha: headSha,
    pollIntervalMs: 10000,
    timeoutMinutes: 15,
    minWorkflows: 8,
  });

  console.log('\n======================================================');
  console.log('[COMPLETED] Push, sync, checkpoint, and CI verification 100% green!');
  console.log('======================================================\n');
}

if (require.main === module) {
  runAutomatedPushCheckpoint()
    .then(() => {
      process.exit(0);
    })
    .catch((err: Error) => {
      console.error(`\n[FAILED] Automated push process aborted: ${err.message}`);
      process.exit(1);
    });
}
