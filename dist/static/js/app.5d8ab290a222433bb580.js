webpackJsonp([33],{"+skl":function(n,t){},"4GCc":function(n,t){},BfUi:function(n,t,e){(function(n){n.baseUrl="http://wx.api.rzzc.ltd",n.url={login:"/admin/login",accredit:"/wechat/",update_token:"/wechat/updateToken",role_add:"/role/add",role_list:"/role/list",role_linklist:"/role/linklist",role_addrolelink:"/role/addrolelink",role_del:"/role/del",role_getRole:"role/getRole",account_add:"/admin/add",account_exists:"/admin/exists",account_list:"/admin/list",account_pwd:"/admin/pwd",account_restpwd:"/admin/restpwd",account_loginout:"/admin/loginout",account_disabled:"/admin/disabled",account_find:"/admin/account",account_link:"/admin/link",chat_add_title:"/chat/addTitle",chat_get_title:"/chat/getTitle",chat_delete_title:"/chat/deleteTitle",chat_manage_title:"/chat/manageTitle",domain_add:"/domain/domainAdd",domain_delete:"/domain/domainDelete",domain_operation:"/domain/operation",domain_list:"/domain/domainList",domain_one_list:"/domain/domainOneList",domain_timer:"/domain/domainTimer",log:"/log",issue:"/report/issue"},n.page={index:0,size:20}}).call(t,e("DuR2"))},NHnr:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e("7+uW"),a={render:function(){var n=this.$createElement,t=this._self._c||n;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var i=e("VU/8")({name:"App"},a,!1,function(n){e("f9EK")},"data-v-69669f98",null).exports,r=e("YaEn"),c=e("BTaQ"),u=e.n(c),l=(e("+skl"),e("BfUi")),s=e.n(l),d={oneOf:function(n,t){return t.indexOf(n)>=0}},p=d,h=e("Z1y9"),m=e("XLwt"),f=e.n(m);o.default.config.productionTip=!1,o.default.use(s.a),o.default.use(p),o.default.use(u.a),o.default.use(h.a),o.default.prototype.$trim=function(n){var t=n,e=/\s+/g;return console.log(/\s+/g.test(n)),e.test(n)&&(t=t.replace(e,"")),t},Date.prototype.Format=function(n){var t={"m+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"s+":this.getMinutes(),"i+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var e in/(y+)/.test(n)&&(n=n.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),t)new RegExp("("+e+")").test(n)&&(n=n.replace(RegExp.$1,1==RegExp.$1.length?t[e]:("00"+t[e]).substr((""+t[e]).length)));return n},o.default.prototype.$echarts=f.a,new o.default({el:"#app",router:r.a,components:{App:i},template:"<App/>"})},YaEn:function(n,t,e){"use strict";var o=e("7+uW"),a=e("/ocq"),i=e("nv+h"),r={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"layout"},[e("Layout",[e("Header",[e("Menu",{attrs:{mode:"horizontal",theme:"dark","active-name":"1"}},[e("div",{staticClass:"layout-logo"},[n._v("运营后台")]),n._v(" "),e("div",{staticClass:"Main-header-right"},[e("Dropdown",{attrs:{trigger:"click"}},[e("Button",{attrs:{type:"primary"}},[n._v("\n              "+n._s(n.nickname)+"\n              "),e("Icon",{attrs:{type:"arrow-down-b"}})],1),n._v(" "),e("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[e("DropdownItem",[e("Icon",{attrs:{type:"ios-refresh"}}),n._v(" "),e("a",{on:{click:n.show}},[n._v("修改密码")])],1),n._v(" "),e("DropdownItem",[e("Icon",{attrs:{type:"ios-minus"}}),n._v(" "),e("a",{on:{click:n.loginOut}},[n._v("退出登录")])],1)],1)],1)],1)])],1),n._v(" "),e("Layout",{style:{padding:"0 10px"},attrs:{id:"Main-middle"}},[e("Breadcrumb",{style:{margin:"10px 0"}},[e("BreadcrumbItem",[n._v(n._s(this.$route.name))])],1),n._v(" "),e("Content",{style:{padding:"10px 0",minHeight:"280px",background:"#fff"}},[e("Layout",{attrs:{id:"Main-section"}},[e("Sider",{staticClass:"Main-left",style:{background:"#fff"},attrs:{"hide-trigger":""}},[e("Menu",{class:n.menuitemClasses,attrs:{theme:"light",width:"auto"},on:{"on-select":n.routeTo}},n._l(n.oneLink,function(t,o){return e("Submenu",{key:o,attrs:{name:t.key}},[e("template",{slot:"title"},[e("Icon",{attrs:{type:t.icon}}),n._v("\n                  "+n._s(t.title)+"\n                ")],1),n._v(" "),n._l(n.twoLink,function(o,a){return t.key==o.parentLinkId&&o.childrens.length>0&&""==o.url?e("Submenu",{key:a,attrs:{name:o.key}},[e("template",{slot:"title"},[e("Icon",{attrs:{type:o.icon}}),n._v("\n                      "+n._s(o.title)+"\n                    ")],1),n._v(" "),n._l(o.childrens,function(t,o){return e("MenuItem",{key:o,attrs:{name:t.url}},[n._v(n._s(t.title))])})],2):n._e()}),n._v(" "),n._l(t.children,function(t,o){return""!=t.url?e("MenuItem",{key:o,attrs:{name:t.url}},[n._v(n._s(t.title))]):n._e()})],2)}))],1),n._v(" "),e("Content",{style:{padding:"0 10px",minHeight:"280px",background:"#fff"}},[e("router-view")],1)],1)],1)],1),n._v(" "),e("Footer",{staticClass:"layout-footer-center"},[n._v("2017-2018 © 深圳市XX科技有限公司")])],1),n._v(" "),e("Modal",{attrs:{title:"提现审核"},on:{"on-ok":n.update,"on-cancel":n.cancel},model:{value:n.modal,callback:function(t){n.modal=t},expression:"modal"}},[e("Form",{ref:"form",attrs:{model:n.form,"label-width":100}},[e("FormItem",{attrs:{label:"原始密码:"}},[e("Input",{staticStyle:{width:"200px"},attrs:{type:"password",placeholder:"请输入原始密码"},model:{value:n.form.pwd,callback:function(t){n.$set(n.form,"pwd",t)},expression:"form.pwd"}})],1),n._v(" "),e("FormItem",{attrs:{label:"新密码:"}},[e("Input",{staticStyle:{width:"200px"},attrs:{type:"password",placeholder:"请输入新密码"},model:{value:n.form.newPwd,callback:function(t){n.$set(n.form,"newPwd",t)},expression:"form.newPwd"}})],1),n._v(" "),e("FormItem",{attrs:{label:"确认新密码:"}},[e("Input",{staticStyle:{width:"200px"},attrs:{type:"password",placeholder:"请输入确认新密码"},model:{value:n.form.confirmPwd,callback:function(t){n.$set(n.form,"confirmPwd",t)},expression:"form.confirmPwd"}})],1)],1)],1)],1)},staticRenderFns:[]};var c=function(n){e("4GCc")},u=e("VU/8")(i.a,r,!1,c,"data-v-17f6f270",null).exports;o.default.use(a.a);var l=new a.a({hashbang:!1,mode:"history",routes:[{path:"/",name:"登录",component:function(n){return e.e(27).then(function(){var t=[e("Quw4")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/wechat/accredit",name:"授权",component:function(n){return e.e(4).then(function(){var t=[e("wKhx")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/main",name:"主页",component:u,children:[{path:"/account",name:"管理员权限 / 管理员列表",component:function(n){return e.e(31).then(function(){var t=[e("wHCT")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/account/add",name:"管理员权限 / 新增管理员",component:function(n){return e.e(6).then(function(){var t=[e("I5IU")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/account/role",name:"管理员权限 / 角色管理",component:function(n){return e.e(5).then(function(){var t=[e("jFMF")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/survey/today",name:"数据后台 / 今日实时数据",component:function(n){return e.e(0).then(function(){var t=[e("fax2")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/survey/every_day",name:"数据后台 / 历史每日数据",component:function(n){return e.e(16).then(function(){var t=[e("BGlS")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/survey/every_month",name:"数据后台 / 历史每月数据",component:function(n){return e.e(15).then(function(){var t=[e("Xq6k")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/survey/profit",name:"数据后台 / 历史盈利数据",component:function(n){return e.e(9).then(function(){var t=[e("Ufk7")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/survey/agent_list",name:"数据后台 / 代理数据 / 代理总表",component:function(n){return e.e(21).then(function(){var t=[e("aNYS")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/survey/direct_team",name:"数据后台 / 代理数据 / 直属团队",component:function(n){return e.e(18).then(function(){var t=[e("Kojp")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/survey/commerce_list",name:"数据后台 / 商务数据 / 商务总表",component:function(n){return e.e(20).then(function(){var t=[e("ABhc")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/survey/commerce_search",name:"数据后台 / 商务数据 / 个人业绩",component:function(n){return e.e(19).then(function(){var t=[e("cwNd")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/survey/online_games",name:"数据后台 / 用户活跃 / 在线在玩",component:function(n){return e.e(13).then(function(){var t=[e("T9Qc")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/survey/enroll",name:"数据后台 / 用户活跃 / 注册实时数据",component:function(n){return e.e(17).then(function(){var t=[e("S+vY")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/survey/payment",name:"数据后台 / 用户活跃 / 支付实时统计",component:function(n){return e.e(10).then(function(){var t=[e("SFQy")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/survey/pay_every_day",name:"数据后台 / 用户活跃 / 支付实时统计",component:function(n){return e.e(11).then(function(){var t=[e("k5jA")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/survey/online_time",name:"数据后台 / 用户活跃 / 在线时长分布",component:function(n){return e.e(12).then(function(){var t=[e("760B")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/survey/turn_round",name:"数据后台 / 用户活跃 / 在线时长分布",component:function(n){return e.e(7).then(function(){var t=[e("mZS7")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/survey/friendster",name:"数据后台 / 用户活跃 / 亲友圈",component:function(n){return e.e(14).then(function(){var t=[e("blNI")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/survey/room_cost",name:"数据后台 / 用户活跃 / 房卡数据",component:function(n){return e.e(8).then(function(){var t=[e("tv3x")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/operation/agent_list",name:"运营后台 / 代理管理 / 代理总表",component:function(n){return e.e(26).then(function(){var t=[e("1J1f")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/operation/agent_add",name:"运营后台 / 代理管理 / 代理授权",component:function(n){return e.e(3).then(function(){var t=[e("SVYo")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/operation/direct_team",name:"运营后台 / 代理管理 / 直属团队",component:function(n){return e.e(23).then(function(){var t=[e("1z5q")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/operation/commerce_list",name:"运营后台 / 商务数据 / 商务总表",component:function(n){return e.e(25).then(function(){var t=[e("8m67")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/operation/commerce_add",name:"运营后台 / 商务数据 / 添加商务",component:function(n){return e.e(1).then(function(){var t=[e("mml8")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/operation/commerce_withdrawal",name:"运营后台 / 商务数据 / 商务月结",component:function(n){return e.e(24).then(function(){var t=[e("g11u")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/operation/individual-rebate",name:"运营后台 / 商务数据 / 返利比例",component:function(n){return e.e(22).then(function(){var t=[e("3YIX")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/chat/manage-title",name:"运营后台 / 群聊管理 / 内容管理",component:function(n){return e.e(30).then(function(){var t=[e("n5rt")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/chat/add-title",name:"运营后台 / 群聊管理 / 新增内容",component:function(n){return e.e(2).then(function(){var t=[e("VxAz")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/domain/domain-list",name:"运营后台 / 域名管理 / 域名列表",component:function(n){return e.e(28).then(function(){var t=[e("t2u6")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/domain/domain-add",name:"运营后台 / 域名管理 / 新增域名",component:function(n){return e.e(29).then(function(){var t=[e("t/Fg")];n.apply(null,t)}.bind(this)).catch(e.oe)}}]}]});l.beforeEach(function(n,t,e){document.getElementById("titleId").innerHTML=n.name,e()});t.a=l},Z1y9:function(n,t,e){"use strict";(function(n){var o=e("pFYg"),a=e.n(o),i=e("//Fk"),r=e.n(i),c=e("mtWM"),u=e.n(c),l=e("YaEn"),s=e("mw3O"),d=e.n(s);u.a.defaults.timeout=2e4,u.a.defaults.baseURL=n.baseUrl,u.a.interceptors.request.use(function(n){return n},function(n){return console.log("http请求拦截器",n),r.a.reject(n)}),u.a.interceptors.response.use(function(n){return-1==n.data.code&&l.a.push({path:"/"}),n},function(n){if(n.response){var t={404:"http://www.aylan.me/404",501:"http://www.aylan.me/error"};void 0===!t[n.response.status]&&l.a.push(t[n.response.status])}return console.log("http响应拦截器",n),r.a.reject(n.response.data)});var p={get:function(n,t){if(!n||"string"!=typeof n)throw new Error("必须传入字符串类型的url地址");var e={url:n,method:"GET",headers:{"Content-Type":"application/x-www-form-urlencoded"},paramsSerializer:function(n){return d.a.stringify(n,{arrayFormat:"brackets"})},withCredentials:!0};if(t&&"object"!==(void 0===t?"undefined":a()(t)))throw new Error("data为对象类型");return t&&"object"===(void 0===t?"undefined":a()(t))&&(e.params=t),new r.a(function(n,t){u()(e).then(function(t){n(t.data)}).catch(function(n){console.log("get",n)})})},post:function(n,t){if(!n||"string"!=typeof n)throw new Error("必须传入字符串类型的url地址");var e={url:n,method:"POST",withCredentials:!0};if("object"!==(void 0===t?"undefined":a()(t)))throw new Error("data为对象类型");return t&&"object"===(void 0===t?"undefined":a()(t))&&(e.data=t),new r.a(function(n,t){u()(e).then(function(t){n(t.data)}).catch(function(n){console.log("post",n)})})},jsonp:function(n){if(!n||"string"!=typeof n)throw new Error("必须传入字符串类型的url地址");return new r.a(function(t,e){window.jsonCallBack=function(n){t(n)};var o=document.createElement("script");o.type="text/javascript",o.src=n+"&callback=jsonCallBack",document.getElementsByTagName("head")[0].appendChild(o),setTimeout(function(){document.getElementsByTagName("head")[0].removeChild(o)},500)})},upload:function(n,t){if(console.log("data",n),!n||"string"!=typeof n)throw new Error("必须传入字符串类型的url地址");var e={url:n,method:"POST",headers:{"Content-Type":"multipart/form-data"},data:t,withCredentials:!0};return new r.a(function(n,t){console.log(e),u()(e).then(function(t){n(t.data)}).catch(function(n){console.log("upload",n)})})}};t.a={install:function(n,t){Object.defineProperty(n.prototype,"$http",{value:p})}}}).call(t,e("DuR2"))},f9EK:function(n,t){},iPXC:function(n,t,e){"use strict";e("Av7u");var o=e("AoLr"),a={info:{},getCookie:function(){return(new o).get("_dianhai_")},setCookie:function(){(new o).set("_dianhai_",this.info,{exp:3600})},removeCookie:function(){(new o).delete("_dianhai_")}};t.a=a},"nv+h":function(n,t,e){"use strict";(function(n){var o=e("iPXC"),a=e("NC6I"),i=e.n(a);t.a={data:function(){return{nickname:"未登录",modal:!1,form:{pwd:"",newPwd:"",confirmPwd:""},oneLink:[],link:[],twoLink:[],isCollapsed:!1}},computed:{menuitemClasses:function(){return["menu-item",this.isCollapsed?"collapsed-menu":""]},setActive:function(){return this.$route.path.replace("/","")}},created:function(){var n=o.a.getCookie();n?(this.nickname=n.nickname,this.getLink(n.accountId)):this.$router.push({path:"/"})},methods:{setHeight:function(){var n=window.innerHeight;n=n-64-69-2,document.getElementById("Main-middle").style.height=n+"px",document.getElementById("Main-section").style.height=n-61+"px"},show:function(){this.modal=!0},cancel:function(){this.pwd=""},update:function(){var t=this,e=this;if(""==e.form.pwd)return e.form.pwd="",e.form.newPwd="",e.form.confirmPwd="",e.$Message.error("原始密码不能为空"),!1;if(""==e.form.newPwd)return e.form.pwd="",e.form.newPwd="",e.form.confirmPwd="",e.$Message.error("新密码不能为空"),!1;if(e.form.newPwd!=e.form.confirmPwd)return e.form.pwd="",e.form.newPwd="",e.form.confirmPwd="",e.$Message.error("两次密码不一致.请重新输入"),!1;var a=o.a.getCookie();e.$http.post(n.url.account_pwd,{accountId:a.accountId,oldpwd:i()(e.form.pwd),password:i()(e.form.newPwd)}).then(function(n){0==n?(e.$Message.error("原始密码不正确"),e.form.pwd="",e.form.newPwd="",e.form.confirmPwd=""):t.loginOut()})},loginOut:function(){var t=this;t.$http.get(n.url.account_loginout,{}).then(function(n){o.a.removeCookie(),t.$router.push({path:"/"})})},getLink:function(t){var e=this;e.$http.get(n.url.account_link,{accountId:t}).then(function(n){e.link=n,e.link&&(e.link.map(function(n){var t;null===n.parentLinkId&&(t={title:n.name,key:n.linkId,icon:n.icon_class,parentLinkId:n.parentLinkId,url:n.url,children:[]},e.oneLink.push(t))}),e.oneLink.map(function(n){e.link.find(function(t){if(t.parentLinkId===n.key){n.children.push({title:t.name,key:t.linkId,url:t.url,icon:t.icon_class,parentLinkId:t.parentLinkId,childrens:[]});var o={title:t.name,key:t.linkId,url:t.url,icon:t.icon_class,parentLinkId:t.parentLinkId,childrens:[]};e.twoLink.push(o)}})}),e.twoLink.map(function(n){e.link.find(function(t){t.parentLinkId===n.key&&n.childrens.push({title:t.name,key:t.linkId,url:t.url,icon:t.icon_class,parentLinkId:t.parentLinkId})})}))})},routeTo:function(n){this.$router.push(n)}},mounted:function(){this.setHeight();this.oneLink}}}).call(t,e("DuR2"))}},["NHnr"]);
//# sourceMappingURL=app.5d8ab290a222433bb580.js.map