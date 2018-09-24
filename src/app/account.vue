<style scoped>
.title, .account-title, .account-number{
  text-align: center;
}

.account-number {
  font-size: 12px;
  color: blue;
  padding-bottom: 10px;
  border-bottom: 1px solid blue;
}

.bitmark-list {
  font-size: 10px
}

</style>

<template>
<div>
  <p class="account-title">You bitmark account number</p>
  <p class="account-number">{{ this.account }}</p>
  <button class="btn btn-primary" @click="this.withdraw">Withdraw</button>
  <button class="btn btn-primary" @click="this.deposit">Deposit</button>
  <button class="btn btn-primary" @click="this.deposit">Reset</button>
  <hr>
  <p>Bitmarks</p>
  <template v-if="bitmarks.length == 0">
    <p>You don't have any bitmarks</p>
  </template>
  <template v-else>
    <p class="bitmark-list">Block| Bitmark Id</p>
    <p class="bitmark-list" v-for="bitmark in bitmarks" :key="bitmark.id">{{bitmark.block_number}} | <a :href="'https://registry.bitmark.com/bitmark/' + bitmark.id">{{bitmark.id}}</a></p>
  </template>
</div>
</template>

<script>
const axios = require('axios');

export default {
  methods: {
    withdraw () {
      this.$emit("withdraw", {})
    },
    deposit () {
      this.$emit("deposit", {})
    }
  },

  async beforeMount () {
    let self = this;
    axios.get('https://api.test.bitmark.com/v1/bitmarks?owner=' + this.account)
      .then(function (response) {
        self.bitmarks = response.data.bitmarks.slice(0, 10);
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  props: {
    "account": String
  },

  data () {
    return {
      "bitmarks": []
    }
  }
}
</script>
