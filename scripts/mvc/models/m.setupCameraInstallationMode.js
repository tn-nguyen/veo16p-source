/* 
 * m.setupCameraInstallationMode.js
 * -------------
 * 
 */

define([], function() {

  'use strict';
  
  var model = WebView.Model.extend({
    action: {
      get: {
        'action'  : 'get_setup',
        'menu'    : 'camera.installmode'
      }, 
      set : {
        'action'  : 'set_setup',
        'menu'    : 'camera.installmode'
      }
    }
  });
  
  // Returns the Model class
  return model;
});