export const c = {
  // enpoints
  cChainWs: 'ext/U/ws',
  listAssests: 'v2/assets',
  nodeVersions: 'validators',
  getTxApi: (id) => `v2/transactions/${id}`,
  assestById: (id) => `v2/assets/${id}`,
  assetsWithOffset: (offset) => `v2/assets?offset=${offset}&limit=100`,

  // INFO API
  info: 'ext/info',
  getNodeID: 'info.getNodeID',
  getNetworkID: 'info.getNetworkID',
  getNetworkName: 'info.getNetworkName',
  getNodeVersion: 'info.getNodeVersion',
  peers: 'info.peers',

  // HEALTH API
  health: 'ext/health',
  getLiveness: 'health.readiness',

  // EVM API
  evm: (id) => 'ext/bc/U/rpc',
  ethBlockNumber: 'eth_blockNumber',
  ethChainID: 'eth_chainId',
  ethNetVersion: 'net_version',

  // PLATFORM API
  platform: 'ext/M',
  platformBc: 'ext/bc/M',
  getTx: 'platform.getTx',
  getUtxos: 'platform.getUTXOs',
  validates: 'platform.validates',
  getHeight: 'platform.getHeight',
  getSubnets: 'platform.getSubnets',
  getTxStatus: 'platform.getTxStatus',
  getBalance: 'platform.getBalance',
  getTotalStake: 'platform.getTotalStake',
  getStake: 'platform.getStake',
  getBlockchains: 'platform.getBlockchains',
  getBlockchainStatus: 'platform.getBlockchainStatus',
  getCurrentValidators: 'platform.getCurrentValidators',
  getPendingValidators: 'platform.getPendingValidators',
  getCurrentSupply: 'platform.getCurrentSupply',

  jsonrpc: '2.0',
  contentTypeValue: 'application/json',
  contentTypeHeader: 'content-type',
  cacheControlValue: 'no-cache',
  cacheControlHeader: 'cache-control'
}

//  Denominations of value
export const NanoDjtx = 1
export const MicroDjtx = 1000 * NanoDjtx
export const Schmeckle = 49 * MicroDjtx + 463 * NanoDjtx
export const MilliDjtx = 1000 * MicroDjtx
export const Djtx = 1000 * MilliDjtx
export const KiloDjtx = 1000 * Djtx
export const MegaDjtx = 1000 * KiloDjtx

// SupplyCap is the maximum amount of AVAX that should ever exist
export const SupplyCap = 111 * MegaDjtx

// MaxSubMinConsumptionRate is the % consumption that incentivizes staking
export const maxSubMinConsumptionRate = 20000 // 2%

// MinConsumptionRate is the minimum % consumption of the remaining tokens
// to be minted
export const minConsumptionRate = 100000 // 10%

export const PercentDenominator = 1000000

// MaximumStakingDuration is the longest amount of time a staker can bond
// their funds for.
export const maximumStakingDuration = 365 * 24 * 60

// Stake duration
export const stakeDuration = (stakeTime) => stakeTime * 24 * 60

export const GENEZIS_ID = '2U4xzjHGnxXKWzFKqVZVMEnnepKFRNcBC75346X129Nj7uzyP1'

// messages
export const successTxHash = (txHash) => `Transaction hash is ${txHash}. Your transaction is being broadcasted to the blockchain! Please hold on!`
export const errorNodeID = 'Something Wrong! Check if your connection endpoint is healthy and synced with the network OR non-existent validator!'

export const VMDict = {
  '': {
    name: 'platformvm',
    documentation: 'https://docs.avax.network/v1.0/en/api/platform/'
  },
  jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq: {
    name: 'avm',
    documentation: 'https://docs.avax.network/v1.0/en/api/avm/'
  },
  mgj786NP7uDwBCcq6YwThhaN8FLyybkCa4zBWTQbNgmK6k9A6: {
    name: 'evm',
    documentation: 'https://docs.avax.network/v1.0/en/api/evm/'
  },
  tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH: {
    name: 'timestampvm',
    documentation: 'https://docs.avax.network/v1.0/en/api/timestamp/'
  },
  sqjchUjzDqDfBPGjfQq2tXW1UCwZTyvzAWHsNzF2cb1eVHt6w: {
    name: 'spchainvm',
    documentation: 'https://docs.avax.network/v1.0/en/core-concepts/overview/#what-are-virtual-machines'
  },
  sqjdyTKUSrQs1YmKDTUbdUhdstSdtRTGRbUn8sqK8B6pkZkz1: {
    name: 'spdagvm',
    documentation: 'https://docs.avax.network/v1.0/en/core-concepts/overview/#what-are-virtual-machines'
  }
}

