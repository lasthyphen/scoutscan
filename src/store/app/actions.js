import {
  INIT_APP,
  SET_THEME,
  SET_ASSETS,
  GET_IN_OUT,
  GET_NODE_ID,
  GET_SUBNETS,
  GET_NODE_INFO,
  GET_STAKING,
  INIT_ENDPOINT,
  SET_STAKED_AVAX,
  GET_BLOCKCHAINS,
  GET_NODE_VERSIONS,
  SUBSCRIBE_TO_EVENT,
  GET_PENDING_STAKING,
  SET_NOTIFICATION_NODE,
  SET_DEFAULT_VALIDATORS,
  CLEAR_NOTIFICATIONS_LIST,
  ADD_TO_NOTIFICATIONS_LIST
} from './types'

import {
  GET_HEIGHT,
  GET_SUPPLY,
  SET_ASSETS_COUNT,
  SET_VALIDATORS,
  SET_DELEGATORS,
  SET_PENDING_VALIDATORS,
  SET_PENDING_DELEGATORS,
  GET_NODE_HEALTH,
  UPDATE_VALIDATOR,
  GET_AVAX_PRICE,
  GET_ASSETS_BY_BLOCKCHAINS
} from './../access/types'

import {
  SET_ENDPOINT,
  SET_CURRENT_BLOCKCHAIN
} from './../memory/types'

import {
  UPDATE_UI
} from './../ui/types'

import {
  _health,
  _getDefInfo,
  _getNodeId,
  _getStats,
  _getHeight,
  _getDefHeight,
  _validates,
  _getSubnets,
  _getAssetPrice,
  _getNetworkID,
  _getSupply,
  _getCurrentSupply,
  _getValidators,
  _getDefValidators,
  _getDefDelegators,
  _getNetworkName,
  _getNodeVersion,
  _getBlockchains,
  _getNodeVersions,
  _getAssets,
  _getBlockchainStatus,
  _getPendingValidators
} from './../../modules/network.js'

import {
  mapDelegators,
  mapPendingDelegations,
  mapDefaultValidators,
  mapPendingValidators,
  validatorProcessing,
  compareNotificationNode
} from './../../utils/validators.js'

const {
  network
} = require('./../../modules/config.js')
  .default
import { getAvaFromnAva } from './../../utils/avax.js'
import {
  _initializeNetwork,
  _getValidatorByEvent,
  _subscribeToContractEvents
} from './../../modules/networkCChain.js'

import {
  pChain
} from './../../modules/avalanche.js'

import {
  round
} from './../../utils/commons.js'

import {
  labelColors,
  versionNum
} from './../../utils/constants.js'

async function initApp (
  { dispatch, getters }) {
  try {
    await Promise.all([
      dispatch(GET_AVAX_PRICE),
      dispatch(INIT_ENDPOINT),
      dispatch(GET_NODE_VERSIONS),
      // dispatch(GET_NODE_ID, {}),
      dispatch(GET_NODE_INFO, {}),
      dispatch(GET_BLOCKCHAINS, {}),
      dispatch(GET_SUBNETS, {}),
      dispatch(GET_ASSETS_BY_BLOCKCHAINS),
      dispatch(GET_HEIGHT, {}),
      dispatch(GET_SUPPLY),
      _initializeNetwork(),
      dispatch(GET_STAKING, {
        subnetID: getters.subnetID
      }),
      dispatch(GET_IN_OUT)
    ]).then(() => dispatch(SUBSCRIBE_TO_EVENT))
  } catch (err) {
    await dispatch(INIT_APP)
  }

  setInterval(async () => {
    try {
      await Promise.all([
        dispatch(GET_STAKING, {
          subnetID: getters.subnetID,
          isInit: false
        }),
        dispatch(GET_AVAX_PRICE),
        dispatch(GET_IN_OUT),
        dispatch(GET_HEIGHT, {}),
        dispatch(GET_NODE_INFO, {})
        // dispatch(GET_NODE_ID, {})
      ])
    } catch (err) {
    }
  }, 30000)
}

