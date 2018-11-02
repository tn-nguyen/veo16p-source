/**
 * @author chcha
 */

function isCapable3_IPX(size, fps, numCh, recCalc)
{
  return true;
}

function isCapable3_HDI(size, fps, numCh, recCalc)
{
    for( var ch=0 ; ch < numCh ; ch++ ) {
      for( var h=0 ; h < 24 ; h++ ) {
        var idx = h*16+ch;
        var s = size.charAt(idx);
        var f = fps.charAt(idx);

        if( s != 'R' && s != 'Q' ) {
          if( f == 'A' ) {
            return false;
          }
        }
      }
    }
    return true;
}

function isCapable3(size, fps, numCh, recCalc)
{
  if( !recCalc.validate(size, fps) ) {
    return false;
  }

  return true;
}

function isCapable3_noValidate(size, fps, numCh, recCalc)
{
  return true;
}

function isCapable2(size, fps, numCh, recCalc)
{
  if( INFO_MODEL.indexOf("_IPX_") >= 0 ) {
    func = isCapable3_IPX;
  } else if( INFO_MODEL.indexOf("_IPXP_") >= 0 ) {
    func = isCapable3_IPX;
  } else if( INFO_MODEL.indexOf("_HDI_") >= 0 ) {
    func = isCapable3_HDI;
  } else if( INFO_MODEL.indexOf("_HDY_") >= 0 ) {
    func = isCapable3;
  } else if( INFO_MODEL.indexOf("_ANF_") >= 0 ) {
    func = isCapable3_noValidate;
  } else if( INFO_MODEL.indexOf("_ATM_") >= 0 ) {
    func = isCapable3_noValidate;
  } else if( INFO_MODEL.indexOf("_UTM4G_") >= 0
    || ((INFO_MODEL.indexOf('_UTM5G_') >= 0 || INFO_MODEL.indexOf('_UTM5X_') >= 0) && INFO_DVRCHANNEL >= 16) ) {
    func = isCapable3;
  } else {
    func = isCapable3_noValidate;
  }

  if( typeof func == 'function' )
    return func(size, fps, numCh, recCalc);

  return true;
}

function isCapable(arr, isweekly, recCalc) {
  var days;

  if( isweekly ) {
    days = new Array('0', '1', '2', '3', '4', '5', '6', '8');
  } else {
    days = new Array('7');
  }

  for( var i in days ) {
    var d = days[i];
    var size = arr['size' + d];
    var fps = arr['fps' + d];
    var s, f;

    for( var h=0 ; h < 24 ; h++ ) {
      s = size.substr(16*h, 16);
      f = fps.substr(16*h, 16);

      if( !isCapable2(s, f, INFO_DVRCHANNEL, recCalc) ) {
        return false;
      }
    }
  }

  return true;
}

function isAudioChar(str) {
    if(str == '8') return 'G';
    else if(str == '9') return 'H';
    else if(str == '10') return 'I';
    else if(str == '11') return 'J';
    else if(str == '12') return 'K';
    else if(str == '13') return 'L';
    else if(str == '14') return 'M';
    else if(str == '15') return 'N';
}

