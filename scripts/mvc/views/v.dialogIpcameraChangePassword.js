define([], function() {

  'use strict';

  var view = WebView.DialogView.extend({

    init: function() {
      $('#dialogIpCameraChangePasswordId').attr('disabled', 'disabled');
      $('#dialogIpCameraChangePasswordNew').val(''),
      $('#dialogIpCameraChangePasswordConfirm').val('');
    },

    events: {
      "change #dialogIpCameraChangePasswordNew": "changePasswordNewText",
      "click #dialogIpCameraChangePasswordApply": "adminPassApplyClickHandler"
    },

    render: function(events) {
      var key, value;
      WebView.log('chan pass model changed!');
      WebView.log(events.changed);

      for (var i in events.changed) {
        key = i;
        value = events.changed[i];

        switch (key) {
          case 'u':
            $('#dialogIpCameraChangePasswordId').val(value);
            break;
          // case 'p':
          //   $('#dialogIpCameraChangePasswordNew').val(value);
            break;
          default:
            break;
        }
      }
    },

    changePasswordNewText: function(event) {
      WebView.log(event);
      this.model.set('p', $('#dialogIpCameraChangePasswordNew').val());
    },

    adminPassApplyClickHandler: function(event) {
      WebView.log(event);
      WebView.ajax.apiCall({
        action: 'get_setup',
        menu: 'usr.admin_password',
        callback: this.adminPassApplyReturnHandler
      });
    },

    adminPassApplyReturnHandler: function(ret) {
      var my = v.dialogIpcameraChangePassword;
      if (!ret) return;
      my.model.set('p', ret.p);
      $('#dialogIpCameraChangePasswordNew').val(ret.p);
      $('#dialogIpCameraChangePasswordConfirm').val(ret.p);
      my._dialogOk();
    },

    dialogOk: function() {
      var p = $('#dialogIpCameraChangePasswordNew').val(),
          cp = $('#dialogIpCameraChangePasswordConfirm').val();
      if (p == '') {
        v.dialogNotice.open({
          data: {text: [w.text('Please input a password.')]},
          caller: this,
          autoClose: true
        });
        return false;
      }

      if (cp == '') {
        v.dialogNotice.open({
          data: {text: [w.text('Please input a confirm password.')]},
          caller: this,
          autoClose: true
        });
        return false;
      }

      if (p != cp) {
        v.dialogNotice.open({
          data: {text: [w.text('invalid confirm password')]},
          caller: this,
          autoClose: true
        });
        return false;
      }

      return true;
    },

    dialogOpen: function() {
      $('#dialogIpCameraChangePasswordNew').val(''),
      $('#dialogIpCameraChangePasswordConfirm').val('');
    }
  });
  return view;
});