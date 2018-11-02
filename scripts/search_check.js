
function search_validate_form_searchbyevent(thisform)
{
	if (!document.getElementById)
	{
		return false;
	}

	var msgelement = document.getElementById("errMsg");

	if (getText(msgelement) != null || getText(msgelement) != "")
	{
		clearText(msgelement);
	}

	if (checkform(thisform) == true)
	{
		with (thisform)
		{
			if (!getElementsByTagName)
			{
				return false;
			}

			var ckfromyear = null, ckfrommonth = null, ckfromday = null, ckfromhour = null, ckfromminute = null, ckfromsecond = null;
			var cktoyear = null, cktomonth = null, cktoday = null, cktohour = null, cktominute = null, cktosecond = null;

			var tagselect = getElementsByTagName("select");

			if ( tagselect != null )
			{
				for (var i = 0; i < tagselect.length; i++)
				{
					if ( tagselect[i].id == "logsort" )
					{
						continue;
					}
					if ( tagselect[i].id == "channel" )
					{
						continue;
					}

					if ( tagselect[i].id == "fromyear" )
					{
						ckfromyear = tagselect[i].value;
					}
					else if( tagselect[i].id == "frommonth" )
					{
						ckfrommonth = tagselect[i].value;
					}
					else if( tagselect[i].id == "fromday" )
					{
						ckfromday = tagselect[i].value;
					}
					else if( tagselect[i].id == "fromhour" )
					{
						ckfromhour = tagselect[i].value;
					}
					else if( tagselect[i].id == "fromminute" )
					{
						ckfromminute = tagselect[i].value;
					}
					else if( tagselect[i].id == "fromsecond" )
					{
						ckfromsecond = tagselect[i].value;
					}
					else if ( tagselect[i].id == "toyear" )
					{
						cktoyear = tagselect[i].value;
					}
					else if( tagselect[i].id == "tomonth" )
					{
						cktomonth = tagselect[i].value;
					}
					else if( tagselect[i].id == "today" )
					{
						cktoday = tagselect[i].value;
					}
					else if( tagselect[i].id == "tohour" )
					{
						cktohour = tagselect[i].value;
					}
					else if( tagselect[i].id == "tominute" )
					{
						cktominute = tagselect[i].value;
					}
					else if( tagselect[i].id == "tosecond" )
					{
						cktosecond = tagselect[i].value;
					}
				}

				var ckfromsec = ( parseInt(ckfromyear) * 365 * 60 * 60 * 24 * 30 ) + (parseInt(ckfrommonth) * 60 * 60 * 24 * 30 ) + (parseInt(ckfromday) * 60 * 60 * 24);
				ckfromsec = parseInt(ckfromsec) + ( parseInt(ckfromhour) * 60 * 60 ) + (parseInt(ckfromminute) * 60 ) + (parseInt(ckfromsecond));
				var cktosec = ( parseInt(cktoyear) * 365 * 60 * 60 * 24 * 30 ) + (parseInt(cktomonth) * 60 * 60 * 24 * 30 ) + (parseInt(cktoday) * 60 * 60 * 24);
				cktosec = parseInt(cktosec) + ( parseInt(cktohour) * 60 * 60 ) + (parseInt(cktominute) * 60 ) + (parseInt(cktosecond));

				if ( parseInt(ckfromsec) > parseInt(cktosec) )
				{
					errMsg += errdate + "<br>";

					for (var i = 0; i < 8; i++)
					{
						clearText(document.getElementById("time"+i));
						clearText(document.getElementById("log"+i));
					}
				}
			}

			if (errMsg != "" || errMsg == null)
			{
				replaceHTML(msgelement, errMsg);
				errMsg = "";
				return false;
			}
		}
	}
}

