import Web3 from 'web3'

const PROVIDER = process.env.PROVIDER || 'http://54.70.197.104:8545'
/*
* 1. Check for injected web3 (mist/metamask)
* 2. If metamask/mist create a new web3 instance and pass on result
* 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
* 4. Get user account from metamask
* 5. Get user balance
*/

let getWeb3 = new Promise((resolve, reject) => {
  // Check for injected web3 (mist/metamask)
  let web3js = window.web3
  if (typeof web3js !== 'undefined') {
    let web3 = new Web3(PROVIDER)
    return web3.eth.net.isListening().then((result) => {
      resolve({
        injectedWeb3: result,
        web3() {
          return web3
        }
      })
    }).catch(e => reject(e))
  } else {
    // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) GANACHE FALLBACK
    reject(new Error('Unable to connect to Metamask'))
  }
})
  .then(result => {
    return result.web3().eth.net.getId().then((networkId) => {
      console.log('networkId', networkId)
      // Assign the networkId property to our result and resolve promise
      result = Object.assign({}, result, {networkId})
      return Promise.resolve(result)
    }).catch(e => {
      console.error('Unable to retrieve network ID')
      return Promise.reject(e)
    })
  })
  .then(result => {
    return result.web3().eth.getCoinbase().then((coinbase) => {
      console.log('coinbase', coinbase)
      result = Object.assign({}, result, {coinbase})
      return Promise.resolve(result)
    }).catch(e => {
      console.error('Unable to retrieve coinbase')
      return Promise.reject(e)
    })
  })
  .then(result => {
    return result.web3().eth.getBalance(result.coinbase).then((balance) => {
      console.log('balance', balance)
      result = Object.assign({}, result, {balance})
      return Promise.resolve(result)
    }).catch(e => {
      console.error('Unable to getBalance', result.coinbase)
      return Promise.reject(e)
    })
  })
  .then(result => {
    return result.web3().eth.getAccounts().then(accounts => {
      console.log('accounts', accounts)
      result = Object.assign({}, result, {accounts})
      return Promise.resolve(result)
    }).catch(e => {
      console.error('Unable to retrieve accounts', result.accounts)
      return Promise.reject(e)
    })
  })

export default getWeb3
