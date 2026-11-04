import { execSync } from 'node:child_process';

export interface WorkflowRun {
  databaseId: number;
  name: string;
  status: string; // 'queued' | 'in_progress' | 'completed' | ...
  conclusion: string | null; // 'success' | 'failure' | 'cancelled' | 'skipped' | null
  url: string;
}

function run(cmd: string): string {
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch (err: unknown) {
    const error = err as { stdout?: string; stderr?: string; message: string };
    throw new Error(error.stderr || error.stdout || error.message);
  }
}

export async function waitForCIStatus(options?: {
  commitSha?: string;
  timeoutMinutes?: number;
  pollIntervalMs?: number;
  minWorkflows?: number;
}): Promise<boolean> {
  const commitSha = options?.commitSha || run('git rev-parse HEAD');
  const timeoutMs = (options?.timeoutMinutes || 15) * 60 * 1000;
  const pollIntervalMs = options?.pollIntervalMs || 10000;
  const minWorkflows = options?.minWorkflows || 1;

  console.log('======================================================');
  console.log('SNP-SMS GitHub Actions CI/CD Live Verification Gate');
  console.log('======================================================');
  console.log(`Target Commit SHA: ${commitSha}`);
  console.log(`Poll Interval    : ${pollIntervalMs / 1000}s`);
  console.log(`Timeout          : ${(timeoutMs / 60000).toFixed(0)} minutes`);
  console.log('======================================================\n');

  const startTime = Date.now();
  let attempts = 0;

  while (Date.now() - startTime < timeoutMs) {
    attempts++;
    let runs: WorkflowRun[] = [];

    try {
      const output = run(
        `gh run list --commit ${commitSha} --json databaseId,name,status,conclusion,url`,
      );
      runs = JSON.parse(output) as WorkflowRun[];
    } catch (e: unknown) {
      const error = e as Error;
      console.warn(`[WARN] Failed to query gh run list: ${error.message.split('\n')[0]}`);
    }

    if (runs.length < minWorkflows) {
      const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
      console.log(
        `[${elapsedSec}s] Waiting for GitHub Actions workflows to initialize on commit (${runs.length}/${minWorkflows} registered)...`,
      );
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
      continue;
    }

    // Filter unique latest runs per workflow name
    const latestRunsByName = new Map<string, WorkflowRun>();
    for (const r of runs) {
      if (!latestRunsByName.has(r.name)) {
        latestRunsByName.set(r.name, r);
      }
    }

    const uniqueRuns = Array.from(latestRunsByName.values());
    const inProgress = uniqueRuns.filter((r) => r.status !== 'completed');
    const failed = uniqueRuns.filter((r) => r.status === 'completed' && r.conclusion === 'failure');
    const passed = uniqueRuns.filter(
      (r) =>
        r.status === 'completed' &&
        (r.conclusion === 'success' || r.conclusion === 'skipped' || r.conclusion === 'neutral'),
    );

    const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
    console.log(
      `[${elapsedSec}s] CI Progress: ${passed.length} Passed, ${inProgress.length} In-Progress, ${failed.length} Failed (Total: ${uniqueRuns.length})`,
    );

    // If any workflow has failed, output failure diagnostic immediately
    if (failed.length > 0) {
      console.error('\n======================================================');
      console.error('[FAILED] CI FAILURE DETECTED: The following workflows failed:');
      console.error('======================================================');
      for (const f of failed) {
        console.error(`- Workflow: "${f.name}" (ID: ${f.databaseId})`);
        console.error(`  URL: ${f.url}`);
        try {
          console.error(`  Fetching failing step logs for run ${f.databaseId}...`);
          const logOutput = run(`gh run view ${f.databaseId} --log-failed`);
          const trimmedLogs = logOutput.split('\n').slice(-30).join('\n');
          console.error(
            `\n--- Log snippet (last 30 lines) ---\n${trimmedLogs}\n-----------------------------------\n`,
          );
        } catch {
          console.error('  (Unable to retrieve detailed failed logs via gh CLI)');
        }
      }
      throw new Error(
        `Push verification failed: ${failed.length} workflow(s) failed on GitHub Actions.`,
      );
    }

    // If all runs are completed and none failed, we are 100% green!
    if (inProgress.length === 0 && uniqueRuns.length >= minWorkflows) {
      console.log('\n======================================================');
      console.log('[PASSED] 100% GREEN! All GitHub Actions CI/CD workflows passed!');
      console.log('======================================================');
      console.log('\nVerified Workflows:');
      for (const p of passed) {
        console.log(`  [PASS] ${p.name.padEnd(45)} | URL: ${p.url}`);
      }
      console.log('\n======================================================\n');
      return true;
    }

    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
  }

  throw new Error(
    `Timeout reached (${timeoutMs / 60000}m) while waiting for GitHub Actions to complete.`,
  );
}

if (require.main === module) {
  const targetSha = process.argv[2];
  waitForCIStatus({ commitSha: targetSha })
    .then(() => {
      process.exit(0);
    })
    .catch((err: Error) => {
      console.error(`\n[FAILED] CI status verification exited with error: ${err.message}`);
      process.exit(1);
    });
}
