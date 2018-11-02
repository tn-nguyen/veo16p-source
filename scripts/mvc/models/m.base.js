/* 
 * m.base.js
 * -------------
 * 
 */

define(['jquery',
        'backbone',
        'modules/json'],
        function($, Backbone) {

  'use strict';

  // Creates a new Backbone Model class object
  var model = Backbone.Model.extend({

    urlRoot: '/cgi-bin/webra_fcgi.fcgi',

    action: {
      get: {action:'', menu:''},
      set: {action:'', menu:''}
    },

    // Model Constructor
    initialize: function() {
      //this.on('change', this.checkChange);
      if ($.isFunction(this.init)) {
        this.init();
      }
    },

    loadData: function() {
      this.attributes = {};
      this.fetch();
    },

    setDefault: function(data) {
      if (data) {
        this.defaults = data;
      } else {
        this.defaults = {};
      }

      this.changed = {};
      return this.defaults;
    },

    revert: function() {
      for (var i in this.defaults) {
        this.set(i, this.defaults[i]);
      }
      this.changed = {};
      return this.defaults;
    },

    checkChange: function(obj, targetObj) {  // TODO: this function - > override to hasChange
      var changed = false;
      if (!obj) {
        obj = this.defaults;
        targetObj = this.attributes
      }

      if (typeof obj === 'undefined') return false;
      for (var i in obj) {
        if (typeof obj[i] == 'object') {
          changed |= this.checkChange(obj[i], targetObj[i]);
        } else if (obj[i] != null && targetObj[i] != null) {
          if (obj[i] != targetObj[i]) {
            changed = true;
            break;
          }
        }
      }
      return changed;
    },

    // redefine backbone's fetch
    fetch: function(options) {
      if (typeof this.action !== 'object') return false;
      if (typeof this.action.get !== 'object') return false;
      if (typeof this.action.get.action  !== 'string' || typeof this.action.get.menu !== 'string') return false;
      if (this.action.get.action  === '' ||this.action.get.menu === '') return false;

      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;

      // data
      options.data = _.extend( {}, this.action.get, this.fetchData(this.action.get));
      options.data = WebView.json.jsonToSerializeData(options.data);

      options.success = function(resp) {
        var resp = WebView.json.resultToJson(resp),
            recvData = {};

        for (var i in resp) {
          if (i === 'debug') continue;
          if (!model.set(model.parse(i, resp[i]), resp[i])) return false;
          recvData[i] = resp[i];
        }
        model.setDefault(recvData);

        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      // wrapError
      var error = options.error;
      options.error = function(resp) {
        if (error) error(model, resp, options);
        model.trigger('error', model, resp, options);
      };
      return this.sync('read', this, options);
    },

    // redefine backbone's save
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      // If we're not waiting and attributes exist, save acts as `set(attr).save(null, opts)`.
      if (attrs && (!options || !options.wait) && !this.set(attrs, options)) return false;

      options = _.extend({validate: true}, options);

      // Do not persist invalid models.
      if (!this._validate(attrs, options)) return false;

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;

      // data
      options.data = _.extend( {}, this.action.set, model.attributes);
      options.data = _.extend( options.data, this.saveData(this.action.set));
      options.data = WebView.json.jsonToSerializeData(options.data);

      options.success = function(resp) {
        var resp,
            recvData = {},
            retult;
        if (resp === false) {
          model.trigger('sync', model, resp, options, false);
          return xhr;
        }

        resp = WebView.json.resultToJson(resp);

        for (var i in resp) {
          if (i === 'debug') continue;
          if (!model.set(model.parse(i, resp[i]), resp[i])) return false;
          recvData[i] = resp[i];
        }
        model.setDefault(recvData);

        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        delete serverAttrs.debug;
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        if (model.syncSuccess) model.syncSuccess(model, resp, options);
        model.trigger('sync', model, resp, options, true);
      };
      // wrapError
      var error = options.error;
      options.error = function(resp) {
        if (error) error(model, resp, options);
        if (model.syncFail) model.syncFail(model, resp, options);
        model.trigger('error', model, resp, options);
        model.trigger('syncFail', model, resp, options);
      };

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // sync for form data
    sync: function(method, model, options) {

      // method
      // ------
      // create - POST
      // read   - GET
      // update - PUT
      // delete - DELETE

      var ajaxSetting;

      WebView.log('[m.base.js] sync called method : ' + method);

      if (WebView.debugging === true) {
        options.data += '&debug=true';
      }
      WebView.log('data send : ' + options.data);
      ajaxSetting = {
        error : options.error,
        data : options.data,
        datatype : 'text',
        processData : true,
        success : function(data, textStatus, jqXHR) {
          WebView.log('ajax success!');
          options.success(data);
        },
        fail : function(jqXHR, textStatus, errorThrown) {
          WebView.log('ajax fail!');
          options.fail(data);
        },
        type : 'POST',
        url : this.urlRoot
      };

      // ajax call
      return WebView.ajax.ajaxCall(ajaxSetting);
    },

    fetchData: function(data) {
      // abstract method
    },

    saveData: function(data) {
      // abstract method
    },

    syncSuccess: function(resp) {
      // abstract method
    },

    syncFail: function(resp) {
      // abstract method
    }
  });

  WebView.Model = model;
});