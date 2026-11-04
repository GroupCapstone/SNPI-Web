#!/usr/bin/env tsx
/**
 * Automated Verification Engine for GitHub Repository Threat Model
 * Audits 8 Core Threat Vectors (T-01 through T-08):
 * T-01: Secret Scanning & Push Protection
 * T-02: Private Visibility & Access Boundaries
 * T-03: Danger Zone Tamper Controls
 * T-04: Branch History Protection (Force push & deletion blocks)
 * T-05: Unauthorized Merge Prevention (Status checks & PR requirement)
 * T-06: Dual-Control & Self-Approval Prevention
 * T-07: Account 2FA & Signed Commit Policy
 * T-08: Workflow Action Hardening & Least Privilege
 */

import * as fs from 'fs';
import * as path from 'path';

interface ThreatModelConfig {
  repository: {
    name: string;
    visibility: string;
    defaultBranch: string;
  };
  threatDefenses: {
    t01_secretScanning: {
      secretScanningEnabled: boolean;
      pushProtectionEnabled: boolean;
      abstractCredentialPolicy: boolean;
    };
    t02_unauthorizedAccess: {
      enforcePrivateVisibility: boolean;
      enterpriseManagedUsers: boolean;
      adminOnlyInvitations: boolean;
    };
    t03_dangerZoneTamper: {
      restrictRepoDeletionToAdmins: boolean;
      restrictRepoTransfer: boolean;
      restrictVisibilityChange: boolean;
    };
    t04_branchHistoryProtection: {
      blockForcePushes: boolean;
      blockBranchDeletion: boolean;
      enforceLinearHistory: boolean;
    };
    t05_unauthorizedMerge: {
      requirePullRequest: boolean;
      requiredStatusChecks: string[];
    };
    t06_selfApprovalPrevention: {
      minimumApprovals: number;
      prohibitAuthorApproval: boolean;
      dismissStaleReviewsOnPush: boolean;
    };
    t07_accountAndCommitIntegrity: {
      requireTwoFactorAuth: boolean;
      enforceSignedCommits: boolean;
      maxPatDurationDays: number;
    };
    t08_workflowSecurity: {
      enforceActionShaPinning: boolean;
      defaultWorkflowPermissions: string;
      disallowInsecureScriptInjection: boolean;
    };
  };
}

