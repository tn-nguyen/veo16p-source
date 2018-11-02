/**
 * @author chcha
 */

function round(f, n) {
  if( n != null && n > 0 ) {
    var a = Math.pow(10, n);
    return Math.round(f * a) / a;
  }

  return Math.round(f);
}

function calc_capa(str_capa, format) {
  var num;
  var strCapa;

  try {
    num = parseInt(str_capa);

    switch(format) {
      case 'GB':
        if( num == NaN ) {
          strCapa = 'x';
        } else if( num > 1024) {
          // TB
          var b = num / 1024;
          strCapa = round(b, 1) + ' TB';
        } else {
          strCapa = str_capa + ' GB';
        }
      break;
      default:
      case 'MB':
        if( num == NaN ) {
          strCapa = 'x';
        } else if( num > 1024 * 1024 * 1024) {
          // TB
          var b = num / 1024 / 1024 / 1024;
          strCapa = round(b, 1) + ' TB';
        } else if( num > 1024 * 1024 ) {
          // GB
          var b = num / 1024 / 1024;
          strCapa = round(b, 1) + ' GB';
        } else if( num > 1024 ) {
          // MB
          var b = num / 1024;
          strCapa = round(b, 1) + ' MB';
        }
      break;
    }

  } catch (e) {
    $z.error(e);
  }

  return strCapa;
}

