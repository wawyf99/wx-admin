webpackJsonp([8],{"+skl":function(t,e){},BfUi:function(t,e,n){(function(t){t.baseUrl="https://wx.api.ssmulu.com",t.url={login:"/admin/login",accredit:"/wechat/",update_token:"/wechat/updateToken",role_add:"/role/add",role_list:"/role/list",role_linklist:"/role/linklist",role_addrolelink:"/role/addrolelink",role_del:"/role/del",role_getRole:"role/getRole",account_add:"/admin/add",account_exists:"/admin/exists",account_list:"/admin/list",account_pwd:"/admin/pwd",account_restpwd:"/admin/restpwd",account_loginout:"/admin/loginout",account_disabled:"/admin/disabled",account_find:"/admin/account",account_link:"/admin/link",wx_list:"/wx/wxList",wx_add:"/wx/wxAdd",wx_get_one:"/wx/wxGetOne",wx_operation:"/wx/wxOperation",wx_del:"/wx/wxDel",log:"/log",issue:"/report/issue"},t.page={index:0,size:20}}).call(e,n("DuR2"))},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("7+uW"),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var r=n("VU/8")({name:"App"},a,!1,function(t){n("f9EK")},"data-v-69669f98",null).exports,i=n("YaEn"),c=n("BTaQ"),l=n.n(c),s=(n("+skl"),n("BfUi")),u=n.n(s),d={oneOf:function(t,e){return e.indexOf(t)>=0}},p=d,f=n("Z1y9"),m=n("XLwt"),h=n.n(m);o.default.config.productionTip=!1,o.default.use(u.a),o.default.use(p),o.default.use(l.a),o.default.use(f.a),o.default.prototype.$trim=function(t){var e=t,n=/\s+/g;return console.log(/\s+/g.test(t)),n.test(t)&&(e=e.replace(n,"")),e},Date.prototype.Format=function(t){var e={"m+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"s+":this.getMinutes(),"i+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var n in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),e)new RegExp("("+n+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[n]:("00"+e[n]).substr((""+e[n]).length)));return t},o.default.prototype.$echarts=h.a,new o.default({el:"#app",router:i.a,components:{App:r},template:"<App/>"})},YaEn:function(t,e,n){"use strict";var o=n("7+uW"),a=n("/ocq"),r=n("nv+h"),i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"layout"},[n("Layout",[n("Header",[n("Menu",{attrs:{mode:"horizontal",theme:"dark","active-name":"1"}},[n("div",{staticClass:"layout-logo"},[t._v("开放平台管理后台")]),t._v(" "),n("div",{staticClass:"Main-header-right"},[n("Dropdown",{attrs:{trigger:"click"}},[n("Button",{attrs:{type:"primary"}},[t._v("\n              "+t._s(t.nickname)+"\n              "),n("Icon",{attrs:{type:"arrow-down-b"}})],1),t._v(" "),n("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[n("DropdownItem",[n("Icon",{attrs:{type:"ios-refresh"}}),t._v(" "),n("a",{on:{click:t.show}},[t._v("修改密码")])],1),t._v(" "),n("DropdownItem",[n("Icon",{attrs:{type:"ios-minus"}}),t._v(" "),n("a",{on:{click:t.loginOut}},[t._v("退出登录")])],1)],1)],1)],1)])],1),t._v(" "),n("Layout",{style:{padding:"0 10px"},attrs:{id:"Main-middle"}},[n("Breadcrumb",{style:{margin:"10px 0"}},[n("BreadcrumbItem",[t._v(t._s(this.$route.name))])],1),t._v(" "),n("Content",{style:{padding:"10px 0",minHeight:"280px",background:"#fff"}},[n("Layout",{attrs:{id:"Main-section"}},[n("Sider",{staticClass:"Main-left",style:{background:"#fff"},attrs:{"hide-trigger":""}},[n("Menu",{class:t.menuitemClasses,attrs:{theme:"light",width:"auto"},on:{"on-select":t.routeTo}},t._l(t.oneLink,function(e,o){return n("Submenu",{key:o,attrs:{name:e.key}},[n("template",{slot:"title"},[n("Icon",{attrs:{type:e.icon}}),t._v("\n                  "+t._s(e.title)+"\n                ")],1),t._v(" "),t._l(t.twoLink,function(o,a){return e.key==o.parentLinkId&&o.childrens.length>0&&""==o.url?n("Submenu",{key:a,attrs:{name:o.key}},[n("template",{slot:"title"},[n("Icon",{attrs:{type:o.icon}}),t._v("\n                      "+t._s(o.title)+"\n                    ")],1),t._v(" "),t._l(o.childrens,function(e,o){return n("MenuItem",{key:o,attrs:{name:e.url}},[t._v(t._s(e.title))])})],2):t._e()}),t._v(" "),t._l(e.children,function(e,o){return""!=e.url?n("MenuItem",{key:o,attrs:{name:e.url}},[t._v(t._s(e.title))]):t._e()})],2)}))],1),t._v(" "),n("Content",{style:{padding:"0 10px",minHeight:"280px",background:"#fff"}},[n("router-view")],1)],1)],1)],1),t._v(" "),n("Footer",{staticClass:"layout-footer-center"},[t._v("2017-2018 © 深圳市XX科技有限公司")])],1),t._v(" "),n("Modal",{attrs:{title:"提现审核"},on:{"on-ok":t.update,"on-cancel":t.cancel},model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[n("Form",{ref:"form",attrs:{model:t.form,"label-width":100}},[n("FormItem",{attrs:{label:"原始密码:"}},[n("Input",{staticStyle:{width:"200px"},attrs:{type:"password",placeholder:"请输入原始密码"},model:{value:t.form.pwd,callback:function(e){t.$set(t.form,"pwd",e)},expression:"form.pwd"}})],1),t._v(" "),n("FormItem",{attrs:{label:"新密码:"}},[n("Input",{staticStyle:{width:"200px"},attrs:{type:"password",placeholder:"请输入新密码"},model:{value:t.form.newPwd,callback:function(e){t.$set(t.form,"newPwd",e)},expression:"form.newPwd"}})],1),t._v(" "),n("FormItem",{attrs:{label:"确认新密码:"}},[n("Input",{staticStyle:{width:"200px"},attrs:{type:"password",placeholder:"请输入确认新密码"},model:{value:t.form.confirmPwd,callback:function(e){t.$set(t.form,"confirmPwd",e)},expression:"form.confirmPwd"}})],1)],1)],1)],1)},staticRenderFns:[]};var c=function(t){n("j5H0")},l=n("VU/8")(r.a,i,!1,c,"data-v-73afd068",null).exports;o.default.use(a.a);var s=new a.a({hashbang:!1,mode:"history",routes:[{path:"/",name:"登录",component:function(t){return n.e(5).then(function(){var e=[n("Quw4")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/wechat/accredit",name:"授权",component:function(t){return n.e(0).then(function(){var e=[n("wKhx")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/main",name:"主页",component:l,children:[{path:"/account",name:"管理员权限 / 管理员列表",component:function(t){return n.e(6).then(function(){var e=[n("wHCT")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/account/add",name:"管理员权限 / 新增管理员",component:function(t){return n.e(2).then(function(){var e=[n("I5IU")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/account/role",name:"管理员权限 / 角色管理",component:function(t){return n.e(1).then(function(){var e=[n("jFMF")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/wx",name:"运营后台 / 公众号管理 / 公众号列表",component:function(t){return n.e(3).then(function(){var e=[n("nLzc")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/wx/add",name:"运营后台 / 公众号管理 / 新增公众号",component:function(t){return n.e(4).then(function(){var e=[n("ACBN")];t.apply(null,e)}.bind(this)).catch(n.oe)}}]}]});s.beforeEach(function(t,e,n){document.getElementById("titleId").innerHTML=t.name,n()});e.a=s},Z1y9:function(t,e,n){"use strict";(function(t){var o=n("pFYg"),a=n.n(o),r=n("//Fk"),i=n.n(r),c=n("mtWM"),l=n.n(c),s=n("YaEn"),u=n("mw3O"),d=n.n(u);l.a.defaults.timeout=2e4,l.a.defaults.baseURL=t.baseUrl,l.a.interceptors.request.use(function(t){return t},function(t){return console.log("http请求拦截器",t),i.a.reject(t)}),l.a.interceptors.response.use(function(t){return-1==t.data.code&&s.a.push({path:"/"}),t},function(t){if(t.response){var e={404:"http://www.aylan.me/404",501:"http://www.aylan.me/error"};void 0===!e[t.response.status]&&s.a.push(e[t.response.status])}return console.log("http响应拦截器",t),i.a.reject(t.response.data)});var p={get:function(t,e){if(!t||"string"!=typeof t)throw new Error("必须传入字符串类型的url地址");var n={url:t,method:"GET",headers:{"Content-Type":"application/x-www-form-urlencoded"},paramsSerializer:function(t){return d.a.stringify(t,{arrayFormat:"brackets"})},withCredentials:!0};if(e&&"object"!==(void 0===e?"undefined":a()(e)))throw new Error("data为对象类型");return e&&"object"===(void 0===e?"undefined":a()(e))&&(n.params=e),new i.a(function(t,e){l()(n).then(function(e){t(e.data)}).catch(function(t){console.log("get",t)})})},post:function(t,e){if(!t||"string"!=typeof t)throw new Error("必须传入字符串类型的url地址");var n={url:t,method:"POST",withCredentials:!0};if("object"!==(void 0===e?"undefined":a()(e)))throw new Error("data为对象类型");return e&&"object"===(void 0===e?"undefined":a()(e))&&(n.data=e),new i.a(function(t,e){l()(n).then(function(e){t(e.data)}).catch(function(t){console.log("post",t)})})},jsonp:function(t){if(!t||"string"!=typeof t)throw new Error("必须传入字符串类型的url地址");return new i.a(function(e,n){window.jsonCallBack=function(t){e(t)};var o=document.createElement("script");o.type="text/javascript",o.src=t+"&callback=jsonCallBack",document.getElementsByTagName("head")[0].appendChild(o),setTimeout(function(){document.getElementsByTagName("head")[0].removeChild(o)},500)})},upload:function(t,e){if(console.log("data",t),!t||"string"!=typeof t)throw new Error("必须传入字符串类型的url地址");var n={url:t,method:"POST",headers:{"Content-Type":"multipart/form-data"},data:e,withCredentials:!0};return new i.a(function(t,e){console.log(n),l()(n).then(function(e){t(e.data)}).catch(function(t){console.log("upload",t)})})}};e.a={install:function(t,e){Object.defineProperty(t.prototype,"$http",{value:p})}}}).call(e,n("DuR2"))},f9EK:function(t,e){},iPXC:function(t,e,n){"use strict";n("Av7u");var o=n("AoLr"),a={info:{},getCookie:function(){return(new o).get("_dianhai_")},setCookie:function(){(new o).set("_dianhai_",this.info,{exp:3600})},removeCookie:function(){(new o).delete("_dianhai_")}};e.a=a},j5H0:function(t,e){},"nv+h":function(t,e,n){"use strict";(function(t){var o=n("iPXC"),a=n("NC6I"),r=n.n(a);e.a={data:function(){return{nickname:"未登录",modal:!1,form:{pwd:"",newPwd:"",confirmPwd:""},oneLink:[],link:[],twoLink:[],isCollapsed:!1}},computed:{menuitemClasses:function(){return["menu-item",this.isCollapsed?"collapsed-menu":""]},setActive:function(){return this.$route.path.replace("/","")}},created:function(){var t=o.a.getCookie();t?(this.nickname=t.nickname,this.getLink(t.accountId)):this.$router.push({path:"/"})},methods:{setHeight:function(){var t=window.innerHeight;t=t-64-69-2,document.getElementById("Main-middle").style.height=t+"px",document.getElementById("Main-section").style.height=t-61+"px"},show:function(){this.modal=!0},cancel:function(){this.pwd=""},update:function(){var e=this,n=this;if(""==n.form.pwd)return n.form.pwd="",n.form.newPwd="",n.form.confirmPwd="",n.$Message.error("原始密码不能为空"),!1;if(""==n.form.newPwd)return n.form.pwd="",n.form.newPwd="",n.form.confirmPwd="",n.$Message.error("新密码不能为空"),!1;if(n.form.newPwd!=n.form.confirmPwd)return n.form.pwd="",n.form.newPwd="",n.form.confirmPwd="",n.$Message.error("两次密码不一致.请重新输入"),!1;var a=o.a.getCookie();n.$http.post(t.url.account_pwd,{accountId:a.accountId,oldpwd:r()(n.form.pwd),password:r()(n.form.newPwd)}).then(function(t){0==t?(n.$Message.error("原始密码不正确"),n.form.pwd="",n.form.newPwd="",n.form.confirmPwd=""):e.loginOut()})},loginOut:function(){var e=this;e.$http.get(t.url.account_loginout,{}).then(function(t){o.a.removeCookie(),e.$router.push({path:"/"})})},getLink:function(e){var n=this;n.$http.get(t.url.account_link,{accountId:e}).then(function(t){n.link=t,n.link&&(n.link.map(function(t){var e;null===t.parentLinkId&&(e={title:t.name,key:t.linkId,icon:t.icon_class,parentLinkId:t.parentLinkId,url:t.url,children:[]},n.oneLink.push(e))}),n.oneLink.map(function(t){n.link.find(function(e){if(e.parentLinkId===t.key){t.children.push({title:e.name,key:e.linkId,url:e.url,icon:e.icon_class,parentLinkId:e.parentLinkId,childrens:[]});var o={title:e.name,key:e.linkId,url:e.url,icon:e.icon_class,parentLinkId:e.parentLinkId,childrens:[]};n.twoLink.push(o)}})}),n.twoLink.map(function(t){n.link.find(function(e){e.parentLinkId===t.key&&t.childrens.push({title:e.name,key:e.linkId,url:e.url,icon:e.icon_class,parentLinkId:e.parentLinkId})})}))})},routeTo:function(t){this.$router.push(t)}},mounted:function(){this.setHeight();this.oneLink}}}).call(e,n("DuR2"))}},["NHnr"]);
//# sourceMappingURL=app.7de78f7287cb743ad1a5.js.map