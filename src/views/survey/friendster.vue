<!--历史每日数据-->
<template>
  <div>
    <div class="content-bar">
      <Form inline>
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
            key: "end_time"
          },
          {
            title: "亲友圈ID",
            align: "center",
            key: "club_id"
          },
          {
            title: "亲友圈名称",
            align: "center",
            key: "club_name"
          },
          {
            title: "创建者名称",
            align: "center",
            key: "create_user_nikename"
          },

          {
            title: "房卡消耗",
            align: "center",
            key: "all_cost"
          },
          {
            title: "AA支付消耗房卡数",
            align: "center",
            key: "aa_cost"
          },
          {
            title: "房主支付消耗房卡数",
            align: "center",
            key: "house_cost"
          },
          {
            title: "总场次",
            key: "screening",
            align: "center"
          },
          {
            title: "活跃用户数",
            key: "active",
            align: "center"
          },
          {
            title: "非活跃用户数",
            key: "noActive",
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
          e = '';

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
        self.$http.get(global.url.survey_friendster, {
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
