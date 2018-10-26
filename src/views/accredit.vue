<template>
  <div class="accredit">
    <Button type="error" icon="alert-circled" class="btn" @click="sub" v-if="!auth_code">微信开放平台授权</Button>
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
        auth_code : this.$route.query.auth_code,
        app_id : this.$route.query.id
      }
    },
    created(){
      let auth_code = this.auth_code;
      if(auth_code){
        this.updateToken();
      }
    },
    methods: {
      sub:function () {
        let self = this;
        self.$http.get(global.url.accredit,{
          id : this.app_id
        }).then(function(result) {
          if(result.status){
            window.location.href = result.href;
          }
        })
      },
      updateToken:function () {
        let self = this;
        self.$http.post(global.url.update_token,{
          AppId : this.app_id,
          AuthCode : this.auth_code
        }).then(function(result) {
          console.log(result);
        })
      }
    }
  }
</script>
<style scoped>
  @import "../assets/style/login.css";
</style>
