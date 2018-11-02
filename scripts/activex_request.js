var CONNECTIONIP = null;
var PORT = 80;
var PROTOCOL = 1;
var YOICS = "yoics.net";

var BORDER_ALPHA = "000000";
var BORDER_WHITE = "FFFFFF";
var BORDER_GRAY = "384E4A";
var BORDER_YELLOW = "FFFF00";
var BORDER_BLUE = "0000FF";
var BORDER_GREEN = "00FF00";
var BORDER_RED = "FF0000";


var DIVCH = 0;

var va_xml = {};
function browerErr() {
    alert(browerErrMsg);
}

var ActiveX_Version = "1.2.7.6";
var ActiveX_Version_Include = "1,2,7,6";

function getActiveXInfo() {
  var data;
  var ts = (new Date()).getTime();

  $.ajax({
    url: '../activex/AxManifest.json?' + ts,
    async: false,
    dataType: 'json',
    success: function (response) {
      data = response;
    }
  });

  return data;
}
var check_validate = function(param_ip){
  if(param_ip == null || param_ip == undefined){
    return;
  }

  var valid = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if(param_ip == "")
    check_ip = true;

  if(valid.test(param_ip)){
    check_ip = false;
  } else {
    check_ip = true;
  }
  
  if(check_ip) {
    return 1;
  } else {
    return 0;
  }
}

var trust_check = function(){
  var trustax = document.getElementById('Trustax');
  var host = window.location.hostname;
  var protocol = window.location.protocol;
  var check_host = check_validate(host);
  var port = window.location.port;
  
  if(protocol.indexOf("https") >= 0){
    protocol = "https";
  } else {
    protocol = "http";
  }

  try {
    document.getElementById('Trustax').style.display = "none";
    var status = trustax.CheckTrustSite(check_host, protocol, host, port);
    if(status == 2) {
      window.open('about:blank', '_top').close();
    } else if(status == 1) {
      window.location.reload();
    } else {
      window.location.reload();
    }

  } catch(ERR) {
    setTimeout(trust_check, 1000);
  }
}

function trustax_Include() {
  var axInfo = getActiveXInfo();
  var wString =  "codebase=../activex/WebViewer.exe#version=";
  var activex_ver = wString + axInfo.data.regtrustsite["VersionString"];

  if (browerIE) {  
    document.writeln("<object");
    document.writeln("id='Trustax'");
    document.writeln("CLASSID='CLSID:" + axInfo.data.regtrustsite.ClassId + "'");
    document.writeln(activex_ver);
    document.writeln("width=0");
    document.writeln("height=0");
    document.writeln(">");
    document.writeln("</object>");
  }

  //trust_check();
}

function ActiveX_Include() {
    var axInfo = getActiveXInfo();

    var wString =  "codebase=../activex/WebViewer.exe#version=";
    //var activex_ver = wString + ActiveX_Version_Include;
    var activex_ver = wString + axInfo.data.WebViewer.VersionString;

    if (browerIE) {
        document.writeln("<object");
        document.writeln("id='itxview'");
        document.writeln("classid='CLSID:"+ axInfo.data.WebViewer.ClassId +"'");
        document.writeln(activex_ver);
        document.writeln("width=720");
        document.writeln("height=405");
        document.writeln("hspace=0");
        document.writeln("vspace=0");
        document.writeln(">");
        document.writeln("<div style='height:405px; line-height:405px;text-align: center;'><a href='/activex/WebViewer.exe'><span>" + langArray['LTXT_PLAYER_INSTALL'] + "</span></a></div>");
        document.writeln("</object>");
    }
}

function ActiveX_Include_320_240() {
    var axInfo = getActiveXInfo();

    var wString =  "codebase=../activex/WebViewer.exe#version=";
    //var activex_ver = wString + ActiveX_Version_Include;
    var activex_ver = wString + axInfo.data.WebViewer.VersionString;
    if (browerIE) {
        document.writeln("<object");
        document.writeln("id='itxview'");
        document.writeln("classid='CLSID:"+ axInfo.data.WebViewer.ClassId +"'");
        document.writeln(activex_ver);
        document.writeln("width=432");
        document.writeln("height=243");
        document.writeln("hspace=0");
        document.writeln("vspace=0");
        document.writeln(">");
        document.writeln("<div style='height:243px; line-height:243px;text-align: center;'><a href='/activex/WebViewer.exe'><span>" + langArray['LTXT_PLAYER_INSTALL'] + "</span></a></div>");
        document.writeln("</object>");
    }
}

