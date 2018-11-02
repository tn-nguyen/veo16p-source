/* 
 * jpeg.js
 * -------------
 */

define([],
       function() {
  // Template load
  'use strict';

  var activex = function() {
    if( this == window ) {
      return new activex();
    }

    if( this.init ) {
      return this;
    }
  };

  activex.prototype = {

  }

  return activex;
});
