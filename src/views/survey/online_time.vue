<!--历史每日数据-->
<template>
  <div>
    <div class="content-bar">
      <Form inline>
        <FormItem label="系统平台:" :label-width="80">
          <Select v-model="model1" style="width:200px">
            <Option v-for="item in osList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="时间:" :label-width="80">
          <DatePicker v-model="dateTime" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="选择时间段..." style="width: 180px"></DatePicker>
        </FormItem>
        <FormItem :label-width="0">
          <Button type="primary" icon="ios-search" @click="getList()">查询</Button>
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
        osList: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '1',
            label: 'PC-电脑端'
          },
          {
            value: '2',
            label: 'ANDROID-安卓端'
          },
          {
            value: '3',
            label: 'IOS-苹果端'
          }
        ],
        model1: '',
        columns: [
          {
            title: "时间",
            align: "center",
            key: "time"
          },
          {
            title: "系统平台",
            align: "center",
            key: "os",
            render(h, params) {
              let _str = '';
              if(params.row.os == '1' ){
                _str = 'PC-电脑端';
              }else if(params.row.os == '2' ){
                _str = 'ANDROID-安卓端';
              }else if(params.row.os == '3' ){
                _str = 'IOS-苹果端';
              }
              return h("div", _str);
            }
          },
          {
            title: "登录人数",
            align: "center",
            key: "nums"
          },
          {
            title: "一分钟内",
            align: "center",
            key: "oneRow"
          },
          {
            title: "一到五分钟",
            align: "center",
            key: "twoRow"
          },
          {
            title: "五分钟到半小时",
            align: "center",
            key: "threeRow"
          },
          {
            title: "半小时至一小时",
            key: "fourRow",
            align: "center"
          },
          {
            title: "一小时至三小时",
            key: "fiveRow",
            align: "center"
          },
          {
            title: "三小时至六小时",
            key: "sixRow",
            align: "center"
          },
          {
            title: "六小时以上",
            key: "sevenRow",
            align: "center"
          }
        ],
        list: [],
      };
    },
    created() {

    },
    methods: {
      getList:function () {
        var self = this,
          dateArr = self.dateTime,
          s = '',
          e = '',
          selectValue = self.model1;

        if(dateArr[0] == ''){
          this.$Message.error('查询时间不能为空！');
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

        self.$http.get(global.url.survey_online_time, {
          value: selectValue,
          btime: s,
          etime: e
        }).then(result => {
          this.list = result;
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