export const currencies = {
  aed: { symbol: 'د.إ', currency: 'United Arab Emirates dirham', isoCode: 'AED' },
  ars: { symbol: 'AR$', currency: 'Argentine peso', isoCode: 'ARS' },
  aud: { symbol: 'AU$', currency: 'Australian dollar', isoCode: 'AUD' },
  bch: { symbol: 'BCH', currency: 'Bitcoin Cash', isoCode: 'BCH' },
  bdt: { symbol: '৳', currency: 'Bangladeshi taka', isoCode: 'BDT' },
  bhd: { symbol: '.د.ب', currency: 'Bahraini dinar', isoCode: 'BHD' },
  bmd: { symbol: 'BM$', currency: 'Bermudian dollar', isoCode: 'BMD' },
  bnb: { symbol: 'BNB', currency: 'Binance Coin', isoCode: 'BNB' },
  brl: { symbol: 'R$', currency: 'Brazilian real', isoCode: 'BRL' },
  btc: { symbol: 'BTC', currency: 'Bitcoin', isoCode: 'BTC' },
  cad: { symbol: 'CA$', currency: 'Canadian dollar', isoCode: 'CAD' },
  chf: { symbol: 'Fr.', currency: 'Swiss franc', isoCode: 'CHF' },
  clp: { symbol: 'CL$', currency: 'Chilean peso', isoCode: 'CLP' },
  cny: { symbol: '¥', currency: 'Chinese yuan', isoCode: 'CNY' },
  czk: { symbol: 'Kč', currency: 'Czech koruna', isoCode: 'CZK' },
  dkk: { symbol: 'kr', currency: 'Danish krone', isoCode: 'DKK' },
  dot: { symbol: 'DOT', currency: 'Polkadot', isoCode: 'DOT' },
  eos: { symbol: 'EOS', currency: 'EOS', isoCode: 'EOS' },
  eth: { symbol: 'ETH', currency: 'Ethereum', isoCode: 'ETH' },
  eur: { symbol: '€', currency: 'Euro', isoCode: 'EUR' },
  gbp: { symbol: '£', currency: 'British pound', isoCode: 'GBP' },
  hkd: { symbol: 'HK$', currency: 'Hong Kong dollar', isoCode: 'HKD' },
  huf: { symbol: 'Ft', currency: 'Hungarian forint', isoCode: 'HUF' },
  idr: { symbol: 'Rp', currency: 'Indonesian rupiah', isoCode: 'IDR' },
  ils: { symbol: '₪', currency: 'Israeli new shekel', isoCode: 'ILS' },
  inr: { symbol: '₹', currency: 'Indian rupee', isoCode: 'INR' },
  jpy: { symbol: '¥', currency: 'Japanese yen', isoCode: 'JPY' },
  krw: { symbol: '₩', currency: 'South Korean won', isoCode: 'KRW' },
  kwd: { symbol: 'د.ك', currency: 'Kuwaiti dinar', isoCode: 'KWD' },
  link: { symbol: 'LINK', currency: 'Chainlink', isoCode: 'LINK' },
  lkr: { symbol: 'Rs', currency: 'Sri Lankan rupee', isoCode: 'LKR' },
  ltc: { symbol: 'LTC', currency: 'Litecoin', isoCode: 'LTC' },
  mmk: { symbol: 'Ks', currency: 'Burmese kyat', isoCode: 'MMK' },
  mxn: { symbol: 'MX$', currency: 'Mexican peso', isoCode: 'MXN' },
  myr: { symbol: 'RM', currency: 'Malaysian ringgit', isoCode: 'MYR' },
  ngn: { symbol: '₦', currency: 'Nigerian naira', isoCode: 'NGN' },
  nok: { symbol: 'kr', currency: 'Norwegian krone', isoCode: 'NOK' },
  nzd: { symbol: 'NZ$', currency: 'New Zealand dollar', isoCode: 'NZD' },
  php: { symbol: '₱', currency: 'Philippine peso', isoCode: 'PHP' },
  pkr: { symbol: '₨', currency: 'Pakistani rupee', isoCode: 'PKR' },
  pln: { symbol: 'zł', currency: 'Polish złoty', isoCode: 'PLN' },
  rub: { symbol: '₽', currency: 'Russian ruble', isoCode: 'RUB' },
  sar: { symbol: '﷼', currency: 'Saudi riyal', isoCode: 'SAR' },
  sek: { symbol: 'kr', currency: 'Swedish krona', isoCode: 'SEK' },
  sgd: { symbol: 'SG$', currency: 'Singapore dollar', isoCode: 'SGD' },
  thb: { symbol: '฿', currency: 'Thai baht', isoCode: 'THB' },
  try: { symbol: '₺', currency: 'Turkish lira', isoCode: 'TRY' },
  twd: { symbol: 'TW$', currency: 'New Taiwan dollar', isoCode: 'TWD' },
  uah: { symbol: '₴', currency: 'Ukrainian hryvnia', isoCode: 'UAH' },
  usd: { symbol: 'US$', currency: 'United States dollar', isoCode: 'USD' },
  vef: { symbol: 'VEF', currency: 'VEF', isoCode: 'VEF' },
  vnd: { symbol: '₫', currency: 'Vietnamese đồng', isoCode: 'VND' },
  xag: { symbol: 'XAG', currency: 'Xrpalike Gene', isoCode: 'XAG' },
  xau: { symbol: 'XAU', currency: 'Xaucoin', isoCode: 'XAU' },
  xdr: { symbol: 'XDR', currency: 'Xandereum', isoCode: 'XDR' },
  xlm: { symbol: 'XLM', currency: 'Stellar', isoCode: 'XLM' },
  xrp: { symbol: 'XRP', currency: 'XRP', isoCode: 'XRP' },
  yfi: { symbol: 'YFI', currency: 'Yearn.finance', isoCode: 'YFI' },
  zar: { symbol: 'R', currency: 'South African rand', isoCode: 'ZAR' }
}

