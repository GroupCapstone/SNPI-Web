@description('Azure Region for resource deployment')
param location string = resourceGroup().location

@description('Virtual Network Name')
param vnetName string = 'vnet-github-runners'

@description('Virtual Network Address Prefix')
param vnetAddressPrefix string = '10.240.0.0/16'

@description('Subnet Name for GitHub Runner NIC Injection')
param subnetName string = 'snet-github-runners'

@description('Subnet Address Prefix. Capacity must satisfy: Usable IPs >= MaxConcurrency * 1.20')
param subnetAddressPrefix string = '10.240.1.0/24'

@description('Network Security Group Name')
param nsgName string = 'nsg-github-runners'

resource nsg 'Microsoft.Network/networkSecurityGroups@2023-09-01' = {
  name: nsgName
  location: location
  properties: {
    securityRules: [
      {
        name: 'AllowGitHubHTTPSOutbound'
        properties: {
          priority: 100
          direction: 'Outbound'
          access: 'Allow'
          protocol: 'Tcp'
          sourcePortRange: '*'
          destinationPortRange: '443'
          sourceAddressPrefix: '*'
          destinationAddressPrefix: 'Internet'
        }
      }
      {
        name: 'AllowPrivateVNetOutbound'
        properties: {
          priority: 200
          direction: 'Outbound'
          access: 'Allow'
          protocol: '*'
          sourcePortRange: '*'
          destinationPortRange: '*'
          sourceAddressPrefix: '*'
          destinationAddressPrefix: 'VirtualNetwork'
        }
      }
      {
        name: 'DenyAllInbound'
        properties: {
          priority: 1000
          direction: 'Inbound'
          access: 'Deny'
          protocol: '*'
          sourcePortRange: '*'
          destinationPortRange: '*'
          sourceAddressPrefix: '*'
          destinationAddressPrefix: '*'
        }
      }
    ]
  }
}

resource vnet 'Microsoft.Network/virtualNetworks@2023-09-01' = {
  name: vnetName
  location: location
  properties: {
    addressSpace: {
      addressPrefixes: [
        vnetAddressPrefix
      ]
    }
    subnets: [
      {
        name: subnetName
        properties: {
          addressPrefix: subnetAddressPrefix
          networkSecurityGroup: {
            id: nsg.id
          }
          delegations: [
            {
              name: 'GitHubNetworkDelegation'
              properties: {
                serviceName: 'GitHub.Network/networkSettings'
              }
            }
          ]
        }
      }
    ]
  }
}

output subnetId string = resourceId('Microsoft.Network/virtualNetworks/subnets', vnetName, subnetName)
output vnetId string = vnet.id
output nsgId string = nsg.id
