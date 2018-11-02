/* 
 * v.base.js
 * -------------
 * 
 */

define(['jquery',
        'backbone',
        'i18n!nls/languageData'],
        function($, Backbone) {

  'use strict';

  var view = Backbone.View.extend({

    // The DOM Element associated with this view
    model: null,
    data: null,
    parent: null,
    renderd: false,
    page: {},
    childView: {},

    // View event handlers
    events: {
    },

    // View constructor
    initialize: function (initData) {
      var my = this;

      this.setElement('#' + initData.el);
      this.data = initData;
      this.parent = initData.caller;

      try{
        require(['models/m.' + initData.id], function(Model) {
            m[my.data.id] = my.model = new Model();
            my._afterModelLoad(my.model);
          }
        );
      } catch (e) {

      }
      // Calls the view's render method
      this.renderTemplate();

      if (initData.afterLoad) {
        initData.afterLoad.call(undefined, this);
      }
    },

    _finalize: function() {
      this.renderd = false;
      for (var i in this.childView) {
        if ($.isFunction(this.childView[i]._finalize)) {
          this.childView[i]._finalize();
        }
      }
      if ($.isFunction(this.finalize)) {
        this.finalize();
      }
      
    },

    renderTemplate: function () {
      if (this.parent) {
        this.parent.addChild(this);
      }

      if (this.renderd) {
        this._finalize();
      }

      this.childView = {};
      this.setElement('#' + this.data.el);
      // Dynamically updates the UI with the view's template
      if (this.$el) {
        //WebView.log('appending template -> ' + this.id);
        this.$el.empty();
        this.$el.append(this.data.template);
      }

      for (var i in this.data.content.loadTemplate) {
        this.loadTemplate({
          el: i,
          id: this.data.content.loadTemplate[i]
        });
      }

      this.renderd = true;

      if ($.isFunction(this.init)) {
        this.init();
      }

      if (this.model) {
        this.model.loadData();
      }

      return this;
    },

    _afterModelLoad: function(model) {
      if (this.parent) {
        this.parent.page[this.data.id] = this;
      }
      this.model.on('change', this.render, this);
      this.model.on('sync', this.afterSync, this);
      if ($.isFunction(this.afterModelLoad)) {
        this.afterModelLoad(model);
      }
      this.model.loadData();
    },

    loadTemplate: function(data) {
      if (data) {
        if (data.id) {
          data.caller = this;
          WebView.template.load(data);
        }
      }
    },

    _submitEventHandler: function() {
      for (var i in this.childView) {
        var view = this.childView[i];
        if ($.isFunction(view._submitEventHandler)) {
          view._submitEventHandler('');
        }
        if ($.isFunction(view.submitEventHandler)) {
          if (view.model.checkChange()) {
            view.submitEventHandler();
          }
        }
      }
    },

    _resetEventHandler: function() {
      var ret = false;

      WebView.log('reset event');
      for (var i in this.childView) {
        var view = this.childView[i];
        if ($.isFunction(view._resetEventHandler)) {
          view._resetEventHandler('');
        }
        if ($.isFunction(view.resetEventHandler)) {
          view.resetEventHandler();
        }
      }
    },

    _unloadEventHandler: function() {
      var ret = false;
      WebView.log('unload event');
      for (var i in this.childView) {
        var view = this.childView[i];
        if ($.isFunction(view._unloadEventHandler)) {
          ret |= view._unloadEventHandler();
        }
        if ($.isFunction(view.unloadEventHandler)) {
          ret |= view.unloadEventHandler();
        }
      }

      return ret;
    },

    afterSync: function( model, resp, options, syncResult) {
      WebView.log('afterSync result = ' + syncResult);
      for (var i in resp) {
        this.render( model, resp[i], options );
      }
      
      if (syncResult == true) {
        this.syncSuccess(model, resp, options);
      } else if (syncResult == false) {
        this.syncFail(model, resp, options);
      }
    },

    addChild: function(child) {
      this.childView[child.id] = child;
    },

    clearChild: function() {
      this.childView = {};
    },

    changePage: function() {
      // abstract method
    },

    submitEventHandler: function() {
      // abstract method
    },

    resetEventHandler: function() {
      // abstract method
      if (view.model) {
        if ($.isFunction(view.model.revert)) {
          view.model.revert();
        }
      }
    },

    init: function() {
      // abstract method
    },

    finalize: function() {
      // abstract method
    },

    syncSuccess: function(resp) {
      // abstract method
      WebView.log('syncSuccess!!!!!!');
    },

    syncFail: function(resp) {
      // abstract method
      WebView.log('syncFail!!!!!!');
    }
  });

  WebView.View = view;
});