async function initEndpoint (
  { commit, getters }) {
  try {
    const endpoint = getters.networkEndpoint
    if (!endpoint.url) throw new Error()
    if (endpoint.name === 'Dijets Mainnet') {
      const endpoint = network.endpointUrls[0]
      commit(SET_ENDPOINT, { endpoint })
    }

    const response = await _getNodeId({
      endpoint: endpoint.url
    })

    if (response.data.error) throw new Error()
  } catch (err) {
    const endpoint = network.endpointUrls[0]
    commit(SET_ENDPOINT, { endpoint })
  }
}

async function getValidators (
  { commit, getters, dispatch },
  {
    subnetID = network.defaultSubnetID,
    endpoint = getters.networkEndpoint.url,
    isInit = true,
    isIgnore = true
  }) {
  try {
    let pendingValidators = null
    if (
      endpoint === network.endpointUrls[0].url &&
      isIgnore &&
      subnetID === network.defaultSubnetID
    ) {
      // GET validators from server
      const response = await _getDefValidators()

      // GET validators from node API when server response error
      if (response.error) {
        dispatch(GET_STAKING, {
          subnetID,
          endpoint,
          isInit,
          isIgnore: false
        })
        commit(UPDATE_UI, { doesItConnect: true })
        return null
      }

      // GET pending validators from response
      pendingValidators = {
        data: {
          result: response.pendingValidators
        }
      }

      // GET info all info from response
      const {
        allStake,
        validators,
        validatedStake,
        delegatedStake
      } = response

      // GET current supply
      if (allStake !== getters.stakedAVAX) {
        dispatch(GET_SUPPLY)
      }

      // commit staking data
      commit(SET_STAKED_AVAX, {
        all: allStake,
        validatedStake,
        delegatedStake
      })

      // GET mapped validators
      const res = await mapDefaultValidators(
        validators,
        getters.defaultValidators,
        isInit
      )

      let rows = res.validators
      const arr = []
      arr.push(rows
        .find(a => (a.nodeID.toLowerCase() ===
         'NodeID-LbqzrSMKAssm5Ds2bJ8LPwymnGJbrybCN'.toLowerCase())))
      rows = rows
        .filter(a => a.nodeID !== 'NodeID-LbqzrSMKAssm5Ds2bJ8LPwymnGJbrybCN')
      rows = arr.concat(rows)

      // Commit data
      commit(SET_VALIDATORS, { validators: rows })

      commit(SET_DEFAULT_VALIDATORS, {
        defaultValidators: rows
      })

      // Check for new notifications
      if (getters.notificationNode.nodeID) {
        const currentValidator = getters
          .validatorById(getters.notificationNode.nodeID)
        let notifications = []
        if (!currentValidator && Number(getters.nodeInfo.networkID) === 1) {
          commit(CLEAR_NOTIFICATIONS_LIST)
          notifications.push({
            date: Date.now(),
            type: false,
            title: 'Expired Validator',
            icon: 'hourglass_disabled',
            message: 'The staking time of this node is over.'
          })
        } else {
          notifications = compareNotificationNode(getters.notificationNode, currentValidator)
          commit(SET_NOTIFICATION_NODE, { node: currentValidator })
        }
        commit(ADD_TO_NOTIFICATIONS_LIST, { notifications })
      }

      // GET mapped delagations
      const delegators = await _getDefDelegators()
      commit(SET_DELEGATORS, { delegators })
    } else {
      const response = await _getValidators({
        subnetID,
        endpoint
      })

      if (response.data.error) {
        commit(UPDATE_UI, { doesItConnect: true })
        return null
      }

      commit(UPDATE_UI, { doesItConnect: false })

      let { validators } = response.data.result
      if (typeof validators === 'undefined' ||
        validators === null) {
        validators = []
      }
      const delegators = {}
      let currentValidators = []
      if (subnetID === network.defaultSubnetID) {
        currentValidators = validators
      } else {
        currentValidators = getters
          .defaultValidators
          .filter(v => validators.find(val => val.nodeID === v.nodeID))
      }

      for (let i = 0; i < currentValidators.length; i++) {
        let d = currentValidators[i].delegators
        d = mapDelegators(d)
        const id = currentValidators[i].nodeID
        delegators[`${id}`] = d
      }

      commit(SET_DELEGATORS, { delegators })

      const res = await validatorProcessing(
        validators,
        getters.defaultValidators,
        isInit,
        getters.peers.peers
      )

      commit(SET_VALIDATORS, {
        validators: res.validators
      })

      if (res.allStake !== getters.stakedAVAX) {
        dispatch(GET_SUPPLY)
      }
      commit(SET_STAKED_AVAX, {
        all: res.allStake,
        validatedStake: res.validatedStake,
        delegatedStake: res.delegatedStake
      })

      if (getters.isDefaultSubnetID(subnetID)) {
        commit(SET_DEFAULT_VALIDATORS, {
          defaultValidators: res.validators
        })
      }
      if (getters.notificationNode.nodeID) {
        const currentValidator = res
          .validators
          .find(val => val.nodeID.includes(getters.notificationNode.nodeID))
        let notifications = []
        if (!currentValidator && Number(getters.nodeInfo.networkID) === 1) {
          commit(CLEAR_NOTIFICATIONS_LIST)
          notifications.push({
            date: Date.now(),
            type: false,
            title: 'Expired Validator',
            icon: 'hourglass_disabled',
            message: 'The staking time of this node is over.'
          })
        } else {
          notifications = compareNotificationNode(getters.notificationNode, currentValidator)
          commit(SET_NOTIFICATION_NODE, { node: currentValidator })
        }
        commit(ADD_TO_NOTIFICATIONS_LIST, { notifications })
      }
    }
    // Commited pending validators
    dispatch(GET_PENDING_STAKING, { pendingValidators })
  } catch (err) {
    console.log(err)
  }
}

