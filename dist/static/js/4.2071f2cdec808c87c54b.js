webpackJsonp([4],{XMpA:function(t,e){},l7Us:function(t,e,i){"use strict";(function(t){e.a={data:function(){return{auth_code:this.$route.query.auth_code,app_id:this.$route.query.id}},created:function(){this.auth_code&&this.updateToken()},methods:{sub:function(){this.$http.get(t.url.accredit,{id:this.app_id}).then(function(t){t.status&&(window.location.href=t.href)})},updateToken:function(){this.$http.post(t.url.update_token,{AppId:this.app_id,AuthCode:this.auth_code}).then(function(t){console.log(t)})}}}}).call(e,i("DuR2"))},rEo5:function(t,e){},wKhx:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("l7Us"),c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"accredit"},[this.auth_code?this._e():e("Button",{staticClass:"btn",attrs:{type:"error",icon:"alert-circled"},on:{click:this.sub}},[this._v("微信开放平台授权")])],1)},staticRenderFns:[]};var o=function(t){i("XMpA"),i("rEo5")},s=i("VU/8")(n.a,c,!1,o,"data-v-1cc5fa43",null);e.default=s.exports}});
//# sourceMappingURL=4.2071f2cdec808c87c54b.js.map