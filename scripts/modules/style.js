/*
 * style.js
 * ----------
 *
 */

define([], function () {
  'use strict';

  var style = function() {
    
  };

  style.prototype = {
    loadCss: function(url) {
      var link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = url;
      document.getElementsByTagName("head")[0].appendChild(link);
    }
  };

  WebView.style = new style();
});