var request = null;

var msgWait;
var msgRunning;
var msgalready;

var errMsg = "";
var errComplete;
var errFail;
var errSuccess;
var errFieldAsterisk;
var errFieldEmpty;
var errFieldLenOver;
var errFieldLenShort;
var errFieldValOver;
var errFieldValOverFPS;
var errFieldValLess;
var errSpecialChar;
var errEmail;
var errLanguage;
var errDDNSFieldEmpty;
var errDDNSSave;
var delMsg;
var saveMsg;
var errdate;
var errNoPermission;
var dvrinsetup;
var dvrinarchive;
var dvrinplayback;
var errFileSystem;
var errDisconnect;
var errSend;
var errReceive;
var errNoDisk;
var errLiveSaveStop;
var errLiveBackupHdd;
var errDisconnectIpChange;
var errDisconnectDiskFormat;
var errDisconnectPowerOff;
var errDisconnectTimeChange;
var errDisconnectFwUpgrade;
var errDisconnectIpFactoryDefalut;
var errDisconnectIpDiskMan;
var errDisconnectIpUserMan;
var errDisconnectIpSysdbLoad;
var errDisconnectNetwork;
var errRecordingSetting;
var errMaxClientConnect;
//var errDisconnectArchive;
var displayChannel;
var errUserPasswd;

var DISCONECTOFFSET = 65536;
var errDisConnectReason = Array();

var requestflag = false;
var sendcompleteflag = false;

var _dvr_status = Array();
_dvr_status["NF_DVR_STATUS_INIT"] = 0;
_dvr_status["NF_DVR_STATUS_LIVE"] = 1;
_dvr_status["NF_DVR_STATUS_ZOOM"] = 2;
_dvr_status["NF_DVR_STATUS_PLAYBACK"] = 3;
_dvr_status["NF_DVR_STATUS_RUN_PLAYBACK"] = 4;
_dvr_status["NF_DVR_STATUS_ARCHIVE"] = 5;
_dvr_status["NF_DVR_STATUS_RUN_ARCHIVE"] = 6;
_dvr_status["NF_DVR_STATUS_SETUP"] = 7;
_dvr_status["NF_DVR_STATUS_SHUTDOWN"] = 8;
_dvr_status["NF_DVR_STATUS_FORMAT"] = 9;

var USER_AUTH = 'USER';
var _login_auth = "USER";
var GROUP_AUTH = 'USER';
var UCOVERT = 0;
var COVERT_DISP = 0;

var langArray = Array();

var INFO_MODEL = '_ATM_1624';
var INFO_VENDOR = 'ITX';
var INFO_DVRREADY = 0;
var INFO_DVRSTATUS = 0;
var INFO_DVRCHANNEL = 16;
var INFO_DISCONNECTRESON = 0;
var INFO_LANGUAGE = null;
var INFO_CAMTYPE = 'NTSC';
var INFO_TIMEZONE = 29;
var INFO_CAMTITLE = Array(INFO_DVRCHANNEL);
var INFO_RTSPPORT = 554;
var INFO_DATEFORMAT = 0;
var INFO_TIMEFORMAT = 0;
var INFO_DST = 0;
var INFO_EXISTDISK = 0;
var INFO_COVERTCH = Array(INFO_DVRCHANNEL);
var INFO_COVERT = 0;
var INFO_LIVEAUDIOCH;
var INFO_CAMTITLE_ON = 1;
var INFO_EVENTICON_ON = 1;

var INFO_CMP_DVRREADY = 0;
var INFO_CMP_DISCONNECTRESON = 0;
var INFO_CMP_LANGUAGE = null;
var INFO_CMP_DVRSTATUS = 0;
var INFO_CMP_TIMEZONE = 29;
var INFO_CMP_CAMTITLE = Array(INFO_DVRCHANNEL);
var INFO_CMP_RTSPPORT = 554;
var INFO_CMP_DATEFORMAT = 0;
var INFO_CMP_TIMEFORMAT = 0;
var INFO_CMP_DST = 0;
var INFO_CMP_COVERTCH = Array(INFO_DVRCHANNEL);
var INFO_CMP_CAMTITLE_ON = 1;
var INFO_CMP_EVENTICON_ON = 1;

// Types for SYSTEM_LOGEVT category.
var	LT_SYSTEM_STARTED							= 0;
var	LT_SYSTEM_SHUTDOWN                          = 1;
var	LT_ABNORMAL_SHUTDOWN_DETECTED               = 2;
var	LT_SYSTEM_RECOVERED                         = 3;
var	LT_SYSTEM_TIME_CHANGED                      = 4;
var	LT_SYSTEM_FW_UPGRADE                        = 5;
var	LT_SYSTEM_FORMAT                            = 6;
var	LT_SYSTEM_CHECKDISK                         = 7;
// Types for LOGON_LOGEVT category.
var	LT_LOCAL_LOG_ON                             = 8;
var	LT_LOCAL_LOG_OFF                            = 9;
var	LT_REMOTE_LOG_ON                            = 10;
var	LT_REMOTE_LOG_OFF                           = 11;
//Types for SETUP_LOGEVT category.
var	LT_RECORD_SETUP_CHANGED                     = 12;
var	LT_SYSTEM_SETUP_CHANGED                     = 13;
//Types for EVENT_LOGEVT category.
var	LT_SENSOR_INPUT                             = 14;
var	LT_MOTION_DETECTION	                    = 15;
var	LT_VIDEO_IN		                    = 16;
var	LT_VIDEO_LOSS                               = 17;
var	LT_TAMPER_EVENT                             = 18;
var	LT_SMART_WARNING	                    = 19;
var	LT_DISK_EVENT		                    = 20;////
var	LT_HDD_FULL                                 = 21;
var	LT_HDD_OW                                   = 22;
//Types for RECORD_LOGEVT category.
var	LT_RECORD_STARTED                           = 23;
var	LT_RECORD_STOPPED                           = 24;
var     LT_SYSTEM_EVENT                             = 25;
var     LT_SYSTEM_DEBUG				    = 26;
var     LT_SYSTEM_POS				    = 27;
// IPX
var LT_NETWORK_EVENT                                = 28;
var LT_IPCAM                                        = 29;
var LT_VCA_EVENT                                        = 30;
//Must not exceed 31
var	LT_NR                                       = 31;

function errDisconnectStringInit() {
    errDisConnectReason[1] = errDisconnectIpChange;
    errDisConnectReason[2] = errDisconnectDiskFormat;
    errDisConnectReason[3] = errDisconnectPowerOff;
    errDisConnectReason[4] = errDisconnectTimeChange;
    errDisConnectReason[5] = errDisconnectFwUpgrade;
    errDisConnectReason[6] = errDisconnectIpFactoryDefalut;
    errDisConnectReason[7] = errDisconnectIpDiskMan;
    errDisConnectReason[8] = errDisconnectIpUserMan;
    errDisConnectReason[9] = errDisconnectIpSysdbLoad;
    //    errDisConnectReason[10] = errDisconnectArchive;
}

function AuthorityNoPermission() {
    alert(errNoPermission);
}

var authsearchflag = false;
var authsetupflag = false;


function isNVR()
{
  if( INFO_MODEL.indexOf("IPX") >= 0 ) {
    return true;
  }
  return false;
}

/*********************************************************
 function : AuthorityCheck ()
 description : Authority Check
 ***********************************************************/
function AuthorityCheck(checkauth) {
    var login_user = orgData["login_user"];
    var login_group = orgData["login_group"];

    var autharch;
    var authptz;
    var authremote;
    var authsetup;
    var authrecset;
    var authsearch;

    if ( login_group == 'MANAGER' ) {
        autharch = orgData["archman"];
        authremote = orgData["remoteman"];
        authsetup = orgData["setupman"];
        authrecset = orgData["recsetman"];
        authsearch = orgData["searchman"];
    } else if ( login_group == 'USER' ) {
        autharch = orgData["archusr"];
        authremote = orgData["remoteusr"];
        authsetup = orgData["setupusr"];
        authrecset = orgData["recsetusr"];
        authsearch = orgData["searchusr"];
    } else {
        return 1;
    }

    if ( checkauth == 'arch' ) {
        if (!parseInt(autharch)) {
            alert(errNoPermission);
            return autharch;
        }
    } else if ( checkauth == 'ptz' ) {
        if (!parseInt(authptz)) {
            alert(errNoPermission);
            return authptz;
        }
    } else if ( checkauth == 'remote' ) {
        if (!parseInt(authremote)) {
            alert(errNoPermission);
            return authremote;
        }
    } else if ( checkauth == 'setup' ) {
        if (!parseInt(authsetup) && !parseInt(authrecset)) {
            var litopsetup = document.getElementById("litopsetup");
            if ( litopsetup ) {
                clearText(litopsetup);
            }

            var createa = document.createElement("a");
            var creatediv = document.createElement("div");
            var createtxt;

            createa.onclick = AuthorityNoPermission;
            creatediv.id = "lang_Setup";
            createtxt = document.createTextNode(langArray['LTXT_SETUP']);

            creatediv.appendChild(createtxt);
            createa.appendChild(creatediv);
            litopsetup.appendChild(createa);

            createtxt= null;
            creatediv= null;
            createa= null;

            authsetupflag = true;

            return authsetup;
        }
    } else if ( checkauth == 'search' ) {
        if (!parseInt(authsearch)) {
            var litopsearch = document.getElementById("litopsearch");
            if ( litopsearch ) {
                clearText(litopsearch);
                var createa = document.createElement("a");
                var creatediv = document.createElement("div");
                var createtxt;

                createa.onclick = AuthorityNoPermission;
                creatediv.id = "lang_Playback";
                createtxt = document.createTextNode(langArray['LTXT_PLAYBACK']);

                creatediv.appendChild(createtxt);
                createa.appendChild(creatediv);
                litopsearch.appendChild(createa);

                createtxt= null;
                creatediv= null;
                createa= null;
            }

            authsearchflag = true;

            return authsearch;
        }
    } else {
        return 1;
    }

    return 1;
}

/*********************************************************
 function : ActiveX_Check ()
 description : ActiveX가 �치 �어 �는지 �인
 ***********************************************************/
function ActiveX_Check() {
    var activex = document.getElementById("itxview");

    try {

        var install_ActiveX = activex.IsConnected() ;
        return true;

    } catch(e) {
        return false;

    }
}

/*********************************************************
 function : ActiveX_Start ()
 description : ActiveX Start
 ***********************************************************/
function javaSleep(naptime) {
    naptime = naptime * 1000;
    var sleeping = true;
    var now = new Date();
    var alarm;
    var startingMSeconds = now.getTime();
    //alert("starting nap at timestamp: " + startingMSeconds + "\nWill sleep for: " + naptime + " ms");
    while(sleeping) {
        alarm = new Date();
        alarmMSeconds = alarm.getTime();
        if(alarmMSeconds - startingMSeconds > naptime) {
            sleeping = false;
        }
    }
    //alert("Wakeup!");
}

function ActiveX_Start() {
    var activexElem = document.getElementById("ACTIVEX_VIEW");

    if (!activexElem) {
        return;
    }

    var myObject = document.createElement('object');

    myObject.id = "itxview";
    myObject.width = "720";
    myObject.height = "480";
    activexElem.appendChild(myObject);
    myObject.classid= "clsid:FB40C15D-4A00-4B22-BA87-B046910FB09D";
    myObject.codebase = "../activex/WebViewer.cab#version=1,1,1,2";
    myObject = null;
}

/*********************************************************
 function : channelSelect ()
 description : 茶���좏깮.
 ***********************************************************/
function channelSelect(ch) {
    if ( parseInt(ch) != 4 || parseInt(ch) != 8 || parseInt(ch) != 16 ) {
        INFO_DVRCHANNEL = 16;
    }

    INFO_DVRCHANNEL = ch;
}

/*********************************************************
 //  SCH- SPH- SGH- LG- CANU IM- EV- iPhone Nokia BlackBerry lgtelecom
 function : MobileBrowserCheck ()
 description : �뚮��?먖�.
 return : Mobile -> false , PC -> true
 ***********************************************************/
