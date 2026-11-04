import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

interface ChangeLogItem {
  version: string;
  date: string;
  commitHash: string;
  developer: string;
  description: string;
}

const ROOT_DIR = path.resolve(__dirname, '..');
const CHANGELOG_DATA_FILE = path.join(
  ROOT_DIR,
  'apps/frontend/features/document/changelog-data.ts',
);
const ROOT_CHANGELOG_MD = path.join(ROOT_DIR, 'CHANGELOG.md');

export const syncChangelog = (): void => {
  console.log('[Changelog] Extracting recent git commits for real-time document sync...');

  // 1. Resolve current active version from package.json or shared version
  let currentVersion = '0.2.7';
  try {
    const pkgJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf-8'));
    if (pkgJson.version) {
      currentVersion = pkgJson.version;
    }
  } catch {
    // fallback
  }

  // 2. Map existing tags to their dereferenced commit hashes
  const tagMap = new Map<string, string>();
  try {
    const tagOutput = execSync('git show-ref --tags -d', { cwd: ROOT_DIR, encoding: 'utf-8' });
    for (const line of tagOutput.trim().split('\n').filter(Boolean)) {
      const [hash, ref] = line.split(' ');
      const match = ref.match(/refs\/tags\/(v[0-9.]+)(\^\{\})?$/);
      if (match) {
        const tagName = match[1].replace(/^v/, '');
        tagMap.set(hash.slice(0, 7), tagName);
        tagMap.set(hash, tagName);
      }
    }
  } catch {
    // Ignore tag resolution errors
  }

  // 3. Extract recent commits (last 25 for rich document history)
  const gitOutput = execSync(
    'git log -n 25 --pretty=format:"%h|%ad|%an|%s" --date=format:"%d.%m.%Y"',
    {
      cwd: ROOT_DIR,
      encoding: 'utf-8',
    },
  );

  const lines = gitOutput.trim().split('\n').filter(Boolean);
  const items: ChangeLogItem[] = [];

  let runningVersion = currentVersion;

  for (const line of lines) {
    const [hash, date, author, ...subjectParts] = line.split('|');
    const subject = subjectParts.join('|').trim();
    const shortHash = hash.trim().slice(0, 7);
    const developer = (author || 'Tan-Saphea').trim();

    // If this commit has an explicit release tag, step into that release version
    if (tagMap.has(shortHash)) {
      runningVersion = tagMap.get(shortHash)!;
    }

    // Clean conventional commit prefix for clean readability
    const cleanDesc = subject
      .replace(/^(feat|fix|docs|refactor|test|chore|style)(\([^)]+\))?:\s*/i, '')
      .replace(/^./, (c) => c.toUpperCase());

    items.push({
      version: runningVersion,
      date: date.trim(),
      commitHash: shortHash,
      developer,
      description: cleanDesc,
    });
  }

  // 4. Write TypeScript file for live frontend /document page
  const tsContent = `export interface ChangeLogEntry {
  version: string;
  date: string;
  commitHash?: string;
  developer?: string;
  description: string;
}

export const CHANGE_LOGS: ChangeLogEntry[] = ${JSON.stringify(items, null, 2)};
`;

  fs.writeFileSync(CHANGELOG_DATA_FILE, tsContent, 'utf-8');
  console.log(`[Changelog] Successfully updated ${CHANGELOG_DATA_FILE} (${items.length} entries).`);

  // 5. Write root CHANGELOG.md with clear developer attribution and readable summaries
  let mdContent = `# SNPI-SMS Changelog\n\nAll notable changes, commits, and skill updates are recorded here in real-time.\n\n`;
  for (const item of items) {
    mdContent += `### Version ${item.version} (${item.date}) - \`${item.commitHash}\` (Developer: **${item.developer}**)\n\n- ${item.description}\n\n`;
  }

  fs.writeFileSync(ROOT_CHANGELOG_MD, mdContent, 'utf-8');
  console.log(`[Changelog] Successfully updated ${ROOT_CHANGELOG_MD}.`);
};

if (require.main === module) {
  syncChangelog();
}
