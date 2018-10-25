<!--提现管理-->
<template>
  <div>
    <div class="content-bar">
      <Form ref="ruleCustom" :label-width="80" inline>
        <FormItem label="手机号码:">
          <Input v-model="key" type='text' placeholder="请输入商务账号..."></Input>
        </FormItem>
        <FormItem label="查询月份:">
          <DatePicker type="month" format="yyyy-MM" v-model="seachTime" placeholder="选择查询月份" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="getList(1)">查询</Button>
          <Button  @click="empty()">清空条件</Button>
          <!-- <Button  @click="output()">导出</Button> -->
        </FormItem>
      </Form>
    </div>
    <Table border :columns="columns" @on-row-dblclick="show" height="" :data="list"></Table>
    <Modal v-model="modal" @on-ok="audit" @on-cancel="cancel" title="提现审核">
      <Form ref="form" :label-width="100">
        <FormItem label="昵称[账号]:">
          {{info.nickname}}[{{info.mobile}}]
        </FormItem>
        <FormItem label="开户名:">
          <b>{{info.nickname}}</b>
        </FormItem>
        <FormItem label="开户行:">
          <b>{{info.bank_name}}</b>
        </FormItem>
        <FormItem label="卡号:">
          <b>{{info.bank_number}}</b>
        </FormItem>
        <FormItem label="手机号码:">
          <b>{{info.mobile}}</b>
        </FormItem>
        <FormItem label="提现金额:">
          <b>{{info.amount}}</b>
        </FormItem>
        <FormItem label="审核状态:" v-if="info.status == 0">
          <RadioGroup v-model="status">
            <Radio label="1">
              <Icon type="android-done"></Icon>
              <span>审核通过</span>
            </Radio>
            <Radio label="2">
              <Icon type="android-close"></Icon>
              <span>审核失败</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="备注:" v-if="info.status == 0" >
          <Input v-model="remark" style="width: 300px" type='text' placeholder="备注"></Input>
        </FormItem>
      </Form>
    </Modal>
<!--    <br/>
    <Page :total="pageCount" :page-size="pageSize" @on-change="getList"></Page>-->
  </div>
</template>
<style>
  @import "../../assets/style/common.css";
  b {
    color: red;
  }
</style>

<script>
  export default {
    data() {
      return {
        modal: false,
        key: "",
        status: "1",
        remark: "",
        seachTime: new Date(),
        info: {}, //提现审核信息
        pageCount: 0, //总条数
        pageSize: 20, //总条数
        form: {
          title: "",
          content: ""
        },
        columns: [
          {
            title: "时间",
            key: "time",
            align: "center"
          },
          {
            title: "手机号码",
            align: "center",
            key: "mobile"
          },
          {
            title: "姓名",
            align: "center",
            key: "nickname"
          },
          {
            title: "上级",
            align: "center",
            render(h, params) {
              let _str = '';
              if(params.row.create_account_name == '超级管理员' ){
                _str = '公司';
              }else{
                _str = params.row.create_account_name;
              }
              return h("div", _str);
            }
          },

          {
            title: "区域",
            align: "center",
            key: "location"
          },
          {
            title: "月返利",
            align: "center",
            key: "amount"
          },
          {
            title: "发放状态",
            align: "center",
            render(h, params){
              //发送中
              if(params.row.status != 1){
                return h("dev", "未发放");
              }else if(params.row.status == 1){
                return h("dev", "已发放");
              }
            }
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              //发送中
              if (params.row.status == 0) {
                return h(
                  "Button",
                  {
                    on: {
                      click: () => {
                        this.modal = true;
                        this.info = params.row;
                        if (this.info.status != 0) {
                        }
                      }
                    }
                  },
                  "审核"
                );
              } else if (params.row.status == 1) {
                return h(
                  "dev",
                  "已发放"
                );
              } else if (params.row.status == 2) {
                return h(
                  "dev",
                  "已拒绝"
                );
              }
            }
          }
        ],
        list: []
      };
    },
    created() {
      this.getList(1);
    },
    methods: {
      //显示详情
      show(row) {
        this.modal = true;
        this.info = row;
      },
      //审核
      audit() {
        var self = this;
        if (self.info.status != 0) {
          return false;
        }
        self.$http
          .post(global.url.commerce_withdrawal_audit, {
            wid: self.info.withdrawal_id,
            status: self.status,
            remark: self.remark
          })
          .then(r => {
            this.cancel();
            this.getList(1);
          });
      },
      //关闭申请框
      cancel() {
        this.status = "1";
        this.remark = "";
      },
      //清空条件
      empty() {
        this.seachTime = new Date();
        this.userId = "";
      },
      //获取列表
      getList(index) {
        var self = this;
        self.$http
          .get(global.url.commerce_withdrawal_list, {
            key: self.key,
            time: new Date(self.seachTime).Format("yyyy-MM"),
            index: (index - 1) * global.page.size,
            size: global.page.size
          })
          .then(result => {
            self.list = result.source;
            self.pageCount = result.count ? result.count.pagecount : 0;
          });
      }
    }
  };
</script>
