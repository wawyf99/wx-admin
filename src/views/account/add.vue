<!--添加账户-->
<template>
  <div>
    <router-view v-if="isRoterAlive">1</router-view>
    <Card :bordered="false">
      <Form v-model="formItem" :label-width="80">
        <FormItem label="用户昵称:">
          <Input v-model="formItem.nickname" :maxlength="20" type='text' style="width: 300px" placeholder="请输入昵称..."></Input>
        </FormItem>
        <FormItem label="登录账户:">
          <Input v-model="formItem.account" :maxlength="20" @on-blur="exists()" type='text' style="width: 300px" placeholder="请输入账号..."></Input>
        </FormItem>
        <FormItem label="登录密码:" v-if="accountId==0">
          <Input v-model="formItem.password" :maxlength="20" type='password' style="width: 300px" placeholder="请输入密码..."></Input>
          <small  style="color:red">默认为:123456</small>
        </FormItem>
        <FormItem label="选择角色:">
          <RadioGroup v-model="formItem.role" @on-change="selectLink()" v-for="(item, idx) in roleList" :key="idx">
            <Radio :label="item.roleId">{{ item.roleName }}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="选择权限:">
          <Col>
            <FormItem>
              <Card v-for="(item, idx) in linkList" :key="idx" :bordered="false" style="width:300px;">
                <Tree :data="item" ref="Tree" show-checkbox></Tree>
              </Card>
            </FormItem>
          </Col>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="save('ruleForm')">保存</Button>
          <Button type="ghost" @click="handCancel" style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Card>

  </div>
