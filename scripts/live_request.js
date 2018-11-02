var cmdselect = null;

var PTZ_CMD_PAN_LEFT        = 0;
var PTZ_CMD_PAN_RIGHT       = 1;
var PTZ_CMD_TILT_UP         = 2;
var PTZ_CMD_TILT_DOWN       = 3;
var PTZ_CMD_ZOOM_WIDE       = 4;
var PTZ_CMD_ZOOM_TELE       = 5;
var PTZ_CMD_PT_LEFT_UP      = 6;
var PTZ_CMD_PT_LEFT_DOWN    = 7;
var PTZ_CMD_PT_RIGHT_UP     = 8;
var PTZ_CMD_PT_RIGHT_DOWN   = 9;
var PTZ_CMD_IRIS_OPEN       = 10;
var PTZ_CMD_IRIS_CLOSE      = 11;
var PTZ_CMD_FOCUS_NEAR      = 12;
var PTZ_CMD_FOCUS_FAR       = 13;
var PTZ_CMD_STOP            = 14;
var PTZ_CMD_SET_PRESET      = 15;
var PTZ_CMD_CLEAR_PRESET    = 16;
var PTZ_CMD_GOTO_PRESET     = 17;
var PTZ_CMD_STOP_SWING      = 18;
var PTZ_CMD_SET_SWING       = 19;
var PTZ_CMD_RUN_SWING       = 20;
var PTZ_CMD_STOP_PATTERN    = 21;
var PTZ_CMD_SET_PATTERN     = 22;
var PTZ_CMD_RUN_PATTERN     = 23;
var PTZ_CMD_AUX_RUN         = 24;
var PTZ_NR                  = 44;

var gchannel = null;
var gcmd = null;
var gparam1 = null;
var gparam2 = null;

//continuous PTZ
var ptz_ch, ptz_cmd, ptz_param1, ptz_param2;
var ptz_initflag = false;
var audio_buf=false;

var log_result_count = 0;
var log_year = Array();
var log_mon = Array();
var log_day = Array();
var log_hour = Array();
var log_min = Array();
var log_second = Array();
var log_text = Array();
var log_curr_pos = Array(2);
log_curr_pos[0] = 0;
log_curr_pos[1] = 0;
var log_ch = Array();
var camTitle = Array(INFO_DVRCHANNEL);

var imageurl = "../images/images/status_";

var img_off_alarm_01  = new Image();
var img_off_motion_01  = new Image();
var img_off_video_loss_01  = new Image();
var img_off_rec_01  = new Image();
var img_off_alarm_out_01  = new Image();
//var img_off_relay_01 = new Image();

var img_off_alarm_02  = new Image();
var img_off_motion_02  = new Image();
var img_off_video_loss_02  = new Image();
var img_off_rec_02  = new Image();
var img_off_alarm_out_02  = new Image();
//var img_off_relay_02 = new Image();

var img_on_alarm_01  = new Image();
var img_on_motion_01  = new Image();
var img_on_video_loss_01  = new Image();
var img_on_alarm_out_01  = new Image();
//var img_on_relay_01 = new Image();

var img_on_rec_alarm_01  = new Image();
var img_on_rec_motion_01  = new Image();
var img_on_rec_panic_01  = new Image();
var img_on_rec_prerecord_01  = new Image();
var img_on_rec_timer_01  = new Image();

var img_on_alarm_02  = new Image();
var img_on_motion_02  = new Image();
var img_on_video_loss_02  = new Image();
var img_on_alarm_out_02  = new Image();
//var img_on_relay_02 = new Image();

var img_on_rec_alarm_02  = new Image();
var img_on_rec_motion_02  = new Image();
var img_on_rec_panic_02  = new Image();
var img_on_rec_prerecord_02  = new Image();
var img_on_rec_timer_02  = new Image();

var tzarray = Array(+12, +11, +10, +09, +8, +7, +6, +5, +4, +3, +3, +2, +1, -0, -1, -2, -2, -3, -3, -4, -4, -5, -5, -5, -6, -6, -7, -8, -9, -9, -9, -9, -10, -11, -12, -8);
var tzidx = 29;

var logtbsize = 8;

var live_status_color = Array('#DADADA','#84b6d7','#f2f3f5');

var liveCmd = "";

var log_cam_title_flag = Array();

var jpegfailname = "../images/imgfail.jpg";

//var GROUP_AUTH = "ADMIN";
var authCheck = false;

var _act_vloss = null;

var get_passwd_flag = false;
var get_passwd_name = null;
var get_id_name = null;
var get_mac_address = null;
var livePasswdTimer = null;
var initPassword = false;
var support_zoom = "0000000000000000";
var support_focus = "0000000000000000";
var support_iris = "0000000000000000";
var dialog_is_on = false;
//var sequence = new Sequence();

/**********************************************************/
/*ActiveX Controll ****************************************/

var jpegliveelem = null;

function onLivePasswdTimerStop()
{
	if ( livePasswdTimer != null)
	{
		clearTimeout(livePasswdTimer);
		livePasswdTimer = null;
	}
}

function onClickLiveStart()
{
    if (parseInt(INFO_DVRREADY) == 0)
    {
        var activex = document.getElementById("itxview");

    	if (ActiveX_IsConnection() == true)
    	{
    		activex.SessionClose();
    	}

        if(INFO_MODEL.indexOf("IPX") > 0)
        {
          alert("NVR is not ready.");
        }
        else
        {
          alert("DVR is not ready.");
        }
    }
    else
    {
    	if (browerIE == false)
    	{
    		onLiveTimer();
    	}
    	else
    	{
    		if( !get_passwd_flag )
			{
				livePasswdTimer = setTimeout(onClickLiveStart, 500);
			}
			else
			{
				onLivePasswdTimerStop();
				user_info_send_to_activex( get_id_name, get_passwd_name , get_mac_address);
				onLiveStart();
			}
    	}
    }
}

var liveTimer = null;
var liveTimerval = 0;

function onLiveTimer()
{
	if ( requestflag == false )
	{
		if ( liveCmd == "status")
		{
			var retime = document.getElementById("reloadTime");

			var retime_tmp = parseInt(retime.value) * 2;

			if ( parseInt(liveTimerval) >= parseInt(retime.value) )
			{
				live_postSetup(document.livesetting_status, "action=get_live&menu=live.status");
				liveTimerval = 0;
			}
			else
			{
				live_postSetup(document.livesetting_status, "action=get_live&menu=live.jpeg");
				liveTimerval = parseInt(liveTimerval) + 1;
			}
		}
		else if ( liveCmd == "log")
		{
			var retime = document.getElementById("reloadlogTime");

			var retime_tmp = parseInt(retime.value) * 2;

			if ( parseInt(liveTimerval) >= parseInt(retime.value) )
			{
				live_postSetup(document.livesetting_status, "action=get_live&menu=live.log");
				liveTimerval = 0;
			}
			else
			{
				live_postSetup(document.livesetting_status, "action=get_live&menu=live.jpeg");
				liveTimerval = parseInt(liveTimerval) + 1;
			}
		}
		else
		{
			live_postSetup(document.livesetting_status, "action=get_live&menu=live.jpeg");
		}
	}

	liveTimer = setTimeout(onLiveTimer, 500);
}

function onLiveTimerStop()
{
	if ( liveTimer != null)
	{
		clearTimeout(liveTimer);
		liveTimer = null;
	}
}

function live_timer_stop()
{
    if ( timerid != null)
	{
		clearTimeout(timerid);
		timerid = null;
	}

	if ( timerlogid != null)
	{
		clearTimeout(timerlogid);
		timerlogid = null;
	}
}

function onClickLiveStop()
{
	live_timer_stop();
	onLiveStop();

	var backupelem = document.getElementById("btbackup");

	if (backupelem)
	{
    	var imgurl = backupelem.getAttribute("src");
    	var img_str = imgurl.substring(imgurl.indexOf('images'),imgurl.length);

        if (img_str == "images/images/live_bt_backup_p.png")
        {
           alert(errLiveSaveStop);
        }

        LiveBackupInit();
    }
}

function info_timer_stop()
{
	if ( info_change_timer != null)
	{
		clearTimeout(info_change_timer);
		info_change_timer = null;
	}
}

function SetDisplayMode1(ch)
{
        if( ch && ch.button != null ) {
          ch = null;
        }

	if (!ch)
	{
		SetSplitMode1(null);
                auxiliary($("#channel").val()-1);
	}
	else
	{
		SetSplitMode1(ch);
                auxiliary($("#channel").val()-1);
	}
}

function SetDisplayMode4()
{
	if (browerIE == true)
	{
		var ch = document.getElementById("channel");
		ch.value = 0;
                $("#aux_select").empty();
                $("#aux_select").prop("disabled", true);
	}
	SetSplitMode4();
}

function SetDisplayMode8()
{
	if (browerIE == true)
	{
		var ch = document.getElementById("channel");
		ch.value = 0;
                $("#aux_select").empty();
                $("#aux_select").prop("disabled", true);
	}

  if(getLayout() == 4) {
    DisplayManual();
  } else {
    SetSplitMode8();
  }

}

function SetDisplayMode9()
{
	if (browerIE == true)
	{
		var ch = document.getElementById("channel");
		ch.value = 0;
                $("#aux_select").empty();
                $("#aux_select").prop("disabled", true);
	}

	SetSplitMode9();
}

function SetDisplayMode16()
{
	if (browerIE == true)
	{
		var ch = document.getElementById("channel");
		ch.value = 0;
                $("#aux_select").empty();
                $("#aux_select").prop("disabled", true);
	}

	SetSplitMode16();
}

function ptz_onChannelChange(elem)
{
	var chelem = elem;

	SetSplitMode1(chelem.value);
}

function SetDisplayTab()
{
	LiveDisplayTab();
}

function SetDisplayManual()
{
	DisplayManual();
}

function SetDisplayfull()
{
	fullScreen();
}

function Auth_CheckCovert(auth)
{
  var ch = SelectedChannel();
  return !AuthCh_CheckCovert(auth, ch);

  /*
	if ( auth != "ADMIN" )
	{
		var ch = SelectedChannel();
		if ( parseInt(INFO_COVERTCH[ch]) )
		{
			return false;
		}
	}
	return true;
	*/
}

var liveBackflag = false;

function vloss_CheckCovert()
{
  if (liveBackflag == false)
  {
    var axch = SelectedChannel();

    if ((_act_vloss!=null) && parseInt(_act_vloss.charAt(axch)) )
    {
      return false;
    }
  }
  return true;
}

function SetLiveBackup(elem)
{
  if( elem && elem.button != null ) {
    elem = null;
  }

  var ch = document.getElementById("channel");

  if ( Auth_CheckCovert( GROUP_AUTH) == false )
  {
    LiveBackupStop();
    //COVERT: "NO VIDEO"
    //if(!isNaN(parseInt(COVERT_DISP)) && parseInt(COVERT_DISP) === 0){
    //  alert(errVideoLossOrNo);
    //COVERT: "COVERT"
    //} else {
      alert(errNoImageCanCapture);
    //}
    return;
  }

  if ( vloss_CheckCovert() == false )
  {
    LiveBackupStop();
    alert(errVideoLossOrNo);
    return;
  }

  var imgelem = this;

  if ( elem )
  {
    imgelem = elem;
  }

  var imgurl = imgelem.getAttribute("src");
  var img_str = imgurl.substring(imgurl.indexOf('images'),imgurl.length);

  var live_backup;

  if (img_str == "images/images/live_bt_backup_p.png")
  {
    if (INFO_PASSWORD_CHECK == '1') {
      var ret = prompt('Please enter password.', '');
      if (ret == null) {
        return false;
      }
      if (ret != get_passwd_name) {
        alert('Invalid password');
        imgelem.setAttribute('src', '../images/images/live_bt_backup_n.png');
        return false;
      }

    }

    live_backup = true;
    liveBackflag = true;
  }
  else
  {
    live_backup = false;
    liveBackflag = false;
  }

	LiveBackup(ch.value, live_backup);
}

function SetLiveBackupStop()
{
	LiveBackupStop();
	liveBackflag = false;
}

function SetLivePrint()
{
	SetPrint();
}

function SetLiveCaptureImage()
{
	if ( vloss_CheckCovert() == false )
  {
    alert(errVideoLossOrNo);
    return;
  }

  if ( Auth_CheckCovert( GROUP_AUTH) == false )
  {
    alert(errVideoCovert);
    return;
  }

	activex = document.getElementById("itxview");

	var ch = -1;

	try {
		ch = activex.GetSelectedChannel();
	} catch(e) {
		if(console && console.log) {
			console.log(e);
		}
	}

	switch(DisplayCapture(ch)) {
    case 0: //no data
      alert(errNoImageCanCapture);
    break;
    case 1: //capture failed.
      alert(errFailSnapshot);
    break;
    case 2: //success
    default:
    break;
  }
}

function SetLiveActiveXSetting()
{
	ActiveXSetup('live');
}

function SetLiveAduio()
{
    var imgelem = document.getElementById("btliveaudio");

	if ( !imgelem )
    {
        return;
    }

	var imgurl = imgelem.getAttribute("src");
	var img_str = imgurl.substring(imgurl.indexOf('images'),imgurl.length);

	var audio_dup;

    if (img_str == "images/images/live_audio_out_p.gif")
    {
        audio_dup = true;
    }
    else
    {
        audio_dup = false;
    }

	SetAduioDuplex(audio_dup);
}

function SetLiveSpeaker()
{
    var imgelem = document.getElementById("btlivespeaker");

    if ( !imgelem )
    {
        return;
    }

    var imgurl = imgelem.getAttribute("src");
		var img_str = imgurl.substring(imgurl.indexOf('images'),imgurl.length);

	var audio_speaker;

   if (img_str == "images/images/live_sound_on_o.png" || img_str == "images/images/live_sound_on_n.png" || img_str == "images/images/live_sound_on_p.png")
   {
        audio_speaker = false;
   }
   else
   {
        audio_speaker = true;
   }
	SetAudioMute(audio_speaker);
}

