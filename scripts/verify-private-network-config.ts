#!/usr/bin/env tsx
/**
 * Automated Verification Engine for GitHub Actions Private Networking
 * Audits:
 * 1. Subnet Sizing Invariant: Usable IPs >= MaxConcurrency * 1.20 (accounting for 5 Azure reserved IPs).
 * 2. Subnet Delegation: serviceName === "GitHub.Network/networkSettings".
 * 3. Required Egress FQDNs for GitHub Actions operation.
 * 4. Operating System compatibility guardrails (rejects macOS runners).
 */

import * as fs from 'fs';
import * as path from 'path';

interface RunnerNetworkConfig {
  enterprise: {
    name: string;
    organization: string;
    businessId?: string;
  };
  networking: {
    vnetName: string;
    vnetCidr: string;
    subnetName: string;
    subnetCidr: string;
    delegationService: string;
    maxConcurrency: number;
    supportedOperatingSystems: string[];
  };
  firewall: {
    applicationRuleFqdns: string[];
  };
}

const MANDATORY_FQDNS = [
  'github.com',
  '*.github.com',
  '*.githubusercontent.com',
  '*.blob.core.windows.net',
  'ghcr.io',
  '*.ghcr.io',
  '*.githubassets.com',
  'github-cloud.s3.amazonaws.com',
];

function calculateSubnetCapacity(cidr: string): { total: number; usable: number } {
  const parts = cidr.split('/');
  if (parts.length !== 2) {
    throw new Error(`Invalid CIDR format: ${cidr}`);
  }
  const prefixLength = parseInt(parts[1], 10);
  if (isNaN(prefixLength) || prefixLength < 0 || prefixLength > 32) {
    throw new Error(`Invalid prefix length in CIDR: ${cidr}`);
  }
  const total = Math.pow(2, 32 - prefixLength);
  // Azure reserves 5 IPs per subnet: network, default gateway, 2x DNS, broadcast
  const usable = Math.max(0, total - 5);
  return { total, usable };
}

function parseYamlSimple(raw: string): any {
  // Lightweight parser for YAML configuration files without external dependencies
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
      const val = trimmed.slice(2).replace(/['"]/g, '').trim();
      const targetObj = currentSubSection
        ? result[currentSection][currentSubSection]
        : result[currentSection];
      if (Array.isArray(targetObj)) {
        targetObj.push(val);
      } else {
        // Find property name that owns this list
        // Fallback for simple single list
      }
    } else if (trimmed.includes(':')) {
      const colonIdx = trimmed.indexOf(':');
      const key = trimmed.slice(0, colonIdx).trim();
      let val: any = trimmed.slice(colonIdx + 1).trim();

      if (val === '') {
        // Could be start of a list or object
        if (indent === 2) {
          result[currentSection][key] = [];
        }
      } else {
        val = val.replace(/['"]/g, '');
        if (/^\d+$/.test(val)) val = parseInt(val, 10);
        else if (val === 'true') val = true;
        else if (val === 'false') val = false;

        if (indent === 2) {
          result[currentSection][key] = val;
        } else if (indent === 4 && currentSubSection) {
          result[currentSection][currentSubSection][key] = val;
        }
      }
    }
  }

  // Handle lists specifically
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
      }
    }
  }

  return result;
}

