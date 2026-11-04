import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * SNPI Repository & Security Quality Telegram Watcher
 * Real-time monitoring for git pushes, developer commit fixes, releases,
 * GitHub security quality checks, and live API health.
 */

function resolveBotToken(): string {
  if (process.env.TELEGRAM_BOT_TOKEN) return process.env.TELEGRAM_BOT_TOKEN;
  if (process.env.TELEGRAM_BOT__TOKEN) return process.env.TELEGRAM_BOT__TOKEN;
  try {
    const envLocal = path.join(ROOT_DIR, '.env.local');
    if (fs.existsSync(envLocal)) {
      const content = fs.readFileSync(envLocal, 'utf-8');
      const match = content.match(/TELEGRAM_BOT_?_?TOKEN=([^\r\n]+)/);
      if (match && match[1]) return match[1].trim();
    }
  } catch {
    // ignore
  }
  return '';
}

function resolveChatId(): string | number | null {
  if (process.env.TELEGRAM_CHAT_ID) return process.env.TELEGRAM_CHAT_ID;
  try {
    const envLocal = path.join(ROOT_DIR, '.env.local');
    if (fs.existsSync(envLocal)) {
      const content = fs.readFileSync(envLocal, 'utf-8');
      const match = content.match(/TELEGRAM_CHAT_ID=([^\r\n]+)/);
      if (match && match[1]) return match[1].trim();
    }
  } catch {
    // ignore
  }
  return null;
}

const ROOT_DIR = path.resolve(__dirname, '..');
const CACHE_FILE = path.join(ROOT_DIR, '.telegram-watch-cache.json');

interface WatchCache {
  chatId?: string | number;
  lastCommitHash?: string;
  lastReleaseVersion?: string;
  lastSecurityAlertCount?: number;
  lastApiStatus?: string;
}

function loadCache(): WatchCache {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    }
  } catch {
    // fallback
  }
  return {};
}

function saveCache(cache: WatchCache): void {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save cache file:', err);
  }
}

/**
 * Dispatches a formatted message to Telegram Bot API
 */
