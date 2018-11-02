var authCheck;

var AuthCheck = function(data, skip) {
    this.isinit = false;
    
    if( data ) {
        this.reset(data, skip);
    }

    var passwdChangeDialog;
    var passwdChecker;
    var css_head = "color:#004879; font-size:12pt; font-weight:bold; text-align:left";

    passwdChangeDialog = $("<div align='center' style='display:none'>")
      .prop("id", "dialog_renew_pwd")
      .prop("title", langArray["LTXT_SETUPCAMINSTALLATION_CAMERA_CONFIG_CHANGE"])
      .addClass("zpopup")
      .html(
        "<input type='hidden' id='pre_password_set' name='pre_password_set' disabled>"
        +"<table>"
          +"<tbody>"
            +"<tr>"
              +"<th style='"+css_head+"''>"
                +"<span>"+langArray["LTXT_CONFIRM_PASSWORD"]+"</span>"
              +"</th>"
              +"<td>"
                +"<input type='password' id='pre_password' name='pre_password' maxlength='16'>"
              +"</td>"
            +"</tr>"
            +"<tr>"
              +"<th style='"+css_head+"''>"
                +"<span>"+langArray["LTXT_NEW_PASSWORD"]+"</span>"
              +"</th>"
              +"<td>"
                +"<input type='password' id='new_password' name='new_password' maxlength='16'>"
              +"</td>"
            +"</tr>"
            +"<tr>"
              +"<th style='"+css_head+"''>"
                +"<span>"+langArray["LTXT_CONFIRM_NEW_PASSWORD"]+"</span>"
              +"</th>"
            +"<td>"
              +"<input type='password' id='confirm_password' name='confirm_password' maxlength='16'>"
            +"</td>"
          +"</tr>"
        +"</tbody>"
      +"</table>")
      .appendTo($("body"));

      passwdChangeDialog.dialog({
        autoOpen: false,
        resizable: false,
        modal: true,
        width: 410,
        open: function(event, ui){
          $("#itxview").hide();
          //get password from local-D.B.
          $.ajax({
            type: "POST",
            url: "/cgi-bin/webra_fcgi.fcgi",
            data: "action=get_live&menu=live.password",
            success: function(request){
              if(request != null)
              {
                if(request.indexOf("No Permission Error!") >= 0)
                {
                  alert(errNoPermission);
                  return;
                }
                else if(request.indexOf("Password Incorrect!") >= 0)
                {
                  alert(langArray["LTXT_INVALID_PASSWORD"]);
                  return;
                }
                var recvdata = recv_encode(request);
                //set passwd to pre_password.
                $("#pre_password_set").val(recvdata['passwd']);
              }
              else
              {
                alert(errReceive);
              }
            }
          });

          //set Interval for checking password is modified.
          passwdChecker = setInterval(
            function(){
              $.ajax({
                type: "POST",
                url: "/cgi-bin/webra_fcgi.fcgi",
                data: "action=get_live&menu=live.passwordcheck&passwd="+$("#pre_password_set").val(),
                success: function(request){
                  if(request != null)
                  {
                    if(request.indexOf("No Permission Error!") >= 0)
                    {
                      alert(errNoPermission);
                      return;
                    }
                    else if(request.indexOf("Password Incorrect!") >= 0)
                    {
                      alert(langArray["LTXT_INVALID_PASSWORD"]);
                      return;
                    }
                    var recvdata = recv_encode(request);
                    if(recvdata['passwd'] == '0')
                    {
                      clearInterval(passwdChecker);
                      passwdChecker = null;
                      $("#dialog_renew_pwd").dialog('close');
                    }
                  }
                  else
                  {
                    alert(errReceive);
                  }
                }
              });
            }, 500);
        },
        close: function(event, ui){
          $("#itxview").show();  
        },
        passwordChangedByLocal: function(param){
          this.dialog('close');
        }
      });

      btn_passwordChange = [
        {
          text: langArray['LTXT_SETUP_APPLY'],
          click:function()
          {
            var pre_password_set = $("#pre_password_set").val();
            var pre_password = $("#pre_password").val();
            var new_password = $("#new_password").val();
            var confirm_password = $("#confirm_password").val();

            if(pre_password.replace(/ /gi, '').length == 0)
            {
              alert(langArray["LTXT_INPUT_PASSWORD"]);
              return;
            }
            
            if(new_password.replace(/ /gi, '').length == 0)
            {
              alert(langArray["LTXT_INPUT_NEW_PASSWORD"]);
              return;
            }

            if(confirm_password.replace(/ /gi, '').length == 0)
            {              
              alert(langArray["LTXT_INPUT_CONFIRM_PASSWORD"]);
              return;
            }

            if(pre_password_set != pre_password) {
              alert(langArray["LTXT_INVALID_PASSWORD"]);
              return;
            }

            if (new_password != confirm_password) 
            {
              alert(langArray["LTXT_DIFF_CONFIRM_PASS"]);
              return;
            }

            //if pre password is same confirm password.
            if ((pre_password_set === pre_password)
              && (pre_password === new_password)
              && (new_password === confirm_password))
            {
              //init input...
              $("#pre_password").val("");
              $("#new_password").val("");
              $("#confirm_password").val("");

              //close dialog for local scenario.
              $(this).dialog('close');

              //set cookie 'no pw expire' to 1 until browser closing.
              //this setting need for local scenario.
              setCookie("no_pw_expire", "1", 1);

              return;
            } 

            //password valid check.
            if(Validator.usrPasswd(pre_password)
              || Validator.usrPasswd(new_password)
              || Validator.usrPasswd(confirm_password))
            {
              //alert(langArray['LTXT_ERR_USERPASSWD']);
              alert(langArray["LTXT_INVALID_PASSWORD"]);
              return;
            }

            //compare password
            if (pre_password_set != pre_password)
            {
              alert(langArray["LTXT_INVALID_PASSWORD"]);
              return;
            }
            else if (new_password != confirm_password) 
            {
              alert(langArray["LTXT_DIFF_CONFIRM_PASS"]);
              return;
            }

            $.ajax({
              type: "POST",
              url: "/cgi-bin/webra_fcgi.fcgi",
              data: "action=set_live&menu=live.password&passwd="+new_password+"&pre_passwd="+pre_password,
              success: function(request)
              {
                if(request != null)
                {
                  if(request.indexOf("No Permission Error!") >= 0)
                  {
                    alert(errNoPermission);
                    return;
                  }
                  else if(request.indexOf("Password Incorrect!") >= 0)
                  {
                    alert(langArray["LTXT_INVALID_PASSWORD"]);
                    return;
                  }
                  else
                  {
                    alert(langArray['LTXT_CONFIGURATION_SAVED']);
                  }

                  var recvdata = recv_encode(request);
                }
                else
                {
                  alert(errReceive);
                }
              }
            });

            //init input...
            $("#pre_password").val("");
            $("#new_password").val("");
            $("#confirm_password").val("");

            $(this).dialog('close');
          }
        },
        {
        text: langArray['LTXT_CANCEL'],
        click:function()
        {
        //init input...
        $("#pre_password").val("");
        $("#new_password").val("");
        $("#confirm_password").val("");

        $(this).dialog('close');
      }
    }
  ];
  passwdChangeDialog.dialog('option', 'buttons', btn_passwordChange);
};

