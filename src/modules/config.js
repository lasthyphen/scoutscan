export default {
  network: {
    ip: 'dijetsnet.uksouth.cloudapp.azure.com',
    protocol: 'https',
    networkId: 1,
    chainId: 'V',
    port: 443,
    cChainId: 98200,
    explorerApiBaseUrl: 'https://djtexplorer.uksouth.cloudapp.azure.com/',
    contract: '0x5bF457893AcB24A65317015598a784940949d1D5',
    endpointCChain: 'dijetsnet.uksouth.cloudapp.azure.com:443/ext/bc/U/ws',
    address: '0x6E04B23a9Fa424289A10eef126b04Dc13B38069c',
    admin: 'V-dijets1eg0gnn7q2uvk66kht7yqn8xtugz7uvutfk0txf',
    defaultSubnetID: '11111111111111111111111111111111LpoYY',
    coinApiBase: 'https://rest.coinapi.io/v1/assets/',
    endpointUrls: [
      { name: 'Dijets Mainnet', url: 'https://dijetsnet.uksouth.cloudapp.azure.com:443/', urlView: 'https://api.dijets.network/' },
      { name: 'Localhost', url: 'http://127.0.0.1:9650/', urlView: 'http://127.0.0.1:9650/' },
      { name: 'Lothar Testnet', url: 'https://testnet.northeurope.cloudapp.azure.com:443/', urlView: 'https://api.lothar.network' }
    ]
  }
}

// PROD
// cChainId: 43114,
// explorerApiBaseUrl: 'https://explorerapi.avax-dev.network/',
// contract: '0x95042281AF6566Fc6748f28263CeEecaEfB4D2B4',
// // endpointCChain: 'vscout.io/vscout-api/ext/bc/C/rpc',
// // endpointCChain: 'api.avax.network/ext/bc/C/ws',
// endpointCChain: 'vscout.io/ws',
// address: '0x4aBeF613822Fb2031D897E792f89C896dDaFC466',
// admin: 'X-avax18u9njlrvx76ap6rpdxsf27v7cawu278rw83yyf',

// DEV
// cChainId: 43113,
// explorerApiBaseUrl: 'https://explorerapi.avax-test.network/',
// contract: '0x8087A3b850Bd391315FefEC7a754e6024517beAE',
// endpointCChain: '127.0.0.1:9650/ext/bc/C/ws',
// address: '0x4aBeF613822Fb2031D897E792f89C896dDaFC466',
// admin: 'X-fuji18u9njlrvx76ap6rpdxsf27v7cawu278rz44mgk',
