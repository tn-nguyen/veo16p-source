/* 
 * v.setupCameraInstallationMode.js
 * -------------
 * 
 */

define([], function() {

  'use strict';
  
  var view = WebView.View.extend({

    openmodeMsg1 : w.text('Selecting \'OPEN MODE\' opens all network ports, including camera connection ports.'),
    openmodeMsg2 : w.text('Therefore, the transmission quality of the camera and recording quality may be affected\nby other telecommunications equipment and/or the network environment.'),
    openmodeMsg3 : w.text('Also, using this mode requires the user to have knowledge of network equipment\nand network building/operating experience.'),
    restartMsg : w.text('Pressing \'CONTINUE\' will restart the system and change network settings.\nDo you want to continue?'),

    events: {
      "change #selectInstallationMode" : "changeMode"
    },
    
    init: function() {
    },

    render: function(events) {

      // if (event.changed.)
      var mode = this.model.get('install_mode');

      if (mode == '0') {
        $('#selectInstallationMode').val('0');
        $('#imgCctvmodeNetworkMap').show();
        $('#imgOpenmodeNetworkMap').hide();
        $('#setupCameraInstallationMode span.cctvmodeText').removeClass('hidden');
        $('#setupCameraInstallationMode span.openmodeText').addClass('hidden');
      } else {
        $('#selectInstallationMode').val('1');
        $('#imgCctvmodeNetworkMap').hide();
        $('#imgOpenmodeNetworkMap').show();
        $('#setupCameraInstallationMode span.cctvmodeText').addClass('hidden');
        $('#setupCameraInstallationMode span.openmodeText').removeClass('hidden');
      }
    },

    changeMode: function(event) {
      switch (event.target.id) {
        case 'selectInstallationMode':
          this.model.set('install_mode', event.target.value);
          break;
      };
    },

    submitEventHandler: function() {
      var my = this,
          text = new Array(),
          mode = this.model.get('install_mode');

      if (mode === '0') {
        text.push(this.restartMsg);
      } else {
        text.push(this.openmodeMsg1, this.openmodeMsg2, this.openmodeMsg3, this.restartMsg);
      }

      v.dialogWarning.open({
        data: {text: text},
        caller: this,
        dialogOk: this.submitOkHandler
      });
      
      WebView.log('inst mode submit');
      //$("#dialog").dialog("open");
      return false;
    },

    submitOkHandler: function(ret) {
      var my = v.setupCameraInstallationMode;
      my.model.save();
    },

    syncSuccess: function(resp) {
      var my = v.setupCameraInstallationMode;
      WebView.ajax.apiCall({
        action: 'set_setup',
        menu: 'system.restart',
        data: {reason: '0'},
        callback: my.ajaxRestartMsgHandler
      });
    },

    ajaxRestartMsgHandler: function(resp) {
      if (resp === false) {
        alert("can't restart dvr!");
      } else {
        v.dialogRestart.open({
          caller: this
        });
      }
    }

  });
  
  // Returns the Model class
  return view;
});