/******************************************************************/
function display_Channel_onChange()
{
  $("#aux_select").empty();

  if (browerIE)
  {
    var elem = this;

    if (elem.value === '0') {
      $("#aux_select").prop("disabled", true);
      switch (INFO_DVRCHANNEL) {
      case '4':
        SetDisplayMode4();
        break;
      case '8':
        SetDisplayMode9();
        break;
      case '16':
        SetDisplayMode16();
        break;
      default:
          alert("internal error");
        break;
      }
    } else {
      SetDisplayMode1(elem.value);
    }
    if (elem.value === '0') {
      $("#aux_select").empty();
      $("#aux_select").prop("disabled", true);
    }
    auxiliary(elem.value-1);
  }
  else {
    if ($("#channel").val() === '0') {
      $("#aux_select").empty();
      $("#aux_select").prop("disabled", true);
    }
    auxiliary($("#channel").val()-1);
  }
}

function toggle_postSetup(relay_ch, toggle_cmd)
{
  var recvText;
  request = createRequest();

  if (request == null)
  {
    alert("Your Browser does not support Ajax!");
    return;
  }

  request.open("POST", "/cgi-bin/webra_fcgi.fcgi", false);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  var sendbuf;

  var real_ch = parseInt(relay_ch);
  var cam_ch = parseInt(INFO_ALARM_SENSOR["aout_cam"]);

  switch(toggle_cmd)
  {
    case 'relay':
      sendbuf = "action=set_live&menu=live.relay";

      if(cam_ch > 0)
      {
        sendbuf += "&" + "channel" + "=" + escape(real_ch/*+cam_ch*/+16);
      }
      else
      {
        sendbuf += "&" + "channel" + "=" + escape(real_ch);
      }
    break;

    case 'panic':
      sendbuf = "action=set_live&menu=live.panic";
    break;
  }

  $.ajax({
    type: "POST",
    url: "/cgi-bin/webra_fcgi.fcgi",
    data: sendbuf,
    success: function(request)
    {
      if(request != null)
      {
        if(request.indexOf("No Permission Error!") >= 0)
        {
          alert(errNoPermission);
          return;
        }
      }

      else
      {
        alert(errReceive);
      }
    }
  });
}

function live_status_alarm_click()
{
	var elem = this;
	var elemid = elem.id;

  var arr = elemid.split("_");
  var ch = arr[arr.length-1];

	var cl_ch_elem = document.getElementById("channel");

	cl_ch_elem.value = parseInt(ch) + 1 ;

	if (browerIE)
	{
		SetDisplayMode1(parseInt(ch) + 1);
	}
}

function live_status_motion_click()
{
	var elem = this;
	var elemid = elem.id;

        var arr = elemid.split("_");
        var ch = arr[arr.length-1];

	var cl_ch_elem = document.getElementById("channel");

	cl_ch_elem.value = parseInt(ch) + 1 ;

	if (browerIE)
	{
		SetDisplayMode1(parseInt(ch) + 1);
	}
}

function live_status_vloss_click()
{
	var elem = this;
	var elemid = elem.id;

        var arr = elemid.split("_");
        var ch = arr[arr.length-1];

	var cl_ch_elem = document.getElementById("channel");

	cl_ch_elem.value = parseInt(ch) + 1 ;

	if (browerIE)
	{
		SetDisplayMode1(parseInt(ch) + 1);
	}
}

function live_status_recording_click()
{
	var elem = this;
	var elemid = elem.id;

  var arr = elemid.split("_");
  var ch = arr[arr.length-1];

	//var cl_ch_elem = document.getElementById("channel");

	//cl_ch_elem.value = parseInt(ch) + 1 ;

	//if (browerIE)
	//{
	//	SetDisplayMode1(parseInt(ch) + 1);
	//}

  toggle_postSetup(ch, 'panic');
}

function live_alarmout_alarmout_cam_click()
{
  var elem = this;
  var elemid = elem.id;

  var arr = elemid.split("_");
  var ch = arr[arr.length-1];

  var cl_ch_elem = document.getElementById("channel");

  cl_ch_elem.value = parseInt(ch) + 1 ;

  if (browerIE)
  {
    SetDisplayMode1(parseInt(ch) + 1);
  }
}

function live_alarmout_alarmout_click()
{
	var elem = this;
  var elemid = elem.id;

  var arr = elemid.split("_");
  var ch = arr[arr.length-1];

  toggle_postSetup(ch, 'relay');
}

function live_alarmout_alarmout_cam_click()
{
  var elem = this;
  var elemid = elem.id;

  var arr = elemid.split("_");
  var ch = arr[arr.length-1];

   var cl_ch_elem = document.getElementById("channel");

  cl_ch_elem.value = parseInt(ch) + 1 ;

  if (browerIE)
  {
    SetDisplayMode1(parseInt(ch) + 1);
  }
}

function live_status_onmouseover()
{
	var elem = this;

	//elem.style.background = live_status_color[0];
}

function live_status_onmousedown()
{
	var elem = this;

	//elem.style.background = live_status_color[1];
}

function live_status_onmouseout()
{
	var elem = this;

	//elem.style.background = live_status_color[2];
}

function live_status_onmouseup()
{
	var elem = this;

	//elem.style.background = live_status_color[2];
}

function ptzonMouseOver()
{
	var imgelem = this;
  var channel = document.getElementById("channel").value;
  gchannel = parseInt(channel)-1;

	if ( imgelem.id == "focusminus")
	{
    if(gchannel < 0 || (parseInt(support_focus.charAt(gchannel)) == true))
    {
		  imgelem.setAttribute("src", "../images/images/bt_focus_minus_o.gif");
    }
	}
	else if ( imgelem.id == "focusplus")
	{
    if(gchannel < 0 || (parseInt(support_focus.charAt(gchannel)) == true))
    {
		  imgelem.setAttribute("src", "../images/images/bt_focus_plus_o.gif");
    }
	}
	else if ( imgelem.id == "zoomminus")
	{
    if(gchannel < 0 || (parseInt(support_zoom.charAt(gchannel)) == true))
    {
		  imgelem.setAttribute("src", "../images/images/bt_zoom_minus_o.gif");
    }
	}
	else if ( imgelem.id == "zoomplus")
	{
    if(gchannel < 0 || (parseInt(support_zoom.charAt(gchannel)) == true))
    {
		  imgelem.setAttribute("src", "../images/images/bt_zoom_plus_o.gif");
    }
	}
	else if ( imgelem.id == "irisminus")
	{
    if(gchannel < 0 || (parseInt(support_iris.charAt(gchannel)) == true))
    {
		  imgelem.setAttribute("src", "../images/images/bt_iris_minus_o.gif");
    }
	}
	else if ( imgelem.id == "irisplus")
	{
    if(gchannel < 0 || (parseInt(support_iris.charAt(gchannel)) == true))
    {
	    imgelem.setAttribute("src", "../images/images/bt_iris_plus_o.gif");
    }
	}
	else if ( imgelem.id == "ptzupleft")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_up_left_o.png");
	}
	else if ( imgelem.id == "tiltup")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_up_o.png");
	}
	else if ( imgelem.id == "ptzupright")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_up_right_o.png");
	}
	else if ( imgelem.id == "panleft")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_left_o.png");
	}
	else if ( imgelem.id == "panright")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_right_o.png");
	}
	else if ( imgelem.id == "ptzdownleft")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_down_left_o.png");
	}
	else if ( imgelem.id == "tiltdown")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_down_o.png");
	}
	else if ( imgelem.id == "ptzdownright")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_down_right_o.png");
	}
}

function ptzonMouseDown()
{
	var imgelem = this;
  var channel = document.getElementById("channel").value;
  gchannel = parseInt(channel)-1;

	if ( imgelem.id == "focusminus")
	{
    if(gchannel < 0 || (parseInt(support_focus.charAt(gchannel)) == true))
    {
		  imgelem.setAttribute("src", "../images/images/bt_focus_minus_p.gif");
    }
	}
	else if ( imgelem.id == "focusplus")
	{
    if(gchannel < 0 || (parseInt(support_focus.charAt(gchannel)) == true))
    {
		  imgelem.setAttribute("src", "../images/images/bt_focus_plus_p.gif");
    }
	}
	else if ( imgelem.id == "zoomminus")
	{
    if(gchannel < 0 || (parseInt(support_zoom.charAt(gchannel)) == true))
    {
		  imgelem.setAttribute("src", "../images/images/bt_zoom_minus_p.gif");
    }
	}
	else if ( imgelem.id == "zoomplus")
	{
    if(gchannel < 0 || (parseInt(support_zoom.charAt(gchannel)) == true))
    {
		  imgelem.setAttribute("src", "../images/images/bt_zoom_plus_p.gif");
    }
	}
	else if ( imgelem.id == "irisminus")
	{
    if(gchannel < 0 || (parseInt(support_iris.charAt(gchannel)) == true))
    {
      imgelem.setAttribute("src", "../images/images/bt_iris_minus_p.gif");
    }
	}
	else if ( imgelem.id == "irisplus")
	{
    if(gchannel < 0 || (parseInt(support_iris.charAt(gchannel)) == true))
    {
		  imgelem.setAttribute("src", "../images/images/bt_iris_plus_p.gif");
    }
	}
	else if ( imgelem.id == "ptzupleft")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_up_left_p.png");
	}
	else if ( imgelem.id == "tiltup")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_up_p.png");
	}
	else if ( imgelem.id == "ptzupright")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_up_right_p.png");
	}
	else if ( imgelem.id == "panleft")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_left_p.png");
	}
	else if ( imgelem.id == "panright")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_right_p.png");
	}
	else if ( imgelem.id == "ptzdownleft")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_down_left_p.png");
	}
	else if ( imgelem.id == "tiltdown")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_down_p.png");
	}
	else if ( imgelem.id == "ptzdownright")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_down_right_p.png");
	}

	var elem = this;
	var cmd = null;
	var channel = document.getElementById("channel").value;
	var param1 = null, param2 = null;

	var posstep = document.getElementById("posstep").value;
	var presetnum = document.getElementById("preset_sel").value;
  var auxnum = document.getElementById("aux_select").value;

	if(Auth_CheckCovert(GROUP_AUTH) == false)
	{
		alert(errCovertedCh);
		return;
	}

  gchannel = parseInt(channel)-1;


	if (elem.id == 'tiltup')
	{
		cmd = PTZ_CMD_TILT_UP;
		param1 = posstep;
	}
	else if (elem.id == 'panleft')
	{
		cmd = PTZ_CMD_PAN_LEFT;
		param1 = posstep;
	}
	else if (elem.id == 'panright')
	{
		cmd = PTZ_CMD_PAN_RIGHT;
		param1 = posstep;
	}
	else if (elem.id == 'tiltdown')
	{
		cmd = PTZ_CMD_TILT_DOWN;
		param1 = posstep;
	}
	else if (elem.id == 'ptzupleft')
	{
		cmd = PTZ_CMD_PT_LEFT_UP;
		param1 = posstep;
	}
	else if (elem.id == 'ptzdownleft')
	{
		cmd = PTZ_CMD_PT_LEFT_DOWN;
		param1 = posstep;
	}
	else if (elem.id == 'ptzupright')
	{
		cmd = PTZ_CMD_PT_RIGHT_UP;
		param1 = posstep;
	}
	else if (elem.id == 'ptzdownright')
	{
		cmd = PTZ_CMD_PT_RIGHT_DOWN;
		param1 = posstep;
	}
	else if (elem.id == 'focusminus')
	{
    if(gchannel < 0 || (parseInt(support_focus.charAt(gchannel)) == true))
    {
		  cmd = PTZ_CMD_FOCUS_NEAR;
		  param1 = posstep;
    }
	}
	else if (elem.id == 'focusplus')
	{
    if(gchannel < 0 || (parseInt(support_focus.charAt(gchannel)) == true))
    {
		  cmd = PTZ_CMD_FOCUS_FAR;
		  param1 = posstep;
    }
	}
	else if (elem.id == 'zoomminus')
	{
    if(gchannel < 0 || (parseInt(support_zoom.charAt(gchannel)) == true))
    {
		  cmd = PTZ_CMD_ZOOM_WIDE;
		  param1 = posstep;
    }
	}
	else if (elem.id == 'zoomplus')
	{
    if(gchannel < 0 || (parseInt(support_zoom.charAt(gchannel)) == true))
    {
		  cmd = PTZ_CMD_ZOOM_TELE;
		  param1 = posstep;
    }
	}
	else if (elem.id == 'irisminus')
	{
    if(gchannel < 0 || (parseInt(support_iris.charAt(gchannel)) == true))
    {
		  cmd = PTZ_CMD_IRIS_CLOSE;
		  param1 = posstep;
    }
  }
  else if (elem.id == 'irisplus')
  {
    if(gchannel < 0 || (parseInt(support_iris.charAt(gchannel)) == true))
    {
		  cmd = PTZ_CMD_IRIS_OPEN;
		  param1 = posstep;
    }
	}
	else if (elem.id == 'preset_set')
	{
		cmd = PTZ_CMD_SET_PRESET;
		param1 = presetnum;
	}
	else if (elem.id == 'preset_run')
	{
		cmd = PTZ_CMD_GOTO_PRESET;
		param1 = presetnum;
	}
        else if (elem.id == 'aux_run')
        {
		cmd = PTZ_CMD_AUX_RUN;
                param1 = auxnum;
        }
	else
	{
		cmd = PTZ_CMD_STOP;
	}

	gcmd = cmd;
	gparam1 = param1;
	gparam2 = param2;

	//alert(gchannel);
	// live_postSetup(document.livesetting_status, "action=set_live&menu=live.ptz");

  if (browerIE == true){
    var activex = document.getElementById("itxview");
    ptz_ch = activex.GetSelectedChannel();
  } else {
    ptz_ch = parseInt(channel)-1;
  }

  if(ptz_ch < 0
    || (elem.id == 'zoomminus' || elem.id == 'zoomplus') && (parseInt(support_zoom.charAt(gchannel)) == false)
    || (elem.id == 'focusminus' || elem.id == 'focusplus') && (parseInt(support_focus.charAt(gchannel)) == false)
    || (elem.id == 'irisminus' || elem.id == 'irisplus') && (parseInt(support_iris.charAt(gchannel)) == false)
    )
  {
    cmd = PTZ_CMD_STOP;
  }

  ptz_cmd = parseInt(cmd)+24;
	ptz_param1 = 5 * 255 / 100; //100base -> 255base (default: 5) //parseInt(param1)*10;

  if($("#ptz_continuous").is(":checked")) { //if continuous is checked.
    ptz_param1 = parseInt($("#posstep").val()) * 25.5; //100base -> 255base (step->speed)
  }

  ptz_param2 = param2;

  if((cmd != PTZ_CMD_SET_PRESET && cmd != PTZ_CMD_GOTO_PRESET)){
    if(ptz_initflag == false)
      ptz_initflag = true;
  } else if(cmd == PTZ_CMD_AUX_RUN) {
    is_aux_support(gchannel);
  }
	//if(!($("#ptz_continuous").is(":checked"))){
    live_postSetup(document.livesetting_status, "action=set_live&menu=live.ptz");
  //}

}

