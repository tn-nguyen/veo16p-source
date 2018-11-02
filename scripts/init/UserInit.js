/**
 * @author chcha
 */

var ShowInit = function(menu) {
    toptab_visible();
    switch( menu ) {
        case 'UserManage':
            lang_file(INFO_LANGUAGE,'SETUPUSERMANAGEMENT');
            if ( INFO_VENDOR.indexOf('S1') < 0) {
              $('.mobile').hide();
            }
            if(INFO_VENDOR !='VIDECON') {
              $(".email_server").hide();
            }
            break;
        case 'UserAuth':
            lang_file(INFO_LANGUAGE,'SETUPUSERAUTHORITY');

            break;
        default:
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
      }
    }
};
