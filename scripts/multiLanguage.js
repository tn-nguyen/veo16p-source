/*************************************
 * Language Array Definition
 *************************************/

var bNVR = false;
if( INFO_MODEL.indexOf("IPX") >= 0 ) {
  bNVR = true;
  langArray['LTXT_ERR_DVRINSETUP'] = langArray['LTXT_ERR_NVRINSETUP'];
  langArray['LTXT_ERR_DVRINARCH'] = langArray['LTXT_ERR_NVRINARCH'];
  langArray['LTXT_ERR_DVRINARCH_SAMSUNG'] = langArray['LTXT_ERR_NVRINARCH_SAMSUNG'];
  langArray['LTXT_ERR_DVRINPLAYBACK'] = langArray['LTXT_ERR_NVRINPLAYBACK'];
  langArray['LTXT_ERR_DISCONNECT'] = langArray['LTXT_ERR_DISCONNECT_NVR'];
  langArray['LTXT_ERR_NODISK'] = langArray['LTXT_ERR_NODISK_NVR'];
  langArray['LTXT_ERR_IPCHANGE'] = langArray['LTXT_ERR_IPCHANGE_NVR'];
  langArray['LTXT_ERR_DISKFORMAT'] = langArray['LTXT_ERR_DISKFORMAT_NVR'];
  langArray['LTXT_ERR_POWEROFF'] = langArray['LTXT_ERR_POWEROFF_NVR'];
  langArray['LTXT_ERR_TIMECHANGE'] = langArray['LTXT_ERR_TIMECHANGE_NVR'];
  langArray['LTXT_ERR_FWUPGRAGE'] = langArray['LTXT_ERR_FWUPGRAGE_NVR'];
  langArray['LTXT_ERR_DISKMAN'] = langArray['LTXT_ERR_DISKMAN_NVR'];

  langArray['LTXT_DVR_NOT_LIVE'] = langArray['LTXT_NVR_NOT_LIVE'];
}

var lang_log_type = {
  'SYSTEM': langArray['LTXT_LT_SYSTEM'],
  'RECSET': langArray['LTXT_LT_RECORD_SETUP_CHANGED'],
  'SYSSET': langArray['LTXT_LT_SYSTEM_SETUP_CHANGED'],
  'SENSOR': langArray['LTXT_LT_SENSOR'],
  'MOTION': langArray['LTXT_LT_MOTION'],
  'VIDIN':  langArray['LTXT_LT_VIDEO_IN'],
  'VIDLOS': langArray['LTXT_LT_VIDEO_LOSS'],
  'SMART':  langArray['LTXT_LT_SMART'],
  'DISKEV': langArray['LTXT_LT_DISK_EVENT'],
  'DISKFU': langArray['LTXT_LT_DISKFULL'],
  'DISKOW': langArray['LTXT_LT_OVERWRITE_START'],
  'RECSTA': langArray['LTXT_LT_RECORD_STARTED'],
  'RECSTP': langArray['LTXT_LT_RECORD_STOPPED'],
  'SYSEVT': langArray['LTXT_LT_SYSTEM_EVENT'],
  'NETEVT': langArray['LTXT_LT_NETWORK_EVENT'],
  'IPCAM':  langArray['LTXT_LT_IPCAM'],
  'TAMPER': langArray['LTXT_LT_TAMPER'],
  'VCA' : langArray['LTXT_LT_VCA'],
  'TEXTDEV' : langArray['LTXT_LT_TEXT_DEV']
};

var lang_log_message = Array(
/* 00 */	langArray['LTXT_LM_SYSTEM_STARTED'],
/* 01 */	langArray['LTXT_LM_SYSTEM_SHUTDOWN'],
/* 02 */	langArray['LTXT_LM_ABNORMAL_SHUTDOWN_DETECTED'],
/* 03 */	langArray['LTXT_LM_SYSTEM_RECOVERED'],
/* 04 */	langArray['LTXT_LM_SYSTEM_DATE/TIME_CHANGED'],
/* 05 */	langArray['LTXT_LM_FIRMWARE_UPGRADE_START'],
/* 06 */	langArray['LTXT_LM_FORMAT_DISKS'],
/* 07 */	langArray['LTXT_LM_CHECK_DISK'],
/* 08 */	langArray['LTXT_LM_LOCAL_LOG_ON'],
/* 09 */	langArray['LTXT_LM_LOCAL_LOG_OFF'],
/* 10 */	langArray['LTXT_LM_REMOTE_LOG_ON'],
/* 11 */	langArray['LTXT_LM_REMOTE_LOG_OFF'],
/* 12 */	langArray['LTXT_LM_REC_SETUP_CHANGED'],
/* 13 */	langArray['LTXT_LM_SYS_SETUP_CHANGED'],
/* 14 */	langArray['LTXT_LM_SENSOR'],
/* 15 */	langArray['LTXT_LM_MOTION_DETECTION'],
/* 16 */	langArray['LTXT_LM_VIDEO_ON'],
/* 17 */	langArray['LTXT_LM_VIDEO_LOSS'],
/* 18 */	langArray['LTXT_LM_TAMPER_EVENT'],
/* 19 */	langArray['LTXT_LM_SMART_WARNING'],
/* 20 */	langArray['LTXT_LM_DISK_EVENT'], //////////////
/* 21 */	langArray['LTXT_LM_DISK_FULL'],
/* 22 */	langArray['LTXT_LM_OVERWRITE_START'],
/* 23 */	langArray['LTXT_LM_REC_START'],
/* 24 */	langArray['LTXT_LM_REC_STOP'],
/* 25 */	" ",
/* 26 */	" ",
/* 27 */  "POS",
/* 28 */  langArray['LTXT_LM_NETWORK_EVENT'],
/* 29 */  langArray['LTXT_LM_IPCAM'],
"NR"
);

var lang_logonoff_str = Array(
/*0*/	langArray['LTXT_LOF_LIVE_DISPLAY'],
/*1*/	langArray['LTXT_LOF_SEARCH'],
/*2*/	langArray['LTXT_LOF_ARCHIVING'],
/*3*/	langArray['LTXT_LOF_SYSTEM_SETUP'],
/*4*/	langArray['LTXT_LOF_RECORD_SETUP'],
"NR"
);

var lang_recordsetup_str = Array(
/*00*/	langArray['LTXT_RECSET_RECORD_MODE'],
/*01*/	langArray['LTXT_RECSET_NORMAL_REC_PARAMETER'],
/*02*/	langArray['LTXT_RECSET_NORMAL_REC_SCHEDULE'],
/*03*/	langArray['LTXT_RECSET_INTENSIVE_REC_PARAMETER'],
/*04*/	langArray['LTXT_RECSET_INTENSIVE_REC_SCHEDULE'],
/*05*/	langArray['LTXT_RECSET_SWITCHING_REC_PARAMETER'],
/*06*/	langArray['LTXT_RECSET_SWITCHING_REC_SCHEDULE'],
/*07*/	langArray['LTXT_RECSET_PANIC_REC_PARAMETER'],
/*08*/	langArray['LTXT_RECSET_RECORD_OPERATION'],
/*09*/	langArray['LTXT_RECSET_SIMPLE_RECORD'],
/*10*/	langArray['LTXT_RECSET_ADV_REC_DAY_PARAMETER'],
/*11*/	langArray['LTXT_RECSET_ADV_REC_DAY_SCHEDULE'],
/*12*/	langArray['LTXT_RECSET_ADV_REC_WEEK_PARAMETER'],
/*13*/	langArray['LTXT_RECSET_ADV_REC_WEEK_SCHEDULE'],
/*14*/	langArray['LTXT_RECSET_CONT_REC_PARAMETER'],
/*15*/	langArray['LTXT_RECSET_CONT_REC_SCHEDULE'],
/*16*/	langArray['LTXT_RECSET_ALARM_REC_PARAMETER'],
/*17*/	langArray['LTXT_RECSET_ALARM_REC_SCHEDULE'],
/*18*/	langArray['LTXT_RECSET_CONTMOTION_REC_PARAMETER'],
/*19*/	langArray['LTXT_RECSET_CONTMOTION_REC_SCHEDULE'],
/*20*/	langArray['LTXT_RECSET_MOTION_REC_PARAMETER'],
/*21*/	langArray['LTXT_RECSET_MOTION_REC_SCHEDULE'],
/*22*/	langArray['LTXT_RECSET_DUAL_PARAM'],
/*23*/	langArray['LTXT_RECSET_DUAL_SCHED'],
'NR'
);

var lang_systemsetup_str = Array(
/*00*/  langArray['LTXT_SYSSET_CAMERA_TITLE'],
/*01*/	/*langArray['LTXT_SYSSET_CAMERA_COLOR']*/langArray['LTXT_SYSSET_CAM_IMAGE'],
/*02*/	/*langArray['LTXT_SYSSET_CAMERA_PTZ']*/langArray['LTXT_SYSSET_PTZ_CONFIG_CHANGED'],
/*03*/	langArray['LTXT_SYSSET_CAMERA_OSD'],
/*04*/	langArray['LTXT_SYSSET_ALARM_SENSOR'],
/*05*/	langArray['LTXT_SYSSET_ALARM_VLOSS'],
/*06*/	langArray['LTXT_SYSSET_ALARM_MOTION'],
/*07*/	langArray['LTXT_SYSSET_ALARM_STORAGE'],
/*08*/	langArray['LTXT_SYSSET_ALARM_EVENT'],
/*09*/	langArray['LTXT_SYSSET_ACT_DIGITAL'],
/*10*/	langArray['LTXT_SYSSET_ACT_EMAIL'],
/*11*/	langArray['LTXT_SYSSET_ACT_REMOTE'],
/*12*/	langArray['LTXT_SYSSET_ACT_VPOPUP'],
/*13*/	langArray['LTXT_SYSSET_ACT_BUZZ'],
/*14*/	langArray['LTXT_SYSSET_DISPLAY_SCREEN_TEMPLATE'],
/*15*/	langArray['LTXT_SYSSET_DISPLAY_MAIN_SEQ'],
/*16*/	/*langArray['LTXT_SYSSET_DISP_SPOT1_SEQ']*/langArray['LTXT_SYSSET_SPOT_CHANGED'],
/*17*/	langArray['LTXT_SYSSET_DISP_SPOT2_SEQ'],
/*18*/	langArray['LTXT_SYSSET_DISP_SPOT3_SEQ'],
/*19*/	langArray['LTXT_SYSSET_DISP_SPOT4_SEQ'],
/*20*/	langArray['LTXT_SYSSET_AUDIO'],
/*21*/	langArray['LTXT_SYSSET_USER_ID'],
/*22*/	langArray['LTXT_SYSSET_USER_GROUP'],
/*23*/	langArray['LTXT_SYSSET_NETWORK_PROTOCOL'],
/*24*/	langArray['LTXT_SYSSET_NETWORK_EMAIL'],
/*25*/	langArray['LTXT_SYSSET_SYSTEM_INFORMATION'],
/*26*/	langArray['LTXT_SYSSET_SYSTEM_DATE'],
/*27*/	langArray['LTXT_SYSSET_STORAGE_OP'],
/*28*/	langArray['LTXT_SYSSET_CAMERA_COVERT'],
/*29*/	langArray['LTXT_SYSSET_CAMERA_MOTION_SENSOR'],
/*30*/	langArray['LTXT_SYSSET_USER_MANAGEMENT'],
/*31*/	langArray['LTXT_SYSSET_SYSTEM_MANAGEMENT'],
/*32*/	langArray['LTXT_SYSSET_CAMERA_AUDIO_MAPPING'],
/*33*/	langArray['LTXT_SYSSET_DISPLAY_OSD'],
/*34*/	langArray['LTXT_SYSSET_DISPLAY_MONITOR'],
/*35*/	langArray['LTXT_SYSSET_AUDIO_BUZZER'],
/*36*/	/*langArray['LTXT_SYSSET_EXT_DEVICE']*/langArray['LTXT_SYSSET_AUDIO_BUZZER'],
/*37*/	/*langArray['LTXT_SYSSET_AUTO_LOGOUT']*/langArray['LTXT_SYSSET_EXT_DEVICE'],
/*38*/	/*langArray['LTXT_SYSSET_NET_IP']*/langArray['LTXT_SYSSET_AUTO_LOGOUT'],
/*39*/	langArray['LTXT_SYSSET_NET_DDNS'],
/*40*/  /*langArray['LTXT_SYSSET_CAM_IMAGE']*/langArray['LTXT_SYSSET_NET_DDNS'],
/*41*/  langArray['LTXT_SYSSET_DIS_SEQ'],
/*42*/  /*langArray['LTXT_SYSSET_TXTIN']*/langArray['LTXT_SYSSET_DIS_SEQ'],
/*43*/  langArray['LTXT_SYSSET_STORAGE_SMART'],
/*44*/  langArray['LTXT_SYSSET_ACT_SYSTEM'],
/*45*/  langArray['LTXT_SYSSET_ACT_SYSTEM'],
///*45*/  langArray['LTXT_SYSSET_ACT_TXTIN'],
/*46*/  langArray['LTXT_SYSSET_ACT_NOTIFICATION'],
/*47*/  /*langArray['LTXT_SYSSET_ACT_ALARM_OUT']*/langArray['LTXT_SYSSET_ACT_NOTIFICATION'],
        langArray['LTXT_SYSSET_ACT_ALARM_OUT'],
/*49*/  "Reserved Message 49",
/*50*/  langArray['LTXT_TAMPER_CONFIG_CHANGED'],
/*51*/  'NR'
);

var lang_sensor_str = {
  '0':  langArray['LTXT_LM_SENSOR_OFF'],
  '1':  langArray['LTXT_LM_SENSOR_ON']
};

var lang_motion_str = {
  '0':  langArray['LTXT_LM_MOTION_DETECTION_OFF'],
  '1':  langArray['LTXT_LM_MOTION_DETECTION_ON']
};

var lang_diskevt_str = [
/*0*/   langArray['LTXT_DISK_EVENT_NO_DISK'],
/*1*/   langArray['LTXT_DISK_EVENT_ADD'],
/*2*/   langArray['LTXT_DISK_EVENT_REMOVE'],
/*3*/   langArray['LTXT_DISK_EVENT_IO_ERROR'],
/*4*/   langArray['LTXT_DISK_EVENT_UNC_DETECTED'],
/*5*/   langArray['LTXT_DISK_EVENT_UNC_RECOVERED'],
/*6*/   langArray['LTXT_DISK_EVENT_DISK_DELETE'],
/*7*/   langArray['LTXT_DISK_EVENT_SET_RTL'],
/*8*/   langArray['LTXT_DISK_EVENT_SET_OVERWRITE'],
/*9*/   langArray['LTXT_DISK_EVENT_SET_WRITEONCE'],
/*10*/  'NR'
];

var lang_log_netevt_str = [
/* 0*/  langArray['LTXT_NETEVT_WAN_PORT_STATUS_ON'],
/* 1*/  langArray['LTXT_NETEVT_WAN_PORT_STATUS_OFF'],
/* 2*/  langArray['LTXT_NETEVT_LAN_PORT_STATUS_ON'],
/* 3*/  langArray['LTXT_NETEVT_LAN_PORT_STATUS_OFF'],
/* 4*/  langArray['LTXT_NETEVT_SWITCH_LINK'],
/* 5*/  langArray['LTXT_NETEVT_SWITCH_UNLINK'],
/* 6*/  langArray['LTXT_NETEVT_SWITCH_TIMEOUT'],
/* 7*/  langArray['LTXT_NETEVT_SWITCH_UNKNOWN_DEVICE'],
/* 8*/  langArray['LTXT_NETEVT_IP_CONFILICT_DETECTED'],
/* 9*/  langArray['LTXT_NETEVT_IP_CHANGED'],
/*10*/  langArray['LTXT_NETEVT_DHCP_OK'],
/*11*/  langArray['LTXT_NETEVT_DHCP_IPCHANGED'],
/*12*/  langArray['LTXT_NETEVT_DHCP_FAIL'],
/*13*/  langArray['LTXT_NETEVT_NETWORK_ATTACK_DETECTED'],
/*14*/  langArray['LTXT_NETEVT_BAD_DNS'],
/*15*/  langArray['LTXT_NETEVT_BAD_GW'],
/*16*/  langArray['LTXT_NETEVT_DDNS_FAIL'],
/*17*/  langArray['LTXT_NETEVT_WAN_FAIL'],
/*18*/  langArray['LTXT_NETEVT_EMAIL_SEND_FAIL'],
/*19*/  langArray['LTXT_NETEVT_NETWORK_TIME_SYNC_FAIL'],
/*20*/  langArray['LTXT_NETEVT_NETWORK_LOGIN_FAIL'],
/*21*/  langArray['LTXT_NETEVT_IPCAM_IP_CONFILICT_DETECTED'],
"NR"
];

var lang_log_ipcam_str = [
/* 0*/  langArray['LTXT_IPCAM_DEVICE_READY'],
/* 1*/  langArray['LTXT_IPCAM_DEVICE_OUT'],
/* 2*/  langArray['LTXT_IPCAM_DEVICE_RESET'],
/* 3*/  langArray['LTXT_IPCAM_UNKNOWN_DEVICE'],
/* 4*/  langArray['LTXT_IPCAM_CONNECTION_FAIL'],
/* 5*/  langArray['LTXT_IPCAM_LOGIN_FAIL'],
/* 6*/  langArray['LTXT_IPCAM_CONFIGURAION_FAIL'],
/* 7*/  langArray['LTXT_IPCAM_UNSUPPORT_MODEL'],
/* 8*/  langArray['LTXT_IPCAM_RECONN_SOCK_FAIL'],
/* 9*/  langArray['LTXT_IPCAM_RECONN_RING_FULL'],
/*10*/  langArray['LTXT_IPCAM_RECONN_MAGIC_A'],
/*11*/  langArray['LTXT_IPCAM_RECONN_MAGIC_B'],
/*12*/  langArray['LTXT_IPCAM_RECONN_MAGIC_C'],
/*13*/  langArray['LTXT_IPCAM_RECONN_MEM_FAIL'],
/*14*/  langArray['LTXT_IPCAM_RECONN_CMEM_FAIL'],
/*15*/  langArray['LTXT_IPCAM_RECONN_VLEN_FAIL'],
/*16*/  langArray['LTXT_IPCAM_RECONN_SYSTIME'],
/*17*/  langArray['LTXT_IPCAM_RECONN_TIMESTAMP'],
/*18*/  langArray['LTXT_IPCAM_PKT_LOSS'],
/*19*/  langArray['LTXT_IPCAM_CTRLF_MEM'],
/*20*/  langArray['LTXT_IPCAM_CTRLF_CMEM'],
"NR"
];

var lang_log_vca_str = [
/* 0*/  langArray['LTXT_VCA_EVENT'],
"NR"
];

var lang_offon_str = Array(
langArray['LTXT_OFF'],
langArray['LTXT_ON'],
" NR"
);

var lang_device_str = Array(
langArray['LTXT_INTERNAL'],
langArray['LTXT_EXTERNAL'],
"NR"
);

var lang_rectype_str = Array(
    /*0*/	langArray['LTXT_RTYPE_CONTINUOUS'],
    /*1*/	langArray['LTXT_RTYPE_SENSOR'],
    /*2*/	langArray['LTXT_RTYPE_MOTION'],
    /*3*/	langArray['LTXT_RTYPE_USER_EVENT'],
    /*4*/	langArray['LTXT_RTYPE_PANIC'],
    'NR'
);

var lang_recstart_str = Array(
    /*0*/	langArray['LTXT_LM_REC_CONT_START'],
    /*1*/	langArray['LTXT_LM_REC_ALARM_START'],
    /*2*/	langArray['LTXT_LM_REC_MOTION_START'],
    /*3*/	langArray['LTXT_LM_REC_USER_START'],
    /*4*/	langArray['LTXT_LM_REC_PANIC_START'],
    'NR'
);

var lang_recstop_str = Array(
    /*0*/	langArray['LTXT_LM_REC_CONT_STOP'],
    /*1*/	langArray['LTXT_LM_REC_ALARM_STOP'],
    /*2*/	langArray['LTXT_LM_REC_MOTION_STOP'],
    /*3*/	langArray['LTXT_LM_REC_USER_STOP'],
    /*4*/	langArray['LTXT_LM_REC_PANIC_STOP'],
    'NR'
);

var lang_sysevt_str = Array(
/*0*/	langArray['LTXT_SYSEVT_EMAIL_SENT'],
/*1*/	langArray['LTXT_SYSEVT_ARCHIVE_START'],
/*2*/	langArray['LTXT_SYSEVT_ARCHIVE_END'],
/*3*/	langArray['LTXT_SYSEVT_FACTORY_DEFAULT'],
/*4*/	langArray['LTXT_SYSEVT_SYSTEM_DATA_SAVE'],
/*5*/	langArray['LTXT_SYSEVT_SYSTEM_DATA_LOAD'],
/*6*/   langArray['LTXT_SYSEVT_NO_VIDEO'],
/*7*/   langArray['LTXT_SYSEVT_CPU_FAN_FAIL'],
/*8*/   langArray['LTXT_SYSEVT_CPU_FAN_CURRENT'],
/*9*/   langArray['LTXT_SYSEVT_SYS_FAN_FAIL'],
/*10*/  langArray['LTXT_SYSEVT_SYS_FAN_CURRENT'],
/*11*/  langArray['LTXT_SYSEVT_CPU_TEMP_FAIL'],
/*12*/  langArray['LTXT_SYSEVT_CPU_TEMP_CURRENT'],
/*13*/  langArray['LTXT_SYSEVT_SYS_TEMP_FAIL'],
/*14*/  langArray['LTXT_SYSEVT_SYS_TEMP_CURRENT'],
/*15*/  langArray['LTXT_SYSEVT_RTC_BATTERY_FAIL'],
/*16*/  langArray['LTXT_SYSEVT_AUTO_TIME_SYNC_FAIL'],
/*17*/  langArray['LTXT_SYSEVT_AUTO_TIME_SYNC_OK'],
/*18*/  langArray['LTXT_SYSEVT_LOCAL_LOGIN_FAIL'],
/*19*/  langArray['LTXT_SYSEVT_LOCAL_AUTO_LOGOUT'],
/*20*/  langArray['LTXT_SYSEVT_TIMEZONE_CHANGED'],
/*21*/  langArray['LTXT_SYSEVT_LANGUAGE_CHANGED'],
/*22*/  langArray['LTXT_SYSEVT_DATA_RESERVED'],
/*23*/  langArray['LTXT_SYSEVT_RESERVED_DATA_REMOVED'],
/*24*/  langArray['LTXT_SYSEVT_POE_FAIL'],
/*25*/  langArray['LTXT_SYSEVT_PRIVACY_FRAME'],
/*26*/  langArray['LTXT_SYSEVT_ERASED_RANGE'],
/*27*/  langArray['LTXT_SYSEVT_ABNORMAL_REBOOT'],
/*28*/  langArray['LTXT_SYSTEM_EVENT_REMOTE_MNG_START'],
/*29*/  langArray['LTXT_SYSTEM_EVENT_REMOTE_MNG_STOP'],
/*30*/  langArray['LTXT_SYSTEM_EVENT_SYSTEM_DIAGNOSIS'],
/*31*/  langArray['LTXT_SYSEVT_REMOTE_KEY'],
/*32*/  langArray['LTXT_SYSEVT_START_CABLE_TEST'],
/*33*/  langArray['LTXT_SYSEVT_DETECT_ISSUE_CABLE_TEST'],
/*34*/  langArray['LTXT_SYSEVT_CERT_NUM_SENT'],
/*35*/  langArray['LTXT_SYSEVT_POE_WATT'],
/*36*/  langArray['LTXT_SYSEVT_POE_WATT_TOTAL'],
/*37*/  langArray['LTXT_SYSEVT_ARM'],
/*38*/  langArray['LTXT_SYSEVT_DISARM'],
'NR'
);

var lang_storage = langArray['LTXT_STORAGE'];
var lang_log_errMsg = langArray['LTXT_LOG_ERR'];

var lang_tamperevt_str = Array(
/*0*/ langArray['LTXT_TAMPER_EVENT_REDIRECTION'],
/*1*/ langArray['LTXT_TAMPER_EVENT_BLOCKAGE'],
/*2*/ langArray['LTXT_TAMPER_EVENT_DEFOCUSING']
  );

