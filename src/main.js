// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import global from './utils/global'
import util from './utils/util'
import ajax from './utils/ajax'
import echarts from 'echarts'

Vue.config.productionTip = false


Vue.use(util);
Vue.use(iView);
Vue.use(ajax);
Vue.use(global);

Vue.prototype.$trim = (val) => {
  var result = val;
  var reg = /\s+/g;
  console.log(/\s+/g.test(val));
  if (reg.test(val)) {
    result = result.replace(reg, "");
  }
  return result;
}


Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "m+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "s+": this.getMinutes(), //分
    "i+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

Vue.prototype.$echarts = echarts;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