</template>
<script>
  import md5 from "js-md5";
  export default {
    data() {
      return {
        accountId: 0,
        formItem: {
          account: "",
          password: "123456",
          role: "",
          nickname: ""
        },
        isRoterAlive : true,
        roleList: [], //角色列表
        linkList: [], //链接列表 用于页面操作
        arrRoleLink: [], //角色权限列表->用于角色添加权限或修改角色权限
        isSubmit: true, //是否可以提交表单
        link:[]
      };
    },
    created() {
      this.getRole();
      this.getLinkList();
      //编辑用户
      if (this.$route.query.id) {
        this.accountId = this.$route.query.id;
        this.getAccount();
      }
    },
    methods: {
      //根据用户ID获取用户数据
      getAccount() {
        var self = this;
        self.$http
          .get(global.url.account_find, {
            accountId: self.accountId
          })
          .then(response => {
            self.formItem.account = response.account;
            //self.formItem.password = response.password;
            self.formItem.role = response.roleId;
            self.formItem.nickname = response.nickname;
            self.link = response.link;
            self.selectLink(1);
          });
      },
      //选择角色勾选权限
      selectLink(o) {
        //console.log(o);
        var self = this;
        var arrLinkId = []; //linkId集合

        if(o){
          //console.log(self.link);
          var _arr = self.link;
          _arr = _arr.split(',');
          arrLinkId = _arr;
        }else{
          //通过roleId查询到该角色下的所有link
          self.roleList.find((value, index) => {
            //console.log(value);
            if (value.roleId == self.formItem.role) {
              arrLinkId = value.linkid.split(",");
            }
          });
        }
        if(arrLinkId.length < 1){
          //console.log(2);
          //var _url = window.location.href;
          //window.location.reload();
        }
        //console.log(self.roleList);
        //console.log(arrLinkId);
        //重新获取link
        //console.log(4);
        self.$http.get(global.url.role_linklist).then(result => {
          self.jsonLink(result);
          //循环有多少个1级菜单
          //console.log(self.linkList);
          self.linkList.map(node => {
            //循环2级菜单
            node.map(item => {
              //获取子级
              if (item.children) {
                item.children.map(i => {
                  //角色与全选集合中找到相同的数据.选中已有权限
                  if (arrLinkId.includes(i.key.toString())) {
                    i.checked = true;
                  }
                });
              }
            });
          });
        });
      },
      /*刷新当前页面*/
      reload(){
        this.isRoterAlive = false;
        this.$nextTick(function () {
          this.isRoterAlive = true;
        })
      },
      //验证用户名是否存在
      exists() {
        var self = this;
        if (self.formItem.account != "") {
          self.$http
            .get(global.url.account_exists, {
              account: self.formItem.account
            })
            .then(result => {
              if (result && result != null) {
                self.$Message.error("账号已存在!");
                self.isSubmit = false;
              } else {
                self.isSubmit = true;
              }
            });
        }
      },
      //保存用户
      save(name) {
        var self = this;
        var reg = RegExp("/(^s*)|(s*$)/g");
        if (self.$trim(self.formItem.nickname) == "") {
          self.$Message.error("昵称不能为空!");
          return false;
        }
        if (self.$trim(self.formItem.account) == "") {
          self.$Message.error("账号不能为空!");
          return false;
        }
        if (!self.isSubmit) {
          self.$Message.error("账号已存在!");
          return false;
        }
        if (self.$trim(self.formItem.password) == "") {
          self.$Message.error("密码不能为空!");
          return false;
        }
        if (self.formItem.role == "") {
          self.$Message.error("请选择角色!");
          return false;
        }
        //循环有多少个1级菜单
        self.linkList.map(node => {
          //循环2级菜单
          node.map(item => {
            //添加一级
            //if (item.checked == true) self.arrRoleLink.push(item.key);
            //获取子级
            if (item.children) {
              item.children.map(i => {
                if (i.checked == true) {
                  //验证是否存在一级
                  //只要勾选了子级默认添加一级
                  if (!self.arrRoleLink.includes(item.key)) {
                    self.arrRoleLink.push(item.key);
                  }
                  if (!self.arrRoleLink.includes(i.key)) {
                    self.arrRoleLink.push(i.key);
                  }
                }
              });
            }
          });
        });
        //console.log(self.arrRoleLink);
        //像后台发起请求
        this.$http
          .post(global.url.account_add, {
            accountId: self.accountId,
            account: self.formItem.account,
            password: md5(self.formItem.password),
            nickname: self.formItem.nickname,
            roleid: self.formItem.role,
            link: JSON.stringify(self.arrRoleLink),
            isAdd: self.accountId == 0 ? true : false
          })
          .then(function(response) {
            let msg = self.accountId == 0 ? "添加成功!" : "修改成功";
            self.$Message.success(msg);
            self.$router.push({
              path: "/account"
            });
          })
          .catch(function(error) {
            self.$Message.error("添加失败!");
          });
      },
      //重置表单
      handleReset(name) {
        this.accountId = 0;
        this.formItem = {
          account: "",
          password: "",
          role: "role",
          nickname: ""
        };
        this.getLinkList();
      },
      //取消
      handCancel(){
        var self = this;
        self.$router.push({
          path: "/account"
        });
      },
      //获取角色列表
      getRole() {
        var self = this;
        this.$http.get(global.url.role_list).then(result => {
          self.roleList = result;
        });
      },
      //获取链接列表
      getLinkList() {
        var self = this;
        this.$http.get(global.url.role_linklist).then(result => {
          self.jsonLink(result);
        });
      },
      //序列化链接列表
      jsonLink(data) {
        var self = this;
        //初始化数组
        self.linkList = [];
        if (data) {
          var itemLink = [];

          data.forEach(item => {
            //console.log(item);
            if(item.parentLinkId === null){
              itemLink.push({
                key: item.linkId,
                //一级菜单名称
                title: item.name,
                //是否展开
                expand: false,
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
                  expand: true,
                  //子级菜单集合
                  children: []
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
                  })
                }
              })
            })
          })
          if (itemLink) {
            self.linkList.push(itemLink);
          }
          //console.log(itemLink)
         // console.log(itemLink)

          //定义绑定列表数据
/*          data.forEach(item => {
            var itemLink;
            //初始化一级菜单
            if (item.parentLinkId === null) {
              itemLink = [];
              //添加一级菜单数据
              itemLink.push({
                key: item.linkId,
                //一级菜单名称
                title: item.name,
                //是否展开
                expand: false,
                //子级菜单集合
                children: []
              });
            }
            //根据parentLinkId 父ID查询子级菜单
            data.find(function(value, index, arr) {
              //将当前级别ID去搜索是否存在子级菜单
              if (item.linkId == value.parentLinkId) {
                //将查询出的子级菜单循环加入子级菜单中
                itemLink.map(element => {
                  element.children.push({
                    title: value.name,
                    key: value.linkId,
                    checked: false //选中
                  });
                });
              }
            });
            if (itemLink) {
              self.linkList.push(itemLink);
            }
          });*/
        }
      }
    }
  };
</script>
