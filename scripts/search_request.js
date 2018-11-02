var cmdselect = null;
var timelname = "search";

var barcolor = Array('#00dfff', '#00dfff');

//export global value
var query_info = null;
var is_burning = false;

var ttablecolor;
// Color Array : None, Timer, Alarm, Motion, Usr, Manual, Pre
if (INFO_VENDOR == 'SAMSUNG')
{
    ttablecolor = Array('#ffffff', 'RGB(108,176,1)', 'RGB(224,136,1)', 'RGB(51,132,236)', '#ffffff','RGB(255,198,0)','#ffffff');
}
else
{
    ttablecolor = Array('#3c3b39', '#CA3795', '#f00', '#0875B5', '#f8f8f8','#0875B5','#00ff00');
}

var fail_check = 0;

var tl_data = Array();
var bpos = 0;
var bposelem = null;
var mouseflag = false;
var authCheck = false;
var calClicked = false;
var activexPause = false;
var isTextInSearch = false;

var btime = Array(6);
btime['y'] = null;
btime['m'] = null;
btime['d'] = null;
btime['h'] = null;
btime['mn'] = null;
btime['s'] = null;

var udate_time = Array(6);
udate_time['y'] = null;
udate_time['m'] = null;
udate_time['d'] = null;
udate_time['h'] = null;
udate_time['mn'] = null;
udate_time['s'] = null;

var log_result_count = 0;
var log_year = new Array();
var log_mon = new Array();
var log_day = new Array();
var log_hour = new Array();
var log_min = new Array();
var log_second = new Array();
var log_dst = new Array();
var log_text = new Array();
var log_ch = new Array();
var log_curr_pos = Array(2);
log_curr_pos[0] = 0;
log_curr_pos[1] = 0;

var log_btn_flag = 'search';
var log_count = 0;
var btnsearch = Array(6);

var posdisp_elem = null;
var DST_STATUS = 0;
var PRV_DST_STAUTS = -1;
var DST_TIME_POS = 0;
var DST_TIME_MIN = 0;
var DST_ON_TIME = false;
var DST_SAME_TIME = false;

var	DST_NORMAL_DAY	= 0;
var	DST_DST_DAY		= 1;
var	DST_START_DAY	= 2;
var	DST_END_DAY		= 3;

var day_length = 24;
var day_cnt = 144;

var endtimepos = Array(2);
endtimepos[0] = 143; // ??泥��먽� timeline??媛???�뿉 ?꾩튂
endtimepos[1] = 0;   // ??泥��먽� timeline??媛??留덉?�?꾩튂

var year_elem = null;
var mon_elem = null;
var day_elem = null;
var hour_elem = null;
var min_elem = null;
var sec_elem = null;
var display_elem = null;

var log_id = 0;
var log_id_overflow = 0;

var myTimeZone = null;
/*
var tzarray = Array(+720 ,+660 ,+600 ,+540 ,+480
		    ,+420 ,+360 ,+300 ,+240 ,+180
		    ,+120 ,+60  ,   -0, -60 ,-120
		    ,-120 ,-180 ,-210 ,-240 ,-270
		    ,-300 ,-330 ,-345 ,-360 ,-390
		    ,-420 ,-480 ,-540 ,-540 ,-570
		    ,-570 ,-600 ,-660 ,-720 ,-480
		    ,-120 ,-120, -120, -180 ,-180
		    ,-210 ,-240 ,-600, +420
);
*/
/* for IPX re-define */
var tzarray = [
  +720, +660, +600, +540, +480,
  +420, +360, +300, +240, +210,
  +180, +120, +60,  0,    -60,
  -120, -120, -180, -210, -240,
  -270, -300, -330, -345, -360,
  -390, -420, -480, -540, -540,
  -570, -570, -600, -660, -720,
  -480, -120, -120, -120, -180,
  -180, -210, -240, -600, +420
];

var tzidx = 29;

var search_timer = null;

var LOGTABLE = 8;
var repeat = 1;

var complete_no_massge = false;

var search_by_event_dston = -1;
var search_by_event_time = -1;

var _searchbytime_flag = true;

var get_passwd_flag = false;
var get_passwd_name = null;
var get_mac_address = null;
var get_id_name = null;
var searchPasswdTimer = null;
var passwdAuthenticated = false;
var posdata_to_activex = null;
var posBeforeTime = null;
function onSearchPasswdTimerStop()
{
	if ( searchPasswdTimer != null)
	{
		clearTimeout(searchPasswdTimer);
		searchPasswdTimer = null;
	}
}

function search_time_display_load()
{
	var i, k;

    if((INFO_VENDOR == 'TAKENAKA')
      || INFO_VENDOR == 'VIDECON'
      || INFO_VENDOR == 'KB_DEVICE') {
        $("#searchbytextdevli").hide();
    }
    else {
        $("#searchbytextdevli").show();
    }


	var tElem = document.getElementById("search_time_table");
	// tbody

	if ( document.getElementById("search_rec_top0"))
	{
	    if ( parseInt(PRV_DST_STAUTS) != parseInt(DST_STATUS) )
	    {
    		for (var i = tElem.childNodes.length; i > 0; i--)
        	{
        		tElem.removeChild(tElem.childNodes[i-1]);
        	}
        	PRV_DST_STAUTS = DST_STATUS;
        }
        else
        {
            return;
        }
	}

	if (parseInt(INFO_DST))
	{
    	if (parseInt(DST_STATUS) == parseInt(DST_END_DAY))
        {
            day_length = 25;
            day_cnt = 150;
            var tcElem = document.getElementById("c_sh_div_time_contents");
    	    tcElem.style.width = "776px";
    	    tElem.style.width = "774px";
        }
        else
        {
            day_length = 24;
            day_cnt = 144;
            var tcElem = document.getElementById("c_sh_div_time_contents");
    	    tcElem.style.width = "760px";
    	    tElem.style.width = "744px";
        }
	}
	else
	{
	    day_length = 24;
        day_cnt = 144;
        var tcElem = document.getElementById("c_sh_div_time_contents");
	    tcElem.style.width = "760px";
	    tElem.style.width = "744px";
	}

	var tbody = document.createElement("tbody");
	tElem.appendChild(tbody);

	// tr top create
	var trTNode = document.createElement("tr");
	trTNode.setAttribute("class", "trtop");
	trTNode.style.height = "12px";
	//trTNode.style.backgroundColor = "#888888";
	tbody.appendChild(trTNode);

	// td top create
	var tdTNode = document.createElement("td");
	tdTNode.setAttribute("class", "tdleft");
	tdTNode.style.width = "20px";
	tdTNode.style.height = "10px";
	trTNode.appendChild(tdTNode);

	var txtNode;
	var timecnt = -1;

	for (i = 0; i < day_length; i++)
	{
		tdTNode = document.createElement("td");
		tdTNode.setAttribute("id", "search_rec_top0");
		tdTNode.setAttribute("colSpan", "6");
		tdTNode.width = "18px";

        if (parseInt(DST_STATUS) == parseInt(DST_START_DAY))
	    {
	        if ( parseInt(timecnt) == 30)
	        {
	            timecnt = -1;
	        }

	        if ( !parseInt(i) )
	        {
	            timecnt = 30;
	        }
		    else if ( (parseInt(DST_TIME_POS)+1) == parseInt(i) )
		    {
		         timecnt += 2;
		    }
		    else
		    {
		        timecnt++;
		    }
		}
		else if (parseInt(DST_STATUS) == parseInt(DST_END_DAY))
        {
             if ( (parseInt(DST_TIME_POS)+1) != parseInt(i) )
		    {
		         ++timecnt;
		    }
        }
        else
        {
            ++timecnt;
        }

        if (parseInt(timecnt) < 10)
		{
			txtNode = document.createTextNode('0'+timecnt);
		}
		else
		{
		    if (parseInt(timecnt) == 30)
		    {
		        txtNode = document.createTextNode('23');
		    }
		    else
		    {
		        txtNode = document.createTextNode(timecnt);
		    }
		}

		tdTNode.appendChild(txtNode);
		trTNode.appendChild(tdTNode);
	}

	for (var k = 0; k < INFO_DVRCHANNEL; k++)
	{
		// tr create
		var trNode = document.createElement("tr");
		trNode.setAttribute("class", "trline");
		trNode.style.height = "12px";
		tbody.appendChild(trNode);

		// td create
		var tdNode = document.createElement("td");
		tdNode.setAttribute("class", "tdleft");
		tdNode.style.width = "20px";
		tdNode.style.height = "10px";
		var txt = parseInt(k) + 1;
		var txtNode = document.createTextNode(txt);
		tdNode.appendChild(txtNode);
		trNode.appendChild(tdNode);

		for (var i = 0; i < day_cnt; i++)
		{
			tdNode = document.createElement("td");
			tdNode.setAttribute("class", "tdcel");
			tdNode.style.width = "3px";
			var idname = "search"+k+"_"+i;
			tdNode.setAttribute("id", idname);
			trNode.appendChild(tdNode);
		}
	}

	var IE = document.all ? true: false;

	if (!IE)
	{
		document.captureEvents(Event.MOUSEOVER);
		document.captureEvents(Event.MOUSEDOWN);
		document.captureEvents(Event.MOUSEUP);
	}

	var table = document.getElementById("search_time_table");
	table.onmousedown = search_onmousedown;
	table.onmouseover = search_onmouseover;
	table.onmouseup = search_onmouseup;
}

function onSearchByEventAll(elem)
{
	var elemtag = elem;
	var idname = elemtag.id;

	if (idname == "allevent")
	{
		var eventdiv = document.getElementById("eventdiv");
		var eventlist = eventdiv.getElementsByTagName("input");

		if (elemtag.checked == true)
		{
			for (var i = 0; i < eventlist.length; i++)
			{
				if (eventlist[i].id != "allevent")
				{
					eventlist[i].checked = true;
				}
			}
		}
		else
		{
			for (var i = 0; i < eventlist.length; i++)
			{
				if (eventlist[i].id != "allevent")
				{
					eventlist[i].checked = false;
				}
			}
		}
	}
	if (idname == "allcam")
	{
		var eventdiv = document.getElementById("event-check");
		var eventlist = eventdiv.getElementsByTagName("input");

		if (elemtag.checked == true)
		{
			for (var i = 0; (i-1) < INFO_DVRCHANNEL; i++)
			{
				if (eventlist[i].id != "allcam")
				{
					eventlist[i].checked = true;
				}
			}
		}
		else
		{
			for (var i = 0; (i-1) < INFO_DVRCHANNEL; i++)
			{
				if (eventlist[i].id != "allcam")
				{
					eventlist[i].checked = false;
				}
			}
		}
	}


}

function onSearchByTextsearchCheck() {
    var eventflag = 0; //1. ��check 0. none check


        var eventdiv = document.getElementById("event-check");
	var eventlist = eventdiv.getElementsByTagName("input");

	for (var i = 0; i < INFO_DVRCHANNEL; i++)
	{
                        if( $("#search_ch"+i).is(":checked") == false)
			{
			    eventflag = true;

			}
	}

	var allevent = document.getElementById("allcam");

    if ( eventflag == false )
    {
        allevent.checked = true;
    }
    else
    {
        allevent.checked = false;
    }
}

function onSearchByEventCheck()
{
    var eventflag = 0; //1. ��check 0. none check


    var eventdiv = document.getElementById("eventdiv");
	var eventlist = eventdiv.getElementsByTagName("input");

	for (var i = 0; i < eventlist.length; i++)
	{
		if (eventlist[i].id != "allevent")
		{
			if ( eventlist[i].checked == false )
			{
			    eventflag = true;
			    break;
			}
		}
	}

	var allevent = document.getElementById("allevent");

    if ( eventflag == false )
    {
        allevent.checked = true;
    }
    else
    {
        allevent.checked = false;
    }
}

function search_ondraw(elem, color)
{
	var elemname = elem.id;
	var lineElem;

	var tmp1 = elemname.substr(timelname.length, elemname.length);
	var tmp2 = tmp1.split('_');

	var subname = tmp2[1];

	var tableid = document.getElementById("search_time_table");
	var tdlist = tableid.getElementsByTagName("td");
	var j = 0;

	if ( color != null )
	{
		for ( var i = 0; i < INFO_DVRCHANNEL; i++)
		{
			j++;

			lineElem = tdlist[parseInt(i) * parseInt(day_cnt) + parseInt(subname) + parseInt(day_length)+1 + parseInt(j)];
			lineElem.style.backgroundColor = color;
		}
		bpos = subname;
	}
	else
	{
		for ( var i = 0; i < INFO_DVRCHANNEL; i++)
		{
			j++;

			lineElem = tdlist[parseInt(i) * parseInt(day_cnt) + parseInt(bpos) + parseInt(day_length)+1 + parseInt(j)];

			var colorpos = parseInt(i) * parseInt(day_cnt) + parseInt(bpos);
 			var posdata = tl_data[parseInt(colorpos)];

			lineElem.style.backgroundColor = ttablecolor[parseInt(posdata)];
		}
	}
}

function search_onmousedown(e)
{
//if (browerIE == true)
//{
//var activex = document.getElementById("itxview");
//
//if (ActiveX_IsConnection() == true)
//{
//GetSearchPlaytimeStop();
//activex.SessionClose();
//}
//}

  mouseflag = true;

  var position = Array(2);

  var telem = document.getElementById("search_time_table");

  var maxlen = 719;
  if (parseInt(DST_STATUS) == parseInt(DST_END_DAY))
  {
    maxlen = 749;
  }

  position = getMouseXY(e, telem, maxlen);

  //position[0] = parseInt(position[0]) - 271;
  //alert("positionX["+position[0]+"]");

  var stickpos = position[0] / 5;

  var elem = document.getElementById(timelname + "0_" + parseInt(stickpos));

  search_ondraw(elem, null);
  search_ondraw(elem, barcolor[1]);

  var changeT = Array(2);

  changeT = search_time_cal();

  if (changeT == null)
  {
    return;
  }

  search_time_display(parseInt(btime['y']), parseInt(btime['m']), parseInt(btime['d']), parseInt(changeT['h']), parseInt(changeT['m']), 0);

  var actChdiv = document.getElementById("channel");
  actChdiv.value = 0;

  if (browerIE == true)
  {
    var activex = document.getElementById("itxview");

    if (ActiveX_IsConnection() == true)
    {
      GetSearchPlaytimeStop();
      activex.SessionClose();
      lSEtime = SearchPlay('back');
      if ( onSearchStart(1, 1, lSEtime['lStartTime'], 0) )
      {
        GetSearchPlaytime();
      }
    }
  }
}

function search_onmouseup(e)
{
	if (mouseflag == false)
	{
		return;
	}

	mouseflag = false;
}

function search_onmouseover(e)
{
	if (mouseflag == false)
	{
		return;
	}

	var position = Array(2);

	var telem = document.getElementById("search_time_table");

	var maxlen = 719;
	if (parseInt(DST_STATUS) == parseInt(DST_END_DAY))
    {
        maxlen = 749;
    }

	position = getMouseXY(e, telem, maxlen);

	var stickpos = position[0] / 5;

	if ( parseInt(bpos) == parseInt(stickpos) )
	{
		return;
	}

	var elem = document.getElementById(timelname + "0_" + parseInt(stickpos));

	search_ondraw(elem, null);
	search_ondraw(elem, barcolor[1]);

	bposelem = elem;

	var changeT = Array(2);

	changeT = search_time_cal();

	if (changeT == null)
	{
		return;
	}

	search_time_display(parseInt(btime['y']), parseInt(btime['m']), parseInt(btime['d']), parseInt(changeT['h']), parseInt(changeT['m']), 0);
}

function gonmouseup()
{
	if (mouseflag == false)
	{
		return;
	}

	mouseflag = false;

	if (bposelem == null)
	{
		return;
	}
}

function onymdChange()
{

	var year = document.getElementById("year");
	var month = document.getElementById("month");
	var day = document.getElementById("day");
	var hour = document.getElementById("hour");
	var minute = document.getElementById("minute");
	var second = document.getElementById("second");

	btime['y'] = parseInt(year.value);
	btime['m'] = parseInt(month.value);
	btime['d'] = parseInt(day.value);
	btime['h'] = parseInt(hour.value);
	btime['mn'] = parseInt(minute.value);
	btime['s'] = parseInt(second.value);

	calClicked = false;
	search_postSetup(document.searchsetting_searchbytime, "action=set_search&menu=search.searchsetting_searchbytime");
}

function onhmsChange()
{
  var year, month, day, hour, minute, second;
  var hour_tmp;

  year = document.getElementById("year").value;
  month = document.getElementById("month").value;
  day = document.getElementById("day").value;
  hour = document.getElementById("hour").value;
  minute = document.getElementById("minute").value;
  second = document.getElementById("second").value;

  hour_tmp = hour;

  if ( parseInt(DST_STATUS) == parseInt(DST_START_DAY) )
  {
    if (parseInt(DST_TIME_MIN) > 0)
    {
      if (parseInt(hour) > parseInt(DST_TIME_POS)+1)
      {
        hour_tmp--;
      }
    }
  }
  else if ( parseInt(DST_STATUS) == parseInt(DST_END_DAY) )
  {
    if (parseInt(DST_TIME_MIN) > 0)
    {
      if (parseInt(hour) > parseInt(DST_TIME_POS)+1)
      {
        hour_tmp--;
      }
    }
  }

  //alert("year1["+btime['y']+"]year2["+year+"]mon1["+btime['m']+"]mon2["+month+"]day1["+btime['d']+"]day2["+day+"]");

  if ( parseInt(btime['y']) != parseInt(year)
      || parseInt(btime['m']) != parseInt(month)
      || parseInt(btime['d']) != parseInt(day)
      || calClicked)
  {
    btime['y'] = year;
    btime['m'] = month;
    btime['d'] = day;
    btime['h'] = hour_tmp;
    btime['mn'] = minute;
    btime['s'] = second;

    if (dst_start_prvday == false)
    {
      if ( (parseInt(DST_STATUS) == parseInt(DST_END_DAY)) && (parseInt(DST_TIME_MIN) > 0))
      {
        if ( (DST_ON_TIME == false) && (parseInt(day) > parseInt(udate_time['d'])) )
        {
          complete_no_massge = true;

          search_postSetup(document.searchsetting_searchbytime, "action=set_search&menu=search.searchsetting_searchbytime");
        }
      }
      else
      {
        complete_no_massge = true;

        search_postSetup(document.searchsetting_searchbytime, "action=set_search&menu=search.searchsetting_searchbytime");
      }
    }
  }
  else
  {
    btime['y'] = year;
    btime['m'] = month;
    btime['d'] = day;
    btime['h'] = hour_tmp;
    btime['mn'] = minute;
    btime['s'] = second;
  }

  var lineElem = null;
  var pos;
  var seltime;

  if ( parseInt(DST_STATUS) == parseInt(DST_DST_DAY) )
  {
    pos = parseInt(hour) * 60 + parseInt(btime['mn']);
    seltime = parseInt(pos) / 10;
  }
  else if ( parseInt(DST_STATUS) == parseInt(DST_START_DAY) )
  {
    if (parseInt(hour) > parseInt(DST_TIME_POS))
    {
      DST_ON_TIME = true;
    }
    else
    {
      DST_ON_TIME = false;
    }

    if (parseInt(DST_TIME_MIN) > 0)
    {
      if (parseInt(hour) > parseInt(DST_TIME_POS)+1)
      {
        pos = (parseInt(hour) - 1) * 60 + parseInt(btime['mn']);

      }
      else
      {
        pos = parseInt(hour) * 60 + parseInt(btime['mn']);
      }

      if ( (parseInt(hour) == (parseInt(DST_TIME_POS)+1)) || (parseInt(hour) == (parseInt(DST_TIME_POS)+2)))
      {
        if ( (parseInt(minute) * 60 + parseInt(second)) < (parseInt(DST_TIME_MIN) * 60) )
        {
          document.getElementById("hour").value = parseInt(DST_TIME_POS) + 1;
        }
        else
        {

          document.getElementById("hour").value = parseInt(DST_TIME_POS) + 2;
        }
      }

      seltime = parseInt(pos) / 10;
    }
    else
    {
      pos = parseInt(hour) * 60 + parseInt(btime['mn']);
      seltime = parseInt(pos) / 10;
    }
  }
  else
  {
    if (parseInt(hour) > parseInt(DST_TIME_POS))
    {
      DST_ON_TIME = false;
    }
    else
    {
      DST_ON_TIME = true;
    }

    if (parseInt(DST_TIME_MIN) > 0)
    {
      var dayelem = document.getElementById("day");
      var monelem = document.getElementById("month");
      var yearelem = document.getElementById("year");

      if (parseInt(hour) > parseInt(DST_TIME_POS)+1)
      {
        pos = (parseInt(hour) - 1) * 60 + parseInt(btime['mn']);
      }
      else
      {
        pos = parseInt(hour) * 60 + parseInt(btime['mn']);
      }

      if ( (parseInt(hour) == (parseInt(DST_TIME_POS)+1)) || (parseInt(hour) == (parseInt(DST_TIME_POS)+2)))
      {
        if ( (parseInt(minute) * 60 + parseInt(second)) < (parseInt(DST_TIME_MIN) * 60) )
        {
          document.getElementById("hour").value = parseInt(DST_TIME_POS) + 1;

          if ( parseInt(udate_time['d']) == parseInt(dayelem.value) )
          {
            var ch_day = one_day_day(day, month, year);
            dayelem.value  = ch_day[0];
            monelem.value  = ch_day[1];
            yearelem.value  = ch_day[2];
          }
        }
        else
        {
          document.getElementById("hour").value = parseInt(DST_TIME_POS) + 2;

          if ( parseInt(udate_time['d']) != parseInt(dayelem.value) )
          {
            var ch_day = one_day_minus(day, month, year);
            dayelem.value  = ch_day[0];
            monelem.value  = ch_day[1];
            yearelem.value  = ch_day[2];
          }
        }
      }
      else
      {
        if ( parseInt(udate_time['d']) != parseInt(dayelem.value) )
        {
          var ch_day = one_day_minus(day, month, year);
          dayelem.value  = ch_day[0];
          monelem.value  = ch_day[1];
          yearelem.value  = ch_day[2];
        }
      }



      seltime = parseInt(pos) / 10;
    }
    else
    {
      pos = parseInt(hour) * 60 + parseInt(btime['mn']);
      seltime = parseInt(pos) / 10;
    }
  }

  lineElem = document.getElementById(timelname+ 0 +'_'+ parseInt(seltime));
  if (!lineElem)
  {
    return;
  }

  if ( lineElem == null)
  {
    return;
  }
  search_ondraw(lineElem, null);
  search_ondraw(lineElem, barcolor[1]);
}