function ActiveX_Include_340_191() {
  var axInfo = getActiveXInfo();

  var wString =  "codebase=../activex/WebViewer.exe#version=";
  //var activex_ver = wString + ActiveX_Version_Include;
  var activex_ver = wString + axInfo.data.WebViewer.VersionString;

  if (browerIE) {
      document.writeln("<object");
      document.writeln("id='itxview'");
      document.writeln("classid='CLSID:"+ axInfo.data.WebViewer.ClassId +"'");
      document.writeln(activex_ver);
      document.writeln("width=340");
      document.writeln("height=191");
      document.writeln("hspace=0");
      document.writeln("vspace=0");
      document.writeln(">");
      document.writeln("<div style='height:191px; line-height:191px;text-align: center;'><a href='/activex/WebViewer.exe'><span>" + langArray['LTXT_PLAYER_INSTALL'] + "</span></a></div>");
      document.writeln("</object>");
  }
}

function ActiveX_Include_680_382() {
    var axInfo = getActiveXInfo();

    var wString =  "codebase=../activex/WebViewer.exe#version=";
    //var activex_ver = wString + ActiveX_Version_Include;
    var activex_ver = wString + axInfo.data.WebViewer.VersionString;

    if (browerIE) {
        document.writeln("<object");
        document.writeln("id='itxview'");
        document.writeln("classid='CLSID:"+ axInfo.data.WebViewer.ClassId +"'");
        document.writeln(activex_ver);
        document.writeln("width=680");
        document.writeln("height=382");
        document.writeln("hspace=0");
        document.writeln("vspace=0");
        document.writeln(">");
        document.writeln("<div style='height:382px; line-height:382px;text-align: center;'><a href='/activex/WebViewer.exe'><span>" + langArray['LTXT_PLAYER_INSTALL'] + "</span></a></div>");
        document.writeln("</object>");
    }
}

function ActiveXSetDzoomin() {
  if ( Auth_CheckCovert( GROUP_AUTH) == false )
  {
    //COVERT: "NO VIDEO"
    //if(!isNaN(parseInt(COVERT_DISP)) && parseInt(COVERT_DISP) === 0){
    //  alert(errVideoLossOrNo);
    //} else {
    //COVERT: "COVERT"
      alert(errVideoCovert);
    //}
    return;
  }

  var activex = document.getElementById("itxview");
  if (!activex) {
    alert("activex connection fail!");
    return false;
  }
  var axch = activex.GetSelectedChannel();
  activex.SetDZoom(axch);
  if( typeof activex.SetZoomPIP != 'undefined' && typeof INFO_ZOOM_PIP_DURATION != 'undefined' ) {
    activex.SetZoomPIP(INFO_ZOOM_PIP_DURATION);
  }
}

function yoicsUrlCheck() {
    var urlproxy = null;
    var urlport = null;
    var location = window.location;
    var urlconvertor = '';
    urlconvertor += location;

    CONNECTIONIP = location.hostname;
    PORT = INFO_RTSPPORT;

    var PROXY_SVR = "127.0.0.1:";
    if (urlconvertor.indexOf(PROXY_SVR) >= 0) {
      var urlsplit = urlconvertor.split(PROXY_SVR);
      if( urlsplit[1])
      {
          CONNECTIONIP = location.hostname;
          PORT = parseInt(urlsplit[1]) - 1;
          return false;
      }
    }

    if (urlconvertor.indexOf(YOICS) >= 0) {
        var urlsplit = urlconvertor.split(':');
        for ( var i = 0; i < urlsplit.length; i++) {
            if ( urlsplit[i].indexOf("proxy") >= 0 ) {
                urlproxy = urlsplit[i].split('//');
            } else {
                urlport = urlsplit[i].split('/');
            }
        }

        if ( urlproxy[1].indexOf('proxy') >= 0 && (parseInt(urlport[0]) > 0 && parseInt(urlport[0]) < 65536) ) {
            CONNECTIONIP = urlproxy[1];
            PORT = urlport[0];
        }

        return true;
    } else {
        CONNECTIONIP = location.hostname;
        PORT = INFO_RTSPPORT;
        return false;
    }
}

