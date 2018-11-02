/*
 * json.js
 * ----------
 *
 */

define([], function () {
  'use strict';

  var json = function() {
    
  };

  json.prototype = {
    resultToJson: function(data) {
      var sn = '&',
          se = '=',
          key, tempKey, index, value,
          ret = {};

      if (data === null) return data;
      if (data.indexOf(sn) < 0 || data.indexOf(se) < 0) return data;

      data = data.split(sn);

      for (var i in data) {
        data[i] = data[i].split(se);
        if (data[i][0] !== '') {
          key = data[i][0].split('_');
          index = key[key.length-1];
          if (!isNaN(parseInt(index, 10))) {
            if (typeof ret[index] !== 'object') {
              ret[index] = {};
            }
            tempKey = decodeURIComponent(_.head(key, key.length-1).join('_'));
            ret[index][tempKey] = decodeURIComponent(data[i][1]);
          } else {
            ret[data[i][0]] = decodeURIComponent(data[i][1]);
          }
        }
      }

      return ret;
    },

    jsonToSerializeData: function(json) {
      var ret = '',
          key, value, index, subData;

      for (var i in json) {
        if (!isNaN(parseInt(i, 10))) {
          // number
          index = i;
          subData = json[index];
          for (var j in subData) {
            key = j + '_' + index;
            value = subData[j];
            ret += this.keyValueEncode(key, value);
          }
        } else {
          key = i;
          value = json[i];
          ret += this.keyValueEncode(key, value);
        }
      }

      return ret;
    },

    keyValueEncode: function(key, value) {
      return '&' + key + '=' + value;
    }
  };

  WebView.json = new json();
});