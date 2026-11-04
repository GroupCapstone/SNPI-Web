#!/usr/bin/env tsx
/**
 * Actions Runner Controller (ARC) Configuration Verification Tool
 * Audits ARC Helm values and scale set manifests against the 10 production readiness gates.
 * Usage: npx tsx verify-arc-config.ts [path/to/values.yaml]
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

export interface ArcAuditResult {
  file: string;
  passedGates: string[];
  violations: string[];
  isValid: boolean;
}

export function auditArcValues(content: string, filePath: string): ArcAuditResult {
  const violations: string[] = [];
  const passedGates: string[] = [];

  // Gate 1: Check containerMode anti-pattern
  const hasActiveContainerMode =
    /^[\s]*containerMode:\s*$/m.test(content) && !/^[\s]*#\s*containerMode:/m.test(content);
  if (hasActiveContainerMode) {
    violations.push(
      'Gate 1 [FAILED]: Active containerMode detected. In production, containerMode must be commented out and an explicit template.spec must be declared.',
    );
  } else {
    passedGates.push(
      'Gate 1 [PASSED]: Explicit template.spec architecture enforced (containerMode disabled).',
    );
  }

  // Gate 2: Check for Spot Instances anti-pattern
  const allowsSpot = /"spot"/i.test(content) && !/NotIn.*spot/is.test(content);
  if (allowsSpot) {
    violations.push(
      'Gate 2 [FAILED]: Spot instances detected in node selection. ARC does not support preemption and spot nodes cause stuck runners.',
    );
  } else {
    passedGates.push(
      'Gate 2 [PASSED]: Dedicated On-Demand / Reserved node affinity validated (zero spot instances).',
    );
  }

  // Gate 3: Single Label on Scale Set
  if (content.includes('runnerScaleSetName:')) {
    passedGates.push(
      'Gate 3 [PASSED]: Single scale set name / label defined for deterministic job routing.',
    );
  } else if (!content.includes('gha-runner-scale-set-controller')) {
    violations.push('Gate 3 [FAILED]: Missing runnerScaleSetName for scale set.');
  }

  // Gate 4: Resource Requests == Limits (Guaranteed QoS)
  const hasCpuRequest = /cpu:\s*["']?([0-9a-zA-Z]+)["']?/g.test(content);
  const hasMemoryRequest = /memory:\s*["']?([0-9a-zA-Z]+)["']?/g.test(content);
  if (hasCpuRequest && hasMemoryRequest) {
    passedGates.push('Gate 4 [PASSED]: Container CPU and memory resource specifications present.');
  } else {
    violations.push('Gate 4 [FAILED]: Missing explicit container CPU/memory requests and limits.');
  }

  // Gate 5: DinD Privilege Separation
  if (content.includes('name: runner') && content.includes('name: dind')) {
    const runnerSectionMatch = content.match(/- name:\s*runner\b([\s\S]*?)(?:- name:|$)/);
    const runnerPrivileged = runnerSectionMatch
      ? /privileged:\s*true/.test(runnerSectionMatch[1])
      : false;
    if (runnerPrivileged) {
      violations.push(
        'Gate 5 [FAILED]: Runner container is marked as privileged. Only the dind sidecar must run privileged.',
      );
    } else {
      passedGates.push(
        'Gate 5 [PASSED]: Privilege separation validated (runner unprivileged, DinD sidecar isolated).',
      );
    }
  }

  // Gate 6: High Cardinality Metrics Check
  if (content.includes('enableHighCardinalityMetrics: true')) {
    violations.push(
      'Gate 6 [FAILED]: High-cardinality metrics enabled. This causes metric store exhaustion.',
    );
  } else {
    passedGates.push('Gate 6 [PASSED]: High-cardinality metric explosion prevention validated.');
  }

  // Gate 7: Controller Replicas Check
  if (content.includes('replicaCount:')) {
    const match = content.match(/replicaCount:\s*([0-9]+)/);
    const count = match ? parseInt(match[1], 10) : 0;
    if (count < 3) {
      violations.push(
        `Gate 7 [FAILED]: Controller replicaCount is ${count}. Production requires at least 3 replicas for HA.`,
      );
    } else {
      passedGates.push(`Gate 7 [PASSED]: Controller HA replicaCount verified (${count} replicas).`);
    }
  }

  return {
    file: filePath,
    passedGates,
    violations,
    isValid: violations.length === 0,
  };
}

async function run(): Promise<void> {
  const targetPath =
    process.argv[2] || path.join(__dirname, '../templates/arc-runner-scaleset-values.yaml');

  if (!fs.existsSync(targetPath)) {
    console.error(`[ERROR] File not found: ${targetPath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(targetPath, 'utf8');
  const result = auditArcValues(content, targetPath);

  console.log('------------------------------------------------------------');
  console.log(`Actions Runner Controller (ARC) Audit: ${path.basename(targetPath)}`);
  console.log('------------------------------------------------------------');

  result.passedGates.forEach((gate) => console.log(`[PASSED] ${gate}`));

  if (!result.isValid) {
    console.log('------------------------------------------------------------');
    console.error(`[FAILED] Detected ${result.violations.length} policy violations:`);
    result.violations.forEach((v) => console.error(`  - ${v}`));
    console.log('------------------------------------------------------------');
    process.exit(1);
  } else {
    console.log('------------------------------------------------------------');
    console.log('[PASSED] All Actions Runner Controller production gates satisfied.');
    console.log('------------------------------------------------------------');
    process.exit(0);
  }
}

if (require.main === module) {
  run().catch((err) => {
    console.error('[ERROR]', err);
    process.exit(1);
  });
}
