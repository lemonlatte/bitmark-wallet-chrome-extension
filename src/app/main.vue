<style>
body {
  width: 400px;
  font-family: arial;
}

.title {
  text-align: center;
}

</style>

<template>
<div>
  <h3 class="title">Bitmark Property Wallet</h3>
  <auth-view v-if='account === ""' v-on:auth="this.authenticate"></auth-view>
  <account-view v-if='account !== ""'  :account="account"
    v-on:withdraw="withdraw" v-on:deposit="deposit"></account-view>
</div>
</template>

<script>

const axios = require('axios');
const AuthView = require('./auth.vue')
const AccountView = require('./account.vue')

var getCurrentActiveTab = function () {
  return new Promise((resolve, reject) => {
    if (!chrome.tabs) {
      reject("invalid tab function")
      return;
    }
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs.length === 1) {
        resolve(tabs[0])
      } else {
        reject("multiple tabs found")
      }
    });
  })
}

export default {
  components: {
    "auth-view": AuthView,
    "account-view": AccountView,
  },

  methods: {
    sendMessage (messageObj) {
      console.log("send message to:", this.tabId, ", data:", messageObj)
      if (!chrome.tabs) {
        return
      }
      chrome.tabs.sendMessage(this.tabId, messageObj);
    },
    withdraw (o) {
      console.log(o)
      this.sendMessage({ action: 'withdraw' })
    },
    deposit (o) {
      console.log(o)
      this.sendMessage({ action: 'deposit' })
    },

    authenticate (seed) {
      //TODO: Use bitmark lib to recover accounts
      this.account = 'e1pFRPqPhY2gpgJTpCiwXDnVeouY9EjHY6STtKwdN6Z4bp4sog';
    }
  },

  async created () {
    let self = this;
    try {
      let tab = await getCurrentActiveTab();
      this.tabId = tab.id
    }
    catch (e) {
      console.log(e)
    }

  },
  data () {
    return {
      "account": "",
      "bitmarks": []
    }
  }
}
</script>