function user_info_send_to_activex( id, passwd , mac) {


    if (browerIE == false) {
        browerErr();
        return;
    }

    if ( id == "" || passwd == "" ) {
        alert("User ID or Password Error!");
        return false;
    }

    if ( mac == '') {
      alert("Mac address error!");
    }

    var activex = document.getElementById("itxview");

    if (!activex) {
        alert("activex connection fail!");
        return false;
    }

    try {
        activex.SetAccount(id, passwd);
        activex.SetMacAddress(mac);
    } catch(No_Activex_Download) {
    }
}

/**********************************************************/
/*Search **************************************************/
function onSearchStart(nSpeed, nDirection, lStartTime, lEndTime) {
    if ( ActiveX_Check() == false ) {
        return;
    }
    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    if (!activex) {
        alert("activex connection fail!");
        return false;
    }

    try {

        if (activex.IsConnected() == true) {
            return false;
        }

        if (INFO_VENDOR == 'SAMSUNG') {
            if (ActiveXIsRun()) {
                window.setTimeout("window.close()", 1) ;
            }
        }

        var chelem = document.getElementById("channel");

        // chelem.value = 0;

        /*
           if(activex.CheckVersion(ActiveX_Version) == false) {
           alert(langArray['LTXT_ERR_WEBBROWER_ALL_CLOSE']);
           return false;
           }
        */

        //SetOEMSetting();
        //SetInitDisplay();
        SetCamTitle();
        SetDatetimeFormat();

        if ( lStartTime == null || lEndTime == null ) {
            return false;
        }

        yoicsUrlCheck();

        activex_postCovertInfo();
        activex_postTimezone();
        activex.SessionOpen(CONNECTIONIP+"/playback", PORT, PROTOCOL, nSpeed, nDirection, lStartTime, lEndTime);
        if( typeof activex.SetZoomPIP != 'undefined' && typeof INFO_ZOOM_PIP_DURATION != 'undefined' ) {
          activex.SetZoomPIP(INFO_ZOOM_PIP_DURATION);
        }

        if(INFO_MODEL == "_ANF4G_1648D" || INFO_MODEL == "_ANF4G_0824D" || INFO_MODEL == "_ANF4G_0412D" ||
          INFO_MODEL == "_ATM4G_1648D" || INFO_MODEL == "_ATM4G_0824D" || INFO_MODEL == "_ATM4G_0412D") {
            SetCovertSetting(null, true);
        }
        else {
            SetCovertSetting();
        }
        
        // chelem.value = 0;

        playback_pos_display(lStartTime);
    } catch(No_Activex_Download) {
    }

    return true;
}

function onSearchStop() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        //  if (activex.IsConnected() == true)
        {
            activex.SessionClose();
        }
    } catch(No_Activex_Download) {
    }
}

//VARIANT_BOOL FPlay();
function ForwardPlayback() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        if (activex.IsConnected() == true) {
            activex.FPlay();
        }
    } catch(No_Activex_Download) {
    }
}

//VARIANT_BOOL BPlay();
function Backwardplayback() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        if (activex.IsConnected() == true) {
            activex.BPlay();
        }
    } catch(No_Activex_Download) {
    }
}

//VARIANT_BOOL FFPlay();
function Fastforwardplayback() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        if (activex.IsConnected() == true) {
            activex.FFPlay();
        }
    } catch(No_Activex_Download) {
    }
}

//VARIANT_BOOL FBPlay();
function Fastbackwardplayback() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        if (activex.IsConnected() == true) {
            activex.FBPlay();
        }
    } catch(No_Activex_Download) {
    }
}

//VARIANT_BOOL PlayPause();
function Playbackpause() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        if (activex.IsConnected() == true) {
            activex.PlayPause();
        }
    } catch(No_Activex_Download) {
    }
}

