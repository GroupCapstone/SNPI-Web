#!/usr/bin/env bash
# ==============================================================================
# SNP-SMS GitHub Actions Allowlist & SHA-Pinning Policy Verifier
# Aligned with GitHub Well-Architected Framework: Governance & Application Security
# ==============================================================================

set -euo pipefail

POLICY_FILE=".github/policies/allowed-actions.json"
WORKFLOW_DIR=".github/workflows"

echo "======================================================================"
echo "[ACTIONS-POLICY] Starting GitHub Actions Allowlist & SHA Audit"
echo "======================================================================"

if [ ! -f "$POLICY_FILE" ]; then
  echo "[ERROR] Policy file $POLICY_FILE not found!"
  exit 1
fi

VIOLATIONS=0
CHECKED=0

# Extract allowed actions list from policy JSON
ALLOWED_ACTIONS=$(python3 -c "
import json
with open('$POLICY_FILE') as f:
    data = json.load(f)
actions = [entry['action'] for entry in data.get('allowedActions', [])]
print('\n'.join(actions))
")

echo "[POLICY] Loaded $(echo "$ALLOWED_ACTIONS" | wc -l | tr -d ' ') allowed actions from policy."
echo "----------------------------------------------------------------------"

# Find all workflow files
for WORKFLOW in "$WORKFLOW_DIR"/*.yml; do
  [ -e "$WORKFLOW" ] || continue
  
  # Extract all "uses:" lines
  while IFS= read -r line; do
    [ -z "$line" ] && continue
    CHECKED=$((CHECKED + 1))
    
    # Strip leading whitespace and "uses:"
    USE_TARGET=$(echo "$line" | sed -E 's/^[[:space:]]*uses:[[:space:]]*//' | awk '{print $1}')
    
    # Allow local actions starting with ./
    if [[ "$USE_TARGET" =~ ^\./ ]]; then
      echo "[OK-LOCAL] $WORKFLOW -> $USE_TARGET"
      continue
    fi
    
    # Parse action name and revision
    ACTION_NAME="${USE_TARGET%%@*}"
    ACTION_REF="${USE_TARGET##*@}"
    
    # Check 1: Must have an @ separator
    if [ "$ACTION_NAME" = "$ACTION_REF" ]; then
      echo "[VIOLATION] Missing version specifier in $WORKFLOW: $USE_TARGET"
      VIOLATIONS=$((VIOLATIONS + 1))
      continue
    fi
    
    # Check 2: Action must be in allowlist
    if ! echo "$ALLOWED_ACTIONS" | grep -Fxq "$ACTION_NAME"; then
      echo "[VIOLATION] Unallowed action used in $WORKFLOW: '$ACTION_NAME'"
      echo "            Action is not approved in $POLICY_FILE"
      VIOLATIONS=$((VIOLATIONS + 1))
      continue
    fi
    
    # Check 3: Ref MUST be a 40-character hexadecimal full commit SHA
    if ! [[ "$ACTION_REF" =~ ^[0-9a-fA-F]{40}$ ]]; then
      echo "[VIOLATION] Action ref is not a 40-char commit SHA in $WORKFLOW:"
      echo "            $USE_TARGET"
      echo "            Mutable tags (@vX) or branch names are strictly prohibited by Well-Architected governance."
      VIOLATIONS=$((VIOLATIONS + 1))
      continue
    fi
    
    echo "[OK] $WORKFLOW -> $ACTION_NAME@${ACTION_REF:0:7}"
    
  done < <(grep -E '^[[:space:]]*uses:[[:space:]]*[^[:space:]]+' "$WORKFLOW" || true)
done

echo "----------------------------------------------------------------------"
echo "[ACTIONS-POLICY] Total action invocations audited: $CHECKED"

if [ "$VIOLATIONS" -gt 0 ]; then
  echo "[FAILED] Detected $VIOLATIONS policy violations. Supply chain security gate failed."
  exit 1
else
  echo "[PASSED] 100% compliance with GitHub Well-Architected Actions Allowlist Policy."
  echo "======================================================================"
  exit 0
fi
