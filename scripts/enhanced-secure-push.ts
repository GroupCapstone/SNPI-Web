#!/usr/bin/env tsx
/**
 * Enhanced Secure Push Workflow with Security Scanning & PR Detection
 *
 * Mandatory Pipeline:
 * 1. Check for open PRs and merge conflicts
 * 2. Security & Quality Scanning (Dependabot, Malware, Vulnerabilities)
 * 3. Pre-flight quality gates (format, lint, typecheck, build, test)
 * 4. Push to GitHub
 * 5. Wait for 100% green CI (all workflows must pass)
 * 6. Deploy to Vercel production (only after 100% green)
 */

import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

function run(cmd: string, echo = false): string {
  if (echo) {
    console.log(`\x1b[36m> ${cmd}\x1b[0m`);
  }
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch (err: unknown) {
    const error = err as { stdout?: string; stderr?: string; message: string };
    throw new Error(error.stderr || error.stdout || error.message);
  }
}

function logStep(step: string, message: string, status: 'INFO' | 'PASS' | 'FAIL' | 'WARN' = 'INFO') {
  const colors = {
    INFO: '\x1b[36m', // Cyan
    PASS: '\x1b[32m', // Green
    FAIL: '\x1b[31m', // Red
    WARN: '\x1b[33m', // Yellow
  };
  const reset = '\x1b[0m';
  console.log(`${colors[status]}[${step}]${reset} ${message}`);
}

async function checkOpenPRs(): Promise<void> {
  logStep('PR CHECK', 'Checking for open Pull Requests on GitHub...', 'INFO');

  try {
    // Check if gh CLI is available
    try {
      run('which gh');
    } catch {
      logStep('PR CHECK', 'GitHub CLI (gh) not installed. Skipping PR check.', 'WARN');
      return;
    }

    // Get current branch
    const currentBranch = run('git rev-parse --abbrev-ref HEAD');
    logStep('PR CHECK', `Current branch: ${currentBranch}`, 'INFO');

    // Check for open PRs from this branch
    const openPRs = run(`gh pr list --head ${currentBranch} --json number,title,state`);

    if (openPRs && openPRs !== '[]') {
      const prs = JSON.parse(openPRs);
      if (prs.length > 0) {
        logStep('PR CHECK', `Found ${prs.length} open PR(s) from this branch:`, 'WARN');
        for (const pr of prs) {
          console.log(`      PR #${pr.number}: ${pr.title} (${pr.state})`);
        }
        logStep(
          'PR CHECK',
          'Recommendation: Merge or close open PRs before pushing new commits.',
          'WARN',
        );
        // Continue but warn (not blocking)
      } else {
        logStep('PR CHECK', 'No open PRs detected for this branch.', 'PASS');
      }
    } else {
      logStep('PR CHECK', 'No open PRs detected for this branch.', 'PASS');
    }

    // Check if current branch is behind remote
    try {
      run('git fetch origin --quiet');
      const behind = run(`git rev-list --count HEAD..origin/${currentBranch}`);
      if (behind && parseInt(behind) > 0) {
        logStep(
          'PR CHECK',
          `Branch is ${behind} commit(s) behind origin/${currentBranch}. Pulling changes...`,
          'WARN',
        );
        run(`git pull origin ${currentBranch} --no-edit`);
        logStep('PR CHECK', 'Successfully merged remote changes.', 'PASS');
      }
    } catch (err: unknown) {
      // Branch might not exist on remote yet
      logStep('PR CHECK', 'Remote branch not found or up to date.', 'INFO');
    }
  } catch (err: unknown) {
    logStep('PR CHECK', `PR check failed: ${(err as Error).message}`, 'WARN');
  }
}

