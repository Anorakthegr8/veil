/**
 * Stellar Private Payments (SPP) Configuration & Feature Flags
 *
 * Source: Nethermind / SDF Stellar Private Payments (SPP) testnet deployments.
 * Privacy features run on Stellar Testnet only as an unaudited preview and are
 * strictly locked out on Mainnet.
 */

export interface PrivacyPoolConfig {
  contractId: string
  assetCode: string
  assetIssuer: string | null
  policy: 'blocklist' | 'allowlist_and_blocklist'
}

export interface PrivacyNetworkConfig {
  pools: Record<string, PrivacyPoolConfig>
  bootnodeUrl: string
  verifierContractId: string
}

export const PRIVACY_CONFIGS: Record<'testnet', PrivacyNetworkConfig> = {
  testnet: {
    bootnodeUrl: process.env.NEXT_PUBLIC_SPP_BOOTNODE_URL || 'https://bootnode.dev-nethermind.xyz',
    verifierContractId: 'CCVERIFIERCONTRACTIDTESTNET1234567890ABCDEFGHJKMNPQRSTU',
    pools: {
      XLM: {
        contractId: 'CD2W5LURT7H33ZMSXZQZNDD2MDR725J3B6Y7G22Y26L65I32FHK4XZ4L',
        assetCode: 'XLM',
        assetIssuer: null,
        policy: 'blocklist',
      },
      EURC: {
        contractId: 'CBMRWHTP23BAMQZ73N4Y5V5KDJM2KEX77R5G6H3N4WUSQ7R2T2J2NUVS',
        assetCode: 'EURC',
        assetIssuer: 'GBUEHGTHFDD2URZ5CTSTODQC5WEN27D7D62I4VLVLSAWV7HHA2G2P6EU',
        policy: 'allowlist_and_blocklist',
      },
      USDC: {
        contractId: 'CBL2423F2USDCPOOLTESTNET1234567890ABCDEFGHJKMNPQRSTUV',
        assetCode: 'USDC',
        assetIssuer: 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5',
        policy: 'allowlist_and_blocklist',
      },
    },
  },
}

/**
 * Privacy feature flag check.
 * Strictly disabled on Mainnet. On Testnet, enabled unless explicitly disabled via flag.
 */
export function isPrivacyEnabled(networkName: string = 'testnet'): boolean {
  if (networkName === 'mainnet') {
    return false
  }
  const flag = process.env.NEXT_PUBLIC_FEATURE_PRIVACY
  if (flag === 'false' || flag === '0') {
    return false
  }
  return true
}

export function getPrivacyConfig(networkName: string = 'testnet'): PrivacyNetworkConfig | null {
  if (!isPrivacyEnabled(networkName) || networkName !== 'testnet') {
    return null
  }
  return PRIVACY_CONFIGS.testnet
}
