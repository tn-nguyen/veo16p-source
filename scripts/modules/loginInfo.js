/* 
 * loginInfo.js
 * -------------
 */

define(['modules/ajax'],
       function() {
  // Template load
  'use strict';

  var loginInfo = function() {
    //this.initialize();
  };

  loginInfo.prototype = {

    initialize: function() {
       var locale = WebView.cookie.getCookie('backbone_lang');

      if (locale === null) {
        this.setDefaultLocale();
      }

      if (this.checkSupportLocaleKey(locale) === false && this.checkSupportLocaleValue(locale) === false) {
        // this.setDefaultLocale();
      }

      WebView.languageData = languageData;
      WebView.text = this.useSprintf;
    }
  };

  return loginInfo;
});