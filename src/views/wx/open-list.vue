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
            <Radio label= '1' >正常</Radio>
            <Radio label= '2' >暂停</Radio>
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
            title: "名称",
            align: "center",
            key: "title"
          },
          {
            title: "平台AppId",
            align: "center",
            key: "app_id"
          },
          {
            title: "平台AppSecret",
            align: "center",
            key: "app_secret"
          },
          {
            title: "消息加解密Key",
            align: "center",
            key: "key"
          },
          {
            title: "消息校验Token",
            align: "center",
            key: "token"
          },
          {
            title: "公众号AppID",
            align: "center",
            key: "authorizer_app_id"
          },
          {
            title: "更新Token",
            align: "center",
            key: "authorizer_refresh_token"
          },
          {
            title: "授权回调地址",
            align: "center",
            key: "redirect_url"
          },
          {
            title: "创建时间",
            align: "center",
            render(h, params) {
              let _time = params.row.create_time;
              if(_time != null){
                _time = new Date(_time).Format("yyyy-mm-dd hh:ss");
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
              if(params.row.status == '1' ){
                _str = '正常';
              }else{
                _str = '暂停';
              }
              return h("div", _str);
            }
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              if(params.row.status == '3' || params.row.status == '0'){
                return h("div", '/');
              }else{
                let _str = '';
                if(params.row.status == '1' ){
                  _str = '暂停';
                }else{
                  _str = '启用';
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
                          title: "确定删除?",
                        },
                        on: {
                          "on-ok": () => {
                            this.deleteTitle(params.row.id);
                          },
                        }
                      },
                      "删除"
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
        self.$http.post(global.url.wx_list, {
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
        self.$http.post(global.url.wx_del, {
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
        this.$router.push({path: '/wx/add', query: {'id':id}});
      },
      operation:function (id, status) {
        var self = this;
        if(status == 1){
          status = 2;
        }else{
          status = 1;
        }
        self.$http.post(global.url.wx_operation, {
          id: id,
          status: status
        }).then(result => {
          if(result.status){
            this.$Message.success(result.msg);
            setTimeout(() => {
              this.getList();
            }, 500);
          }
        });
      },
      add(){
        this.$router.push({path: '/wx/open-add'});
      }
    }
  };
</script>
