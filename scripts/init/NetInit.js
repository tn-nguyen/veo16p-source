/**
 * @author chcha
 */

var ShowInit = function(menu) {
    toptab_visible();
    switch( menu ) {
        case 'NetIPSetup':
            $(".network_ipsetup_setup #tab").tabs();
            lang_file(INFO_LANGUAGE,'SETUPUSERIPSETUP');
            if ( typeof INFO_IPSETSUPPORT == 'undefined'  ) { // if ip setup is not supported
              $('.c_sp_div_net input[type="button"]').hide();
              $('#dhcp').attr('disabled', 'disabled');
              $('.ipsetting').attr('disabled', 'disabled');
              $('.portsetting').attr('disabled', 'disabled');
              $('.ipv6linklocal').attr('disabled', 'disabled');
            }
            break;
        case 'NetDDNS':
            lang_file(INFO_LANGUAGE,'SETUPUSERDDNS');
            if (INFO_VENDOR === 'S1') {
              $(".hidden_s1").hide();
              $('.show_s1').show();
              $("#dvraddress").attr("disabled", "disabled");
            } else {
              $(".hidden_s1").show();
              $('.show_s1').hide();
            }
            break;
        case 'NetEmail':
            lang_file(INFO_LANGUAGE,'SETUPUSEREMAIL');
            if (INFO_VENDOR != 'VIDECON') {
              $(".mail_header").remove();
              $(".using_email2").remove();
            }
            break;
        case 'NetStatus':
            break;
        case 'NetSecurity':
          $(".network_security_setup #tab").tabs();

          if(INFO_MODEL.indexOf("IPX") < 0) {
            $(".for_ipx").hide();
          }
          if (INFO_MODEL.indexOf("5G") >= 0 || INFO_MODEL.indexOf("5X") >=0) {
            $("#li_ipfilter").hide();
          }

          lang_file(INFO_LANGUAGE,'SETUPNETWORKSECURITY');
          break;
        case 'NetRTP':
          $(".network_rtp_setup #tab").tabs();
          lang_file(INFO_LANGUAGE,'SETUPNETWORKRTP');

          if(INFO_DVRCHANNEL < 8) {
            $(".chenable8").hide();
            $(".chenable16").hide();
          } else if(INFO_DVRCHANNEL < 16) {
            $(".chenable16").hide();
          }
          
          break;
        case 'NetSNMP':
          $(".network_security_setup #tab").tabs();
          lang_file(INFO_LANGUAGE,'SETUPNETWORKSECURITY');
          break;
        case 'NetRTP':
          $(".network_rtp_setup #tab").tabs();
          lang_file(INFO_LANGUAGE,'SETUPNETWORKRTP');

          if(INFO_DVRCHANNEL < 8) {
            $(".chenable8").hide();
            $(".chenable16").hide();
          } else if(INFO_DVRCHANNEL < 16) {
            $(".chenable16").hide();
          }
          break;
        default:
    }

    var a = $('option');
    for (var i in a) {
      if (a[i].text == 'Off') {
        a[i].text = langArray['LTXT_OFF'];
      }
      if (a[i].text == 'On') {
        a[i].text = langArray['LTXT_ON'];
      }
      if (a[i].text == 'OFF') {
        a[i].text = langArray['LTXT_OFF'];
      }
      if (a[i].text == 'ON') {
        a[i].text = langArray['LTXT_ON'];
      }
      if (a[i].text == 'MAX') {
        a[i].text = langArray['LTXT_MAX'];
      }
      if (a[i].text == 'ALLOW LIST') {
        a[i].text = langArray['LTXT_ALLOW_LIST'];
      }
      if (a[i].text == 'DENY LIST') {
        a[i].text = langArray['LTXT_DENY_LIST'];
      }
      if (a[i].text == 'AUTO') {
        a[i].text = langArray['LTXT_AUTO'];
      }
      if (a[i].text == 'MANUAL') {
        a[i].text = langArray['LTXT_MANUAL'];
      }
      if (a[i].text == 'DIGEST') {
        a[i].text = langArray['LTXT_DIGEST'];
      }
      if (a[i].text == 'BASIC') {
        a[i].text = langArray['LTXT_BASIC'];
      }
      if (a[i].text == 'DISABLE') {
        a[i].text = langArray['LTXT_COMBO_MENU_DISABLE'];
      }
      if (a[i].text == 'ENABLE') {
        a[i].text = langArray['LTXT_COMBO_MENU_ENABLE'];
      }
    }
};
