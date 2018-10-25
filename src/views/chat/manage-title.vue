<!--历史每日数据-->
<template>
  <div class="manage-title">
    <div class="content-bar">
      <Form inline>
        <FormItem label="关键词:" :label-width="80">
          <Input v-model="keywords" placeholder="请输入关键词..." style="width: 200px"></Input>
        </FormItem>
        <FormItem :label-width="0">
          <Button type="primary" icon="ios-search" @click="getList()">查询</Button>
          <Button type="error" icon="android-close" @click="cleanBox()">清空</Button>
        </FormItem>
        <FormItem :label-width="0">
          <Button type="warning" icon="plus" @click="add()">新增内容</Button>
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
        keywords: '',
        columns: [
          {
            title: "编号",
            align: "center",
            key: "id"
          },
          {
            title: "标题名称",
            align: "center",
            key: "title"
          },
          {
            title: "图片名称",
            align: "center",
            key: "img"
          },
          {
            title: "群聊人数",
            align: "center",
            key: "enrollment"
          },
          {
            title: "邀请人",
            align: "center",
            key: "invitor"
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
                return h("div", [

                  h("Button",{
                    props: {
                      size: "small"
                    },
                    on: {
                      "click": () => {
                        this.updateTitle(params.row.id);
                      }
                    },
                  },
                    "编辑"
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
            keywords = this.keywords;
        self.$http.post(global.url.chat_manage_title, {
          keywords: keywords
        }).then(result => {
          this.list = result;
        });
      },
      cleanBox:function () {
        this.keywords = '';
      },
      deleteTitle:function (id) {
        var self = this;
        self.$http.post(global.url.chat_delete_title, {
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
      updateTitle:function (id) {
        this.$router.push({path: '/chat/add-title',query:{id:id}});
      },
      add(){
        this.$router.push({path: '/chat/add-title'});
      }
    }
  };
</script>
