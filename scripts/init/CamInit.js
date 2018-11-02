/**
 * @author chcha
 */

var ShowInit = function(menu) {
  toptab_visible();

  switch( menu ) {
  case 'CamTitle':
    lang_file(INFO_LANGUAGE,'SETUPCAMTITLE');
    channel_enable();

    //for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
    //  // Make Camera title label
    //  $("#ch" + (ch+1) ).html(INFO_CAMTITLE[ch]);
    //}

    break;
  case 'CamImage':
    lang_file(INFO_LANGUAGE,'SETUPCAMIMAGE');
    channel_enable();

    for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
      // Make Camera title label
      $("#ch" + (ch+1) ).html(INFO_CAMTITLE[ch]);
    }
    var a = $('option');

    for (var i in a) {
      if (a[i].text == 'Off') {
        a[i].text = langArray['LTXT_OFF'];
      }
      if (a[i].text == 'On') {
        a[i].text = langArray['LTXT_ON'];
      }
    }


    $(".cam_image_setup #tab").tabs();
    $(".cam_image_setup #tab").tabs("option","disabled", [3]);
    break;
  case 'CamImageAdvanced':
    lang_file(INFO_LANGUAGE,'SETUPCAMIMAGEADVANCED');
    channel_enable();

    break;
  case 'CamCovert':
    lang_file(INFO_LANGUAGE,'SETUPCAMCOVERT');

    for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
      // Make Camera title label
      $("#ch" + (ch+1) ).html(INFO_CAMTITLE[ch]);
    }

    var a = $('option');
    for (var i in a) {
      switch (a[i].text) {
      case "NO VIDEO":
        a[i].text = covertOSDMsg0;
        break;
      case "COVERT":
        a[i].text = covertOSDMsg1;
        break;
      }
    }
    channel_enable();
    break;

  case 'AnalogType':
    lang_file(INFO_LANGUAGE,'SETUPCAMANALOGTYPE');

    for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
      // Make Camera title label
      $("#ch" + (ch+1) ).html(INFO_CAMTITLE[ch]);
      $("#ch_5hg_" + (ch+1) ).html(INFO_CAMTITLE[ch]);
    }

    var _switching_menu_for_5g_model = function(){
      $(".analog_type_for_5g_model").show();
      $(".analog_type_for_5hg_model").hide();
    }

    var _switching_menu_for_5hg_model = function(){
      $(".analog_type_for_5g_model").hide();
      $(".analog_type_for_5hg_model").show();
    }
    
    //FOR 5HG UI CH HIDE LOGIC. 
    INFO_DVRCHANNEL==8 ? $(".chdisable8").hide()
      : INFO_DVRCHANNEL==4 ? $(".chdisable4").hide()
      : {/*DO NOTHING IF DVR CHANNEL IS 16.*/};

    INFO_MODEL.indexOf("5HG")>=0 ? _switching_menu_for_5hg_model() 
      : _switching_menu_for_5g_model(); //default is 5g model.

    var a = $('option');
    for (var i in a) {
      if (a[i].text == 'IP CAM') {
        a[i].text = langArray['LTXT_LT_IPCAM'];
      }
      if (a[i].text == 'Off') {
        a[i].text = langArray['LTXT_OFF'];
      }
      if (a[i].text == 'On') {
        a[i].text = langArray['LTXT_ON'];
      }
      if (a[i].text == 'NOT ASSIGNED') {
        a[i].text = langArray['LTXT_SETUPCAMINSTALLATION_SEARCH_NOTASSIGNED'];
      }
      if (a[i].text == 'SELECT ALL') {
        a[i].text = langArray['LTXT_SETUPCAMMOTION_SELECTALL'];
      }
    }

    break;
  case 'CamMotion':
    lang_file(INFO_LANGUAGE,'SETUPCAMMOTION');
    channel_enable();

    for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
      // Make Camera title label
      $("#cam" + (ch+1) ).html(INFO_CAMTITLE[ch]);
    }

    if (INFO_MODEL.indexOf('IPX') < 0) {
      $('.interval_setup').hide();
    }
    var a = $('option');
    for (var i in a) {
      if (a[i].text == 'Off') {
        a[i].text = langArray['LTXT_OFF'];
      }
      if (a[i].text == 'On') {
        a[i].text = langArray['LTXT_ON'];
      }
    }
    break;
  case 'CamType':
    lang_file(INFO_LANGUAGE,'SETUPCAMTITLE');
    channel_enable();
    break;
  case 'CamPTZ':
    lang_file(INFO_LANGUAGE,'SETUPCAMPTZ');

    for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
      // Make Camera title label
      $("#ch" + (ch+1) ).html(INFO_CAMTITLE[ch]);
    }

    if (INFO_MODEL.indexOf('IPX') < 0 && INFO_MODEL.indexOf('ANF5G') < 0 && INFO_MODEL.indexOf('5HG') < 0) {
      $('.rs485').hide();
    }
    channel_enable();
    break;
  case 'CamTamper':
    lang_file(INFO_LANGUAGE,'SETUPCAMTAMPER');
    channel_enable();

    for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
      // Make Camera title label
      $("#cam" + (ch+1) ).html(INFO_CAMTITLE[ch]);
    }

    var a = $('option');
    for (var i in a) {
      if (a[i].text == 'Off') {
        a[i].text = langArray['LTXT_OFF'];
      }
      if (a[i].text == 'On') {
        a[i].text = langArray['LTXT_ON'];
      }
    }
    $("#tamper-tabs").tabs();
    break;
  case 'CamPrivMask':
    lang_file(INFO_LANGUAGE,'SETUPCAMPRIVMASK');
    channel_enable();

    for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
      // Make Camera title label
      $("#cam" + (ch+1) ).html(INFO_CAMTITLE[ch]);
    }

    $("#privmask-tabs").tabs();

    var a = $('option');
    for (var i in a) {
      switch( a[i].text ) {
        case "OFF":
          a[i].text = langArray['LTXT_OFF'];
          break;
        case "ON":
          a[i].text = langArray['LTXT_ON'];
          break;
        case "Black":
          a[i].text = langArray['LTXT_BLACK'];
          break;
        case "White":
          a[i].text = langArray['LTXT_WHITE'];
          break;
        case "Light Gray":
          a[i].text = langArray['LTXT_LIGHTGRAY'];
          break;
        case "Dark Gray":
          a[i].text = langArray['LTXT_DARKGRAY'];
          break;
        case "Yellow":
          a[i].text = langArray['LTXT_YELLOW'];
          break;
        case "Red":
          a[i].text = langArray['LTXT_RED'];
          break;
        case "Blue":
          a[i].text = langArray['LTXT_BLUE'];
          break;
        case "Green":
          a[i].text = langArray['LTXT_GREEN'];
          break;
      }
    }
    break;
  case 'CamDmva':
    lang_file(INFO_LANGUAGE,'SETUPCAMDMVA');
    channel_enable();
    $("#dmva_tabs").tabs();
    break;
  default:
    break;
  }
};