/**********************************************************/
/*Live ****************************************************/
function onLiveStart() {
    if ( ActiveX_Check() == false ) {
        return;
    }
    yoicsUrlCheck();
    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    if (!activex) {
        alert("activex connection fail!");
        return false;
    }

    try {
        SetOEMSetting();

        if (INFO_VENDOR == 'SAMSUNG') {
            if (ActiveXIsRun()) {
                window.setTimeout("window.close()", 1) ;
            }
        }

        if (activex.IsConnected() == true) {
            onLiveStop();
        }

        /*
           if(activex.CheckVersion(ActiveX_Version) == false) {
           alert(langArray['LTXT_ERR_WEBBROWER_ALL_CLOSE']);
           return false;
           }

        */

        SetInitDisplay();
        SetCamTitle();
        SetEventOSDCheck();
        SetDatetimeFormat();
        SetCovertSetting();
        yoicsUrlCheck();

        activex_postTimezone();
        activex.SessionOpen(CONNECTIONIP+"/live", PORT, PROTOCOL, 1, 1, 0, 0);
        if( typeof activex.SetZoomPIP != 'undefined' && typeof INFO_ZOOM_PIP_DURATION != 'undefined' ) {
          activex.SetZoomPIP(INFO_ZOOM_PIP_DURATION);
        }
        //Get VA XML
        if(INFO_MODEL.indexOf("IPX") >= 0)
          getXmlFile();
    } catch(No_Activex_Download) {
    }

    return true;
}

function onLiveStop() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
          if (activex.IsConnected() == true)
        {
            SetAduioDuplex(false);
            LiveBackupStop();
            activex.SessionClose();
        }
    } catch(No_Activex_Download) {
    }
}

/**********************************************************/
/*Share ***************************************************/
function SetCamTitle() {

    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    if (!activex) {
        alert("activex connection fail!");
        return false;
    }

    try {
        for ( var ch = 0; ch < INFO_DVRCHANNEL; ch++) {
            if (parseInt(INFO_CAMTITLE_ON)) {
                var cv = AuthCh_CheckCovert(GROUP_AUTH, ch);
                if(cv == false) {
                    activex.SetCameraName(ch, INFO_CAMTITLE[ch]);
                }
                else {
                    activex.SetCameraName(ch, "CAM"+ parseInt(ch+1));
                }
            } else {
                activex.SetCameraName(ch, "");
            }

            activex.setStringNoData(langArray['LTXT_CVTOSDMSG2']);
            activex.setStringNoSignal(langArray['LTXT_LIVE_VIDEOLOSS']);
            activex.setStringOverlapped(langArray['LTXT_OVERLAPPED']);
        }
    } catch(No_Activex_Download) {
    }
}

function SetDatetimeFormat() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    if (!activex) {
        alert("activex connection fail!");
        return false;
    }

    try {
        activex.SetDatetimeFormat(INFO_DATEFORMAT, INFO_TIMEFORMAT);
    } catch(No_Activex_Download) {
    }

}

function SetSplitMode1(ch) {
  if( typeof ch == "undefined" ) {
    ch = null;
  }

    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        if (ch != null) {
            if (parseInt(ch) == 0) {
                var axch = SelectedChannel();

                var chelem = document.getElementById("channel");

                //chelem.value = "" + parseInt(axch) + 1;
                chelem.value = 0;

            } else {
                activex.SetSplitMode(0, parseInt(ch));
                DIVCH = ch;
            }
        } else {
            if ( parseInt(DIVCH) == INFO_DVRCHANNEL ) {
                DIVCH = 1;
            } else {
                DIVCH = parseInt(DIVCH) + 1;
            }
            activex.SetSplitMode(0, parseInt(DIVCH));
            var chelem = document.getElementById("channel");
            chelem.value = "" + DIVCH;


        }
    } catch(No_Activex_Download) {
    }
}

function SetSplitMode4() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        activex.SetSplitMode(1, 0);
        DIVCH = 0;
    } catch(No_Activex_Download) {
    }
}

