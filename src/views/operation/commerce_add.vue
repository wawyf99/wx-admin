<!--授权商务-->
<template>
  <div class="impower-agent">
    <div class="impower-agent-title">点海棋牌 - 陕西麻将添加商务</div>
    <Form :model="formItem" ref="form" :rules="ruleForm" :label-width="150">
      <FormItem label="用户昵称:" prop="nickname">
        <Input v-model="formItem.nickname" :maxlength="6" type='text' placeholder="请输入昵称..."></Input>
      </FormItem>
      <FormItem label="登录账户（手机号码）:" prop="account">
        <Input v-model="formItem.account" :maxlength="11" type='text' placeholder="请输入账号\手机号码..."></Input>
      </FormItem>
      <!--<FormItem label="身份证:" prop="card">
        <Input v-model="formItem.card" :minlength="15" :maxlength="18" type='text' placeholder="请输入身份证号码..."></Input>
      </FormItem>-->
      <FormItem label="账号类型:">
        <RadioGroup v-model="type">
          <Radio label="1">
            <span>商务人员</span>
          </Radio>
          <!--<Radio label="2">
            <span>市场人员</span>
          </Radio>-->
        </RadioGroup>
      </FormItem>
      <!--          <FormItem label="运营地区:">
                  <v-distpicker @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea" :province="deafultProvince" :city="deafultCity" :area="deafultArea"></v-distpicker>
                </FormItem>-->
      <FormItem>
        <Button type="primary" @click="save('form')">保存</Button>
        <Button type="ghost" @click="handleReset('form')" style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import md5 from "js-md5";
  import VDistpicker from "v-distpicker";
  export default {
    components: {
      VDistpicker
    },
    data() {
      const vaild = (rule, value, callback) => {
        this.$http
          .get(global.url.commerce_nickname_find, {
            nickname: value
          })
          .then(result => {
            if (result) {
              callback(new Error("昵称已经存在"));
            } else callback();
          });
      };
      const exists = (rule, value, callback) => {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!Number.isInteger(+value) || parseInt(value) <= 0) {
          callback(new Error("请输入正整数"));
        }else if(!myreg.test(value)){
          callback(new Error("账号格式不正确"));
        } else if (value) {
          this.$http
            .get(global.url.commerce_find, {
              mobile: value
            })
            .then(result => {
              if (result) {
                callback(new Error("账户已经存在"));
              } else callback();
            });
        } else {
          callback();
        }
      };
      return {
        deafultProvince : "",
        deafultCity : "",
        deafultArea: "",
        tab: "list",
        city: "",
        seachValue: "", //搜索条件
        pageCount: 0, //总条数
        pageSize: global.page.size,
        type: "1",
        formItem: {
          account: "",
          nickname: "",
          card: ""
        },
        ruleForm: {
          nickname: [
            {
              required: true,
              message: "用户昵称不能为空",
              trigger: "blur"
            },
            {
              validator: vaild,
              trigger: "blur"
            }
          ],
          account: [
            {
              required: true,
              message: "登录账户不能为空",
              trigger: "blur"
            },
            {
              validator: exists,
              trigger: "blur"
            }
          ]
        },
        tableColumns: [
          {
            title: "账户",
            align: "center",
            key: "mobile"
          },
          {
            title: "身份",
            align: "center",
            key: "position",
            render(h, params) {
              let _str = '';
              if(params.row.user_type == 1 ){
                _str =  "商务人员";
              }else{
                _str =  "市场经理";
              }
              return h("div",
                _str
              );
            }
          },
          {
            title: "昵称",
            align: "center",
            key: "nickname"
          },
          {
            title: "余额",
            align: "center",
            key: "balance"
          },
          {
            title: "推荐码",
            align: "center",
            key: "recommend_code"
          },
          {
            title: "地区",
            align: "center",
            key: "location"
          },
          {
            title: "身份证",
            align: "center",
            key: "identity_card"
          },
          {
            title: "开户银行",
            align: "center",
            key: "bank_name"
          },
          {
            title: "银行卡号",
            align: "center",
            key: "bank_number"
          },
          {
            title: "上下级",
            align: "center",
            key: "create_account_name"
          },
          {
            title: "是否禁用",
            key: "disabled",
            align: "center",
            render(h, params) {
              let _str = '';
              if(params.row.disabled == '1' ){
                _str = '是';
              }else{
                _str = '否';
              }
              return h("div", _str);
            }
          },
          {
            title: "创建日期",
            key: "createt_time",
            align: "center",
            render(h, params) {
              let tempb = new Date(params.row.createt_time);
              return h("div",
                tempb.getFullYear() +
                "-" +
                (parseInt(tempb.getMonth()) + 1) +
                "-" +
                tempb.getDate()
              );
            }
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              let reamrk = params.row.disabled ? "启用" : "禁用";
              return h("div", [
                h("Button", [
                  h(
                    "Poptip",
                    {
                      props: {
                        confirm: true,
                        title: "确定要更改状态么?"
                      },
                      on: {
                        "on-ok": () => {
                          this.disable(params.row.account_id);
                        }
                      }
                    },
                    reamrk
                  )
                ]),
                h("Button", [
                  h(
                    "Poptip",
                    {
                      props: {
                        confirm: true,
                        title: "确定要重置么?"
                      },
                      on: {
                        "on-ok": () => {
                          this.restartPwd(params.row.account_id);
                        }
                      }
                    },
                    "重置密码"
                  )
                ])
              ]);
            }
          }
        ],
        data: []
      };
    },
    created() {

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
        this.city = data.code;
      },
      exists() {
        let self = this;
      },
      restartPwd(id) {
        let self = this;
        self.$http
          .post(global.url.commerce_restart, {
            aid: id
          })
          .then(result => {
            self.$Message.success("重置密码成功!");
          });
      },
      restart(){
        this.deafultProvince = "省";
        this.deafultCity = "市";
        this.deafultArea = "区";
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      save(name) {
        let self = this;

        self.$refs[name].validate(vaild => {
          if (vaild) {
            /*          if (!self.deafultProvince) {
                        self.$Message.error("请选择运营省份");
                        return;
                      }
                      if (!self.deafultCity) {
                        self.$Message.error("请选择运营城市");
                        return;
                      }
                      if (!self.deafultArea) {
                        self.$Message.error("请选择运营区县");
                        return;
                      }

                      var _address = self.deafultProvince + self.deafultCity + self.deafultArea;*/

            self.$http
              .post(global.url.commerce_add, {
                mobile: self.formItem.account,
                pwd: md5(self.formItem.account),
                nickname: self.formItem.nickname,
                location: '',
                city: self.city,
                card: self.formItem.card,
                type: self.type
              })
              .then(result => {
                if (result) {
                  self.tab = "list";
                  self.$refs[name].resetFields();
                  self.$Message.success("添加成功");
                  self.restart();
                  this.$router.push('/operation/commerce_list');
                } else {
                  self.$Message.error("添加失败");
                }
              });
          }
        });
      },
    }
  };
</script>
