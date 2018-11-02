var jpeglive1 = null;
var jpeglive2 = null;
var jpegliveelem = null;
var mlivetimer = null;

var livehidden = false; // livehidden : false -> jpeglive1 : visibility
var jpegfailname = "../images/imgfail.jpg";

function Mlive_browser()
{
    var ua=navigator.userAgent;

	if (ua == null)
	{
		return true;
	}

	if (ua.indexOf('BlackBerry')>=0)
	{
		return true;
	}

	return false;
}

function Mlive_Jpeg_func(jpegpath)
{
    var blackberry = Mlive_browser();
 /*
    if (blackberry == true)
    {
        if (jpeglive1 == null)
    	{
    		jpeglive1 = document.getElementById("livejpeg1");
    	}
    	if (jpeglive2 == null)
    	{
    		jpeglive2 = document.getElementById("livejpeg2");
    	}

        var livediv = document.getElementById("c_m_div_live");

        var interval = document.getElementById("interval");

        if ( !(parseInt(interval.value)) )
    	{
    		//jpeglive1.style.cssText = "visibility:visible; z-index:1000;";

    		//jpeglive2.style.cssText = "visibility:hidden; z-index:2000;";

            jpegliveelem = jpeglive1;
            livehidden = false;
    	}
    	else
    	{
            if ( livehidden )
            {
                //jpeglive1.style.cssText = "visibility:hidden; z-index:2000;";
                //jpeglive2.style.cssText = "visibility:visible; z-index:1000;";

                jpegliveelem = jpeglive1;
                livehidden = false;
            }
            else
            {
                //jpeglive2.style.cssText = "visibility:hidden; z-index:2000;";
                //jpeglive1.style.cssText = "visibility:visible; z-index:1000;";

                jpegliveelem = jpeglive2;
                livehidden = true;
            }
        }
    }
    else
    {
        if (jpegliveelem == null)
    	{
    		jpegliveelem = document.getElementById("livejpeg1");
    	}
    }
*/
    if (jpegliveelem == null)
	{
		jpegliveelem = document.getElementById("livejpeg1");
	}

	if ( jpegpath != jpegfailname )
	{
	    jpegliveelem.setAttribute("src", jpegpath);
	}

	var interval = document.getElementById("interval");

	if ( parseInt(interval.value) )
	{
	    Mlive_jpeg_live_stop();
		mlivetimer = setTimeout(onClickLiveStart, interval.value);
		//onClickLiveStart();
	}
}

function Mlive_jpeg_live_stop()
{
	if (mlivetimer != null)
	{
		clearTimeout(mlivetimer);
		mlivetimer = null;
	}
}

function live_jpeg_start(jpegpath)
{
	//mlive_loading_stop();

	Mlive_Jpeg_func(jpegpath);
}

var mloadtimer = null;
var imgloadpath = "../images/images/jpegloading";
var jpegloadval = 1;
var jpegloadelem = null;

function mlive_loading_func()
{
	if (jpegloadelem == null)
	{
		jpegloadelem = document.getElementById("livejpeg");
	}

	jpegloadelem.setAttribute("src", imgloadpath+jpegloadval+".JPG");

	if (parseInt(jpegloadval) == 5 )
	{
		jpegloadval = 1;
	}
	else
	{
		jpegloadval++;
	}

	mloadtimer = setTimeout(mlive_loading_func, 1000);
}

function mlive_loading_start()
{
	jpegloadval = 1;
	mlive_loading_func();
}

function mlive_loading_stop()
{
	if (mloadtimer != null)
	{
		clearTimeout(mloadtimer);
		mloadtimer = null;
	}
}

function SetDisplayMode1()
{

}

function Mlive_jpeg_init()
{
    var blackberry = Mlive_browser();

    if (blackberry == false)
    {
        var jpegliveddiv = document.getElementById("c_m_div_live");
        var livejpeg2 = document.getElementById("livejpeg2");

	    jpegliveddiv.removeChild(livejpeg2);
    }
    else
    {
        livejpeg1 = document.getElementById("livejpeg1");
        //livejpeg2 = document.getElementById("livejpeg2");

        //jpeglive1.style.cssText = "visibility:visible;";
        //jpeglive2.style.cssText = "visibility:hidden;";

        livehidden = true;
    }
}

function onChangeCh(tdid)
{
	var elem = tdid;

	var interval = document.getElementById("interval");

	mlivetimer = setTimeout(onClickLiveStart, interval.value);
}