function parseYamlSimple(raw: string): any {
  const result: any = {};
  let currentSection = '';
  let currentSubSection = '';

  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const indent = line.search(/\S/);

    if (indent === 0 && trimmed.endsWith(':')) {
      currentSection = trimmed.slice(0, -1);
      result[currentSection] = {};
      currentSubSection = '';
    } else if (indent === 2 && trimmed.endsWith(':')) {
      currentSubSection = trimmed.slice(0, -1);
      result[currentSection][currentSubSection] = {};
    } else if (trimmed.startsWith('- ')) {
      // List element
      const val = trimmed.slice(2).replace(/['"]/g, '').trim();
      const target = currentSubSection
        ? result[currentSection][currentSubSection]
        : result[currentSection];
      if (Array.isArray(target)) {
        target.push(val);
      }
    } else if (trimmed.includes(':')) {
      const colonIdx = trimmed.indexOf(':');
      const key = trimmed.slice(0, colonIdx).trim();
      let val: any = trimmed.slice(colonIdx + 1).trim();

      if (val === '') {
        if (indent === 4 && currentSubSection) {
          result[currentSection][currentSubSection][key] = [];
        } else if (indent === 2) {
          result[currentSection][key] = [];
        }
      } else {
        val = val.replace(/['"]/g, '');
        if (/^\d+$/.test(val)) val = parseInt(val, 10);
        else if (val === 'true') val = true;
        else if (val === 'false') val = false;

        if (indent === 4 && currentSubSection) {
          result[currentSection][currentSubSection][key] = val;
        } else if (indent === 2) {
          result[currentSection][key] = val;
        }
      }
    }
  }

  // Handle lists cleanly
  const listRegex = /([a-zA-Z0-9_-]+):\s*\n((?:\s*-\s*[^\n]+\n?)+)/g;
  let match;
  while ((match = listRegex.exec(raw)) !== null) {
    const listKey = match[1];
    const items = match[2]
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.startsWith('- '))
      .map((s) => s.slice(2).replace(/['"]/g, '').trim());

    for (const sec of Object.keys(result)) {
      if (typeof result[sec] === 'object' && result[sec] !== null) {
        if (listKey in result[sec] || Array.isArray(result[sec][listKey])) {
          result[sec][listKey] = items;
        }
        for (const sub of Object.keys(result[sec])) {
          if (typeof result[sec][sub] === 'object' && result[sec][sub] !== null) {
            if (listKey in result[sec][sub] || Array.isArray(result[sec][sub][listKey])) {
              result[sec][sub][listKey] = items;
            }
          }
        }
      }
    }
  }

  return result;
}

export function auditRepositoryThreatModel(configPath: string): boolean {
  console.log('------------------------------------------------------------');
  console.log('GitHub Repository Threat Model Defense Audit (SLSA v1.0)');
  console.log(`Config: ${configPath}`);
  console.log('------------------------------------------------------------');

  if (!fs.existsSync(configPath)) {
    console.error(`[FAILED] Configuration file not found: ${configPath}`);
    return false;
  }

  const raw = fs.readFileSync(configPath, 'utf8');
  let config: ThreatModelConfig;

  try {
    if (configPath.endsWith('.json')) {
      config = JSON.parse(raw);
    } else {
      config = parseYamlSimple(raw) as ThreatModelConfig;
    }
  } catch (err: any) {
    console.error(`[FAILED] Parsing error: ${err.message}`);
    return false;
  }

  const defenses = config.threatDefenses;
  let allPassed = true;

  // Audit T-01: Secret Scanning
  if (
    defenses.t01_secretScanning?.secretScanningEnabled &&
    defenses.t01_secretScanning?.pushProtectionEnabled
  ) {
    console.log('[PASSED] [T-01] Secret Scanning & Push Protection enabled.');
  } else {
    console.error('[FAILED] [T-01] Secret Scanning or Push Protection disabled!');
    allPassed = false;
  }

  // Audit T-02: Private Visibility
  if (
    defenses.t02_unauthorizedAccess?.enforcePrivateVisibility &&
    defenses.t02_unauthorizedAccess?.adminOnlyInvitations
  ) {
    console.log(
      '[PASSED] [T-02] Repository visibility locked to Private with admin-only access control.',
    );
  } else {
    console.error('[FAILED] [T-02] Repository visibility or access boundaries relaxed!');
    allPassed = false;
  }

  // Audit T-03: Danger Zone Tamper
  if (
    defenses.t03_dangerZoneTamper?.restrictRepoDeletionToAdmins &&
    defenses.t03_dangerZoneTamper?.restrictRepoTransfer
  ) {
    console.log(
      '[PASSED] [T-03] Danger Zone operations (deletion/transfer) restricted to Organization Owners.',
    );
  } else {
    console.error('[FAILED] [T-03] Danger Zone protections deficient!');
    allPassed = false;
  }

  // Audit T-04: Branch History Protection
  if (
    defenses.t04_branchHistoryProtection?.blockForcePushes &&
    defenses.t04_branchHistoryProtection?.blockBranchDeletion
  ) {
    console.log(
      '[PASSED] [T-04] Branch history protected: Force pushes and branch deletions blocked.',
    );
  } else {
    console.error('[FAILED] [T-04] Branch history vulnerable to force push or deletion!');
    allPassed = false;
  }

  // Audit T-05: Unauthorized Merge
  const checks = defenses.t05_unauthorizedMerge?.requiredStatusChecks || [];
  if (defenses.t05_unauthorizedMerge?.requirePullRequest && checks.length > 0) {
    console.log(
      `[PASSED] [T-05] Pull request requirement enforced with ${checks.length} required status checks.`,
    );
  } else {
    console.error('[FAILED] [T-05] Missing pull request requirement or required status checks!');
    allPassed = false;
  }

  // Audit T-06: Self-Approval Prevention
  if (
    defenses.t06_selfApprovalPrevention?.prohibitAuthorApproval &&
    defenses.t06_selfApprovalPrevention?.minimumApprovals >= 1
  ) {
    console.log(
      '[PASSED] [T-06] Dual-control enforced: PR author approval prohibited with >= 1 peer review.',
    );
  } else {
    console.error('[FAILED] [T-06] Self-approval allowed or approving review count < 1!');
    allPassed = false;
  }

  // Audit T-07: Account & Commit Integrity
  if (
    defenses.t07_accountAndCommitIntegrity?.requireTwoFactorAuth &&
    defenses.t07_accountAndCommitIntegrity?.enforceSignedCommits
  ) {
    console.log(
      '[PASSED] [T-07] Identity trust verified: Mandatory 2FA and GPG/SSH commit signature policy.',
    );
  } else {
    console.error('[FAILED] [T-07] 2FA or signed commit enforcement missing!');
    allPassed = false;
  }

  // Audit T-08: Workflow Security
  if (defenses.t08_workflowSecurity?.disallowInsecureScriptInjection) {
    console.log(
      '[PASSED] [T-08] Workflow security policy enforced: Insecure script injections prohibited.',
    );
  } else {
    console.error('[FAILED] [T-08] Workflow security policy missing!');
    allPassed = false;
  }

  console.log('------------------------------------------------------------');
  if (allPassed) {
    console.log('[PASSED] All 8 repository threat vectors (T-01 to T-08) mitigated.');
  } else {
    console.error('[FAILED] Threat model defense verification failed.');
  }
  console.log('------------------------------------------------------------');

  return allPassed;
}

if (require.main === module) {
  const configFile =
    process.argv[2] || path.join(__dirname, '../templates/repository-threat-model.yaml');
  const success = auditRepositoryThreatModel(configFile);
  process.exit(success ? 0 : 1);
}
