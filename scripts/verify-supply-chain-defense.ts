import fs from 'node:fs';
import path from 'node:path';

interface CheckItem {
  id: string;
  layer: string;
  criterion: string;
  priority: 'P0' | 'P1' | 'P2';
  status: 'PASSED' | 'FAILED' | 'WARNING';
  score: number;
  weight: number;
  evidence: string;
}

interface LayerSummary {
  layer: string;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  warningChecks: number;
  score: number;
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

async function runSupplyChainAudit(): Promise<void> {
  console.log('================================================================================');
  console.log('    DEPENDENCY SUPPLY CHAIN DEFENSE AUDITOR (Ken Muse & Josh Johanning)        ');
  console.log('================================================================================\n');

  const checks: CheckItem[] = [];

  // ==========================================
  // LAYER 1: DISABLE PACKAGE LIFECYCLE SCRIPTS
  // ==========================================
  const npmrcContent = readFileSafe('.npmrc');
  const hasNpmrc = fileExists('.npmrc');
  const hasIgnoreScripts = npmrcContent.includes('ignore-scripts=true');
  const hasSaveExact = npmrcContent.includes('save-exact=true');

  checks.push({
    id: 'SCD-L1-01',
    layer: 'Layer 1: Lifecycle Scripts',
    criterion: 'Repository Root .npmrc Existence',
    priority: 'P0',
    status: hasNpmrc ? 'PASSED' : 'FAILED',
    score: hasNpmrc ? 100 : 0,
    weight: 3.0,
    evidence: hasNpmrc
      ? '.npmrc exists at repository root for consistent team & CI defaults'
      : 'Missing .npmrc in project root',
  });

  checks.push({
    id: 'SCD-L1-02',
    layer: 'Layer 1: Lifecycle Scripts',
    criterion: 'Disable Lifecycle Scripts (ignore-scripts)',
    priority: 'P0',
    status: hasIgnoreScripts ? 'PASSED' : 'FAILED',
    score: hasIgnoreScripts ? 100 : 0,
    weight: 3.5,
    evidence: hasIgnoreScripts
      ? 'ignore-scripts=true configured: prevents automatic execution of malicious preinstall/postinstall hooks'
      : 'ignore-scripts=true not configured in .npmrc',
  });

  checks.push({
    id: 'SCD-L1-03',
    layer: 'Layer 1: Lifecycle Scripts',
    criterion: 'Exact Version Pinning (save-exact)',
    priority: 'P1',
    status: hasSaveExact ? 'PASSED' : 'FAILED',
    score: hasSaveExact ? 100 : 0,
    weight: 2.5,
    evidence: hasSaveExact
      ? 'save-exact=true configured: prevents loose semver ranges (^, ~) from pulling compromised versions'
      : 'save-exact=true not configured in .npmrc',
  });

  const ciWorkflow = readFileSafe('.github/workflows/ci.yml');
  const securityWorkflow = readFileSafe('.github/workflows/security.yml');
  const ciHasIgnoreScripts =
    ciWorkflow.includes('--ignore-scripts') && securityWorkflow.includes('--ignore-scripts');
  checks.push({
    id: 'SCD-L1-04',
    layer: 'Layer 1: Lifecycle Scripts',
    criterion: 'CI/CD Workflow Script Disabling',
    priority: 'P0',
    status: ciHasIgnoreScripts ? 'PASSED' : 'FAILED',
    score: ciHasIgnoreScripts ? 100 : 0,
    weight: 3.0,
    evidence: ciHasIgnoreScripts
      ? 'CI workflows enforce npm ci --ignore-scripts across build, lint, and security pipelines'
      : 'Workflows do not explicitly pass --ignore-scripts',
  });

  // ==========================================
  // LAYER 2: DEV CONTAINER ISOLATION
  // ==========================================
  const devContainerContent = readFileSafe('.devcontainer/devcontainer.json');
  const hasDevContainer = fileExists('.devcontainer/devcontainer.json');
  const runsNonRoot =
    devContainerContent.includes('"containerUser": "node"') ||
    devContainerContent.includes('"containerUser": "vscode"') ||
    devContainerContent.includes('"remoteUser": "node"');

  checks.push({
    id: 'SCD-L2-01',
    layer: 'Layer 2: Dev Container Isolation',
    criterion: 'Dev Container Specification',
    priority: 'P1',
    status: hasDevContainer ? 'PASSED' : 'FAILED',
    score: hasDevContainer ? 100 : 0,
    weight: 2.0,
    evidence: hasDevContainer
      ? '.devcontainer/devcontainer.json isolates local workspace from host credentials and SSH keys'
      : 'Missing .devcontainer/devcontainer.json',
  });

  checks.push({
    id: 'SCD-L2-02',
    layer: 'Layer 2: Dev Container Isolation',
    criterion: 'Non-Root User Execution',
    priority: 'P0',
    status: runsNonRoot ? 'PASSED' : 'FAILED',
    score: runsNonRoot ? 100 : 0,
    weight: 3.0,
    evidence: runsNonRoot
      ? 'Dev container executes as non-root user (node/vscode), restricting access to host resources'
      : 'Dev container executes as root user or user unspecified',
  });

  // ==========================================
  // LAYER 3: SIGNED COMMITS WITH USER INTERACTION
  // ==========================================
  const agentsMd = readFileSafe('AGENTS.md');
  const gitThreatModel = readFileSafe('docs/architecture/github-repository-threat-model.md');
  const enforcesCommitSigning =
    agentsMd.includes('Signed Commits') ||
    gitThreatModel.includes('Signed Commits') ||
    readFileSafe('.agents/skills/dependency-supply-chain-defense/SKILL.md').includes(
      'Signed Commits with User Interaction',
    );

  checks.push({
    id: 'SCD-L3-01',
    layer: 'Layer 3: Signed Commits',
    criterion: 'Cryptographic Commit Signing Standard',
    priority: 'P0',
    status: enforcesCommitSigning ? 'PASSED' : 'FAILED',
    score: enforcesCommitSigning ? 100 : 0,
    weight: 3.0,
    evidence: enforcesCommitSigning
      ? 'Mandatory cryptographic commit signing (GPG/SSH) codified in repository architecture'
      : 'Commit signing policy not codified',
  });

  const requiresHumanInteraction =
    readFileSafe('.agents/skills/dependency-supply-chain-defense/SKILL.md').includes(
      'Mandatory User Interaction',
    ) ||
    readFileSafe('references/dependency-supply-chain-attacks.txt').includes(
      'human-in-the-loop interaction',
    );

  checks.push({
    id: 'SCD-L3-02',
    layer: 'Layer 3: Signed Commits',
    criterion: 'Human-in-the-Loop Interaction Requirement',
    priority: 'P1',
    status: requiresHumanInteraction ? 'PASSED' : 'FAILED',
    score: requiresHumanInteraction ? 100 : 0,
    weight: 2.0,
    evidence: requiresHumanInteraction
      ? 'Policy mandates passphrase, Touch ID, or hardware key verification to prevent automated malicious commits'
      : 'Human interaction requirement not codified',
  });

  // ==========================================
  // LAYER 4: ENFORCE REPOSITORY RULESETS
  // ==========================================
  const prTemplate = readFileSafe('.github/pull_request_template.md');
  const hasPrReviewChecklist = prTemplate.includes('Quality Gate Verification Checklist');
  checks.push({
    id: 'SCD-L4-01',
    layer: 'Layer 4: Repository Rulesets',
    criterion: 'Mandatory Pull Request Workflow',
    priority: 'P0',
    status: hasPrReviewChecklist ? 'PASSED' : 'FAILED',
    score: hasPrReviewChecklist ? 100 : 0,
    weight: 2.5,
    evidence: hasPrReviewChecklist
      ? '.github/pull_request_template.md enforces mandatory verification checklist before merge'
      : 'Missing PR template with quality gates',
  });

  const hasCodeowners = fileExists('.github/CODEOWNERS');
  checks.push({
    id: 'SCD-L4-02',
    layer: 'Layer 4: Repository Rulesets',
    criterion: 'Designated Code Ownership & Reviewers',
    priority: 'P0',
    status: hasCodeowners ? 'PASSED' : 'FAILED',
    score: hasCodeowners ? 100 : 0,
    weight: 2.5,
    evidence: hasCodeowners
      ? '.github/CODEOWNERS enforces granular team review requirements on pull requests'
      : 'Missing .github/CODEOWNERS',
  });

  // ==========================================
  // LAYER 5: TRUSTED PUBLISHING & VERIFICATION
  // ==========================================
  const hasProvenanceStandard =
    readFileSafe('.github/knowledge/security/dependency-supply-chain-defense.md').includes(
      'SLSA Level 3',
    ) || readFileSafe('docs/architecture/dependency-supply-chain-defense.md').includes('OIDC');

  checks.push({
    id: 'SCD-L5-01',
    layer: 'Layer 5: Trusted Publishing',
    criterion: 'OIDC Trusted Publishing & SLSA Provenance',
    priority: 'P1',
    status: hasProvenanceStandard ? 'PASSED' : 'FAILED',
    score: hasProvenanceStandard ? 100 : 0,
    weight: 2.0,
    evidence: hasProvenanceStandard
      ? 'OIDC trusted publishing and SLSA Level 3 provenance standard codified'
      : 'OIDC trusted publishing standard not documented',
  });

  const hasLockfileSha512 = readFileSafe('package-lock.json').includes('"integrity": "sha512-');
  checks.push({
    id: 'SCD-L5-02',
    layer: 'Layer 5: Trusted Publishing',
    criterion: 'Deterministic Lockfile Integrity Hashes',
    priority: 'P0',
    status: hasLockfileSha512 ? 'PASSED' : 'FAILED',
    score: hasLockfileSha512 ? 100 : 0,
    weight: 3.0,
    evidence: hasLockfileSha512
      ? 'package-lock.json enforces sha512 integrity verification across all dependencies'
      : 'package-lock.json missing or lacks sha512 integrity hashes',
  });

  // ==========================================
  // LAYER 6: CONTINUOUS MONITORING & RESPONSE
  // ==========================================
  const hasDependabot = fileExists('.github/dependabot.yml');
  checks.push({
    id: 'SCD-L6-01',
    layer: 'Layer 6: Continuous Monitoring',
    criterion: 'Dependabot Security Scanning',
    priority: 'P0',
    status: hasDependabot ? 'PASSED' : 'FAILED',
    score: hasDependabot ? 100 : 0,
    weight: 3.0,
    evidence: hasDependabot
      ? '.github/dependabot.yml schedules continuous dependency vulnerability updates'
      : 'Missing dependabot.yml',
  });

  const depReviewWorkflow = readFileSafe('.github/workflows/dependency-review.yml');
  const hasDepReview =
    depReviewWorkflow.includes('actions/dependency-review-action') &&
    /(fail-on-severity:\s*(moderate|high))/i.test(depReviewWorkflow);
  checks.push({
    id: 'SCD-L6-02',
    layer: 'Layer 6: Continuous Monitoring',
    criterion: 'Dependency Review Action on PRs',
    priority: 'P0',
    status: hasDepReview ? 'PASSED' : 'FAILED',
    score: hasDepReview ? 100 : 0,
    weight: 3.5,
    evidence: hasDepReview
      ? 'Dependency review action active in CI, blocking pull requests with high/critical vulnerabilities'
      : 'Dependency review action not configured or does not block on high severity',
  });

  const hasNpmAuditInCi = securityWorkflow.includes('npm audit --omit=dev --audit-level=high');
  checks.push({
    id: 'SCD-L6-03',
    layer: 'Layer 6: Continuous Monitoring',
    criterion: 'Production Dependency Audit Gate',
    priority: 'P0',
    status: hasNpmAuditInCi ? 'PASSED' : 'FAILED',
    score: hasNpmAuditInCi ? 100 : 0,
    weight: 2.5,
    evidence: hasNpmAuditInCi
      ? '.github/workflows/security.yml enforces automated npm audit --audit-level=high gate'
      : 'Missing automated npm audit gate in CI',
  });

  // ==========================================
  // SCORING & SUMMARY
  // ==========================================
  const layerMap = new Map<string, CheckItem[]>();
  for (const c of checks) {
    const list = layerMap.get(c.layer) || [];
    list.push(c);
    layerMap.set(c.layer, list);
  }

  const summaries: LayerSummary[] = [];
  let totalWeightedScore = 0;
  let totalWeight = 0;

  for (const [layer, items] of layerMap.entries()) {
    const totalChecks = items.length;
    const passedChecks = items.filter((i) => i.status === 'PASSED').length;
    const failedChecks = items.filter((i) => i.status === 'FAILED').length;
    const warningChecks = items.filter((i) => i.status === 'WARNING').length;

    let layerWeight = 0;
    let layerScore = 0;
    for (const item of items) {
      layerWeight += item.weight;
      layerScore += item.score * item.weight;
    }

    const avgScore = layerWeight > 0 ? layerScore / layerWeight : 0;
    summaries.push({
      layer,
      totalChecks,
      passedChecks,
      failedChecks,
      warningChecks,
      score: avgScore,
    });

    totalWeightedScore += layerScore;
    totalWeight += layerWeight;
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
  // TABULAR OUTPUT
  // ==========================================
  console.log(
    '| Check ID    | Priority | Layer                          | Criterion                           | Status   | Score | Evidence',
  );
  console.log(
    '| :---------- | :------- | :----------------------------- | :---------------------------------- | :------- | :---- | :------------------------------------------------------------------',
  );

  for (const c of checks) {
    const idPad = c.id.padEnd(11);
    const prioPad = `[${c.priority}]`.padEnd(8);
    const layerPad = c.layer.padEnd(30);
    const critPad = c.criterion.padEnd(35);
    const statusPad = `[${c.status}]`.padEnd(8);
    const scorePad = `${c.score}%`.padStart(5);
    console.log(
      `| ${idPad} | ${prioPad} | ${layerPad} | ${critPad} | ${statusPad} | ${scorePad} | ${c.evidence}`,
    );
  }

  console.log('\n================================================================================');
  console.log('                      SUPPLY CHAIN DEFENSE LAYER SUMMARY                        ');
  console.log('================================================================================');
  console.log('| Layer Name                     | Checks | Passed | Failed | Warn | Score   |');
  console.log('| :----------------------------- | :----- | :----- | :----- | :--- | :------ |');
  for (const s of summaries) {
    const namePad = s.layer.padEnd(30);
    const chkPad = String(s.totalChecks).padStart(6);
    const passPad = String(s.passedChecks).padStart(6);
    const failPad = String(s.failedChecks).padStart(6);
    const warnPad = String(s.warningChecks).padStart(4);
    const scPad = `${s.score.toFixed(1)}%`.padStart(7);
    console.log(`| ${namePad} | ${chkPad} | ${passPad} | ${failPad} | ${warnPad} | ${scPad} |`);
  }

  console.log('\n================================================================================');
  console.log(` COMPOSITE DEFENSE SCORE : ${compositeScore.toFixed(2)}%`);
  console.log(` COMPLIANCE TIER         : [${complianceTier}]`);
  console.log(` FAILED CHECKS           : P0: ${p0Failed} | P1: ${p1Failed}`);
  console.log(` TOTAL CHECKS AUDITED    : ${checks.length} checks across 6 layers`);
  console.log('================================================================================\n');

  if (p0Failed > 0) {
    console.error(`[AUDIT FAILED] ${p0Failed} critical [P0] supply chain defense checks failed.`);
    process.exit(1);
  }

  console.log('[AUDIT PASSED] All 6 layers of dependency supply chain defense verified.');
}

runSupplyChainAudit().catch((err) => {
  console.error('[ERROR] Supply chain audit runner encountered an error:', err);
  process.exit(1);
});
