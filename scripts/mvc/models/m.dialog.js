/* 
 * m.dialog.js
 * -------------
 * 
 */

define(['models/m.base'], function() {

  'use strict';

  var model = WebView.Model.extend({
    init: function() {
      // abstract method
    }
  });

  WebView.DialogModel = model;
});