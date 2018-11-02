/**
 * @author chcha
 */

var ShowInit = function(menu) {
  toptab_visible();
  switch( menu ) {
  case 'DispOSD':
    lang_file(INFO_LANGUAGE,'SETUPDISPOSD');

    if (INFO_MODEL.indexOf('IPX') >= 0)
    {
      $("#lang_zoom_pip").hide();
      $("#zoom_pip").hide();
    }
    
    if( INFO_VENDOR == 'ALSOK') {
      $('.remove_alsok').hide();
    }
    
    break;
  case 'DispMonitor':
    lang_file(INFO_LANGUAGE,'SETUPDISPMONITOR');
    break;
  case 'SoundAudio':
    lang_file(INFO_LANGUAGE,'SETUPDISPSOUND');
    break;
  default:
  }
  var a = $('option');
  for (var i in a) {
    switch (a[i].text) {
    case '1 SEC':
      a[i].text = langArray['LTXT_1SEC'];
      break;
    case '2 SEC':
      a[i].text = langArray['LTXT_2SEC'];
      break;
    case '3 SEC':
      a[i].text = langArray['LTXT_3SEC'];
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
    case '1 MIN':
      a[i].text = langArray['LTXT_1MINUTE'];
      break;
    case 'Off':
      a[i].text = langArray['LTXT_OFF'];
      break;
    case 'On':
      a[i].text = langArray['LTXT_ON'];
      break;
    case 'Auto Hide':
      a[i].text = langArray['LTXT_AUTO_HIDE'];
      break;
    case 'Always On':
      a[i].text = langArray['LTXT_ALWAYS_ON'];
      break;
    case 'Always Off':
      a[i].text = langArray['LTXT_ALWAYS_OFF'];
      break;
    case 'White':
      a[i].text = langArray['LTXT_WHITE'];
      break;
    case 'Gray':
      a[i].text = langArray['LTXT_DARK_GRAY'];
      break;
    case 'Yellow':
      a[i].text = langArray['LTXT_YELLOW'];
      break;
    case 'Blue':
      a[i].text = langArray['LTXT_BLUE'];
      break;
    case 'Green':
      a[i].text = langArray['LTXT_GREEN'];
      break;
    case 'Red':
      a[i].text = langArray['LTXT_RED'];
      break;
    case 'Always':
      a[i].text = langArray['LTXT_COMBO_MENU_ALWAYS'];
      break;
    }
  }
};