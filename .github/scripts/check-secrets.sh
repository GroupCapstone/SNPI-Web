#!/usr/bin/env bash
# ==============================================================================
# SNP-SMS Monorepo Pre-Commit & CI Secret Scanner
# Scans git tree and staging area for accidental credential leaks.
# ==============================================================================

set -euo pipefail

echo "======================================================"
echo "[SECRET-SCAN] Starting SNP-SMS Monorepo Secret Audit"
echo "======================================================"

DETECTED=0

# High-risk regex patterns for credentials and tokens
PATTERNS=(
  "-----BEGIN (RSA|EC|DSA|OPENSSH|PGP) PRIVATE KEY-----"
  "AKIA[0-9A-Z]{16}"
  "(xox[p|b|o|a]-[0-9]{12}-[0-9]{12}-[0-9a-zA-Z]{24})"
  "ghp_[0-9a-zA-Z]{36}"
  "github_pat_[0-9a-zA-Z_]{82}"
  "sk_live_[0-9a-zA-Z]{24,}"
  "rk_live_[0-9a-zA-Z]{24,}"
  "AIza[0-9A-Za-z\\-_]{35}"
  "amzn\\.mws\\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
)

# Files to scan (tracked files excluding known examples and test fixtures)
FILES=$(git ls-files | grep -v -E "(\.env\.example|\.example$|\.test\.|\.spec\.|test-fixtures|node_modules/|\.png$|\.jpg$|\.ico$|\.pdf$)" || true)

if [ -z "$FILES" ]; then
  echo "[SECRET-SCAN] No tracked files found to inspect."
  exit 0
fi

for PATTERN in "${PATTERNS[@]}"; do
  MATCHES=$(git grep -E -I -n "$PATTERN" -- $FILES 2>/dev/null || true)
  if [ -n "$MATCHES" ]; then
    echo "[FAILED] High-risk secret pattern detected: $PATTERN"
    echo "$MATCHES"
    DETECTED=1
  fi
done

echo "------------------------------------------------------"
if [ "$DETECTED" -eq 1 ]; then
  echo "[FAILED] Secret check failed. Remove credentials before committing."
  exit 1
else
  echo "[PASSED] Zero leaked credentials or private keys detected."
  echo "======================================================"
  exit 0
fi
