/**
 * @author chcha
 */

var NUM_ALARM_IPCAM = 0;
var NUM_ALARM_DVR = 0;
var NUM_ALARMS = 0;

var MAX_SENSORS = 20;

var NUM_SENSOR_IPCAM = 0;
var NUM_SENSOR_DVR = 0;
var NUM_SENSORS = 0;

NUM_ALARM_IPCAM = parseInt(INFO_ALARM_SENSOR["aout_cam"]);
NUM_ALARM_DVR = parseInt(INFO_ALARM_SENSOR["aout_dvr"]);
NUM_SENSOR_IPCAM = parseInt(INFO_ALARM_SENSOR["ain_cam"]);
NUM_SENSOR_DVR = parseInt(INFO_ALARM_SENSOR["ain_dvr"]);

NUM_ALARMS = NUM_ALARM_IPCAM + NUM_ALARM_DVR;
NUM_SENSORS = NUM_SENSOR_IPCAM + NUM_SENSOR_DVR;

var ShowInit = function(menu) {
    toptab_visible();

    if( INFO_MODEL.indexOf("IPX") >= 0
        || INFO_MODEL.indexOf("ATM") >= 0
        || INFO_MODEL.indexOf("ANF") >= 0
        || INFO_MODEL.indexOf("UTM") >= 0 ) {
      if ( INFO_VENDOR.indexOf('S1') < 0 && INFO_MODEL.indexOf("IPX") > 0 ) {
        $(".mobile").remove();
        var temp;

        for (var i = 0 ; i < $('.colspan').length ; i += 1) {
          temp = $($('.colspan')[i]);
          temp.prop('colspan' , temp.prop('colspan') - 1);
        }
      }
    } else {
      $(".ftp").remove();
      var temp;

      for (var i = 0 ; i < $('.colspan').length ; i += 1) {
        temp = $($('.colspan')[i]);
        temp.prop('colspan' , temp.prop('colspan') - 1);
      }
    }

    if (INFO_VENDOR !='VIDECON') {
      $('.fragment-email_server').hide();
    }


    if(typeof(INFO_USE_SEQURINET)=="undefined" || (typeof(INFO_USE_SEQURINET)!="undefined" && !INFO_USE_SEQURINET) ) {
      $('.mobilepush').hide();
      $('.colspan').each(function(a) {
        var col = $(this).attr('colspan') - 1;
        $(this).attr('colspan', col);
      });
    }

    if( INFO_MODEL.indexOf("ATM") >= 0 || INFO_MODEL.indexOf("ANF") >= 0 || INFO_MODEL.indexOf("UTM") >= 0 ) {
      $('.mobile').remove();
      $('.colspan').each(function(a) {
        var col = $(this).attr('colspan') - 1;
        $(this).attr('colspan', col);
      });
    }

    switch (menu) {
        case 'EventAlarmOut':
            lang_file(INFO_LANGUAGE,'SETUPEVENTALARMOUTPUT');
            $("#event_tabs").tabs();

            $("tr.arout:gt(" + (NUM_ALARMS-1) + ")").remove();
            $("tr.tr_arout_sched:gt(" + (NUM_ALARMS-1) + ")").remove();

            break;
        case 'EventNoti':
            lang_file(INFO_LANGUAGE,'SETUPEVENTNOTI');
            if ( INFO_VENDOR.indexOf('S1') < 0) {
              $('.sms').hide();
            }
            $("#event_tabs").tabs();

            $("#dialog_help").dialog({
              autoOpen : false,
              width : 'auto',
              title: langArray['LTXT_HELP'],
              modal : true,
              buttons: [{
                text : langArray['LTXT_EXIT'],
                click: function () {
                  $(this).dialog("close");
                }
              }]
            });
            $('#dialog_please_wait').dialog({
              autoOpen : false,
              draggable: false,
              resizable: false,
              closeOnEscape: false,
              width : '300px',
              title: langArray['LTXT_NOTICE'],
              modal : true
            });
            $('#dialog_please_wait_ftp').dialog({
              autoOpen : false,
              draggable: false,
              resizable: false,
              closeOnEscape: false,
              width : '300px',
              title: langArray['LTXT_NOTICE'],
              modal : true
            });
            $("#btn_help").click( function (event) {
              $(dialog_help).dialog("open");
            });
            $('.push-service').hide();
            break;
        case 'EventSensor':
            lang_file(INFO_LANGUAGE,'SETUPEVENTALARMSENSOR');

            for( var i=NUM_SENSORS ; i < MAX_SENSORS ; i++ ) {
                $("tr#sensor"+i).remove();
            }

            // if( INFO_MODEL.indexOf("UTM") >= 0 ) {
            //   $("select#op_type_all").empty()
            //     .append($("<option value='0'>HIGH</option>"))
            //     .append($("<option value='1'>LOW</option>"));
            //   for( var i=0 ; i < MAX_SENSORS ; i++ ) {
            //     $("select#op_type" + i).empty()
            //       .append($("<option value='0'>HIGH</option>"))
            //       .append($("<option value='1'>LOW</option>"));
            //   }
            // }

            break;
        case 'EventMotion':
            lang_file(INFO_LANGUAGE,'SETUPEVENTMOTIONSENSOR');

            channel_enable();
            break;
        case 'EventVloss':
            lang_file(INFO_LANGUAGE,'SETUPEVENTVIDEOLOSS');

            channel_enable();
            break;
        case 'EventTamper':
            lang_file(INFO_LANGUAGE,'SETUPEVENTTAMPER');

            channel_enable();
            break;
        case 'EventSystem':
            lang_file(INFO_LANGUAGE,'SETUPEVENTSYSEVENT');
            $("#event_tabs").tabs();

            channel_enable();

            break;
        case 'EventVCA':
            lang_file(INFO_LANGUAGE,'SETUPEVENTVCAEVENT');

            channel_enable();

            break;

        default:
            break;
    }
    var a = $('option');
    for (var i in a) {
      switch (a[i].text) {
      case 'Off':
        a[i].text = langArray['LTXT_OFF'];
        break;
      case 'On':
        a[i].text = langArray['LTXT_ON'];
        break;
     case 'MANUAL':
       a[i].text = langArray["LTXT_MANUAL"];
       break;
     case 'MANUAL_DATE':
       a[i].text = langArray["LTXT_MANUAL_DATE"];
       break;
     case 'SYSTEM ID':
       a[i].text = langArray["LTXT_SETUPSYSCONTROLDEV_SYSTEMID"];
       break;
      case 'SYSTEM ID_DATE':
        a[i].text = langArray["LTXT_SYSTEM_ID_DATE"];
        break;
      case 'SYSTEM ID_DATE_TIME':
        a[i].text = langArray["LTXT_SYSTEM_ID_DATE_TIME"];
        break;
      case 'MANUAL_DATE_TIME':
        a[i].text = langArray["LTXT_MANUAL_DATE_TIME"];
        break;
      case 'MON':
        a[i].text = langArray['LTXT_COMBO_MENU_MON'];
        break;
      case 'TUE':
        a[i].text = langArray['LTXT_COMBO_MENU_TUE'];
        break;
      case 'WED':
        a[i].text = langArray['LTXT_COMBO_MENU_WED'];
        break;
      case 'THU':
        a[i].text = langArray['LTXT_COMBO_MENU_THU'];
        break;
      case 'FRI':
        a[i].text = langArray['LTXT_COMBO_MENU_FRI'];
        break;
      case 'SAT':
        a[i].text = langArray['LTXT_COMBO_MENU_SAT'];
        break;
      case 'SUN':
        a[i].text = langArray['LTXT_COMBO_MENU_SUN'];
        break;
      case 'TRANSPARENT':
        a[i].text = langArray['LTXT_COMBO_MENU_TRANSPARENT'];
        break;
      case 'UNTIL KEY':
        a[i].text = langArray['LTXT_COMBO_MENU_UNTILKEY'];
        break;
      case '5 SEC':
        a[i].text = langArray['LTXT_5SEC'];
        break;
      case '10 SEC':
        a[i].text = langArray['LTXT_10SEC'];
        break;
      case '15 SEC':
        a[i].text = langArray['LTXT_15SEC'];
        break;
      case '20 SEC':
        a[i].text = langArray['LTXT_20SEC'];
        break;
      case '25 SEC':
        a[i].text = langArray['LTXT_25SEC'];
        break;
      case '30 SEC':
        a[i].text = langArray['LTXT_30SEC'];
        break;
      case '40 SEC':
        a[i].text = langArray['LTXT_40SEC'];
        break;
      case '60 SEC':
        a[i].text = langArray['LTXT_60SEC'];
        break;
      case '120 SEC':
        a[i].text = langArray['LTXT_120SEC'];
        break;
      case '180 SEC':
        a[i].text = langArray['LTXT_180SEC'];
        break;
      case '300 SEC':
        a[i].text = langArray['LTXT_300SEC'];
        break;
      case 'IMMEDIATELY':
        a[i].text = langArray['LTXT_SETUPMENU_EVENT_EMAIL_IMMEDIATELY'];
        break;
      case '1 MIN':
        a[i].text = langArray['LTXT_1MIN'];
        break;
      case '5 MIN':
        a[i].text = langArray['LTXT_5MIN'];
        break;
      case '10 MIN':
        a[i].text = langArray['LTXT_10MIN'];
        break;
      case '15 MIN':
        a[i].text = langArray['LTXT_15MIN'];
        break;
      case '30 MIN':
        a[i].text = langArray['LTXT_30MIN'];
        break;
      case '60 MIN':
        a[i].text = langArray['LTXT_60MIN'];
        break;
      case 'NOT USED':
        a[i].text = langArray['LTXT_NOT_USED'];
        break;
      case 'USE':
        a[i].text = langArray['LTXT_USE'];
        break;
      }
    }
}

