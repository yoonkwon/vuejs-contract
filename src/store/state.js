let state = {
  web3: {
    isInjected: false,
    web3Instance: null,
    networkId: null,
    coinbase: null,
    balance: null,
    accounts: [],
    error: null
  },
  contract: {
    addresss: null,
    instance: null,
    raceId: null,
    currentStatus: null,
    totalBet: null,
    snails: [],
    error: null
  }
}
export default state
