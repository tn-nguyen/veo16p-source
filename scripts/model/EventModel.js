/**
 * @author chcha
 */
$z.m({
    EventAlarmOut: {
        menu : 'event.alarm_output',

        makeupData : function(data) {
            var newdata = {};

            for( var name in data ) {
                if( ! /^multiselect/.test(name) ) {
                    newdata[name] = data[name];
                }
            }

            return newdata;
        },

        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            /*
            data = this.makeupData(data);

            if( !this.compareTo(data) ) {
                return false;
            }
            */

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            dvrpoke.stop();

            return data;

        },
        afterLoad : function(result) {
            this.data = encode_to_array(result);
            return result;
        },
        afterSave : function(result) {
            dvrpoke.start();
            return procResult(result);
        }
    },
    EventNoti : {
        menu : 'event.noti',

        makeupData: function(data) {
            var newdata = {};

            for( var name in data ) {
                if( ! /^multiselect/.test(name) ) {
                    newdata[name] = data[name];
                }
            }
            //console.log($('input[name=email_serv]:checked').val());
            newdata['email_serv'] = $('input[name=email_serv]:checked').val();
            newdata['ftp_host'] = $('#ftp_host').val();
            newdata['ftp_port'] = $('#ftp_port').val();
            newdata['ftp_username'] = $('#ftp_username').val();
            newdata['ftp_passwd'] = $('#ftp_passwd').val();
           
            var ftp_dir_path = $('#ftp_dir_path').val();
            ftp_dir_path = ftp_dir_path.replace(/([^a-zA-Z0-9@\#\$\%\&\(\)\-\_])/g, '');
            $('#ftp_dir_path').val(ftp_dir_path);

            var ftp_fname_prefix = $('#ftp_fname_prefix').val();
            ftp_fname_prefix = ftp_fname_prefix.replace(/([^a-zA-Z0-9@\#\$\%\&\(\)\-\_])/g, '');
            $('#ftp_fname_prefix').val(ftp_fname_prefix);

            newdata['ftp_dir_path'] = ftp_dir_path;
            newdata['ftp_fname_prefix'] = ftp_fname_prefix;
 
            if (INFO_ALARM_SENSOR.ain_dvr > 0) {
              newdata['alarm_switch_mode'] = $("#alarm_switch_mode").val();
              newdata['alarm_switch_port'] = $("#alarm_switch_port").val();
            }
            
            return newdata;
        },

        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            /*
            data = this.makeupData(data);

            if( !this.compareTo(data) ) {
                return false;
            }
            */

            for(var sched = 0; sched < 10; sched++){
              for(var day = 0; day < 7; day++){
                if(parseInt($('select#email_from_h_'+sched).val()) > parseInt($('select#email_to_h_'+sched).val())
                  || (parseInt($('select#email_from_h_'+sched).val()) == parseInt($('select#email_to_h_'+sched).val()) 
                    && parseInt($('select#email_from_m_'+sched).val()) > parseInt($('select#email_to_m_'+sched).val()))){
                  alert(langArray['LTXT_SETUPMENU_EVENT_EMAILNOTIFICATION_TIMEERROR']);
                  return;
                }
              }
            }

            if ($("#ftp_dir_mode").val() == '0' || $("#ftp_dir_mode").val() == '1') {
              if($.trim($("#ftp_dir_path").val()) == "") {
                alert(langArray["LTXT_FTP_DIRECTORY_IS_EMPTY"]);
                return;
              }
            }

            if ($("#ftp_fname_mode").val() == '0' || $("#ftp_fname_mode").val() == '1') {
              if($.trim($("#ftp_fname_prefix").val()) == "") {
                alert(langArray["LTXT_FTP_FILENAME_IS_EMPTY"]);
                return;
              }
            }

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            dvrpoke.stop();

            return data;

        },
        afterLoad : function(result) {
            this.data = encode_to_array(result);
            return result;
        },
        afterSave : function(result) {
            dvrpoke.start();
            return procResult(result);
        }
    },
    EventSensor : {
        menu : 'event.alarm_sensor',

        makeupData: function(data) {
            var newdata = {};

            for( var i=0 ; i < NUM_SENSORS ; i++ ) {
                var strLcamera = '0000000000000000',
                    strArout = '00000000000000000000000000000000';

                var lclen = this.origData['lcamera'+i].length,
                    aolen = this.origData['arout'+i].length;

                strLcamera = strLcamera.substr(0, lclen);
                strArout = strArout.substr(0, aolen);

                var lcamera = data['lcamera'+i];
                var arout = data['arout'+i];

                // make string for Linked Camera
                for( var idx in lcamera ) {
                    var pos = parseInt(lcamera[idx]);

                    strLcamera = strLcamera.setCharAt(pos, '1');
                }
                data['lcamera'+i] = strLcamera;

                // make string for alarm out (data[arout#])
                for( var idx in arout ) {
                    var pos = parseInt(arout[idx]);

                    if ( NUM_ALARM_IPCAM > 0 ) {
                      if( pos >= NUM_ALARM_IPCAM ) {
                        pos = (pos - NUM_ALARM_IPCAM) + 16;
                      }
                    }

                    strArout = strArout.setCharAt(pos, '1');
                }
                data['arout'+i] = strArout;
            }

            for( var name in data ) {
                if( ! /^multiselect/.test(name) ) {
                    newdata[name] = data[name];
                }
            }

            return newdata;
        },

        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            /*
            data = this.makeupData(data);

            if( !this.compareTo(data) ) {
                return false;
            }
            */

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            dvrpoke.stop();

            return data;

        },
        afterLoad : function(result) {
            this.data = encode_to_array(result);
            return result;
        },
        afterSave : function(result) {
            dvrpoke.start();
            return procResult(result);
        }
    },
    EventMotion : {
        menu : 'event.motion',

        makeupData : function(data) {
            var newdata = {};

            for( var i=0 ; i < INFO_DVRCHANNEL ; i++ ) {
                var strArout = '00000000000000000000000000000000';
                var aolen = this.origData['arout'+i].length;
                strArout = strArout.substr(0, aolen);

                var arout = data['arout'+i];
                // make string for alarm out (data[arout#])
                for( var idx in arout ) {
                    var pos = parseInt(arout[idx]);

                    if ( NUM_ALARM_IPCAM > 0 ) {
                      if( pos >= NUM_ALARM_IPCAM ) {
                        pos = (pos - NUM_ALARM_IPCAM) + 16;
                      }
                    }


                    strArout = strArout.setCharAt(pos, '1');
                }
                data['arout'+i] = strArout;
            }

            for( var name in data ) {
                if( ! /^multiselect/.test(name) ) {
                    newdata[name] = data[name];
                }
            }

            data = newdata;

            return data;
        },

        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            /*
            data = this.makeupData(data);

            if( !this.compareTo(data) ) {
                return false;
            }
            */

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            dvrpoke.stop();

            return data;

        },
        afterLoad : function(result) {
            this.data = encode_to_array(result);
            return result;
        },
        afterSave : function(result) {
            dvrpoke.start();
            return procResult(result);
        }
    },
    EventVloss : {
        menu : 'event.vloss',

        makeupData: function(data) {
            var newdata = {};

            for( var i=0 ; i < INFO_DVRCHANNEL ; i++ ) {
                var strArout = '00000000000000000000000000000000';
                var aolen = this.origData['arout'+i].length;
                strArout = strArout.substr(0, aolen);
                var arout = data['arout'+i];

                // make string for alarm out (data[arout#])
                for( var idx in arout ) {
                    var pos = parseInt(arout[idx]);

                    if ( NUM_ALARM_IPCAM > 0 ) {
                      if( pos >= NUM_ALARM_IPCAM ) {
                        pos = (pos - NUM_ALARM_IPCAM) + 16;
                      }
                    }

                    strArout = strArout.setCharAt(pos, '1');
                }
                data['arout'+i] = strArout;
            }

            // copy values
            for( var name in data ) {
                if( ! /^multiselect/.test(name) ) {
                    newdata[name] = data[name];
                }
            }

            data = newdata;

            return data;
        },

        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            /*
            data = this.makeupData(data);

            if( !this.compareTo(data) ) {
                return false;
            }
            */

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            dvrpoke.stop();

            return data;

        },
        afterLoad : function(result) {
            this.data = encode_to_array(result);
            return result;
        },
        afterSave : function(result) {
            dvrpoke.start();
            return procResult(result);
        }

    },
    EventTamper : {
        menu : 'event.tamper',

        makeupData : function(data) {
            var newdata = {};


            for( var i=0 ; i < INFO_DVRCHANNEL ; i++ ) {
                var strLcamera = '0000000000000000',
                    strArout = '00000000000000000000000000000000';

                var lclen = this.origData['lcamera'+i].length,
                    aolen = this.origData['arout'+i].length;

                strLcamera = strLcamera.substr(0, lclen);
                strArout = strArout.substr(0, aolen);

                var lcamera = data['lcamera'+i];
                var arout = data['arout'+i];

                // make string for Linked Camera
                for( var idx in lcamera ) {
                    var pos = parseInt(lcamera[idx]);

                    strLcamera = strLcamera.setCharAt(pos, '1');
                }
                data['lcamera'+i] = strLcamera;

                // make string for alarm out (data[arout#])
                for( var idx in arout ) {
                    var pos = parseInt(arout[idx]);

                    if ( NUM_ALARM_IPCAM > 0 ) {
                      if( pos >= NUM_ALARM_IPCAM ) {
                        pos = (pos - NUM_ALARM_IPCAM) + 16;
                      }
                    }

                    strArout = strArout.setCharAt(pos, '1');
                }
                data['arout'+i] = strArout;
            }

            for( var name in data ) {
                if( ! /^multiselect/.test(name) ) {
                    newdata[name] = data[name];
                }
            }

            data = newdata;

            return data;
        },

        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            /*
            data = this.makeupData(data);

            if( !this.compareTo(data) ) {
                return false;
            }
            */

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            dvrpoke.stop();

            return data;

        },
        afterLoad : function(result) {
            this.data = encode_to_array(result);
            return result;
        },
        afterSave : function(result) {
            dvrpoke.start();
            return procResult(result);
        }
    },
    EventVCA : {
        menu : 'event.vca',

        makeupData: function(data) {
            var newdata = {};

            return data;
        },

        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            /*
            data = this.makeupData(data);

            if( !this.compareTo(data) ) {
                return false;
            }
            */

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            dvrpoke.stop();

            return data;

        },
        afterLoad : function(result) {
            this.data = encode_to_array(result);
            return result;
        },
        afterSave : function(result) {
            dvrpoke.start();
            return procResult(result);
        }

    },
    EventSystem : {
        menu : 'event.system',
        makeupData: function(data) {
            var newdata = {};
            var c = $z.current;
            var ml = c.multilists;

            for( var i in ml ) {
                var listName = ml[i];

                if( !this.origData[listName] && !data[listName] )
                  continue;

                if (this.origData[listName] == null
                    || typeof this.origData[listName] == 'undefined') {
                  continue;
                }
                var strArout = '00000000000000000000000000000000';
                var arlen = this.origData[listName].length;
                strArout = strArout.substr(0, arlen);

                var vals = data[listName];

                if( vals ) {
                  // make string for alarm out (data[arout#])
                  for( var j in vals ) {
                    var pos = parseInt(vals[j]);

                    if ( NUM_ALARM_IPCAM > 0 ) {
                      if( pos >= NUM_ALARM_IPCAM ) {
                        pos = (pos - NUM_ALARM_IPCAM) + 16;
                      }
                    }

                    strArout = strArout.setCharAt(pos, '1');
                  }
                }
                data[listName] = strArout;
            }

            // copy values
            for( var name in data ) {
                if( ! /^multiselect/.test(name) ) {
                    newdata[name] = data[name];
                }
            }

            data = newdata;

            return data;
        },
        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            /*
            data = this.makeupData(data);

            if( !this.compareTo(data) ) {
                return false;
            }
            */

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            dvrpoke.stop();

            return data;

        },
        afterLoad : function(result) {
            this.data = encode_to_array(result);
            return result;
        },
        afterSave : function(result) {
            dvrpoke.start();
            return procResult(result);
        }

    }
});
