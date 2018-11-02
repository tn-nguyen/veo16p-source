/**
 * @author chcha
 */

$z.v({
    DispOSD : {
        init: function() {
            $('#border_color').change(function() {
                var css = $("select#border_color option:selected").attr('class');
                $(this).attr('class', css).blur();;
            });

            if( typeof LANGLIST != 'undefined' ) {
              $('#language').empty();
              for( var lang in LANGLIST ) {
                $('#language').append($('<option>').val(lang).html(lang).attr('id','lang_'+lang));
              }
            } else {

            }

            if( INFO_VENDOR == 'ALSOK' || INFO_VENDOR == 'TAKENAKA') {
              $('.remove_alsok').hide();
            }
    
        },
        update: function(array) {
            $z.log('array = ' + array);

            $('#cam_title').val(array['cam_title']);
            $('#recod_mode').val(array['recod_mode']);
            if( INFO_MODEL.indexOf("ATM") >= 0 || INFO_MODEL.indexOf("ANF") >= 0 || INFO_MODEL.indexOf("UTM") >= 0 ) {
              $('#lang_Audiomodeicon').hide();
              $('#audio_mode').hide();
            } else {
              $('#lang_Username').remove();

              if (INFO_AUDIO_SUPPORT == '1') {
                $('#audio_mode').attr('disabled', false);
              } else {
                $('#audio_mode').attr('disabled', true);
              }
            }

            $('#audio_mode').val(array['audio_mode']);
            $('#zoom_pip').val(array['zoom_pip']);
            $('#user_name').val(array['user_name']);

            $('#status_bar_timeout').val(array['status_bar_timeout']);
            $('#timeline_fs').val(array['timeline_fs']);
            $('#border').val(array['border']);
            $('#border_color').val(array['border_color']).trigger('change');

            $('#language').val(array['language']);
            lang_file('','SETUPDISPOSD');
        }
    },
    DispMonitor: {
        init: function() {
        },
        update: function(array) {
            $z.log('array = ' + array);

            $('#seq_dwell').val(array['seq_dwell']);
            $('#spot_dwell').val(array['spot_dwell']);
            $('#aspect_ratio').val(array['aspect_ratio']);

            $('#monitor_type').val(array['monitor_type']);
        }
    },
  SoundAudio: {
    init: function() {
      audioCh = new Array();

      var _is_this_model_has_audio_count = function() {
        var enum_model = ['4G', '5G', '5X', '5HG']; // INFO_AUDIO_IN_COUNT support model.

        if(typeof INFO_AUDIO_IN_COUNT == 'undefined') {return false;}
        if(INFO_AUDIO_IN_COUNT < 0) {return false;}

        for(var i=0; i<enum_model.length; i++) {
          if (INFO_MODEL.indexOf(enum_model[i]) >= 0) {
            return true;
          }
        }

        return false;
      }

      if(_is_this_model_has_audio_count() == true) {
        var audioTotal = parseInt(INFO_AUDIO_IN_COUNT) + parseInt(INFO_AUDIO_IN_IPCAM_COUNT);
        for( var ch=1 ; ch <= audioTotal ; ch++ ) {
          ch <= INFO_AUDIO_IN_COUNT ? audioCh.push("AUDIO " + (ch)) : audioCh.push("IPCAM AUDIO " + (ch - INFO_AUDIO_IN_COUNT));
        }
      } else if (INFO_MODEL.indexOf('HDS') >= 0) {
        audioCh = new Array();

        if (INFO_MODEL.indexOf('0806') >= 0) {
          normalStart = 1;
          normalEnd = 4;
          sdiStart = 1;
          sdiEnd = 8;
        } else if (INFO_MODEL.indexOf('1609') >= 0) {
          normalStart = 1;
          normalEnd = 8;
          sdiStart = 9;
          sdiEnd = 16;
        }

        for (var ch = normalStart ; ch <= normalEnd ; ch += 1) {
          audioCh.push("CH " + ch);
        }

        for (var ch = sdiStart ; ch <= sdiEnd ; ch += 1) {
          audioCh.push("CH " + ch + '(SDI)');
        }
      } else if ( INFO_MODEL.match("ATM_[0-9]+H") != null ) {
        for( var ch=1 ; ch <= 4 ; ch++ ) {
          audioCh.push("AUDIO " + (ch));
        }
      } else if ( INFO_MODEL.match("ANF_[0-9]+H") != null ) {
        for( var ch=1 ; ch <= INFO_DVRCHANNEL ; ch++ ) {
          audioCh.push("AUDIO " + (ch));
        }
      } else if ( INFO_MODEL.match("UTM_[0-9]+D") != null ) {
        for( var ch=1 ; ch <= 4 ; ch++ ) {
          audioCh.push("AUDIO " + (ch));
        }
      } else {
        for( var ch=1 ; ch <= INFO_DVRCHANNEL ; ch++ ) {
          audioCh.push("CH" + (ch));
        }
      }
      makeSelectOptions("#live" , audioCh);

      if (INFO_AUDIO_SUPPORT == '1') {
        $('#live').removeAttr('disabled');
        $('#mic').removeAttr('disabled');
        $('#netaudiotrans').removeAttr('disabled');
        $('#netaudiorecv').removeAttr('disabled');
      } else {
        $('#live').attr('disabled', 'disabled');
        $('#mic').attr('disabled', 'disabled');
        $('#netaudiotrans').attr('disabled', 'disabled');
        $('#netaudiorecv').attr('disabled', 'disabled');
      }
    },
    update: function(array) {
      $z.log('array = ' + array);
      $('#live').val(array['live']);
      $('#mic').val(array['mic']);
      $('#netaudiotrans').val(array['netaudiotrans']);
      $('#netaudiorecv').val(array['netaudiorecv']);
      $('#remote').val(array['remote']);
      $('#keypad').val(array['keypad']);

      //if front keypad is exist.
      if(INFO_VENDOR == 'ALSOK' || INFO_VENDOR == 'TAKENAKA') {
        $("#keypad").show();
        $("#lang_KeypadSetting").show();
      } else {
        if(array['isKeypad'] > 0 )
        {
          //Ofcourse, default displaying value of #keypad is not none.
          //So that this code has not meaning.
          $("#keypad").show();
          $("#lang_KeypadSetting").show();
        }
        //if front keypad is not exist.
        else
        {
          $("#keypad").hide();
          $("#lang_KeypadSetting").hide();
        }
      }



      //if not using remote
      if ( INFO_MODEL.indexOf("UTM4G") > -1) {
        $("#remote").hide();
        $("#lang_RemoteSetting").hide();
      }
      else
      {
        $("#remote").show();
        $("#lang_RemoteSetting").show();
      }

      //if remote and keypad is not using...
      if( ($("#remote").css("display") == "none") && ($("#keypad").css("display") == "none") )
      {
        $("#lang_BuzzerSetting").hide();
      }

    }
  }
});