function onCalClick()
{
  calClicked = true;
  GetSearchPlaytimeStop();
}

function onSecondClick() {
  Playbackpause();
  activexPause = true;
}

function search_time_cal()
{
	if (bpos == null)
	{
		return null;
	}

	var seltime = parseInt(bpos) * 10;
	var changeT = Array(2);

	changeT['h'] = parseInt(seltime) / 60;
	changeT['m'] = parseInt(seltime) % 60;

	return changeT;
}

function search_time_selectbar_event()
{
	for (var pos = 0; pos < INFO_DVRCHANNEL*parseInt(day_cnt); pos++)
	{
		var posx = parseInt(pos)/parseInt(day_cnt);
		posx = parseInt(posx);
		var posy = parseInt(pos)%parseInt(day_cnt);
		posy = parseInt(posy);

		var lineElem = document.getElementById(timelname+posx+'_'+posy);

		lineElem.onmousedown = search_onmousedown;
		lineElem.onmouseover = search_onmouseover;
		lineElem.onmouseup = search_onmouseup;
		lineElem.ondbclick = onClickSearchStart;
	}
}

function search_time_set(elem, idname, e_data)
{

	if(elem == null)
	{
		elem = document.getElementById(idname);
		if( !elem )
		{
			return false;
		}
	}

	if (elem != null)
	{
		elem.value= e_data;
	}

	return true;
}

var dst_start_prvday = false;

function search_time_display(year, month, day, hour, minute, second)
{
    var tmp_hour = hour;
    var tmp_day = day;

    if (parseInt(INFO_DST))
	{
        if ( parseInt(DST_STATUS) == parseInt(DST_DST_DAY) )
        {
        }
        else if ( parseInt(DST_STATUS) == parseInt(DST_START_DAY) )
        {
            var uptime;
            var prvTimeH = 1;

            if (parseInt(DST_TIME_MIN) > 0)
            {
                uptime = ( (parseInt(DST_TIME_POS)+1) * 3600) + (parseInt(DST_TIME_MIN) * 60) - 1;
            }
            else
            {
                uptime = (parseInt(DST_TIME_POS) * 3600) + (59 * 60) + 59;
            }

            var curtime = (parseInt(hour)*3600) + (parseInt(minute)*60) + parseInt(second);

            if ( parseInt(uptime) < parseInt(curtime) )
            {
                DST_ON_TIME = true;

                if ( dst_start_prvday )
                {
                    tmp_day++;
                    day++;

                    dst_start_prvday = false;
                }
            }
            else
            {
                if ( !parseInt(hour) )
                {
                    if (!dst_start_prvday)
                    {
                        tmp_day--;
                        day--;

                        dst_start_prvday = true;
                    }
                }
                else
                {
                    if ( dst_start_prvday )
                    {
                        tmp_day++;
                        day++;

                        dst_start_prvday = false;
                    }
                }

                DST_ON_TIME = false;
            }

            if (parseInt(DST_TIME_MIN) > 0)
            {
                if ( (parseInt(hour) == (parseInt(DST_TIME_POS)+1)))
                {
                    if ( (parseInt(minute) * 60 + parseInt(second)) < (parseInt(DST_TIME_MIN) * 60) )
                    {
                        tmp_hour = parseInt(DST_TIME_POS) + 1;
                    }
                    else
                    {
                        tmp_hour = parseInt(DST_TIME_POS) + 2;
                    }
                }
                else if ((parseInt(hour) > (parseInt(DST_TIME_POS)+1)))
                {
                    tmp_hour++;
                }
            }
        }
    	else if ( parseInt(DST_STATUS) == parseInt(DST_END_DAY) )
        {
            var uptime;
            var prvTimeH = 1;

            if (parseInt(DST_TIME_MIN) > 0)
            {
                uptime = ( (parseInt(DST_TIME_POS)+1) * 3600) + (parseInt(DST_TIME_MIN) * 60) - 1;
            }
            else
            {
                uptime = (parseInt(DST_TIME_POS) * 3600) + (59 * 60) + 59;
            }

            var curtime = (parseInt(hour)*3600) + (parseInt(minute)*60) + parseInt(second);

	        //var testMsg = "uptime["+uptime+"]curtime["+curtime+"]hour["+hour+"]DST_TIME_POS["+DST_TIME_POS+"]";

	        //alert(testMsg);

            if ( parseInt(uptime) < parseInt(curtime) )
            {
                DST_ON_TIME = false;
            }
            else
            {
                DST_ON_TIME = true;
            }

            if (parseInt(DST_TIME_MIN) > 0)
            {
                if ( (parseInt(hour) == (parseInt(DST_TIME_POS)+1)))
                {
                    if ( (parseInt(minute) * 60 + parseInt(second)) < (parseInt(DST_TIME_MIN) * 60) )
                    {
                        tmp_hour = parseInt(DST_TIME_POS) + 1;
                        if ( parseInt(udate_time['d']) == parseInt(day) )
                        {
                            tmp_day++;
                        }
                        else
                        {
                            day--;
                        }
                    }
                    else
                    {
                        tmp_hour = parseInt(DST_TIME_POS) + 2;
                        if ( parseInt(udate_time['d']) != parseInt(day) )
                        {
                            tmp_day--;
                            day--;
                        }
                    }
                }
                else if ((parseInt(hour) > (parseInt(DST_TIME_POS)+1)))
                {
                    tmp_hour++;
                    if ( parseInt(udate_time['d']) != parseInt(day) )
                    {
                        tmp_day--;
                        day--;
                    }
                }
                else if ((parseInt(hour) < (parseInt(DST_TIME_POS)+1)))
                {
                    if ( parseInt(udate_time['d']) != parseInt(day) )
                    {
                        tmp_day--;
                        day--;
                    }
                }
            }
        }
        else
        {
            DST_ON_TIME = false;
        }
    }

	if (search_time_set(year_elem, "year", year) == false)
	{
		return;
	}

	if (search_time_set(mon_elem, "month", month) == false)
	{
		return;
	}

	if (search_time_set(day_elem, "day", tmp_day) == false)
	{
		return;
	}

	if (search_time_set(hour_elem, "hour", tmp_hour) == false)
	{
		return;
	}

	if (search_time_set(min_elem, "minute", minute) == false)
	{
		return;
	}

	if (search_time_set(sec_elem, "second", second) == false)
	{
		return;
	}

	btime['y'] = year;
	btime['m'] = month;
	btime['d'] = day;
	btime['h'] = hour;
	btime['mn'] = minute;
	btime['s'] = second;

	if (parseInt(month) + 1 < 10)
	{
		month = '0' + (parseInt(month) + 1);
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

	var strdisp = year + "." + month + "." + day + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + hour + ":" + minute + ":" + second;

	if (display_elem == null)
	{
		display_elem = document.getElementById("sh_cur_time");
	}

	//replaceHTML(display_elem, strdisp);

}

function search_text_logprint(frm) {
  var ret = search_validate_form(frm, "action=set_search&menu=search.searchsetting_searchbytextsearch");

    if (ret == false) {
        return;
    }
    logdispclear();
    search_postSetup(frm, "action=set_search&menu=search.searchsetting_searchbytextsearch");
}

function search_logprint(frm)
{
	var ret = search_validate_form(frm, "action=set_search&menu=search.searchsetting_searchbyevent");

	if (ret == false)
	{
		return;
	}

	search_searchbyevent_value_init();

	search_postSetup(frm, "action=set_search&menu=search.searchsetting_searchbyevent");
}

function search_log_display(start, end)
{
  var year, month, day, hour, minute, second, isdst;

  if ( parseInt(start) > parseInt(end) )
  {
    return;
  }

  logdispclear();

  log_curr_pos[0] = start;
  log_curr_pos[1] = end;

  for (var i = parseInt(start); i <= parseInt(end); i++)
  {
    year = log_year[i];
    month = log_mon[i];
    day = log_day[i];
    hour = log_hour[i];
    minute = log_min[i];
    second = log_second[i];
    isdst  = log_dst[i];

    if ( parseInt(year) < 2008 )
    {
      return;
    }

    if (parseInt(month) + 1 < 10)
    {
      month = '0' + (parseInt(month) + 1);
    }
    else
    {
      month = parseInt(month) + 1;
    }

    if (parseInt(day) < 10)
    {
      day = '0' + day;
    }

    if (parseInt(hour) < 10)
    {
      hour = '0' + hour;
    }

    if (parseInt(minute) < 10)
    {
      minute = '0' + minute;
    }

    if (parseInt(second) < 10)
    {
      second = '0' + second;
    }

    // var strdisp = year + "." + month + "." + day + "&nbsp;&nbsp;" + hour + ":" + minute + ":" + second;

		// INFO_DATEFORMAT
    switch (INFO_DATEFORMAT) {
      case '0': // yyyy/mm/dd
        strdisp = year + "/" + month + "/" + day
        break;
      case '1': // mm/dd/yyyy
        strdisp = month + "/" + day + "/" + year;
        break;
      case '2': // dd/mm/yyyy
        strdisp = day + "/" + month + "/" + year
        break;
    }

    strdisp += "&nbsp;&nbsp;"

    switch (INFO_TIMEFORMAT) {
      case '0': // 24hour
        strdisp += hour + ":" + minute + ":" + second;
        break;
      case '1': // AM/PM
        var hour_num = parseInt(hour, 10);
        strdisp += (hour_num % 12) + ":" + minute + ":" + second + " ";
        strdisp += (hour_num / 12) >= 1 ? "PM" : "AM";
        break;
    }

    var dispWindow = document.getElementById("time"+ (parseInt(i) % parseInt(LOGTABLE)) );

    replaceHTML(dispWindow, strdisp);

    dispWindow = document.getElementById("log"+ (parseInt(i) % parseInt(LOGTABLE)) );

    replaceHTML(dispWindow, log_text[i]);

  }
}

function search_textsearch_log_display(start, end)
{
  var year, month, day, hour, minute, second, isdst;

  if ( parseInt(start) > parseInt(end) )
  {
    return;
  }

  logdispclear();

  log_curr_pos[0] = start;
  log_curr_pos[1] = end;

  for (var i = parseInt(start); i <= parseInt(end); i++)
  {

    year = log_year[i];
    month = log_mon[i];
    day = log_day[i];
    hour = log_hour[i];
    minute = log_min[i];
    second = log_second[i];
    isdst  = log_dst[i];

    if ( parseInt(year) < 2008 )
    {
      return;
    }

    if (parseInt(month) + 1 < 10)
    {
      month = '0' + (parseInt(month) + 1);
    }
    else
    {
      month = parseInt(month) + 1;
    }

    if (parseInt(day) < 10)
    {
      day = '0' + day;
    }

    if (parseInt(hour) < 10)
    {
      hour = '0' + hour;
    }

    if (parseInt(minute) < 10)
    {
      minute = '0' + minute;
    }

    if (parseInt(second) < 10)
    {
      second = '0' + second;
    }

    // var strdisp = year + "." + month + "." + day + "&nbsp;&nbsp;" + hour + ":" + minute + ":" + second;

		// INFO_DATEFORMAT
    switch (INFO_DATEFORMAT) {
      case '0': // yyyy/mm/dd
        strdisp = year + "/" + month + "/" + day
        break;
      case '1': // mm/dd/yyyy
        strdisp = month + "/" + day + "/" + year;
        break;
      case '2': // dd/mm/yyyy
        strdisp = day + "/" + month + "/" + year
        break;
    }

    strdisp += "&nbsp;&nbsp;"

    switch (INFO_TIMEFORMAT) {
      case '0': // 24hour
        strdisp += hour + ":" + minute + ":" + second;
        break;
      case '1': // AM/PM
        var hour_num = parseInt(hour, 10);
        strdisp += (hour_num % 12) + ":" + minute + ":" + second + " ";
        strdisp += (hour_num / 12) >= 1 ? "PM" : "AM";
        break;
    }

    var dispWindow = document.getElementById("time"+ (parseInt(i) % parseInt(LOGTABLE)) );

    replaceHTML(dispWindow, strdisp);

    dispWindow = document.getElementById("ch"+ (parseInt(i) % parseInt(LOGTABLE)) );

    replaceHTML(dispWindow, (parseInt(log_ch[i])+1));

    dispWindow = document.getElementById("log"+ (parseInt(i) % parseInt(LOGTABLE)) );

    replaceHTML(dispWindow, log_text[i]);

  }
}

function logdispclear()
{
	for (var i = 0; i < parseInt(LOGTABLE); i++)
	{
		var dispWindow = document.getElementById("time"+ (parseInt(i)) );

		clearText(dispWindow);

                dispWindow = document.getElementById("ch"+ parseInt(i) );

		clearText(dispWindow);

		dispWindow = document.getElementById("log"+ (parseInt(i)) );

		clearText(dispWindow);
	}
}

var remainlogcnt = 0;

function pagedownbtn()
{
	//var logtest = "log_result_count["+log_result_count+"]remainlogcnt["+remainlogcnt+"]log_curr_pos[1]["+log_curr_pos[1]+"]";
	//var printMsg = document.getElementById("printMsg");
	//replaceText(printMsg, logtest);

	if ( parseInt(log_curr_pos[1]) >= (parseInt(log_result_count) - 1) )
	{
		return;
	}

	if ( parseInt(log_curr_pos[1]) + parseInt(LOGTABLE) >= (parseInt(log_result_count) - 1) )
	{
		if ( !parseInt(repeat) )
		{
			log_count = log_curr_pos[0] + parseInt(LOGTABLE);

			btnsearch[0] = log_year[parseInt(log_curr_pos[0])+ parseInt(LOGTABLE)];
			btnsearch[1] = log_mon[parseInt(log_curr_pos[0]) + parseInt(LOGTABLE)];
			btnsearch[2] = log_day[parseInt(log_curr_pos[0]) + parseInt(LOGTABLE)];
			btnsearch[3] = log_hour[parseInt(log_curr_pos[0]) + parseInt(LOGTABLE)];
			btnsearch[4] = log_min[parseInt(log_curr_pos[0]) + parseInt(LOGTABLE)];
			btnsearch[5] = log_second[parseInt(log_curr_pos[0]) + parseInt(LOGTABLE)];

			log_btn_flag = 'pagedown';
			remainlogcnt = parseInt(log_result_count) - parseInt(log_count);
			search_postSetup(document.searchsetting_searchbytime, "action=set_search&menu=search.searchsetting_searchbyevent");
		}
		else
		{
			search_log_display(parseInt(log_curr_pos[0]) + 8, parseInt(log_result_count) - 1);
		}
	}
	else
	{
		search_log_display(parseInt(log_curr_pos[0]) + parseInt(LOGTABLE), parseInt(log_curr_pos[1]) + parseInt(LOGTABLE));
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
		search_log_display(parseInt(log_curr_pos[0]) - parseInt(LOGTABLE), parseInt(log_curr_pos[1]) - (parseInt(log_curr_pos[1]) % parseInt(LOGTABLE) + 1) );
	}
	else
	{
		search_log_display(parseInt(log_curr_pos[0]) - parseInt(LOGTABLE), parseInt(log_curr_pos[1]) - parseInt(LOGTABLE) );
	}

}

function pagedown_textsearch_btn()
{
	if ( parseInt(log_curr_pos[1]) >= (parseInt(log_result_count)) )
	{
		return;
	}

	if ( parseInt(log_curr_pos[1]) + parseInt(LOGTABLE) >= (parseInt(log_result_count) ) )
	{

		if ( !parseInt(repeat) )
		{

			log_count = log_curr_pos[0] + parseInt(LOGTABLE);

			btnsearch[0] = log_year[parseInt(log_curr_pos[0])+ parseInt(LOGTABLE)-1];
			btnsearch[1] = log_mon[parseInt(log_curr_pos[0]) + parseInt(LOGTABLE)-1];
			btnsearch[2] = log_day[parseInt(log_curr_pos[0]) + parseInt(LOGTABLE)-1];
			btnsearch[3] = log_hour[parseInt(log_curr_pos[0]) + parseInt(LOGTABLE)-1];
			btnsearch[4] = log_min[parseInt(log_curr_pos[0]) + parseInt(LOGTABLE)-1];
			btnsearch[5] = log_second[parseInt(log_curr_pos[0]) + parseInt(LOGTABLE)-1];

			log_btn_flag = 'pagedown';
			remainlogcnt = parseInt(log_result_count) - parseInt(log_count);
			search_postSetup(document.searchsetting_searchbytime, "action=set_search&menu=search.searchsetting_searchbytextsearch");
		}
		else
		{
			search_textsearch_log_display(parseInt(log_curr_pos[0]) + 8, parseInt(log_result_count) - 1);
		}
	}
	else
	{
		search_textsearch_log_display(parseInt(log_curr_pos[0]) + parseInt(LOGTABLE), parseInt(log_curr_pos[1]) + parseInt(LOGTABLE));
	}
}

function pageup_textsearch_btn()
{
	if ( parseInt(log_curr_pos[0]) <= 0 )
	{
		return;
	}

	if ( parseInt(log_curr_pos[1]) == ( parseInt(log_result_count) - 1 ))
	{
		search_textsearch_log_display(parseInt(log_curr_pos[0]) - parseInt(LOGTABLE), parseInt(log_curr_pos[1]) - (parseInt(log_curr_pos[1]) % parseInt(LOGTABLE) + 1) );
	}
	else
	{
		search_textsearch_log_display(parseInt(log_curr_pos[0]) - parseInt(LOGTABLE), parseInt(log_curr_pos[1]) - parseInt(LOGTABLE) );
	}

}

function onClickLogTable(elem, is_pos)
{
  var elemcel = elem;
  var celname = "logdate";
  var elemid = elemcel.id;

  var celpos = elemid.substring(celname.length, elemid.length);

  var pos = parseInt(log_curr_pos[0]) + parseInt(celpos);

  if (log_year[pos] == null || log_mon[pos] == null || log_day[pos] == null || log_hour[pos] == null || log_min[pos] == null || log_second[pos] == null)
  {
    return;
  }

  if(is_pos == true) {
    isTextInSearch = true;
  }
  else {
    isTextInSearch = false;
  }

  if (INFO_PASSWORD_CHECK == '1' && passwdAuthenticated == false ) {
  // $("#itxview").appendTo("div.hidden");
    $("#itxview").hide();
    $("#dialog_check_auth").data('callstack', onClickLogTable_after).data('arg', pos).dialog('open');
    } else if(typeof INFO_DUAL_LOGIN != "undefined" && (INFO_DUAL_LOGIN == '1') && (get_id_name != 'ADMIN') && !passwdAuthenticated) {
    // $("#itxview").appendTo("div.hidden");
    $("#itxview").hide();
    $("#dialog_check_auth")
      .data('callstack', onClickLogTable_after)
      .data('arg', pos)
      .data('mode', 'dual_login')
      .dialog('open');
  } else {
    onClickLogTable_after(pos);
  }
}

function onClickLogTable_after(pos) {


  onSearchStop();

  var direction = 1;

  /***/
  var mydate = new MyDate(null, {
    useDST: (log_dst[pos] == '1')
  });
  mydate.setDate({
    year: log_year[pos],
    month: log_mon[pos],
    day: log_day[pos],
    hour: log_hour[pos],
    min: log_min[pos],
    sec: 0
  });
  /***/
  var timezone = tzarray[tzidx];

  var year = log_year[pos];
  var mon = log_mon[pos];
  var day = log_day[pos];
  var hour = log_hour[pos];
  var min = log_min[pos];
  var isdst = log_dst[pos];

  //alert("year["+year+"]mon["+mon+"]day["+day+"]hour["+hour+"]min["+min+"]isdst["+isdst+"]timezone["+timezone+"]");

  var t_hour = parseInt(timezone) / 60;
  var t_min = parseInt(timezone) % 60;

  var MinusDate = new Date();

  MinusDate.setFullYear(parseInt(year));
  MinusDate.setMonth(parseInt(mon));
  MinusDate.setDate(parseInt(day));
  MinusDate.setHours(parseInt(hour)+parseInt(t_hour));
  MinusDate.setMinutes(parseInt(min)+parseInt(t_min));

  year = MinusDate.getFullYear();
  mon = MinusDate.getMonth();
  day = MinusDate.getDate();
  hour = MinusDate.getHours();
  min = MinusDate.getMinutes();

  MinusDate = null;

  //alert("year["+year+"]mon["+mon+"]day["+day+"]hour["+hour+"]log_min["+log_min[pos]+"]log_second["+log_second[pos]+"]");

  var UTCDate = new Date();

  var utctime = UTCDate.setUTCFullYear(parseInt(year));
  utctime = UTCDate.setUTCMonth(parseInt(mon));
  utctime = UTCDate.setUTCDate(parseInt(day));
  utctime = UTCDate.setUTCHours(parseInt(hour));
  utctime = UTCDate.setUTCMinutes(parseInt(min));
  utctime = UTCDate.setUTCSeconds(parseInt(log_second[pos]));

  var lStartTime = parseInt(utctime) / 1000;

  var endpos;

  utctime = UTCDate.setUTCFullYear(parseInt(log_year[pos]));
  utctime = UTCDate.setUTCMonth(parseInt(log_mon[pos]));
  utctime = UTCDate.setUTCDate(parseInt(log_day[pos]));

  if ( parseInt(direction) == 1 )
  {
    utctime = UTCDate.setUTCHours(23);
    utctime = UTCDate.setUTCMinutes(59);
    utctime = UTCDate.setUTCSeconds(59);

    mydate.setDate({
      year: log_year[pos],
      month: log_mon[pos],
      day: log_day[pos],
      hour: 23,
      min: 59,
      sec: 59
    });
  }
  else
  {
    utctime = UTCDate.setUTCHours(0);
    utctime = UTCDate.setUTCMinutes(0);
    utctime = UTCDate.setUTCSeconds(0);
    mydate.setDate({
      year: log_year[pos],
      month: log_mon[pos],
      day: log_day[pos],
      hour: 0,
      min: 0,
      sec: 0
    });

  }
  UTCDate = null;

  var lEndTime = parseInt(utctime) / 1000;

  if ( parseInt(INFO_DST) == 1 )
  {
    if ( parseInt(isdst) == 1 )
    {
      lStartTime = parseInt(lStartTime) - 3600;
      lEndTime = parseInt(lEndTime) - 3600;
    }
  }

  var logtxt = log_text[pos];
  if ( (logtxt.indexOf('#') > 0) || (isTextInSearch == true) )
  {

    if ( INFO_VENDOR == 'DIGIMERGE' )
    {
      SetEventSearch(log_ch[pos] ,1, 1, parseInt(lStartTime)-5, 0);
    }
    else
    {
      SetEventSearch(log_ch[pos] ,1, 1, parseInt(lStartTime), 0);
    }
      var ch = log_ch[pos];
      $("#channel").val(parseInt(ch)+1);
  }
  else
  {
		SetInitDisplay();
		$("#channel").val(0);

    if ( INFO_VENDOR == 'DIGIMERGE' )
    {
      onSearchStart(1, 1, parseInt(lStartTime)-5, 0);
    }
    else
    {
      onSearchStart(1, 1, parseInt(lStartTime), 0);
    }
	}
}

function makeSelectBoxNomal(elem, func, smin, smax)
{
	for (var i = elem.childNodes.length; i > 0; i--)
	{
		elem.removeChild(elem.childNodes[i-1]);
	}

	if (isNaN(smin) == true || isNaN(smax) == true)
	{
		return false;
	}

	if (smin > smax)
	{
		var tmp;
		tmp = smax;
		smax = smin;
		smin = tmp;
	}

	//var newSelect = document.createElement("select");
	var newSelect = elem;

	newSelect.onchange = func;

	for (var i = smin; i <= smax; i++)
	{
		var newOption = document.createElement("option");
		var txt = i;

		if ( parseInt(i) < 10 )
		{
			txt = '0'+i;
		}

		newOption.text = txt;

		newOption.value = i;

		newSelect.options.add(newOption);
	}
	//insertAfter(newSelect, elem);
	//elem.appendChild(newSelect);

}

function onChangFromMon(elem)
{
	var dayelem = elem;

	var yearelem = document.getElementById("fromyear");

	var dayelem = document.getElementById("fromday");
	var dayval = parseInt(dayelem.value);

	makeSelectBoxNomal(dayelem, null, 1, search_date_get_days_in_month(elem.value, yearelem.value));

	if (setAttrSelectedID( "fromday", dayval) == false )
	{
		return false;
	}
}

function onChangToMon(elem)
{
	var dayelem = elem;

	var yearelem = document.getElementById("toyear");

	var dayelem = document.getElementById("today");
	var dayval = parseInt(dayelem.value);

	makeSelectBoxNomal(dayelem, null, 1, search_date_get_days_in_month(elem.value, yearelem.value));

	if (setAttrSelectedID( "today", dayval) == false )
	{
		return false;
	}
}

function info_compare_search()
{
    if (INFO_DVRREADY != INFO_CMP_DVRREADY )
    {
        return false;
    }

	if (INFO_TIMEZONE != INFO_CMP_TIMEZONE)
	{
		return false;
	}

	if (INFO_DATEFORMAT != INFO_CMP_DATEFORMAT)
	{
		return false;
	}

	if (INFO_RTSPPORT != INFO_CMP_RTSPPORT)
	{
		return false;
	}

	if (INFO_DST != INFO_CMP_DST)
	{
		return false;
	}

}

function info_compare_func()
{
	include_file('../info/info.js');

	if (info_compare_search() == false)
	{
	    onSearchStop();
	    GetSearchPlaytimeStop();

	    if ( parseInt(INFO_DVRREADY) == 1 )
		{
		    var disoffset = parseInt(INFO_DISCONNECTRESON) - parseInt(DISCONECTOFFSET);

		    if ( parseInt(disoffset) > 0 && parseInt(disoffset) <= 10 )
		    {
		        alert(errDisConnectReason[disoffset]);
		    }
		}
	    else if ( parseInt(INFO_DVRREADY) == 2 && parseInt(INFO_CMP_DVRREADY) == 1 )
		{
		    fullScreenStop();
		    location.reload();
		}

	    var btspeaker = document.getElementById("btspeaker");

	    if ( btspeaker && INFO_AUDIO_SUPPORT == '1' && INFO_VENDOR != 'S1')
	    {
	      btspeaker.setAttribute("src", "../images/images/live_sound_off_n.png");
	    }

		info_cmp_store();
	}

	setTimeout(info_compare_func, 2000);
}

function OnPlaybackMouseOver(e)
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
	else if ( imgelem.id == "btspeaker")
	{
		var imgurl = imgelem.getAttribute("src");
		var img_str = imgurl.substring(imgurl.indexOf('images'),imgurl.length);

/*	    if (imgurl == "../images/images/live_sound_off_n.gif" || imgurl == "../images/images/live_sound_off_p.gif") */
	    if (img_str == "images/images/live_sound_off_n.png" || img_str == "images/images/live_sound_off_p.png")
	    {
	       imgelem.setAttribute("src", "../images/images/live_sound_off_o.png");
	    }
	    else
	    {
		    imgelem.setAttribute("src", "../images/images/live_sound_on_o.png");
		}
	}
	else if ( imgelem.id == "btprint")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_print_o.gif");
	}
	else if ( imgelem.id == "btcaptureimage")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_snapshot_o.gif");
	}
	else if ( imgelem.id == "btsetting")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_setting_o.gif");
	}
	else if ( imgelem.id == "rf")
	{
		imgelem.setAttribute("src", "../images/images/bt_playback_rf2_o.gif");
	}
	else if ( imgelem.id == "backplay")
	{
		imgelem.setAttribute("src", "../images/images/bt_playback_backplay_o.gif");
	}
	else if ( imgelem.id == "pauseplay")
	{
		imgelem.setAttribute("src", "../images/images/bt_playback_pause_o.gif");
	}
	else if ( imgelem.id == "play")
	{
		imgelem.setAttribute("src", "../images/images/bt_playback_play_o.gif");
	}
	else if ( imgelem.id == "ff")
	{
		imgelem.setAttribute("src", "../images/images/bt_playback_ff2_o.gif");
	}
}

