/* 
 * v.live.js
 * -------------
 * 
 */

define([], function() {

  'use strict';
  
  var view = WebView.View.extend({
    init: function(){
      window.location.pathname = '/html/live.htm';
    }
  });
  
  return view;
});

