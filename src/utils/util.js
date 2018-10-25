/**
 * 全局类
 */
// export default {
//   install(vue, options) {

//   }
// }


let util = {

};

util.oneOf = function (ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true;
  } else {
    return false;
  }
};

export default util;
