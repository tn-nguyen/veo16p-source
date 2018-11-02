/* 
 * jpeg.js
 * -------------
 */

define(['modules/ajax',
        'modules/json'],
       function() {
  // Template load
  'use strict';

  var jpeg = function() {
    if( this == window ) {
      return new jpeg();
    }

    if( this.init ) {
      return this;
    }

    this.interval = 5000;
    this.channel = 0;

    this.initialize();
  };

  jpeg.prototype = {
    init: false,
    _interval : null,
    _ajaxConfig : null,
    _callback: null,

    // methods
    initialize: function() {
      var me = this;
      this.init = true;
      this._ajaxConfig = {
        type : 'POST',
        url : '/cgi-bin/webra_fcgi.fcgi',
        success : function(response) {
          me._ajaxSuccess(me._callback, response);
        },
        fail : function(response) {
        }
      }
    },

    start: function(interval) {
      var me = this;
      var intervalFunc = function() {
        me._ajaxCall(me);
      };
      if (me._interval == null) {
        me._interval = setInterval(intervalFunc, 1000);
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

    restart : function() {
      this.stop();
      this.start();
    },

    setCallback: function(callback) {
      this._callback = callback;
    },

    setChannel: function(channel) {
      this.channel = channel;
    },

    _ajaxCall: function(me) {
      var action;
      var nextIndex = parseInt(me.currIndex) + 1;
      nextIndex %= me.MAX_SCM_MSG_INDEX;

      action = 'action=get_live&menu=live.jpeg';
      action += '&chno=' + me.channel + '&debug=';

      me._ajaxConfig.data = action;

      WebView.ajax.ajaxCall(me._ajaxConfig);
    },

    _ajaxSuccess : function(callback, response) {
      response = WebView.json.resultToJson(response);
      if ($.isFunction(callback))
      callback(response['filepath']);
      return true;
    }

  };

  return jpeg;
});