AuthCheck.prototype = {
    setupman: '',
    remoteman: '',
    recsetman: '',
    setupusr: '',
    remoteusr: '',
    recsetusr: '',
    
    login_user: '',
    login_group: '',
    
    _makeDialog: function(contents, before, after) {
      var div;
      div =  $("<div>").prop("id", "zpopup")
        .addClass("zpopup")
        .html(contents)
        .appendTo($("body"));
      
      div.dialog({
        modal: true,
        resizable: false,
        title: langArray['LTXT_USER_PW_EXPIRED_TITLE'],
        open: function(evt, ui) {
          before.call();
          $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
        },
        close: function(evt, ui) {
          after.call();
        }
      });
      
      btn = [
        {
          text: langArray["LTXT_OK"],
          click:function() 
          {
            if( $("#no_pw_expire:checked").val() != "1" ) {
              setTimeout(function(){
                $("#dialog_renew_pwd").dialog('open');
              },
              500);
            }
            $(this).dialog("close");
          }
        }//,
        //{
        //  text: langArray["LTXT_CLOSE"], 
        //  click:function() 
        //  { 
        //    $(this).dialog("close");
        //  }
        //}
      ]
      
      div.dialog("option","buttons",btn);
    },
    checkPwExpired: function(before, after) {
      if( !this.isinit  ) {
        return false;
      }

      //password enable on && password expired.
      if(parseInt(this.pw_enable) == 1 && parseInt(this.pw_expired) == 0 ) {
        var no_pw_expire = getCookie("no_pw_expire");

        if( no_pw_expire != "1" ) {
          var content = "<p style='white-space:pre'>" + langArray['LTXT_USER_PW_EXPIRED'] + "</p>";
          content += "<label><input type='checkbox' id='no_pw_expire' value='1'/>" + langArray['LTXT_USER_PW_DONT_SHOW'] + "</label>";
          this._makeDialog(content, 
            function() {
              if ( typeof before == 'function' ) {
                before.call();
              }
            }, 
            function() {
              if( $("#no_pw_expire:checked").val() == "1" ) {
                setCookie("no_pw_expire", "1", 1);
              }

              if ( typeof after == 'function' ) {
                after.call();
                $("#itxview").show();
              }
            }
          );
        }
      } else if( parseInt(this.pw_expired) > 0 ) {
        if ( typeof before == 'function' ) {
          beforeErr.call();
        }

        var no_pw_change = getCookie("no_pw_change");

        if( no_pw_change != "1" ) {
          var content = sprintf(langArray['LTXT_USER_PW_NEED_CHANGE'], this.pw_expired);
          content += "<label><input type='checkbox' id='no_pw_change' value='1'/>" + langArray['LTXT_USER_PW_DONT_SHOW'] + "</label>";
          this._makeDialog(content, 
            function() {
              if ( typeof before == 'function' ) {
                before.call();
                $("#itxview").hide();
              }
            }, 
            function() {
              if( $("#no_pw_change:checked").val() == "1" ) {
                setCookie("no_pw_change", "1", 1);
              }
              if ( typeof after == 'function' ) {
                after.call();
                $("#itxview").show();
              }
            }
          );
        }
      }

    },
    reset: function(data, skipexpire, before, after) {
        this.setupman = data['setupman'];
        this.remoteman = data['remoteman'];
        this.recsetman = data['recsetman'];
        this.setupusr = data['setupusr'];
        this.remoteusr = data['remoteusr'];
        this.recsetusr = data['recsetusr'];
        
        this.login_user = data['login_user'];
        this.login_group = data['login_group'];
        
        this.pw_expired = parseInt(data['pw_expired']);
        this.pw_enable = parseInt(data['pw_enable']);

        this.isinit = true;        

        if( typeof skipexpire == 'undefined' ) {
          this.checkPwExpired(before, after);
        }
    },
    grpVal : function() {
        if( this.login_group == 'ADMIN' ) {
            return 100;
        } else {
            if( this.login_group == 'MANAGER') {
                return 2;
            } else if( this.login_group == 'USER') {
                return 1;
            }
        }
        
        return 0;
    },
    check: function(type) {
        var ret = false;
        
        var setup;
        var remote;
        var recset;

        if( typeof type == 'undefined' ) {
            error('Group type is failed');
        }
        
        if( !this.isinit ) {
            return false;
        }        
        
        if( this.login_group == 'ADMIN' ) {
            return true;
        } else {
            if( this.login_group == 'MANAGER') {
                setup = this.setupman;
                remote = this.remoteman;
                recset = this.recsetman;
            } else if( this.login_group == 'USER') {
                setup = this.setupusr;
                remote = this.remoteusr;
                recset = this.recsetusr;
            }
        }
        
        if( type == 'setup' ) {
            if ( setup == '1') {
                ret = true;
            }
        } else if ( type == 'remote' ) {
            if ( remote == '1') {
                ret = true;
            }
        } else if ( type == 'recset' ) {
            if ( recset == '1') {
                ret = true;
            }
        } else {
            error('Group type is failed');
            history.back();
        }
        
        return ret;
    }
};