//continuous ptz - 2013-09-12
function init_ptz()  {
  var http_interval = false;
  $(".ptz_control").mousedown(function() {
    if($('#ptz_continuous').is(":checked")){
      http_ptzhandler();
      http_interval = setInterval(http_ptzhandler, 500);
    }
  });

  $(".ptz_control").mouseup(function() {
    if($('#ptz_continuous').is(":checked")){
      clearInterval(http_interval);
      http_ptzhandler('stop');
      http_interval = false;
      ptz_cmd = -1;
    }
  });

  $('.ptz_control').mouseout(function(){
    clearInterval(http_interval);
    http_ptzhandler('stop');
    http_interval = false;
    ptz_cmd = -1;
  });

	$("#ptz_continuous").change(function(event){
    if($("#ptz_continuous").is(":checked")) {
      $("#lang_ptzPositionStep").text(langArray['LTXT_SPEED']);
    } else {
      $("#lang_ptzPositionStep").text(langArray['LTXT_LIVE_PTZPOSITIONSTEP']);
    }
  });

  $("#ptz_continuous").change();
}

function http_ptzhandler(type) {
  var urlpath = ptz_querymaker(type);

  $.ajax({
    url: urlpath,
    type: 'get'
  })
  .done(function(data) {
    // console.log("success");
    // console.log(data);
  })
  .fail(function() {
    // console.log("error");
  })
  .always(function() {
    // console.log("complete");
  });
}

function ptz_querymaker(type) {
  var timestamp = new Date().getTime();
  var path = "/cgi-bin/webra_fcgi.fcgi?";
	var continuous = $("#ptz_continuous").prop("checked") ? 1: 0;

  if(ptz_ch < 0)
    ptz_ch = -1;

  if(ptz_cmd == undefined) {
    ptz_cmd = PTZ_CMD_STOP;
  }

  if(type == 'stop')  //PTZ STOP
    path = path + "action=set_live&menu=live.ptz&channel="+ ptz_ch +"&cmd=14&param1=&param2="+"&"+timestamp;
	else {//Continuous PTZ START
    path = path + "action=set_live&menu=live.ptz&channel="+ ptz_ch +"&cmd="+ ptz_cmd +"&param1="+ ptz_param1 +"&param2="+ ptz_param2 +"&continuous="+ continuous +"&"+timestamp;
  }

  activex_buff(type);
  return path;
}

function activex_buff(type) {
  var buff; //activex Buffer size
  if(browerIE == true){
    var activex = document.getElementById("itxview");

    if(type == 'stop'){
        buff = setTimeout(function(){
          activex.SetAudioSync(true);
      },30000);
    } else {
      activex.SetAudioSync(false);

      if(buff){
        clearTimeout(buff);
        buff = "";
      }
    }
  }
}

function ptzonMouseOut()
{
	var imgelem = this;

	if ( imgelem.id == "focusminus")
	{
		imgelem.setAttribute("src", "../images/images/bt_focus_minus_n.gif");
	}
	else if ( imgelem.id == "focusplus")
	{
		imgelem.setAttribute("src", "../images/images/bt_focus_plus_n.gif");
	}
	else if ( imgelem.id == "zoomminus")
	{
		imgelem.setAttribute("src", "../images/images/bt_zoom_minus_n.gif");
	}
	else if ( imgelem.id == "zoomplus")
	{
		imgelem.setAttribute("src", "../images/images/bt_zoom_plus_n.gif");
	}
	else if ( imgelem.id == "irisminus")
	{
		imgelem.setAttribute("src", "../images/images/bt_iris_minus_n.gif");
	}
	else if ( imgelem.id == "irisplus")
	{
		imgelem.setAttribute("src", "../images/images/bt_iris_plus_n.gif");
	}
	else if ( imgelem.id == "ptzupleft")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_up_left_n.png");
	}
	else if ( imgelem.id == "tiltup")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_up_n.png");
	}
	else if ( imgelem.id == "ptzupright")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_up_right_n.png");
	}
	else if ( imgelem.id == "panleft")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_left_n.png");
	}
	else if ( imgelem.id == "panright")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_right_n.png");
	}
	else if ( imgelem.id == "ptzdownleft")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_down_left_n.png");
	}
	else if ( imgelem.id == "tiltdown")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_down_n.png");
	}
	else if ( imgelem.id == "ptzdownright")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_down_right_n.png");
	}
}

function ptzMouseUp()
{
	var imgelem = this;
  var channel = document.getElementById("channel").value;
  gchannel = parseInt(channel)-1;

	if ( imgelem.id == "focusminus")
	{
    if(gchannel < 0 || (parseInt(support_focus.charAt(gchannel)) == true))
    {
		  imgelem.setAttribute("src", "../images/images/bt_focus_minus_o.gif");
    }
	}
	else if ( imgelem.id == "focusplus")
	{
    if(gchannel < 0 || (parseInt(support_focus.charAt(gchannel)) == true))
    {
		  imgelem.setAttribute("src", "../images/images/bt_focus_plus_o.gif");
    }
	}
	else if ( imgelem.id == "zoomminus")
	{
    if(gchannel < 0 || (parseInt(support_zoom.charAt(gchannel)) == true))
    {
		  imgelem.setAttribute("src", "../images/images/bt_zoom_minus_o.gif");
    }
	}
	else if ( imgelem.id == "zoomplus")
	{
    if(gchannel < 0 || (parseInt(support_zoom.charAt(gchannel)) == true))
    {
		  imgelem.setAttribute("src", "../images/images/bt_zoom_plus_o.gif");
    }
	}
	else if ( imgelem.id == "irisminus")
	{
    if(gchannel < 0 || (parseInt(support_iris.charAt(gchannel)) == true))
    {
		  imgelem.setAttribute("src", "../images/images/bt_iris_minus_o.gif");
    }
	}
	else if ( imgelem.id == "irisplus")
	{
    if(gchannel < 0 || (parseInt(support_iris.charAt(gchannel)) == true))
    {
		  imgelem.setAttribute("src", "../images/images/bt_iris_plus_o.gif");
    }
	}
	else if ( imgelem.id == "ptzupleft")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_up_left_o.png");
	}
	else if ( imgelem.id == "tiltup")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_up_o.png");
	}
	else if ( imgelem.id == "ptzupright")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_up_right_o.png");
	}
	else if ( imgelem.id == "panleft")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_left_o.png");
	}
	else if ( imgelem.id == "panright")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_right_o.png");
	}
	else if ( imgelem.id == "ptzdownleft")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_down_left_o.png");
	}
	else if ( imgelem.id == "tiltdown")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_down_o.png");
	}
	else if ( imgelem.id == "ptzdownright")
	{
		imgelem.setAttribute("src", "../images/images/bt_ptz_down_right_o.png");
	}
}

function live_log_display(start, end)
{
	var year, month, day, hour, minute, second;

	logdispclear();

	if ( parseInt(start) > parseInt(end) )
	{
		return;
	}

	log_curr_pos[0] = start;
	log_curr_pos[1] = end;

	for (var i = parseInt(start); i <= parseInt(end); i++)
	{
	    if ( parseInt(log_ch[i]) >=  parseInt(INFO_DVRCHANNEL) )
	    {
	        continue;
	    }
		year = log_year[i];
		month = log_mon[i];
		day = log_day[i];
		hour = log_hour[i];
		minute = log_min[i];
		second = log_second[i];

		if (parseInt(month) + 1 < 10)
		{
			month = '0' + (parseInt(month) + 1);
		}
		else
		{
		    month = (parseInt(month) + 1);
		}

		if (day < 10)
		{
			day = '0' + day;
		}

		if (hour < 10)
		{
			hour = '0' + hour;
		}

		if (minute < 10)
		{
			minute = '0' + minute;
		}

		if (second < 10)
		{
			second = '0' + second;
		}

		var strdisp = year + "." + month + "." + day + "&nbsp;&nbsp;" + hour + ":" + minute + ":" + second;

		var dispWindow = document.getElementById("logtbdate"+ (parseInt(i) % parseInt(logtbsize)) );

		replaceHTML(dispWindow, strdisp);

		dispWindow = document.getElementById("logtblog"+ (parseInt(i) % parseInt(logtbsize)) );

		replaceHTML(dispWindow, log_text[i]);

		dispWindow = document.getElementById("logtbnum"+ (parseInt(i) % parseInt(logtbsize)) );

		replaceHTML(dispWindow, parseInt(i)+1);

		dispWindow = document.getElementById("logtbcam"+ (parseInt(i) % parseInt(logtbsize)) );

		if ( log_cam_title_flag[i] == true )
		{
		    replaceText(dispWindow, camTitle[parseInt(log_ch[i])]);
		}
		else
		{
		    replaceText(dispWindow, "");
		}
	}
}

function logdispclear()
{
	for (var i = 0; i < parseInt(logtbsize); i++)
	{
		var dispWindow = document.getElementById("logtbdate"+ (parseInt(i)) );

		clearText(dispWindow);

		dispWindow = document.getElementById("logtblog"+ (parseInt(i)) );

		clearText(dispWindow);

		dispWindow = document.getElementById("logtbnum"+ (parseInt(i)) );

		clearText(dispWindow);

		dispWindow = document.getElementById("logtbcam"+ (parseInt(i)) );

		clearText(dispWindow);
	}
}

function pagedownbtn()
{
	if ( parseInt(log_curr_pos[1]) >= parseInt(log_result_count) - 1)
	{
		return;
	}

	if ( parseInt(log_curr_pos[1]) + parseInt(logtbsize) >= (parseInt(log_result_count) - 1) )
	{
		live_log_display(parseInt(log_curr_pos[0]) + parseInt(logtbsize), parseInt(log_result_count) - 1);
	}
	else
	{
		live_log_display(parseInt(log_curr_pos[0]) + parseInt(logtbsize), parseInt(log_curr_pos[1]) + parseInt(logtbsize));
	}
}

function pageupbtn()
{
	if ( parseInt(log_curr_pos[0]) <= 0 )
	{
		return;
	}

	if ( parseInt(log_curr_pos[1]) == ( parseInt(log_result_count) - 1 ))
	{
		live_log_display(parseInt(log_curr_pos[0]) - parseInt(logtbsize), parseInt(log_curr_pos[1]) - (parseInt(log_curr_pos[1]) % parseInt(logtbsize) + 1) );
	}
	else
	{
		live_log_display(parseInt(log_curr_pos[0]) - parseInt(logtbsize), parseInt(log_curr_pos[1]) - parseInt(logtbsize) );
	}

}

function onClickLogTable(elem)
{

}

function live_audio_ch_change()
{
    var elem = this.value;


}

function OnLiveMouseOver(e)
{
	var imgelem = this;

	if (!rightmouseclickdown(e))
	{
	    return;
	}

	if ( imgelem.id == "division1")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_screen_01_o.png");
	}
	else if ( imgelem.id == "division4")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_screen_04_o.png");
	}
	else if ( imgelem.id == "division8")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_screen_08_o.png");
	}
	else if ( imgelem.id == "division9")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_screen_09_o.png");
	}
	else if ( imgelem.id == "division16")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_screen_16_o.png");
	}
	else if ( imgelem.id == "btpageset")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_page_set_o.png");
	}
	else if ( imgelem.id == "btpageone")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_page_one_o.png");
	}
	else if ( imgelem.id == "btpagefull")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_page_full_o.png");
	}
	else if ( imgelem.id == "btzoomin")
  {
    imgelem.setAttribute("src", "../images/images/live_bt_zoom_in_o.png");
  }
	else if ( imgelem.id == "btliveaudio")
	{
		var imgurl = imgelem.getAttribute("src");
		var img_str = imgurl.substring(imgurl.indexOf('images'),imgurl.length);

	    if (img_str == "images/images/live_audio_out_n.png")
	    {
	       imgelem.setAttribute("src", "../images/images/live_audio_out_o.png");
	    }
	}
	else if ( imgelem.id == "btlivespeaker")
	{
		var imgurl = imgelem.getAttribute("src");
		var img_str = imgurl.substring(imgurl.indexOf('images'),imgurl.length);

	  if (img_str == "images/images/live_sound_off_n.png" || img_str == "images/images/live_sound_off_p.png")
	  {
	    imgelem.setAttribute("src", "../images/images/live_sound_off_o.png");
	  }
	  else
	  {
		  imgelem.setAttribute("src", "../images/images/live_sound_on_o.png");
		}
	}
	else if ( imgelem.id == "btbackup")
	{
		if ( Auth_CheckCovert( GROUP_AUTH) == false || vloss_CheckCovert() == false)
		{
			imgelem.setAttribute("src", "../images/images/live_bt_backup_o.png");
			return;
		}
	    var imgurl = imgelem.getAttribute("src");
		var img_str = imgurl.substring(imgurl.indexOf('images'),imgurl.length);

	    if (img_str == "images/images/live_bt_backup_n.png")
	    {
	       imgelem.setAttribute("src", "../images/images/live_bt_backup_o.png");
	    }
	}
	else if ( imgelem.id == "btprint")
	{
		imgelem.setAttribute("src", "../images/images/live_print_bt_backup_o.png");
	}
	else if ( imgelem.id == "btcaptureimage")
	{
		imgelem.setAttribute("src", "../images/images/live_capture_bt_backup_o.png");
	}
	else if ( imgelem.id == "btsetting")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_setting_o.png");
	}
}