export const labelColors = {
  offline: '#e6e6e6',
  'avalanche/1.8.0': '#94F7B2',
  'avalanche/1.8.1': '#c7f0e9',
  'avalanche/1.8.2': '#31696b',
  'avalanche/1.8.3': '#8BEEC9',
  'avalanche/1.8.4': '#e3d8eb',
  'avalanche/1.8.5': '#93E3D5',
  'avalanche/1.8.6': '#a263c7',
  'avalanche/1.8.7': '#ffffff',
  'avalanche/1.8.8': '#eebf8a',
  'avalanche/1.9.0': '#fafbff',
  'avalanche/1.9.1': '#8BEEC9',
  'avalanche/1.9.2': '#94F7B2',
  'avalanche/1.9.3': '#93E3D5',
  'avalanche/1.9.4': '#e3d8eb',
  'avalanche/1.9.5': '#31696b'
}

export const versionNum = {
  offline: 0,
  'avalanche/1.8.0': 1,
  'avalanche/1.8.1': 2,
  'avalanche/1.8.2': 3,
  'avalanche/1.8.3': 4,
  'avalanche/1.8.4': 5,
  'avalanche/1.8.5': 6,
  'avalanche/1.8.6': 7,
  'avalanche/1.8.7': 8,
  'avalanche/1.8.8': 9,
  'avalanche/1.9.0': 10,
  'avalanche/1.9.1': 11,
  'avalanche/1.9.2': 12,
  'avalanche/1.9.3': 13,
  'avalanche/1.9.4': 14,
  'avalanche/1.9.5': 15
}
