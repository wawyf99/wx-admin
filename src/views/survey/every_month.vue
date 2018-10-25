<!--历史每月数据-->
<template>
  <div>
    <div class="content-bar">
      <Form inline>
        <FormItem label="查询月份:" :label-width="80">
          <DatePicker v-model="dateTime" format="yyyy年MM月" type="month" placement="bottom-start" placeholder="选择时间段..." style="width: 180px"></DatePicker>
        </FormItem>
        <FormItem :label-width="0">
          <Button type="primary" icon="ios-search" @click="getList">查询</Button>
          &nbsp;
          <Button type="error" icon="android-close" @click="cleanBox()">清空</Button>
        </FormItem>
      </Form>
    </div>
    <Tabs v-model="active">
      <TabPane label="开房数据" name="openHouse" icon="android-open">
        <div class="charts-content">{{charts.content1}}</div>
        <div id="myChart1" class="myChart"></div>
      </TabPane>
      <TabPane label="充值数据" name="recharge" icon="social-usd">
        <div class="charts-content">{{charts.content2}}</div>
        <div id="myChart2" class="myChart"></div>
      </TabPane>
      <TabPane label="分享数据" name="share" icon="android-share-alt">
        <div class="charts-content">{{charts.content3}}</div>
        <div id="myChart3" class="myChart"></div>
      </TabPane>
      <TabPane label="登录数据" name="login" icon="log-in">
        <div class="charts-content">{{charts.content4}}</div>
        <div id="myChart4" class="myChart"></div>
      </TabPane>
      <TabPane label="新增数据" name="addPerson" icon="android-person-add">
        <div class="charts-content">{{charts.content5}}</div>
        <div id="myChart5" class="myChart"></div>
      </TabPane>
    </Tabs>
    <!--    <Table border :columns="columns" :data="list"></Table>-->
  </div>
</template>
<style>
  @import "../../assets/style/common.css";
</style>
<script>
  export default {
    data() {
      return {
        dateTime : '',
        active : 'openHouse',
        charts:{
          title : '',
          xAxisData : '',
          legendData : '',
          seriesData : '',
          content1: '',
          content2: '',
          content3: '',
          content4: '',
          content5: ''
        }
      };
    },
    created() {

    },
    methods: {
      drawLine(_n) {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'+_n));
        // 绘制图表
        myChart.setOption({
          title: {
            text: this.charts.title,
            left  : 'center',
            top : 20
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:this.charts.legendData,
            bottom : 'bottom'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.charts.xAxisData
          },
          yAxis: { type: 'value'},
          series: this.charts.seriesData,
        });
      },
      getList(){
        var self = this,
          dateArr = self.dateTime,
          active = self.active;
        if(!self.dateTime){
          this.$Message.error('查询时间不能为空！');
          return false;
        }else{
          let temp = new Date(dateArr);
          dateArr =
            temp.getFullYear() +
            "-" +
            this.addPreZero((parseInt(temp.getMonth()) + 1)) +
            "-" +
            this.addPreZero(temp.getDate());
        }

        self.$http.get(global.url.survey_month, {
          time : dateArr,
          active : active
        }).then(result => {
          if(result){
            this.charts.xAxisData = result.xAxis;
            this.charts.legendData = result.legend;
            this.charts.seriesData = result.series;
            this.charts.title = result.title;
            this.drawLine(result.sort);
            switch (result.sort) {
              case 1:
                this.charts.content1 = result.content;
                break;
              case 2:
                this.charts.content2 = result.content;
                break;
              case 3:
                this.charts.content3 = result.content;
                break;
              case 4:
                this.charts.content4 = result.content;
                break;
              case 5:
                this.charts.content5 = result.content;
                break;
            }
          }
        });
      },
      //补零
      addPreZero:function (num) {
        return ('0'+num).slice(-2);
      },
      cleanBox(){
        this.dateTime = '';
      }
    },
    mounted(){

    }
  };
</script>
