
function print_top_menu(obj, cate)
{ 
  var sub_live = "";
  var sub_playback = "";
  var sub_setup = "";
  var sub_infomation = "";   

  var sub_s_live = "";
  var sub_s_playback = "";
  var sub_s_setup = "";
  var sub_s_infomation = ""; 

  var sub_e_live = "";
  var sub_e_playback = "";
  var sub_e_setup = "";
  var sub_e_infomation = "";    

  /* tab title */
  $.ajax({
    type: "POST",
    url: "/cgi-bin/webra_fcgi.fcgi",
    async: false,
    data: 'action=get_info&menu=sysid.name',
    success: function(response) {
      var array = encode_to_array(response);
      setTitle(array['sysname']);
    },
    fail: function(response) {
    }
  });

  // /* Logo */
  obj.write("<div id='c_g_div_logo'><img src='../images/images/logo.png' onClick='go_home();' height='53'/></div>");

  obj.write("<div id='c_g_div_top'>");

  // /* Category */

  obj.write("<div id='c_g_div_tab'>");
  
  obj.write("<ul>");
  
  if( cate == "LIVE" ) 
  {	
    sub_live = "class='on'";
    sub_s_live = "<span><strong>";
    sub_e_live = "</span></strong>";
  }
  else if (cate == "PLAYBACK")
  {
    sub_playback = "class='on'";
    sub_s_playback = "<span><strong>";
    sub_e_playback = "</span></strong>";
  }
  else if (cate == "SETUP")
  {
    sub_setup = "class='on'";
    sub_s_setup = "<span><strong>";
    sub_e_setup = "</span></strong>";
  }
  else
  {
    sub_infomation = "class='on'";
    sub_s_infomation = "<span><strong>";
    sub_e_infomation = "</span></strong>";
  }

  if ( INFO_VENDOR == "SAMSUNG" )
  {
    obj.write("<li "+ sub_live + "><a href='../html/live_samsung.htm'>"+sub_s_live+"<span id='lang_Live'>Live</span>"+sub_e_live+"</a></li>");
  }
  else
  {
    obj.write("<li "+ sub_live + "><a href='../html/live.htm'>"+sub_s_live+"<span id='lang_Live'>Live</span>"+sub_e_live+"</a></li>");
  }
  if ( browerIE )
  {	
    if (parseInt(INFO_EXISTDISK))
    {	
      obj.write("<li "+ sub_playback + "id='litopsearch'><a href='../html/playback.htm'>"+sub_s_playback+"<span id='lang_Playback'>Playback</span>"+sub_e_playback+"</a></li>");
    }
    else
    {
      obj.write("<li><a onClick='alert(errNoDisk);'><span id='lang_Playback'>Playback</span></a></li>");
    }
  }

  obj.write("<li "+ sub_setup + "id='litopsetup'><a href='../html/setup_cam_title.htm'>"+sub_s_setup+"<span id='lang_Setup'>Setup</span>"+sub_e_setup+"</a></li>");
  obj.write("<li "+ sub_infomation + "><a href='../html/versioninfo.htm'>"+sub_s_infomation+"<span id='lang_Infomation'>Infomation</span>"+sub_e_infomation+"</a></li>");
  obj.write("</ul>");
  obj.write("</div>");
  
  if(INFO_VENDOR.indexOf("I3DVR") < 0) {
    obj.write("<div id='c_g_div_title'><span><span id='lang_ANFWEBRemoteViewer'></span></span></div>");
    obj.write("</div>");
  }
  
  obj.write("</div>");
}

