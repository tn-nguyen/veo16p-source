//
// scmListener.js
//
// Module for polling SCM EVT MESSAGE 
// This module require JQuery
// reference : src/nfgui/iux_msg.h

define(['modules/ajax'], function () {

  'use strict';

  var SCMMSG = {

    ///////////////////////////////////////////////////////////
    // NOTIFY (NFY) message         (bitmask : 0x00001000)
    //
    // NOTIFY messages are dvided into 2 groups.
    // 1st group : UI NOTIFY.
    // 2nd group : NF NOTIFY.

    //----------------------------------------------
    // 1. VW can receive the below message. (bitmask : 0x1000)
    //

    // 0x1000
    'INFY_IPCAM_CHANGE_NOTIFY'          : 0x1000,
    'INFY_DISPLAY_NOTIFY'               : 0x1001,
    'INFY_ALRDB_CHANGE_NOTIFY'          : 0x1002,
    'INFY_FACTORY_DEFAULT_NOTIFY'       : 0x1003,
    'INFY_SYSTEM_DATA_LOAD_NOTIFY'      : 0x1004,
    'INFY_FORMAT_CMPL'                  : 0x1005,
    'INFY_RECOVERY_CMPL'                : 0x1006,
    'INFY_QUERY_ERROR'                  : 0x1007,
    'INFY_QUERY_SUCCESS'                : 0x1008,
    'INFY_BURN_QUERYING'                : 0x1009,
    'INFY_BURN_ERASING'                 : 0x100A,
    'INFY_BURN_EXTRACTING'              : 0x100B,
    'INFY_BURN_PROG'                    : 0x100C,
    'INFY_BURN_ERROR'                   : 0x100D,
    'INFY_BURN_CANCEL'                  : 0x100E,
    'INFY_BOOT_DISK_ADDED'              : 0x100F,

    // 0x1010
    'INFY_BOOT_DISK_REMOVED'            : 0x1010,
    'INFY_BOOT_DISK_CHANGED'            : 0x1011,
    'INFY_BOOT_DISK_CONFLICT'           : 0x1021,
    'INFY_BOOT_DISK_NEED_FORMAT'        : 0x1013,
    'INFY_FORMAT_RATE'                  : 0x1014,
    'INFY_RECOVERY_RATE'                : 0x1015,
    'INFY_BOOT_FORMAT_ERROR'            : 0x1016,
    'INFY_BOOT_RECOVERY_ERROR'          : 0x1017,
    'INFY_DATA_DELETE_RATE'             : 0x1018,
    'INFY_RTL_SET_RATE'                 : 0x1019,
    'INFY_FWUP_RATE'                    : 0x101A,
    'INFY_MEDIA_STATUS_CHANGED'         : 0x101B,
    'INFY_DISP_IP_CAMERA_INFO'          : 0x101C,
    'INFY_DISP_INT_DISK_INFO'           : 0x101D,
    'INFY_DISP_ODD_INFO'                : 0x101E,
    'INFY_DISP_EXT_STORAGE_INFO'        : 0x101F,

    // 0x1020
    'INFY_PREV_RUNNING_UNC_ERROR'       : 0x1020,
    'INFY_CFRM_UNC_ERROR_DETECTED'      : 0x1021,
    'INFY_DISP_WAN_IP'                  : 0x1022,
    'INFY_TML_DATE_CHANGED'             : 0x1023,
    'INFY_TML_PLAY_CHANGED'             : 0x1024,
    'INFY_TML_START_CHANGED'            : 0x1025,
    'INFY_TML_END_CHANGED'              : 0x1026,
    'INFY_TML_DOUBLE_CLICKED'           : 0x1027,
    'INFY_VERIFY_RATE'                  : 0x1028,
    'INFY_CALENDAR_CLOSED'              : 0x1029,
    'INFY_IPCAM_RESET_BEGIN'            : 0x102A,
    'INFY_IPCAM_RESET_END'              : 0x102B,
    'INFY_IPCAM_RESET_PENDING'          : 0x102C,
    'INFY_IPCAM_RESET_REQ_FAIL'         : 0x102D,
    'INFY_IPCAM_RESET_TIMEOUT'          : 0x102E,
    'INFY_TML_UNSET_SECTION'            : 0x102F,

    // 0x10330
    'INFY_THUMBNAIL_CMPL_OBJ'           : 0x1030,
    'INFY_QUERY_OVER'                   : 0x1031,
    'INFY_THUMBNAIL_TOTALLY_CMPL'       : 0x1032,
    'INFY_TML_SCROLL_UP'                : 0x1033,
    'INFY_TML_SCROLL_DOWN'              : 0x1034,
    'INFY_RTL_SET_CMPL'                 : 0x1035,
    'INFY_RESERVED'                     : 0x1036,
    'INFY_QUERY_NO_VIDEODATA'           : 0x1037,
    'INFY_INIT_LIVEVIEW'                : 0x1038,
    'INFY_DIV_CHANGE'                   : 0x1039,
    'INFY_USER_LOGON'                   : 0x103A,
    'INFY_ALT_EXPIRED'                  : 0x103B,
    'INFY_RECOVERY_EXPIRED'             : 0x103C,
    'INFY_LANG_CHANGED'                 : 0x103D,
    'INFY_IPCAM_CALIBRATION_BEGIN'      : 0x103E,
    'INFY_IPCAM_CALIBRATION_END'        : 0x103F,

    // 0x1040
    'INFY_IPCAM_CALIBRATION_PENDING'    : 0x1040,
    'INFY_IPCAM_CALIBRATION_REQ_FAIL'   : 0x1041,
    'INFY_IPCAM_CALIBRATION_TIMEOUT'    : 0x1042,
    'INFY_VWND_RUN_ALL_EVENT'           : 0x1043,
    'INFY_VWND_STOP_ALL_EVENT'          : 0x1044,
    'INFY_VWND_RUN_RIGHT_PRESS'         : 0x1045,
    'INFY_VWND_STOP_RIGHT_PRESS'        : 0x1046,
    'INFY_VWND_CHANGE_BORDER'           : 0x1047,
    'INFY_VWND_DRAW_FOCUS'              : 0x1048,
    'INFY_VWND_ERASE_FOCUS'             : 0x1049,
    'INFY_IPCAM_ONEPUSH_BEGIN'          : 0x104A,
    'INFY_IPCAM_ONEPUSH_END'            : 0x104B,
    'INFY_IPCAM_ONEPUSH_PENDING'        : 0x104C,
    'INFY_IPCAM_ONEPUSH_REQ_FAIL'       : 0x104D,
    'INFY_IPCAM_ONEPUSH_TIMEOUT'        : 0x104E,
    'INFY_CAPTURE_IMAGE'                : 0x104F,

    // 0x1050
    'INFY_PB_IMAGE_STATUS'              : 0x1050,
    'INFY_BURN_SUCCESS'                 : 0x1051,
    'INFY_PLAYBACK_STARTED'             : 0x1052,
    'INFY_LIVE_OPEN'                    : 0x1053,
    'INFY_CAM_TITLE_CHANGED'            : 0x1054,
    'INFY_PANIC_REC_STATUS'             : 0x1055,
    'INFY_GET_DDNS_STATUS'              : 0x1056,
    'INFY_PB_PLAY_STATUS'               : 0x1057,
    'INFY_ERASE_CH_RATE'                : 0x1058,
    'INFY_CHECK_NET_NEWFW'              : 0x1059,
    'INFY_QC_TEST_SET_BUTTON'           : 0x105A,
    'INFY_QC_TEST_INFO_ADD'             : 0x105B,
    'INFY_QC_TEST_INFO_CLEAR'           : 0x105C,
    'INFY_VWND_IPCAM_ZIG_INFO'          : 0x105D,
    'INFY_PASSWD_INIT_BY_WEB'           : 0x105E,
    'INFY_VKEY_SIZE_INCREASE'           : 0x105F,

    // 0x1060
    'INFY_VKEY_SIZE_DECREASE'           : 0x1060,
    'INFY_FORMAT_API_BEGIN'             : 0x1061,
    'INFY_FACDEF_API_BEGIN'             : 0x1062,
    'INFY_TIMECHANGE_API_BEGIN'         : 0x1063,
    'INFY_NETCHANGE_API_BEGIN'          : 0x1064,
    'INFY_SVCRESTART_API_BEGIN'         : 0x1065,
    'INFY_FORMAT_API_CMPL'              : 0x1066,
    'INFY_FACDEF_API_CMPL'              : 0x1067,
    'INFY_TIMECHANGE_API_CMPL'          : 0x1068,
    'INFY_NETCHANGE_API_CMPL'           : 0x1069,
    'INFY_SVCRESTART_API_CMPL'          : 0x106A,
    'INFY_DBIMPORT_API_BEGIN'           : 0x106B,
    'INFY_DBIMPORT_API_CMPL'            : 0x106C,
    'INFY_OPENMODE_ENTER_INSTALL'       : 0x106D,
    'INFY_OPENMODE_LEAVE_INSTALL'       : 0x106E,
    'INFY_REBOOT_SYSTEM'                : 0x106F,
    
    // 0x1060
    'INFY_VAA_SELECT_RULE_ID'           : 0x1070,
    'INFY_SMS_TEST_RESULT'              : 0x1071,
    'INFY_VCA_SELECT_MODIFY_POINT'      : 0x1072,
    'INFY_STREAM_DATA_RELOAD'           : 0x1073,

    // 0x1090
    'INFY_SCM_PREPARE_FWUP_OPEN'        : 0x1103,
    
    // add general notify message here...

    // 'INFY_NFNOTIFY_MIN' : 0x10A0,
    // 'INFY_NFNOTIFY_MAX' : 0x10FF,

    // 0x10A0
    'INFY_CAM_TITLE_NOTIFY'             : 0x10A0,
    'INFY_NOVIDEO_NOTIFY'               : 0x10A1,
    'INFY_NET_NOTIFY'                   : 0x10A2,
    'INFY_ENC_NOTIFY'                   : 0x10A3,
    'INFY_DISK_USAGE_NOTIFY'            : 0x10A4,
    'INFY_DISK_FULL_NOTIFY'             : 0x10A5,
    'INFY_DISK_OW_NOTIFY'               : 0x10A6,
    'INFY_SYSDB_CHANGE_NOTIFY'          : 0x10A7,
    'INFY_NETDB_CHANGE_NOTIFY'          : 0x10A8,
    'INFY_AUDDB_CHANGE_NOTIFY'          : 0x10A9,
    'INFY_DSKDB_CHANGE_NOTIFY'          : 0x10AA,
    'INFY_CAMDB_CHANGE_NOTIFY'          : 0x10AB,
    'INFY_USRDB_CHANGE_NOTIFY'          : 0x10AC,
    'INFY_ALMDB_CHANGE_NOTIFY'          : 0x10AD,
    'INFY_ACTDB_CHANGE_NOTIFY'          : 0x10AE,
    'INFY_DSPDB_CHANGE_NOTIFY'          : 0x10AF,

    // 0x10B0
    'INFY_RECDB_CHANGE_NOTIFY'          : 0x10B0,
    'INFY_COVERT_NOTIFY'                : 0x10B1,
    'INFY_SMART_ERROR_NOTIFY'           : 0x10B2,
    'INFY_ANALOG_REC_NOTIFY'            : 0x10B3,
    'INFY_IPCAM_REC_NOTIFY'             : 0x10B4,
    'INFY_VLOSS_NOTIFY'                 : 0x10B5,
    'INFY_SENSOR_NOTIFY'                : 0x10B6,
    'INFY_MOTION_NOTIFY'                : 0x10B7,
    'INFY_ALARM_NOTIFY'                 : 0x10B8,
    'INFY_PND_NOTIFY'                   : 0x10B9,
    'INFY_PND_RATE_NOTIFY'              : 0x10BA,
    'INFY_PND_HUB_NOTIFY'               : 0x10BB,
    'INFY_WAN_NOTIFY'                   : 0x10BC,
    'INFY_DDNS_NOTIFY'                  : 0x10BD,
    'INFY_WRITEFAIL_NOTIFY'             : 0x10BE,
    'INFY_EXHAUST_NOTIFY'               : 0x10BF,

    // 0x10C0
    'INFY_NODISK_NOTIFY'                : 0x10C0,
    'INFY_SMART_WARN_NOTIFY'            : 0x10C1,
    'INFY_SYSFAN_NOTIFY'                : 0x10C2,
    'INFY_TEMPERATURE_NOTIFY'           : 0x10C3,
    'INFY_POE_NOTIFY'                   : 0x10C4,
    'INFY_POE_HUB_NOTIFY'               : 0x10C5,
    'INFY_POE_PORT_NOTIFY'              : 0x10C6, 
    'INFY_DVRLOGINFAIL_NOTIFY'          : 0x10C7,
    'INFY_NETLOGINFAIL_NOTIFY'          : 0x10C8,
    'INFY_NET_RXTX'                     : 0x10C9,
    'INFY_AUDIOCH_NOTIFY'               : 0x10CA,
    'INFY_MICOUT_NOTIFY'                : 0x10CB,
    'INFY_BUZZER_NOTIFY'                : 0x10CC,
    'INFY_IP_CHANGED_NOTIFY'            : 0x10CD,
    'INFY_IPCAM_INSTALL_NOTIFY'         : 0x10CE,
    'INFY_VCA_EVENT_NOTIFY'             : 0x10CF,

    // 0x10D0
    'INFY_VCA_TRACKINFO_NOTIFY'         : 0x10D0,
    'INFY_VCA_COUNTER_NOTIFY'           : 0x10D1,
    'INFY_VCA_META_DATA_NOTIFY'         : 0x10D2,
    'INFY_VCA_MODULAR_EVENT'            : 0x10D3,

    // add nf_notify message here

    'INFY_MAX_GROUP'                    : 0x1FFF,

    ///////////////////////////////////////////////////////////
    // REQUEST (REQ) message          (bitmask : 0x00002000)
    
    //----------------------------------------------
    // 1. VW can receive the below message
    //
    'IREQ_CFRM_DATA_DELETE_FAIL'        : 0x2000,
    'IREQ_CFRM_NODISK_DETECTED'         : 0x2001,
    'IREQ_FORMAT_RATE'                  : 0x2002,
    'IREQ_FORMAT_ERROR'                 : 0x2003,
    'IREQ_BOOT_ERROR'                   : 0x2004,
    'IREQ_BOOT_NODISK'                  : 0x2005,
    'IREQ_BOOT_DISK_CONFLICT'           : 0x2006,
    'IREQ_BOOT_DISK_ADDED'              : 0x2007,
    'IREQ_BOOT_DISK_REMOVED'            : 0x2008,
    'IREQ_BOOT_DISK_CHANGED'            : 0x2009,
    'IREQ_BOOT_DISK_NEED_FORMAT'        : 0x200A,
    'IREQ_BOOT_FORMAT_RCVR'             : 0x200B,
    'IREQ_BOOT_ENFORCE_FORMAT'          : 0x200C,
    'IREQ_BOOT_SMART_ERROR'             : 0x200D,
    'IREQ_FACTORY_DEFAULT'              : 0x200E,
    'IREQ_UI_LOCK'                      : 0x200F,

    'IREQ_UI_UNLOCK'                    : 0x2010,
    'IREQ_CHANGE_LANG'                  : 0x2011,
    'IREQ_BOARD_CONFIRM'                : 0x2012,
    'IREQ_PASSWD_INIT'                  : 0x2013,
    'IREQ_NET_FWUP'                     : 0x2014,
    'IREQ_DETECTED_NEWFW'               : 0x2015,
    'IREQ_CHEAT_AUTO_FWUP'              : 0x2016,
    'IREQ_OPENMODE_IPSETUP'             : 0x2017,
    'IREQ_OPENMODE_PORTSETUP'           : 0x2018,
    'IREQ_OPENMODE_CHANGE_PW'           : 0x2019,

    'IREQ_MAX_GROUP'                    : 0x2FFF,


    ///////////////////////////////////////////////////////////
    // REPLY (RPL) message        (bitmask : 0x00004000)
    
    //----------------------------------------------
    // 1. VW have to reply to the below message
    //
    'IRPL_CFRM_DATA_DELETE_FAIL'        : 0x4000,
    'IRPL_CFRM_UNC_ERROR_DETECTED'      : 0x4001,
      // p : id of rebooting timer0x400
      // d : none0x400
    'IRPL_CFRM_NODISK_DETECTED'         : 0x4002,
    'IRPL_FORMAT_RATE'                  : 0x4003,
    'IRPL_FORMAT_ERROR'                 : 0x4004,
    'IRPL_BOOT_ERROR'                   : 0x4005,
    'IRPL_BOOT_NODISK'                  : 0x4006,
    'IRPL_BOOT_DISK_CONFLICT'           : 0x4007,
    'IRPL_BOOT_DISK_ADDED'              : 0x4008,
    'IRPL_BOOT_DISK_REMOVED'            : 0x4009,
    'IRPL_BOOT_DISK_CHANGED'            : 0x400A,
    'IRPL_BOOT_DISK_NEED_FORMAT'        : 0x400B,
    'IRPL_BOOT_FORMAT_RCVR'             : 0x400C,
    'IRPL_BOOT_ENFORCE_FORMAT'          : 0x400D,
    'IRPL_BOOT_SMART_ERROR'             : 0x400E,
    'IRPL_TML_GET_DATA'                 : 0x400F,

    'IRPL_UI_LOCK'                      : 0x4010,
    'IRPL_UI_UNLOCK'                    : 0x4011,
    'IRPL_BOARD_CONFIRM'                : 0x4012,
    'IRPL_PASSWD_INIT'                  : 0x4013,
    'IRPL_NET_FWUP'                     : 0x4014,
    'IRPL_DETECTED_NEWFW'               : 0x4015,
    'IRPL_OPENMODE_IPSETUP'             : 0x4016,
    'IRPL_OPENMODE_PORTSETUP'           : 0x4017,
    'IRPL_OPENMODE_CHANGE_PW'           : 0x4018,

    'IRPL_MAX_GROUP'                    : 0x4FFF,

    ///////////////////////////////////////////////////////////
    // RETURN (RET) msessages 
    
    //----------------------------------------------
    // 1. VW can use the below message, when it call non-blocking APIs
    //

    'IRET_SCM_UPGRADE_FW'               : 0x8000,
    'IRET_SCM_CHANGE_SYSTEM_TIME'       : 0x8001,
    'IRET_SCM_FORMAT_STORAGE'           : 0x8002,
    'IRET_SCM_BOOTUP_SYSTEM'            : 0x8003,
    'IRET_SCM_APPLY_NETINFO'            : 0x8004,
    'IRET_SCM_APPLY_NETINFO2'           : 0x8005,
    'IRET_FACTORY_DEFAULT_NOTIFY'       : 0x8006,
    'IRET_SYSTEM_DATA_LOAD_NOTIFY'      : 0x8007,
    'IRET_FWUP_CMPL'                    : 0x8008,
    'IRET_BOOTWND_OPENED'               : 0x8009,
    'IRET_BOOTWND_CLOSED'               : 0x800A,
    'IRET_ARCH_VERIFY'                  : 0x800B,
    'IRET_OPEN_ARCH_MANAGER'            : 0x800C,
    'IRET_RESTART_SERVICE'              : 0x800D,
    'IRET_SCM_GET_WANIP'                : 0x800E,
    'IRET_SCM_REG_RTSP'                 : 0x800F,

    'IRET_SCM_RMV_RTSP'                 : 0x8010,
    'IRET_SCM_TST_RTSP'                 : 0x8011,
    'IRET_SCM_REG_WEB'                  : 0x8012,
    'IRET_SCM_RMV_WEB'                  : 0x8013,
    'IRET_SCM_TST_WEB'                  : 0x8014,
    'IRET_SCM_REG_DDNS'                 : 0x8015,
    'IRET_SCM_TST_DDNS'                 : 0x8016,
    'IRET_SCM_SHUTDOWN'                 : 0x8017,
    'IRET_SCM_SHUTDOWN_CAM_CHANGE'      : 0x8018,
    'IRET_SCM_SHUTDOWN_SIGNAL_CHANGE'   : 0x8019,
    'IRET_SCM_ENTER_CAMUP_MODE'         : 0x801A,
    'IRET_SCM_UPDATE_DESIGN'            : 0x801B,
    'IRET_SCM_SHUTDOWN_HD_SPOT_CHANGE'  : 0x801C,
    'IRET_SCM_DCONFIG_MODE'             : 0x801D,
    'IRET_SCM_ERASE_CH'                 : 0x801E,
    'IRET_SCM_DHCP_RENEW'               : 0x801F,

    'IRET_SCM_PREPARE_FWUP_VALIDATE'    : 0x802C,
    'IRET_SCM_PREPARE_FWUP_DATABACKUP'    : 0x802D,
    'IRET_SCM_PREPARE_FWUP_CMPL'        : 0x802E
  };

  WebView.SCMMSG = SCMMSG;

  var scmListener = function() {
    this.initialize();
  };

  scmListener.prototype = {
    // Properties
    currIndex : 0,
    text : '',
    _interval : null,
    _debug : undefined,
    _ajaxConfig : null,
    _callbackList : [],

    // Const value
    MAX_SCM_MSG_INDEX : 1000,
    MAX_SCM_MSG_LIST_SIZE : 50,

    initialize: function() {
      var me = this;

      this._ajaxConfig = {
        type : 'POST',
        url : '/cgi-bin/webra_fcgi.fcgi',
        success : function(response) {
          me._ajaxSuccess(response);
        },
        fail : function(response) {
        }
      }
    },

    // Public Method
    start : function () {
      var me = this;
      var intervalFunc = function() {
        me._ajaxCall(me);
      };

      if (me._interval == null) {
        me._interval = setInterval(intervalFunc, 1000);
      }
      return true;
    },

    stop : function () {
      var me = this;
      var ret;

      if (me._interval) {
        clearInterval(me._interval);
        me._interval = null;
        ret = true;
      } else {
        ret = false;
      }
      return ret;
    },

    deleteLog : function () {
      this.text = '';
    },

    registCallback : function (msg, callback, me) {
      if (this._callbackList[msg] == undefined) {
        this._callbackList[msg] = [];
      }

      this._callbackList[msg].push(callback);
      return true;
    },

    unregistCallback : function (msg, callback) {
      var ret = false;

      if (this._callbackList[msg] != undefined) {
        var listLength = this._callbackList[msg].length;

        for (var i = 0; i < listLength; i += 1) {
          if (this._callbackList[msg][i] == callback) {
            this._callbackList[msg].splice(i, 1);
            ret = true;
            break;
          }
        }
        if (this._callbackList[msg].length == 0) {
          this._callbackList[msg] = undefined;
        }
      }
      return ret;
    },

    setDebug : function (flag) {
      if (flag != undefined) {
        this._debug = flag;
      }
    },

    // Private Method
    _printLog : function(log) {
      var msgstr;
      if (this._debug == 'simple') {
        this.text = '';
      }
      
      for (var i = 0 ; i < parseInt(log['count']) ; i += 1) {
        msgstr = '!!undefined_msg!!';
        this.text = log['data_' + i] + '\n' + this.text;
        for (var j in SCMMSG) {
          if (SCMMSG[j] == parseInt(log['msgid_' + i])) {
            msgstr = j
          } 
        }
        this.text = msgstr + '\t' + this.text;
        this.text = log['dyn_data_' + i] + '\t' + this.text;
        this.text = log['param_' + i] + '\t' + this.text;
        this.text = (parseInt(log['msgid_' + i], 10)).toString('16') + '\t' + this.text;
        this.text = log['str_msgid_'+i] + '\t' + this.text;
        this.text = log['msgid_' + i] + '\t' + this.text;
        this.text = log['index_' + i] + '\t' + this.text;
      }
      this.text = 'idx----msg10---msg16--param----dyn------msg----------------------------data---------\n' + this.text;

      $('#event_log').html(this.text);
      return true;
    },

    _callCallback : function(log) {

      var logCount = parseInt(log['count']);
      var text = '';

      for (var i = 0 ; i < logCount ; i += 1) {

        if (log[i].index < this.currIndex) continue;

        //var msgid = parseInt(log[i].msgid, 10);
        var str_msgid = log[ 'str_msgid_' +i];

        //if (this._callbackList[ msgid ] != undefined) {
        if (this._callbackList[ str_msgid ] != undefined) {
          //var callbackLength = this._callbackList[msgid].length;
          var callbackLength = this._callbackList[str_msgid].length;

          for (var j = 0 ; j < callbackLength ; j += 1) {
            //if (typeof this._callbackList[msgid][j] == 'function') {
            if (typeof this._callbackList[str_msgid][j] == 'function') {
              text = log[i].msgid + '\t'
                    + log[i].param + '\n';
              $('#callback_log').html(text);
              //this._callbackList[msgid][j].call(undefined, log[i]);
              this._callbackList[str_msgid][j].call(undefined, log[i]);
            }
          }
        }
      }
    },

    _ajaxSuccess : function(response) {
      if (response.indexOf("Send Error") >= 0) {
        return false;
      }

      var log = WebView.json.resultToJson(response);
      for (var i in log) {
        if (!isNaN(parseInt(i)))
          log[i].data = WebView.json.resultToJson(log[i].data);
      }
      if (this._debug != undefined) {
        this._printLog(log);
      }

      this._callCallback(log);
      this.currIndex = log[(parseInt(log['count']) - 1)].index;
      return true;
    },

    _ajaxCall : function (me) {
      var action;
      var nextIndex = parseInt(me.currIndex) + 1;
      nextIndex %= me.MAX_SCM_MSG_INDEX;

      action = 'action=get_info&menu=scm.msg';
      action += '&count=' + nextIndex + '&debug=';

      me._ajaxConfig.data = action;

      WebView.ajax.ajaxCall(me._ajaxConfig);

      return true;
    }
  };

  return scmListener;
});