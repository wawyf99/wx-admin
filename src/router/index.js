import Vue from 'vue'
import Router from 'vue-router'
import main from '../views/main.vue'
/*import router from "../../../working/src/router";*/
Vue.use(Router);

const router =  new Router({
  hashbang: false,
  mode:'history',
  routes: [
    {
      path: '/',
      name: '登录',
      component: resolve => require(['@/views/login'], resolve)
    },
    {
      path: '/wechat/accredit',
      name: '授权',
      component: resolve => require(['@/views/accredit'], resolve)
    },
    {
      path: '/main',
      name: '主页',
      component: main,
      children: [
        {
          path: '/account',
          name: '管理员权限 / 管理员列表',
          component: resolve => require(['@/views/account/list.vue'], resolve),
        },
        {
          path: '/account/add',
          name: '管理员权限 / 新增管理员',
          component: resolve => require(['@/views/account/add.vue'], resolve),
        },
        {
          path: '/account/role',
          name: '管理员权限 / 角色管理',
          component: resolve => require(['@/views/account/role.vue'], resolve),
        },
        {
          path: '/wx',
          name: '运营后台 / 公众号管理 / 对接选择',
          component: resolve => require(['@/views/wx/wechat.vue'], resolve),
        },
        {
          path: '/wx/open-list',
          name: '运营后台 / 公众号管理 / 开放平台',
          component: resolve => require(['@/views/wx/open-list.vue'], resolve),
        },
        {
          path: '/wx/open-add',
          name: '运营后台 / 公众号管理 / 新增',
          component: resolve => require(['@/views/wx/open-add.vue'], resolve),
        },
        {
          path: '/wx/wechat-list',
          name: '运营后台 / 公众号管理 / 公众号',
          component: resolve => require(['@/views/wx/wechat-list.vue'], resolve),
        },
        {
          path: '/wx/wechat-add',
          name: '运营后台 / 公众号管理 / 公众号新增',
          component: resolve => require(['@/views/wx/wechat-add.vue'], resolve),
        },

      ]
    }
  ]
});


router.beforeEach((to, from, next) => {

  /*if (!global.appEntryUrl) {
    console.log(3);
    global.appEntryUrl = window.location.href;
  }
  console.log(global.appEntryUrl);*/
  document.getElementById('titleId').innerHTML = to.name;
  next();
})

export default router;
