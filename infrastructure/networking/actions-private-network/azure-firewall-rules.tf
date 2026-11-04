# Terraform Configuration for GitHub Actions Private Networking Azure Firewall Rules

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.80"
    }
  }
}

variable "resource_group_name" {
  type        = string
  description = "Name of the resource group containing the Azure Firewall"
}

variable "firewall_policy_name" {
  type        = string
  description = "Name of the Azure Firewall Policy"
}

resource "azurerm_firewall_policy_rule_collection_group" "github_runners" {
  name               = "rg-github-runners-egress"
  firewall_policy_id = data.azurerm_firewall_policy.main.id
  priority           = 200

  application_rule_collection {
    name     = "github-actions-essential-fqdns"
    priority = 210
    action   = "Allow"

    rule {
      name = "github-core-telemetry"
      protocols {
        type = "Https"
        port = 443
      }
      source_addresses  = ["10.240.1.0/24"]
      destination_fqdns = [
        "github.com",
        "*.github.com",
        "*.githubusercontent.com",
        "*.blob.core.windows.net"
      ]
    }

    rule {
      name = "github-packages-and-cache"
      protocols {
        type = "Https"
        port = 443
      }
      source_addresses  = ["10.240.1.0/24"]
      destination_fqdns = [
        "ghcr.io",
        "*.ghcr.io",
        "*.githubassets.com"
      ]
    }

    rule {
      name = "github-git-lfs"
      protocols {
        type = "Https"
        port = 443
      }
      source_addresses  = ["10.240.1.0/24"]
      destination_fqdns = [
        "github-cloud.s3.amazonaws.com"
      ]
    }
  }

  network_rule_collection {
    name     = "github-runners-internal-traffic"
    priority = 220
    action   = "Allow"

    rule {
      name                  = "allow-internal-vnet"
      protocols             = ["TCP", "UDP"]
      source_addresses      = ["10.240.1.0/24"]
      destination_addresses = ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"]
      destination_ports     = ["*"]
    }
  }
}

data "azurerm_firewall_policy" "main" {
  name                = "fw-policy-enterprise"
  resource_group_name = var.resource_group_name
}
