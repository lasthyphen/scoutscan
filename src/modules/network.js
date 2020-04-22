import axios from 'axios'
const { network } = require('./config').default

// enpoints
const timestamp = 'ext/bc/timestamp'
const platform = 'ext/P'

// methods
const getBlock = 'timestamp.getBlock'
const getBlockchains = 'platform.getBlockchains'
const getCurrentValidators = 'platform.getCurrentValidators'

let id = 1
const jsonrpc = '2.0'
axios.defaults.headers['content-type'] = 'application/json'

const body = (method, params = {}) => {
  return {
    jsonrpc,
    method,
    params,
    id: id++
  }
}

export const request = async (endpoint, body) => {
  const response = await axios.post(endpoint, body)
  return response.data.result
}

export const _getBlock = async (params = {}) => {
  return request(network.endpointUrl + timestamp, body(getBlock, params))
}

export const _getBlockchains = async () => {
  return request(network.endpointUrl + platform, body(getBlockchains))
}

export const _getValidators = async ({ subnetID }) => {
  return request(network.endpointUrl + platform, body(getCurrentValidators, { subnetID }))
}