export function auditPrivateNetworkConfig(configPath: string): boolean {
  console.log('------------------------------------------------------------');
  console.log('GitHub Actions Private Networking Verification');
  console.log(`Config file: ${configPath}`);
  console.log('------------------------------------------------------------');

  if (!fs.existsSync(configPath)) {
    console.error(`[FAILED] Config file does not exist: ${configPath}`);
    return false;
  }

  const raw = fs.readFileSync(configPath, 'utf8');
  let config: RunnerNetworkConfig;

  try {
    if (configPath.endsWith('.json')) {
      config = JSON.parse(raw);
    } else {
      config = parseYamlSimple(raw) as RunnerNetworkConfig;
    }
  } catch (err: any) {
    console.error(`[FAILED] Failed to parse config file: ${err.message}`);
    return false;
  }

  let passed = true;

  // Check 1: Subnet Delegation
  const expectedDelegation = 'GitHub.Network/networkSettings';
  if (config.networking?.delegationService === expectedDelegation) {
    console.log(`[PASSED] Subnet delegation matches: '${expectedDelegation}'`);
  } else {
    console.error(
      `[FAILED] Invalid subnet delegation: '${config.networking?.delegationService}'. Expected: '${expectedDelegation}'`,
    );
    passed = false;
  }

  // Check 2: Subnet Sizing Invariant (Usable IPs >= MaxConcurrency * 1.20)
  const maxConcurrency = config.networking?.maxConcurrency || 0;
  const requiredCapacity = Math.ceil(maxConcurrency * 1.2);
  const subnetCidr = config.networking?.subnetCidr || '';

  try {
    const { total, usable } = calculateSubnetCapacity(subnetCidr);
    console.log(
      `Subnet CIDR: ${subnetCidr} (Total IPs: ${total}, Usable IPs: ${usable} [after 5 Azure reserved])`,
    );
    console.log(
      `Max Concurrency: ${maxConcurrency} -> Required Capacity (+20% buffer): ${requiredCapacity}`,
    );

    if (usable >= requiredCapacity) {
      console.log(
        `[PASSED] Subnet capacity verified (${usable} usable >= ${requiredCapacity} required).`,
      );
    } else {
      console.error(
        `[FAILED] Subnet capacity insufficient! Usable: ${usable}, Required (+20% buffer): ${requiredCapacity}.`,
      );
      console.error(
        `         Recommend expanding subnet CIDR to allow at least ${requiredCapacity} usable host IPs.`,
      );
      passed = false;
    }
  } catch (err: any) {
    console.error(`[FAILED] CIDR calculation error: ${err.message}`);
    passed = false;
  }

  // Check 3: OS Compatibility (No macOS allowed)
  const supportedOS = config.networking?.supportedOperatingSystems || [];
  const hasMacOs = supportedOS.some(
    (os) =>
      os.toLowerCase().includes('macos') ||
      os.toLowerCase().includes('darwin') ||
      os.toLowerCase().includes('osx'),
  );
  if (hasMacOs) {
    console.error(
      `[FAILED] Incompatible OS detected in supported list: macOS is NOT supported for Azure Private Networking.`,
    );
    passed = false;
  } else {
    console.log(
      `[PASSED] OS compatibility verified: [${supportedOS.join(', ')}] (macOS strictly excluded).`,
    );
  }

  // Check 4: Mandatory Egress FQDN Whitelist
  const fqdns = config.firewall?.applicationRuleFqdns || [];
  const missingFqdns: string[] = [];
  for (const mandatory of MANDATORY_FQDNS) {
    if (!fqdns.includes(mandatory)) {
      missingFqdns.push(mandatory);
    }
  }

  if (missingFqdns.length === 0) {
    console.log(
      `[PASSED] All ${MANDATORY_FQDNS.length} mandatory GitHub Actions egress FQDNs are permitted in firewall rules.`,
    );
  } else {
    console.error(`[FAILED] Missing mandatory egress FQDNs in firewall rules:`);
    for (const m of missingFqdns) {
      console.error(`         - ${m}`);
    }
    passed = false;
  }

  console.log('------------------------------------------------------------');
  if (passed) {
    console.log('[PASSED] GitHub Actions Private Networking configuration verified.');
  } else {
    console.error('[FAILED] Verification failed. Address violations above.');
  }
  console.log('------------------------------------------------------------');

  return passed;
}

if (require.main === module) {
  const configFile = process.argv[2] || path.join(__dirname, '../templates/network-config.yaml');
  const success = auditPrivateNetworkConfig(configFile);
  process.exit(success ? 0 : 1);
}
