/**
 * @author chcha
 */

var ShowInit = function(menu) {
    toptab_visible();
    if (INFO_VENDOR.indexOf("S1") >= 0) {
      $('.show_s1').show();
    } else {
      $('.show_s1').remove();
    }

    switch( menu ) {
        case 'SystemDatetime':
            lang_file(INFO_LANGUAGE,'SETUPSYSDATETIME');
            if( INFO_MODEL.indexOf("IPX") >= 0 || INFO_MODEL.indexOf("UTM") >= 0 || INFO_MODEL.indexOf("ATM") >= 0 || INFO_MODEL.indexOf("ANF") >= 0) {
              $('.datetime').show();
            }
            break;
        case 'SystemManage':
            lang_file(INFO_LANGUAGE,'SETUPSYSMANAGE');
            if( INFO_MODEL.indexOf("IPX") >= 0 || INFO_MODEL.indexOf("4G") > 0 || INFO_MODEL.indexOf("5G") > 0 || INFO_MODEL.indexOf("5X") > 0) {
              $('.network_fw_update').show();
              //$('#lang_renew_passwd').hide();
              //$('#passwd_renew').hide();
            }
            else if(INFO_MODEL.indexOf("UTM") >= 0 || INFO_MODEL.indexOf("ATM") >= 0 || INFO_MODEL.indexOf("ANF") >= 0)
            {
              $('.network_fw_update').show();
            }

            if(typeof(INFO_PASSWD_CHANGED) == undefined || parseInt(INFO_PASSWD_CHANGED) == 0){
              $('#lang_renew_passwd').hide();
              $('#passwd_renew').hide();
            }
            break;
        case 'SystemInfo':
            /* FIXME: SETUPSYSINFO lang 추�망 */
            lang_file(INFO_LANGUAGE,'SETUPSYSINFO');

            if(INFO_ALARM_SENSOR.ain_cam == 0 && INFO_ALARM_SENSOR.ain_dvr == 0) {
              $('.ain_ondvr').hide();
            }

            if(INFO_ALARM_SENSOR.aout_cam == 0 && INFO_ALARM_SENSOR.aout_dvr == 0) {
              $('.aout_ondvr').hide();
            }

            break;
        case 'SystemControlDevice':
            lang_file(INFO_LANGUAGE,'SETUPSYSCONTROLDEV');

            //IF VENDOR IS TAKENAKA, THEN HIDE CONTROL DEVICE MENU AND SHOWING REMOTE CONTROLLER MENU.
            if(INFO_VENDOR == 'TAKENAKA')
            {
              $('.c_sp_tb_system_dev').hide();
              $('#c_sp_tb_system_dev').show();
              $("#input_rmcid").keyup(function(event){
                //if character is added or length of remote controller id is exceed 3, then slice it.
                if(
                  //if condition start
                  (Validator.number($('#input_rmcid').val()) == Validator.ERR_VALID_NUMBER)
                  || $('#input_rmcid').val().length > 2)
                  //if condition end
                {
                  var str = $('#input_rmcid').val();
                  if (str.length > 0)
                  {
                    str = str.slice(0, 2)
                    str = parseInt(str);

                    if(isNaN(str))
                    {
                      str = 0;
                    }
                  }
                  else
                  {
                    str = 0;
                  }

                  $('#input_rmcid').val(parseInt(str));
                }
                //when first character of remote controller id is 0, then get rid of 0 from remote controller id.
                else if($('#input_rmcid').val().length > 1)
                {
                  var str = $('#input_rmcid').val();
                  if( str.charAt(0) == '0')
                  {
                    str = str.charAt(1);
                    $("#input_rmcid").val(str);
                  }
                }
              });
            }
            else
            {
              $('#c_sp_tb_system_dev').hide();
            }

            break;
        case 'SystemSecurity':
          lang_file(INFO_LANGUAGE, 'SETUPSYSSECURITY');


          if(INFO_MODEL.indexOf("UTM") >= 0 || INFO_MODEL.indexOf("ANF") >= 0) {
            $("#lang_audio_support").parent("dt").hide();
            $("#audio_support").parent("dd").hide();
          }
          //   $("#lang_snapshot_support").parent("dt").hide();
          //   $("#snapshot_support").parent("dd").hide();

          //   $("#lang_System_security").parent("h2").hide();

          //   $("#lang_enhanced_password_rule").parent("dt").hide();
          //   $("#enhanced_password").parent("dd").hide();

          //   $("#lang_password_check_when_search_or_backup").parent("dt").hide();
          //   $("#password_check").parent("dd").hide();
          // } else {

          // }

          /*if(INFO_MODEL.indexOf("_UTM5HG_1648D") >= 0) {
						$(".password_check_when_search_or_backup").hide();

						$("#lang_enhanced_id_rule").parent("dt").hide();
						$("#enhanced_id").parent("dd").hide();

						$("#lang_id_input_mode").parent("dt").hide();
            $("#id_input_mode").parent("dd").hide();
					}*/

					if(INFO_SYSTEM_SECURITY_AUDIO == 0) {
            $("#lang_audio_support").parent("dt").hide();
            $("#audio_support").parent("dd").hide();
          }

          if(INFO_SYSTEM_SECURITY_DOUBLE_LOGIN == 0) {
            $("#lang_dual_login").parent("dt").hide();
            $("#dual_login").parent("dd").hide();
          }

          if(INFO_SYSTEM_SECURITY_CHECK_PASSWORD == 0) {
            $(".password_check_when_search_or_backup").hide();
          }

          if(INFO_SYSTEM_SECURITY_ID_INPUT == 0) {
            $("#lang_id_input_mode").parent("dt").hide();
            $("#id_input_mode").parent("dd").hide();
          }

          if(INFO_SYSTEM_SECURITY_ENHANCED_ID == 0) {
            $("#lang_enhanced_id_rule").parent("dt").hide();
            $("#enhanced_id").parent("dd").hide();
          }

					if(INFO_VENDOR.indexOf("CBC") < 0) {
            $("#dual_login").parent("dd").hide();
            $("#lang_dual_login").parent("dt").hide();
          } else {
            $(".password_check_when_search_or_backup").hide();
          }

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
      case 'MAX':
        a[i].text = langArray['LTXT_MAX'];
        break;
      case 'YYYY/MM/DD':
        a[i].text = langArray['LTXT_YYYYMMDD'];
        break;
      case 'MM/DD/YYYY':
        a[i].text = langArray['LTXT_MMDDYYYY'];
        break;
      case 'DD/MM/YYYY':
        a[i].text = langArray['LTXT_DDMMYYYY'];
        break;
      case '24 HOUR':
        a[i].text = langArray['LTXT_24HOUR'];
        break;
      case 'NOT USED':
        a[i].text = langArray['LTXT_NOTUSED'];
        break;
      case '1 MONTH':
        a[i].text = langArray['LTXT_1MONTH'];
        break;
      case '2 MONTHS':
        a[i].text = langArray['LTXT_2MONTHS'];
        break;
      case '3 MONTHS':
        a[i].text = langArray['LTXT_3MONTHS'];
        break;
      case '4 MONTHS':
        a[i].text = langArray['LTXT_4MONTHS'];
        break;
      case '5 MONTHS':
        a[i].text = langArray['LTXT_5MONTHS'];
        break;
      case '6 MONTHS':
        a[i].text = langArray['LTXT_6MONTHS'];
        break;
      case '12 MONTHS':
       a[i].text = langArray['LTXT_12MONTHS'];
       break;
      case '1 MINUTE':
        a[i].text = langArray['LTXT_1MINUTE'];
        break;
      case '2 MINUTES':
        a[i].text = langArray['LTXT_2MINUTES'];
        break;
      case '3 MINUTES':
        a[i].text = langArray['LTXT_3MINUTES'];
        break;
      case '5 MINUTES':
        a[i].text = langArray['LTXT_5MINUTES'];
        break;
      case '10 MINUTES':
        a[i].text = langArray['LTXT_10MINUTES'];
        break;
      case 'DIRECT INPUT METHOD':
        a[i].text = langArray['LTXT_SETUPSYSSECURITY_DIRECT_INPUT_METHOD'];
        break;
      case 'ID SELECTION METHOD':
        a[i].text = langArray['LTXT_SETUPSYSSECURITY_ID_SELECTION_METHOD'];
        break;
      }
    }
};