async function getStakeStats (
  { commit }) {
  const response = await _getStats()

  if (typeof response === 'undefined' ||
    response === null) return

  if (response.error) return

  const { incomingVal, incomingDel, outcomingVal, outcomingDel } = response
  commit(GET_IN_OUT, { incomingVal, incomingDel, outcomingVal, outcomingDel })
}

async function getPValidators (
  { commit, getters },
  {
    subnetID = getters.subnetID,
    endpoint = getters.networkEndpoint.url,
    pendingValidators
  }) {
  let response = pendingValidators
  if (!pendingValidators) {
    response = await _getPendingValidators({
      subnetID,
      endpoint
    })
    if (response.data.error) return null
  }

  let { validators, delegators } = response.data.result

  if (typeof validators === 'undefined' ||
      validators === null) validators = []

  const mapPDelInfo = mapPendingDelegations(delegators)
  commit(SET_PENDING_DELEGATORS, { delegators: mapPDelInfo.pendingDelegations })

  const val = mapPendingValidators(
    validators,
    getters.defaultValidators
  )

  commit(SET_PENDING_VALIDATORS, {
    validators: val.pendingValidators
  })
}

async function getHeight (
  { commit, getters, dispatch },
  { endpoint = getters.networkEndpoint.url, isIgnore = true }) {
  let response = {}
  if (endpoint === network.endpointUrls[0].url && isIgnore) {
    response = await _getDefHeight()
    if (response.data.error) {
      dispatch(GET_HEIGHT, { endpoint, isIgnore: false })
    }
  } else {
    response = await _getHeight({
      endpoint
    })
  }
  if (typeof response === 'undefined' ||
    response === null) return

  if (response.data.error) return

  const height = response.data.result.height

  commit(GET_HEIGHT, { height })
}

async function getSubnets (
  { commit, getters },
  { endpoint = getters.networkEndpoint.url }) {
  const response = await _getSubnets({
    endpoint
  })
  if (response.data.error) return null

  const { subnets } = response.data.result
  if (typeof subnets === 'undefined' ||
    subnets === null) return

  if (subnets.length === getters.subnets.length) return

  const result = Promise.all(subnets.map(async subnet => {
    const response = await _validates({
      endpoint,
      params: {
        subnetID: subnet.id
      }
    })

    if (response.data.error) return
    const blockchainsId = response
      .data.result.blockchainIDs

    return {
      ...subnet,
      blockchainsId
    }
  }))

  commit(GET_SUBNETS, { subnets: await result })
}