$z.v({
    SystemDatetime : {
        init: function() {
            //$("#datetime_tabs").tabs();
          var options = new Array();

          for (var i = 0; i <= 23 ; i += 1) {
            options.push('' + i );
          }
          makeSelectOptions('#hourpicker', options);

          var options_hourpicker = document.getElementById("hourpicker").options;
          for(var i = 0; i < options_hourpicker.length; i++) {
            options_hourpicker[i].value = i;
          }

          options = new Array();
          for (var i = 0; i < 60 ; i += 1) {
            options.push('' + i );
          }
          makeSelectOptions('#minutepicker', options);
          makeSelectOptions('#secondpicker', options);

          if (INFO_VENDOR === 'ALSOK' || INFO_VENDOR === 'TAKENAKA') {
            $(".remove_alsok").hide();
          }
        },
        getDayTimeText: function(dt, dateformat, timeformat) {
          c = dt;
          var daytime_text = '';

          switch(dateformat) {
            case '0':
              daytime_text += c.yyyy + '-' + c.mm + '-' + c.dd;
              break;
            case '1':
              daytime_text += c.mm + '-' + c.dd + '-' + c.yyyy;
              break;
            case '2':
              daytime_text += c.dd + '-' + c.mm + '-' + c.yyyy;
              break;
            default:
              daytime_text += c.yyyy + '-' + c.mm + '-' + c.dd;
              break;
          }

          switch(timeformat) {
            case '0':
              daytime_text += ' ' + c.hour + ':' + c.min + ':' + c.sec;
              break;
            case '1':
            default:
              daytime_text += ' ' + (c.hour % 12) + ':' + c.min + ':' + c.sec;
              daytime_text += (c.hour < 12) ? ' AM' : ' PM';
              break;
          }

          $('#dayandtime').val(daytime_text);
        },

        update: function(array) {
          var c = $z.current;
          this.getDayTimeText(array, array['dateformat'], array['timeformat']);
          c.initArray = array;
          $('#dateformat').val(array['dateformat']);
          $('#timeformat').val(array['timeformat']);

          $('#nettimeservsetup').val(array['nettimeservsetup']);
          $('#autotimesync').val(array['autotimesync']);
          $('#synctime').val(array['synctime']);

          $('#timezone').val(array['timezone']);
          $('#dst').val(array['dst']);

          $('#syncfreq').val(array['syncfreq']);

          if($('#autotimesync').val() == '0'){
            $('#nextsynctime').val(langArray['LTXT_SETUPSYSDATETIME_NOSYNCTIME']);
          } else {
            if(array['lastsync'] == '0'){
              array['lastsync'] = array['curr_gmttime'];
            }
            var temp = new Date((parseInt(array['lastsync']) 
              + parseInt(array['syncfreq'])) 
              * 1000);
            $('#nextsynctime').val(this.dateTime(temp, array['dateformat'], $('#synctime').val(), array, $('#syncfreq').val()));
          }
          $('#syncfreq').val(array['syncfreq']);

          /*var utcTD = new Date();
          utcTD.setFullYear(array['yyyy']);
          utcTD.setMonth(array['mm']);
          utcTD.setDate(array['dd']);
          utcTD.setHours(array['hour']);
          utcTD.setMinutes(array['min']);
          utcTD.setSeconds(array['sec']);
          utcTD.setMilliseconds(0);

          $('#curr_gmttime').val(parseInt(utcTD.getTime()/1000));
          array['curr_gmttime'] = parseInt(utcTD.getTime()/1000);*/
        },
        dateTime: function(d, format_date, format_time, array, option) {
          var result;
          var year = d.getFullYear();
          var month = d.getMonth()+1;
          var date = d.getDate();
          var hours = d.getHours();
          var min = d.getMinutes();

          var current = new Date(parseInt(array['curr_gmttime']) * 1000);
          if(year == current.getFullYear() 
            && month == current.getMonth()+1 
            && date-1 == current.getDate() 
            && array['syncfreq'] == '86400' 
            && array.hour < parseInt(array['synctime'])){
            date -= 1;
          }

          if(month < 10) {
            month = "0" + month;
          }
          if(date < 10) {
            date = "0" + date;
          }
          if(hours < 10) {
            hours = "0" + hours;
          }
          if(min < 10) {
            min = "0" + min;
          }                                  
          
          switch(format_date) {
          case '0':
            result = year + "/" + month + "/" + date;
            break;
          case '1':
            result = month + "/" + date + "/" + year;
            break;
          case '2':
            result = date + "/" + month + "/" + year;
            break;
          default:
            result = year + "/" + month + "/" + date;
            break;
          }

          if(format_time < 10)
            format_time = "0" + format_time;

          if(option == "86400") {
            result = langArray['LTXT_SETUPSYSDATETIME_EVERY_DAY'] + " " + format_time + ":00" ;
          } else {
            result += " " + format_time + ":" + "00";
          }

          return result;
        }
    },
    SystemManage : {
        init: function() {
          if( INFO_MODEL.indexOf("IPXP") < 0 ) {
            $(".foripxpro").remove();
          }

          if( INFO_MODEL.indexOf("IPX") >= 0 ) {
            $(".foripx").show();
          } else if(INFO_MODEL.indexOf("UTM") >= 0) {
            $(".systemid").show();  //SYSTEM ID ON
            $(".foripx").remove();
          } else if(INFO_MODEL.indexOf("ANF") >= 0) {
            $(".systemid").show();  //SYSTEM ID ON
            $(".foripx").remove();
          } else if(INFO_MODEL.indexOf("ATM") >= 0) {
            $(".systemid").show();  //SYSTEM ID ON
            $(".foripx").remove();
          } else {
            $(".foripx").remove();
          }

          if( INFO_MODEL.indexOf("IPX") >= 0 && INFO_MODEL.indexOf("ECO") >= 0 ) {
            //$(".hideforeco").hide();
            $(".hideforeco").remove();
          }

          if (INFO_VENDOR === 'ALSOK' || INFO_VENDOR === 'TAKENAKA') {
            $(".remove_alsok").hide();
          }
        },
        update: function(array) {
          $('#passwd_enable').val(array['passwd_enable']);
          $('#passwd_expired').val(array['passwd_expired']);
          $('#passwd_renew').val(array['passwd_renew']);
          $('#auto_logout').val(array['auto_logout']);
          $('#duration').val(array['duration']);
          $('#poe_limit').val(array['poe_limit']);
          $('#poe_limit_hub').val(array['poe_limit_hub']);
          $('#sig_type').val(array['sig_type']);
          $('#system_id').val(array['system_id']);
          this.passwordCheck();
          this.autoLogoutCheck();
        },
        passwordCheck: function(value) {
          if ($("#passwd_enable").val() == 0) {
            $("#passwd_expired").attr("disabled", "disabled");
          } else {
            $("#passwd_expired").removeAttr("disabled");
          }
        },
        autoLogoutCheck: function(value) {
          if ($("#auto_logout").val() == 0) {
            $("#duration").attr("disabled", "disabled");
          } else {
            $("#duration").removeAttr("disabled");
          }
        }
    },
    SystemInfo : {
        init: function() {
          $('dt.info_model, dd.info_model').hide();
        },
        update: function(array) {
            if( array['model'].length > 0 ) {
              $('dt.info_model, dd.info_model').show();
              $('#model').val(array['model']);
            } else {
              $('dt.info_model, dd.info_model').remove();
            }

            if (INFO_VENDOR == "S1") {
              $('#swver').val(array['swfakever']);
            } else {
              $('#swver').val(array['swver']);
            }

            $('#swverdate').val(array['swverdate']);
            if(INFO_MODEL.indexOf('UTM5X')>=0 || INFO_MODEL.indexOf('UTM5G')>=0) {
              $('#hwver').val('-');
            } else {
            $('#hwver').val(array['hwver']);
            }
            //$('#diskcap').val(calc_capa(parseInt(array['diskcap3'])));
            var diskcap = array['diskcap2'].split(" ");
            $('#diskcap').val(calc_capa(diskcap[0], diskcap[1]));
            
            //$('#diskuse').val(array['diskuse2']);
            var diskuse = array['diskuse2'].split(" ");
            $('#diskuse').val(calc_capa(diskuse[0], diskuse[1]));
            $('#disknum').val(array['disknum']);
            $('#ipaddr').val(array['ipaddr']);
            $('#ipv6addr').val(array['ipv6ipaddr']);
            $('#macaddr').val(array['macaddr']);
            $('#ddnsdomain').val(array['ddnsdomain']);
            $('#netclntport').val(array['netclntport']);
            $('#webservport').val(array['webservport']);
            $('#sysname').val(array['sysname']);

            var tempResolution = array['resolution'].split('(' , 2);
            
            if(tempResolution.length == 2) {
                $('#resolution').val(tempResolution[0].toUpperCase() + '(' + tempResolution[1]);
            }
            else {
                $('#resolution').val(array['resolution'].toUpperCase());
            }
            //$('#resolution').val();

            var cls = '';
            if( parseInt(array['ain_cam_num']) == 0 ) {
            	$(".ain_oncam").remove();
            }
            if( parseInt(array['aout_cam_num']) == 0 ) {
            	$(".aout_oncam").remove();
            }

            if( INFO_MODEL.indexOf("ATM") >= 0 || INFO_MODEL.indexOf("ANF") >= 0 || INFO_MODEL.indexOf("UTM") >= 0 ) {
              $(".aout_oncam").remove();
              $(".ain_oncam").remove();
              $("#sysinfo_arincam").remove();
            }

            var mask = parseInt(array['cam_mask']);
            $('ul#sysinfo_camera').empty();
            for( var i=0 ; i < INFO_DVRCHANNEL ; i++ ) {
                if ( 1 & (mask >> i) ) {
                    cls = 'c_sp_li_on';
                } else {
                    cls = 'c_sp_li_off';
                }
                $('ul#sysinfo_camera').append($('<li>').html(i+1).addClass(cls));
            }

            mask = parseInt(array['ain_cam']);

            $('ul#sysinfo_arincam').empty();
            for( var i=0 ; i < parseInt(array['ain_cam_num']) ; i++ ) {
                if ( 1 & (mask >> i) ) {
                    cls = 'c_sp_li_on';
                } else {
                    cls = 'c_sp_li_off';
                }
                $('ul#sysinfo_arincam').append($('<li>').html(i+1).addClass(cls));
            }

            mask = parseInt(array['ain_dvr']);
            $('ul#sysinfo_arindvr').empty();
            for( var i=0 ; i < parseInt(array['ain_dvr_num']) ; i++ ) {
                if ( 1 & (mask >> i) ) {
                    cls = 'c_sp_li_on';
                } else {
                    cls = 'c_sp_li_off';
                }
                $('ul#sysinfo_arindvr').append($('<li>').html(i+1).addClass(cls));
            }




            mask = parseInt(array['aout_cam']);

            $('ul#sysinfo_aroutcam').empty();
            for( var i=0 ; i < parseInt(array['aout_cam_num']) ; i++ ) {
                if ( 1 & (mask >> i) ) {
                    cls = 'c_sp_li_on';
                } else {
                    cls = 'c_sp_li_off';
                }
                $('ul#sysinfo_aroutcam').append($('<li>').html(i+1).addClass(cls));
            }

            mask = parseInt(array['aout_dvr']);


            $('ul#sysinfo_aroutdvr').empty();
            for( var i=0 ; i < parseInt(array['aout_dvr_num']) ; i++ ) {
                if ( 1 & (mask >> i) ) {
                    cls = 'c_sp_li_on';
                } else {
                    cls = 'c_sp_li_off';
                }
                $('ul#sysinfo_aroutdvr').append($('<li>').html(i+1).addClass(cls));
            }

        }
    },
    SystemControlDevice : {
        init: function() {
            for( var i=0 ; i < 256 ; i++ ) {
                $('#systemid').append( $('<option>').val(i).html(i));
            }

        },
        update: function(array) {
          $('#protocol').empty();

          for( var i=0 ; i < parseInt(array['protocol_cnt']) ; i++ ) {
            $('#protocol').append($('<option>').val(i).html(array['protocol_name'+i]));
          }
          $('#systemid').val(array['systemid']);
          $('#protocol').val(array['protocol']);
          $('#baud').val(array['baud']);

          $("#input_rmcid").val(array['rmcID']);

          if (INFO_VENDOR == "S1") {
            $('#secom_dual_act').val(array['secom_dual_act']);
            $('#secom_dual_ip').val(array['secom_dual_ip']);
            $('#secom_dual_port').val(array['secom_dual_port']);

            this.enableSecomDual();
          }
        },
        enableSecomDual: function() {
          var enable = $('#secom_dual_act').val();
          if (enable == '1') {
            $('#secom_dual_ip').removeAttr('disabled');
            $('#secom_dual_port').removeAttr('disabled');
          } else if (enable == '0') {
            $('#secom_dual_ip').attr('disabled', 'disabled');
            $('#secom_dual_port').attr('disabled', 'disabled');
          }
        }

    },
    SystemSecurity : {
      init: function() {
        if( INFO_MODEL.indexOf("IPXP") < 0 ) {
          $(".foripxpro").remove();
        }

        if( INFO_MODEL.indexOf("IPX") >= 0 ) {
          $(".foripx").show();
        } else {
          $(".foripx").remove();
        }

        if ( INFO_VENDOR.indexOf('S1') >= 0 ) {
          $('#audio_support').attr('disabled', 'disabled')
        }
      },
      update: function(array) {
          $('#audio_support').val(array['audio_support']);
          $('#snapshot_support').val(array['snapshot_support']);
          $('#enhanced_password').val(array['enhanced_password']);
          $('#password_check').val(array['password_check']);

          $('#dual_login').val(array['dual_login']);
          $('#id_input_mode').val(array['id_input_mode']);
          $('#enhanced_id').val(array['enhanced_id']);
      }
    }
});