function OnLiveMouseOut(e)
{
	var imgelem = this;

	if (!rightmouseclickdown(e))
	{
	    return;
	}

	if ( imgelem.id == "division1")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_screen_01_n.png");
	}
	else if ( imgelem.id == "division4")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_screen_04_n.png");
	}
	else if ( imgelem.id == "division8")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_screen_08_n.png");
	}
	else if ( imgelem.id == "division9")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_screen_09_n.png");
	}
	else if ( imgelem.id == "division16")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_screen_16_n.png");
	}
	else if ( imgelem.id == "btpageset")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_page_set_n.png");
	}
	else if ( imgelem.id == "btpageone")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_page_one_n.png");
	}
	else if ( imgelem.id == "btpagefull")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_page_full_n.png");
	}
	else if ( imgelem.id == "btzoomin")
  {
    imgelem.setAttribute("src", "../images/images/live_bt_zoom_in_n.png");
  }
	else if ( imgelem.id == "btliveaudio")
	{
		var imgurl = imgelem.getAttribute("src");
		var img_str = imgurl.substring(imgurl.indexOf('images'),imgurl.length);

	    if (img_str != "images/images/live_audio_out_p.png")
	    {
	       imgelem.setAttribute("src", "../images/images/live_audio_out_n.png");
	    }
	}
	else if ( imgelem.id == "btlivespeaker")
	{
		var imgurl = imgelem.getAttribute("src");
		var img_str = imgurl.substring(imgurl.indexOf('images'),imgurl.length);

	    if (img_str == "images/images/live_sound_off_o.png" || img_str == "images/images/live_sound_off_p.png")
	    {
	       imgelem.setAttribute("src", "../images/images/live_sound_off_n.png");
	    }
	    else
	    {
		    imgelem.setAttribute("src", "../images/images/live_sound_on_n.png");
		}
	}
	else if ( imgelem.id == "btbackup")
	{
		if ( Auth_CheckCovert( GROUP_AUTH) == false || vloss_CheckCovert() == false)
		{
			imgelem.setAttribute("src", "../images/images/live_bt_backup_n.png");
			return;
		}
	    var imgurl = imgelem.getAttribute("src");
		var img_str = imgurl.substring(imgurl.indexOf('images'),imgurl.length);

	    if (img_str != "images/images/live_bt_backup_p.png")
	    {
	       imgelem.setAttribute("src", "../images/images/live_bt_backup_n.png");
	    }
	}
	else if ( imgelem.id == "btprint")
	{
		imgelem.setAttribute("src", "../images/images/live_print_bt_backup_n.png");
	}
	else if ( imgelem.id == "btcaptureimage")
	{
		imgelem.setAttribute("src", "../images/images/live_capture_bt_backup.png");
	}
	else if ( imgelem.id == "btsetting")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_setting_n.png");
	}
}

function OnLiveMouseDown(e)
{
	var imgelem = this;

	if (!rightmouseclickdown(e))
	{
	    return;
	}

	if ( imgelem.id == "division1")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_screen_01_p.png");
	}
	else if ( imgelem.id == "division4")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_screen_04_p.png");
	}
	else if ( imgelem.id == "division8")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_screen_08_p.png");
	}
	else if ( imgelem.id == "division9")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_screen_09_p.png");
	}
	else if ( imgelem.id == "division16")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_screen_16_p.png");
	}
	else if ( imgelem.id == "btpageset")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_page_set_p.png");
	}
	else if ( imgelem.id == "btpageone")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_page_one_p.png");
	}
	else if ( imgelem.id == "btpagefull")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_page_full_p.png");
	}
	else if ( imgelem.id == "btzoomin")
  {
    imgelem.setAttribute("src", "../images/images/live_bt_zoom_in_p.png");
  }
	else if ( imgelem.id == "btliveaudio")
	{
		var imgurl = imgelem.getAttribute("src");
		var img_str = imgurl.substring(imgurl.indexOf('images'),imgurl.length);

	    if (img_str != "images/images/live_audio_out_o.png")
	    {
	       imgelem.setAttribute("src", "../images/images/live_audio_out_n.png");
	    }
	    else
	    {
		    imgelem.setAttribute("src", "../images/images/live_audio_out_p.png");
		}
		SetLiveAduio();
	}
	else if ( imgelem.id == "btlivespeaker")
	{
		var imgurl = imgelem.getAttribute("src");
		var img_str = imgurl.substring(imgurl.indexOf('images'),imgurl.length);

	    if (img_str == "images/images/live_sound_off_o.png")
	    {
	       imgelem.setAttribute("src", "../images/images/live_sound_on_p.png");
	    }
	    else
	    {
		    imgelem.setAttribute("src", "../images/images/live_sound_off_p.png");
		}
	}
	else if ( imgelem.id == "btbackup")
	{
		if ( Auth_CheckCovert( GROUP_AUTH) == false || vloss_CheckCovert() == false)
		{
			imgelem.setAttribute("src", "../images/images/live_bt_backup_p.png");
			return;
		}

	    var imgurl = imgelem.getAttribute("src");
		var img_str = imgurl.substring(imgurl.indexOf('images'),imgurl.length);

/*	    if (imgurl != "../images/images/live_bt_backup_o.png") */
	    if (img_str != "images/images/live_bt_backup_o.png")
	    {
	       imgelem.setAttribute("src", "../images/images/live_bt_backup_n.png");
	    }
	    else
	    {
		    imgelem.setAttribute("src", "../images/images/live_bt_backup_p.png");
		}
		SetLiveBackup(imgelem);
	}
	else if ( imgelem.id == "btprint")
	{
		imgelem.setAttribute("src", "../images/images/live_print_bt_backup_p.png");
	}
	else if ( imgelem.id == "btcaptureimage")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_snapshot_p.gif");
	}
	else if ( imgelem.id == "btsetting")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_setting_p.gif");
	}
}

function is_aux_support(ch) {
  if( INFO_MODEL.indexOf("IPX") < 0 ) {
    return;
  }
  if(ch == -1)
    alert(errAuxSelectChannel);
  is_aux = $.ajax({
    type: "POST",
    url: "/cgi-bin/webra_fcgi.fcgi",
    async: false,
    data: 'action=get_ptz&menu=auxiliary.support&chno='+(ch),
    success: function(response) {
      var arr = encode_to_array(response);
      if(arr['aux'] == 0) {
          alert(errAuxSupport);
      }
      else {
          live_postSetup(document.livesetting_status, "action=get_ptz&menu=auxiliary.send&chno="+ch +"&cmd="+$("#aux_select").val());
      }

    },
    fail:function(response) {

    }
  });
}
function auxiliary(ch) {
  if( INFO_MODEL.indexOf("IPX") < 0 ) {
    return;
  }
  $.ajax({
    type: "POST",
    url: "/cgi-bin/webra_fcgi.fcgi",
    async: false,
    data: 'action=get_ptz&menu=auxiliary.support&chno='+(ch),
    success: function(response) {
      var arr = encode_to_array(response);
      $("#aux_select").empty();
      if(arr['aux'] == 0) {
        $("#aux_select").empty();
        $("#aux_select").attr("disabled", true);
        return;
      }
      else {
        $("#aux_select").prop("disabled", false);
      }
      $.ajax({
        type: "POST",
        url: "/cgi-bin/webra_fcgi.fcgi",
        async: false,
        data: 'action=get_ptz&menu=auxiliary.search&chno='+(ch),
        success: function(response) {
          var array = encode_to_array(response);
          var length = $("#aux_select").size();

          for(var i = 0; array['aux'+i] != null; i++) {
              $("#aux_select").append("<option value='" + i + "'>"+array['aux'+i]+"</option>");
          }
        },
        fail: function(response) {
        }
      });
    },
    fail: function(response) {
    }
  });

}

function live_ptzinit()
{

  if( INFO_MODEL.indexOf("IPX") >= 0 ) {
    $(".foripx").show();
  }
  else {
    $(".foripx").hide();
  }
  if($("#channel").val() != 0) {
    auxiliary($("#channel").val()-1);
  }
  else {
    $("#aux_select").empty();
    $("#aux_select").prop("disabled", true);
  }

	var focusminus = document.getElementById("focusminus");
	var focusplus = document.getElementById("focusplus");
	var zoomminus = document.getElementById("zoomminus");
	var zoomplus = document.getElementById("zoomplus");
	var irisminus = document.getElementById("irisminus");
	var irisplus = document.getElementById("irisplus");
	var ptzupleft = document.getElementById("ptzupleft");
	var tiltup = document.getElementById("tiltup");
	var ptzupright = document.getElementById("ptzupright");
	var panleft = document.getElementById("panleft");
	var panright = document.getElementById("panright");
	var ptzdownleft = document.getElementById("ptzdownleft");
	var tiltdown = document.getElementById("tiltdown");
	var ptzdownright = document.getElementById("ptzdownright");
	var preset_set = document.getElementById("preset_set");
	var preset_run = document.getElementById("preset_run");
	var aux_run = document.getElementById("aux_run");
  var live_on = document.getElementById("liveJpegDiv");

	focusminus.onmousedown = ptzonMouseDown;
	focusplus.onmousedown = ptzonMouseDown;
	zoomminus.onmousedown = ptzonMouseDown;
	zoomplus.onmousedown = ptzonMouseDown;
	irisminus.onmousedown = ptzonMouseDown;
	irisplus.onmousedown = ptzonMouseDown;
	ptzupleft.onmousedown = ptzonMouseDown;
	tiltup.onmousedown = ptzonMouseDown;
	ptzupright.onmousedown = ptzonMouseDown;
	panleft .onmousedown = ptzonMouseDown;
	panright.onmousedown = ptzonMouseDown;
	ptzdownleft.onmousedown = ptzonMouseDown;
	tiltdown.onmousedown = ptzonMouseDown;
	ptzdownright.onmousedown = ptzonMouseDown;
	preset_set.onclick = ptzonMouseDown;	// choissi FIXME
	preset_run.onclick = ptzonMouseDown;
  aux_run.onclick = ptzonMouseDown;
  live_on.onclick = ptzonMouseDown;

	focusminus.onmouseover = ptzonMouseOver;
	focusplus.onmouseover = ptzonMouseOver;
	zoomminus.onmouseover = ptzonMouseOver;
	zoomplus.onmouseover = ptzonMouseOver;
	irisminus.onmouseover = ptzonMouseOver;
	irisplus.onmouseover = ptzonMouseOver;
	ptzupleft.onmouseover = ptzonMouseOver;
	tiltup.onmouseover = ptzonMouseOver;
	ptzupright.onmouseover = ptzonMouseOver;
	panleft .onmouseover = ptzonMouseOver;
	panright.onmouseover = ptzonMouseOver;
	ptzdownleft.onmouseover = ptzonMouseOver;
	tiltdown.onmouseover = ptzonMouseOver;
	ptzdownright.onmouseover = ptzonMouseOver;
	preset_set.onmouseover = ptzonMouseOver;
	preset_run.onmouseover = ptzonMouseOver;

	focusminus.onmouseup = ptzMouseUp;
	focusplus.onmouseup = ptzMouseUp;
	zoomminus.onmouseup = ptzMouseUp;
	zoomplus.onmouseup = ptzMouseUp;
	irisminus.onmouseup = ptzMouseUp;
	irisplus.onmouseup = ptzMouseUp;
	ptzupleft.onmouseup = ptzMouseUp;
	tiltup.onmouseup = ptzMouseUp;
	ptzupright.onmouseup = ptzMouseUp;
	panleft .onmouseup = ptzMouseUp;
	panright.onmouseup = ptzMouseUp;
	ptzdownleft.onmouseup = ptzMouseUp;
	tiltdown.onmouseup = ptzMouseUp;
	ptzdownright.onmouseup = ptzMouseUp;
	preset_set.onmouseup = ptzMouseUp;
	preset_run.onmouseup = ptzMouseUp;

	focusminus.onmouseout = ptzonMouseOut;
	focusplus.onmouseout = ptzonMouseOut;
	zoomminus.onmouseout = ptzonMouseOut;
	zoomplus.onmouseout = ptzonMouseOut;
	irisminus.onmouseout = ptzonMouseOut;
	irisplus.onmouseout = ptzonMouseOut;
	ptzupleft.onmouseout = ptzonMouseOut;
	tiltup.onmouseout = ptzonMouseOut;
	ptzupright.onmouseout = ptzonMouseOut;
	panleft .onmouseout = ptzonMouseOut;
	panright.onmouseout = ptzonMouseOut;
	ptzdownleft.onmouseout = ptzonMouseOut;
	tiltdown.onmouseout = ptzonMouseOut;
	ptzdownright.onmouseout = ptzonMouseOut;
	preset_set.onmouseout = ptzonMouseOut;
	preset_run.onmouseout = ptzonMouseOut;

}

function live_status_image_change(dElem, tElem, tElemId)
{
	if (!dElem || !tElem )
	{
		return;
	}

	//var pElem = dElem.parentNode;
  var pElem = document.getElementById(dElem.id).parentNode;

	if (pElem.childNodes)
	{
		for (var i = pElem.childNodes.length; i > 0; i--)
		{
			var childNode = pElem.childNodes[i-1];

			if ( childNode.src == tElem.src )
			{
				return;
			}

			pElem.removeChild(childNode);
		}
	}

	tElem.id = tElemId;

	pElem.appendChild(tElem);
}
/******************************************************************/
/*live status Get/Set************************************************/
var speakerinit = false;
var INTERVAL_LOCALTIME = 0;
var orig_camtitle = null;

