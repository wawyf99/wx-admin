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
            key: "time"
          },
          {
            title: "总房次",
            align: "center",
            key: "roomTimes"
          },
          {
            title: "房主支付",
            align: "center",
            key: "payHouser"
          },
          {
            title: "AA支付",
            align: "center",
            key: "payAA"
          },
          {
            title: "房卡消耗",
            align: "center",
            key: "consume"
          },
          {
            title: "总充值(元)",
            align: "center",
            key: "recharge"
          },
          {
            title: "付费人次",
            key: "payTimes",
            align: "center"
          },
          {
            title: "付费人数",
            key: "payNums",
            align: "center"
          },
          {
            title: "分享人数",
            key: "shareNums",
            align: "center"
          },
          {
            title: "分享人次",
            key: "shareTimes",
            align: "center"
          },
          {
            title: "赠送房卡",
            key: "presentCards",
            align: "center"
          },
          {
            title: "登录人数",
            key: "login",
            align: "center"
          },
          {
            title: "活跃人数",
            key: "active",
            align: "center"
          },
          {
            title: "代理人数",
            key: "agent",
            align: "center"
          },
          {
            title: "下载人数",
            key: "download",
            align: "center"
          },
          {
            title: "新增人数",
            key: "addPerson",
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
          str = global.url.survey_day;
        }else if(_o == '2'){
          str = global.url.educe_day;
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
