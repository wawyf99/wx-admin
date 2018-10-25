<!--历史每日数据-->
<template>
  <div>
    <div class="content-bar">
      <Form inline>
        <FormItem label="代理ID:" :label-width="80" inline>
          <Input v-model="account_id" placeholder="请输入代理ID..." style="width: 180px" />
        </FormItem>
        <FormItem :label-width="0">
          <Button type="primary" icon="ios-search" @click="getList(1)">查询</Button>
          &nbsp;
          <Button type="error" icon="android-close" @click="cleanBox()">清空</Button>
        </FormItem>
      </Form>
    </div>
    <Table border :columns="columns" :data="list"></Table>
  </div>
</template>
<style>
  @import "../../assets/style/common.css";
</style>
<script>
  export default {
    data() {
      return {
        dateTime: '',
        account_id:'',
        columns: [
          {
            title: "游戏UID",
            align: "center",
            key: "userId"
          },
          {
            title: "游戏昵称",
            align: "center",
            key: "nickname"
          },
          {
            title: "优惠码",
            align: "center",
            render: (h, params) => {
              if (params.row.couponCodeShow != 1) {
                return h("InputNumber", {
                  props: {
                    value: params.row.couponCode,
                    step: 1,
                    min: 100000,
                    max: 999999
                  },
                  on: {
                    "on-change": newValue => {
                      params.row.couponCode = newValue;
                    }
                  }
                });
              } else {
                let _str = params.row.couponCode;
                return h("div", _str);
              }
            }
          },
          {
            title: "绑码时间",
            key: "bind_time",
            align: "center"
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              if (params.row.couponCodeShow != 1) {
                return h("div", [
                  h(
                    "Button",
                    {
                      props: {
                        size: "small"
                      },
                      on: {
                        click: () => {
                          let self = this;
                          self.$http.get(global.url.operation_check_couponCode, {
                            code : params.row.couponCode
                          }).then(result => {
                            if(result[0].num < 1){
                              //alert(1)
                              this.$Message.error('该优惠码不存在！');
                              return false;
                              //params.row.couponCode = params.row.couponCode;
                            }else{
                              this.updateCouponCode(params.row.userId, params.row.couponCode);
                            }
                          });
                        }
                      }
                    },
                    "确定修改"
                  ),
                ]);
              } else {
                return h("div", [
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
                          title: "确定要修改优惠码?",
                          placement : 'left'
                        },
                        on: {
                          "on-ok": () => {
                            params.row.couponCodeShow = 0;
                          }
                        }
                      },
                      "修改优惠码"
                    )
                  ]),
                ]);
              }
            }
          }
        ],
        list: [],
      };
    },
    created() {

    },
    methods: {
      getList:function (_o) {
        var self = this,
          dateArr = self.dateTime,
          accountId = self.account_id,
          s = '',
          e = '',
          str = '';
        if(!accountId){
          this.$Message.error('代理ID不能为空！');
          return false;
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

        if(_o == '1'){
          str = global.url.survey_direct_team;
        }else if(_o == '2'){
          str = global.url.educe_direct_team;
        }

        self.$http.get(str, {
          btime: s,
          etime: e,
          accountId : accountId
        }).then(result => {
          if(_o == '1'){
            this.list = result;
          }else{
            if(result.indexOf("execl") != -1 ){
              this.$Message.success('导出成功');
            }
          }
        });

      },
      updateCouponCode:function(useid, couponCode){
        console.log(useid +"-"+couponCode);
        var self = this;
        self.$http.get(global.url.operation_update_Coupon_Code, {
          account_id: useid,
          coupon_code: couponCode
        }).then(result => {
          this.$Message.success('修改成功');
          setTimeout(() => {
            this.getList(1);
          }, 500);
        });
      },
      cleanBox:function () {
        this.dateTime = '';
        this.account_id = '';
      }
    }
  };
</script>
