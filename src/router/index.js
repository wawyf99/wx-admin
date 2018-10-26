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
          path: '/survey/today',
          name: '数据后台 / 今日实时数据',
          component: resolve => require(['@/views/survey/today.vue'], resolve),
        },
        {
          path: '/survey/every_day',
          name: '数据后台 / 历史每日数据',
          component: resolve => require(['@/views/survey/every_day.vue'], resolve),
        },
        {
          path: '/survey/every_month',
          name: '数据后台 / 历史每月数据',
          component: resolve => require(['@/views/survey/every_month.vue'], resolve),
        },
        {
          path: '/survey/profit',
          name: '数据后台 / 历史盈利数据',
          component: resolve => require(['@/views/survey/profit.vue'], resolve),
        },
        {
          path: '/survey/agent_list',
          name: '数据后台 / 代理数据 / 代理总表',
          component: resolve => require(['@/views/survey/agent_list'], resolve),
        },
        {
          path: '/survey/direct_team',
          name: '数据后台 / 代理数据 / 直属团队',
          component: resolve => require(['@/views/survey/direct_team'], resolve),
        },
        {
          path: '/survey/commerce_list',
          name: '数据后台 / 商务数据 / 商务总表',
          component: resolve => require(['@/views/survey/commerce_list'], resolve),
        },
        {
          path: '/survey/commerce_search',
          name: '数据后台 / 商务数据 / 个人业绩',
          component: resolve => require(['@/views/survey/commerce_search'], resolve),
        },
        {
          path: '/survey/online_games',
          name: '数据后台 / 用户活跃 / 在线在玩',
          component: resolve => require(['@/views/survey/online_games'], resolve),
        },
        {
          path: '/survey/enroll',
          name: '数据后台 / 用户活跃 / 注册实时数据',
          component: resolve => require(['@/views/survey/enroll'], resolve),
        },
        {
          path: '/survey/payment',
          name: '数据后台 / 用户活跃 / 支付实时统计',
          component: resolve => require(['@/views/survey/payment'], resolve),
        },
        {
          path: '/survey/pay_every_day',
          name: '数据后台 / 用户活跃 / 支付实时统计',
          component: resolve => require(['@/views/survey/pay_every_day'], resolve),
        },
        {
          path: '/survey/online_time',
          name: '数据后台 / 用户活跃 / 在线时长分布',
          component: resolve => require(['@/views/survey/online_time'], resolve),
        },
        {
          path: '/survey/turn_round',
          name: '数据后台 / 用户活跃 / 在线时长分布',
          component: resolve => require(['@/views/survey/turn_round'], resolve),
        },
        {
          path: '/survey/friendster',
          name: '数据后台 / 用户活跃 / 亲友圈',
          component: resolve => require(['@/views/survey/friendster'], resolve),
        },
        {
          path: '/survey/room_cost',
          name: '数据后台 / 用户活跃 / 房卡数据',
          component: resolve => require(['@/views/survey/room_cost'], resolve),
        },
        {
          path: '/operation/agent_list',
          name: '运营后台 / 代理管理 / 代理总表',
          component: resolve => require(['@/views/operation/agent_list'], resolve),
        },
        {
          path: '/operation/agent_add',
          name: '运营后台 / 代理管理 / 代理授权',
          component: resolve => require(['@/views/operation/agent_add'], resolve),
        },
        {
          path: '/operation/direct_team',
          name: '运营后台 / 代理管理 / 直属团队',
          component: resolve => require(['@/views/operation/direct_team'], resolve),
        },
        {
          path: '/operation/commerce_list',
          name: '运营后台 / 商务数据 / 商务总表',
          component: resolve => require(['@/views/operation/commerce_list'], resolve),
        },
        {
          path: '/operation/commerce_add',
          name: '运营后台 / 商务数据 / 添加商务',
          component: resolve => require(['@/views/operation/commerce_add'], resolve),
        },
        {
          path: '/operation/commerce_withdrawal',
          name: '运营后台 / 商务数据 / 商务月结',
          component: resolve => require(['@/views/operation/commerce_withdrawal'], resolve),
        },
        {
          path: '/operation/individual-rebate',
          name: '运营后台 / 商务数据 / 返利比例',
          component: resolve => require(['@/views/operation/individual-rebate'], resolve),
        },
        {
          path: '/chat/manage-title',
          name: '运营后台 / 群聊管理 / 内容管理',
          component: resolve => require(['@/views/chat/manage-title'], resolve),
        },
        {
          path: '/chat/add-title',
          name: '运营后台 / 群聊管理 / 新增内容',
          component: resolve => require(['@/views/chat/add-title'], resolve),
        },
        {
          path: '/domain/domain-list',
          name: '运营后台 / 域名管理 / 域名列表',
          component: resolve => require(['@/views/domain/domain-list'], resolve),
        },
        {
          path: '/domain/domain-add',
          name: '运营后台 / 域名管理 / 新增域名',
          component: resolve => require(['@/views/domain/domain-add'], resolve),
        }

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
