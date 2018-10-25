<!--历史每日数据-->
<template>
  <div>
    <div class="content-bar">
      <Form inline>
        <FormItem label="代理ID:" :label-width="80">
          <Input v-model="account_id" placeholder="请输入代理ID..." style="width: 180px" />
        </FormItem>
        <FormItem label="时间:" :label-width="40">
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
        account_id:'',
        columns: [
          {
            title: "时间",
            align: "center",
            key: "times"
          },
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
            key: "couponCode"
          },
          {
            title: "剩余房卡",
            align: "center",
            key: "room_card"
          },
          {
            title: "充值",
            key: "item_price",
            align: "center"
          },
          {
            title: "开房数",
            key: "nums",
            align: "center"
          },
          {
            title: "绑码时间",
            key: "bind_time",
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
          accountId = self.account_id,
          s = '',
          e = '',
          str = '';

        if(!accountId){
          this.$Message.error('代理ID不能为空！');
          return false;
        }

        if(dateArr[0] == ''){
          if(_o == '2'){
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
            window.open(global.baseUrl + result, "_blank");
            if(result.indexOf("execl") != -1 ){
              this.$Message.success('导出成功');
            }
          }
        });

      },
      cleanBox:function () {
        this.dateTime = '';
        this.account_id = '';
      },
      educe:function () {
        alert(1);
      }
    }
  };
</script>
