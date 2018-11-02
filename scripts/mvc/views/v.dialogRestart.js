define([], function() {

  'use strict';

  var view = WebView.DialogView.extend({

    restartTime: 150, // sec
    interval: null,

    init: function() {
      $('#dialogRestartProgressBar').progressbar({
        min: 0,
        max: this.restartTime,
        value: 0
      });

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
            $('#dialogRestartProgressMsg').text('Remain : ' + value);
            $('#dialogRestartProgressBar').progressbar('option', 'value', this.restartTime - value);
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
      delete info.buttons;
      return info;
    },

    restartDone: function() {
      this.close();
      window.location.reload();
    },

    dialogOpen: function(data) {
      this.model.set('remain', this.restartTime);
    }
  });
  return view;
});