function live_update_status(recvText)
{
  var thisform = document.livesetting_status;
  var recvdata = recv_encode(recvText);

  if (recvText == '') {
    return;
  }
  if (!authCheck) {
    authCheck = new AuthCheck();
    authCheck.reset(recvdata, undefined,
        function() { // before
          $("#itxview").css('display', 'none');
        },
        function() { // after
          $("#itxview").css('display', 'inline')
        }
    );
    authCheck = true;
  }

  //if recvdata is null, then exit.
  //if(recvdata == null)
  //{
  //  return;
  //}
  valUpdate(recvdata, "");
  AuthorityCheck('search');
  AuthorityCheck('setup');

  SetCamTitle();

  INTERVAL_LOCALTIME = recvdata["curr_gmttime"];
  USER_AUTH = recvdata["user_auth"];
  GROUP_AUTH = recvdata["login_group"];
  UCOVERT = recvdata["covert"];
  COVERT_DISP = recvdata["covert_disp"];
  var num_alarm_cam = parseInt(INFO_ALARM_SENSOR["aout_cam"]);
  var num_alarm_dvr = parseInt(INFO_ALARM_SENSOR["aout_dvr"]);
  var num_sensor_cam = parseInt(INFO_ALARM_SENSOR["ain_cam"]);
  var num_sensor_dvr = parseInt(INFO_ALARM_SENSOR["ain_dvr"]);

  if (INFO_MODEL.indexOf("IPX") >= 0) {
  } else {
    $('.alarm_cam').hide();
  }
  var relay_op_type = recvdata["op_type"];

  var act_alarm = recvdata["act_alarm"];
  var act_alarm_dvr = recvdata["act_alarm_dvr"];
  var rise_alarm = recvdata["rise_alarm"];
  var rise_alarm_dvr = recvdata["rise_alarm_dvr"];
  var act_alarm_out = recvdata["act_alarm_out"];
  var act_alarm_out_dvr = recvdata["act_alarm_out_dvr"];
  var rise_alarm_out = recvdata["rise_alarm_out"];
  var rise_alarm_out_dvr = recvdata["rise_alarm_out_dvr"];
  var act_motion = recvdata["act_motion"];
  var act_vloss = recvdata["act_vloss"];
  var act_recording = recvdata["act_recording"];
  var rise_motion = recvdata["rise_motion"];
  var rise_vloss = recvdata["rise_vloss"];
  var rise_novideo = recvdata["rise_novideo"];
  var act_vid_valid = recvdata["act_vid_valid"];
  var act_novideo = recvdata["act_novideo"];
  var rise_vid_valid = recvdata["rise_vid_valid"];

  if(isNVR()) {
    support_zoom = recvdata["support_zoom"];
    support_focus = recvdata["support_focus"];
    support_iris = recvdata["support_iris"];
  }
  else {
    support_zoom = "1111111111111111";
    support_focus = "1111111111111111";
    support_iris = "1111111111111111";
  }

  if (!act_alarm && !!act_alarm_dvr && act_motion && !act_vloss && !act_recording && !act_alarm_out && !act_alarm_out_dvr &&
      !rise_alarm && !rise_motion && !rise_vloss && !rise_alarm_out )
  {
    return;
  }
  _act_vloss = act_vloss;
  if (browerIE == true)
  {
    SetCovertSetting(act_vloss);
  }
  if (!act_recording)
  {
    act_recording = "                ";
  }
  if (!rise_alarm)
  {
    rise_alarm = "0000000000000000";
  }
  if (!rise_motion)
  {
    rise_motion = "0000000000000000";
  }
  if (!rise_vloss)
  {
    rise_vloss = "0000000000000000";
  }
  if (!rise_vid_valid)
  {
    rise_vid_valid = "0000000000000000";
  }
  if (!rise_alarm_out)
  {
    rise_alarm_out = "0000000000000000";
  }
  if (!support_iris)
  {
    support_iris = "0000000000000000";
  }

  var alarm_name = "ar_img_";
  var alarm_dvr_name = "ar_dvr_img_";
  var motion_name = "mt_img_";
  var vloss_name = "vloss_img_";
  var rec_name = "rec_img_";
  var arout_name = "arout_img_";
  var arout_dvr_name = "arout_dvr_img_";
  //var relay_name = "relay_img_";
  for (var ch = 0; ch < INFO_DVRCHANNEL; ch++)
  {
    var alarm_elem = document.getElementById(alarm_name+ch);
    var alarm_dvr_elem = document.getElementById(alarm_dvr_name+ch);
    var motion_elem = document.getElementById(motion_name+ch);
    var vloss_elem = document.getElementById(vloss_name+ch);
    var recording_elem = document.getElementById(rec_name+ch);
    var alarm_out_elem = document.getElementById(arout_name+ch);
    var alarm_out_dvr_elem = document.getElementById(arout_dvr_name+ch);

    var img_off_alarm;
    var img_off_alarm_dvr;
    var img_off_motion;
    var img_off_video_loss;
    var img_off_rec;
    var img_off_alarm_out;
    var img_off_alarm_out_dvr;

    var img_on_alarm;
    var img_on_alarm_dvr;
    var img_on_motion;
    var img_on_video_loss;
    var img_on_alarm_out;
    var img_on_alarm_out_dvr;

    var img_on_rec_alarm;
    var img_on_rec_motion;
    var img_on_rec_panic;
    var img_on_rec_prerecord;
    var img_on_rec_timer;


    var num = '02';
    if ( ( (parseInt(ch) >= 0) && (parseInt(ch) < 4) ) || ( (parseInt(ch) >= 8) && (parseInt(ch) < 12) ) )
    {
      num = '01';
      img_off_alarm 			= clone(img_off_alarm_01);
      img_off_alarm_dvr 		= clone(img_off_alarm_01);
      img_off_motion          = clone(img_off_motion_01);
      img_off_video_loss      = clone(img_off_video_loss_01);
      img_off_rec	        	= clone(img_off_rec_01);
      img_off_alarm_out       = clone(img_off_alarm_out_01);
      img_off_alarm_out_dvr   = clone(img_off_alarm_out_01);

      img_on_alarm     		= clone(img_on_alarm_01);
      img_on_alarm_dvr 		= clone(img_on_alarm_01);
      img_on_motion          	= clone(img_on_motion_01);
      img_on_video_loss      	= clone(img_on_video_loss_01);
      img_on_alarm_out       	= clone(img_on_alarm_out_01);
      img_on_alarm_out_dvr     	= clone(img_on_alarm_out_01);

      img_on_rec_alarm		= clone(img_on_rec_alarm_01	);
      img_on_rec_motion		= clone(img_on_rec_motion_01);
      img_on_rec_panic		= clone(img_on_rec_panic_01	);
      img_on_rec_prerecord	= clone(img_on_rec_prerecord_01);
      img_on_rec_timer		= clone(img_on_rec_timer_01	);
    }
    else
    {
      num = '02';
      img_off_alarm     		= clone(img_off_alarm_02);
      img_off_alarm_dvr 		= clone(img_off_alarm_02);
      img_off_motion          = clone(img_off_motion_02);
      img_off_video_loss      = clone(img_off_video_loss_02);
      img_off_rec	        	= clone(img_off_rec_02);
      img_off_alarm_out       = clone(img_off_alarm_out_02);
      img_off_alarm_out_dvr   = clone(img_off_alarm_out_02);

      img_on_alarm     		= clone(img_on_alarm_02);
      img_on_alarm_dvr 		= clone(img_on_alarm_02);
      img_on_motion          	= clone(img_on_motion_02);
      img_on_video_loss      	= clone(img_on_video_loss_02);
      img_on_alarm_out       	= clone(img_on_alarm_out_02);
      img_on_alarm_out_dvr     	= clone(img_on_alarm_out_02);

      img_on_rec_alarm		= clone(img_on_rec_alarm_02	);
      img_on_rec_motion		= clone(img_on_rec_motion_02);
      img_on_rec_panic		= clone(img_on_rec_panic_02	);
      img_on_rec_prerecord	= clone(img_on_rec_prerecord_02);
      img_on_rec_timer		= clone(img_on_rec_timer_02	);

    }

    if ( (parseInt(rise_alarm.charAt(ch)) == 1) || ((act_alarm!=null) && (parseInt(act_alarm.charAt(ch)) == 1)) )
    {
      live_status_image_change(alarm_elem, img_on_alarm, 'ar_img_'+ch);
    }
    else
    {
      live_status_image_change(alarm_elem, img_off_alarm, 'ar_img_'+ch);
    }

    if ( ((rise_alarm_dvr != null) && (parseInt(rise_alarm_dvr.charAt(ch)) == 1)) || ( (act_alarm_dvr != null) && (parseInt(act_alarm_dvr.charAt(ch)) == 1)) )
    {
      live_status_image_change(alarm_dvr_elem, img_on_alarm_dvr, 'ar_dvr_img_'+ch);
    }
    else
    {
      live_status_image_change(alarm_dvr_elem, img_off_alarm_dvr, 'ar_dvr_img_'+ch);
    }


    if ( (parseInt(rise_motion.charAt(ch)) == 1) || ((act_motion!=null) && (parseInt(act_motion.charAt(ch)) == 1)) )
    {
      live_status_image_change(motion_elem, img_on_motion, 'mt_img_'+ch);
    }
    else
    {
      live_status_image_change(motion_elem, img_off_motion, 'mt_img_'+ch);
    }

    var cv = AuthCh_CheckCovert(GROUP_AUTH, ch);
    if(cv == false) {
      if ( (parseInt(rise_vid_valid.charAt(ch)) == 1) || ((act_vid_valid!=null) && (parseInt(act_vid_valid.charAt(ch)) == 1)) )
      {
        live_status_image_change(vloss_elem, img_on_video_loss, 'vloss_img_'+ch);
        noVideo(ch, true, true, invalidVideoOSDMsg, 0 /*invalid video flag*/);
      }
      else if ( ((rise_novideo != null) && (parseInt(rise_novideo.charAt(ch)) == 1)) || ((act_novideo!=null) && (parseInt(act_novideo.charAt(ch)) == 1)) ) {
        live_status_image_change(vloss_elem, img_on_video_loss, 'vloss_img_'+ch);
        noVideo(ch, true, true, noVideoOSDMsg, 1 /*novideo flag*/);
      }
      else if ( (parseInt(rise_vloss.charAt(ch)) == 1) || ((act_vloss!=null) && (parseInt(act_vloss.charAt(ch)) == 1)) )
      {
        live_status_image_change(vloss_elem, img_on_video_loss, 'vloss_img_'+ch);
        noVideo(ch, true, true, langArray['LTXT_LIVE_VIDEOLOSS'], 2 /*video loss flag*/);
      }
      else
      {
        live_status_image_change(vloss_elem, img_off_video_loss, 'vloss_img_'+ch);
        noVideo(ch, false, true, noVideoOSDMsg);
      }
    }

    if ( (parseInt(rise_alarm_out.charAt(ch)) == 1) || ((act_alarm_out!=null) && (parseInt(act_alarm_out.charAt(ch)) == 1)) )
    {
      live_status_image_change(alarm_out_elem, img_on_alarm_out, 'arout_img_'+ch);
    }
    else
    {
      live_status_image_change(alarm_out_elem, img_off_alarm_out, 'arout_img_'+ch);
    }

    if ( ((rise_alarm_out_dvr!=null) && (parseInt(rise_alarm_out_dvr.charAt(ch)) == 1)) || ((act_alarm_out_dvr!=null) && (parseInt(act_alarm_out_dvr.charAt(ch)) == 1)) )
    {
      live_status_image_change(alarm_out_dvr_elem, img_on_alarm_out_dvr, 'arout_dvr_img_'+ch);
    }
    else
    {
      live_status_image_change(alarm_out_dvr_elem, img_off_alarm_out_dvr, 'arout_dvr_img_'+ch);
    }

    if (act_recording.charAt(ch) == 'A')
    {
      live_status_image_change(recording_elem, img_on_rec_alarm, 'rec_img_'+ch);
    }
    else if (act_recording.charAt(ch) == 'M')
    {
      live_status_image_change(recording_elem, img_on_rec_motion, 'rec_img_'+ch);
    }
    else if (act_recording.charAt(ch) == 'P')
    {
      live_status_image_change(recording_elem, img_on_rec_panic, 'rec_img_'+ch);
    }
    else if (act_recording.charAt(ch) == 'p')
    {
      live_status_image_change(recording_elem, img_on_rec_prerecord, 'rec_img_'+ch);
    }
    else if (act_recording.charAt(ch) == 'T')
    {
      live_status_image_change(recording_elem, img_on_rec_timer, 'rec_img_'+ch);
    }
    else if (act_recording.charAt(ch) == ' ')
    {
      live_status_image_change(recording_elem, img_off_rec, 'rec_img_'+ch);
    }
  }
  if ( speakerinit == false )
  {
    SetLiveSpeaker();
    SetLiveAduio();
    speakerinit = true;
  }
}

function live_update_ptz(recvText)
{
	gchannel = null;
	gcmd = null;
	gparam1 = null;
	gparam2 = null;
}

