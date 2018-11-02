/* 
 * v.setupNavigation.js
 * -------------
 * 
 */

define([], function() {

  'use strict';
  
  var view = WebView.View.extend({

    // View constructor
    init: function () {
      this.renderNavigation();
    },

    render: function(events) {
      var dmva_info = this.model.get('dmvasupported');

      if(dmva_info == 0) {
        $('#lnbCameraDMVA').hide();
      }
      else 
        $('#lnbCameraDMVA').show();


      var key, value;

      for (var i in events.changed) {
        key = i;
        value = events.changed[i];
        
        switch (key) {
          case 'install_mode':
            if (value === '1') {
              $('#lnbCameraCameraInstallation').show();
            } else {
              $('#lnbCameraCameraInstallation').hide();
            }
            break;
          default:
            break;
        }
      }
    },

    renderNavigation: function() {
      var hash = window.location.hash,
          splittedHash = window.location.hash.split('/'),
          targetObject, query = '';

      $('.lnbSetup').hide();
      $('.lnbSetup.' + splittedHash[1]).show();
      // TODO: Fix. -> jquery ui
      $('.lnb .Camera').addClass('focus');
      targetObject = '#lnb' + splittedHash[1]+splittedHash[2];
      targetObject = targetObject.split('?');
      if (targetObject.length > 1) {
        query = targetObject[1];
        targetObject = targetObject[0];
      }
      $(targetObject).addClass('focus');
      $(targetObject + 'Img').addClass('focus_img');

      if (query == 'no_frame') {
        $('#header').hide();
      }
    }
  });
  
  return view;
});