function MobileBrowserCheck() {
    var ua=navigator.userAgent;

    if (ua == null) {
        return true;
    }

    var mobileStr=new Array("iPhone","iPod","BlackBerry","Android","Windows CE","Symbian","Mobile","IEMobile","lgtelecom","SKT","Opera Mobi","PPC","NetFront","Nokia","SAMSUNG","LG","SonyEricsson");

    for(i=0; i< mobileStr.length;i++) {
      var output = ua.indexOf(mobileStr[i]);
      if (output >= 0) {
        if( mobileStr[i] == "iPhone") {
          if( ua.indexOf("iPad") >= 0 ) {
            return true;
          }

          return false;
        }
      }
    }

    return true;
}

function getInternetExplorerVersion()
{
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  else if (navigator.appName == 'Netscape')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}

function isIE() {
  return ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null)));
}


/*********************************************************
 function : browerCheck ()
 description : �뚮��?먖�.
 ***********************************************************/
function browerCheck() {
    var ua=navigator.userAgent;

    if (ua == null) {
        return;
    }

    this.isFirefox=ua.indexOf('Firefox')>=0;
    this.isOpera=ua.indexOf('Opera')>=0;
    this.isIE=isIE();
    this.isSafari=ua.indexOf('Safari')>=0;
    this.isKonqueror=ua.indexOf('KHTML')>=0&&!this.isSafari;
    this.versionMinor=parseFloat(navigator.appVersion);
    if(this.isIE){
        this.versionMinor=getInternetExplorerVersion();
    }
    this.versionMajor=getInternetExplorerVersion();
}

{
var browser = new browerCheck();
var browerIE = browser.isIE;
var browserIE6 = browerIE && (browser.versionMajor == 6);
}
/*********************************************************
 function : createRequest ()
 description : ?붿껌??留뚮��?
 ***********************************************************/
var _request_cache_obj = null;

function createRequest() {
    if ( _request_cache_obj ) {
        _request_cache_obj.abort();

        return _request_cache_obj;
    }

    try {
        request = new XMLHttpRequest();
    } catch (trymicrosoft) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (othermicrosoft) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                request = null;
            }
        }
    }

    if (request == null ) {
        alert("Error creating request object!");
    } else {
        _request_cache_obj = request;
    }

    return request;
}

/*********************************************************
 function : addLoadEvent ()
 description : load???�뻾??event ?�닔 ?깅줉
 parameter1 : (func : ?�뻾???�닔)
 ***********************************************************/
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        };
    }
}

/*********************************************************
 function : addUnLoadEvent ()
 description : unload???�뻾??event ?�닔 ?깅줉
 parameter1 : (func : ?�뻾???�닔)
 ***********************************************************/
function addUnLoadEvent(func) {
    var oldUnload = window.onunload;
    if (typeof window.onunload != 'function') {
        window.onunload = func;
    } else {
        window.onunload = function() {
            oldUnload();
            func();
        };
    }
}

function go_home() {
    self.location='../index.htm';
}

/*********************************************************
 function : createRequest ()
 description : ?붿껌??留뚮��?
 ***********************************************************/
var _request_cache_obj_ledon = null;
var request_ledon = null;

