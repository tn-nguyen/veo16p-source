/**
 * @author chcha
 */
$z.c({
  UserManage: {
    initEvent: function() {
      var c = this;

      // initialize user dialog
      $( "#user_dialog" ).dialog({
        autoOpen: false,
        modal: true,
        show: 'drop',
        hide: 'drop',
        width: INFO_ENHANCED_PASSWORD == '1' ? '740px' : '450px',
        me: null,
        mode: null,

        open: function(event, ui) {
          me = $( this );
          mode = me.data('mode');

          if(mode == 'add') {
            // hide 'current pw ui' in user add dialog.
            $("#lang_current_pw").parent("th").parent("tr").hide();
          } else {
            // init 'current pw' input.
            $("#passwd_current").val("");
            // show 'current pw ui' in user edit dialog.
            $("#lang_current_pw").parent("th").parent("tr").show();
          }

          if (INFO_ENHANCED_PASSWORD == '1') {
            $( ".passwd_rule" ).show();
          } else {
            $( ".passwd_rule" ).hide();
          }

          if (INFO_ENHANCED_USER_ID == '1') {
            $(".id_rule").show();
          } else {
            $(".id_rule").hide();
          }

          if (mode == 'add') {
            $("#usrid_new").removeAttr('disabled');
            $("#grpname_new").removeAttr('disabled');

            me.dialog('option', 'title', langArray["LTXT_SETUP_ADD"]);
            $("#usrid_new").val("");
            $("#passwd_new").val("");
            $("#confirm_new").val("");
            $("#grpname_new").val("ADMIN");
            $("#email_new").val("");
            $("#noti_new").val("0");
            $("input[name=email_serv]").eq(0).attr("checked", true);
            $("#noti_new").attr('disabled', 'disabled');
            $("#phone_new").val("");
            $("#phone_notify_new").val("0");
            $("#phone_notify_new").attr('disabled', 'disabled');
            for( var i = 0 ; i < INFO_DVRCHANNEL ; i += 1 ) {
              $('#lblcovert_new'+i+' input').prop("checked", false);
            }
            $("input[name=covert_all_new]").prop("checked", false);
            
          } else if (mode == 'edit') {
            var usrManager = c.m.usrManager;
            var usrRow = $(this).data("usrRow");
            var usr = usrManager.users[usrRow];

            me.dialog('option', 'title', langArray["LTXT_EDIT"]);

            if (usrRow == 0) {
              $("#usrid_new").prop('disabled', 'disabled');
              $("#grpname_new").prop('disabled', 'disabled');
            } else {
              $("#usrid_new").removeAttr('disabled');
              $("#grpname_new").removeAttr('disabled');
            }

            $("#usrid_new").val(usr.id);
            //$("#passwd_new").val(usr.passwd);
            $("#passwd_new").val("");
            $("#confirm_new").val("");
            $("#grpname_new").val(usr.grp);
            $("#email_new").val(usr.email);
            $("#noti_new").val(usr.noti ? 1 : 0);
            if ( Validator.email($("#email_new").val()) == Validator.ERR_VALID_OK ) {
              $("#noti_new").removeAttr('disabled');
            } else {
              $("#noti_new").attr('disabled', 'disabled');
            }

            $("input[name=email_serv]").eq(usr.email_serv).attr("checked", true);


            $("#phone_new").val(usr.phone);
            $("#phone_notify_new").val(usr.phone_notify ? 1 : 0);
            if ( Validator.phone($("#phone_new").val()) == Validator.ERR_VALID_OK ) {
              $("#phone_notify_new").removeAttr('disabled');
            } else {
              $("#phone_notify_new").attr('disabled', 'disabled');
            }

            var flag_all_checked = true;
            for( var i=0 ; i < INFO_DVRCHANNEL ; i++ ) {
              if( usr.covert[i] == '1' ) {
                $('#lblcovert_new'+i+' input').prop("checked", true);
              } else {
                $('#lblcovert_new'+i+' input').prop("checked", false);
                flag_all_checked = false;
              }
            }

            if(flag_all_checked) {
              $("input[name=covert_all_new]").prop("checked", true);
            } else {
              $("input[name=covert_all_new]").prop("checked", false);
            }
          } else {
            me.dialog('close');
          }
          c.passwdRuleCheck('#passwd_new', '#usrid_new');
          c.useridRuleCheck('#passwd_new', '#usrid_new');
        },
        buttons: [{
          text : langArray["LTXT_OK"],
          click : function() {
            var usrManager = c.m.usrManager;
            var data = form2Array("#form_new_user");

            var mode = $(this).data("mode");
            var usrRow = $(this).data("usrRow");
            var usr = usrManager.users[usrRow];

            var covert_str = '0000000000000000';
            for( var i=0 ; i < INFO_DVRCHANNEL ; i++ ) {
              if( data['covert'+i+'_new'] == '1' ) {
                covert_str = covert_str.setCharAt(i, '1');
              }
            }
            data['covert_new'] = covert_str;

            if((mode == "edit") && (usrManager.getUsers()[usrRow].passwd != $("#passwd_current").val())) {
              alert(langArray["LTXT_ERR_USERPASSWD"]);
              return;
            }

            if( $("#passwd_new").val() != $("#confirm_new").val()) {
              alert(langArray["LTXT_DIFF_CONFIRM_PASS"]);
              return;
            }

            // if (INFO_ENHANCED_PASSWORD == 0 && $("#passwd_new").val().length < 8) {
              //fix me... this language is translated by google. :(
              // alert("Passwords can be up to 8 characters long");
              // return;
            // }

            if( !c._validate_each("#usrid_new", "#passwd_new", "#email_new", "#phone_new", true) ) {
              return;
            }

            var notiValue;
            if ( $("#noti_new").attr("disabled") == undefined) {
              notiValue = (data['noti_new'] == '0') ? false : true;
            } else {
              notiValue = false;
            }

            var phoneNotifyValue;
            if ( $("#phone_notify_new").attr("disabled") == undefined) {
              phoneNotifyValue = (data['phone_notify_new'] == '0') ? false : true;
            } else {
              phoneNotifyValue = false;
            }

            // if (INFO_ENHANCED_PASSWORD == 0 && $("#passwd_new").val().length > 8) {
            //   //fix me... this language is translated by google. :(
            //   alert("Passwords can be up to 8 characters long");
            //   return;
            // }

            if (mode == 'add') {
              var user = new User({
                id: data['usrid_new'],
                passwd : data['passwd_new'],
                grp : data['grpname_new'],
                covert : data['covert_new'],
                email : data['email_new'],
                noti : notiValue,
                email_serv : 0,
                phone : data['phone_new'],
                phone_notify : phoneNotifyValue,
                pwlastchanged : 0,
                init_pw_changed : 0
              });

              if( usrManager.addUser(user) < 0 ) {
                return;
              }
            } else if (mode == 'edit') {
              usr.id = $("#usrid_new").val();
              usr.passwd = $("#passwd_new").val();
              usr.grp = $("#grpname_new").val();
              usr.email = $("#email_new").val();
              usr.noti = notiValue;
              usr.email_serv = $('input[name=email_serv]:checked').val();
              usr.phone = $("#phone_new").val();
              usr.phone_notify = phoneNotifyValue;
              usr.covert = covert_str;

            } else {
              me.dialog('close');
            }

            c.v.redraw();
            $(this).dialog('close');
          }
        },
        {
          text : langArray["LTXT_CANCEL"],
          click : function() {
            $(this).dialog('close');
          }
        }]
      });
     
      $('#usrid_new').keyup(function(evetn) {
        var data = $("#usrid_new").val();
        $("#usrid_new").val(data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣\~\-\=\{\}\\\.\"\<\>\?\!\@\#\$\%\^\&\*\(\)\_\+\|\:\ ]/g,''));
      });

      $('#email_new').keyup(function(event) {
        var data = $("#email_new").val();
        $("#email_new").val(data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g,''));

        if ( Validator.email($("#email_new").val()) == Validator.ERR_VALID_OK ) {
          $("#noti_new").removeAttr('disabled');
        } else {
          $("#noti_new").attr('disabled', 'disabled');
        }
      });

      $('#phone_new').keyup(function(event) {
        if ( Validator.phone($("#phone_new").val()) == Validator.ERR_VALID_OK ) {
          $("#phone_notify_new").removeAttr('disabled');
        } else {
          $("#phone_notify_new").attr('disabled', 'disabled');
        }
      });

      // set user add button handler
      $( "#adder" ).click(function() {
        if ($z.current.m.usrManager.usrcnt >= $z.current.m.usrManager.maxusr) {
          alert(langArray["LTXT_ERR_MAX_USER_EXCEED"]);
          return false;
        }
        $( "#user_dialog" ).data('mode', 'add').dialog( "open" );
      });

      // set user del button handler
      $('input[id^="del"]').click(function() {
        var usrManager = c.m.usrManager;
        var idx = parseInt($(this).attr('usrRow'));
        usrManager.delUser(idx);
        c.v.redraw();
      });

      // set user edit button handler
      $('input[id^="editor"]').click(function() {
        var usrManager = c.m.usrManager;
        $( "#user_dialog" )
        .data('mode', 'edit')
        .data('usrRow', $(this).attr('usrRow'))
        .dialog( "open" );
      });

      $('#passwd_new').keyup(function(event) {
        c.useridRuleCheck('#passwd_new', '#usrid_new');
        c.passwdRuleCheck('#passwd_new', '#usrid_new');
      });

      $('#usrid_new').keyup(function(event) {
        c.useridRuleCheck('#passwd_new', '#usrid_new');
        c.passwdRuleCheck('#passwd_new', '#usrid_new');
      });

    },
    passwdRuleCheck: function(str, id) {
      var err = Validator.enhancedPasswd(str, id);
      if (err & Validator.ERR_VALID_LENGTH_SHORT ||
          err & Validator.ERR_VALID_LENGTH_LONG) {
        $('#passwd_rule1').css('color', 'red');
      } else {
        $('#passwd_rule1').css('color', 'green');
      }

      if (err & Validator.ERR_VALID_COMBINATION) {
        $('#passwd_rule2').css('color', 'red');
      } else {
        $('#passwd_rule2').css('color', 'green');
      }

      if (err & Validator.ERR_VALID_REPETITIVE_CHAR) {
        $('#passwd_rule3').css('color', 'red');
      } else {
        $('#passwd_rule3').css('color', 'green');
      }

      if (err & Validator.ERR_VALID_SEQUENTIAL_NUMBER) {
        $('#passwd_rule4').css('color', 'red');
      } else {
        $('#passwd_rule4').css('color', 'green');
      }

      if (err & Validator.ERR_VALID_EQUAL_TO_ID) {
        $('#passwd_rule5').css('color', 'red');
      } else {
        $('#passwd_rule5').css('color', 'green');
      }

      if (err & Validator.EER_VALID_INVALID_CHAR) {
        $('#passwd_rule6').css('color', 'red');
      } else {
        $('#passwd_rule6').css('color', 'green');
      }
    },
    useridRuleCheck: function(str, id) {
      var err = Validator.enhancedUserid(str, id);
      if (err & Validator.EER_VALID_ID_LENGTH_SHORT) {
        $('#passwd_rule7').css('color', 'red');
      } else {
        $('#passwd_rule7').css('color', 'green');
      }
    },
    _validate_each: function(id, passwd, email, phone, isdiag) {
      var err, err1;

      err = Validator.test("usrName", id, 1, 10);

      if(err) {
        if(INFO_ENHANCED_USER_ID == '1') {
          alert(langArray["LTXT_ERR_USERID_LENGTH"]);
        } else {
          alert(langArray["LTXT_INPUT_USER_ID"]);
        }
        //alert(Validator.errStr());
        return false;
      }

      if (isdiag == undefined || isdiag == false) {

        err1 = Validator.passwdApplication(passwd, 1, 16);  
        if(err1) {
          alert(langArray['LTXT_ERR_USERPASSWD']);
          return false;
        }

        // err = Validator.enhancedPasswd(passwd, id);
        // err1 = Validator.test("usrPasswd", passwd, 1, 10);
        // if(err && err1) {
        //   alert(langArray['LTXT_ERR_USERPASSWD']);
        //   return false;
        // }

      } else if (isdiag == true) {
        if (INFO_ENHANCED_USER_ID == '1') {
          err = Validator.enhancedUserid(passwd, id);
          if((err & Validator.EER_VALID_ID_LENGTH_SHORT) != 0) {
            alert(langArray['LTXT_ERR_USERID_LENGTH']);
            return false;
          }

          var removeDuplicate = $(id).val().split('').filter(function(item, i, ar){ return ar.indexOf(item) === i; }).join('');
          if(removeDuplicate.length < 2) {
            alert(langArray['LTXT_ERR_USERID_SAME_LETTERS']);
            return false;
          }
        }

        if (INFO_ENHANCED_PASSWORD == '1') {
          err = Validator.enhancedPasswd(passwd, id);
        } else {
          err = Validator.test("usrPasswd", passwd, 1, 16);
        }
        if(err) {
          alert(langArray['LTXT_ERR_USERPASSWD']);
          return false;
        }
      }

      err = Validator.test("email", email, 0, 64);
      if(err) {
        alert(langArray['LTXT_ERR_USER_EMAIL']);
        //alert(Validator.errStr());
        return false;
      }

      if (phone) {
        err = Validator.test("phone", phone, 0, 64);
        if(err) {
          alert(langArray['LTXT_PLEASE_CHECK_THE_PHONE']);
          //alert(Validator.errStr());
          return false;
        }
      }

      return true;
    },
    _validate: function(usrcnt) {
      for( var i=0 ; i < usrcnt ; i++ ) {
        var c = this;
        var usrMan = c.m.usrManager;
        var users = usrMan.getUsers();

        if( !this._validate_each("#usrid"+i, users[i].passwd, "#email"+i, null) )
          return false;
      }

      return true;
    },
    usrCnt : 0,

    actionUrl : '/cgi-bin/webra_fcgi.fcgi',

    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;

      //this.usrManager = new UserManager();
      this.initEvent();

      c.form('form#usrsetting_usrmange',
        function before() {
          if( !c._validate(parseInt($("#usrcnt0").val())) )
            return -1;

        },
        function after() {

        }
      );

      if( $z.debug ) {
        action += '&debug=';
      }
      c.v.init();

      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.update(c.m.data);
      });

      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response);
        var chk = [];
        authCheck = new AuthCheck(array);

        if( !authCheck.check('setup') ) {
          AuthorityNoPermission();
          history.back()
          return;
        }

        //c.usrManager.curAuth = array['login_group'];
        //c.usrManager.makeUserList(array);

        c.v.update(array);
        c.m.initData(array);

        this.usrCnt = array['usrcnt0'];
      });
    }
  },
  UserAuth: {
    chks : [
      // manager
      'setupman',
      'searchman',
      'archman',
      'recsetman',
      'eventman',
      'audioman',
      'micman',
      'remoteman',
      'shutman',
      // user
      'setupusr',
      'searchusr',
      'archusr',
      'recsetusr',
      'eventusr',
      'audiousr',
      'micusr',
      'remoteusr',
      'shutusr'
    ],

    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;

      c.form('form',
        function before() {

        },
        function after() {

        }
      );

      if ( INFO_MODEL.indexOf("IPX") >= 0  ) {
      } else {
        $("#micman").parents("tr").hide();
      }

      if( $z.debug ) {
        action += '&debug=';
      }
      c.v.init();

      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.update(c.m.data);
      });

      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response);
        var chk = [];
        authCheck = new AuthCheck(array);

        if( !authCheck.check('setup') ) {
          AuthorityNoPermission();
          history.back()
          return;
        }

        c.v.update(array);
        c.m.initData(array);
      });
    }
  }
});
