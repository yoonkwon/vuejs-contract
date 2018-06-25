import Web3 from 'web3'
import {address, ABI} from './constants/CryptoSnail'
const PROVIDER = process.env.PROVIDER || 'http://54.70.197.104:8545'

let getContract = new Promise((resolve) => {
  let web3 = new Web3(PROVIDER)
  let contractInstance = new web3.eth.Contract(ABI, address)
  console.log('Contract', contractInstance);
  // contractInstance.events.allEvents({}, (err, event)=>{
  //   //TODO: something refresh
  //   if(!err) console.log(event);
  //   else console.error(err);
  // });
  resolve({
    address: address,
    instance: contractInstance
  })
}).then(result=>{
  return result.instance.methods.raceId().call()
    .then(raceId=>{
      result = Object.assign({}, result, {raceId: parseInt(raceId)})
      return Promise.resolve(result)
    })
}).then(result=>{
  return result.instance.methods.currentStatus().call()
    .then(currentStatus=>{
      result = Object.assign({}, result, {currentStatus: parseInt(currentStatus)})
      return Promise.resolve(result)
    })
});
export default getContract
