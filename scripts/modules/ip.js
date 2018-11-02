/*
 * ip.js
 * ----------
 *
 */

define([], function () {
  'use strict';

  var ip = function() {};

  ip.prototype = {
    // '1.1.1.1' -> { 1, 1, 1, 1 }
    stringToArray: function(string) {
      var array = string.split('.');

      if (typeof string != 'string') return false;
      if (!this.checkArray(array)) return false;

      return array;
    },

    // { 1, 1, 1, 1 } -> '1.1.1.1'
    arrayToString: function(array) {
      if (!this.checkArray(array)) return false;
      return array[0] + '.' + array[1] + '.' + array[2] + '.' + array[3];
    },

    // { 1, 1, 1, 1 } -> 16843009
    arrayToUint: function(array) {
      if (!this.checkArray(array)) return false;
      return ((((((+array[0])*256)+(+array[1]))*256)+(+array[2]))*256)+(+array[3]);
    },

    // 16843009 -> { 1, 1, 1, 1 }
    uintToArray: function(uint) {
      var array = new Array();

      if (isNaN(parseInt(uint))) return false;

      array[3] = uint % 256; uint = Math.floor(uint/256);
      array[2] = uint % 256; uint = Math.floor(uint/256);
      array[1] = uint % 256; uint = Math.floor(uint/256);
      array[0] = uint % 256;

      return array;
    },

    // '1.1.1.1' -> 16843009
    stringToUint: function(string) {
      return this.arrayToUint(this.stringToArray(string));
    },

    // 16843009 -> '1.1.1.1'
    uintToString: function(uint) {
      var array = this.uintToArray(uint);
      return this.arrayToString(array);
    },

    checkArray: function(array) {
      if (array.length != 4) return false;
      for (var i in array) {
        array[i] = parseInt(array[i]);
        if (isNaN(array[i])) return false;
        if (array[i] > 0xff) return false;
      }
      return true;
    }
  };

  WebView.ip = new ip();
});