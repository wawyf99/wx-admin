<!--历史每日数据-->
<template>
  <div class="operation-list">
    <div class="content-bar">
      <Form inline>
        <FormItem label="查询商务:" :label-width="80">
          <Input v-model="keywords" placeholder="请输入商务ID/昵称..." style="width: 180px" />
        </FormItem>
        <FormItem :label-width="0">
          <Button type="primary" icon="ios-search" @click="getList(1)">查询</Button>
          &nbsp;
          <Button type="error" icon="android-close" @click="cleanBox()">清空</Button>
          &nbsp;
          <!--<Button type="warning" icon="ios-printer" @click="getList(2)">导出</Button>-->
        </FormItem>
      </Form>
    </div>
    <Table border :columns="columns" :data="list"></Table>

  </div>
</template>
<style>
  @import "../../assets/style/common.css";
  .operation-list table button,   .operation-list table .ivu-select{
    margin-bottom: 5px;
  }
  .operation-list table button:first-child{
    margin-top: 5px;
  }
</style>
<script>
  export default {
    data() {
      return {
        commerce_status: 1,
        keywords: '',
        columns: [
          {
            title: "代理ID",
            align: "center",
            key: "account_id"
          },
          {
            title: "游戏昵称",
            align: "center",
            key: "nickname"
          },
          {
            title: "代理等级",
            align: "center",
            render: (h, params) => {
              if (params.row.agentLevelShow != 1) {
                return h("Select",{
                    props: {
                      size: "small",
                      value : parseInt(params.row.account_type)
                    },
                    on: {
                      'on-change':(value) => {
                        params.row.account_type = value;
                      }
                    },
                  },
                  this.agentLevel.map(function(type){
                    return h('Option', {
                      props: {value: type.agent_level}
                    }, type.agent_level_name);
                  })
                );
              } else {
                let _str = '';
                if(params.row.account_type == '1' ){
                  _str = '预备代理';
                }else if(params.row.account_type == '2' ){
                  _str = '普通代理';
                }else if(params.row.account_type == '3' ){
                  _str = '铜牌代理';
                }else if(params.row.account_type == '4' ){
                  _str = '银牌代理';
                }else if(params.row.account_type == '5' ){
                  _str = '金牌代理';
                }
                return h("div", _str);
              }
            }
          },
          {
            title: "手机号码",
            align: "center",
            key: "mobile"
          },
          {
            title: "姓名",
            align: "center",
            key: "realname"
          },
          {
            title: "地区",
            key: "location",
            align: "center"
          },
          {
            title: "身份证号码",
            key: "id_card",
            align: "center"
          },
          {
            title: "商务代表",
            align: "center",
            render: (h, params) => {
              if (params.row.commerceNameShow != 1) {
                return h("Select",{
                    props: {
                      size: "small",
                      value : parseInt(params.row.commerce_id)
                    },
                    on: {
                      'on-change':(value) => {
                        params.row.commerce_id = value;
                      }
                    },
                  },
                  this.commerceList.map(function(type){
                    return h('Option', {
                      props: {value: type.account_id}
                    }, type.nickname);
                  })
                );
              } else {
                let _str = params.row.commerce_name;
                return h("div", _str);
              }
            }
          },
          {
            title: "上级代理ID",
            key: "f_id",
            align: "center"
          },
          {
            title: "状态",
            align: "center",
            render(h, params) {
              let _str = '';
              if(params.row.status == '1' ){
                _str = '正常';
              }else{
                _str = '禁用';
              }
              return h("div", _str);
            }
          },
          {
            title: "授权日期",
            align: "center",
            key: "create_time"
          },
          {
            title: "开户银行",
            key: "bank_name",
            align: "center"
          },
          {
            title: "银行卡号",
            key: "bank_card_name",
            align: "center"
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              let reamrk = params.row.status == 0 ? "启用账号" : "禁用账号";

              if(params.row.agentLevelShow != 1){
                return h("div", [
                  h("Button",{
                      props: {
                        size: "small"
                      }
                    },
                    [
                      h(
                        "Poptip",
                        {
                          props: {
                            confirm: true,
                            title: "确定要更改状态么?",
                            placement : 'left'
                          },
                          on: {
                            "on-ok": () => {
                              this.disable(params.row.account_id, params.row.status);
                            }
                          }
                        },
                        reamrk
                      )
                    ]),
                  h("Button",{
                    props: {
                      size: "small"
                    }
                  }, [
                    h(
                      "Poptip",
                      {
                        props: {
                          confirm: true,
                          title: "确定要重置么?",
                          placement : 'left'
                        },
                        on: {
                          "on-ok": () => {
                            this.restartPwd(params.row.account_id);
                          }
                        }
                      },
                      "重置密码"
                    )
                  ]),
                  h("Button",{
                    props: {
                      size: "small"
                    }
                  }, [
                    h(
                      "Poptip",
                      {
                        props: {
                          confirm: true,
                          title: "确定要修改商务代表?",
                          placement : 'left'
                        },
                        on: {
                          "on-ok": () => {
                            params.row.commerceNameShow = 0;
                            params.row.agentLevelShow = 1;
                          },
                        }
                      },
                      "修改商务代表"
                    )
                  ]),
                  h("Button",{
                      props: {
                        size: "small"
                      }
                    },
                    [
                      h(
                        "Poptip",
                        {
                          props: {
                            confirm: true,
                            title: "确定要更改代理等级?",
                            placement : 'left'
                          },
                          on: {
                            "on-ok": () => {
                              this.updateAgentLevel(params.row.account_id, params.row.account_type);
                            },
                            "on-cancel" :() => {
                              params.row.agentLevelShow = 1;
                            }
                          }
                        },
                        "确定修改"
                      )
                    ])
                ]);
              }else if(params.row.commerceNameShow != 1){
                return h("div", [
                  h("Button",{
                      props: {
                        size: "small"
                      }
                    },
                    [
                      h(
                        "Poptip",
                        {
                          props: {
                            confirm: true,
                            title: "确定要更改状态么?",
                            placement : 'left'
                          },
                          on: {
                            "on-ok": () => {
                              this.disable(params.row.account_id, params.row.status);
                            }
                          }
                        },
                        reamrk
                      )
                    ]),
                  h("Button",{
                    props: {
                      size: "small"
                    }
                  }, [
                    h(
                      "Poptip",
                      {
                        props: {
                          confirm: true,
                          title: "确定要重置么?",
                          placement : 'left'
                        },
                        on: {
                          "on-ok": () => {
                            this.restartPwd(params.row.account_id);
                          }
                        }
                      },
                      "重置密码"
                    )
                  ]),
                  h("Button",{
                      props: {
                        size: "small"
                      }
                    },
                    [
                      h(
                        "Poptip",
                        {
                          props: {
                            confirm: true,
                            title: "确定要更改商务代表?",
                            placement : 'left'
                          },
                          on: {
                            "on-ok": () => {
                              this.updateCommerce(params.row.account_id, params.row.commerce_id);
                            },
                            "on-cancel" :() => {
                              params.row.commerceNameShow = 1;
                            }
                          }
                        },
                        "确定修改"
                      )
                    ]),
                  h("Button",{
                    props: {
                      size: "small"
                    }
                  }, [
                    h(
                      "Poptip",
                      {
                        props: {
                          confirm: true,
                          title: "确定要修改代理等级?",
                          placement : 'left'
                        },
                        on: {
                          "on-ok": () => {
                            params.row.commerceNameShow = 1;
                            params.row.agentLevelShow = 0;
                          }
                        }
                      },
                      "修改代理等级"
                    )
                  ])
                ]);
              }else{
                return h("div", [
                  h("Button",{
                      props: {
                        size: "small"
                      }
                    },
                    [
                      h(
                        "Poptip",
                        {
                          props: {
                            confirm: true,
                            title: "确定要更改状态么?",
                            placement : 'left'
                          },
                          on: {
                            "on-ok": () => {
                              this.disable(params.row.account_id, params.row.status);
                            }
                          }
                        },
                        reamrk
                      )
                    ]),
                  h("Button",{
                    props: {
                      size: "small"
                    }
                  }, [
                    h(
                      "Poptip",
                      {
                        props: {
                          confirm: true,
                          title: "确定要重置么?",
                          placement : 'left'
                        },
                        on: {
                          "on-ok": () => {
                            this.restartPwd(params.row.account_id);
                          }
                        }
                      },
                      "重置密码"
                    )
                  ]),
                  h("Button",{
                    props: {
                      size: "small"
                    }
                  }, [
                    h(
                      "Poptip",
                      {
                        props: {
                          confirm: true,
                          title: "确定要修改商务代表?",
                          placement : 'left'
                        },
                        on: {
                          "on-ok": () => {
                            params.row.commerceNameShow = 0;
                            params.row.agentLevelShow = 1;
                          }
                        }
                      },
                      "修改商务代表"
                    )
                  ]),
                  h("Button",{
                    props: {
                      size: "small"
                    }
                  }, [
                    h(
                      "Poptip",
                      {
                        props: {
                          confirm: true,
                          title: "确定要修改代理等级?",
                          placement : 'left'
                        },
                        on: {
                          "on-ok": () => {
                            params.row.commerceNameShow = 1;
                            params.row.agentLevelShow = 0;
                          }
                        }
                      },
                      "修改代理等级"
                    )
                  ])
                ]);
              }
            }
          }

        ],
        list: [],
        commerceList: [],
        agentLevel: {}
      };
    },
    created() {
      //this.getList(1);
    },
    methods: {
      getList:function (_o) {
        var self = this,
          keywords = self.keywords,
          str = '';

        /*if(!keywords){
          this.$Message.error('商务名称或ID不能为空！');
          return false;
        }*/

        if(_o == '1'){
          str = global.url.operation_agent_list;
        }else if(_o == '2'){
          str = global.url.educe_agent_list;
        }


        self.$http.get(str, {
          keywords: keywords
        }).then(result => {
          if(_o == '1'){
            this.list = result.data;
            this.commerceList = result.commerceList;
            this.agentLevel = result.agentLevel;
          }else{
            if(result.indexOf("execl") != -1 ){
              this.$Message.success('导出成功');
            }
          }
        });

      },
      cleanBox:function () {
        this.keywords = '';
      },
      //禁用 启用
      disable:function (account_id, status) {
        var self = this;
        if(status == 1){
          status = 0;
        }else if( status == 0){
          status = 1;
        }
        self.$http.get(global.url.operation_update_status, {
          account_id: account_id,
          status: status
        }).then(result => {
          if(result.affectedRows == 1){
            setTimeout(() => {
              this.getList(1);
            }, 500);
          }
        });
      },
      //重置密码
      restartPwd:function (account_id) {
        var self = this;
        self.$http.get(global.url.operation_restart_pwd, {
          account_id: account_id
        }).then(result => {
          this.$Message.success('重置成功');
          setTimeout(() => {
            this.getList(1);
          }, 500);
        });
      },
      //修改代理等级
      updateAgentLevel:function (account_id, AgentLevel) {
        var self = this;
        self.$http.get(global.url.operation_update_agent_level, {
          account_id: account_id,
          agent_level: AgentLevel
        }).then(result => {
          this.$Message.success('修改成功');
          setTimeout(() => {
            this.getList(1);
          }, 500);
        });
      },
      //修改商务代表
      updateCommerce:function (account_id, commerce_id) {
        var self = this;
        self.$http.get(global.url.operation_update_commerce, {
          account_id: account_id,
          commerce_id: commerce_id
        }).then(result => {
          this.$Message.success('修改成功');
          setTimeout(() => {
            this.getList(1);
          }, 500);
        });
      },
    }
  };
</script>
