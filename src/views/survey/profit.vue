<!--历史盈利数据-->
<template>
  <div>
    <div class="content-bar">
      <Form inline>
        <FormItem label="开始月份:" :label-width="80">
          <DatePicker v-model="oneMonth" format="yyyy-MM" type="month" placement="bottom-start" placeholder="选择开始月份..." style="width: 120px"></DatePicker>
        </FormItem>
        <FormItem label="结束月份:" :label-width="80">
          <DatePicker v-model="twoMonth" format="yyyy-MM" type="month" placement="bottom-start" placeholder="选择结束月份..." style="width: 120px"></DatePicker>
        </FormItem>
        <FormItem :label-width="50">
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
        oneMonth: '',
        twoMonth: '',
        columns: [
          {
            title: "时间",
            align: "center",
            key: "time"
          },
          {
            title: "月登录人数",
            align: "center",
            key: "login"
          },
          {
            title: "月代理人数",
            align: "center",
            key: "agent"
          },
          {
            title: "月总房次",
            align: "center",
            key: "roomTimes"
          },
          {
            title: "日均开房",
            align: "center",
            key: "roomTime"
          },
          {
            title: "月房卡消耗",
            align: "center",
            key: "consume"
          },
          {
            title: "日均房卡消耗",
            key: "consumes",
            align: "center"
          },
          {
            title: "月总充值(元)",
            key: "recharge",
            align: "center"
          },
          {
            title: "月付费人数",
            key: "payNums",
            align: "center"
          },
          {
            title: "月ARPPU",
            key: "arpp",
            align: "center"
          },
          {
            title: "毛利润(元)",
            key: "amount",
            align: "center"
          },
          {
            title: "毛利润占比",
            key: "scale",
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
          oneMonth = self.oneMonth,
          twoMonth = self.twoMonth,
          s = '',
          e = '',
          str = '';

        if(_o == '1'){
          if(!oneMonth){
            this.$Message.error('开始月份不能为空！');
            return false;
          }
          if(!twoMonth){
            this.$Message.error('结束月份不能为空！');
            return false;
          }
        }else if(_o == '2'){
          if(!oneMonth){
            this.$Message.error('导出开始月份不能为空！');
            return false;
          }
          if(!twoMonth){
            this.$Message.error('导出结束月份不能为空！');
            return false;
          }
        }

        if(oneMonth > twoMonth){
          s = twoMonth;
          e = oneMonth;
        }else{
          s = oneMonth;
          e = twoMonth;
        }

        if (s) {
          let tempb = new Date(s);
          s =
            tempb.getFullYear() +
            "-" + this.addPreZero((parseInt(tempb.getMonth()) + 1)) + '-01';
        }
        if (e) {
          let tempe = new Date(e);
          e =
            tempe.getFullYear() +
            "-" + this.addPreZero((parseInt(tempe.getMonth()) + 1)) + '-' + this.getDaysInOneMonth(tempe.getFullYear(),parseInt(tempe.getMonth()) + 1);
        }
        if(_o == '1'){
          str = global.url.survey_profit;
        }else if(_o == '2'){
          str = global.url.educe_profit;
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
      //清除
      cleanBox:function () {
        this.oneMonth = '';
        this.twoMonth = '';
      },
      //导出
      educe:function () {
        alert(1);
      },
      //补零
      addPreZero:function (num) {
        return ('0'+num).slice(-2);
      },
      //获取指定月份的天数
      getDaysInOneMonth:function (year, month) {
        month = parseInt(month, 10);
        var d = new Date(year, month, 0);
        return d.getDate();
      }
    }
  };
</script>
