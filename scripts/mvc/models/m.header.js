/* 
 * m.header.js
 * -------------
 * 
 */

define([], function() {

  'use strict';

  // Creates a new Backbone Model class object
  var model = WebView.Model.extend({
    action: {
      get: {
        'action' : 'get_info',
        'menu'   : 'sysid.name'
      }
    }
  });

  // Returns the Model class
  return model;
});
