/**
 * @author chcha
 */

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

function encode_to_array(encode) {
    var sn = '&'; 
    var se = '='; 
    var partdata;
    var retdata = Array();
    var data;

    if (encode == null) {
        return null;
    }    

    if ( (encode.indexOf(sn) < 0) || (encode.indexOf(se) < 0) ) {
        return null;
    }    

    partdata = encode.split(sn);

    for (var i=0, len=partdata.length; i < len; i++) {
        data = partdata[i].split(se);
        //data[1] = URLDecode(data[1]);
        //data[1] = decodeURI(data[1]);
        try {
          data[1] = decodeURIComponent(data[1]);
        } catch(e) {
          // data[1] = data[1];
          data[1] = "-";
        }
        retdata[data[0]] = data[1];
    }
    
    return retdata;
}

function strMod(ori,i,ch){
    return ori.substring(0, parseInt(i)) + 
        ch + 
        ori.substring( parseInt(i) + ch.length, ori.length);
}

/**
 * String.setCharAt
 * 
 * @param idx index
 * @param chr character
 */
String.prototype.setCharAt = function(idx, chr) {
  if( chr.length > 1 ) {
    return this.toString();
  }

  if(idx > this.length - 1){
    return this.toString();
  } else {
    return this.substr(0, idx) + chr + this.substr(idx + 1);
  }
};

function makeSelectSelected(selectObj, value)
{
    var opt = $(selectObj).find("option");

    if( opt.length > 0 ) {
        opt.each( function(index, val) {
            $(this).removeAttr('selected');

            if( $(this).prop('value') == value ) {
                $(this).prop('selected', 'true');
                return;
            }
        } );
    }
}

function makeSelectOptions(selectObj, vals)
{
    $.each(vals, function(val, text) {
        $(selectObj).append(
            $('<option></option>').val(val).html(text)
        );
    });
}


function setListOne(jqobj, val)
{
    var op = jqobj.children('option');
    
    if( !op.length )
        return;
        
    for( var i=0 ; i < op.length ; i++ ) {
        if( $(op[i]).val() == val ) {
            $(op[i]).prop('selected', true);
            break;
        }            
    }
}

function setListByStr(jqobj, str)
{
    var op = jqobj.children('option');
    
    if( !op.length )
        return;
        
    for( var i=0 ; i < op.length ; i++ ) {
        if( str.charAt(i) == '1' ) {
            $(op[i]).prop('selected', true);
        }            
        else 
            $(op[i]).prop('selected', false);
    }    
}

function getStrByList(jqobj, str)
{
    var val = jqobj.val();
    
    if( !str ) {
        return str;
    }
    
    for( i in val ) {
        str = str.setCharAt(parseInt(val[i]), '1');
    }
    
    return str; 
    
}

function setCheckByChar(jqobj, chr)
{
    if( jqobj.length > 0 && jqobj.get(0).type != 'checkbox' )
        return;
    
    var v = ( chr == '1' ? true : false );

    jqobj.prop('checked', v);
    jqobj.change();
}


function isValidKeyVirtualKeyboard(keycode)
{
    if (keycode == 27 ) { 
        // ESC
        return false;
    }

    if ( keycode == 33 || keycode == 94 ) {
        return false;
    }
    
    if ( keycode == 58 || keycode == 59 || keycode == 43 || keycode == 61 || 
        keycode == 44 || keycode == 60 || keycode == 45 || keycode == 62 || keycode == 63 ) {
        return false;
    }
    
    if ( keycode == 96 || keycode == 126 || keycode == 91 || keycode == 123 ||
        keycode == 92 || keycode == 124 || keycode == 93 || keycode == 125 ||
        keycode == 39 || keycode == 34 ) {
        return false;
    }

    return true;        
}

function isValidKeyDomain(keycode)
{
    if (keycode == 27 ) { 
        // ESC
        return false;
    }

    if ( keycode == 33 || keycode == 94 ) {
        return false;
    }
    
    if ( keycode == 58 || keycode == 59 || keycode == 43 || keycode == 61 || 
        keycode == 44 || keycode == 60 || keycode == 95 || keycode == 62 || keycode == 63 ) {
        //45 means _.
        //95 means -.
        return false;
    }
    
    if ( keycode == 96 || keycode == 126 || keycode == 91 || keycode == 123 ||
        keycode == 92 || keycode == 124 || keycode == 93 || keycode == 125 ||
        keycode == 39 || keycode == 34 ) {
        return false;
    }

    return true;        
}

function isValidKeyNumberChar(keycode)
{
    if( !isValidKeyVirtualKeyboard(keycode) )
        return false;
    
    if( (keycode >= 32 && keycode <= 47) || 
         keycode == 64 || keycode == 95 )
         return false;
         
    return true;    
}

function isValidKeyNumber(keycode)
{
    if( !isValidKeyNumberChar(keycode) )
        return false;
    
    if( (keycode >= 65 && keycode <= 90) || 
         (keycode >= 97 && keycode <= 122) )
         return false;
        
    return true;    
}

function isValidKeyEmail(keycode)
{
    if( !isValidKeyVirtualKeyboard(keycode) )
        return false;
        
    return true;        
}

