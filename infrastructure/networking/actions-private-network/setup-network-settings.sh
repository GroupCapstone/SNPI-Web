#!/usr/bin/env bash
# ==============================================================================
# Script: setup-network-settings.sh
# Purpose: Automate Azure Private Networking setup for GitHub Actions
# ==============================================================================
set -euo pipefail

RESOURCE_GROUP="${1:-rg-github-runners}"
LOCATION="${2:-eastus}"
VNET_NAME="${3:-vnet-github-runners}"
SUBNET_NAME="${4:-snet-github-runners}"
GITHUB_ORG="${5:-my-enterprise-org}"

echo "------------------------------------------------------------"
echo "GitHub Actions Azure Private Networking Setup"
echo "------------------------------------------------------------"

# Step 1: Register GitHub.Network Resource Provider
echo "[1/4] Registering resource provider: GitHub.Network..."
az provider register --namespace GitHub.Network

while true; do
  STATUS=$(az provider show --namespace GitHub.Network --query "registrationState" -o tsv)
  if [[ "$STATUS" == "Registered" ]]; then
    echo "[PASSED] GitHub.Network is registered."
    break
  fi
  echo "Current state: $STATUS. Waiting 10s..."
  sleep 10
done

# Step 2: Retrieve Delegated Subnet ID
echo "[2/4] Resolving delegated subnet ID..."
SUBNET_ID=$(az network vnet subnet show \
  --resource-group "$RESOURCE_GROUP" \
  --vnet-name "$VNET_NAME" \
  --name "$SUBNET_NAME" \
  --query "id" -o tsv)

if [[ -z "$SUBNET_ID" ]]; then
  echo "[ERROR] Subnet $SUBNET_NAME not found in VNet $VNET_NAME."
  exit 1
fi
echo "Subnet ID: $SUBNET_ID"

# Step 3: Fetch GitHub Business ID via GraphQL
echo "[3/4] Fetching GitHub Enterprise/Organization databaseId..."
if ! command -v gh &> /dev/null; then
  echo "[ERROR] GitHub CLI ('gh') is required to query GraphQL API."
  exit 1
fi

BUSINESS_ID=$(gh api graphql -f query="
query {
  organization(login: \"$GITHUB_ORG\") {
    databaseId
  }
}" --jq '.data.organization.databaseId')

if [[ -z "$BUSINESS_ID" || "$BUSINESS_ID" == "null" ]]; then
  echo "[ERROR] Could not resolve databaseId for organization: $GITHUB_ORG"
  exit 1
fi
echo "Resolved GitHub Business ID: $BUSINESS_ID"

# Step 4: Create GitHub.Network/networkSettings Resource
NETWORK_SETTINGS_NAME="gh-net-settings-${GITHUB_ORG}"
echo "[4/4] Creating Azure resource: GitHub.Network/networkSettings/$NETWORK_SETTINGS_NAME..."

az resource create \
  --resource-type "GitHub.Network/networkSettings" \
  --name "$NETWORK_SETTINGS_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --properties "{
    \"location\": \"$LOCATION\",
    \"properties\": {
      \"businessId\": \"$BUSINESS_ID\",
      \"subnetId\": \"$SUBNET_ID\"
    }
  }" \
  --is-full-object

echo "------------------------------------------------------------"
echo "[SUCCESS] GitHub.Network/networkSettings configured successfully."
echo "Configure Hosted Compute Networking in GitHub Settings -> Actions -> Runner groups."
echo "------------------------------------------------------------"
