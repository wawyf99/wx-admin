<!--历史每日数据-->
<template>
  <div class="operation-list">
<!--    <div class="content-bar">
      <Form inline>
        <FormItem label="时间:" :label-width="80">
          <DatePicker v-model="dateTime" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="选择时间段..." style="width: 180px"></DatePicker>
        </FormItem>
        <FormItem :label-width="0">
          <Button type="primary" icon="ios-search" @click="getList(1)">查询</Button>
          &nbsp;
          <Button type="error" icon="android-close" @click="cleanBox('')">清空</Button>
          &nbsp;
          <Button type="warning" icon="ios-printer" @click="getList(2)">导出</Button>
        </FormItem>
      </Form>
    </div>-->
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
        dateTime: '',
        startTime: '',
        endTime: '',
        columns: [
          {
            title: "手机号码",
            align: "center",
            key: "mobile"
          },
          {
            title: "姓名",
            align: "center",
            key : "name"
          },
          {
            title: "区域",
            key: "location",
            align: "center"
          },
          {
            title: "身份证号码",
            key: "identity_card",
            align: "center"
          },
          {
            title: "开户银行",
            key: "bank_name",
            align: "center"
          },
          {
            title: "银行卡号",
            key: "bank_number",
            align: "center"
          },
          {
            title: "上级",
            align: "center",
            render: (h, params) =>  {
              if(params.row.showSuperior == 1){
                let _str = '';
                if(params.row.superior == '超级管理员' ){
                  _str = '公司';
                }else{
                  _str = params.row.superior;
                }
                return h("div", _str);
              }else{
                return h("Select",{
                    props: {
                      size: "small",
                      value : parseInt(params.row.superiorId)
                    },
                    on: {
                      'on-change':(value) => {
                        params.row.superiorId = value;
                      }
                    },
                  },
                  this.superiorList.map(function(type){
                    return h('Option', {
                      props: {value: type.accountId}
                    }, type.nickname);
                  })
                );
              }
            }
          },
          {
            title: "状态",
            align: "center",
            render(h, params) {
              let _str = '';
              if(params.row.status == '0' ){
                _str = '正常';
              }else{
                _str = '禁用';
              }
              return h("div", _str);
            }
          },
          {
            title: "授权日期",
            key: "createt_time",
            align: "center"
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              let reamrk = params.row.status == 1 ? "启用账号" : "禁用账号";

              if(params.row.showSuperior == 1){
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
                      "重置账户密码"
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
                          title: "确定要修改上级?",
                          placement : 'left'
                        },
                        on: {
                          "on-ok": () => {
                            params.row.showSuperior = 0;
                          }
                        }
                      },
                      "修改上级"
                    )
                  ]),
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
                      "重置账户密码"
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
                            title: "确定要更改上级?",
                            placement : 'left'
                          },
                          on: {
                            "on-ok": () => {
                              this.updateSuperior(params.row.account_id, params.row.superiorId)
                            },
                            "on-cancel" :() => {
                              params.row.showSuperior = 1
                            }
                          }
                        },
                        "确定修改"
                      )
                    ])
                ]);
              }

            }
          }
        ],
        list: [],
        superiorList: []
      };
    },
    created() {
      this.startTime = '2018-01-01';
      this.endTime = '2099-01-01';
      this.getList(1, this.startTime, this.endTime);
    },
    methods: {
      jumpLink:function(id){
        let self = this;
        self.$router.push({
          path: "/survey/commerce_search",
          query: {
            id: id,
            startTime: this.startTime,
            endTime:this.endTime
          }
        });
      },
      getList:function (_o, st, se) {
        var self = this,
          dateArr = self.dateTime,
          s = '',
          e = '',
          str = '';

        if(st){
          s = st;
          e = se;
        }else{
          if(dateArr[0] == ''){
            if(_o == '1'){
              this.$Message.error('查询时间不能为空！');
              return false;
            }else if(_o == '2'){
              this.$Message.error('导出时间不能为空！');
              return false;
            }
          }
          if (dateArr[0]) {
            let tempb = new Date(dateArr[0]);
            s =
              tempb.getFullYear() +
              "-" +
              (parseInt(tempb.getMonth()) + 1) +
              "-" +
              tempb.getDate();
          }
          if (dateArr[1]) {
            let tempe = new Date(dateArr[1]);
            e =
              tempe.getFullYear() +
              "-" +
              (parseInt(tempe.getMonth()) + 1) +
              "-" +
              tempe.getDate();
          }
        }

        this.startTime = s;
        this.endTime = e;
        if(_o == '1'){
          str = global.url.survey_commerce_list;
        }else if(_o == '2'){
          str = global.url.educe_commerce_list;
        }

        self.$http.get(str, {
          btime: s,
          etime: e
        }).then(result => {
          if(_o == '1'){
            this.list = result.data;
            this.superiorList = result.superiorList;
          }else{
            window.open(global.baseUrl + result, "_blank");
            if(result.indexOf("execl") != -1 ){
              this.$Message.success('导出成功');
            }
          }
        });

      },
      //禁用 启用
      disable:function (account_id, status) {
        var self = this;
        if(status == 1){
          status = 0;
        }else if( status == 0){
          status = 1;
        }
        self.$http.get(global.url.operation_commerce_update_status, {
          account_id: account_id,
          status: status
        }).then(result => {
          if(result.affectedRows == 1){
            setTimeout(() => {
              this.getList(1, this.startTime, this.endTime);
            }, 500);
          }
        });
      },
      //重置密码
      restartPwd:function (account_id) {
        var self = this;
        self.$http.post(global.url.commerce_restart, {
          aid: account_id
        }).then(result => {
          this.$Message.success('重置成功');
          setTimeout(() => {
            this.getList(1, this.startTime, this.endTime);
          }, 500);
        });
      },
      //修改代理等级
      updateSuperior:function (account_id, superior_id) {
        var self = this;
        self.$http.get(global.url.operation_update_commerce_superior_id, {
          account_id: account_id,
          superior_id: superior_id
        }).then(result => {
          this.$Message.success('修改成功');
          setTimeout(() => {
            this.getList(1, this.startTime, this.endTime);
          }, 500);
        });
      },
      cleanBox:function () {
        this.dateTime = '';
      },
      educe:function () {
        alert(1);
      }
    }
  };
</script>