function isValidNumRange(elem, min, max, warn) {
    var checkE = elem;

    if( warn == null ) {
        warn = true;
    }
    
    if (!checkE || (min == null) || (max == null) ) {
        return;
    }

    if (parseInt(checkE.value) < parseInt(min) ) {
        if( warn )
            alert("Error!" + errFieldValLess + "Min[" + min +"] Max [ " + max + "]");
        $(checkE).select().focus();
        
        return false;
    } else if(parseInt(checkE.value) > parseInt(max) ) {
        if( warn )
            alert("Error!" + errFieldLenOver + "Min[" + min +"] Max [ " + max + "]");
        $(checkE).select().focus();

        return false;
    }
    
    return true;
}


function validateEmail(email) 
{
    var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    
    return filter.test(email);
}


function copyArray(dest, src)
{
    for( var idx in src ) {
        dest[idx] = src[idx];
    }
}

/*
function getMillisec()
{
    var date = new Date();

    return date.getSeconds() + '.' + date.getMilliseconds();
}

function debug(obj)
{
    if( typeof console != 'undefined' ) {
        console.log(obj);
    } else {
        $('body').append(obj + '<br>');
    }
}
*/

function procResult(result) {
    if(result != null) {
        if(result.indexOf("No Permission Error!") >= 0) {
            alert(errNoPermission);
            act_ajax_init();
            history.back();
            return false;
        } else if(result.indexOf("DVR In Setup!") >= 0) {
            alert(dvrinsetup);
            return false;
        } else if(result.indexOf("DVR In Arch!") >= 0) {
            alert(dvrinarchive);
            return false;
        } else if(result.indexOf("Send Error!") >= 0) {
            alert(errSend);
            return false;
        } else if(result.indexOf('DVR In Not Live!') >= 0) {
            alert(langArray['LTXT_DVR_NOT_LIVE']);
            return false;
        } else if(result.indexOf('DVR In SCM not ready!') >= 0) {
            alert(langArray['LTXT_ERR_NVR_NOT_READY']);
            return false;
        } else if (result.indexOf("Password is not initiallized!") >= 0) {
            //alert("Password is not initiallized!");
            return false;
        } else {
            alert(errComplete);
        }
    } else {
        alert(errReceive);
    }

    return true;
}

function procResult2(result, isShowAlert) {
    if(result != null) {
        var alertText;
        var isError = false;
        if(result.indexOf("No Permission Error!") >= 0) {
            alert(errNoPermission);
            act_ajax_init();
            history.back();
            return false;
        }
        else if(result.indexOf("DVR In Setup!") >= 0) {
            alertText = dvrinsetup;
            isError = true;
        }
        else if(result.indexOf("DVR In Arch!") >= 0) {
            alertText = dvrinarchive;
            isError = true;
        } else if(result.indexOf("Send Error!") >= 0) {
            alertText = errSend;
            isError = true;
        } else if(result.indexOf('DVR In Not Live!') >= 0) {
            alertText = langArray['LTXT_DVR_NOT_LIVE'];
            isError = true;
        } else if(result.indexOf('DVR In SCM not ready!') >= 0) {
            alertText = langArray['LTXT_ERR_NVR_NOT_READY'];
            isError = true;
        } else if (result.indexOf("Password is not initiallized!") >= 0) {
            //alert("Password is not initiallized!");
            return false;
        }
        else {
            alertText = errComplete;
        }

        if(isShowAlert && isError) {
            alert(alertText);
            return false;
        }
        else if(isError) {
            return false;
        }
        else if(isShowAlert) {
            alert(alertText);
        }

     } else {
         alert(errReceive);
     }

     return true;
}


var disabler = function(event) { 
  event.preventDefault();
}

function channel_enable()
{
    switch ( parseInt(INFO_DVRCHANNEL) ) {
        case 4:
            $('.chenable8').remove();
        case 8:
            $('.chenable16').remove();
        case 16:
        default:
    }

}

var dvrpoke = function() {
    // constructor
    if( this == window ) {
        return new dvrpoke();
    }
    
    if( this.init ) {
        return this;
    }
    
    if ( this.enabled ) {
        this.restart();
        return;
    }
    
    this.start();
    this.init = true;
    
    dvrpoke = this;
}


dvrpoke.prototype = {
    // properties
    init : false,
    enabled: false,
    timerid : null,
    
    // methods
    start : function() {
        this.timerid = window.setTimeout(this.poke, 10000);
    },
    
    stop : function () {
        if (this.timerid != null) {
            clearTimeout(this.timerid);
            this.timerid = null;
        }
    },
    
    restart : function() {
        this.stop();
        this.start();
    },
    
    poke : function() {
        var sendbuf;
    
        this.timerid = window.setTimeout(dvrpoke.poke, 10000);
        sendbuf = "action=dvr&menu=dvrledon";
        jQuery.post('/cgi-bin/webra_fcgi.fcgi', sendbuf);
            
        return;
    }
}

function getMillisec()
{
    var date = new Date();

    return date.getSeconds() + '.' + date.getMilliseconds();
}

