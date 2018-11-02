/* 
 * m.setupNavigation.js
 * -------------
 * 
 */

define([], function() {

  'use strict';
  
  var model = WebView.Model.extend({
    action: {
      get: {
        'action'  : 'get_setup',
        'menu'    : 'camera.installmode' //  TODO: Dynamic information
      }
    },
    // Model Constructor
    init: function() {
    }

  });
  
  // Returns the Model class
  return model;
});