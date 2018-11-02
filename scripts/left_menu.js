/* TODO: product specific process */
function print_left_menu(obj, cate, sub)
{
    var sub_s_0 = "";
    var sub_s_1 = "";
    var sub_s_2 = "";
    var sub_s_3 = "";
    var sub_s_4 = "";
    var sub_s_5 = "";
    var sub_s_6 = "";
    var sub_s_7 = "";
    var sub_s_8 = "";
    var sub_s_9 = "";
    var sub_s_10 = "";
    var sub_s_11 = "";

    var sub_i_0 = "none";
    var sub_i_1 = "none";
    var sub_i_2 = "none";
    var sub_i_3 = "none";
    var sub_i_4 = "none";
    var sub_i_5 = "none";
    var sub_i_6 = "none";
    var sub_i_7 = "none";
    var sub_i_8 = "none";
    var sub_i_9 = "none";
    var sub_i_10 = "none";
    var sub_i_11 = "none";

    /* Category Camera: sub-> Camera, Color, PTZ, Motion*/
    if( cate == "Camera" )
    {
        var menuMask = 0;
        var patt;
        var info;
        patt = /IPX.*ECO/;

        /*
         * Cam Menu Masking
         * 2: Image Setup
         * 4: Covert
         * 8: Motion
         * 16: Camera Type (HD-SDI)
         * 32: PTZ
         * 64: Tamper Setup
         * 128: Privacy Mask
         * 256: NVR Open Mode Installation Mode
         * 512: NVR Open Mode
         * 1024: DMVA Setup
         * 2048: Camera Type (4G DVR)
         */

        if( INFO_MODEL.indexOf("IPX") >= 0 ) {
          menuMask = 16 | 64 | 1024 | 2048;

          // Removed Privacy mask menu(IPX, ASP GRUNDIG)
          if( INFO_VENDOR == 'ASP') {
            menuMask |= 128;
          }

          if ( patt.exec(INFO_MODEL) != null ) {
            menuMask |= 512;
          }
        } else if( INFO_MODEL.indexOf("HDI") >= 0 ) {
          menuMask = 2 | 64 | 128 | 256 | 512 | 2048;
        } else if( INFO_MODEL.indexOf("HDY") >= 0 ) {
          menuMask = 64 | 128 | 256 | 512 | 2048;
        } else if( INFO_MODEL.indexOf("_ANF_") >= 0 ) {
          menuMask = 16 | 256 | 512 | 2048;
        } else if( INFO_MODEL.indexOf("_ATM_") >= 0 ) {
          menuMask = 16 | 256 | 512 | 2048;
        } else if ( INFO_MODEL.indexOf("HDS") >= 0) {
          menuMask = 2 | 64 | 128 | 256 | 512 | 2048;
        } else if ( INFO_MODEL.indexOf("_UTM_") >= 0) {
          menuMask = 16 | 64 | 256 | 512 | 2048;
        } else if ( INFO_MODEL.indexOf("_ANF4G_") >= 0) {
          menuMask = 16 | 256 | 512;
        } else if ( INFO_MODEL.indexOf("_ATM4G_") >= 0) {
          menuMask = 16 | 256 | 512;
        } else if ( INFO_MODEL.indexOf("_UTM4G_") >= 0) {
          menuMask = 16 | 256 | 512 | 2048;
        } else if ( INFO_MODEL.indexOf("_ANF5G_") >= 0) {
          menuMask = 16 | 256 | 512;
        } else if ( INFO_MODEL.indexOf("_ATM5G_") >= 0) {
          menuMask = 16 | 256 | 512;
        } else if ( INFO_MODEL.indexOf("_UTM5G_") >= 0) {
          menuMask = 16 | 256 | 512;
        } else if ( INFO_MODEL.indexOf("_UTM5X_") >= 0) {
          menuMask = 16 | 256 | 512;
        } else if ( INFO_MODEL.indexOf("5HG_") >= 0 || INFO_MODEL.indexOf("5HGA_") >= 0) {
          menuMask = 16 | 256 | 512;
        }

        if ( !INFO_TAMPER_SUPPORT ) {
          menuMask |= 64;
        }

        if ( !INFO_DMVA_SUPPORT ) {
          menuMask |= 1024;

        }

        if(typeof(INFO_SYSTEM_TYPE) != "undefined"
          &&(  INFO_SYSTEM_TYPE == '6' // TVI Only
            || INFO_SYSTEM_TYPE == '7' // AHD Only
            || INFO_SYSTEM_TYPE == '8' // HDSDI Only
            || INFO_SYSTEM_TYPE == '9' // NVR Only
            || INFO_SYSTEM_TYPE == '10' //EX-SDI
          )) {
          menuMask |= 2048;  //Do not display analog type setup.
        }

        if(typeof(INFO_SYSTEM_TYPE) != "undefined"
          && INFO_SYSTEM_TYPE == '10' //EX-SDI
          ) {
          menuMask |= 2;
        }

        if(sub == "Title") { sub_s_0 = "class=\"on\""; sub_i_0 = "focus"; info="camera.title"; }
        if(sub == "Image") { sub_s_1 = "class=\"on\""; sub_i_1 = "focus"; info="camera.compatibility";}
        if(sub == "Covert") { sub_s_2 = "class=\"on\""; sub_i_2 = "focus"; info="camera.covert";}
        if(sub == "Motion") { sub_s_3 = "class=\"on\""; sub_i_3 = "focus"; info="camera.motion&chno=0";}
        if(sub == "Type") { sub_s_5 = "class=\"on\""; sub_i_5 = "focus"; }
        if(sub == "PTZ") { sub_s_4 = "class=\"on\""; sub_i_4 = "focus"; info="camera.ptz";}
        if(sub == "PrivMask") { sub_s_7 = "class=\"on\""; sub_i_7 = "focus"; info="camera.privmask&chno=0";}
        if(sub == "Tamper") { sub_s_6 = "class=\"on\""; sub_i_6 = "focus"; }
        if(sub == "CamInst") { sub_s_8 = "class=\"on\""; sub_i_8 = "focus"; }
        if(sub == "Dmva") { sub_s_9 = "class=\"on\""; sub_i_9 = "focus"; info="camera.dmva";}
        if(sub == "InstMode") { sub_s_10 = "class=\"on\""; sub_i_10 = "focus"; }
        if(sub == "AnalogType") { sub_s_11 = "class=\"on\""; sub_i_11 = "focus"; }

        // ------
        // Main String for Camera
        obj.write("<li><a href='../html/setup_cam_title.htm'><span id='lang_MenuCamera'><img src='../images/images/dot_one.gif'>lang_MenuCamera</span></a></li>");
        obj.write("<ul style=\"padding-left:20px;\">");

        // ------
        // Camera Sub Menus
        if( (menuMask & 2048) == 0) {
          obj.write("<li "+ sub_s_11 + "><a href='../html/setup_cam_analog_type.htm'><span id='lang_MenuCamAnalogType'><img src='../images/images/dot_" + sub_i_11 + ".gif'>lang_MenuCamAnalogType</span></a></li>");
        }

        if( ((menuMask & 256) == 0 && INFO_CAMERA_INSTALL_MODE == '1' && SUPPORT_OPENMODE == '1') ||  patt.exec(INFO_MODEL) != null)
          obj.write("<li "+ sub_s_8 + "><a href='../Viewer.htm#setup/Camera/CameraInstallation'><span id='lang_MenuCamCamInst'><img src='../images/images/dot_" + sub_i_8 + ".gif'>lang_MenuCamCamInst</span></a></li>");

        if( (menuMask & 1) == 0)
          obj.write("<li "+ sub_s_0 + "><a href='../html/setup_cam_title.htm'><span id='lang_MenuCamTitle'><img src='../images/images/dot_" + sub_i_0 + ".gif'>lang_MenuCamTitle</span></a></li>");

        // TODO image setup is dependant on DVR MODEL
        if( (menuMask & 2) == 0) {
          if( INFO_MODEL.indexOf("IPX")  >= 0 ) {
            obj.write("<li "+ sub_s_1 + "><a href='../html/setup_cam_compatibility.htm'><span id='lang_MenuCamCameraSetup'><img src='../images/images/dot_" + sub_i_1 + ".gif'>lang_MenuCamCameraSetup</span></a></li>");
          } else {
            obj.write("<li "+ sub_s_1 + "><a href='../html/setup_cam_image.htm'><span id='lang_MenuCamImage'><img src='../images/images/dot_" + sub_i_1 + ".gif'>lang_MenuCamImage</span></a></li>");
          }
        }

        if( (menuMask & 4) == 0)
          obj.write("<li "+ sub_s_2 + "><a href='../html/setup_cam_covert.htm'><span id='lang_MenuCamCovert'><img src='../images/images/dot_" + sub_i_2 + ".gif'>lang_MenuCamCovert</span></a></li>");

        // TODO motion setup is one of two
        if( (menuMask & 8) == 0) {
          obj.write("<li "+ sub_s_3 + "><a href='../html/setup_cam_motion.htm'><span id='lang_MenuCamMotion'><img src='../images/images/dot_" + sub_i_3 + ".gif'>lang_MenuCamMotion</span></a></li>");
        } else {
          obj.write("<li "+ sub_s_3 + "><a href='../html/setup_cam_motion_dvr.htm'><span id='lang_MenuCamMotion'><img src='../images/images/dot_" + sub_i_3 + ".gif'>lang_MenuCamMotion</span></a></li>");
        }

        if( (menuMask & 16) == 0) {
          obj.write("<li "+ sub_s_5 + "><a href='../html/setup_cam_type.htm'><span id='lang_MenuCamType'><img src='../images/images/dot_" + sub_i_5 + ".gif'>lang_MenuCamType</span></a></li>");
        }

        if( (menuMask & 16) == 0) {
          obj.write("<li "+ sub_s_5 + "><a href='../html/setup_cam_type.htm'><span id='lang_MenuCamType'><img src='../images/images/dot_" + sub_i_5 + ".gif'>lang_MenuCamType</span></a></li>");
        }

        if( (menuMask & 32) == 0) {
            obj.write("<li "+ sub_s_4 + "><a href='../html/setup_cam_ptz_ipx.htm'><span id='lang_MenuCamPTZ'><img src='../images/images/dot_" + sub_i_4 + ".gif'>lang_MenuCamPTZ</span></a></li>");
        }

        if( (menuMask & 128) == 0 ) {
          obj.write("<li "+ sub_s_7 + "><a href='../html/setup_cam_privmask.htm'><span id='lang_MenuCamPrivMask'><img src='../images/images/dot_" + sub_i_7 + ".gif'>lang_MenuCamPrivMask</span></a></li>");
        }

        if( (menuMask & 64) == 0){
          obj.write("<li "+ sub_s_6 + "><a href='../html/setup_cam_tamper_n.htm'><span id='lang_MenuCamTamper'><img src='../images/images/dot_" + sub_i_6 + ".gif'>lang_MenuCamTamper</span></a></li>");
        }

        if( (menuMask & 1024) == 0) {
          obj.write("<li "+ sub_s_9 + "><a href='../html/setup_cam_dmva.htm'><span id='lang_MenuCamVcasetup'><img src='../images/images/dot_" + sub_i_9 + ".gif'>lang_MenuCamVcasetup</span></a></li>");
        }

        /*
         * replaced with INFO_DMVA_SUPPORT by chcha
        if( (menuMask & 1024) == 0) {
          $.ajax({
            type: "GET",
            url: "/cgi-bin/webra_fcgi.fcgi",
            async: false,
            data: "action=get_setup&menu="+info,
            error: function() {
              console.log("fail");
            },

            success: function(data){
              var dmva_support=encode_to_array(data);
              if(dmva_support['dmvasupported'] == 1)
                obj.write("<li "+ sub_s_9 + "><a href='../html/setup_cam_dmva.htm'><span id='lang_MenuCamVcasetup'><img src='../images/images/dot_" + sub_i_9 + ".gif'>lang_MenuCamVcasetup</span></a></li>");

            }
          });
        }
        */


        if( (menuMask & 512) == 0  && SUPPORT_OPENMODE == '1') {
          obj.write("<li "+ sub_s_10 + "><a href='../Viewer.htm#setup/Camera/InstallationMode'><span id='lang_MenuCamInstMode'><img src='../images/images/dot_" + sub_i_10 + ".gif'>lang_MenuCamInstMode</span></a></li>");
        }


        obj.write("</ul>");
    }
    else {
        obj.write("<li><a href='../html/setup_cam_title.htm'><span id='lang_MenuCamera'><img src='../images/images/dot_some.gif'>lang_MenuCamera</span></a></li>");
    }

    /* Category Display : sub-> OSD, Monitor*/
    if( cate == "Display" ) {
        if(sub == "OSD") { sub_s_0 = "class=\"on\""; sub_i_0 = "focus"; }
        if(sub == "Monitor") { sub_s_1 = "class=\"on\""; sub_i_1 = "focus"; }
        if(sub == "Sequence") { sub_s_2 = "class=\"on\""; sub_i_2 = "focus"; }
        if(sub == "Spot") { sub_s_3 = "class=\"on\""; sub_i_3 = "focus"; }
        if(sub == "HdSpot") { sub_s_4 = "class=\"on\""; sub_i_4 = "focus"; }

        obj.write("<li><a href='../html/setup_display_osd.htm'><span id='lang_MenuDisplay'><img src='../images/images/dot_one.gif'>lang_MenuDisplay</span></a></li>");
        obj.write("<ul style=\"padding-left:20px;\">");
        obj.write("<li "+ sub_s_0 + "><a href='../html/setup_display_osd.htm'><span id='lang_MenuDispOsd'><img src='../images/images/dot_" + sub_i_0 + ".gif'>lang_MenuDispOsd</span></a></li>");
        //obj.write("<li "+ sub_s_1 + "><a href='../html/setup_display_monitor.htm'><span id='lang_MenuDispMonitor'><img src='../images/images/dot_" + sub_i_1 + ".gif'>lang_MenuDispMonitor</span></a></li>");
        //obj.write("<li "+ sub_s_2 + "><a href='../html/setup_display_seq.htm'><span id='lang_MenuDispSeq'><img src='../images/images/dot_" + sub_i_2 + ".gif'>lang_MenuDispSeq</span></a></li>");
        //obj.write("<li "+ sub_s_3 + "><a href='../html/setup_display_spot.htm'><span id='lang_MenuDispSpot'><img src='../images/images/dot_" + sub_i_3 + ".gif'>lang_MenuDispSpot</span></a></li>");
        //obj.write("<li "+ sub_s_4 + "><a href='../html/setup_display_hdspot.htm'><span id='lang_MenuDispHdSpot'><img src='../images/images/dot_" + sub_i_3 + ".gif'>lang_MenuDispHdSpot</span></a></li>");
        obj.write("</ul>");
    }
    else {
        obj.write("<li><a href='../html/setup_display_osd.htm'><span id='lang_MenuDisplay'><img src='../images/images/dot_some.gif'>lang_MenuDisplay</span></a></li>");
    }

    /* Category Sound : sub-> Audio/Buzzer*/
    if( cate == "Sound" ) {
        if(sub == "Audio/Buzzer") { sub_s_0 = "class=\"on\""; sub_i_0 = "focus"; }

        obj.write("<li><a href='../html/setup_sound_audio.htm'><span id='lang_MenuAudio'><img src='../images/images/dot_one.gif'>lang_MenuAudio</span></a></li>");
        obj.write("<ul style=\"padding-left:20px;\">");
        obj.write("<li "+ sub_s_0 + "><a href='../html/setup_sound_audio.htm'><span id='lang_MenuSoundAudio'><img src='../images/images/dot_" + sub_i_0 + ".gif'>lang_MenuSoundAudio</span></a></li>");
        obj.write("</ul>");
    }
    else {
        obj.write("<li><a href='../html/setup_sound_audio.htm'><span id='lang_MenuAudio'><img src='../images/images/dot_some.gif'>lang_MenuAudio</span></a></li>");
    }

    /* Category User: sub-> User management, User authority, Log out */
    if( cate == "User" ) {
        if(sub == "User management") { sub_s_0 = "class=\"on\""; sub_i_0 = "focus"; }
        if(sub == "User authority") { sub_s_1 = "class=\"on\""; sub_i_1 = "focus"; }

        obj.write("<li><a href='../html/setup_user_management.htm'><span id='lang_MenuUser'><img src='../images/images/dot_one.gif'>lang_MenuUser</span></a></li>");
        obj.write("<ul style=\"padding-left:20px;\">");
        obj.write("<li " + sub_s_0 + "><a href='../html/setup_user_management.htm'><span id='lang_MenuUsermanagement'><img src='../images/images/dot_"+ sub_i_0 +".gif'>lang_MenuUsermanagement</span></a></li>");
        obj.write("<li " + sub_s_1 + "><a href='../html/setup_user_group_authority.htm'><span id='lang_MenuGroupAuthority'><img src='../images/images/dot_"+ sub_i_1 +".gif'>lang_MenuGroupAuthority</span></a></li>");
        obj.write("</ul>");
    }
    else {
        obj.write("<li><a href='../html/setup_user_management.htm'><span id='lang_MenuUser'><img src='../images/images/dot_some.gif'>lang_MenuUser</span></a></li>");
    }

    /* Category Network: sub-> Network, E-mail */
    if( cate == "Network" ) {
        var menuMask = 0;

        if( INFO_VENDOR == 'NOVUS' ) {
          menuMask |= 2;
        }

        menuMask |= 8;

        if(sub == "Network") { sub_s_0 = "class=\"on\""; sub_i_0 = "focus"; }
        if(sub == "DDNS") { sub_s_1 = "class=\"on\""; sub_i_1 = "focus"; }
        if(sub == "E-mail") { sub_s_2 = "class=\"on\""; sub_i_2 = "focus"; }
        //if(sub == "NetStatus") { sub_s_3 = "class=\"on\""; sub_i_3 = "focus"; }
        if( (INFO_MODEL.indexOf("IPX")  >= 0 || INFO_MODEL.indexOf("UTM4G")  >= 0
            || ((INFO_VENDOR == 'CBC') && (INFO_MODEL.indexOf("ANF")  >= 0 || INFO_MODEL.indexOf("ATM") >= 0 || INFO_MODEL.indexOf("UTM") >= 0))
            || (INFO_MODEL.indexOf("5G") >= 0 || INFO_MODEL.indexOf("5X") >= 0)
            || (INFO_MODEL.indexOf("5HG") >= 0))
              && INFO_VENDOR.indexOf("KB_DEVICE") < 0 
          ) {
          if(sub == "Security") { sub_s_4 = "class=\"on\""; sub_i_4 = "focus"; }
        }
        if( INFO_MODEL.indexOf("IPX")  >= 0 ) {
          if(sub == "SNMP") { sub_s_5 = "class=\"on\""; sub_i_5 = "focus"; }
        }
        if( INFO_VENDOR.indexOf("KB_DEVICE") < 0) {
        if(sub == "RTP") { sub_s_5 = "class=\"on\""; sub_i_5 = "focus"; }
        }

        obj.write("<li><a href='../html/setup_network_ipsetup.htm'><span id='lang_MenuNetwork'><img src='../images/images/dot_some.gif'>lang_MenuNetwork</span></a></li>");
        obj.write("<ul style=\"padding-left:20px;\">");

        if( (menuMask & 1) == 0) {
          obj.write("<li "+ sub_s_0 + "><a href='../html/setup_network_ipsetup.htm'><span id='lang_MenuIPsetup'><img src='../images/images/dot_" + sub_i_0 + ".gif'>lang_MenuIPsetup</span></a></li>");
        }
        if( (menuMask & 2) == 0) {
          obj.write("<li "+ sub_s_1 + "><a href='../html/setup_network_ddns.htm'><span id='lang_ddnssetup'><img src='../images/images/dot_" + sub_i_1 + ".gif'>DDNS</span></a></li>");
          /*obj.write("<li "+ sub_s_1 + "><a href='../html/setup_network_ddns.htm'><span id='lang_ddnssetup'><img src='../images/images/dot_" + sub_i_1 + ".gif'>lang_ddnssetup</span></a></li>");*/
        }
        if( (menuMask & 4) == 0) {
          obj.write("<li "+ sub_s_2 + "><a href='../html/setup_network_email.htm'><span id='lang_MenuEmail'><img src='../images/images/dot_" + sub_i_2 + ".gif'>lang_MenuEmail</span></a></li>");
        }
        if( (menuMask & 8) == 0) {
          obj.write("<li "+ sub_s_3 + "><a href='../html/setup_network_status.htm'><span id='lang_MenuNetStatus'><img src='../images/images/dot_" + sub_i_3 + ".gif'>lang_MenuNetStatus</span></a></li>");
        }
        if( (menuMask & 16) == 0) {
            if( (INFO_MODEL.indexOf("IPX") >= 0 || INFO_MODEL.indexOf("UTM4G") >= 0
                || (INFO_VENDOR == 'CBC' && (INFO_MODEL.indexOf("ANF_") >= 0 || INFO_MODEL.indexOf("ATM_") >= 0 || INFO_MODEL.indexOf("UTM_") >= 0 ))
                || (INFO_MODEL.indexOf("5G") >= 0 || INFO_MODEL.indexOf("5X") >= 0)
                || (INFO_MODEL.indexOf("5HG") >= 0))
                  && INFO_VENDOR.indexOf("KB_DEVICE") < 0 
              ) {
            obj.write("<li "+ sub_s_4 + "><a href='../html/setup_network_security.htm'><span id='lang_MenuNetSecurity'><img src='../images/images/dot_" + sub_i_4 + ".gif'>lang_MenuNetSecurity</span></a></li>");
          }
        }
        if( (menuMask & 32) == 0) {
          if( INFO_MODEL.indexOf("IPX")  >= 0 ) {
            obj.write("<li "+ sub_s_5 + "><a href='../html/setup_network_snmp.htm'><span id='lang_MenuNetSNMP'><img src='../images/images/dot_" + sub_i_5 + ".gif'>SNMP</span></a></li>");
          }
        }
        if( INFO_VENDOR.indexOf("KB_DEVICE") < 0) {
        obj.write("<li "+ sub_s_5 + "><a href='../html/setup_network_rtp.htm'><span id='lang_MenuNetRTP'><img src='../images/images/dot_" + sub_i_5 + ".gif'>RTP</span></a></li>");
        }
        obj.write("</ul>");
    }
    else {
        obj.write("<li><a href='../html/setup_network_ipsetup.htm'><span id='lang_MenuNetwork'><img src='../images/images/dot_some.gif'>lang_MenuNetwork</span></a></li>");
    }

    var _is_support_model_system_security = function() {
      var enum_system_security_support_model = ['5G', '5X', 'IPX', '5HG'];

      for(var i=0; i<enum_system_security_support_model.length; i++) {
        if(INFO_MODEL.indexOf(enum_system_security_support_model[i]) >= 0) {
          return true;
        }
      }

      return false;
    }

    var _is_support_vendor_system_security = function() {
      var enum_system_security_support_vendor = ['ITX', 'CBC', 'VIDECON', 'TAKENAKA'];

      for(var i=0; i<enum_system_security_support_vendor.length; i++) {
        if(INFO_VENDOR.indexOf(enum_system_security_support_vendor[i]) >= 0) {
          return true;
        }
      }

      return false;
    }

    var _is_support_system_security = function() {
      return _is_support_model_system_security() && _is_support_vendor_system_security();
    }

    /* Category System: sub-> Date/Time, System Management, Control device */
    if( cate == "System" ) {
        if(sub == "Date/Time" ) { sub_s_0 = "class=\"on\""; sub_i_0 = "focus"; }
        if(sub == "System Management"  ) { sub_s_1 = "class=\"on\" "; sub_i_1 = "focus"; }
        if(sub == "System Information"  ) { sub_s_2 = "class=\"on\" "; sub_i_2 = "focus"; }
        if(sub == "Control device") { sub_s_3 = "class=\"on\""; sub_i_3 = "focus" }
        //if(sub == "Text-in device") { sub_s_4 = "class=\"on\""; sub_i_4 = "focus" }
        if(_is_support_system_security() == true) {
          if(sub == "Security") { sub_s_5 = "class=\"on\""; sub_i_5 = "focus" }
        }

        obj.write("<li><a href='../html/setup_system_datetime.htm'><span id='lang_MenuSystem'><img src='../images/images/dot_one.gif'>lang_MenuSystem</span></a></li>");
        obj.write("<ul style=\"padding-left:20px;\">");
        obj.write("<li " + sub_s_0 + "><a href='../html/setup_system_datetime.htm'><span id='lang_MenuSysDateTime'><img src='../images/images/dot_" + sub_i_0 + ".gif'>lang_MenuSysDateTime</span></a></li>");
        obj.write("<li " + sub_s_1 + "><a href='../html/setup_system_manage.htm'><span id='lang_MenuSysManagement'><img src='../images/images/dot_" + sub_i_1 + ".gif'>lang_MenuSysManagement</span></a></li>");
        obj.write("<li " + sub_s_2 + "><a href='../html/setup_system_info.htm'><span id='lang_MenuSysInformation'><img src='../images/images/dot_" + sub_i_2 + ".gif'>lang_MenuSysInformation</span></a></li>");
        if( INFO_VENDOR!='ALSOK' && INFO_VENDOR != 'TAKENAKA') {
            obj.write("<li " + sub_s_3 + "><a href='../html/setup_system_control_dev.htm'><span id='lang_MenuSysControlDevice'><img src='../images/images/dot_" + sub_i_3 + ".gif'>lang_MenuSysControlDevice</span></a></li>");
        }
        //obj.write("<li " + sub_s_4 + "><a href='../html/setup_system_textin_dev.htm'><span id='lang_MenuSysTextInDevice'><img src='../images/images/dot_" + sub_i_3 + ".gif'>lang_MenuSysTextInDevice</span></a></li>");
        if(_is_support_system_security() == true) {
          obj.write("<li " + sub_s_5 + "><a href='../html/setup_system_security.htm'><span id='lang_MenuSysSecurity'><img src='../images/images/dot_" + sub_i_5 + ".gif'>lang_MenuSysSecurity</span></a></li>");
        }
        obj.write("</ul>");
    }
    else {
        obj.write("<li><a href='../html/setup_system_datetime.htm'><span id='lang_MenuSystem'><img src='../images/images/dot_some.gif'>lang_MenuSystem</span></a></li>");
    }

    /* Category Storage: */
    if( cate == "Storage" ) {
        if(sub == "Disk Information") { sub_s_0 = "class=\"on\""; sub_i_0 = "focus"; }
        if(sub == "Disk Operation") { sub_s_1 = "class=\"on\""; sub_i_1 = "focus"; }
        if(sub == "Disk Configuration") { sub_s_2 = "class=\"on\""; sub_i_2 = "focus"; }
        if(sub == "SMART Setup") { sub_s_3 = "class=\"on\""; sub_i_3 = "focus"; }

        obj.write("<li><a href='../html/setup_storage_diskinfo.htm'><span id='lang_MenuStorage'><img src='../images/images/dot_some.gif'>lang_MenuStorage</span></a></li>");
        obj.write("<ul style=\"padding-left:20px;\">");
        obj.write("<li "+sub_s_0+"><a href='../html/setup_storage_diskinfo.htm' ><span id='lang_MenuStorageDiskinfo'><img src='../images/images/dot_"+sub_i_0+".gif'>lang_MenuStorageDiskinfo</span></a></li>");
        obj.write("<li "+sub_s_1+"><a href='../html/setup_storage_diskop.htm'   ><span id='lang_MenuStorageDiskOP'><img src='../images/images/dot_"+sub_i_1+".gif'>lang_MenuStorageDiskOP</span></a></li>");
        //obj.write("<li "+sub_s_2+"><a href='../html/setup_storage_diskconf.htm' ><span id='lang_MenuStorageDiskConf'><img src='../images/images/dot_"+sub_i_2+".gif'>lang_MenuStorageDiskConf</span></a></li>");
        obj.write("<li "+sub_s_3+"><a href='../html/setup_storage_smart.htm'    ><span id='lang_MenuStorageSmart'><img src='../images/images/dot_"+sub_i_3+".gif'>lang_MenuStorageSmart</span></a></li>");
        obj.write("</ul>");
    } else {
        obj.write("<li><a href='../html/setup_storage_diskinfo.htm'><span id='lang_MenuStorage'><img src='../images/images/dot_some.gif'>lang_MenuStorage</span></a></li>");
    }

    /* Category Event: sub-> HDD event, Alarm input, Alarm output, Buzzer out, E-mail notification */
    if( cate == "Event" ) {
        var menuMask = 0;

        if( INFO_MODEL.indexOf("IPX") >= 0 ) {
          menuMask = 32;
        } else if( INFO_MODEL.indexOf("_HDI_") >= 0 ) {
          menuMask = 32|64;
        } else if( INFO_MODEL.indexOf("_HDY_") >= 0 ) {
          menuMask = 32|64;
        } else if( INFO_MODEL.indexOf("_ATM_") >= 0 ) {
          menuMask = 64;
        } else if( INFO_MODEL.indexOf("_ANF_") >= 0 ) {
          menuMask = 64;
        } else if( INFO_MODEL.indexOf("_HDS_") >= 0 ) {
          menuMask = 32|64;
        } else if( INFO_MODEL.indexOf("_UTM_") >= 0 ) {
          menuMask = 32|64;
        } else if ( INFO_MODEL.indexOf("_ANF4G_") >= 0) {
          menuMask = 16 | 256 | 512;
        } else if ( INFO_MODEL.indexOf("_ATM4G_") >= 0) {
          menuMask = 16 | 256 | 512;
        } /*else if ( INFO_MODEL.indexOf("_UTM4G_") >= 0) {
          menuMask = 16 | 256 | 512 | 4096 | 8192;
        }*/

        if ( !INFO_TAMPER_SUPPORT ) {
          menuMask |= 32;
        }

        if( (typeof(INFO_ALARM_SENSOR) != 'undefined') && (INFO_ALARM_SENSOR.aout_dvr == 0) ) {
          menuMask |= 8192; //not support alarm out.
        }

        if( (typeof(INFO_ALARM_SENSOR) != 'undefined') && (INFO_ALARM_SENSOR.ain_dvr == 0) ) {
          menuMask |= 4096; //not support alarm sensor(alarm in).
        }

        if(sub == "Alarm output") { sub_s_0 = "class=\"on\""; sub_i_0 = "focus"; }
        if(sub == "Event notification") { sub_s_1 = "class=\"on\""; sub_i_1 = "focus"; }
        if(sub == "Alarm sensor") { sub_s_2 = "class=\"on\""; sub_i_2 = "focus"; }
        if(sub == "Motion sensor") { sub_s_3 = "class=\"on\""; sub_i_3 = "focus"; }
        if(sub == "Video Loss") { sub_s_4 = "class=\"on\""; sub_i_4 = "focus"; }
        if(sub == "VCA Event") { sub_s_7 = "class=\"on\""; sub_i_7 = "focus"; }
        if(sub == "Tamper") { sub_s_5 = "class=\"on\""; sub_i_5 = "focus"; }
        if(sub == "System Event") { sub_s_6 = "class=\"on\""; sub_i_6 = "focus"; }
        //if(sub == "TEXT-IN Event") { sub_s_3 = "class=\"on\""; sub_i_3 = "focus"; }

        if((menuMask & 8192) == 0)
        {
          obj.write("<li><a href='../html/setup_event_alarm_output.htm'><span id='lang_MenuEventSensor'><img src='../images/images/dot_one.gif'>lang_MenuEventSensor</span></a></li>");
        }
        else
        {
          obj.write("<li><a href='../html/setup_event_noti.htm'><span id='lang_MenuEventSensor'><img src='../images/images/dot_one.gif'>lang_MenuEventSensor</span></a></li>");
        }

        obj.write("<ul style=\"padding-left:20px;\">");

        if((menuMask & 8192) == 0)
        {
          obj.write("<li "+sub_s_0+"><a href='../html/setup_event_alarm_output.htm'><span id='lang_MenuAlarmoutput'><img src='../images/images/dot_"+sub_i_0+".gif'>lang_MenuAlarmoutput</span></a></li>");
        }

        obj.write("<li "+sub_s_1+"><a href='../html/setup_event_noti.htm'><span id='lang_MenuNotification'><img src='../images/images/dot_"+sub_i_1+".gif'>lang_MenuNotification</span></a></li>");

        if((menuMask & 4096) == 0)
        {
          obj.write("<li "+sub_s_2+"><a href='../html/setup_event_alarm_sensor.htm'><span id='lang_MenuAlarmsensor'><img src='../images/images/dot_"+sub_i_2+".gif'>lang_MenuAlarmsensor</span></a></li>");
        }

        obj.write("<li "+sub_s_3+"><a href='../html/setup_event_motion_sensor.htm'><span id='lang_MenuMotionsensor'><img src='../images/images/dot_"+sub_i_3+".gif'>lang_MenuMotionsensor</span></a></li>");
        obj.write("<li "+sub_s_4+"><a href='../html/setup_event_video_loss.htm'><span id='lang_MenuVideoloss'><img src='../images/images/dot_"+sub_i_4+".gif'>lang_MenuVideoloss</span></a></li>");

        if( (menuMask & 64) == 0) {
          $.ajax({
            type: "GET",
            url: "/cgi-bin/webra_fcgi.fcgi",
            async: false,
            data: "action=get_setup&menu=camera.dmva",
            error: function() {
            },

            success: function(data){
              var dmva_support=encode_to_array(data);

              if(dmva_support['dmvasupported'] == 1) {
                obj.write("<li "+ sub_s_7 + "><a href='../html/setup_event_vca.htm'><span id='lang_MenuVCA'><img src='../images/images/dot_" + sub_i_7 + ".gif'>lang_MenuVCA</span></a></li>");
              }
            }
          });
        }


        obj.write("<li "+sub_s_6+"><a href='../html/setup_event_system_event.htm'><span id='lang_MenuSysevent'><img src='../images/images/dot_"+sub_i_6+".gif'>lang_MenuSysevent</span></a></li>");
        //obj.write("<li "+sub_s_6+"><a href='../html/setup_event_text_in.htm'><span id='lang_MenuTextin'><img src='../images/images/dot_"+sub_i_6+".gif'>lang_MenuTextin</span></a></li>");

        if( (menuMask & 32) == 0 ) {
          obj.write("<li "+sub_s_5+"><a href='../html/setup_event_tamper.htm'><span id='lang_MenuTamper'><img src='../images/images/dot_"+sub_i_5+".gif'>lang_MenuTamper</span></a></li>");
        }

        obj.write("</ul>");
    }
    else {
        if( (typeof(INFO_ALARM_SENSOR) != 'undefined') && (INFO_ALARM_SENSOR.aout_dvr != 0)) {
          obj.write("<li><a href='../html/setup_event_alarm_output.htm'><span id='lang_MenuEventSensor'><img src='../images/images/dot_some.gif'>lang_MenuEventSensor</span></a></li>");
        }
        else {
          obj.write("<li><a href='../html/setup_event_noti.htm'><span id='lang_MenuEventSensor'><img src='../images/images/dot_some.gif'>lang_MenuEventSensor</span></a></li>");
        }
    }

    /* Category Record: sub-> Recording operation, Continuous / Motion recording, Alarm recording, Panic recording */
    if( cate == "Record" ) {
        var menuMask = 0;

        if( INFO_MODEL.indexOf("IPX") >= 0 ) {
          menuMask = 32;
        } else if( INFO_MODEL.indexOf("HDI") >= 0 ) {
          menuMask = 32;
        } else if( INFO_MODEL.indexOf("HDY") >= 0 ) {
        } else if( INFO_MODEL.indexOf("ANF") >= 0 ) {
        } else if( INFO_MODEL.indexOf("ATM") >= 0 ) {
        } else if ( INFO_MODEL.indexOf("HDS") >= 0) {
        } else if ( INFO_MODEL.indexOf("UTM") >= 0) {
        }

        if( (typeof(INFO_ALARM_SENSOR) != 'undefined') && (INFO_ALARM_SENSOR.aout_dvr == 0) ) {
          menuMask |= 8192; //not support alarm out.
        }

        if(sub == "Recording operation") { sub_s_0 = "class=\"on\""; sub_i_0 = "focus"; }
        if(sub == "Continuous recording") { sub_s_1 = "class=\"on\""; sub_i_1 = "focus"; }
        if(sub == "Motion recording") { sub_s_2 = "class=\"on\" style=\"letter-spacing:-0.1em\"  "; sub_i_2 = "focus"; }
        if(sub == "Alarm recording") { sub_s_3 = "class=\"on\""; sub_i_3 = "focus"; }
        if(sub == "Panic recording") { sub_s_4 = "class=\"on\""; sub_i_4 = "focus"; }
        if(sub == "NetStreaming recording") { sub_s_5 = "class=\"on\"  "; sub_i_5 = "focus"; }
        if(sub == "Audio Mapping") { sub_s_6 = "class=\"on\"  "; sub_i_6 = "focus"; }

        obj.write("<li><a href='../html/setup_record_operation.htm'><span id='lang_MenuRecord'><img src='../images/images/dot_one.gif'>lang_MenuRecord</span></a></li>");
        obj.write("<ul style=\"padding-left:20px;\">");
        obj.write("<li " + sub_s_0 + "><a href='../html/setup_record_operation.htm'><span id='lang_MenuRecRecordingoperation'><img src='../images/images/dot_" + sub_i_0 + ".gif'>lang_MenuRecRecordingoperation</span></a></li>");
        obj.write("<li " + sub_s_1 + "class=\"manual-rec\" ><a href='../html/setup_record_continuous.htm'><span id='lang_MenuRecContinuousRecording'><img src='../images/images/dot_" + sub_i_1 + ".gif'>lang_MenuRecContinuousRecording</span></a></li>");
        obj.write("<li " + sub_s_2 + "class=\"manual-rec\" ><a href='../html/setup_record_motion.htm'><span id='lang_MenuRecMotionRecording'><img src='../images/images/dot_" + sub_i_2 + ".gif'>lang_MenuRecMotionRecording</span></a></li>");

        if( (typeof(INFO_ALARM_SENSOR) != 'undefined') && (INFO_ALARM_SENSOR.aout_dvr != 0)) {
          obj.write("<li " + sub_s_3 + "class=\"manual-rec\" ><a href='../html/setup_record_alarm.htm'><span id='lang_MenuRecAlarmrecording'><img src='../images/images/dot_" + sub_i_3 + ".gif'>lang_MenuRecAlarmrecording</span></a></li>");
        } else {
        }

        obj.write("<li " + sub_s_4 + "><a href='../html/setup_record_panic.htm'><span id='lang_MenuRecPanicrecording'><img src='../images/images/dot_" + sub_i_4 + ".gif'>lang_MenuRecPanicrecording</span></a></li>");
        obj.write("<li " + sub_s_5 + "class=\"big\"><a href='../html/setup_record_netstreaming.htm'><span id='lang_MenuRecNetStreaming'><img src='../images/images/dot_" + sub_i_5 + ".gif'>lang_MenuRecNetStreaming</span></a></li>");

        if( (menuMask & 32) == 0 ) {
          obj.write("<li " + sub_s_6 + "class=\"big\"><a href='../html/setup_record_audio_mapping.htm'><span id='lang_MenuRecAudioMapping'><img src='../images/images/dot_" + sub_i_6 + ".gif'>lang_MenuRecAudioMapping</span></a></li>");
        }

        obj.write("</ul>");
    }
    else {
        obj.write("<li><a href='../html/setup_record_operation.htm'><span id='lang_MenuRecord'><img src='../images/images/dot_some.gif'>lang_MenuRecord</span></a></li>");
    }


    /*	obj.write("<br><br><table class='c_sp_tb_verinfo'><tr><td class='tdinfo'><div onClick='infomationopen()'>Infomation</div></td></tr></table>"); */
}