function live_update_log(recvText)
{
	var recvdata = recv_encode(recvText);

	if ( recvdata == null )
	{
		return;
	}

	for (var ch = 0; ch < INFO_DVRCHANNEL; ch++)
	{
		camTitle[ch] = INFO_CAMTITLE[ch];
	}

	log_result_count = recvdata["result_count"];

	if (parseInt(log_result_count) == 0)
	{
		logdispclear();
	}
/*
	&log = text_type|text_p1aram|text_p2aram|text_logid|text_text
	&date = year|month|day|hour|minute|second
*/
	for (var i = 0; i < parseInt(log_result_count); ++i)
	{
		var k = parseInt(log_result_count) - 1 - parseInt(i);

		var logdata = comma_encode(recvdata["log"+k]);
		var datedata = comma_encode(recvdata["date"+k]);

		var log_type = logdata[0];
		var log_param1 = logdata[1];
		var log_param2 = logdata[2];
		var log_logid = logdata[3];
		var log_txt = logdata[4];

		if ( (log_type == LT_SENSOR_INPUT) || (log_type == LT_MOTION_DETECTION) || (log_type == LT_VIDEO_IN)
		  || (log_type == LT_VIDEO_LOSS) || (log_type == LT_TAMPER_EVENT) || (log_type == LT_RECORD_STARTED)
		  || (log_type == LT_RECORD_STOPPED) || (log_type == LT_SYSTEM_POS) )
		{
		  log_cam_title_flag[i] = true;
		}
		else
    {
      log_cam_title_flag[i] = false;
    }

    log_text[i] = getlog(log_type, log_param1, log_param2, log_logid, log_txt);
    log_ch[i] = log_param1;

    log_year[i] = datedata[0];
    log_mon[i] = datedata[1];
    log_day[i] = datedata[2];
    log_hour[i] = datedata[3];
    log_min[i] = datedata[4];
    log_second[i] = datedata[5];
  }

	if (parseInt(log_result_count) < parseInt(logtbsize) )
	{
		live_log_display(0, parseInt(log_result_count) - 1);
	}
	else
	{
		if ( parseInt(log_curr_pos[0]) != 0)
		{
			if ( parseInt(log_curr_pos[0]) + parseInt(logtbsize) < log_result_count )
			{
				live_log_display(parseInt(log_curr_pos[0]), parseInt(log_curr_pos[0]) + parseInt(logtbsize) - 1);
			}
			else
			{
				live_log_display(parseInt(log_curr_pos[0]), parseInt(log_result_count) - 1);
			}
		}
		else
		{
			live_log_display(0, parseInt(logtbsize) - 1);
		}
	}

	tzidx = INFO_TIMEZONE;

	if (!tzidx)
	{
		tzidx = 29;
	}
}

function live_update_display(recvText)
{
	var recvdata = recv_encode(recvText);

	if ( recvdata == null )
	{
		return;
	}

	var jpegliveelem = document.getElementById("liveJpeg");

	if ( jpegliveelem.getAttribute("src") != recvdata["filepath"] )
	{
		if ( jpegfailname != recvdata["filepath"] )
	  {
      jpegliveelem.setAttribute("src", recvdata["filepath"]);
    }
  }
}

function update_login_passwd(recvText)
{
    var recvdata = recv_encode(recvText);

	if ( recvdata == null )
	{
		return;
	}

	get_passwd_name = recvdata["login_passwd"];
	get_id_name = recvdata["login_id"];
	get_mac_address = recvdata['mac_address'];
	UCOVERT = recvdata["covert"];
  COVERT_DISP = recvdata["covert_disp"];
  //sequence.setSequenceData(recvdata);
    get_passwd_flag = true;

    onClickLiveStart();
}

function update_qrcode(recvText)
{
  var recvdata = recv_encode(recvText);

  if(recvdata == null)
  {
    return;
  }

  var url = "http://14.63.169.122/itx/";

  var ddnsurl = recvdata["ddns_address"];
  var proxy = recvdata["proxy"];

  var sequrinetAddr = url + "?mac=" + get_mac_address
    + "&ddns=" + ddnsurl
    + "&proxy=" + proxy
    + "&httpport=" + location.port
    + "&rtspport=" + INFO_RTSPPORT;

  $("#qrcodeTable").qrcode({text: sequrinetAddr});
}

/*********************************************************
 function : act_updateData ()
 description :
 parameter1 : (recvText : receive ?곗씠??
***********************************************************/
function live_updateData(recvText)
{
	requestflag = false;

	if (cmdselect == 1)
	{
		live_update_status(recvText);
	}
	else if (cmdselect == 2)
	{
		live_update_ptz(recvText);
	}
	else if (cmdselect == 3)
	{
		live_update_log(recvText);
	}
	else if (cmdselect == 4)
	{
		live_update_display(recvText);
	}
	else if (cmdselect == 5)
	{
		update_login_passwd(recvText);
	}
  else if (cmdselect == 6)
  {
    update_qrcode(recvText);
  }
  else
  {

  }
}
/*********************************************************
 function : act_updatePage ()
 description :
 requestflag :
***********************************************************/
var networkdisconnect = false;
var disconnect_cnt = 0;
var connect_try_cnt = 0;

function responseIsSuccess()
{
    return request.status == undefined
        || request.status == 0
        || (request.status >= 200 && request.status < 300);
}

function live_updatePage()
{
  if (request.readyState == 4)
  {
    if ( !networkdisconnect && !responseIsSuccess() )
    {
      if(request.status == 404)
      {
        self.location='../error/e404.htm';
      }
      else if (request.status >= 12000 )
      {
        if ( disconnect_cnt > 2 )
        {
          if (browerIE == true)
          {
            onLiveStop();
          }
          networkdisconnect = true;
          alert(errDisconnectNetwork);
        }
        else
        {
          disconnect_cnt++;
        }
      }
    }
    else if (request.status == 200)
    {
      if (browerIE == true)
      {
        var activex = document.getElementById("itxview");

        if ( activex )
        {
          if (ActiveX_IsConnection() == false)
          {
            if ( parseInt(INFO_DVRREADY) == 2 )
            {
              if (parseInt(connect_try_cnt) > 5)
              {
                onClickLiveStop();
                location.reload();
              }
              else
              {
                connect_try_cnt++;
              }
            }
          }
        }
      }

      disconnect_cnt = 0;

      var recvText = request.responseText;

      if (recvText != null)
      {
        if (recvText.indexOf("No Permission Error!") >= 0)
        {
          onLiveStop();
          onClickLiveStop();
          requestflag = false;
          sendcompleteflag = false;
          alert(errNoPermission);
          window.setTimeout("window.close()", 1) ;

          return;
        }
        live_updateData(recvText);
        if (sendcompleteflag == true)
        {
          sendcompleteflag = false;
        }
      }
      else
      {
        alert(errReceive);
      }
    }


    requestflag = false;
    sendcompleteflag = false;

  }
}
/******************************************************************/
/*?붿껌 Get/Set Send************************************************/
function live_status(request, thisform, sendbuf)
{
  var retime = document.getElementById("reloadTime");

	if (retime == null)
	{
		return;
	}

	sendbuf += "&" + "interval=" + escape(parseInt(retime.value));
	if ( parseInt(INTERVAL_LOCALTIME) == 0 )
	{
	    sendbuf += "&" + "curr_gmttime=" + escape(0);
	}
	else
	{
	    sendbuf += "&" + "curr_gmttime=" + escape(parseInt(parseInt(INTERVAL_LOCALTIME)+parseInt(retime.value)));
	}

	return sendbuf;
}

function live_ptz(request, thisform, sendbuf)
{
	if (gchannel == null || gcmd == null )
	{
		return;
	}

	var axch = 0;

	if (browerIE == false)
	{
		axch = gchannel;
	}
	else
	{
    axch = SelectedChannel();

    var activex = document.getElementById("itxview");

    var dispmode = activex.GetChannel();
    var webch = document.getElementById("channel");

    if ( parseInt(dispmode) == -1 )
    {
      webch.value = 0;
    }
    else if ( (parseInt(axch) - 1) != parseInt(webch.value) )
    {
      webch.value = parseInt(axch) + 1;
    }
	}

	var isContinuous = $("#ptz_continuous").prop("checked") ? 1: 0;

	sendbuf += "&" + "channel=" + escape( parseInt(axch) ); // FIXME choissi
	sendbuf += "&" + "cmd=" + escape(gcmd);
	sendbuf += "&" + "param1=" + escape(gparam1);
	sendbuf += "&" + "param2=" + escape(gparam2);
	sendbuf += "&" + "continuous=" + escape(isContinuous);

	return sendbuf;
}

function live_log(request, thisform, sendbuf)
{
	return sendbuf;
}

function live_display(request, thisform, sendbuf)
{
	var channel = document.getElementById("channel");

	sendbuf += "&" + "chno" + "=" + escape(parseInt(channel.value) - 1);

	return sendbuf;
}

function get_login_passwd(request, thisform, sendbuf)
{
	return sendbuf;
}

/*********************************************************
 function : act_send ()
 description :
 parameter1 : (request : )
 parameter2 : (thisform : )
 parameter3 : (cmd : )
 requestflag :
***********************************************************/
function live_send(request, thisform, cmd)
{
	var sendbuf = cmd;

	if(cmd == undefined) {
    return false;
  }

	if (cmd == "action=get_live&menu=live.status")
	{
		sendbuf = live_status(request, thisform, sendbuf);
		sendcompleteflag = true;
		cmdselect = 1;
	}
	else if (cmd == "action=set_live&menu=live.ptz")
	{
		sendbuf = live_ptz(request, thisform, sendbuf);
		sendcompleteflag = true;
		cmdselect = 2;
	}
	else if (cmd == "action=get_live&menu=live.log")
	{
		sendbuf = live_log(request, thisform, sendbuf);
		sendcompleteflag = true;
		cmdselect = 3;
	}
	else if (cmd == "action=get_live&menu=live.jpeg")
	{
		sendbuf = live_display(request, thisform, sendbuf);
		sendcompleteflag = true;
		cmdselect = 4;
	}
	else if (cmd == "action=get_info&menu=login.passwd")
	{
		sendbuf = get_login_passwd(request, thisform, sendbuf);
		sendcompleteflag = true;
		cmdselect = 5;
	}else if (cmd == "action=get_info&menu=ipexpress.info")
        {
          sendcompleteflag = true;
          cmdselect = 6;
        }
  else if (cmd.indexOf("action=get_ptz&menu=auxiliary.send") >= 0)
  {
    sendcompleteflag = true;
    cmdselect = 7;
  }
	else
	{
		dvr_ledon_postSetup();
	}

        var unix = +new Date();
        var sep = "&";

        if( sendbuf.indexOf("&") < 0 )
        {
          sep = "?";
        }

        sendbuf += ( sep + "timestamp=" + unix );

	requestflag = true;

	request.send(sendbuf);
}

/*********************************************************
 function : act_postSetup ()
 description :
 parameter1 : ()
 parameter2 : ()
 requestflag : ()
***********************************************************/
function live_postSetup(thisform, cmd)
{
	if ( requestflag == true)
	{
		return;
	}

	if ( checkform(thisform) == false || cmd == null)
	{
		return;
	}

	request = createRequest();

	if (request == null)
	{
		alert("Your Browser does not support Ajax!");
		return;
	}

	request.onreadystatechange = live_updatePage;
	request.open("POST", "/cgi-bin/webra_fcgi.fcgi", true);
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	request.setRequestHeader("cache-control","no-cache");
	live_send(request, thisform, cmd);
}

// STATUS
function live_Status_func()
{
	var retime = document.getElementById("reloadTime");

	if (retime == null)
	{
		return;
	}

	live_timer_stop();
	timerid = setTimeout(live_Status_func, parseInt(retime.value)*1000);
	live_postSetup(document.livesetting_status, "action=get_live&menu=live.status");
}

function live_status_reClick_func()
{
	live_postSetup(document.livesetting_status, "action=get_live&menu=live.status");
}

function live_status_visible()
{
  live_timer_stop();
  dvr_led_on_stop();

  var statusli = document.getElementById("statusli");
  statusli.className = "on";
  var logli = document.getElementById("logli");
  logli.className = "off";
  var ptzli = document.getElementById("ptzli");
  ptzli.className = "off";
  var qrcodeli = document.getElementById("qrcodeli");
  qrcodeli.className = "off";

  var livesetting_status = document.getElementById("livesetting_status");

  var c_l_div_ptz_contents = document.getElementById("c_l_div_ptz_contents");
  var c_l_div_log_contents = document.getElementById("c_l_div_log_contents");
  var c_l_div_qrcode_contents = document.getElementById("c_l_div_qrcode_contents");

  if ( c_l_div_ptz_contents )
  {
    var pc_l_div_ptz_contents = c_l_div_ptz_contents.parentNode;
    pc_l_div_ptz_contents.removeChild(c_l_div_ptz_contents);
  }

  if ( c_l_div_log_contents )
  {
    var pc_l_div_log_contents = c_l_div_log_contents.parentNode;
    pc_l_div_log_contents.removeChild(c_l_div_log_contents);
  }

  if ( c_l_div_qrcode_contents != null && (typeof(INFO_USE_SEQURINET)!="undefined" && INFO_USE_SEQURINET != false))
  {
    var pc_l_div_qrcode_contents = c_l_div_qrcode_contents.parentNode;
    pc_l_div_qrcode_contents.removeChild(c_l_div_qrcode_contents);
  }

  if (statusdiv)
  {
    livesetting_status.appendChild(statusdiv);
  }

  if (browerIE)
  {
    live_Status_func();
  }
  if (INFO_VENDOR === 'S1')
  {
    ptzli.disabled = true;
    ptzli.onclick = null;
    ptzli.hidden = true;
    $("#ptzli").hide();
  }


  liveCmd = "status";
}

// LOG
function live_Log_func()
{
	var relogtime = document.getElementById("reloadlogTime");

	live_timer_stop();
	timerlogid = setTimeout(live_Log_func, parseInt(relogtime.value)*1000);
	live_postSetup(document.livesetting_status, "action=get_live&menu=live.log");

}

function live_Log_reClick_func()
{
	live_postSetup(document.livesetting_status, "action=get_live&menu=live.log");
}

function live_log_visible()
{
  if ( !parseInt(INFO_EXISTDISK) )
  {
    alert(errNoDisk);
    return;
  }

  live_timer_stop();
  dvr_led_on_stop();

  var statusli = document.getElementById("statusli");
  statusli.className = "off";
  var logli = document.getElementById("logli");
  logli.className = "on";
  var ptzli = document.getElementById("ptzli");
  ptzli.className = "off";
  var qrcodeli = document.getElementById("qrcodeli");
  qrcodeli.className = "off";

  var livesetting_status = document.getElementById("livesetting_status");

  var c_l_div_ptz_contents = document.getElementById("c_l_div_ptz_contents");
  var c_l_div_status_contents = document.getElementById("c_l_div_status_contents");
  var c_l_div_qrcode_contents = document.getElementById("c_l_div_qrcode_contents");

  if ( c_l_div_ptz_contents )
  {
    var pc_l_div_ptz_contents = c_l_div_ptz_contents.parentNode;
    pc_l_div_ptz_contents.removeChild(c_l_div_ptz_contents);
  }

  if ( c_l_div_status_contents )
  {
    var pc_l_div_status_contents = c_l_div_status_contents.parentNode;
    pc_l_div_status_contents.removeChild(c_l_div_status_contents);
  }

  if ( c_l_div_qrcode_contents != null && (typeof(INFO_USE_SEQURINET) != "undefined" &&  INFO_USE_SEQURINET != false ))
  {
    var pc_l_div_qrcode_contents = c_l_div_qrcode_contents.parentNode;
    pc_l_div_qrcode_contents.removeChild(c_l_div_qrcode_contents);
  }

  if (logdiv)
  {
    livesetting_status.appendChild(logdiv);
  }

  if (browerIE)
  {
    live_Log_func();
  }

  liveCmd = "log";
}

