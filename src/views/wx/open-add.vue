<template>
  <div class="add-title">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <FormItem label="平台名称" prop="Title" style="width: 320px">
        <Input v-model="formValidate.Title" placeholder="请输入平台名称..."></Input>
      </FormItem>
      <FormItem label="平台AppID" prop="AppId" style="width: 320px">
        <Input v-model="formValidate.AppId" placeholder="请输入平台AppID..."></Input>
      </FormItem>
      <FormItem label="平台AppSecret" prop="AppSecret" style="width: 320px">
        <Input v-model="formValidate.AppSecret" placeholder="请输入平台AppSecret..."></Input>
      </FormItem>
      <FormItem label="消息校验Token" prop="Token" style="width: 320px">
        <Input v-model="formValidate.Token" placeholder="请输入消息校验Token..."></Input>
      </FormItem>
      <FormItem label="消息加解密Key" prop="Key" style="width: 320px">
        <Input v-model="formValidate.Key" placeholder="请输入消息加解密Key..."></Input>
      </FormItem>
      <FormItem label="公众号AppId" prop="AuthorAppId" style="width: 320px">
        <Input v-model="formValidate.AuthorAppId" placeholder="请输入公众号AppId..."></Input>
      </FormItem>
      <FormItem label="授权回调地址" prop="RedirectUrl" style="width: 320px">
        <Input v-model="formValidate.RedirectUrl" placeholder="请输入授权回调地址..."></Input>
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
          Title: '',
          AppId: '',
          AppSecret: '',
          Token: '',
          Key: '',
          RedirectUrl: '',
          AuthorAppId: '',
        },
        ruleValidate: {
          Title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          Token: [
            { required: true, message: '消息验证Token不能为空', trigger: 'blur' },
          ],
          Key: [
            { required: true, message: '消息验证Key不能为空', trigger: 'blur' },
          ],
          AuthorAppId: [
            { required: true, message: '公众号AppId不能为空', trigger: 'blur' }
          ]
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
        self.$http.post(global.url.wx_add, {
          title: this.formValidate.Title,
          app_id: this.formValidate.AppId,
          app_secret: this.formValidate.AppSecret,
          token: this.formValidate.Token,
          key: this.formValidate.Key,
          redirect_url: this.formValidate.RedirectUrl,
          authorizer_app_id: this.formValidate.AuthorAppId,
          id: this.id
        }).then(result => {
          if(result.status){
            this.$Message.success(result.msg);
            setTimeout(() => {
              this.$router.push({path: '/wx'});
            }, 1500)
          }else{
            this.$Message.error(result.msg);
          }
        });
      },
      getData(id){
        var self = this;
        self.$http.post(global.url.wx_get_one, {
          id : id
        }).then(result => {
          if(result.status){
            this.formValidate.Title = result.data[0].title;
            this.formValidate.AppId = result.data[0].app_id;
            this.formValidate.AppSecret = result.data[0].app_secret;
            this.formValidate.Token = result.data[0].token;
            this.formValidate.Key = result.data[0].key;
            this.formValidate.RedirectUrl = result.data[0].redirect_url;
            this.formValidate.AuthorAppId = result.data[0].authorizer_app_id;
          }
        });
      }
    }
  };
</script>