function debug(obj)
{
    if( typeof console != 'undefined' ) {
        console.log(obj);
    } else {
        $('body').append(obj + '<br>');
    }
}

function error(obj)
{
    if( typeof console != 'undefined' ) {
        console.error(obj);
    } else {
        $('body').append(obj + '<br>');
    }
}

function form2Array(form) 
{
    var data = {};
    var elements = $(form).get(0).elements;

    // get all the data
    for(var i=0; i<elements.length; i++) {
        var o = elements[i];
        /*
        if((o.type == 'checkbox' || o.type == 'radio') && !o.checked) {
            continue;
        }
        */
        if(o.type == "button") {
            continue;
        }
        if(!o.name) {
            continue;
        }
        if(o.type == "submit" && $(form).get(0).clicked != o) {
            continue;
        }
        if( o.type == 'checkbox' ) {
            if( o.checked ) {
                data[o.name] = '1';
            } else {
                data[o.name] = '0'
            }
            continue;
        }
        
        if( o.type == 'radio') {
            if( o.checked ) {
                data[o.name] = $(o).val();
            }
            continue;
        }
        
        //data[o.name] = $(o).val();
        if($(o).val() != null)
        {
          data[o.name] = $(o).val();  
        }
        //when value of object is null, then subtitute value to 0.
        else
        {
          data[o.name] = 0;
        }
    }
    
    return data;    
}

var networkdisconnect = false;
var disconnect_cnt = 0;
var connect_try_cnt = 0;

function responseIsSuccess()
{
    return request.status == undefined
        || request.status == 0
        || (request.status >= 200 && request.status < 300);
}

function passwordRenewCheckUpdate() {
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
        else if (recvText.indexOf("Password is not initiallized!") >= 0)
        {
          alert(langArray['LTXT_RENEW_PASSWORD_IS_ON_ALERT']);
          self.location.pathname = '/redirect.html'
        }
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

function passwordRenewCheck() {
  if (INFO_VENDOR == 'S1') {
    if (INFO_PASSWORD_RENEW == '1') {
      self.location='change_password.htm';
      return;
    }
  }
  else if(typeof(INFO_PASSWD_CHANGED) != undefined &&INFO_PASSWD_CHANGED == "1")
  {
    if ( requestflag == true)
    {
      return;
    }

    request = createRequest();

    if (request == null)
    {
      alert("Your Browser does not support Ajax!");
      return;
    }

    request.onreadystatechange = passwordRenewCheckUpdate;
    request.open("POST", "/cgi-bin/webra_fcgi.fcgi", true);
    request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    request.setRequestHeader("cache-control","no-cache");
    request.send("action=get_live&menu=live.renewcheck");
  }
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
    if ((arguments.length - 1) < convCount) { matches.length = arguments.length; }
 
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

var tooltip = function(){
  var id = 'tt';
  var top = 3;
  var left = 3;
  var maxw = 300;
  var speed = 10;
  var timer = 20;
  var endalpha = 95;
  var alpha = 0;
  var tt,t,c,b,h;
  var ie = document.all ? true : false;

  return{
    show:function(v,w){
      if(tt == null){
        tt = document.createElement('div');
        tt.setAttribute('id',id);
        t = document.createElement('div');
        t.setAttribute('id',id + 'top');
        c = document.createElement('div');
        c.setAttribute('id',id + 'cont');
        b = document.createElement('div');
        b.setAttribute('id',id + 'bot');
        tt.appendChild(t);
        tt.appendChild(c);
        tt.appendChild(b);
        document.body.appendChild(tt);
        tt.style.opacity = 0;
        tt.style.filter = 'alpha(opacity=0)';
        document.onmousemove = this.pos;
      }
      tt.style.position = 'absolute';
      tt.style.display = 'block';
      c.innerHTML = v;
      tt.style.width = w ? w + 'px' : 'auto';
      if(!w && ie){
        t.style.display = 'none';
        b.style.display = 'none';
        tt.style.width = tt.offsetWidth;
        t.style.display = 'block';
        b.style.display = 'block';
      }
      if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
      h = parseInt(tt.offsetHeight) + top;
      clearInterval(tt.timer);
      tt.timer = setInterval(function(){tooltip.fade(1)},timer);
    },
    pos:function(e){
      var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
      var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
      tt.style.top = (u - h) + 'px';
      tt.style.left = (l + left) + 'px';
    },
    fade:function(d){
      var a = alpha;
      if((a != endalpha && d == 1) || (a != 0 && d == -1)){
        var i = speed;
        if(endalpha - a < speed && d == 1){
          i = endalpha - a;
        }else if(alpha < speed && d == -1){
          i = a;
        }
        alpha = a + (i * d);
        tt.style.opacity = alpha * .01;
        tt.style.filter = 'alpha(opacity=' + alpha + ')';
      }else{
        clearInterval(tt.timer);
        if(d == -1){tt.style.display = 'none'}
      }
    },
    hide:function(){
      clearInterval(tt.timer);
      tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
    }
  };
}();

if (typeof console == "undefined") {
  this.console = { log: function (msg) { } };
}

