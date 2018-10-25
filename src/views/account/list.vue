<!--账户列表-->
<template>
  <div>
    <div class="content-bar">
      <Form inline>
        <FormItem label="账户/昵称:" :label-width="100">
          <Input type="text" v-model="seachValue" placeholder="搜索条件..."></Input>
        </FormItem>
        <FormItem label="选择角色:" :label-width="80">
          <RadioGroup v-model="role" v-for="(item, idx) in roleList" :key="idx">
            <Radio :label="item.roleId">{{ item.roleName }}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label-width="50">
          <Button type="primary" icon="ios-search" @click="getList()">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <Table :columns="columns" :data="data" border></Table>
  </div>
</template>
<script>
  import md5 from "js-md5";
  export default {
    data() {
      return {
        role: 0, //用户角色
        seachValue: "", //搜索条件
        roleList: [],
        columns: [
          {
            title: "用户账户",
            align: "center",
            key: "account",
          },
          {
            title: "用户角色",
            align: "center",
            key: "roleName",
          },
          {
            title: "用户昵称",
            align: "center",
            key: "nickname",
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
            title: "用户权限",
            key: "link",
            align: "center",
          },
          {
            title: "创建日期",
            key: "createtime",
            align: "center",
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              let _status = '',
                _text = '';
              if(params.row.disabled == 1){
                _status = 0;
                _text = '启用账号';
              }else{
                _status = 1;
                _text = '禁用账号';
              }
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          path: "/account/add",
                          query: {
                            id: params.row.accountId
                          }
                        });
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "",
                      size: "small"
                    },
                    style: {
                      margin: "5px"
                    },
                    on: {
                      click: () => {
                        this.restPwd(params.row.accountId);
                      }
                    }
                  },
                  "重置密码"
                ),
                /*              h("Button",{
                                props: {
                                  type: "",
                                  size: "small"
                                },
                              }, [
                                h(
                                  "Poptip",
                                  {
                                    props: {
                                      confirm: true,
                                      title: "确定要删除么?"
                                    },
                                    on: {
                                      "on-ok": () => {
                                        this.disable(
                                          params.row.accountId,
                                          !params.row.disabled
                                        );
                                      }
                                    }
                                  },
                                  "删除"
                                )
                              ]),*/
                h(
                  "Button",
                  {
                    props: {
                      type: "",
                      size: "small"
                    },
                    style: {
                      margin: "5px"
                    },
                    on: {
                      click: () => {

                        this.disable(params.row.accountId, _status);
                      }
                    }
                  },
                  _text
                ),
              ]);
            }
          }
        ],
        data: []
      };
    },
    created() {
      this.getList();
      this.getRole();
    },
    methods: {
      //获取角色列表
      getRole() {
        var self = this;
        this.$http.get(global.url.role_list).then(result => {
          self.roleList = result;
          self.roleList.push({
            roleName: "全部显示",
            roleId: 0
          });
        });
      },
      //获取用户数据
      getList() {
        var self = this;
        //请求用户列表
        self.$http
          .get(global.url.account_list, {
            role: self.role,
            seachValue: self.seachValue
          })
          .then(response => {
            self.data = response;
          });
      },
      //重置密码
      restPwd(accountId) {
        var self = this;
        self.$http
          .post(global.url.account_restpwd, {
            accountId: accountId,
            password: md5("123456")
          })
          .then(response => {
            if (response) {
              self.$Message.success("重置密码成功!");
            }
          });
      },
      //禁用账户
      disable(accountId, status) {
        var self = this;
        self.$http
          .post(global.url.account_disabled, {
            accountId: accountId,
            status: status
          })
          .then(response => {
            if (response) {
              self.data = response;
            }
          });
      }
    }
  };
</script>
