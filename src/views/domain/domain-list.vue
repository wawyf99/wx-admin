<!--历史每日数据-->
<template>
  <div class="manage-title">
    <div class="content-bar">
      <Form inline>
        <FormItem label="关键词:" :label-width="80">
          <Input v-model="keywords" placeholder="请输入域名/分类/公众号ID..." style="width: 200px"></Input>
        </FormItem>
        <FormItem label="是否随机:" prop="rand" :label-width="80">
          <RadioGroup v-model="rand">
            <Radio label= '1' >不随机</Radio>
            <Radio label= '2' >随机</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="状态:" prop="status" :label-width="60">
          <RadioGroup v-model="status">
            <Radio label= '0' >封禁</Radio>
            <Radio label= '1' >正常</Radio>
            <Radio label= '2' >暂停</Radio>
            <Radio label= '3' >删除</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="排序:" prop="sorts" :label-width="60">
          <RadioGroup v-model="sorts">
            <Radio label= '1' >默认排序</Radio>
            <Radio label= '2' >按创建时间</Radio>
            <Radio label= '3' >按创建时间倒序</Radio>
            <Radio label= '4' >按封禁时间</Radio>
            <Radio label= '5' >按封禁时间倒序</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label-width="0">
          <Button type="primary" icon="ios-search" @click="getList()">查询</Button>
          <Button type="error" icon="android-close" @click="cleanBox()">清空</Button>
        </FormItem>
        <FormItem :label-width="0">
          <Button type="warning" icon="plus" @click="add()">新增域名</Button>
        </FormItem>
        <!--<FormItem :label-width="0">
          <Button type="success" @click="openTimer()" icon="android-warning" v-if="timer == 2">定时任务开启中(点击关闭)</Button>
          <Button type="error" @click="openTimer()" icon="android-warning" v-else-if="timer == 1">定时任务已关闭(点击开启)</Button>
        </FormItem>-->
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
            title: "域名",
            align: "center",
            key: "domain"
          },
          {
            title: "分类",
            align: "center",
            render(h, params) {
              let _str = '';
              if(params.row.mark == '1' ){
                _str = 'A1';
              }else if(params.row.mark == '2'){
                _str = 'A2';
              }else if(params.row.mark == '3'){
                _str = 'B1';
              }else if(params.row.mark == '4'){
                _str = 'C1';
              }
              return h("div", _str);
            }
          },
          {
            title: "是否随机",
            align: "center",
            render(h, params) {
              let _str = '';
              if(params.row.rand == '1' ){
                _str = '不随机';
              }else{
                _str = '随机';
              }
              return h("div", _str);
            }
          },
          {
            title: "公众号ID",
            align: "center",
            render(h, params) {
              let _str = '';
              if(params.row.gid == null ){
                _str = '-';
              }else{
                _str = params.row.gid;
              }
              return h("div", _str);
            }
          },
          {
            title: "当前排序",
            align: "center",
            key: "sort"
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
            title: "封禁时间",
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
              if(params.row.status == '1' ){
                _str = '正常';
              }else if(params.row.status == '2'){
                _str = '暂停';
              }else if(params.row.status == '3'){
                _str = '删除';
              }else{
                _str = '禁封';
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
        list: [],
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
          sorts = this.sorts,
          rand = this.rand;
        self.$http.post(global.url.domain_list, {
          keywords: keywords,
          status : status,
          rand : rand,
          sorts : sorts
        }).then(result => {
          this.list = result.data;
          this.timer = result.timer;
        });
      },
      cleanBox:function () {
        this.keywords = '';
        this.rand = '';
        this.status = '';
        this.sorts = '1';
      },
      /*openTimer:function(){
        var self = this;
        self.$http.post(global.url.domain_timer, {
          timer : this.timer
        }).then(result => {
          if(result){
            this.timer = result;
          }
        });
      },*/
      deleteTitle:function (id) {
        var self = this;
        self.$http.post(global.url.domain_delete, {
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
        this.$router.push({path: '/domain/domain-add', query: {'id':id}});
      },
      operation:function (id, status) {
        var self = this;
        if(status == 1){
          status = 2;
        }else{
          status = 1;
        }
        self.$http.post(global.url.domain_operation, {
          id: id,
          status: status
        }).then(result => {
          if(result.status){
            setTimeout(() => {
              this.getList();
            }, 500);
          }
        });
      },
      add(){
        this.$router.push({path: '/domain/domain-add'});
      }
    }
  };
</script>
