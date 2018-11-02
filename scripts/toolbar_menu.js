function print_toolbar_live_menu(obj, channel)
{
    if ( browerIE )
    {
    // Button Add
        obj.write("<ul class='btn1' id='idbtn1'>");
        obj.write("<li class='divided'><img src='../images/images/live_bt_screen_01_n.png' id='division1' name='division1' alt='lang_1Division' ></li>");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif' id='division1bar'></li>");
        obj.write("<li class='divided'><img src='../images/images/live_bt_screen_04_n.png' id='division4' name='division4' alt='lang_4Division' ></li>");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif' id='division4bar'></li>");

        if( parseInt(channel) == 8 )
    	{
    	    obj.write("<li class='divided'><img src='../images/images/live_bt_screen_08_n.png' id='division8' name='division8' alt='lang_8Division' ></li>");
            obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif' id='division8bar'></li>");
            obj.write("<li class='divided'><img src='../images/images/live_bt_screen_09_n.png' id='division9' name='division9' alt= 'lang_9Division' ></li>");
            obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif' id='division9bar'></li>");
    	}
    	else if (parseInt(channel) == 16)
    	{
    		obj.write("<li class='divided'><img src='../images/images/live_bt_screen_08_n.png' id='division8' name='division8' alt='lang_8Division' ></li>");
            obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif' id='division8bar'></li>");
            obj.write("<li class='divided'><img src='../images/images/live_bt_screen_09_n.png' id='division9' name='division9' alt= 'lang_9Division' ></li>");
            obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif' id='division9bar'></li>");
            obj.write("<li class='divided'><img src='../images/images/live_bt_screen_16_n.png' id='division16' name='division16' alt='lang_16Division' ></li>");
            obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif' id='division16bar'></li>");
    	}

        obj.write("</ul>");
        obj.write("<ul class='btn2' id='idbtn2'>");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        obj.write("<li class='divided'><img src='../images/images/live_bt_page_set_n.png' id='btpageset' alt='lang_severaldisp' ></li>");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        obj.write("<li class='divided'><img src='../images/images/live_bt_page_one_n.png' id='btpageone' alt='lang_onedisp' ></li>");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        obj.write("<li class='divided'><img src='../images/images/live_bt_zoom_in_n.png' id='btzoomin' alt='lang_zoom' ></li>");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        if (INFO_VENDOR != 'SAMSUNG')
        {
            obj.write("<li class='divided'><img src='../images/images/live_bt_page_full_n.png' id='btpagefull' alt='lang_fullscreen' ></li>");
            obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        }
        obj.write("</ul>");

        if ( INFO_VENDOR != 'SAMSUNG' )
        {

            obj.write("<ul class='btn4' id='idbtn4'>");
         if(INFO_VENDOR != 'S1') {

            obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
            if (INFO_VENDOR === 'S1') {
              obj.write("<li class='divided'><img src='../images/images/live_audio_out_d.gif' id='btliveaudio' alt='lang_liveaudio' ></li>");
            } else {
              obj.write("<li class='divided'><img src='../images/images/live_audio_out_n.gif' id='btliveaudio' alt='lang_liveaudio' ></li>");
            }
            obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
            if (INFO_AUDIO_SUPPORT == '0' || INFO_VENDOR === 'S1') {
              obj.write("<li class='divided'><img src='../images/images/live_sound_off_d.gif' id='btlivespeaker' alt='lang_speaker' ></li>");
            } else {
              obj.write("<li class='divided'><img src='../images/images/live_sound_off_n.png' id='btlivespeaker' alt='lang_speaker' ></li>");
            }
            obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
         }
            obj.write("</ul>");

        }

        obj.write("<select id='channel' name='channel' class='lst_ch'>");
        obj.write("</select>");
        obj.write("<ul class='btn3' id='idbtn3'>");
        if(INFO_VENDOR != 'S1') {
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        if (INFO_VENDOR === 'S1') {
          obj.write("<li class='divided'><img src='../images/images/live_bt_backup_d.gif' id='btbackup' alt='lang_save' ></li>");
        } else {
          obj.write("<li class='divided'><img src='../images/images/live_bt_backup_n.gif' id='btbackup' alt='lang_save' ></li>");
        }






        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        }
        if (INFO_SNAPSHOT_SUPPORT == '0' || INFO_VENDOR === 'S1') {
          if(INFO_VENDOR != 'S1') {
          obj.write("<li class='divided'><img src='../images/images/live_bt_print_d.gif' id='btprint' alt='lang_print' ></li>");
          obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
          obj.write("<li class='divided'><img src='../images/images/live_bt_snapshot_d.gif' id='btcaptureimage' alt='lang_captureimage' ></li>");
          }
        } else {
          obj.write("<li class='divided'><img src='../images/images/live_bt_print_n.gif' id='btprint' alt='lang_print' ></li>");
          obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
          obj.write("<li class='divided'><img src='../images/images/live_bt_snapshot_n.gif' id='btcaptureimage' alt='lang_captureimage' ></li>");
        }
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        obj.write("<li class='divided'><img src='../images/images/live_bt_setting_n.gif' id='btsetting' alt='lang_setting' ></li>");
        obj.write("</ul>");
    }
    else
    {
        obj.write("<ul class='btn1' id='idbtn1'>");
        obj.write("</ul>");
        obj.write("<ul class='btn1' id='idbtn2'>");
        obj.write("</ul>");
        obj.write("<ul class='btn1' id='idbtn4'>");
        obj.write("</ul>");
        obj.write("<select class='lst_ch' id='channel' name='channel'>");
        obj.write("</select>");
        obj.write("<ul class='btn1' id='idbtn3'>");
        obj.write("</ul>");
    }

// CSS Modify
    var idbtn1 = document.getElementById("idbtn1");
    var idbtn2 = document.getElementById("idbtn2");
    var idbtn3 = document.getElementById("idbtn3");
    var idbtn4 = document.getElementById("idbtn4");
    var idchannel = document.getElementById("channel");

    if( parseInt(channel) == 8 )
    {
      idbtn1.style.cssText = "width: 124px; height:29px;  margin-right:62px; ";
    }
    else if (parseInt(channel) == 16)
    {
      idbtn1.style.cssText = "width: 156px; height:29px;  margin-right:30px; ";
    }
    else
    {
      idbtn1.style.cssText = "width: 64px; height:29px;  margin-right:122px; ";
    }
    idbtn2.style.cssText = "width: 125px; height:29px;  margin-right:30px; ";
    idbtn3.style.cssText = "width: 126px; height:29px;  margin-right:1px; ";
    idbtn4.style.cssText = "width: 64px; height:29px; margin-left0:; margin-right:30px; ";
    idchannel.style.cssText = "margin-right:30px; ";
}

