define(['modules/video'], function() {

  'use strict';

  var view = WebView.DialogView.extend({

    textCameraSettingChange : w.text('Camera Configuration is changed.\nDo you want to save?'),

    events: {
      "click #dialogIpcameraConfigurationIpcameraIpsetup" : "ipsetupClickHandler",
      "click #dialogIpcameraConfigurationIpcameraPortsetup" : "portsetupClickHandler",
      "click #dialogIpcameraConfigurationIpcameraChangePassword" : "changePasswordClickHandler",
      "click #dialogIpcameraConfigurationConnectionTest" : "clickConnectionTestHandler",
      "click #dialogIpcameraConfigurationNetworkTestPingTest" : "clickPingTestHandler"
    },

    init: function() {
    },

    finalize: function() {
      if (this.model) {this.model.clear();}
      WebView.scm.unregistCallback("IRPL_OPENMODE_CHANGE_PW", this.changePasswordNotifyHandler, this);
      WebView.scm.unregistCallback("IRPL_OPENMODE_PORTSETUP", this.portsetupNotifyHandler, this);
      WebView.scm.unregistCallback("IRPL_OPENMODE_IPSETUP", this.ipsetupNotifyHandler, this);
    },
    render: function(events) {
      var key, value;

      for (var i in events.changed) {
        key = i;
        value = events.changed[i];

        switch (key) {
          case 'model':
            $('#dialogIpcameraConfigurationCameraName').val(value);
            break;
          case 'hostname':
            $('#dialogIpcameraConfigurationIpAddress').val(value);
            break;
          case 'http_port':
            $('#dialogIpcameraConfigurationHttpPort').val(value);
            break;
          case 'rtsp_port':
            $('#dialogIpcameraConfigurationRtspPort').val(value);
            break;
          case 'u':
            $('#dialogIpcameraConfigurationUserName').val(value);
            break;
          case 'p':
            $('#dialogIpcameraConfigurationPassword').val(value);
            break;
          case 'macaddr':
            $('#dialogIpcameraConfigurationMacAddress').text(' : ' + value);
            break;
          case 'firmware_version':
            $('#dialogIpcameraConfigurationFwVersion').text(' : ' + value);
            break;
          case 'state':
            WebView.log('Status: ' + value);
            switch (value) {
              case '3': //OPENMODE_CAM_STATE_DEV_INFO
                $('#dialogIpcameraConfigurationIpcameraIpsetup').attr('disabled', 'disabled');
                $('#dialogIpcameraConfigurationIpcameraPortsetup').attr('disabled', 'disabled');
                $('#dialogIpcameraConfigurationIpcameraChangePassword').attr('disabled', 'disabled');
                $('#dialogIpcameraConfigurationUserName').attr('disabled', 'disabled');
                $('#dialogIpcameraConfigurationPassword').attr('disabled', 'disabled');
                $('#dialogIpcameraConfigurationIpcameraChangePassword').val(w.text('CHANGE PASSWORD'));
                break;
              case '8': //OPENMODE_CAM_STATE_PW_CHANGE
                $('#dialogIpcameraConfigurationIpcameraIpsetup').attr('disabled', 'disabled');
                $('#dialogIpcameraConfigurationIpcameraPortsetup').attr('disabled', 'disabled');
                $('#dialogIpcameraConfigurationIpcameraChangePassword').attr('disabled', 'disabled');
                $('#dialogIpcameraConfigurationUserName').attr('disabled', 'disabled');
                $('#dialogIpcameraConfigurationPassword').attr('disabled', 'disabled');
                $('#dialogIpcameraConfigurationIpcameraChangePassword').val(w.text('CHANGE PASSWORD'));
                break;
              case '10': //OPENMODE_CAM_STATE_LOGIN_FAIL
                $('#dialogIpcameraConfigurationIpcameraIpsetup').attr('disabled', 'disabled');
                $('#dialogIpcameraConfigurationIpcameraPortsetup').attr('disabled', 'disabled');
                $('#dialogIpcameraConfigurationIpcameraChangePassword').removeAttr('disabled');
                $('#dialogIpcameraConfigurationUserName').removeAttr('disabled');
                $('#dialogIpcameraConfigurationPassword').removeAttr('disabled');
                $('#dialogIpcameraConfigurationIpcameraChangePassword').val(w.text('LOG IN'));
                break;
              default:
                $('#dialogIpcameraConfigurationIpcameraIpsetup').attr('disabled', 'disabled');
                $('#dialogIpcameraConfigurationIpcameraPortsetup').attr('disabled', 'disabled');
                $('#dialogIpcameraConfigurationIpcameraChangePassword').attr('disabled', 'disabled');
                $('#dialogIpcameraConfigurationUserName').attr('disabled', 'disabled');
                $('#dialogIpcameraConfigurationPassword').attr('disabled', 'disabled');
                break;
            }
            break;
          default:
            break;
        }
      }

    },

    ipsetupClickHandler: function() {
      var my = this,
          data = {
            is_dhcp : this.model.get('is_dhcp'),
            hostname : this.model.get('hostname'),
            maskstr : this.model.get('maskstr'),
            gwstr : this.model.get('gwstr'),
            dns1str : this.model.get('dns1str'),
            dns2str : this.model.get('dns2str')
          };
      v.dialogIpcameraIpsetup.open({
        data : data,
        caller : this,
        dialogOk: my.ipsetupReturnHandler
      });
    },

    ipsetupReturnHandler: function(ret) {
      var changed = false,
          text = new Array(),
          my = v.dialogIpcameraConfiguration;

      WebView.log(ret);
      for (var i in ret) {
        if (ret[i] !== my.model.get(i)) {
          changed = true;
        }
        my.model.set(i, ret[i]);
      }

      if (changed) {
          v.dialogConfirm.open({
          data: {text: [my.textCameraSettingChange]},
          caller: my,
          dialogOk: my.ipsetupReturnOkHandler,
          dialogCancel: my.confirmReturnCancelHandler
        });
      }
    },

    ipsetupReturnOkHandler: function(ret) {
      var api,
          my = v.dialogIpcameraConfiguration;
      WebView.scm.registCallback("IRPL_OPENMODE_IPSETUP", my.ipsetupNotifyHandler, my);
      WebView.ajax.apiCall({
        action: 'set_setup',
        menu: 'camera.openmode_request_ip_assign',
        data: {
          index: my.model.get('index'),
          is_dhcp: my.model.get('is_dhcp'),
          ipaddr: my.model.get('hostname'),
          mask: my.model.get('maskstr'),
          gw: my.model.get('gwstr'),
          dns1: my.model.get('dns1str'),
          dns2: my.model.get('dns2str')
        }
      });
      v.dialogNotice.open({
        data: {text: [w.text('Please wait...')]},
        caller: this
      });
    },

    ipsetupNotifyHandler: function(ret) {
      var my = v.dialogIpcameraConfiguration;
      WebView.scm.unregistCallback("IRPL_OPENMODE_IPSETUP", my.ipsetupNotifyHandler, my);
      WebView.log('ipsetupNotifyHandler');
      WebView.log(ret);
      v.dialogNotice.close();
      my.openDialogNotice(ret.param);
    },

    portsetupClickHandler: function() {
      var my = this,
          data = {
            http_port : this.model.get('http_port'),
            rtsp_port : this.model.get('rtsp_port')
          };
      v.dialogIpcameraPortsetup.open({
        data : data,
        caller : this,
        dialogOk: my.portsetupReturnHandler
      });
    },

    portsetupReturnHandler: function(ret) {
      var changed = false,
          text = new Array(),
          my = v.dialogIpcameraConfiguration;

      for (var i in ret) {
        if (ret[i] !== my.model.get(i)) {
          changed = true;
        }
        my.model.set(i, ret[i]);
      }

      if (changed) {
          v.dialogConfirm.open({
          data: {text: [my.textCameraSettingChange]},
          caller: my,
          dialogOk: my.portsetupReturnOkHandler,
          dialogCancel: my.confirmReturnCancelHandler
        });
      }
    },

    portsetupReturnOkHandler: function(ret) {
      var api,
          my = v.dialogIpcameraConfiguration;
      WebView.scm.registCallback("IRPL_OPENMODE_PORTSETUP", my.portsetupNotifyHandler, my);
      WebView.ajax.apiCall({
        action: 'set_setup',
        menu: 'camera.openmode_request_port_assign',
        data: {
          index: my.model.get('index'),
          http_port: my.model.get('http_port'),
          rtsp_port: my.model.get('rtsp_port')
        }
      });
      v.dialogNotice.open({
        data: {text: [w.text('Please wait...')]},
        caller: this
      });
    },

    portsetupNotifyHandler: function(ret) {
      var my = v.dialogIpcameraConfiguration;
      WebView.scm.unregistCallback("IRPL_OPENMODE_PORTSETUP", my.portsetupNotifyHandler, my);
      WebView.log('portsetupNotifyHandler');
      WebView.log(ret);
      v.dialogNotice.close();
      my.openDialogNotice(ret.param);
    },

    changePasswordClickHandler: function() {
      var my = this;

      if (my.model.get('state') == '10') {
        v.dialogNotice.open({
          data: {text: [w.text('Please wait...')]},
          caller: this
        });
        WebView.ajax.apiCall({
          action: 'set_setup',
          menu: 'camera.openmode_set_login_info',
          data: {
            index: my.model.get('index'),
            u: $('#dialogIpcameraConfigurationUserName').val(),
            p: $('#dialogIpcameraConfigurationPassword').val(),
            debug: true
          },
          callback: my.clickLoginButtonReturnHandler
        });
      } else {
        v.dialogIpcameraChangePassword.open({
          data: {u : this.model.get('u')},
          //p : this.model.get('p'),
          caller : this,
          dialogOk: my.changePasswordReturnHandler
        });
      }
    },

    clickLoginButtonReturnHandler: function(ret) {
      // ret == 0 : true
      // ret == 1  : false.
      var my = v.dialogIpcameraConfiguration,
          text = [];

      v.dialogNotice.close();
      switch (ret.result) {
        case '0': // ITX Cam OK
          text.push(w.text('SUCCESS'));
          my.model.set('u', $('#dialogIpcameraConfigurationUserName').val());
          my.model.set('p', $('#dialogIpcameraConfigurationPassword').val());
          my.model.set('state', '3');
          break;
        case '1': // Onvif Cam OK
          text.push(w.text('SUCCESS'));
          my.model.set('u', $('#dialogIpcameraConfigurationUserName').val());
          my.model.set('p', $('#dialogIpcameraConfigurationPassword').val());
          my.model.set('state', '4');
          break;
        case '2': // login Fail
        default:
          text.push(w.text('LOGIN FAIL'));
          $('#dialogIpcameraConfigurationUserName').val('');
          $('#dialogIpcameraConfigurationPassword').val('');
          break;
      }

      v.dialogNotice.open({
        data: {text: text},
        caller: this,
        autoClose: true
      });
    },

    changePasswordReturnHandler: function(ret) {
      WebView.log('return!');
      var changed = false,
          text = new Array(),
          my = v.dialogIpcameraConfiguration;

      WebView.log(ret);
      for (var i in ret) {
        if (ret[i] !== my.model.get(i)) {
          changed = true;
        }
        my.model.set(i, ret[i]);
      }
      if (changed) {
        v.dialogConfirm.open({
          data: {text: [my.textCameraSettingChange]},
          caller: my,
          dialogOk: my.changePasswordReturnOkHandler,
          dialogCancel: my.confirmReturnCancelHandler
        });
      } else {
        v.dialogNotice.open({
          data: {text: [w.text('The password has not been changed.')]},
          caller: this,
          autoClose: true
        });
      }
    },

    changePasswordReturnOkHandler: function(ret) {
      WebView.log('changePasswordReturnOkHandler!');

      //openmode_request_ip_assign
      var api,
          my = v.dialogIpcameraConfiguration;
      WebView.scm.registCallback("IRPL_OPENMODE_CHANGE_PW", my.changePasswordNotifyHandler, my);
      WebView.ajax.apiCall({
        action: 'set_setup',
        menu: 'camera.openmode_change_password',
        data: {
          index: my.model.get('index'),
          p : my.model.get('p')
        }
      });
      v.dialogNotice.open({
        data: {text: [w.text('Please wait...')]},
        caller: this
      });
    },

    changePasswordNotifyHandler: function(ret) {
      var my = v.dialogIpcameraConfiguration,
          model = m.dialogIpcameraConfiguration;
      WebView.scm.unregistCallback("IRPL_OPENMODE_CHANGE_PW", my.changePasswordNotifyHandler, my);
      WebView.log('changePasswordNotifyHandler');
      WebView.log(ret);
      v.dialogNotice.close();
      my.openDialogNotice(ret.param);

      if (ret.param == '0') {
        my.model.set('state', '3');
      } else {
        model.revert();
      }
    },

    confirmReturnCancelHandler: function(ret) {
      WebView.log('ipsetupReturnCloseHandler!');
      var model = m.dialogIpcameraConfiguration;

      model.revert();
    },

    clickConnectionTestHandler: function(event) {
      // blocl preview
      return;
      w.video.jpeg.stop();
      WebView.ajax.apiCall({
        action: 'set_setup',
        menu: 'camera.openmode_set_preview',
        data: {
          index: this.model.get('index')
        }
      });
      w.video.jpeg.setChannel('0');
      w.video.jpeg.setCallback(this.updatePreview);
      w.video.jpeg.start(1000);
    },

    clickPingTestHandler: function(event) {
      var my = v.dialogIpcameraConfiguration,
          model = m.dialogIpcameraConfiguration;

      WebView.log('clickPingTestHandler');
      v.dialogNotice.open({
        data: {text: [w.text('Please wait...')]},
        caller: this
      });
      WebView.ajax.apiCall({
        action: 'get_setup',
        menu: 'camera.openmode_ping_test',
        data: {
          host: this.model.get('hostname')
        },
        callback: my.clickPingTestReturnHandler
      });
    },

    clickPingTestReturnHandler: function(resp) {
      WebView.log('clickPingTestReturnHandler');
      WebView.log(resp);
      v.dialogNotice.close();
      v.dialogNotice.open({
        okButton: true,
        data: {text: resp},
        caller: this
      });
    },

    updatePreview: function(url) {
      $("#dialogIpcameraConfigurationPreview").attr("src", url);
    },

    openDialogNotice: function(type) {
      // type 0 : success
      // type 1 : fail
      if (type == '0') {
        v.dialogNotice.open({
          data: {text: [w.text('SUCCESS')]},
          caller: this,
          autoClose: true
        });
      } else if (type == '1') {
        v.dialogNotice.open({
          data: {text: [w.text('FAIL')]},
          caller: this,
          autoClose: true
        });
      }
    },

    dialogInfo: function(defaultInfo) {
      var info = defaultInfo,
          my = this;

      info.buttons = [{
        text: w.text('CLOSE'),
        click: function() {
          if ($.isFunction(my._dialogOk)) {
            my._dialogOk();
          }
        }
      }];
      return info;
    },

    dialogOpen: function() {
      var api;
      WebView.log('config. open.');
      $("#dialogIpcameraConfigurationPreview").attr("src", "../images/vloss.jpg");
      // TODO : unload event에 등록할 것.
      // nf_openmode_stop_streaming call.
      WebView.ajax.apiCall({
        action: 'set_setup',
        menu: 'camera.openmode_stop_streaming',
        callback: this.stopStreamingReturnHandler
      });
    },

    stopStreamingReturnHandler: function(ret) {
      var my = v.dialogIpcameraConfiguration,
          api ;
      if (ret) {
        // nf_openmode_set_preview call.
        // block preview.
        return;
        WebView.ajax.apiCall({
          action: 'set_setup',
          menu: 'camera.openmode_set_preview',
          data: {
            index: my.model.get('index')
          }
        });
        w.video.jpeg.setChannel('0');
        w.video.jpeg.setCallback(my.updatePreview);
        w.video.jpeg.start(1000);
      } else {
       my.$el.dialog('close');
      }
    },

    dialogClose: function() {
      WebView.log('config. close.');
      w.video.jpeg.stop();
    }
  });
  return view;
});