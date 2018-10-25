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
          <Button type="error" icon="android-close" @click="cleanBox('')">清空</Button>
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
  import cookie from "../../utils/cookie";
  export default {
    data() {
      return {
        dateTime: '',
        startTime: '',
        endTime: '',
        columns: [
          {
            title: "时间",
            align: "center",
            key: "times"
          },
          {
            title: "手机号码",
            align: "center",
            key: "mobile"
          },
          {
            title: "姓名",
            align: "center",
            render: (h, params) => {
              return h("div",{
                style:{
                  color : 'blue',
                  cursor : 'pointer'
                },
                on: {
                  click: () => {
                    this.jumpLink( params.row.account_id);
                  }
                }
              }, params.row.name);
            }
          },
          {
            title: "上级",
            align: "center",
            render(h, params) {
              let _str = '';
              if(params.row.superior == '超级管理员' ){
                _str = '公司';
              }else{
                _str = params.row.superior;
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
                _str = '禁用';
              }else{
                _str = '正常';
              }
              return h("div", _str);
            }
          },
          {
            title: "区域",
            key: "location",
            align: "center"
          },
          {
            title: "充值",
            key: "item_price",
            align: "center"
          },
          {
            title: "返利",
            key: "amount",
            align: "center"
          },
          {
            title: "开房数",
            key: "num",
            align: "center"
          }
        ],
        list: [],
      };
    },
    created() {
      var info = cookie.getCookie();
      if(this.$route.query.type){
        if(info.s || info.e){
          this.startTime = info.s;
          this.endTime = info.e;
          this.dateTime = [info.s, info.e];
          this.getList(1);
        }
      }
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