function SetSplitMode8() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        activex.SetSplitMode(4, 0);
        DIVCH = 0;
    } catch(No_Activex_Download) {
    }
}

function SetSplitMode9() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        activex.SetSplitMode(5, 0);
        DIVCH = 0;
    } catch(No_Activex_Download) {
    }
}

function SetSplitMode16() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        activex.SetSplitMode(6, 0);
        DIVCH = 0;
    } catch(No_Activex_Download) {
    }
}

var livebackupCh = -1;

function LiveBackup(nCh, saveflag) {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    try {

        var nMaxSize = 0;
        var nTime = 0;

        var d = new Date();

        var axch = SelectedChannel();

        var activex = document.getElementById("itxview");

        var dispmode = activex.GetChannel();
        var webch = document.getElementById("channel");

        if ( parseInt(dispmode) == -1 ) {
            webch.value = 0;
        } else if ( (parseInt(axch) - 1) != parseInt(nCh) ) {
            webch.value = parseInt(axch) + 1;
        }

        if ( saveflag ) {
            if ( parseInt(livebackupCh) != -1 ) {
                return;
            }

            var strFilename = "ch"+(parseInt(axch)+1);

            livebackupCh = axch;
            activex.StartBackup(axch, strFilename, nMaxSize, nTime);
        } else {
            LiveBackupStop();
            livebackupCh = -1;
        }
    } catch(No_Activex_Download) {
    }
}

function LiveBackupInit() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    try {
        LiveBackupStop();
        livebackupCh = -1;
    } catch(No_Activex_Download) {
    }
}

function LiveBackupStop() {
    if (browerIE == false) {
        browerErr();
        return;
    }

    try {
        if ( parseInt(livebackupCh) == -1 ) {
            return;
        }

        var activex = document.getElementById("itxview");

        activex.StopBackup(livebackupCh);

        livebackupCh = -1;
    } catch(No_Activex_Download) {
    }
}

function LiveDisplayTab() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        var layout = activex.GetLayout();

        if (parseInt(layout) == 0) {
            SetSplitMode1(null);
        } else if (parseInt(layout) == 1) {
            SetSplitMode4();
        } else if (parseInt(layout) == 4) {
            SetSplitMode8();
        } else if (parseInt(layout) == 5) {
            SetSplitMode9();
        } else if (parseInt(layout) == 6) {
            SetSplitMode16();
        }
    } catch(No_Activex_Download) {
    }
}

function DisplayManual() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
      var layout = activex.GetLayout();
      activex.SetSplitModeManual();
      if (layout === 0) {
        var ch = document.getElementById("channel");
        var dispmode = activex.GetChannel();

        DIVCH = dispmode + 1;
        ch.value = dispmode + 1;
      }
    } catch(No_Activex_Download) {
    }
}

function DisplayCapture(nCh) {
    var flag_result = false;
    
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    try {
        var d = new Date();

        var axch = SelectedChannel();

        var activex = document.getElementById("itxview");

        var dispmode = activex.GetChannel();
        var webch = document.getElementById("channel");

        if ( parseInt(dispmode) == -1 ) {
            webch.value = 0;
        } else if ( (parseInt(axch) - 1) != parseInt(nCh) ) {
            webch.value = parseInt(axch) + 1;
        }

        var strFilename = "capture_"+(parseInt(axch)+1)+"ch";
        flag_result = activex.CaptureImage(axch, strFilename);
    } catch(No_Activex_Download) {
    }

    return flag_result;
}

function SetBackupEx(uStarttime, uEndtime) {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        if (activex.IsConnected() == true) {
            onSearchStop();
        }

        var d = new Date();
        var strFilename = "movie";

        yoicsUrlCheck();
        SetCovertSetting();
        activex.BackupEx(CONNECTIONIP+"/playback", INFO_RTSPPORT, PROTOCOL, INFO_TIMEZONE, INFO_DST, INFO_DVRCHANNEL, strFilename, parseInt(uStarttime), parseInt(uEndtime), covertBitMask());
    } catch(No_Activex_Download) {
        alert('No ActiveX Download');
    }
}

