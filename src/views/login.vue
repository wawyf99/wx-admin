<template>
  <div class="login-new">
    <div class="login-header">
      <!--<div class="login-image"></div>-->
      <div class="login-text">开放平台管理后台</div>
    </div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline class="Login-form">
      <FormItem prop="user">
        <Input clearable type="text" v-model="formInline.user" placeholder="请输入账号..." size="large" class="Login-input">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input clearable type="password" v-model="formInline.password" placeholder="请输入密码..." size="large" class="Login-input">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')" size="large" class="Login-subtn">登&nbsp;录</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import cookie from "../utils/cookie";
  import md5 from "js-md5";
  export default {
    data () {
      return {
        formInline: {
          user: 'wawyf99',
          password: '123456'
        },
        ruleInline: {
          user: [
            { required: true, message: '账号不能为空...', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空...', trigger: 'blur' },
            { type: 'string', min: 6, message: '请输入至少6位的密码...', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        var self = this;
        self.$refs[name].validate((valid) => {
          if (valid) {
            self.$http
              .post(global.url.login, {
                account: self.formInline.user,
                password: md5(self.formInline.password)
              })
              .then(function(response) {
                if (response) {
                  const info = {
                    nickname: response.nickname,
                    accountId: response.accountId
                  };
                  cookie.info = info;
                  cookie.setCookie();
                  self.$router.push({
                    path: "/main"
                  });
                } else {
                  self.$Message.error("账号或密码错误!");
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        })
      },
      //将用户数据保存至本地Localstorage
      saveLocalstorage: function(obj) {}
    }
  }
</script>
<style scoped>
  @import "../assets/style/login.css";
</style>
