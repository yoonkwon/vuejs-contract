import initWeb3 from '../utils/initWeb3'
import getWeb3 from '../utils/getWeb3'
import getContract from '../utils/getContract'
export default {
  initWeb3({commit}){
    console.log('initWeb3 action executed')
    initWeb3.then(result => {
      console.log('committing result to initWeb3 mutation')
      console.log(result)
      commit('initWeb3Contract', result)
    }).catch(e => {
      console.error('error in action initWeb3', e.message)
    })
  },
  registerWeb3 ({commit}) {
    console.log('registerWeb3 action executed')
    getWeb3.then(result => {
      console.log('committing result to registerWeb3Instance mutation')
      commit('registerWeb3Instance', result)
    }).catch(e => {
      console.error('error in action registerWeb3', e.message)
    })
  },
  getContractInstance ({commit}) {
    getContract.then(result => {
      commit('registerContractInstance', result)
    }).catch(e => console.error('error in action getContract', e.message))
  }
}
