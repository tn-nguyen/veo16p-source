/*
 * v.header.js
 * -------------
 *
 */

define([], function () {

  'use strict';

  var view = WebView.View.extend({
    render: function(events) {
      var mode = this.model.get('sysname');


      // for IE8. IE8 is not supported to change title in jquery. 
      // IE8 is supported to document only.
      document.title = mode + " - " + w.text('WEB Remote Viewer');

    },
    renderNavigation: function(global) {
      $('.globalNavigationMenu').removeClass('on');
      $('.globalNavigationMenu.' + global).addClass('on');
    },

    init: function() {
      var agt=navigator.userAgent.toLowerCase();
      if (agt.indexOf("trident") != -1) {

      } else {
        $('#gnbSearch').hide();
      }
    }
  });

  return view;
});