// PTZ
function live_ptz_visible()
{
  if( !orgData ) {
    // ajax data is not loaded yet
    alert(langArray["LTXT_MSG_INIT_RUN"]);
    return;
  }

  live_timer_stop();
  dvr_ledon_postSetup();

  var statusli = document.getElementById("statusli");
  statusli.className = "off";
  var logli = document.getElementById("logli");
  logli.className = "off";
  var ptzli = document.getElementById("ptzli");
  ptzli.className = "on";
  var qrcodeli = document.getElementById("qrcodeli");
  qrcodeli.className = "off";

  var livesetting_status = document.getElementById("livesetting_status");

  var c_l_div_log_contents = document.getElementById("c_l_div_log_contents");
  var c_l_div_status_contents = document.getElementById("c_l_div_status_contents");
  var c_l_div_qrcode_contents = document.getElementById("c_l_div_qrcode_contents");

  if ( c_l_div_log_contents )
  {
    var pc_l_div_log_contents = c_l_div_log_contents.parentNode;
    pc_l_div_log_contents.removeChild(c_l_div_log_contents);
  }

  if ( c_l_div_status_contents )
  {
    var pc_l_div_status_contents = c_l_div_status_contents.parentNode;
    pc_l_div_status_contents.removeChild(c_l_div_status_contents);
  }

  if ( c_l_div_qrcode_contents != null && typeof(INFO_USE_SEQURINE) != "undefined" && TINFO_USE_SEQURINET != false)
  {
    var pc_l_div_qrcode_contents = c_l_div_qrcode_contents.parentNode;
    pc_l_div_qrcode_contents.removeChild(c_l_div_qrcode_contents);
  }

  if (ptzdiv)
  {
    livesetting_status.appendChild(ptzdiv);
  }

  live_ptzinit();

  liveCmd = "ptz";

  if (browerIE == true) {
    var activex = document.getElementById("itxview");

    if(activex.GetChannel() != -1)
    {
      var axch = SelectedChannel();

      $("#channel").val(axch+1);
      $("#aux_select").empty();
      auxiliary(parseInt(axch));
    }
    else
    {
      $("#aux_select").empty();
      $("#aux_select").prop("disabled", true);
    }
  }
}

function live_qrcode_visible()
{
  live_timer_stop();
  dvr_ledon_postSetup();

  var statusli = document.getElementById("statusli");
  statusli.className = "off";
  var logli = document.getElementById("logli");
  logli.className = "off";
  var ptzli = document.getElementById("ptzli");
  ptzli.className = "off";
  var qrcodeli = document.getElementById("qrcodeli");
  qrcodeli.className = "on";

  var livesetting_status = document.getElementById("livesetting_status");

  var c_l_div_log_contents = document.getElementById("c_l_div_log_contents");
  var c_l_div_status_contents = document.getElementById("c_l_div_status_contents");
  var c_l_div_ptz_contents = document.getElementById("c_l_div_ptz_contents");

  if ( c_l_div_log_contents )
  {
    var pc_l_div_log_contents = c_l_div_log_contents.parentNode;
    pc_l_div_log_contents.removeChild(c_l_div_log_contents);
  }

  if ( c_l_div_status_contents )
  {
    var pc_l_div_status_contents = c_l_div_status_contents.parentNode;
    pc_l_div_status_contents.removeChild(c_l_div_status_contents);
  }

  if ( c_l_div_ptz_contents)
  {
    var pc_l_div_ptz_contents = c_l_div_ptz_contents.parentNode;
    pc_l_div_ptz_contents.removeChild(c_l_div_ptz_contents);
  }

  if (qrcodediv)
  {
    livesetting_status.appendChild(qrcodediv);
  }

  live_postSetup(document.livesetting_status, "action=get_info&menu=ipexpress.info");

  liveCmd = "qrcode";

  if (browerIE == true) {
    var activex = document.getElementById("itxview");

    if(activex.GetChannel() != -1)
    {
      var axch = SelectedChannel();

      $("#channel").val(axch+1);
      $("#aux_select").empty();
      auxiliary(parseInt(axch));
    }
    else
    {
      $("#aux_select").empty();
      $("#aux_select").prop("disabled", true);
    }
  }
}

function delElemSelOption(pnode)
{
	if (!pnode)
	{
		return;
	}
	for (var i = 0; i < pnode.childNodes.length; i++)
	{
		var childNode = pnode.childNodes[i];
		pnode.removeChild(childNode);
	}
}

function createElemSelOption(pnode, start, end)
{
	if (!pnode)
	{
		return;
	}
	delElemSelOption(pnode);
	for (var i = parseInt(start); i <= parseInt(end); i++)
	{
		var eleopt = document.createElement("option");
		eleopt.setAttribute("value", i);
		var txtNode = document.createTextNode(i);
		eleopt.appendChild(txtNode);
		pnode.appendChild(eleopt);

		eleopt = null;
		txtNode = null;
	}
}

function info_compare_func()
{
	include_file('../info/info.js');

	if (info_compare() == false)
	{
	    if ( (parseInt(INFO_DVRREADY) == 2 ) && (INFO_LANGUAGE != INFO_CMP_LANGUAGE) )
		{
			setTimeout(info_compare_func, 2000);
			return;
		}

	    info_cmp_store();
	    if ( (parseInt(INFO_DVRREADY) == 2) )
	    {
		    var disoffset = parseInt(INFO_DISCONNECTRESON) - parseInt(DISCONECTOFFSET);
		    if ( parseInt(disoffset) > 0 && parseInt(disoffset) <= 10 )
		    {
		        alert(errDisConnectReason[disoffset]);
		    }
			else
			{
				location.reload();
			}
			onClickLiveStop();
		}
		else if ( parseInt(INFO_DVRREADY) == 1 )
		{
		  if ( !parseInt(INFO_EXISTDISK) )
		  {
		    onClickLiveStop();
		    location.reload();
		    return;
		  }
		  LiveBackupInit();
		  onLiveStop();

		  var disoffset = parseInt(INFO_DISCONNECTRESON) - parseInt(DISCONECTOFFSET);
		  if ( parseInt(disoffset) > 0 && parseInt(disoffset) <= 10 )
		  {
		    alert(errDisConnectReason[disoffset]);
		  }
		  else
		  {
		    alert(errDisconnect);
		  }

		  var btliveaudio = document.getElementById("btliveaudio");
		  if (btliveaudio)
		  {
		    btliveaudio.setAttribute("src", "../images/images/live_audio_out_n.png");
		  }

		  var btlivespeaker = document.getElementById("btlivespeaker");
    	if (btlivespeaker)
    	{
    	  btlivespeaker.setAttribute("src", "../images/images/live_sound_off_n.png");
    	}

    	var btbackup = document.getElementById("btbackup");
      if ( btbackup )
      {
   		  btbackup.setAttribute("src", "../images/images/live_bt_backup_n.png");
      }
		}
	}

	setTimeout(info_compare_func, 2000);
}

function help_test(e)
{
	var imgelem = this;

	if (!rightmouseclickdown(e))
	{
	    return;
	}

	if ( imgelem.id == "btlivespeaker")
	{
		var imgurl = imgelem.getAttribute("src");
		var img_str = imgurl.substring(imgurl.indexOf('images'),imgurl.length);

	    if (img_str == "images/images/live_sound_off_n.gif" || img_str == "images/images/live_sound_off_p.png")
	    {
	       imgelem.setAttribute("src", "../images/images/live_sound_off_o.png");
	    }
	    else
	    {
		    imgelem.setAttribute("src", "../images/images/live_sound_on_o.png");
		}
	}
	SetLiveSpeaker();
}

function get_firstChild(n)
{
  var y = n.firstChild;

  while (y.nodeType!=1)
  {
    y = y.nextSibling;
  }

  return y;
}

function SetDzoomin() {
  ActiveXSetDzoomin();
}


function mouseWheel(event) {
  /* for ie. */
  var delta = 0;
  if (!event)
    event = window.event;

  if (event.preventDefault)
    event.preventDefault();

  event.returnValue = false;
}