function covertBitMask() {
    var covertCH = "";

    for ( var ch = 0; ch < INFO_DVRCHANNEL; ch++) {
        var cv = AuthCh_CheckCovert(GROUP_AUTH, ch);
        if(cv == true) {
            covertCH += "0";
        }
        else {
            covertCH += "1";
        }
            
    }

    var tempCH = 16-INFO_DVRCHANNEL;

    for(var i = tempCH; i > 0; i--) {
        covertCH += "0";
    }

    return covertCH;
}
function ActiveXSetup(part) {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    try {
        var activex = document.getElementById("itxview");
        activex.Setup();

        /*
           if (part == 'live')
           {
               user_info_send_to_activex("ADMIN", "1234");
               onLiveStart();
           }
        */
    } catch(No_Activex_Download) {
    }
}

function MGetPlaytime() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    var mgetTime = null;

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        if (activex.IsConnected() == false) {
            return null;
        }

        mgetTime = activex.GetPlaytime();
    } catch(No_Activex_Download) {
    }

    return mgetTime;
}

function SetCovertSetting(signal_data, isPlayback) {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    try {
        var strOSD;

        if ( COVERT_DISP == '0') {
          if((INFO_MODEL == "_ANF4G_1648D" || INFO_MODEL == "_ANF4G_0824D" || INFO_MODEL == "_ANF4G_0412D" ||
              INFO_MODEL == "_ATM4G_1648D" || INFO_MODEL == "_ATM4G_0824D" || INFO_MODEL == "_ATM4G_0412D")
              && isPlayback) {
            strOSD = covertOSDMsg2; // END VIDEO
          }
          else {
            strOSD = covertOSDMsg0; // NO DATA
          }
        } else {
          strOSD = covertOSDMsg1; // Covert
        }

        var activex = document.getElementById("itxview");

        var bOSDEnable = 1;
        var lColor = parseInt("0000ff", 16);

        for ( var ch = 0; ch < INFO_DVRCHANNEL; ch++) {
            var cv = AuthCh_CheckCovert(GROUP_AUTH, ch);
            if(INFO_MODEL =="_IPX_0412" || INFO_MODEL =="_IPX_0824" || INFO_MODEL =="_IPX_1648" || INFO_MODEL =="_IPXP_0824" || INFO_MODEL =="_IPXP_1648" ) {
                var lColor = parseInt("000000", 16);
                activex.SetCovertV2(ch, cv, bOSDEnable, lColor, strOSD, parseInt(COVERT_DISP, 10), true);
                if(cv==false) {
                    $("#channel option:eq(" + parseInt(ch+1) +")").replaceWith("<option value='" + parseInt(ch+1) + "'>"+ langArray['LTXT_CHANNEL_CH'+parseInt(ch+1)]+"("+INFO_CAMTITLE[parseInt(ch)]+")" +"</option>");
                }
                else {
                    if(INFO_MODEL =="_IPX_0412" || INFO_MODEL =="_IPX_0824" || INFO_MODEL =="_IPX_1648" || INFO_MODEL =="_IPXP_0824" || INFO_MODEL =="_IPXP_1648" )
                        $("#channel option:eq(" + parseInt(ch+1) +")").replaceWith("<option value='" + parseInt(ch+1) + "'>"+ langArray['LTXT_CHANNEL_CH'+parseInt(ch+1)]+"(CAM" + parseInt(ch+1) +")</option>");
                    else
                        $("#channel option:eq(" + parseInt(ch+1) +")").replaceWith("<option value='" + parseInt(ch+1) + "'>"+ langArray['LTXT_CHANNEL_CH'+parseInt(ch+1)]+"("+INFO_CAMTITLE[parseInt(ch)]+")" +"</option>");
                }
            } else {
                var lColor = parseInt("0000ff", 16);
                if((INFO_MODEL == "_ANF4G_1648D" || INFO_MODEL == "_ANF4G_0824D" || INFO_MODEL == "_ANF4G_0412D" ||
                  INFO_MODEL == "_ATM4G_1648D" || INFO_MODEL == "_ATM4G_0824D" || INFO_MODEL == "_ATM4G_0412D")
                   && (isPlayback == true)) {
                    if(cv == true) {
                        strOSD = covertOSDMsg1;
                    }
                    else {
                        strOSD = covertOSDMsg2;
                    }
                }
                activex.SetCovert(ch, cv, bOSDEnable, lColor, strOSD, parseInt(COVERT_DISP, 10));
            }
            // nosignal camera title -> CAM + CH_NUMBER
            if(INFO_MODEL =="_IPX_0412" || INFO_MODEL =="_IPX_0824" || INFO_MODEL =="_IPX_1648" || INFO_MODEL =="_IPXP_0824" || INFO_MODEL =="_IPXP_1648" ) {
                if( signal_data != null && signal_data.charAt(ch) != 0) {
                    activex.SetCameraName(ch, "CAM"+ parseInt(ch+1));
                    $("#channel option:eq(" + parseInt(ch+1) +")").replaceWith("<option value='" + parseInt(ch+1) + "'>"+ langArray['LTXT_CHANNEL_CH'+parseInt(ch+1)]+"(CAM" + parseInt(ch+1) +")</option>");
                }
            }

        }
    } catch(No_Activex_Download) {
    }
    $("#channel").val("" + DIVCH);
}

