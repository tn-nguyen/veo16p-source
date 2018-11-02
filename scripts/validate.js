var orgData = null;
var changePart = null;

function valUpdate(revData, part)
{
    orgData = revData;
    changePart = part;
}

function valChangeCheck(cause)
{
    if ( (orgData == null) || (changePart == null) )
    {
        return;
    }

    var change = false;

    if ( (cause != "urlchange") && (parseInt(_dvr_status["NF_DVR_STATUS_RUN_ARCHIVE"]) == parseInt(INFO_DVRSTATUS)) )
    {
        if ( parseInt(_dvr_status["NF_DVR_STATUS_RUN_ARCHIVE"]) == parseInt(INFO_DVRSTATUS) )
        {
            alert(dvrinarchive);
            return false;
        }
    }

    if ( changePart == 'SETUPCAMCAM' )
    {
        for (var ch = 0; ch < INFO_DVRCHANNEL; ch++)
        {
            if (prvcamtitle['cam_title' + ch] != document.getElementById('cam_title'+ch).value )
            {
                Cam_Change_Spec = CamChgValue["cam"];
                change = true;   
                break;
            }
        }
        /*
           for (var ch = 0; ch < INFO_DVRCHANNEL; ch++)
           {    
           if (prvcovert['covert' + ch] != document.getElementById('covert'+ch).value )
           {
           if ( Cam_Change_Spec == CamChgValue["cam"])
           {
           Cam_Change_Spec = CamChgValue["cam_covert"];
           }
           else
           {
           Cam_Change_Spec = CamChgValue["covert"];
           }
           change = true;   
           break;
           }
           }
           for (var ch = 0; ch < INFO_DVRCHANNEL; ch++)
           {    
           if (prvaudio['audio' + ch] != document.getElementById('audio'+ch).value )
           {
           if ( Cam_Change_Spec == CamChgValue["cam"])
           {
           Cam_Change_Spec = CamChgValue["cam_audio"];
           }
           else if ( Cam_Change_Spec == CamChgValue["covert"])
           {
           Cam_Change_Spec = CamChgValue["covert_audio"];
           }
           else if ( Cam_Change_Spec == CamChgValue["cam_covert"])
           {
           Cam_Change_Spec = CamChgValue["all"];
           }
           else
           {
           Cam_Change_Spec = CamChgValue["audio"];
           }
           change = true;   
           break;
           }
           }
           */
        if ( orgData['cam_usenum'] && orgData['cam_usenum'] != document.getElementById('cam_usenum').value ) {
            Cam_Change_Spec = CamChgValue["cam_usenum"];
            change = true;   
        }

    }
    else if ( changePart == 'SETUPCAMIMAGE')
    {
        for (var ch = 0; ch < INFO_DVRCHANNEL; ch++)
        {
            if (orgData['brightness' + ch] != document.getElementById('brightness'+ch).value )
            {
                change = true;   
                break;
            }
            if (orgData['contrast' + ch] != document.getElementById('contrast'+ch).value )
            {
                change = true;   
                break;
            }
            if (orgData['tint' + ch] != document.getElementById('tint'+ch).value )
            {
                change = true;   
                break;
            }
            if (orgData['color' + ch] != document.getElementById('color'+ch).value )
            {
                change = true;   
                break;
            }   
        }
    }
    else if ( changePart == 'SETUPCAMMOTION')
    {
        var motionarea = set_setup_cam_motion_sendmotion();
        var sensitivity = (parseInt(document.getElementById("sensitivity").value)+1) * 10;

        var orgarea = orgData["area"];

        orgarea = orgarea.substring(0, motionarea.length);

        if (orgarea != motionarea )
        {
            change = true;   
        }

        if (parseInt(orgData["chno"]) != parseInt(channelnum) )
        {
            change = true;   
        }

        if (parseInt(orgData["sensitivity"]) != parseInt(sensitivity) )
        {
            change = true;   
        }   
    }
    else if ( changePart == 'SETUPCAMPTZ')
    {   
        for (var ch = 0; ch < INFO_DVRCHANNEL; ch++)
        {   
            if (orgData['address' + ch] != document.getElementById('address'+ch).value )
            {
                change = true;   
                break;
            }   

            if (orgData['protocol' + ch] != document.getElementById('protocol'+ch).value )
            {
                change = true;   
                break;
            }   

            if (orgData['baudrate' + ch] != document.getElementById('baudrate'+ch).value )
            {
                change = true;   
                break;
            }   

            if (orgData['autofocus' + ch] != document.getElementById('autofocus'+ch).value )
            {
                change = true;   
                break;
            }   

            if (orgData['autoiris' + ch] != document.getElementById('autoiris'+ch).value )
            {
                change = true;   
                break;
            }   

            if (parseInt(orgData['ptspeed' + ch] / 10) != parseInt(document.getElementById('ptspeed'+ch).value) )
            {
                change = true;   
                break;
            }   

            if (parseInt(orgData['zoomspeed' + ch] / 10) != parseInt(document.getElementById('zoomspeed'+ch).value) )
            {
                change = true;   
                break;
            }   

            if (parseInt(orgData['focusspeed' + ch] / 10) != parseInt(document.getElementById('focusspeed'+ch).value) )
            {
                change = true;   
                break;
            }   

            if (parseInt(orgData['irisspeed' + ch] / 10) != parseInt(document.getElementById('irisspeed'+ch).value) )
            {
                change = true;   
                break;
            }   
        }
    }
    else if ( changePart == 'SETUPDISPOSD')
    {
        if (orgData['statusbar_fs'] != document.getElementById('statusbar_fs').value )
        {
            change = true;   

        }   

        if (orgData['cam_title'] != document.getElementById('cam_title').value )
        {
            change = true;   

        }   

        if (orgData['recod_mode'] != document.getElementById('recod_mode').value )
        {
            change = true;   

        }   

        if (orgData['border'] != document.getElementById('border').value )
        {
            change = true;   

        }   

        if (orgData['border_color'] != document.getElementById('border_color').value )
        {
            change = true;   

        }   

        //if (INFO_VENDOR == 'SAMSUNG' || parseInt(INFO_DVRCHANNEL) != 4)
        {                   
            if (orgData['motion_sensor_dis'] != document.getElementById('motion_sensor_dis').value )
            {
                change = true;   

            }   

            if (orgData['motion_color'] != document.getElementById('motion_color').value )
            {
                change = true;   

            }
        }   

    }
    else if ( changePart == 'SETUPDISPMONITOR')
    {
        if (orgData['seq_dwell'] != document.getElementById('seq_dwell').value )
        {
            change = true;   

        }   
        if ( INFO_VENDOR != 'SAMSUNG' )
        {       
            if (orgData['spot_dwell'] != document.getElementById('spot_dwell').value )
            {
                change = true;   

            }   
            /*  choissi 2011-01-26 오후 1:04:50
                if (orgData['deinterace'] != document.getElementById('deinterace').value )
                {
                change = true;   
                }   
                */
        }

        /* chcha 2011-02-23     
           if (orgData['alarm_popup_mode'] != document.getElementById('alarm_popup_mode').value )
           {
           change = true;   

           }    

           if (orgData['alarm_popup_dwell'] != document.getElementById('alarm_popup_dwell').value )
           {
           change = true;   

           }    
           */  

        if (orgData['motion_popup_mode'] != document.getElementById('motion_popup_mode').value )
        {
            change = true;   

        }   

        if (orgData['motion_popup_dwell'] != document.getElementById('motion_popup_dwell').value )
        {
            change = true;   

        }   
    }
    else if ( changePart == 'SETUPCAMDMVA')
    {
        change = true;
    }
    else if ( changePart == 'SETUPDISPSOUND')
    {
        if (orgData['liveaudio'] != document.getElementById('liveaudio').value )
        {
            change = true;   

        }

        /*          
                                if (orgData['audioch'] != document.getElementById('audioch').value )
                                {
                                change = true;   

                                }
                                */

        if (orgData['netaudiotrans'] != document.getElementById('netaudiotrans').value )
        {
            change = true;   

        }

        if (orgData['netaudiorecv'] != document.getElementById('netaudiorecv').value )
        {
            change = true;   

        }   

        if (orgData['keypad'] != document.getElementById('keypad').value )
        {
            change = true;   

        }   
    }
    else if ( changePart == 'SETUPSYSDATETIME')
    {
        if (orgData['dataformat'] != document.getElementById('dataformat').value )
        {
            change = true;   

        }   
        if (orgData['timeformat'] != document.getElementById('timeformat').value )
        {
            change = true;   

        }   
        if (orgData['timezone'] != document.getElementById('timezone').value )
        {
            change = true;   

        }   
        if (orgData['dst'] != document.getElementById('dst').value )
        {
            change = true;   

        }   
        if (orgData['nettimesevsetup'] != document.getElementById('nettimesevsetup').value )
        {
            change = true;      
        }     
    }
    else if ( changePart == 'SETUPSYSMANAGE')
    {
        if (orgData['sysname'] != document.getElementById('sysname').value )
        {
            change = true;   

        }   
        if (orgData['password'] != document.getElementById('password').value )
        {
            change = true;   

        }   

        if ( INFO_VENDOR == "SAMSUNG" )
        {
            if (orgData["autologout"] != document.getElementById("autologout").value )
            {
                change = true;   
            }
            if (orgData["duration"] != document.getElementById("duration").value )
            {
                change = true;   
            }
        }
    }
    else if ( changePart == 'SETUPSYSCONTROLDEV')
    {
        if (orgData['systemid'] != document.getElementById('systemid').value )
        {
            change = true;   

        }   
        if (orgData['protocol'] != document.getElementById('protocol').value )
        {
            change = true;   

        }   
        if (orgData['baud'] != document.getElementById('baud').value )
        {
            change = true;   

        }   
    }
    else if ( changePart == 'SETUPRECRECORDINGOPERATION')
    {
        if (orgData['schedule'] != document.getElementById('schedule').value )
        {
            change = true;   

        }
        if (orgData['preevent'] != document.getElementById('preevent').value )
        {
            change = true;   

        }
        if (orgData['postevent'] != document.getElementById('postevent').value )
        {
            change = true;   

        }

        if (orgData['netstream_mode'] != document.getElementById('netstream_mode').value )
        {
            change = true;   

        }

    }   
    else if ( changePart == 'SETUPRECALARM')
    {
        if ( parseInt(weeklyflag) == 0 )
        {
            if (orgData["size7"] != alarm_size[7] )
            {
                change = true;   
            }
            if (orgData["fps7"] != alarm_fps[7] )
            {
                change = true;   
            }
            if (orgData["quality7"] != alarm_quality[7] )
            {
                change = true;   
            }
            if (orgData["audio7"] != alarm_audio[7] )
            {
                change = true;   
            }
        }
        else
        {
            for ( var ch = 0; ch < 7; ch++)
            {
                if (orgData["size" + ch] != alarm_size[ch] )
                {
                    change = true;   
                }
                if (orgData["fps" + ch] != alarm_fps[ch] )
                {
                    change = true;   
                }
                if (orgData["quality" + ch] != alarm_quality[ch] )
                {
                    change = true;   
                }
                if (orgData["audio" + ch] != alarm_audio[ch] )
                {
                    change = true;   
                }
            }
        }
    }    
    else if ( changePart == 'SETUPRECALARMACT')
    {
        var alarmtmp = "";

        for (var i = 0; i < 24*INFO_DVRCHANNEL; i++)
        {
            alarmtmp += alarm_rec_area[i];
        }

        alarm_mode[curweekly] = alarmtmp;

        if ( parseInt(weeklyflag) == 0 )
        {
            var orgAlarm_mod = orgData["mode7"];
            var Alarm_mod = alarm_mode[7];

            orgAlarm_mod = orgAlarm_mod.substring(0, Alarm_mod.length);
            if (orgAlarm_mod != alarm_mode[7] )
            {
                change = true;   
            }
        }
        else
        {
            for (var ch = 0; ch < 7; ch++)
            {
                var orgAlarm_mod = orgData["mode" + ch];
                var Alarm_mod = alarm_mode[ch];

                orgAlarm_mod = orgAlarm_mod.substring(0, Alarm_mod.length);

                if (orgAlarm_mod != alarm_mode[ch] )
                {
                    change = true;   
                }
            }   
        }           
    }    
    else if ( changePart == 'SETUPRECCONTINUOUS')
    {
        if ( parseInt(weeklyflag) == 0 )
        {
            if (orgData["size7"] != alarm_size[7] )
            {
                change = true;   
            }
            if (orgData["fps7"] != alarm_fps[7] )
            {
                change = true;   
            }
            if (orgData["quality7"] != alarm_quality[7] )
            {
                change = true;   
            }
            if (orgData["audio7"] != alarm_audio[7] )
            {
                change = true;   
            }
        }
        else
        {
            for ( var ch = 0; ch < 7; ch++)
            {
                if (orgData["size" + ch] != alarm_size[ch] )
                {
                    change = true;   
                }
                if (orgData["fps" + ch] != alarm_fps[ch] )
                {
                    change = true;   
                }
                if (orgData["quality" + ch] != alarm_quality[ch] )
                {
                    change = true;   
                }
                if (orgData["audio" + ch] != alarm_audio[ch] )
                {
                    change = true;   
                }
            }
        }
    }    
    else if ( changePart == 'SETUPRECCONTINUOUSACT')
    {
        var alarmtmp = "";

        for (var i = 0; i < 24*INFO_DVRCHANNEL; i++)
        {
            alarmtmp += alarm_rec_area[i];
        }

        alarm_mode[curweekly] = alarmtmp;

        if ( parseInt(weeklyflag) == 0 )
        {
            var orgAlarm_mod = orgData["mode7"];
            var Alarm_mod = alarm_mode[7];

            orgAlarm_mod = orgAlarm_mod.substring(0, Alarm_mod.length);

            if (orgAlarm_mod != alarm_mode[7] )
            {
                change = true;   
            }
        }
        else
        {
            for (var ch = 0; ch < 7; ch++)
            {
                var orgAlarm_mod = orgData["mode" + ch];
                var Alarm_mod = alarm_mode[ch];

                orgAlarm_mod = orgAlarm_mod.substring(0, Alarm_mod.length);

                if (orgAlarm_mod != alarm_mode[ch] )
                {
                    change = true;   
                }
            }   
        }           
    }    
    else if ( changePart == 'SETUPRECPANIC')
    {
        var strsize = "";
        var strfps = "";
        var strquality = "";
        var straudio = "";

        for (var ch = 0; ch < INFO_DVRCHANNEL; ch++)
        {   
            size = document.getElementById("size" + ch);
            strsize += size.value;
            fps = document.getElementById("fps" + ch);
            strfps += fps.value;
            quality = document.getElementById("quality" + ch);
            strquality += quality.value;
            audio = document.getElementById("audio" + ch);
            straudio += audio.value;
        }

        var orgsize = orgData["size"];
        var orgfps = orgData["fps"];
        var orgquality = orgData["quality"];
        var orgaudio = orgData["audio"];

        if ( parseInt(INFO_DVRCHANNEL) == 8 )
        {
            orgsize = orgsize.substring(0, 8);
            orgfps = orgfps.substring(0, 8);
            orgquality = orgquality.substring(0, 8);
            orgaudio = orgaudio.substring(0, 8);
        }
        else if ( parseInt(INFO_DVRCHANNEL) == 4 )
        {
            orgsize = orgsize.substring(0, 4);
            orgfps = orgfps.substring(0, 4);
            orgquality = orgquality.substring(0, 4);
            orgaudio = orgaudio.substring(0, 4);
        }

        if (orgsize != strsize )
        {
            change = true;   
        }
        if (orgfps != strfps )
        {
            change = true;   
        }
        if (orgquality != strquality )
        {
            change = true;   
        }
        if (orgaudio != straudio )
        {
            change = true;   
        }
    }
    else if ( changePart == 'SETUPRECNETSTREAMING')
    {
        var strsize = "";
        var strfps = "";
        var strquality = "";

        for (var ch = 0; ch < INFO_DVRCHANNEL; ch++)
        {   
            size = document.getElementById("size" + ch);
            strsize += size.value;
            fps = document.getElementById("fps" + ch);
            strfps += fps.value;
            quality = document.getElementById("quality" + ch);
            strquality += quality.value;
        }

        var orgsize = orgData["size"];
        var orgfps = orgData["fps"];
        var orgquality = orgData["quality"];

        if ( parseInt(INFO_DVRCHANNEL) == 8 )
        {
            orgsize = orgsize.substring(0, 8);
            orgfps = orgfps.substring(0, 8);
            orgquality = orgquality.substring(0, 8);
        }
        else if ( parseInt(INFO_DVRCHANNEL) == 4 )
        {
            orgsize = orgsize.substring(0, 4);
            orgfps = orgfps.substring(0, 4);
            orgquality = orgquality.substring(0, 4);
        }

        if (orgsize != strsize )
        {
            change = true;   
        }
        if (orgfps != strfps )
        {
            change = true;   
        }
        if (orgquality != strquality )
        {
            change = true;   
        }
    }
    else if ( changePart == 'SETUPUSERMANAGEMENT')
    {
        var msgelement = document.getElementById("errMsg");
        var errbuf = "";

        for (var i = 0; i < parseInt(USRTOTAL); i++)
        {
            if ( parseInt(i) < parseInt(usrmancnt) )
            {
                if (parseInt(i) == 0 )
                {
                    errbuf = usr_manager_field_check(msgelement, i);
                }
                else 
                {
                    errbuf += usr_manager_field_check(msgelement, i);
                }

                if (errbuf != "")
                {
                    var msgelement = document.getElementById("errMsg");
                    errbuf = errFieldAsterisk + "<br>" +errbuf;
                    replaceHTML(msgelement, errbuf);
                    errbuf = "";
                    return;
                }

                if (orgData["groupid" + i] != document.getElementById("groupid" + i).value)
                {
                    change = true;   
                }

                if (orgData["usrid" + i] != document.getElementById("usrid" + i).value)
                {
                    change = true;   
                }

                if (orgData["passwd" + i] != document.getElementById("passwd" + i).value)
                {
                    change = true;   
                }

                if (orgData["email" + i] != document.getElementById("email" + i).value)
                {
                    change = true;   
                }

                if (orgData["noti" + i] != getAttrCheckBox("noti"+i))
                {
                    change = true;   
                }

                if (orgData["usrcnt" + i] != usrmancnt)
                {
                    change = true;   
                }
            }
        }
    }         
    else if ( changePart == 'SETUPUSERAUTHORITY')
    {
        if (orgData["setupman"] != getAttrCheckBox("setupman") )
        {
            change = true;   
        }
        if (orgData["setupusr"] != getAttrCheckBox("setupusr") )
        {
            change = true;   
        }
        if (orgData["searchman"] != getAttrCheckBox("searchman") )
        {
            change = true;   
        }
        if (orgData["searchusr"] != getAttrCheckBox("searchusr") )
        {
            change = true;   
        }
        if (orgData["archman"] != getAttrCheckBox("archman") )
        {
            change = true;   
        }
        if (orgData["archusr"] != getAttrCheckBox("archusr") )
        {
            change = true;   
        }
        if (orgData["remoteman"] != getAttrCheckBox("remoteman") )
        {
            change = true;   
        }
        if (orgData["remoteusr"] != getAttrCheckBox("remoteusr") )
        {
            change = true;   
        }
    }
    else if ( changePart == 'SETUPUSERLOGOUT')
    {
        if (orgData["autologout"] != document.getElementById("autologout").value )
        {
            change = true;   
        }
        if (orgData["duration"] != document.getElementById("duration").value )
        {
            change = true;   
        }
    }
    else if ( changePart == 'SETUPUSERIPSETUP')
    {
        if (orgData["maxtx"] != document.getElementById("maxtx").value )
        {
            change = true;   
        }
        if (orgData["ddns"] != document.getElementById("ddns").value )
        {
            change = true;   
        }
    }
    else if ( changePart == 'SETUPUSEREMAIL')
    {
        if (orgData["port"] != document.getElementById("port").value )
        {
            change = true;   
        }
        if (orgData["user"] != document.getElementById("user").value )
        {
            change = true;   
        }
        if (orgData["password"] != document.getElementById("password").value )
        {
            change = true;   
        }
        if (orgData["from"] != document.getElementById("from").value )
        {
            change = true;   
        }
        if (orgData["server"] != document.getElementById("server").value )
        {
            change = true;   
        }
        if (orgData["security"] != document.getElementById("security").value )
        {
            change = true;   
        }

        if ( INFO_VENDOR == "DIGIMERGE" )
        {
            if (orgData["testemail"] != document.getElementById("testemail").value )
            {
                change = true;   
            }    
        }
    }
    else if ( changePart == 'SETUPUSERDDNS')
    {
        if (orgData["ddns"] != document.getElementById("ddns").value )
        {
            change = true;   
        }
        if (orgData["ddnsservername"] != document.getElementById("ddnsservername").value )
        {
            change = true;   
        }
        if (orgData["ddnsuserid"] != document.getElementById("ddnsuserid").value )
        {
            change = true;   
        }
        if (orgData["ddnsdomainname"] != document.getElementById("ddnsdomainname").value )
        {
            change = true;   
        }
        if (orgData["ddnspassword"] != document.getElementById("ddnspassword").value )
        {
            change = true;   
        }
    }
    else if ( changePart == 'SETUPEVENTHDDEVENT')
    {
        if (orgData["smartalram"] != document.getElementById("smartalram").value )
        {
            change = true;   
        }
        if (orgData["diskfullevent"] != document.getElementById("diskfullevent").value )
        {
            change = true;   
        }
        if (orgData["chkinterval"] != document.getElementById("chkinterval").value )
        {
            change = true;   
        }
    }
    else if ( changePart == 'SETUPEVENTALARMINPUT')
    {
        for (var ch = 0; ch < parseInt(ALARM_IN_CH); ch++)
        {
            if (orgData["desc" + ch] != document.getElementById("desc" + ch).value )
            {
                change = true;   
            }

            if (orgData["opration" + ch] != document.getElementById("opration" + ch).value )
            {
                change = true;   
            }

            if (orgData["type" + ch] != document.getElementById("type" + ch).value )
            {
                change = true;   
            }
        }
    }
    else if ( changePart == 'SETUPEVENTALARMOUTPUT')
    {
        event_alarmoutOnChange();

        for (var ch =0; ch < ALARM_OUT_CH; ch++)
        {
            if (orgData["mode" + ch] != alarm_out_mode[ch] )
            {
                change = true;   
            }

            if (orgData["dwell_type" + ch] != alarm_out_type[ch] )
            {
                change = true;   
            }

            if (orgData["operation" + ch] != alarm_out_operation[ch] )
            {
                change = true;   
            }

            if (orgData["duration" + ch] != alarm_out_duration[ch] )
            {
                change = true;   
            }

            if (orgData["hddevent" + ch] != alarm_out_hddevent[ch] )
            {
                change = true;   
            }

            var orgalarm = orgData["alarm" + ch];
            var orgvideoloss = orgData["videoloss" + ch];
            var orgmotion = orgData["motion" + ch];

            var curalarm = alarm_out_alarm[ch];
            var curvideoloss = alarm_out_videoloss[ch];
            var curmotion = alarm_out_motion[ch];

            if ( INFO_VENDOR == "SAMSUNG" )
            {
                if ( parseInt(INFO_DVRCHANNEL) == 8 )
                {
                    orgalarm = orgalarm.substring(0, 8);
                    orgvideoloss = orgvideoloss.substring(0, 8);
                    orgmotion = orgmotion.substring(0, 8);

                    curalarm = curalarm.substring(0, 8);
                    curvideoloss = curvideoloss.substring(0, 8);
                    curmotion = curmotion.substring(0, 8);
                }
                else
                {
                    orgalarm = orgalarm.substring(0, 4);
                    orgvideoloss = orgvideoloss.substring(0, 4);
                    orgmotion = orgmotion.substring(0, 4);

                    curalarm = curalarm.substring(0, 4);
                    curvideoloss = curvideoloss.substring(0, 4);
                    curmotion = curmotion.substring(0, 4);
                }
            }
            else
            {    
                if ( parseInt(INFO_DVRCHANNEL) == 8 )
                {
                    orgalarm = orgalarm.substring(0, 8);
                    orgvideoloss = orgvideoloss.substring(0, 8);
                    orgmotion = orgmotion.substring(0, 8);

                    curalarm = curalarm.substring(0, 8);
                    curvideoloss = curvideoloss.substring(0, 8);
                    curmotion = curmotion.substring(0, 8);
                }
                else if ( parseInt(INFO_DVRCHANNEL) == 4 )
                {
                    orgalarm = orgalarm.substring(0, 4);
                    orgvideoloss = orgvideoloss.substring(0, 4);
                    orgmotion = orgmotion.substring(0, 4);

                    curalarm = curalarm.substring(0, 4);
                    curvideoloss = curvideoloss.substring(0, 4);
                    curmotion = curmotion.substring(0, 4);
                }
            }

            if (orgalarm != curalarm )
            {
                change = true;   
            }

            if (orgvideoloss != curvideoloss )
            {
                change = true;   
            }

            if (orgmotion != curmotion )
            {
                change = true;   
            }
        }
    }
    else if ( changePart == 'SETUPEVENTBUZZER')
    {
        if (orgData["operation"] != document.getElementById("operation").value )
        {
            change = true;   
        }
        if (orgData["mode"] != document.getElementById("mode").value )
        {
            change = true;   
        }
        if (orgData["duration"] != document.getElementById("duration").value )
        {
            change = true;   
        }
        if (orgData["hddevent"] != document.getElementById("hddevent").value )
        {
            change = true;   
        }

        var alarmbuf; 
        var videolossbuf;
        var motionbuf;

        for (var i = 0; i < INFO_DVRCHANNEL; i++)
        {
            var alarmid = document.getElementById("alarm"+i);

            if (i==0)
            {
                if (alarmid.checked == true)
                {
                    alarmbuf = "1";
                }
                else
                {
                    alarmbuf = "0";
                }
            }
            else
            {
                if (alarmid.checked == true)
                {
                    alarmbuf += "1";
                }
                else
                {
                    alarmbuf += "0";
                }
            }

            var videolossid = document.getElementById("videoloss"+i);

            if (i==0)
            {
                if (videolossid.checked == true)
                {
                    videolossbuf = "1";
                }
                else
                {
                    videolossbuf = "0";
                }
            }
            else
            {
                if (videolossid.checked == true)
                {
                    videolossbuf += "1";
                }
                else
                {
                    videolossbuf += "0";
                }
            }

            var motionid = document.getElementById("motion"+i);

            if (i==0)
            {
                if (motionid.checked == true)
                {
                    motionbuf = "1";
                }
                else
                {
                    motionbuf = "0";
                }
            }
            else
            {
                if (motionid.checked == true)
                {
                    motionbuf += "1";
                }
                else
                {
                    motionbuf += "0";
                }
            }
        }          

        var orgalarm = orgData["alarm"];
        var orgvideoloss = orgData["videoloss"];
        var orgmotion = orgData["motion"];

        var curalarm = alarmbuf;
        var curvideoloss = videolossbuf;
        var curmotion = motionbuf;

        if ( INFO_VENDOR == "SAMSUNG" )
        {
            if ( parseInt(INFO_DVRCHANNEL) == 8 )
            {
                orgalarm = orgalarm.substring(0, 8);
                orgvideoloss = orgvideoloss.substring(0, 8);
                orgmotion = orgmotion.substring(0, 8);

                curalarm = curalarm.substring(0, 8);
                curvideoloss = curvideoloss.substring(0, 8);
                curmotion = curmotion.substring(0, 8);
            }
            else
            {
                orgalarm = orgalarm.substring(0, 4);
                orgvideoloss = orgvideoloss.substring(0, 4);
                orgmotion = orgmotion.substring(0, 4);

                curalarm = curalarm.substring(0, 4);
                curvideoloss = curvideoloss.substring(0, 4);
                curmotion = curmotion.substring(0, 4);
            }
        }
        else
        {    
            if ( parseInt(INFO_DVRCHANNEL) == 8 )
            {
                orgalarm = orgalarm.substring(0, 8);
                orgvideoloss = orgvideoloss.substring(0, 8);
                orgmotion = orgmotion.substring(0, 8);

                curalarm = curalarm.substring(0, 8);
                curvideoloss = curvideoloss.substring(0, 8);
                curmotion = curmotion.substring(0, 8);
            }
            else if ( parseInt(INFO_DVRCHANNEL) == 4 )
            {
                orgalarm = orgalarm.substring(0, 4);
                orgvideoloss = orgvideoloss.substring(0, 4);
                orgmotion = orgmotion.substring(0, 4);

                curalarm = curalarm.substring(0, 4);
                curvideoloss = curvideoloss.substring(0, 4);
                curmotion = curmotion.substring(0, 4);
            }
        }

        if (orgalarm != curalarm )
        {
            change = true;   
        }

        if (orgvideoloss != curvideoloss )
        {
            change = true;   
        }

        if (orgmotion != curmotion )
        {
            change = true;   
        }
    }
    else if ( changePart == 'SETUPEVENTEMAILNOTI')
    {

        if (orgData["notifi"] != document.getElementById("notification").value )
        {
            change = true;   
        }
        if (orgData["hddevent"] != document.getElementById("hddevent").value )
        {
            change = true;   
        }
        if (orgData["setupchange"] != document.getElementById("setupchange").value )
        {
            change = true;   
        }
        if (orgData["bootingevent"] != document.getElementById("bootingevent").value )
        {
            change = true;   
        }

        if (orgData["frequency"] != document.getElementById("frequency").value )
        {
            change = true;   
        }


        if ( INFO_VENDOR == "SAMSUNG" || INFO_VENDOR == "_SNF_0824_BASIC" || INFO_VENDOR == "_SNF_1648_BASIC" )
        {
            if (orgData["emailsnapshotnoti"] != document.getElementById("emailsnapshotnoti").value )
            {
                change = true;   
            }    
        }

        var alarmbuf; 
        var videolossbuf;
        var motionbuf;

        for (var i = 0; i < INFO_DVRCHANNEL; i++)
        {
            var alarmid = document.getElementById("alarm"+i);

            if (i==0)
            {
                if (alarmid.checked == true)
                {
                    alarmbuf = "1";
                }
                else
                {
                    alarmbuf = "0";
                }
            }
            else
            {
                if (alarmid.checked == true)
                {
                    alarmbuf += "1";
                }
                else
                {
                    alarmbuf += "0";
                }
            }

            var videolossid = document.getElementById("videoloss"+i);

            if (i==0)
            {
                if (videolossid.checked == true)
                {
                    videolossbuf = "1";
                }
                else
                {
                    videolossbuf = "0";
                }
            }
            else
            {
                if (videolossid.checked == true)
                {
                    videolossbuf += "1";
                }
                else
                {
                    videolossbuf += "0";
                }
            }

            var motionid = document.getElementById("motion"+i);

            if (i==0)
            {
                if (motionid.checked == true)
                {
                    motionbuf = "1";
                }
                else
                {
                    motionbuf = "0";
                }
            }
            else
            {
                if (motionid.checked == true)
                {
                    motionbuf += "1";
                }
                else
                {
                    motionbuf += "0";
                }
            }
        }          

        var orgalarm = orgData["alarm"];
        var orgvideoloss = orgData["videoloss"];
        var orgmotion = orgData["motion"];

        var curalarm = alarmbuf;
        var curvideoloss = videolossbuf;
        var curmotion = motionbuf;

        if ( INFO_VENDOR == "SAMSUNG" )
        {
            if ( parseInt(INFO_DVRCHANNEL) == 8 )
            {
                orgalarm = orgalarm.substring(0, 8);
                orgvideoloss = orgvideoloss.substring(0, 8);
                orgmotion = orgmotion.substring(0, 8);

                curalarm = curalarm.substring(0, 8);
                curvideoloss = curvideoloss.substring(0, 8);
                curmotion = curmotion.substring(0, 8);
            }
            else
            {
                orgalarm = orgalarm.substring(0, 4);
                orgvideoloss = orgvideoloss.substring(0, 4);
                orgmotion = orgmotion.substring(0, 4);

                curalarm = curalarm.substring(0, 4);
                curvideoloss = curvideoloss.substring(0, 4);
                curmotion = curmotion.substring(0, 4);
            }
        }
        else
        {    
            if ( parseInt(INFO_DVRCHANNEL) == 8 )
            {
                orgalarm = orgalarm.substring(0, 8);
                orgvideoloss = orgvideoloss.substring(0, 8);
                orgmotion = orgmotion.substring(0, 8);

                curalarm = curalarm.substring(0, 8);
                curvideoloss = curvideoloss.substring(0, 8);
                curmotion = curmotion.substring(0, 8);
            }
            else if ( parseInt(INFO_DVRCHANNEL) == 4 )
            {
                orgalarm = orgalarm.substring(0, 4);
                orgvideoloss = orgvideoloss.substring(0, 4);
                orgmotion = orgmotion.substring(0, 4);

                curalarm = curalarm.substring(0, 4);
                curvideoloss = curvideoloss.substring(0, 4);
                curmotion = curmotion.substring(0, 4);
            }
        }

        if (orgalarm != curalarm )
        {
            change = true;   
        }

        if (orgvideoloss != curvideoloss )
        {
            change = true;   
        }

        if (orgmotion != curmotion )
        {
            change = true;   
        }
    }   

    if ( change == true )
    {
        var retsave = true;

        if ( INFO_VENDOR == 'SAMSUNG' )
        {
            if ( cause == "urlchange" )
            {
                cause = 'onOK';
                retsave = false;
            }
        }

        if ( cause == "urlchange" )
        {
            retsave = confirm(saveMsg);
        }           
        if (retsave == true)
        {
            if ( changePart == 'SETUPCAMCAM' )
            {
                act_onClick_func(document.camsetting_cam);
            }
            else if ( changePart == 'SETUPCAMIMAGE')
            {
                act_onClick_func(document.camsetting_image);
            }
            else if ( changePart == 'SETUPCAMMOTION')
            {
                motion_onClick_func(document.camsetting_motion);
            }
            else if ( changePart == 'SETUPCAMPTZ')
            {
                act_onClick_func(document.camsetting_ptz);            
            }
            else if ( changePart == 'SETUPCAMDMVA')
            {
                act_onClick_func(document.camsetting_dmva);            
            }
            else if ( changePart == 'SETUPDISPOSD')
            {
                disp_onClick_func(document.displaysetting_osd);          
            }
            else if ( changePart == 'SETUPDISPMONITOR')
            {
                disp_onClick_func(document.displaysetting_monitor);
            }
            else if ( changePart == 'SETUPDISPSOUND')
            {
                sound_onClick_func(document.soundsetting_audio);
            }
            else if ( changePart == 'SETUPSYSDATETIME')
            {
                system_onClick_func(document.systemsetting_datetime);
            }
            else if ( changePart == 'SETUPSYSMANAGE')
            {
                system_onClick_func(document.systemsetting_manage);
            }
            else if ( changePart == 'SETUPSYSCONTROLDEV')
            {
                system_onClick_func(document.systemsetting_controldev);
            }
            else if ( changePart == 'SETUPRECRECORDINGOPERATION')
            {
                record_onClick_func(document.recordsetting_operation);
            }   
            else if ( changePart == 'SETUPRECALARM')
            {
                record_onClick_func(document.recordsetting_alarm);
            }    
            else if ( changePart == 'SETUPRECALARMACT')
            {
                record_onClick_func(document.recordsetting_alarm_act);
            }    
            else if ( changePart == 'SETUPRECCONTINUOUS')
            {
                record_onClick_func(document.recordsetting_continuous_motion);
            }    
            else if ( changePart == 'SETUPRECCONTINUOUSACT')
            {
                record_onClick_func(document.recordsetting_continuous_motion_act);
            }    
            else if ( changePart == 'SETUPRECPANIC')
            {
                record_onClick_func(document.recordsetting_panic);
            }
            else if ( changePart == 'SETUPRECNETSTREAMING')
            {
                record_onClick_func(document.recordsetting_netstreaming_panic);
            }
            else if ( changePart == 'SETUPUSERMANAGEMENT')
            {
                usr_onClick_func(document.usrsetting_usrmange);
            }         
            else if ( changePart == 'SETUPUSERAUTHORITY')
            {
                usr_onClick_func(document.usrsetting_usrauthority);
            }
            else if ( changePart == 'SETUPUSERLOGOUT')
            {
                usr_onClick_func(document.usrsetting_logout);
            }
            else if ( changePart == 'SETUPUSERIPSETUP')
            {
                network_onClick_func(document.networksetting_ipsetup);
            }
            else if ( changePart == 'SETUPUSEREMAIL')
            {
                network_onClick_func(document.networksetting_email);
            }
            else if ( changePart == 'SETUPUSERDDNS')
            {
                network_onClick_func(document.networksetting_ddns);
            }
            else if ( changePart == 'SETUPEVENTHDDEVENT')
            {
                event_onClick_func(document.eventsetting_hddevent);
            }
            else if ( changePart == 'SETUPEVENTALARMINPUT')
            {
                event_onClick_func(document.eventsetting_alarm_input);
            }
            else if ( changePart == 'SETUPEVENTALARMOUTPUT')
            {
                event_onClick_func(document.eventsetting_alarm_output);
            }
            else if ( changePart == 'SETUPEVENTBUZZER')
            {
                event_onClick_func(document.eventsetting_buzzer);
            }
            else if ( changePart == 'SETUPEVENTEMAILNOTI')
            {
                event_onClick_func(document.eventsetting_emailnoti);
            }   
        }
    }
    else
    {
        var msgelement = document.getElementById("errMsg");

        if (msgelement)
        {
            if (getText(msgelement) != null || getText(msgelement) != "")
            {
                clearText(msgelement);
            }
        }
    }
}

