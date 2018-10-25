<!--历史每日数据-->
<template>
  <div>
    <div class="content-bar">
      <Form inline>
        <FormItem :label-width="20">
          <Button type="primary" icon="ios-arrow-back" @click="goback">返回</Button>
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
  import cookie from "../../utils/cookie";
  export default {
    data() {
      return {
        dateTime: '',
        getId: '',
        columns: [
          {
            title: "时间",
            align: "center",
            key: "times"
          },
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
            render(h, params) {
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
            title: "商务代表",
            align: "center",
            key: "c_nickname"
          },
          {
            title: "地区",
            key: "location",
            align: "center"
          },
          {
            title: "充值金额",
            key: "buy_amount",
            align: "center"
          },
          {
            title: "直属返利",
            key: "z_amount",
            align: "center"
          },
          {
            title: "二级返利",
            key: "e_amount",
            align: "center"
          },
          {
            title: "开房数",
            key: "opens",
            align: "center"
          },
          {
            title: "直属团队人数",
            key: "z_nums",
            align: "center"
          },
          {
            title: "二级代理人数",
            key: "e_nums",
            align: "center"
          },
          {
            title: "上级代理ID",
            key: "f_id",
            align: "center"
          }
        ],
        list: [],
      };
    },
    created() {
      var self = this;
      var _id  = self.$route.query.id;
      if(_id){
        this.dateTime = self.$route.query.dateTime;
        this.getId = _id;
        this.getList(1,self.$route.query.startTime, self.$route.query.endTime);
      }
    },
    methods: {
      getList:function (_o, sT, eT) {
        var self = this,
          dateArr = self.dateTime,
          s = '',
          e = '',
          str = '';

        if(sT){
          s = sT;
          e = eT;
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

        this.setTime(s, e);

        if(_o == '1'){
          str = global.url.survey_agent_list;
        }else if(_o == '2'){
          str = global.url.educe_agent_list;
        }

        self.$http.get(str, {
          btime: s,
          etime: e,
          id : this.getId
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
      cleanBox:function () {
        this.dateTime = '';
      },
      educe:function () {
        alert(1);
      },
      goback:function () {
        this.$router.push({
          path: "/survey/commerce_list",
          query: {
            type: 1,
          }
        });
      },
      setTime:function (s, e) {
        var info = cookie.getCookie();
        info.s = s;
        info.e = e;
        cookie.info = info;
        cookie.setCookie();
      }
    }
  };
</script>
