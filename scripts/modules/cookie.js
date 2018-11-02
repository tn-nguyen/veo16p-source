/* 
 * cookie.js
 * -------------
 * 
 */

define([], function () {

  'use strict';
  var cookie = function () {
    
  };

  cookie.prototype = {
    getCookie : function(cName){
      cName = cName + '=';
      var cookieData = document.cookie;
      var start = cookieData.indexOf(cName);
      var cValue = '';
      if(start != -1){
        start += cName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
          cValue = cookieData.substring(start, end);
      }

      return unescape(cValue);
    },

    setCookie : function(name, value){
      var expire = new Date();
      expire.setDate(expire.getDate() + 1000);    // 1000
      document.cookie = name + '=' + escape(value) + '; path=/; expires=' + expire; 
    }
  };

  WebView.cookie = new cookie();
});