async function getNodeId (
  { getters, commit }) {
  console.log(getters.networkEndpoint.url)
  const response = await _getNodeId({
    endpoint: getters.networkEndpoint.url
  })

  if (response.data.error) {
    commit(UPDATE_UI, { doesItConnect: true })
    return
  }
  if (typeof response === 'undefined' ||
    response === null) return

  commit(UPDATE_UI, { doesItConnect: false })
  const nodeID = response.data.result.nodeID
  console.log(response.data.result.nodeID)
  commit(GET_NODE_ID, { nodeID })
}

async function getNodeInfo (
  { getters, commit, dispatch }, { isIgnore = true }) {
  if (getters.networkEndpoint.url === network.endpointUrls[0].url && isIgnore) {
    const response = await _getDefInfo()
    if (response.error) {
      dispatch(GET_NODE_INFO, { isIgnore: false })
      commit(UPDATE_UI, { doesItConnect: true })
      return
    }

    const nodeInfo = {
      networkID: response.data.result.networkID,
      networkName: response.data.result.networkName,
      nodeVersion: response.data.result.version
    }

    const nodeID = response.data.result.nodeID
    commit(GET_NODE_ID, { nodeID })

    commit(GET_NODE_HEALTH, {
      nodeID: getters.nodeID,
      nodeHealth: response.data.result.health
    })

    commit(GET_NODE_INFO, { nodeInfo })
  } else {
    try {
      const resAll = await Promise.all([
        _getNetworkID({
          endpoint: getters.networkEndpoint.url
        }),
        _getNetworkName({
          endpoint: getters.networkEndpoint.url
        }),
        _getNodeVersion({
          endpoint: getters.networkEndpoint.url
        })
      ])
      commit(UPDATE_UI, { doesItConnect: false })
      const nodeInfo = {}
      resAll
        .map(r => r.data.result)
        .forEach(res => {
          nodeInfo[Object.keys(res)] = Object.values(res)[0]
        })
      commit(GET_NODE_INFO, { nodeInfo })
      dispatch(GET_NODE_HEALTH)
    } catch (err) {
      console.log(err)
      commit(UPDATE_UI, { doesItConnect: true })
    }
  }
}

function getAvaxPrice (
  { commit }) {
  _getAssetPrice('AVAX')
    .then((avaxPrice) => {
      if (!avaxPrice) return
      commit(GET_AVAX_PRICE, { avaxPrice })
    })
    .catch((err) => console.log(err))
}

async function getNodeVersions (
  { commit }) {
  try {
    const { stakeInfo } = await _getNodeVersions()
    let allCount = 0
    let nodesVersions = []
    for (const info of stakeInfo) {
      if (!info) return
      let { version, nodeCount, stakeAmount } = info
      stakeAmount = round(stakeAmount, 1000)
      let color = labelColors[`${version}`]
      if (!color) color = '#ffffff'
      allCount += Number(nodeCount)
      const stake = getAvaFromnAva(stakeAmount)
      nodesVersions.push({ version, count: nodeCount, stake, color })
    }
    nodesVersions = nodesVersions.sort(compare)
    nodesVersions.all = allCount
    commit(GET_NODE_VERSIONS, { nodesVersions })
  } catch (err) {
  }
}

function compare (a, b) {
  const aNum = versionNum[`${a.version}`]
  const bNum = versionNum[`${b.version}`]
  return bNum - aNum
}

async function getNodeHealth (
  { commit, getters }) {
  const response = await _health({
    endpoint: getters.networkEndpoint.url
  })
  if (typeof response === 'undefined' ||
    response === null) return

  let doesItConnect = true
  let nodeHealth = { healthy: false }
  if (!response.data.error) {
    doesItConnect = false
    nodeHealth = response.data.result
  }

  commit(GET_NODE_HEALTH, {
    nodeID: getters.nodeID,
    nodeHealth
  })
  commit(UPDATE_UI, { doesItConnect })
}