function SetPrint() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    if ( Auth_CheckCovert( GROUP_AUTH) == false )
    {
      //COVERT: "NO VIDEO"
      //if(!isNaN(parseInt(COVERT_DISP)) && parseInt(COVERT_DISP) === 0){
      //  alert(errVideoLossOrNo);
      //COVERT: "COVERT"
      //} else {
        alert(errVideoCovert);
      //}
      return;
    }

    var activex = document.getElementById("itxview");

    try {
        activex.print();
    } catch(No_Activex_Download) {
    }
}

function SetInitDisplay() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }
    var activex = document.getElementById("itxview");

    try {
        if (parseInt(INFO_DVRCHANNEL) == 4 ) {
            activex.SetMaxLayout(1);
        } else if (parseInt(INFO_DVRCHANNEL) == 8 ) {
            activex.SetMaxLayout(5);
        } else {
            activex.SetMaxLayout(6);
        }
    } catch(No_Activex_Download) {
    }
}

function noVideo(nch, bVloss, bOSDEnable, strOSD, flag) {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    if (INFO_VENDOR == 'SAMSUNG' || INFO_VENDOR == 'DIGIMERGE') {
      if ( parseInt(INFO_COVERTCH[nch]) == 1 ) {
        strOSD = "";
      }
    }

    switch(flag) {
      case 0:  //invalid connection
      try {       
        activex.setInvalidConnection(nch, bVloss, bOSDEnable, strOSD);
      } catch(No_Activex_Download) {
      }
      break;
      case 1:  //no video
      try {
        activex.setNoVideo(nch, bVloss, bOSDEnable, strOSD);
      } catch(No_Activex_Download) {
      }
      break;
      case 2:  //video loss
      default: 
      try {
        activex.setVideoLoss(nch, bVloss, bOSDEnable, strOSD);
      } catch(No_Activex_Download) {
      }
      break;
    }
    

}

function fullScreen() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        activex.DoFullScreen();
    } catch(No_Activex_Download) {
    }
}

function fullScreenStop() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        activex.FullScreenOff();
    } catch(No_Activex_Download) {
    }
}

function SelectedChannel() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        return activex.GetSelectedChannel();
    } catch(No_Activex_Download) {
        return null;
    }
}

function SetAudioMute(audio_mute) {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        activex.SetMute(audio_mute);
    } catch(No_Activex_Download) {
    }
}

function SetAduioDuplex(audio_dup) {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        activex.SetDuplexAudio(audio_dup);
    } catch(No_Activex_Download) {
    }
}

function SetOEMSetting() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    var model = INFO_MODEL.substring(1, INFO_MODEL.length);

    try {
        activex.SetOEMCode(INFO_VENDOR, model);
    } catch(No_Activex_Download) {
    }
}

function ActiveXIsRun() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        return activex.IsRun();
    } catch(No_Activex_Download) {
    }
}