/////////////////////////////////////////
//
function lang_logMsg(log_type, log_param1, log_param2, log_logid, log_text) {
    var strRet;

    if (parseInt(log_type) == LT_SYSTEM_STARTED) {
        strRet  = lang_log_type['SYSTEM'] + ": ";
        strRet += lang_log_message[log_type];
    } else if (parseInt(log_type) == LT_SYSTEM_SHUTDOWN) {
        strRet  = lang_log_type['SYSTEM'] + ": ";
        strRet += lang_log_message[log_type];
    } else if (parseInt(log_type) == LT_ABNORMAL_SHUTDOWN_DETECTED) {
        strRet  = lang_log_type['SYSTEM'] + ": ";
        strRet += lang_log_message[log_type];
    } else if (parseInt(log_type) == LT_SYSTEM_RECOVERED) {
        strRet  = lang_log_type['SYSTEM'] + ": ";
        strRet += lang_log_message[log_type];
    } else if (parseInt(log_type) == LT_SYSTEM_TIME_CHANGED) {
        strRet  = lang_log_type['SYSTEM'] + ": ";
        strRet += sprintf(lang_log_message[log_type], log_text);
    } else if (parseInt(log_type) == LT_SYSTEM_FW_UPGRADE) {
        strRet  = lang_log_type['SYSTEM'] + ": ";
        strRet += sprintf(lang_log_message[log_type], log_text);
    } else if (parseInt(log_type) == LT_SYSTEM_FORMAT) {
        strRet  = lang_log_type['SYSTEM'] + ": ";
        strRet += sprintf(lang_log_message[log_type], log_text);
    } else if (parseInt(log_type) == LT_SYSTEM_CHECKDISK) {
        strRet  = lang_log_type['SYSTEM'] + ": ";
        strRet += sprintf(lang_log_message[log_type], log_text);
    } else if (parseInt(log_type) == LT_LOCAL_LOG_ON) {
        strRet  = lang_logonoff_str[log_param2] + ": ";
        strRet += sprintf(lang_log_message[log_type],  log_text);
    } else if (parseInt(log_type) == LT_LOCAL_LOG_OFF) {
        strRet  = lang_logonoff_str[log_param2] + ": ";
        strRet += sprintf(lang_log_message[log_type],  log_text);
    } else if (parseInt(log_type) == LT_REMOTE_LOG_ON) {
        strRet  = lang_logonoff_str[log_param2] + ": ";

        var arr = log_text.split(":");
        strRet += sprintf(lang_log_message[log_type],  arr[0], arr[1]);
    } else if (parseInt(log_type) == LT_REMOTE_LOG_OFF) {
        strRet  = lang_logonoff_str[log_param2] + ": ";

        var arr = log_text.split(":");
        strRet += sprintf(lang_log_message[log_type],  arr[0], arr[1]);
    } else if (parseInt(log_type) == LT_RECORD_SETUP_CHANGED) {
        strRet  = lang_log_type['RECSET'] + ": ";
        strRet += sprintf(lang_recordsetup_str[log_param2], log_text);
    } else if (parseInt(log_type) == LT_SYSTEM_SETUP_CHANGED) {/*13*/
        strRet  = lang_log_type['SYSSET'] + ": ";
        strRet += sprintf(lang_systemsetup_str[log_param2], log_text);
    } else if (parseInt(log_type) == LT_SENSOR_INPUT) {
        strRet  = lang_log_type['SENSOR'] + ": ";
        strRet += sprintf(lang_sensor_str[log_param2], parseInt(log_param1)+1);
    } else if (parseInt(log_type) == LT_MOTION_DETECTION) {
        strRet  = lang_log_type['MOTION'] + ": ";
        strRet += sprintf(lang_motion_str[log_param2], parseInt(log_param1)+1);
    } else if (parseInt(log_type) == LT_VIDEO_IN) {
        strRet  = lang_log_type['VIDIN'] + ": ";
        strRet += sprintf(lang_log_message[log_type], (parseInt(log_param1)+1));
    } else if (parseInt(log_type) == LT_VIDEO_LOSS) {
        strRet  = lang_log_type['VIDLOS'] + ": ";
        strRet += sprintf(lang_log_message[log_type], (parseInt(log_param1)+1));
    } else if (parseInt(log_type) == LT_TAMPER_EVENT) {
        var ch = parseInt(log_param1) + 1;
        strRet  = lang_log_type['TAMPER'] + ": ";
        //strRet += sprintf(lang_log_message[log_type], ch);
        switch( parseInt(log_param2) )
        {
          case 0:
            strRet += sprintf(lang_tamperevt_str[log_param2], (parseInt(log_param1)+1));
            break;
          case 1:
            strRet += sprintf(lang_tamperevt_str[log_param2], (parseInt(log_param1)+1));
            break;
          case 2:
            strRet += sprintf(lang_tamperevt_str[log_param2], (parseInt(log_param1)+1));
            break;
        }
    } else if (parseInt(log_type) == LT_SMART_WARNING) {
        strRet  = lang_log_type['SMART'] + ": ";
        switch ( parseInt(log_param2) ) {
          case 0:
            strRet += sprintf(lang_log_message[log_type], log_param2);
            break;
          default:
            strRet += sprintf(lang_log_message[log_type], log_param2);
        }
    } else if (parseInt(log_type) == LT_DISK_EVENT) {
        //strRet = lang_log_message[log_type] + lang_diskevt_str[log_param2] + log_text;
        strRet  = lang_log_type['DISKEV'] + ": ";
        switch ( parseInt(log_param2) ) {
          case 0:
          case 6:
          case 7:
          case 8:
          case 9:
            strRet += lang_diskevt_str[log_param2];
            break;
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            strRet += sprintf(lang_diskevt_str[log_param2], log_text);
            break;

        }
    } else if (parseInt(log_type) == LT_HDD_FULL) {
        //strRet = lang_log_message[log_type] + lang_device_str[log_param1] + " " + lang_storage;
        strRet  = lang_log_type['DISKFU'] + ": ";
        strRet += sprintf(lang_log_message[log_type], lang_device_str[log_param1]);
    } else if (parseInt(log_type) == LT_HDD_OW) {
        //strRet = lang_log_message[log_type] + lang_device_str[log_param1] + " " + lang_storage;
        strRet  = lang_log_type['DISKOW'] + ": ";
        strRet += sprintf(lang_log_message[log_type], lang_device_str[log_param1]);
    } else if (parseInt(log_type) == LT_RECORD_STARTED) {
        //strRet = lang_rectype_str[log_param2] + " " + lang_log_message[log_type] + (parseInt(log_param1)+1);
        strRet  = lang_log_type['RECSTA'] + ": ";
        strRet += sprintf(lang_recstart_str[log_param2], (parseInt(log_param1)+1));
    } else if (parseInt(log_type) == LT_RECORD_STOPPED) {
        //strRet = lang_rectype_str[log_param2] + " " + lang_log_message[log_type] + (parseInt(log_param1)+1);
        strRet  = lang_log_type['RECSTP'] + ": ";
        strRet += sprintf(lang_recstop_str[log_param2], (parseInt(log_param1)+1));
    } else if (parseInt(log_type) == LT_SYSTEM_EVENT) {
        //strRet = lang_sysevt_str[log_param2] + lang_log_message[log_type] + log_text;
        strRet  = lang_log_type['SYSEVT'] + ": ";

        switch( parseInt(log_param2)) {
          case 0:
          case 1: // Archive Start
          case 2:
          case 3:
          case 4:
          case 5:
          case 8:
          case 10:
          case 18:
          case 20:
          case 21:
          case 22:
          case 23:
            strRet += sprintf(lang_sysevt_str[log_param2], log_text);
            break;
          case 6: // No Video not used
            break;
          case 26:
            strRet += sprintf(lang_sysevt_str[log_param2], log_text);
            break;
          default:
            strRet = lang_sysevt_str[log_param2];
        }
    } else if (parseInt(log_type) == LT_SYSTEM_DEBUG) {

    } else if (parseInt(log_type) == LT_SYSTEM_POS) {
        strRet  = "A POS text on ch #";
        strRet += log_text;
    } else if (parseInt(log_type) == LT_NETWORK_EVENT) { /* IPX */
        strRet  = lang_log_type['NETEVT'] + ": ";

        switch( parseInt(log_param2)) {
            case 4:
            case 5:
            case 6:
            case 7:
                strRet += sprintf(lang_log_netevt_str[log_param2], (parseInt(log_param1)+1));
                //strRet += sprintf(lang_log_netevt_str[log_type], (parseInt(log_param1)+1));
                break;
            case 8:
            case 9:
            case 10:
            case 11:
                strRet += sprintf(lang_log_netevt_str[log_param2], log_text);
                //strRet += sprintf(lang_log_netevt_str[log_type], log_text);
                break;
            case 20:
                var arr = log_text.split(":");
                strRet += sprintf(lang_log_netevt_str[log_param2],  arr[0], arr[1]);
                //strRet += sprintf(lang_log_netevt_str[log_type],  arr[0], arr[1]);
                break;
            case 21:
                var arr = log_text.split(",");
                strRet += sprintf(lang_log_netevt_str[log_param2],  (parseInt(arr[0]) + 1), arr[1]);
                break;
            default:
                strRet += lang_log_netevt_str[log_param2];
                //strRet += lang_log_netevt_str[log_type];

        }
    } else if (parseInt(log_type) == LT_IPCAM) { /* IPX */
        //strRet = lang_log_ipcam_str[log_param2] + (parseInt(log_param1)+1);
        strRet  = lang_log_type['IPCAM'] + ": ";
        strRet += sprintf(lang_log_ipcam_str[log_param2], (parseInt(log_param1)+1));
    } else if (parseInt(log_type) == LT_VCA_EVENT) { /* VCA */
        //strRet = lang_log_ipcam_str[log_param2] + (parseInt(log_param1)+1);

        strRet  = lang_log_type['VCA'] + ": ";
        strRet += sprintf(lang_log_vca_str[0], (parseInt(log_param1)+1),lang_vcaMsg(log_text));

    } else {
        strRet = lang_log_errMsg;
    }

    return strRet;
}

function lang_vcaMsg(msg) {
  var lang_IVCA = "";
  msg = parseInt(msg)
  switch(msg){
    case 0x00000001:
      lang_IVCA = langArray['LTXT_IVCA_ET_DIR_POS'];
      break;
    case 0x00000002:
      lang_IVCA = langArray['LTXT_IVCA_ET_DIR_NEG'];
      break;
    case 0x00000010:
      lang_IVCA = langArray['LTXT_IVCA_ET_ENTER'];
      break;
    case 0x00000020:
      lang_IVCA = langArray['LTXT_IVCA_ET_EXIT'];
      break;
    case 0x00000040:
      lang_IVCA = langArray['LTXT_IVCA_ET_STOPPED'];
      break;
    case 0x00000080:
      lang_IVCA = langArray['LTXT_IVCA_ET_ABANDONED'];
      break;
    case 0x00000100:
      lang_IVCA = langArray['LTXT_IVCA_ET_REMOVED'];
      break;
    case 0x00000200:
      lang_IVCA = langArray['LTXT_IVCA_ET_LOITERED'];
      break;
    case 0x00000400:
      lang_IVCA = langArray['LTXT_IVCA_ET_FALL'];
      break;
    case 0x00004000:
      lang_IVCA = langArray['LTXT_IVCA_ET_COUNTER'];
      break;
    case 0x00008000:
      lang_IVCA = langArray['LTXT_IVCA_ET_TAMPER'];
      break;
    case 0x00010000:
      lang_IVCA = langArray['LTXT_IVCA_ET_COLOR'];
      break;
    case 0x00020000:
      lang_IVCA = langArray['LTXT_IVCA_ET_SIZE'];
      break;
    case 0x00040000:
      lang_IVCA = langArray['LTXT_IVCA_ET_CLASS'];
      break;
    case 0x00080000:
      lang_IVCA = langArray['LTXT_IVCA_ET_SPEED'];
      break;
    default:
      //ETC
      lang_IVCA = langArray['LTXT_IVCA_ET_SPEED'];
      break;
  }

  return lang_IVCA;
}

function lang_errMsg() {
    displayChannel                  = langArray['LTXT_DISPLAYCHANNEL'];
    msgWait                         = langArray['LTXT_MSG_WAIT'];
    msgRunning                      = langArray['LTXT_MSG_RUN'];
    msgalready                      = langArray['LTXT_MSG_ALREADY'];
    errMsg                          = langArray['LTXT_ERR_MSG'];
    errComplete                     = langArray['LTXT_ERR_COMPLETE'];
    errFail                         = langArray['LTXT_ERR_FAIL'];
    errSuccess                      = langArray['LTXT_ERR_SUCCESS'];
    errFieldAsterisk                = langArray['LTXT_ERR_FIELDASTERISK'];
    errFieldEmpty                   = langArray['LTXT_ERR_FIELDEMPTY'];
    errFieldLenOver                 = langArray['LTXT_ERR_FIELDLENOVER'];
    errFieldLenShort                = langArray['LTXT_ERR_FIELDLENSHORT'];
    errFieldValOver                 = langArray['LTXT_ERR_FIELDVALOVER'];
    errFieldValOverFPS              = langArray['LTXT_ERR_FIELDVALOVERFPS'];
    errFieldValLess                 = langArray['LTXT_ERR_FIELDVALLESS'];
    errSpecialChar                  = langArray['LTXT_ERR_SPECIALCHAR'];
    errEmail                        = langArray['LTXT_ERR_EMAIL'];
    errLanguage                     = langArray['LTXT_ERR_LANGUAGE'];
    errDDNSFieldEmpty               = langArray['LTXT_ERR_DDNSFIELDEMPTY'];
    errDDNSSave                     = langArray['LTXT_ERR_DDNSSAVE'];
    delMsg                          = langArray['LTXT_DELMSG'];
    saveMsg                         = langArray['LTXT_SAVEMSG'];
    errdate                         = langArray['LTXT_ERR_DATE'];
    covertOSDMsg0                   = langArray['LTXT_CVTOSDMSG0'];
    covertOSDMsg1                   = langArray['LTXT_CVTOSDMSG1'];
    covertOSDMsg2                   = langArray['LTXT_CVTOSDMSG2'];
    noVideoOSDMsg                   = langArray['LTXT_CVTOSDMSG0'];
    invalidVideoOSDMsg              = langArray['LTXT_INVALID_VIDEO_MSG'];
    vlossOSDMsg                     = langArray['LTXT_VLOSSOSDMSG'];
    browerErrMsg                    = langArray['LTXT_BROWERERRMSG'];
    errNoPermission                 = langArray['LTXT_ERR_NOPERMISSION'];
    errVideoCovert                  = langArray['LTXT_ERR_VIDEO_COVERT'];
    errVideoLossOrNo                = langArray['LTXT_ERR_VIDEO_LOSS_OR_NO'];
    errVideoCovert                  = langArray['LTXT_ERR_VIDEO_COVERT'];
    errVideoLossOrNo                = langArray['LTXT_ERR_VIDEO_LOSS_OR_NO'];
    errSend                         = langArray['LTXT_ERR_SEND'];
    errReceive                      = langArray['LTXT_ERR_RECV'];
    errLiveSaveStop                 = langArray['LTXT_ERR_LIVESAVESTOP'];
    errAuxSupport                   = langArray['LTXT_ERR_AUX_SUPPORT'];
    errAuxSelectChannel             = langArray['LTXT_ERR_AUX_SELECT_CHANNEL'];
    errLiveBackupHdd                = langArray['LTXT_ERR_LIVEBACKUP_HDD'];
    errDisconnectNetwork            = langArray['LTXT_ERR_NETWORK'];
    errRecordingSetting             = langArray['LTXT_ERR_RECORDINGSETTING'];
    errMaxClientConnect             = langArray['LTXT_ERR_MAXCLIENTCONNECT'];
    errUserPasswd                   = langArray['LTXT_ERR_USERPASSWD'];
    errCovertedCh                   = langArray['LTXT_ERR_CURRENT_CH_COVERTED'];
    errNoImageCanCapture            = langArray['LTXT_ERR_NO_IMAGE_CAN_CAPTURE'];
    errFailSnapshot                 = langArray['LTXT_ERR_SNAPSHOT_FAILED'];
    if(bNVR)
    {
      // errDisconnectArchive         = langArray['LTXT_ERR_RUNARCH_NVR'];
      errDisconnectIpFactoryDefalut   = langArray['LTXT_ERR_FACTORYDEFAULT_NVR'];
      errDisconnectIpDiskMan          = langArray['LTXT_ERR_DISKMAN_NVR'];
      errDisconnectIpSysdbLoad        = langArray['LTXT_ERR_SYSDBLOAD_NVR'];
      errDisconnectIpUserMan          = langArray['LTXT_ERR_USERMAN_NVR'];
      errDisconnectFwUpgrade          = langArray['LTXT_ERR_FWUPGRAGE_NVR'];
      errDisconnectTimeChange         = langArray['LTXT_ERR_TIMECHANGE_NVR'];
      errDisconnectPowerOff           = langArray['LTXT_ERR_POWEROFF_NVR'];
      errDisconnectDiskFormat         = langArray['LTXT_ERR_DISKFORMAT_NVR'];
      errDisconnectIpChange           = langArray['LTXT_ERR_IPCHANGE_NVR'];
      errNoDisk                       = langArray['LTXT_ERR_NODISK_NVR'];
      errDisconnect                   = langArray['LTXT_ERR_DISCONNECT_NVR'];
      errFileSystem                   = langArray['LTXT_ERR_FILESYSTEM_NOT_READY_NVR'];
      dvrinsetup                      = langArray['LTXT_ERR_NVRINSETUP'];
      dvrinarchive                    = langArray['LTXT_ERR_NVRINARCH'];
    }
    else
    {
      // errDisconnectArchive         = langArray['LTXT_ERR_RUNARCH_DVR'];
      errDisconnectIpFactoryDefalut   = langArray['LTXT_ERR_FACTORYDEFAULT_DVR'];
      errDisconnectIpDiskMan          = langArray['LTXT_ERR_DISKMAN_DVR'];
      errDisconnectIpSysdbLoad        = langArray['LTXT_ERR_SYSDBLOAD_DVR'];
      errDisconnectIpUserMan          = langArray['LTXT_ERR_USERMAN_DVR'];
      errDisconnectFwUpgrade          = langArray['LTXT_ERR_FWUPGRAGE_DVR'];
      errDisconnectTimeChange         = langArray['LTXT_ERR_TIMECHANGE_DVR'];
      errDisconnectPowerOff           = langArray['LTXT_ERR_POWEROFF_DVR'];
      errDisconnectDiskFormat         = langArray['LTXT_ERR_DISKFORMAT_DVR'];
      errDisconnectIpChange           = langArray['LTXT_ERR_IPCHANGE_DVR'];
      errNoDisk                       = langArray['LTXT_ERR_NODISK_DVR'];
      errDisconnect                   = langArray['LTXT_ERR_DISCONNECT_DVR'];
      errFileSystem                   = langArray['LTXT_ERR_FILESYSTEM_NOT_READY_DVR'];
      dvrinsetup                      = langArray['LTXT_ERR_DVRINSETUP'];
      dvrinarchive                    = langArray['LTXT_ERR_DVRINARCH'];
    }
}

function lang_TopMenu() {
    var str = '';
    str += '$span&lang_Live='               + langArray['LTXT_LIVE'];
    str += '$span&lang_Playback='           + langArray['LTXT_PLAYBACK'];



    str += '$span&lang_Infomation='         + langArray['LTXT_INFOMATION'];
    if(INFO_VENDOR=='ALSOK') {
      str += '$span&lang_ANFWEBRemoteViewer=' + langArray['LTXT_ANFWEBREMOTEVIEWER'].toUpperCase();
      str += '$span&lang_ANFtitle='           + langArray['LTXT_ANFTITLE'].toUpperCase();
      str += '$span&lang_Setup='              + langArray['LTXT_MENU_SETUP'];
    } else {
      str += '$span&lang_ANFWEBRemoteViewer=' + langArray['LTXT_ANFWEBREMOTEVIEWER'];
      str += '$span&lang_ANFtitle='           + langArray['LTXT_ANFTITLE'];
      str += '$span&lang_Setup='              + langArray['LTXT_SETUP'];
    }

    return str;
}

function lang_LiveDisplayMenu() {
    var str = '';
    str += '$alt&lang_1Division='+	   langArray['LTXT_LIVEDISP_1DIVISION'];
    str += '$alt&lang_4Division='+     langArray['LTXT_LIVEDISP_4DIVISION'];
    str += '$alt&lang_8Division='+     langArray['LTXT_LIVEDISP_8DIVISION'];
    str += '$alt&lang_9Division='+     langArray['LTXT_LIVEDISP_9DIVISION'];
    str += '$alt&lang_16Division='+    langArray['LTXT_LIVEDISP_16DIVISION'];
    str += '$alt&lang_severaldisp='+   langArray['LTXT_LIVEDISP_SEVERALDISP'];
    str += '$alt&lang_onedisp='+       langArray['LTXT_LIVEDISP_ONEDISP'];
    str += '$alt&lang_zoom='+       langArray['LTXT_LIVE_PTZZOOM'];
    str += '$alt&lang_fullscreen='+    langArray['LTXT_LIVEDISP_FULLSCREEN'];
    str += '$alt&lang_save='+          langArray['LTXT_LIVEDISP_SAVE'];
    str += '$alt&lang_save_stop='+     langArray['LTXT_LIVEDISP_SAVE_STOP'];
    str += '$alt&lang_print='+         langArray['LTXT_LIVEDISP_PRINT'];
    str += '$alt&lang_captureimage='+  langArray['LTXT_LIVEDISP_CAPTUREIMAGE'];
    str += '$alt&lang_setting='+  	   langArray['LTXT_LIVEDISP_SETTING'];
    str += '$alt&lang_liveaudio='+	   langArray['LTXT_LIVEDISP_AUDIO'];
    str += '$alt&lang_speaker='+	   langArray['LTXT_LIVEDISP_SPEAKER'];

    return str;
}

function lang_setupOkCancel() {
    var str;
    str = '$value&lang_OK='+			langArray['LTXT_SETUP_APPLY'];
    str += '$value&lang_CANCEL='+		langArray['LTXT_CANCEL'] ;


    str += '$span&lang_OK='+      langArray['LTXT_SETUP_APPLY'];
    str += '$span&lang_CANCEL='+   langArray['LTXT_CANCEL'] ;

    return str;
}

function lang_setupChannel() {
    var str;
    str = '$span&lang_ch1='+				langArray['LTXT_CHANNEL_CH1'];
    str += '$span&lang_ch2='+			langArray['LTXT_CHANNEL_CH2'];
    str += '$span&lang_ch3='+			langArray['LTXT_CHANNEL_CH3'];
    str += '$span&lang_ch4='+			langArray['LTXT_CHANNEL_CH4'];
    str += '$span&lang_ch5='+			langArray['LTXT_CHANNEL_CH5'];
    str += '$span&lang_ch6='+			langArray['LTXT_CHANNEL_CH6'];
    str += '$span&lang_ch7='+			langArray['LTXT_CHANNEL_CH7'];
    str += '$span&lang_ch8='+			langArray['LTXT_CHANNEL_CH8'];
    str += '$span&lang_ch9='+			langArray['LTXT_CHANNEL_CH9'];
    str += '$span&lang_ch10='+			langArray['LTXT_CHANNEL_CH10'];
    str += '$span&lang_ch11='+			langArray['LTXT_CHANNEL_CH11'];
    str += '$span&lang_ch12='+			langArray['LTXT_CHANNEL_CH12'];
    str += '$span&lang_ch13='+			langArray['LTXT_CHANNEL_CH13'];
    str += '$span&lang_ch14='+			langArray['LTXT_CHANNEL_CH14'];
    str += '$span&lang_ch15='+			langArray['LTXT_CHANNEL_CH15'];
    str += '$span&lang_ch16='+			langArray['LTXT_CHANNEL_CH16'];

    if(INFO_VENDOR=='ALSOK') {
      str += '$span&lang_CAM='+                    langArray['LTXT_SEARCHBYTEXTSEARCH_ELECTRIC_PATH'];
    } else {
      str += '$span&lang_CAM='+                    langArray['LTXT_SETUP_CAM'];
    }


    return str;
}

function lang_setupRecTitle() {
    var str;

    str  = '$span&lang_Size='+		 langArray['LTXT_RECTITLE_SIZE'];
    str += '$span&lang_FrameRate='+      langArray['LTXT_RECTITLE_FPS'];
    str += '$span&lang_Quality='+        langArray['LTXT_RECTITLE_QUALITY'];
    if(INFO_VENDOR == "TAKENAKA") {
      str += '$span&lang_Audio='+          langArray['LTXT_RECTITLE_SOUND'];
    } else {
      str += '$span&lang_Audio='+          langArray['LTXT_RECTITLE_AUDIO'];
    }
    str += '$span&lang_FPS='+            langArray['LTXT_RECTITLE_FPS'];
    str += '$span&lang_remmain='+        langArray['LTXT_RECTITLE_REMMAIN'];

    str += '$span&lang_RecParam='+        langArray['LTXT_RECTITLE_SIZEFPSQUALITY'];
    str += '$span&lang_RecSched='+        langArray['LTXT_RECTITLE_SCHEDULE'];

    return str;
}

function lang_setupMenu() {
    var str;
    str = '$divimg&lang_MenuCamera='+       langArray['LTXT_SETUPMENU_CAMERA'];
    str += '$divimg&lang_MenuDisplay='+     langArray['LTXT_SETUPMENU_DISPLAY'];
    if(INFO_VENDOR == "TAKENAKA") {
      str += '$divimg&lang_MenuAudio='+       langArray['LTXT_SETUPMENU_SOUND'];
    } else {
      str += '$divimg&lang_MenuAudio='+       langArray['LTXT_SETUPMENU_AUDIO'];
    }
    str += '$divimg&lang_MenuSystem='+      langArray['LTXT_SETUPMENU_SYSTEM'];
    str += '$divimg&lang_MenuRecord='+      langArray['LTXT_SETUPMENU_RECORD'];
    str += '$divimg&lang_MenuUser='+        langArray['LTXT_SETUPMENU_USER'];
    str += '$divimg&lang_MenuNetwork='+     langArray['LTXT_SETUPMENU_NETWORK'];
    str += '$divimg&lang_MenuEventSensor='+	langArray['LTXT_SETUPMENU_EVENTSENSOR'];

    /* chcha for IPX 2011-03-16 */
    str += '$divimg&lang_MenuStorage='+     langArray['LTXT_SETUPMENU_STORAGE'];


    //seongjae span add
    str += '$span&lang_MenuCameraSpan='+       langArray['LTXT_SETUPMENU_CAMERA'];
    str += '$span&lang_MenuDisplaySpan='+     langArray['LTXT_SETUPMENU_DISPLAY'];
    str += '$span&lang_MenuAudioSpan='+       langArray['LTXT_SETUPMENU_AUDIO'];
    str += '$span&lang_MenuSystemSpan='+      langArray['LTXT_SETUPMENU_SYSTEM'];
    str += '$span&lang_MenuRecordSpan='+      langArray['LTXT_SETUPMENU_RECORD'];
    str += '$span&lang_MenuUserSpan='+        langArray['LTXT_SETUPMENU_USER'];
    str += '$span&lang_MenuNetworkSpan='+     langArray['LTXT_SETUPMENU_NETWORK'];
    str += '$span&lang_MenuEventSensorSpan='+ langArray['LTXT_SETUPMENU_EVENTSENSOR'];

    /* chcha for IPX 2011-03-16 */
    str += '$span&lang_MenuStorageSpan='+     langArray['LTXT_SETUPMENU_STORAGE'];

    return str;
}

function lang_setupCameraMenu() {
    var str = "";
    str += '$divimg&lang_MenuCamCamInst='       + langArray['LTXT_SETUPMENU_CAM_CAMERAINSTALLATION'];
    str += '$divimg&lang_MenuCamIPCamera='      + langArray['LTXT_SETUPMENU_CAM_IPCAMERA'];
    if(INFO_VENDOR==='ALSOK') {
      str += '$divimg&lang_MenuCamTitle='         + langArray['LTXT_SETUPMENU_CAM_TITLE_SETUP'];
      str += '$divimg&lang_MenuCamMotion='        + langArray['LTXT_SETUPMENU_CAM_MOTION_SETUP'];
    } else {
      str += '$divimg&lang_MenuCamTitle='         + langArray['LTXT_SETUPMENU_CAM_TITLE'];
      str += '$divimg&lang_MenuCamMotion='        + langArray['LTXT_SETUPMENU_EVENT_MOTIONSENSOR'];
    }
    str += '$divimg&lang_MenuCamImage='         + langArray['LTXT_SETUPMENU_CAM_IMAGE'];
    str += '$divimg&lang_MenuCamCameraSetup='   + langArray['LTXT_SETUPMENU_CAM_CAMSETUP'];
    str += '$divimg&lang_MenuCamCovert='        + langArray['LTXT_SETUPMENU_CAM_COVERT'];
    str += '$divimg&lang_MenuCamPTZ='           + langArray['LTXT_SETUPMENU_CAM_PTZ'];
    str += '$divimg&lang_MenuCamPrivMask='      + langArray['LTXT_SETUPMENU_CAM_PRIVMASK'];
    str += '$divimg&lang_MenuCamType='          + langArray['LTXT_SETUPMENU_CAM_TYPE'];
    str += '$divimg&lang_MenuCamTamper='        + langArray['LTXT_SETUPMENU_CAM_TAMPER'];
    str += '$divimg&lang_MenuCamVcasetup='      + langArray['LTXT_VCA_SETUP'];
    str += '$divimg&lang_MenuCamInstMode='      + langArray['LTXT_SETUPMENU_CAM_INSTALLATION_MODE'];
    str += '$divimg&lang_MenuCamAnalogType='    + langArray['LTXT_SETUPCAMTYPESETUP'];

    str += '$span&lang_MenuCamCamInstSpan='     + langArray['LTXT_SETUPMENU_CAM_CAMERAINSTALLATION'];
    str += '$span&lang_MenuCamIPCameraSpan='    + langArray['LTXT_SETUPMENU_CAM_IPCAMERA'];
    str += '$span&lang_MenuCamTitleSpan='       + langArray['LTXT_SETUPMENU_CAM_TITLE'];
    str += '$span&lang_MenuCamImageSpan='       + langArray['LTXT_SETUPMENU_CAM_IMAGE'];
    str += '$span&lang_MenuCamCameraSetupSpan=' + langArray['LTXT_SETUPMENU_CAM_CAMSETUP'];
    str += '$span&lang_MenuCamCovertSpan='      + langArray['LTXT_SETUPMENU_CAM_COVERT'];
    str += '$span&lang_MenuCamPTZSpan='         + langArray['LTXT_SETUPMENU_CAM_PTZ'];
    str += '$span&lang_MenuCamMotionSpan='      + langArray['LTXT_SETUPMENU_EVENT_MOTIONSENSOR'];
    str += '$span&lang_MenuCamPrivMaskSpan='    + langArray['LTXT_SETUPMENU_CAM_PRIVMASK'];
    str += '$span&lang_MenuCamTypeSpan='        + langArray['LTXT_SETUPMENU_CAM_TYPE'];
    str += '$span&lang_MenuCamTamperSpan='      + langArray['LTXT_SETUPMENU_CAM_TAMPER'];
    str += '$span&lang_MenuCamInstModeSpan='    + langArray['LTXT_SETUPMENU_CAM_INSTALLATION_MODE'];
    str += '$span&lang_MenuCamAnalogTypeSpan='      + langArray['LTXT_SETUPCAMTYPESETUP'];


    return str;
}

function lang_setupDisplayMenu() {
    var str = "";
    if(INFO_VENDOR=='ALSOK') {
      str += '$divimg&lang_MenuDispOsd='+      langArray['LTXT_SETUPDISPOSD_DATA_MARK_SETUP'];
      str += '$span&lang_MenuDispOsdSpan='+      langArray['LTXT_SETUPDISPOSD_DATA_MARK_SETUP'];
    } else {
      str += '$divimg&lang_MenuDispOsd='+      langArray['LTXT_SETUPMENU_DISP_OSD'];
      str += '$span&lang_MenuDispOsdSpan='+      langArray['LTXT_SETUPMENU_DISP_OSD'];
    }

    str += '$divimg&lang_MenuDispMonitor='+	 langArray['LTXT_SETUPMENU_DISP_MONITOR'];
    str += '$divimg&lang_MenuDispSeq='+      langArray['LTXT_SETUPMENU_DISP_SEQ'];
    str += '$divimg&lang_MenuDispSpot='+     langArray['LTXT_SETUPMENU_DISP_SPOT'];

    str += '$span&lang_MenuDispOsdSpan='+      langArray['LTXT_SETUPMENU_DISP_OSD'];
    str += '$span&lang_MenuDispMonitorSpan='+  langArray['LTXT_SETUPMENU_DISP_MONITOR'];
    str += '$span&lang_MenuDispSeqSpan='+      langArray['LTXT_SETUPMENU_DISP_SEQ'];
    str += '$span&lang_MenuDispSpotSpan='+     langArray['LTXT_SETUPMENU_DISP_SPOT'];

    return str;
}

function lang_setupSoundMenu() {
    var str;
    str = '$divimg&lang_MenuSoundAudio='+	langArray['LTXT_SETUPMENU_SOUND_AUDIO_BUZZER'];

    str += '$span&lang_MenuSoundAudioSpan='+ langArray['LTXT_SETUPMENU_SOUND_AUDIO_BUZZER'];
    return str;
}

