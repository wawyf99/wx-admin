const CryptoJS = require('crypto-js');
const cache = require('web-storage-cache');
// /**
//  * cookie 类
//  */
// class Cookie {
//   constructor(user) {
//     this.info = user;
//     this.key = "__dhkj__";
//   }
//   /**
//    * 获取cookie
//    */
//   getCookie() {
//     var wsCache = new cache();
//     let val = wsCache.get('_dianhai_');
//     // let decrypted = CryptoJS.AES.decrypt(val, this.key, {
//     //   mode: CryptoJS.mode.ECB,
//     //   padding: CryptoJS.pad.Pkcs7
//     // });
//     // decrypted = CryptoJS.enc.Utf8.stringify(decrypted); // 转换为 utf8 字符串
//     return val;
//   }
//   /**
//    * 写入cookie
//    */
//   setCookie() {
//     var wsCache = new cache();
//     // var encryptedData = CryptoJS.AES.encrypt(this.info, this.key, {
//     //   mode: CryptoJS.mode.ECB,
//     //   padding: CryptoJS.pad.Pkcs7
//     // });
//     wsCache.set('_dianhai_', this.info, {
//       exp: 7200
//     });
//   }
// }
const Cookie = {
  info: {},
  /**
   * 获取cookie
   */
  getCookie() {
    var wsCache = new cache();
    let val = wsCache.get('_dianhai_');
    // let decrypted = CryptoJS.AES.decrypt(val, this.key, {
    //   mode: CryptoJS.mode.ECB,
    //   padding: CryptoJS.pad.Pkcs7
    // });
    // decrypted = CryptoJS.enc.Utf8.stringify(decrypted); // 转换为 utf8 字符串
    return val;
  },
  /**
   * 写入cookie
   */
  setCookie() {
    var wsCache = new cache();
    // var encryptedData = CryptoJS.AES.encrypt(this.info, this.key, {
    //   mode: CryptoJS.mode.ECB,
    //   padding: CryptoJS.pad.Pkcs7
    // });
    wsCache.set('_dianhai_', this.info, {
      exp: 3600
    });
  },
  removeCookie() {
    var wsCache = new cache();
    wsCache.delete('_dianhai_');
  }
}

export default Cookie;
