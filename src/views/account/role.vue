<!--角色管理-->
<template>
  <Tabs v-model="tab">
    <TabPane label="添加角色" name="add" :disabled="!isDisabled">
      <div class="content-bar">
        <Form ref="ruleCustom" :label-width="80" inline>
          <FormItem label="角色名称:">
            <Input v-model="name" type='text' style="width: 300px" placeholder="请输入角色名称..."></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="saveRole(name)">保存</Button>
          </FormItem>
        </Form>
      </div>
      <!-- <Table border :columns="columns7" :data="data6"></Table> -->
      <Table border :columns="columns" :data="roleList">

      </Table>
    </TabPane>
    <TabPane label="角色权限" name="role" :disabled="isDisabled">
      <Form inline>
        <Col>
          <FormItem>
            <Card v-for="(item, idx) in linkList" :key="idx" :bordered="false" style="width:300px;">
              <Tree :data="item" ref="Tree"  show-checkbox></Tree>
            </Card>
          </FormItem>
        </Col>
        <FormItem>
          <Button type="primary" @click="saveRoleLink()">下一步</Button>
          <Button @click="cancel()">取消</Button>
        </FormItem>
      </Form>
    </TabPane>
  </Tabs>
</template>
<script>
  export default {
    data() {
      return {
        roleList: [], //角色列表
        tab: "", //控制选项卡
        isDisabled: true, //是否启用选项卡
        name: "", //角色名称
        roleId: 0, //修改数据的roleId
        arrRoleLink: [], //角色权限列表->用于角色添加权限或修改角色权限
        columns: [
          {
            //表格列
            title: "角色名称",
            key: "roleName",
            align: "center"
          },
          {
            title: "权限名称",
            key: "linkname",
            align: "center"
          },
          {
            title: "权限ID",
            key: "linkid",
            align: "center"
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary"
                    },
                    style: {
                      margin: "5px"
                    },
                    on: {
                      click: () => {
                        this.update(params);
                      }
                    }
                  },
                  "修改"
                ),
                h("Button", [
                  h(
                    "Poptip",
                    {
                      props: {
                        confirm: true,
                        title: "确定要删除么?"
                      },
                      on: {
                        "on-ok": () => {
                          this.delete(params);
                        }
                      }
                    },
                    "删除"
                  )
                ])
              ]);
            }
          }
        ],
        linkList: [] //链接列表 用于页面操作
      };
    },
    created() {
      this.getRole();
      this.getLinkList();
    },
    methods: {
      //取消
      cancel() {
        this.tab = "add";
        this.name = "";
        this.isDisabled = true; //是否启用选项卡
        this.getLinkList();
      },
      /**
       * 新增角色权限
       */
      // TODO 后续修改成与name一次性提交数据
      saveRoleLink() {
        var self = this;
        self.arrRoleLink = [];
        //循环有多少个1级菜单
        //console.log(self.linkList);
        self.linkList.map(node => {
          //循环2级菜单
          node.map(item => {
            //获取子级
            if (item.children) {
              item.children.map(i => {
                if (i.checked == true) {
                  self.arrRoleLink.push(i.key);
                }
                if(i.children){
                  i.children.map(s => {
                    if (s.checked == true) {
                      self.arrRoleLink.push(s.key);
                    }
                  })
                }
              });
            }
          });
        });
        //console.log(self.arrRoleLink);
        //像后台发起请求
        this.$http
          .post(global.url.role_add, {
            name: self.name,
            data: JSON.stringify(self.arrRoleLink)
          })
          .then(function(response) {
            self.$Message.success("添加成功!");
            self.tab = "add";
            self.name = "";
            self.isDisabled = true; //是否启用选项卡
            self.getRole();
            self.getLinkList();
          })
          .catch(function(error) {
            self.$Message.error("添加失败!");
          });
      },
      //修改角色
      update(params) {
        var self = this;
        self.tab = "role";
        self.isDisabled = false;
        self.name = params.row.roleName;
        self.roleId = params.row.roleId;
        var arrLinkId = params.row.linkid.split(",");
        //循环有多少个1级菜单
        self.linkList.map(node => {
          //循环2级菜单
          node.map(item => {
            //获取子级
            //console.log(item);
            if (item.children) {
              item.children.map(i => {
                //角色与全选集合中找到相同的数据.选中已有权限
                arrLinkId.find(n => {
                  if (n == i.key) {
                    i.checked = true;
                  }
                });
                if(i.children){
                  i.children.map(s => {
                    arrLinkId.find(t => {
                      if (t == s.key) {
                        s.checked = true;
                      }
                    })
                  })
                }
              });
            }
          });
        });
      },
      //删除角色
      delete(params) {
        var self = this;
        //像后台发起请求
        this.$http
          .post(global.url.role_del, {
            roleId: params.row.roleId
          })
          .then(function(response) {
            if (response.code == "0") self.$Message.error(response.msg);
            self.getRole();
          })
          .catch(function(error) {
            self.$Message.error("删除失败!");
          });
      },
      //获取链接列表
      getLinkList() {
        var self = this;
        this.$http.get(global.url.role_linklist).then(result => {
          self.jsonLink(result);
        });
      },
      //获取角色列表
      getRole() {
        var self = this;
        this.$http.get(global.url.role_list).then(result => {
          self.roleList = result;
        });
      },
      //保存角色
      saveRole(name) {
        var self = this;
        self.name = self.$trim(self.name);
        if (self.name == "") {
          this.$Message.error("请输入角色名称!");
          return false;
        }
        //切换选项卡
        self.tab = "role";
        //将选项卡设置为启用状态
        self.isDisabled = false;
      },
      //序列化链接列表
      jsonLink(data) {
        var self = this;
        //初始化数组
        self.linkList = [];
        if(data){
          var itemLink = [];

          data.forEach(item => {
            //console.log(item);
            if(item.parentLinkId === null){
              itemLink.push({
                key: item.linkId,
                //一级菜单名称
                title: item.name,
                //是否展开
                expand: true,
                //子级菜单集合
                children: []
              })
            }
          })

          data.forEach(item1 => {
            itemLink.forEach(item2 => {
              if(item1.parentLinkId == item2.key){
                item2.children.push({
                  key: item1.linkId,
                  //一级菜单名称
                  title: item1.name,
                  //是否展开
                  //子级菜单集合
                  children: [],
                  expand: true,
                  checked: false
                })
              }
            })
          })

          data.forEach(item3 => {
            itemLink.forEach(item4 => {
              //console.log(item4);
              item4.children.forEach(item5 => {
                if(item3.parentLinkId == item5.key){
                  item5.children.push({
                    key: item3.linkId,
                    //一级菜单名称
                    title: item3.name,
                    //是否展开
                    expand: true,
                    checked: false
                  })
                }
              })
            })
          })
          if (itemLink) {
            self.linkList.push(itemLink);
          }
        }
      }
    }
  };
</script>