function createRequest_ledon() {
    if ( _request_cache_obj_ledon ) {
        return _request_cache_obj_ledon;
    }

    try {
        request_ledon = new XMLHttpRequest();
    } catch (trymicrosoft) {
        try {
            request_ledon = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (othermicrosoft) {
            try {
                request_ledon = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                request_ledon = null;
            }

        }
    }

    if (request_ledon == null ) {
        alert("Error creating request object!");
    } else {
        _request_cache_obj_ledon = request_ledon;
    }

    return request_ledon;
}

function activex_postTimezone() {
    var recvText;
    $.ajax({
      type: "POST",
      url: "/cgi-bin/webra_fcgi.fcgi",
      async: false,
      data: "action=get_setup&menu=system.datetime_tzinfo",
      success: function(response) {
        if (response == "No Permission Error!") {
          alert(errNoPermission);
          return;
        }

        if (browerIE == true) {
          var activex = $("#itxview");

          if (activex) {
              activex.SetTimeZoneTable(response);
          }

          if (myTimeZone == null)
            myTimeZone = encode_to_array(response);
        }
        c.v.removeMessages();
      },
      fail: function(response) {
        alert(errReceive)
        c.v.removeMessages();
      }
    });
}

function activex_postCovertInfo() {
    var recvText;
    $.ajax({
      type: "POST",
      url: "/cgi-bin/webra_fcgi.fcgi",
      async: false,
      data: "action=get_setup&menu=camera.covert",
      success: function(response) {
        if (response == "No Permission Error!") {
          alert(errNoPermission);
          return;
        }

        var recv_data = recv_encode(response);
        UCOVERT = recv_data['covert'];
        COVERT_DISP = recv_data['covert_disp'];
        
      },
      fail: function(response) {
        alert(errReceive)
      }
    });
}

/*********************************************************
 function : dvr_ledon_postSetup ()
 description : WEBRA媛 ?묒냽 ?�쓣 ??DVR??LED�좊
 parameter1 :
 ***********************************************************/
var dvr_timer = null;

function dvr_ledon_postSetup() {
    if ( requestflag ) {
        dvr_led_on_stop();
        dvr_timer = setTimeout(dvr_ledon_postSetup, 10000);
        return;
    }

    var sendbuf;

    sendbuf = "action=dvr&menu=dvrledon";

    request_ledon = createRequest_ledon();

    if (request_ledon == null) {
        return;
    }

    request_ledon.open("POST", "/cgi-bin/webra_fcgi.fcgi", true);
    request_ledon.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

    request_ledon.send(sendbuf);

    dvr_timer = setTimeout(dvr_ledon_postSetup, 10000);
}

function dvr_led_on_stop() {
    if (dvr_timer != null) {
        clearTimeout(dvr_timer);
        dvr_timer = null;
    }
}

/*********************************************************
 function : clearText ()
 description : ?�element??text??�떎.
 parameter1 : (e1 : element)
 ***********************************************************/
function clearText(e1) {
    if (e1 != null) {
        if (e1.childNodes) {
            for (var i = e1.childNodes.length; i > 0; i--) {
                var childNode = e1.childNodes[i-1];
                e1.removeChild(childNode);
            }
        }
    }
}

/*********************************************************
 function : getText ()
 description : ?�element??text?�뒗??
 parameter1 : (e1 : element)
 ***********************************************************/
function getText(e1) {
    var text = "";
    if (e1 != null) {
        if (e1.childNodes) {
            for (var i = 0; i < e1.childNodes.length; i++) {
                var childNode = e1.childNodes[i];
                if (childNode.nodeValue != null) {
                    text = text + childNode.nodeValue;
                }
            }
        }
    }
    return text;
}

/*********************************************************
 function : replaceText ()
 description : ?�element??textparm2??text��蹂寃���?
 parameter1 : (e1 : element)
 parameter2 : (text : 蹂寃���text)
 ***********************************************************/
function replaceText(e1, text) {
    if (e1 != null) {
        clearText(e1);
        var newNode = document.createTextNode(text);
        e1.appendChild(newNode);
    }
}

/*********************************************************
 function : replaceHTML ()
 description : ?�element??textparm2??text��蹂寃���?
 parameter1 : (e1 : element)
 parameter2 : (text : 蹂寃���text)
 ***********************************************************/
function replaceHTML(e1, text) {
    if (e1 != null) {
        e1.innerHTML = text;
    }
}

/*********************************************************
 function : chOnePlus ()
 description : channel???�릿 eid??channel???�굹 利앷? ?�궓??
 parameter1 : (eid : element name)
 ***********************************************************/
function chOnePlus(eid) {
    if (eid == null) {
        return null;
    }

    var plusName = eid.substring(0,eid.length-1);
    var ch = parseInt(eid.charAt(eid.length-1));

    plusName = plusName + (ch + 1);

    return plusName;
}

/*********************************************************
 function : URLDecode ()
 description :
 parameter1 :
 return success :
 ***********************************************************/
function URLDecode(encoded) {
    if (encoded == null ) {
        return null;
    }

    var HEXCHARS = "0123456789ABCDEFabcdef";
    var plaintext = "";
    var i = 0;
    while (i < encoded.length) {
        var ch = encoded.charAt(i);
        if (ch == "+") {
            plaintext += " ";
            i++;
        } else if (ch == "%") {
            if (i < (encoded.length-2)
            && HEXCHARS.indexOf(encoded.charAt(i+1)) != -1
            && HEXCHARS.indexOf(encoded.charAt(i+2)) != -1 ) {
                plaintext += unescape( encoded.substr(i,3) );
                i += 3;
            } else {
                //alert( 'Bad escape combination near ...' + encoded.substr(i) );
                plaintext += "%[ERROR]";
                i++;
            }
        } else {
            plaintext += ch;
            i++;
        }
    } // while

    return plaintext;
};

/*********************************************************
 function : recv_encode ()
 description : reveive??query?�꽍?�떎.
 parameter1 : (query : receive query)
 return success : encode data / fail : null
 ***********************************************************/
function recv_encode(query) {
    var sn = '&';
    var se = '=';
    var partdata;

    if (query == null) {
        return null;
    }

    if ( (query.indexOf(sn) < 0) || (query.indexOf(se) < 0) ) {
        return null;
    }

    partdata = query.split(sn);

    var retdata = Array();

    for (var i = 0; i < partdata.length; i++) {
        var data = 	partdata[i].split(se);

        data[1] = URLDecode(data[1]);

        retdata[data[0]] = data[1];

    }

    return retdata;
}

/*********************************************************
 function : comma_encode ()
 description :
 parameter1 :
 return success : encode data / fail : null
 ***********************************************************/
function comma_encode(query) {
    var sn = '!';

    var partdata;

    if (query == null) {
        return null;
    }

    partdata = query.split(sn);

    return partdata;
}

/*********************************************************
 function : sendDataDecode ()
 description : send fomat?�줈 蹂寃���?
 parameter1 : (tag : send string)
 return success : send format string / fail : null
 ***********************************************************/
function sendDataDecode(tag) {
    var sendbuf = null;

    for (var i = 0; i < tag.length; i++) {
        var attrname = tag[i].getAttribute("id");

        //alert("attrname["+attrname+"] tag[i].value["+tag[i].value+"]");
        if (attrname == null) {
            continue;
        }

        if (sendbuf == null) {
            //sendbuf = "&" + encodeURIComponent(attrname) + "=" + encodeURIComponent(tag[i].value);
            sendbuf = "&" + attrname + "=" + escape(tag[i].value);
        } else {
            //sendbuf += "&" + encodeURIComponent(attrname) + "=" + encodeURIComponent(tag[i].value);
            sendbuf += "&" + attrname + "=" + escape(tag[i].value);
        }

    }

    return sendbuf;
}

/*********************************************************
 function : sendDataDecodeNum ()
 description : send fomat?쩌濡?蹂寃���?
 parameter1 : (tag : send string)
 return success : send format string / fail : null
 ***********************************************************/
function sendDataDecodeNumCheck(num) {
    var empty = '0';
    var tmpNum = null;

    if ( (num.length == 1 ) && (parseInt(num) == parseInt(empty)) ) {
        return num;
    }

    for ( var i = 0; i < num.length; i++) {
        if ( parseInt(i) == 0 && num.charAt(i) == empty ) {
            continue;
        } else {
            if (tmpNum == null) {
                tmpNum = num.charAt(i);
            } else {
                tmpNum += num.charAt(i);
            }
        }
    }

    return tmpNum;
}

function sendDataDecodeNum(tag) {
    var sendbuf = null;
    var tmp = 0;
    for (var i = 0; i < tag.length; i++) {
        var attrname = tag[i].getAttribute("id");

        //alert("attrname["+attrname+"] tag[i].value["+tag[i].value+"]");
        if (attrname == null) {
            continue;
        }

        if (sendbuf == null) {
            //sendbuf = "&" + encodeURIComponent(attrname) + "=" + encodeURIComponent(tag[i].value);
            tmp = sendDataDecodeNumCheck(tag[i].value);
            sendbuf = "&" + attrname + "=" + escape(tmp);
        } else {
            tmp = sendDataDecodeNumCheck(tag[i].value);
            //sendbuf += "&" + encodeURIComponent(attrname) + "=" + encodeURIComponent(tag[i].value);
            sendbuf += "&" + attrname + "=" + escape(tmp);
        }

    }

    return sendbuf;
}

/*********************************************************
 function : sendDataDecodeID ()
 description : send fomat?�줈 蹂寃���?
 parameter1 : (idname : idname)
 return success : send format string / fail : null
 ***********************************************************/
function sendDataDecodeID(idname) {
    if (idname == null) {
        return null;
    }

    var sendbuf = null;

    var tagid = document.getElementById(idname);

    if (tagid == null) {
        return null;
    }

    sendbuf = "&" + idname + "=" + escape(tagid.value);
    //sendbuf = "&" + idname + "=" + encodeURIComponent(tagid.value);

    return sendbuf;
}

/*********************************************************
 function : out_from_str_to_char ()
 description : pos???꾩튂???��뒗 strValue??char�ы꽩?�떎.
 parameter1 : (strValue : string)
 parameter2 : (pos : position)
 return success : position char / fail : null
 ***********************************************************/
function out_from_str_to_char(strValue, pos) {
    if (strValue == null || strValue.length < pos) {
        return null;
    }

    var retCode = strValue.charAt(pos);
    retCode = parseInt(retCode);

    return retCode;
}

/*********************************************************
 function : insertAfter ()
 description : targetElement??諛붾��?�쓬??newElement?�엯?�떎.
 parameter1 : (newElement : ?�줈??element)
 parameter2 : (targetElement : target element)
 ***********************************************************/
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

/*********************************************************
 function : makeSelectBox ()
 description : ?�쟻?�줈 select諛뺤�瑜?留뚮��??�엯?�떎.
 parameter1 : (elem : element)
 parameter2 : (idname : new select box??id name)
 parameter3 : (list : �ъ뒪??諛곗��
 parameter4 : (width : size width)
 parameter5 : (smin : list??理쒖�媛??먒� 諛곗��??몃뜳??
 parameter6 : (smax : list??理쒕?��?먒� 諛곗��??몃뜳??
 ***********************************************************/
function makeSelectBox(elem, idname, name, txtlist, vallist, func, width, smin, smax) {
    for (var i = elem.childNodes.length; i > 0; i--) {
        elem.removeChild(elem.childNodes[i-1]);
    }

    if (isNaN(smin) == true || isNaN(smax) == true) {
        return false;
    }

    if (smin > smax) {
        var tmp;
        tmp = smax;
        smax = smin;
        smin = tmp;
    }

    //var newSelect = document.createElement("select");
    var newSelect = elem;

    newSelect.size = 1;
    //newSelect.id = idname;
    //newSelect.name = name;
    //newSelect.style.width = width;
    //newSelect.style.textAlign = "center";
    //newSelect.style.border = "1px";
    //newSelect.style.solid = "#ffffff";
    //newSelect.style.color = "#373487";
    newSelect.onchange = func;

    for (var i = smin; i <= smax; i++) {
        var newOption = document.createElement("option");

        if (txtlist == null || vallist == null ) {
            newOption.text = i;
            newOption.value = i;
        } else {
            newOption.text = txtlist[i];
            newOption.value = vallist[i];
        }
        newSelect.options.add(newOption);

        newOption = null;
    }
    //insertAfter(newSelect, elem);

}

/*********************************************************
 function : makeSelectBox2 ()
 description : ?�쟻?�줈 select諛뺤�瑜?留뚮��??�엯?�떎.
 parameter1 : (elem : element)
 parameter2 : (idname : new select box??id name)
 parameter3 : (list : �ъ뒪??諛곗��
 parameter4 : (width : size width)
 parameter5 : (smin : list??理쒖�媛??먒� 諛곗��??몃뜳??
 parameter6 : (smax : list??理쒕?��?먒� 諛곗��??몃뜳??
 ***********************************************************/
function makeSelectBox2(elem, idname, name, txtlist, vallist, func, width, smin, smax) {
    for (var i = elem.childNodes.length; i > 0; i--) {
        elem.removeChild(elem.childNodes[i-1]);
    }

    if (isNaN(smin) == true || isNaN(smax) == true) {
        return false;
    }

    if (smin > smax) {
        var tmp;
        tmp = smax;
        smax = smin;
        smin = tmp;
    }

    var newSelect = document.createElement("select");

    newSelect.size = 1;
    newSelect.id = idname;
    newSelect.name = name;
    newSelect.style.width = width;
    newSelect.style.textAlign = "center";
    newSelect.style.border = "1px";
    newSelect.style.solid = "#ffffff";
    newSelect.style.color = "#373487";
    newSelect.onchange = func;

    for (var i = smin; i <= smax; i++) {
        var newOption = document.createElement("option");

        if (txtlist == null || vallist == null ) {
            newOption.text = i;
            newOption.value = i;
        } else {
            newOption.text = txtlist[i];
            newOption.value = vallist[i];
        }
        newSelect.options.add(newOption);

        newOption = null;
    }
    insertAfter(newSelect, elem);

    newSelect = null;

}

/*********************************************************
 function : makeSelectBox3 ()
 description : ?�쟻?�줈 select諛뺤�瑜?留뚮��??�엯?�떎.
 parameter1 : (elem : element)
 parameter2 : (idname : new select box??id name)
 parameter3 : (list : �ъ뒪??諛곗��
 parameter4 : (width : size width)
 parameter5 : (smin : list??理쒖�媛??먒� 諛곗��??몃뜳??
 parameter6 : (smax : list??理쒕?��?먒� 諛곗��??몃뜳??
 ***********************************************************/
function makeSelectBox3(elem, idname, name, txtlist, vallist, func, width, smin, smax) {
    for (var i = elem.childNodes.length; i > 0; i--) {
        elem.removeChild(elem.childNodes[i-1]);
    }

    if (isNaN(smin) == true || isNaN(smax) == true) {
        return false;
    }

    if (smin > smax) {
        var tmp;
        tmp = smax;
        smax = smin;
        smin = tmp;
    }

    //var newSelect = document.createElement("select");
    var newSelect = elem;

    newSelect.size = 1;
    //newSelect.id = idname;
    //newSelect.name = name;
    //newSelect.style.width = width;
    //newSelect.style.textAlign = "center";
    //newSelect.style.border = "1px";
    //newSelect.style.solid = "#ffffff";
    //newSelect.style.color = "#373487";
    newSelect.onchange = func;

    var newOption = document.createElement("option");
    newOption.text = "";
    newOption.value = -1;
    newSelect.options.add(newOption);

    newOption = null;

    for (var i = smin; i <= smax; i++) {
        var newOption = document.createElement("option");

        if (txtlist == null || vallist == null ) {
            newOption.text = i;
            newOption.value = i;
        } else {
            newOption.text = txtlist[i];
            newOption.value = vallist[i];
        }
        newSelect.options.add(newOption);

        newOption = null;
    }

    //insertAfter(newSelect, elem);

}

/*********************************************************
 function : setAttrSelected ()
 description : ?꾩껜?곸쑝��?먹�?��李얠? select box???� setvalue?좏깮?�떎.
 parameter1 : (thisform : form)
 parameter2 : (attrname : id name)
 parameter3 : (setvalue : select ��
 ***********************************************************/
function setAttrSelected(theform, attrname, setvalue) {
    if ( checkform(theform) == false ) {
        return false;
    }

    if (!theform.getElementsByTagName) {
        return false;
    }

    var tagname = theform.getElementsByTagName("select");

    for (var i = 0; i < tagname.length; i++) {
        var valname = tagname[i].getAttribute("id");

        if (valname == null) {
            return false;
        }

        if (valname == attrname) {
            for (var j = 0; j < tagname[i].childNodes.length; j++) {
                if (tagname[i].childNodes[j].value == setvalue) {
                    tagname[i].childNodes[j].setAttribute("selected", "1");
                    return true;
                }
            }
        }
    }
}

/*********************************************************
 function : setAttrSelectedID ()
 description : idname��李얠? select box???� setvalue?좏깮?�떎.
 parameter1 : (idname : ?�element id)
 parameter2 : (setvalue : ?좏깮??��
 ***********************************************************/
function setAttrSelectedID(idname, setvalue) {
    var tagname = document.getElementById(idname);

    if ( setvalue == null ) {
        return false;
    }

    for (var j = 0; j < tagname.childNodes.length; j++) {
        if (tagname.childNodes[j].value == setvalue) {
            //tagname.childNodes[j].setAttribute("selected", "1");
            tagname.childNodes[j].selected = true;
            return true;
        }
    }
    return false;
}

/*********************************************************
 function : setAttrCheckBox ()
 description : idname��李얠? check box???� setvalue?좏깮?�떎.
 parameter1 : (idname : ?�element id)
 parameter2 : (setvalue : ?좏깮??��
 ***********************************************************/
function setAttrCheckBox(idname, recvdata) {
    var elementid = document.getElementById(idname);

    if (recvdata[idname] == 1) {
        elementid.checked = true;
    } else {
        elementid.checked = false;
    }

}

/*********************************************************
 function : getAttrCheckBox ()
 description : idname��李얠? check box???� setvalue媛?몄삩??
 parameter1 : (idname : ?�element id)
 ***********************************************************/
function getAttrCheckBox(idname) {
    var elementid = document.getElementById(idname);

    if (elementid.checked == true) {
        return 1;
    } else {
        return 0;
    }
}

/*********************************************************
 function : setAttrTextID ()
 description : attrname 李얠? element???� setvalue��蹂寃���?
 parameter1 : (attrname : ?�element id)
 parameter2 : (setvalue : 蹂����
 ***********************************************************/
function setAttrTextID(attrname, setvalue) {
    if (!document.getElementById) {
        return false;
    }

    if (attrname == null) {
        return false;
    }

    var tagName = document.getElementById(attrname);

    tagName.value = setvalue;

    return true;
}

/*********************************************************
 function :  CheckStr()
 description : �몄�쓣 寃?��?
 寃?�嫄?(1) ?뱀?뺇�?�븞???뱀�臾몄옄 ?�湲 (?? . @ # $ % & * ( ) ???�슜)
 (2) ?뱀?뺇�?�븞??�듬��湲덉?
 (3) ?뱀?뺇�?�쑝濾몄寃??(?��먽� '?�젰�몄��고�'?����?좉퍡??
 ?�젰�몄��고�???? Apple<Fruit>  <--?붾윴 ?뺥깭��?먦�?�젰?좊젮�ъ슂
 ***********************************************************/
function  CheckStr(ans) {

    var ret = null;

    var i = 0;   //for�몄?�슜??蹂??
    var special=new Array("=","+","[","]","{","}","<",">");

    for(i=0; i< special.length;i++) {
        var output = ans.indexOf(special[i],0);  //?���몄옄?�뿉 ?뱀�臾몄옄?�씠 ?�뒗吏 ?뺤씤
        if (output != -1) {//?뱀�臾몄옄媛 ?�떎��-1??諛섑-1?�쇅?�컪??alert ?�뻾???�닔 �낅��        {
            ret = errSpecialChar+":"+special[i];
            return ret;
        }
    }
}

/*********************************************************
 function : isKeyPressed ()
 description : shift? ?��?�� 泥댄�� ***********************************************************/
function isKeyPressed(event) {
    if (event.shiftKey==1) {
        return true;
    } else {
        return false;
    }
}

/*********************************************************
 function : isEscKeyPressed ()
 description :
 ***********************************************************/
function isEscKeyPressed(event) {
    var ret = true;

    if(browerIE) {
        keyret[keyidx] = window.event.keyCode;
    } else if(event) {
        keyret[keyidx] = event.which;
    }

    if (keyret[0] == 27 ) {
        ret = false;
    }

    if (ret == false) {
        if (browerIE) {
            window.event.returnValue = false;
        } else {
            event.preventDefault();
        }
    }
}

/*********************************************************
 function : ChecknumRange ()
 description :
 parameter1 :
 ***********************************************************/
function ChecknumRange(elem, min, max) {
    var checkE = elem;

    if (!checkE || (min == null) || (max == null) ) {
        return;
    }

    if (parseInt(checkE.value) < parseInt(min) ) {
        alert("Error!" + errFieldValLess + "Min[" + min +"] Max [ " + max + "]");
        checkE.focus();
    } else if(parseInt(checkE.value) > parseInt(max) ) {
        alert("Error!" + errFieldLenOver + "Min[" + min +"] Max [ " + max + "]");
        checkE.focus();
    }
}

/*********************************************************
 function : NumObj ()
 description : ?�낫?�줈 �???�옄?�쭔 ?�젰諛쏅?
 parameter1 : (obj : ?�옄? ?�젰諛쏆object)
 ***********************************************************/
var keyidx = 0;
var keyret = Array(2);
function NumObj(obj) {
    if (isKeyPressed(obj) == true) {
        if (browerIE) {
            window.event.returnValue = false;
        } else {
            obj.preventDefault();
        }
        return;
    }

    var ret = true;

    if(browerIE) {
        keyret[0] = window.event.keyCode;
    } else if(obj) {
        keyret[0] = obj.which;
    }

    if (keyret[0] == 13) {
        if (browerIE) {
            window.event.keyCode = 9;
        }
    }

    if (keyret[0] == 27 ) {
        ret = false;
    }

    // ?곷�?�몄    
    if (keyret[0] >= 65 && keyret[0] <= 90) {
        ret = false;
    }

    if (keyret[0] == 16) {
        ret = false;
    }

    if (keyret[0] == 110 || keyret[0] == 111 || keyret[0] == 107 || keyret[0] == 109) {
        ret = false;
    }

    if (keyret[0] == 189 || keyret[0] == 187 || keyret[0] == 220 || keyret[0] == 219 || keyret[0] == 221 || keyret[0] == 186) {
        ret = false;
    }

    if (keyret[0] == 222 || keyret[0] == 187 || keyret[0] == 188 || keyret[0] == 190 || keyret[0] == 191 || keyret[0] == 192 || keyret[0] == 59) {
        ret = false;
    }
    /*
     // ?곷�??
     if (keyret[0] >= 97 && keyret[0] <= 122)
     {
     ret = false;
     }
     */
    if (ret == false) {
        if (browerIE) {
            window.event.returnValue = false;
        } else {
            obj.preventDefault();
        }
    }

    keyidx = 0;
}

/*********************************************************
 function : virtualKeyboard1Obj ()
 description : ?�슜 ?�퐫??( /, ., @, #, $, %, &, *, (, ), _, -, :, ?�옄 , ?곷�???)
 : (shift key -> 16)   ( . -> 190 ) ( / -> 191 )
 parameter1 : (obj : ?�젰諛쏆object)
 ***********************************************************/
function virtualKeyboard1Obj(obj) {
    var ret = true;

    if (isKeyPressed(obj) == true) {
        keyidx = 1;
    } else {
        keyidx = 0;
    }

    if(browerIE) {
        keyret[keyidx] = window.event.keyCode;
    } else if(obj) {
        keyret[keyidx] = obj.which;
    }

    if (keyret[0] == 13) {
        // ENTER
        if (browerIE) {
            window.event.keyCode = 9; // Tab
        }
    }

    if (keyret[0] == 27 ) {
        // ESC
        ret = false;
    }

    if (keyret[0] == 111 || keyret[0] == 107 ) {
        // '/' '+' keypad
        ret = false;
    }

    if (keyret[0] == 187 || keyret[0] == 220 || keyret[0] == 219 || keyret[0] == 221 || keyret[0] == 186) {
        // '='. '\', '[', ']', ';'
        ret = false;
    }

    if (keyret[0] == 222 || keyret[0] == 187 || keyret[0] == 188 || keyret[0] == 192 || keyret[0] == 59) {
        // ''', '=', '', '`', ''
        ret = false;
    }

    if ( keyidx == 1) {
        if (keyret[1] == 16 || keyret[1] == 187 || keyret[1] == 219 || keyret[1] == 221 || keyret[1] == 222) {
            // 'shift', '=', '[', ']', '''
            ret = false;
        }

        if (keyret[1] == 190 || keyret[1] == 191 || keyret[1] == 188 || keyret[1] == 107 || keyret[1] == 192 || keyret[1] == 220) {

            ret = false;
        }
        keyret[0] = 0;
        keyret[1] = 0;
    }

    if (ret == false) {
        if (browerIE) {
            window.event.returnValue = false;
        } else {
            obj.preventDefault();
        }
    }
}

function virtualCamTitle(obj) {
    var ret = true;

    if (isKeyPressed(obj) == true) {
        keyidx = 1;
    } else {
        keyidx = 0;
    }

    if(browerIE) {
        keyret[keyidx] = window.event.keyCode;
    } else if(obj) {
        keyret[keyidx] = obj.which;
    }

    if(keyidx == 0) {
        if((keyret[keyidx] >= 65 && keyret[keyidx] <= 90) || (keyret[keyidx] >= 96 && keyret[keyidx] <=105) || (keyret[keyidx] >= 48 && keyret[keyidx] <=57)
        || keyret[keyidx] == 8 || keyret[keyidx] == 9 || keyret[keyidx] == 16) {
            ret = true;
        } else {
            ret = false;
        }
    } else {
        if((keyret[keyidx] >= 65 && keyret[keyidx] <= 90) || keyret[keyidx] == 186 || keyret[keyidx] == 16) {
            ret = true;
        } else {
            ret = false;
        }
    }

    if (ret == false) {
        if (browerIE) {
            window.event.returnValue = false;
        } else {
            obj.preventDefault();
        }
    }
}

function virtualKeyboard_email(obj) {
    var ret = true;

    if (isKeyPressed(obj) == true) {
        keyidx = 1;
    } else {
        keyidx = 0;
    }

    if(browerIE) {
        keyret[keyidx] = window.event.keyCode;
    } else if(obj) {
        keyret[keyidx] = obj.which;
    }

    if (keyret[0] == 13) {
        if (browerIE) {
            window.event.keyCode = 9;
        }
    }

    if (keyret[0] == 27 ) {
        ret = false;
    }

    if (keyret[0] == 111 || keyret[0] == 107 ) {
        ret = false;
    }

    if (keyret[0] == 187 || keyret[0] == 220 || keyret[0] == 219 || keyret[0] == 221 || keyret[0] == 186) {
        ret = false;
    }

    if (keyret[0] == 222 || keyret[0] == 187 || keyret[0] == 188 || keyret[0] == 192 || keyret[0] == 59) {
        ret = false;
    }

    if ( keyidx == 1) {
        if (keyret[1] == 54 || keyret[1] == 16 || keyret[1] == 187 || keyret[1] == 219 || keyret[1] == 221 || keyret[1] == 222) {
            ret = false;
        }

        if (keyret[1] == 190 || keyret[1] == 191 || keyret[1] == 188 || keyret[1] == 107 || keyret[1] == 192 || keyret[1] == 220) {
            ret = false;
        }
        keyret[0] = 0;
        keyret[1] = 0;
    }

    if (ret == false) {
        if (browerIE) {
            window.event.returnValue = false;
        } else {
            obj.preventDefault();
        }
    }
}

/*********************************************************
 function : GetOnlyNumEng ()
 description : ?�슜 ?�퐫??( ?�옄 , ?곷�???)

 parameter1 : (obj : ?�젰諛쏆object)
 ***********************************************************/
function GetOnlyNumEngChk(ths) {
    isEscKeyPressed(ths);

    var NumEng = /^[A-Za-z0-9]+$/;

    for ( var i = 0; i < ths.value.length; i++) {
        var chr = ths.value.charAt(i);

        if(NumEng.test(chr) || chr == "") {
        } else {
            alert(errSpecialChar);
            ths.value = ths.value.substring(0, i);
            ths.focus();
            break;
        }
    }
}

function GetOnlyNumEng(ths) {

    isEscKeyPressed(ths);
    var chr = ths.value.charAt(ths.value.length-1);

    var NumEng = /^[A-Za-z0-9]+$/;

    if(NumEng.test(chr) || chr == "") {
    } else {
        if (browerIE) {
            window.event.returnValue = false;
        } else {
            obj.preventDefault();
        }
        alert(errSpecialChar);
        ths.value = ths.value.substring(0, ths.value.length-1);
    }
}

function CheckDomailFormat(str) {
  var regexp = /^[A-Za-z0-9\.-]+$/;

  if (str.length != 0) {
    return regexp.test(str);
  } else {
    return true;
  }
}

/*********************************************************
 function : GetOnlyNumeric ()
 description : ?�슜 ?�퐫??( ?�옄 )
 : (shift key -> 16)
 parameter1 : (obj : ?�젰諛쏆object)
 ***********************************************************/
function GetOnlyNumeric(ths) {
    var anum=/(^\d+$)|(^\d+\.\d+$)/;
    if (anum.test(ths.value) || ths.value == "") {
    } else {
        if (browerIE) {
            window.event.returnValue = false;
        } else {
            obj.preventDefault();
        }
    }
}

/*********************************************************
 function : CheckEmail ()
 description : email format check
 parameter1 : (emailStr : email string)
 return success : true / fail : false
 ***********************************************************/
function CheckEmail(emailStr) {
    var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (filter.test(emailStr)) {
        return true;
    } else {
        return false;
    }
}

/*********************************************************
 function : han_check ()
 description : ??�� 泥댄�� parameter1 : (objectname : check ??string)
 return success : true / fail : false
 ***********************************************************/
function han_check(objectname) {
    var strValue = objectname;
    var retCode = 0;
    var i;

    for (i = 0; i < strValue.length; i++) {
        var retCode = strValue.charCodeAt(i);
        var retChar = strValue.substr(i, 1).toUpperCase();
        retCode = parseInt(retCode);

        if ( (retChar < "0" || retChar > "9") && (retChar < "A" || retChar > "Z") && (retCode > 255 || retCode < 0) ) {
            return false;
            break;
        }
    }
    return true;
}

/*********************************************************
 function : checkform ()
 description : form ??議댁�뒗吏 泥댄�� parameter1 : (thisform : ?붿껌?????���
 return success : true / fail : false
 ***********************************************************/
function checkform(theform) {
    if (!theform) {
        return false;
    }

    return true;
}

/*********************************************************
 function : validate_required_text ()
 description : ?�젰 �몄?�몄媛쒕泥댄�� parameter1 : (field : check??element)
 parameter2 : (strlen : strlen 湲몄)
 parameter3 : (strtype : ?�옄???�몄???
 parameter4 : (maxval : 理쒕? 湲몄
 parameter5 : (minval : 理쒖湲몄
 ***********************************************************/
function validate_required_text(field, strlen, strtype, maxval, minval) {
    with (field) {
        var errid = chOnePlus(id);
        var encodingval = encodeURIComponent(value);
        //var encodingval = escape(value);
        //var encodingval = value;

        if (value==null||value=="") {
            errMsg += "[" + errid + "]" + errFieldEmpty + "<br>";
            return false;
        }

        if (han_check(value) == false) {
            errMsg += "[" + errid + "]" + errLanguage + "<br>";
            return false;
        }

        var strendodinglen = encodingval;
        var sn = '%';

        var partdata = strendodinglen.split(sn);

        if ( partdata.length != 1 ) {
            strendodinglen = strendodinglen.length - (partdata.length - 1) * 2;
        } else {
            strendodinglen = strendodinglen.length;
        }

        if (parseInt(strendodinglen) > strlen) {
            errMsg += "[" + errid + "]" + errFieldLenOver + "<br>";
            return false;
        }

        if (strtype != null) {
            if (strtype == "number") {
                if ( maxval != null && minval != null ) {
                    if ( parseInt(value) > parseInt(maxval) ) {
                        errMsg += "[" + errid + "]" + errFieldValOver + "<br>";
                        return false;
                    }

                    if ( parseInt(value) < parseInt(minval) ) {
                        errMsg += "[" + errid + "]" + errFieldValLess + "<br>";
                        return false;
                    }
                }
            }
        }
        /*
         var special = new Array('\'', '\"');

         for (i = 0; i < value.length; i++)
         {
         for ( j = 0; j < special.length; j++)
         {
         if (special[j] == value.charAt(i))
         {
         errMsg += "[" + errid + "]" + errSpecialChar + "<br>";
         return false;
         }
         }
         }
         */
        var ret;
        ret = CheckStr(value);
        if (ret != null) {
            errMsg += "[" + errid + "]" + ret + "<br>";
            return false;
        }
    }
}

/*********************************************************
 function : validate_required_text2 ()
 description : ?�젰 �몄?�몄媛쒕泥댄��(茶���?�吏 ?�쓬)
 parameter1 : (field : check??element)
 parameter2 : (strlen : strlen 湲몄)
 parameter3 : (strtype : ?�옄???�몄???
 parameter4 : (maxval : 理쒕? 湲몄
 parameter5 : (minval : 理쒖湲몄
 ***********************************************************/
function validate_required_text2(field, strlen, strtype, maxval, minval) {
    with (field) {
        var errid = id;
        //var encodingval = encodeURIComponent(value);
        var encodingval = escape(value);

        if (value==null||value=="") {
            errMsg += "[" + errid + "]" + errFieldEmpty + "<br>";
            return false;
        }

        if (han_check(value) == false) {
            errMsg += "[" + errid + "]" + errLanguage + "<br>";
            return false;
        }

        if (encodingval.length > strlen) {
            errMsg += "[" + errid + "]" + errFieldLenOver + "<br>";
            return false;
        }

        if (strtype != null) {
            if (strtype == "number") {
                if ( maxval != null && minval != null ) {
                    if ( parseInt(value) > parseInt(maxval) ) {
                        errMsg += "[" + errid + "]" + errFieldValOver + "<br>";
                        return false;
                    }

                    if ( parseInt(value) < parseInt(minval) ) {
                        errMsg += "[" + errid + "]" + errFieldValLess + "<br>";
                        return false;
                    }
                }
            }
        }

        var special = new Array('\'', '\"');
        var i, j;

        for (i = 0; i < value.length; i++) {
            for ( j = 0; j < special.length; j++) {
                if (special[j] == value.charAt(i)) {
                    errMsg += "[" + errid + "]" + errSpecialChar + "<br>";
                    return false;
                }
            }
        }
    }
}

/*********************************************************
 function : setOpacity ()
 description : ?�뙆��?�젙
 parameter1 :
 parameter2 :
 ***********************************************************/
function setOpacity(obj,opacity) {
    var elem;
    if(typeof(obj)=='string') {
        elem =document.getElementById(obj);
        if (!elem) {
            //alert(obj);
            return;
        }
    } else {
        return;
    }

    elem.style.filter = "alpha(opacity=" + parseInt(opacity) + ")";
    elem.style.KHTMLOpacity = (parseInt(opacity) / 100);
    elem.style.MozOpacity = (parseInt(opacity) / 100);
    elem.style.opacity = (parseInt(opacity) / 100);
}

/*********************************************************
 function : search_date_is_leap_year () , search_date_get_days_in_month ()
 description : ?�떖??紐뉗�源 ?�뒗吏
 parameter1 : year -> ?�곕룄
 parameter2 : month -> ?�곕룄????
 ***********************************************************/
var days_in_months = Array(2);
var days_in_months1 = Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var days_in_months2 = Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
days_in_months[0] = days_in_months1;
days_in_months[1] = days_in_months2;

function search_date_is_leap_year (year) {
    return ( (((parseInt(year) % 4) == 0) && ((parseInt(year) % 100) != 0)) ||
        (parseInt(year) % 400) == 0 );
}

function search_date_get_days_in_month (month, year) {
    var idx;

    if ( parseInt(month) < 0 || parseInt(month) >= 12) {
        return false;
    }

    idx = search_date_is_leap_year (year) ? 1 : 0;

    return days_in_months[parseInt(idx)][parseInt(month)];
}

/*********************************************************
 function : set_hour_change()
 description : ?�컙???뷀븫�곕굹 類??
 parameter1 :
 parameter2 :
 ***********************************************************/
function set_hour_change(year, mon, day, hour, min, sec, mtime) {
    var chg_time = Array(6);

    var MinusDate = new Date();

    MinusDate.setFullYear(parseInt(year));
    MinusDate.setMonth(parseInt(mon));
    MinusDate.setDate(parseInt(day));
    MinusDate.setHours(parseInt(hour)+mtime);
    MinusDate.setMinutes(parseInt(min));
    MinusDate.setSeconds(parseInt(sec));

    chg_time[0] = MinusDate.getFullYear();
    chg_time[1] = MinusDate.getMonth();
    chg_time[2] = MinusDate.getDate();
    chg_time[3] = MinusDate.getHours();
    chg_time[4] = MinusDate.getMinutes();
    chg_time[5] = MinusDate.getSeconds();

    MinusDate = null;

    return chg_time;

}

/*********************************************************
 function : one_day_minus () , one_day_day ()
 description : ?�（?뷀븫�곕굹 類??
 parameter1 : year -> ?�곕룄
 parameter2 : month -> ?�곕룄????
 ***********************************************************/
function one_day_minus(day, month, year) {
    var minus_time = Array(3);

    if ( parseInt(day) - 1 <= 0 ) {
        day = day_in_minusmonth(month, year);

        if ( parseInt(month) - 1 <= 0) {
            month = 11;
            year--;
        } else {
            month--;
        }

    } else {
        day--;
    }

    minus_time[0] = day;
    minus_time[1] = month;
    minus_time[2] = year;

    return minus_time;
}

function one_day_day(day, month, year) {
    var plus_time = Array(3);

    if ( parseInt(day) + 1 > search_date_get_days_in_month(month, year) ) {
        day = 1;

        if ( parseInt(month) + 1 > 11) {
            month = 0;
            year++;
        } else {
            month++;
        }

    } else {
        day++;
    }

    plus_time[0] = day;
    plus_time[1] = month;
    plus_time[2] = year;

    return plus_time;
}

/*********************************************************
 function : day_in_minusmonth ()
 description : ?�쟾 ?�떖??紐뉗�源 ?�뒗吏
 parameter1 : year -> ?�곕룄
 parameter2 : month -> ?�곕룄????
 ***********************************************************/
function day_in_minusmonth(mon, year) {
    if (parseInt(mon) < 1 || parseInt(mon) > 12 ) {
        return false;
    }

    if ( (parseInt(mon) - 1) > 0 ) {
        return search_date_get_days_in_month(parseInt(mon) - 1, year);
    } else {
        return search_date_get_days_in_month(12, parseInt(year) - 1);
    }
}

/*********************************************************
 function : activexImgD ()
 description : ActiveX Control Image
 ***********************************************************/
function activexImgD() {
    var division8 = document.getElementById("division8");
    var division8bar = document.getElementById("division8bar");
    var division9 = document.getElementById("division9");
    var division9bar = document.getElementById("division9bar");
    var division16 = document.getElementById("division16");
    var division16bar = document.getElementById("division16bar");

    if (parseInt(INFO_DVRCHANNEL) == 4) {
        if ( division8 && division8bar ) {
            division8.style.cssText = "visibility:hidden;";
            division8bar.style.cssText = "visibility:hidden;";
        }
        if ( division9 && division9bar ) {
            division9.style.cssText = "visibility:hidden;";
            division9bar.style.cssText = "visibility:hidden;";
        }
        if ( division16 && division16bar ) {
            division16.style.cssText = "visibility:hidden;";
            division16bar.style.cssText = "visibility:hidden;";
        }
    } else if (parseInt(INFO_DVRCHANNEL) == 8) {
        if ( division8 && division8bar ) {
            division8.style.cssText = "visibility:visible;";
            division8bar.style.cssText = "visibility:visible;";
        }
        if ( division9 && division9bar ) {
            division9.style.cssText = "visibility:visible;";
            division9bar.style.cssText = "visibility:visible;";
        }
        if ( division16 && division16bar ) {
            division16.style.cssText = "visibility:hidden;";
            division16bar.style.cssText = "visibility:hidden;";
        }
    } else {
        if ( division8 && division8bar ) {
            division8.style.cssText = "visibility:visible;";
            division8bar.style.cssText = "visibility:visible;";
        }
        if ( division9 && division9bar ) {
            division9.style.cssText = "visibility:visible;";
            division9bar.style.cssText = "visibility:visible;";
        }
        if ( division16 && division16bar ) {
            division16.style.cssText = "visibility:visible;";
            division16bar.style.cssText = "visibility:visible;";
        }
    }
}

/*********************************************************
 function : ViChEnDis ()
 description : 茶���??곕Ⅸ Enable / Disable
 ***********************************************************/
function VichEnDis(elemch4, elemch8) {
    if (!elemch4) {
        return;
    }
    if (!elemch8) {
        return;
    }

    var targetNode = elemch4.parentNode;

    if (parseInt(INFO_DVRCHANNEL) == 4) {
        targetNode.removeChild(elemch4);
    } else if (parseInt(INFO_DVRCHANNEL) == 8) {
        targetNode.removeChild(elemch8);
    }
}

/*********************************************************
 function : chable_enable ()
 description : 茶���??곕Ⅸ Enable / Disable
 ***********************************************************/
function chable_enable() {
    var chenable8 = document.getElementById("chenable8");
    var chenable4 = document.getElementById("chenable4");

    var ch8parent = chenable8.parentNode;
    var ch4parent = chenable4.parentNode;

    if ( parseInt(INFO_DVRCHANNEL) == 8 ) {
        ch8parent.removeChild(chenable8);
    } else if ( parseInt(INFO_DVRCHANNEL) == 4 ) {
        ch4parent.removeChild(chenable4);
    }
}

/*********************************************************
 function : chable_enable2 ()
 description : 茶���??곕Ⅸ Enable / Disable
 ***********************************************************/
function chable_enable2() {
    var chenable8 = document.getElementById("chenable8");
    var chenable4 = document.getElementById("chenable4");

    var ch8parent = chenable8.parentNode;
    var ch4parent = chenable4.parentNode;

    if ( parseInt(INFO_DVRCHANNEL) == 8 ) {
        ch8parent.removeChild(chenable8);
    } else if ( parseInt(INFO_DVRCHANNEL) == 4 ) {
        ch4parent.removeChild(chenable4);
        ch8parent.removeChild(chenable8);
    }
}

/*********************************************************
 function : delElemSelOption ()
 description : select option ?? ***********************************************************/
function delElemSelOption(pnode) {
    if (!pnode) {
        return;
    }

    for (var i = pnode.childNodes.length; i > 0; i--) {
        var childNode = pnode.childNodes[i-1];
        pnode.removeChild(childNode);
    }
}

/*********************************************************
 function : createElemSelOption1 ()
 description : select option �붽? ?�옄 value == id
 ***********************************************************/
function createElemSelOption1(pnode, start, end) {
    if (!pnode) {
        return;
    }
    delElemSelOption(pnode);
    for (var i = parseInt(start); i <= parseInt(end); i++) {
        var eleopt = document.createElement("option");
        eleopt.setAttribute("value", i);

        if ( parseInt(i) < 10 ) {
            eleopt.text = '0'+i;
        } else {
            eleopt.text = i;
        }
        pnode.options.add(eleopt);

        eleopt = null;
    }
}

/*********************************************************
 function : createElemSelOption1 ()
 description : select option �붽? ?�옄 value == id - 1
 ***********************************************************/
function createElemSelOption2(pnode, start, end) {
    if (!pnode) {
        return;
    }
    delElemSelOption(pnode);
    for (var i = parseInt(start); i <= parseInt(end); i++) {
        var eleopt = document.createElement("option");
        eleopt.setAttribute("value", parseInt(i)-1);

        var txtNode;
        if ( parseInt(i) < 10 ) {
            txtNode = document.createTextNode('0'+i);
        } else {
            txtNode = document.createTextNode(i);
        }
        eleopt.appendChild(txtNode);
        pnode.appendChild(eleopt);

        eleopt = null;
    }
}

/*********************************************************
 function : createElemSelOption3 ()
 description : select option �붽? ?�옄 value == id - 1
 text??ch?�엯
 ***********************************************************/
function createElemSelOption3(pnode, start, end) {
    if (!pnode) {
        return;
    }
    delElemSelOption(pnode);
    for (var i = parseInt(start); i <= parseInt(end); i++) {
        var eleopt = document.createElement("option");
        eleopt.setAttribute("value", parseInt(i)-1);

        var txtNode;
        if ( parseInt(i) < 10 ) {
            txtNode = document.createTextNode(langArray["LTXT_CAMCH"]+'  '+'0'+i);
        } else {
            txtNode = document.createTextNode(langArray["LTXT_CAMCH"]+'  '+i);
        }
        eleopt.appendChild(txtNode);
        pnode.appendChild(eleopt);

        eleopt = null;
    }
}

/*********************************************************
 function : createElemSelOption4 ()
 description : select option �붽? ?�옄 value == id - 1
 text??ch?�엯
 ***********************************************************/
function createElemSelOption4(pnode, start, end) {
    if (!pnode) {
        return;
    }
    delElemSelOption(pnode);

    var eleopt = document.createElement("option");
    eleopt.setAttribute("value", parseInt(start) - 1);
    var txtNode = document.createTextNode(langArray["LTXT_OFF"]);
    eleopt.appendChild(txtNode);
    pnode.appendChild(eleopt);

    eleopt = null;
    txtNode = null;

    for (var i = parseInt(start); i <= parseInt(end); i++) {
        eleopt = document.createElement("option");
        eleopt.setAttribute("value", parseInt(i));

        if ( parseInt(i) < 10 ) {
            txtNode = document.createTextNode(langArray["LTXT_CAMCH"]+'  '+'0'+i);
        } else {
            txtNode = document.createTextNode(langArray["LTXT_CAMCH"]+'  '+i);
        }
        eleopt.appendChild(txtNode);
        pnode.appendChild(eleopt);

        eleopt = null;
        txtNode = null;
    }
}

/*********************************************************
 function : createElemSelOption5 ()
 description : select option �붽? ?�옄 value == id - 1
 text??ch?�엯
 ***********************************************************/
function createElemSelOption5(pnode, start, end) {
    if (!pnode) {
        return;
    }
    delElemSelOption(pnode);

    var eleopt = document.createElement("option");
    eleopt.setAttribute("value", parseInt(start) - 2);
    var txtNode = document.createTextNode('');
    eleopt.appendChild(txtNode);
    pnode.appendChild(eleopt);

    txtNode = null;
    eleopt = null;

    var eleopt = document.createElement("option");
    eleopt.setAttribute("value", parseInt(start) - 1);
    var txtNode = document.createTextNode(langArray["LTXT_OFF"]);
    eleopt.appendChild(txtNode);
    pnode.appendChild(eleopt);

    txtNode = null;
    eleopt = null;

    for (var i = parseInt(start); i <= parseInt(end); i++) {
        eleopt = document.createElement("option");
        eleopt.setAttribute("value", parseInt(i));

        if ( parseInt(i) < 10 ) {
            txtNode = document.createTextNode(langArray["LTXT_CAMCH"]+'  '+'0'+i);
        } else {
            txtNode = document.createTextNode(langArray["LTXT_CAMCH"]+'  '+i);
        }
        eleopt.appendChild(txtNode);
        pnode.appendChild(eleopt);

        txtNode = null;
        eleopt = null;
    }
}

/*********************************************************
 function : createElemSelOption6 ()
 description : select option �붽? ?�옄 value == id
 ***********************************************************/
function createElemSelOption6(pnode, start, end) {
    if (!pnode) {
        return;
    }
    delElemSelOption(pnode);

    var eleopt = document.createElement("option");
    eleopt.setAttribute("value", parseInt(start) - 1);
    var txtNode = document.createTextNode('');
    eleopt.appendChild(txtNode);
    pnode.appendChild(eleopt);

    txtNode = null;
    eleopt = null;

    for (var i = parseInt(start); i <= parseInt(end); i++) {
        var eleopt = document.createElement("option");
        eleopt.setAttribute("value", i);

        if ( parseInt(i) < 10 ) {
            eleopt.text = '0'+i;
        } else {
            eleopt.text = i;
        }
        pnode.options.add(eleopt);

        eleopt = null;
    }
}

/*********************************************************
 function : createElemSelOption7 ()
 description : select option �붽? ?�옄 value == id
 ***********************************************************/
function createElemSelOption7(pnode, allflag) {
    if (!pnode) {
        return;
    }
    delElemSelOption(pnode);

    if ( parseInt(allflag) ) {
        var eleopt = document.createElement("option");
        eleopt.setAttribute("value", -1);
        var txtNode = document.createTextNode('');
        eleopt.appendChild(txtNode);
        pnode.appendChild(eleopt);
    }

    var eleopt = document.createElement("option");
    eleopt.setAttribute("value", 0);
    var txtNode = document.createTextNode(langArray["LTXT_OFF"]);
    eleopt.appendChild(txtNode);
    pnode.appendChild(eleopt);

    var eleopt = document.createElement("option");
    eleopt.setAttribute("value", 1);
    var txtNode = document.createTextNode(langArray["LTXT_ON"]);
    eleopt.appendChild(txtNode);
    pnode.appendChild(eleopt);

    txtNode = null;
    eleopt = null;
}

/*********************************************************
 function : createElemSelOption8 ()
 description : select option �붽? ?�옄 value == id - 1
 text??ch?�엯
 ***********************************************************/
function createElemSelOption8(pnode, start, end) {
    if (!pnode) {
        return;
    }
    delElemSelOption(pnode);

    for (var i = parseInt(start); i <= parseInt(end); i++) {
        eleopt = document.createElement("option");
        eleopt.setAttribute("value", parseInt(i) - 1);

        if ( parseInt(i) < 10 ) {
            txtNode = document.createTextNode('0'+i);
        } else {
            txtNode = document.createTextNode(i);
        }
        eleopt.appendChild(txtNode);
        pnode.appendChild(eleopt);

        eleopt = null;
        txtNode = null;
    }

    var eleopt = document.createElement("option");
    eleopt.setAttribute("value", parseInt(end));
    var txtNode = document.createTextNode(langArray["LTXT_OFF"]);
    eleopt.appendChild(txtNode);
    pnode.appendChild(eleopt);

    eleopt = null;
    txtNode = null;
}

/*********************************************************
 function : ActiveXToolbarImageDel ()
 description : None IE
 ***********************************************************/
function ActiveXToolbarImageDel() {
    var division1 = document.getElementById("division1");

    if (division1) {
        division1.style.cssText = "visibility:hidden;";
    }

    var division4 = document.getElementById("division4");

    if (division4) {
        division4.style.cssText = "visibility:hidden;";
    }

    var division8 = document.getElementById("division8");

    if (division8) {
        division8.style.cssText = "visibility:hidden;";
    }

    var division9 = document.getElementById("division9");

    if (division9) {
        division9.style.cssText = "visibility:hidden;";
    }

    var division16 = document.getElementById("division16");

    if (division16) {
        division16.style.cssText = "visibility:hidden;";
    }

    var btpageset = document.getElementById("btpageset");

    if (btpageset) {
        btpageset.style.cssText = "visibility:hidden;";
    }

    var btpageone = document.getElementById("btpageone");

    if (btpageone) {
        btpageone.style.cssText = "visibility:hidden;";
    }

    var btpagefull = document.getElementById("btpagefull");

    if (btpagefull) {
        btpagefull.style.cssText = "visibility:hidden;";
    }

    var btliveaudio = document.getElementById("btliveaudio");

    if (btliveaudio) {
        btliveaudio.style.cssText = "visibility:hidden;";
    }

    var btlivespeaker = document.getElementById("btlivespeaker");

    if (btlivespeaker) {
        btlivespeaker.style.cssText = "visibility:hidden;";
    }

    var btbackup = document.getElementById("btbackup");

    if (btbackup) {
        btbackup.style.cssText = "visibility:hidden;";
    }

    var btprint = document.getElementById("btprint");

    if (btprint) {
        btprint.style.cssText = "visibility:hidden;";
    }

    var btcaptureimage = document.getElementById("btcaptureimage");

    if (btcaptureimage) {
        btcaptureimage.style.cssText = "visibility:hidden;";
    }

    var btsetting = document.getElementById("btsetting");

    if (btsetting) {
        btsetting.style.cssText = "visibility:hidden;";
    }
}

/*********************************************************
 function : lang_encode ()
 description : reveive??query?�꽍?�떎.
 parameter1 : (query : receive query)
 return success : encode data / fail : null
 ***********************************************************/
function lang_encode(query) {
    var st = '$';
    var sn = '&';
    var se = '=';

    if (query == null) {
        return null;
    }

    var typedata = query.split(st);

    if (typedata == null) {
        return null;
    }

    var retdata = Array();
    var j = 0;
    for (var i = 0; i < typedata.length; i++) {
        var partdata = typedata[i].split(sn);

        if (partdata[0] == '') {
            continue;
        }
        if (!partdata[0]) {
            continue;
        }

        var ltype = partdata[0];

        var data = 	partdata[1].split(se);

        var arrytmp = Array(3);
        arrytmp[0] = ltype;
        arrytmp[1] = data[0];
        arrytmp[2] = data[1];

        retdata[j] = arrytmp;
        ++j;
    }

    return retdata;
}

/*********************************************************
 function : lang_file ()
 description : Multi Language
 ***********************************************************/
function lang_file(langs, parts) {
    if (parts == null) {
        return false;
    }

    if ( langs == null) {
        langs = 'english';
    }

    langs = langs.toLowerCase();

    var query = null;

    lang_errMsg();

    query = lang_part(parts);

    if ( query == null) {
        return false;
    }

    var arryret = null;

    arryret = lang_encode(query);

    if ( arryret == null) {
        return false;
    }

    var langDivList = document.getElementsByTagName('div');
    var langSpanList = document.getElementsByTagName('span');
    var langBtnList = document.getElementsByTagName('input');
    var langImgList = document.getElementsByTagName('img');
    var langOptList = document.getElementsByTagName('option');
    for (var i = 0; i < arryret.length; i++) {
        if ( arryret[i][0] == 'span' ) {
            if ((arryret[i][1] == "lang_ANFtitle") && (document.title.indexOf(arryret[i][2]) <= 0)) {
              document.title += " " + arryret[i][2];
            } else {
                for ( var j = 0; j < langSpanList.length; j++) {
                    if ( arryret[i][1] == langSpanList[j].id) {
                        var replaceElem = langSpanList[j];
                        replaceText(replaceElem, arryret[i][2]);
                    }
                }
            }
        } else if ( arryret[i][0] == 'div' ) {
          for ( var j = 0; j < langDivList.length; j++) {
            if ( arryret[i][1] == langDivList[j].id) {
              var replaceElem = langDivList[j];

              replaceText(replaceElem, arryret[i][2]);
            }
          }
        } else if ( arryret[i][0] == 'divimg' ) {
            for ( var j = 0; j < langSpanList.length; j++) {
                if ( arryret[i][1] == langSpanList[j].id) {
                    var replaceElem = langSpanList[j];

                    for (var k = 0; k < replaceElem.childNodes.length; k++) {
                        var childNode = replaceElem.childNodes[k];
                        if (childNode.nodeType == 3) {
                            if (childNode.nodeValue == arryret[i][1]) {
                                childNode.nodeValue = arryret[i][2];

                                var pNode = childNode.parentNode;
                                if (parseInt(pNode.offsetHeight) > 40 ) {
                                    var pNode = childNode.parentNode;

                                    pNode.style.cssText = "line-height:15px;";
                                }
                            }
                        }
                    }
                }
            }
        } else if ( arryret[i][0] == 'value' ) {
            for ( var j = 0; j < langBtnList.length; j++) {
                if ( arryret[i][1] == langBtnList[j].value) {
                    langBtnList[j].value = arryret[i][2];
                }
            }
        } else if ( arryret[i][0] == 'alt' ) {
            for ( var j = 0; j < langImgList.length; j++) {
                if ( arryret[i][1] == langImgList[j].alt) {
                    langImgList[j].alt = arryret[i][2];
                }
            }
        } else if ( arryret[i][0] == 'option' ) {
            for ( var j = 0; j < langOptList.length; j++) {
                if ( arryret[i][1] == langOptList[j].getAttribute("id")) {
                  var replaceElem = langOptList[j];

                  replaceText(replaceElem, arryret[i][2]);
                }
            }
        }
    }
}

function loadScript(url, callback)
{
    // adding the script tag to the head as suggested before
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   // then bind the event to the callback function
   // there are several events for cross browser compatibility
   script.onreadystatechange = callback;
   script.onload = callback;

   // fire the loading
   head.appendChild(script);
}

function info_include() {
    var time_stamp = Math.floor(new Date().getTime() / 1000);
    var rand = Math.floor(Math.random() * 100000) + 1;
    var filepath = "<script type=\"text/javascript\" src=\"../info/info.js?";
    var wString = filepath + time_stamp + '_' + rand + "\"><\/script>";

    document.write(wString);
}

function info_neo_include() {
    var time_stamp = Math.floor(new Date().getTime() / 1000);
    var rand = Math.floor(Math.random() * 100000) + 1;
    var filepath = "<script type=\"text/javascript\" src=\"../info/info.js?";
    var wString = filepath + time_stamp + '_' + rand + "\"><\/script>";

    $('head').append(wString);
}

function info_include2() {
    var d = new Date();
    var wString = "<script type=\"text/javascript\" src=\"../info/info.js?"
        + d.getHours() + d.getMinutes() + d.getSeconds() + "\"><\/script>";
    document.write(wString);
}

/*********************************************************
 function : include_file ()
 description :
 ***********************************************************/
var prv_script = null;
function include_file(filepath) {
    if ( prv_script != null) {
        document.getElementsByTagName('head')[0].removeChild(prv_script);
        prv_script = null;
    }

    var time_stamp = Math.floor(new Date().getTime() / 1000);
    var rand = Math.floor(Math.random() * 100000) + 1;
    var wString = filepath + '?' + time_stamp + '_' + rand;

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = wString;
    document.getElementsByTagName('head')[0].appendChild(script);

    prv_script = script;
    script = null;
}

if( typeof LANGLIST == 'undefined') {
  var LANGLIST = {
    ENGLISH:'english',
    KOREAN:'korean',
    RUSSIAN:'russian(cbc)',
    JAPANESE:'japanese'
  };
}

/*********************************************************
 function : language_include ()
 description : Multi Language
 ***********************************************************/
function language_include() {
    var cookieLang = getCookie("local_language");
    var langs = INFO_LANGUAGE;
    if( cookieLang ) {
      langs = cookieLang;
    }

    if ( langs == null) {
        langs = 'ENGLISH';
    } else {
        langs = langs.toUpperCase();
    }

    var js_lang = LANGLIST[langs];

    if( js_lang.length > 0 ) {
      document.write("<script type='text/javascript' src='../language/"+js_lang+".js'></script>");
    } else {
      document.write("<script type='text/javascript' src='../language/english.js'></script>");
    }

    document.write("<script type='text/javascript' src='../scripts/multiLanguage.js'></script>");
}

function request_script_include() {
    if ( INFO_VENDOR == "SAMSUNG" ) {
        document.write("<script type='text/javascript' src='../scripts/record_request_sme2220.js'></script>");
    } else {
        document.write("<script type='text/javascript' src='../scripts/record_request2.js'></script>");
    }
}

/*********************************************************
 function : language_include ()
 description : Multi Language
 ***********************************************************/
function language_neo_include() {
    var cookieLang = getCookie("local_language");
    var langs = INFO_LANGUAGE;
    if( cookieLang ) {
      langs = cookieLang;
    }

    if ( langs == null) {
        langs = 'ENGLISH';
    } else {
        langs = langs.toUpperCase();
    }

    var js_lang = LANGLIST[langs];

    if( js_lang.length > 0 ) {
        $('head').append("<script type='text/javascript' src='../language/"+js_lang+".js'></script>");
    } else {
      $('head').append("<script type='text/javascript' src='../language/english.js'></script>");
    }

    $('head').append("<script type='text/javascript' src='../scripts/multiLanguage.js'></script>");
}

/*********************************************************
 function : getlog ()
 description : Multi Language log
 ***********************************************************/
function getlog(log_type, log_param1, log_param2, log_logid, log_text) {
    var logdata;

    logdata = lang_logMsg(log_type, log_param1, log_param2, log_logid, log_text);

    return logdata;
}

/*********************************************************
 function : info_dump ()
 description :
 ***********************************************************/
var dump_cnt = 0;
function info_dump() {
    dump_cnt = parseInt(dump_cnt) + 1;
    var info = "DUMP_COUNT["+dump_cnt+"]"
    +"INFO_LANGUAGE=["+INFO_LANGUAGE      +  "] "
    +"INFO_TIMEZONE=["			+INFO_TIMEZONE      +  "] "
    +"INFO_DATEFORMAT=["        +INFO_DATEFORMAT    +  "] "
    +"INFO_TIMEFORMAT=["		+INFO_TIMEFORMAT    +  "] "
    +"INFO_RTSPPORT=["			+INFO_RTSPPORT      +  "] "
    +"INFO_CAMTITLE[0]=["		+INFO_CAMTITLE[0]   +  "] "
    +"INFO_CAMTITLE[1]=["		+INFO_CAMTITLE[1]   +  "] "
    +"INFO_CAMTITLE[2]=["		+INFO_CAMTITLE[2]   +  "] "
    +"INFO_CAMTITLE[3]=["		+INFO_CAMTITLE[3]   +  "] "
    +"INFO_CAMTITLE[4]=["		+INFO_CAMTITLE[4]   +  "] "
    +"INFO_CAMTITLE[5]=["		+INFO_CAMTITLE[5]   +  "] "
    +"INFO_CAMTITLE[6]=["		+INFO_CAMTITLE[6]   +  "] "
    +"INFO_CAMTITLE[7]=["		+INFO_CAMTITLE[7]   +  "] "
    +"INFO_CAMTITLE[8]=["		+INFO_CAMTITLE[8]   +  "] "
    +"INFO_CAMTITLE[9]=["		+INFO_CAMTITLE[9]   +  "] "
    +"INFO_CAMTITLE[10]=["		+INFO_CAMTITLE[10]  +  "] "
    +"INFO_CAMTITLE[11]=["		+INFO_CAMTITLE[11]  +  "] "
    +"INFO_CAMTITLE[12]=["		+INFO_CAMTITLE[12]  +  "] "
    +"INFO_CAMTITLE[13]=["		+INFO_CAMTITLE[13]  +  "] "
    +"INFO_CAMTITLE[14]=["		+INFO_CAMTITLE[14]  +  "] "
    +"INFO_CAMTITLE[15]=["		+INFO_CAMTITLE[15]  +  "] "

    +"INFO_COVERTCH[0]=["		+INFO_COVERTCH[0]   +  "] "
    +"INFO_COVERTCH[1]=["		+INFO_COVERTCH[1]   +  "] "
    +"INFO_COVERTCH[2]=["		+INFO_COVERTCH[2]   +  "] "
    +"INFO_COVERTCH[3]=["		+INFO_COVERTCH[3]   +  "] "
    +"INFO_COVERTCH[4]=["		+INFO_COVERTCH[4]   +  "] "
    +"INFO_COVERTCH[5]=["		+INFO_COVERTCH[5]   +  "] "
    +"INFO_COVERTCH[6]=["		+INFO_COVERTCH[6]   +  "] "
    +"INFO_COVERTCH[7]=["		+INFO_COVERTCH[7]   +  "] "
    +"INFO_COVERTCH[8]=["		+INFO_COVERTCH[8]   +  "] "
    +"INFO_COVERTCH[9]=["		+INFO_COVERTCH[9]   +  "] "
    +"INFO_COVERTCH[10]=["		+INFO_COVERTCH[10]  +  "] "
    +"INFO_COVERTCH[11]=["		+INFO_COVERTCH[11]  +  "] "
    +"INFO_COVERTCH[12]=["		+INFO_COVERTCH[12]  +  "] "
    +"INFO_COVERTCH[13]=["		+INFO_COVERTCH[13]  +  "] "
    +"INFO_COVERTCH[14]=["		+INFO_COVERTCH[14]  +  "] "
    +"INFO_COVERTCH[15]=["		+INFO_COVERTCH[15]  +  "] ";

    //alert(info);
    return info;
}

/*********************************************************
 function : info_compare ()
 description :
 ***********************************************************/
function info_compare() {
    if (INFO_DISCONNECTRESON != INFO_CMP_DISCONNECTRESON) {
        return false;
    }
    if (INFO_DVRREADY != INFO_CMP_DVRREADY ) {
        return false;
    }
    if (INFO_LANGUAGE != INFO_CMP_LANGUAGE) {
        return false;
    }
    if (INFO_TIMEZONE != INFO_CMP_TIMEZONE) {
        return false;
    }
    if (INFO_DATEFORMAT != INFO_CMP_DATEFORMAT) {
        return false;
    }
    if (INFO_TIMEFORMAT != INFO_CMP_TIMEFORMAT) {
        return false;
    }
    if (INFO_RTSPPORT != INFO_CMP_RTSPPORT) {
        return false;
    }
    if (INFO_DST != INFO_CMP_DST) {
        return false;
    }

    if (INFO_CAMTITLE_ON != INFO_CMP_CAMTITLE_ON) {
        return false;
    }

    if (INFO_EVENTICON_ON != INFO_CMP_EVENTICON_ON) {
        return false;
    }

    for (var ch = 0; ch < INFO_DVRCHANNEL; ch++) {
        if (INFO_CAMTITLE[ch] != INFO_CMP_CAMTITLE[ch]) {
            return false;
        }

        if (INFO_COVERTCH[ch] != INFO_CMP_COVERTCH[ch]) {
            return false;
        }
    }
    return true;
}

/*********************************************************
 function : info_cmp_store ()
 description :
 ***********************************************************/
function info_cmp_store() {
    INFO_CMP_DVRREADY = INFO_DVRREADY;
    INFO_CMP_LANGUAGE = INFO_LANGUAGE;
    INFO_CMP_DISCONNECTRESON = INFO_DISCONNECTRESON;
    INFO_CMP_TIMEZONE = INFO_TIMEZONE;
    INFO_CMP_DATEFORMAT = INFO_DATEFORMAT;
    INFO_CMP_TIMEFORMAT = INFO_TIMEFORMAT;
    INFO_CMP_RTSPPORT = INFO_RTSPPORT;
    INFO_CMP_DST = INFO_DST;
    INFO_CMP_DVRSTATUS = INFO_DVRSTATUS;
    INFO_CMP_CAMTITLE_ON = INFO_CAMTITLE_ON;
    INFO_CMP_EVENTICON_ON = INFO_EVENTICON_ON;

    for (var ch = 0; ch < INFO_DVRCHANNEL; ch++) {
        INFO_CMP_CAMTITLE[ch] = INFO_CAMTITLE[ch];
        INFO_CMP_COVERTCH[ch] = INFO_COVERTCH[ch];
    }
}

/*********************************************************
 function : getMouseXY ()
 description :
 ***********************************************************/
function getMouseXY(ev, elem, maxlen) {
    var position = Array(2);

    var posx = 0;
    var posy = 0;

    var abpos = getAbsolutePos(elem);

    if (!ev) {
        ev = window.event;
    }

    if (ev.layerX && ev.layerY) {
        posx = ev.layerX - abpos.x;
        posy = ev.layerY - abpos.y;
    } else if (window.event.clientX && window.event.clientY) {
        var scrollLeft;
        var scrollTop;
        if(document.body.scrollLeft != 0)
            scrollLeft = document.body.scrollLeft;
        else
            scrollLeft = document.documentElement.scrollLeft;

        if(document.body.scrollTop != 0)
            scrollTop = document.body.scrollTop;
        else
            scrollTop = document.documentElement.scrollTop;

        posx = window.event.clientX + scrollLeft - abpos.x;
        posy = window.event.clientY + scrollTop - abpos.y;
    }

    position[0] = posx - 24;

    if ( parseInt(position[0]) < 0 ) {
        position[0] = 0;
    }

    if ( parseInt(position[0]) > parseInt(maxlen) ) {
        position[0] = maxlen;
    }

    return position;
}

/*********************************************************
 function : getAbsolutePos ()
 description :
 ***********************************************************/
function getAbsolutePos(obj) {
    var position = new Object;

    position.x = 0;
    position.y = 0;

    if( obj ) {
        position.x = obj.offsetLeft;
        position.y = obj.offsetTop;

        if( obj.offsetParent ) {
            var parentpos = getAbsolutePos(obj.offsetParent);

            position.x += parentpos.x;
            position.y += parentpos.y;
        }
    }

    return position;
}

/*********************************************************
 function : clone ()
 description :
 ***********************************************************/
function clone (obj) {
    var objectClone = new Image();

    objectClone.src = obj.src;

    return objectClone;
}

/*********************************************************
 function : toptab_visible ()
 description :
 ***********************************************************/
function toptab_visible() {
    var noframe = 'no_frame';
    var tabElem = document.getElementById("title_layer");
    var urllocation = window.location;
    var urlhref = location.href;

    var targetNode = tabElem.parentNode;

    if (urlhref.indexOf(noframe) >= 0 ) {
        var topmargin = document.getElementById("c_g_div_wrapper");
        topmargin.style.cssText = "margin-top:8px;";
        targetNode.removeChild(tabElem);

        var pageMoveElem = document.getElementById("c_sp_div_menubar_sub");
        if( pageMoveElem ) {
          var moveTarget = pageMoveElem.getElementsByTagName("a");

          for ( var i = 0; i < moveTarget.length; i++) {
            var moveurl = moveTarget[i].getAttribute('href');
            moveurl += '?' +noframe;
            moveTarget[i].setAttribute('href',moveurl);
          }
        }
    }
}

function infomationopen() {
    var cw = (screen.width - 796) / 2;
    var ch = (screen.height - 596) / 2;

    window.open('versioninfo.htm', 'popup', 'left='+cw+',top='+ch+',width=400,height=150,toolbar=0,scrollbars=0,location=0,status=1,menubar=0,resizable=0');
}

function rightmouseclickdown(e) {
    if (navigator.appName == 'Netscape' && (e.which == 3 || e.which ==2 )) {
        return false;
    } else if (navigator.appName == 'Microsoft Internet Explorer' && (event.button == 2 || event.button == 3 )) {
        return false;
    }
    return true;
}

function infomation_setting(web_version, samsung_version) {
    var infoheader = document.getElementById('infoheader');
    var infobody1 = document.getElementById('infobody1');
    var infobody2 = document.getElementById('infobody2');
    var infobody3 = document.getElementById('infobody3');
    var infobottom = document.getElementById('infobottom');

    var version = web_version;

    if (INFO_VENDOR == 'SAMSUNG') {
        version = samsung_version;

        replaceHTML(infoheader, 'Samsung Web Viewer Information');
        //replaceHTML(infobody1, 'DVR Model : SME_2220');
        replaceHTML(infobody1, 'DVR Model : SDE_120');
        replaceHTML(infobody2, 'WEB Version : '+version);
        replaceHTML(infobody3, "Homepage : <a href='http://www.samsungsecurity.com/' target='_blank'>http://www.samsungsecurity.com/</a>");
        replaceHTML(infobottom, '�Copyright SAMSUNG TECHWIN Co.,Ltd.2010');
    } else if (INFO_VENDOR == 'MACE') {
        replaceHTML(infoheader, 'Web Viewer Information');
        var model ='';
        if (INFO_MODEL == '_ATM_0412' || INFO_MODEL == '_ATM_0424') {
            model = 'DVR-4250';
        } else if (INFO_MODEL == '_ATM_0824') {
            model = 'DVR-8500';
        } else if (INFO_MODEL == '_ATM_1624' || INFO_MODEL == '_ATM_1648') {
            model = 'DVR-161000';
        } else if (INFO_MODEL == '_ANF_0824') {
            model = 'DVR-8R500';
        } else if (INFO_MODEL == '_ANF_1624' || INFO_MODEL == '_ANF_1648') {
            model = 'DVR-16R1000';
        }

        replaceHTML(infoheader, 'Mace Web Viewer Information');
        replaceHTML(infobody1, 'DVR Model : '+model);
        replaceHTML(infobody2, 'WEB Version : '+version);
        replaceHTML(infobody3, "Homepage : <a href='http://www.mace.com/' target='_blank'>http://www.mace.com/</a>");
        replaceHTML(infobottom, '010 Mace Security International');
    } else if ( INFO_VENDOR == 'DIGIMERGE') {
        if (INFO_MODEL == '_ATM_0424' || INFO_MODEL == '_ATM_0412') {
            model = 'DHU604';
        } else if (INFO_MODEL == '_ATM_0824') {
            model = 'DHU608';
        } else if (INFO_MODEL == '_ATM_1624') {
            model = 'DHU616';
        }

        replaceHTML(infoheader, 'Digimerge Web Viewer Information');
        replaceHTML(infobody1, 'DVR Model : '+model);
        replaceHTML(infobody2, 'WEB Version : '+version);
        replaceHTML(infobody3, "Homepage : <a href='http://www.digimerge.com/' target='_blank'>http://www.digimerge.com/</a>");
        replaceHTML(infobottom, 'Copyright 010 Digimerge Technologies Inc.');
    } else if ( INFO_VENDOR == 'ABUS') {
        if (INFO_MODEL == '_ATM_0424' || INFO_MODEL == '_ATM_0412') {
            model = 'TVVR25000';
        } else if (INFO_MODEL == '_ATM_0824'|| INFO_MODEL == '_ANF_0824CL' || INFO_MODEL == '_ANF_0824') {
            model = 'TVVR25010';
        }

        replaceHTML(infoheader, 'ABUS Web Viewer Information');
        replaceHTML(infobody1, 'DVR Model : '+model);
        replaceHTML(infobody2, 'WEB Version : '+version);
        replaceHTML(infobody3, "Homepage : <a href='http://www.abus.com/' target='_blank'>http://www.abus.com/</a>");
        replaceHTML(infobottom, 'Copyright 010 Abus Technologies Inc.');
    } else if ( INFO_VENDOR == 'CBC') {
        if (INFO_MODEL == '_ATM_0424' || INFO_MODEL == '_ATM_0412' || INFO_MODEL == '_ANF_0424' || INFO_MODEL == '_ANF_0412') {
            model = 'DR4H';
        } else if (INFO_MODEL == '_ATM_0824'|| INFO_MODEL == '_ANF_0824') {
            model = 'DR8H';
        } else if (INFO_MODEL == '_ATM_1624'|| INFO_MODEL == '_ANF_1624' || INFO_MODEL == '_ATM_1648'|| INFO_MODEL == '_ANF_1648') {
            model = 'DR16H';
        }

        replaceHTML(infoheader, 'CBC Web Viewer Information');
        replaceHTML(infobody1, 'DVR Model : '+model);
        replaceHTML(infobody2, 'WEB Version : '+version);
        replaceHTML(infobottom, 'Copyright 010 CBC Technologies Inc.');
    } else {
        replaceHTML(infoheader, '&copy; Web Viewer Information');
        replaceHTML(infobody1, 'DVR Model : '+INFO_MODEL.substring(5, INFO_MODEL.length-2)+langArray['LTXT_CAMCH']+' / '+INFO_MODEL.substring(INFO_MODEL.length-2, INFO_MODEL.length)+'0'+langArray['LTXT_RECTITLE_FPS']);
        replaceHTML(infobody2, 'WEB Version : '+version);
    }
}

function AuthCh_CheckCovert(auth, ch)
{
    if( UCOVERT & ( 1<<ch) )
      return true;

    return false;
}

sprintfWrapper = {
  init : function () {

    if (typeof arguments == "undefined") { return null; }
    if (arguments.length < 1) { return null; }
    if (typeof arguments[0] != "string") { return null; }
    if (typeof RegExp == "undefined") { return null; }

    var string = arguments[0];
    var exp = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
    var matches = new Array();
    var strings = new Array();
    var convCount = 0;
    var stringPosStart = 0;
    var stringPosEnd = 0;
    var matchPosEnd = 0;
    var newString = '';
    var match = null;

    while (match = exp.exec(string)) {
      if (match[9]) { convCount += 1; }

      stringPosStart = matchPosEnd;
      stringPosEnd = exp.lastIndex - match[0].length;
      strings[strings.length] = string.substring(stringPosStart, stringPosEnd);

      matchPosEnd = exp.lastIndex;
      matches[matches.length] = {
        match: match[0],
        left: match[3] ? true : false,
        sign: match[4] || '',
        pad: match[5] || ' ',
        min: match[6] || 0,
        precision: match[8],
        code: match[9] || '%',
        negative: parseInt(arguments[convCount]) < 0 ? true : false,
        argument: String(arguments[convCount])
      };
    }
    strings[strings.length] = string.substring(matchPosEnd);

    if (matches.length == 0) { return string; }
    //if ((arguments.length - 1) < convCount) { return null; }
    if ((arguments.length - 1) < convCount) { matches.length = arguments.length - 1; }

    var code = null;
    var match = null;
    var i = null;

    for (i=0; i<matches.length; i++) {

      if (matches[i].code == '%') { substitution = '%' }
      else if (matches[i].code == 'b') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(2));
        substitution = sprintfWrapper.convert(matches[i], true);
      }
      else if (matches[i].code == 'c') {
        matches[i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(matches[i].argument)))));
        substitution = sprintfWrapper.convert(matches[i], true);
      }
      else if (matches[i].code == 'd') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)));
        substitution = sprintfWrapper.convert(matches[i]);
      }
      else if (matches[i].code == 'f') {
        matches[i].argument = String(Math.abs(parseFloat(matches[i].argument)).toFixed(matches[i].precision ? matches[i].precision : 6));
        substitution = sprintfWrapper.convert(matches[i]);
      }
      else if (matches[i].code == 'o') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(8));
        substitution = sprintfWrapper.convert(matches[i]);
      }
      else if (matches[i].code == 's') {
        matches[i].argument = matches[i].argument.substring(0, matches[i].precision ? matches[i].precision : matches[i].argument.length)
        substitution = sprintfWrapper.convert(matches[i], true);
      }
      else if (matches[i].code == 'x') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
        substitution = sprintfWrapper.convert(matches[i]);
      }
      else if (matches[i].code == 'X') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
        substitution = sprintfWrapper.convert(matches[i]).toUpperCase();
      }
      else {
        substitution = matches[i].match;
      }

      newString += strings[i];
      newString += substitution;

    }
    newString += strings[i];

    return newString;

  },

  convert : function(match, nosign){
    if (nosign) {
      match.sign = '';
    } else {
      match.sign = match.negative ? '-' : match.sign;
    }
    var l = match.min - match.argument.length + 1 - match.sign.length;
    var pad = new Array(l < 0 ? 0 : l).join(match.pad);
    if (!match.left) {
      if (match.pad == "0" || nosign) {
        return match.sign + pad + match.argument;
      } else {
        return pad + match.sign + match.argument;
      }
    } else {
      if (match.pad == "0" || nosign) {
        return match.sign + match.argument + pad.replace(/0/g, ' ');
      } else {
        return match.sign + match.argument + pad;
      }
    }
  }
}

