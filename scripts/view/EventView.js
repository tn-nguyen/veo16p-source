/**
 * @author chcha
 */

$z.v({
    EventAlarmOut : {
        schedWidget: new SchedWidget( {
            indices : [
                {name: langArray["LTXT_OFF"],   style_cls: 'arout_color1',     button: 'dlg_off'},
                {name: langArray["LTXT_ON"],    style_cls: 'arout_color2',      button: 'dlg_on'},
                {name: langArray["LTXT_SETUPEVENT_EVENT"], style_cls: 'arout_color3',   button: 'dlg_event'}
            ]},
            function schedcb(widget) {
                var c = $z.current;
                var v = c.v;
                var m = c.m;

                var data = widget.getBindData();
                var array = v.getSchedArray(data);
                var day = widget.currentDay;

                // notify event occur
                $.event.trigger("EVT_SCHED_CHANGE", [ array, day ] );
            }
        ),

        init: function() {
          this.schedWidget.init();

          // Schedule Select by Day Event
          var schedWidget = this.schedWidget;
          $('#schmodeSelect').change(function() {
            var day = parseInt($(this).val());

            schedWidget.updateByDay(day);
          });

          var reg_anf1648 = /_ANF.*1648.*/;
          var reg_anf0824 = /_ANF.*0824.*/;
          var reg_anf0412 = /_ANF.*0412.*/;

          for( var i=0, alarm=1, relay=1 ; i < NUM_ALARMS ; i++ ) {
            if( reg_anf1648.test(INFO_MODEL) ) {
              if( i < 8 ) {
                if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                  $("span.lbl" + (i+1)).text(
                      "RELAY" + (relay++) );
                } else {
                  $("span.lbl" + (i+1)).text(
                      "R" + (relay++) );
                }
              } else {
                $("span.lbl" + (i+1)).text(
                    "AO" + (alarm++) );
              }
            } else if( reg_anf0824.test(INFO_MODEL) ) {
              if( i < 4 ) {
                if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                  $("span.lbl" + (i+1)).text(
                      "RELAY" + (relay++) );
                } else {
                  $("span.lbl" + (i+1)).text(
                      "R" + (relay++) );
                }
              } else {
                $("span.lbl" + (i+1)).text(
                    "AO" + (alarm++) );
              }
            } else if( reg_anf0412.test(INFO_MODEL) ) {
              if( i < 4 ) {
                if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                  $("span.lbl" + (i+1)).text(
                      "RELAY" + (relay++) );
                } else {
                  $("span.lbl" + (i+1)).text(
                      "R" + (relay++) );
                }
              } else {
                $("span.lbl" + (i+1)).text(
                    "AO" + (alarm++) );
              }
            } else if (INFO_MODEL.indexOf("UTM") >= 0 ||
                  INFO_MODEL.indexOf("ATM") >= 0) {
              if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                $("span.lbl" + (i+1)).text(
                    "RELAY" + (relay++) );
              } else {
                $("span.lbl" + (i+1)).text(
                    "R" + (relay++) );
              }
            } else {
              if( i < NUM_ALARM_IPCAM ) {
                $("span.lbl" + (i+1)).text( i+1 );
                if( INFO_MODEL.indexOf("IPX") >= 0 ) {
                  $("#op_type"+i).prop('disabled', 'disabled');
                }
              } else {
                $("span.lbl" + (i+1)).text(
                    "AO" + (alarm++) );
              }
            }
          }
        },

        /*
         * Make Array for Schedwidget
         * Mon[ '(Ch1:24hr)(Ch2:24hr)' ]
         * Tue[ '(Ch1:24hr)(Ch2:24hr)' ]  ...
         */
        parseSched: function(array) {
            var sched = [];

            for( var day=0 ; day < 7 ; day++ ) {
                sched[day] = '';

                for( var ch=0 ; ch < NUM_ALARMS ; ch++) {
                    sched[day] += array['sched'+ch].substr(day*24, 24);
                }
            }

            return sched;
        },
        // Schedule Widget Function
        /*
         * Make Array for Event Sysdb
         * Ch1['(Mon24h)(Tue24h)']
         * Ch2['(Mon24h)(Tue24h)']  ...
         */
        getSchedArray: function() {
            var sched = this.schedWidget.getBindData();
            var array = [];

            for( var i=0 ; i < NUM_ALARMS ; i++ ) {
                array[i] = '';
            }

            for( var day=0 ; day < 7 ; day++ ) {
                for( var ch=0 ; ch < NUM_ALARMS ; ch++) {
                    array[ch] += sched[day].substr(ch*24, 24);
                }
            }

            return array;
        },

        update: function(array) {
            for( var ch=0 ; ch < NUM_ALARMS ; ch++ ) {
                this.updateName(ch, array['name'+ch]);
                this.updateRelayType(ch, array['relay_type'+ch]);
                this.updateOperation(ch, array['op_type'+ch]);
                this.updateDuration(ch, array['duration'+ch]);
                //this.updateSchedule(ch, array['sched' + ch]);
            }

            var day2;

            day2 = parseInt($('#schmodeSelect').val());

            var sched = this.parseSched(array);
            this.schedWidget.bind(sched, day2);
            this.schedWidget.updateByDay(day2);
        },
        updateName: function(ch, val) {
            $('#name' + ch).val(val);
        },
        updateRelayType: function(ch, val) {
        },
        updateOperation: function(ch, val) {
            var jqobj = $('#op_type' + ch);
            setListOne(jqobj, val);

            //jqobj.multiselect("update");
        },
        updateDuration: function(ch, val) {
            var jqobj = $('#duration' + ch);
            setListOne(jqobj, val);
        }
    },
    EventNoti : {
        checks : [
            'vpopup_spot',
            'opopup_spot',
            'ftp_jpeg',
            'ftp_weblink',
            'email_serv'
        ],
        lists : [
            'buzzer_duration',
            'vpopup_duration',
            'vpopup_multi',
            'opopup_duration',
            'email_freq',
            'ftp_dir_mode',
            'ftp_fname_mode',
            'ftp_freq',
            'sms_server',
            'sms_sched_from',
            'sms_sched_to',
            'sms_server',
            'sms_sched_from',
            'sms_sched_to',
            'push_freq',
            'push_pushservice'
        ],
        texts : [
            'ftp_dir_path',
            'ftp_fname_prefix',
            'ftp_host',
            'ftp_port',
            'ftp_username',
            'ftp_passwd',
            'sms_appid',
            'sms_user',
            'sms_password',
            'lang_sms_limit_count'
        ],
        init: function() {
          if (INFO_SNAPSHOT_SUPPORT == '1') {
            $('#email_jpeg').removeAttr('disabled');
            $('#ftp_jpeg').removeAttr('disabled');
          } else {
            $('#email_jpeg').attr('disabled', 'disabled');
            $('#ftp_jpeg').attr('disabled', 'disabled');
          }

          $("#ftp_dir_mode").change( function (event) {
            if ($("#ftp_dir_mode").val() == '2' || $("#ftp_dir_mode").val() == '3') {
              $("#ftp_dir_path").prop("disabled", "disabled");
            } else {
              $("#ftp_dir_path").removeAttr("disabled");
            }
          });

          $("#ftp_fname_mode").change( function (event) {
            if ($("#ftp_fname_mode").val() == '2' || $("#ftp_fname_mode").val() == '3') {
              $("#ftp_fname_prefix").prop("disabled", "disabled");
            } else {
              $("#ftp_fname_prefix").removeAttr("disabled");
            }
          });


          $("#ftp_dir_mode").change( function (event) {
            if ($("#ftp_dir_mode").val() == '2' || $("#ftp_dir_mode").val() == '3') {
              $("#ftp_dir_path").prop("disabled", "disabled");
            } else {
              $("#ftp_dir_path").removeAttr("disabled");
            }
          });

          $("#ftp_fname_mode").change( function (event) {
            if ($("#ftp_fname_mode").val() == '2' || $("#ftp_fname_mode").val() == '3') {
              $("#ftp_fname_prefix").prop("disabled", "disabled");
            } else {
              $("#ftp_fname_prefix").removeAttr("disabled");
            }
          });


          if ( INFO_MODEL.indexOf("ATM") || INFO_MODEL.indexOf("ANF") ) {
            $("#inc_snapshot").remove();
          }

          $("#ftp_dir_mode").change( function (event) {
            if ($("#ftp_dir_mode").val() == '2' || $("#ftp_dir_mode").val() == '3') {
              $("#ftp_dir_path").prop("disabled", "disabled");
            } else {
              $("#ftp_dir_path").removeAttr("disabled");
            }
          });

          $("#ftp_fname_mode").change( function (event) {
            if ($("#ftp_fname_mode").val() == '2' || $("#ftp_fname_mode").val() == '3') {
              $("#ftp_fname_prefix").prop("disabled", "disabled");
            } else {
              $("#ftp_fname_prefix").removeAttr("disabled");
            }
          });

          if(INFO_ALARM_SENSOR.ain_dvr <= 0) {
            $("#lang_alarm_switch_mode").parent("dt").hide();
            $("#alarm_switch_mode").parent("dd").hide();
            $("#lang_alarm_switch_port").parent("dt").hide();
            $("#alarm_switch_port").parent("dd").hide();
          } else {
            // for(var i=0; i<INFO_ALARM_SENSOR.ain_dvr; i++) {
            //   $("#alarm_switch_port").append($('<option>').val(i).html('SENSOR'+i));
            // }
          }

          $("#alarm_switch_mode").change(function(event){
            if($(this).val() == 0) {
              $("#alarm_switch_port").prop("disabled", "disabled");
            } else {
              $("#alarm_switch_port").removeAttr("disabled");
              alert(langArray["LTXT_SWITCH_MODE_ON_NOTICE"]);
            }
          });
          $("#alarm_switch_mode").change();

          if (INFO_VENDOR === 'ALSOK' || INFO_VENDOR == 'TAKENAKA') {
              $(".remove_alsok").hide();
          }

          if (INFO_VENDOR.indexOf("VIDECON") < 0) {
            $("#physical_switch").hide();
          }

          

          //email schedule all-checkbox event closure generator
          function _emailSchedAllChange(param_index) {
              return function(){
              var flag = false;
              flag = $('input#email_sched_all_'+param_index).prop('checked');

              for(var day=0; day<7; day++) {
                $('input#email_sched_wday'+param_index+'_'+day).prop('checked', flag);
              }
            }
          }

          //email schedule day-checkbox event closure generator
          function _emailShcedDayChange(param_index) {
            return function(){
                var flag_checked_least_once = false;
                var flag_checked_all = true;
                for(var day=0; day < 7; day++){
                  if($('input#email_sched_wday'+param_index+"_"+day).prop('checked')) {flag_checked_least_once = true;}
                  else {flag_checked_all = false;}
                }

                if(flag_checked_least_once){
                  $('select#email_from_h_'+param_index).removeAttr("disabled");
                  $('select#email_from_m_'+param_index).removeAttr("disabled");
                  $('select#email_to_h_'+param_index).removeAttr("disabled");
                  $('select#email_to_m_'+param_index).removeAttr("disabled");
                } else {
                  $('select#email_from_h_'+param_index).attr('disabled', 'disabled');
                  $('select#email_from_m_'+param_index).attr('disabled', 'disabled');
                  $('select#email_to_h_'+param_index).attr('disabled', 'disabled');
                  $('select#email_to_m_'+param_index).attr('disabled', 'disabled');
                }

                if(flag_checked_all == true) {
                  $('input#email_sched_all_'+param_index).prop('checked', true);
                } else {
                  $('input#email_sched_all_'+param_index).prop('checked', false);
                }

            }
          }

          for(var sched=0; sched<10; sched++) {
            //regist event closure to each all-checkbox.
            $('input#email_sched_all_'+sched).change(_emailSchedAllChange(sched));

            for(var day=0; day<7; day++) {
              $('input#email_sched_wday'+sched+"_"+day).change(_emailShcedDayChange(sched));
            }
          }

        },
        update: function(arr) {
          var my = this;
          for( i in this.lists ) {
              var jqobj = $('#' + this.lists[i]);
              if (jqobj == undefined) continue;
              setListOne(jqobj, arr[this.lists[i]]);
          }

          for( i in this.checks ) {
              var jqobj = $('#' + this.checks[i]);
              if (jqobj == undefined) continue;
              setCheckByChar(jqobj, arr[this.checks[i]]);
          }
          for (i in this.texts) {
            var jqobj = $('#' + this.texts[i]);
            if (jqobj == undefined) continue;
            jqobj.val(arr[this.texts[i]]);
          }
          for( var i=0 ; i < parseInt(arr['email_cnt']) ; i++ ) {
              $('select#email_list').append(
                  $('<option>').attr('value', arr['email_address'+i])
                               .html(arr['email_address'+i])
              );

              $('input#email_address'+i).val(arr['email_address'+i]);
          }

          $("input[name=email_serv]").eq(arr['email_serv']).attr("checked", true);

          $('input#email_cnt').val(arr['email_cnt']);
          if( arr['email_jpeg'] == '0' ) {
            $('input#email_jpeg').prop('checked', false);
          } else {
            $('input#email_jpeg').prop('checked', true);
          }

          var tmp_flag_all_checked = true;
          for(var sched=0; sched<10; sched++){
            tmp_flag_all_checked = true;
            
            for(var day=0; day < 7; day++){

              if(arr['email_sched_wday'+sched+"_"+day] != '0') {
                $('input#email_sched_wday'+sched+"_"+day).prop('checked', true);
              } else {
                $('input#email_sched_wday'+sched+"_"+day).prop('checked', false);
                tmp_flag_all_checked = false;                
              }
            }

            if(tmp_flag_all_checked == true) {
              $('input#email_sched_all_'+sched).prop('checked', true);
            } else {
              $('input#email_sched_all_'+sched).prop('checked', false);
            }

            // for(var hour=0; hour < 24; hour++){
            //   var tmp;
            //   if(hour < 10)
            //     tmp = '0' + hour;
            //   else
            //     tmp = hour;
            //   $('select#email_from_h_'+sched).append(
            //     $('<option>').attr('value', hour)
            //       .html(tmp)
            //   );
            //   $('select#email_to_h_'+sched).append(
            //     $('<option>').attr('value', hour)
            //       .html(tmp)
            //   );

            // }

            // for(var min=0; min < 60; min++){
            //   var tmp;
            //   if(min < 10)
            //     tmp = '0' + min;
            //   else
            //     tmp = min;
            //   $('select#email_from_m_'+sched).append(
            //     $('<option>').attr('value', min)
            //       .html(tmp)
            //   );
            //   $('select#email_to_m_'+sched).append(
            //     $('<option>').attr('value', min)
            //       .html(tmp)
            //   );

            // }

            $('select#email_from_h_'+sched).val(arr['email_from_h_'+sched]).prop('selected', true);
            $('select#email_to_h_'+sched).val(arr['email_to_h_'+sched]).prop('selected', true);
            
            $('select#email_from_m_'+sched).val(arr['email_from_m_'+sched]).prop('selected', true);
            $('select#email_to_m_'+sched).val(arr['email_to_m_'+sched]).prop('selected', true);
          }

          if ($("#ftp_dir_mode").val() == '2' || $("#ftp_dir_mode").val() == '3') {
            $("#ftp_dir_path").prop("disabled", "disabled");
          } else {
            $("#ftp_dir_path").removeAttr("disabled");
          }

          if ($("#ftp_fname_mode").val() == '2' || $("#ftp_fname_mode").val() == '3') {
            $("#ftp_fname_prefix").prop("disabled", "disabled");
          } else {
            $("#ftp_fname_prefix").removeAttr("disabled");
          }

          if(INFO_ALARM_SENSOR.ain_dvr <= 0) {
            // $("#lang_alarm_switch_mode").parent("dt").hide();
            // $("#alarm_switch_mode").parent("dd").hide();
            // $("#lang_alarm_switch_port").parent("dt").hide();
            // $("#alarm_switch_port").parent("dd").hide();
          } else {
            $("#alarm_switch_port").empty();
            
            if(INFO_MODEL.indexOf("ANF5G") >= 0) {
              $("#alarm_switch_port").append($('<option>').val(16).html("ARI"));
            }
            for(var i=0; i<INFO_ALARM_SENSOR.ain_dvr; i++) {
              //$("#alarm_switch_port").append($('<option>').val(i).html(arr['sensor_name'+i]));
              $("#alarm_switch_port").append($('<option>').val(i).html("Al "+(i+1)));
            }

            $("#alarm_switch_mode").val(arr["alarm_switch_mode"]);
            $("#alarm_switch_port").val(arr["alarm_switch_port"]);
            if($("#alarm_switch_mode").val() == '1') {
              $("#alarm_switch_port").removeAttr("disabled");
            } else {
              $("#alarm_switch_port").prop("disabled", "disabled");
            }
          }

          $('#sms_server').change(function(event) {
            my.changeSmsServer();
          });

          my.changeSmsServer();
        },
        changeSmsServer: function() {
          var server = $('#sms_server').val();
          if (server == 'BIZ PPURIO') {
            $('#sms_appid').attr('disabled', 'disabled');
          } else {
            $('#sms_appid').removeAttr("disabled");
          }
        }

    },
    EventSensor : {
        init: function() {

            // arrays for camera dropdown list
            var camarray = {};
            for( var i=0 ; i < INFO_DVRCHANNEL ; i ++ ) {
                camarray[i] = i+1;
            }

            // arrays for alarm dropdown list
            var aroutarray = {};
            var reg_anf1648 = /_ANF.*1648.*/;
            var reg_anf0824 = /_ANF.*0824.*/;
            var reg_anf0412 = /_ANF.*0412.*/;

            for( var i=0, alarm=1, relay=1 ; i < NUM_ALARMS ; i ++ ) {
                if( i < NUM_ALARM_IPCAM ) {
                    aroutarray[i] = i+1;
                } else {
                  if (INFO_MODEL.indexOf("UTM") >= 0 ||
                      INFO_MODEL.indexOf("ATM") >= 0) {
                    if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                      aroutarray[i] = 'RELAY'+(relay++);
                    } else {
                      aroutarray[i] = 'R'+(relay++);
                    }
                  } else if( reg_anf1648.test(INFO_MODEL) ) {
                    if( i < 8 ) {
                      if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                        aroutarray[i] = 'RELAY'+(relay++);
                      } else {
                        aroutarray[i] = 'R'+(relay++);
                      }
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  } else if( reg_anf0824.test(INFO_MODEL) ) {
                    if( i < 4 ) {
                      if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                        aroutarray[i] = 'RELAY'+(relay++);
                      } else {
                        aroutarray[i] = 'R'+(relay++);
                      }
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  } else if( reg_anf0412.test(INFO_MODEL) ) {
                    if( i < 4 ) {
                      if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                        aroutarray[i] = 'RELAY'+(relay++);
                      } else {
                        aroutarray[i] = 'R'+(relay++);
                      }
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  } else if( INFO_MODEL == "_ATM_0412H" ) {
                    if( i < 4 ) {
                      if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                        aroutarray[i] = 'RELAY'+(relay++);
                      } else {
                        aroutarray[i] = 'R'+(relay++);
                      }
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  } else {
                    aroutarray[i] = 'A'+(alarm++);
                  }
                }

            }

            makeSelectOptions('#lcamera_all', camarray);
            $("#lcamera_all").multiselect({
              selectedList: 16,
              noneSelectedText: "----",
              horizontal: true,
              width : '90%'
            });

            makeSelectOptions('#arout_all', aroutarray);
            $("#arout_all").multiselect({
              selectedList: 16,
              noneSelectedText: "----",
              horizontal: true,
              width : '90%'
            });

            for( var i=0, sensor=1 ; i < NUM_SENSORS ; i++ ) {
                // table row title
                if( i < NUM_SENSOR_IPCAM ) {
                    $("span.lbl" + (i+1)).text( (i+1) );
                } else {
                  if (INFO_VENDOR === 'ALSOK' || INFO_VENDOR == 'TAKENAKA') {
                    $("span.lbl" + (i+1)).text( 'ALARM IN ' + (sensor++) );
                  } else {
                    $("span.lbl" + (i+1)).text( 'AI ' + (sensor++) );
                  }
                }

                // make dropdown list
                makeSelectOptions('#lcamera' + i, camarray);
                makeSelectOptions('#arout' + i, aroutarray);

                $("#lcamera"+i).multiselect({
                  selectedList: 16,
                    horizontal: true,
                    width : '90%'
                });
                $("#arout" + i).multiselect({
                  selectedList: 16,
                    horizontal: true,
                    width : '90%'
                });
            }

            if( (typeof(INFO_ALARM_SENSOR) != 'undefined') && (INFO_ALARM_SENSOR.aout_dvr == 0) ){
              $("#arout_all").multiselect('disable');
              for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
                $("#arout"+ch).multiselect('disable');
              }
            }

            if (INFO_VENDOR === 'ALSOK' || INFO_VENDOR == 'TAKENAKA') {
                $(".ftp").hide();
                $('.colspan').attr('colspan', 7);
            }

        },

        updateName: function(ch, val) {
            $('#name' + ch).val(val);
        },

        updateOperation: function(ch, val) {
            makeSelectSelected('#op_type'+ch, val);
        },

        updateLinkedCamera: function(ch, val) {
            var jqobj = $('#lcamera' + ch);
            setListByStr(jqobj, val);
            $("#lcamera" + ch).multiselect("refresh");
        },
        getLinkedCamera: function(ch) {
            var str = '0000000000000000';
            var jqobj = $('#lcamera' + ch);
            str = getStrByList(jqobj, str);

            return str;
        },
        updateAlarmOut: function(ch, val) {
            var jqobj = $('#arout' + ch);

            var correct_str;
            if( NUM_ALARM_IPCAM > 0 ) {
              correct_str = val.substr(0, NUM_ALARM_IPCAM) + val.substr(16, NUM_ALARM_DVR);
            } else {
              correct_str = val.substr(0, NUM_ALARM_DVR);
            }

            setListByStr(jqobj, correct_str);

            $("#arout" + ch).multiselect("refresh");
        },
        getAlarmOut: function(ch) {
            var str = '00000000000000000000000000000000';
            var jqobj = $('#arout' + ch);
            str = getStrByList(jqobj, str);

            return str;
        },
        updateBuzzer: function(ch, val) {
            setCheckByChar($('#buzzer'+ch), val);
            //$('#buzzer'+ch).change();
        },
        updateVpopup: function(ch, val) {
            setCheckByChar($('#vpopup'+ch), val);
            //$('#vpopup'+ch).change();
        },
        updateOpopup: function(ch, val) {
            setCheckByChar($('#opopup'+ch), val);
            //$('#opopup'+ch).change();
        },
        updateEmail: function(ch, val) {
            setCheckByChar($('#email'+ch), val);
            //$('#email'+ch).change();
        },
        updateFtp: function(ch, val) {
          setCheckByChar($('#ftp'+ch), val);
          //$('#ftp'+ch).change();
        },
        updateMobile: function(ch, val) {
          setCheckByChar($('#mobile'+ch), val);
          //$('#mobile'+ch).change();
        },
        updateMobilePush: function(ch, val) {
          setCheckByChar($('#mobilepush'+ch), val);
          //$('#mobilepush'+ch).change();
        },
        updateBuzzerAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<MAX_SENSORS; ch++) {
            if($('#buzzer'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#buzzer_all').prop('checked', true);
          } else {
            $('#buzzer_all').prop('checked', false);
          }
        },
        updateVpopupAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<MAX_SENSORS; ch++) {
            if($('#vpopup'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#vpopup_all').prop('checked', true);
          } else {
            $('#vpopup_all').prop('checked', false);
          }
        },
        updateOpopupAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<MAX_SENSORS; ch++) {
            if($('#opopup'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#opopup_all').prop('checked', true);
          } else {
            $('#opopup_all').prop('checked', false);
          }
        },
        updateEmailAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<MAX_SENSORS; ch++) {
            if($('#email'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#email_all').prop('checked', true);
          } else {
            $('#email_all').prop('checked', false);
          }
        },
        updateFtpAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<MAX_SENSORS; ch++) {
            if($('#ftp'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#ftp_all').prop('checked', true);
          } else {
            $('#ftp_all').prop('checked', false);
          }
        },
        updateMobileAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<MAX_SENSORS; ch++) {
            if($('#mobile'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#mobile_all').prop('checked', true);
          } else {
            $('#mobile_all').prop('checked', false);
          }
        },
        updateMobilePushAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<MAX_SENSORS; ch++) {
            if($('#mobilepush'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#mobilepush_all').prop('checked', true);
          } else {
            $('#mobilepush_all').prop('checked', false);
          }
        },
        update: function(array) {
          var v = this;

          for( var ch=0 ; ch < NUM_SENSORS ; ch++ ) {
            v.updateName(ch, array['name'+ch]);
            v.updateOperation(ch, array['op_type'+ch]);

            v.updateLinkedCamera(ch, array['lcamera'+ch]);
            v.updateAlarmOut(ch, array['arout'+ch]);

            v.updateBuzzer(ch, array['buzzer'+ch]);
            v.updateBuzzerAll();
            v.updateVpopup(ch, array['vpopup'+ch]);
            v.updateVpopupAll();
            v.updateOpopup(ch, array['opopup'+ch]);
            v.updateOpopupAll();
            v.updateEmail(ch, array['email'+ch]);
            v.updateEmailAll();
            if (typeof array['ftp' + ch] != undefined) {
              v.updateFtp(ch, array['ftp'+ch]);
              v.updateFtpAll();
            }
            if (typeof array['mobile'] != undefined) {
              v.updateMobile(ch, array['mobile'+ch]);
              v.updateMobileAll();
              v.updateMobilePush(ch, array['mobilepush'+ch]);
              v.updateMobilePushAll();
            }

            var ptzPresets = makePtzPresets(array);
            var ptzPresetArr = makePtzPresetPick(array, ch);
            window.ptzAct[ch].update(ptzPresetArr);
          }

          v.updateBuzzerAll();
          v.updateVpopupAll();
          v.updateOpopupAll();
          v.updateEmailAll();

          if (typeof array['ftp' + ch] != undefined) {
            v.updateFtpAll();
          }

          if (typeof array['mobile'] != undefined) {
            v.updateMobileAll();
            v.updateMobilePushAll();
          }
        }
    },
    EventMotion : {
        init: function() {

            for( var i=NUM_SENSORS ; i < MAX_SENSORS ; i++ ) {
                $("tr#sensor"+i).remove();
            }

            // arrays for dropdown list
            var camarray = {};
            for( var i=0 ; i < INFO_DVRCHANNEL ; i ++ ) {
                camarray[i] = i+1;
            }

            var aroutarray = {};
            var reg_anf1648 = /_ANF.*1648.*/;
            var reg_anf0824 = /_ANF.*0824.*/;
            var reg_anf0412 = /_ANF.*0412.*/;

            for( var i=0, alarm=1, relay=1 ; i < NUM_ALARMS ; i ++ ) {
                if( i < NUM_ALARM_IPCAM ) {
                    aroutarray[i] = i+1;
                } else {
                  if (INFO_MODEL.indexOf("UTM") >= 0 ||
                      INFO_MODEL.indexOf("ATM") >= 0) {

                    if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                      aroutarray[i] = 'RELAY'+(relay++);
                    } else {
                      aroutarray[i] = 'R'+(relay++);
                    }
                  } else if( reg_anf1648.test(INFO_MODEL) ) {
                    if( i < 8 ) {
                      if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                        aroutarray[i] = 'RELAY'+(relay++);
                      } else {
                        aroutarray[i] = 'R'+(relay++);
                      }
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  } else if( reg_anf0824.test(INFO_MODEL) ) {
                    if( i < 4 ) {
                      if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                        aroutarray[i] = 'RELAY'+(relay++);
                      } else {
                        aroutarray[i] = 'R'+(relay++);
                      }
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  } else if( reg_anf0412.test(INFO_MODEL) ) {
                    if( i < 4 ) {
                      if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                        aroutarray[i] = 'RELAY'+(relay++);
                      } else {
                        aroutarray[i] = 'R'+(relay++);
                      }
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  } else if( INFO_MODEL == "_ATM_0412H" ) {
                    if( i < 4 ) {
                      if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                        aroutarray[i] = 'RELAY'+(relay++);
                      } else {
                        aroutarray[i] = 'R'+(relay++);
                      }
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  }else {
                    aroutarray[i] = 'A'+(alarm++);
                  }
                }
            }
            makeSelectOptions('#lcamera_all', camarray);
            $("#lcamera_all").multiselect({
              selectedList: 16,
              noneSelectedText: "----",
              horizontal: true,
              width : '90%'
            });

            makeSelectOptions('#arout_all', aroutarray);
            $("#arout_all").multiselect({
              selectedList: 16,
              noneSelectedText: "----",
              horizontal: true,
              width : '90%'
            });

            for( var i=0 ; i < INFO_DVRCHANNEL ; i++ ) {
                // make dropdown list
                makeSelectOptions('#lcamera' + i, camarray);
                makeSelectOptions('#arout' + i, aroutarray);

                $("#lcamera"+i).multiselect({
                  selectedList: 16,
                    horizontal: true,
                    width : '90%'
                });
                $("#arout" + i).multiselect({
                  selectedList: 16,
                    horizontal: true,
                    width : '90%'
                });
            }

          //remove alarm out rows from table when model is not support alarm out.
          /*if(INFO_MODEL.indexOf('UTM4G') > -1)
          {
            var elem_th_alarmout = document.getElementById('lang_alarmout').parentNode;
            elem_th_alarmout.parentNode.removeChild(elem_th_alarmout);

            elem_th_alarmout = document.getElementById('arout_all').parentNode;
            elem_th_alarmout.parentNode.removeChild(elem_th_alarmout);

            for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
              elem_th_alarmout = document.getElementById('arout'+ch).parentNode;
              elem_th_alarmout.parentNode.removeChild(elem_th_alarmout);
            }

            document.getElementById('lang_action').parentNode.colSpan--;
          }*/

          //if( (typeof(INFO_ALARM_SENSOR) != 'undefined') && (INFO_ALARM_SENSOR.ain_dvr == 0) ){
          //
          //}

          if( (typeof(INFO_ALARM_SENSOR) != 'undefined') && (INFO_ALARM_SENSOR.aout_dvr == 0) ){
            $("#arout_all").multiselect('disable');
            for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
              $("#arout"+ch).multiselect('disable');
            }
          }
          if (INFO_VENDOR === 'ALSOK' || INFO_VENDOR == 'TAKENAKA') {
            $(".ftp").hide();
            $('.colspan').attr('colspan', 5);
          }
        },

        updateInterval: function(ch, val) {
            var op = $("#interval" + ch).children('option');

            for( var i=0 ; i < op.length ; i++ ) {
                if( val == $(op[i]).val() ) {
                    $(op[i]).prop('selected', true);
                }
            }

            //$("#interval" + ch).multiselect("update");


            //$('interval'+ch).val(val);
        },
        updateAlarmOut: function(ch, val) {
            var jqobj = $('#arout' + ch);
            var correct_str;
            if( NUM_ALARM_IPCAM > 0 ) {
              correct_str = val.substr(0, NUM_ALARM_IPCAM) + val.substr(16, NUM_ALARM_DVR);
            } else {
              correct_str = val.substr(0, NUM_ALARM_DVR);
            }

            setListByStr(jqobj, correct_str);

            $("#arout" + ch).multiselect("refresh");
        },
        updateBuzzer: function(ch, val) {
            setCheckByChar($('#buzzer'+ch), val);
        },
        updateVpopup: function(ch, val) {
            setCheckByChar($('#vpopup'+ch), val);
        },
        updateEmail: function(ch, val) {
            setCheckByChar($('#email'+ch), val);
        },
        updateFtp: function(ch, val) {
          setCheckByChar($('#ftp'+ch), val);
        },
        updateMobile: function(ch, val) {
          setCheckByChar($('#mobile'+ch), val);
        },
        updateMobilePush: function(ch, val) {
          setCheckByChar($('#mobilepush'+ch), val);
        },
        updateBuzzerAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
            if($('#buzzer'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#buzzer_all').prop('checked', true);
          } else {
            $('#buzzer_all').prop('checked', false);
          }
        },
        updateVpopupAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
            if($('#vpopup'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#vpopup_all').prop('checked', true);
          } else {
            $('#vpopup_all').prop('checked', false);
          }
        },
        updateOpopupAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
            if($('#opopup'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#opopup_all').prop('checked', true);
          } else {
            $('#opopup_all').prop('checked', false);
          }
        },
        updateEmailAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
            if($('#email'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#email_all').prop('checked', true);
          } else {
            $('#email_all').prop('checked', false);
          }
        },
        updateFtpAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
            if($('#ftp'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#ftp_all').prop('checked', true);
          } else {
            $('#ftp_all').prop('checked', false);
          }
        },
        updateMobileAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
            if($('#mobile'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#mobile_all').prop('checked', true);
          } else {
            $('#mobile_all').prop('checked', false);
          }
        },
        updateMobilePushAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
            if($('#mobilepush'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#mobilepush_all').prop('checked', true);
          } else {
            $('#mobilepush_all').prop('checked', false);
          }
        },
        update: function(array) {
          var v = this;

          for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
            v.updateInterval(ch, array['interval'+ch]);
            v.updateAlarmOut(ch, array['arout'+ch]);

            v.updateBuzzer(ch, array['buzzer'+ch]);
            v.updateBuzzerAll();
            v.updateVpopup(ch, array['vpopup'+ch]);
            v.updateVpopupAll();
            v.updateEmail(ch, array['email'+ch]);
            v.updateEmailAll();
            v.updateFtp(ch, array['ftp'+ch]);
            v.updateFtpAll();
            v.updateMobile(ch, array['mobile'+ch]);
            v.updateMobileAll();
            v.updateMobilePush(ch, array['mobilepush'+ch]);
            v.updateMobilePushAll();
            var ptzPresets = makePtzPresets(array);
            var ptzPresetArr = makePtzPresetPick(array, ch);
            window.ptzAct[ch].update(ptzPresetArr);
          }

          v.updateBuzzerAll();
          v.updateVpopupAll();
          v.updateEmailAll();
          v.updateFtpAll();
          v.updateMobileAll();
          v.updateMobilePushAll();
        }

    },
    EventVloss : {
        init: function() {
            var aroutarray = {};
            var reg_anf1648 = /_ANF.*1648.*/;
            var reg_anf0824 = /_ANF.*0824.*/;
            var reg_anf0412 = /_ANF.*0412.*/;

            for( var i=0, alarm=1, relay=1 ; i < NUM_ALARMS ; i ++ ) {
                if( i < NUM_ALARM_IPCAM ) {
                    aroutarray[i] = i+1;
                } else {
                  if (INFO_MODEL.indexOf("UTM") >= 0 ||
                      INFO_MODEL.indexOf("ATM") >= 0) {
                    if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                      aroutarray[i] = 'RELAY'+(relay++);
                    } else {
                      aroutarray[i] = 'R'+(relay++);
                    }
                  } else if( reg_anf1648.test(INFO_MODEL) ) {
                    if( i < 8 ) {
                      if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                        aroutarray[i] = 'RELAY'+(relay++);
                      } else {
                        aroutarray[i] = 'R'+(relay++);
                      }
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  } else if( reg_anf0824.test(INFO_MODEL) ) {
                    if( i < 4 ) {
                      if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                        aroutarray[i] = 'RELAY'+(relay++);
                      } else {
                        aroutarray[i] = 'R'+(relay++);
                      }
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  } else if( reg_anf0412.test(INFO_MODEL) ) {
                    if( i < 4 ) {
                      if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                        aroutarray[i] = 'RELAY'+(relay++);
                      } else {
                        aroutarray[i] = 'R'+(relay++);
                      }
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  } else if( INFO_MODEL == "_ATM_0412H" ) {
                    if( i < 4 ) {
                      if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                        aroutarray[i] = 'RELAY'+(relay++);
                      } else {
                        aroutarray[i] = 'R'+(relay++);
                      }
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  }else {
                    aroutarray[i] = 'A'+(alarm++);
                  }
                }
            }

            makeSelectOptions('#arout_all', aroutarray);
            $("#arout_all").multiselect({
              selectedList: 16,
              noneSelectedText: "----",
              horizontal: true,
              width : '90%'
            });

            for( var i=0 ; i < INFO_DVRCHANNEL ; i++ ) {
                // make dropdown list
                makeSelectOptions('#arout' + i, aroutarray);

                $("#arout" + i).multiselect({
                  selectedList: 16,
                    horizontal: true,
                    width : '90%'
                });
            }

            if(INFO_MODEL.indexOf("ANF4G") > 0 || INFO_MODEL.indexOf("ATM4G") > 0 || INFO_MODEL.indexOf("UTM4G") > 0
              || INFO_MODEL.indexOf("ANF5G") > 0 || INFO_MODEL.indexOf("ATM5G") > 0 || INFO_MODEL.indexOf("UTM5G") > 0 || INFO_MODEL.indexOf("UTM5X") > 0 || INFO_MODEL.indexOf("UTM5HG") > 0  || INFO_MODEL.indexOf("ANF5HG") > 0 ) {
              $(".vlossIgnoreInterval").show();
              $("table.event_vloss col.col2").css("width", "23%");
              $("table.event_vloss col.col3").css("width", "20%");
              $("table.event_vloss col.col4").css("width", "20%");
            }

            $('input:button.c_sp_btn_okcancel').click( function () {
                $("#arout" + 1).multiselect("refresh");
            });

            //remove alarm out rows from table when model is not support alarm out.
            /*if(INFO_MODEL.indexOf('UTM4G') > -1)
            {
              var elem_th_alarmout = document.getElementById('lang_alarmout').parentNode;
              elem_th_alarmout.parentNode.removeChild(elem_th_alarmout);

              elem_th_alarmout = document.getElementById('arout_all').parentNode;
              elem_th_alarmout.parentNode.removeChild(elem_th_alarmout);

              for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
                elem_th_alarmout = document.getElementById('arout'+ch).parentNode;
                elem_th_alarmout.parentNode.removeChild(elem_th_alarmout);
              }

              document.getElementById('lang_action').parentNode.colSpan--;
            }*/

            if( (typeof(INFO_ALARM_SENSOR) != 'undefined') && (INFO_ALARM_SENSOR.aout_dvr == 0) ){
              $("#arout_all").multiselect('disable');
              for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
                $("#arout"+ch).multiselect('disable');
              }
            }
            if (INFO_VENDOR === 'ALSOK' || INFO_VENDOR === 'TAKENAKA') {
              $(".ftp").hide();
              $('.colspan').attr('colspan', 4);
            }
        },
        updateAlarmOut: function(ch, val) {
            var jqobj = $('#arout' + ch);
            var correct_str;
            if( NUM_ALARM_IPCAM > 0 ) {
              correct_str = val.substr(0, NUM_ALARM_IPCAM) + val.substr(16, NUM_ALARM_DVR);
            } else {
              correct_str = val.substr(0, NUM_ALARM_DVR);
            }

            setListByStr(jqobj, correct_str);

            $("#arout" + ch).multiselect("refresh");
        },
        updateVlossIgnoreInterval: function(ch, val) {
          var jqobj = $('#vlossIgnoreInterval' + ch);
          jqobj.val(val);
        },
        updateBuzzer: function(ch, val) {
            setCheckByChar($('#buzzer'+ch), val);
        },
        updateEmail: function(ch, val) {
            setCheckByChar($('#email'+ch), val);
        },
        updateFtp: function(ch, val) {
          setCheckByChar($('#ftp'+ch), val);
        },
        updateMobile: function(ch, val) {
          setCheckByChar($('#mobile'+ch), val);
        },
        updateMobilePush: function(ch, val) {
          setCheckByChar($('#mobilepush'+ch), val);
        },
        updateBuzzerAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
            if($('#buzzer'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#buzzer_all').prop('checked', true);
          } else {
            $('#buzzer_all').prop('checked', false);
          }
        },
        updateVpopupAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
            if($('#vpopup'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#vpopup_all').prop('checked', true);
          } else {
            $('#vpopup_all').prop('checked', false);
          }
        },
        updateOpopupAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
            if($('#opopup'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#opopup_all').prop('checked', true);
          } else {
            $('#opopup_all').prop('checked', false);
          }
        },
        updateEmailAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
            if($('#email'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#email_all').prop('checked', true);
          } else {
            $('#email_all').prop('checked', false);
          }
        },
        updateFtpAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
            if($('#ftp'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#ftp_all').prop('checked', true);
          } else {
            $('#ftp_all').prop('checked', false);
          }
        },
        updateMobileAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
            if($('#mobile'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#mobile_all').prop('checked', true);
          } else {
            $('#mobile_all').prop('checked', false);
          }
        },
        updateMobilePushAll: function() {
          var flag_all_checked = true;
          for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
            if($('#mobilepush'+ch).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#mobilepush_all').prop('checked', true);
          } else {
            $('#mobilepush_all').prop('checked', false);
          }
        },
        update: function(array) {
          var v = this;

          for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
            v.updateAlarmOut(ch, array['arout'+ch]);
            v.updateVlossIgnoreInterval(ch, array['vlossIgnoreInterval'+ch]);

            v.updateBuzzer(ch, array['buzzer'+ch]);
            v.updateBuzzerAll();
            v.updateEmail(ch, array['email'+ch]);
            v.updateEmailAll();
            v.updateFtp(ch, array['ftp'+ch]);
            v.updateFtpAll();
            v.updateMobile(ch, array['mobile'+ch]);
            v.updateMobileAll();
            v.updateMobilePush(ch, array['mobilepush'+ch]);
            v.updateMobilePushAll();

            var ptzPresets = makePtzPresets(array);
            var ptzPresetArr = makePtzPresetPick(array, ch);
            window.ptzAct[ch].update(ptzPresetArr);
          }

          v.updateBuzzerAll();
          v.updateEmailAll();
          v.updateFtpAll();
          v.updateMobileAll();
          v.updateMobilePushAll();
        }

    },
    EventTamper : {
        init: function() {
            // arrays for dropdown list
            var camarray = {};
            for( var i=0 ; i < INFO_DVRCHANNEL ; i ++ ) {
                camarray[i] = i+1;
            }

            var aroutarray = {};
            var reg_anf1648 = /_ANF.*1648.*/;
            var reg_anf0824 = /_ANF.*0824.*/;
            var reg_anf0412 = /_ANF.*0412.*/;

            for( var i=0, alarm=1, relay=1 ; i < NUM_ALARMS ; i ++ ) {
                if( i < NUM_ALARM_IPCAM ) {
                    aroutarray[i] = i+1;
                } else {
                  if (INFO_MODEL.indexOf("UTM") >= 0 ||
                      INFO_MODEL.indexOf("ATM") >= 0) {
                    aroutarray[i] = 'R'+(relay++);
                  } else if( reg_anf1648.test(INFO_MODEL) ) {
                    if( i < 8 ) {
                      aroutarray[i] = 'R'+(relay++);
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  } else if( reg_anf0824.test(INFO_MODEL) ) {
                    if( i < 4 ) {
                      aroutarray[i] = 'R'+(relay++);
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  } else if( reg_anf0412.test(INFO_MODEL) ) {
                    if( i < 4 ) {
                      aroutarray[i] = 'R'+(relay++);
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  } else if( INFO_MODEL == "_ATM_0412H" ) {
                    if( i < 4 ) {
                      aroutarray[i] = 'R'+(relay++);
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  } else {
                    aroutarray[i] = 'A'+(alarm++);
                  }
                }
            }

            makeSelectOptions('#lcamera_all', camarray);
            $("#lcamera_all").multiselect({
              selectedList: 16,
              noneSelectedText: "----",
              horizontal: true,
              width : '90%'
            });

            makeSelectOptions('#arout_all', aroutarray);
            $("#arout_all").multiselect({
              selectedList: 16,
              noneSelectedText: "----",
              horizontal: true,
              width : '90%'
            });

            for( var i=0 ; i < INFO_DVRCHANNEL ; i++ ) {
                // make dropdown list
                makeSelectOptions('#lcamera' + i, camarray);
                makeSelectOptions('#arout' + i, aroutarray);

                $("#lcamera"+i).multiselect({
                  selectedList: 16,
                    horizontal: true,
                    width : '90%'
                });
                $("#arout" + i).multiselect({
                  selectedList: 16,
                    horizontal: true,
                    width : '90%'
                });
            }


        },

        updateInterval: function(ch, val) {
            var op = $("#interval" + ch).children('option');

            for( var i=0 ; i < op.length ; i++ ) {
                if( val == $(op[i]).val() ) {
                    $(op[i]).prop('selected', true);
                }
            }

        },
        updateLinkedCamera: function(ch, val) {
            var jqobj = $('#lcamera' + ch);
            setListByStr(jqobj, val);
            $("#lcamera" + ch).multiselect("refresh");
        },
        getLinkedCamera: function(ch) {
            var str = '0000000000000000';
            var jqobj = $('#lcamera' + ch);
            str = getStrByList(jqobj, str);

            return str;
        },
        updateAlarmOut: function(ch, val) {
            var jqobj = $('#arout' + ch);

            var correct_str;
            if( NUM_ALARM_IPCAM > 0 ) {
              correct_str = val.substr(0, NUM_ALARM_IPCAM) + val.substr(16, NUM_ALARM_DVR);
            } else {
              correct_str = val.substr(0, NUM_ALARM_DVR);
            }

            setListByStr(jqobj, correct_str);

            $("#arout" + ch).multiselect("refresh");
        },
        updateBuzzer: function(ch, val) {
            setCheckByChar($('#buzzer'+ch), val);
        },
        updateVpopup: function(ch, val) {
            setCheckByChar($('#vpopup'+ch), val);
        },
        updateEmail: function(ch, val) {
            setCheckByChar($('#email'+ch), val);
        },
        updateFtp: function(ch, val) {
          setCheckByChar($('#ftp'+ch), val);
        },
        updateMobile: function(ch, val) {
          setCheckByChar($('#mobile'+ch), val);
        },
        updateMobilePush: function(ch, val) {
          setCheckByChar($('#mobilepush'+ch), val);
        },
        update: function(array) {
          var v = this;

          for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
            v.updateInterval(ch, array['interval'+ch]);
            v.updateLinkedCamera(ch, array['lcamera'+ch]);
            v.updateAlarmOut(ch, array['arout'+ch]);

            v.updateBuzzer(ch, array['buzzer'+ch]);
            v.updateVpopup(ch, array['vpopup'+ch]);
            v.updateEmail(ch, array['email'+ch]);
            v.updateFtp(ch, array['ftp'+ch]);
            v.updateMobile(ch, array['mobile'+ch]);
            v.updateMobilePush(ch, array['mobilepush'+ch]);
          }
        }

    },
    EventVCA : {
        init: function() {
            var aroutarray = {};
        },
        updateBuzzer: function(ch, val) {
            setCheckByChar($('#buzzer'+ch), val);
        },
        updateVpopup: function(ch, val) {
            setCheckByChar($('#vpopup'+ch), val);
        },
        updateEmail: function(ch, val) {
            setCheckByChar($('#email'+ch), val);
        },
        updateFtp: function(ch, val) {
          setCheckByChar($('#ftp'+ch), val);
        },
        updateMobile: function(ch, val) {
          setCheckByChar($('#mobile'+ch), val);
        },
        updateMobilePush: function(ch, val) {
          setCheckByChar($('#mobilepush'+ch), val);
        },
        update: function(array) {
          var v = this;

          for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
            v.updateBuzzer(ch, array['buzzer'+ch]);
            v.updateVpopup(ch, array['vpopup'+ch]);
            v.updateEmail(ch, array['email'+ch]);
            v.updateFtp(ch, array['ftp'+ch]);
            v.updateMobile(ch, array['mobile'+ch]);
            v.updateMobilePush(ch, array['mobilepush'+ch]);
          }
        }

    },
    EventSystem : {
        checks : [
            'disk_over_buzzer',
            'disk_over_opopup',
            'disk_over_email',
            'disk_over_ftp',
            'disk_over_mobile',
            'disk_over_mobilepush',
            'disk_full_buzzer',
            'disk_full_opopup',
            'disk_full_email',
            'disk_full_ftp',
            'disk_full_mobile',
            'disk_full_mobilepush',
            'disk_exhau_buzzer',
            'disk_exhau_opopup',
            'disk_exhau_email',
            'disk_exhau_ftp',
            'disk_exhau_mobile',
            'disk_exhau_mobilepush',
            'disk_smart_buzzer',
            'disk_smart_opopup',
            'disk_smart_email',
            'disk_smart_ftp',
            'disk_smart_mobile',
            'disk_smart_mobilepush',
            'disk_nodisk_buzzer',
            'disk_nodisk_opopup',
            'disk_nodisk_email',
            'disk_nodisk_ftp',
            'disk_nodisk_mobile',
            'disk_nodisk_mobilepush',
            'rec_pstart_buzzer',
            'rec_pstart_email',
            'rec_pstart_ftp',
            'rec_pstart_mobile',
            'rec_pstart_mobilepush',
            'rec_stop_buzzer',
            'rec_stop_email',
            'rec_stop_ftp',
            'rec_stop_mobile',
            'rec_stop_mobilepush',
            'sys_booting_buzzer',
            'sys_booting_email',
            'sys_booting_ftp',
            'sys_booting_mobile',
            'sys_booting_mobilepush',
            'sys_logon_fail_buzzer',
            'sys_logon_fail_opopup',
            'sys_logon_fail_email',
            'sys_logon_fail_ftp',
            'sys_logon_fail_mobile',
            'sys_logon_fail_mobilepush',
            'sys_fan_fail_buzzer',
            'sys_fan_fail_opopup',
            'sys_fan_fail_email',
            'sys_fan_fail_ftp',
            'sys_fan_fail_mobile',
            'sys_fan_fail_mobilepush',
            'sys_temper_fail_buzzer',
            'sys_temper_fail_opopup',
            'sys_temper_fail_email',
            'sys_temper_fail_ftp',
            'sys_temper_fail_mobile',
            'sys_temper_fail_mobilepush',
            'sys_POE_fail_buzzer',
            'sys_POE_fail_opopup',
            'sys_POE_fail_email',
            'sys_POE_fail_ftp',
            'sys_POE_fail_mobile',
            'sys_POE_fail_mobilepush',
            'net_eth_trouble_buzzer',
            'net_eth_trouble_opopup',
            'net_eth_trouble_email',
            'net_eth_trouble_ftp',
            'net_eth_trouble_mobile',
            'net_eth_trouble_mobilepush',
            'net_rfail_buzzer',
            'net_rfail_opopup',
            'net_rfail_email',
            'net_rfail_ftp',
            'net_rfail_mobile',
            'net_rfail_mobilepush',
            'net_ddns_fail_buzzer',
            'net_ddns_fail_opopup',
            'net_ddns_fail_email',
            'net_ddns_fail_ftp',
            'net_ddns_fail_mobile',
            'net_ddns_fail_mobilepush',
            'net_dhcp_fail_buzzer',
            'net_dhcp_fail_opopup',
            'net_dhcp_fail_email',
            'net_dhcp_fail_ftp',
            'net_dhcp_fail_mobile',
            'net_dhcp_fail_mobilepush'
        ],
        init: function() {
            var aroutarray = {};
            var reg_anf1648 = /_ANF.*1648.*/;
            var reg_anf0824 = /_ANF.*0824.*/;
            var reg_anf0412 = /_ANF.*0412.*/;

            for( var i=0, alarm=1, relay=1 ; i < NUM_ALARMS ; i ++ ) {
                if( i < NUM_ALARM_IPCAM ) {
                    aroutarray[i] = i+1;
                } else {
                  if (INFO_MODEL.indexOf("UTM") >= 0 ||
                      INFO_MODEL.indexOf("ATM") >= 0) {
                    if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                      aroutarray[i] = 'RELAY'+(relay++);
                    } else {
                      aroutarray[i] = 'R'+(relay++);
                    }
                  } else if( reg_anf1648.test(INFO_MODEL) ) {
                    if( i < 8 ) {
                      if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                        aroutarray[i] = 'RELAY'+(relay++);
                      } else {
                        aroutarray[i] = 'R'+(relay++);
                      }
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  } else if( reg_anf0824.test(INFO_MODEL) ) {
                    if( i < 4 ) {
                      if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                        aroutarray[i] = 'RELAY'+(relay++);
                      } else {
                        aroutarray[i] = 'R'+(relay++);
                      }
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  } else if( reg_anf0412.test(INFO_MODEL) ) {
                    if( i < 4 ) {
                      if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                        aroutarray[i] = 'RELAY'+(relay++);
                      } else {
                        aroutarray[i] = 'R'+(relay++);
                      }
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  } else if( INFO_MODEL == "_ATM_0412H" ) {
                    if( i < 4 ) {
                      if(INFO_VENDOR==='ALSOK'||INFO_VENDOR==='TAKENAKA') {
                        aroutarray[i] = 'RELAY'+(relay++);
                      } else {
                        aroutarray[i] = 'R'+(relay++);
                      }
                    } else {
                      aroutarray[i] = 'A'+(alarm++);
                    }
                  } else {
                    aroutarray[i] = 'A'+(alarm++);
                  }
                }
            }
            var c = $z.current;
            var ml = c.multilists;
            var mlAll = c.multilistAll;

            for ( i in c.multilistAll ) {
              var id = '#' + mlAll[i];

              makeSelectOptions(id, aroutarray);

              $(id).multiselect({
                selectedList: 16,
                noneSelectedText: "----",
                horizontal: true,
                width : '90%'
              });
            }

            for( i in ml ) {
                var id = '#' + ml[i];

                makeSelectOptions(id, aroutarray);

                $(id).multiselect({
                  selectedList: 16,
                    horizontal: true,
                    width : '90%'
                });
            }

            if( INFO_MODEL.indexOf("IPX") >= 0 ) {
              $(".foripx").show();
            } else if( INFO_MODEL.indexOf("UTM") >= 0 ) {
              $(".exceptUTM").hide();
              $(".forANF").hide();
            } else if( (INFO_MODEL.indexOf("ANF") >= 0) || (INFO_MODEL.indexOf("ATM4G") >= 0 ) ) {
              $(".forANF").show();
            } else {
              $(".forANF").hide();
            }

            var patt = /IPX.*VE/;

            if( patt.exec(INFO_MODEL) != null ) {
              $("#sys_fan_fail_arout").multiselect("disable");
              $("#sys_fan_fail_buzzer").prop("disabled", true);
              $("#sys_fan_fail_opopup").prop("disabled", true);
              $("#sys_fan_fail_email").prop("disabled", true);
              $("#sys_fan_fail_ftp").prop("disabled", true);
              $("#sys_fan_fail_mobile").prop("disabled", true);
              $("#sys_fan_fail_mobilepush").prop("disabled", true);
            }

            patt = /IPX.*ECO/;

            if( patt.exec(INFO_MODEL) != null ) {
              $("#sys_fan_fail_arout").multiselect("disable");
              $("#sys_fan_fail_buzzer").prop("disabled", true);
              $("#sys_fan_fail_opopup").prop("disabled", true);
              $("#sys_fan_fail_email").prop("disabled", true);
              $("#sys_fan_fail_ftp").prop("disabled", true);
              $("#sys_fan_fail_mobile").prop("disabled", true);

              $("#sys_POE_fail_arout").multiselect("disable");
              $("#sys_POE_fail_threshold").prop("disabled", true);
              $("#sys_POE_fail_buzzer").prop("disabled", true);
              $("#sys_POE_fail_opopup").prop("disabled", true);
              $("#sys_POE_fail_email").prop("disabled", true);
              $("#sys_POE_fail_ftp").prop("disabled", true);
              $("#sys_POE_fail_mobile").prop("disabled", true);
              $("#sys_fan_fail_mobilepush").prop("disabled", true);
            }

            $("#net_eth_trouble_opopup").prop("disabled", true);
            $("#net_eth_trouble_email").prop("disabled", true);
            $("#net_eth_trouble_ftp").prop("disabled", true);
            $("#net_rfail_opopup").prop("disabled", true);
            $("#net_rfail_email").prop("disabled", true);
            $("#net_rfail_ftp").prop("disabled", true);
            $("#net_ddns_fail_opopup").prop("disabled", true);
            $("#net_ddns_fail_email").prop("disabled", true);
            $("#net_ddns_fail_ftp").prop("disabled", true);
            $("#net_dhcp_fail_email").prop("disabled", true);
            $("#net_dhcp_fail_ftp").prop("disabled", true);

          //disable alarm out rows from table when model is not support alarm out.
          if( (typeof(INFO_ALARM_SENSOR) != 'undefined') && (INFO_ALARM_SENSOR.aout_dvr == 0) ){

            var event_title = {
              'disk': ['over', 'full', 'exhau', 'smart', 'nodisk'],
              'rec': ['pstart', 'stop'],
              'sys': ['booting', 'logon_fail', 'fan_fail', 'temper_fail', 'POE_fail'],
              'net': ['eth_trouble', 'rfail', 'ddns_fail', 'dhcp_fail']
            }

            for(var title in event_title)
            {
              $("#"+title+"_arout_all").multiselect('disable');

              //remove *title*_*event*_arout from table.
              for(var event_name in event_title[title])
              {
                $("#"+title+"_"+event_title[title][event_name]+"_arout").multiselect('disable');
              }
            }
          }

          if( (typeof(INFO_USE_SEARCH_IP_CONFLICT) == 'undefined') || (typeof(INFO_USE_SEARCH_IP_CONFLICT) != 'undefined') && INFO_USE_SEARCH_IP_CONFLICT == false)
          {
            $(".search_ip_conflict").hide();
            $('.colspan_net').attr('colspan', 4);
          }

          if ((INFO_VENDOR === 'ALSOK' || INFO_VENDOR === 'TAKENAKA') && false) { // for alsok, takenaka branch.
              $(".ftp").hide();
              $(".disk_colspan").attr('colspan', 4);
              $(".rec_colspan").attr('colspan', 4);
              $(".system_colspan").attr('colspan', 4);
              $(".network_colspan").attr('colspan', 3);
              $(".show_alsok").show();
          }
          else {
            $(".show_alsok").hide();
            //$(".network_colspan").attr('colspan', parseInt($('.network_colspan').attr('colspan'))+1);
          }
          if ( INFO_MODEL.indexOf("ATM") || INFO_MODEL.indexOf("ANF") || INFO_MODEL.indexOf("UTM")) {
            $(".rec_colspan").attr('colspan', 4);
            $(".network_colspan").attr('colspan', 5);
            $(".remove_dvr").hide();
          }

          if(typeof INFO_USE_SEQURINET != undefined && INFO_USE_SEQURINET == true) {
            $(".rec_colspan").attr('colspan', parseInt($(".rec_colspan").attr('colspan'))+1);
            $(".network_colspan").attr('colspan', parseInt($(".network_colspan").attr('colspan'))+1);
          }

        },
        update: function(arr) {
            var c = $z.current;
            var ml = c.multilists;
            var event_title = {
              'disk': ['over', 'full', 'exhau', 'smart', 'nodisk'],
              'rec': ['pstart', 'stop'],
              'sys': ['booting', 'logon_fail', 'fan_fail', 'temper_fail', 'POE_fail'],
              'net': ['eth_trouble', 'rfail', 'ddns_fail']
            }

            if(INFO_MODEL.indexOf('IPX') < 0) {
              event_title = {
                'disk': ['over', 'full', 'exhau', 'smart', 'nodisk'],
                'rec': ['pstart', 'stop'],
                'sys': ['booting', 'logon_fail', 'fan_fail', 'temper_fail'],
                'net': ['eth_trouble', 'rfail', 'ddns_fail', 'dhcp_fail_email']
              }
            }

            var action_title = ['buzzer', 'opopup', 'email', 'ftp', 'mobile', 'mobilepush'];

            for( i in ml ) {
                var jqobj = $('#' + ml[i]);
                var liststr = arr[ml[i]];

                if( liststr ) {
                  var correct_str;


                  if( NUM_ALARM_IPCAM > 0 ) {
                    correct_str = liststr.substr(0, NUM_ALARM_IPCAM) + liststr.substr(16, NUM_ALARM_DVR);
                  } else {
                    correct_str = liststr.substr(0, NUM_ALARM_DVR);
                  }

                  setListByStr(jqobj, correct_str);
                  jqobj.multiselect("refresh");
                }
            }

            for( i in this.checks ) {
                var jqobj = $('#' + this.checks[i]);
                setCheckByChar(jqobj, arr[this.checks[i]]);
            }

            //$("#disk_exhau_threshold").val(arr["disk_exhau_threshold"]);
            $("#sys_logon_fail_count").val(arr["sys_logon_fail_count"]);
            //$("#sys_POE_fail_threshold").val(arr["sys_POE_fail_threshold"]);
            $("#net_rfail_count").val(arr["net_rfail_count"]);
            $("#net_ddns_fail_count").val(arr["net_ddns_fail_count"]);


            var flag_all_checked = true;
            for(var category in event_title) {
              for(var i=0; i<action_title.length; i++) {
                flag_all_checked = true;

                for(var j=0; j<event_title[category].length; j++){
                  if($('#'+category+'_'+event_title[category][j]+'_'+action_title[i]).prop('checked') == false
                    && $('#'+category+'_'+event_title[category][j]+'_'+action_title[i]).prop('disabled') == false) {
                    flag_all_checked = false;
                  }
                }

                if(flag_all_checked == true) {
                  $('#'+category+'_'+action_title[i]+'_all').prop('checked', true);
                } else {
                  $('#'+category+'_'+action_title[i]+'_all').prop('checked', false);
                }
              }
            }
        }

    }

});
