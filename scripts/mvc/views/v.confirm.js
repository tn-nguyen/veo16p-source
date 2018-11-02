/* 
 * v.confirm.js
 * -------------
 * 
 */

define([], function() {

  'use strict';
  
  var view = WebView.View.extend({

    // textid : callback function
    changeButton: function(data) {
      var tempButton, buttonText;
      $('.confirm li .default').hide();
      $('.confirm li .custom').empty();

      for (var i in data) {
        buttonText = typeof w.text(i) === 'undefined' ? i : w.text(i);
        tempButton = $('<button type="button" id="confirm' + i + '">').html(buttonText);
        if ($.isFunction(data[i])) {
          tempButton.click(data[i]);
        } else {
          WebView.log('confirm : ' + i + '`s value is not function.');
        }

        $('.confirm li .custom').append(tempButton);
      }
      return;
    },

    revertDefault: function() {
      $('.confirm li .default').show();
      $('.confirm li .custom').empty();
    }
  });
  
  return view;
});

