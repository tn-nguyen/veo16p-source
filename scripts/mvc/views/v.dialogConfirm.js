define([], function() {

  'use strict';

  var view = WebView.DialogView.extend({

    dialogOpen: function() {
      var tempData, tempSpan, tempPre, textDiv, text;

      $('.imgDialogConfirm').addClass('hidden');
      $('.divDialogConfirmText').empty();

      if (this.model.get('image')) {
        $('.imgDialogConfirm').removeClass('hidden');
      }

      textDiv = $('.divDialogConfirmText');
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