function search_validate_form_searchbytextsearch(thisform)
{
	if (!document.getElementById)
	{
		return false;
	}

	var msgelement = document.getElementById("errMsg");

	if (getText(msgelement) != null || getText(msgelement) != "")
	{
		clearText(msgelement);
	}

	if (checkform(thisform) == true)
	{
		with (thisform)
		{
			if (!getElementsByTagName)
			{
				return false;
			}

			var ckfromyear = null, ckfrommonth = null, ckfromday = null, ckfromhour = null, ckfromminute = null, ckfromsecond = null;
			var cktoyear = null, cktomonth = null, cktoday = null, cktohour = null, cktominute = null, cktosecond = null;

			var tagselect = getElementsByTagName("select");

			if ( tagselect != null )
			{
				for (var i = 0; i < tagselect.length; i++)
				{
					if ( tagselect[i].id == "logsort" )
					{
						continue;
					}
					if ( tagselect[i].id == "channel" )
					{
						continue;
					}

					if ( tagselect[i].id == "fromyear" )
					{
						ckfromyear = tagselect[i].value;
					}
					else if( tagselect[i].id == "frommonth" )
					{
						ckfrommonth = tagselect[i].value;
					}
					else if( tagselect[i].id == "fromday" )
					{
						ckfromday = tagselect[i].value;
					}
					else if( tagselect[i].id == "fromhour" )
					{
						ckfromhour = tagselect[i].value;
					}
					else if( tagselect[i].id == "fromminute" )
					{
						ckfromminute = tagselect[i].value;
					}
					else if( tagselect[i].id == "fromsecond" )
					{
						ckfromsecond = tagselect[i].value;
					}
					else if ( tagselect[i].id == "toyear" )
					{
						cktoyear = tagselect[i].value;
					}
					else if( tagselect[i].id == "tomonth" )
					{
						cktomonth = tagselect[i].value;
					}
					else if( tagselect[i].id == "today" )
					{
						cktoday = tagselect[i].value;
					}
					else if( tagselect[i].id == "tohour" )
					{
						cktohour = tagselect[i].value;
					}
					else if( tagselect[i].id == "tominute" )
					{
						cktominute = tagselect[i].value;
					}
					else if( tagselect[i].id == "tosecond" )
					{
						cktosecond = tagselect[i].value;
					}
				}

				var ckfromsec = ( parseInt(ckfromyear) * 365 * 60 * 60 * 24 * 30 ) + (parseInt(ckfrommonth) * 60 * 60 * 24 * 30 ) + (parseInt(ckfromday) * 60 * 60 * 24);
				ckfromsec = parseInt(ckfromsec) + ( parseInt(ckfromhour) * 60 * 60 ) + (parseInt(ckfromminute) * 60 ) + (parseInt(ckfromsecond));
				var cktosec = ( parseInt(cktoyear) * 365 * 60 * 60 * 24 * 30 ) + (parseInt(cktomonth) * 60 * 60 * 24 * 30 ) + (parseInt(cktoday) * 60 * 60 * 24);
				cktosec = parseInt(cktosec) + ( parseInt(cktohour) * 60 * 60 ) + (parseInt(cktominute) * 60 ) + (parseInt(cktosecond));

				if ( parseInt(ckfromsec) > parseInt(cktosec) )
				{
					errMsg += errdate + "<br>";

					for (var i = 0; i < 8; i++)
					{
						clearText(document.getElementById("time"+i));
						clearText(document.getElementById("ch"+i));
						clearText(document.getElementById("log"+i));
					}
				}
			}

			if (errMsg != "" || errMsg == null)
			{
				replaceHTML(msgelement, errMsg);
				errMsg = "";
				return false;
			}
		}
	}
}



function search_validate_form(thisform, cmd)
{
	var ret = true;

	if (checkform(thisform) != true)
	{
		return;
	}

	if (cmd == "action=set_search&menu=search_str0.searchsetting_searchbyevent")
	{
		ret = search_validate_form_searchbyevent(thisform);
	}

        if (cmd == "action=set_search&menu=search_str0.searchsetting_searchbytextsearch")
        {
                ret = search_validate_form_searchbytextsearch(thisform);
        }

	if (ret == false)
	{
		return false;
	}

	return true;
}
//////////////////////////////////////////////////////////////////////////////
