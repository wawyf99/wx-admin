/**
 * 枚举类
 */
var Enum = (function () {
  var hasOwnProperty = Object.prototype.hasOwnProperty,
      toString = function () {
          return this.value;
      };

  var E = function (items) {
      var self = this,
          item,
          key;

      for (key in items) {
          if (hasOwnProperty.call(items, key)) {
              item = items[key];

              // 挂入原型方法
              item.constructor.prototype.valueOf = toString;
              item.constructor.prototype.toString = toString;

              self[key] = item;
          }
      }
  }

  E.prototype = {
      constructor: E,

      get: function (name) {
          var item;

          if (hasOwnProperty.call(this, name)) {
              item = this[name];

              return item;
          }
      },

      set: function (name, value, text) {
          var item;

          if (hasOwnProperty.call(this, name)) {
              item = this[name];

              if (value) {
                  item.value = value;
              }

              if (text) {
                  item.text = text;
              }
          }
      }
  };

  return E;

})();

/**
* 轮播消息枚举
*/
var roastingType = new Enum({
  normal: {
      text: "轮播中",
      value: 0
  },
  stop: {
      text: "已停止",
      value: 1
  },
  out: {
      text: "已过期",
      value: 2
  },
  delete: {
      text: "已撤销",
      value: 3
  }
});

module.exports = {
  roastingType
};