function escapeHtml(str: string): string {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function formatHumanTime(date = new Date()): string {
  const dateStr = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return `${dateStr}, ${timeStr}`;
}

function formatAuthor(author: string, email: string): string {
  const cleanName = (author || 'Developer').trim();
  if (email && email.includes('@users.noreply.github.com')) {
    const handleMatch = email.match(/(?:\d+\+)?([^@]+)@users\.noreply\.github\.com/);
    if (handleMatch && handleMatch[1] && handleMatch[1].toLowerCase() !== cleanName.toLowerCase()) {
      return `${cleanName} (@${handleMatch[1]})`;
    }
  }
  return cleanName;
}

function formatDiffSummary(diffStat: string, changedFiles: string[]): string {
  const filesMatch = diffStat.match(/(\d+)\s+file/);
  const count = filesMatch ? filesMatch[1] : String(changedFiles.length || 0);

  if (changedFiles.length > 0 && changedFiles.length <= 3) {
    const names = changedFiles.map((f) => path.basename(f)).join(', ');
    return `${count} files updated (${escapeHtml(names)})`;
  }
  return `${count} files updated`;
}

function getSecurityInlineSummary(security: SecurityStatus): string {
  if (security.totalAlerts === 0) {
    return 'All security checks clean';
  }
  return `${security.totalAlerts} advisories under review`;
}

function getTrackerSummary(apiHealth: {
  online: boolean;
  statusCode: number;
  latencyMs: number;
}): string {
  if (apiHealth.online) {
    return 'All systems operational';
  }
  return 'Services undergoing maintenance';
}

async function sendTelegramMessage(chatId: string | number, text: string): Promise<boolean> {
  const botToken = resolveBotToken();
  if (!botToken) {
    console.error('Cannot send message: TELEGRAM_BOT_TOKEN is not configured.');
    return false;
  }
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const data = (await res.json()) as { ok: boolean; description?: string };
    if (!data.ok) {
      console.error(`Telegram API error: ${data.description}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to dispatch Telegram message:', err);
    return false;
  }
}

/**
 * Auto-detects chat ID from recent bot updates
 */
async function getActiveChatId(): Promise<string | number | null> {
  const envChatId = resolveChatId();
  if (envChatId) return envChatId;

  const cache = loadCache();
  if (cache.chatId) return cache.chatId;

  const botToken = resolveBotToken();
  if (!botToken) return null;

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
    const data = (await res.json()) as {
      ok: boolean;
      result?: Array<{
        message?: { chat?: { id: number; username?: string; first_name?: string } };
      }>;
    };

    if (data.ok && data.result && data.result.length > 0) {
      const latestMsg = data.result[data.result.length - 1]?.message;
      if (latestMsg?.chat?.id) {
        const discoveredId = latestMsg.chat.id;
        console.log(
          `[Telegram] Discovered active Chat ID: ${discoveredId} (${latestMsg.chat.username || latestMsg.chat.first_name || 'User'})`,
        );
        cache.chatId = discoveredId;
        saveCache(cache);
        return discoveredId;
      }
    }
  } catch (err) {
    console.error('Failed to poll getUpdates:', err);
  }

  return null;
}

/**
 * Inspects recent Git commit / push fixes
 */
function inspectLatestCommit(): {
  hash: string;
  author: string;
  email: string;
  date: string;
  message: string;
  branch: string;
  changedFiles: string[];
  diffStat: string;
} {
  const format = '%h|%an|%ae|%ad|%s';
  const out = execSync(`git log -1 --pretty=format:"${format}" --date=short`, {
    cwd: ROOT_DIR,
    encoding: 'utf-8',
  }).trim();

  const [hash, author, email, date, message] = out.split('|');
  const branch = execSync('git rev-parse --abbrev-ref HEAD', {
    cwd: ROOT_DIR,
    encoding: 'utf-8',
  }).trim();

  let changedFiles: string[] = [];
  try {
    const diffOut = execSync(`git diff-tree --no-commit-id --name-only -r ${hash}`, {
      cwd: ROOT_DIR,
      encoding: 'utf-8',
    }).trim();
    changedFiles = diffOut.split('\n').filter(Boolean);
  } catch {
    // ignore
  }

  let diffStat = '';
  try {
    diffStat = execSync(`git diff --shortstat ${hash}^!`, {
      cwd: ROOT_DIR,
      encoding: 'utf-8',
    }).trim();
  } catch {
    try {
      diffStat = execSync(`git diff-tree --shortstat ${hash}`, {
        cwd: ROOT_DIR,
        encoding: 'utf-8',
      }).trim();
    } catch {
      // ignore
    }
  }

  return { hash, author, email, date, message, branch, changedFiles, diffStat };
}

/**
 * Inspects package.json version and latest release tag
 */
function inspectVersionAndRelease(): {
  packageVersion: string;
  latestTag: string;
} {
  let packageVersion = '0.0.0';
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf-8'));
    packageVersion = pkg.version || '0.0.0';
  } catch {
    // ignore
  }

  let latestTag = '';
  try {
    latestTag = execSync('git describe --tags --abbrev=0', {
      cwd: ROOT_DIR,
      encoding: 'utf-8',
    }).trim();
  } catch {
    latestTag = `v${packageVersion}`;
  }

  return { packageVersion, latestTag };
}

/**
 * Checks GitHub Dependabot and Monorepo security health
 */
interface SecurityStatus {
  totalAlerts: number;
  openAlerts: Array<{
    number: number;
    package: string;
    severity: string;
    summary: string;
  }>;
}

function getRepoSlug(): string {
  try {
    const remoteUrl = execSync('git remote get-url origin', {
      cwd: ROOT_DIR,
      encoding: 'utf-8',
    }).trim();
    const match = remoteUrl.match(/github\.com[/:]([^/]+)\/([^/.]+)/);
    if (match) return `${match[1]}/${match[2].replace(/\.git$/, '')}`;
  } catch {
    // fallback
  }
  return 'Tan-Saphea/SNPI-SMS';
}

function inspectSecurityQuality(): SecurityStatus {
  try {
    const repoSlug = getRepoSlug();
    const cmd = `gh api repos/${repoSlug}/dependabot/alerts --jq '[.[] | select(.state=="open") | {number: .number, package: .security_vulnerability.package.name, severity: .security_advisory.severity, summary: .security_advisory.summary}]'`;
    const out = execSync(cmd, { cwd: ROOT_DIR, encoding: 'utf-8' }).trim();
    const openAlerts = JSON.parse(out);
    return {
      totalAlerts: openAlerts.length,
      openAlerts,
    };
  } catch {
    // If gh CLI fails or offline, return 0
    return { totalAlerts: 0, openAlerts: [] };
  }
}

/**
 * Inspects Live API status
 */
async function inspectLiveApi(endpoint = 'http://localhost:5001/health'): Promise<{
  online: boolean;
  statusCode: number;
  latencyMs: number;
  data?: Record<string, unknown>;
}> {
  const start = Date.now();
  try {
    const res = await fetch(endpoint, { signal: AbortSignal.timeout(3500) });
    const latencyMs = Date.now() - start;
    let data: Record<string, unknown> | undefined;
    try {
      data = (await res.json()) as Record<string, unknown>;
    } catch {
      // non-json
    }
    return {
      online: res.status >= 200 && res.status < 400,
      statusCode: res.status,
      latencyMs,
      data,
    };
  } catch {
    return {
      online: false,
      statusCode: 0,
      latencyMs: Date.now() - start,
    };
  }
}

/**
 * Main evaluation and dispatch cycle
 */
export async function runWatcherCycle(options: { forceAlert?: boolean } = {}): Promise<void> {
  const cache = loadCache();
  const chatId = await getActiveChatId();

  if (!chatId) {
    console.log('\n[SNPI Telegram Watcher] No Chat ID detected yet.');
    console.log('Action Required: Open Telegram, search @snpi_statusbot and send /start');
    console.log('Then rerun this script to begin receiving alerts.\n');
    return;
  }

  const commit = inspectLatestCommit();
  const { packageVersion, latestTag } = inspectVersionAndRelease();
  const security = inspectSecurityQuality();
  const apiHealth = await inspectLiveApi();

  console.log(
    `[Watch Cycle] Commit: ${commit.hash} (${commit.author}) | Version: ${packageVersion} | Alerts: ${security.totalAlerts} | API: ${apiHealth.online ? 'ONLINE' : 'OFFLINE'}`,
  );

  // Detect events
  const isNewRelease = Boolean(
    cache.lastReleaseVersion && cache.lastReleaseVersion !== packageVersion,
  );
  const isNewCommit = cache.lastCommitHash !== commit.hash;
  const isSecurityChanged =
    cache.lastSecurityAlertCount !== undefined &&
    cache.lastSecurityAlertCount !== security.totalAlerts;
  const isApiChanged =
    cache.lastApiStatus !== undefined &&
    cache.lastApiStatus !== (apiHealth.online ? 'ONLINE' : 'OFFLINE');

  const shouldAlert =
    options.forceAlert || isNewCommit || isNewRelease || isSecurityChanged || isApiChanged;

  if (shouldAlert) {
    const authorDisplay = formatAuthor(commit.author, commit.email);
    const diffSummary = formatDiffSummary(commit.diffStat, commit.changedFiles);
    const securitySummary = getSecurityInlineSummary(security);
    const trackerSummary = getTrackerSummary(apiHealth);

    // Clean human-readable summary from conventional commit
    const humanSummary = commit.message
      .replace(/^(feat|fix|docs|refactor|test|chore|style)(\([^)]+\))?:\s*/i, '')
      .replace(/^./, (c) => c.toUpperCase());

    let headerBadge = '[SNPI · REPO PUSH]';
    if (isNewRelease) {
      headerBadge = `[SNPI · RELEASE ${latestTag || `v${packageVersion}`}]`;
    } else if (isApiChanged && !apiHealth.online) {
      headerBadge = '[SNPI · TRACKER DEGRADED]';
    }

    const repoSlug = getRepoSlug();
    const commitUrl = `https://github.com/${repoSlug}/commit/${commit.hash}`;
    const releaseUrl = `https://github.com/${repoSlug}/releases`;

    const consolidatedMessage = `<b>${headerBadge}</b> <code>${escapeHtml(commit.branch)}</code> · <b>v${escapeHtml(packageVersion)}</b>
<b>${escapeHtml(humanSummary)}</b>

• <b>Developer:</b> ${escapeHtml(authorDisplay)}
• <b>Commit:</b> <a href="${commitUrl}">${escapeHtml(commit.hash)}</a>
• <b>Changes:</b> ${diffSummary}
• <b>Security:</b> ${securitySummary}
• <b>Tracker:</b> ${trackerSummary}
• <b>Release:</b> <a href="${releaseUrl}">Release Notes</a>
• <b>Time:</b> ${formatHumanTime()}`;

    // Send ONE consolidated message
    await sendTelegramMessage(chatId, consolidatedMessage);

    // Update cache
    cache.lastCommitHash = commit.hash;
    cache.lastReleaseVersion = packageVersion;
    cache.lastSecurityAlertCount = security.totalAlerts;
    cache.lastApiStatus = apiHealth.online ? 'ONLINE' : 'OFFLINE';
  } else {
    // Initial silent state sync
    if (!cache.lastCommitHash) cache.lastCommitHash = commit.hash;
    if (!cache.lastReleaseVersion) cache.lastReleaseVersion = packageVersion;
    if (cache.lastSecurityAlertCount === undefined)
      cache.lastSecurityAlertCount = security.totalAlerts;
    if (!cache.lastApiStatus) cache.lastApiStatus = apiHealth.online ? 'ONLINE' : 'OFFLINE';
  }

  saveCache(cache);
}

/**
 * CLI Runner
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--get-chat-id')) {
    const chatId = await getActiveChatId();
    if (chatId) {
      console.log(`Active Chat ID: ${chatId}`);
    } else {
      console.log('No chat detected. Send a message to @snpi_statusbot on Telegram first.');
    }
    return;
  }

  if (args.includes('--test')) {
    const chatId = await getActiveChatId();
    if (!chatId) {
      console.log('Cannot send test: No Chat ID found. Message @snpi_statusbot first.');
      return;
    }
    const commit = inspectLatestCommit();
    const { packageVersion } = inspectVersionAndRelease();
    const security = inspectSecurityQuality();
    const apiHealth = await inspectLiveApi();
    const repoSlug = getRepoSlug();
    const commitUrl = `https://github.com/${repoSlug}/commit/${commit.hash}`;
    const releaseUrl = `https://github.com/${repoSlug}/releases`;

    console.log(`Sending diagnostic test message to Chat ID: ${chatId}...`);
    const testMessage = `<b>[SNPI · TRACKER STATUS]</b> <code>${escapeHtml(commit.branch)}</code> · <b>v${packageVersion}</b>
<b>Live Repository &amp; Quality Monitor Operational</b>

• <b>Developer:</b> ${escapeHtml(formatAuthor(commit.author, commit.email))}
• <b>Commit:</b> <a href="${commitUrl}">${escapeHtml(commit.hash)}</a>
• <b>Security:</b> ${getSecurityInlineSummary(security)}
• <b>Tracker:</b> ${getTrackerSummary(apiHealth)}
• <b>Release:</b> <a href="${releaseUrl}">Release Notes</a>
• <b>Time:</b> ${formatHumanTime()}`;

    const success = await sendTelegramMessage(chatId, testMessage);
    console.log(success ? 'Test message sent successfully.' : 'Failed to send test message.');
    return;
  }

  if (args.includes('--once')) {
    await runWatcherCycle({ forceAlert: true });
    return;
  }

  if (args.includes('--watch')) {
    console.log('[SNPI Telegram Watcher] Daemon active. Polling repository and API every 60s...');
    await runWatcherCycle();
    setInterval(async () => {
      try {
        await runWatcherCycle();
      } catch (err) {
        console.error('Error during watcher cycle:', err);
      }
    }, 60000);
    return;
  }

  // Default: Run once
  await runWatcherCycle();
}

main().catch((err) => {
  console.error('Fatal error in telegram watcher:', err);
  process.exit(1);
});
