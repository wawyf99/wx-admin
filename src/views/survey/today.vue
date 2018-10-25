<!--实时数据-->
<template>
  <!--<Form ref="ruleCustom" :label-width="80" inline>
  <FormItem label="统计日期:">
      <Input type="text" v-model="btime" readonly placeholder="选择开始时间" style="width: 200px"></Input>
     至&nbsp;<Input type="text" v-model="etime" readonly placeholder="选择结束时间" style="width: 200px"></Input>
  </FormItem>
</Form>
<Table border :columns="columns" :data="list"></Table>-->
  <div class="box">
    <div class="title">当前日期：{{today}}</div>
    <div class="box-one out clearfix">
      <div class="left">
        <div>总房次</div>
        <div>房主支付</div>
        <div>AA支付</div>
        <div>房卡消耗</div>
      </div>
      <div class="middle">
        <i class="i-top"></i>
        <i class="i-middle"></i>
        <i class="i-bottom"></i>
      </div>
      <div class="right">
        <ul>
          <li class="a" v-bind:style="{width:columns[1].all_screen_width}"></li>
          <li class="b">{{columns[0].all_screen}}</li>
        </ul>
        <ul>
          <li class="a" v-bind:style="{width:columns[1].pay_houser_width}"></li>
          <li class="b">{{columns[0].pay_houser}}</li>
        </ul>
        <ul>
          <li class="a" v-bind:style="{width:columns[1].pay_aa_width}"></li>
          <li class="b">{{columns[0].pay_aa}}</li>
        </ul>
        <ul>
          <li class="a" v-bind:style="{width:columns[1].expend_room_key_width}"></li>
          <li class="b">{{columns[0].expend_room_key}}</li>
        </ul>
      </div>
    </div>
    <div class="box-two out clearfix">
      <div class="left">
        <div>总充值</div>
        <div>付费人次</div>
        <div>付费人数</div>
      </div>
      <div class="middle">
        <i class="i-top"></i>
        <i class="i-middle"></i>
        <i class="i-bottom"></i>
      </div>
      <div class="right">
        <ul>
          <li class="a" v-bind:style="{width:columns[1].recharge_width}"></li>
          <li class="b">{{columns[0].recharge}}</li>
        </ul>
        <ul>
          <li class="a" v-bind:style="{width:columns[1].pay_times_width}"></li>
          <li class="b">{{columns[0].pay_times}}</li>
        </ul>
        <ul>
          <li class="a" v-bind:style="{width:columns[1].pay_nums_width}"></li>
          <li class="b">{{columns[0].pay_nums}}</li>
        </ul>
      </div>
    </div>
    <div class="box-three out clearfix">
      <div class="left">
        <div>分享人次</div>
        <div>分享人数</div>
        <div>赠送房卡</div>
      </div>
      <div class="middle">
        <i class="i-top"></i>
        <i class="i-middle"></i>
        <i class="i-bottom"></i>
      </div>
      <div class="right">
        <ul>
          <li class="a" v-bind:style="{width:columns[1].share_times_width}"></li>
          <li class="b">{{columns[0].share_times}}</li>
        </ul>
        <ul>
          <li class="a" v-bind:style="{width:columns[1].share_nums_width}"></li>
          <li class="b">{{columns[0].share_nums}}</li>
        </ul>
        <ul>
          <li class="a" v-bind:style="{width:columns[1].presented_room_key_width}"></li>
          <li class="b">{{columns[0].presented_room_key}}</li>
        </ul>
      </div>
    </div>
    <div class="box-four out clearfix">
      <div class="left">
        <div>登录人数</div>
        <div>活跃人数</div>
        <div>代理人数</div>
        <div>下载人数</div>
        <div>新增人数</div>
        <div>在线人数</div>
      </div>
      <div class="middle">
        <i class="i-top"></i>
        <i class="i-middle"></i>
        <i class="i-bottom"></i>
      </div>
      <div class="right">
        <ul>
          <li class="a" v-bind:style="{width:columns[1].login_width}"></li>
          <li class="b">{{columns[0].login}}</li>
        </ul>
        <ul>
          <li class="a" v-bind:style="{width:columns[1].active_width}"></li>
          <li class="b">{{columns[0].active}}</li>
        </ul>
        <ul>
          <li class="a" v-bind:style="{width:columns[1].agent_width}"></li>
          <li class="b">{{columns[0].agent}}</li>
        </ul>
        <ul>
          <li class="a" v-bind:style="{width:columns[1].download_width}"></li>
          <li class="b">{{columns[0].download}}</li>
        </ul>
        <ul>
          <li class="a" v-bind:style="{width:columns[1].new_register_width}"></li>
          <li class="b">{{columns[0].new_register}}</li>
        </ul>
        <ul>
          <li class="a" v-bind:style="{width:columns[1].online_width}"></li>
          <li class="b">{{columns[0].online}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style>
  .box{
    padding: 20px;
    margin: auto;
    width: 40%;
    height: auto;
    background: #FFF;
    box-shadow: 0px 0px 10px 5px #eee;
    margin-top: 40px;
  }
  .clearfix:after{
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
  }
  .clearfix{
    zoom:1;
  }
  .box .title{
    text-align: center;
    margin-bottom: 20px;
  }
  .box .out{
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    justify-content: center;
  }
  .box .out .left>div{
    width: 60px;
    height: 36px;
    line-height: 36px;
    text-align:justify;
    text-align-last:justify;
  }
  .box .out .middle{
    width: 10px;
    border-right: 2px solid #696969;
    height: 110px;
    position: relative;
    margin-right: 20px;
    margin-left: 20px;
    margin-top: 17px;
  }
  .box .out .middle .i-top{
    background: url("../../assets/image/line.jpg") no-repeat;
    background-size: contain;
    width: 10px;
    height: 2px;
    display: block;
    position: absolute;
    top: 0px;
  }
  .box .out .middle .i-bottom{
    background: url("../../assets/image/line.jpg") no-repeat;
    background-size: contain;
    width: 10px;
    height: 2px;
    display: block;
    position: absolute;
    bottom: 0px;
  }
  .box .out .middle .i-middle{
    background: url("../../assets/image/line.jpg") no-repeat;
    background-size: contain;
    width: 10px;
    height: 2px;
    display: block;
    position: absolute;
    bottom: 0px;
    top: 0px;
    right: -10px;
    margin: auto;
  }
  .box .out.box-two .middle{
    width: 10px;
    border-right: 2px solid #696969;
    height: 75px;
    position: relative;
    margin-right: 20px;
    margin-left: 20px;
    margin-top: 17px;
  }
  .box .out.box-three .middle{
    width: 10px;
    border-right: 2px solid #696969;
    height: 75px;
    position: relative;
    margin-right: 20px;
    margin-left: 20px;
    margin-top: 17px;
  }
  .box .out.box-four .middle{
    width: 10px;
    border-right: 2px solid #696969;
    height: 182px;
    position: relative;
    margin-right: 20px;
    margin-left: 20px;
    margin-top: 17px;
  }
  .box .out .right>ul{
    height: 36px;
    width: 200px;
    line-height: 36px;
    position: relative;
    list-style: none;
    display: flex;
    justify-content: start;
  }
  .box .out .right>ul .a{
    width: 180px;
    height: 20px;
    margin-top: 8px;
    background: red;
    margin-right: 10px;
  }

</style>
<script>

  export default {
    data() {
      return {
        today: "",
        columns: [
          {
            online : 8,
            presented_room_key : 0,
            share_nums : 0,
            online: 0,
            new_register : 0,
            download : 0,
            agent : 0,
            active : 0,
            login : 0,
            share_times : 0,
            pay_nums : 0,
            pay_times : 0,
            recharge : 0,
            expend_room_key : 0,
            pay_aa : 0,
            pay_houser : 0,
            all_screen : 0
          },
          {
            online_width : 0,
            presented_room_key_width : 0,
            share_nums_width : 0,
            online_width: 0,
            new_register_width : 0,
            download_width : 0,
            agent_width : 0,
            active_width : 0,
            login_width : 0,
            share_times_width : 0,
            pay_nums_width : 0,
            pay_times_width : 0,
            recharge_width : 0,
            expend_room_key_width : 0,
            pay_aa_width : 0,
            pay_houser_width : 0,
            all_screen_width : 0
          }
        ],
        list: []
      };
    },
    created() {
      let tempb = new Date();
      let b =
        tempb.getFullYear() +
        "-" +
        (parseInt(tempb.getMonth()) + 1) +
        "-" +
        tempb.getDate();
      this.btime = b + " 00:00:00";
      this.etime = b + " 23:59:59";
      this.getList();
    },
    methods: {
      getList() {
        var self = this;
        self.$http.get(global.url.report_realtime, {}).then(result => {
          if(result){
            self.$http.get('http://gsapi.sxmj.szdhkj.com.cn/OnlineInfo.app?', {}).then(res => {
            //self.$http.get('http://47.106.145.194/OnlineInfo.app?', {}).then(res => {
              var _str = res.split("  ");
              _str = _str[0];
              _str = _str.split(" ");
              _str = _str[2];
              _str = _str.split("}");
              _str = _str[0];
              _str = _str.split(":");
              _str = _str[1];
              result[0].online = _str;
              self.columns[0].online = result[0].online;
              for (var i in result[0]){
                if(i == 'today'){
                  self.today = result[0][i];
                }else{
                  self.columns[0][i] = result[0][i];
                  var _n = parseInt(result[0][i])/5;
                  self.columns[1][i+"_width"] = _n+"px";
                }
              }
            });
          }
        });
      }
    }
  };
</script>