function OnPlaybackMouseOut(e)
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
	else if ( imgelem.id == "btspeaker")
	{
		var imgurl = imgelem.getAttribute("src");
		var img_str = imgurl.substring(imgurl.indexOf('images'),imgurl.length);

/*	    if (imgurl == "../images/images/live_sound_off_o.gif") */
	    if (img_str == "images/images/live_sound_off_o.png")
	    {
	       imgelem.setAttribute("src", "../images/images/live_sound_off_n.png");
	    }
	    else
	    {
		    imgelem.setAttribute("src", "../images/images/live_sound_on_n.png");
		}
	}
	else if ( imgelem.id == "btprint")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_print_n.gif");
	}
	else if ( imgelem.id == "btcaptureimage")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_snapshot_n.gif");
	}
	else if ( imgelem.id == "btsetting")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_setting_n.gif");
	}
	else if ( imgelem.id == "rf")
	{
		imgelem.setAttribute("src", "../images/images/bt_playback_rf2_n.gif");
	}
	else if ( imgelem.id == "backplay")
	{
		imgelem.setAttribute("src", "../images/images/bt_playback_backplay_n.gif");
	}
	else if ( imgelem.id == "pauseplay")
	{
		imgelem.setAttribute("src", "../images/images/bt_playback_pause_n.gif");
	}
	else if ( imgelem.id == "play")
	{
		imgelem.setAttribute("src", "../images/images/bt_playback_play_n.gif");
	}
	else if ( imgelem.id == "ff")
	{
		imgelem.setAttribute("src", "../images/images/bt_playback_ff2_n.gif");
	}
}

function OnPlaybackMouseDown(e)
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
	else if ( imgelem.id == "btspeaker")
	{
		var imgurl = imgelem.getAttribute("src");
		var img_str = imgurl.substring(imgurl.indexOf('images'),imgurl.length);

/*	    if (imgurl == "../images/images/live_sound_off_o.gif") */
	    if (img_str == "images/images/live_sound_off_o.png")
	    {
	       imgelem.setAttribute("src", "../images/images/live_sound_on_p.png");
	    }
	    else
	    {
		    imgelem.setAttribute("src", "../images/images/live_sound_off_p.png");
		}
	}
	else if ( imgelem.id == "btprint")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_print_p.gif");
	}
	else if ( imgelem.id == "btcaptureimage")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_snapshot_p.gif");
	}
	else if ( imgelem.id == "btsetting")
	{
		imgelem.setAttribute("src", "../images/images/live_bt_setting_p.gif");
	}
	else if ( imgelem.id == "rf")
	{
		imgelem.setAttribute("src", "../images/images/bt_playback_rf2_p.gif");
	}
	else if ( imgelem.id == "backplay")
	{
		imgelem.setAttribute("src", "../images/images/bt_playback_backplay_p.gif");
	}
	else if ( imgelem.id == "pauseplay")
	{
		imgelem.setAttribute("src", "../images/images/bt_playback_pause_p.gif");
	}
	else if ( imgelem.id == "play")
	{
		imgelem.setAttribute("src", "../images/images/bt_playback_play_p.gif");
	}
	else if ( imgelem.id == "ff")
	{
		imgelem.setAttribute("src", "../images/images/bt_playback_ff2_p.gif");
	}
}

function framimage()
{
	var division1 = document.getElementById("division1");
	var division4 = document.getElementById("division4");
	var division8 = document.getElementById("division8");
	var division9 = document.getElementById("division9");
	var division16 = document.getElementById("division16");
	var btpageset = document.getElementById("btpageset");
	var btpageone = document.getElementById("btpageone");
	var btpagefull = document.getElementById("btpagefull");
	var btspeaker = document.getElementById("btspeaker");
	var btprint = document.getElementById("btprint");
	var btzoomin = document.getElementById("btzoomin");
	var btcaptureimage = document.getElementById("btcaptureimage");
	var btsetting = document.getElementById("btsetting");
	var rf = document.getElementById("rf");
	var backplay = document.getElementById("backplay");
	var pauseplay = document.getElementById("pauseplay");
	var play = document.getElementById("play");
	var ff = document.getElementById("ff");

        if (division1 != null) {
          division1.onclick = SetDisplayMode1;
          division1.onmouseover = OnPlaybackMouseOver;
          division1.onmousedown = OnPlaybackMouseDown;
          division1.onmouseout = OnPlaybackMouseOut;
          division1.onmouseup = OnPlaybackMouseOver;
        }

        if (division4 != null) {
          division4.onclick = SetDisplayMode4;
          division4.onmouseover = OnPlaybackMouseOver;
          division4.onmousedown = OnPlaybackMouseDown;
          division4.onmouseout = OnPlaybackMouseOut;
          division4.onmouseup = OnPlaybackMouseOver;
        }

	if (division8)
	{
	    division8.onclick = SetDisplayMode8;
	    division8.onmouseover = OnPlaybackMouseOver;
	    division8.onmousedown = OnPlaybackMouseDown;
	    division8.onmouseout = OnPlaybackMouseOut;
	    division8.onmouseup = OnPlaybackMouseOver;
	}
	if (division16)
	{
	    division16.onclick = SetDisplayMode16;
	    division16.onmouseover = OnPlaybackMouseOver;
	    division16.onmousedown = OnPlaybackMouseDown;
	    division16.onmouseout = OnPlaybackMouseOut;
	    division16.onmouseup = OnPlaybackMouseOver;
	}
	if (division9)
	{
	    division9.onclick = SetDisplayMode9;
	    division9.onmouseover = OnPlaybackMouseOver;
	    division9.onmousedown = OnPlaybackMouseDown;
	    division9.onmouseout = OnPlaybackMouseOut;
	    division9.onmouseup = OnPlaybackMouseOver;
	}
	if (btspeaker  && INFO_AUDIO_SUPPORT == '1'&& INFO_VENDOR != 'S1')
	{
	    btspeaker.onclick = SetSpeaker;
	    btspeaker.onmouseover = OnPlaybackMouseOver;
	    btspeaker.onmousedown = OnPlaybackMouseDown;
	    btspeaker.onmouseout = OnPlaybackMouseOut;
	    btspeaker.onmouseup = OnPlaybackMouseOver;
	}

	if ( btpagefull )
	{
	    btpagefull.onclick = SetDisplayfull;
	    btpagefull.onmouseover = OnPlaybackMouseOver;
	    btpagefull.onmousedown = OnPlaybackMouseDown;
	    btpagefull.onmouseout = OnPlaybackMouseOut;
	    btpagefull.onmouseup = OnPlaybackMouseOver;
	}
	if (btzoomin)
  {
	  btzoomin.onclick = SetDzoomin;
	  btzoomin.onmouseover = OnPlaybackMouseOver;
	  btzoomin.onmousedown = OnPlaybackMouseDown;
	  btzoomin.onmouseout = OnPlaybackMouseOut;
	  btzoomin.onmouseup = OnPlaybackMouseOver;
  }
	if ( rf )
	{
	    rf.onclick = SetPlaybackRF;
	    rf.onmouseover = OnPlaybackMouseOver
	    rf.onmousedown = OnPlaybackMouseDown;
	    rf.onmouseout = OnPlaybackMouseOut;
	    rf.onmouseup = OnPlaybackMouseOver;
	}

	if ( backplay )
	{
	    backplay.onclick = SetPlaybackBackPlay;
	    backplay.onmouseover = OnPlaybackMouseOver;
	    backplay.onmousedown = OnPlaybackMouseDown;
	    backplay.onmouseout = OnPlaybackMouseOut;
	    backplay.onmouseup = OnPlaybackMouseOver;
	}

	if ( pauseplay )
	{
	    pauseplay.onclick = SetPlaybackPause;
	    pauseplay.onmouseover = OnPlaybackMouseOver;
	    pauseplay.onmousedown = OnPlaybackMouseDown;
	    pauseplay.onmouseout = OnPlaybackMouseOut;
	    pauseplay.onmouseup = OnPlaybackMouseOver;
	}

	if ( play )
	{
	    play.onclick = SetPlaybackPlay;
	    play.onmouseover = OnPlaybackMouseOver;
	    play.onmousedown = OnPlaybackMouseDown;
    	play.onmouseup = OnPlaybackMouseOver;
    	play.onmouseout = OnPlaybackMouseOut;
    }

	if ( ff )
	{
	    ff.onclick = SetPlaybackFF;
	    ff.onmouseover = OnPlaybackMouseOver;
	    ff.onmousedown = OnPlaybackMouseDown;
	    ff.onmouseout = OnPlaybackMouseOut;
	    ff.onmouseup = OnPlaybackMouseOver;
	}

	if ( btprint && INFO_SNAPSHOT_SUPPORT == '1' && INFO_VENDOR != 'S1')
	{
	    btprint.onclick = SetPrint;
	    btprint.onmouseover = OnPlaybackMouseOver;
	    btprint.onmousedown = OnPlaybackMouseDown;
	    btprint.onmouseout = OnPlaybackMouseOut;
	    btprint.onmouseup = OnPlaybackMouseOver;
	}

	if ( btcaptureimage && INFO_SNAPSHOT_SUPPORT == '1' && INFO_VENDOR != 'S1')
	{
	    btcaptureimage.onclick = SetCapureImage;
	    btcaptureimage.onmouseover = OnPlaybackMouseOver;
	    btcaptureimage.onmousedown = OnPlaybackMouseDown;
	    btcaptureimage.onmouseout = OnPlaybackMouseOut;
	    btcaptureimage.onmouseup = OnPlaybackMouseOver;
	}

	if ( btsetting)
	{
	    btsetting.onclick = SetSetting;
	    btsetting.onmouseover = OnPlaybackMouseOver;
	    btsetting.onmousedown = OnPlaybackMouseDown;
	    btsetting.onmouseout = OnPlaybackMouseOut;
	    btsetting.onmouseup = OnPlaybackMouseOver;
	}

	if ( btpageset )
	{
	    btpageset.onclick = SetDisplayTab;
	    btpageset.onmouseover = OnPlaybackMouseOver;
	    btpageset.onmousedown = OnPlaybackMouseDown;
	    btpageset.onmouseout = OnPlaybackMouseOut;
	    btpageset.onmouseup = OnPlaybackMouseOver;
	}

	if ( btpageone )
	{
	    btpageone.onclick = SetDisplayManual;
	    btpageone.onmouseover = OnPlaybackMouseOver;
	    btpageone.onmousedown = OnPlaybackMouseDown;
	    btpageone.onmouseout = OnPlaybackMouseOut;
	    btpageone.onmouseup = OnPlaybackMouseOver;
	}
}

function search_searchbytime_OnLoad_func(param_refresh)
{
    info_compare_func();

    if (browerIE == true)
    {
    	if( !get_passwd_flag )
		{
			searchPasswdTimer = setTimeout(search_searchbytime_OnLoad_func, 500);
			return;
		}
		else
		{
			onSearchPasswdTimerStop();
			user_info_send_to_activex( get_id_name, get_passwd_name , get_mac_address );
		}

        var activex = document.getElementById("itxview");
        if (ActiveX_IsConnection() == true)
    	{
    		onSearchStop();
    	}

    	GetSearchPlaytimeStop();

    }

    btime['y'] = btime['m'] = btime['d'] = btime['h'] = btime['s'] = null;

    if ( parseInt(INFO_DVRREADY) == 1 )
	{
    }
    else
	{
		if(param_refresh == true) {
			onhmsChange();
		} else {
			search_postSetup(document.searchsetting_searchbytime, "action=get_search&menu=search.searchsetting_searchbytime");
		}
	}
}
//****************************************************************
//?�뜲?�듃 Get/Set************************************************
var speakerinit = false;

