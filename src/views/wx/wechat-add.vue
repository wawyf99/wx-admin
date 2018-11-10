<template>
  <div class="add-title">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <FormItem label="公众号AppID" prop="AppId" style="width: 320px">
        <Input v-model="formValidate.AppId" placeholder="请输入公众号AppID..."></Input>
      </FormItem>
      <FormItem label="公众号AppSecret" prop="AppSecret" style="width: 320px">
        <Input v-model="formValidate.AppSecret" placeholder="请输入公众号AppSecret..."></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<style>
  @import "../../assets/style/common.css";
</style>
<script>
  export default {
    data () {
      return {
        id: this.$route.query.id,
        formValidate: {
          AppId: '',
          AppSecret: '',
        },
        ruleValidate: {
          AppId: [
            { required: true, message: 'AppId不能为空', trigger: 'blur' }
          ],
          AppSecret: [
            { required: true, message: 'AppSecret不能为空', trigger: 'blur' },
          ],
        },
      }
    },
    created(){
      if(this.id){
        this.getData(this.id);
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.sendData();
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      sendData (){
        let self = this;
        self.$http.post(global.url.wx_wechat_add, {
          app_id: this.formValidate.AppId,
          app_secret: this.formValidate.AppSecret,
          id: this.id
        }).then(result => {
          if(result.status){
            this.$Message.success(result.msg);
            setTimeout(() => {
              this.$router.push({path: '/wx/wechat-list'});
            }, 1500)
          }else{
            this.$Message.error(result.msg);
          }
        });
      },
      getData(id){
        var self = this;
        self.$http.post(global.url.wx_wechat_get_one, {
          id : id
        }).then(result => {
          if(result.status){
            this.formValidate.AppId = result.data[0].app_id;
            this.formValidate.AppSecret = result.data[0].app_secret;
          }
        });
      }
    }
  };
</script>
