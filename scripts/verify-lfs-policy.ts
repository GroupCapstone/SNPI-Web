import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT_DIR = process.cwd();

interface FileAudit {
  path: string;
  sizeBytes: number;
  compressedBytes: number;
  ratio: number;
  recommendation: 'NATIVE_GIT' | 'GIT_LFS';
  isLfsTracked: boolean;
  status: 'COMPLIANT' | 'VIOLATION' | 'REVIEW';
}

function runGitCommand(cmd: string): string {
  try {
    return execSync(cmd, {
      cwd: ROOT_DIR,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
  } catch {
    return '';
  }
}

async function verifyGitLfsPolicy(): Promise<void> {
  console.log('================================================================================');
  console.log('           GIT LFS ARCHITECTURE POLICY & REPOSITORY BLOB AUDITOR                ');
  console.log('================================================================================\n');

  // 1. Verify .gitattributes configuration
  console.log('[1/4] Verifying .gitattributes LFS filter rules...');
  const gitattributesPath = path.resolve(ROOT_DIR, '.gitattributes');
  if (!fs.existsSync(gitattributesPath)) {
    throw new Error('Missing .gitattributes file in repository root.');
  }

  const gitattributesContent = fs.readFileSync(gitattributesPath, 'utf-8');
  const hasLfsFilters =
    gitattributesContent.includes('filter=lfs') && gitattributesContent.includes('merge=lfs');
  if (!hasLfsFilters) {
    console.warn('      [WARNING] .gitattributes does not contain Git LFS filters.');
  } else {
    console.log('      [PASS] Git LFS filters configured in .gitattributes for binary types.');
  }

  // 2. Verify .gitignore heavy media exclusions
  console.log('\n[2/4] Verifying .gitignore heavy media exclusions...');
  const gitignorePath = path.resolve(ROOT_DIR, '.gitignore');
  const gitignoreContent = fs.existsSync(gitignorePath)
    ? fs.readFileSync(gitignorePath, 'utf-8')
    : '';
  const hasMediaExclusions =
    gitignoreContent.includes('*.mov') &&
    gitignoreContent.includes('*.mp4') &&
    gitignoreContent.includes('*.zip');

  if (!hasMediaExclusions) {
    console.warn(
      '      [WARNING] .gitignore missing heavy media exclusions (*.mov, *.mp4, *.zip).',
    );
  } else {
    console.log('      [PASS] Heavy media exclusions active in .gitignore.');
  }

  // 3. Scan tracked Git files
  console.log('\n[3/4] Scanning tracked repository files for binary blob bloat...');
  const trackedFilesOutput = runGitCommand('git ls-files');
  const trackedFiles = trackedFilesOutput.split('\n').filter(Boolean);

  const lfsFilesOutput = runGitCommand('git lfs ls-files');
  const lfsTrackedSet = new Set(
    lfsFilesOutput
      .split('\n')
      .map((line) => line.split(' - ')[1]?.trim())
      .filter(Boolean),
  );

  const auditedFiles: FileAudit[] = [];
  let violationsCount = 0;

  for (const relPath of trackedFiles) {
    const fullPath = path.resolve(ROOT_DIR, relPath);
    if (!fs.existsSync(fullPath)) continue;

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) continue;

    // Focus on files >= 50KB for compression analysis
    if (stat.size >= 50 * 1024) {
      const buffer = fs.readFileSync(fullPath);
      const compressed = zlib.deflateSync(buffer);
      const ratio = Math.round((1 - compressed.length / (buffer.length || 1)) * 10000) / 100;
      const recommendation: 'NATIVE_GIT' | 'GIT_LFS' = ratio < 25.0 ? 'GIT_LFS' : 'NATIVE_GIT';
      const isLfs = lfsTrackedSet.has(relPath);

      let status: 'COMPLIANT' | 'VIOLATION' | 'REVIEW' = 'COMPLIANT';

      // If pre-compressed binary > 500KB is stored in raw Git without LFS
      if (recommendation === 'GIT_LFS' && !isLfs && stat.size > 500 * 1024) {
        status = 'VIOLATION';
        violationsCount++;
      } else if (recommendation === 'NATIVE_GIT' && isLfs) {
        // High compressible text stored in LFS balloons storage/bandwidth
        status = 'VIOLATION';
        violationsCount++;
      }

      auditedFiles.push({
        path: relPath,
        sizeBytes: stat.size,
        compressedBytes: compressed.length,
        ratio,
        recommendation,
        isLfsTracked: isLfs,
        status,
      });
    }
  }

  // 4. Output Summary Table
  console.log('\n[4/4] Asset Compression & LFS Decision Scorecard:');
  console.log('--------------------------------------------------------------------------------');
  console.log('Path                                    Size (KB)  Ratio     Rec.       Status');
  console.log('--------------------------------------------------------------------------------');

  for (const audit of auditedFiles.slice(0, 15)) {
    const p = audit.path.length > 38 ? audit.path.slice(0, 35) + '...' : audit.path.padEnd(38);
    const sizeKb = (audit.sizeBytes / 1024).toFixed(1).padStart(8);
    const ratioStr = `${audit.ratio.toFixed(1)}%`.padStart(8);
    const recStr = audit.recommendation.padEnd(10);
    const badge =
      audit.status === 'COMPLIANT' ? '[PASS]' : audit.status === 'VIOLATION' ? '[FAIL]' : '[WARN]';
    console.log(`${p}  ${sizeKb}  ${ratioStr}  ${recStr}  ${badge}`);
  }
  console.log('--------------------------------------------------------------------------------');

  console.log(`\nAudited Large Assets  : ${auditedFiles.length}`);
  console.log(`Policy Violations     : ${violationsCount}`);

  if (violationsCount > 0) {
    console.error(
      '\n[FAILED] Git LFS policy violations detected. Migrate heavy uncompressible blobs to LFS.',
    );
    process.exit(1);
  } else {
    console.log('\n[PASSED] Git repository adheres to Git LFS Decision Framework standards.');
    process.exit(0);
  }
}

verifyGitLfsPolicy().catch((error) => {
  console.error('[ERROR] Git LFS policy verification failed:', error);
  process.exit(1);
});