function live_VichEnDis()
{
  errDisconnectStringInit();
  SetInitDisplay();

  var c_l_div_status_contents = document.getElementById("c_l_div_status_contents");
  var status_tbl = get_firstChild(c_l_div_status_contents);

  var row_chan = status_tbl.rows[0];
  var row_ain_cam = status_tbl.rows[1];
  var row_ain_dvr = status_tbl.rows[2];
  var row_motion = status_tbl.rows[3];
  var row_vloss = status_tbl.rows[4];
  var row_record = status_tbl.rows[5];
  var row_aout_cam = status_tbl.rows[6];
  var row_aout_dvr = status_tbl.rows[7];

  var num_alarm_cam = parseInt(INFO_ALARM_SENSOR["aout_cam"]);
  var num_alarm_dvr = parseInt(INFO_ALARM_SENSOR["aout_dvr"]);
  var num_sensor_cam = parseInt(INFO_ALARM_SENSOR["ain_cam"]);
  var num_sensor_dvr = parseInt(INFO_ALARM_SENSOR["ain_dvr"]);

  if (INFO_MODEL.indexOf("IPX") >= 0) {
  } else {
    $('.alarm_cam').hide();
  }

  for( var i=0 ; i < 16 - num_alarm_dvr ; i++ ) {
    row_aout_dvr.cells[16-i].innerHTML = "";
  }

  for( var i=0 ; i < 16 - num_sensor_dvr ; i++ ) {
    row_ain_dvr.cells[16-i].innerHTML = "";
  }

  for( var i=0 ; i < (16 - INFO_DVRCHANNEL) ; i++ ) {
    row_chan.deleteCell(16-i);
    row_ain_cam.deleteCell(16-i);
    row_ain_dvr.deleteCell(16-i);
    row_motion.deleteCell(16-i);
    row_vloss.deleteCell(16-i);
    row_record.deleteCell(16-i);
    row_aout_cam.deleteCell(16-i);
    row_aout_dvr.deleteCell(16-i);
  }

  if( num_alarm_cam == 0 ) {
    status_tbl.deleteRow(6);
  }

  if( num_sensor_cam == 0 ) {
    status_tbl.deleteRow(1);
  }

  var division1 = document.getElementById("division1");
  var division4 = document.getElementById("division4");
  var division8 = document.getElementById("division8");
  var division9 = document.getElementById("division9");
  var division16 = document.getElementById("division16");
  var btpageset = document.getElementById("btpageset");
  var btpageone = document.getElementById("btpageone");
  var btpagefull = document.getElementById("btpagefull");
  var btzoomin = document.getElementById("btzoomin");
  var btliveaudio = document.getElementById("btliveaudio");
  var btlivespeaker = document.getElementById("btlivespeaker");
  var btbackup = document.getElementById("btbackup");
  var btprint = document.getElementById("btprint");
  var btcaptureimage = document.getElementById("btcaptureimage");
  var btsetting = document.getElementById("btsetting");
  var itxview = document.getElementById("itxview");

  if( itxview != null )
    itxview.onmousewheel = mouseWheel;

  if (division8)
  {
    division8.onclick = SetDisplayMode8;
    division8.onmouseover = OnLiveMouseOver;
    division8.onmousedown = OnLiveMouseDown;
    division8.onmouseout = OnLiveMouseOut;
    division8.onmouseup = OnLiveMouseOver;
  }
  if (division9)
  {
    division9.onclick = SetDisplayMode9;
    division9.onmouseover = OnLiveMouseOver;
    division9.onmousedown = OnLiveMouseDown;
    division9.onmouseout = OnLiveMouseOut;
    division9.onmouseup = OnLiveMouseOver;
  }
  if (division16)
  {
    division16.onclick = SetDisplayMode16;
    division16.onmouseover = OnLiveMouseOver;
    division16.onmousedown = OnLiveMouseDown;
    division16.onmouseout = OnLiveMouseOut;
    division16.onmouseup = OnLiveMouseOver;
  }

  if ( btliveaudio  && INFO_VENDOR != 'S1')
  {
    btliveaudio.onclick = SetLiveAduio;
    btliveaudio.onmouseover = OnLiveMouseOver;
    btliveaudio.onmousedown = OnLiveMouseDown;
    btliveaudio.onmouseout = OnLiveMouseOut;
    btliveaudio.onmouseup = OnLiveMouseOver;
  }

  if ( btlivespeaker  && INFO_AUDIO_SUPPORT == '1' && INFO_VENDOR != 'S1')
  {
    //btlivespeaker.onclick = SetLiveSpeaker;
    btlivespeaker.onmouseover = OnLiveMouseOver;
    btlivespeaker.onmousedown = OnLiveMouseDown;
    btlivespeaker.onmouseout = OnLiveMouseOut;
    //btlivespeaker.onmouseup = OnLiveMouseOver;
    btlivespeaker.onmouseup = help_test;
  }

  if (division1)
  {
    division1.onclick = SetDisplayMode1;
    division1.onmouseover = OnLiveMouseOver;
    division1.onmousedown = OnLiveMouseDown;
    division1.onmouseout = OnLiveMouseOut;
    division1.onmouseup = OnLiveMouseOver;
  }

  if (division4)
  {
    division4.onclick = SetDisplayMode4;
    division4.onmouseover = OnLiveMouseOver;
    division4.onmousedown = OnLiveMouseDown;
    division4.onmouseout = OnLiveMouseOut;
    division4.onmouseup = OnLiveMouseOver;
  }

  if (btpageset)
  {
    btpageset.onclick = SetDisplayTab;
    btpageset.onmouseover = OnLiveMouseOver;
    btpageset.onmousedown = OnLiveMouseDown;
    btpageset.onmouseout = OnLiveMouseOut;
    btpageset.onmouseup = OnLiveMouseOver;
  }

  if (btpageone)
  {
    btpageone.onclick = SetDisplayManual;
    btpageone.onmouseover = OnLiveMouseOver;
    btpageone.onmousedown = OnLiveMouseDown;
    btpageone.onmouseout = OnLiveMouseOut;
    btpageone.onmouseup = OnLiveMouseOver;
  }

  if (btpagefull)
  {
    btpagefull.onclick = SetDisplayfull;
    btpagefull.onmouseover = OnLiveMouseOver;
    btpagefull.onmousedown = OnLiveMouseDown;
    btpagefull.onmouseout = OnLiveMouseOut;
    btpagefull.onmouseup = OnLiveMouseOver;
  }

  if (btzoomin) {
    btzoomin.onclick = SetDzoomin;
    btzoomin.onmouseover = OnLiveMouseOver;
    btzoomin.onmousedown = OnLiveMouseDown;
    btzoomin.onmouseout = OnLiveMouseOut;
    btzoomin.onmouseup = OnLiveMouseOver;
  }
  if (btbackup && INFO_VENDOR != 'S1')
  {
    btbackup.onclick = SetLiveBackup;
    btbackup.onmouseover = OnLiveMouseOver;
    btbackup.onmousedown = OnLiveMouseDown;
    btbackup.onmouseout = OnLiveMouseOut;
    btbackup.onmouseup = OnLiveMouseOver;
  }

  if (btprint && INFO_SNAPSHOT_SUPPORT == '1' && INFO_VENDOR != 'S1')
  {
    btprint.onclick = SetLivePrint;
    btprint.onmouseover = OnLiveMouseOver;
    btprint.onmousedown = OnLiveMouseDown;
    btprint.onmouseout = OnLiveMouseOut;
    btprint.onmouseup = OnLiveMouseOver;
  }

  if (btcaptureimage && INFO_SNAPSHOT_SUPPORT == '1' && INFO_VENDOR != 'S1')
  {
    btcaptureimage.onclick = SetLiveCaptureImage;
    btcaptureimage.onmouseover = OnLiveMouseOver;
    btcaptureimage.onmousedown = OnLiveMouseDown;
    btcaptureimage.onmouseout = OnLiveMouseOut;
    btcaptureimage.onmouseup = OnLiveMouseOver;
  }

  if (btsetting)
  {
    btsetting.onclick = SetLiveActiveXSetting;
    btsetting.onmouseover = OnLiveMouseOver;
    btsetting.onmousedown = OnLiveMouseDown;
    btsetting.onmouseout = OnLiveMouseOut;
    btsetting.onmouseup = OnLiveMouseOver;
  }

  if (browerIE == false)
  {
    var jpegelem = document.getElementById("liveJpegDiv");

    var jpegimg = document.createElement("img");

    jpegimg.setAttribute("id","liveJpeg");
    jpegimg.setAttribute("class", "c_l_img_jpeglive");

    jpegelem.appendChild(jpegimg);
  }

  var reTime = document.getElementById("reloadTime");

  if (!reTime)
  {
    return;
  }

  delElemSelOption(reTime);

  for (var i = 3; i <= 10; i++)
  {
    var eleopt = document.createElement("option");
    eleopt.setAttribute("value", i);
    var txtNode = document.createTextNode(langArray["LTXT_" + i + "SEC"]);
    eleopt.appendChild(txtNode);
    reTime.appendChild(eleopt);

    eleopt = null;
    txtNode = null;
  }

  var relogTime = document.getElementById("reloadlogTime");

  if (!relogTime)
  {
    return;
  }

  delElemSelOption(relogTime);

  for (var i = 3; i <= 10; i++)
  {
    var eleopt = document.createElement("option");
    eleopt.setAttribute("value", i);
    var txtNode = document.createTextNode(langArray["LTXT_" + i + "SEC"]);
    eleopt.appendChild(txtNode);
    relogTime.appendChild(eleopt);

    eleopt = null;
    txtNode = null;
  }

  var actChdiv = document.getElementById("channel");

  if (!actChdiv)
  {
    return;
  }
  delElemSelOption(actChdiv);

  var eleopt = document.createElement("option");
  eleopt.setAttribute("value", 0);
  var txtNode = document.createTextNode(displayChannel);
  eleopt.appendChild(txtNode);
  actChdiv.appendChild(eleopt);

  eleopt = null;
  txtNode = null;

  for (var ch = 1; ch <= parseInt(INFO_DVRCHANNEL); ch++)
  {
    eleopt = document.createElement("option");
    eleopt.setAttribute("value", ch);
    txtNode = document.createTextNode(langArray['LTXT_CHANNEL_CH'+ch]+"("+INFO_CAMTITLE[parseInt(ch)-1]+")");
    eleopt.appendChild(txtNode);
    actChdiv.appendChild(eleopt);

    eleopt = null;
    txtNode = null;
  }
  actChdiv.style.width = '130px';
  actChdiv.value = 0;

  if (browerIE == true)
  {
    actChdiv.onchange = display_Channel_onChange;
  }
  else
  {
    actChdiv.value = 1;
  }

  // IE6 display position modify
  if (browserIE6){
    if(logdiv)
      logdiv.style.marginTop = -6;
    if(statusdiv)
      statusdiv.style.marginTop = -6;
    if(ptzdiv)
      ptzdiv.style.marginTop = -6;
    if(qrcodediv)
      qrcodediv.style.marginTop = -6;
  }

  //ptz disable
  var pattern_sel = document.getElementById("pattern_sel");
  createElemSelOption(pattern_sel, 1, 255);
  pattern_sel.disabled = "true";

  var preset_sel = document.getElementById("preset_sel");
  createElemSelOption(preset_sel, 1, 255);

  var swing_s_sel = document.getElementById("swing_s_sel");
  createElemSelOption(swing_s_sel, 1, 255);
  swing_s_sel.disabled = "true";

  var swing_e_sel = document.getElementById("swing_e_sel");
  createElemSelOption(swing_e_sel, 1, 255);
  swing_e_sel.disabled = "true";

  var pattern_set = document.getElementById("pattern_set");
  pattern_set.disabled = "true";
  var pattern_run = document.getElementById("pattern_run");
  pattern_run.disabled = "true";
  var swing_run = document.getElementById("swing_run");
  swing_run.disabled = "true";

  //pattern & swing remove 땜빵코드 삭제 예정
  $("#pattern_tr").remove();
  $("#pattern_tr_btn").remove();

  $("#swing_tr").remove();

  info_cmp_store();
  info_compare_func();

  img_off_alarm_01.src 		= imageurl+'alarm_'+'off_'+'01'+'.gif';
  img_off_motion_01.src 		= imageurl+'motion_'+'off_'+'01'+'.gif';
  img_off_video_loss_01.src 		= imageurl+'vloss_'+'off_'+'01'+'.gif';
  img_off_rec_01.src 			= imageurl+'recording_'+'off_'+'01'+'.gif';
  img_off_alarm_out_01.src 		= imageurl+'alarmout_'+'off_'+'01'+'.gif';

  img_off_alarm_02.src 		= imageurl+'alarm_'+'off_'+'02'+'.gif';
  img_off_motion_02.src 		= imageurl+'motion_'+'off_'+'02'+'.gif';
  img_off_video_loss_02.src 		= imageurl+'vloss_'+'off_'+'02'+'.gif';
  img_off_rec_02.src 			= imageurl+'recording_'+'off_'+'02'+'.gif';
  img_off_alarm_out_02.src 		= imageurl+'alarmout_'+'off_'+'02'+'.gif';

  img_on_alarm_01.src 		= imageurl+'alarm_'+'on_'+'01'+'.gif';
  img_on_motion_01.src 		= imageurl+'motion_'+'on_'+'01'+'.gif';
  img_on_video_loss_01.src 		= imageurl+'vloss_'+'on_'+'01'+'.gif';
  img_on_alarm_out_01.src 		= imageurl+'alarmout_'+'on_'+'01'+'.gif';

  img_on_rec_alarm_01.src 		= imageurl+'recording_alarm_'+'on_'+'01'+'.gif';
  img_on_rec_motion_01.src 		= imageurl+'recording_motion_'+'on_'+'01'+'.gif';
  img_on_rec_panic_01.src 		= imageurl+'recording_panic_'+'on_'+'01'+'.gif';
  img_on_rec_prerecord_01.src 	= imageurl+'recording_prerecord_'+'on_'+'01'+'.gif';
  img_on_rec_timer_01.src 		= imageurl+'recording_timer_'+'on_'+'01'+'.gif';

  img_on_alarm_02.src 		= imageurl+'alarm_'+'on_'+'02'+'.gif';
  img_on_motion_02.src 		= imageurl+'motion_'+'on_'+'02'+'.gif';
  img_on_video_loss_02.src 		= imageurl+'vloss_'+'on_'+'02'+'.gif';
  img_on_alarm_out_02.src 		= imageurl+'alarmout_'+'on_'+'02'+'.gif';

  img_on_rec_alarm_02.src 		= imageurl+'recording_alarm_'+'on_'+'02'+'.gif';
  img_on_rec_motion_02.src 		= imageurl+'recording_motion_'+'on_'+'02'+'.gif'
  img_on_rec_panic_02.src		= imageurl+'recording_panic_'+'on_'+'02'+'.gif';
  img_on_rec_prerecord_02.src 	= imageurl+'recording_prerecord_'+'on_'+'02'+'.gif';
  img_on_rec_timer_02.src 		= imageurl+'recording_timer_'+'on_'+'02'+'.gif';


  //continuous ptz
  if( INFO_MODEL.indexOf("ATM") >= 0 || INFO_MODEL.indexOf("ANF") >= 0 || INFO_MODEL.indexOf("UTM") >= 0 || INFO_MODEL.indexOf("IPX") >= 0 ) {
    init_ptz();
  } else {
    $('#ptz_continuous').attr("checked", false);
    $("#conti_ptz").hide();
  }
}

function tablealpha()
{
	var alarmcam_name = "arcam_status_";
	var alarm_name = "ar_status_";
	var motion_name = "mt_status_";
	var vloss_name = "vl_status_";
	var rec_name = "rec_status_";
	var arout_name = "arout_status_";
	var aroutcam_name = "aroutcam_status_";

	for (var ch = 0; ch < INFO_DVRCHANNEL; ch++)
	{
		var alarm_cam_elem = document.getElementById(alarmcam_name+ch);
		var alarm_elem = document.getElementById(alarm_name+ch);
		var motion_elem = document.getElementById(motion_name+ch);
		var vloss_elem = document.getElementById(vloss_name+ch);
		var recording_elem = document.getElementById(rec_name+ch);
		var alarm_out_elem = document.getElementById(arout_name+ch);
		var alarm_out_cam_elem = document.getElementById(aroutcam_name+ch);

		setOpacity(alarm_elem, 20);
		setOpacity(motion_elem, 20);
		setOpacity(vloss_elem, 20);
		setOpacity(recording_elem, 20);
		setOpacity(alarm_out_elem, 20);

		if (alarm_elem)
		{
		alarm_elem.onmouseover = live_status_onmouseover;
		alarm_elem.onmousedown = live_status_onmousedown;
		alarm_elem.onmouseout = live_status_onmouseout;
		alarm_elem.onmouseup = live_status_onmouseup;
		alarm_elem.onclick = live_status_alarm_click;
		}

		if (alarm_cam_elem)
		{
		alarm_cam_elem.onmouseover = live_status_onmouseover;
		alarm_cam_elem.onmousedown = live_status_onmousedown;
		alarm_cam_elem.onmouseout = live_status_onmouseout;
		alarm_cam_elem.onmouseup = live_status_onmouseup;
		alarm_cam_elem.onclick = live_status_alarm_click;
		}

		if (motion_elem)
		{
		  motion_elem.onmouseover = live_status_onmouseover;
		  motion_elem.onmousedown = live_status_onmousedown;
		  motion_elem.onmouseout = live_status_onmouseout;
		  motion_elem.onmouseup = live_status_onmouseup;
		  motion_elem.onclick = live_status_motion_click;
		}

		if (vloss_elem)
		{
		  vloss_elem.onmouseover = live_status_onmouseover;
		  vloss_elem.onmousedown = live_status_onmousedown;
		  vloss_elem.onmouseout = live_status_onmouseout;
		  vloss_elem.onmouseup = live_status_onmouseup;
		  vloss_elem.onclick = live_status_vloss_click;
		}

		if (recording_elem)
		{
		  recording_elem.onmouseover = live_status_onmouseover;
		  recording_elem.onmousedown = live_status_onmousedown;
		  recording_elem.onmouseout = live_status_onmouseout;
		  recording_elem.onmouseup = live_status_onmouseup;
		  recording_elem.onclick = live_status_recording_click;
		}

    if (alarm_out_elem)
    {
      alarm_out_elem.onmouseover = live_status_onmouseover;
      alarm_out_elem.onmousedown = live_status_onmousedown;
      alarm_out_elem.onmouseout = live_status_onmouseout;
      alarm_out_elem.onmouseup = live_status_onmouseup;
      alarm_out_elem.onclick = live_alarmout_alarmout_click;
    }

    if (alarm_out_cam_elem)
    {
      alarm_out_cam_elem.onmouseover = live_status_onmouseover;
      alarm_out_cam_elem.onmousedown = live_status_onmousedown;
      alarm_out_cam_elem.onmouseout = live_status_onmouseout;
      alarm_out_cam_elem.onmouseup = live_status_onmouseup;
      alarm_out_cam_elem.onclick = live_alarmout_alarmout_cam_click;
    }
  }
}

function show_renewpw_dialog()
{
  $("#dialog_renew_pwd").dialog('open');
}
