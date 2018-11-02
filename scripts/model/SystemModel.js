/**
 * @author chcha
 */

$z.m({
    SystemDatetime: {
        menu : 'system.datetime',

        compareTo: function(curArr) {
          for( name in curArr) {
            if (name == 'cmd_gmttime') continue;
            if( this.origData[name] != null && curArr[name] != this.origData[name] ) {
                if( $z.debug )
                    $z.log("compareTo[" + name + "]: curr[" + curArr[name] + "] <> orig[" + this.origData[name] + "]");
                return name;
            }
          }

          if( $z.debug )
              $z.log("compareTo [==]");

          return null;
        },
        makeupData: function(data) {
          data['curr_gmttime'] = this.data['curr_gmttime'];
          cmd_t = new Date();
          cmd_t = cmd_t.getTime() / 1000;
          cmd_t = cmd_t.toFixed();

          data['cmd_gmttime'] = cmd_t;
          orig_t = $z.current.origTime;
          targ_t = $z.current.m.data['curr_gmttime'];

          if(orig_t != targ_t) {
            data['change_flag'] = '1';
          } else {
            data['change_flag'] = '0';
          }

          return data;
        },
        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            if( !this.compareTo(data) ) {
                return false;
            }

            dvrpoke.stop();

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            return data;

        },
        afterLoad : function(result) {
            this.data = encode_to_array(result);
            return result;
        },
        afterSave : function(result) {
            dvrpoke.start();
            return procResult(result);
        },
        revert: function() {
          $.extend(this.data, this.origData);

          //init timepicker dialog data.
          $z.current.time.yyyy = $z.current.m.data.yyyy;
          $z.current.time.mm = $z.current.m.data.mm;
          $z.current.time.dd = $z.current.m.data.dd;
          $z.current.time.hour = $z.current.m.data.hour;
          $z.current.time.min = $z.current.m.data.min;
          $z.current.time.sec = $z.current.m.data.sec;
        }
    },
    SystemManage: {
        menu : 'system.man',

        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            if( !this.compareTo(data) ) {
                return false;
            }

            dvrpoke.stop();

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

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
    SystemInfo : {
        menu : 'system.info',

        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            if( !this.compareTo(data) ) {
                return false;
            }

            dvrpoke.stop();

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            return data;

        },
        afterLoad : function(result) {
            return result;
        },
        afterSave : function(result) {
            dvrpoke.start();
            alert('Setting Done');
        },
        checkNvr : function(array) {
          return array;
        }
    },
    SystemControlDevice: {
        menu : 'system.controldev',

        makeupData : function(data) {
            for(elem in data)
            {
              if(elem.indexOf('arout') >= 0)
              {
                if(NUM_ALARM_IPCAM > 0)
                {
                  //data[elem] = data[elem].substr(0, NUM_ALARM_IPCAM) + data[elem].substr(16, NUM_ALARM_DVR);
                  data[elem] = data[elem].substr(0, NUM_ALARM_IPCAM);
                  for (var i=0; i<16 - NUM_ALARM_IPCAM; i++)
                  {
                    data[elem] += '0';  
                  }
                  data[elem] += data[elem].substr(16, NUM_ALARM_DVR);
                }
                else
                {
                  data[elem] = data[elem].substr(0, NUM_ALARM_DVR);
                }
              }
            }
            return data;
        },

        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            if( !this.compareTo(data) ) {
                return false;
            }

            if(INFO_VENDOR.indexOf("S1") >= 0){
              if(Validator.number(data['secom_dual_port']) != Validator.ERR_VALID_OK) {
                  alert(langArray['LTXT_PLEASE_INPUT_NUMBER']);
                  return false;
              }
            }

            dvrpoke.stop();

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            //if(INFO_VENDOR == 'TAKENAKA' && data['protocol'] == null)
            //{
            //  data['protocol'] = 0;
            //}

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
    SystemSecurity: {
      menu : 'system.security',

      beforeLoad : function(data) {
          return data;
      },
      beforeSave : function(data) {
          if( !this.compareTo(data) ) {
              return false;
          }

          dvrpoke.stop();

          data['menu'] = this.menu;
          data['action'] = 'set_setup';

          if( $z.debug ) {
              data['debug'] = '1';
          }

          return data;

      },
      afterLoad : function(result) {
          this.data = encode_to_array(result);
          return result;
      },
      afterSave : function(result) {
          resultData = encode_to_array(result);

          returnValue = procResult(result);
          if (resultData != null && this.origData.snapshot_support === '0' && resultData.snapshot_support === '1') {
            alert(langArray['LTXT_SETUPSYSSECURITY_SNAPSHOT_CHECK']);
          }
          if (resultData != null && this.origData.audio_support === '0' && resultData.audio_support === '1') {
            alert(langArray['LTXT_SETUPSYSSECURITY_AUDIO_CHECK']);
          }
          dvrpoke.start();

          return returnValue;
      }
    }
});
