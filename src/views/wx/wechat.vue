<!--历史每日数据-->
<template>
  <div class="manage-title">
    <Card :bordered="true" style="width: 500px">
      <h2 slot="title">默认对接，微信开放平台 <i style="font-style: normal; font-size: 13px;">（如需直接对接公众号请点击关闭）</i></h2>
      <p>{{text}}：<i-switch v-model="switch1" @on-change="change" /></p>
    </Card>

  </div>

</template>
<style>
  @import "../../assets/style/common.css";
</style>
<script>
  export default {
    data() {
      return {
        switch1: 'true',
        text: '',
      };
    },
    created() {
      this.getData();
    },
    methods: {
      change(status){
        if(status){
          this.text = '开启中';
        }else{
          this.text = '关闭中';
        }
        this.setManner();
      },
      getData(){
        let self = this;
        self.$http.post(global.url.wx_get_conect, {}).then(result => {
          this.switch1 = result.data;
          if(result.data){
            this.text = '开启中';
          }else{
            this.text = '关闭中';
          }

          //type 1或者空是开启 2是关闭
        })
      },
      setManner(){
        let self = this;
        self.$http.post(global.url.wx_set_conect, {
        }).then(result => {
          if(result.status){
            this.formValidate.AppId = result.data[0].app_id;
            this.formValidate.AppSecret = result.data[0].app_secret;
          }
        });
      },
    }
  };
</script>