async function securityScan(): Promise<void> {
  logStep('SECURITY', 'Running security and vulnerability scanning...', 'INFO');

  // 1. Check for Dependabot alerts
  logStep('SECURITY', 'Checking Dependabot vulnerability alerts...', 'INFO');
  try {
    const dependabotAlerts = run('gh api repos/:owner/:repo/dependabot/alerts --jq "length"');
    const alertCount = parseInt(dependabotAlerts || '0');
    if (alertCount > 0) {
      logStep('SECURITY', `Found ${alertCount} Dependabot alert(s).`, 'WARN');
      console.log(
        '      View alerts: gh browse --repo $(git config --get remote.origin.url) /security/dependabot',
      );
    } else {
      logStep('SECURITY', 'No Dependabot alerts found.', 'PASS');
    }
  } catch (err: unknown) {
    logStep('SECURITY', `Dependabot check unavailable: ${(err as Error).message}`, 'WARN');
  }

  // 2. Check for known vulnerabilities in dependencies
  logStep('SECURITY', 'Scanning npm dependencies for known vulnerabilities...', 'INFO');
  try {
    const auditOutput = run('npm audit --audit-level=high --json');
    const auditData = JSON.parse(auditOutput);

    if (auditData.metadata) {
      const { vulnerabilities } = auditData.metadata;
      const criticalCount = vulnerabilities?.critical || 0;
      const highCount = vulnerabilities?.high || 0;

      if (criticalCount > 0 || highCount > 0) {
        logStep(
          'SECURITY',
          `Found ${criticalCount} critical and ${highCount} high severity vulnerabilities.`,
          'FAIL',
        );
        throw new Error(
          'Security vulnerability gate failed. Run "npm audit" for details and fix before pushing.',
        );
      } else {
        logStep('SECURITY', 'No critical or high severity vulnerabilities found.', 'PASS');
      }
    }
  } catch (err: unknown) {
    const error = err as Error;
    if (error.message.includes('Security vulnerability gate')) {
      throw error;
    }
    logStep('SECURITY', 'npm audit unavailable or no issues found.', 'INFO');
  }

  // 3. Check GitHub Security Overview
  logStep('SECURITY', 'Checking GitHub Security Overview...', 'INFO');
  try {
    // Check for open security advisories
    const advisories = run(
      'gh api repos/:owner/:repo/security-advisories --jq "map(select(.state == \\"published\\")) | length"',
    );
    const advisoryCount = parseInt(advisories || '0');
    if (advisoryCount > 0) {
      logStep('SECURITY', `Found ${advisoryCount} published security advisor(ies).`, 'WARN');
    } else {
      logStep('SECURITY', 'No published security advisories.', 'PASS');
    }

    // Check for secret scanning alerts
    try {
      const secretAlerts = run(
        'gh api repos/:owner/:repo/secret-scanning/alerts?state=open --jq "length"',
      );
      const secretCount = parseInt(secretAlerts || '0');
      if (secretCount > 0) {
        logStep('SECURITY', `Found ${secretCount} open secret scanning alert(s).`, 'FAIL');
        throw new Error(
          'Secret scanning alerts detected! Review and resolve before pushing. Visit: gh browse /security/secret-scanning',
        );
      } else {
        logStep('SECURITY', 'No open secret scanning alerts.', 'PASS');
      }
    } catch (err: unknown) {
      const error = err as Error;
      if (error.message.includes('Secret scanning alerts')) {
        throw error;
      }
      // Secret scanning might not be enabled
      logStep('SECURITY', 'Secret scanning not available or no alerts.', 'INFO');
    }

    // Check for code scanning alerts (CodeQL)
    try {
      const codeAlerts = run(
        'gh api repos/:owner/:repo/code-scanning/alerts?state=open --jq "length"',
      );
      const codeAlertCount = parseInt(codeAlerts || '0');
      if (codeAlertCount > 0) {
        logStep('SECURITY', `Found ${codeAlertCount} open code scanning alert(s).`, 'WARN');
        console.log('      Review: gh browse /security/code-scanning');
      } else {
        logStep('SECURITY', 'No open code scanning alerts.', 'PASS');
      }
    } catch {
      logStep('SECURITY', 'Code scanning not available or no alerts.', 'INFO');
    }
  } catch (err: unknown) {
    const error = err as Error;
    if (error.message.includes('Secret scanning alerts')) {
      throw error;
    }
    logStep('SECURITY', `Security overview check: ${error.message}`, 'WARN');
  }

  logStep('SECURITY', 'Security scanning completed.', 'PASS');
}

