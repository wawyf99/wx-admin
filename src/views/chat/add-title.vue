<!--历史每日数据-->
<template>
  <div class="add-title">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="标题名称" prop="title" style="width: 320px">
        <Input v-model="formValidate.title" placeholder="请输入标题..."></Input>
      </FormItem>
      <FormItem label="图片名称" prop="img" style="width: 320px">
        <Input v-model="formValidate.img" placeholder="请输入图片名称..."></Input>
      </FormItem>
      <FormItem label="群聊人数" prop="enrollment" style="width: 320px">
        <Input v-model="formValidate.enrollment" placeholder="请输入群聊人数..." type="text"></Input>
      </FormItem>
      <FormItem label="邀请人" prop="invitor" style="width: 320px">
        <Input v-model="formValidate.invitor" placeholder="请输入邀请人..."></Input>
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
      const validateMobile = (rule, value, callback) => {
        if(value == ''){
          callback(new Error('群聊人数不能为空'));
        }else if (value == 0) {
          callback(new Error('群聊人数必须大于0'));
        }else if (!Number.isInteger(+value)) {
          callback(new Error('群聊人数必须为数字'));
        } else {
          callback();
        }
      };
      return {
        id: this.$route.query.id,
        formValidate: {
          title: '',
          img: 'image_01',
          enrollment: '',
          invitor: '',
        },
        ruleValidate: {
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          img: [
            /*{ required: true, message: '', trigger: 'blur' },
            { type: 'email', message: 'Incorrect email format', trigger: 'blur' }*/
          ],
          enrollment: [
            //{ required: true, message: '群聊人数不能为空', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur'}
          ],
          invitor: [
            { required: true, message: '邀请人不能为空', trigger: 'blur' }
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
        self.$http.post(global.url.chat_add_title, {
          title: this.formValidate.title,
          img: this.formValidate.img,
          enrollment: this.formValidate.enrollment,
          invitor: this.formValidate.invitor,
          id: this.id
        }).then(result => {
          if(result.status){
            this.$Message.success(result.msg);
            setTimeout(() => {
              this.$router.push({path: '/chat/manage-title'});
            }, 1500)
          }else{
            this.$Message.error(result.msg);
          }
        });
      },
      getData(id){
        var self = this;
        self.$http.post(global.url.chat_get_title, {
          id : id
        }).then(result => {
          if(result.status){
            this.formValidate.title = result.data[0].title;
            this.formValidate.img = result.data[0].img;
            this.formValidate.enrollment = parseInt(result.data[0].enrollment);
            this.formValidate.invitor = result.data[0].invitor;
          }
        });
      }
    }
  };
</script>