$z.m({
    RecOp: {
        menu : 'record.operation',

        makeupData: function(data) {
            var m_size = 'RRRRRRRRRRRRRRRR';
            var m_fps = 'AAAAAAAAAAAAAAAA';
            var m_q = 'BBBBBBBBBBBBBBBB';
            var m_aud = '0000000000000000';
            var a_size = 'RRRRRRRRRRRRRRRR';
            var a_fps = 'AAAAAAAAAAAAAAAA';
            var a_q = 'BBBBBBBBBBBBBBBB';
            var a_aud = '0000000000000000';
            var ma_size = 'RRRRRRRRRRRRRRRR';
            var ma_fps = 'AAAAAAAAAAAAAAAA';
            var ma_q = 'BBBBBBBBBBBBBBBB';
            var ma_aud = '0000000000000000';
            var im_size1 = 'RRRRRRRRRRRRRRRR';
            var im_fps1 = 'AAAAAAAAAAAAAAAA';
            var im_q1 = 'BBBBBBBBBBBBBBBB';
            var im_size2 = 'RRRRRRRRRRRRRRRR';
            var im_fps2 = 'AAAAAAAAAAAAAAAA';
            var im_q2 = 'BBBBBBBBBBBBBBBB';
            var im_aud = '0000000000000000';
            var ia_size1 = 'RRRRRRRRRRRRRRRR';
            var ia_fps1 = 'AAAAAAAAAAAAAAAA';
            var ia_q1 = 'BBBBBBBBBBBBBBBB';
            var ia_size2 = 'RRRRRRRRRRRRRRRR';
            var ia_fps2 = 'AAAAAAAAAAAAAAAA';
            var ia_q2 = 'BBBBBBBBBBBBBBBB';
            var ia_aud = '0000000000000000';
            var ima_size1 = 'RRRRRRRRRRRRRRRR';
            var ima_fps1 = 'AAAAAAAAAAAAAAAA';
            var ima_q1 = 'BBBBBBBBBBBBBBBB';
            var ima_size2 = 'RRRRRRRRRRRRRRRR';
            var ima_fps2 = 'AAAAAAAAAAAAAAAA';
            var ima_q2 = 'BBBBBBBBBBBBBBBB';
            var ima_aud = '0000000000000000';


            return data;
        },
        has0Fps: function (data) {
          for (var i = 0 ; i < INFO_DVRCHANNEL ; i += 1) {
            if (data['m_fps'].charAt(i) == fpsTable[0]) {
              return true;
            }
          }
          return false;
        },
        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            var c = $z.current;

            if( !this.compareTo(data) ) {
                return false;
            }

            dvrpoke.stop();

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            var result = false;

            var recCalcAlarm = c.recCalcAlarm;
            var recCalcInten1 = c.recCalcIntensive1;
            var recCalcInten2 = c.recCalcIntensive2;

            if( !isCapable2(data['m_size'], data['m_fps'], INFO_DVRCHANNEL, recCalcAlarm ) ) {
                result = false;
            }
            else if( !isCapable2(data['a_size'], data['a_fps'], INFO_DVRCHANNEL, recCalcAlarm ) ) {
                result = false;
            }
            else if( !isCapable2(data['ma_size'], data['ma_fps'], INFO_DVRCHANNEL, recCalcAlarm ) ) {
                result = false;
            }
            else if( !isCapable2(data['im_size1'], data['im_fps1'], INFO_DVRCHANNEL, recCalcInten1 ) ) {
                result = false;
            }
            else if( !isCapable2(data['im_size2'], data['im_fps2'], INFO_DVRCHANNEL, recCalcInten2 ) ) {
                result = false;
            }
            else if( !isCapable2(data['ia_size1'], data['ia_fps1'], INFO_DVRCHANNEL, recCalcInten1 ) ) {
                result = false;
            }
            else if( !isCapable2(data['ia_size2'], data['ia_fps2'], INFO_DVRCHANNEL, recCalcInten2 ) ) {
                result = false;
            }
            else if( !isCapable2(data['ima_size1'], data['ima_fps1'], INFO_DVRCHANNEL, recCalcInten1 ) ) {
                result = false;
            }
            else if( !isCapable2(data['ima_size2'], data['ima_fps2'], INFO_DVRCHANNEL, recCalcInten2 ) ) {
                result = false;
            } else {
              result = true;
            }

            if( !result ) {
              alert(langArray['LTXT_FPS_IS_OVER'] + "\n" + langArray['LTXT_FPS_CHECK']);
              return result;
            }

            return data;

        },
        afterLoad : function(result) {
            this.data = encode_to_array(result);



            return result;
        },
        afterSave : function(result) {
            var ret;

            dvrpoke.start();

            ret = procResult(result);

            if (ret) {
                if( this.ajaxdata['recmode'] == '0' ) {
                    $('.manual-rec').each( function() {
                        $(this).find('a').bind('click', disabler);
                        $(this).addClass('disabled-menu');
                    });
                } else {
                    $('.manual-rec').each( function() {
                        $(this).find('a').unbind('click', disabler);
                        $(this).removeClass('disabled-menu');
                    });

                }
            }


            return ret;

        }
    },
    RecCont : {
        menu : 'record.continuous',
        weekly : false,

        makeupData: function(data) {
            var size= '';
            var fps = '';
            var audio = '';
            var quality = '';
            var mode = '';
            var size   ="BBRRRRRRRRRRRRRRRRRRRRRRBRRRRRBRRRRRRRRRCRRRRRRRBRRRRRRRRRRRCRRRRRRRRRRRBRRRRRRRBRRRRRRRRRRRRBRRDRRRRRRRRRBRRRRRRRRRBRRRBRRRRRRRRRRRBRRRRRRRRRRRCRRRRRRRRRRBRRRRRRRRRRRRCRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR";
            var fps    ="FAAAAAAAAAAAABAAAAAAAAAAFAAAAAAAAAAABAAAAAAAAAAAFAAAAABAAAAAAAAABAAAAAAAFAAABAAAAAAAAAAAAAABAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            var quality="ABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";
            var audio  ="000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

            var original_data_length = 0;
            var changed_data_length = 0;

            for( var ch=0 ; ch < 8 ; ch++ ) {
              original_data_length = $z.current.m.origData['mode'+ch].length;
              changed_data_length = data['mode'+ch].length;

              if(changed_data_length < original_data_length) {
                data['mode'+ch] = data['mode'+ch] + $z.current.m.origData['mode'+ch].slice(changed_data_length, original_data_length);
              }
            }

            return data;

        },
        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            var c = $z.current;

            if ( this.weekly ) {
                data['menu'] = this.menu + '_weekly';
            } else {
                data['menu'] = this.menu + '_day';
            }
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            if( !isCapable(data, this.weekly, c.recCalc) ) {
              alert(langArray['LTXT_FPS_IS_OVER'] + "\n" + langArray['LTXT_FPS_CHECK']);
              return false;
            }

            if((INFO_MODEL.indexOf("UTM4G") >= 0
                || ((INFO_MODEL.indexOf("UTM5G") >= 0 || INFO_MODEL.indexOf("UTM5X") >= 0) && INFO_DVRCHANNEL >= 16))
              && $z.current.recCalc.grpRemain[0] < 0
              && $z.current.recCalc.grpRemain[1] < 0
              && $z.current.recCalc.grpRemain[2] < 0) {
              alert(langArray['LTXT_FPS_IS_OVER'] + "\n" + langArray['LTXT_FPS_CHECK']);
              return false;
            }

            dvrpoke.stop();

            return data;

        },
        afterLoad : function(result) {
            var array = encode_to_array(result);
            this.weekly = array['schedule'] == '0' ? false : true;

            return result;
        },
        afterSave : function(result) {
            dvrpoke.start();
            return procResult(result);
        }
    },
    RecMotion: {
        menu : 'record.motion',
        weekly : false,

        makeupData: function(data) {
            var size= '';
            var fps = '';
            var audio = '';
            var quality = '';
            var mode = '';
            var size   ="BBRRRRRRRRRRRRRRRRRRRRRRBRRRRRBRRRRRRRRRCRRRRRRRBRRRRRRRRRRRCRRRRRRRRRRRBRRRRRRRBRRRRRRRRRRRRBRRDRRRRRRRRRBRRRRRRRRRBRRRBRRRRRRRRRRRBRRRRRRRRRRRCRRRRRRRRRRBRRRRRRRRRRRRCRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR";
            var fps    ="FAAAAAAAAAAAABAAAAAAAAAAFAAAAAAAAAAABAAAAAAAAAAAFAAAAABAAAAAAAAABAAAAAAAFAAABAAAAAAAAAAAAAABAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            var quality="ABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";
            var audio  ="000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

            var original_data_length = 0;
            var changed_data_length = 0;

            for( var ch=0 ; ch < 8 ; ch++ ) {
              original_data_length = $z.current.m.origData['mode'+ch].length;
              changed_data_length = data['mode'+ch].length;

              if(changed_data_length < original_data_length) {
                data['mode'+ch] = data['mode'+ch] + $z.current.m.origData['mode'+ch].slice(changed_data_length, original_data_length);
              }
            }

            return data;
        },
        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            var c = $z.current;

            if ( this.weekly ) {
                data['menu'] = this.menu + '_weekly';
            } else {
                data['menu'] = this.menu + '_day';
            }
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            if( !isCapable(data, this.weekly, c.recCalc) ) {
              alert(langArray['LTXT_FPS_IS_OVER'] + "\n" + langArray['LTXT_FPS_CHECK']);
              return false;
            }

            if((INFO_MODEL.indexOf("UTM4G") >= 0
                || ((INFO_MODEL.indexOf("UTM5G") >= 0 || INFO_MODEL.indexOf("UTM5X") >= 0) && INFO_DVRCHANNEL >= 16))
              && $z.current.recCalc.grpRemain[0] < 0
              && $z.current.recCalc.grpRemain[1] < 0
              && $z.current.recCalc.grpRemain[2] < 0) {
              alert(langArray['LTXT_FPS_IS_OVER'] + "\n" + langArray['LTXT_FPS_CHECK']);
              return false;
            }

            dvrpoke.stop();

            return data;

        },
        afterLoad : function(result) {
            var array = encode_to_array(result);
            this.weekly = array['schedule'] == '0' ? false : true;

            return result;
        },
        afterSave : function(result) {
            dvrpoke.start();
            return procResult(result);
        }
    },
    RecAlarm: {
        menu : 'record.alarm',
        weekly : false,

        makeupData: function(data) {
            var size= '';
            var fps = '';
            var audio = '';
            var quality = '';
            var mode = '';
            var size   ="BBRRRRRRRRRRRRRRRRRRRRRRBRRRRRBRRRRRRRRRCRRRRRRRBRRRRRRRRRRRCRRRRRRRRRRRBRRRRRRRBRRRRRRRRRRRRBRRDRRRRRRRRRBRRRRRRRRRBRRRBRRRRRRRRRRRBRRRRRRRRRRRCRRRRRRRRRRBRRRRRRRRRRRRCRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR";
            var fps    ="FAAAAAAAAAAAABAAAAAAAAAAFAAAAAAAAAAABAAAAAAAAAAAFAAAAABAAAAAAAAABAAAAAAAFAAABAAAAAAAAAAAAAABAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            var quality="ABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBABBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";
            var audio  ="000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {

            }

            return data;
        },
        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            var c = $z.current;

            if ( this.weekly ) {
                data['menu'] = this.menu + '_weekly';
            } else {
                data['menu'] = this.menu + '_day';
            }
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            if( !isCapable(data, this.weekly, c.recCalc) ) {
              alert(langArray['LTXT_FPS_IS_OVER'] + "\n" + langArray['LTXT_FPS_CHECK']);
              return false;
            }
            dvrpoke.stop();

            return data;

        },
        afterLoad : function(result) {
            var array = encode_to_array(result);
            this.weekly = array['schedule'] == '0' ? false : true;

            return result;
        },
        afterSave : function(result) {
            dvrpoke.start();
            return procResult(result);
        }
    },
    RecPanic : {
        menu : 'record.panic',

        makeupData: function(data) {
            //var size   ="RRRRRRRRRRRRRRRR";
            //var fps    ="AAAAAAAAAAAAAAAA";
            //var quality="BBBBBBBBBBBBBBBB";
            //var audio  ="0000000000000000";
            var size   = this.origData['size'];
            var fps    = this.origData['fps'];
            var quality= this.origData['quality'];
            var audio  = this.origData['audio'];

            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                size = size.setCharAt(ch, data['size'+ch]);
                fps = fps.setCharAt(ch, data['fps'+ch]);
                quality = quality.setCharAt(ch, data['quality'+ch]);
                audio = audio.setCharAt(ch, data['audio'+ch]);
            }

            data['size'] = size;
            data['fps'] = fps;
            data['quality'] = quality;
            data['audio'] = audio;

            return data;
        },

        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            var c = $z.current;

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            if( !isCapable2(data['size'], data['fps'], INFO_DVRCHANNEL, c.recCalc) ) {
              alert(langArray['LTXT_FPS_IS_OVER'] + "\n" + langArray['LTXT_FPS_CHECK']);
              return false;
            }

            if((INFO_MODEL.indexOf("UTM4G") >= 0
                || ((INFO_MODEL.indexOf("UTM5G") >= 0 || INFO_MODEL.indexOf("UTM5X") >= 0) && INFO_DVRCHANNEL >= 16))
              && $z.current.recCalc.grpRemain[0] < 0
              && $z.current.recCalc.grpRemain[1] < 0
              && $z.current.recCalc.grpRemain[2] < 0) {
              alert(langArray['LTXT_FPS_IS_OVER'] + "\n" + langArray['LTXT_FPS_CHECK']);
              return false;
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
    NetStream: {
        menu : 'record.net_streaming',

        makeupData: function(data) {
            //var size   ="RRRRRRRRRRRRRRRR";
            //var fps    ="AAAAAAAAAAAAAAAA";
            //var quality="BBBBBBBBBBBBBBBB";
            var size   = this.origData['size'];
            var fps    = this.origData['fps'];
            var quality= this.origData['quality'];

            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                size = size.setCharAt(ch, data['size'+ch]);
                fps = fps.setCharAt(ch, data['fps'+ch]);
                quality = quality.setCharAt(ch, data['quality'+ch]);
            }

            data['size'] = size;
            data['fps'] = fps;
            data['quality'] = quality;

            return data;
        },

        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            var c = $z.current;

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            if( INFO_MODEL.indexOf("_HDY_") < 0 ) {
              if( !isCapable2(data['size'], data['fps'], INFO_DVRCHANNEL, c.recCalc) ) {
                alert(langArray['LTXT_FPS_IS_OVER'] + "\n" + langArray['LTXT_FPS_CHECK']);
                return false;
              }
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
    StorageCalc: {
        menu : 'network.status',

        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
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
  RecAudioMap: {
    menu : 'record.audio_mapping',
    beforeLoad : function(data) {
      return data;
    },
    makeupData : function(data) {
      var audio_ch = this.origData['audio_ch'];
      var totalCh = parseInt(INFO_DVRCHANNEL);
      if (INFO_MODEL.indexOf('HDS') >= 0) {
        if (INFO_MODEL.indexOf('0806') >= 0) {
          totalCh += 4;
        } else if (INFO_MODEL.indexOf('1609') >= 0) {
          totalCh += 8;
        }
      }
      for (var i = 0 ; i < 16 ; i += 1) {
        if (i < totalCh) {
          if( (INFO_DVRCHANNEL == 8 && i < 8) || (INFO_DVRCHANNEL == 16) ) audio_ch = audio_ch.setCharAt(i, parseInt(data['audio_in' +i], 10).toString(32));
          else if(INFO_DVRCHANNEL == 8 && i < 16) audio_ch = audio_ch.setCharAt(i, isAudioChar(parseInt(data['audio_in' +i], 10)));
        }
      }
      data['audio_ch'] = audio_ch.toUpperCase();
      return data;
    },
    setDataAt : function(item, pos, data) {
      if( (INFO_DVRCHANNEL == 8 && data < 8) || (INFO_DVRCHANNEL == 16) ) {
        this.data[item] = this.data[item].setCharAt(pos, parseInt(data, 10).toString(32));
      } else if(INFO_DVRCHANNEL == 8 && data < 16) {
        this.data[item] = this.data[item].setCharAt(pos, isAudioChar(parseInt(data, 10)));
      }
      return true;
    },
    beforeSave : function(data) {
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
