/*
 * v.setup.js
 * -------------
 *
 */

define([], function() {

  'use strict';

  var view = WebView.View.extend({

    afterModelLoad: function(model) {
      this.changePage(this.data.changePage.global, this.data.changePage.local);
    },

    init: function() {
      var my = this;
      $('#mainForm').bind('submit', my.submitEventFunction);
      $('#mainForm').bind('reset', my.resetEventFunction);
      $(window).bind('beforeunload', my.beforeunloadEventFunction);
    },

    finalize: function() {
      var my = this;
      WebView.log('finalize!!!!!!!!!!!!!!!!!!!!!!!!!!');
      $('#mainForm').unbind('submit', my.submitEventFunction);
      $('#mainForm').unbind('reset', my.resetEventFunction);
      $(window).unbind('beforeunload', my.beforeunloadEventFunction);
    },

    submitEventFunction: function(event) {
      var my = v.setup;
      event.preventDefault();
      // before send
      WebView.log('submit event occured');
      my._submitEventHandler();
    },

    resetEventFunction: function(event) {
      var my = v.setup;
      event.preventDefault();
      // before send
      WebView.log('reset event occured');
      my._resetEventHandler();
    },

    beforeunloadEventFunction: function(event) {
      var changed = false,
          my = v.setup;
      changed = my._unloadEventHandler();
      if (changed)
        return langArray['LTXT_UNSAVED_CHECK'];
      else
        return;
    },

    changePage: function(global, local) {

      var target = global + local,
          tempLocal;

      if (local == '') {
        r.router.navigate(this.data.content.defaultPage, {trigger: true, replace: true});
        return false;
      }

      tempLocal = local.split('?');
      if (tempLocal.length > 1) {
        local = tempLocal[0];
      }

      if (v.setupNavigation) {
        v.setupNavigation.renderNavigation();
      }

      if (!_.has(this.page, target)) {
        // load page
        this.page[target] = 'loading';
        this.loadTemplate({
          el: 'setuppage',
          id: target
        });
      } else {
        // loaded page render
        var view = this.page[target];

        if (view == 'loading') {
          var my = this;
          setTimeout( function() {my.changePage(global, local)}, 100);
          return false;
        } else {
          view.renderTemplate();
          return true;
        }
      }
    }
  });

  return view;
});

