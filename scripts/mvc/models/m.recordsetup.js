/* 
 * m.recordsetup.js
 * -------------
 * 
 */

define([], function() {

  'use strict';
  
  var model = WebView.Model.extend({

    // Model Constructor
    _initialize: function() {
      WebView.log("m.recordsetup.js initializing.");
    }

  });
  
  // Returns the Model class
  return model;
});