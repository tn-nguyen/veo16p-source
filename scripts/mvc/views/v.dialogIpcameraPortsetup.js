define(['widgets/port'], function() {

  'use strict';

  var view = WebView.DialogView.extend({

    init: function() {
      //$('#dialogIpCameraIpsetupRtspPort').port();
      //$('#dialogIpCameraIpsetupWebPort').port();
    },

    events: {
      "change #dialogIpCameraIpsetupRtspPort": "portChangeHandler",
      "change #dialogIpCameraIpsetupWebPort": "portChangeHandler"
    },

    render: function(events) {
      var key, value;
      WebView.log('dial model changed!');
      WebView.log(events.changed);

      for (var i in events.changed) {
        key = i;
        value = events.changed[i];

        switch (key) {
          case 'http_port':
            $('#dialogIpCameraIpsetupRtspPort').val(value);
            break;
          case 'rtsp_port':
            $('#dialogIpCameraIpsetupWebPort').val(value);
            break;
          default:
            break;
        }
      }
    },

    portChangeHandler: function(event) {
      WebView.log(event)
      var value = $(event.currentTarget).val(),
          valueInt = parseInt(value, 10),
          validate = false,
          filter = /^[0-9]+$/;
      switch (event.currentTarget.id) {
        case 'dialogIpCameraIpsetupRtspPort':
          if (1024 < valueInt && valueInt < 65536) {
            validate = true;
          }
          if (valueInt == 554) {
            validate = true;
          }
          if (!filter.test(value)) {
            validate = false;
          }
          if (validate) {
            this.model.set('http_port', value);
          } else {
            $(event.currentTarget).val(this.model.get('http_port'));
          }
          break;
        case 'dialogIpCameraIpsetupWebPort':
          if (1024 < valueInt && valueInt < 65536) {
            validate = true;
          }
          if (valueInt == 80) {
            validate = true;
          }
          if (!filter.test(value)) {
            validate = false;
          }
          if (validate) {
            this.model.set('rtsp_port', value);
          } else {
            $(event.currentTarget).val(this.model.get('rtsp_port'));
          }
          break;
        default:
          break;
      }
    }
  });
  return view;
});