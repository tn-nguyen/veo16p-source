/**
 * @author chcha
 */

var ShowInit = function(menu) {
  toptab_visible();
  switch (menu) {
  case 'RecOp':
    lang_file(INFO_LANGUAGE,'SETUPRECRECORDINGOPERATION');
    channel_enable();

    if (INFO_MODEL.indexOf('IPX') < 0
      && INFO_MODEL.indexOf('5G') < 0
      && INFO_MODEL.indexOf('5X') < 0
      && INFO_MODEL.indexOf('UTM4G') < 0
      && INFO_MODEL.indexOf('UTM5HG') < 0
      && INFO_MODEL.indexOf('ANF5HG') < 0 ) {
      $('#hd_priority').hide();
    }

    if (INFO_MODEL.indexOf('4G') > 0 || INFO_MODEL.indexOf('5G') > 0 || INFO_MODEL.indexOf('5X') > 0 || INFO_MODEL.indexOf('5HG') > 0) {
      $(".for4G").show();
    }

    if (INFO_ALARM_SENSOR.ain_dvr == 0 && INFO_ALARM_SENSOR.aout_dvr == 0) {
      $("input[name=autocfg][value=2]").attr("disabled", true);
      $("input[name=autocfg][value=3]").attr("disabled", true);
      $("input[name=autocfg][value=5]").attr("disabled", true);
      $("input[name=autocfg][value=6]").attr("disabled", true);
    }

    $("#automatic_config").show();
    $("#manual_config").hide();

    $("#dlgMotionAlarm").dialog({
      position: [200, 100],
      width : '650',
      autoOpen : false,
      modal : true,
      show: 'slide',
      hide: 'slide',
      open: function(event, ui) {$(".ui-dialog-titlebar-close").hide();},
      buttons: [
        {
          text: langArray['LTXT_OK'],
          click : function() {
            if(INFO_MODEL.indexOf("UTM4G") >= 0
              || ((INFO_MODEL.indexOf("UTM5G") >= 0 || INFO_MODEL.indexOf("UTM5X") >= 0) && INFO_DVRCHANNEL >= 16)) {
              if(($z.current.recCalcAlarm.grpRemain[0] != undefined && $z.current.recCalcAlarm.grpRemain[0] < 0)
              || ($z.current.recCalcAlarm.grpRemain[1] != undefined && $z.current.recCalcAlarm.grpRemain[1] < 0)
              || ($z.current.recCalcAlarm.grpRemain[2] != undefined && $z.current.recCalcAlarm.grpRemain[2] < 0)
              || ($z.current.recCalcAlarm.grpRemain[3] != undefined && $z.current.recCalcAlarm.grpRemain[3] < 0)
              || ($z.current.recCalcAlarm.grpRemain[4] != undefined && $z.current.recCalcAlarm.grpRemain[4] < 0)
              || ($z.current.recCalcAlarm.grpRemain[5] != undefined && $z.current.recCalcAlarm.grpRemain[5] < 0)) {
                alert(langArray["LTXT_FPS_IS_OVER"]+"\n"+langArray["LTXT_FPS_CHECK"]);  
              }
              else {
                $(this).dialog("close");
              }  
            }
            else {
              $(this).dialog("close");  
            }
          }
        },
        {
          text: langArray['LTXT_CANCEL'],
          click: function(){
            $("input#cancel").click()
            $(this).dialog("close");
          }
        }
      ]
    });

    $("#dlgIntensive").dialog({
      position: [200, 100],
      width : '1000',
      autoOpen : false,
      modal : true,
      show: 'slide',
      hide: 'slide',
      open: function(event, ui) {$(".ui-dialog-titlebar-close").hide();},
      buttons: 
        [
          {
            text: langArray['LTXT_OK'],
            click : function() {
              if(INFO_MODEL.indexOf("UTM4G") >= 0
                || ((INFO_MODEL.indexOf("UTM5G") >= 0 || INFO_MODEL.indexOf("UTM5X") >= 0) && INFO_DVRCHANNEL >= 16)) {
                if(($z.current.recCalcIntensive1.grpRemain[0] != undefined && $z.current.recCalcIntensive1.grpRemain[0] < 0) 
                || ($z.current.recCalcIntensive1.grpRemain[1] != undefined && $z.current.recCalcIntensive1.grpRemain[1] < 0)
                || ($z.current.recCalcIntensive1.grpRemain[2] != undefined && $z.current.recCalcIntensive1.grpRemain[2] < 0)
                || ($z.current.recCalcIntensive1.grpRemain[3] != undefined && $z.current.recCalcIntensive1.grpRemain[3] < 0)
                || ($z.current.recCalcIntensive1.grpRemain[4] != undefined && $z.current.recCalcIntensive1.grpRemain[4] < 0)
                || ($z.current.recCalcIntensive1.grpRemain[5] != undefined && $z.current.recCalcIntensive1.grpRemain[5] < 0)
                || ($z.current.recCalcIntensive2.grpRemain[0] != undefined && $z.current.recCalcIntensive2.grpRemain[0] < 0)
                || ($z.current.recCalcIntensive2.grpRemain[1] != undefined && $z.current.recCalcIntensive2.grpRemain[1] < 0)
                || ($z.current.recCalcIntensive2.grpRemain[2] != undefined && $z.current.recCalcIntensive2.grpRemain[2] < 0)
                || ($z.current.recCalcIntensive2.grpRemain[3] != undefined && $z.current.recCalcIntensive2.grpRemain[3] < 0)
                || ($z.current.recCalcIntensive2.grpRemain[4] != undefined && $z.current.recCalcIntensive2.grpRemain[4] < 0)
                || ($z.current.recCalcIntensive2.grpRemain[5] != undefined && $z.current.recCalcIntensive2.grpRemain[5] < 0)) {
                  alert(langArray["LTXT_FPS_IS_OVER"]+"\n"+langArray["LTXT_FPS_CHECK"]);
                }
                else {
                  $(this).dialog("close");  
                }
              }
              else {
                $(this).dialog("close");  
              }
            }
          },
          {
            text: langArray['LTXT_CANCEL'],
            click : function(){
              $("input#cancel").click()
              $(this).dialog("close");
            }
          }
      ]
    });

    break;
  case 'RecCont':
    lang_file(INFO_LANGUAGE,'SETUPRECCONTINUOUS');
    $("#rec_tabs").tabs();
    if (INFO_MODEL.indexOf('IPX') < 0) {
      $('#btn_help').hide();
    }
    channel_enable();
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
    $("#btn_help").click( function (event) {
      $(dialog_help).dialog("open");
    });

    break;

  case 'RecMotion':
    lang_file(INFO_LANGUAGE,'SETUPRECMOTION');

    if (INFO_MODEL.indexOf('IPX') < 0) {
      $('#btn_help').hide();
    }
    $("#rec_tabs").tabs();
    channel_enable();
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
    $("#btn_help").click( function (event) {
      $(dialog_help).dialog("open");
    });

    break;
  case 'RecAlarm':
    lang_file(INFO_LANGUAGE, 'SETUPRECALARM');

    if (INFO_MODEL.indexOf('IPX') < 0) {
      $('#btn_help').hide();
    }
    $("#rec_tabs").tabs();
    channel_enable();
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
    $("#btn_help").click( function (event) {
      $(dialog_help).dialog("open");
    });
    break;
  case 'RecPanic':
    lang_file(INFO_LANGUAGE,'SETUPRECPANIC');

    channel_enable();

    break;
  case 'NetStream':
    lang_file(INFO_LANGUAGE,'SETUPRECNETSTREAM');
    channel_enable();
    if (INFO_MODEL.indexOf('IPX') < 0 &&
        INFO_MODEL.indexOf('ANF') < 0 &&
        INFO_MODEL.indexOf('ATM') < 0 &&
        INFO_MODEL.indexOf('UTM') < 0) {
      $('#adaptive_streaming').hide();
      $('#btn_help').hide();
    }

    if(INFO_MODEL.indexOf('IPX') < 0)
    {
      $('#btn_help').css({"display":"none"});
    }

    if(INFO_MODEL.indexOf('UTM4G') > 0
      || ((INFO_MODEL.indexOf("UTM5G") >= 0 || INFO_MODEL.indexOf("UTM5X") >= 0) && INFO_DVRCHANNEL >= 16)) {
      $("#rec-calc").hide();
    }

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
    $("#btn_help").click( function (event) {
      $(dialog_help).dialog("open");
    });
    break;
  case 'RecAudioMap':
    lang_file(INFO_LANGUAGE,'SETUPRECAUDIOMAPPING');
    channel_enable();
    break;
  default:
  }

  $('#dialog_warning_0fps').dialog({
    autoOpen : false,
    width : 'auto',
    title: langArray['LTXT_WARNING'],
    modal : true,
    buttons: [{
      text : langArray['LTXT_OK'],
      click: function () {
        $(this).dialog("close");
      }
    },{
      text : langArray['LTXT_CANCEL'],
      click: function () {
        $(this).dialog("close");
      }
    }]
  });

  var a = $('option');
  for (var i in a) {
    switch (a[i].text) {
    case 'Off':
      a[i].text = langArray['LTXT_OFF'];
      break;
    case 'On':
      a[i].text = langArray['LTXT_ON'];
      break;
    case 'Auto Configuration':
      a[i].text = langArray['LTXT_AUTO_CONFIGURATION'];
      break;
    case 'Manual Configuration':
      a[i].text = langArray['LTXT_MANUAL_CONFIGURATION'];
      break
    case 'Manual':
      a[i].text = langArray['LTXT_MANUAL'];
      break;
    case "MAX":
      retstr = langArray["LTXT_MAX"];
      break;
    case 'Daily':
      a[i].text = langArray['LTXT_COMBO_MENU_DAILY'];
      break;
    case 'Weekly':
      a[i].text = langArray['LTXT_COMBO_MENU_WEEKLY'];
      break;
    case 'Highest':
      a[i].text = langArray['LTXT_COMBO_MENU_HIGHEST'];
      break;
    case 'High':
      a[i].text = langArray['LTXT_COMBO_MENU_HIGH'];
      break;
    case 'Standard':
      a[i].text = langArray['LTXT_COMBO_MENU_STANDARD'];
      break;
    case 'Mid':
      a[i].text = langArray['LTXT_COMBO_MENU_MID'];
      break;
    case 'Low':
      a[i].text = langArray['LTXT_COMBO_MENU_LOW'];
      break;
    case 'Lowest':
      a[i].text = langArray['LTXT_COMBO_MENU_LOWEST'];
      break;
    case 'AUTO - High':
      a[i].text = langArray['LTXT_COMBO_MENU_AUTO_HIGH'];
      break;
    case 'AUTO - MIDDLE':
      a[i].text = langArray['LTXT_COMBO_MENU_AUTO_MID'];
      break;
    case 'AUTO - Low':
      a[i].text = langArray['LTXT_COMBO_MENU_AUTO_LOW'];
      break;
    case 'MANUAL - High':
      a[i].text = langArray['LTXT_COMBO_MENU_MANUAL_HIGH'];
      break;
    case 'MANUAL - Middle':
      a[i].text = langArray['LTXT_COMBO_MENU_MANUAL_MID'];
      break;
    case 'MANUAL - Low':
      a[i].text = langArray['LTXT_COMBO_MENU_MANUAL_LOW'];
      break;
    case "LOW MID":
      retstr = langArray["LTXT_COMBO_MENU_LOW_MID"];
      break;
    case "HIGH MID":
      retstr = langArray["LTXT_COMBO_MENU_HIGH_MID"];
      break;
    case "BEST QUALITY":
      retstr = langArray["LTXT_COMBO_MENU_BEST_QUALITY"];
      break;
    case "DEPTH OF FIELD":
      retstr = langArray["LTXT_COMBO_MENU_DEPTH_OF_FIELD"];
      break;
    case "ADAPTIVE":
      retstr = langArray["LTXT_COMBO_MENU_ADAPTIVE"];
      break;
    case "ZONE - LOWER":
      retstr = langArray["LTXT_COMBO_MENU_ZONE_LOWER"];
      break;
    case "ZONE - MIDDLE":
      retstr = langArray["LTXT_COMBO_MENU_ZONE_MIDDLE"];
      break;
    case "ZONE - UPPER":
      retstr = langArray["LTXT_COMBO_MENU_ZONE_UPPER"];
      break;
    case "ZONE - LEFT":
      retstr = langArray["LTXT_COMBO_MENU_ZONE_LEFT"];
      break;
    case "ZONE - RIGHT":
      retstr = langArray["LTXT_COMBO_MENU_ZONE_RIGHT"];
      break;
    case "SEMI AUTO":
      retstr = langArray["LTXT_COMBO_MENU_SEMI_AUTO"];
      break;
    case "AUTO(low)":
      retstr = langArray["LTXT_COMBO_MENU_AUTO_SMALL_LOW"];
      break
    case "AUTO(medium)":
      retstr = langArray["LTXT_COMBO_MENU_AUTO_SMALL_MEDIUM"];
      break;
    case "AUTO(high)":
      retstr = langArray["LTXT_COMBO_MENU_AUTO_SMALL_HIGH"];
      break;
    case "VBR":
      a[i].text = langArray["LTXT_SETUPMENU_REC_VBR"];
      break;
    case "CBR":
      a[i].text = langArray["LTXT_SETUPMENU_REC_CBR"];
      break;
    case '0 SEC':
      a[i].text = langArray['LTXT_0SEC'];
      break;
    case '1 SEC':
      a[i].text = langArray['LTXT_1SEC'];
      break;
    case '2 SEC':
      a[i].text = langArray['LTXT_2SEC'];
      break;
    case '3 SEC':
      a[i].text = langArray['LTXT_3SEC'];
      break;
    case '4 SEC':
      a[i].text = langArray['LTXT_4SEC'];
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
    case '20 MIN':
      a[i].text = langArray['LTXT_20MIN'];
      break;
    case '30 MIN':
      a[i].text = langArray['LTXT_30MIN'];
      break;
    case '40 MIN':
      a[i].text = langArray['LTXT_40MIN'];
      break;
    case '50 MIN':
      a[i].text = langArray['LTXT_50MIN'];
      break;
    case '60 MIN':
      a[i].text = langArray['LTXT_60MIN'];
      break;
    }
  }
};
