<!--历史每日数据-->
<template>
  <div>
    <div class="content-bar">
      <Form inline>
        <FormItem label="时间:" :label-width="80">
          <DatePicker v-model="dateTime" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="选择时间段..." style="width: 180px"></DatePicker>
        </FormItem>
        <FormItem :label-width="0">
          <Button type="primary" icon="ios-search" @click="getList(1)">查询</Button>
          &nbsp;
          <Button type="error" icon="android-close" @click="cleanBox()">清空</Button>
          &nbsp;
          <Button type="warning" icon="ios-printer" @click="getList(2)">导出</Button>
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

    },
    methods: {
      getList:function (_o) {
        var self = this,
          dateArr = self.dateTime,
          s = '',
          e = '',
          str = '';

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

        if(_o == '1'){
          str = global.url.survey_agent_list;
        }else if(_o == '2'){
          str = global.url.educe_agent_list;
        }

        self.$http.get(str, {
          btime: s,
          etime: e
        }).then(result => {
          if(_o == '1'){
            this.list = result;
          }else{
            window.open(global.baseUrl + result, "_blank");
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
      }
    }
  };
</script>
