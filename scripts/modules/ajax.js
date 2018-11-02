/*
 * ajax.js
 * ----------
 *
 */

define([], function () {
  'use strict';

  var ajax = function() {
  };

  ajax.prototype = {
    _syncAjaxResult: false,
    _syncAjaxData: null,

    _initSyncAjax: function() {
      this._syncAjaxResult = false;
      this._syncAjaxData = null;
    },

    syncLoadData: function(url, datatype) {
      var my = this,
          ret = '';
      this._initSyncAjax();

      $.ajax({
        cache: false,
        async: false,
        url: url,
        dataType: datatype? datatype: "json",
        success: function(data) {
          my._syncAjaxResult = true;
          my._syncAjaxData = data;
        },
        error: function(error, reason) {
          my._syncAjaxResult = false;
          my._syncAjaxData = reason;
        }
      });

      if (my._syncAjaxResult == true) {
        ret = my._syncAjaxData;
      } else {
        WebView.log('Sync Ajax call fail. reason: ' + my._syncAjaxData);
      }

      return ret;
    },

    ajaxCall: function(ajaxConfig) {
      var my = this, newAjaxConfig,
          success,
          complete;

      newAjaxConfig = _.clone(ajaxConfig);
      success = newAjaxConfig.success,
      complete = newAjaxConfig.complete;
      
      newAjaxConfig.success = function(resp) {
        var ret = my.checkValidReturnMsg(resp);

        if (ret) {
          if (success) success(resp);
        } else {
          if (success) success(false);
        }
      }
      if (complete) {
        newAjaxConfig.complete = function (resp, state) {
          complete(resp);
        }

      }
      return $.ajax(newAjaxConfig);
    },

    apiCall: function(options) {
      var my = this,
          ret,
          urlRoot = '/cgi-bin/webra_fcgi.fcgi',
          api;

      if (!options) return false;

      api = 'action=' + options.action;
      api += '&menu=' + options.menu;
      if (typeof options.data == 'object') {
        for (var i in options.data) {
          api += '&' + i + '=' + options.data[i];
        }
      } else {
      }
      
      WebView.log('[ajax.js] ajax api call : ' + api);

      $.ajax({
        data : api,
        datatype : 'text',
        processData : true,
        success: function(data, textStatus, jqXHR) {
          ret = my.checkValidReturnMsg(data, options.quiet);

          if (ret) {
            data = WebView.json.resultToJson(data);
            if (typeof options.callback == 'function') {
              if (data == '') data = true;
              options.callback.call(undefined, data, true);
            }
          } else {
            if (typeof options.callback == 'function') {
              options.callback.call(undefined, false);
            }
          }
          
          return ret;
        },
        fail: function(jqXHR, textStatus, errorThrown) {
          WebView.log('ajax fail!');
          if (typeof options.callback == 'function') {
            options.callback.call(undefined, jqXHR, false);
          }
          return false;
        },
        type : 'POST',
        url : urlRoot
      });

      return true;
    },

    apiCallSync: function(options) {
      var my = this,
          ret,
          urlRoot = '/cgi-bin/webra_fcgi.fcgi',
          api;

      if (!options) return false;

      api = 'action=' + options.action;
      api += '&menu=' + options.menu;
      if (typeof options.data == 'object') {
        for (var i in options.data) {
          api += '&' + i + '=' + options.data[i];
        }
      } else {
        WebView.log('options.data error. use array type!');
      }
      
      WebView.log('[ajax.js] ajax api call : ' + api);
      $.ajax({
        data : api,
        datatype : 'text',
        async: false,
        processData : true,
        success: function(data, textStatus, jqXHR) {
          ret = my.checkValidReturnMsg(data, true);

          if (ret) {
            data = WebView.json.resultToJson(data);
            if (typeof options.callback == 'function') {
              if (data == '') data = true;
              options.callback.call(undefined, data, true);
            }
          } else {
            if (typeof options.callback == 'function') {
              options.callback.call(undefined, false);
            }
          }
          
          return ret;
        },
        fail: function(jqXHR, textStatus, errorThrown) {
          WebView.log('ajax fail!');
          if (typeof options.callback == 'function') {
            options.callback.call(undefined, jqXHR, false);
          }
          return false;
        },
        type : 'POST',
        url : urlRoot
      });

      return true;
    },

    checkValidReturnMsg: function(msg, quiet) {
      var ret = true;
      switch(msg) {
        case 'DVR In Setup!':
          if (!quiet) {
            v.dialogNotice.close();
            v.dialogNotice.open({
              data: {text: [w.text('DVR setup is being configured by local administrator.!')]},
              caller: this,
              autoClose: true
            });
          }
          ret = false;
          break;
        case 'DVR In Arch!':
          if (!quiet) {
            v.dialogNotice.close();
            v.dialogNotice.open({
              data: {text: [w.text('DVR Archiving is being configured by local administrator.!')]},
              caller: this,
              autoClose: true
            });
          }
          ret = false;
          break;
        case 'No Permission Error!':
          if (!quiet) {
            v.dialogNotice.close();
            v.dialogNotice.open({
              data: {text: [w.text('No Permission!')]},
              caller: this,
              autoClose: true
            });
          }
          ret = false;
          break;
        case 'DVR In SCM not ready!':
          if (!quiet) {
            v.dialogNotice.close();
            v.dialogNotice.open({
              data: {text: [w.text('LTXT_ERR_NVR_NOT_READY')]},
              caller: this,
              autoClose: true
            });
          }
          ret = false;
          break;
        case 'Send Error! 1':
        case 'Send Error! 2':
        case 'Send Error! 3':
          if (!quiet) {
            v.dialogNotice.close();
            v.dialogNotice.open({
              data: {text: [w.text('Send Error!')]},
              caller: this,
              autoClose: true
            });
          }
          ret = false;
        default:
          ret = true;
          break;
      }
      return ret;
    }
  };

  WebView.ajax = new ajax();
});
