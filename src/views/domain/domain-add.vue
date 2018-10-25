<!--历史每日数据-->
<template>
  <div class="add-title">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="域名" prop="website" style="width: 320px">
        <Input v-model="formValidate.website" placeholder="请输入域名..."></Input>
      </FormItem>
      <FormItem label="分类" prop="mark" style="width: 320px">
        <Select v-model="formValidate.mark" placeholder="请选择域名分类...">
          <Option v-for="item in markList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="公众号ID" prop="gid" style="width: 320px">
        <Input v-model="formValidate.gid" placeholder="请输入公众号ID..."></Input>
      </FormItem>
      <FormItem label="是否随机" prop="rand" style="width: 320px">
        <RadioGroup v-model="formValidate.rand">
          <Radio label= '1' >不随机</Radio>
          <Radio label= '2' >随机</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="排序" prop="sort" style="width: 320px">
        <Input v-model="formValidate.sort" placeholder="请输入序号..."></Input>
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
      const validateDomain = (rule, value, callback) => {
        let _reg = new RegExp();
        _reg.compile('^(?=^.{3,255}$)(www\\.)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\\d+)*(\\/\\w+\\.\\w+)*$');
        if(value == ''){
          callback(new Error('录入域名不能为空'));
        }else if (!_reg.test(value)) {
          callback(new Error("录入域名格式不正确"));
        } else {
          callback();
        }
      };
      return {
        id: this.$route.query.id,
        formValidate: {
          website: '',
          mark: '',
          gid: '',
          rand: '',
          sort: ''
        },
        ruleValidate: {
          website: [
            { required: true, message: '录入域名不能为空', trigger: 'blur' },
            { validator: validateDomain, trigger: 'blur'}
          ],
          mark: [
            { required: true, message: '录入分类不能为空', trigger: 'change' },
          ],
          rand: [
            { required: true, message: '请选择是否随机', trigger: 'change' },
          ]
        },
        markList: [
          {
            value: '1',
            label: 'A1'
          },
          {
            value: '2',
            label: 'A2'
          },
          {
            value: '3',
            label: 'B1'
          },
          {
            value: '4',
            label: 'C1'
          }
        ],
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
        let self = this,
            id = this.id,
            _website = this.formValidate.website;

        self.$http.post(global.url.domain_add, {
          website: _website,
          mark: this.formValidate.mark,
          gid: this.formValidate.gid,
          rand: this.formValidate.rand,
          sort: this.formValidate.sort,
          id: id
        }).then(result => {
          if(result.status){
            this.$Message.success(result.msg);
            setTimeout(() => {
              this.$router.push({path: '/domain/domain-list'});
            }, 1500)
          }else{
            this.$Message.error(result.msg);
          }
        });
      },
      getData(id){
        var self = this;
        self.$http.post(global.url.domain_one_list, {
          id : id
        }).then(result => {
          console.log(typeof (result.data[0].rand));
          if(result.status){
            this.formValidate.website = result.data[0].domain;
            this.formValidate.mark = result.data[0].mark.toString();
            this.formValidate.rand = result.data[0].rand.toString();
            this.formValidate.gid = result.data[0].gid;
            this.formValidate.sort = result.data[0].sort;
          }
        });
      }
    }
  };
</script>
