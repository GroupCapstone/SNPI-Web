# GitHub Actions Private Networking & VNet Injection Architecture

> Authoritative architectural specification for connecting GitHub Actions hosted larger runners to private Azure VNets, internal databases, and on-premises infrastructure.

---

## 1. Executive Architecture

- **VNet Injection Model**: Runner virtual machine instances execute inside GitHub-managed infrastructure, while runner Network Interface Cards (NICs) are dynamically injected into a delegated customer Azure VNet subnet (`snet-snp-github-runners`).
- **Subnet Delegation**: Subnet is delegated to `GitHub.Network/networkSettings`.
- **Zero Public Ingress**: No public IP addresses, NAT port forwarding, or internet-facing gateways are required to access internal services.
- **On-Premises Transit**: Outbound traffic to on-premise infrastructure routes through customer Azure ExpressRoute or Site-to-Site VPN Gateway.

---

## 2. Subnet Sizing Invariant

$$\text{Usable Subnet IPs} \ge \text{Maximum Concurrency} \times 1.20$$

- Current SNP-SMS Subnet: `10.240.1.0/24` (256 total IPs - 5 Azure reserved = 251 usable IPs).
- Current Max Concurrency: 100 runners -> Required capacity with 20% burst buffer: 120 IPs.
- Safety Margin: +131 excess IPs.

---

## 3. Egress Security Standards

Outbound internet traffic is inspected by Azure Firewall with FQDN Application Rules:

- `github.com`, `*.github.com`, `*.githubusercontent.com`, `*.blob.core.windows.net`
- `ghcr.io`, `*.ghcr.io`, `*.githubassets.com`
- `github-cloud.s3.amazonaws.com`

---

## 4. Verification

```bash
# Execute automated private networking configuration audit
npm run verify:private-network
```
