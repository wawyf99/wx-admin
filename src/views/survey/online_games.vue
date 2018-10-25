<!--历史每日数据-->
<template>
  <div>
    <div id="myChart" class="myChart"></div>
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
        charts:{
          title : '',
          xAxisData : '',
          legendData : '',
          seriesData : '',
          content: '',
        }
      };
    },
    created() {
      this.getData();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
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
      getData(){
        let self = this;
        self.$http.get(global.url.survey_online_games).then(result => {
          self.charts.xAxisData = result.xAxis;
          self.charts.legendData = result.legend;
          self.charts.seriesData = result.series;
          self.charts.title = result.title;
          self.drawLine();
        });
      }
    }
  };
</script>
