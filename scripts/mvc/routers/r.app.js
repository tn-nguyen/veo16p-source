/* 
 * r.app.js
 * -------------
 * 
 */

define(['backbone'], function() {
  'use strict';

  var router = Backbone.Router.extend({

    vContainer: null,
    defaultPage: null,
    // All of Backbone routes
    routes: {
      // When there is no hash on the url, the home method is called
      '' : 'routeDefaultPage',
      ':page' : 'routePage1',
      ':global/:page' : 'routePage2',
      ':global/:local/:page' : 'routePage3'
    },

    // Constructor
    initialize: function (initData, defaultPage) {
      this.vContainer = initData;
      this.defaultPage = defaultPage;
    }, 

    // routes's callback methods
    routeDefaultPage: function() {
      this.vContainer.changePage(this.defaultPage, '');
    },

    routePage1: function(page) {
      WebView.log('route: routePage -> ' + page);
      this.vContainer.changePage(page, '');
    },

    routePage2: function(global, page) {
      WebView.log('route: routePage -> ' + global + '/' + page);
      this.vContainer.changePage(global, page);
    },

    routePage3: function(global, local, page) {
      WebView.log('route: routePage -> ' + global + '/' + local + '/' + page);
      this.vContainer.changePage(global, local + page);
    }
  });

  // Returns the Workspace class
  return router;
});