async function getBlockchains (
  { commit, getters },
  { endpoint = getters.networkEndpoint.url }) {
  const response = await _getBlockchains({ endpoint })
  if (response.data.error) return null

  let { blockchains } = response.data.result

  if (typeof blockchains === 'undefined' ||
    blockchains === null) return

  if ((blockchains.length + 1) === getters.blockchains.length) return

  blockchains.push({
    id: network.defaultSubnetID,
    subnetID: network.defaultSubnetID,
    vmID: '',
    name: 'M-Chain'
  })

  blockchains = await Promise.all(blockchains
    .map(async b => {
      const res = await _getBlockchainStatus({
        endpoint,
        params: {
          blockchainID: b.id
        }
      })
      if (res.data.error) return b
      return {
        ...b,
        status: res.data.result.status
      }
    })
  )

  commit(GET_BLOCKCHAINS, { blockchains })
  if (!getters.currentBlockchain.id) {
    const xChain = blockchains.find(b => b.name === 'Value Chain')
    commit(SET_CURRENT_BLOCKCHAIN, { blockchain: xChain })
  }
}

async function getAssetsCount (
  { commit }) {
  const { count, assets } = await _getAssets()
  commit(SET_ASSETS_COUNT, { assetsCount: count })
  commit(SET_ASSETS, { assets })
}

async function getSupply (
  { commit, getters }) {
  try {
    const subnetID = network.defaultSubnetID
    const endpoint = getters.networkEndpoint.url
    let currentSupply = 0
    let totalSupply = 0
    let response = await _getSupply()
    if (!response) {
      response = await _getCurrentSupply({ subnetID, endpoint })
      if (response.data && response.data.result) {
        currentSupply = response.data.result.supply
      } else {
        const cS = await pChain(
          getters.networkEndpoint,
          getters.nodeInfo.networkID
        )
          .getCurrentSupply()
        if (cS) currentSupply = cS
      }
      totalSupply = currentSupply
    } else {
      currentSupply = response.currentSupply
      totalSupply = response.totalSupply
    }

    commit(GET_SUPPLY, { currentSupply, totalSupply })
  } catch (err) {
    console.error(err)
  }
}

function subscribeToEvents ({ commit, dispatch, getters }) {
  const sentMessageHandler = async (error, result) => {
    if (error) console.error(error)
    try {
      const validator = _getValidatorByEvent(result)
      commit(UPDATE_VALIDATOR, { validator })
    } catch (err) {
      console.error(err)
      await dispatch(GET_STAKING, {
        subnetID: getters.subnetID,
        isInit: true
      })
    }
  }

  _subscribeToContractEvents({
    eventName: 'SetValidatorInfoEvent',
    filters: {},
    handler: sentMessageHandler
  })
}

function setTheme ({ commit }, themeName) {
  commit(SET_THEME, { themeName })
}

export default {
  [INIT_APP]: initApp,
  [GET_HEIGHT]: getHeight,
  [GET_NODE_ID]: getNodeId,
  [SET_THEME]: setTheme,
  [GET_IN_OUT]: getStakeStats,
  [GET_SUBNETS]: getSubnets,
  [GET_NODE_INFO]: getNodeInfo,
  [INIT_ENDPOINT]: initEndpoint,
  [GET_STAKING]: getValidators,
  [GET_AVAX_PRICE]: getAvaxPrice,
  [GET_NODE_HEALTH]: getNodeHealth,
  [GET_NODE_VERSIONS]: getNodeVersions,
  [GET_BLOCKCHAINS]: getBlockchains,
  [GET_SUPPLY]: getSupply,
  [GET_PENDING_STAKING]: getPValidators,
  [SUBSCRIBE_TO_EVENT]: subscribeToEvents,
  [GET_ASSETS_BY_BLOCKCHAINS]: getAssetsCount
}