function search_update_searchbytime(recvText)
{
  var thisform = document.searchsetting_searchbytime;
  var recvdata = recv_encode(recvText);

  if(recvdata["covert"] != undefined)
    UCOVERT = recvdata["covert"];
  if(recvdata["covert_disp"] != undefined)
    COVERT_DISP = recvdata["covert_disp"];

  GROUP_AUTH = recvdata["login_group"];

  SetCovertSetting();

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

  valUpdate(recvdata, "");
  AuthorityCheck('setup');

	if ( !get_passwd_flag )
	{
		get_passwd_name = recvdata["login_passwd"];
		get_id_name = recvdata["login_id"];
		get_mac_address = recvdata['mac_address'];
	  get_passwd_flag = true;
	  user_info_send_to_activex( get_id_name, get_passwd_name , get_mac_address);
	}

	DST_STATUS = recvdata["dst_status"];
	DST_TIME_POS = recvdata["sTimeCnt"];

	if (parseInt(DST_STATUS) == parseInt(DST_END_DAY) )
  {
    DST_TIME_POS = parseInt(DST_TIME_POS) - 60;
  }

  DST_TIME_MIN = parseInt((parseInt(DST_TIME_POS)) % 60);
	DST_TIME_POS = parseInt((parseInt(DST_TIME_POS)) / 60);

  //alert(DST_STATUS+":"+DST_TIME_POS+":"+DST_TIME_MIN);
  if ( parseInt(DST_TIME_MIN) < 0 )
  {
    DST_TIME_MIN = 0;
  }

	search_time_display_load();

	var rtses = Array();
	var ch = Array(INFO_DVRCHANNEL);

	rtses = recvdata["RTRes"];
	var tl_count = recvdata["tl_count"];

	for (var i = 1; i <= INFO_DVRCHANNEL; i++)
	{
		ch[i] = tl_count.substring((i-1)*parseInt(day_cnt), (i*parseInt(day_cnt))-1);
	}

	var tableid = document.getElementById("search_time_table");

	var tr_node;
	var sel_node;
	var tar_node;
	var tab_len;
	var tr_len;
	var sel_len;

	tab_len = tableid.childNodes.length;

	endtimepos[0] = 143;
	endtimepos[1] = 0;

	for(i = 0; i < parseInt(tab_len); ++i)
	{
		tr_node = tableid.childNodes[i];

		tr_len = tr_node.childNodes.length;

		for(j = 0; j < parseInt(tr_len); ++j)
		{
			sel_node = tr_node.childNodes[j];

			sel_len = sel_node.childNodes.length;

			for(k = 0; k < parseInt(sel_len); ++k)
			{
				tar_node = sel_node.childNodes[parseInt(k)];

				var idname = tar_node.id;

				if (!idname || (idname == "search_rec_top0"))
				{
					continue;
				}

				var iden = idname.substr(0, timelname.length);
				var tmp1 = idname.substr(timelname.length, idname.length);
				var tmp2 = tmp1.split('_');

				var subname0 = tmp2[0];
				var subname1 = tmp2[1];

				var pos = ( parseInt(subname0) * parseInt(day_cnt)) + parseInt(subname1);

				if( iden == timelname )
				{
					tl_data[pos] = rtses.charAt(pos);

					tar_node.style.backgroundColor = ttablecolor[parseInt(tl_data[pos])];

					if ( parseInt(tl_data[pos]) != 0 )
					{
						if ( parseInt(endtimepos[0]) > parseInt(subname1) )
						{
							endtimepos[0] = subname1;
						}

						if ( parseInt(endtimepos[1]) < parseInt(subname1) )
						{
							endtimepos[1] = subname1;
						}
					}
				}
			}
		}
	}

	tzidx = INFO_TIMEZONE;

	if (!tzidx)
	{
		tzidx = 29;
	}

	var year, mon, day, hour, min, sec;

    if ( btime['y'] == null && 	btime['m'] == null && 	btime['d'] == null && 	btime['h'] == null && btime['s'] == null )
    {
        year = recvdata["year"];
    	mon = recvdata["month"];
    	day = recvdata["day"];
    	hour = recvdata["hour"];
    	min = recvdata["min"];
    	sec = recvdata["sec"];

    	if (parseInt(DST_STATUS) == parseInt(DST_END_DAY) )
    	{
    	    if ( parseInt(DST_TIME_POS) <  parseInt(hour) )
    	    {
    	        hour++;
    	    }
    	}
    	else if (parseInt(DST_STATUS) == parseInt(DST_START_DAY) )
    	{
    	    if ( parseInt(DST_TIME_POS) >  parseInt(hour) )
    	    {
    	        hour++;
    	    }
    	}
    	udate_time['y'] = year;
        udate_time['m'] = mon;
        udate_time['d'] = day;
        udate_time['h'] = hour;
        udate_time['mn'] = min;
        udate_time['s'] = sec;
    }
    else
    {
        year = btime['y'] ;
        mon = btime['m'] ;
        day = btime['d'] ;
        hour = btime['h'];
        min = btime['mn'];
        sec = btime['s'] ;

        udate_time['y'] = year;
        udate_time['m'] = mon;
        udate_time['d'] = day;
        udate_time['h'] = null;
        udate_time['mn'] = null;
        udate_time['s'] = null;
    }

    if (parseInt(DST_STATUS) == parseInt(DST_END_DAY) )
	{
	    var hourelem = document.getElementById("hour");

	    delElemSelOption(hourelem);
    	if (parseInt(DST_TIME_MIN) > 0)
    	{
    	    for (var i = 0; i <= 25; i++)
        	{
        		var eleopt = document.createElement("option");
        		eleopt.setAttribute("value", i);
        		var tmp = i;

        		if ( (parseInt(i) > parseInt(DST_TIME_POS)) && (parseInt(i) < parseInt(DST_TIME_POS)+2) )
        		{
        		    if (parseInt(tmp) > 23)
        		    {
        		        tmp -= 24;
        		    }
        		}
        		else if ( parseInt(i) > ( parseInt(DST_TIME_POS) + 1) )
        		{
        		    tmp -= 2;
        		}

        		if ( parseInt(tmp) < 10 )
        		{
        			eleopt.text = '0'+tmp;
        		}
        		else
        		{
        			eleopt.text = tmp;
        		}
        		hourelem.options.add(eleopt);

        		eleopt = null;
        	}
    	}
    	else
    	{
        	for (var i = 0; i <= 24; i++)
        	{
        		var eleopt = document.createElement("option");
        		eleopt.setAttribute("value", i);
        		var tmp = i;

        		if ( parseInt(i) > parseInt(DST_TIME_POS) )
        		{
        		    tmp--;
        		}
        		if ( parseInt(tmp) < 10 )
        		{
        			eleopt.text = '0'+tmp;
        		}
        		else
        		{
        			eleopt.text = tmp;
        		}
        		hourelem.options.add(eleopt);

        		eleopt = null;
        	}
        }
	}
	else if (parseInt(DST_STATUS) == parseInt(DST_START_DAY) )
	{
	    var hourelem = document.getElementById("hour");

	    delElemSelOption(hourelem);
    	var eleopt = document.createElement("option");
    	eleopt.setAttribute("value", 0);
    	eleopt.text = '23';
    	hourelem.options.add(eleopt);
    	eleopt = null;

    	if (parseInt(DST_TIME_MIN) > 0)
    	{
    	    for (var i = 1; i <= 24; i++)
        	{
        		var eleopt = document.createElement("option");
        		eleopt.setAttribute("value", i);
        		var tmp = parseInt(i) - 1;

        		if ( parseInt(tmp) < 10 )
        		{
        			eleopt.text = '0'+tmp;
        		}
        		else
        		{
        			eleopt.text = tmp;
        		}
        		hourelem.options.add(eleopt);

        		eleopt = null;
        	}
    	}
    	else
    	{
        	for (var i = 1; i <= 23; i++)
        	{
        		var eleopt = document.createElement("option");
        		eleopt.setAttribute("value", i);
        		var tmp = parseInt(i) - 1;

        		if ( parseInt(tmp) >= parseInt(DST_TIME_POS) )
        		{
        		    tmp++;
        		}
        		if ( parseInt(tmp) < 10 )
        		{
        			eleopt.text = '0'+tmp;
        		}
        		else
        		{
        			eleopt.text = tmp;
        		}
        		hourelem.options.add(eleopt);

        		eleopt = null;
        	}
        }
	}
	else
	{
	    var hourelem = document.getElementById("hour");
	    createElemSelOption1(hourelem, 0, 23);
	}

	var dayelem = document.getElementById("day");

	makeSelectBoxNomal(dayelem, onymdChange, 1, search_date_get_days_in_month(mon, year));

	var minleng = (parseInt(hour) * 60) + parseInt(min);

	var subname = parseInt(minleng) / 10;
	subname = parseInt(subname);

	if ( parseInt(subname) > parseInt(day_cnt) )
	{
		return;
	}

	var elem = document.getElementById( timelname + 0 + '_' + subname);
	search_ondraw(elem, barcolor[1]);
	bpos = subname;

	search_time_display(year, mon, day, hour, min, sec);

	if ( speakerinit == false )
	{
	    if (INFO_VENDOR != 'SAMSUNG')
	    {
    	    SetSpeaker();
    	}
    	speakerinit = true;
	}

	if (browerIE == true)
  {
    var activex = document.getElementById("itxview");

    if (ActiveX_IsConnection() == true)
    {
      GetSearchPlaytimeStop();
      activex.SessionClose();
      lSEtime = SearchPlay('back');
      if ( onSearchStart(1, 1, lSEtime['lStartTime'], 0) )
      {
        GetSearchPlaytime();
      }
    }
  }
}

function search_searchbyevent_value_init()
{
    for ( var i = 0; i < parseInt(log_result_count) + 100; i++ )
    {
        log_year[i] = null;
        log_mon[i] = null;
        log_day[i] = null;
        log_hour[i] = null;
        log_min[i] = null;
        log_second[i] = null;
        log_dst[i] = null;
        log_text[i] = null;
        log_ch[i] = null;
    }
    log_curr_pos[0] = 0;
    log_curr_pos[1] = 0;
    log_btn_flag = 'search';
    log_count = 0;
    remainlogcnt = 0;
}

function search_update_searchbyevent(recvText)
{
	var thisform = document.searchsetting_searchbytime;
	var recvdata = recv_encode(recvText);
	var blog_count = log_count;

	log_result_count = recvdata["result_count"];

	if (parseInt(log_result_count) < parseInt(LOGTABLE))
	{
		logdispclear();
	}

	repeat = parseInt(log_result_count) % 100;

	log_result_count = parseInt(log_result_count) + parseInt(log_count);

//	alert("log_result_count["+log_result_count+"]log_count["+log_count+"]");

/*
	&log = text_type|text_p1aram|text_p2aram|text_logid|text_text
	&date = year|month|day|hour|minute|second
*/

	for (var i = parseInt(blog_count); i < parseInt(log_result_count); i++)
	{
		var k = parseInt(i) - parseInt(blog_count);
		var logdata = comma_encode(recvdata["log"+k]);
		var datedata = comma_encode(recvdata["date"+k]);

		var log_type = logdata[0];
		var log_param1 = logdata[1];
		var log_param2 = logdata[2];
		var log_logid = logdata[3];
		var log_txt = logdata[4];

    if( log_type == LT_SYSTEM_DEBUG ) {
      continue;
    }

		log_text[i] = getlog(log_type, log_param1, log_param2, log_logid, log_txt);

		log_year[i] = datedata[0];
		log_mon[i] = datedata[1];
		log_day[i] = datedata[2];
		log_hour[i] = datedata[3];
		log_min[i] = datedata[4];
		log_second[i] = datedata[5];

		log_ch[i] = log_param1;

		log_dst[i] = recvdata["isdst"+k];
	}

	if (parseInt(log_result_count) < parseInt(LOGTABLE))
	{
		search_log_display(0, parseInt(log_result_count) - 1);	// 濡쒓�媛 ?���붿移몄�蹂�곷떎.
	}
	else
	{
		if ( parseInt(log_curr_pos[0]) != 0 )
		{
			if ( parseInt(log_curr_pos[1]) + parseInt(LOGTABLE) > parseInt(log_result_count))
			{
				search_log_display(parseInt(log_curr_pos[0]) + parseInt(LOGTABLE), parseInt(log_result_count) - 1);
			}
			else
			{
				search_log_display(parseInt(log_curr_pos[0]) + parseInt(LOGTABLE), parseInt(log_curr_pos[1]) + parseInt(LOGTABLE));
			}
		}
		else
		{
			search_log_display(0, parseInt(LOGTABLE) - 1);
		}
	}
}

function search_update_searchbytextsearch(recvText) {
  var thisform = document.searchsetting_searchbytime;
  var recvdata = recv_encode(recvText);
  var blog_count = log_count;

  log_result_count = recvdata["log_count"];
  log_id = recvdata["log_id"];
  log_id_overflow = recvdata["log_id_overflow"];

  if ((parseInt(log_result_count) < parseInt(LOGTABLE)) && (parseInt(log_result_count) != 0))
  {
    logdispclear();
  }

  repeat = parseInt(log_result_count) % 24;

  log_result_count = parseInt(log_result_count) + parseInt(log_count);

  for(var i = parseInt(blog_count); i < parseInt(log_result_count); i++) {
    var k = parseInt(i) - parseInt(blog_count);
    var logdata = comma_encode(recvdata["log"+k]);
    var datedata = comma_encode(recvdata["date"+k]);
    var chdata = comma_encode(recvdata["ch"+k]);


    log_text[i] = recvdata["log"+k];
    log_ch[i] = recvdata["ch"+k];
    log_year[i] = datedata[0];
    log_mon[i] = datedata[1];
    log_day[i] = datedata[2];
    log_hour[i] = datedata[3];
    log_min[i] = datedata[4];
    log_second[i] = datedata[5];
    log_dst[i] = recvdata["isdst"+k];
  }

	if (parseInt(log_result_count) < parseInt(LOGTABLE))
	{
		search_textsearch_log_display(0, parseInt(log_result_count) - 1);	// 濡쒓�媛 ?���붿移몄�蹂�곷떎.
	}
	else
	{
		if ( parseInt(log_curr_pos[0]) != 0 )
		{
			if ( parseInt(log_curr_pos[1]) + parseInt(LOGTABLE) > parseInt(log_result_count))
			{
				search_textsearch_log_display(parseInt(log_curr_pos[0]) + parseInt(LOGTABLE), parseInt(log_result_count) - 1);
			}
			else
			{
				search_textsearch_log_display(parseInt(log_curr_pos[0]) + parseInt(LOGTABLE), parseInt(log_curr_pos[1]) + parseInt(LOGTABLE));
			}
		}
		else
		{
			search_textsearch_log_display(0, parseInt(LOGTABLE) - 1);
		}
	}
}

function search_update_searchbyevent_load(recvText)
{
	var thisform = document.searchsetting_searchbytime;
	var recvdata = recv_encode(recvText);

	var year, month, day, hour, minute, second;

	// supportPos hide code is in playback.htm file.
	// if((INFO_VENDOR == 'TAKENAKA') && (INFO_MODEL).indexOf('IPX')>0
	//   || INFO_VENDOR == 'VIDECON'
	//   || INFO_VENDOR == 'KB_DEVICE') {
	//     $('.supportPos').empty();
	// }

	year = recvdata["year"];
	month = recvdata["month"];
	day = recvdata["day"];
	hour = recvdata["hour"];
	minute = recvdata["min"];
	second = recvdata["sec"];

	var fromdayelem = document.getElementById("fromday");
	makeSelectBoxNomal(fromdayelem, null, 1, search_date_get_days_in_month(month, year));
	var todayelem = document.getElementById("today");
	makeSelectBoxNomal(todayelem, null, 1, search_date_get_days_in_month(month, year));

	if (setAttrSelectedID( "toyear", year) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "tomonth", month) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "today", day) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "tohour", hour) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "tominute", minute) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "tosecond", second) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "fromyear", year) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "frommonth", month) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "fromday", day) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "fromhour", 0) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "fromminute", 0) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "fromsecond", 0) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "logsort", 1) == false )
	{
		return false;
	}

	/*var chdiv = document.getElementById("chdiv");
	var chlist = chdiv.getElementsByTagName("input");
	for (var i = 0; i < chlist.length; i++)
	{
		chlist[i].checked = true;
	}
	*/
	var eventdiv = document.getElementById("eventdiv");
  var eventlist = eventdiv.getElementsByTagName("input");

	for (var i = 0; i < eventlist.length; i++)
	{
		eventlist[i].checked = true;
	}

	tzidx = INFO_TIMEZONE;

	if (!tzidx)
	{
		tzidx = 29;
	}
}

function search_update_searchbytextsearch_load(recvText)
{
	var thisform = document.searchsetting_searchbytime;
	var recvdata = recv_encode(recvText);

	var year, month, day, hour, minute, second;

	year = recvdata["year"];
	month = recvdata["month"];
	day = recvdata["day"];
	hour = recvdata["hour"];
	minute = recvdata["min"];
	second = recvdata["sec"];

	var fromdayelem = document.getElementById("fromday");
	makeSelectBoxNomal(fromdayelem, null, 1, search_date_get_days_in_month(month, year));
	var todayelem = document.getElementById("today");
	makeSelectBoxNomal(todayelem, null, 1, search_date_get_days_in_month(month, year));

	if (setAttrSelectedID( "toyear", year) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "tomonth", month) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "today", day) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "tohour", hour) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "tominute", minute) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "tosecond", second) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "fromyear", year) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "frommonth", month) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "fromday", day) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "fromhour", 0) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "fromminute", 0) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "fromsecond", 0) == false )
	{
		return false;
	}

	if (setAttrSelectedID( "logsort", 1) == false )
	{
		return false;
	}

	/*var chdiv = document.getElementById("chdiv");
	var chlist = chdiv.getElementsByTagName("input");
	for (var i = 0; i < chlist.length; i++)
	{
		chlist[i].checked = true;
	}
	*/
	var eventdiv = document.getElementById("eventdiv");

	tzidx = INFO_TIMEZONE;

	if (!tzidx)
	{
		tzidx = 29;
	}
}

function search_update_searchbyevent_dst(recvText)
{
  var thisform = document.searchsetting_searchbytime;
	var recvdata = recv_encode(recvText);

  search_by_event_dston = recvdata["ctime"];
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

  get_passwd_flag = true;
}
/******************************************************************/

/*********************************************************
 function : act_updateData ()
 description : ?�뜲?�듃 蹺꾪��?�닔
 parameter1 : (recvText : receive ?곗씠??
***********************************************************/
function search_updateData(recvText)
{
	if (cmdselect == 1 || cmdselect == 2)
	{
		search_update_searchbytime(recvText);
	}
	else if (cmdselect == 3)
	{
		search_update_searchbyevent(recvText);
	}
	else if (cmdselect == 4)
	{
		search_update_searchbyevent_load(recvText);
	}
	else if (cmdselect == 5)
	{
		search_update_searchbyevent_dst(recvText);
	}
	else if (cmdselect == 6)
	{
		update_login_passwd(recvText);
	}
  else if (cmdselect == 7) {
    search_update_searchbytextsearch(recvText);
  }
  else if (cmdselect == 8) {
		search_update_searchbytextsearch_load(recvText);
  }
  else if (cmdselect == 9) {
    search_update_searchbytextsearch_dst(recvText);
  }
}

/*********************************************************
 function : act_updatePage ()
 description : ?�뜲?�듃 ?�닔
 requestflag : ?붿껌 以묒�吏 ?꾨땶吏 ?뺤씤 ?����
***********************************************************/
function search_updatePage()
{
	if (request.readyState == 4)
	{
		if (request.status == 200)
		{
			var recvText = request.responseText;

			if (recvText != null)
			{
				if (recvText.indexOf("No Permission Error!") >= 0)
				{
					requestflag = false;
					sendcompleteflag = false;
					onClickSearchStop();
					GetSearchPlaytimeStop();
					alert(errNoPermission);
					window.location.pathname = 'html/live.htm';
					return;
				}
				else if ( recvText.indexOf("Send Error!") >= 0  )
				{
					if(fail_check >= 2)
						alert(errSend);
					fail_check++;
				  onClickSearchStop();
				  GetSearchPlaytimeStop();
				}
				else
		    {
    		  search_updateData(recvText);
    		  sendcompleteflag = false;
				}

				if ( (sendcompleteflag == true) && (complete_no_massge == false) )
				{
					alert(errComplete);
					sendcompleteflag = false;
				}
			}
			else
			{
				alert(errReceive);
			}
		}
		else if(request.status == 404)
		{
			self.location='../error/e404.htm';
		}

		complete_no_massge = false;
		requestflag = false;
		sendcompleteflag = false;
		var dvrrunning = document.getElementById("printMsg");
		clearText(dvrrunning);

		cmdselect = 0;
	}
}


//******************************************************************
//*?붿껌 Get/Set Send************************************************
function search_get_search_search_searchbytime(request, thisform, sendbuf)
{
	var resolution = 600;
	var count = 144;
	var split_channel = 1;

	sendbuf += "&" + "resolution" + "=" + escape(parseInt(resolution));
	sendbuf += "&" + "count" + "=" + escape(parseInt(count));
	sendbuf += "&" + "split_channel" + "=" + escape(parseInt(split_channel));

	var dst = INFO_DST;
	sendbuf += "&" + "dst" + "=" + escape(parseInt(dst));

	return sendbuf;
}

function search_set_search_search_searchbytime(request, thisform, sendbuf)
{
	var resolution = 600;
	var count = 144;
	var split_channel = 1;

	sendbuf += "&" + "year" + "=" + escape(parseInt(btime['y']));
	sendbuf += "&" + "month" + "=" + escape(parseInt(btime['m']));
	sendbuf += "&" + "day" + "=" + escape(parseInt(btime['d']));
  sendbuf += "&" + "hour" + "=" + 2;
  sendbuf += "&" + "hour" + "=" + escape(parseInt(btime['h']));
  sendbuf += "&" + "minute" + "=" + escape(parseInt(btime['mn']));
	sendbuf += "&" + "second" + "=" + escape(parseInt(btime['s']));

	sendbuf += "&" + "resolution" + "=" + escape(parseInt(resolution));
	sendbuf += "&" + "count" + "=" + escape(parseInt(count));
	sendbuf += "&" + "split_channel" + "=" + escape(parseInt(split_channel));

	var dst = INFO_DST;
	sendbuf += "&" + "dst" + "=" + escape(parseInt(dst));

	//alert("INFO_DST["+INFO_DST+"]DST_STATUS["+DST_STATUS+"]day["+btime['d']+"]hour["+btime['h']+"]min["+btime['mn']+"]sec["+btime['s']+"]");
	return sendbuf;
}

function search_set_search_search_searchbyevent(request, thisform, sendbuf)
{
	var eventdiv = document.getElementById("eventdiv");
	var eventlist = eventdiv.getElementsByTagName("input");

	for (var i = 0; i < eventlist.length; i++)
	{
		if (eventlist[i].id != "allevent")
		{
			if (eventlist[i].checked == true)
			{
				sendbuf += "&" + eventlist[i].id + "=" + "1";
			}
			else
			{
				sendbuf += "&" + eventlist[i].id + "=" + "0";
			}
		}
	}

	var searchtimediv = document.getElementById("searchtimediv");
	var timelist = searchtimediv.getElementsByTagName("select");

	if ( log_btn_flag == 'search' )
	{
		log_count = 0;

		for (var i = 0; i < timelist.length; i++)
		{
			sendbuf += "&" + timelist[i].id + "=" + escape(timelist[i].value);
		}
		log_curr_pos[0] = 0;
		log_curr_pos[1] = 0;
	}
	else if ( log_btn_flag == 'pagedown' )
	{
		var logsortelem = document.getElementById("logsort");

		sendbuf += "&" + logsortelem.id + "=" + escape(logsortelem.value);

		if (parseInt(logsortelem.value) == 1 )
		{
			for (var i = 0; i < timelist.length; i++)
			{
				var strid = timelist[i].id;

				if ( strid.substring(0, 4) == 'from')
				{
					sendbuf += "&" + timelist[i].id + "=" + escape(timelist[i].value);
				}
			}

			sendbuf += "&" + "toyear" + "=" + escape(btnsearch[0]);
			sendbuf += "&" + "tomonth" + "=" + escape(btnsearch[1]);
			sendbuf += "&" + "today" + "=" + escape(btnsearch[2]);
			sendbuf += "&" + "tohour" + "=" + escape(btnsearch[3]);
			sendbuf += "&" + "tominute" + "=" + escape(btnsearch[4]);
			sendbuf += "&" + "tosecond" + "=" + escape(btnsearch[5]);
		}
		else
		{
			for (var i = 0; i < timelist.length; i++)
			{
				var strid = timelist[i].id;

				if ( strid.substring(0, 2) == 'to')
				{
					sendbuf += "&" + timelist[i].id + "=" + escape(timelist[i].value);
				}
			}

			sendbuf += "&" + "fromyear" + "=" + escape(btnsearch[0]);
			sendbuf += "&" + "frommonth" + "=" + escape(btnsearch[1]);
			sendbuf += "&" + "fromday" + "=" + escape(btnsearch[2]);
			sendbuf += "&" + "fromhour" + "=" + escape(btnsearch[3]);
			sendbuf += "&" + "fromminute" + "=" + escape(btnsearch[4]);
			sendbuf += "&" + "fromsecond" + "=" + escape(btnsearch[5]);
		}
	}

	var dst = INFO_DST;
	sendbuf += "&" + "dst" + "=" + escape(dst);

	log_btn_flag = 'search';

	return sendbuf;
}

