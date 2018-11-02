/* 
 * authorization.js
 * -------------
 */

define(['modules/ajax'],
       function() {
  // Template load
  'use strict';

  var authorization = function() {
    this.initialize();
  };

  authorization.prototype = {
    options: {},
    initialize: function() {
      this.getAutorityInfo();
    },

    getAutorityInfo: function() {
      WebView.ajax.apiCall({
        action: 'get_info',
        menu: 'authinfo',
        data: null,
        callback: this.getAutorityInfoHandler,
        quite: true
      });
    },

    getAutorityInfoHandler: function(resp) {
      WebView.log(resp);
      w.AUTHORITYINFO = resp;
    }
  };

  return authorization;
});