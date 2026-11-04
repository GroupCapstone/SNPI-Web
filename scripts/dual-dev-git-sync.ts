import { execSync } from 'node:child_process';

function run(cmd: string): string {
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch (err: unknown) {
    const error = err as { stdout?: string; stderr?: string; message: string };
    throw new Error(error.stderr || error.stdout || error.message);
  }
}

export function syncDualDevGit(): void {
  console.log('======================================================');
  console.log('SNP-SMS Dual-Developer Git Reconciliation & Merge Gate');
  console.log('======================================================\n');

  // 1. Get current branch
  const currentBranch = run('git rev-parse --abbrev-ref HEAD');
  console.log(`[1/4] Current active branch: "${currentBranch}"`);

  // 2. Fetch remote changes
  console.log('[2/4] Fetching latest remote commits from origin...');
  run('git fetch origin');

  // 3. Check behind / ahead counts
  let counts = '0\t0';
  try {
    counts = run(`git rev-list --left-right --count HEAD...origin/${currentBranch}`);
  } catch {
    console.log(`      [INFO] Remote branch origin/${currentBranch} does not exist yet.`);
    return;
  }

  const [aheadStr, behindStr] = counts.split(/\s+/);
  const ahead = parseInt(aheadStr || '0', 10);
  const behind = parseInt(behindStr || '0', 10);

  console.log(
    `[3/4] Branch status vs origin/${currentBranch}: Ahead by ${ahead}, Behind by ${behind}`,
  );

  // 4. If behind, reconcile and merge remote code from the other developer
  if (behind > 0) {
    console.log(`      [SYNC] Remote has ${behind} commit(s) from co-developer. Merging code...`);
    try {
      run(
        `git merge origin/${currentBranch} --no-edit -m "merge(sync): reconcile remote changes from co-developer [PASSED]"`,
      );
      console.log('      [PASS] Remote changes from co-developer cleanly merged.');
    } catch (err: unknown) {
      console.error('      [CONFLICT] Merge conflict detected while reconciling remote code.');
      console.error(
        '      Please resolve conflicting files manually, run verification, and commit.',
      );
      throw err;
    }
  } else {
    console.log('      [PASS] Local branch is fully up to date with remote origin.');
  }

  console.log('\n[4/4] Dual-developer git reconciliation completed [PASSED].\n');
}

if (require.main === module) {
  try {
    syncDualDevGit();
  } catch (e: unknown) {
    const error = e as Error;
    console.error(`[FAILED] Git sync error: ${error.message}`);
    process.exit(1);
  }
}