function search_set_search_search_searchbytextsearch(request, thisform, sendbuf)
{
	for(var i=0;i<3;i++){
  	sendbuf += "&" + "search_str"+i+"=" + $("#search_text"+i).val();
	}

  if($("#matchcase").is(":checked") == true)
    sendbuf += "&" + "match_case=" + "1";
  else
    sendbuf += "&" + "match_case=" + "0";
  if($("#matchwhole").is(":checked") == true)
    sendbuf += "&" + "match_whole=" + "1";
  else
    sendbuf += "&" + "match_whole=" + "0";

  sendbuf += "&" + "count=" + "24";

  for(var i = 0; i < INFO_DVRCHANNEL; i++) {
    if($("#search_ch"+i).is(":checked") == true)
        sendbuf += "&" + "search_ch" + i + "=" + "1";
    else
        sendbuf += "&" + "search_ch" + i + "=" + "0";
  }

	var searchtimediv = document.getElementById("searchtimediv");
	var timelist = searchtimediv.getElementsByTagName("select");

	if ( log_btn_flag == 'search' )
	{
    log_id = 0;
    log_id_overflow = 0;
		log_count = 0;

		for (var i = 0; i < timelist.length; i++)
		{
			sendbuf += "&" + timelist[i].id + "=" + escape(timelist[i].value);
		}
		log_curr_pos[0] = 0;
		log_curr_pos[1] = 0;
    sendbuf += "&" + "log_id" + "=" + log_id;
    sendbuf += "&" + "log_id_overflow" + "=" + log_id_overflow;
	}
	else if ( log_btn_flag == 'pagedown')
	{

		var logsortelem = document.getElementById("logsort");
		sendbuf += "&" + logsortelem.id + "=" + escape(logsortelem.value);

		if (parseInt(logsortelem.value) == 1 )
		{
			for (var i = 0; i < timelist.length; i++)
			{
				var strid = timelist[i].id;

				if ( strid.substring(0, 4) == 'from')
				{
					sendbuf += "&" + timelist[i].id + "=" + escape(timelist[i].value);
				}
			}

      sendbuf += "&" + "toyear" + "=" + escape(btnsearch[0]);
      sendbuf += "&" + "tomonth" + "=" + escape(btnsearch[1]);
      sendbuf += "&" + "today" + "=" + escape(btnsearch[2]);
      sendbuf += "&" + "tohour" + "=" + escape(btnsearch[3]);
      sendbuf += "&" + "tominute" + "=" + escape(btnsearch[4]);
      sendbuf += "&" + "tosecond" + "=" + escape(btnsearch[5]);

      sendbuf += "&" + "log_id" + "=" + log_id;
      sendbuf += "&" + "log_id_overflow" + "=" + log_id_overflow;
		}
		else
		{
			for (var i = 0; i < timelist.length; i++)
			{
				var strid = timelist[i].id;

				if ( strid.substring(0, 2) == 'to')
				{
					sendbuf += "&" + timelist[i].id + "=" + escape(timelist[i].value);
				}
			}

			sendbuf += "&" + "fromyear" + "=" + escape(btnsearch[0]);
			sendbuf += "&" + "frommonth" + "=" + escape(btnsearch[1]);
			sendbuf += "&" + "fromday" + "=" + escape(btnsearch[2]);
			sendbuf += "&" + "fromhour" + "=" + escape(btnsearch[3]);
			sendbuf += "&" + "fromminute" + "=" + escape(btnsearch[4]);
			sendbuf += "&" + "fromsecond" + "=" + escape(btnsearch[5]);

      sendbuf += "&" + "log_id" + "=" + log_id;
      sendbuf += "&" + "log_id_overflow" + "=" + log_id_overflow;

		}
	}

	var dst = INFO_DST;
	sendbuf += "&" + "dst" + "=" + escape(dst);

	log_btn_flag = 'search';


	return sendbuf;
}
function search_get_search_search_searchbyevent(request, thisform, sendbuf)
{
	var dst = INFO_DST;
	sendbuf += "&" + "dst" + "=" + escape(dst);

	return sendbuf;
}
function search_get_search_search_searchbytextsearch(request, thisform, sendbuf)
{
	var dst = INFO_DST;
	sendbuf += "&" + "dst" + "=" + escape(dst);

	return sendbuf;
}

function search_get_search_search_searchbytextsearch_dst(request, thisform, sendbuf)
{
	var dst = INFO_DST;
	sendbuf += "&" + "dst" + "=" + escape(dst);

	return sendbuf;
}

function search_get_search_search_searchbyevent_dst(request, thisform, sendbuf)
{
	sendbuf += "&" + "ctime" + "=" + escape(search_by_event_time);

	return sendbuf;
}

function get_login_passwd(request, thisform, sendbuf)
{
	return sendbuf;
}
/******************************************************************/

/*********************************************************
 function : act_send ()
 description : ?붿껌蹺꾪��?�닔
 parameter1 : (request : ?붿껌媛앹��
 parameter2 : (thisform : ?붿껌?????��� parameter3 : (cmd : ?붿껌 �ㅻ?
 requestflag : ?붿껌 以묒�吏 ?꾨땶吏 ?뺤씤 ?����
***********************************************************/
function search_send(request, thisform, cmd)
{
	if ( request == null || checkform(thisform) == false || cmd == null)
	{
		return false;
	}

	var sendbuf = cmd;

	if (cmd == "action=set_search&menu=search.searchsetting_searchbytime")
	{
		sendbuf = search_set_search_search_searchbytime(request, thisform, sendbuf);
		cmdselect = 1;
		sendcompleteflag = true;
	}
	else  if (cmd == "action=get_search&menu=search.searchsetting_searchbytime")
	{
		sendbuf = search_get_search_search_searchbytime(request, thisform, sendbuf);
		cmdselect = 2;
	}
	else  if (cmd == "action=set_search&menu=search.searchsetting_searchbyevent")
	{
		sendbuf = search_set_search_search_searchbyevent(request, thisform, sendbuf);
		cmdselect = 3;
	}
	else  if (cmd == "action=get_search&menu=search.searchsetting_searchbyevent")
	{
		sendbuf = search_get_search_search_searchbyevent(request, thisform, sendbuf);
		cmdselect = 4;
	}
	else  if (cmd == "action=get_search&menu=search.searchsetting_searchbyevent_dst")
	{
		sendbuf = search_get_search_search_searchbyevent_dst(request, thisform, sendbuf);
		cmdselect = 5;
	}
	else if (cmd == "action=get_info&menu=login.passwd")
	{
		sendbuf = get_login_passwd(request, thisform, sendbuf);
		cmdselect = 6;
	}
  else if (cmd == "action=set_search&menu=search.searchsetting_searchbytextsearch") {
		sendbuf = search_set_search_search_searchbytextsearch(request, thisform, sendbuf);
    cmdselect = 7;
  }
  else if (cmd == "action=get_search&menu=search.searchsetting_searchbytextsearch") {
		sendbuf = search_get_search_search_searchbytextsearch(request, thisform, sendbuf);
    cmdselect = 8;
  }
  else if (cmd == "action=get_search&menu=search.searchsetting_searchbytextsearch_dst") {
		sendbuf = search_get_search_search_searchbytextsearch_dst(request, thisform, sendbuf);
    cmdselect = 9;
  }

	requestflag = true;

	if ( requestflag == true)
	{
		var dvrrunning = document.getElementById("printMsg");
		replaceText(dvrrunning, msgWait + msgRunning);
	}

	request.send(sendbuf);
}

