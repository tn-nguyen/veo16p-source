function act_validate_required_select(field, valsize)
{
	with (field)
	{
		var errid = chOnePlus(id);
		
		if (value==null || value=="")
		{
			errMsg += "[" + errid + "]" + errFieldEmpty + "<br>";
		  	return false;
		}
		
		if (parseInt(value) > valsize)
		{
			errMsg += "[" + errid + "]" + errFieldLenOver + "<br>";
			return false;
		}
	}
}

function act_validate_form_cam_cam(thisform)
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
			
			var focusflag = false;
				
			var taginput = getElementsByTagName("input");
		
			if ( taginput != null )
			{
				for (var i = 0; i < taginput.length; i++)
				{
					if ( taginput[i].name == "cam_title" )
					{
						if (parseInt(INFO_DVRCHANNEL) <= parseInt(i))
						{
							break;
						}
						
						if (validate_required_text(taginput[i], 8, null, null, null) == false)
						{
							if (focusflag == false)
							{
								taginput[i].focus();
								focusflag = true;
							}
						}
					}
				}
			}	
			
			var tagselect = getElementsByTagName("select");
			
			if ( tagselect != null )
			{
				for (var i = 0; i < tagselect.length; i++)
				{
					if ( tagselect[i].name == "covert" )
					{
						if (parseInt(INFO_DVRCHANNEL) <= parseInt(i))
						{
							break;
						}
					
						if (act_validate_required_select(tagselect[i], 1) == false)
						{
							if (focusflag == false)
							{
								taginput[i].focus();
								focusflag = true;
							}
						}
					}
				    else if ( tagselect[i].name == "audio" )
					{
						if (parseInt(INFO_DVRCHANNEL) <= parseInt(i))
						{
							break;
						}
							
						if (act_validate_required_select(tagselect[i], 16) == false)
						{
							if (focusflag == false)
							{
								taginput[i].focus();
								focusflag = true;
							}
						}
					}
				}
			}
			
			if (errMsg != "" || errMsg == null)
			{
				errMsg = errFieldAsterisk + "<br>" +errMsg;
				replaceHTML(msgelement, errMsg);
				errMsg = "";
				return false;
			}
		}
	}
}

function act_validate_form_cam_color(thisform)
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
			
			var focusflag = false;
				
			var taginput = getElementsByTagName("input");
		
			if ( taginput != null )
			{
				for (var i = 0; i < taginput.length; i++)
				{
					if ( taginput[i].name == "brightness" || taginput[i].name == "contrast" || taginput[i].name == "tint" || taginput[i].name == "color")
					{
						var str = taginput[i].name;
						
						var idname = taginput[i].id;
						
						var ch = idname.substring(str.length, idname.length);
						
						if ( parseInt(ch) >= parseInt(INFO_DVRCHANNEL))
						{
							break;
						}
						
						if (validate_required_text(taginput[i], 3,"number", 100, 0) == false)
						{
							if (focusflag == false)
							{
								taginput[i].focus();
								focusflag = true;
							}
						}
					}
				}
			}	
				
			if (errMsg != "" || errMsg == null)
			{
				errMsg = errFieldAsterisk + "<br>" +errMsg;
				replaceHTML(msgelement, errMsg);
				errMsg = "";
				return false;
			}
		}
	}
}

function act_validate_form_cam_ptz(thisform)
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
			
			var focusflag = false;
				
			var taginput = getElementsByTagName("input");
		
			if ( taginput != null )
			{
				for (var i = 0; i < taginput.length; i++)
				{
					if ( taginput[i].name == "address")
					{
						var str = taginput[i].name;
						
						var idname = taginput[i].id;
						
						var ch = idname.substring(str.length, idname.length);
						
						if ( parseInt(ch) >= parseInt(INFO_DVRCHANNEL))
						{
							break;
						}
							
						if (validate_required_text(taginput[i], 3,"number", 255, 0) == false)
						{
							if (focusflag == false)
							{
								taginput[i].focus();
								focusflag = true;
							}
						}
					}
				}
			}	
			
			var tagselect = getElementsByTagName("select");
			
			if ( tagselect != null )
			{
				for (var i = 0; i < tagselect.length; i++)
				{
					if ( tagselect[i].name == "autofocus" || tagselect[i].name == "autoiris" )
					{
						var str = tagselect[i].name;
						
						var idname = tagselect[i].id;
						
						var ch = idname.substring(str.length, idname.length);
						
						if ( parseInt(ch) >= parseInt(INFO_DVRCHANNEL))
						{
							break;
						}
						
						if (act_validate_required_select(tagselect[i], 1) == false)
						{
							if (focusflag == false)
							{
								taginput[i].focus();
								focusflag = true;
							}
						}
					}
				    else if ( tagselect[i].name == "ptspeed" || tagselect[i].name == "focusspeed" || tagselect[i].name == "zoomspeed" || tagselect[i].name == "irisspeed")
					{
						var str = tagselect[i].name;
						
						var idname = tagselect[i].id;
						
						var ch = idname.substring(str.length, idname.length);
						
						if ( parseInt(ch) >= parseInt(INFO_DVRCHANNEL))
						{
							break;
						}
						
						if (act_validate_required_select(tagselect[i], 10) == false)
						{
							if (focusflag == false)
							{
								taginput[i].focus();
								focusflag = true;
							}
						}
					}
					else if ( tagselect[i].name == "baudrate")
					{
						var str = tagselect[i].name;
						
						var idname = tagselect[i].id;
						
						var ch = idname.substring(str.length, idname.length);
						
						if ( parseInt(ch) >= parseInt(INFO_DVRCHANNEL))
						{
							break;
						}
						
						if (act_validate_required_select(tagselect[i], 115200) == false)
						{
							if (focusflag == false)
							{
								taginput[i].focus();
								focusflag = true;
							}
						}
					}
				}
			}
				
			if (errMsg != "" || errMsg == null)
			{
				errMsg = errFieldAsterisk + "<br>" +errMsg;
				replaceHTML(msgelement, errMsg);
				errMsg = "";
				return false;
			}
		}
	}
}

function act_validate_form(thisform, cmd)
{	
	var ret = true;
	
	if (checkform(thisform) == false || cmd == null)
	{
		return;
	}
	
	if (cmd == "action=set_setup&menu=camera.camera")
	{
		ret = act_validate_form_cam_cam(thisform);
	}
	else if (cmd == "action=set_setup&menu=camera.color")
	{
		ret = act_validate_form_cam_color(thisform);
	}
	else if (cmd == "action=set_setup&menu=camera.ptz")
	{
		ret = act_validate_form_cam_ptz(thisform);
	}
	
	if (ret == false)
	{
		return false;
	}
	
	return true;
}
//////////////////////////////////////////////////////////////////////////////