function lang_setupSystemMenu() {
    var str = "";

    if (INFO_VENDOR=='ALSOK') {
      str += '$divimg&lang_MenuSysManagement='+        langArray['LTXT_SETUPSYSMANAGE_SYSTEMMANAGEMENTSETUP'];
      str += '$span&lang_MenuSysManagementSpan='+        langArray['LTXT_SETUPSYSMANAGE_SYSTEMMANAGEMENTSETUP'];
      str += '$divimg&lang_MenuSysDateTime='+          langArray['LTXT_SEARCHBYEVENT_DATETIME_SETUP'];
      str += '$span&lang_MenuSysDateTimeSpan='+          langArray['LTXT_SETUPMENU_SYS_DATETIME'];
    } else {
      str += '$divimg&lang_MenuSysManagement='+        langArray['LTXT_SETUPMENU_SYS_MANAGEMENT'];
      str += '$span&lang_MenuSysManagementSpan='+        langArray['LTXT_SETUPMENU_SYS_MANAGEMENT'];
      str += '$divimg&lang_MenuSysDateTime='+          langArray['LTXT_SETUPMENU_SYS_DATETIME'];
      str += '$span&lang_MenuSysManagementSpan='+        langArray['LTXT_SETUPMENU_SYS_MANAGEMENT'];
    }

    str += '$divimg&lang_MenuSysInformation='+       langArray['LTXT_SETUPMENU_SYS_INFORMATION'];
    if ( INFO_VENDOR == "SAMSUNG" ) {
        str += '$divimg&lang_MenuSysControlDevice='+  langArray['LTXT_SETUPMENU_SYS_CONTROLDEVICE_SAMSUNG'];
    } else {
        str += '$divimg&lang_MenuSysControlDevice='+  langArray['LTXT_SETUPMENU_SYS_CONTROLDEVICE'];
    }
    str += '$divimg&lang_MenuSysSecurity='+       langArray['LTXT_SETUPMENU_SYS_SECURITY'];

    str += '$span&lang_MenuSysInformationSpan='+       langArray['LTXT_SETUPMENU_SYS_INFORMATION'];
    if ( INFO_VENDOR == "SAMSUNG" ) {
        str += '$span&lang_MenuSysControlDeviceSpan='+  langArray['LTXT_SETUPMENU_SYS_CONTROLDEVICE_SAMSUNG'];
    } else {
        str += '$span&lang_MenuSysControlDeviceSpan='+  langArray['LTXT_SETUPMENU_SYS_CONTROLDEVICE'];
    }
    str += '$span&lang_MenuSysSecuritySpan='+       langArray['LTXT_SETUPMENU_SYS_SECURITY'];

    return str;
}

function lang_setupRecordMenu() {
    var str = "";
    str += '$divimg&lang_MenuRecRecordingoperation='+			langArray['LTXT_SETUPMENU_REC_RECORDINGOPERATION'];
    str += '$divimg&lang_MenuRecContinuousRecording='+          langArray['LTXT_SETUPMENU_REC_CONTINUOUSRECORDING'];
    str += '$divimg&lang_MenuRecMotionRecording='+              langArray['LTXT_SETUPMENU_REC_MOTIONRECORDING'];
    str += '$divimg&lang_MenuRecAlarmrecording='+               langArray['LTXT_SETUPMENU_REC_ALARMRECORDING'];
    str += '$divimg&lang_MenuRecPanicrecording='+               langArray['LTXT_SETUPMENU_REC_PANICRECORDING'];

    str += '$divimg&lang_MenuRecNetStreaming='+               langArray['LTXT_SETUPMENU_REC_NETSTREAMING'];
    str += '$divimg&lang_MenuRecStorageCalc='+                 langArray['LTXT_SETUPMENU_REC_STORAGECALC'];
    str += '$divimg&lang_MenuRecAudioMapping='+                 langArray['LTXT_AUDIO_MAPPING'];



    str += '$span&lang_MenuRecRecordingoperationSpan='+     langArray['LTXT_SETUPMENU_REC_RECORDINGOPERATION'];
    str += '$span&lang_MenuRecContinuousRecordingSpan='+          langArray['LTXT_SETUPMENU_REC_CONTINUOUSRECORDING'];
    str += '$span&lang_MenuRecMotionRecordingSpan='+              langArray['LTXT_SETUPMENU_REC_MOTIONRECORDING'];
    str += '$span&lang_MenuRecAlarmrecordingSpan='+               langArray['LTXT_SETUPMENU_REC_ALARMRECORDING'];
    str += '$span&lang_MenuRecPanicrecordingSpan='+               langArray['LTXT_SETUPMENU_REC_PANICRECORDING'];

    str += '$span&lang_MenuRecNetStreamingSpan='+               langArray['LTXT_SETUPMENU_REC_NETSTREAMING'];
    str += '$span&lang_MenuRecStorageCalcSpan='+                 langArray['LTXT_SETUPMENU_REC_STORAGECALC'];
    str += '$span&lang_MenuRecAudioMappingSpan='+                 langArray['LTXT_AUDIO_MAPPING'];

    return str;
}

function lang_setupUserMenu() {
    var str;

    if(INFO_VENDOR=='ALSOK') {
      str = '$divimg&lang_MenuUsermanagement='+       langArray['LTXT_SETUPUSERMANAGEMENT_USERMANAGEMENTSETUP'];
      str += '$span&lang_MenuUsermanagementSpan='+       langArray['LTXT_SETUPUSERMANAGEMENT_USERMANAGEMENTSETUP'];
      str += '$divimg&lang_MenuGroupAuthority='+       langArray['LTXT_SETUPUSERAUTHORITY_USERAUTHORITYSETUP'];
      str += '$span&lang_MenuGroupAuthoritySpan='+       langArray['LTXT_SETUPUSERAUTHORITY_USERAUTHORITYSETUP'];
    } else {
      str = '$divimg&lang_MenuUsermanagement='+       langArray['LTXT_SETUPMENU_USER_MANAGEMENT'];
      str += '$span&lang_MenuUsermanagementSpan='+       langArray['LTXT_SETUPMENU_USER_MANAGEMENT'];
      str += '$divimg&lang_MenuGroupAuthority='+       langArray['LTXT_SETUPMENU_GROUP_AUTHORITY'];
      str += '$span&lang_MenuGroupAuthoritySpan='+       langArray['LTXT_SETUPMENU_GROUP_AUTHORITY'];
    }

    str += '$divimg&lang_MenuUserLogout='+      langArray['LTXT_SETUPMENU_USER_LOGOUT'];


    str += '$span&lang_MenuUserLogoutSpan='+      langArray['LTXT_SETUPMENU_USER_LOGOUT'];

    return str;
}

function lang_setupNetMenu() {
    var str = "";

    if(INFO_VENDOR==='ALSOK') {
      str += '$divimg&lang_MenuEmail='+			   langArray['LTXT_SETUPMENU_NET_MAIL_SETUP'];
      str += '$span&lang_MenuEmailSpan='+        langArray['LTXT_SETUPMENU_NET_MAIL_SETUP'];
      str += '$divimg&lang_ddnssetup='+            langArray['LTXT_DDNS_SETUP'];
      str += '$span&lang_ddnssetupSpan='+            langArray['LTXT_DDNS_SETUP'];
      str += '$divimg&lang_MenuDDNS='+               langArray['LTXT_SETUPUSERIPSETUP_DDNS'];
      str += '$span&lang_MenuDDNSSpan='+               langArray['LTXT_SETUPUSERIPSETUP_DDNS'];
    } else {
      str += '$divimg&lang_MenuEmail='+        langArray['LTXT_SETUPMENU_NET_EMAIL'];
      str += '$span&lang_MenuEmailSpan='+        langArray['LTXT_SETUPMENU_NET_EMAIL'];
    }

    str += '$divimg&lang_MenuIPsetup='+            langArray['LTXT_SETUPMENU_NET_IPSETUP'];
    str += '$divimg&lang_MenuNetStatus='+          langArray['LTXT_SETUPMENU_NET_STATUS'];
    str += '$divimg&lang_MenuNetSecurity='+       langArray['LTXT_SETUPMENU_SYS_SECURITY'];


    str += '$span&lang_MenuIPsetupSpan='+            langArray['LTXT_SETUPMENU_NET_IPSETUP'];
    str += '$span&lang_MenuNetStatusSpan='+          langArray['LTXT_SETUPMENU_NET_STATUS'];
    str += '$span&lang_MenuNetSecuritySpan='+       langArray['LTXT_SETUPMENU_SYS_SECURITY'];
    return str;
}

/* event & action */
function lang_setupEventMenu() {
    var str = "";

    if(INFO_VENDOR==='ALSOK') {
      str += '$divimg&lang_MenuAlarmoutput='+         langArray['LTXT_SETUPMENU_EVENT_ALARMOUTPUT_SETUP'];
      str += '$span&lang_MenuAlarmoutputSpan='+         langArray['LTXT_SETUPMENU_EVENT_ALARMOUTPUT'];
      str += '$divimg&lang_MenuMotionsensor='+       langArray['LTXT_SETUPMENU_EVENT_MOTIONDETECTION'];
      str += '$divimg&lang_MenuVideoloss='+          langArray['LTXT_SETUPMENU_EVENT_VIDEOLOSS_SETUP'];
      str += '$span&lang_MenuVideolossSpan='+          langArray['LTXT_SETUPMENU_EVENT_VIDEOLOSS_SETUP'];
    } else {
      str += '$divimg&lang_MenuAlarmoutput='+         langArray['LTXT_SETUPMENU_EVENT_ALARMOUTPUT'];
      str += '$span&lang_MenuAlarmoutputSpan='+         langArray['LTXT_SETUPMENU_EVENT_ALARMOUTPUT'];
      str += '$divimg&lang_MenuMotionsensor='+       langArray['LTXT_SETUPMENU_EVENT_MOTIONSENSOR'];
      str += '$divimg&lang_MenuVideoloss='+          langArray['LTXT_SETUPMENU_EVENT_VIDEOLOSS'];
      str += '$span&lang_MenuVideolossSpan='+          langArray['LTXT_SETUPMENU_EVENT_VIDEOLOSS'];
    }

    str += '$divimg&lang_MenuNotification='+       langArray['LTXT_SETUPMENU_EVENT_NOTIFICATION'];
    str += '$divimg&lang_MenuAlarmsensor='+        langArray['LTXT_SETUPMENU_EVENT_ALARMSENSOR'];
    str += '$divimg&lang_MenuTamper='+              langArray['LTXT_SETUPMENU_EVENT_TAMPER'];
    str += '$divimg&lang_MenuSysevent='+           langArray['LTXT_SETUPMENU_EVENT_SYSEVENT'];
    str += '$divimg&lang_MenuVCA='+           langArray['LTXT_SETUPMENU_VCA_EVENT'];
    //str += '$divimg&lang_MenuTextin='+             langArray['LTXT_SETUPMENU_EVENT_TEXTIN'];


    str += '$span&lang_MenuNotificationSpan='+       langArray['LTXT_SETUPMENU_EVENT_NOTIFICATION'];
    str += '$span&lang_MenuAlarmsensorSpan='+        langArray['LTXT_SETUPMENU_EVENT_ALARMSENSOR'];
    str += '$span&lang_MenuMotionsensorSpan='+       langArray['LTXT_SETUPMENU_EVENT_MOTIONDETECTION'];
    str += '$span&lang_MenuTamperSpan='+              langArray['LTXT_SETUPMENU_EVENT_TAMPER'];
    str += '$span&lang_MenuSyseventSpan='+           langArray['LTXT_SETUPMENU_EVENT_SYSEVENT'];

    return str;
}

/* added by chcha for IPX 2011-03-16 */
function lang_setupStorageMenu() {
    var str = "";

    if(INFO_VENDOR=='ALSOK') {
      str += '$divimg&lang_MenuStorageDiskOP='+          langArray['LTXT_SETUPSTORAGE_DISK_OPERATIONS_SETUP'];
    } else {
      str += '$divimg&lang_MenuStorageDiskOP='+          langArray['LTXT_SETUPSTORAGE_DISK_OPERATIONS'];
    }

    str += '$divimg&lang_MenuStorageDiskinfo='+        langArray['LTXT_SETUPMENU_STORAGE_DISKINFO'];
    str += '$divimg&lang_MenuStorageDiskConf='+        langArray['LTXT_SETUPMENU_STORAGE_DISKCONF'];
    str += '$divimg&lang_MenuStorageSmart='+           langArray['LTXT_SETUPMENU_STORAGE_SMART'];

    str += '$span&lang_MenuStorageInternal='+        langArray['LTXT_INTERNAL'];
    str += '$span&lang_MenuStorageExternal='+        langArray['LTXT_EXTERNAL'];


    return str;
}

