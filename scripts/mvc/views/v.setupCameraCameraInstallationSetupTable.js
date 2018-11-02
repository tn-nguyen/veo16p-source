define([], function() {

  'use strict';

  var view = WebView.View.extend({

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // View Variables
    warningMsg1 : w.text("Warning : In this mode, the video recording will be stopped automatically."),
    warningMsg2 : w.text("Do you want to continue?"),
    /////////////////////////////////////////////////////////////////////////////////////////////////
    // View override
    init: function() {
      if (this.parent.currentPage != 'setup') return;
      this.setTableChannel();
      this.clearTable();
      if (this.model) {this.model.fetch();}
      if (this.parent) {this.parent.clearData();}
      WebView.scm.registCallback("INFY_IPCAM_INSTALL_NOTIFY", this.scmIpcamInstallNotifyCallback, this);
    },

    finalize: function() {
      if (this.model) {this.model.clear();}
      this.parent.clearData();
      WebView.scm.unregistCallback("INFY_IPCAM_INSTALL_NOTIFY", this.scmIpcamInstallNotifyCallback, this);
    },

    events: {
      "click .tdCameraCameraInstallationSetupSetup" : "setupClickHandler"
    },

    render: function(events) {
      var key, value;
      for (var i in events.changed) {
        key = i;
        value = events.changed[i];
        if (typeof value == 'undefined') continue;

        if (!isNaN(parseInt(key, 10))) {
          if (value.state != '0') {
            this.updateTableRow(value);
            this.parent.updateDataFromSetupTable(value);
          }
        }
      }
    },

    syncSuccess: function(events) {
      WebView.log('syncsuccess');
      WebView.log('events');
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // View event handler
    setupClickHandler: function(event) {
      var my = this,
          ch = event.target.id.split('_')[1],
          data = {
            text: [my.warningMsg1,my.warningMsg2],
            ch: ch
          };
      v.dialogWarning.open({
        data: data,
        caller: this,
        dialogOk: this.setupReturnHandler
      });
    },

    setupReturnHandler: function(ret) {
      var my = v.setupCameraCameraInstallationSetupTable,
          index = my.findIndexByCh(ret.ch),
          indexData;

      WebView.log(ret.ch);
      WebView.log(index);
      indexData = _.extend({}, {data: my.model.get(index)}, {
        caller: my,
        mode: 'setup',
        dialogOk: my.ipcameraConfigurationReturnHandler
      });

      v.dialogIpcameraConfiguration.open(indexData);
    },

    ipcameraConfigurationReturnHandler: function(ret) {
      var my = v.setupCameraCameraInstallationSetupTable;
      WebView.log(ret);
      my.model.set(ret.index, ret);
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // SCM Notify callback
    // INFY_IPCAM_INSTALL_NOTIFY
    scmIpcamInstallNotifyCallback: function(notify) {
      var my = v.setupCameraCameraInstallationSetupTable;
      WebView.ajax.apiCall({
        action: 'get_setup',
        menu: 'camera.openmode_chlist',
        callback: my.getListReturnHandler
      });
    },

    getListReturnHandler: function(resp) {
      var my = v.setupCameraCameraInstallationSetupTable;
      WebView.log(resp);

      my.clearTable();
      if (my.model) {my.model.clear();}
      for (var i in resp) {
        my.model.set(i, resp[i]);
      }
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // General Methods
    findIndexByCh: function(ch) {
      var ret = null, currentData,
          list = this.model.attributes;

      for (var i in list) {
        if (!isNaN( parseInt(i, 10))) {
          if (list[i].ch === ch) { 
            ret = i;
            break;
          }
        }
      }

      return ret;
    },

    setTableChannel: function() {
      switch (w.INFO.Channel) {
        case '4':
          $('.channelGroup8').hide();
          $('.channelGroup16').hide();
          break;
        case '8':
          $('.channelGroup16').hide();
          break;
        case '16':
          break;
        default:
          break;
      }
    },

    clearTable: function() {
      for (var i = 0 ; i < w.INFO.Channel ; i += 1) {
        $('#tdCameraCameraInstallationSetupModel_' + i).text('-');
        $('#tdCameraCameraInstallationSetupAddress_' + i).text('-');
        $('#tdCameraCameraInstallationSetupStatus_' + i).text('-');
        $('#tdCameraCameraInstallationSetupSetup_' + i).attr('disabled', 'disabled');
      }
    },

    updateTableRow: function(data) {
      var ch = data.ch;

      $('#tdCameraCameraInstallationSetupModel_' + ch).text(data.model);
      $('#tdCameraCameraInstallationSetupAddress_' + ch).text(data.hostname);
      $('#tdCameraCameraInstallationSetupStatus_' + ch).text(this.getStatusString(data.state));

      $('#tdCameraCameraInstallationSetupSetup_' + ch).removeClass('needSetup');
      switch (this.isPossibleSetup(data.state)) {
        case 'disabled':
          $('#tdCameraCameraInstallationSetupSetup_' + ch).attr('disabled', 'disabled');
          break;
        case 'needSetup':
          $('#tdCameraCameraInstallationSetupSetup_' + ch).addClass('needSetup');
        case 'enabled':
          $('#tdCameraCameraInstallationSetupSetup_' + ch).removeAttr('disabled');
          break;
        default:
          break;
      }
      
      return true;
    },

    isPossibleSetup: function(status) {
      var ret = 'disabled';
      status = parseInt(status, 10);

      switch (status) {
        case 3:
        case 4:
          ret = 'enabled';
          break;
        case 1:
        case 7:
        case 8:
        case 9:
        case 10:
          ret = 'needSetup';
          break;
        default:
          ret = 'disabled';
          break;
      }
      return ret;
    },

    getStatusString: function(status) {
      var ret = null;
      status = parseInt(status, 10);

      switch (status) {
        case 0: //OPENMODE_CAM_STATE_INIT
          ret = '';
          break;
        case 1: //OPENMODE_CAM_STATE_DISCOVERED
          ret = w.text('CONNECTING');
          break;
        case 2: //OPENMODE_CAM_STATE_REQ_IP
          ret = '';
          break;
        case 3: //OPENMODE_CAM_STATE_DEV_INFO
        case 4: //OPENMODE_CAM_STATE_DEV_INFO_ONVIF
          ret = w.text('OK');
          break;
        case 5: //OPENMODE_CAM_STATE_ASSIGN_CH
          ret = w.text('ASSIGNED CHANNEL');
          break;
        case 6: //OPENMODE_CAM_STATE_OK
          ret = w.text('OK');
          break;
        case 7: //OPENMODE_CAM_STATE_INVALID_IP
          ret = w.text('INVALID IP');
          break;
        case 8: //OPENMODE_CAM_STATE_PW_CHANGE
          ret = w.text('NEED TO CHANGE PASSWORD');
          break;
        case 9: //OPENMODE_CAM_STATE_CONN_FAIL
          ret = w.text('CONNECTION FAIL');
          break;
        case 10: //OPENMODE_CAM_STATE_LOGIN_FAIL
          ret = w.text('LOGIN FAIL');
          break;
        case 11: //OPENMODE_CAM_STATE_STREAM_FAIL
          ret = w.text('STREAM FAIL');
          break;
        default:
          break;
      }
      return ret;
    }
  });
  return view;
});