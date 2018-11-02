define([], function() {

  'use strict';

  var view = WebView.DialogView.extend({

    // override v.dialog.js 's open method
    dialogOpen: function() {
      var tempData, tempSpan, tempPre, textDiv, text;

      $('.imgDialogWarning').addClass('hidden');
      $('.divDialogWarningText').empty();

      if (this.model.get('image')) {
        $('.imgDialogWarning').removeClass('hidden');
      }

      textDiv = $('.divDialogWarningText');
      text = this.model.get('text');
      for (var i in text) {

        tempSpan = $('<span>').text(text[i]);
        tempPre = $('<pre>').append(tempSpan);
        textDiv.append(tempPre);
      }
    }
  });
  return view;
});