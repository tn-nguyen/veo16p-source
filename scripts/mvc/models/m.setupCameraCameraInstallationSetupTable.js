define([], function() {

  'use strict';

  var model = WebView.Model.extend({
    
    action: {
      get: {
        'action'  : 'get_setup',
        'menu'    : 'camera.openmode_chlist'
      }/*, 
      set : {
        'action'  : 'get_setup',
        'menu'    : 'camera.openmode_chlist'
      }*/
    },

    checkChange: function() {
      return false;
    }

  });

  return model;
});