function ActiveX_IsConnection() {
    if ( ActiveX_Check() == false ) {
        return false;
    }

    var activex = document.getElementById("itxview");

    try {
        return activex.IsConnected();
    } catch(No_Activex_Download) {
    }
}

function SetEventOSDCheck() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");

    try {
        activex.SetEventOSD(INFO_EVENTICON_ON);
    } catch(No_Activex_Download) {
    }
}

function SetEventSearch(nCh, nSpeed, nDirection, lStartTime, lEndTime) {

    if ( ActiveX_Check() == false ) {
        return;
    }

    if (browerIE == false) {
        browerErr();
        return;
    }

    var activex = document.getElementById("itxview");


    if (!activex) {
        alert("activex connection fail!");
        return false;
    }

    //Get VA XML
    setXmlFile(nCh);

    try {
        //SetOEMSetting();

        if (activex.IsConnected() == true) {
            return false;
        }

        if (INFO_VENDOR == 'SAMSUNG') {
            if (ActiveXIsRun()) {
                window.setTimeout("window.close()", 1) ;
            }
        }

        SetInitDisplay();
        SetCamTitle();
        SetDatetimeFormat();

        if ( lStartTime == null || lEndTime == null ) {
            return false;
        }

        yoicsUrlCheck();

        activex_postTimezone();
        activex.EventSessionOpen(CONNECTIONIP+"/playback", PORT, nCh, PROTOCOL, nSpeed, nDirection, lStartTime, lEndTime);
        SetCovertSetting();
        playback_pos_display(lStartTime);
    } catch(No_Activex_Download) {
    }

    return true;
}

function display_channelmode_change() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    var activex = document.getElementById("itxview");
    var dispmode = activex.GetChannel();

    var webch = document.getElementById("channel");

    if ( parseInt(dispmode) == -1 ) {
        webch.value = 0;
        DIVCH = 0;
    } else {
        var axch = SelectedChannel();
        webch.value = parseInt(axch) + 1;
        DIVCH = parseInt(axch) + 1;
    }

}

function display_channelmode_change_live() {
    if ( ActiveX_Check() == false ) {
        return;
    }

    var activex = document.getElementById("itxview");
    var dispmode = activex.GetChannel();

    var webch = document.getElementById("channel");

    if ( parseInt(dispmode) == -1 ) {
        webch.value = 0;
        DIVCH = 0;
        $("#aux_select").empty();
        $("#aux_select").attr("disabled", true);

    } else {
        var axch = SelectedChannel();
        $("#channel").val(axch+1);
        $("#aux_select").attr("disabled", false);
        auxiliary(parseInt(axch));
        webch.value = parseInt(axch) + 1;
        DIVCH = parseInt(axch) + 1;
    }

}


function getXmlFile() {
  var xml;
  var timestp;
  var vaXmlErrorCheck=false;
  for ( var ch = 0; ch < INFO_DVRCHANNEL; ch++) {
    timestp = new Date().getTime();
    $.ajax({
        url : "/cgi-bin/webra_fcgi.fcgi?api=get_vaxml_raw&chno=" + ch + "&" + timestp,
        dataType: "xml",
        async:false,
        success : function (data) {
          var xmlstr = data.xml ? data.xml : (new XMLSerializer()).serializeToString(data);
          xmlstr += "\r\n";
          if ( browerIE == false)
            return false;

          va_xml['cam_' + ch] = xmlstr;
        },
        fail: function(data) {
          vaXmlErrorCheck=true;
        }
    });
    vaXmlErrorCheck=setXmlFile(ch);
  }
//  if(vaXmlErrorCheck)
//    alert("Error : Can't get VA_XML");
}

function setXmlFile(ch) {
    //webra -> activex
    if ( browerIE == false)
        return false;
    var getStr = va_xml['cam_' + ch] + "\r\n";
    var activex = document.getElementById("itxview");
    var SetVCA = activex.VCASetConfig(getStr, ch);
    if(!SetVCA)
        return true;
}

function getLayout() {
  if(browerIE == true) {
    try {
      var activex = document.getElementById('itxview');
      return activex.GetLayout();
    } catch(exception){
      return -1;
    }
  }

  return -1;
}