function onChangeInterval(tdid)
{
	var elem = tdid;

	if (parseInt(elem.value))
	{
	    mlivetimer = setTimeout(onClickLiveStart, elem.value);
	}
}
/**********************************************************/

function OnLiveMouseOver()
{
	var imgelem = this;

	if ( imgelem.id == "livestart")
	{
		imgelem.style.backgroundImage = "url(../images/images/bt_bg_o.gif)";
	}
	else if ( imgelem.id == "sysinfo")
	{
		imgelem.style.backgroundImage = "url(../images/images/bt_bg_o.gif)";
	}
}

function OnLiveMouseOut()
{
	var imgelem = this;

	if ( imgelem.id == "livestart")
	{
		imgelem.style.backgroundImage = "url(../images/images/bt_bg_n.gif)";
	}
	else if ( imgelem.id == "sysinfo")
	{
		imgelem.style.backgroundImage = "url(../images/images/bt_bg_n.gif)";
	}
}

function OnLiveMouseDown()
{
	var imgelem = this;

	if ( imgelem.id == "livestart")
	{
		imgelem.style.backgroundImage = "url(../images/images/bt_bg_r.gif)";
	}
	else if ( imgelem.id == "sysinfo")
	{
		imgelem.style.backgroundImage = "url(../images/images/bt_bg_r.gif)";
	}
}

function Mlive_btn_init()
{
	var livestart = document.getElementById("livestart");
	var sysinfo = document.getElementById("sysinfo");

	livestart.onmouseover = OnLiveMouseOver;
	sysinfo.onmouseover = OnLiveMouseOver;

	livestart.onmousedown = OnLiveMouseDown;
	sysinfo.onmousedown = OnLiveMouseDown;

	livestart.onmouseout = OnLiveMouseOut;
	sysinfo.onmouseout = OnLiveMouseOut;

	livestart.onmouseup = OnLiveMouseOver;
	sysinfo.onmouseup = OnLiveMouseOver;

	var livech = document.getElementById("liveCh");

	createElemSelOption3(livech, 1, INFO_DVRCHANNEL);

	var interval = document.getElementById("interval");

	var urlhref = location.href;
	var recvurldata = recv_encode(urlhref);

	if ( recvurldata != null )
	{
    	if (recvurldata['interval'])
    	{
    	    var intervaloptval = interval.getElementsByTagName("option");

    	    for (var i = 0; i < intervaloptval.length; i++)
	        {
	            if (parseInt(intervaloptval[i].value) == parseInt(recvurldata['interval']) )
	            {
	                interval.value = recvurldata['interval'];
	                break;
	            }
	        }
    	}

    	if (recvurldata['livech'])
    	{
    	    var livechoptval = livech.getElementsByTagName("option");

    	    for (var i = 0; i < livechoptval.length; i++)
	        {
	            if (parseInt(livechoptval[i].value) == parseInt(recvurldata['livech']) )
	            {
	                livech.value = recvurldata['livech'];
	                break;
	            }
	        }
    	}
    }
    else
    {
        livech.value = 0;
        interval.value = 300;
    }

    var blackberry = Mlive_browser();

    if (blackberry == false)
    {
        onChangeInterval(interval);
    }
    else
    {
        if ( recvurldata == null )
        {
            interval.value = 0;
        }
    }
}

function OnsystemMouseOver()
{
	var imgelem = this;

	if ( imgelem.id == "livepage")
	{
		imgelem.style.backgroundImage = "url(../images/images/bt_bg_o.gif)";
	}
}

function OnsystemMouseDown()
{
	var imgelem = this;

	if ( imgelem.id == "livepage")
	{
		imgelem.style.backgroundImage = "url(../images/images/bt_bg_r.gif)";
	}
}

function OnsystemMouseOut()
{
	var imgelem = this;

	if ( imgelem.id == "livepage")
	{
		imgelem.style.backgroundImage = "url(../images/images/bt_bg_n.gif)";
	}
}

function system_btn_init()
{
	var livepage = document.getElementById("livepage");

	livepage.onmouseover = OnsystemMouseOver;
	livepage.onmousedown = OnsystemMouseDown;
	livepage.onmouseout = OnsystemMouseOut;
	livepage.onmouseup = OnsystemMouseOver;
}

function onClickLiveStart()
{
	Mlive_postSetup(null, "action=get_mblie&menu=mlive.live");
}

function mlive_update_live(recvText)
{
	var recvdata = recv_encode(recvText);

	live_jpeg_start(recvdata["filepath"]);

}

