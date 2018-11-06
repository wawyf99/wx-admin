
/**
 * 全局变量
 */
//本地环境
//global.baseUrl = "http://localhost:3031";
//正式环境
global.baseUrl = "http://wx.api.ssmulu.com";
//api全局路由
global.url = {
  login: '/admin/login', //用户登录
  accredit: '/wechat/', //开放平台授权
  update_token: '/wechat/updateToken', //更新Token

  role_add: '/role/add', //添加角色
  role_list: '/role/list', //获取角色列表
  role_linklist: '/role/linklist', //获取链接列表
  role_addrolelink: '/role/addrolelink', //添加角色权限
  role_del: '/role/del', //删除角色权限
  role_getRole: 'role/getRole', //获取当前用户身份

  account_add: '/admin/add', //添加用户
  account_exists: '/admin/exists', //验证账号是否存在
  account_list: '/admin/list', //账号列表
  account_pwd: '/admin/pwd', //修改密码
  account_restpwd: '/admin/restpwd', //重置密码
  account_loginout: '/admin/loginout', //退出登录
  account_disabled: '/admin/disabled', //禁用账户
  account_find: '/admin/account', //获取用户
  account_link: '/admin/link', //获取用户权限

  wx_list: '/wx/wxList', //获取公众号列表
  wx_add: '/wx/wxAdd', //新增公众号
  wx_get_one: '/wx/wxGetOne', //获取单条记录
  wx_operation: '/wx/wxOperation',  //修改状态
  wx_del: '/wx/wxDel', //删除

  log: '/log', //获取日志列表
  issue: '/report/issue', //问题反馈


};

/**
 * 分页全局配置
 */
global.page = {
  index: 0,
  size: 20
};
