define(['widgets/ip'], function() {

  'use strict';

  var view = WebView.DialogView.extend({

    init: function() {
      $('#dialogIpCameraIpsetupIpAddress').ip();
      $('#dialogIpCameraIpsetupSubnetMask').ip();
      $('#dialogIpCameraIpsetupGateway').ip();
      $('#dialogIpCameraIpsetupDnsServer1').ip();
      $('#dialogIpCameraIpsetupDnsServer2').ip();
    },

    events: {
      "change #dialogIpCameraIpsetupDhcp" : "dhcpChangeHandler",
      "change #dialogIpCameraIpsetupIpAddress": "ipChangeHandler",
      "change #dialogIpCameraIpsetupSubnetMask": "ipChangeHandler",
      "change #dialogIpCameraIpsetupGateway": "ipChangeHandler",
      "change #dialogIpCameraIpsetupDnsServer1": "ipChangeHandler",
      "change #dialogIpCameraIpsetupDnsServer2": "ipChangeHandler"
    },

    render: function(events) {
      var key, value;
      WebView.log(events.changed);

      for (var i in events.changed) {
        key = i;
        value = events.changed[i] === '' ? '0.0.0.0': events.changed[i];

        switch (key) {
          case 'is_dhcp':
            $('#dialogIpCameraIpsetupDhcp').prop('checked', parseInt(value));
            if (value === '0')
              this.enableIpset();
            else if (value === '1') {
              this.disableIpset();
              this.dhcpChangeHandler();
            }
            break;
          case 'hostname':
            $('#dialogIpCameraIpsetupIpAddress').ip('option', 'ipString', value);
            break;
            case 'maskstr':
            $('#dialogIpCameraIpsetupSubnetMask').ip('option', 'ipString', value);
            break;
          case 'gwstr':
            $('#dialogIpCameraIpsetupGateway').ip('option', 'ipString', value);
            break;
          case 'dns1str':
            $('#dialogIpCameraIpsetupDnsServer1').ip('option', 'ipString', value);
            break;
          case 'dns2str':
            $('#dialogIpCameraIpsetupDnsServer2').ip('option', 'ipString', value);
            break;
          default:
            break;
        }
      }
    },

    dhcpChangeHandler: function(event) {
      var checked = $('#dialogIpCameraIpsetupDhcp').prop('checked') ? '1' : '0';
      this.model.set('is_dhcp', checked);
    },

    ipChangeHandler: function(event) {
      WebView.log(event)
      var value = $(event.currentTarget).ip('option', 'ipString');
      switch (event.currentTarget.id) {
        case 'dialogIpCameraIpsetupIpAddress':
          this.model.set('hostname', value);
          break;
        case 'dialogIpCameraIpsetupSubnetMask':
          this.model.set('maskstr', value);
          break;
        case 'dialogIpCameraIpsetupGateway':
          this.model.set('gwstr', value);
          break;
        case 'dialogIpCameraIpsetupDnsServer1':
          this.model.set('dns1str', value);
          break;
        case 'dialogIpCameraIpsetupDnsServer2':
          this.model.set('dns2str', value);
          break;
        default:
          break;
      }
    },

    enableIpset: function() {
      $('#dialogIpcameraIpsetup div.webview_widget_ip').ip('enable');
    },

    disableIpset: function() {
      $('#dialogIpcameraIpsetup div.webview_widget_ip').ip('disable');
    }
  });
  return view;
});