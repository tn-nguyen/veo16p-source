/* 
 * v.setupCameraCameraInstallation.js
 * -------------
 * 
 */

define(['modules/ip'], function() {

  'use strict';
  
  var view = WebView.View.extend({

    unloadFlag: false,

    warningMsg1 : w.text("Warning : In this mode, the video recording will be stopped automatically."),
    warningMsg2 : w.text("Do you want to continue?"),
    currentPage : 'setup',

    init: function() {
      WebView.scm.start();
    },

    finalize: function() {
      WebView.scm.stop();

      WebView.ajax.apiCallSync({
        action: 'set_setup',
        menu: 'camera.openmode_cancel'
      });

      WebView.ajax.apiCallSync({
        action: 'set_setup',
        menu: 'camera.openmode_finalize_installation'
      });
      this.currentPage = 'setup';
    },

    events: {
      'click #buttonCameraInstallationAddNewCamera' : 'addNewCameraButtonHandler',
      'click #selectInstallationModeRedirectNetworkSetup': 'redirectNetworkSetupHandler',
      'click #buttonCameraInstallationCloseSearch' : 'closeSearchButtonHandler'
    },

    unloadEventHandler: function() {
      this.unloadFlag = true;
      this.finalize();
    },

    updateDataFromSetupTable: function(data) {
      WebView.log('installation data update');
      var ch, value, tempMac;

      ch = parseInt(data.ch, 10);
      if (!isNaN(ch)) {
        tempMac = data.macaddr;

        for (var i = 0 ; i < 5 ; i += 1) {
          tempMac = tempMac.replace(':', '');
        }
        
        this.model.set(ch, {
          id: data.u,
          pwd: data.p,
          hostname: data.hostname,
          //mac: tempMac == '' ? '000000000000': tempMac,
          //ipaddr: w.ip.uintToString(data.ipaddr).toString(),
          //gateway: data.gwstr == '' ? '0.0.0.0': data.gwstr,
          //subnet: data.maskstr == '' ? '0.0.0.0': data.gwstr,
          //dns1: data.dns1str == '' ? '0.0.0.0': data.gwstr,
          //dns2: data.dns2str == '' ? '0.0.0.0': data.gwstr,
          http_port: data.http_port//,
          //rtsp_port: data.rtsp_port
        });
      }
    },

    clearData: function() {
      if (!this.model) return;

      for (var i = 0 ; i < w.INFO.Channel; i += 1) {
        this.model.set(i, {
          id: '',
          pwd: '',
          hostname: '',
          //mac: '',
          //ipaddr: '0.0.0.0',
          //gateway: '0,0,0,0',
          //subnet: '0.0.0.0',
          //dns1: '0.0.0.0',
          //dns2: '0.0.0.0',
          http_port: '0'//,
          //rtsp_port: '0'
        });
      }
    },

    showSetupPage: function() {
      this.currentPage = 'setup';
      $('#setupCameraCameraInstallationSetup').show();
      $('#setupCameraCameraInstallationSearch').hide();
      
      v.setupCameraCameraInstallationSearchTable.finalize();
      v.setupCameraCameraInstallationSetupTable.init();
    },

    showSearchPage: function() {
      var api;
      WebView.ajax.apiCall({
        action: 'set_setup',
        menu: 'camera.openmode_stop_streaming',
        callback: this.stopStreamingReturnHandler
      });
    },

    stopStreamingReturnHandler: function(ret) {
      var my = v.setupCameraCameraInstallation

      if (ret) {
        my.currentPage = 'search';
        $('#setupCameraCameraInstallationSetup').hide();
        $('#setupCameraCameraInstallationSearch').show();

        v.setupCameraCameraInstallationSetupTable.finalize();
        v.setupCameraCameraInstallationSearchTable.init();
      }
    },

    submitEventHandler: function() {
      var my = v.setupCameraCameraInstallation;
      WebView.log('camera installation submit');
      v.dialogNotice.open({
        data: {text: [w.text('Please wait...')]},
        caller: this
      });
      my.model.save(null, {success: my.submitEventReturnHandler});

      return true;
    },

    submitEventReturnHandler: function(resp) {
      var my = v.setupCameraCameraInstallation;
      WebView.ajax.apiCall({
        action: 'set_setup',
        menu: 'camera.openmode_apply',
        callback: my.openmodeApplyReturnHandler
      });
    },

    openmodeApplyReturnHandler: function(ret) {
      var my = v.setupCameraCameraInstallation;
      if (ret != false) {
        v.dialogNotice.close();
        v.dialogNotice.open({
          data: {text: [w.text('Configuration has been saved.')]},
          caller: my,
          autoClose: true
        });
      }
    },

    resetEventHandler: function() {
      WebView.log('camera installation reset');
      WebView.ajax.apiCall({
        action: 'set_setup',
        menu: 'camera.openmode_cancel'
      });
    },

    // /////////////////////////////////////////////////////////////
    // // setup page handlers
    addNewCameraButtonHandler: function() {
      v.dialogWarning.open({
        data: {text: [this.warningMsg1, this.warningMsg2]},
        caller: this,
        dialogOk: this.addNewCameraReturnHandler
      });
    },

    addNewCameraReturnHandler: function(ret) {
      var my = v.setupCameraCameraInstallation;
      my.showSearchPage();
      v.confirm.changeButton({
        'CLOSE': function() {
          my.showSetupPage();
          v.confirm.revertDefault();
        }
      });
    },

    redirectNetworkSetupHandler: function() {
      window.location.pathname = '/html/setup_network_ipsetup.htm';
    },

    closeSearchButtonHandler: function() {
      this.showSetupPage();
    }
  });
  
  return view;
});