<style scoped>
  @import "../assets/style/main.css";
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">开放平台管理后台</div>
          <div class="Main-header-right">
            <Dropdown trigger="click">
              <Button type="primary">
                {{nickname}}
                <Icon type="arrow-down-b"></Icon>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem>
                  <Icon type="ios-refresh"></Icon>
                  <a @click="show">修改密码</a>
                </DropdownItem>
                <DropdownItem>
                  <Icon type="ios-minus"></Icon>
                  <a @click="loginOut">退出登录</a>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Menu>
      </Header>
      <Layout :style="{padding: '0 10px'}" id="Main-middle">
        <Breadcrumb :style="{margin: '10px 0'}">
          <BreadcrumbItem>{{this.$route.name}}</BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '10px 0', minHeight: '280px', background: '#fff'}">
          <Layout id="Main-section">
            <Sider hide-trigger :style="{background: '#fff'}" class="Main-left">
              <Menu theme="light" :class="menuitemClasses" width="auto" @on-select="routeTo">
                <Submenu :name="items.key" v-for="(items, idx) in oneLink" :key="idx">
                  <template slot="title">
                    <Icon  :type="items.icon"></Icon>
                    {{items.title}}
                  </template>

                    <Submenu  :name="is.key"  v-for="(is, idxs) in twoLink" :key="idxs" v-if="items.key == is.parentLinkId && is.childrens.length > 0 && is.url == ''">
                      <template slot="title">
                        <Icon  :type="is.icon"></Icon>
                        {{is.title}}
                      </template>

                      <MenuItem :name="s.url" v-for="(s, idxss) in is.childrens" :key="idxss">{{s.title}}</MenuItem>

                    </Submenu>

                    <MenuItem :name="i.url" v-for="(i, index) in items.children" :key="index" v-if="i.url != ''">{{i.title}}</MenuItem>

                </Submenu>
              </Menu>
            </Sider>
            <Content :style="{padding: '0 10px', minHeight: '280px', background: '#fff'}">
              <router-view></router-view>
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer class="layout-footer-center">2017-2018 &copy; 深圳市XX科技有限公司</Footer>
    </Layout>
    <Modal v-model="modal" @on-ok="update" @on-cancel="cancel" title="提现审核">
      <Form :model="form" ref="form" :label-width="100">
        <FormItem label="原始密码:">
          <Input v-model="form.pwd" type='password' style="width:200px;" placeholder="请输入原始密码"></Input>
        </FormItem>
        <FormItem label="新密码:">
          <Input v-model="form.newPwd" type='password' style="width:200px;" placeholder="请输入新密码"></Input>
        </FormItem>
        <FormItem label="确认新密码:">
          <Input v-model="form.confirmPwd" type='password' style="width:200px;" placeholder="请输入确认新密码"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
  import cookie from "../utils/cookie";
  import md5 from "js-md5";
  export default {
    data() {
      return {
        nickname: "未登录",
        modal: false,
        form: {
          pwd: "",
          newPwd: "",
          confirmPwd: ""
        },
        oneLink: [],
        link: [],
        twoLink: [],
        isCollapsed: false
      };
    },
    computed: {
      menuitemClasses: function() {
        return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
      },
      setActive() {
        return this.$route.path.replace("/", "");
      }
    },
    created(){
      var info = cookie.getCookie();
      if (info) {
        this.nickname = info.nickname;
        this.getLink(info.accountId);
      } else {
        this.$router.push({
          path: "/"
        });
      }
    },
    methods:{
      setHeight(){
        var _h = window.innerHeight;
        _h = _h - 64 - 69 - 2;
        document.getElementById('Main-middle').style.height = _h + 'px';
        document.getElementById('Main-section').style.height = _h - 61 + 'px';
      },
      show() {
        this.modal = true;
      },
      cancel() {
        this.pwd = "";
      },
      //修改密码
      update() {
        var self = this;
        if (self.form.pwd == "") {
          self.form.pwd = "";
          self.form.newPwd = "";
          self.form.confirmPwd = "";
          self.$Message.error("原始密码不能为空");
          return false;
        }
        if (self.form.newPwd == "") {
          self.form.pwd = "";
          self.form.newPwd = "";
          self.form.confirmPwd = "";
          self.$Message.error("新密码不能为空");
          return false;
        }
        if (self.form.newPwd != self.form.confirmPwd) {
          self.form.pwd = "";
          self.form.newPwd = "";
          self.form.confirmPwd = "";
          self.$Message.error("两次密码不一致.请重新输入");
          return false;
        }
        var info = cookie.getCookie();
        self.$http
          .post(global.url.account_pwd, {
            accountId: info.accountId,
            oldpwd: md5(self.form.pwd),
            password: md5(self.form.newPwd)
          })
          .then(result => {
            if (result == false) {
              self.$Message.error("原始密码不正确");
              self.form.pwd = "";
              self.form.newPwd = "";
              self.form.confirmPwd = "";
            } else {
              this.loginOut();
            }
          });
      },
      loginOut() {
        var self = this;
        self.$http.get(global.url.account_loginout, {}).then(result => {
          cookie.removeCookie();
          self.$router.push({
            path: "/"
          });
        });
      },
      getLink(accountId) {
        var self = this;
        self.$http
          .get(global.url.account_link, {
            accountId: accountId
          })
          .then(result => {
            self.link = result;
            if (self.link) {
              self.link.map(item => {
                var itemLink;
                //初始化一级菜单
                if (item.parentLinkId === null) {
                  itemLink = {
                    //一级菜单名称
                    title: item.name,
                    key: item.linkId,
                    icon: item.icon_class,
                    parentLinkId: item.parentLinkId,
                    url : item.url,
                    //子级菜单集合
                    children: []
                  };
                  self.oneLink.push(itemLink);
                }
              });
              //根据一级菜单找到2级菜单
              self.oneLink.map(node => {
                self.link.find(n => {
                  if (n.parentLinkId === node.key) {
                    node.children.push({
                      title: n.name,
                      key: n.linkId,
                      url: n.url,
                      icon: n.icon_class,
                      parentLinkId: n.parentLinkId,
                      childrens: []
                    });
                    var itemLinks = {
                      //一级菜单名称
                      title: n.name,
                      key: n.linkId,
                      url: n.url,
                      icon: n.icon_class,
                      parentLinkId: n.parentLinkId,
                      childrens: []
                    };
                    self.twoLink.push(itemLinks);
                  }
                });
              });
              //根据一级菜单找到2级菜单
              self.twoLink.map(nodes => {
                self.link.find(ns => {
                  if (ns.parentLinkId === nodes.key) {
                    nodes.childrens.push({
                      title: ns.name,
                      key: ns.linkId,
                      url: ns.url,
                      icon: ns.icon_class,
                      parentLinkId: ns.parentLinkId,
                    });
                  }
                });
              });
            }
          });
      },
      routeTo(e) {
        this.$router.push(e);
      }
    },
    mounted(){
      this.setHeight();
      var s = this.oneLink;
    }
  }
</script>
