define([], function() {

  'use strict';

  var view = WebView.DialogView.extend({

    defaultTime: 3, // sec

    init: function() {
      var my = this;
    },

    events: {
    },

    render: function(events) {
      var key, value, my = this;

      for (var i in events.changed) {
        key = i;
        value = events.changed[i];

        switch (key) {
          case 'remain':
            value = parseInt(value, 10);
            if (value > 0) {
              setTimeout(function(){my.model.set('remain', value - 1)}, 1000);
            } else {
              this.restartDone();
            }
            break;
          default:
            break;
        }
      }
    },

    dialogInfo: function(defaultInfo) {
      var info = defaultInfo;
      return info;
    },

    restartDone: function() {
      this.close();
    },

    dialogOpen: function() {
      var tempData, tempSpan, tempPre, textDiv, text, autoClose, tempButton;

      autoClose = this.dialogOptions.autoClose;
      if (autoClose) {
        if (autoClose === true) {
          this.model.set('remain', this.defaultTime);
        } else if (parseInt(autoClose, 10)  > 0) {
          this.model.set('remain', parseInt(autoClose, 10));
        }
      }
      
      $('.imgDialogNotice').addClass('hidden');
      $('.divDialogNoticeText').empty();

      if (this.model.get('image')) {
        $('.imgDialogNotice').removeClass('hidden');
      }

      textDiv = $('.divDialogNoticeText');
      text = this.model.get('text');
      for (var i in text) {
        tempSpan = $('<span>').text(text[i]);
        tempPre = $('<pre>').append(tempSpan);
        textDiv.append(tempPre);
      }

      $('#dialogNotice').parent().find('.ui-dialog-buttonpane').show();
      $('#dialogNotice').parent().find('#cancel').show();
      if (this.dialogOptions.okButton) {
        $('#dialogNotice').parent().find('#cancel').hide();
      } else {
        $('#dialogNotice').parent().find('.ui-dialog-buttonpane').hide();
      }
    }
  });
  return view;
});