
let applyWeb3 = (web3, result)=>{
  web3.coinbase = result.coinbase
  web3.networkId = result.networkId
  web3.balance = parseInt(result.balance, 10)
  web3.isInjected = result.injectedWeb3
  web3.accounts = result.accounts
  web3.web3Instance = result.web3
  return web3
}

let applyContract = (contract, result)=>{
  contract.addresss = result.address
  contract.raceId = result.raceId
  contract.currentStatus = result.currentStatus
  contract.instance = result.instance
  return contract
}

export default {
  initWeb3Contract (state, payload){
    console.log(payload)
    let web3 = Object.assign({}, state.web3)
    let contract = Object.assign({}, state.contract)
    state.web3 = applyWeb3(web3, payload.web3)
    state.contract = applyContract(contract, payload.contract)
    console.log(web3, contract)
  },

  registerWeb3Instance (state, payload) {
    console.log('registerWeb3instance Mutation being executed', payload)
    let result = payload
    let web3Copy = Object.assign({}, state.web3)
    web3Copy.coinbase = result.coinbase
    web3Copy.networkId = result.networkId
    web3Copy.balance = parseInt(result.balance, 10)
    web3Copy.isInjected = result.injectedWeb3
    web3Copy.accounts = result.accounts
    web3Copy.web3Instance = result.web3
    state.web3 = web3Copy
  },
  registerContractInstance (state, payload) {
    console.log('contract Mutation beging executed', payload)
    let result = payload
    let contract = Object.assign({}, state.contract)
    contract.addresss = result.address
    contract.raceId = result.raceId
    contract.currentStatus = result.currentStatus
    contract.instance = result.instance
    state.contract = contract
  }
}
