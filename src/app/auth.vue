<style scoped>
.auth{
  text-align: center;
}

.auth-input {
  padding-bottom: 10px;
}

.auth-input input {
  width: 300px;
}

</style>

<template>
<div>
  <div class="auth">
    <div class="auth-input"><label>Recover account from your seed</label><br></div>
    <div class="auth-input">
      <input class="account-seed" v-model="this.seed"> <br>
    </div>
    <div class="auth-input">
      <button class="btn btn-primary" @click="this.authenticate">Open</button>
    </div>
  </div>

</div>
</template>

<script>
export default {
  methods: {
    authenticate () {
      this.$emit("auth", this.seed)
    }
  },

  data () {
    return {
      "seed": "5XEECttxvRBzxzAmuV4oh6T1FcQu4mBg8eWd9wKbf8hweXsfwtJ8sfH",
    }
  }
}
</script>
