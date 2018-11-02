/* 
 * v.container.js
 * ----------
 * 
 */

define(['routers/r.app'], function(Router) {

  'use strict';

  var view = WebView.View.extend({

    router:null,

    // View constructor
    init: function () {
      r.router = this.router = new Router(this, this.data.content.defaultPage);
    },

    afterModelLoad: function(model) {
      // Tells Backbone to start watching for hashchange events
      //WebView.log("v.container.js _afterModelLoad called.");
      Backbone.history.start();
    },

    changePage: function(global, local) {

      var target = global,
          tempLocal;
      local = local != undefined ? local : '';
      tempLocal = local.split('?');
      if (tempLocal.length > 1) {
        local = tempLocal[0];
      }

      v.header.renderNavigation(global);

      if (!_.has(this.page, target)) {
        // load page
        this.page[target] = 'loading';
        this.loadTemplate({
          el: 'container',
          id: target,
          changePage: {
            global: global,
            local: local
          }
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
          view.changePage(global, local);
          return true;
        }
      }
    }
  });

  return view;
});