/*********************************************************
 function : act_postSetup ()
 description : ?붿껌 ?�닔
 parameter1 : (thisform : ?붿껌?????��� parameter2 : (cmd : ?붿껌 �ㅻ?
 requestflag : ?붿껌 以묒�吏 ?꾨땶吏 ?뺤씤 ?����
***********************************************************/
function search_postSetup(thisform, cmd)
{
	if ( requestflag == true)
	{
		var dvrrunning = document.getElementById("printMsg");
		replaceText(dvrrunning, msgWait + msgRunning + msgalready);
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

	request.onreadystatechange = search_updatePage;
	request.open("POST", "/cgi-bin/webra_fcgi.fcgi", true);
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	search_send(request, thisform, cmd);
}

/**********************************************************/
/*ActiveX Controll ****************************************/
/*
1. 諛곗 1, 2, 4, 5, 16, 32, 64?�2. ?��?�옉(>) : 1諛곗�줈 ?�옉 (??��??�씪)
3. FF, RF 諛곗?��(>>)(<<):
	(>)?��以묒��?諛섎? 諛⑺��諛곗?�� ?�옉 ? ?�뒗??
	媛숈? 諛⑺��?��?諛곗?��?利앷? ?�떎. (>)(>>)
	諛곗?깻�?>> 4諛곗 諛섎? 諛⑺��諛곗?�� 諛곗媛먯�瑜??�떎. (<< 2諛곗
4. Pause (||) :
	?�쾲 ?꾨Ⅴ��?��?硫덉?
	?�쾲 ???꾨Ⅴ��?�떆 ?꾩옱 諛곗?곹깭��諛곗?깕떎.
	?�컲 ?��(<)(>)踰꾪??꾨Ⅴ��諛⑺����?��??�떎.
*/
/**********************************************************/
function SearchPlay(direct)
{
	if (btime['y'] == null || btime['m'] == null || btime['d'] == null || btime['h'] == null || btime['mn'] == null || btime['s'] == null)
	{
		return;
	}

	var timezone = tzarray[tzidx];

	var year = btime['y'];
	var mon = btime['m'];
	var day = btime['d'];
	var hour = btime['h'];
	var min = btime['mn'];
	var sec = btime['s'];

    if ( direct == 'forward' )
    {
        if ( udate_time['h'] != null && udate_time['mn'] != null )
        {
            if ( (parseInt(udate_time['y']) == parseInt(year)) && (parseInt(udate_time['m']) == parseInt(mon)) &&
        	        (parseInt(udate_time['d']) == parseInt(day)) && (parseInt(udate_time['h']) == parseInt(hour)) &&
        	        (parseInt(udate_time['mn']) == parseInt(min)) )
        	{
        	    min -= 2;
        	}
        }
    }

    if ( DST_ON_TIME == false )
    {
        if ( parseInt(DST_STATUS) == parseInt(DST_END_DAY) )
        {
            hour--;
        }
    }

    //alert("year["+parseInt(year)+"]mon["+parseInt(mon)+"]day["+parseInt(day)+"]hour["+parseInt(hour)+"]btime["+parseInt(min)+"]");
	//alert("udate_time_y["+parseInt(udate_time['y'])+"]udate_time_m["+parseInt(udate_time['m'])+"]udate_time_d["+parseInt(udate_time['d'])+"]udate_time_h["+parseInt(udate_time['h'])+"]udate_time_mn["+parseInt(udate_time['mn'])+"]");

    if (parseInt(INFO_DST))
	{
        if ( parseInt(DST_STATUS) == parseInt(DST_DST_DAY) )
        {
            hour--;
        }
        else if ( parseInt(DST_STATUS) == parseInt(DST_START_DAY) )
        {
            if ( dst_start_prvday )
            {
                day++;
            }
            hour--;

        }
    	else if ( parseInt(DST_STATUS) == parseInt(DST_END_DAY) )
        {
            var uptime;

            if (parseInt(DST_TIME_MIN) > 0)
            {
                var curtime
                uptime = (parseInt(DST_TIME_POS) * 3600) + (parseInt(DST_TIME_MIN) * 60) - 1;

                if ( DST_ON_TIME )
                {
                    curtime = (parseInt(hour)*3600) + (parseInt(min)*60) + parseInt(btime['s']);
                }
                else
                {
                    curtime = ((parseInt(hour)+1)*3600) + (parseInt(min)*60) + parseInt(btime['s']);
                }

                if ( parseInt(DST_TIME_POS) == parseInt(hour) )
                {
                    if (DST_ON_TIME)
                    {
                        hour--;
                    }
                }
                else if ( parseInt(uptime) > parseInt(curtime) )
                {
                    hour--;
                }
                else if ( parseInt(hour) == (parseInt(DST_TIME_POS) + 1) )
                {
                    if ( (parseInt(min) * 60 + parseInt(sec)) < (parseInt(DST_TIME_MIN) * 60) )
                    {
                        hour--;
                    }
                }

            }
            else
            {
                uptime = (parseInt(DST_TIME_POS) * 3600) + (59 * 60) + 59;

                var curtime = (parseInt(hour)*3600) + (parseInt(min)*60) + parseInt(btime['s']);

                if ( parseInt(DST_TIME_POS) == parseInt(hour) )
                {
                    if (DST_ON_TIME)
                    {
                        hour--;
                    }
                }
                else if ( parseInt(uptime) > parseInt(curtime) )
                {
                    hour--;
                }
             }
        }
    }

    var t_hour = parseInt(timezone) / 60;
	var t_min = parseInt(timezone) % 60;

    var MinusDate = new Date();

	MinusDate.setFullYear(parseInt(year));
	MinusDate.setMonth(parseInt(mon));
	MinusDate.setDate(parseInt(day));
	MinusDate.setHours(parseInt(hour)+parseInt(t_hour));
	MinusDate.setMinutes(parseInt(min)+parseInt(t_min));
	MinusDate.setSeconds(parseInt(sec));

	year = MinusDate.getFullYear();
	mon = MinusDate.getMonth();
	day = MinusDate.getDate();
	hour = MinusDate.getHours();
	min = MinusDate.getMinutes();
	sec = MinusDate.getSeconds();

	MinusDate = null;

	//alert("year["+year+"]mon["+mon+"]day["+day+"]hour["+hour+"]btime["+btime['mn']+"]btime["+btime['s']+"]");

	var UTCDate = new Date();

	var utctime = UTCDate.setUTCFullYear(parseInt(year));
	utctime = UTCDate.setUTCMonth(parseInt(mon));
	utctime = UTCDate.setUTCDate(parseInt(day));
	utctime = UTCDate.setUTCHours(parseInt(hour));
	utctime = UTCDate.setUTCMinutes(parseInt(min));
	utctime = UTCDate.setUTCSeconds(parseInt(btime['s']));

	var lStartTime = parseInt(utctime) / 1000;

	var endpos;

	utctime = UTCDate.setUTCFullYear(parseInt(btime['y']));
	utctime = UTCDate.setUTCMonth(parseInt(btime['m']));
	utctime = UTCDate.setUTCDate(parseInt(btime['d']));

	utctime = UTCDate.setUTCHours(23);
	utctime = UTCDate.setUTCMinutes(59);
	utctime = UTCDate.setUTCSeconds(59);

	UTCDate = null;

	var lEndTime = parseInt(utctime) / 1000;

	var lSEtime = Array(2);

	lSEtime['lStartTime'] = lStartTime;
	lSEtime['lEndTime'] = lEndTime;

	return lSEtime;
}

function onSearchBackStart()
{
	var direction = 0;
	var nSpeed = 1;

	var lSEtime = Array(2);

	lSEtime = SearchPlay('back');

	onSearchStart(nSpeed, direction, 0, lSEtime['lStartTime']);
	if (browerIE == true)
	{
		GetSearchPlaytime();
	}
}
function restoreActiveX() {
  // $("#itxview").appendTo("div#c_sh_div_search");
	$("#itxview").show();
}

function onClickSearchStart()
{
	if((INFO_DUAL_LOGIN == '1') && (get_id_name != 'ADMIN') && !passwdAuthenticated) {
		// $("#itxview").appendTo("div.hidden");
		$("#itxview").hide();
		$("#dialog_check_auth")
			.data('callstack', onClickSearchStart_after)
			.data('mode', 'dual_login')
			.dialog('open');
	}
  else if (INFO_PASSWORD_CHECK == '1' && passwdAuthenticated == false ) {
    // $("#itxview").appendTo("div.hidden");
		$("#itxview").hide();
    $("#dialog_check_auth").data('callstack', onClickSearchStart_after).dialog('open');
	}
	else {
    onClickSearchStart_after();
  }
}

function onClickSearchStart_after() {
  var direction = 1;
  var nSpeed = 1;

  lSEtime = SearchPlay('forward');

  if ( onSearchStart(nSpeed, direction, lSEtime['lStartTime'], 0) )
  {
		GetSearchPlaytime();
	}
}

function Check_arch_auth()
{

	if ( parseInt(AuthorityCheck('arch')) )
	{
	    return true;
	}
	else
	{
	    return false;
	}
}

function onClickSearchBackupRemotely()
{
	if ( !Check_arch_auth() )
	{
		return;
	}

	if ( get_passwd_flag )
	{
	  if (INFO_PASSWORD_CHECK == '1' && passwdAuthenticated == false ) {
			// $("#itxview").appendTo("div.hidden");
			$("#itxview").hide();
	    $("#dialog_check_auth").data('callstack', onClickSearchBackup_after).dialog('open');
	  } else if(typeof INFO_DUAL_LOGIN != "undefined" && (INFO_DUAL_LOGIN == '1') && (get_id_name != 'ADMIN') && !passwdAuthenticated) {
			// $("#itxview").appendTo("div.hidden");
			$("#itxview").hide();
			$("#dialog_check_auth")
				.data('callstack', onClickSearchStart_after)
				.data('mode', 'dual_login')
				.dialog('open');
		}else {
	    //onClickSearchBackup_after();
			$("#dialog_backup_remotely")
				.dialog("open");
	  }
	}
}

function onClickSearchBackup()
{
	if ( !Check_arch_auth() )
	{
		return;
	}

	if ( get_passwd_flag )
	{
	  if (INFO_PASSWORD_CHECK == '1' && passwdAuthenticated == false ) {
			// $("#itxview").appendTo("div.hidden");
			$("#itxview").hide();
	    $("#dialog_check_auth").data('callstack', onClickSearchBackup_after).dialog('open');
	  } else if(typeof INFO_DUAL_LOGIN != "undefined" && (INFO_DUAL_LOGIN == '1') && (get_id_name != 'ADMIN') && !passwdAuthenticated) {
			// $("#itxview").appendTo("div.hidden");
			$("#itxview").hide();
			$("#dialog_check_auth")
				.data('callstack', onClickSearchStart_after)
				.data('mode', 'dual_login')
				.dialog('open');
	  } else {
	    onClickSearchBackup_after();
	  }
	}
}

function onClickSearchBackup_after() {
  SetCovertSetting(null, true);
  user_info_send_to_activex( get_id_name, get_passwd_name , get_mac_address);
  GetSearchPlaytimeStop();
  var lSEtime = SearchPlay('forward');
  SetBackupEx(lSEtime['lStartTime'], lSEtime['lEndTime']);
}

function onClickSearchStop()
{
	onSearchStop();
}

function SetDisplayMode1(ch)
{
  if( typeof ch != 'string' ) {
    ch = null;
  }

  if (ActiveX_IsConnection() == true)
  {
    if (ch === '0') {
      switch (INFO_DVRCHANNEL) {
        case '4':
          SetSplitMode4();
          return true;
          break;
        case '8':
          SetSplitMode9();
          return true;
          break;
        case '16':
          SetSplitMode16();
          return true;
          break;
        default:
          alert("internal error");
          return false;
          break;
      }
    }

    SetSplitMode1(ch);
    return true;
  }
}

function SetDisplayMode4()
{
  if (browerIE == true)
  {
    var activex = document.getElementById("itxview");

//  if (ActiveX_IsConnection() == true)
//  {
    var ch = document.getElementById("channel");
    ch.value = 0;
    SetSplitMode4();
//  }
  }
}

function SetDisplayMode8()
{
  if (browerIE == true)
  {
    var activex = document.getElementById("itxview");

//  if (ActiveX_IsConnection() == true)
//  {
    var ch = document.getElementById("channel");
    ch.value = 0;
    SetSplitMode8();
//  }
  }
}

function SetDisplayMode9()
{
  if (browerIE == true)
  {
    var activex = document.getElementById("itxview");

//  if (ActiveX_IsConnection() == true)
//  {
    var ch = document.getElementById("channel");
    ch.value = 0;
    SetSplitMode9();
//  }
  }
}

function SetDisplayMode16()
{
  if (browerIE == true)
  {
    var activex = document.getElementById("itxview");

//  if (ActiveX_IsConnection() == true)
//  {
    var ch = document.getElementById("channel");
    ch.value = 0;
    SetSplitMode16();
//  }
  }
}

function SetPlaybackRF()
{
    if (browerIE == true)
	{
		var activex = document.getElementById("itxview");

        if ( _searchbytime_flag == true )
        {
	Fastbackwardplayback();
}
		else
		{
		    if (ActiveX_IsConnection() == true)
    		{
    			Fastbackwardplayback();
    		}
		}
	}
}

function SetPlaybackBackPlay()
{
  if (browerIE == true)
  {
    if (INFO_PASSWORD_CHECK == '1' && passwdAuthenticated == false ) {
			// $("#itxview").appendTo("div.hidden");
			$("#itxview").hide();
      $("#dialog_check_auth").data('callstack', SetPlaybackBackPlay_after).dialog('open');
		} else if(typeof INFO_DUAL_LOGIN != "undefined" && (INFO_DUAL_LOGIN == '1') && (get_id_name != 'ADMIN') && !passwdAuthenticated) {
			// $("#itxview").appendTo("div.hidden");
			$("#itxview").hide();
			$("#dialog_check_auth")
				.data('callstack', onClickSearchStart_after)
				.data('mode', 'dual_login')
				.dialog('open');
    } else {
      SetPlaybackBackPlay_after();
    }
  }
}

function SetPlaybackBackPlay_after() {
  if ( _searchbytime_flag == true )  {
    if (ActiveX_IsConnection() == false) {
      onSearchBackStart();
    } else {
      Backwardplayback();
    }
  } else {
    if (ActiveX_IsConnection() == true) {
      Backwardplayback();
    }
  }
}

function SetPlaybackPause()
{
    if (browerIE == true)
	{
		var activex = document.getElementById("itxview");

		if (ActiveX_IsConnection() == true)
		{
	Playbackpause();
}
	}
}

function SetPlaybackPlay()
{
  if (browerIE == true)
  {
    var activex = document.getElementById("itxview");

    if ( _searchbytime_flag == true )
    {
      if (ActiveX_IsConnection() == false)
      {
        onClickSearchStart();
      }
      else
      {
        ForwardPlayback();
      }
    }
    else
    {
      if (ActiveX_IsConnection() == true)
      {
        ForwardPlayback();
      }
    }
  }
}

function SetPlaybackFF()
{
    if (browerIE == true)
	{
		var activex = document.getElementById("itxview");

		if ( _searchbytime_flag == true )
        {
	Fastforwardplayback();
}
		else
		{
		    if (ActiveX_IsConnection() == true)
    		{
    			Fastforwardplayback();
    		}
		}
	}
}

function Auth_CheckCovert(auth)
{
  var ch = SelectedChannel();
  return !AuthCh_CheckCovert(auth, ch);
}

function SetCapureImage()
{
  if (browerIE == true)
  {
    var activex = document.getElementById("itxview");

    if (ActiveX_IsConnection() == true)
    {
      var ch = document.getElementById("channel");

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

      switch(DisplayCapture(ch.value)) {
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
  }
}

function SetSetting()
{
	ActiveXSetup('search');
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

function SetSpeaker()
{
    var imgelem = document.getElementById("btspeaker");

    if (imgelem)
    {
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
}

function GetSearchPlaytime()
{
	var mtime = MGetPlaytime();

	if ( mtime == null )
	{
	  onSearchStop();
    GetSearchPlaytimeStop();
	  return;
	}

	search_timer = setTimeout(GetSearchPlaytime, 1000);

	if ( parseInt(mtime) == 0 )
	{
		return;
	}

	var timezone = tzarray[tzidx];

	var tmpdate = new Date();

	mtime = parseInt(mtime) - ( 60 * parseInt(timezone) );
	tmpdate.setTime(parseInt(mtime) * 1000);

	var barYear = tmpdate.getUTCFullYear();
	var barMon = tmpdate.getUTCMonth();
	var barDay = tmpdate.getUTCDate();
	var barHour = tmpdate.getUTCHours();
	var barMin = tmpdate.getUTCMinutes();
	var barSec = tmpdate.getUTCSeconds();

	tmpdate = null;

	var hplus = 0;
	var t_min_hplus = 0

	if (parseInt(INFO_DST))
	{
    	if ( parseInt(DST_STATUS) == parseInt(DST_DST_DAY) )
        {
            mtime = parseInt(mtime) + 3600;
        }
        else if ( parseInt(DST_STATUS) == parseInt(DST_START_DAY) )
        {
            var uptime;
            var curtime;
            var prvTimeH = 1;

            if (parseInt(DST_TIME_MIN) > 0)
            {
                uptime = ( (parseInt(DST_TIME_POS)) * 3600) + (parseInt(DST_TIME_MIN) * 60) - 1;
            }
            else
            {
                uptime = (parseInt(DST_TIME_POS) * 3600) + (59 * 60) + 59;
            }

            if ( parseInt(barHour) >= 23 )
            {
                if ( parseInt(btime['d']) > parseInt(barDay) )
                {
                    barHour -= 23;
                    prvTimeH = 0;
                }
            }
            else
            {
                dst_start_prvday = false;
            }

            if ( parseInt(barDay) < parseInt(udate_time['d']) )
            {
                curtime = ((parseInt(barHour)-24) * 3600 ) + (parseInt(barMin)*60) + parseInt(barSec);
            }
            else
            {
                curtime = ((parseInt(barHour)) * 3600 ) + (parseInt(barMin)*60) + parseInt(barSec);
            }

            if ( parseInt(uptime) < parseInt(curtime) )
            {
                mtime = parseInt(mtime) + 3600;
                DST_ON_TIME = true;

                if (parseInt(DST_TIME_MIN) > 0)
                {
                    if (parseInt(barHour) > parseInt(DST_TIME_POS))
                    {
                        t_min_hplus = 1;
                    }
                }
            }
            else
            {
                DST_ON_TIME = false;
                hplus = 1;
            }

        }
    	else if ( parseInt(DST_STATUS) == parseInt(DST_END_DAY) )
        {
            var uptime;
            var prvTimeH = 1;

            if (parseInt(DST_TIME_MIN) > 0)
            {
                uptime = (parseInt(DST_TIME_POS) * 3600) + (parseInt(DST_TIME_MIN) * 60) - 1;

                curtime = ((parseInt(barHour)) * 3600 ) + (parseInt(barMin)*60) + parseInt(barSec);

                if ( parseInt(uptime) < parseInt(curtime) )
                {
                    DST_ON_TIME = false;
                }
                else
                {
                    DST_ON_TIME = true;
                    mtime = parseInt(mtime) + 3600;
                }

                if ( (parseInt(btime['h']) >= 24) && (parseInt(btime['mn']) >= 58) )
                {
                    DST_ON_TIME = false;
                }
            }
            else
            {
                var curtime;

                uptime = (parseInt(DST_TIME_POS) * 3600) + (59 * 60) + 59;

                if ( parseInt(barDay) < parseInt(udate_time['d']) )
                {
                    curtime = ((parseInt(barHour)-23) * 3600 ) + (parseInt(barMin)*60) + parseInt(barSec);
                }
                else
                {
                    curtime = ((parseInt(barHour)) * 3600 ) + (parseInt(barMin)*60) + parseInt(barSec);
                }

                if ( parseInt(uptime) < parseInt(curtime) )
                {
                    DST_ON_TIME = false;
                    hplus = 1;
                }
                else
                {
                    DST_ON_TIME = true;
                    hplus = 1;
                }

                if ( (parseInt(barHour) >= 23) && (parseInt(barDay) == parseInt(udate_time['d'])) )
                {
                   hplus = 0;
                   t_min_hplus = 1;
                }

            }
        }
        else
        {
            DST_ON_TIME = false;
        }
    }

    var searchbardate = new Date();
	searchbardate.setTime(parseInt(mtime) * 1000);

	var barYear = searchbardate.getUTCFullYear();
	var barMon = searchbardate.getUTCMonth();
	var barDay = searchbardate.getUTCDate();
	var barHour = searchbardate.getUTCHours();
	var barMin = searchbardate.getUTCMinutes();
	var barSec = searchbardate.getUTCSeconds();
	searchbardate = null;

	if ( parseInt(hplus) )
  {
	  var rettime = set_hour_change(barYear, barMon, barDay, barHour, barMin, barSec, hplus);
	  barYear = rettime[0];
    barMon = rettime[1];
    barDay = rettime[2];
    barHour = rettime[3];
	}

	if ( parseInt(t_min_hplus) )
	{
	  barHour++;
	}

	if (dst_start_prvday)
	{
    var minus_time = one_day_minus(barDay, barMon, barYear);
    barYear = minus_time[2];
    barMon = minus_time[1];
    barDay = minus_time[0];
	}

  if ( (parseInt(DST_STATUS) == parseInt(DST_END_DAY)) && (parseInt(DST_TIME_MIN) > 0) )
  {
    if ( DST_ON_TIME )
    {
      if ( parseInt(barDay) > parseInt(udate_time['d']) )
      {
        barHour = parseInt(DST_TIME_POS) + 1;
      }
    }
    else
    {
      if ( parseInt(barDay) == parseInt(udate_time['d']) )
      {
        barHour = parseInt(DST_TIME_POS) + 2;
      }
    }
  }

	var yearelem = document.getElementById("year");
	var monthelem = document.getElementById("month");
	var dayelem = document.getElementById("day");
	var hourelem = document.getElementById("hour");
	var minuteelem = document.getElementById("minute");
	var secondelem = document.getElementById("second");

	yearelem.value = barYear;
	monthelem.value = barMon
	dayelem.value = barDay;
	hourelem.value = barHour;
	minuteelem.value = barMin;
	secondelem.value = barSec;

	if (calClicked === false) {
	  onhmsChange();
	}

	if (activexPause === true) {
	  activexPause = false;
	}

	// search_time_display_load();
	var minleng = (parseInt(barHour) * 60) + parseInt(barMin);
	var subname = parseInt(minleng) / 10;
	subname = parseInt(subname);
	var elem = document.getElementById( timelname + 0 + '_' + subname);
	search_ondraw(elem, null);
	search_ondraw(elem, barcolor[1]);
}

function GetSearchPlaytimeStop()
{
	if ( search_timer != null)
	{
		clearTimeout(search_timer);
		search_timer = null;
	}
}

function display_Channel_onChange()
{
	var elem = this;

	SetDisplayMode1(elem.value);
}

///////////////////////////////////////////////////////////////////////////////////
function searchbytime_channel()
{
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

	for (var ch = 1; ch <= parseInt(INFO_DVRCHANNEL); ch++)
	{
		eleopt = document.createElement("option");
		eleopt.setAttribute("value", ch);
		txtNode = document.createTextNode(langArray['LTXT_CHANNEL_CH'+ch]+"("+INFO_CAMTITLE[parseInt(ch)-1]+")");
		eleopt.appendChild(txtNode);
		actChdiv.appendChild(eleopt);
	}

	actChdiv.value = 0;

	if (browerIE == true)
	{
		actChdiv.onchange = display_Channel_onChange;
	}
}

function searchbytime_VichEnDis()
{
  _searchbytime_flag = true;

	var searchbytimeli = document.getElementById("searchbytimeli");
	searchbytimeli.className = "on";
	var searchbyeventli = document.getElementById("searchbyeventli");
	searchbyeventli.className = "off";
	var searchbytextsearchli = document.getElementById("searchbytextdevli");
	searchbytextsearchli.className = "off";

	var searchsetting_searchbytime = document.getElementById("searchsetting_searchbytime");

	var c_sh_div_event_contents = document.getElementById("c_sh_div_event_contents");
  var c_sh_div_text_search_contents = document.getElementById("c_sh_div_text_search_contents");

	if ( c_sh_div_event_contents )
	{
	  var pc_sh_div_event_contents = c_sh_div_event_contents.parentNode;
	  pc_sh_div_event_contents.removeChild(c_sh_div_event_contents);
	}

  if ( c_sh_div_text_search_contents ) {
    var pc_sh_div_text_search_contents = c_sh_div_text_search_contents.parentNode;
    pc_sh_div_text_search_contents.removeChild(c_sh_div_text_search_contents);
  }

	if (searchbytime)
	{
		var searchelem = document.getElementById("c_sh_div_time_contents");

		if (!searchelem)
		{
			searchsetting_searchbytime.appendChild(searchbytime);
		}
	}

	var actChdiv = document.getElementById("channel");

	if (!actChdiv)
	{
		return;
	}
	delElemSelOption(actChdiv);

	for (var ch = 1; ch <= parseInt(INFO_DVRCHANNEL); ch++)
	{
		var eleopt = document.createElement("option");
		eleopt.setAttribute("value", ch);
		var txtNode = document.createTextNode("CH"+ch);
		eleopt.appendChild(txtNode);
		actChdiv.appendChild(eleopt);
	}

	var year = document.getElementById("year");
	createElemSelOption1(year, 2008, 2036);
	var month = document.getElementById("month");
	createElemSelOption2(month, 1, 12);
	var day = document.getElementById("day");
	createElemSelOption1(day, 1, 31);
	var hour = document.getElementById("hour");
	createElemSelOption1(hour, 0, 23);
	var minute = document.getElementById("minute");
	createElemSelOption1(minute, 0, 59);
	var second = document.getElementById("second");
	createElemSelOption1(second, 0, 59);

	var hour = document.getElementById("fromHourPicker");
	createElemSelOption1(hour, 0, 23);
	var minute = document.getElementById("fromMinPicker");
	createElemSelOption1(minute, 0, 59);
	var second = document.getElementById("fromSecPicker");
	createElemSelOption1(second, 0, 59);

	var hour = document.getElementById("toHourPicker");
	createElemSelOption1(hour, 0, 23);
	var minute = document.getElementById("toMinPicker");
	createElemSelOption1(minute, 0, 59);
	var second = document.getElementById("toSecPicker");
	createElemSelOption1(second, 0, 59);

	searchbytime_channel();

	framimage();

	search_searchbytime_OnLoad_func();
}

function searchbyevent_value_init()
{
  log_count = log_result_count = repeat = 0;

	logdispclear();

    for ( var i = 0; i < 100; i++)
    {
    	log_text[i] = null;
    	log_year[i] = null;
    	log_mon[i] = null;
    	log_day[i] = null;
    	log_hour[i] = null;
    	log_min[i] = null;
    	log_second[i] = null;

    	log_ch[i] = null;

    	log_dst[i] = null;
    }

	log_curr_pos[0] = 0;
    log_curr_pos[1] = 0;
}

function searchbyevent_TextSearch() {
  _searchbytime_flag = false;
  onSearchStop();
  GetSearchPlaytimeStop();

  var searchbytimeli = document.getElementById("searchbytimeli");
  searchbytimeli.className = "off";
  var searchbyeventli = document.getElementById("searchbyeventli");
  searchbyeventli.className = "off";
  var searchbytextsearchli = document.getElementById("searchbytextdevli");
  searchbytextsearchli.className = "on";

  var searchsetting_searchbytime = document.getElementById("searchsetting_searchbytime");

  var c_sh_div_time_contents = document.getElementById("c_sh_div_time_contents");
  var c_sh_div_event_contents = document.getElementById("c_sh_div_event_contents");

  if ( c_sh_div_time_contents )
  {
    var pc_sh_div_time_contents = c_sh_div_time_contents.parentNode;
    pc_sh_div_time_contents.removeChild(c_sh_div_time_contents);
  }

  if (c_sh_div_event_contents)
  {
    var pc_sh_div_event_contents = c_sh_div_event_contents.parentNode;
    pc_sh_div_event_contents.removeChild(c_sh_div_event_contents);
  }

  if (searchbytextsearch)
  {
    var searchelem = document.getElementById("c_sh_div_text_search_contents");

    if (!searchelem)
    {
      searchsetting_searchbytime.appendChild(searchbytextsearch);
    }
  }

  for(var ch = 1; ch <= 16; ch++) {
    if(ch > INFO_DVRCHANNEL) {
      $("#cam"+ch).hide();
    }
    else {
      $("#cam"+ch).show();

      $("#cam"+ch).prop("checked", true);

      var eventdiv = document.getElementById("event-check");
      var eventlist = eventdiv.getElementsByTagName("input");
      for (var i = 0; (i-1) < INFO_DVRCHANNEL; i++)
      {
        eventlist[i].checked = true;
      }
    }
  }

  logdispclear();

  var amount = document.getElementById("searchcount");
  createElemSelOption1(amount, 1, 20);

  var toyear = document.getElementById("toyear");
  createElemSelOption1(toyear, 2008, 2036);
  var tomonth = document.getElementById("tomonth");
  createElemSelOption2(tomonth, 1, 12);
  var today = document.getElementById("today");
  createElemSelOption1(today, 1, 31);
  var tohour = document.getElementById("tohour");
  createElemSelOption1(tohour, 0, 23);
  var tominute = document.getElementById("tominute");
  createElemSelOption1(tominute, 0, 59);
  var tosecond = document.getElementById("tosecond");
  createElemSelOption1(tosecond, 0, 59);

  var fromyear = document.getElementById("fromyear");
  createElemSelOption1(fromyear, 2008, 2036);
  var frommonth = document.getElementById("frommonth");
  createElemSelOption2(frommonth, 1, 12);
  var fromday = document.getElementById("fromday");
  createElemSelOption1(fromday, 1, 31);
  var fromhour = document.getElementById("fromhour");
  createElemSelOption1(fromhour, 0, 23);
  var fromminute = document.getElementById("fromminute");
  createElemSelOption1(fromminute, 0, 59);
  var fromsecond = document.getElementById("fromsecond");
  createElemSelOption1(fromsecond, 0, 59);
  search_postSetup(document.searchsetting_searchbytime, "action=get_search&menu=search.searchsetting_searchbytextsearch");

  var logsortList = new Array(2);
  var logsortvalueList = new Array(2);
  logsortList[0] = 1;
  logsortList[1] = 0;

  if(INFO_VENDOR == 'ALSOK') {
    logsortvalueList[0] = langArray["LTXT_COMBO_MENU_FROM_NEAREST"];
    logsortvalueList[1] = langArray["LTXT_COMBO_MENU_FROM_FARTHEST"];
  } else {
	  logsortvalueList[0] = langArray["LTXT_COMBO_MENU_NEAREST"];
	  logsortvalueList[1] = langArray["LTXT_COMBO_MENU_FARTHEST"];
  }

  var logsort = document.getElementById("logsort");
  makeSelectBox(logsort, "logsort", "logsort", logsortvalueList, logsortList, null,"100%", 0, 1);

	$('#search_text1').attr('disabled', true);
	$('#search_text2').attr('disabled', true);

	$('#operation0').attr('disabled', true);
	$('#operation1').attr('disabled', true);

  $('#matchcase').attr('disabled', true);
  $('#matchwhole').attr('disabled', true);

	var text1=0;
	var textlength1=0;
	var text2=0;
	var textlength2=0;

	  $('#search_text0').keyup(function() {
	    text1 = $('#search_text0').val();
	   	textlength1 = text1.length;

	    if(textlength1 > 16) {
	      $('#search_text0').val(text1.substr(0, 15));
	    }


	    if(textlength1 != 0) {
	      $('#matchcase').attr('disabled', false);
	      $('#matchwhole').attr('disabled', false);
	    }
	    else {
	      $('#matchcase').attr('disabled', true);
	      $('#matchwhole').attr('disabled', true);
	    }

			if(textlength1	!=0){
				$('#operation0').attr('disabled',false);
				$('#search_text1').attr('disabled', false);
			}
			else {
				$('#operation0').attr('disabled',true);
			}
	  });

		$('#search_text1').keyup(function() {
		 text2 = $('#search_text1').val();
		 textlength2 = text2.length;

		 if(textlength2 > 16){
			 $('#search_text1').val(text2.substr(0, 15));
		 }

		 if((textlength1!=0 ) && (textlength2 !=0)){
			 $('#operation1').attr('disabled',false);
			 $('#search_text1').attr('disabled', false);
			 $('#search_text2').attr('disabled', false);
		 }
		 else {
			 $('#operation1').attr('disabled',true);
		 }
	 });
}

function searchbyevent_VichEnDis()
{
  _searchbytime_flag = false;

  onSearchStop();
	GetSearchPlaytimeStop();

	var searchbytimeli = document.getElementById("searchbytimeli");
	searchbytimeli.className = "off";
	var searchbyeventli = document.getElementById("searchbyeventli");
	searchbyeventli.className = "on";
	var searchbytextsearchli = document.getElementById("searchbytextdevli");
        searchbytextsearchli.className = "off";

	var searchsetting_searchbytime = document.getElementById("searchsetting_searchbytime");

	var c_sh_div_time_contents = document.getElementById("c_sh_div_time_contents");
        var c_sh_div_text_search_contents = document.getElementById("c_sh_div_text_search_contents");

	if ( c_sh_div_time_contents )
	{
	  var pc_sh_div_time_contents = c_sh_div_time_contents.parentNode;
	  pc_sh_div_time_contents.removeChild(c_sh_div_time_contents);
	}

  if ( c_sh_div_text_search_contents ) {
	  var pc_sh_div_text_search_contents = c_sh_div_text_search_contents.parentNode;
	  pc_sh_div_text_search_contents.removeChild(c_sh_div_text_search_contents);
  }

	if (searchbyevent)
	{
		var searchelem = document.getElementById("c_sh_div_event_contents");

		if (!searchelem)
		{
			searchsetting_searchbytime.appendChild(searchbyevent);
		}
	}

  if(INFO_ALARM_SENSOR != null
    && INFO_ALARM_SENSOR.aout_cam == 0 && INFO_ALARM_SENSOR.aout_dvr == 0) {
    //WHEN ALARM OUT IS NOT EXIST... REMOVING CHECK AND HIDE.
    $("#alarmvent").prop('checked', false);
    $("#alarmevent").hide();
  }

	var toyear = document.getElementById("toyear");
	createElemSelOption1(toyear, 2008, 2036);
	var tomonth = document.getElementById("tomonth");
	createElemSelOption2(tomonth, 1, 12);
	var today = document.getElementById("today");
	createElemSelOption1(today, 1, 31);
	var tohour = document.getElementById("tohour");
	createElemSelOption1(tohour, 0, 23);
	var tominute = document.getElementById("tominute");
	createElemSelOption1(tominute, 0, 59);
	var tosecond = document.getElementById("tosecond");
	createElemSelOption1(tosecond, 0, 59);

	var fromyear = document.getElementById("fromyear");
	createElemSelOption1(fromyear, 2008, 2036);
	var frommonth = document.getElementById("frommonth");
	createElemSelOption2(frommonth, 1, 12);
	var fromday = document.getElementById("fromday");
	createElemSelOption1(fromday, 1, 31);
	var fromhour = document.getElementById("fromhour");
	createElemSelOption1(fromhour, 0, 23);
	var fromminute = document.getElementById("fromminute");
	createElemSelOption1(fromminute, 0, 59);
	var fromsecond = document.getElementById("fromsecond");
	createElemSelOption1(fromsecond, 0, 59);

	var logsortList = new Array(2);
  var logsortvalueList = new Array(2);
	logsortList[0] = 1;
	logsortList[1] = 0;

	if(INFO_VENDOR == 'ALSOK') {
    logsortvalueList[0] = langArray["LTXT_COMBO_MENU_FROM_NEAREST"];
    logsortvalueList[1] = langArray["LTXT_COMBO_MENU_FROM_FARTHEST"];
  } else {
    logsortvalueList[0] = langArray["LTXT_COMBO_MENU_NEAREST"];
    logsortvalueList[1] = langArray["LTXT_COMBO_MENU_FARTHEST"];
  }

  var logsort = document.getElementById("logsort");
  makeSelectBox(logsort, "logsort", "logsort", logsortvalueList, logsortList, null,"100%", 0, 1);

	searchbytime_channel();

	framimage();

	searchbyevent_value_init();

	search_postSetup(document.searchsetting_searchbytime, "action=get_search&menu=search.searchsetting_searchbyevent");
}

function searchtableInit()
{
  var omitformtags=["input", "textarea", "select"];

	omitformtags=omitformtags.join("|");

	function disableselect(e)
	{
		if (omitformtags.indexOf(e.target.tagName.toLowerCase())==-1)
		{
			return false;
		}
	}

	function reEnable()
	{
		return true;
	}

	if (typeof document.onselectstart!="undefined")
	{
		document.onselectstart=new Function ("return false")
	}
	else
	{
		document.onmousedown=disableselect;
		document.onmouseup=reEnable;
	}
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

function SetDzoomin() {
  ActiveXSetDzoomin();
}

function searchInit()
{
	search_postSetup(document.searchsetting_searchbytime, "action=get_info&menu=login.passwd");
  errDisconnectStringInit();
  SetOEMSetting();
  SetInitDisplay();
	$("#channel").val(0);
  SetCamTitle();
  SetCovertSetting();
  SetDatetimeFormat();
  searchtableInit();
  dvr_ledon_postSetup();

  if(INFO_MODEL.indexOf('UTM5X') > 0)
    checkFwUpdateStatus();

	if(browserIE6)
	{
		if(searchtab)
			searchtab.style.marginLeft = 0;
		if(searchbytime)
			searchbytime.style.marginLeft = 0;
		if(searchbyevent)
			searchbyevent.style.marginLeft = 0;
	}

    if ( browerIE == true )
    {
        var activex = document.getElementById("itxview");
   	if(INFO_MODEL.indexOf("IPX") >= 0)
          getXmlFile();

    	if (activex && ActiveX_IsConnection() == true)
    	{
    		activex.SessionClose();
    	}
    }
    if ( parseInt(INFO_DVRREADY) == 0 )
    {
        alert(errFileSystem);
        history.back();
    }

    if ( !parseInt(INFO_EXISTDISK) )
    {
        alert(errNoDisk);
        history.back();
    }

    var itxview = document.getElementById("itxview");

    if (itxview)
      itxview.onmousewheel = mouseWheel;

  if (INFO_VENDOR == 'S1') {
    $("#button_backup").hide();
  }

	$('#dialog_backup_remotely').dialog({
		autoOpen : false,
    modal : true,
    resizable : false,
    draggablel : false,
    title: "EXPORT REMOTELY",
    callstack: null,
    closeOnEscape: false,
    arg: null,
		width: "560px",
		close: function(event, ui) {
			$.scm.Stop();

			$( "#fromDatePicker" ).datepicker( "destroy" );
			$( "#toDatePicker" ).datepicker( "destroy" );

			restoreActiveX(arg);
		},
		open: function(event, ui) {
			var me = $(this);
			arg = me.data('arg');

			$.scm.Start();
			if (!($.scm.isActive('INFY_QUERY_OVER'))) {
				$.scm.RegistCallback('INFY_QUERY_OVER',         	callback_storage_query);
			}

			if (!($.scm.isActive('INFY_QUERY_SUCCESS'))) {
				$.scm.RegistCallback('INFY_QUERY_SUCCESS',      	callback_storage_query);
			}

      if (!($.scm.isActive('INFY_QUERY_NO_VIDEODATA'))) {
				$.scm.RegistCallback('INFY_QUERY_NO_VIDEODATA', 	callback_storage_query);
			}
      if (!($.scm.isActive('INFY_QUERY_ERROR'))) {
				$.scm.RegistCallback('INFY_QUERY_ERROR',        	callback_storage_query);
			}
			if (!($.scm.isActive('INFY_MEDIA_STATUS_CHANGED'))) {
				$.scm.RegistCallback('INFY_MEDIA_STATUS_CHANGED', callback_dev_list_update);
			}
			if (!($.scm.isActive('INFY_BURN_ERASING'))) {
				$.scm.RegistCallback('INFY_BURN_ERASING',     callback_storage_burn_erasing);
			}
      if (!($.scm.isActive('INFY_BURN_EXTRACTING'))) {
				$.scm.RegistCallback('INFY_BURN_EXTRACTING',  callback_storage_burn_extracting);
			}
      if (!($.scm.isActive('INFY_BURN_PROG'))) {
				$.scm.RegistCallback('INFY_BURN_PROG',        callback_storage_burn_prog);
			}
      if (!($.scm.isActive('INFY_BURN_ERROR'))) {
				$.scm.RegistCallback('INFY_BURN_ERROR',       callback_storage_burn_error);
			}
      if (!($.scm.isActive('INFY_BURN_SUCCESS'))) {
				$.scm.RegistCallback('INFY_BURN_SUCCESS',     callback_storage_burn_success);
			}
      if (!($.scm.isActive('INFY_BURN_CANCEL'))) {
				$.scm.RegistCallback('INFY_BURN_CANCEL',      callback_storage_burn_cancel);
			}

			// $("#itxview").appendTo("div.hidden");
			$("#itxview").hide();

			for(var i=(parseInt(INFO_DVRCHANNEL)+1); i<=16; i++) {
				$("#ch_mask_"+i).parent("td").hide();
			}
			$("#archiving_total_size").val("");

			$(".ui-dialog-titlebar-close").hide();

			var fromDate = '' + (parseInt($("#month").val())+1) + '/' + $("#day").val() + '/' + $("#year").val();
			var toDate = '' + (parseInt($("#month").val())+1) + '/' + $("#day").val() + '/' + $("#year").val();

			$('#fromDatePicker').datepicker({
				minDate: new Date(2008, 1 - 1, 1),
				maxDate: new Date(2036, 1 - 1, 1),
				showButtonPanel: true,
				changeMonth: true,
				changeYear: true
			});

			$('#toDatePicker').datepicker({
				minDate: new Date(2008, 1 - 1, 1),
				maxDate: new Date(2036, 1 - 1, 1),
				showButtonPanel: true,
				changeMonth: true,
				changeYear: true
			});

			$('#fromDatePicker').datepicker('setDate', fromDate);
			$('#toDatePicker').datepicker('setDate', toDate);

			switch(INFO_DATEFORMAT) {
				case '0':
					$('#fromDatePicker').datepicker('option', 'dateFormat', 'yy-mm-dd');
					$('#toDatePicker').datepicker('option', 'dateFormat', 'yy-mm-dd');
					break;
				case '1':
					$('#fromDatePicker').datepicker('option', 'dateFormat', 'mm-dd-yy');
					$('#toDatePicker').datepicker('option', 'dateFormat', 'mm-dd-yy');
					break;
				case '2':
					$('#fromDatePicker').datepicker('option', 'dateFormat', 'dd-mm-yy');
					$('#toDatePicker').datepicker('option', 'dateFormat', 'dd-mm-yy');
					break;
				default:
					$('#fromDatePicker').datepicker('option', 'dateFormat', 'yy-mm-dd');
					$('#toDatePicker').datepicker('option', 'dateFormat', 'yy-mm-dd');
					break;
			}

			$("#fromHourPicker").val($("#hour").val());
			$("#fromMinPicker").val($("#minute").val());
			$("#fromSecPicker").val($("#second").val());

			$("#button_export_remotely_cancel").focus();

			$("#toHourPicker").val($("#hour").val());
			$("#toMinPicker").val(parseInt($("#minute").val())+5);
			$("#toSecPicker").val($("#second").val());

			$("#button_export_remotely_query").button('enable');
      $("#button_export_remotely_export").prop("disabled", true);
      $("#button_export_remotely_reserve").prop("disabled", true);

			callback_dev_list_update();
		},
		buttons: [{
			text: "QUERY",
			id: "button_export_remotely_query",
			click: function() {
				$.scm.Start();

				var timezone = tzarray[INFO_TIMEZONE];
				var t_hour = parseInt(timezone) / 60;
				var t_min = parseInt(timezone) % 60;

				var fromDate = $("#fromDatePicker").datepicker("getDate");

				var fromYear = fromDate.getUTCFullYear();
				var fromMonth = parseInt(fromDate.getUTCMonth())+1;
				var fromDay = parseInt(fromDate.getUTCDate())+1;
				var fromHour = $("#fromHourPicker").val();
				var fromMin = $("#fromMinPicker").val();
				var fromSec = $("#fromSecPicker").val();

				var toDate = $("#toDatePicker").datepicker("getDate");

				var toYear = toDate.getUTCFullYear();
				var toMonth = parseInt(toDate.getUTCMonth())+1;
				var toDay = parseInt(toDate.getUTCDate())+1;
				var toHour = $("#toHourPicker").val();
				var toMin = $("#toMinPicker").val();
				var toSec = $("#toSecPicker").val();

				var action = 'action=set_setup&menu=storage.query';

        // action += '&start_timestamp=' + getTimeStamp(zzmvc.current.m.data['start_time'], timezone);
        // action += '&end_timestamp=' + getTimeStamp(zzmvc.current.m.data['end_time'], timezone);
				// action += '&start_timestamp=' + (fromDate.getTime() / 1000);
        // action += '&end_timestamp=' + (toDate.getTime() / 1000);
				action += '&fromYear=' + fromYear;
				action += '&fromMonth=' + fromMonth;
				action += '&fromDay=' + fromDay;
				action += '&fromHour=' + fromHour;
				action += '&fromMin=' + fromMin;
				action += '&fromSec=' + fromSec;

				action += '&toYear=' + toYear;
				action += '&toMonth=' + toMonth;
				action += '&toDay=' + toDay;
				action += '&toHour=' + toHour;
				action += '&toMin=' + toMin;
				action += '&toSec=' + toSec;

        action += '&inc_log=' + ( $("#include_log").prop("checked") ? "1": "0" );
        action += '&inc_codec=' + ( $("#include_codec").prop("checked") ? "1": "0" );
        action += '&ch_mask=' + get_ch_mask();

				$("#button_export_remotely_query").button('disable');

				$.ajax({
          type: "POST",
          url: "/cgi-bin/webra_fcgi.fcgi",
          async: false,
          data: action,
          success: function(response) {
						if(response.indexOf("DVR In Not Live!") >= 0) {
							alert(langArray['LTXT_DVR_NOT_LIVE']);
							$("#button_export_remotely_query").button('enable');
							return false;
						}

            return;
          },
          fail: function(response) {
            $("#button_export_remotely_query").button('enable');
            return;
          }
        });

			}
		}, {
			text: "EXPORT",
			id: "button_export_remotely_export",
			click: function() {
				if(document.getElementById("dialog_export_dev_list").options.length > 0) {
					$("#dialog_export").dialog("open");
				} else {
					alert("Backup device is not connected.");
				}
			}
		}, {
      text: "RESERVE",
      id: "button_export_remotely_reserve",
      click: function() {
        $("#dialog_reserve").dialog("open");
      }
    }, {
			text: langArray["LTXT_CANCEL"],
			id: "button_export_remotely_cancel",
			click: function() {
				restoreActiveX(arg);
				$("#dialog_backup_remotely").dialog("close");
			}
		}]
  })

  $('#dialog_reserve').dialog({
    autoOpen: false,
		modal: true,
		draggable: false,
		title: "RESERVE",
		width: '300px',
		resizable: false,
		closeOnEscape: false,
		autoResize: true,
    me: null,
    open: function(event, ui) {
			$("#dialog_reserve_tag_name").val("");
    },
    close: function(event, ui) {
			$("#dialog_reserve_tag_name").val("");
    },
    buttons: [
      {
        id: "dialog_reserve_ok",
        text: langArray["LTXT_OK"],
        click: function() {

					if($("#dialog_reserve_tag_name").val().replace(/ /gi, "").length <= 0) {
						alert(langArray["LTXT_SYSEVT_ARCHIVE_INPUT_TAG_NAME"]);
						return;
					}

					if(!/^[A-z\-\=\~\\\{\}\.\"\<\>\?\!\@\#\$\%\^\&\*\(\)\_\+\|\:\d]*$/i.test($("#dialog_reserve_tag_name").val())) {
						alert("Invalid character!");
						return;
					}

          var action = 'action=set_setup&menu=storage.reserve';
          action += '&tag=' + $("#dialog_reserve_tag_name").val();
          var responseData = null;

          $.ajax({
            type: "POST",
            url: "/cgi-bin/webra_fcgi.fcgi",
            async: false,
            data: action,
            success: function(response) {
              if(response.indexOf("DVR In Not Live!") >= 0) {
                alert(langArray['LTXT_DVR_NOT_LIVE']);
                return false;
              }

              responseData = encode_to_array(response);

              switch(responseData['result']) {
                case '0':
                  alert(langArray['LTXT_ERR_SUCCESS']);
								break;
								default:
									alert(langArray["LTXT_SYSEVT_ARCHIVE_RESERVE_INTERNAL_ERR"]);
                break;
							}

							$('#archiving_total_size').val("");
							$('#button_export_remotely_export').button('disable');
							$('#button_export_remotely_reserve').button('disable');

							$('#dialog_reserve').dialog("close");

              return;
            },
            fail: function(response) {
							alert(langArray['LTXT_ARCH_ERROR_FAIL']);
							$('#dialog_reserve').dialog("close");
              return;
            }
          });
        }
      }, {
        id: "dialog_reserve_cancel",
        text: langArray["LTXT_CANCEL"],
        click: function() {
          $('#dialog_reserve').dialog("close");
        }
      }
    ]
  });

	$('#dialog_export').dialog({
		autoOpen: false,
		modal: true,
		draggable: false,
		title: langArray['LTXT_EXPORT'],
		width: '300px',
		resizable: false,
		closeOnEscape: false,
		autoResize: true,
		me: null,

		open: function(event, ui) {
			$("#dialog_export_burn").button("enable");
			$("#dialog_export_erase_burn").button("enable");
			$("#dialog_export_cancel").button("enable");

			$("#dialog_export_progressbar").progressbar({
				value: 0
			});

			$("#dialog_export_progress").html("");

			//callback_dev_list_update();

		},
		close: function(event, ui) {
			//$.scm.Stop();
		},
		buttons: [
			{
				id: "dialog_export_burn",
				text: langArray["LTXT_BURN"],
				click: function() {
					$.scm.Start();

					var tag_name = $("#dialog_export_tag_name").val();
					if (tag_name.length == 0) {
						alert(langArray["LTXT_QUERY_NO_TAG_NAME"]);
						return false;
					}

					if (Validator.usrName(tag_name) !== Validator.ERR_VALID_OK) {
						alert(langArray["LTXT_FPS_CHECK"]);
						return false;
					}

					// todo: check ftp

					var action = 'action=set_setup&menu=storage.start_burning';
					action += '&data_format=' + $("#dialog_export_arch_type").val();
					action += '&arch_type=' + '1';
					action += '&arch_id=' + query_info.arch_id
					action += '&media_idx=' + $("#dialog_export_dev_list").val();
					action += '&erase=0';
					action += '&tag=' + $("#dialog_export_tag_name").val();
					action += '&memo=' + $("#dialog_export_memo").val();
					$.ajax({
						type: "POST",
						url: "/cgi-bin/webra_fcgi.fcgi",
						async: false,
						data: action,
						success: function(response) {
							if(response.indexOf("DVR In Not Live!") >= 0) {
								alert(langArray['LTXT_DVR_NOT_LIVE']);
								return false;
							}
							$("#dialog_export_burn").button("disable");
							$("#dialog_export_erase_burn").button("disable");
							$("#dialog_export_cancel").button("disable");

							is_burning = true;
							return;
						},
						fail: function(response) {
							return;
						}
					});

				}
			},
			{
				id: "dialog_export_erase_burn",
				text: langArray["LTXT_ERASE_AND_BURL"],
				click: function() {
					$.scm.Start();

					var tag_name = $("#dialog_export_tag_name").val();
					if (tag_name.length == 0) {
						alert(langArray["LTXT_QUERY_NO_TAG_NAME"]);
						return false;
					}

					if (Validator.usrName(tag_name) !== Validator.ERR_VALID_OK) {
						alert(langArray["LTXT_FPS_CHECK"]);
						return false;
					}

					// todo: check ftp

					var action = 'action=set_setup&menu=storage.start_burning';
					action += '&data_format=' + $("#dialog_export_arch_type").val();
					action += '&arch_type=' + '1';
					action += '&arch_id=' + query_info.arch_id
					action += '&media_idx=' + $("#dialog_export_dev_list").val();
					action += '&erase=1';
					action += '&tag=' + $("#dialog_export_tag_name").val();
					action += '&memo=' + $("#dialog_export_memo").val();
					$.ajax({
						type: "POST",
						url: "/cgi-bin/webra_fcgi.fcgi",
						async: false,
						data: action,
						success: function(response) {
							if(response.indexOf("DVR In Not Live!") >= 0) {
								alert(langArray['LTXT_DVR_NOT_LIVE']);
								return false;
							}
							$("#dialog_export_burn").button("disable");
							$("#dialog_export_erase_burn").button("disable");
							$("#dialog_export_cancel").button("disable");

							is_burning = true;
							return;
						},
						fail: function(response) {
							return;
						}
					});

				}
			},
			{
				id: "dialog_export_cancel",
				text: langArray["LTXT_CANCEL"],
				click: function() {
					$("#dialog_export").dialog("close");

					var action = 'action=set_setup&menu=storage.cancel_burning';
					$.ajax({
						type: "POST",
						url: "/cgi-bin/webra_fcgi.fcgi",
						async: false,
						data: action,
						success: function(response) {
							var array = encode_to_array(response);

							if (array['result'] == '-1') {
								$("#dialog_export").dialog('close');
							} else {
								$('#dialog_pleasewait').dialog("open");
							}
							return;
						},
						fail: function(response) {
							return;
						}
					});
				}
			}
		]
	});

  $('#dialog_check_auth').dialog({
    autoOpen : false,
    modal : true,
    resizable : false,
    draggablel : false,
    title: langArray["LTXT_PASSWORD_CHECK"],
    callstack: null,
    arg: null,
    open: function (event, ui) {
      me = $( this );
      callstack = me.data('callstack');
      arg = me.data('arg');

			this.initCountPasswordInvalid = function(){
				this.count_password_invalid = 5;
			}

			this.initCountPasswordInvalid();

			this.mode = $("#dialog_check_auth").data("mode");
			this.phase = 0;	//phase == 0: check password of login user.
											//phase == 1: check password of other user.

			if(this.mode == 'dual_login') {
				$('#dialog_check_auth').dialog('option', 'title', langArray['LTXT_SETUPMENU_SYS_DOUBLELOGIN']);
			}

			$(".ui-dialog-titlebar-close", ui.dialog | ui).hide();

			$('#input_password').show();
			$("#dual_login_phase1").hide();

			$("#input_password").val("");
			$("#dual_login_password").val("");

			$("#input_password").attr("disabled", false);
			$("#dual_login_user_list").attr("disabled", false);
			$("#dual_login_password").attr("disabled", false);
			$("#check_auth_ok").attr("disabled", false);
			$("#check_auth_cancel").attr("disabled", false);
    },
    buttons: [{
      text : langArray["LTXT_OK"],
			id: "check_auth_ok",
      click : function() {
				var mode = $("#dialog_check_auth").data("mode");
				me = this;
				if(mode != "dual_login") {
        if ($('#input_password').val() != get_passwd_name) {
          alert(langArray["LTXT_INVALID_PASSWORD"]);
          return false;
        }
        passwdAuthenticated = true;
        $(this).dialog('close');
        restoreActiveX();
        $('#input_password').val('')
        callstack(arg);
				} else {
					//dual login scenario
					if(this.phase == 0) {
						if ($('#input_password').val() != get_passwd_name) {
							--me.count_password_invalid;
							alert(langArray["LTXT_INVALID_PASSWORD"]);
							if(me.count_password_invalid <= 0) {
								$("#input_password").attr("disabled", true);
								$("#check_auth_ok").attr("disabled", true);
								$("#check_auth_cancel").attr("disabled", true);
								alert(langArray["LTXT_SETUPMENU_RETRY_AFTER_30SEC"]);
								setTimeout(function(){
									$("#input_password").attr("disabled", false);
									$("#check_auth_ok").attr("disabled", false);
									$("#check_auth_cancel").attr("disabled", false);
									me.initCountPasswordInvalid();
								}, 30*1000);
							}
							return false;
						}
						$('#input_password').hide();
						$("#dual_login_phase1").show();

						$.ajax({
							type: "POST",
							url: "/cgi-bin/webra_fcgi.fcgi",
							async: false,
							data: "action=get_setup&menu=usr.usrauthinfo&flag=1",
							success: function(response) {
								var p = encode_to_array(response);
								var usrcnt = parseInt(p['usrcnt0']);

								if(INFO_ID_INPUT_MODE == 0) {
									$("#dual_login_user").hide();
									$("#dual_login_user_list").show();

									$("#dual_login_user_list").empty();
									for(var i=0; i<usrcnt; i++) {
										if(p['usrid'+i] != get_id_name) {
											$("#dual_login_user_list")
												.append($("<option>")
												.val(p["usrid"+i])
												.html(p["usrid"+i]));
										}
									}
								} else {
									$("#dual_login_user_list").hide();
									$("#dual_login_user").show();
								}

								me.phase = 1;
							},
							fail: function(response) {
								restoreActiveX(arg);
								$("#dialog_check_auth").dialog("close");
							}
						});
					} else {
						var dual_login_id = null;
						var dual_login_password = $("#dual_login_password").val();
						if(INFO_ID_INPUT_MODE == 0) {
							dual_login_id = $("#dual_login_user_list").val();
						} else {
							dual_login_id = $("#dual_login_user").val();
						}

						if(dual_login_password.replace(/\s/gi, "").length == 0) {
							alert(langArray['LTXT_INPUT_PASSWORD']);
						} else {
							$.ajax({
								type: "POST",
								url: "/cgi-bin/webra_fcgi.fcgi",
								async: false,
								data: "action=get_setup&menu=usr.usrcheckpasswd&username="+dual_login_id+"&password="+dual_login_password+"&flag=2",
								success: function(response) {
									var p = encode_to_array(response);

									if(p!=undefined && p['result']==1) {
										callstack(arg);
										restoreActiveX(arg);
										passwdAuthenticated = true;
										$("#dialog_check_auth").dialog("close");
									} else if(p!=undefined && p['result']==0) {
										--me.count_password_invalid;
										alert(langArray["LTXT_ERR_NOPERMISSION"]);
										if(me.count_password_invalid <= 0) {
											$("#dual_login_user_list").attr("disabled", true);
											$("#dual_login_password").attr("disabled", true);
											$("#check_auth_ok").attr("disabled", true);
											$("#check_auth_cancel").attr("disabled", true);
											alert(langArray["LTXT_SETUPMENU_RETRY_AFTER_30SEC"]);
											setTimeout(function(){
												$("#dual_login_user_list").attr("disabled", false);
												$("#dual_login_password").attr("disabled", false);
												$("#check_auth_ok").attr("disabled", false);
												$("#check_auth_cancel").attr("disabled", false);
												me.initCountPasswordInvalid();
											}, 30*1000);
										}
										return false;
									} else if(p!=undefined && p['result']==2) {
										--me.count_password_invalid;
										alert(langArray["LTXT_ENTER_VALID_ID"]);
										if(me.count_password_invalid <= 0) {
											$("#dual_login_user_list").attr("disabled", true);
											$("#dual_login_password").attr("disabled", true);
											$("#check_auth_ok").attr("disabled", true);
											$("#check_auth_cancel").attr("disabled", true);
											alert(langArray["LTXT_SETUPMENU_RETRY_AFTER_30SEC"]);
											setTimeout(function(){
												$("#dual_login_user_list").attr("disabled", false);
												$("#dual_login_password").attr("disabled", false);
												$("#check_auth_ok").attr("disabled", false);
												$("#check_auth_cancel").attr("disabled", false);
												me.initCountPasswordInvalid();
											}, 30*1000);
										}
										return false;
									} else {
										--me.count_password_invalid;
										alert(langArray["LTXT_INVALID_PASSWORD"]);
										if(me.count_password_invalid <= 0) {
											$("#dual_login_user_list").attr("disabled", true);
											$("#dual_login_password").attr("disabled", true);
											$("#check_auth_ok").attr("disabled", true);
											$("#check_auth_cancel").attr("disabled", true);
											alert(langArray["LTXT_SETUPMENU_RETRY_AFTER_30SEC"]);
											setTimeout(function(){
                        switch(array['error_code']) {
                          case '-1': // BRN_CODE_INV_COMMAND
                          case '-3': // BRN_CODE_INV_PARAM
                          case '-7': // BRN_CODE_FAIL
                          case '-8': // BRN_CODE_FAIL_WRITING
                            alert(langArray['LTXT_ARCH_ERROR_FAIL']);
                            break;

                          case '-4': // BRN_CODE_INV_MEDIA
                          case '-2': // BRN_CODE_INV_DEV
                            alert(langArray['LTXT_ARCH_ERROR_DEVICE']);

                          case '-6': // BRN_CODE_NOTERASABLE_MEDIA
                            alert(langArray['LTXT_ARCH_ERROR_NOTERASABLE_MEDIA']);
                            break;

                          case '-5': // BRN_CODE_FULL_MEDIA
                            alert(langArray['LTXT_ARCH_ERROR_FULL_MEDIA']);
                            break;

                          case '-9': // BRN_CODE_NEXT_MEDIA
                            alert(langArray['LTXT_ARCH_ERROR_NEXT_MEDIA']);
                            break;

                          case '-13': // BRN_CODE_CANCELED
                            break;

                          case '-16': // BRN_CODE_FTP_CONN
                            alert(langArray['LTXT_FTP_CODE_CONN']);
                            break;

                          case '-17': // BRN_CODE_FTP_AUTH
                            alert(langArray['LTXT_FTP_CODE_AUTH']);
                            break;

                          case '-18': // BRN_CODE_FTP_FAIL
                            alert(langArray['LTXT_FTP_CODE_FAIL_WRITING']);
                            break;

                          case '-19': // BRN_CODE_FAIL_MULTISESSION
                            alert(langArray['LTXT_ARCH_ERROR_FAIL_MULTISESSION']);
                            break;

                          case '-20': // BRN_CODE_NOTSUPP_MULTISESSION
                            alert(langArray['LTXT_ARCH_ERROR_NOTSUPP_MULTISESSION']);
                            break;

                          default :
                            alert(langArray['LTXT_UNKNOWN_ERROR']);
                            break;
                        }

												$("#dual_login_user_list").attr("disabled", false);
												$("#dual_login_password").attr("disabled", false);
												$("#check_auth_ok").attr("disabled", false);
												$("#check_auth_cancel").attr("disabled", false);
												me.initCountPasswordInvalid();
											}, 30*1000);
										}
										return false;
										//restoreActiveX(arg);
										//passwdAuthenticated = false;
										//$("#dialog_check_auth").dialog("close");
									}
								},
								fail: function(response) {
									restoreActiveX(arg);
									$("#dialog_check_auth").dialog("close");
								}
							});

						}

					}
				}

      }
    },
    {
      text : langArray["LTXT_CANCEL"],
			id: "check_auth_cancel",
      click : function() {
        $(this).dialog('close');
        $('#input_password').val('')
        restoreActiveX(arg);
      }
    }]
  });

}

function callback_dev_list_update() {
	var action = 'action=get_setup&menu=media_list';
	$.ajax({
		type: "POST",
		url: "/cgi-bin/webra_fcgi.fcgi",
		async: false,
		data: action,
		success: function(response) {
			var array = encode_to_array(response);
			var cnt = parseInt(array['count']);

			$("#dialog_export_dev_list").empty();
			for (var i = 0; i < cnt; i += 1) {
				if(array["title_" + i] == "FTP") {continue; }
				$("#dialog_export_dev_list").append(

					$("<option value='" + array["id_" + i] + "'>").html(array["title_" + i])
				);
			}
			return;
		},
		fail: function(response) {
			return;
		}
	});
}

function callback_storage_burn_erasing(result, data) {
	var array = encode_to_array(data);
	var str = sprintf(langArray["LTXT_PROGRESS_ERASING"], array['rate']);
	$("#dialog_export_progress").html(str)
	$("#dialog_export_progressbar").progressbar({value: parseInt(array['rate'])});
}

function callback_storage_burn_extracting(result, data) {
	var array = encode_to_array(data);
	var str = sprintf(langArray["LTXT_PROGRESS_EXTRACTING"], array['rate']);
	$("#dialog_export_progressbar").progressbar({value: parseInt(array['rate'])});
	$("#dialog_export_progress").html(str)
}

function callback_storage_burn_prog(result, data) {
	var array = encode_to_array(data);
	var str = sprintf(langArray["LTXT_PROGRESS_BURNING"], array['rate']);
	$("#dialog_export_progressbar").progressbar({value: parseInt(array['rate'])});
	$("#dialog_export_progress").html(str);
	$("#dialog_export_cancel").button("enable");
}

function callback_storage_burn_error(result, data) {
	var array = encode_to_array(data);
	switch(array['error_code']) {
		case '-1': // BRN_CODE_INV_COMMAND
		case '-3': // BRN_CODE_INV_PARAM
		case '-7': // BRN_CODE_FAIL
		case '-8': // BRN_CODE_FAIL_WRITING
			alert(langArray['LTXT_ARCH_ERROR_FAIL']);
			break;

		case '-4': // BRN_CODE_INV_MEDIA
		case '-2': // BRN_CODE_INV_DEV
			alert(langArray['LTXT_ARCH_ERROR_DEVICE']);

		case '-6': // BRN_CODE_NOTERASABLE_MEDIA
			alert(langArray['LTXT_ARCH_ERROR_NOTERASABLE_MEDIA']);
			break;

		case '-5': // BRN_CODE_FULL_MEDIA
			alert(langArray['LTXT_ARCH_ERROR_FULL_MEDIA']);
			break;

		case '-9': // BRN_CODE_NEXT_MEDIA
			alert(langArray['LTXT_ARCH_ERROR_NEXT_MEDIA']);
			break;

		case '-13': // BRN_CODE_CANCELED
			break;

		case '-16': // BRN_CODE_FTP_CONN
			alert(langArray['LTXT_FTP_CODE_CONN']);
			break;

		case '-17': // BRN_CODE_FTP_AUTH
			alert(langArray['LTXT_FTP_CODE_AUTH']);
			break;

		case '-18': // BRN_CODE_FTP_FAIL
			alert(langArray['LTXT_FTP_CODE_FAIL_WRITING']);
			break;

		case '-19': // BRN_CODE_FAIL_MULTISESSION
			alert(langArray['LTXT_ARCH_ERROR_FAIL_MULTISESSION']);
			break;

		case '-20': // BRN_CODE_NOTSUPP_MULTISESSION
			alert(langArray['LTXT_ARCH_ERROR_NOTSUPP_MULTISESSION']);
			break;

		default :
			alert(langArray['LTXT_UNKNOWN_ERROR']);
			break;
	}

	$("#dialog_export_burn").button("enable");
	$("#dialog_export_erase_burn").button("enable");
	$("#dialog_export_cancel").button("enable");
	$("#dialog_export_progress").html("");
	$("#dialog_export_progressbar").progressbar({value: 0});
}

function callback_storage_burn_success(result, data) {
	//$.scm.Stop();

	var array = encode_to_array(data);
	var str = sprintf(langArray["LTXT_PROGRESS_BURNING"], 100);
	$("#dialog_export_progressbar").progressbar({value: 100});
	$("#dialog_export_progress").html(str);
	alert(langArray['LTXT_ARCH_SUCCESS']);
	$("#dialog_export").dialog("close");
	$("#dialog_backup_remotely").dialog("close");
}

function callback_storage_burn_cancel(result, data) {
	$("#dialog_export_burn").button("enable");
	$("#dialog_export_erase_burn").button("enable");
	$("#dialog_export_cancel").button("enable");
	$("#dialog_export_progress").html("");
	$('#dialog_pleasewait').dialog("close");
	$("#dialog_export_progressbar").progressbar({value: 0});
}

function callback_storage_query(result, data) {
	//$.scm.Stop();
	var array = encode_to_array(data);
	var enable_export_button = false;

	query_info = array;

	switch(array['result']) {
		case 'success':
			enable_export_button = true;
			break;
		case 'over':
			enable_export_button = true;
			alert(langArray['LTXT_QUERY_OVER']);
			break;
		case 'no_video':
			alert(langArray['LTXT_QUERY_NO_VIDEODATA']);
			enable_export_button = false;
		case 'error':
			enable_export_button = false;
			break;
		default:
			enable_export_button = false;
			break;
	}

	$("#archiving_total_size").val(array['total_size']);
	if (parseFloat(array['total_size']) <= 0) {
		alert(langArray["LTXT_QUERY_NO_DATA"]);
		enable_export_button = false;
	}

	$("#button_export_remotely_query").button('enable');

	if (enable_export_button) {
    $("#button_export_remotely_export").button('enable');
    $("#button_export_remotely_reserve").button('enable');
	} else {
    $("#button_export_remotely_export").button('disable');
    $("#button_export_remotely_reserve").button('disable');
	}
	return;
}

function get_ch_mask() {
	var ch_mask = 0;

	for (var i = 1 ; i <= INFO_DVRCHANNEL ; i += 1) {
		if ($("#ch_mask_" + i).prop("checked")) {
			ch_mask |= 1 << (i - 1);
		}
	}

	return ch_mask;
}

function GetSearchQuery(strName)
{
  var oLocation = location.href;

  if(oLocation.indexOf('?') > 0)
    {
    var strUri = oLocation.split('?');
    var strParam = strUri[1].split('&');

    for(var i=0; i<strParam.length; i++)
        {
      if(strParam[i].indexOf('=') > 0)
      {
        var strQuery = strParam[i].split('=');
        if(strQuery[0] == strName)
          return strQuery[1];
      }
    }
  }
    return "";
}

function fireEvent(element, event)
  {
    if (document.createEventObject)
    {
       // dispatch for IE
      var evt = document.createEventObject();
      return element.fireEvent('on'+event,evt)
    }
    else
    {
      // dispatch for firefox + others
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true ); // event type,bubbling,cancelable
      return !element.dispatchEvent(evt);
    }
}

function directPlayBack()
{
  if (speakerinit == true) {
    var oLocation = String(location.href);
    var query = oLocation.substr(oLocation.indexOf("start_time") , oLocation.length - oLocation.indexOf("start_time") );
    var query = query.split('&');
    var startTime, ch;

    if (query[0] != undefined) {
      startTime = query[0].split('=')[1];
    }

    var pbYear = parseInt(startTime.substr(0,4));
    var pbMonth = parseInt(startTime.substr(4,2));
    var pbDay = parseInt(startTime.substr(6,2));
    var pbHour = parseInt(startTime.substr(8,2));
    var pbMinute = parseInt(startTime.substr(10,2));
    var pbSecond = parseInt(startTime.substr(12,2));

    var utcTD = new Date();
    utcTD.setUTCFullYear(pbYear);
    utcTD.setUTCMonth(pbMonth - 1);
    utcTD.setUTCDate(pbDay);
    utcTD.setUTCHours(pbHour);
    utcTD.setUTCMinutes(pbMinute);
    utcTD.setUTCSeconds(pbSecond);
    utcTD.setUTCMilliseconds(0);

    var timezone = tzarray[tzidx];
    var t_hour = parseInt(timezone) / 60;
    var t_min = parseInt(timezone) % 60;

    utcTD.setUTCMinutes(utcTD.getUTCMinutes() + utcTD.getTimezoneOffset());
    utcTD.setUTCHours(utcTD.getUTCHours() - t_hour);
    utcTD.setUTCMinutes(utcTD.getUTCMinutes() - t_min);

    $("#year").val(utcTD.getFullYear().toString());
    $("#month").val(utcTD.getMonth().toString());
    $("#day").val(utcTD.getDate().toString());
    $("#hour").val(utcTD.getHours().toString());
    $("#minute").val(utcTD.getMinutes().toString());
    $("#second").val(utcTD.getSeconds().toString());

    onymdChange();
    onhmsChange();
    onClickSearchStart();

    if (query[1] != undefined) {
      ch = query[1].split('=');
      if (ch[0] == "ch") {
        SetSplitMode1(ch[1] + 1)
      }
    }
  }
  else
  {
    setTimeout("directPlayBack()", 1000);
  }
}

function start_time_check() {
  var query_name = "start_time";
  if (browerIE == true && GetSearchQuery(query_name) != "")
  {
    directPlayBack();
  }
}

function playback_pos_display(lStartTime) {

	var activex = document.getElementById("itxview");
	var curCh = SelectedChannel();

	var timezone = tzarray[tzidx];

	var tmpdate = new Date();

	mtime = parseInt(lStartTime) - ( 60 * parseInt(timezone) );
	tmpdate.setTime(parseInt(mtime) * 1000);

	var fromYear = tmpdate.getUTCFullYear();
	var fromMon = tmpdate.getUTCMonth();
	var fromDay = tmpdate.getUTCDate();
	var fromHour = tmpdate.getUTCHours();
	var fromMin = tmpdate.getUTCMinutes();
	var fromSec = tmpdate.getUTCSeconds();

	tmpdate = null;

	var hplus = 0;
	var t_min_hplus = 0

	if (parseInt(INFO_DST))
	{
		if ( parseInt(DST_STATUS) == parseInt(DST_DST_DAY) )
			{
				mtime = parseInt(mtime) + 3600;
			}
			else if ( parseInt(DST_STATUS) == parseInt(DST_START_DAY) )
			{
				var uptime;
				var curtime;
				var prvTimeH = 1;

				if (parseInt(DST_TIME_MIN) > 0)
				{
					uptime = ( (parseInt(DST_TIME_POS)) * 3600) + (parseInt(DST_TIME_MIN) * 60) - 1;
				}
				else
				{
					uptime = (parseInt(DST_TIME_POS) * 3600) + (59 * 60) + 59;
				}

				if ( parseInt(fromHour) >= 23 )
				{
					if ( parseInt(btime['d']) > parseInt(fromDay) )
					{
						fromHour -= 23;
						prvTimeH = 0;
					}
				}
				else
				{
					dst_start_prvday = false;
				}

				if ( parseInt(fromDay) < parseInt(udate_time['d']) )
				{
					curtime = ((parseInt(fromHour)-24) * 3600 ) + (parseInt(fromMin)*60) + parseInt(fromSec);
				}
				else
				{
					curtime = ((parseInt(fromHour)) * 3600 ) + (parseInt(fromMin)*60) + parseInt(fromSec);
				}

				if ( parseInt(uptime) < parseInt(curtime) )
				{
					mtime = parseInt(mtime) + 3600;
					DST_ON_TIME = true;

					if (parseInt(DST_TIME_MIN) > 0)
					{
						if (parseInt(fromHour) > parseInt(DST_TIME_POS))
							{
								t_min_hplus = 1;
							}
					}
				}
				else
				{
					DST_ON_TIME = false;
					hplus = 1;
				}

			}
    	else if ( parseInt(DST_STATUS) == parseInt(DST_END_DAY) )
        {
					var uptime;
					var prvTimeH = 1;

					if (parseInt(DST_TIME_MIN) > 0)
					{
						uptime = (parseInt(DST_TIME_POS) * 3600) + (parseInt(DST_TIME_MIN) * 60) - 1;

						curtime = ((parseInt(fromHour)) * 3600 ) + (parseInt(fromMin)*60) + parseInt(fromSec);

						if ( parseInt(uptime) < parseInt(curtime) )
						{
							DST_ON_TIME = false;
						}
						else
						{
							DST_ON_TIME = true;
							mtime = parseInt(mtime) + 3600;
						}

						if ( (parseInt(btime['h']) >= 24) && (parseInt(btime['mn']) >= 58) )
						{
							DST_ON_TIME = false;
						}
					}
					else
					{
						var curtime;

						uptime = (parseInt(DST_TIME_POS) * 3600) + (59 * 60) + 59;

						if ( parseInt(fromDay) < parseInt(udate_time['d']) )
						{
							curtime = ((parseInt(fromHour)-23) * 3600 ) + (parseInt(fromMin)*60) + parseInt(fromSec);
						}
						else
						{
							curtime = ((parseInt(fromHour)) * 3600 ) + (parseInt(fromMin)*60) + parseInt(fromSec);
						}

						if ( parseInt(uptime) < parseInt(curtime) )
						{
							DST_ON_TIME = false;
							hplus = 1;
						}
						else
						{
							DST_ON_TIME = true;
							hplus = 1;
						}

						if ( (parseInt(fromHour) >= 23) && (parseInt(fromDay) == parseInt(udate_time['d'])) )
						{
							hplus = 0;
							t_min_hplus = 1;
						}

					}
        }
        else
        {
					DST_ON_TIME = false;
        }
	}

	var fromTime = new Date();
	var toTime = new Date();

	fromTime.setTime(parseInt(mtime) * 1000);
	toTime.setTime(parseInt(mtime+120) * 1000);

	var fromYear = fromTime.getUTCFullYear();
	var fromMon = fromTime.getUTCMonth();
	var fromDay = fromTime.getUTCDate();
	var fromHour = fromTime.getUTCHours();
	var fromMin = fromTime.getUTCMinutes();
	var fromSec = fromTime.getUTCSeconds();
	fromTime = null;

	var toYear = toTime.getUTCFullYear();
	var toMon = toTime.getUTCMonth();
	var toDay = toTime.getUTCDate();
	var toHour = toTime.getUTCHours();
	var toMin = toTime.getUTCMinutes();
	var toSec = toTime.getUTCSeconds();
	toTime = null;

	if ( parseInt(hplus) )
  {
		var retFromTime = set_hour_change(fromYear, fromMon, fromDay, fromHour, fromMin, fromSec, hplus);
		var retToTime = set_hour_change(toYear, toMon, toDay, toHour, toMin, toSec, hplus);

		fromYear = retFromTime[0];
    fromMon = retFromTime[1];
    fromDay = retFromTime[2];
		fromHour = retFromTime[3];
		toYear = retToTime[0];
    toMon = retToTime[1];
    toDay = retToTime[2];
    toHour = retToTime[3];
	}

	if ( parseInt(t_min_hplus) )
	{
		fromHour++;
		toHour++;
	}

	if (dst_start_prvday)
	{
		var minus_fromTime = one_day_minus(fromDay, fromMon, fromYear);
		var minus_toTime = one_day_minus(toDay, toMon, toYear);
    fromYear = minus_fromTime[2];
    fromMon = minus_fromTime[1];
		fromDay = minus_fromTime[0];
		toYear = minus_toTime[2];
    toMon = minus_toTime[1];
    toDay = minus_toTime[0];
	}

  if ( (parseInt(DST_STATUS) == parseInt(DST_END_DAY)) && (parseInt(DST_TIME_MIN) > 0) )
  {
    if ( DST_ON_TIME )
    {
      if ( parseInt(fromDay) > parseInt(udate_time['d']))
      {
				fromHour = parseInt(DST_TIME_POS) + 1;
				toHour = parseInt(DST_TIME_POS) + 1;
			}
    }
    else
    {
      if ( parseInt(fromDay) == parseInt(udate_time['d']) )
      {
				fromHour = parseInt(DST_TIME_POS) + 2;
				toHour = parseInt(DST_TIME_POS) + 2;
      }
    }
  }

	var action = 'action=set_search&menu=search.searchsetting_searchbyevent';
	action += '&' + 'systemevent' + '=' + 0;
	action += '&' + 'setupevent' + '=' + 0;
	action += '&' + 'motionevent' + '=' + 0;
	action += '&' + 'smartevent' + '=' + 0;
	action += '&' + 'alarmvent' + '=' + 0;
	action += '&' + 'vlossevent' + '=' + 0;
	action += '&' + 'recordevent' + '=' + 0;
	action += '&' + 'netevent' + '=' + 0;
	action += '&' + 'posevent' + '=' + 1;
	action += '&' + 'fromyear' + '=' + fromYear;
	action += '&' + 'frommonth' + '=' + fromMon;
	action += '&' + 'fromday' + '=' + fromDay;
	action += '&' + 'fromhour' + '=' + fromHour;
	action += '&' + 'fromminute' + '=' + fromMin;
	action += '&' + 'fromsecond' + '=' + fromSec;
	action += '&' + 'toyear' + '=' + toYear;
	action += '&' + 'tomonth' + '=' + toMon;
	action += '&' + 'today' + '=' + toDay;
	action += '&' + 'tohour' + '=' + toHour;
	action += '&' + 'tominute' + '=' + toMin;
	action += '&' + 'tosecond' + '=' + toSec;
	action += '&' + 'logsort' + '=' + 0;
	action += '&' + 'dst' + '=' + parseInt(INFO_DST);

	$.ajax({
		type: "POST",
		url: "/cgi-bin/webra_fcgi.fcgi",
		async: false,
		data: action,
		success: function(response) {
			var responseData = encode_to_array(response);

			if (posdata_to_activex != null) {
				clearInterval(posdata_to_activex);
			}

			posdata_to_activex = setInterval(function() {
				var curTime = MGetPlaytime();

				if(curTime == 0 || curTime == null ) {
					return;
				}

				if(activex.GetLayout() == 0) {

					// console.log("Get Activex Time : " + curTime);
					// console.log("POS DATA Start Time : " + responseData["timestamp0"]);
					// console.log("POS DATA End Time : " + responseData["timestamp"+(responseData.result_count-1)]);
					var posText = "";
					for(var i = 0; i < responseData.result_count; i ++) {
						if(responseData["timestamp" + i] == curTime && responseData["log" + i].split(":")[0].split("!")[4] == curCh + 1) {
							posText != 0 ? posText += "\n" : posText += "";
							posText += responseData["log" + i].split(":")[1];
						}

						if(responseData["timestamp" + (responseData.result_count - 1)] < curTime || responseData["timestamp" + i] > curTime) {
							break;
						}
					}
					// console.log("posText :" + posText);
					if(posText != 0 && posBeforeTime != curTime) {
						activex.PosDataUpdate(curTime, posText, curCh);
					}
					posBeforeTime = curTime;
				}

				if(responseData["timestamp" + (responseData.result_count - 1)] <= curTime + 1
				|| responseData["timestamp0"] > curTime
				|| responseData.result_count == 0) {
					playback_pos_display(curTime);
				}
			}, 1000);
		},
		fail: function(response) {
			var curTime = MGetPlaytime();

			if(curTime == 0 || curTime == null ) {
				return;
			}

			playback_pos_display(curTime);
		}
	});
}
