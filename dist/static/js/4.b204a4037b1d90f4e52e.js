webpackJsonp([4],{jFMF:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("mykl"),r={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Tabs",{model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[n("TabPane",{attrs:{label:"添加角色",name:"add",disabled:!e.isDisabled}},[n("div",{staticClass:"content-bar"},[n("Form",{ref:"ruleCustom",attrs:{"label-width":80,inline:""}},[n("FormItem",{attrs:{label:"角色名称:"}},[n("Input",{staticStyle:{width:"300px"},attrs:{type:"text",placeholder:"请输入角色名称..."},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),e._v(" "),n("FormItem",[n("Button",{attrs:{type:"primary"},on:{click:function(t){e.saveRole(e.name)}}},[e._v("保存")])],1)],1)],1),e._v(" "),n("Table",{attrs:{border:"",columns:e.columns,data:e.roleList}})],1),e._v(" "),n("TabPane",{attrs:{label:"角色权限",name:"role",disabled:e.isDisabled}},[n("Form",{attrs:{inline:""}},[n("Col",[n("FormItem",e._l(e.linkList,function(e,t){return n("Card",{key:t,staticStyle:{width:"300px"},attrs:{bordered:!1}},[n("Tree",{ref:"Tree",refInFor:!0,attrs:{data:e,"show-checkbox":""}})],1)}))],1),e._v(" "),n("FormItem",[n("Button",{attrs:{type:"primary"},on:{click:function(t){e.saveRoleLink()}}},[e._v("下一步")]),e._v(" "),n("Button",{on:{click:function(t){e.cancel()}}},[e._v("取消")])],1)],1)],1)],1)},staticRenderFns:[]},a=n("VU/8")(i.a,r,!1,null,null,null);t.default=a.exports},mvHQ:function(e,t,n){e.exports={default:n("qkKv"),__esModule:!0}},mykl:function(e,t,n){"use strict";(function(e){var i=n("mvHQ"),r=n.n(i);t.a={data:function(){var e=this;return{roleList:[],tab:"",isDisabled:!0,name:"",roleId:0,arrRoleLink:[],columns:[{title:"角色名称",key:"roleName",align:"center"},{title:"权限名称",key:"linkname",align:"center"},{title:"权限ID",key:"linkid",align:"center"},{title:"操作",key:"action",align:"center",render:function(t,n){return t("div",[t("Button",{props:{type:"primary"},style:{margin:"5px"},on:{click:function(){e.update(n)}}},"修改"),t("Button",[t("Poptip",{props:{confirm:!0,title:"确定要删除么?"},on:{"on-ok":function(){e.delete(n)}}},"删除")])])}}],linkList:[]}},created:function(){this.getRole(),this.getLinkList()},methods:{cancel:function(){this.tab="add",this.name="",this.isDisabled=!0,this.getLinkList()},saveRoleLink:function(){var t=this;t.arrRoleLink=[],t.linkList.map(function(e){e.map(function(e){e.children&&e.children.map(function(e){1==e.checked&&t.arrRoleLink.push(e.key),e.children&&e.children.map(function(e){1==e.checked&&t.arrRoleLink.push(e.key)})})})}),this.$http.post(e.url.role_add,{name:t.name,data:r()(t.arrRoleLink)}).then(function(e){t.$Message.success("添加成功!"),t.tab="add",t.name="",t.isDisabled=!0,t.getRole(),t.getLinkList()}).catch(function(e){t.$Message.error("添加失败!")})},update:function(e){this.tab="role",this.isDisabled=!1,this.name=e.row.roleName,this.roleId=e.row.roleId;var t=e.row.linkid.split(",");this.linkList.map(function(e){e.map(function(e){e.children&&e.children.map(function(e){t.find(function(t){t==e.key&&(e.checked=!0)}),e.children&&e.children.map(function(e){t.find(function(t){t==e.key&&(e.checked=!0)})})})})})},delete:function(t){var n=this;this.$http.post(e.url.role_del,{roleId:t.row.roleId}).then(function(e){"0"==e.code&&n.$Message.error(e.msg),n.getRole()}).catch(function(e){n.$Message.error("删除失败!")})},getLinkList:function(){var t=this;this.$http.get(e.url.role_linklist).then(function(e){t.jsonLink(e)})},getRole:function(){var t=this;this.$http.get(e.url.role_list).then(function(e){t.roleList=e})},saveRole:function(e){if(this.name=this.$trim(this.name),""==this.name)return this.$Message.error("请输入角色名称!"),!1;this.tab="role",this.isDisabled=!1},jsonLink:function(e){if(this.linkList=[],e){var t=[];e.forEach(function(e){null===e.parentLinkId&&t.push({key:e.linkId,title:e.name,expand:!0,children:[]})}),e.forEach(function(e){t.forEach(function(t){e.parentLinkId==t.key&&t.children.push({key:e.linkId,title:e.name,children:[],expand:!0,checked:!1})})}),e.forEach(function(e){t.forEach(function(t){t.children.forEach(function(t){e.parentLinkId==t.key&&t.children.push({key:e.linkId,title:e.name,expand:!0,checked:!1})})})}),t&&this.linkList.push(t)}}}}}).call(t,n("DuR2"))},qkKv:function(e,t,n){var i=n("FeBl"),r=i.JSON||(i.JSON={stringify:JSON.stringify});e.exports=function(e){return r.stringify.apply(r,arguments)}}});
//# sourceMappingURL=4.b204a4037b1d90f4e52e.js.map