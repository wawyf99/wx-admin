<!--历史每日数据-->
<template>
  <div class="manage-title">
    <div class="content-bar">
      <Form inline>
        <FormItem label="关键词:" :label-width="80">
          <Input v-model="keywords" placeholder="请输入名称/AppId..." style="width: 200px"></Input>
        </FormItem>
        <FormItem label="状态:" prop="status" :label-width="60">
          <RadioGroup v-model="status">
            <Radio label= '1' >禁封</Radio>
            <Radio label= '2' >候选</Radio>
            <Radio label= '3' >使用中</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="排序:" prop="sorts" :label-width="60">
          <RadioGroup v-model="sorts">
            <Radio label= '1' >默认排序</Radio>
            <Radio label= '2' >按创建时间</Radio>
            <Radio label= '3' >按创建时间倒序</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label-width="0">
          <Button type="primary" icon="ios-search" @click="getList()">查询</Button>
          <Button type="error" icon="android-close" @click="cleanBox()">清空</Button>
        </FormItem>
        <FormItem :label-width="0">
          <Button type="warning" icon="plus" @click="add()">新增</Button>
        </FormItem>
        <!--<FormItem :label-width="0">
          <Button type="success" @click="openTimer()" icon="android-warning" v-if="timer == 2">定时任务开启中(点击关闭)</Button>
          <Button type="error" @click="openTimer()" icon="android-warning" v-else-if="timer == 1">定时任务已关闭(点击开启)</Button>
        </FormItem>-->
      </Form>
    </div>
    <Table border :columns="columns" :data="lists"></Table>
  </div>
</template>
<style>
  @import "../../assets/style/common.css";
</style>
<script>
  export default {
    data() {
      return {
        keywords: '',
        status:'',
        rand:'',
        sorts: '1',
        timer: '',
        columns: [
          {
            title: "编号",
            align: "center",
            key: "id"
          },
          {
            title: "公众号AppId",
            align: "center",
            key: "app_id"
          },
          {
            title: "公众号AppSecret",
            align: "center",
            key: "app_secret"
          },
          {
            title: "创建时间",
            align: "center",
            render(h, params) {
              let _time = params.row.create_time;
              if(_time != null){
                _time = new Date(_time).Format("yyyy-mm-dd hh:ss:ii");
              }else{
                _time = '-'
              }
              return h("div", _time);
            }
          },
          {
            title: "禁封时间",
            align: "center",
            render(h, params) {
              let _time = params.row.close_time;
              if(_time != null){
                _time = new Date(_time).Format("yyyy-mm-dd hh:ss:ii");
              }else{
                _time = '-'
              }
              return h("div", _time);
            }
          },
          {
            title: "状态",
            align: "center",
            render(h, params) {
              let _str = '';
              if(params.row.status == '2' ){
                _str = '候选';
              }else if(params.row.status == '1' ){
                _str = '封禁';
              }else if(params.row.status == '3' ){
                _str = '使用中';
              }
              return h("div", _str);
            }
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              if(params.row.status == '1'){
                return h("div", '/');
              }else{
                let _str = '';
                if(params.row.status == '3' ){
                  _str = '候选';
                }else{
                  _str = '使用';
                }
                return h("div", [
                  h("Button",{
                      props: {
                        size: "small"
                      },
                      on: {
                        "click": () => {
                          this.update(params.row.id);
                        }
                      },
                    },
                    "编辑"
                  ),
                  h("Button",{
                      props: {
                        size: "small"
                      },
                      on: {
                        "click": () => {
                          this.operation(params.row.id, params.row.status);
                        }
                      },
                    },
                    _str
                  ),
                  h("Button",{
                    props: {
                      size: "small"
                    }
                  }, [
                    h(
                      "Poptip",
                      {
                        props: {
                          confirm: true,
                          title: "确定禁封?",
                        },
                        on: {
                          "on-ok": () => {
                            this.deleteTitle(params.row.id);
                          },
                        }
                      },
                      "禁封"
                    )
                  ])
                ]);
              }
            }
          }

        ],
        lists: [],
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList:function () {
        var self = this,
          keywords = this.keywords,
          status = this.status,
          sorts = this.sorts;
        self.$http.post(global.url.wx_wechat_list, {
          keywords: keywords,
          status : status,
          sorts : sorts
        }).then(result => {
          //console.log(typeof(result));
          self.lists = result;
          //this.timer = result.timer;
        });
      },
      cleanBox:function () {
        this.keywords = '';
        this.rand = '';
        this.status = '';
        this.sorts = '1';
      },
      deleteTitle:function (id) {
        var self = this;
        self.$http.post(global.url.wx_wechat_del, {
          id : id
        }).then(result => {
          if(result.status){
            this.$Message.success(result.msg);
            setTimeout(() => {
              this.getList();
            }, 1500)
          }else{
            this.$Message.error(result.msg);
          }
        });
      },
      update:function(id){
        this.$router.push({path: '/wx/wechat-add', query: {'id':id}});
      },
      operation:function (id, status) {
        var self = this;

        if(status == 2){
          status = 3;
        }else{
          status = 2;
        };

        self.$http.post(global.url.wx_wechat_operation, {
          id: id,
          status: status
        }).then(result => {
          if(result.status){
            this.$Message.success(result.msg);
            setTimeout(() => {
              this.getList();
            }, 500);
          }else{
            this.$Message.error(result.msg);
          }
        });
      },
      add(){
        this.$router.push({path: '/wx/wechat-add'});
      }
    }
  };
</script>
