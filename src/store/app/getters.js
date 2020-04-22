export function validators (state) {
  return state.validators
}

export function blockchains (state) {
  return state.blockchains
}

export function lastBlock (state) {
  return state.lastBlock
}

export function blockTime (state) {
  return state.blockTime
}

export function subnetID (state) {
  return state.subnetID
}

export function avarageBlockTime (state) {
  const sum = state.lastBlockTime.reduce((a, b) => a + b, 0)
  return (sum / state.lastBlockTime.length) || 0
}