function lang_part(part) {
    var str = '';

    if (part == 'LIVE') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_refreshtime='+     langArray['LTXT_LIVE_UPDATEINTERVAL'];
          str += '$span&lang_lognumber='+       langArray['LTXT_NUMBER_NO'];
          str += '$span&lang_ChannelNo='+       langArray['LTXT_CHANNEL_NO'];
        } else {
          str += '$span&lang_refreshtime='+     langArray['LTXT_LIVE_REFRESHTIME'];
          str += '$span&lang_lognumber='+       "No.";
          str += '$span&lang_ChannelNo='+				langArray['LTXT_LIVE_CHANNELNO'];
        }

        str += '$span&lang_Alarm='+                  langArray['LTXT_LIVE_ALARM'];

        if( bNVR ) {
          str += '$span&lang_AlarmInDVR='+             langArray['LTXT_LIVE_ALARMIN_NVR'];
          str += '$span&lang_AlarmoutDVR='+            langArray['LTXT_LIVE_ALARMOUT_NVR'];
        } else {
          str += '$span&lang_AlarmInDVR='+             langArray['LTXT_LIVE_ALARMIN_DVR'];
          str += '$span&lang_AlarmoutDVR='+            langArray['LTXT_LIVE_ALARMOUT_DVR'];
        }

        str += '$span&lang_AlarmInCAM='+             langArray['LTXT_LIVE_ALARMIN_CAM'];
        str += '$span&lang_Alarm='+                  langArray['LTXT_LIVE_ALARM'];
        str += '$span&lang_Motion='+                 langArray['LTXT_LIVE_MOTION'];
        str += '$span&lang_Videoloss='+              langArray['LTXT_LIVE_VIDEOLOSS'];
        str += '$span&lang_Recording='+              langArray['LTXT_LIVE_RECORDING'];
        str += '$span&lang_Alarmout='+               langArray['LTXT_LIVE_ALARMOUT'];
        str += '$span&lang_AlarmoutCAM='+            langArray['LTXT_LIVE_ALARMOUT_CAM'];
        str += '$span&lang_Status='+                 langArray['LTXT_LIVE_STATUS'];
        str += '$span&lang_Log='+                    langArray['LTXT_LIVE_LOG'];
        str += '$span&lang_PTZ='+                    langArray['LTXT_LIVE_PTZ'];
        str += '$span&lang_logchnum='+               langArray['LTXT_LIVE_LOGCHNUM'];
        str += '$span&lang_logcamtitle='+            langArray['LTXT_LIVE_LOGCAMTITLE'];
        str += '$span&lang_logdatetime='+            langArray['LTXT_LIVE_LOGDATETIME'];
        str += '$span&lang_loglog='+                 langArray['LTXT_LIVE_LOGLOG'];
        str += '$span&lang_ptzPattern='+             langArray['LTXT_LIVE_PTZPATTERN'];
        str += '$span&lang_ptzPreset='+              langArray['LTXT_LIVE_PTZPRESET'];
        str += '$span&lang_ptzSwing='+               langArray['LTXT_LIVE_PTZSWING'];
        str += '$span&lang_swingStart='+             langArray['LTXT_LIVE_SWINGSTART'];
        str += '$span&lang_swingEnd='+               langArray['LTXT_LIVE_SWINGEND'];

        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_ptzPositionStep='+        langArray['LTXT_LIVE_PTZMOVEMENT_SPEED'];
          str += '$span&lang_Continuous='+             langArray['LTXT_CONSECUTIVE'];
        } else {
          str += '$span&lang_ptzPositionStep='+        langArray['LTXT_LIVE_PTZPOSITIONSTEP'];
          str += '$span&lang_Continuous='+             langArray['LTXT_CONTINUOUS'];
        }

        str += '$span&lang_ptzch='+                  langArray['LTXT_LIVE_PTZCH'];
        str += '$span&lang_ptzFocus='+               langArray['LTXT_LIVE_PTZFOCUS'];
        str += '$span&lang_ptzZoom='+                langArray['LTXT_LIVE_PTZZOOM'];
        str += '$span&lang_ptzIris='+                langArray['LTXT_LIVE_PTZIRIS'];
        str += '$span&lang_ptzPtz='+                 langArray['LTXT_LIVE_PTZPTZ'];
        str += '$span&lang_aux='+                 langArray['LTXT_LIVE_AUXILIARY'];
        ///////////////////// ALT //////////////////////////////////
        str += lang_LiveDisplayMenu();
        ///////////////////// Value //////////////////////////////////
        str += '$value&lang_Reload='+				langArray['LTXT_LIVE_RELOAD'];
        str += '$value&lang_PageDown='+             langArray['LTXT_LIVE_PAGEDOWN'];
        str += '$value&lang_PageUp='+               langArray['LTXT_LIVE_PAGEUP'];
        str += '$value&lang_patternSET='+           langArray['LTXT_LIVE_PATTERNSET'];
        str += '$value&lang_patternRUN='+           langArray['LTXT_LIVE_PATTERNRUN'];
        str += '$value&lang_presetSET='+            langArray['LTXT_LIVE_PRESETSET'];
        str += '$value&lang_presetRUN='+            langArray['LTXT_LIVE_PRESETRUN'];
        str += '$value&lang_swingRUN='+             langArray['LTXT_LIVE_SWINGRUN'];
        str += '$value&lang_PWChange='+ langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_CHANGE'];

        return str;
    } else if (part == "CHANGE_PASSWORD") {
      str += '$span&lang_new_passwd=' + langArray['LTXT_NEW_PASSWORD'];
      str += '$span&lang_confirm_new_password=' + langArray['LTXT_CONFIRM_NEW_PASSWORD'];
      str += '$span&passwd_rule0='+ '*' +    langArray['LTXT_SETUPUSER_PASSWDRULE0'];
      str += '$span&passwd_rule1='+ '(1)' +    langArray['LTXT_SETUPUSER_PASSWDRULE1'];
      if(INFO_VENDOR.indexOf("VIDECON") >= 0) {
        str += '$span&passwd_rule2='+ '(2)' +    langArray['LTXT_SETUPUSER_PASSWDRULE2_VIDECON'];
      } else {
      str += '$span&passwd_rule2='+ '(2)' +    langArray['LTXT_SETUPUSER_PASSWDRULE2_ENHANCE'];
      }
      str += '$span&passwd_rule3='+ '(3)' +    langArray['LTXT_SETUPUSER_PASSWDRULE3'];
      str += '$span&passwd_rule4='+ '(4)' +    langArray['LTXT_SETUPUSER_PASSWDRULE4'];
      str += '$span&passwd_rule5='+ '(5)' +    langArray['LTXT_SETUPUSER_PASSWDRULE5'];
      str += '$span&passwd_rule6='+ '(6)' +    langArray['LTXT_SETUPUSER_PASSWDRULE6'];
      str += '$span&passwd_rule7='+ '(*)' +    langArray['LTXT_ERR_USERID_LENGTH'];
      str += '$value&SUBMIT='+ langArray['LTXT_SETUP_APPLY'];
      return str;
    } else if (part == "REDIRECT") {
      str += '$span&lang_password=' + langArray['LTXT_PASSWORD_CHECK'];
      str += '$span&lang_new_password=' + langArray['LTXT_NEW_PASSWORD'];
      str += '$span&lang_confirm_password=' + langArray['LTXT_CONFIRM_NEW_PASSWORD'];
      return str;
    } else if (part == 'SEARCH') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();
        str += '$span&lang_searchbytime='+			langArray['LTXT_SEARCHBYEVENT_SEARCHBYTIME'];
        str += '$span&lang_searchbyevent='+          langArray['LTXT_SEARCHBYEVENT_SEARCHBYEVENT'];
        str += '$span&lang_searchbytextsearch='+     langArray['LTXT_SEARCHBYTEXTSEARCH_TEXTINSEARCH'];
        str += '$span&lang_All='+                    langArray['LTXT_SEARCHBYEVENT_ALL'];
        str += '$span&lang_System='+                 langArray['LTXT_SEARCHBYEVENT_SYSTEM'];
        str += '$span&lang_Setup='+                  langArray['LTXT_SEARCHBYEVENT_SETUP'];
        str += '$span&lang_Motion_Event='+                 langArray['LTXT_SEARCHBYEVENT_MOTION'];
        str += '$span&lang_Smart='+                  langArray['LTXT_SEARCHBYEVENT_SMART'];
        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_Event='+                  langArray['LTXT_SETUPMENU_SEARCH_CONDITION'];
          str += '$span&lang_Storage='+                langArray['LTXT_SETUPMENU_HDD_EVENT'];
          str += '$span&lang_Panic='+                 langArray['LTXT_SEARCHBYTIME_MANUAL'];
          str += '$span&lang_Period='+                 langArray['LTXT_SEARCHBYEVENT_PERIOD'];
        } else {
          str += '$span&lang_Event='+                  langArray['LTXT_SEARCHBYEVENT_EVENT'];
          str += '$span&lang_Storage='+                langArray['LTXT_SETUPMENU_STORAGE'];
          str += '$span&lang_Panic='+                 langArray['LTXT_SEARCHBYTIME_PANIC'];
          str += '$span&lang_Period='+                 langArray['LTXT_SEARCHBYEVENT_PERIOD'];
        }
        str += '$span&lang_Alarm_Event='+                  langArray['LTXT_SEARCHBYEVENT_ALARM'];
        //str += '$span&lang_Videoloss='+              langArray['LTXT_SEARCHBYEVENT_VIDEOLOSS'];
        str += '$span&lang_Videoloss='+              langArray['LTXT_LT_VIDEO_IN'];
        str += '$span&lang_Record='+                 langArray['LTXT_SEARCHBYEVENT_RECORD'];
        str += '$span&lang_Net='+                    langArray['LTXT_SEARCHBYEVENT_NET'];
        str += '$span&lang_IPCAM='+                  langArray['LTXT_SEARCHBYEVENT_IPCAM'];
        str += '$span&lang_Tamper='+                 langArray['LTXT_SEARCHBYEVENT_TAMPER'];
        str += '$span&lang_TextDev='+                langArray['LTXT_SEARCHBYEVENT_TEXT_DEV'];
        str += '$span&lang_From='+                   langArray['LTXT_SEARCHBYEVENT_FROM'];
        str += '$span&lang_To='+                     langArray['LTXT_SEARCHBYEVENT_TO'];
        str += '$span&lang_DateTime='+               langArray['LTXT_SEARCHBYEVENT_DATETIME'];
        str += '$span&lang_Log='+         langArray['LTXT_SEARCHBYEVENT_LOG'];

        str += '$span&lang_Pre='+                    langArray['LTXT_SEARCHBYTIME_PRE'];
        str += '$span&lang_Continuous='+                  langArray['LTXT_SEARCHBYTIME_CONTINUOUS'];
        str += '$span&lang_Alarm='+                  langArray['LTXT_SEARCHBYTIME_ALARM'];
        str += '$span&lang_Motion='+                 langArray['LTXT_SEARCHBYTIME_MOTION'];
        str += '$span&lang_User='+                   langArray['LTXT_SEARCHBYTIME_USER'];
        str += '$span&lang_bpdown=' + langArray["LTXT_BPDOWN"]

        str += '$span&lang_keyword='+               langArray['LTXT_SEARCHBYTEXTSEARCH_KEYWORD'];
        str += '$span&lang_matchcase='+             langArray['LTXT_SEARCHBYTEXTSEARCH_MATCHCASE'];
        str += '$span&lang_matchwhole='+            langArray['LTXT_SEARCHBYTEXTSEARCH_MATCHWHOLE'];
        str += '$span&lang_channel='+               langArray['LTXT_SEARCHBYTEXTSEARCH_CHANNEL'];

        str += '$span&lang_username='+              langArray['LTXT_USERNAME'];
        str += '$span&lang_password='+              langArray['LTXT_PASSWORD'];

        ///////////////////// ALT //////////////////////////////////
        str += lang_LiveDisplayMenu();

        str += '$alt&lang_RF='+						langArray['LTXT_SEARCHBYEVENT_RF'];
        str += '$alt&lang_backplay='+               langArray['LTXT_SEARCHBYEVENT_BACKPLAY'];
        str += '$alt&lang_pause='+                  langArray['LTXT_SEARCHBYEVENT_PAUSE'];
        str += '$alt&lang_play='+                   langArray['LTXT_SEARCHBYEVENT_PLAY'];
        str += '$alt&lang_FF='+                     langArray['LTXT_SEARCHBYEVENT_FF'];
        ///////////////////// Value //////////////////////////////////
        str += '$value&lang_btnSearch='+			langArray['LTXT_SEARCHBYEVENT_BTNSEARCH'];

        if(INFO_VENDOR=='ALSOK') {
          str += '$value&lang_PageDown='+             langArray['LTXT_LIVE_PAGEDOWN'];
          str += '$value&lang_PageUp='+               langArray['LTXT_LIVE_PAGEUP'];
        } else {
          str += '$value&lang_PageDown='+             langArray['LTXT_SEARCHBYEVENT_PAGEDOWN'];
          str += '$value&lang_PageUp='+               langArray['LTXT_SEARCHBYEVENT_PAGEUP'];
        }

        str += '$value&lang_Previous='+             langArray['LTXT_SEARCHBYEVENT_PREVIOUS'];
        str += '$value&lang_Next='+                 langArray['LTXT_SEARCHBYEVENT_NEXT'];
        str += '$value&lang_Refresh='+				langArray['LTXT_SEARCHBYTIME_REFRESH'];
        str += '$value&lang_Start='+                langArray['LTXT_SEARCHBYTIME_START'];
        str += '$value&lang_export='+               langArray['LTXT_SEARCHBYTIME_EXPORT'];
        str += '$value&lang_export_remotely='+               langArray['LTXT_SEARCHBYTIME_EXPORT_REMOTELY'];

        str += '$value&lang_backup='+               langArray['LTXT_SEARCHBYTEXTSEARCH_BACKUP'];

        return str;
    } else if (part == 'INFOMATION') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        return str;
    } else if (part == 'SETUPCAMTITLE') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();
        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_CameraSetting='+			langArray['LTXT_SETUPCAMCAM_TITLE_SETUP'];
          str += '$span&lang_camCh='+                  langArray['LTXT_SEARCHBYTEXTSEARCH_ELECTRIC_PATH'];
        } else {
          str += '$span&lang_camCh='+                  langArray['LTXT_SETUP_CH'];
          str += '$span&lang_CameraSetting='+     langArray['LTXT_SETUPCAMCAM_TITLE'];
        }
        str += '$span&lang_camTitle='+               langArray['LTXT_SETUPCAMCAM_TITLE'];
        str += '$span&lang_camCovert='+              langArray['LTXT_SETUPCAMCAM_COVERT'];
        str += '$span&lang_camAudio='+               langArray['LTXT_SETUPCAMCAM_AUDIO'];
        str += '$span&lang_selectAll='+         		langArray['LTXT_SELECT_ALL'];
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// DIV Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupCameraMenu();

        return str;
    } else if (part == 'SETUPCAMINSTALLATION') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();
        //str += '$span&lang_CameraSetting='+     langArray['LTXT_SETUPCAMCAM_TITLE'];
        str += '$span&lang_MenuCamCamInst='       +  langArray['LTXT_SETUPMENU_CAM_CAMERAINSTALLATION'];
        str += '$span&lang_MenuCamCamInstSetup='       +  langArray['LTXT_SETUPMENU_CAM_CAMERAINSTALLATION'] + ' - ' + langArray['LTXT_SETUPCAMINSTALLATION_SETUP'];
        str += '$span&lang_MenuCamCamInstSearch='       +  langArray['LTXT_SETUPMENU_CAM_CAMERAINSTALLATION'] + ' - ' + langArray['LTXT_SETUPCAMINSTALLATION_CAMERASEARCH'];
        str += '$span&lang_addmessage1='          + "[!] " + langArray['LTXT_SETUPCAMINSTALLATION_ADDMESSAGE1'] ;
        str += '$span&lang_addmessage2='          + langArray['LTXT_SETUPCAMINSTALLATION_ADDMESSAGE2'];
        str += '$span&lang_CamModel='           + langArray['LTXT_SETUPCAMINSTALLATION_MODEL'];
        str += '$span&lang_CamAddress='         + langArray['LTXT_SETUPCAMINSTALLATION_ADDRESS'];
        str += '$span&lang_CamStatus='          + langArray['LTXT_SETUPCAMINSTALLATION_STATUS'];
        str += '$span&lang_CamSetup='           + langArray['LTXT_SETUPCAMINSTALLATION_SETUP'];
        str += '$span&lang_CamWarning='         + langArray['LTXT_SETUPCAMINSTALLATION_WARNING'];

        str += '$span&lang_CamAssigndch='       + langArray['LTXT_SETUPCAMINSTALLATION_ASSIGNEDCHANNEL'];
        str += '$span&lang_CamFoundCamera='     + langArray['LTXT_SETUPCAMINSTALLATION_FOUNDCAMERA'];

        str += '$span&lang_CamSearchResult='    + langArray['LTXT_SETUPCAMINSTALLATION_SEARCHRESULT'];
        str += '$span&lang_CamPreview='         + langArray['LTXT_SETUPCAMINSTALLATION_PREVIEW'];

        str += '$span&lang_CamSearch_Assigned='         + langArray['LTXT_SETUPCAMINSTALLATION_SEARCH_ASSIGNED'];
        str += '$span&lang_CamSearch_Found='         + langArray['LTXT_SETUPCAMINSTALLATION_SEARCH_FOUND'];
        str += '$span&lang_CamSearch_Need='         + langArray['LTXT_SETUPCAMINSTALLATION_SEARCH_NEED'];

        str += '$span&lang_CamSearch_Fwversion='         + langArray['LTXT_SETUPCAMINSTALLATION_SEARCH_FWVERSION'] + " : ";
        str += '$span&lang_CamSearch_MacAddress='         + langArray['LTXT_SETUPCAMINSTALLATION_SEARCH_MACADDRESS'] + " : ";

        ///////////////////// Value //////////////////////////////////

        str += '$value&lang_CamAddcamera='+               langArray['LTXT_SETUPCAMINSTALLATION_ADDCAMERA'];
        str += '$value&lang_CamSearch='+               langArray['LTXT_SETUPCAMINSTALLATION_CAMERASEARCH'];
        str += '$value&lang_Gonetworksetup='+               langArray['LTXT_SETUPCAMINSTALLATION_GONETWORKSETUP'];
        str += '$value&lang_Setup='+               langArray['LTXT_SETUPCAMINSTALLATION_SETUP'];
        str += '$value&lang_CamPrevious='+               langArray['LTXT_SETUPCAMINSTALLATION_PREVIOUS'];
        str += '$value&lang_CamNext='+               langArray['LTXT_SETUPCAMINSTALLATION_NEXT'];
        str += '$value&lang_CamSetupAllCamera='+               langArray['LTXT_SETUPCAMINSTALLATION_SETUPALLCAMERAS'];



        str += '$option&lang_Search_NotAssigned=' + langArray['LTXT_SETUPCAMINSTALLATION_SEARCH_NOTASSIGNED'];


        str = str.replace(/%d/gi,'');

        str += lang_setupOkCancel();
        ///////////////////// DIV Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupCameraMenu();


        return str;
    } else if (part == 'SETUPCAMINSTALLMODE') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_CamInstMode='+     langArray['LTXT_SETUPMENU_CAM_INSTALLATION_MODE'];
        str += '$span&lang_CamNetworkmap='+     langArray['LTXT_SETUPCAMINSTALLMODE_NETWORKMAP'];

        //???? ?string 값을 직접 조절
        str += '$span&cctvmodeTextProtectedNetwork='+     langArray['LTXT_SETUPCAMINSTALLMODE_DEDICATED_PROTECTEDNETWORK'];
        str += '$span&cctvmodeTextGateway='+     langArray['LTXT_SETUPCAMINSTALLMODE_DEDICATED_GATEWAY_SWITCH'];
        str += '$span&cctvmodeTextDedicatedSwitch='+     langArray['LTXT_SETUPCAMINSTALLMODE_DEDICATED_SWITCH'];
        str += '$span&cctvmodeTextInternet='+     langArray['LTXT_SETUPCAMINSTALLMODE_DEDICATED_INTERNET'];
        str += '$span&openmodeTextInternet='+     langArray['LTXT_SETUPCAMINSTALLMODE_DEDICATED_INTERNET'];
        str += '$span&openmodeTextGateway='+     langArray['LTXT_SETUPCAMINSTALLMODE_DEDICATED_GATEWAY'];
        str += '$span&openmodeTextGeneralSwitch='+     langArray['LTXT_SETUPCAMINSTALLMODE_DEDICATED_GENERALSWITCH'];

        str += '$option&lang_OPENMODE_A=' + langArray['LTXT_SETUPCAMINSTALLMODE_OPENMODE_A'];
        str += '$option&lang_CCTVMODE_R=' + langArray['LTXT_SETUPCAMINSTALLMODE_CCTVMODE_R'];

        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();


        ///////////////////// DIV Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupCameraMenu();

        str += '$value&lang_cctvmode='+               langArray['LTXT_SETUPCAMINSTALLMODE_CCTVMODE'];
        str += '$value&lang_openmode='+               langArray['LTXT_SETUPCAMINSTALLMODE_OPENMODE'];


        return str;
    } else if (part == 'SETUPCAMIMAGEADVANCED') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        // ADVANCED IMAGE SETUP
        str += '$span&lang_cam_advanced='+ langArray['LTXT_SETUPMENU_REC_ADVANCED'] + " "+ langArray["LTXT_SETUPMENU_CAM_IMAGE"];
        str += '$span&lang_cam_advanced_channel_information='+     langArray['LTXT_INFOMATION'];
        str += '$span&lang_cam_advanced_channel='+   		  langArray['LTXT_SETUP_CH'];
        str += '$span&lang_cam_advanced_model='+     		langArray["LTXT_SETUPSTORAGE_MODEL"];
        str += '$span&lang_cam_advanced_fwversion='+ 	langArray["LTXT_SETUPSYSINFO_FWVERSION"];


        str += '$span&lang_cam_advanced_image_property_control='+     langArray["LTXT_SETUPCAMIMAGEADV_IMAGE_PROPERTY_CONTROL"];
        str += '$span&lang_cam_advanced_sharpness=' +     langArray["LTXT_SETUPCAMIMAGEADV_SHARPNESS"];
        str += '$span&lang_cam_advanced_rotate=' +     langArray["LTXT_SETUPCAMIMAGEADV_ROTATE"];
        str += '$span&lang_cam_advanced_zoom='+ 		langArray["LTXT_LIVE_PTZZOOM"];
        str += '$span&lang_cam_advanced_focus='+ 		langArray["LTXT_LIVE_PTZFOCUS"];
        str += '$span&lang_cam_advanced_step='+ 		langArray["LTXT_LIVE_PTZPOSITIONSTEP"];

        str += '$span&lang_cam_advanced_white_balance_control=' +     langArray["LTXT_SETUPCAMIMAGEADV_WHITE_BALANCE_CONTROL"];
        str += '$span&lang_cam_advanced_wb_mode=' +     langArray["LTXT_SETUPCAMIMAGEADV_WB_MODE"];
        str += '$span&lang_cam_advanced_mwb_mode=' +     langArray["LTXT_SETUPCAMIMAGEADV_MWB_MODE"];

        str += '$span&lang_cam_advanced_exposure_control=' +     langArray["LTXT_SETUPCAMIMAGEADV_EXPOSURE_CONTROL"];
        str += '$span&lang_cam_advanced_exposure_mode=' +     langArray["LTXT_SETUPCAMIMAGEADV_EXPOSURE_MODE"];
        str += '$span&lang_cam_advanced_agc_gain=' +     langArray["LTXT_SETUPCAMIMAGEADV_ACG_GAIN"];
        str += '$span&lang_cam_advanced_eshutter_speed=' +     langArray["LTXT_SETUPCAMIMAGEADV_E-SHUTTER_SPEED"];
        str += '$span&lang_cam_advanced_slow_shutter=' +     langArray["LTXT_SETUPCAMIMAGEADV_SLOW_SHUTTER"];
        str += '$span&lang_cam_advanced_max_agc=' +     langArray["LTXT_SETUPCAMIMAGEADV_MAX_AGC"];
        str += '$span&lang_cam_advanced_iris_control=' +     langArray["LTXT_SETUPCAMIMAGEADV_IRIS_CONTROL"];
        str += '$span&lang_cam_advanced_blc_control=' +     langArray["LTXT_SETUPCAMIMAGEADV_BLC_CONTROL"];
        str += '$span&lang_cam_advanced_day_night_mode=' +     langArray["LTXT_SETUPCAMIMAGEADV_DAY_NIGHT_MODE"];

        str += '$span&lang_cam_AUTO'+ langArray["LTXT_SETUPCAMIMAGEADV_AUTO"];
        str += '$span&lang_cam_advanced_manual'+ langArray["LTXT_SETUPCAMIMAGEADV_MANUAL"];
        str += '$span&lang_cam_advanced_autowide'+ langArray["LTXT_SETUPCAMIMAGEADV_AUTOWIDE"];
        str += '$span&lang_cam_advanced_wide'+ langArray["LTXT_SETUPCAMIMAGEADV_WIDE"];
        str += '$span&lang_cam_advanced_tele'+ langArray["LTXT_SETUPCAMIMAGEADV_TELE"];
        str += '$span&lang_cam_advanced_near'+ langArray["LTXT_SETUPCAMIMAGEADV_NEAR"];
        str += '$span&lang_cam_advanced_far'+ langArray["LTXT_SETUPCAMIMAGEADV_FAR"];
        str += '$span&lang_cam_advanced_onepush'+ langArray["LTXT_SETUPCAMIMAGEADV_ONEPUSH"];
        str += '$span&lang_cam_advanced_home'+ langArray["LTXT_SETUPCAMIMAGEADV_HOME"];
        str += '$span&lang_cam_advanced_daytime'+ langArray["LTXT_SETUPCAMIMAGEADV_DAYTIME"];
        str += '$span&lang_cam_advanced_nighttime'+ langArray["LTXT_SETUPCAMIMAGEADV_NIGHTTIME"];
        str += '$span&lang_cam_advanced_0sec'+ langArray["LTXT_SETUPCAMIMAGEADV_0SEC"];
        str += '$span&lang_cam_advanced_5sec'+ langArray["LTXT_SETUPCAMIMAGEADV_5SEC"];
        str += '$span&lang_cam_advanced_10sec'+ langArray["LTXT_SETUPCAMIMAGEADV_10SEC"];
        str += '$span&lang_cam_advanced_15sec'+ langArray["LTXT_SETUPCAMIMAGEADV_150SEC"];
        str += '$span&lang_cam_advanced_30sec'+ langArray["LTXT_SETUPCAMIMAGEADV_30SEC"];
        str += '$span&lang_cam_advanced_60sec'+ langArray["LTXT_SETUPCAMIMAGEADV_60SEC"];

        str += '$span&lang_cam_advanced_indoor'+     langArray["LTXT_SETUPCAMIMAGEADV_INDOOR_(2800K)"];
        str += '$span&lang_cam_advanced_outdoor'+     langArray["LTXT_SETUPCAMIMAGEADV_OUTDOOR_(6500K)"];
        str += '$span&lang_cam_advanced_fluorescent'+     langArray["LTXT_SETUPCAMIMAGEADV_FLUORESCENT_(4000K)"];

        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupCameraMenu();

        return str;
    } else if (part == 'SETUPCAMIMAGE') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_camCh='+                  langArray['LTXT_SEARCHBYTEXTSEARCH_ELECTRIC_PATH'];
        } else {
          str += '$span&lang_camCh='+                  langArray['LTXT_SETUPCAMIMAGE_CH'];
        }

        str += '$span&lang_CamImage='+     langArray['LTXT_SETUPMENU_CAM_IMAGE'];
        str += '$span&lang_ColorSetting='+      langArray['LTXT_SETUPCAMIMAGE_COLORSETTING'];
        str += '$span&lang_camBrightness='+          langArray['LTXT_SETUPCAMIMAGE_BRIGHTNESS'];
        str += '$span&lang_camContrast='+            langArray['LTXT_SETUPCAMIMAGE_CONTRAST'];
        str += '$span&lang_camTint='+                langArray['LTXT_SETUPCAMIMAGE_TINT'];
        str += '$span&lang_camColor='+               langArray['LTXT_SETUPCAMIMAGE_COLOR'];
        str += '$span&lang_camSharpness='+           langArray['LTXT_SETUPCAMIMAGEADV_SHARPNESS'];
        str += '$span&lang_camEqualizer=' +     langArray["LTXT_SETUPCAMIMAGE_EQUALIZER"];
        str += '$span&lang_camNoise=' +         langArray['LTXT_SETUPCAMIMAGE_NOISE'];
        str += '$span&lang_selectAll='+         langArray['LTXT_SELECT_ALL'];
        str += '$value&Advanced='+		langArray['LTXT_SETUPMENU_REC_ADVANCED'];

        ///////////////////// Compatibility //////////////////////////
        str += '$span&lang_imagesetup=' + langArray["LTXT_SETUPMENU_CAM_CAMSETUP"];
        str += '$span&lang_image_setting=' + langArray["LTXT_SETUPCAMCAMSETUP_IMAGESETTING"];
        str += '$span&lang_exposure=' + langArray["LTXT_SETUPCAMCAMSETUP_EXPOSURE"];
        str += '$span&lang_direct_configure=' + langArray["LTXT_SETUPCAMCAMSETUP_DIRECT_CONFIGURE"];
        str += '$span&lang_focus=' + langArray["LTXT_FOCUS_COMPENSATION"];

        str += '$span&lang_autofocus=' + langArray["LTXT_SETUPCAMCAMSETUP_AUTO_FOCUS"];
        str += '$span&lang_defaultspeed=' + langArray["LTXT_DEFAULTSPEED"];
        str += '$span&lang_speed=' + langArray["LTXT_SPEED"];
        str += '$span&lang_position=' + langArray["LTXT_POSITION"];
        str += '$span&lang_distance=' + langArray["LTXT_DISTANCE"];
        str += '$span&lang_cam_camsetup_sharpness=' +     langArray["LTXT_SETUPCAMIMAGEADV_SHARPNESS"];
        str += '$span&lang_cam_camsetup_equalizer=' +     langArray["LTXT_SETUPCAMIMAGEADV_EQUALIZER"];
        str += '$span&lang_cam_camsetup_rotate=' +     langArray["LTXT_SETUPCAMIMAGEADV_ROTATE"];
        str += '$span&lang_cam_camsetup_focus='+    langArray["LTXT_LIVE_PTZFOCUS"];

        str += '$span&lang_cam_camsetup_white_balance_title=' +     langArray["LTXT_SETUPCAMCAMSETUP_WHITE_BALANCE"];
        str += '$span&lang_cam_camsetup_white_balance=' +     langArray["LTXT_SETUPCAMCAMSETUP_WHITE_BALANCE"];
        str += '$span&lang_cam_camsetup_mwb_mode=' +     langArray["LTXT_SETUPCAMIMAGEADV_MWB_MODE"];

        str += '$span&lang_wide_dynamic_range=' +     langArray["LTXT_SETUPCAMCAMSETUP_WIDE_DYNAMIC_RANGE"];
        str += '$span&lang_wide_dynamic_mode=' +     langArray["LTXT_SETUPCAMCAMSETUP_WIDE_DYNAMIC_MODE"];
        str += '$span&lang_level=' +     langArray["LTXT_SETUPCAMCAMSETUP_LEVEL"];
        str += '$span&lang_daynight=' +     langArray["LTXT_DAY_NIGHT_MODE"];
        str += '$span&lang_mode=' + langArray["LTXT_SETUPCAMCAMSETUP_MODE"];
        str += '$span&lang_cam_camsetup=' +     langArray["LTXT_SETUPCAMCAMSETUP_MODE"];
        str += '$span&lang_blc=' +     langArray["LTXT_SETUPCAMCAMSETUP_BLC_CONTROL"];
        str += '$span&lang_blclevel=' +     langArray["LTXT_SETUPCAMCAMSETUP_BLC_LEVEL"];
        str += '$span&lang_antiflicker=' + langArray["LTXT_ANTIFLICKER"];
        str += '$span&lang_antiflicker_motion=' + langArray["LTXT_ANTIFLICKER"];
        str += '$span&lang_antiflicker_motion_off=' + langArray["LTXT_ANTIFLICKER"];
        str += '$span&lang_antiflicker_auto_off=' + langArray["LTXT_ANTIFLICKER"];
        str += '$span&lang_max_shutter=' + langArray["LTXT_MAX_SHUTTER_SPEED"];
        str += '$span&lang_base_shutter=' + langArray["LTXT_BASE_SHUTTER_SPEED"];

        str += '$span&lang_exposure_time_title=' +     langArray["LTXT_SETUPCAMCAMSETUP_EXPOSURE_TIME"];
        str += '$span&lang_cam_camsetup=' +     langArray["LTXT_SETUPCAMCAMSETUP_EXPOSURE_TIME"];
        str += '$span&lang_slowshutter=' +     langArray["LTXT_SETUPCAMCAMSETUP_SLOW_SHUTTER"];
        str += '$span&lang_maxagc=' +     langArray["LTXT_SETUPCAMCAMSETUP_MAX_AGC"];
        str += '$span&lang_dc_iris=' +     langArray["LTXT_SETUPCAMCAMSETUP_IRIS_CONTROL"];
        str += '$span&lang_dc_iris_motion=' +     langArray["LTXT_SETUPCAMCAMSETUP_IRIS_CONTROL"];
        str += '$span&lang_iris_title=' +     langArray["LTXT_SETUPCAMCAMSETUP_IRIS"];
        str += '$span&lang_iris=' +     langArray["LTXT_SETUPCAMCAMSETUP_IRIS"];
        str += '$span&model=' + langArray["LTXT_SETUPCAMCAMSETUP_NOT_CONNECTED"];
        str += '$value&lang_copysettingto=' +     langArray["LTXT_SETUPCAMCAMSETUP_COPY_SETTINGS_TO"];
        str += '$span&lang_ir_cut_filter=' + langArray["LTXT_IRCUTFILTER"];
        str += '$span&lang_dnn_toggle=' + langArray["LTXT_DNNTOGGLE"];

        str += '$span&lang_min_exposure_time=' + langArray["LTXT_MIN_EXPOSURE_TIME"];
        str += '$span&lang_max_exposure_time=' + langArray["LTXT_MAX_EXPOSURE_TIME"];
        str += '$span&lang_exposure_time=' + langArray["LTXT_EXPOSURE_TIME"];
        str += '$span&lang_gain_title=' + langArray["LTXT_GAIN"];
        str += '$span&lang_min_gain=' + langArray["LTXT_MIN_GAIN"];
        str += '$span&lang_max_gain=' + langArray["LTXT_MAX_GAIN"];
        str += '$span&lang_gain=' + langArray["LTXT_GAIN"];
        str += '$span&lang_max_iris=' + langArray["LTXT_MAX_IRIS"];
        str += '$span&lang_min_iris=' + langArray["LTXT_MIN_IRIS"];

        str += '$span&lang_defog=' + langArray["LTXT_DEFOG"];
        str += '$span&lang_adaptive_ir=' + langArray["LTXT_ADAPTIVE_IR"];
        str += '$span&lang_dnn_sense_dton=' + langArray["LTXT_DAY_TO_NIGHT"];
        str += '$span&lang_dnn_sense_ntod=' + langArray["LTXT_NIGHT_TO_DAY"];

        str += '$span&lang_cam_AUTO='+ langArray["LTXT_SETUPCAMIMAGEADV_AUTO"];
        str += '$span&lang_cam_camsetup_manual='+ langArray["LTXT_SETUPCAMIMAGEADV_MANUAL"];
        str += '$span&lang_cam_camsetup_autowide='+ langArray["LTXT_SETUPCAMIMAGEADV_AUTOWIDE"];
        str += '$span&lang_cam_camsetup_wide='+ langArray["LTXT_SETUPCAMIMAGEADV_WIDE"];
        str += '$span&lang_cam_camsetup_tele='+ langArray["LTXT_SETUPCAMIMAGEADV_TELE"];
        str += '$span&lang_cam_camsetup_near='+ langArray["LTXT_SETUPCAMIMAGEADV_NEAR"];
        str += '$span&lang_cam_camsetup_far='+ langArray["LTXT_SETUPCAMIMAGEADV_FAR"];
        str += '$span&lang_cam_camsetup_onepush='+ langArray["LTXT_SETUPCAMIMAGEADV_ONEPUSH"];
        str += 'value&lang_cam_camsetup_home='+ langArray["LTXT_SETUPCAMIMAGEADV_HOME"];
        str += '$span&lang_cam_camsetup_daytime='+ langArray["LTXT_SETUPCAMIMAGEADV_DAYTIME"];
        str += '$span&lang_cam_camsetup_nighttime='+ langArray["LTXT_SETUPCAMIMAGEADV_NIGHTTIME"];
        str += '$span&lang_cam_camsetup_0sec='+ langArray["LTXT_SETUPCAMIMAGEADV_0SEC"];
        str += '$span&lang_cam_camsetup_5sec='+ langArray["LTXT_SETUPCAMIMAGEADV_5SEC"];
        str += '$span&lang_cam_camsetup_10sec='+ langArray["LTXT_SETUPCAMIMAGEADV_10SEC"];
        str += '$span&lang_cam_camsetup_15sec='+ langArray["LTXT_SETUPCAMIMAGEADV_150SEC"];
        str += '$span&lang_cam_camsetup_30sec='+ langArray["LTXT_SETUPCAMIMAGEADV_30SEC"];
        str += '$span&lang_cam_camsetup_60sec='+ langArray["LTXT_SETUPCAMIMAGEADV_60SEC"];

        str += '$span&lang_cam_camsetup_indoor='+     langArray["LTXT_SETUPCAMIMAGEADV_INDOOR_(2800K)"];
        str += '$span&lang_cam_camsetup_outdoor='+     langArray["LTXT_SETUPCAMIMAGEADV_OUTDOOR_(6500K)"];

        str += '$span&lang_focus_compensation='+      langArray["LTXT_FOCUS_COMPENSATION"];
        str += '$span&lang_tem_compensation='+  langArray["LTXT_FOCUS_TEMPERATURE"];
        str += '$span&lang_dnn_compensation='+  langArray["LTXT_FOCUS_DAY_N_NIGHT"];

        str += '$span&lang_image_setup='+ langArray['LTXT_SETUPMENU_CAM_IMAGE'];
        str += '$span&lang_stream_setup='+ langArray['LTXT_STREAM_SETUP'];

        //STREAM
        str += '$span&lang_streamsettings=' + langArray['LTXT_STREAM_SETUP'];
        str += '$span&lang_property=' + langArray['LTXT_PROPERTY'];
        str += '$span&lang_video_stream=' + langArray['LTXT_VIDEO_STREAM'];
        str += '$span&lang_video_1=' + langArray['LTXT_VIDEO_1'];
        str += '$span&lang_video_2=' + langArray['LTXT_VIDEO_2'];
        str += '$span&lang_bitrate_control=' + langArray['LTXT_BITRATE_CONTROL'];
        str += '$span&lang_codec=' + langArray['LTXT_CODEC'];
        str += '$span&lang_record_size=' + langArray['LTXT_RECORD_SIZE'];
        str += '$span&lang_maximum_frame_rate=' + langArray['LTXT_MAXIMUM_FRAME_RATE'];
        str += '$span&lang_maximum_bit_rate=' + langArray['LTXT_MAXIMUM_BIT_RATE'];
        str += '$span&lang_minumum_bit_rate=' + langArray['LTXT_MINIMUM_BIT_RATE'];
        
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupCameraMenu();

        return str;
    } else if (part == 'SETUPCAMPTZ') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_camCh='+                  langArray['LTXT_SEARCHBYTEXTSEARCH_ELECTRIC_PATH'];
        } else {
          str += '$span&lang_camCh='+                  langArray['LTXT_SETUP_CH'];
        }

        str += '$span&lang_PTZSetting='+              langArray['LTXT_SETUPMENU_CAM_PTZ'];

        str += '$span&lang_camAddress='+             langArray['LTXT_SETUPCAMPTZ_ADDRESS'];
        str += '$span&lang_camAutoFocus='+           langArray['LTXT_SETUPCAMPTZ_AUTOFOCUS'];
        str += '$span&lang_camPTSpeed='+             langArray['LTXT_SETUPCAMPTZ_PTSPEED'];
        str += '$span&lang_camFocusSpeed='+          langArray['LTXT_SETUPCAMPTZ_FOCUSSPEED'];
        str += '$span&lang_camProtocol='+            langArray['LTXT_SETUPCAMPTZ_PROTOCOL'];
        str += '$span&lang_camBaudrate='+            langArray['LTXT_SETUPCAMPTZ_BAUDRATE'];
        str += '$span&lang_camAutoIris='+            langArray['LTXT_SETUPCAMPTZ_AUTOIRIS'];
        str += '$span&lang_camZoomSpeed='+           langArray['LTXT_SETUPCAMPTZ_ZOOMSPEED'];
        str += '$span&lang_camIrisSpeed='+           langArray['LTXT_SETUPCAMPTZ_IRISSPEED'];
        str += '$span&lang_selectAll='+         		langArray['LTXT_SELECT_ALL'];
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupCameraMenu();

        return str;
    } else if (part == 'SETUPCAMCOVERT') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_camCh='+                  langArray['LTXT_SEARCHBYTEXTSEARCH_ELECTRIC_PATH'];
        } else {
          str += '$span&lang_camCh='+                  langArray['LTXT_SETUP_CH'];
        }

        str += '$span&lang_PTZSetting='+             langArray['LTXT_SETUPCAMPTZ_PTZSETTING'];

        str += '$span&lang_CameraCovert='+           langArray['LTXT_SETUPMENU_CAM_COVERT'];
        str += '$span&lang_logout='+                 langArray['LTXT_SETUPMENU_USER_LOGOUT'];
        str += '$span&lang_logout='+                 langArray['LTXT_SETUPMENU_USER_LOGOUT'];
        str += '$span&lang_selectAll='+              langArray['LTXT_SELECT_ALL'];
        str += '$span&langShownAs='+                 langArray['LTXT_SETUPCAMSHOWNAS'];
        str += '$span&lang_logout='+                 langArray['LTXT_SETUPUSER_COVERT_LOGOUT'];
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupCameraMenu();

        return str;

    } else if (part == 'SETUPCAMANALOGTYPE') {
        str = lang_TopMenu();

        str += '$span&lang_camCh='+                    langArray['LTXT_SETUP_CH'];
        str += '$span&lang_CameraType='+            langArray['LTXT_SETUPCAMTYPE_TYPE'];
        str += '$span&lang_AnalogType='+      langArray['LTXT_SETUPCAMANALOGTYPE'];
        str += '$span&lang_CameraType='+               langArray['LTXT_CAMERATYPE'];
        str += '$span&lang_ipcam='+                    langArray['LTXT_IPCAMERA_INSTALLATION'];
        str += '$span&lang_AnalogType='+               langArray['LTXT_SETUPCAMTYPESETUP'];
        str += '$span&lang_analog_type='+              langArray['LTXT_CAMERATYPE'];
        str += '$span&lang_camera_add='+               langArray['LTXT_CAMERA_ADD'];
        str += '$span&lang_camera_list='+              langArray['LTXT_CAMERA_LIST'];
        str += '$span&lang_camera_model='+             langArray['LTXT_SETUPCAMINSTALLATION_MODEL'];
        str += '$span&lang_camera_address='+           langArray['LTXT_SETUPCAMINSTALLATION_ADDRESS'];
        str += '$span&lang_camera_status='+            langArray['LTXT_SETUPCAMINSTALLATION_STATUS'];
        str += '$span&lang_camera_channel='+           langArray['LTXT_SETUPCAMINSTALLATION_ASSIGNEDCHANNEL']
        str += '$span&lang_search_result='+            langArray['LTXT_SETUPCAMINSTALLATION_SEARCHRESULT'];
        str += '$span&lang_auto_scan='+                langArray['LTXT_AUTO_SCAN'];
        str += '$span&lang_specific='+                 langArray['LTXT_SPECIFIC_IP_HOST_NAME'];
        str += '$span&lang_virtualcam='+               langArray['LTXT_VIRTUAL_CAMERA'];
        str += '$span&lang_warn_message1='+            langArray['LTXT_SETUPCAMINSTALLATION_ADDMESSAGE1'];
        str += '$span&lang_warn_message2='+            langArray['LTXT_SETUPCAMINSTALLATION_ADDMESSAGE2'];
        str += '$span&lang_dialog_please_wait_message='+langArray['LTXT_PLEASE_WAIT'];

        str += '$span&lang_dialog_ipcam_install_config='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_CONFIGURATION'];
        str += '$span&lang_dialog_ipcam_install_camname='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_CAMERA'];
        str += '$span&lang_dialog_ipcam_install_ipaddr='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_IP'];
        str += '$span&lang_dialog_ipcam_install_httpport='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_HTTP'];
        str += '$span&lang_dialog_ipcam_install_rtspport='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_RTSP'];
        str += '$span&lang_dialog_ipcam_install_username='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_USER'];
        str += '$span&lang_dialog_ipcam_install_password='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_PASSWORD'];
        str += '$span&lang_dialog_ipcam_install_diagnostic_tools='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_DIAGNOSTICTOOLS'];
        str += '$span&lang_dialog_ipcam_install_ipcam_reset='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_IP_RESET'];
        str += '$span&lang_dialog_ipcam_install_network_test='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_NETWORKTEST'];
        str += '$span&lang_dialog_ipcam_install_ping_test='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_PINGTEST'];
        str += '$span&lang_dialog_ipcam_install_cam_info='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_CAMERAINFO'];
        str += '$span&lang_dialog_ipcam_install_mac_addr='+langArray['LTXT_SETUPCAMINSTALLATION_SEARCH_MACADDRESS'];
        str += '$span&lang_dialog_ipcam_install_fwversion='+langArray['LTXT_SETUPCAMINSTALLATION_SEARCH_FWVERSION'];

        str += '$span&lang_dialog_ipcam_specific_name='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_IP_HOST_NAME'];
        str += '$span&lang_dialog_ipcam_specific_port='+langArray['LTXT_PORT'];

        str += '$span&lang_dialog_vcam_1st_stream='+langArray['LTXT_RTP_1ST_STREAM'];
        str += '$span&lang_dialog_vcam_2nd_stream='+langArray['LTXT_RTP_2ND_STREAM'];
        str += '$span&lang_dialog_vcam_message1='+langArray['LTXT_SETUPCAMINSTALLATION_VCAM_MSG1'];
        str += '$span&lang_dialog_vcam_restriction='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_RESTRICTION'];
        str += '$span&lang_dialog_vcam_bitrate='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_BITRATE'];
        str += '$span&lang_dialog_vcam_video_codec='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_VIDEO_CODEC'];
        str += '$span&lang_dialog_vcam_audio_codec='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_AUDIO_CODEC'];
        str += '$span&lang_dialog_vcam_supported_resolution='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_SUPPORTED_RESOLUTION'];

        str += '$value&lang_button_search='+           langArray['LTXT_SETUPCAMINSTALLATION_CAMERASEARCH'];
        str += '$value&lang_button_add='+              langArray['LTXT_SETUP_ADD'];
        str += '$value&lang_button_prev='+             langArray['LTXT_SETUPCAMINSTALLATION_PREVIOUS'];
        str += '$value&lang_button_next='+             langArray['LTXT_SETUPCAMINSTALLATION_NEXT'];
        str += '$value&lang_button_gotonetwork='+      langArray['LTXT_SETUPCAMINSTALLATION_GONETWORKSETUP'];

        str += '$value&lang_dialog_ipcam_install_ipsetup='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_IPSETUP'];
        str += '$value&lang_dialog_ipcam_install_portsetup='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_PORTSETUP'];
        str += '$value&lang_dialog_ipcam_install_login='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_LOGIN'];
        str += '$value&lang_dialog_ipcam_install_password='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_CHANGE'];
        str += '$value&lang_dialog_ipcam_install_reset='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_RESET'];
        str += '$value&lang_dialog_ipcam_install_pingtest='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_PINGTEST'];
        str += '$span&lang_dialog_ipcam_install_ipcam_network='+langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_NETWORKTEST'];
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupCameraMenu();

        return str;

    } else if (part == 'SETUPCAMMOTION') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_camCh='+                  langArray['LTXT_SEARCHBYTEXTSEARCH_ELECTRIC_PATH'];
          str += '$span&lang_Select='+                 langArray['LTXT_SETUPCAMMOTION_SELECT'];
          str += '$span&lang_Normal='+                 langArray['LTXT_OFF'];
          str += '$span&lang_MotionSetting='+	    langArray['LTXT_SETUPMENU_EVENT_MOTIONDETECTION'];
        } else {
          str += '$span&lang_camCh='+                  langArray['LTXT_SETUP_CH'];
          str += '$span&lang_Select='+                 langArray['LTXT_SETUPCAMMOTION_SELECT'];
          str += '$span&lang_Normal='+                 langArray['LTXT_SETUPREC_OP_GENERAL'];
          str += '$span&lang_MotionSetting='+     langArray['LTXT_SETUPMENU_EVENT_MOTIONSENSOR'];
        }


        str += '$span&lang_selectAll='+         langArray['LTXT_SELECT_ALL'];

        //str += '$span&lang_Normal='+                langArray['LTXT_SETUPCAMMOTION_NORMAL'];

        str += '$span&lang_daytime='+               langArray['LTXT_SETUP_CAMMOTION_DAYTIME'];
        str += '$span&lang_daytimeset='+               langArray['LTXT_SETUP_CAMMOTION_DAYTIMESET'];
        str += '$span&lang_nighttime='+             langArray['LTXT_SETUP_CAMMOTION_NIGHTTIME'];
        //str += '$span&lang_Sensitivity='+           langArray['LTXT_SETUP_CAMMOTION_SENSITIVITY'];
        str += '$span&lang_Sensitivity='+           langArray['LTXT_SETUPCAMMOTION_SENSITIVITY'];
        str += '$span&lang_Sensitivity_advanced='+           langArray['LTXT_SETUPCAMMOTION_SENSITIVITY_ADVANCED'];
        str += '$span&lang_level='+           langArray['LTXT_SETUPCAMMOTION_LEVEL'];
        str += '$span&lang_spatial='+           langArray['LTXT_SETUPCAMMOTION_SPATIAL'];
        str += '$span&lang_temporal='+           langArray['LTXT_SETUPCAMMOTION_TEMPORAL'];
        str += '$span&lang_valocity='+           langArray['LTXT_SETUPCAMMOTION_VALOCITY'];
        str += '$span&lang_min_block='+              langArray['LTXT_SETUP_CAMMOTION_MINBLOCK'];
        str += '$span&lang_activation='+            langArray['LTXT_SETUP_CAMMOTION_ACTIVATION'];
        str += '$span&lang_detect_mark='+            langArray['LTXT_SETUP_CAMMOTION_DETECTMARK'];
        str += '$span&lang_tab_activation='+            langArray['LTXT_SETUP_CAMMOTION_ACTIVATION'];
        str += '$span&lang_tab_area='+            langArray['LTXT_AREA_SETUP'];
        str += '$span&lang_interval='+            langArray['LTXT_INTERVAL'];
        str += '$span&lang_warning_min_block=' + langArray['LTXT_WARNING_MIN_BLOCK'];
        str += '$span&lang_warning_not_itx_cam=' + langArray['LTXT_WARNING_NOT_ITX_CAM'];

        ///////////////////// Value //////////////////////////////////
        str += '$value&lang_Selectall='+			langArray['LTXT_SETUPCAMMOTION_SELECTALL'];
        str += '$value&lang_Reverseall='+           langArray['LTXT_SETUPCAMMOTION_REVERSEALL'];
        str += '$value&lang_Deleteall='+            langArray['LTXT_SETUPCAMMOTION_DELETEALL'];
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupCameraMenu();

        str += '$divimg&lang_chno='+				langArray['LTXT_SETUPCAMMOTION_CHNO'];
        str += '$divimg&lang_Sensitivity='+         langArray['LTXT_SETUPCAMMOTION_SENSITIVITY'];
        return str;
    } else if (part == 'SETUPCAMPRIVMASK') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_camCh='+                  langArray['LTXT_SEARCHBYTEXTSEARCH_ELECTRIC_PATH'];
        } else {
          str += '$span&lang_camCh='+                  langArray['LTXT_SETUP_CH'];
        }

        str += '$span&lang_menu_PrivMask='+       langArray['LTXT_SETUPMENU_CAMPRIVMASK'];

        str += '$span&lang_PrivMask='+             langArray['LTXT_SETUPCAMPRIVMASK'];
        str += '$span&lang_activation='+          langArray['LTXT_SETUPCAMPRIVMASK_ACTIVATION'];
        str += '$span&lang_mask_color='+          langArray['LTXT_SETUPCAMPRIVMASK_MASK_COLOR'];
        str += '$span&lang_tab_activation='+      langArray['LTXT_SETUPCAMPRIVMASK_ACTIVATION'];
        str += '$span&lang_tab_area='+            langArray['LTXT_AREA_SETUP'];

        str += '$span&lang_selectAll='+            langArray['LTXT_SELECT_ALL'];

        str += '$span&lang_black='+             langArray['LTXT_BLACK'];
        str += '$span&lang_white='+             langArray['LTXT_WHITE'];
        str += '$span&lang_gray1='+             langArray['LTXT_GRAY1'];
        str += '$span&lang_gray2='+             langArray['LTXT_GRAY2'];
        str += '$span&lang_yellow='+            langArray['LTXT_YELLOW'];
        str += '$span&lang_red='+               langArray['LTXT_RED'];
        str += '$span&lang_blue='+              langArray['LTXT_BLUE'];
        str += '$span&lang_green='+             langArray['LTXT_GREEN'];

        str += '$span&lang_area='+              langArray['LTXT_AREA_N'];

        str += '$span&lang_area_1='+            langArray['LTXT_AREA_1'];
        str += '$span&lang_area_2='+            langArray['LTXT_AREA_2'];
        str += '$span&lang_area_3='+            langArray['LTXT_AREA_3'];
        str += '$span&lang_area_4='+            langArray['LTXT_AREA_4'];
        str += '$span&lang_area_5='+            langArray['LTXT_AREA_5'];
        str += '$span&lang_area_6='+            langArray['LTXT_AREA_6'];
        str += '$span&lang_area_7='+            langArray['LTXT_AREA_7'];
        str += '$span&lang_area_8='+            langArray['LTXT_AREA_8'];
        str += '$span&lang_area_9='+            langArray['LTXT_AREA_9'];
        str += '$span&lang_area_10='+           langArray['LTXT_AREA_10'];

        str += '$value&DESELECT='+              langArray['LTXT_SETUPSTORAGE_OPERATION_DELETE'];

        str += '$span&LTXT_ALLVIEW='+          langArray['LTXT_ALL_VIEW'];

        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupCameraMenu();

        return str;
    } else if (part == 'SETUPCAMTYPE') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();
        str += '$span&lang_camCh='+                 langArray['LTXT_SETUPCAMTYPE_CH'];
        str += '$span&lang_CameraType='+            langArray['LTXT_SETUPCAMTYPE_TYPE'];
        str += '$span&lang_selectAll='+             langArray['LTXT_SELECT_ALL'];
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// DIV Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupCameraMenu();

        return str;
    } else if (part == 'SETUPCAMTAMPER') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_TamperSetting='+	    langArray['LTXT_SETUPMENU_CAM_TAMPER'];

        str += '$span&lang_camCh='+                 langArray['LTXT_SETUP_CH'];
        str += '$span&lang_selectAll='+         langArray['LTXT_SELECT_ALL'];
        str += '$span&lang_Select='+                langArray['LTXT_SETUPCAMMOTION_SELECT'];
        //str += '$span&lang_Normal='+                langArray['LTXT_SETUPCAMMOTION_NORMAL'];

        str += '$span&lang_Normal='+                          langArray['LTXT_SETUPREC_OP_GENERAL'];

        str += '$span&lang_mark='+  langArray['LTXT_MARK'],

        str += '$span&lang_daytime='+               langArray['LTXT_SETUP_CAMMOTION_DAYTIME'];
        str += '$span&lang_nighttime='+             langArray['LTXT_SETUP_CAMMOTION_NIGHTTIME'];
        str += '$span&lang_Sensitivity='+           langArray['LTXT_SETUPCAMMOTION_SENSITIVITY'];
        str += '$span&lang_level='+                 langArray['LTXT_SETUPCAMMOTION_LEVEL'];
        str += '$span&lang_spatial='+               langArray['LTXT_SETUPCAMMOTION_SPATIAL'];
        str += '$span&lang_temporal='+              langArray['LTXT_SETUPCAMMOTION_TEMPORAL'];
        str += '$span&lang_tab_activation='+  langArray['LTXT_SETUP_CAMMOTION_ACTIVATION'],
        str += '$span&lang_activation='+            langArray['LTXT_SETUP_CAMMOTION_ACTIVATION'];
        str += '$span&lang_detect_mark='+            langArray['LTXT_SETUP_CAMMOTION_DETECTMARK'];

        ///////////////////// Value //////////////////////////////////
        str += '$value&lang_Selectall='+			langArray['LTXT_SETUPCAMMOTION_SELECTALL'];
        str += '$value&lang_Reverseall='+           langArray['LTXT_SETUPCAMMOTION_REVERSEALL'];
        str += '$value&lang_Deleteall='+            langArray['LTXT_SETUPCAMMOTION_DELETEALL'];
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupCameraMenu();

        str += '$divimg&lang_chno='+				langArray['LTXT_SETUPCAMMOTION_CHNO'];
        str += '$divimg&lang_Sensitivity='+         langArray['LTXT_SETUPCAMMOTION_SENSITIVITY'];
        return str;
    } else if (part == 'SETUPCAMDMVA') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_vasetup='+            langArray['LTXT_VCA_SETUP'];
        str += '$span&lang_vaRule='+            langArray['LTXT_VCA_RULE'];
        str += '$span&lang_vaSchedule='+            langArray['LTXT_VCA_SCHEDULE'];
        str += '$span&lang_vaChannel='+            langArray['LTXT_SETUPCAMIMAGE_CH'];
        str += '$span&lang_Time='+            langArray['LTXT_SETUPRECCONTINUOUS_TIME'];
        str += '$span&lang_on='+            langArray['LTXT_ON'];
        str += '$span&lang_off='+            langArray['LTXT_OFF'];
        str += '$option&lang_on='+            langArray['LTXT_ON'];
        str += '$option&lang_off='+            langArray['LTXT_OFF'];
        str += '$span&lang_activation='+            langArray['LTXT_VCA_ACTIVATION'];
        str += '$value&lang_vcaReset='+            langArray['LTXT_VCA_RESET'];
        str += '$value&lang_vcaStartWizard='+          langArray['LTXT_VCA_START_WIZARD'];
        str += '$value&lang_vcaShowSubmenu='+          langArray['LTXT_VCA_SHOW_SUBMENU'];


        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupCameraMenu();

        return str;

    } else if (part == 'SETUPDISPOSD') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();
        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_OSDsetting='+        langArray['LTXT_SETUPDISPOSD_DATA_MARK_SETUP'];
        } else {
          str += '$span&lang_OSDsetting='+				langArray['LTXT_SETUPDISPOSD_OSDSETTING'];
        }

        str += '$span&lang_Cameratitle='+            langArray['LTXT_SETUPDISPOSD_CAMERATITLE'];
        str += '$span&lang_Recordingmodeicon='+      langArray['LTXT_SETUPDISPOSD_RECORDINGMODEICON'];
        str += '$span&lang_Audiomodeicon='+         langArray['LTXT_SETUPDISPOSD_AUDIOICON'];

        str += '$span&lang_StatusbarFS='+		langArray['LTXT_SETUPDISPOSD_STATUSBAR'];
        str += '$span&lang_TimelineFS='+		langArray['LTXT_SETUPDISPOSD_TIMELINE'];

        str += '$span&lang_Border='+                 langArray['LTXT_SETUPDISPOSD_BORDERLINE'];
        str += '$span&lang_Bordercolor='+            langArray['LTXT_SETUPDISPOSD_BORDERCOLOR'];
        str += '$span&lang_Motionsensordisplay='+    langArray['LTXT_SETUPDISPOSD_MOTIONSENSORDISPLAY'];
        str += '$span&lang_Motioncolor='+            langArray['LTXT_SETUPDISPOSD_MOTIONCOLOR'];
        str += '$span&lang_Language='+               langArray['LTXT_SETUPDISPOSD_LANGUAGE'];

        str += '$span&lang_zoom_pip='+               langArray['LTXT_OSD_ZOOM_PIP'];
        str += '$span&lang_user_name='+              langArray['LTXT_OSD_USER_NAME'];
        ///////////////////// Value //////////////////////////////////
        str += '$option&lang_ENGLISH='              + langArray['LTXT_LANG_ENGLISH'];
        str += '$option&lang_KOREAN='             + langArray['LTXT_LANG_KOREAN'];
        str += '$option&lang_ITALIAN='              + langArray['LTXT_LANG_ITALIAN'];
        str += '$option&lang_SPANISH='              + langArray['LTXT_LANG_SPANISH'];
        str += '$option&lang_FRENCH='             + langArray['LTXT_LANG_FRENCH'];
        str += '$option&lang_GERMAN='             + langArray['LTXT_LANG_GERMAN'];
        str += '$option&lang_RUSSIAN='              + langArray['LTXT_LANG_RUSSIAN'];
        str += '$option&lang_POLISH='             + langArray['LTXT_LANG_POLISH'];
        str += '$option&lang_TURKISH='              + langArray['LTXT_LANG_TURKISH'];
        str += '$option&lang_THAI='             + langArray['LTXT_LANG_THAI'];
        str += '$option&lang_JAPANESE='             + langArray['LTXT_LANG_JAPANESE'];
        str += '$option&lang_CHINESE(S)='             + langArray['LTXT_LANG_CHINESE(S)'];
        str += '$option&lang_CHINESE(T)='             + langArray['LTXT_LANG_CHINESE(T)'];
        str += '$option&lang_PORTUGUESE='             + langArray['LTXT_LANG_PORTUGUESE'];
        str += '$option&lang_BRAZIL='             + langArray['LTXT_LANG_BRAZIL'];
        str += '$option&lang_DUTCH='              + langArray['LTXT_LANG_DUTCH'];
        str += '$option&lang_GREEK='              + langArray['LTXT_LANG_GREEK'];
        str += '$option&lang_BULGARIAN='              + langArray['LTXT_LANG_BULGARIAN'];
        str += '$option&lang_PERSIAN='              + langArray['LTXT_LANG_PERSIAN'];
        str += '$option&lang_CZECH='              + langArray['LTXT_LANG_CZECH'];
        str += '$option&lang_SWEDISH='              + langArray['LTXT_LANG_SWEDISH'];
        str += '$option&lang_FINNISH='              + langArray['LTXT_LANG_FINNISH'];

        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupDisplayMenu();

        return str;
    } else if (part == 'SETUPDISPMONITOR') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_Monitorsetting='+			langArray['LTXT_SETUPDISPMONITOR_MONITORSETTING'];

        str += '$span&lang_Sequencedwell='+			langArray['LTXT_SETUPDISPMONITOR_SEQUENCEDWELL'];
        str += '$span&lang_Spotdwell='+              langArray['LTXT_SETUPDISPMONITOR_SPOTDWELL'];
        str += '$span&lang_Deinterlacemode='+        langArray['LTXT_SETUPDISPMONITOR_DEINTERLACEMODE'];
        str += '$span&lang_Alarmpopupmode='+         langArray['LTXT_SETUPDISPMONITOR_ALARMPOPUPMODE'];
        str += '$span&lang_Alarmpopupdwell='+        langArray['LTXT_SETUPDISPMONITOR_ALARMPOPUPDWELL'];
        str += '$span&lang_Motionpopupmode='+        langArray['LTXT_SETUPDISPMONITOR_MOTIONPOPUPMODE'];
        str += '$span&lang_Motionpopupdwell='+       langArray['LTXT_SETUPDISPMONITOR_MOTIONPOPUPDWELL'];
        str += '$span&lang_AspectRatio='+            langArray['LTXT_SETUPDISPMONITOR_ASPECTRATIO'];
        str += '$span&lang_monitor_type='+           langArray['LTXT_SETUPDISPMONITOR_MONTYPE'];
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupDisplayMenu();

        return str;
    } else if (part == 'SETUPDISPSOUND') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_AudioSetting='+      langArray['LTXT_SETUPDISPSOUND_AUDIOSETUP'];
          str += '$span&lang_BuzzerSetting='+             langArray['LTXT_SETUPDISPSOUND_BUZZERSETUP'];
          str += '$span&lang_RemoteSetting='+             langArray['LTXT_SETUPDISPSOUND_REMOTESETTING_OPERATION'];
        } else {
          str += '$span&lang_AudioSetting='+      langArray['LTXT_SETUPDISPSOUND_AUDIOSETTING'];
          str += '$span&lang_BuzzerSetting='+             langArray['LTXT_SETUPDISPSOUND_BUZZERSETTING'];
          str += '$span&lang_RemoteSetting='+             langArray['LTXT_SETUPDISPSOUND_REMOTESETTING'];
        }

        str += '$span&lang_Liveaudio='+     langArray['LTXT_SETUPDISPSOUND_DEFAULTAUDIOCHANNEL'];
        str += '$span&lang_Defaultaudiochannel='+       langArray['LTXT_SETUPDISPSOUND_DEFAULTAUDIOCHANNEL'];
        str += '$span&lang_Networkaudiotransmission='+  langArray['LTXT_SETUPDISPSOUND_NETWORKAUDIOTRANSMISSION'];
        str += '$span&lang_Networkaudioreceive='+       langArray['LTXT_SETUPDISPSOUND_NETWORKAUDIORECEIVE'];

        str += '$span&lang_KeypadSetting='+             langArray['LTXT_SETUPDISPSOUND_KEYPAD'];
        if (INFO_VENDOR == 'SAMSUNG') {
            str += '$span&lang_Keypad='+                langArray['LTXT_SETUPDISPSOUND_KEYPAD_SAMSUNG'];
        } else {
            str += '$span&lang_Keypad='+                     langArray['LTXT_SETUPDISPSOUND_KEYPAD'];
        }

        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupSoundMenu();

        return str;
    } else if (part == 'SETUPSYSDATETIME') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_NetworkTimeSync='+           langArray['LTXT_SETUPSYSDATETIME_NETWORKTIMESYNC_SETUP'];
          str += '$span&lang_DateTimeSetup='+     langArray['LTXT_SEARCHBYEVENT_DATETIME_SETUP'];
        } else {
          str += '$span&lang_NetworkTimeSync='+           langArray['LTXT_SETUPSYSDATETIME_NETWORKTIMESYNC'];
          str += '$span&lang_DateTimeSetup='+     langArray['LTXT_SETUPMENU_SYS_DATETIME'];
        }

        str += '$span&lang_DateTimeSetting='+     langArray['LTXT_SETUPSYSDATETIME_DATETIMESETTING'];

        str += '$span&lang_Dateformat='+    langArray['LTXT_SETUPSYSDATETIME_DATEFORMAT'];
        str += '$span&lang_Timeformat='+                langArray['LTXT_SETUPSYSDATETIME_TIMEFORMAT'];
        str += '$span&lang_Networktimeserversetup='+    langArray['LTXT_SETUPSYSDATETIME_NETWORKTIMESERVERSETUP'];
        str += '$span&lang_Timezonesetup='+             langArray['LTXT_SETUPSYSDATETIME_TIMEZONESETUP'];
        str += '$span&lang_DST='+                       langArray['LTXT_SETUPSYSDATETIME_DST'];
        str += '$span&lang_TimezoneDST='+               langArray['LTXT_SETUPSYSDATETIME_TIMEZONEDST'];
        str += '$span&lang_AutoTimeSync='+              langArray['LTXT_SETUPSYSDATETIME_AUTOTIMESYNC'];
        str += '$span&lang_SyncCycle='+                 langArray['LTXT_SETUPSYSDATETIME_SYNCCYCLE'];
        str += '$span&lang_NextSyncTime='+              langArray['LTXT_SETUPSYSDATETIME_NEXTSYNCTIME'];
        str += '$span&lang_SyncTime='+                  langArray['LTXT_SETUPSYSDATETIME_SYNCTIME'];
        str += '$span&lang_SyncCycle='+                 langArray['LTXT_SETUPSYSDATETIME_SYNCCYCLE'];
        str += '$span&lang_NextSyncTime='+              langArray['LTXT_SETUPSYSDATETIME_NEXTSYNCTIME'];
        str += '$span&lang_Year='+                  langArray['LTXT_SETUPSYSDATETIME_YEAR'];
        str += '$span&lang_Mon='+                  langArray['LTXT_SETUPSYSDATETIME_MON'];
        str += '$span&lang_Day='+                  langArray['LTXT_SETUPSYSDATETIME_DAY'];
        str += '$span&lang_Hour='+                  langArray['LTXT_SETUPSYSDATETIME_HOUR'];
        str += '$span&lang_Min='+                  langArray['LTXT_SETUPSYSDATETIME_MINUTE'];
        str += '$span&lang_Sec='+                  langArray['LTXT_SETUPSYSDATETIME_SECOND'];
        str += '$span&lang_date='+                langArray['LTXT_DATE'];
        str += '$span&lang_confirm_password='+   langArray["LTXT_CONFIRM_PASSWORD"];
        str += '$span&lang_confirm_msg=' + langArray["LTXT_CONFIRM_CHANGE_TIME"];
        str += '$span&lang_progress_message=' + langArray['LTXT_SYSTIME_CHANGING'];

        ///////////////////// Option //////////////////////////////////
        str += '$option&lang_everyday='+                langArray['LTXT_SETUPSYSDATETIME_EVERY_DAY'];
        str += '$option&lang_7day='+                langArray['LTXT_SETUPSYSDATETIME_7_DAYS'];
        str += '$option&lang_30day='+                langArray['LTXT_SETUPSYSDATETIME_30_DAYS'];
        str += '$option&lang_60day='+                langArray['LTXT_SETUPSYSDATETIME_60_DAYS'];
        str += '$option&lang_180day='+                langArray['LTXT_SETUPSYSDATETIME_180_DAYS'];

        ///////////////////// Value //////////////////////////////////
        str += '$value&lang_SYNC='+						langArray['LTXT_SETUPSYSDATETIME_SYNC'];
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupSystemMenu();

        return str;
    } else if (part == 'SETUPSYSINFO')  /* added by chcha 2011-03-09 */ {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();
        if(INFO_VENDOR==='ALSOK') {
          str += '$span&lang_Resolution='+                langArray['LTXT_SETUPSYSINFO_MONITOR_RESOLUTION'];
        } else {
          str += '$span&lang_Resolution='+                langArray['LTXT_SETUPSYSINFO_RESOLUTION'];
        }



        str += '$span&lang_SystemInformationSetting='+   langArray['LTXT_SETUPSYSINFO_SYSTEMINFORMATIONSETTING'];

        str += '$span&lang_FWversion='+                 langArray['LTXT_SETUPSYSINFO_FWVERSION'];
        str += '$span&lang_network_fw_update=' +        langArray['LTXT_SETUPSYSMANAGE_NETFWUP'];
        str += '$span&lang_FWupdate='+                    langArray['LTXT_SETUPSYSINFO_FWUPDATE'];
        str += '$span&lang_HWVersion='+                 langArray['LTXT_SETUPSYSINFO_HWVERSION'];
        str += '$span&lang_Diskcapacity='+              langArray['LTXT_SETUPSYSINFO_DISKCAPACITY'];
        str += '$span&lang_DiskUsage='+                 langArray['LTXT_SETUPSYSINFO_DISKUSAGE'];
        str += '$span&lang_DiskNum='+                   langArray['LTXT_SETUPSYSINFO_DISKNUM'];
        str += '$span&lang_IPaddress='+                 langArray['LTXT_SETUPSYSINFO_IPADDRESS'];
        str += '$span&lang_MACaddress='+                langArray['LTXT_SETUPSYSINFO_MACADDRESS'];
        str += '$span&lang_DDNSdomainname='+            langArray['LTXT_SETUPSYSINFO_DDNSDOMAINNAME'];
        str += '$span&lang_Rtspport='+                  langArray['LTXT_SETUPSYSINFO_RTSPPORT'];
        str += '$span&lang_Webserviceport='+             langArray['LTXT_SETUPSYSINFO_WEBSERVICEPORT'];

        str += '$span&lang_SystemInformation='+         langArray['LTXT_SETUPSYSINFO_TITLE'];

        str += '$span&lang_CamConn='+                   langArray['LTXT_SETUPSYSINFO_CAMCONN'];
        str += '$span&lang_SensorCAM='+                 langArray['LTXT_SETUPSYSINFO_SENSORCAM'];
        str += '$span&lang_AlarmOutCAM='+               langArray['LTXT_SETUPSYSINFO_ALARMCAM'];
        str += '$span&lang_Systemid='+                langArray['LTXT_SETUPSYSINFO_SYSTEMID'];


        if( bNVR ) {
          str += '$span&lang_SensorDVR='+               langArray['LTXT_LIVE_ALARMIN_NVR'];
          str += '$span&lang_AlarmOutDVR='+             langArray['LTXT_LIVE_ALARMOUT_NVR'];
        } else {
          str += '$span&lang_SensorDVR='+               langArray['LTXT_LIVE_ALARMIN_DVR'];
          str += '$span&lang_AlarmOutDVR='+             langArray['LTXT_LIVE_ALARMOUT_DVR'];
        }

        str += '$span&lang_SystemStatus='+               langArray['LTXT_SETUPSYSINFO_STATUS'];

        ///////////////////// Value //////////////////////////////////
        str += '$value&lang_LOAD='+                      langArray['LTXT_SETUPSYSINFO_LOAD'];
        str += '$value&lang_SystemStatus='+              langArray['LTXT_SETUPSYSINFO_STATUS'];

        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupSystemMenu();

        return str;
    } else if (part == 'SETUPSYSMANAGE') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();
        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_autologout_duration=' + langArray['LTXT_SETUPSYSMANAGE_AUTOLOGOUT_TIME'];
          str += '$span&lang_Systemmanagement='+    langArray['LTXT_SETUPSYSMANAGE_SYSTEMMANAGEMENTSETUP'];
          str += '$value&FACTORY='+           langArray['LTXT_SETUPSYSMANAGE_LAUNCH'];
        } else {
          str += '$span&lang_autologout_duration=' + langArray['LTXT_SETUPSYSMANAGE_AUTOLOGOUT_DURATION'];
          str += '$span&lang_Systemmanagement='+    langArray['LTXT_SETUPSYSMANAGE_SYSTEMMANAGEMENTSETTING'];
          str += '$value&FACTORY='+           langArray['LTXT_SETUPSYSMANAGE_LOAD'];
        }



        str += '$span&lang_confirm_password='+   langArray["LTXT_CONFIRM_PASSWORD"];
        str += '$span&lang_fwupdate=' + langArray['LTXT_SETUPSYSMANAGE_FWUP'];
        str += '$span&lang_network_fw_update=' + langArray['LTXT_NET_FW_UPGRADE'];
        str += '$span&lang_fw_location=' + langArray['LTXT_FW_LOCATION'];
        str += '$span&lang_fwdefault=' + langArray['LTXT_SETUPSYSMANAGE_FACTORYDEFAULT'];
        str += '$span&lang_sysdata=' + langArray['LTXT_SETUPSYSMANAGE_SYSTEMDATA'];
        str += '$span&lang_Systemid='+  langArray['LTXT_SETUPSYSMANAGE_SYSTEMID'];
        str += '$span&lang_passwd=' + langArray['LTXT_SETUPSYSMANAGE_PASSWORD'];
        str += '$span&lang_passwd_expire=' + langArray['LTXT_SETUPSYSMANAGE_PASSWORDEXPIRE'];
        str += '$span&lang_autologout=' + langArray['LTXT_SETUPSYSMANAGE_AUTOLOGOUT'];
        str += '$span&lang_autologout_duration=' + langArray['LTXT_SETUPSYSMANAGE_AUTOLOGOUT_WAITTIME'];
        str += '$span&lang_ddnsname=' + langArray['LTXT_SETUPSYSMANAGE_DDNSHOSTNAME'];
        str += '$span&lang_ddnsstatus=' + langArray['LTXT_SETUPSYSMANAGE_DDNSSTATUS'];
        str += '$span&lang_poelimit=' + langArray['LTXT_SETUPSYSMANAGE_POELIMIT'];
        str += '$span&lang_powerfreq=' + langArray['LTXT_SETUPSYSMANAGE_POWERFREQ'];
        str += '$span&lang_factory_default='+           langArray['LTXT_SETUPSYSMANAGE_FACTORYDEFAULT'];
        str += '$span&lang_systemdata='+           langArray['LTXT_SETUPSYSMANAGE_SYSTEMDATA'];
        str += '$span&lang_fac_message='+           langArray['LTXT_SETUPSYSMANAGE_FAC_MESSAGE'];
        str += '$span&lang_save='+           langArray['LTXT_SETUPSYSMANAGE_SAVE'];
        str += '$span&lang_load='+           langArray['LTXT_SETUPSYSMANAGE_LOAD'];
        str += '$span&lang_reboot='+           langArray['LTXT_SETUPSYSMANAGE_REBOOT'];
        str += '$span&lang_btn_reboot='+           langArray['LTXT_SETUPSYSMANAGE_REBOOT_BTN'];
        str += '$span&lang_reboot_message='+           langArray['LTXT_SETUPSYSMANAGE_REBOOT_MESSAGE'];
        str += '$span&lang_renew_passwd='+  langArray['LTXT_RENEW_PASSWORD'];




        ///////////////////// Value //////////////////////////////////
        str += '$value&lang_save=' + langArray['LTXT_SETUPSYSMANAGE_FWUP'];
        str += '$value&lang_load=' + langArray['LTXT_SETUPSYSMANAGE_LOAD'];
        str += '$value&UPGRADE=' + langArray['LTXT_SETUPSYSMANAGE_FWUP'];
        str += '$value&RESTART=' + langArray['LTXT_SETUPSYSMANAGE_REBOOT_BTN'];
        str += '$value&VERIFY=' + langArray['LTXT_VERIFY_INTEGRITY'];
        str += '$value&YES=' + langArray['LTXT_OK'];
        str += '$value&NO=' + langArray['LTXT_CANCEL'];
        str += '$value&lang_SystemStatus='+              langArray['LTXT_SETUPSYSINFO_STATUS'];
        str += '$value&SAVE='+           langArray['LTXT_SETUPSYSMANAGE_SAVE'];
        str += '$value&LOAD='+           langArray['LTXT_SETUPSYSMANAGE_LOAD'];




        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupSystemMenu();

        return str;
    } else if (part == 'SETUPSYSCONTROLDEV') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        if((INFO_VENDOR == 'TAKENAKA') && (INFO_MODEL).indexOf('IPX')<0)
        {
          str += '$span&lang_ControldeviceSetting='+  langArray['LTXT_SETUPDISPSOUND_REMOTESETTING'];
        }
        else
        {
          str += '$span&lang_ControldeviceSetting='+  langArray['LTXT_SETUPSYSCONTROLDEV_CONTROLDEVICESETTING'];
        }

        str += '$span&lang_Chno='+			langArray['LTXT_SETUPSYSCONTROLDEV_CHNO'];
        str += '$span&lang_SystemID='+                  langArray['LTXT_SETUPSYSCONTROLDEV_SYSTEMID'];
        str += '$span&lang_Protocol='+                  langArray['LTXT_SETUPSYSCONTROLDEV_PROTOCOL'];
        str += '$span&lang_Baudrate='+                  langArray['LTXT_SETUPSYSCONTROLDEV_BAUDRATE'];
        str += '$span&lang_Device='+                   langArray['LTXT_SETUPSYSCONTROLDEV_DEVICE'];
        str += '$span&lang_secom_dual='             + langArray['LTXT_SECOM_DUAL'];
        str += '$span&lang_controller_linkage='     + langArray['LTXT_CONTROLLER_LINKAGE'];
        str += '$span&lang_controller_ip_address='  + langArray['LTXT_CONTROLLER_IP_ADDRESS'];
        str += '$span&lang_controller_port='        + langArray['LTXT_CONTROLLER_PORT'];

        str += '$span&lang_rmc='                    + langArray['LTXT_SETUPDISPSOUND_REMOTESETTING'];
        str += '$span&lang_rmcID='                   + langArray['LTXT_SETUPSYSCONTROLDEV_SYSTEMID_SAMSUNG'];

        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        str += '$value&registration_request='  + langArray['LTXT_CONTROLLER_REQUEST'];
        str += '$value&registration_view='     + langArray['LTXT_CONTROLLER_VIEW'];
        str += '$value&communication_view='   + langArray['LTXT_COMMUNICATION_VIEW'];
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupSystemMenu();

        return str;

    } else if (part == 'SETUPSYSSECURITY') {
      ///////////////////// Text //////////////////////////////////
      str = lang_TopMenu();

      str += '$span&lang_System_security='+  langArray['LTXT_SETUPMENU_SYS_SECURITY'];

      str += '$span&lang_System_security='+    langArray['LTXT_SETUPSYSSECURITY_SECURITY'];
      str += '$span&lang_data_security='+    langArray['LTXTL_SETUPMENU_SYS_DATASECURITY'];
      str += '$span&lang_account_security='+    langArray['LTXTL_SETUPMENU_SYS_ACCOUNTSECURITY'];

      str += '$span&lang_audio_support=' + langArray['LTXT_SETUPSYSSECURITY_AUDIO_SUPPORT'];
      str += '$span&lang_snapshot_support=' + langArray['LTXT_SETUPSYSSECURITY_SNAPSHOT_SUPPORT'];
      str += '$span&lang_enhanced_password_rule=' + langArray['LTXT_SETUPSYSSECURITY_ENHANCED_PASSWORD_RULE'];
      str += '$span&lang_enhanced_id_rule=' + langArray['LTXT_SETUPSYSSECURITY_ENHANCED_USERID_RULE'];
      str += '$span&lang_password_check_when_search_or_backup=' + langArray['LTXT_SETUPSYSSECURITY_PASSWORD_CHECK_WHEN_SEARCH_OR_BACKUP'];
      str += '$span&lang_raw_backup=' + langArray['LTXT_SETUPSYSSECURITY_RAW_BACKUP'];

      str += '$span&lang_dual_login=' + langArray['LTXT_SETUPMENU_SYS_DOUBLELOGIN'];
      str += '$span&lang_id_input_mode=' + langArray['LTXT_SETUPSYSSECURITY_ID_INPUT_METHOD'];

      str += lang_setupOkCancel();
      ///////////////////// Div Img //////////////////////////////////
      str += lang_setupMenu();

      str += lang_setupSystemMenu();

      return str;
    } else if (part == 'SETUPUSERMANAGEMENT') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_Usermanagementsetting='+ langArray['LTXT_SETUPUSERMANAGEMENT_USERMANAGEMENTSETUP'];
          str += '$span&lang_EMail='+                  langArray['LTXT_SETUPUSERMANAGEMENT_EMAIL_ADDRESS'];
          str += '$span&lang_email='+                langArray['LTXT_SETUPUSERMANAGEMENT_EMAIL_ADDRESS'] ;
        } else {
          str += '$span&lang_Usermanagementsetting='+ langArray['LTXT_SETUPUSERMANAGEMENT_USERMANAGEMENTSETTING'];
          str += '$span&lang_EMail='+                  langArray['LTXT_SETUPUSERMANAGEMENT_EMAIL'];
          str += '$span&lang_email='+                  langArray['LTXT_SETUPUSERMANAGEMENT_EMAIL'];
        }


        str += '$span&lang_UserID='+          langArray['LTXT_SETUPUSERMANAGEMENT_USERID'];
        str += '$span&lang_Password='+               langArray['LTXT_SETUPUSERMANAGEMENT_PASSWORD'];
        str += '$span&lang_current_pw='+              langArray['LTXT_SETUPUSERMANAGEMENT_CURRENT_PW'];
        str += '$span&lang_confirm_pw='+              langArray['LTXT_SETUPUSERMANAGEMENT_CONFIRM_PW'];
        str += '$span&lang_new_pw='+                  langArray['LTXT_SETUPUSERMANAGEMNET_NEW_PW'];
        str += '$span&lang_Group='+                  langArray['LTXT_SETUPUSERMANAGEMENT_GROUP'];
        str += '$span&lang_Notification='+           langArray['LTXT_SETUPUSERMANAGEMENT_NOTIFICATION'];
        str += '$span&lang_Covert='+              langArray['LTXT_SETUPUSER_COVERT'];
        str += '$span&lang_Del='+                 langArray['LTXT_SETUP_DEL'];
        str += '$span&lang_Edit='+                 langArray['LTXT_EDIT'];
        str += '$span&lang_Add='+                 langArray['LTXT_SETUP_ADD'];
        str += '$span&lang_userid='+                langArray['LTXT_SETUPUSER_USERID'] ;
        str += '$span&lang_passwd='+                langArray['LTXT_SETUPUSER_PASSWD'] ;
        str += '$span&lang_group='+                langArray['LTXT_SETUPUSER_GROUP'] ;
        str += '$span&lang_emailnoti='+                langArray['LTXT_SETUPUSER_EMAILNOTI'] ;
        str += '$span&lang_mobile='+                langArray['LTXT_MOBILE'] ;
        str += '$span&lang_mobile_notify='+         langArray['LTXT_MOBILE_NOTIFY'] ;
        str += '$span&lang_Email_Server='+         langArray['LTXT_MAIL_SERVER'] ;

        str += '$span&lang_covert='+                langArray['LTXT_SETUPUSER_COVERT'] ;
        str += '$span&passwd_rule0='+ '*' +    langArray['LTXT_SETUPUSER_PASSWDRULE0'];
        str += '$span&passwd_rule1='+ '(1)' +    langArray['LTXT_SETUPUSER_PASSWDRULE1'];
        if(INFO_VENDOR.indexOf("VIDECON") >= 0) {
          str += '$span&passwd_rule2='+ '(2)' +    langArray['LTXT_SETUPUSER_PASSWDRULE2_VIDECON'];
        } else {
        str += '$span&passwd_rule2='+ '(2)' +    langArray['LTXT_SETUPUSER_PASSWDRULE2_ENHANCE'];
        }
        str += '$span&passwd_rule3='+ '(3)' +    langArray['LTXT_SETUPUSER_PASSWDRULE3'];
        str += '$span&passwd_rule4='+ '(4)' +    langArray['LTXT_SETUPUSER_PASSWDRULE4'];
        str += '$span&passwd_rule5='+ '(5)' +    langArray['LTXT_SETUPUSER_PASSWDRULE5'];
        str += '$span&passwd_rule6='+ '(6)' +    langArray['LTXT_SETUPUSER_PASSWDRULE6'];
        str += '$span&passwd_rule7='+ '(*)' +    langArray['LTXT_ERR_USERID_LENGTH'];
        str += '$span&lang_confirm_password='+   langArray["LTXT_CONFIRM_PASSWORD"];

        ///////////////////// Value //////////////////////////////////
        str += '$value&lang_Del='+                 langArray['LTXT_SETUP_DEL'];
        str += '$value&lang_Edit='+                 langArray['LTXT_EDIT'];
        str += '$value&lang_Add='+                langArray['LTXT_COMBO_MENU_ADD'] ;
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupUserMenu();

        return str;
    } else if (part == 'SETUPUSERAUTHORITY') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_Groupauthoritysetting='+ langArray['LTXT_SETUPUSERAUTHORITY_USERAUTHORITYSETUP'];
        } else {
          str += '$span&lang_Groupauthoritysetting='+	langArray['LTXT_SETUPMENU_GROUP_AUTHORITY'];
        }

        str += '$span&lang_Manager='+			langArray['LTXT_SETUPUSERAUTHORITY_MANAGER'];
        str += '$span&lang_User='+                   langArray['LTXT_SETUPUSERAUTHORITY_USER'];
        str += '$span&lang_Search='+                 langArray['LTXT_SETUPUSERAUTHORITY_SEARCH'];
        str += '$span&lang_Archiving='+              langArray['LTXT_SETUPUSERAUTHORITY_ARCHIVING'];

        str += '$span&lang_SysSetup='+                  langArray['LTXT_SETUPUSER_SYSSETUP'];
        str += '$span&lang_RecSet='+                langArray['LTXT_SETUPUSER_RECSET'];
        str += '$span&lang_EvtAct='+                langArray['LTXT_SETUPUSER_EVTACT'];
        str += '$span&lang_AudListen='+             langArray['LTXT_SETUPUSER_AUDLISTEN'];
        str += '$span&lang_mic='+                   langArray['LTXT_SETUPUSER_MIC'];
        str += '$span&lang_RemoteAgent='+           langArray['LTXT_SETUPUSER_REMOTEAGENT'];
        str += '$span&lang_shutdown='+              langArray['LTXT_SETUPUSER_SHUTDOWN'];

        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupUserMenu();

        return str;
    } else if (part == 'SETUPUSERLOGOUT') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_Logoutsetting='+	langArray['LTXT_SETUPUSERLOGOUT_LOGOUTSETTING'];

        str += '$span&lang_Autologout='+		langArray['LTXT_SETUPUSERLOGOUT_AUTOLOGOUT'];
        str += '$span&lang_Duration='+       langArray['LTXT_SETUPUSERLOGOUT_DURATION'];
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupUserMenu();

        return str;
    } else if (part == 'SETUPUSERIPSETUP') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_IPsetupsetting='+	langArray['LTXT_SETUPUSERIPSETUP_IPSETUPSETTING'];
        str += '$span&lang_dhcpon=' +         langArray['LTXT_SETUPUSERIPSETUP_DHCPON'];
        str += '$span&lang_ipaddress='+			langArray['LTXT_SETUPUSERIPSETUP_IPADDRESS'];
        str += '$span&lang_subnetmask='+			langArray['LTXT_SETUPUSERIPSETUP_SUBNETMASK'];
        str += '$span&lang_gateway='+			langArray['LTXT_SETUPUSERIPSETUP_GATEWAY'];
        str += '$span&lang_dns1server='+			langArray['LTXT_SETUPUSERIPSETUP_DNS1STSERVER'];
        str += '$span&lang_dns2server='+			langArray['LTXT_SETUPUSERIPSETUP_DNS2STSERVER'];
        str += '$span&lang_Rtspport='+           langArray['LTXT_SETUPUSERIPSETUP_NETCLIENTPORT'];
        str += '$span&lang_Webserviceport='+     langArray['LTXT_SETUPUSERIPSETUP_WEBSERVICEPORT'];
        str += '$span&lang_MaxTXspeed='+         langArray['LTXT_SETUPUSERIPSETUP_MAXTXSPEED'];
        str += '$span&lang_DDNS='+               langArray['LTXT_SETUPUSERIPSETUP_DDNS'];
        str += '$span&lang_autoport_update='+    langArray['LTXT_SYSSET_NETWORK_AUTOPORTUPDATE'];
        str += '$span&lang_autoport_status='+    langArray['LTXT_SYSSET_NETWORK_AUTOPORTSTATUS'];


        ///////////////////// Value //////////////////////////////////

        str += '$value&RENEW='+               langArray['LTXT_SETUPUSERIPSETUP_RENEW'];
        str += '$value&AUTO PORT FORWARDING='+               langArray['LTXT_SETUPUSERIPSETUP_RTSPPORTAUTO'];
        str += '$value&REMOVE PORT='+               langArray['LTXT_SETUPUSERIPSETUP_RTSPREMOVE'];
        str += '$value&CONFIRM CONFLICT='+          langArray['LTXT_SYSSET_NETWORK_CONFIRMCONFLICT'];

        str += lang_setupOkCancel();


        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupNetMenu();

        return str;
    } else if (part == 'SETUPUSEREMAIL') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        if(INFO_VENDOR==='ALSOK') {
          str += '$span&lang_User='+           langArray['LTXT_SETUPUSERMANAGEMENT_ACOUNT_NAME'];
          str += '$span&lang_Emailsetting='+  langArray['LTXT_SETUPMENU_NET_MAIL_SETUP'];
        } else {
          str += '$span&lang_User='+           langArray['LTXT_SETUPUSEREMAIL_USER'];
          str += '$span&lang_Emailsetting='+  langArray['LTXT_SETUPUSEREMAIL_EMAILSETTING'];
        }


        str += '$span&lang_Server='+      langArray['LTXT_SETUPUSEREMAIL_SERVER'];
        str += '$span&lang_Port='+           langArray['LTXT_SETUPUSEREMAIL_PORT'];
        str += '$span&lang_Security='+       langArray['LTXT_SETUPUSEREMAIL_SECURITY'];
        str += '$span&lang_Password='+       langArray['LTXT_SETUPUSEREMAIL_PASSWORD'];
        str += '$span&lang_From='+           langArray['LTXT_SETUPUSEREMAIL_FROM'];
        str += '$span&lang_testemail='+      langArray['LTXT_SETUPUSEREMAIL_TESTEMAILADDRESS'];
        str += '$span&lang_DefaultServer='+  langArray['LTXT_SETUPUSEREMAIL_DEFAULTSERVER'];
        str += '$span&lang_mail_server1=' + langArray['LTXT_MAIL_SERVER'];
        str += '$span&lang_mail_server2=' + langArray['LTXT_MAIL_SERVER'];
        str += '$span&lang_Individual_Email=' + langArray['LTXT_SENDING_INDIVIDUAL_EMAILS'];
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        str += '$value&lang_test='+         langArray['LTXT_SETUPUSEREMAIL_TEST'];
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupNetMenu();

        return str;
    } else if (part == 'SETUPNETWORKSECURITY') {
      str = lang_TopMenu();
      str += '$span&lang_security='+  langArray['LTXT_SETUPMENU_SYS_SECURITY'];
      str += '$span&lang_encryption='+  langArray['LTXT_ENCRYPTION'];
      str += '$span&lang_ipfilter='+  langArray['LTXT_IPFILTER'];
      str += '$span&lang_rtsp_service='+  langArray['LTXT_RTSP_SERVICE'];
      str += '$span&lang_rtspencenable='+  langArray['LTXT_RTSP_ENC_ENABLE'];
      str += '$span&lang_rtspencmethod='+  langArray['LTXT_RTSP_ENC_METHOD'];
      str += '$span&lang_webservice='+  langArray['LTXT_WEB_SERVICE'];
      str += '$span&lang_httpsenable='+  langArray['LTXT_HTTPS_ENABLE'];
      str += '$span&lang_httpauthmethod='+  langArray['LTXT_HTTP_AUTH_METHOD'];
      str += '$span&lang_ipfilterenable='+  langArray['LTXT_IPFILTER_ENABLE'];
      str += '$span&lang_ipfilterrule='+  langArray['LTXT_IPFILTER_RULE'];
      str += '$span&lang_type='+  langArray['LTXT_TYPE'];
      str += '$span&lang_list='+  langArray['LTXT_LIST'];
      str += '$span&lang_address='+  langArray['LTXT_ADDRESS'];
      str += '$value&DELETE='+                 langArray['LTXT_SETUP_DEL'];
      str += '$value&EDIT='+                 langArray['LTXT_EDIT'];
      str += '$value&ADD='+                 langArray['LTXT_SETUP_ADD'];
      
      str += lang_setupOkCancel();
      str += lang_setupMenu();

      str += lang_setupNetMenu();

      return str;
    } else if (part == 'SETUPNETWORKRTP') {
      str = lang_TopMenu();
      str += '$span&lang_security='+  langArray['LTXT_SETUPMENU_SYS_SECURITY'];
      str += '$span&lang_audiobackchannel='+ langArray['LTXT_RTP_AUDIO_BACKCH']
      str += '$span&lang_rtp_portrange='+ langArray['LTXT_RTP_PORT_RANGE'];
      str += '$span&lang_audiobackch_mode='+ langArray['LTXT_SETUPCAMCAMSETUP_MODE'];
      str += '$span&lang_audiobackch_port='+ langArray['LTXT_SETUPUSEREMAIL_PORT'];
      str += '$span&lang_first_stream='+ langArray['LTXT_RTP_1ST_STREAM'];
      str += '$span&lang_second_stream='+ langArray['LTXT_RTP_2ND_STREAM'];
      str += '$span&lang_streamip='+ langArray['LTXT_RTP_MULTICAST_IP'];
      str += '$span&lang_videoport='+ langArray['LTXT_VIDEO_PORT'];
      str += '$span&lang_audioport='+ langArray['LTXT_AUDIO_PORT'];
      str += '$span&lang_channel='+ langArray['LTXT_SEARCHBYTEXTSEARCH_CHANNEL'];
      str += lang_setupOkCancel();
      str += lang_setupMenu();

      str += lang_setupNetMenu();

      return str;
    } else if (part == 'SETUPUSERDDNS') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_DDNSservername='+    langArray['LTXT_SETUPSYSMANAGE_DDNSDOMAINNAME'];
          str += '$span&lang_ddnssetup='+          langArray['LTXT_DDNS_SETUP'];
          str += '$span&lang_DDNSsetupsetting='+  langArray['LTXT_SETUPUSERDDNS_DDNSSETTING'];
        } else {
          str += '$span&lang_DDNSservername='+    langArray['LTXT_DDNS_SERVER'];

        }

        str += '$span&lang_DDNS='+          langArray['LTXT_SETUPUSERIPSETUP_DDNS'];
        str += '$span&lang_DDNSservername='+		langArray['LTXT_DDNS_SERVER'];
        str += '$span&lang_userid='+             langArray['LTXT_USERNAME'];
        str += '$span&lang_domainname='+         langArray['LTXT_SETUPUSERDDNS_DOMAINNAME'];
        str += '$span&lang_password='+           langArray['LTXT_SETUPUSEREMAIL_PASSWORD'];

        var dvrAddrStr = "";

        if( bNVR ) {
          str += '$span&lang_DVRName='+             langArray['LTXT_SETUPUSERDDNS_NVRNAME'];
          str += '$span&lang_NVRAddr='+             langArray["LTXT_SETUPUSERDDNS_NVRADDR"];
        } else {
          str += '$span&lang_DVRName='+             langArray['LTXT_SETUPUSERDDNS_DVRNAME'];
          str += '$span&lang_NVRAddr='+             langArray["LTXT_SETUPUSERDDNS_DVRADDR"];
        }
        if( INFO_VENDOR.indexOf("S1") >= 0 ) {
          str += '$span&lang_NVRAddr='+             langArray["LTXT_NVR_ADDRESS"];
          str += '$span&lang_DVRName='+             langArray['LTXT_SETUPUSERDDNS_NVRNAME'];
        }

        str += '$span&lang_sequrinet='+             langArray['LTXT_SEQURINET'];

        str += '$span&lang_Off='+                    langArray['LTXT_SETUPRECALARMACT_OFF'];
        str += '$span&lang_On='+                     langArray['LTXT_SETUPRECALARMACT_ON'];
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        str += '$value&lang_status='+             langArray['LTXT_LIVE_STATUS'];
        str += '$value&lang_DDNSRegTest='+           langArray['LTXT_DDNS_REG_TEST'];
        str += '$value&lang_DDNSConnTest='+           langArray['LTXT_DDNS_CONN_TEST'];
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupNetMenu();

        return str;
    } else if (part == 'SETUPEVENTALARMOUTPUT') {
        /* Event & Action */
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_event='+               langArray['LTXT_SETUPMENU_ALARM_MOTION'];
          str += '$span&lang_Alarmoutputsetting='+ langArray['LTXT_SETUPMENU_EVENT_ALARMOUTPUT_SETUP'];
        } else {
          str += '$span&lang_event='+               langArray['LTXT_SETUPEVENT_EVENT'];
          str += '$span&lang_Alarmoutputsetting='+ langArray['LTXT_SETUPEVENTALARMOUTPUT_ALARMOUTPUTSETTING'];
        }


        str += '$span&lang_chno='+                   langArray['LTXT_SETUPEVENTALARMINPUT_CHNO'];
        str += '$span&lang_Name='+                  langArray['LTXT_NAME'];
        str += '$span&lang_Type='+               langArray['LTXT_SETUPEVENTALARMOUTPUT_TYPE'];
        str += '$span&lang_Operation='+          langArray['LTXT_SETUPEVENTALARMOUTPUT_OPERATION'];
        str += '$span&lang_digitalout='+         langArray['LTXT_SETUPEVENT_DIGITALOUT'];

        str += '$span&lang_Alarm='+                  langArray['LTXT_LIVE_ALARM'];
        str += '$span&lang_Motion='+                 langArray['LTXT_LIVE_MOTION'];
        str += '$span&lang_Videoloss='+              langArray['LTXT_LIVE_VIDEOLOSS'];
        str += '$span&lang_Alarmout='+           langArray['LTXT_SETUPEVENTALARMOUTPUT_ALARMOUT'];

        str += '$span&lang_EventSched='+         langArray['LTXT_SETUPEVENT_ONOFF_SCHED'];
        str += '$span&lang_Mode='+               langArray['LTXT_SETUPEVENTALARMOUTPUT_MODE'];
        str += '$span&lang_Duration='+           langArray['LTXT_SETUPEVENTALARMOUTPUT_DURATION'];
        str += '$span&lang_HDDevent='+           langArray['LTXT_SETUPEVENTALARMOUTPUT_HDDEVENT'];
        str += '$span&lang_selectAll='+          langArray['LTXT_SELECT_ALL'];
        str += '$span&lang_day='+               langArray['LTXT_SETUPEVENT_DAY'];

        str += '$span&lang_off='+               langArray['LTXT_OFF'];
        str += '$span&lang_on='+               langArray['LTXT_ON'];

        str += ' $span&lang_sunday=' + langArray['LTXT_COMBO_MENU_SUN'];
        str += ' $span&lang_monday=' + langArray['LTXT_COMBO_MENU_MON'];
        str += ' $span&lang_tuesday=' + langArray['LTXT_COMBO_MENU_TUE'];
        str += ' $span&lang_wednesday=' + langArray['LTXT_COMBO_MENU_WED'];
        str += ' $span&lang_thursday=' + langArray['LTXT_COMBO_MENU_THU'];
        str += ' $span&lang_friday=' + langArray['LTXT_COMBO_MENU_FRI'];
        str += ' $span&lang_satday=' + langArray['LTXT_COMBO_MENU_SAT'];

        str += lang_setupChannel();
        ///////////////////// Value //////////////////////////////////
        str += '$value&lang_copysched='+          langArray['LTXT_SETUPEVENT_COPY_SCHED'];
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupEventMenu();

        return str;
    } else if (part == 'SETUPEVENTNOTI') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_mail_freq='+       langArray['LTXT_SETUPEVENTNOTI_EMAIL_DELAYTIME'];
          str += '$span&lang_dialog_email='+             langArray['LTXT_SETUPUSERMANAGEMENT_EMAIL_ADDRESS'];
        } else {
          str += '$span&lang_mail_freq='+       langArray['LTXT_SETUPEVENTNOTI_EMAIL_FREQ'];
          str += '$span&lang_dialog_email='+             langArray['LTXT_SETUPUSERMANAGEMENT_EMAIL'];
        }

        str += '$span&lang_Emailnotificationsetting='+    langArray['LTXT_SETUPEVENTNOTI_NOTIFICATIONSETTING'];

        str += '$span&lang_chno='+                   langArray['LTXT_SETUPEVENTALARMINPUT_CHNO'];
        str += '$span&lang_Alarm='+                  langArray['LTXT_LIVE_ALARM'];
        str += '$span&lang_Motion='+                 langArray['LTXT_LIVE_MOTION'];
        str += '$span&lang_Videoloss='+              langArray['LTXT_LIVE_VIDEOLOSS'];

        str += '$span&lang_Notification='+           langArray['LTXT_SETUPEVENTNOTI_NOTIFICATION'];
        str += '$span&lang_Frequency='+              langArray['LTXT_SETUPEVENTNOTI_FREQUENCY'];
        str += '$span&lang_selectAll='+              langArray['LTXT_SELECT_ALL'];

        str += '$span&lang_EventNoti='+              langArray['LTXT_SETUPMENU_EVENT_NOTIFICATION'];
        str += '$span&lang_Buzzeroutsetting='+       langArray['LTXT_SETUPEVENTNOTI_BUZZEROUT'];
        str += '$span&lang_disp='+                    langArray['LTXT_SETUPEVENTNOTI_DISPLAY'];
        str += '$span&lang_email='+             langArray['LTXT_SETUPEVENTNOTI_EMAIL'];
        str += '$span&lang_list='+             langArray['LTXT_LIST'];
        str += '$span&lang_emailnoti='+             langArray['LTXT_SETUPEVENTNOTI_EMAILNOTI'];
        str += '$span&lang_emailsched=' +           langArray['LTXT_RECEIVING_EMAIL_SETUP'];

        str += '$span&lang_alarm_switch_mode='+   langArray['LTXT_SWITCH_MODE'];
        str += '$span&lang_alarm_switch_port='+   langArray['LTXT_SWITCH_PORT'];

        str += '$span&lang_day='+                 langArray['LTXT_SETUPEVENT_DAY'];
        str += '$span&lang_time='+                langArray['LTXT_SETUPRECCONTINUOUS_TIME'];
        str += '$span&lang_sched_sun='+           langArray['LTXT_COMBO_MENU_SUN'];
        str += '$span&lang_sched_mon='+           langArray['LTXT_COMBO_MENU_MON'];
        str += '$span&lang_sched_tue='+           langArray['LTXT_COMBO_MENU_TUE'];
        str += '$span&lang_sched_wed='+           langArray['LTXT_COMBO_MENU_WED'];
        str += '$span&lang_sched_thu='+           langArray['LTXT_COMBO_MENU_THU'];
        str += '$span&lang_sched_fri='+           langArray['LTXT_COMBO_MENU_FRI'];
        str += '$span&lang_sched_sat='+           langArray['LTXT_COMBO_MENU_SAT'];

        str += '$span&lang_vpopup='+              langArray['LTXT_SETUPEVENTNOTI_VPOPUP'];
        str += '$span&lang_opopup='+              langArray['LTXT_SETUPEVENTNOTI_OPOPUP'];
        str += '$span&lang_Duration='+              langArray['LTXT_SETUPEVENTBUZZER_DURATION'];
        str += '$span&lang_vpopup_Duration='+              langArray['LTXT_SETUPEVENTBUZZER_DURATION'];
        str += '$span&lang_opopup_Duration='+              langArray['LTXT_SETUPEVENTBUZZER_DURATION'];
        str += '$span&lang_Email_Server='+         langArray['LTXT_MAIL_SERVER'] ;
        str += '$span&lang_Add_Email='+       langArray['LTXT_SETUPEVENTNOTI_ADD_EMAIL'];

        str += '$span&lang_include_snapshot_image='+ langArray['LTXT_SETUPEVENTNOTI_INCLUDE_SNAPSHOT_IMAGE'];
        str += '$span&lang_ftpnotification=' + langArray['LTXT_FTP_NOTIFICATION'];
        str += '$span&lang_ftpserver=' + langArray['LTXT_FTP_SERVER'];
        str += '$value&EDIT=' + langArray['LTXT_EDIT'];
        str += '$span&lang_directory=' + langArray['LTXT_DIRECTORY'];
        str += '$span&lang_file_name=' + langArray['LTXT_FILENAME'];
        str += '$span&lang_webra_link=' + langArray['LTXT_WEBRA_LINK'];
        str += '$span&lang_minimum_frequency=' + langArray['LTXT_MINIMUM_FREQUENCY'];
        str += '$span&lang_include_snapshot_image=' + langArray['LTXT_INCLUDE_SNAPSHOT_IMAGE'];
        str += '$span&lang_host_name=' + langArray['LTXT_HOSTNAME'];
        str += '$span&lang_port=' + langArray['LTXT_PORT'];
        str += '$span&lang_user_name=' + langArray['LTXT_USERNAME'];
        str += '$span&lang_password=' + langArray['LTXT_PASSWORD'];

        str += '$span&lang_evtftp_help_1=' + '1. ' + langArray['LTXT_EVTFTP_HELP_1'];
        str += '$span&lang_evtftp_help_2=' + '2. ' + langArray['LTXT_EVTFTP_HELP_2'];

        str += '$value&CONNECTION_TEST=' + langArray['LTXT_CONNECTION_TEST'];

        str += '$span&lang_smsnotification=' + langArray['LTXT_SMS_NOTIFICATION'];
        str += '$span&lang_server=' + langArray['LTXT_SERVER'];
        str += '$span&lang_app_id=' + langArray['LTXT_APP_ID'];
        str += '$span&lang_user=' + langArray['LTXT_USER'];
        str += '$span&lang_schedule=' + langArray['LTXT_SCHEDULE'];

        str += '$span&lang_emailnoti_sched='+     langArray['LTXT_SETUPMENU_EVENT_EMAILNOTIFICATION_SCHEDULE'] ;
        str += '$span&lang_schedule1=' + langArray['LTXT_SCHEDULE'] + "1";
        str += '$span&lang_schedule2=' + langArray['LTXT_SCHEDULE'] + "2";
        str += '$span&lang_schedule3=' + langArray['LTXT_SCHEDULE'] + "3";
        str += '$span&lang_schedule4=' + langArray['LTXT_SCHEDULE'] + "4";
        str += '$span&lang_schedule5=' + langArray['LTXT_SCHEDULE'] + "5";
        str += '$span&lang_schedule6=' + langArray['LTXT_SCHEDULE'] + "6";
        str += '$span&lang_schedule7=' + langArray['LTXT_SCHEDULE'] + "7";
        str += '$span&lang_schedule8=' + langArray['LTXT_SCHEDULE'] + "8";
        str += '$span&lang_schedule9=' + langArray['LTXT_SCHEDULE'] + "9";
        str += '$span&lang_schedule10=' + langArray['LTXT_SCHEDULE'] + "10";
        str += '$span&lang_FromTo='+      langArray['LTXT_SEARCHBYEVENT_FROM'] + " ~ " + langArray['LTXT_SEARCHBYEVENT_TO'];

        str += '$span&lang_sms_limit_count=' + langArray['LTXT_SMS_LIMIT_COUNT'];
        str += '$span&lang_test_number=' + langArray['LTXT_TEST_NUMBER'];
        str += '$span&lang_please_wait=' + langArray['LTXT_PLEASE_WAIT'];
        str += '$span&lang_please_wait_ftp=' + langArray['LTXT_PLEASE_WAIT'];

        str += '$span&lang_ftp_test_success=' + langArray['LTXT_FTP_TEST_SUCCESS'];
        str += '$span&lang_ftp_test_fail1=' + langArray['LTXT_FTP_TEST_FAIL1'];
        str += '$span&lang_ftp_test_fail2=' + langArray['LTXT_FTP_TEST_FAIL2'];
        str += '$span&lang_ftp_test_fail3=' + langArray['LTXT_FTP_TEST_FAIL3'];

        str += '$span&lang_sms_test_success=' + langArray['LTXT_TEST_SMS_SENDING_SUCCEEDED'];
        str += '$span&lang_sms_test_fail=' + langArray['LTXT_TEST_SMS_SENDING_FAILED'];

        str += '$span&lang_push=' + langArray['LTXT_MOBILE_PUSH'];
        str += '$span&lang_pushnoti=' + langArray['LTXT_MOBILE_PUSH'];
        str += '$span&lang_push_freq=' + langArray['LTXT_MINIMUM_FREQUENCY']

        str += lang_setupChannel();
        ///////////////////// Value //////////////////////////////////
        str += '$value&EDIT='+ langArray['LTXT_EDIT'];
        str += '$value&ADD='+ langArray['LTXT_SETUP_ADD'];
        str += '$value&ADD_EDIT='+ langArray['LTXT_ADD_EDIT'];
        str += '$value&HELP=' + langArray['LTXT_HELP'];
        str += '$value&TEST=' + langArray['LTXT_TEST'];
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupEventMenu();

        return str;
    } else if (part == 'SETUPEVENTALARMSENSOR') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_AlarmSensorsetting='+  langArray['LTXT_SETUPMENU_EVENT_ALARMSENSOR'];

        str += '$span&lang_Chno='+               langArray['LTXT_SETUPEVENTALARMINPUT_CHNO'];
        str += '$span&lang_Name='+                  langArray['LTXT_NAME'];
        str += '$span&lang_Operation='+          langArray['LTXT_SETUPEVENTALARMINPUT_OPERATION'];
        str += '$span&lang_Type='+               langArray['LTXT_SETUPEVENTALARMINPUT_TYPE'];
        str += '$span&lang_Text='+               langArray['LTXT_SETUPEVENTALARMINPUT_TEXT'];
        str += '$span&lang_selectAll='+         	langArray['LTXT_SELECT_ALL'];

        str += '$span&lang_parameter='+           langArray['LTXT_SETUPEVENT_PARAMETER'];
        str += '$span&lang_action='+              langArray['LTXT_SETUPEVENT_ACTION'];

        str += '$span&lang_ptzpreset='+  langArray['LTXT_PRESET'];

        str += '$span&lang_lcamera=' + langArray['LTXT_SETUPEVENT_LINKED_CAMERA'];
        str += '$span&lang_alarmout=' + langArray['LTXT_SETUPEVENT_ALARM_OUT'];
        str += '$span&lang_buzzer=' + langArray['LTXT_SETUPEVENT_BUZZER'];
        str += '$span&lang_vpopup=' + langArray['LTXT_SETUPEVENT_VPOPUP'];
        str += '$span&lang_opopup=' + langArray['LTXT_SETUPEVENT_OPOPUP'];
        str += '$span&lang_email=' + langArray['LTXT_SETUPEVENT_EMAIL'];
        str += '$span&lang_mobile=' + langArray['LTXT_MOBILE'];
        str += '$span&lang_mobilepush=' + langArray['LTXT_MOBILE_PUSH_NEWLINE'];

        str += lang_setupChannel();
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupEventMenu();

        return str;
    } else if (part == 'SETUPEVENTMOTIONSENSOR') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        if(INFO_VENDOR==='ALSOK') {
          str += '$span&lang_Motionsensorsetting='+  langArray['LTXT_SETUPMENU_EVENT_MOTIONDETECTION'];
        } else {
          str += '$span&lang_Motionsensorsetting='+  langArray['LTXT_SETUPMENU_EVENT_MOTIONSENSOR'];
        }

        str += '$span&lang_Chno='+               langArray['LTXT_SETUPEVENTALARMINPUT_CHNO'];
        str += '$span&lang_Name='+                  langArray['LTXT_NAME'];

        str += '$span&lang_Operation='+          langArray['LTXT_SETUPEVENTALARMINPUT_OPERATION'];
        str += '$span&lang_Type='+               langArray['LTXT_SETUPEVENTALARMINPUT_TYPE'];
        str += '$span&lang_Text='+               langArray['LTXT_SETUPEVENTALARMINPUT_TEXT'];
        str += '$span&lang_selectAll='+         	langArray['LTXT_SELECT_ALL'];

        str += '$span&lang_parameter='+           langArray['LTXT_SETUPEVENT_PARAMETER'];
        str += '$span&lang_action='+              langArray['LTXT_SETUPEVENT_ACTION'];

        str += '$span&lang_ptzpreset='+  langArray['LTXT_PRESET'],

        str += '$span&lang_ignoreinterval='+      langArray['LTXT_SETUPEVENT_IGNORE_INTERVAL'];
        str += '$span&lang_lcamera=' + langArray['LTXT_SETUPEVENT_LINKED_CAMERA'];
        str += '$span&lang_alarmout=' + langArray['LTXT_SETUPEVENT_ALARM_OUT'];
        str += '$span&lang_buzzer=' + langArray['LTXT_SETUPEVENT_BUZZER'];
        str += '$span&lang_vpopup=' + langArray['LTXT_SETUPEVENT_VPOPUP'];
        str += '$span&lang_opopup=' + langArray['LTXT_SETUPEVENT_OPOPUP'];
        str += '$span&lang_email=' + langArray['LTXT_SETUPEVENT_EMAIL'];
        str += '$span&lang_mobile=' + langArray['LTXT_MOBILE'];
        str += '$span&lang_mobilepush=' + langArray['LTXT_MOBILE_PUSH_NEWLINE'];

        str += lang_setupChannel();
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupEventMenu();

        return str;
    } else if (part == 'SETUPEVENTTAMPER') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_EventTampersetting='+ langArray['LTXT_SETUPMENU_EVENT_TAMPER'];
        str += '$span&lang_ptzpreset='+  langArray['LTXT_PRESET'];

        str += '$span&lang_Tampersetting='+  langArray['LTXT_SETUPMENU_EVENT_TAMPER'];

        str += '$span&lang_selectAll='+         	langArray['LTXT_SELECT_ALL'];

        str += '$span&lang_parameter='+           langArray['LTXT_SETUPEVENT_PARAMETER'];
        str += '$span&lang_action='+              langArray['LTXT_SETUPEVENT_ACTION'];

        str += '$span&lang_ignoreinterval='+      langArray['LTXT_SETUPEVENT_IGNORE_INTERVAL'];
        str += '$span&lang_lcamera=' + langArray['LTXT_SETUPEVENT_LINKED_CAMERA'];
        str += '$span&lang_alarmout=' + langArray['LTXT_SETUPEVENT_ALARM_OUT'];
        str += '$span&lang_buzzer=' + langArray['LTXT_SETUPEVENT_BUZZER'];
        str += '$span&lang_vpopup=' + langArray['LTXT_SETUPEVENT_VPOPUP'];
        str += '$span&lang_opopup=' + langArray['LTXT_SETUPEVENT_OPOPUP'];
        str += '$span&lang_email=' + langArray['LTXT_SETUPEVENT_EMAIL'];

        str += lang_setupChannel();
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupEventMenu();

        return str;
    } else if (part == 'SETUPEVENTVIDEOLOSS') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        if(INFO_VENDOR==='ALSOK') {
          str += '$span&lang_Videolosssetting=' +  langArray['LTXT_SETUPMENU_EVENT_VIDEOLOSS_SETUP'];
        } else {
          str += '$span&lang_Videolosssetting=' +  langArray['LTXT_SETUPMENU_EVENT_VIDEOLOSS'];
        }

        str += '$span&lang_Chno='+               langArray['LTXT_SETUPEVENTALARMINPUT_CHNO'];
        str += '$span&lang_Operation='+          langArray['LTXT_SETUPEVENTALARMINPUT_OPERATION'];
        str += '$span&lang_Type='+               langArray['LTXT_SETUPEVENTALARMINPUT_TYPE'];
        str += '$span&lang_Text='+               langArray['LTXT_SETUPEVENTALARMINPUT_TEXT'];
        str += '$span&lang_selectAll='+         	langArray['LTXT_SELECT_ALL'];

        str += '$span&lang_ignoreinterval='+      langArray['LTXT_SETUPEVENT_IGNORE_INTERVAL'];
        str += '$span&lang_parameter='+           langArray['LTXT_SETUPEVENT_PARAMETER'];

        str += '$span&lang_action='+              langArray['LTXT_SETUPEVENT_ACTION'];
        str += '$span&lang_alarmout=' +           langArray['LTXT_SETUPEVENT_ALARM_OUT'];
        str += '$span&lang_ptzpreset=' +          langArray['LTXT_PRESET'];
        str += '$span&lang_buzzer=' + langArray['LTXT_SETUPEVENT_BUZZER'];
        str += '$span&lang_email=' + langArray['LTXT_SETUPEVENT_EMAIL'];
        str += '$span&lang_mobile=' + langArray['LTXT_MOBILE'];
        str += '$span&lang_mobilePush=' + langArray['LTXT_MOBILE_PUSH_NEWLINE'];

        str += lang_setupChannel();
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupEventMenu();

        return str;
    } else if (part == 'SETUPEVENTSYSEVENT') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_SystemEvent='+       langArray['LTXT_SETUPMENU_EVENT_SYSEVENT'];
        str += '$span&lang_HDDeventsetting='+	langArray['LTXT_SETUPEVENTHDDEVENT_HDDEVENTSETTING'];

        str += '$span&lang_Smartalaram='+		langArray['LTXT_SETUPEVENTHDDEVENT_SMARTALARAM'];
        str += '$span&lang_Checkinterval='+      langArray['LTXT_SETUPEVENTHDDEVENT_CHECKINTERVAL'];
        str += '$span&lang_Diskfullevent='+      langArray['LTXT_SETUPEVENTHDDEVENT_DISKFULLEVENT'];

        str += '$span&lang_selectAll='+  langArray['LTXT_SELECT_ALL'],

        //str += '$span&lang_=' + langArray[''];
        str += '$span&lang_disk=' + langArray['LTXT_SETUPEVENT_SYS_DISK'];
        str += '$span&lang_rec=' + langArray['LTXT_SETUPEVENT_SYS_REC'];
        str += '$span&lang_sys=' + langArray['LTXT_SETUPEVENT_SYS_SYSTEM'];
        str += '$span&lang_net=' + langArray['LTXT_SETUPEVENT_SYS_NET'];

        str += '$span&lang_action='+              langArray['LTXT_SETUPEVENT_ACTION'];
        str += '$span&lang_alarmout=' + langArray['LTXT_SETUPEVENT_ALARM_OUT'];
        str += '$span&lang_buzzer=' + langArray['LTXT_SETUPEVENT_BUZZER'];
        str += '$span&lang_opopup=' + langArray['LTXT_SETUPEVENT_OPOPUP'];
        str += '$span&lang_email=' + langArray['LTXT_SETUPEVENT_EMAIL'];
        str += '$span&lang_mobile=' + langArray['LTXT_MOBILE'];
        str += '$span&lang_mobilepush=' + langArray['LTXT_MOBILE_PUSH_NEWLINE'];

        str += '$span&lang_type=' + langArray['LTXT_SETUPEVENT_SYS_EVENTTYPE'];
        str += '$span&lang_overwrite=' + langArray['LTXT_SETUPEVENT_SYS_OVERWRITE'];
        str += '$span&lang_diskfull=' + langArray['LTXT_SETUPEVENT_SYS_DISKFULL'];
        str += '$span&lang_diskexhau=' + langArray['LTXT_SETUPEVENT_SYS_DISK_EXHAUST'];
        str += '$span&lang_smart=' + langArray['LTXT_SETUPEVENT_SYS_SMART'];
        str += '$span&lang_nodisk=' + langArray['LTXT_SETUPEVENT_SYS_NODISK'];
        str += '$span&lang_panicrec=' + langArray['LTXT_SETUPEVENT_SYS_PANICREC'];
        str += '$span&lang_recstop=' + langArray['LTXT_SETUPEVENT_SYS_RECSTOP'];
        str += '$span&lang_booting=' + langArray['LTXT_SETUPEVENT_SYS_BOOTING'];
        str += '$span&lang_loginfail=' + langArray['LTXT_SETUPEVENT_SYS_LOGINFAIL'];
        str += '$span&lang_fanfail=' + langArray['LTXT_SETUPEVENT_SYS_FANFAIL'];
        str += '$span&lang_temperfail=' + langArray['LTXT_SETUPEVENT_SYS_TEMPERATURE'];
        str += '$span&lang_POEfail=' + langArray['LTXT_SETUPEVENT_SYS_POEFAIL'];
        str += '$span&lang_netconn_trouble=' + langArray['LTXT_SETUPEVENT_SYS_NETCONN_TROUBLE'];
        str += '$span&lang_remote_logon_fail=' + langArray['LTXT_SETUPEVENT_SYS_REMOTE_LOGINFAIL'];
        str += '$span&lang_ddns_fail=' + langArray['LTXT_SETUPEVENT_SYS_DDNS_UPDATEFAIL'];
        str += '$span&lang_dhcp_fail=' + langArray['LTXT_SETUPEVENT_SYS_DHCP_FAIL'];

        str += '$option&lang_fail_retry1=' + langArray['LTXT_RETRY_1'];
        str += '$option&lang_fail_retry2=' + langArray['LTXT_RETRY_2'];
        str += '$option&lang_fail_retry3=' + langArray['LTXT_RETRY_3'];
        str += '$option&lang_fail_retry4=' + langArray['LTXT_RETRY_4'];
        str += '$option&lang_fail_retry5=' + langArray['LTXT_RETRY_5'];

        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupEventMenu();

        return str;
    } else if (part == 'SETUPEVENTVCAEVENT') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_VCA='+       langArray['LTXT_SETUPMENU_VCA_EVENT'];
        str += '$span&lang_SystemEvent='+       langArray['LTXT_SETUPEVENTSYSTEMEVENT'];
        str += '$span&lang_HDDeventsetting='+	langArray['LTXT_SETUPEVENTHDDEVENT_HDDEVENTSETTING'];

        str += '$span&lang_Smartalaram='+		langArray['LTXT_SETUPEVENTHDDEVENT_SMARTALARAM'];
        str += '$span&lang_Checkinterval='+      langArray['LTXT_SETUPEVENTHDDEVENT_CHECKINTERVAL'];
        str += '$span&lang_Diskfullevent='+      langArray['LTXT_SETUPEVENTHDDEVENT_DISKFULLEVENT'];

        //str += '$span&lang_=' + langArray[''];
        str += '$span&lang_disk=' + langArray['LTXT_SETUPEVENT_SYS_DISK'];
        str += '$span&lang_rec=' + langArray['LTXT_SETUPEVENT_SYS_REC'];
        str += '$span&lang_sys=' + langArray['LTXT_SETUPEVENT_SYS_SYSTEM'];
        str += '$span&lang_net=' + langArray['LTXT_SETUPEVENT_SYS_NET'];

        str += '$span&lang_action='+              langArray['LTXT_SETUPEVENT_ACTION'];
        str += '$span&lang_alarmout=' + langArray['LTXT_SETUPEVENT_ALARM_OUT'];
        str += '$span&lang_buzzer=' + langArray['LTXT_SETUPEVENT_BUZZER'];
        str += '$span&lang_opopup=' + langArray['LTXT_SETUPEVENT_OPOPUP'];
        str += '$span&lang_email=' + langArray['LTXT_SETUPEVENT_EMAIL'];
        str += '$span&lang_mobile=' + langArray['LTXT_MOBILE'];
        str += '$span&lang_vpopup='+	            langArray['LTXT_SETUPEVENTNOTI_VPOPUP'];

        str += '$span&lang_type=' + langArray['LTXT_SETUPEVENT_SYS_EVENTTYPE'];
        str += '$span&lang_overwrite=' + langArray['LTXT_SETUPEVENT_SYS_OVERWRITE'];
        str += '$span&lang_diskfull=' + langArray['LTXT_SETUPEVENT_SYS_DISKFULL'];
        str += '$span&lang_diskexhau=' + langArray['LTXT_SETUPEVENT_SYS_DISK_EXHAUST'];
        str += '$span&lang_smart=' + langArray['LTXT_SETUPEVENT_SYS_SMART'];
        str += '$span&lang_nodisk=' + langArray['LTXT_SETUPEVENT_SYS_NODISK'];
        str += '$span&lang_panicrec=' + langArray['LTXT_SETUPEVENT_SYS_PANICREC'];
        str += '$span&lang_booting=' + langArray['LTXT_SETUPEVENT_SYS_BOOTING'];
        str += '$span&lang_loginfail=' + langArray['LTXT_SETUPEVENT_SYS_LOGINFAIL'];
        str += '$span&lang_fanfail=' + langArray['LTXT_SETUPEVENT_SYS_FANFAIL'];
        str += '$span&lang_temperfail=' + langArray['LTXT_SETUPEVENT_SYS_TEMPERATURE'];
        str += '$span&lang_POEfail=' + langArray['LTXT_SETUPEVENT_SYS_POEFAIL'];
        str += '$span&lang_netconn_trouble=' + langArray['LTXT_SETUPEVENT_SYS_NETCONN_TROUBLE'];
        str += '$span&lang_remote_logon_fail=' + langArray['LTXT_SETUPEVENT_SYS_REMOTE_LOGINFAIL'];
        str += '$span&lang_ddns_fail=' + langArray['LTXT_SETUPEVENT_SYS_DDNS_UPDATEFAIL'];
        str += '$span&lang_dhcp_fail=' + langArray['LTXT_SETUPEVENT_SYS_DHCP_FAIL'];

        str += '$option&lang_fail_retry1=' + langArray['LTXT_RETRY_1'];
        str += '$option&lang_fail_retry2=' + langArray['LTXT_RETRY_2'];
        str += '$option&lang_fail_retry3=' + langArray['LTXT_RETRY_3'];
        str += '$option&lang_fail_retry4=' + langArray['LTXT_RETRY_4'];
        str += '$option&lang_fail_retry5=' + langArray['LTXT_RETRY_5'];

        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupEventMenu();

        return str;
    } else if (part == 'SETUPEVENTTEXTIN') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_Buzzeroutsetting='+	langArray['LTXT_SETUPEVENTBUZZER_BUZZEROUTSETTING'];

        str += '$span&lang_chno='+                   langArray['LTXT_SETUPEVENTALARMINPUT_CHNO'];
        str += '$span&lang_Alarm='+                  langArray['LTXT_LIVE_ALARM'];
        str += '$span&lang_Motion='+                 langArray['LTXT_LIVE_MOTION'];
        str += '$span&lang_Videoloss='+              langArray['LTXT_LIVE_VIDEOLOSS'];

        str += '$span&lang_Operation='+			langArray['LTXT_SETUPEVENTBUZZER_OPERATION'];
        str += '$span&lang_Mode='+               langArray['LTXT_SETUPEVENTBUZZER_MODE'];
        str += '$span&lang_HDDevent='+           langArray['LTXT_SETUPEVENTBUZZER_HDDEVENT'];
        str += '$span&lang_Duration='+           langArray['LTXT_SETUPEVENTBUZZER_DURATION'];
        str += '$span&lang_selectAll='+         	langArray['LTXT_SELECT_ALL'];

        str += lang_setupChannel();
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupEventMenu();

        return str;
    } else if (part == 'SETUPSTORAGEDISKINFO')   /* added by chcha 2011-03-09 */ {
        /* Storage & Disk */
        ///////////////////// Text //////////////////////////////////

        str = lang_TopMenu();

        str += '$span&lang_Storagediskinfo=' + langArray['LTXT_SETUPMENU_STORAGE_DISKINFO'];
        str += '$span&lang_start=' + langArray['LTXT_SETUPSTORAGE_START'];
        str += '$span&lang_end=' + langArray['LTXT_SETUPSTORAGE_END'];
        str += '$span&lang_status=' + langArray['LTXT_SETUPSTORAGE_STATUS'];
        str += '$span&lang_capacity=' + langArray['LTXT_SETUPSTORAGE_CAPACITY'];
        str += '$span&lang_model=' + langArray['LTXT_SETUPSTORAGE_MODEL'];
        str += '$span&lang_smart=' + langArray['LTXT_SETUPSTORAGE_SMART'];
        str += '$span&lang_selectAll='+             langArray['LTXT_SELECT_ALL'];

        str += '$span&lang_start_all=' + langArray['LTXT_SETUPSTORAGE_START'];
        str += '$span&lang_end_all=' + langArray['LTXT_SETUPSTORAGE_END'];
        str += '$span&lang_writemode=' + langArray['LTXT_SETUPSTORAGE_WRITEMODE'];
        str += '$span&lang_timelimit=' + langArray['LTXT_SETUPSTORAGE_TIMELIMIT'];
        str += '$span&lang_diskformat=' + langArray['LTXT_SETUPSTORAGE_OPERATION_DISKFORMAT'];
        str += '$span&lang_erasevideo=' + langArray['LTXT_SETUPSTORAGE_OPERATION_ERASEVIDEO'];

        str += '$span&lang_storage_disk=' + langArray['LTXT_SETUPEVENT_SYS_DISK'];
        ///////////////////// Value //////////////////////////////////
        str += '$value&FORMAT=' + langArray['LTXT_SETUPSTORAGE_OPERATION_FORMAT'];
        str += '$value&ERASE=' + langArray['LTXT_SETUPSTORAGE_OPERATION_DELETE'];

        str += lang_setupOkCancel();

        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupStorageMenu();

        return str;
    } else if (part == 'SETUPSTORAGEDISKOP')   /* added by chcha 2011-03-16 */ {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        if(INFO_VENDOR=='ALSOK') {
          str += '$span&lang_diskoperations=' + langArray[ "LTXT_SETUPSTORAGE_DISK_OPERATIONS_SETUP" ];
        } else {
          str += '$span&lang_diskoperations=' + langArray[ "LTXT_SETUPSTORAGE_DISK_OPERATIONS" ];
        }

        str += '$span&lang_start_all=' + langArray['LTXT_SETUPSTORAGE_START'];
        str += '$span&lang_end_all=' + langArray['LTXT_SETUPSTORAGE_END'];
        str += '$span&lang_writemode=' + langArray['LTXT_SETUPSTORAGE_WRITEMODE'];
        str += '$span&lang_timelimit=' + langArray['LTXT_SETUPSTORAGE_TIMELIMIT'];
        str += '$span&lang_diskformat=' + langArray['LTXT_SETUPSTORAGE_OPERATION_DISKFORMAT'];
        str += '$span&lang_erasevideo=' + langArray['LTXT_SETUPSTORAGE_OPERATION_ERASEVIDEO'];
        str += '$span&lang_confirm_password=' + langArray['LTXT_CONFIRM_PASSWORD'];
        str += '$span&lang_format_message=' + langArray['LTXT_SETUPSTORAGE_DISK_FORMAT_MESSAGE'];


        ///////////////////// Value //////////////////////////////////
        str += '$value&FORMAT=' + langArray['LTXT_SETUPSTORAGE_OPERATION_FORMAT'];
        str += '$value&ERASE=' + langArray['LTXT_SETUPSTORAGE_OPERATION_DELETE'];



        str += lang_setupChannel();
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupStorageMenu();

        return str;
    } else if (part == 'SETUPSTORAGEDISKCONF')   /* added by chcha 2011-03-16 */ {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += lang_setupChannel();
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupStorageMenu();

        return str;
    } else if (part == 'SETUPSTORAGEDISKSMART')   /* added by chcha 2011-03-16 */ {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();
        str += '$span&lang_smart=' + langArray['LTXT_SETUPSTORAGE_SMART'];
        str += '$span&lang_smart_ex=' + langArray['LTXT_SETUPSTORAGE_SMART'];

        str += '$span&lang_smart_hddtemp=' + langArray['LTXT_SETUPSTORAGE_SMART_HDD_TEMPERATURE'];
        str += '$span&lang_smart_readerr=' + langArray['LTXT_SETUPSTORAGE_SMART_READERROR'];
        str += '$span&lang_smart_seekerr=' + langArray['LTXT_SETUPSTORAGE_SMART_SEEKERROR'];
        str += '$span&lang_smart_realloc=' + langArray['LTXT_SETUPSTORAGE_SMART_REALLOC'];
        str += '$span&lang_smart_spinup=' + langArray['LTXT_SETUPSTORAGE_SMART_SPINUP'];
        str += '$span&lang_smart_spinretry=' + langArray['LTXT_SETUPSTORAGE_SMART_SPINRETRY'];
        str += '$span&lang_smart_startstop=' + langArray['LTXT_SETUPSTORAGE_SMART_STARTSTOP'];
        str += '$span&lang_smart_powercyc=' + langArray['LTXT_SETUPSTORAGE_SMART_POWERCYCLE'];
        str += '$span&lang_smart_diskpwron=' + langArray['LTXT_SETUPSTORAGE_SMART_DISKPOWERON'];
        str += '$span&lang_smart_threshold=' + langArray['LTXT_SETUPSTORAGE_SMART_THRESHOLD'];
        str += '$span&lang_MenuStorageSmart='+           langArray['LTXT_SETUPMENU_STORAGE_SMART'];
        str += '$span&lang_smart_serialnum='+           langArray['LTXT_SETUPSTORAGE_SMART_SERIAL_NUMBER'];
        str += '$span&lang_storage_disk=' + langArray['LTXT_SETUPEVENT_SYS_DISK'];

        str += '$span&lang_smart_hddtemp_ex=' + langArray['LTXT_SETUPSTORAGE_SMART_HDD_TEMPERATURE'];
        str += '$span&lang_smart_readerr_ex=' + langArray['LTXT_SETUPSTORAGE_SMART_READERROR'];
        str += '$span&lang_smart_seekerr_ex=' + langArray['LTXT_SETUPSTORAGE_SMART_SEEKERROR'];
        str += '$span&lang_smart_realloc_ex=' + langArray['LTXT_SETUPSTORAGE_SMART_REALLOC'];
        str += '$span&lang_smart_spinup_ex=' + langArray['LTXT_SETUPSTORAGE_SMART_SPINUP'];
        str += '$span&lang_smart_spinretry_ex=' + langArray['LTXT_SETUPSTORAGE_SMART_SPINRETRY'];
        str += '$span&lang_smart_startstop_ex=' + langArray['LTXT_SETUPSTORAGE_SMART_STARTSTOP'];
        str += '$span&lang_smart_powercyc_ex=' + langArray['LTXT_SETUPSTORAGE_SMART_POWERCYCLE'];
        str += '$span&lang_smart_diskpwron_ex=' + langArray['LTXT_SETUPSTORAGE_SMART_DISKPOWERON'];
        str += '$span&lang_smart_threshold_ex=' + langArray['LTXT_SETUPSTORAGE_SMART_THRESHOLD'];

        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        str += '$value&DETAIL=' + langArray['LTXT_DETAIL'];
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupStorageMenu();

        return str;
    } else if (part == 'SETUPRECRECORDINGOPERATION') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_Recordingoperationsetting='+      langArray['LTXT_SETUPRECRECORDINGOPERATION_RECORDINGOPERATIONSETTING'];

        str += '$span&lang_record_mode=' + langArray['LTXT_MODE'];
        str += '$span&lang_Schedulemode='+                   langArray['LTXT_SETUPRECRECORDINGOPERATION_SCHEDULEMODE'];
        str += '$span&lang_Preeventrecordingtime='+          langArray['LTXT_SETUPRECRECORDINGOPERATION_PREEVENTRECORDINGTIME'];
        str += '$span&lang_Posteventrecordingtime='+         langArray['LTXT_SETUPRECRECORDINGOPERATION_POSTEVENTRECORDINGTIME'];

        str += '$span&lang_prerecord='+                       langArray['LTXT_SETUPREC_PRE_RECORD_TIME'];
        str += '$span&lang_postrecord='+                      langArray['LTXT_SETUPREC_POST_RECORD_TIME'];

        str += '$span&lang_Recordingopperationsetting='+     langArray['LTXT_SETUPREC_OPERATION_MODE'];
        str += '$span&lang_automatic_record_option='+         langArray['LTXT_SETUPREC_OP_AUTO_CONFIG_MODE'];
        str += '$span&lang_manual_record_option='+            langArray['LTXT_SETUPREC_OP_MANUAL_CONFIG_OPTION'];
        str += '$span&lang_panic_record_option='+             langArray['LTXT_SETUPREC_OP_PANIC_CONFIG_OPTION'];
        str += '$span&lang_bitrate_control='+             langArray['LTXT_SETUPREC_OP_BITRATE_CONTROL'];
        str += '$span&lang_bitrate='+             langArray['LTXT_SETUPREC_OP_BITRATE'];
        str += '$span&lang_codec='+               langArray['LTXT_CODEC'];

        str += '$span&lang_auto_alwayshigh='+                    langArray['LTXT_SETUPREC_OP_ALWAYS_HIGH'];
        str += '$span&lang_auto_continuous='+                    langArray['LTXT_SETUPREC_OP_CONTINUOUS'];
        str += '$span&lang_auto_motion='+                        langArray['LTXT_SETUPREC_OP_MOTION'];
        str += '$span&lang_auto_alarm='+                         langArray['LTXT_SETUPREC_OP_ALARM'];
        str += '$span&lang_auto_motionalarm='+                   langArray['LTXT_SETUPREC_OP_MOTION_ALARM'];
        str += '$span&lang_auto_intense_motion='+                langArray['LTXT_SETUPREC_OP_INTENSE_MOTION'];
        str += '$span&lang_auto_intense_alarm='+                 langArray['LTXT_SETUPREC_OP_INTENSE_ALARM'];
        str += '$span&lang_auto_intense_motionalarm='+           langArray['LTXT_SETUPREC_OP_INTENSE_MOTIONALARM'];

        str += '$span&lang_group1='+                              langArray['LTXT_SETUPUSER_GROUP']+1;
        str += '$span&lang_group2='+                              langArray['LTXT_SETUPUSER_GROUP']+2;

        str += '$span&lang_PanicRecordTime='+                    langArray['LTXT_SETUPREC_OP_PANIC_REC_TIME'];
        str += '$span&lang_warning_0fps='+                  langArray['LTXT_WARNING_0FPS'];

        str += '$span&lang_Normal='+                          langArray['LTXT_SETUPREC_OP_GENERAL'];
        str += '$span&lang_warn_resolution='+               langArray['LTXT_SETUPREC_WARN_RESOLUTION'];
        str += '$span&lang_off=' + langArray['LTXT_OFF'];
        str += '$span&lang_on=' + langArray['LTXT_ON'];
        str += lang_setupRecTitle();

        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        str += '$value&lang_autoconfig=' + langArray['LTXT_SETUPREC_AUTO_CONFIG'];
        str += '$value&lang_manualconfig=' + langArray['LTXT_SETUPREC_MANUAL_CONFIG'];
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupRecordMenu();
        str += lang_setupChannel();

        return str;
    } else if (part == 'SETUPRECCONTINUOUS') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_Continusousrecordingsetting='+      langArray['LTXT_SETUPMENU_REC_CONTINUOUSRECORDING'];
        str += '$span&lang_day='+      langArray['LTXT_SETUPREC_DAY'];

        str += '$span&lang_SizeFPSQuality='+                         langArray['LTXT_SETUPRECCONTINUOUS_SIZEFPSQUALITY'];
        str += '$span&lang_Activation='+                             langArray['LTXT_SETUPRECCONTINUOUS_ACTIVATION'];
        str += '$span&lang_Time='+                                   langArray['LTXT_SETUPRECCONTINUOUS_TIME'];
        str += '$span&lang_None='+                                   langArray['LTXT_SETUPRECCONTINUOUSACT_NONE'];
        str += '$span&lang_Cont='+                                   langArray['LTXT_SETUPRECCONTINUOUSACT_CONT'];
        str += '$span&lang_Mot='+                                    langArray['LTXT_SETUPRECCONTINUOUSACT_MOT'];
        str += '$span&lang_ContMot='+                                langArray['LTXT_SETUPRECCONTINUOUSACT_CONTMOT'];

        str += '$span&lang_off=' + langArray['LTXT_OFF'];
        str += '$span&lang_on=' + langArray['LTXT_ON'];
        str += '$span&lang_record_help_1=' + '1. ' + langArray["LTXT_RECORD_HELP_1"];
        str += '$span&lang_record_help_2=' + '2. ' + langArray["LTXT_RECORD_HELP_2"];
        str += '$span&lang_record_help_3=' + '3. ' + langArray["LTXT_RECORD_HELP_3"];
        str += '$span&lang_record_help_4=' + '4. ' + langArray["LTXT_RECORD_HELP_4"];
        str += '$span&lang_record_help_5=' + '5. ' + langArray["LTXT_RECORD_HELP_5"];
        str += '$span&lang_warning_0fps='+           langArray['LTXT_WARNING_0FPS'];

        str += '$span&lang_group1='+                              langArray['LTXT_SETUPUSER_GROUP']+1;
        str += '$span&lang_group2='+                              langArray['LTXT_SETUPUSER_GROUP']+2;
        str += '$span&lang_warn_resolution='+               langArray['LTXT_SETUPREC_WARN_RESOLUTION'];
        str += lang_setupRecTitle();

        str += '$value&lang_copysched='+          langArray['LTXT_SETUPEVENT_COPY_SCHED'];

        str += lang_setupChannel();
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        str += '$value&HELP=' + langArray['LTXT_HELP'];
        ///////////////////// Div Img //////////////////////////////////

        str += '$value&lang_Selectall='+                            langArray['LTXT_SETUPRECCONTINUOUSACT_SELECTALL'];
        str += '$value&lang_Reverseall='+                           langArray['LTXT_SETUPRECCONTINUOUSACT_REVERSEALL'];
        str += '$value&lang_Deleteall='+                            langArray['LTXT_SETUPRECCONTINUOUSACT_DELETEALL'];

        str += lang_setupMenu();

        str += lang_setupRecordMenu();

        return str;
    } else if (part == 'SETUPRECCONTINUOUSACT') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_ContinusousMotionrecordingsetting='+      langArray['LTXT_SETUPRECCONTINUOUSACT_CONTINUSOUSMOTIONRECORDINGSETTING'];

        str += '$span&lang_SizeFPSQuality='+                         langArray['LTXT_SETUPRECCONTINUOUSACT_SIZEFPSQUALITY'];
        str += '$span&lang_Activation='+                             langArray['LTXT_SETUPRECCONTINUOUSACT_ACTIVATION'];
        str += '$span&lang_Time='+                                   langArray['LTXT_SETUPRECCONTINUOUSACT_TIME'];

        str += '$span&lang_None='+                                   langArray['LTXT_SETUPRECCONTINUOUSACT_NONE'];
        str += '$span&lang_Cont='+                                   langArray['LTXT_SETUPRECCONTINUOUSACT_CONT'];
        str += '$span&lang_Mot='+                                    langArray['LTXT_SETUPRECCONTINUOUSACT_MOT'];
        str += '$span&lang_ContMot='+                                langArray['LTXT_SETUPRECCONTINUOUSACT_CONTMOT'];

        str += '$span&lang_off=' + langArray['LTXT_OFF'];
        str += '$span&lang_on=' + langArray['LTXT_ON'];

        str += lang_setupChannel();
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        str += '$value&lang_Selectall='+                            langArray['LTXT_SETUPRECCONTINUOUSACT_SELECTALL'];
        str += '$value&lang_Reverseall='+                           langArray['LTXT_SETUPRECCONTINUOUSACT_REVERSEALL'];
        str += '$value&lang_Deleteall='+                            langArray['LTXT_SETUPRECCONTINUOUSACT_DELETEALL'];
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupRecordMenu();

        return str;
    } else if (part == 'SETUPRECMOTION') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_Motionrecordingsetting='+      langArray['LTXT_SETUPMENU_REC_MOTIONRECORDING'];

        str += '$span&lang_day='+      langArray['LTXT_SETUPREC_DAY'];
        str += '$span&lang_SizeFPSQuality='+                         langArray['LTXT_SETUPRECCONTINUOUS_SIZEFPSQUALITY'];
        str += '$span&lang_Activation='+                             langArray['LTXT_SETUPRECCONTINUOUS_ACTIVATION'];
        str += '$span&lang_Time='+                                   langArray['LTXT_SETUPRECCONTINUOUS_TIME'];
        str += '$span&lang_None='+                                   langArray['LTXT_SETUPRECCONTINUOUSACT_NONE'];
        str += '$span&lang_Cont='+                                   langArray['LTXT_SETUPRECCONTINUOUSACT_CONT'];
        str += '$span&lang_Mot='+                                    langArray['LTXT_SETUPRECCONTINUOUSACT_MOT'];
        str += '$span&lang_ContMot='+                                langArray['LTXT_SETUPRECCONTINUOUSACT_CONTMOT'];

        str += '$span&lang_off=' + langArray['LTXT_OFF'];
        str += '$span&lang_on=' + langArray['LTXT_ON'];
        str += '$span&lang_record_help_1=' + '1. ' + langArray["LTXT_RECORD_HELP_1"];
        str += '$span&lang_record_help_2=' + '2. ' + langArray["LTXT_RECORD_HELP_2"];
        str += '$span&lang_record_help_3=' + '3. ' + langArray["LTXT_RECORD_HELP_3"];
        str += '$span&lang_record_help_4=' + '4. ' + langArray["LTXT_RECORD_HELP_4"];
        str += '$span&lang_record_help_5=' + '5. ' + langArray["LTXT_RECORD_HELP_5"];
        str += '$span&lang_warning_0fps='+           langArray['LTXT_WARNING_0FPS'];
        str += '$span&lang_warn_resolution='+               langArray['LTXT_SETUPREC_WARN_RESOLUTION'];

        str += '$span&lang_group1='+                              langArray['LTXT_SETUPUSER_GROUP']+1;
        str += '$span&lang_group2='+                              langArray['LTXT_SETUPUSER_GROUP']+2;

        str += lang_setupRecTitle();

        str += '$value&lang_copysched='+          langArray['LTXT_SETUPEVENT_COPY_SCHED'];

        str += lang_setupChannel();
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        str += '$value&HELP=' + langArray['LTXT_HELP'];
        ///////////////////// Div Img //////////////////////////////////

        str += '$value&lang_Selectall='+                            langArray['LTXT_SETUPRECCONTINUOUSACT_SELECTALL'];
        str += '$value&lang_Reverseall='+                           langArray['LTXT_SETUPRECCONTINUOUSACT_REVERSEALL'];
        str += '$value&lang_Deleteall='+                            langArray['LTXT_SETUPRECCONTINUOUSACT_DELETEALL'];

        str += lang_setupMenu();

        str += lang_setupRecordMenu();

        return str;
    } else if (part == 'SETUPRECALARM') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_Alarmrecordingsetting='+      langArray['LTXT_SETUPMENU_REC_ALARMRECORDING'];

        str += '$span&lang_day='+      langArray['LTXT_SETUPREC_DAY'];
        str += '$span&lang_SizeFPSQuality='+             langArray['LTXT_SETUPRECALARM_SIZEFPSQUALITY'];
        str += '$span&lang_Activation='+                 langArray['LTXT_SETUPRECALARM_ACTIVATION'];
        str += '$span&lang_Time='+                       langArray['LTXT_SETUPRECALARM_TIME'];

        str += '$span&lang_off=' + langArray['LTXT_OFF'];
        str += '$span&lang_on=' + langArray['LTXT_ON'];
        str += '$span&lang_record_help_1=' + '1. ' + langArray["LTXT_RECORD_HELP_1"];
        str += '$span&lang_record_help_2=' + '2. ' + langArray["LTXT_RECORD_HELP_2"];
        str += '$span&lang_record_help_3=' + '3. ' + langArray["LTXT_RECORD_HELP_3"];
        str += '$span&lang_record_help_4=' + '4. ' + langArray["LTXT_RECORD_HELP_4"];
        str += '$span&lang_record_help_5=' + '5. ' + langArray["LTXT_RECORD_HELP_5"];
        str += '$span&lang_warning_0fps='+           langArray['LTXT_WARNING_0FPS'];
        str += '$span&lang_warn_resolution='+               langArray['LTXT_SETUPREC_WARN_RESOLUTION'];
        str += lang_setupRecTitle();

        str += '$value&lang_copysched='+          langArray['LTXT_SETUPEVENT_COPY_SCHED'];

        str += lang_setupChannel();
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        str += '$value&HELP=' + langArray['LTXT_HELP'];
        ///////////////////// Div Img //////////////////////////////////

        str += '$value&lang_Selectall='+                            langArray['LTXT_SETUPRECCONTINUOUSACT_SELECTALL'];
        str += '$value&lang_Reverseall='+                           langArray['LTXT_SETUPRECCONTINUOUSACT_REVERSEALL'];
        str += '$value&lang_Deleteall='+                            langArray['LTXT_SETUPRECCONTINUOUSACT_DELETEALL'];

        str += '$span&lang_group1='+                              langArray['LTXT_SETUPUSER_GROUP']+1;
        str += '$span&lang_group2='+                              langArray['LTXT_SETUPUSER_GROUP']+2;

        str += lang_setupMenu();

        str += lang_setupRecordMenu();

        return str;
    } else if (part == 'SETUPRECALARMACT') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_Alarmrecordingsetting='+  langArray['LTXT_SETUPRECALARMACT_ALARMRECORDINGSETTING'];

        str += '$span&lang_SizeFPSQuality='+         langArray['LTXT_SETUPRECALARMACT_SIZEFPSQUALITY'];
        str += '$span&lang_Activation='+             langArray['LTXT_SETUPRECALARMACT_ACTIVATION'];
        str += '$span&lang_Time='+                   langArray['LTXT_SETUPRECALARMACT_TIME'];

        str += '$span&lang_off=' + langArray['LTXT_OFF'];
        str += '$span&lang_on=' + langArray['LTXT_ON'];

        str += lang_setupChannel();
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        str += '$value&lang_Selectall='+            langArray['LTXT_SETUPRECALARMACT_SELECTALL'];
        str += '$value&lang_Reverseall='+           langArray['LTXT_SETUPRECALARMACT_REVERSEALL'];
        str += '$value&lang_Deleteall='+            langArray['LTXT_SETUPRECALARMACT_DELETEALL'];
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupRecordMenu();

        return str;
    } else if (part == 'SETUPRECPANIC') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_Panicrecordingsetting='+  langArray['LTXT_SETUPMENU_REC_PANICRECORDING'];
        str += '$span&lang_warning_0fps='+           langArray['LTXT_WARNING_0FPS'];
        str += lang_setupRecTitle();

        str += '$span&lang_off=' + langArray['LTXT_OFF'];
        str += '$span&lang_on=' + langArray['LTXT_ON'];

        str += '$span&lang_group1='+                              langArray['LTXT_SETUPUSER_GROUP']+1;
        str += '$span&lang_group2='+                              langArray['LTXT_SETUPUSER_GROUP']+2;
        str += '$span&lang_warn_resolution='+               langArray['LTXT_SETUPREC_WARN_RESOLUTION'];

        str += lang_setupChannel();
        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupRecordMenu();

        return str;
    } else if (part == 'SETUPRECNETSTREAM') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();

        str += '$span&lang_NetStreamingsetting='+ langArray['LTXT_SETUPREC_NETSTREAMING_TITLE'];
        str += '$span&lang_MaxSize=' +            langArray['LTXT_SETUPREC_NET_MAXSIZE'];
        //str += '$span&lang_MaxFPS=' +             langArray['LTXT_SETUPREC_NET_MAXFPS'];
        str += '$span&lang_stream_control=' +     langArray['LTXT_SETUPREC_NET_STREAMCONTROL'];

        str += '$span&lang_netst_help_1=' + '' + langArray['LTXT_NETSTR_HELP_1'];
        str += '$span&lang_netst_help_2=' + ' - ' + langArray['LTXT_NETSTR_HELP_2'];
        str += '$span&lang_warning_0fps='+       langArray['LTXT_WARNING_0FPS'];

        str += lang_setupRecTitle();

        str += lang_setupChannel();
        ///////////////////// Value //////////////////////////////////
        str += '$value&HELP=' + langArray['LTXT_HELP'];
        str += lang_setupOkCancel();
        ///////////////////// Div Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupRecordMenu();

        return str;
    } else if (part == 'WARNINGWINDOW') {
        ///////////////////// Text //////////////////////////////////
        str = lang_TopMenu();


        ///////////////////// Value //////////////////////////////////
        str += lang_setupOkCancel();
                str += '$span&lang_CamWarningMsg='      + langArray['LTXT_SETUPCAMINSTALLATION_WARNING_MESSAGE1'] + ' ' + langArray['LTXT_SETUPCAMINSTALLATION_WARNING_MESSAGE2'];
        str += '$span&lang_addmessage1='          + "[!] " + langArray['LTXT_SETUPCAMINSTALLATION_ADDMESSAGE1'] ;
        str += '$span&lang_addmessage2='          + langArray['LTXT_SETUPCAMINSTALLATION_ADDMESSAGE2'];
        str += '$span&lang_CamOpenMsg1='          + langArray['LTXT_SETUPCAMINSTALLATION_OPENMODE_MSG1'];
        str += '$span&lang_CamOpenMsg2='          + langArray['LTXT_SETUPCAMINSTALLATION_OPENMODE_MSG2'];
        str += '$span&lang_CamOpenMsg3='          + langArray['LTXT_SETUPCAMINSTALLATION_OPENMODE_MSG3'];
        str += '$span&lang_CamOpenMsg4='          + langArray['LTXT_SETUPCAMINSTALLATION_OPENMODE_MSG4'];
        str += '$span&lang_Title_Warning='          + langArray['LTXT_SETUPCAMINSTALLATION_WARNING'];
        str += '$span&lang_CamPreview='         + langArray['LTXT_SETUPCAMINSTALLATION_PREVIEW'];
        str += '$span&lang_CameraCfg_Camname='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_CAMERA'];
        str += '$span&lang_CameraCfg_Ipaddr='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_IP'];
        str += '$span&lang_CameraCfg_Httpport='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_HTTP'];
        str += '$span&lang_CameraCfg_Rtspport='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_RTSP'];
        str += '$span&lang_CameraCfg_User='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_USER'];
        str += '$span&lang_CameraCfg_Password='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_PASSWORD'];
        str += '$span&lang_CameraCfg_Ipreset='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_IP_RESET'];
        str += '$span&lang_CameraCfg_NetworkTest='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_NETWORKTEST'];
        str += '$span&lang_CameraCfg_DiagnosticTool='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_DIAGNOSTICTOOLS'];
        str += '$span&lang_CameraCfg_Cfguration='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_CONFIGURATION'];
        str += '$span&lang_CameraCfg_CamInfo='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_CAMERAINFO'];
        str += '$span&lang_CameraCfg_ConnTest='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_CONNECTIONTEST'];

        str += '$span&lang_CameraCfg_SubnetMask='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_SUBNETMASK'];
        str += '$span&lang_CameraCfg_Gateway='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_GATEWAY'];
        str += '$span&lang_CameraCfg_1stdns='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_1STDNS'];
        str += '$span&lang_CameraCfg_2nddns='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_2NDDNS'];
        str += '$span&lang_CameraCfg_RtspServicePort='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_RTSPSERVICEPORT'];
        str += '$span&lang_CameraCfg_WebServicePort='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_WEBSERVICEPORT'];

        str += '$span&lang_CameraCfg_UserId='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_USERID'];
        str += '$span&lang_CameraCfg_NewPass='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_NEWPASSWORD'];
        str += '$span&lang_CameraCfg_Confirm='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_CONFIRM'];

        if(bNVR)
        {
          str += '$span&lang_CameraCfg_ApplyPass='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_APPLYNVRADMINPASSWORD'];
        }
        else
        {
          str += '$span&lang_CameraCfg_ApplyPass='          + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_APPLYDVRADMINPASSWORD'];
        }

        str += '$value&lang_Setup=' + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_IPSETUP'];
        str += '$value&lang_Change=' + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_CHANGE'];
        str += '$value&lang_Test=' + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_TEST'];
        str += '$value&lang_Reset=' + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_RESET'];
        str += '$value&lang_Console=' + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_CONSOLE'];
        str += '$value&lang_Apply=' + langArray['LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_APPLY'];

        str = str.replace(/\n/gi,'');



        ///////////////////// DIV Img //////////////////////////////////
        str += lang_setupMenu();

        str += lang_setupCameraMenu();

        return str;
    } else if (part == 'SETUPRECAUDIOMAPPING') {
///////////////////// Text //////////////////////////////////
      str = lang_TopMenu();

      str += '$span&lang_audio_mapping='+ langArray['LTXT_AUDIO_MAPPING'];

      str += lang_setupRecTitle();

      str += lang_setupChannel();
      ///////////////////// Value //////////////////////////////////
      str += lang_setupOkCancel();
      ///////////////////// Div Img //////////////////////////////////
      str += lang_setupMenu();

      str += lang_setupRecordMenu();

      return str;
    }

    return null;
}
