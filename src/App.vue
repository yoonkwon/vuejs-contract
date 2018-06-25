<template>
  <v-flex xs12>
    <div class="main">
      <div class="display-1 mb-4">Network: {{network}}</div>
      <v-card>
        <v-card-text>
          <div class="headline">Coinbase</div>
          <div class="coinbase body-2" v-text="coinbase"></div>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-text>
          <div class="headline">Balance</div>
          <div class="coinbase body-2" v-text="ethBalance+' eth'"></div>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-text>
          <div class="headline">Accounts</div>
        </v-card-text>
        <v-list>
          <v-list-tile v-for="(account, index) in accounts" :key="account" avatar>
            <v-list-tile-action>
              <v-avatar color="black" size="25">
                <span class="white--text">{{ index+1 }}</span>
              </v-avatar>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="account">{{account}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
      <v-card>
        <v-card-text>
          <div class="headline">Contract</div>
          <div class="coinbase body-2" v-text="contractAddress"></div>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <div class="headline">RaceId</div>
          <div class="coinbase body-2" v-text="raceId"></div>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <div class="headline">CurrentStatus</div>
          <div class="coinbase body-2" v-text="contractStatus"></div>
        </v-card-text>
      </v-card>
    </div>
  </v-flex>
</template>
<script>
  import {RACE_STATUS} from "./utils/constants/raceStatus"
  import {NETWORKS} from './utils/constants/networks'
  import {mapState} from 'vuex'
  export default {
    name: 'App',
    beforeCreate() {
      console.log('registerWeb3 action dispatched')
      this.$store.dispatch('initWeb3')
    },
    computed: mapState({
      isInjected: state => state.web3.isInjected,
      network: state => NETWORKS[state.web3.networkId],
      coinbase: state => state.web3.coinbase,
      balance: state => state.web3.balance,
      ethBalance: state => {
        if (state.web3.web3Instance !== null) return state.web3.web3Instance().utils.fromWei('' + state.web3.balance, 'ether')
        else return 0
      },
      accounts: state => state.web3.accounts,
      contractAddress: state => state.contract.addresss,
      raceId: state => state.contract.raceId,
      contractStatus: state => RACE_STATUS[state.contract.currentStatus]
    })
  }
</script>

<style>
.main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  padding-left: 30px;
  padding-right: 30px;
}
.coinbase {
  word-break: break-all;
}
</style>