function print_toolbar_playback_menu(obj, channel)
{
// Button Add
    if ( browerIE )
    {
        obj.write("<ul class='btn1' id='idbtn1'>");
        obj.write("<li class='divided'><img src='../images/images/live_bt_screen_01_n.png' id='division1' name='division1' alt='lang_1Division' ></li>");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif' id='division1bar'></li>");
        obj.write("<li class='divided'><img src='../images/images/live_bt_screen_04_n.png' id='division4' name='division4' alt='lang_4Division' ></li>");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif' id='division4bar'></li>");
    	if( parseInt(channel) == 8 )
    	{
    	    obj.write("<li class='divided'><img src='../images/images/live_bt_screen_08_n.png' id='division8' name='division8' alt='lang_8Division' ></li>");
            obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif' id='division8bar'></li>");
            obj.write("<li class='divided'><img src='../images/images/live_bt_screen_09_n.png' id='division9' name='division9' alt= 'lang_9Division' ></li>");
            obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif' id='division9bar'></li>");
    	}
    	else if (parseInt(channel) == 16)
    	{
    		obj.write("<li class='divided'><img src='../images/images/live_bt_screen_08_n.png' id='division8' name='division8' alt='lang_8Division' ></li>");
            obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif' id='division8bar'></li>");
            obj.write("<li class='divided'><img src='../images/images/live_bt_screen_09_n.png' id='division9' name='division9' alt= 'lang_9Division' ></li>");
            obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif' id='division9bar'></li>");
            obj.write("<li class='divided'><img src='../images/images/live_bt_screen_16_n.png' id='division16' name='division16' alt='lang_16Division' ></li>");
            obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif' id='division16bar'></li>");
    	}

    	obj.write("</ul>");
      obj.write("<ul class='btn2' id='idbtn2'>");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        obj.write("<li class='divided'><img src='../images/images/live_bt_page_set_n.png' id='btpageset' alt='lang_severaldisp' ></li>");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        obj.write("<li class='divided'><img src='../images/images/live_bt_page_one_n.png' id='btpageone' alt='lang_onedisp' ></li>");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        obj.write("<li class='divided'><img src='../images/images/live_bt_zoom_in_n.png' id='btzoomin' alt='lang_zoom' ></li>");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");

        if ( INFO_VENDOR != 'SAMSUNG' )
        {
            obj.write("<li class='divided'><img src='../images/images/live_bt_page_full_n.png' id='btpagefull' alt='lang_fullscreen' ></li>");
            obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
         if(INFO_VENDOR != 'S1') {
            if (INFO_AUDIO_SUPPORT == '0' ||  INFO_VENDOR == 'S1') {
              obj.write("<li class='divided'><img src='../images/images/live_sound_off_d.png' id='btspeaker' alt='lang_speaker' ></li>");
            } else {
              obj.write("<li class='divided'><img src='../images/images/live_sound_off_n.png' id='btspeaker' alt='lang_speaker' ></li>");
            }
         }
            obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif' id='divisionspeakerbar'></li>");
        }
        obj.write("</ul>");
        obj.write("<ul class='btn4' id='idbtn4'>");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        obj.write("<li class='divided'><img src='../images/images/bt_playback_rf2_n.gif' id='rf' alt='lang_RF' onClick='SetPlaybackRF();'></li>");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        obj.write("<li class='divided'><img src='../images/images/bt_playback_backplay_n.gif' id='backplay' alt='lang_backplay' onClick='SetPlaybackBackPlay();'></li>");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        obj.write("<li class='divided'><img src='../images/images/bt_playback_pause_n.gif' id='pauseplay' alt='lang_pause' onClick='SetPlaybackPause();'></li>");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        obj.write("<li class='divided'><img src='../images/images/bt_playback_play_n.gif' id='play' alt='lang_play' onClick='SetPlaybackPlay();'></li>");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        obj.write("<li class='divided'><img src='../images/images/bt_playback_ff2_n.gif' id='ff' alt='lang_FF' onClick='SetPlaybackFF();'></li> ");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        obj.write("</ul>");
        obj.write("<select class='lst_ch' id='channel' name='channel'>");
        obj.write("</select>");
        obj.write("<ul class='btn3' id='idbtn3'>");
        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        if(INFO_VENDOR != 'S1') {
        if (INFO_SNAPSHOT_SUPPORT == '0' ||  INFO_VENDOR == 'S1') {
          obj.write("<li class='divided'><img src='../images/images/live_bt_print_d.gif' id='btprint' alt='lang_print' ></li>");
          obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
          obj.write("<li class='divided'><img src='../images/images/live_bt_snapshot_d.gif' id='btcaptureimage' alt='lang_captureimage' ></li>");
        } else {
          obj.write("<li class='divided'><img src='../images/images/live_bt_print_n.gif' id='btprint' alt='lang_print' ></li>");
          obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
          obj.write("<li class='divided'><img src='../images/images/live_bt_snapshot_n.gif' id='btcaptureimage' alt='lang_captureimage' ></li>");
        }
        }
//        obj.write("<li class='bar'><img src='../images/images/live_control_bar.gif'></li>");
        obj.write("<li class='divided'><img src='../images/images/live_bt_setting_n.gif' id='btsetting' alt='lang_setting' ></li>");
        obj.write("</ul>");
    }
    else
    {
        obj.write("<ul class='btn1' id='idbtn1'>");
        obj.write("</ul>");
        obj.write("<ul class='btn1' id='idbtn2'>");
        obj.write("</ul>");
        obj.write("<ul class='btn1' id='idbtn4'>");
        obj.write("</ul>");
        obj.write("<select class='lst_ch' id='channel' name='channel'>");
        obj.write("</select>");
        obj.write("<ul class='btn1' id='idbtn3'>");
        obj.write("</ul>");
    }

    // CSS Modify
    var idbtn1 = document.getElementById("idbtn1");
    var idbtn2 = document.getElementById("idbtn2");
    var idbtn3 = document.getElementById("idbtn3");
    var idbtn4 = document.getElementById("idbtn4");
    var idchannel = document.getElementById("channel");

    if( parseInt(channel) == 8 )
    {
      idbtn1.style.cssText = "width: 126px; height:29px;  margin-right:38px; ";
    }
    else if (parseInt(channel) == 16)
    {
      idbtn1.style.cssText = "width: 156px; height:29px;  margin-right:10px; ";
    }
    else
    {
      idbtn1.style.cssText = "width: 64px; height:29px;  margin-right:102px; ";
    }
    idbtn2.style.cssText = "width: 160px; height:29px;  margin-right:5px; ";
    idbtn3.style.cssText = "width: 94px; height:29px;  margin-right:1px; ";
    idbtn4.style.cssText = "width: 156px; height:29px;  margin-right:5px; ";
    idchannel.style.cssText = "margin-right:5px; ";
}
