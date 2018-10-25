<template>
  <div class="accredit">
    <Button type="error" icon="alert-circled" class="btn" @click="sub">微信开放平台授权</Button>
  </div>
</template>
<style>
  .accredit{
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 40%;
    margin: auto;
  }
  .accredit .btn{
    text-align: center;
  }
</style>
<script>
  export default {
    data () {
      return {

      }
    },
    methods: {
      sub:function () {
        let self = this;
        self.$http.get(global.url.accredit,{}).then(function(result) {
          console.log(result.status);
          if(result.status){
            window.location.href = result.href;
          }
        })
      }
    }
  }
</script>
<style scoped>
  @import "../assets/style/login.css";
</style>
