/**
 * @author chcha
 */

var ShowInit = function(menu) {
  toptab_visible();
  switch (menu) {
    case 'StorageDiskinfo':
      lang_file(INFO_LANGUAGE,'SETUPSTORAGEDISKINFO');
      $("#diskinfo_tabs").tabs();

      if(INFO_MODEL.indexOf("_UTM4G_") >=0
        || INFO_MODEL.indexOf("_UTM5X_") >= 0) {
        $(".exist_external").hide();
      }

      break;
    case 'StorageDiskop':
      lang_file(INFO_LANGUAGE, 'SETUPSTORAGEDISKOP');
      if (INFO_MODEL.indexOf('IPX') >= 0 ||
          INFO_MODEL.indexOf('ATM') >= 0 ||
          INFO_MODEL.indexOf('UTM') >= 0 ||
          INFO_MODEL.indexOf('ANF') >= 0 ) {
        $('.c_sp_div_storage_diskop').removeAttr('disabled');
      }

      // Always show complex mode
      //if (INFO_VENDOR.indexOf("ASP") >= 0) {
      if (true) {
        $('.timelimit_simple').hide();
        $('.timelimit_complex').show();
      } else {
        $('.timelimit_simple').show();
        $('.timelimit_complex').hide();
      }
      break;
    case 'StorageSmart':
      lang_file(INFO_LANGUAGE,'SETUPSTORAGEDISKSMART');

      $("#smart_tabs").tabs();

      if(INFO_MODEL.indexOf("_UTM4G_") >=0
        || INFO_MODEL.indexOf("_UTM5X_") >= 0) {
        $(".exist_external").hide();
      }
      
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
    case 'OVERWRITE':
      a[i].text = langArray['LTXT_OVERWRITE'];
      break;
    case 'ONCE':
      a[i].text = langArray['LTXT_ONCE'];
      break;
    case '12 HOUR':
      a[i].text = langArray['LTXT_12HOUR'];
      break;
    case '1 DAY':
      a[i].text = langArray['LTXT_1DAY'];
      break;
    case '2 DAY':
      a[i].text = langArray['LTXT_2DAY'];
      break;
    case '3 DAY':
      a[i].text = langArray['LTXT_3DAY'];
      break;
    case '4 DAY':
      a[i].text = langArray['LTXT_4DAY'];
      break;
    case '5 DAY':
      a[i].text = langArray['LTXT_5DAY'];
      break;
    case '6 DAY':
      a[i].text = langArray['LTXT_6DAY'];
      break;
    case '1 WEEK':
      a[i].text = langArray['LTXT_1WEEK'];
      break;
    case '2 WEEK':
      a[i].text = langArray['LTXT_2WEEK'];
      break;
    case '3 WEEK':
      a[i].text = langArray['LTXT_3WEEK'];
      break;
    case '1 MONTH':
      a[i].text = langArray['LTXT_1MONTH'];
      break;
    case '2 MONTH':
      a[i].text = langArray['LTXT_2MONTH'];
      break;
    case '3 MONTH':
      a[i].text = langArray['LTXT_3MONTH'];
      break;
    case 'HOUR':
      a[i].text = langArray['LTXT_SETUPSYSDATETIME_HOUR'];
      break;
    case 'DAY':
      a[i].text = langArray['LTXT_SETUPSYSDATETIME_DAY'];
      break;
    case 'WEEK':
      a[i].text = langArray['LTXT_SETUPSYSDATETIME_WEEK'];
      break;
    }
  }
};