function system_update_manage(recvText)
{
	var recvdata = recv_encode(recvText);

	var swver = document.getElementById("swver");
	replaceHTML(swver, recvdata["swver"]);

	var hwver = document.getElementById("hwver");
	replaceHTML(hwver, recvdata["hwver"]);

	var vstype = document.getElementById("vstype");
	replaceHTML(vstype, recvdata["vstype"]);

	var diskcap = document.getElementById("diskcap");
	replaceHTML(diskcap, recvdata["diskcap"]);

	var ipaddr = document.getElementById("ipaddr");
	replaceHTML(ipaddr, recvdata["ipaddr"]);

	var macaddr = document.getElementById("macaddr");
	replaceHTML(macaddr, recvdata["macaddr"]);

	var ddnsdomain = document.getElementById("ddnsdomain");
	replaceHTML(ddnsdomain, recvdata["ddnsdomain"]);

	var netclntport = document.getElementById("netclntport");
	replaceHTML(netclntport, recvdata["netclntport"]);

	var webservport = document.getElementById("webservport");
	replaceHTML(webservport, recvdata["webservport"]);
}


/*********************************************************
 function : act_updateData ()
 description : ?낅뜲?댄듃 蹂?遺꾪븷 ?⑥닔
 parameter1 : (recvText : receive ?곗씠??
***********************************************************/
function Mlive_updateData(recvText)
{
	if (cmdselect == 1)
	{
		mlive_update_live(recvText);
	}
	else if (cmdselect == 2)
	{
		system_update_manage(recvText);
	}
}

/*********************************************************
 function : act_updatePage ()
 description : ?낅뜲?댄듃 ?⑥닔
 requestflag : ?붿껌 以묒씤吏 ?꾨땶吏 ?뺤씤 ?뚮젅洹?
***********************************************************/
function Mlive_updatePage()
{
	if (request.readyState == 4)
	{
		if (request.status == 200)
		{
			var recvText = request.responseText;

			if (recvText != null)
			{
				Mlive_updateData(recvText);
				if (sendcompleteflag == true)
				{
					//alert(errComplete);
					sendcompleteflag = false;
				}
			}
			else
			{
				//alert("recvText is NULL!");
			}
		}
		else if(request.status == 404)
		{
			self.location='../error/e404.htm';
		}


		sendcompleteflag = false;

	}
}

function mlive_get_live(request, thisform, sendbuf)
{
	var channel = document.getElementById("liveCh");

	sendbuf += "&" + "chno" + "=" + escape(channel.value);

	//mlive_loading_start();

	return sendbuf;
}

function system_get_setup_manager(request, thisform, sendbuf)
{
	return sendbuf;
}

/*********************************************************
 function : act_send ()
 description : ?붿껌蹂?遺꾪븷 ?⑥닔
 parameter1 : (request : ?붿껌媛앹껜)
 parameter2 : (thisform : ?붿껌?????대쫫)
 parameter3 : (cmd : ?붿껌 而ㅻ㎤??
 requestflag : ?붿껌 以묒씤吏 ?꾨땶吏 ?뺤씤 ?뚮젅洹?
***********************************************************/
function Mlive_send(request, thisform, cmd)
{
	var sendbuf = cmd;

	if (cmd == "action=get_mblie&menu=mlive.live")
	{
		sendbuf = mlive_get_live(request, thisform, sendbuf);
		cmdselect = 1;
	}
	else if (cmd == "action=get_setup&menu=system.manage")
	{
		sendbuf = system_get_setup_manager(request, thisform, sendbuf);
		cmdselect = 2;
	}

        var unix = +new Date();
        var sep = "&";

        if( sendbuf.indexOf("&") < 0 ) {
          sep = "?";
        }

        sendbuf += ( sep + "timestamp=" + unix );

	request.send(sendbuf);
}
/*********************************************************
 function : act_postSetup ()
 description : ?붿껌 ?⑥닔
 parameter1 : (thisform : ?붿껌?????대쫫)
 parameter2 : (cmd : ?붿껌 而ㅻ㎤??
 requestflag : ?붿껌 以묒씤吏 ?꾨땶吏 ?뺤씤 ?뚮젅洹?
***********************************************************/
function Mlive_postSetup(thisform, cmd)
{
	request = createRequest();

	if (request == null)
	{
		alert("Your Browser does not support Ajax!");
		return;
	}

	request.onreadystatechange = Mlive_updatePage;
	request.open("POST", "/cgi-bin/webra_fcgi.fcgi", true);
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	request.setRequestHeader("cache-control","no-cache");
	Mlive_send(request, thisform, cmd);
}