sprintf = sprintfWrapper.init;

function uintToIp(num) {
  var array = {};

  array[0] = (num & 0xff000000) >> 24;
  array[1] = (num & 0x00ff0000) >> 16;
  array[2] = (num & 0x0000ff00) >> 8;
  array[3] = (num & 0x000000ff) >> 0;

  return array[0] + '.' + array[1] + '.' + array[2] + '.' + array[3];
}

function ipToUint(ip) {
  var ret = 0;

  if (typeof ip != 'string')
    return false;

  var array = ip.split('.');

  if (array.length != 4)
    return false;

  for(a in array) {
    array[a] = parseInt(array[a]);
    if (isNaN(array[a]))
        return false;
    if (array[a] > 0xff)
      return false;
  }

  ret += (array[0] << 24)>>>0 + (array[1] << 16) + (array[2] << 8) + (array[3] << 0);

  return ret;
}


function setCookie(c_name,value,exdays)
{
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : ";path=/; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
  var i,x,y,ARRcookies=document.cookie.split(";");
  for (i=0;i<ARRcookies.length;i++)
  {
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");
    if (x==c_name)
    {
      return unescape(y);
    }
  }
  return null;
}


function setTitle(title_name, oldtitle) {
  if(oldtitle == null) {
    document.title = "";
    document.title = title_name + " - " + document.title;
  }
  else {
    document.title = document.title.replace(oldtitle, title_name);
  }
}


