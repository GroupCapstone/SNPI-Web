#!/usr/bin/env bash
set -eo pipefail

echo "==> [SNP-SMS Pre-Commit Gate] Verifying staged changes..."

# 1. Format Check
echo "--> Checking Prettier formatting..."
npx prettier --check $(git diff --cached --name-only --diff-filter=ACMR | grep -E '\.(ts|tsx|js|mjs|json|md)$' || true)

# 2. Typecheck Check (using Turborepo if available, or npm workspace)
echo "--> Verifying TypeScript compilation..."
if command -v npx >/dev/null 2>&1; then
  npx turbo run typecheck --filter="[HEAD]"
else
  npm run typecheck
fi

echo "==> [SNP-SMS Pre-Commit Gate] Passed successfully!"
