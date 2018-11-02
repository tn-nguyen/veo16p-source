/* 
 * importInfo.js
 * -------------
 * 
 */

define(['modules/ajax',
        'modules/cookie'], function () {

  'use strict';

  var importInfo = function() {
    var preferences = this.getStaticInfo();
    this.initialize(preferences);
  };

  importInfo.prototype = {
    // Properties
    _interval : null,
    _ajaxConfig : null,

    initialize: function(preferences) {
      var me = this,
          languageKey = preferences.LanguageList;

      // for (var i in languageKey) {
      //   languageKey[i] = languageKey[i].replace('(', '-');
      //   languageKey[i] = languageKey[i].replace(')', '');
      // }
      w.INFO = preferences;

      // w.INFO.Language = WebView.cookie.getCookie('local_language');
      this._ajaxConfig = {
        cache : false,
        dataType : 'json',
        url : '/content/staticInfo.json',
        success: function(response){
          me._ajaxSuccess(response);
        },
        fail : function(response) {
        }
      }
    },
    
    // Public Method
    // infinite == true  : infinite
    // infinite == false : Once
    start : function (infinite) {
      var me = this;
      var intervalFunc = function() {
        WebView.ajax.ajaxCall(me._ajaxConfig);
      };

      if (!this._ajaxConfig) {
        WebView.log('[importInfo] _ajaxConfig is Null!');
        return false;
      }

      if (infinite) {
        if (me._interval == null) {
          intervalFunc();
          me._interval = setInterval(intervalFunc, 5000);
        }
      } else {
        WebView.ajax.ajaxCall(me._ajaxConfig);
      }
      return true;
    },

    stop : function () {
      var me = this;
      var ret;

      if (me._interval) {
        clearInterval(me._interval);
        me._interval = null;
        ret = true;
      } else {
        ret = false;
      }
      return ret;
    },

    _ajaxSuccess : function(response) {
      //this.parseInfo(response);
      // extend static < dynamic info

      return true;
    },

    getStaticInfo: function() {
      var jsonString = WebView.ajax.syncLoadData('content/staticInfo.json');
      w.log(jsonString);

      return jsonString;
    }
  };

  return importInfo;
});