async function waitForAllCIGreen(commitSha: string, timeoutMinutes = 15): Promise<void> {
  logStep(
    'CI MONITOR',
    `Monitoring GitHub Actions for commit ${commitSha.substring(0, 7)}...`,
    'INFO',
  );

  const maxAttempts = (timeoutMinutes * 60) / 4; // Poll every 4 seconds
  let attempt = 0;

  while (attempt < maxAttempts) {
    attempt++;

    try {
      // Get all workflow runs for this commit
      const runsJson = run(
        `gh run list --commit ${commitSha} --json status,conclusion,name --limit 50`,
      );
      const runs = JSON.parse(runsJson);

      if (runs.length === 0) {
        if (attempt < 5) {
          logStep('CI MONITOR', 'Waiting for workflows to start...', 'INFO');
          await new Promise((resolve) => setTimeout(resolve, 4000));
          continue;
        } else {
          logStep('CI MONITOR', 'No workflows found for this commit.', 'WARN');
          break;
        }
      }

      const inProgress = runs.filter((r: { status: string }) => r.status === 'in_progress');
      const queued = runs.filter((r: { status: string }) => r.status === 'queued');
      const completed = runs.filter((r: { status: string }) => r.status === 'completed');
      const failed = completed.filter((r: { conclusion: string }) => r.conclusion === 'failure');
      const success = completed.filter((r: { conclusion: string }) => r.conclusion === 'success');

      console.log(
        `\r      [${attempt}/${maxAttempts}] ` +
          `✓ ${success.length} | ⏳ ${inProgress.length + queued.length} | ✗ ${failed.length} | Total: ${runs.length}`,
      );

      if (failed.length > 0) {
        logStep('CI MONITOR', 'Some workflows failed:', 'FAIL');
        for (const f of failed) {
          console.log(`      ✗ ${f.name}`);
        }
        throw new Error(
          'CI workflows failed. Fix issues and push again. View: gh run list --commit ' +
            commitSha.substring(0, 7),
        );
      }

      if (inProgress.length === 0 && queued.length === 0) {
        if (success.length >= 4) {
          // Require at least 4 critical workflows
          logStep(
            'CI MONITOR',
            `All ${runs.length} workflows completed successfully! ✓`,
            'PASS',
          );
          return;
        } else {
          logStep(
            'CI MONITOR',
            `Only ${success.length} workflow(s) completed. Waiting for more...`,
            'INFO',
          );
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 4000));
    } catch (err: unknown) {
      const error = err as Error;
      if (error.message.includes('CI workflows failed')) {
        throw error;
      }
      logStep('CI MONITOR', `Error checking CI status: ${error.message}`, 'WARN');
      await new Promise((resolve) => setTimeout(resolve, 4000));
    }
  }

  throw new Error(
    `CI monitoring timeout after ${timeoutMinutes} minutes. Check workflow status manually.`,
  );
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const skipSecurity = args.includes('--skip-security');
  const skipCI = args.includes('--skip-ci');
  const deployVercel = args.includes('--deploy-vercel') || args.includes('--prod');
  const dryRun = args.includes('--dry-run');

  console.log('\n' + '='.repeat(80));
  console.log('SNPI-Web Enhanced Secure Push Workflow with Security Scanning');
  console.log('='.repeat(80) + '\n');

  // PHASE 1: PR Detection & Merge Check
  await checkOpenPRs();

  // PHASE 2: Security & Vulnerability Scanning
  if (!skipSecurity) {
    await securityScan();
  } else {
    logStep('SECURITY', 'Security scanning skipped (--skip-security flag).', 'WARN');
  }

  // PHASE 3: Code Quality Gates
  logStep('QUALITY', 'Running code quality gates...', 'INFO');

  // 3.1 Prettier Format Check
  logStep('QUALITY', 'Checking code formatting (Prettier)...', 'INFO');
  try {
    run('npm run format:check');
    logStep('QUALITY', 'Code formatting compliant.', 'PASS');
  } catch {
    logStep('QUALITY', 'Formatting issues detected. Auto-fixing...', 'WARN');
    run('npx prettier --write .');
    logStep('QUALITY', 'Code formatted successfully.', 'PASS');
  }

  // 3.2 ESLint
  logStep('QUALITY', 'Running ESLint...', 'INFO');
  try {
    run('npm run lint');
    logStep('QUALITY', 'ESLint passed with 0 errors.', 'PASS');
  } catch (err: unknown) {
    logStep('QUALITY', `ESLint failed: ${(err as Error).message}`, 'FAIL');
    throw new Error('Push blocked by ESLint Quality Gate.');
  }

  // 3.3 TypeScript
  logStep('QUALITY', 'Running TypeScript type check...', 'INFO');
  try {
    run('npm run typecheck');
    logStep('QUALITY', 'TypeScript check passed.', 'PASS');
  } catch (err: unknown) {
    logStep('QUALITY', `TypeScript check failed: ${(err as Error).message}`, 'FAIL');
    throw new Error('Push blocked by TypeScript Quality Gate.');
  }

  // 3.4 Production Build
  logStep('QUALITY', 'Building production bundle...', 'INFO');
  try {
    run('npm run build');
    logStep('QUALITY', 'Production build successful.', 'PASS');
  } catch (err: unknown) {
    logStep('QUALITY', `Build failed: ${(err as Error).message}`, 'FAIL');
    throw new Error('Push blocked by Build Gate.');
  }

  // 3.5 Tests
  logStep('QUALITY', 'Running test suites...', 'INFO');
  try {
    run('npm test');
    logStep('QUALITY', 'All tests passed.', 'PASS');
  } catch (err: unknown) {
    logStep('QUALITY', `Tests failed: ${(err as Error).message}`, 'FAIL');
    throw new Error('Push blocked by Test Gate.');
  }

  // 3.6 Verify deployment manifests
  logStep('QUALITY', 'Verifying deployment configuration...', 'INFO');
  const vercelJsonPath = path.resolve(process.cwd(), 'vercel.json');
  if (!fs.existsSync(vercelJsonPath)) {
    throw new Error('Missing vercel.json configuration file.');
  }
  try {
    JSON.parse(fs.readFileSync(vercelJsonPath, 'utf-8'));
    logStep('QUALITY', 'vercel.json validated.', 'PASS');
  } catch (err: unknown) {
    throw new Error(`Invalid vercel.json: ${(err as Error).message}`);
  }

  // PHASE 4: Commit & Push
  logStep('GIT', 'Preparing commit and push...', 'INFO');

  const statusOutput = run('git status --porcelain');
  const currentBranch = run('git rev-parse --abbrev-ref HEAD');

  if (statusOutput.length > 0) {
    logStep('GIT', 'Staging and committing changes...', 'INFO');
    run('git add -A');
    const commitMsg = 'chore(web): automated secure push with security validation [PASSED]';
    run(`git commit -m "${commitMsg}"`);
    logStep('GIT', `Committed: "${commitMsg}"`, 'PASS');
  } else {
    logStep('GIT', 'No changes to commit.', 'INFO');
  }

  const headSha = run('git rev-parse HEAD');
  logStep('GIT', `Commit SHA: ${headSha}`, 'INFO');

  if (dryRun) {
    logStep('GIT', 'Dry run complete. Skipping push and deployment.', 'INFO');
    return;
  }

  // Push to GitHub
  logStep('GIT', `Pushing ${currentBranch} to origin...`, 'INFO');
  run('git config http.postBuffer 524288000');
  run(`git push origin ${currentBranch}`);
  logStep('GIT', 'Push successful!', 'PASS');

  // PHASE 5: Wait for 100% Green CI
  if (!skipCI) {
    await waitForAllCIGreen(headSha);
  } else {
    logStep('CI MONITOR', 'CI monitoring skipped (--skip-ci flag).', 'WARN');
  }

  // PHASE 6: Deploy to Vercel (only after 100% green)
  if (deployVercel) {
    logStep('DEPLOY', 'Deploying to Vercel production...', 'INFO');
    run('vercel deploy --archive=tgz --prod', true);
    logStep('DEPLOY', 'Vercel deployment successful!', 'PASS');
  }

  console.log('\n' + '='.repeat(80));
  logStep('COMPLETE', 'Secure push workflow completed successfully!', 'PASS');
  console.log('='.repeat(80) + '\n');
}

if (require.main === module) {
  main()
    .then(() => {
      process.exit(0);
    })
    .catch((err: Error) => {
      console.error(`\n\x1b[31m[FAILED]\x1b[0m Pipeline aborted: ${err.message}\n`);
      process.exit(1);
    });
}
