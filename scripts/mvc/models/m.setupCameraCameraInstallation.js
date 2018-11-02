/* 
 * m.setupCameraCameraInstallation.js
 * -------------
 * 
 */

define([], function() {

  'use strict';
  
  var model = WebView.Model.extend({
    action: {
      get: {
        'action'  : 'get_setup',
        'menu'    : 'camera.openmode'
      }, 
      set : {
        'action'  : 'set_setup',
        'menu'    : 'camera.openmode'
      }
    }
  });
  
  // Returns the Model class
  return model;
});