<!--授权代理-->
<style scoped>
  .impower-agent-title{
    font-size: 15px;
    margin: 20px 0px 30px 20px;
  }
  .impower-agent-info{
    position: relative;
    margin: 10px 0;
  }
  .impower-agent-info .impower-agent-img{
    width: 80px;
    height: 80px;
    position: absolute;
    top: 0;
    left: 279px;
    bottom: 0;
    margin: auto;
    text-align: center;
    line-height: 80px;
  }
  .impower-agent-info .ivu-form-item{
    margin: 0;
  }
  .impower-agent-info p{
    margin-top: 5px;
  }
  .impower-agent-tips{
    font-size: 16px !important;
    color: red;
  }
  .impower-agent-commerce{
    margin-top: 40px;
  }
  .distpicker-address-wrapper select{
    height: 30px !important;
    font-size: 12px !important;
  }
</style>
<template>
  <div class="impower-agent">
    <div class="impower-agent-title">点海棋牌 - 陕西麻将代理授权</div>
    <Form :model="formItem" :label-width="120" ref="formDynamic" style="width: 700px" inline>
      <FormItem  label="玩家ID：" style="width: 500px" >
        <Input v-model="formItem.accountId" placeholder="请输入玩家ID..." style="width: 180px"  ></Input>&nbsp;&nbsp;<Button   style="width: 80px" type="warning" @click="search">查询</Button>
      </FormItem>


      <div class="impower-agent-info"  v-show="formItem.accountInfo">
        <FormItem  label="昵称：" style="width: 500px">
          {{formItem.agentName}}
        </FormItem>

        <FormItem  label="商务代表:" style="width: 500px"  v-show="formItem.commerce">
          {{formItem.bizName}}
        </FormItem>

        <FormItem  label="所属代理ID:" style="width: 500px" v-if="formItem.agentId > 0">
          {{formItem.agentId}}
        </FormItem>
        <FormItem  label="所属代理ID:" style="width: 500px" v-else>
          无
        </FormItem>

        <div class="impower-agent-img" :style="backgroundDiv">

        </div>
      </div>

      <FormItem  style="width: 500px; margin-top: 20px; " v-show="formItem.isAlreadyAgent" >
        <div class="impower-agent-tips">此用户已经是代理，不能授权~！</div>
      </FormItem>

      <div class="impower-agent-commerce" v-show="formItem.commerceInfo">
        <FormItem label="商务代表：" style="width: 360px">
          <Select v-model="formItem.select">
            <Option v-for="items in list" :value="items.account_id" :key="items.account_id">{{ items.nickname }}</Option>
          </Select>
        </FormItem>

        <!--        <FormItem  label="姓名：" style="width: 500px" >
                  <Input v-model="formItem.nicknames" placeholder="请输入姓名..." style="width: 240px"  ></Input>
                </FormItem>

                <FormItem  label="手机号码：" style="width: 500px" >
                  <Input v-model.number="formItem.mobile" placeholder="请输入手机号码..." style="width: 240px"  ></Input>
                </FormItem>

                <FormItem label="运营地区:">
                  <v-distpicker @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea" :province="deafultProvince" :city="deafultCity" :area="deafultArea"></v-distpicker>
                </FormItem>-->

        <FormItem>
          <Button type="primary" style="width: 240px" @click="sub">授权代理</Button>
        </FormItem>
      </div>
    </Form>
  </div>
</template>

<script>
  import VDistpicker from "v-distpicker";

  export default {
    components: {
      VDistpicker
    },
    data () {
      return {
        formItem: {
          accountId : '',
          select : '',
          nicknames : '',
          mobile : '',
          addrss : '',
          agentName : '',
          agentId : '',
          commerce : '',
          pic : '',
          accountInfo : false,
          commerceInfo : false,
          isAlreadyAgent : false,
        },
        list:[],
        backgroundDiv:{
          backgroundImage : '',
          backgroundColor : '#DDD',
          backgroundSize: '100%',
          opacity: '1'
        },
        deafultProvince : "",
        deafultCity : "",
        deafultArea: "",
        citys: ""
      }
    },
    created() {
      //获取商务列表

    },
    methods: {
      onChangeProvince(data) {
        this.deafultProvince = data.value;
      },
      onChangeCity(data) {
        this.deafultCity = data.value;
      },
      onChangeArea(data) {
        this.deafultArea = data.value;
        this.citys = data.code;
      },
      restart(){
        this.deafultProvince = "省";
        this.deafultCity = "市";
        this.deafultArea = "区";
        this.formItem.mobile = "";
        this.formItem.nicknames = "";
      },
      search(){
        let self = this;
        this.restart();
        if(!self.formItem.accountId){
          this.$Message.error('用户ID不能为空！');
          return false;
        }
        self.$http.get(global.url.users_getUserInfo, {
          uid: self.formItem.accountId
        }).then( res => {
          if(res){
            self.formItem.accountInfo = true;
            self.formItem.agentName = res.name;
            self.formItem.agentId = res.agent_id;
            if(res.my_biz_name){
              self.formItem.bizName = res.my_biz_name;
            }else{
              self.formItem.bizName = res.biz_name;
            }

            if(res.avatar){
              self.backgroundDiv.backgroundImage = "url(" + res.avatar + ")";
            }
            if(res.type == 3){
              self.formItem.isAlreadyAgent = true;
              self.formItem.commerceInfo = false;
              self.formItem.commerce = true;
            }else{
              self.formItem.isAlreadyAgent = false;
              self.formItem.commerceInfo = true;
              self.formItem.commerce = false;
            }
            if(res.agent_id == 0){
              self.formItem.select = 3;
            }else{
              //获取指定用户的代理的商务
              self.$http.get(global.url.users_getcommerce,{
                userId : res.agent_id
              }).then( result => {
                if(result[0].account_id){
                  self.formItem.select = result[0].account_id;
                }
              })
            }
          };
        })

      },
      getCommerceList(){
        let self = this;
        self.$http.get(global.url.users_commercelist).then( res => {
          self.list = res;
        })
      },
      sub(){
        let self = this;
        if(!self.formItem.select){
          this.$Message.error('请选择商务代表！');
          return false;
        }
        /*if(!self.formItem.nicknames || self.formItem.nicknames.length < 2){
          this.$Message.error('姓名不能为空且至少2个字符！');
          return false;
        }
        var n = Number(self.formItem.mobile);
        if(!self.formItem.mobile || (self.formItem.mobile.toString().length != 11 ||  isNaN(n)) ){
          this.$Message.error('手机号格式不正确！');
          return false;
        }
        console.log(self.deafultProvince);
        if (self.deafultProvince == '省') {
          self.$Message.error("请选择运营省份");
          return false;
        }
        if (self.deafultCity == '市') {
          self.$Message.error("请选择运营城市");
          return false;
        }
        if (self.deafultArea == '区') {
          self.$Message.error("请选择运营区县");
          return false;
        }

        var _address = self.deafultProvince + self.deafultCity + self.deafultArea;*/
        self.$http
          .post(global.url.agent_add, {
            accountId: self.formItem.accountId,
            userName: self.formItem.nicknames,
            userTel: self.formItem.mobile,
            userLocationCode: self.citys,
            userLocation: '',
            commerceId : self.formItem.select
          })
          .then(res => {
            if (res.err_code != 0) {
              this.$Message.error(res.err_msg);
              return false;
            }
            this.$Message.success('授权成功');
          });


      }
    },
    mounted(){
      this.getCommerceList();
    }
  }
</script>
