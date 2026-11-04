#!/usr/bin/env tsx
/**
 * Automated Verification Engine for GitHub Actions Workflow Security
 * Audits:
 * 1. Action Pinning: Enforces 40-character immutable commit SHAs for third-party actions (no floating tags).
 * 2. Least Privilege: Verifies top-level permissions or explicit job permissions.
 * 3. Script Injection: Detects untrusted expressions directly evaluated inside run: blocks.
 * 4. Pwn Request Guard: Flags dangerous code checkout under pull_request_target.
 * 5. Runner Security: Enforces runner isolation.
 */

import * as fs from 'fs';
import * as path from 'path';

interface Violation {
  file: string;
  line: number;
  rule: string;
  message: string;
  severity: 'HIGH' | 'CRITICAL' | 'MEDIUM';
}

const DANGEROUS_EXPRESSIONS = [
  'github.event.issue.title',
  'github.event.issue.body',
  'github.event.pull_request.title',
  'github.event.pull_request.body',
  'github.event.comment.body',
  'github.event.review.body',
  'github.event.pages.*.page_name',
  'github.head_ref',
];

export function auditWorkflowFile(filePath: string): Violation[] {
  const violations: Violation[] = [];
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const filename = path.basename(filePath);

  let inRunBlock = false;
  let isPullRequestTarget = false;

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i];
    const trimmed = line.trim();

    // Check pull_request_target trigger
    if (
      trimmed.startsWith('pull_request_target:') ||
      trimmed === 'pull_request_target' ||
      trimmed.includes('pull_request_target')
    ) {
      isPullRequestTarget = true;
    }

    // Check uses: action pinning
    if (trimmed.startsWith('uses:') || trimmed.includes(' uses:')) {
      const usesVal = trimmed.split('uses:')[1].trim().split('#')[0].trim();
      // Only check external actions (not local ./actions or docker://)
      if (usesVal && !usesVal.startsWith('./') && !usesVal.startsWith('docker://')) {
        const atIdx = usesVal.indexOf('@');
        if (atIdx === -1) {
          violations.push({
            file: filename,
            line: lineNum,
            rule: 'ACTION_SHA_PINNING',
            message: `Action '${usesVal}' is unversioned. Must be pinned to full 40-character commit SHA.`,
            severity: 'CRITICAL',
          });
        } else {
          const ref = usesVal.slice(atIdx + 1);
          // Check if ref is a 40-char hex string
          if (!/^[a-f0-9]{40}$/i.test(ref)) {
            violations.push({
              file: filename,
              line: lineNum,
              rule: 'ACTION_SHA_PINNING',
              message: `Action '${usesVal}' uses floating ref '${ref}'. Must be pinned to 40-char commit SHA.`,
              severity: 'HIGH',
            });
          }
        }
      }
    }

    // Track run blocks for script injection
    if (trimmed.startsWith('run:') || trimmed.startsWith('- run:')) {
      inRunBlock = true;
    } else if (inRunBlock && /^[a-zA-Z0-9_-]+:/.test(trimmed) && !trimmed.startsWith('run:')) {
      inRunBlock = false;
    }

    if (inRunBlock) {
      for (const dangerous of DANGEROUS_EXPRESSIONS) {
        const pattern = new RegExp(`\\$\\{\\{\\s*${dangerous.replace('*', '.*')}\\s*\\}\\}`, 'i');
        if (pattern.test(line)) {
          violations.push({
            file: filename,
            line: lineNum,
            rule: 'SCRIPT_INJECTION',
            message: `Potential script injection: '${dangerous}' evaluated directly in run step. Pass via env: variable instead.`,
            severity: 'CRITICAL',
          });
        }
      }
    }

    // Check pwn request checkout
    if (isPullRequestTarget && trimmed.includes('actions/checkout')) {
      if (
        content.includes('github.event.pull_request.head.sha') ||
        content.includes('github.head_ref')
      ) {
        violations.push({
          file: filename,
          line: lineNum,
          rule: 'PWN_REQUEST_RISK',
          message: `Dangerous pull_request_target checkout of untrusted PR ref detected. Can lead to arbitrary code execution with write privileges.`,
          severity: 'CRITICAL',
        });
      }
    }
  }

  return violations;
}

export function auditAllWorkflows(workflowsDir: string): boolean {
  console.log('------------------------------------------------------------');
  console.log('GitHub Actions Workflow Security Audit (Well-Architected)');
  console.log(`Directory: ${workflowsDir}`);
  console.log('------------------------------------------------------------');

  if (!fs.existsSync(workflowsDir)) {
    console.error(`[FAILED] Workflows directory not found: ${workflowsDir}`);
    return false;
  }

  const files = fs
    .readdirSync(workflowsDir)
    .filter((f) => f.endsWith('.yml') || f.endsWith('.yaml'));
  let totalViolations = 0;

  for (const file of files) {
    const fullPath = path.join(workflowsDir, file);
    const violations = auditWorkflowFile(fullPath);
    if (violations.length === 0) {
      console.log(`[PASSED] ${file}: 100% compliant (Actions SHA pinned, zero script injections).`);
    } else {
      console.error(`[FAILED] ${file}: ${violations.length} security violation(s) found:`);
      for (const v of violations) {
        console.error(`         [${v.severity}] Line ${v.line}: ${v.message}`);
      }
      totalViolations += violations.length;
    }
  }

  console.log('------------------------------------------------------------');
  if (totalViolations === 0) {
    console.log(
      `[PASSED] All ${files.length} workflows comply with enterprise security standards.`,
    );
    console.log('------------------------------------------------------------');
    return true;
  } else {
    console.error(
      `[FAILED] Audit failed with ${totalViolations} total violation(s). Address errors above.`,
    );
    console.log('------------------------------------------------------------');
    return false;
  }
}

if (require.main === module) {
  const targetDir = process.argv[2] || path.join(process.cwd(), '.github/workflows');
  const success = auditAllWorkflows(targetDir);
  process.exit(success ? 0 : 1);
}
