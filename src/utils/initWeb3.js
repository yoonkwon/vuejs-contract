import GetWeb3 from './getWeb3'
import GetContract from './getContract'

export default Promise.all([GetWeb3, GetContract]).then(results=>{
  console.log(results)
  return Promise.resolve({
    web3: results[0],
    contract: results[1]
  });
})