//�국처리 (activex �달- dmva)

// var languageArray;
// function define(str) {
//     languageArray = str;
//     sendMultiLanguageString();
// }

// function sendMultiLanguageString(){
//     console.log(languageArray);
// }

//check the status of bit 128M Nand firmware update and clear bit by condition of status.
function checkFwUpdateStatus() {
  if(INFO_MODEL.indexOf("UTM5G") < 0 || INFO_MODEL.indexOf("UTM5X") < 0) {
    return false;
  }

  var action = 'action=get_setup&menu=system.nand_fw_result&urlName=http://';
// console.log("niconiconi");
  $.ajax({
    url: "/cgi-bin/webra_fcgi.fcgi",
    type: 'POST',
    data: action,
    success: function(response) {
      var array = encode_to_array(response);

      switch ( array['result'] ) {
        case '64':
          alert(langArray["LTXT_SYSSET_NAND_FWUP_SUCCESS"]);
          clearFwUpdateStatus();
          break;
        case '65':
          alert(langArray["LTXT_SYSSET_NAND_FWUP_FAIL"]);
          clearFwUpdateStatus();
          break;
        case '66':
          alert(langArray["LTXT_SYSSET_NAND_FWUP_FAIL"]);
          clearFwUpdateStatus();
          break;
      }
    },
    error: function(response) {

    }
  });
}

function clearFwUpdateStatus() {
  if(INFO_MODEL.indexOf("UTM5G") < 0 || INFO_MODEL.indexOf("UTM5X") < 0) {
    return false;
  }

  var action = 'action=set_setup&menu=system.nand_fw_status_clear&urlName=http://';
  $.ajax({
    url: "/cgi-bin/webra_fcgi.fcgi",
    type: 'POST',
    data: action,
    success: function(response) {
    },
    fail: function(response) {
    },
    error: function(response) {
    }
  });
}
