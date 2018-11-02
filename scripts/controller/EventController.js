/**
* @author chcha
*/

/**
* EventMotionController
*
* This is a event motion controller
*
*/

function makePtzPresets(array)
{
  var ptzPresets1 = new PTZPresets([
    [ // ch1
      { // ptz
        no:0,
        name:"ptz1"
      },
      { //ptz
        no:3,
        name:"ptz2"
      }
    ],
    [ // ch2
      { //ptz
        no:1,
        name:"ptz3"
      },
      { //ptz
        no:2,
        name:"ptz5"
      }
    ],
    null,
    null
  ]);

  var ptzPresetArr = [];
  var pid;

  for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
    ptzPresetArr[ch] = [];
    for( var p=0, pid=0 ; p < 16 ; p++ ) {
      var num = 'num' + ch + 'o' + p;
      var name = 'name' + ch + 'o' + p;

      if( array[num] != '0' ) {
        ptzPresetArr[ch][pid++] = {
          no: array[num],
          name: array[name]
        };
      }
    }
  }

  return new PTZPresets(ptzPresetArr);
}

function makePtzPresetPick(array, ch)
{
  var presetArray = array['ptzpre'+ch].split("p");

  var ptzPresetsPick = new PTZPresetsCh(
    array['usePtz'+ch],
    presetArray
  );

  return ptzPresetsPick;
}

$z.c({
  EventAlarmOut: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',

    setSchedValue: function(array) {
      //var array = this.getSchedArray();

      for( var ar=0 ; ar < NUM_ALARMS ; ar++ ) {
        $('input#sched' + ar).val(array['sched'+ar]);
      }

    },
    /**
    * EventAlarmOut index
    */
    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;

      for( var ar=0 ; ar < NUM_ALARMS ; ar++ ) {
        var newSched = $('<input type="hidden">').attr('name', 'sched'+ar).attr('id', 'sched'+ar);
        $('form').append(newSched);
      }

      c.form('form',
        function before() {
          var err;

          for( var a=0 ; a < NUM_ALARMS ; a++ ) {
            err = Validator.test("title", "#name"+a, 0, 16);
            if( err != Validator.ERR_VALID_OK ) {
              alert(Validator.errStr());
              return -1;
            }
          }
        },
        function after() {

        }
      );

      if( $z.debug ) {
        action += '&debug=';
      }
      c.v.init();
      //this.schedWidget.init();

      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.update(c.m.data);
        c.setSchedValue(c.m.data);
      });

      $('form').bind('EVT_SCHED_CHANGE', function(event, array, day) {
        for( var i in array ) {
          $('#sched'+i).val(array[i]);
        }
      });

      $('input:text').keyup(function(event) {
        for(var i = 0; i < NUM_ALARMS; i++ ){
          var data = $('#name'+i).val();
          data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣\~\=\{\}\\\"\<\>\?\!\$\%\^\&\*\+\|\:\ ]/g,'');
          $('#name'+i).val(data);
        }
      });

      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response);
        authCheck = new AuthCheck(array);

        if( !authCheck.check('setup') ) {
          AuthorityNoPermission();
          history.back()
          return;
        }

        for( var ch=0 ; ch < NUM_ALARMS ; ch++ ) {
          /*
          c.v.updateName(ch, array['name'+ch]);
          c.v.updateRelayType(ch, array['relay_type'+ch]);
          c.v.updateOperation(ch, array['op_type'+ch]);
          c.v.updateDuration(ch, array['duration'+ch]);
          */
        }

        c.v.update(array);
        //var sched = c.parseSched(array);

        selectAll.register(
          {
            "op_type_all": {
              "type": "select",
              "recv": {
                "name": "op_type",
                "start": 0,
                "number": NUM_ALARMS
              }
            },
            "duration_all": {
              "type": "select",
              "recv": {
                "name": "duration",
                "start": 0,
                "number": NUM_ALARMS
              }
            }
          });

        //schedWidget.bind(sched);
        c.setSchedValue(array);

        c.m.initData(array);
      });

    }
  },
  EventNoti : {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    setEmailList : function() {
      var email_cnt = $("select#email_list > option").length;

      for( var i=0 ; i < email_cnt ; i++ ) {
        $('input#email_address'+i).val($("select#email_list > option")[i].value);
      }

      for( var i=email_cnt ; i < 8 ; i++ ) {
        $('input#email_address'+i).val('');
      }

      $('input#email_cnt').val(email_cnt);
    },
    checkNumEmail : function() {
      var email_cnt = $("select#email_list > option").length;
      var MAX_EMAIL = 8;

      if ( email_cnt >= MAX_EMAIL ) {
        return false;
      }

      return true;
    },
    /**
    * EventNoti index
    */
    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;

      // add emailaddress forms
      for( i=0 ; i < 8 ; i++ ) {
        var emailform = $('<input type="hidden">')
        .attr('id', 'email_address' + i)
        .attr('name', 'email_address' + i);

        $('form').append(emailform);
      }

      c.form('form',
        function before() {

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

      ///////////////////////////////////////
      ///// Event Bindings
      ///////////////////////////////////////
      // Email List Button -> Dialog Open
      $("#dialog_email").dialog({
        autoOpen : false,
        modal : true,
        width: 'auto',
        title : langArray["LTXT_ADD_EDIT"],
        open: function(event, ui) {

        },
        buttons: [ {
          id : "email_del",
          name : "email_del",
          text: langArray["LTXT_SETUP_DEL"],
          click: function () {
            $("select#email_list option").each(function(idx, obj) {
              if( $(obj).prop("selected") )
                $(obj).remove();
            });

            c.setEmailList()
          }
        }, {
          id : "email_close",
          name : "email_close",
          text: langArray["LTXT_CLOSE"],
          click: function () {
            $(this).dialog('close');
          }
        }]
      });

      $("input#email_list_open").click(function() {
        $("#dialog_email").dialog("open");
      });

      $("input#email_close").click(function() {
        $("#dialog_email").dialog("close");
      });

      // Email Add Button
      $("input#email_add").click(function(event){
        var ret = true;
        var email = $("input#email_new").val();
        var obj = null;

        if( !c.checkNumEmail() ) {
          alert(langArray["LTXT_SETUPEVENTNOTI_EMAILFULL_MSG"]);
          return false;
        }

        if( email.length == 0 ) {
          alert(langArray["LTXT_PLEASE_INPUT_ADDRESS"]);
          $("input#email_new").focus().select();

          return;
        } else if ( Validator.test("email", email, 0, 64) != Validator.ERR_VALID_OK ) {
          alert(langArray["LTXT_EMAIL_FORMAT_ERROR"]);
          $("input#email_new").focus().select();

          return;
        }

        // Email Duplicate Validate
        $("select#email_list").find('option').each(function(idx, obj) {
          if( $(obj).val() == email ) {
            alert(langArray["LTXT_SAME_EMAIL_EXIST"]);
            $("input#email_new").focus().select();
            ret = false;
            return false;
          }
        });

        if( ret == false )
          return false;

        obj = $('<option>').val(email).append(email);
        $("select#email_list").prepend(obj);

        c.setEmailList();
      });

      // Email Del Button
      $("input#email_del").click(function(event){

      $("select#email_list option").each(function(idx, obj) {
        if( $(obj).prop("selected") )
          $(obj).remove();
        });

        c.setEmailList();
      });

      $('#email_new').keyup(
        function(event){
          var data = $('#email_new').val();
          data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g,'');
          $('#email_new').val(data);
        }
      );

      $('#ftp_host').keyup(
        function(event){
          var data = $('#ftp_host').val();
          data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g,'');
          $('#ftp_host').val(data);
        }
      );
      
      $('#ftp_port').keyup(
        function(event){
          var data = $('#ftp_port').val();
          data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g,'');
          $('#ftp_port').val(data);
        }
      ).keypress(
        function(event){
          if( !isValidKeyNumber(event.which) ) {
            event.preventDefault();
          }
        }
      ).change(
        function(event){
          if(this.value < 1) {
            alert(sprintf(langArray['LTXT_FTP_PORT_RANGE'], 1, 65535))
            this.value = 1;
          } else if(this.value > 65535) {
            alert(sprintf(langArray['LTXT_FTP_PORT_RANGE'], 1, 65535))
            this.value = 65535;
          }
        }
      );

      $('#ftp_username').keyup(
        function(event){
          var data = $('#ftp_username').val();
          data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g,'');
          $('#ftp_username').val(data);
        }
      );

      $('#ftp_passwd').keyup(
        function(event){
          var data = $('#ftp_passwd').val();
          data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g,'');
          $('#ftp_passwd').val(data);
        }
      );

      //
      //FTP Dir checking
      ///////////////////
      //block special character.
      $('#ftp_dir_path').keypress(
        function(event){
          if(Validator.ftp_dir(String.fromCharCode(event.keyCode)) == Validator.ERR_VALID_FTP_DIR)
          {
            event.preventDefault();
          }
        }
      );
      //replace other language to empty space.
      $('#ftp_dir_path').keyup(
        function(event){
          var data = $('#ftp_dir_path').val();
          data = data.replace(/([^a-zA-Z0-9@\#\$\%\&\(\)\-\_])/g, '');
          $('#ftp_dir_path').val(data);
        }
      );

      //
      //FTP Filename checking
      ////////////////////////
      //block special character.
      $('#ftp_fname_prefix').keypress(
        function(event){
          if(Validator.ftp_filename(String.fromCharCode(event.keyCode)) == Validator.ERR_VALID_FTP_FILENAME)
          {
            event.preventDefault();
          }
        }
      );
      //replace other language to empty space.
      $('#ftp_fname_prefix').keyup(
        function(event){
          var data = $('#ftp_fname_prefix').val();
          data = data.replace(/([^a-zA-Z0-9@\#\$\%\&\(\)\-\_])/g, '');
          $('#ftp_fname_prefix').val(data);
        }
      );

      // FTP Connect test Button
      $.scm.RegistCallback('IRET_SCM_TST_FTP', c.CbRetFtpTest);

      $("input#button_connection_test").click(function(event){
      var action = 'action=test&menu=event.ftp';

      $('#lang_please_wait_ftp').show();
      $('#lang_sms_test_success').hide();
      $('#lang_sms_test_fail').hide();

      $('#lang_ftp_test_success').hide();
      $('#lang_ftp_test_fail1').hide();
      $('#lang_ftp_test_fail2').hide();
      $('#lang_ftp_test_fail3').hide();

      $('#dialog_please_wait_ftp').dialog('open');

      action += '&ftp_server=' + $("#ftp_host").val();
      action += '&ftp_port=' + $('#ftp_port').val();
      action += '&ftp_user=' + $('#ftp_username').val();
      action += '&ftp_passwd=' + $('#ftp_passwd').val();

      $.scm.Start();

      $.ajax({
        type: "POST",
        url: "/cgi-bin/webra_fcgi.fcgi",
        data: action,
        success: function(response) {
          var p = encode_to_array(response);

          if (p['ftp_ret'] == '0') {
          } else {
              $('#lang_please_wait').hide();
              $('#lang_ftp_test_success').hide();
              $('#lang_ftp_test_fail1').hide();
              $('#lang_ftp_test_fail2').show();
              $('#lang_ftp_test_fail3').hide();
              $.scm.Stop();
              setTimeout(function() {
                $('#dialog_please_wait_ftp').dialog('close');
                $.scm.Stop();
              }, 3000);
            }
          },
          fail: function(response) {
            $('#lang_please_wait').hide();
            $('#lang_ftp_test_success').hide();
            $('#lang_ftp_test_fail1').hide();
            $('#lang_ftp_test_fail2').show();
            $('#lang_ftp_test_fail3').hide();
            $.scm.Stop();
            setTimeout(function() {
              $('#dialog_please_wait_ftp').dialog('close');
              $.scm.Stop();
            }, 3000);
            return false;
          }
        });
      });

      $("#dialog_ftpserver").dialog({
        autoOpen : false,
        modal : true,
        width: 'auto',
        title : langArray["LTXT_EDIT"],
        width : '400px',
        open: function(event, ui) {

        },
        buttons: [
          {
            text : langArray['LTXT_OK'],
            click : function () {
              $(this).dialog('close');
            }
          },
          {
            text: langArray['LTXT_CANCEL'],
            click : function() {
              $(this).dialog('close');
            }
            
          }
        ]
      });

      $("#button_ftpserver_edit").click( function (event) {
        $("#dialog_ftpserver").dialog("open");
      });

      $(".ui-dialog-titlebar-close").hide();
      $.scm.RegistCallback('INFY_SMS_TEST_RESULT', c.CbRetSmsTest);
      $('#sms_test').click( function (event) {
        var action = 'action=test&menu=event.sms';

      $('#lang_please_wait').show();
      $('#lang_sms_test_success').hide();
      $('#lang_sms_test_fail').hide();

      $('#dialog_please_wait').dialog('open');

      action += '&server=' + $('#sms_server').val();
      action += '&appid=' + $('#sms_appid').val();
      action += '&user=' + $('#sms_user').val();
      action += '&password=' + $('#sms_password').val();
      action += '&number=' + $('#sms_test_number').val();

      $.scm.Start();

      $.ajax({
        type: "POST",
        url: "/cgi-bin/webra_fcgi.fcgi",
        data: action,
        success: function(response) {
          var p = encode_to_array(response);

          if (p['ret'] == '0') {
          } else {
            $('#lang_please_wait').hide();
            $('#lang_sms_test_success').hide();
            $('#lang_sms_test_fail').show();
            $.scm.Stop();
            setTimeout(function() {
              $('#dialog_please_wait').dialog('close');
              $.scm.Stop();
            }, 3000);
          }
        },
        fail: function(response) {
          $('#lang_please_wait').hide();
          $('#lang_sms_test_success').hide();
          $('#lang_sms_test_fail').show();
          $.scm.Stop();
          setTimeout(function() {
            $('#dialog_please_wait').dialog('close');
            $.scm.Stop();
          }, 3000);
          return false;
        }
      });
    });

    c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
      var array = encode_to_array(response);
      authCheck = new AuthCheck(array);

      if( !authCheck.check('setup') ) {
        AuthorityNoPermission();
        history.back()
        return;
      }

      c.v.update(array);

      c.m.initData(array);
    });
  },

    CbRetFtpTest: function(resp) {
      $('#lang_please_wait_ftp').hide();

      if (resp == '0') {
        $('#lang_ftp_test_success').show();
        $('#lang_ftp_test_fail1').hide();
        $('#lang_ftp_test_fail2').hide();
        $('#lang_ftp_test_fail3').hide();
      } else if (resp == '-16') {
        $('#lang_ftp_test_success').hide();
        $('#lang_ftp_test_fail1').hide();
        $('#lang_ftp_test_fail2').show();
        $('#lang_ftp_test_fail3').hide();
      } else if (resp == '-17') {
        $('#lang_ftp_test_success').hide();
        $('#lang_ftp_test_fail1').hide();
        $('#lang_ftp_test_fail2').show();
        $('#lang_ftp_test_fail3').hide();
      } else if (resp == '-18') {
        $('#lang_ftp_test_success').hide();
        $('#lang_ftp_test_fail1').hide();
        $('#lang_ftp_test_fail2').hide();
        $('#lang_ftp_test_fail3').show();
      } else {

      }

      setTimeout(function() {
        $('#dialog_please_wait_ftp').dialog('close');
      }, 3000);

      $.scm.Stop();
    },

    CbRetSmsTest: function(resp) {

      $('#lang_please_wait').hide();

      if (resp == '1') {
        $('#lang_sms_test_success').show();
        $('#lang_sms_test_fail').hide();
      } else {
        $('#lang_sms_test_success').hide();
        $('#lang_sms_test_fail').show();
      }

      setTimeout(function() {
        $('#dialog_please_wait').dialog('close');
      }, 3000);

      $.scm.Stop();
    }

  },
  EventSensor: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    channel : function () {

    },
    /**
    * EventSensor index
    */
    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;

      c.form('form',
        function before() {
          var err;

          for( var a=0 ; a < NUM_SENSORS ; a++ ) {
            err = Validator.test("title", "#name"+a, 0, 16);
            if( err != Validator.ERR_VALID_OK ) {
              alert(Validator.errStr());
              return -1;
            }
          }
        },
        function after() {

        }
      );

      if( $z.debug ) {
        action += '&debug=';
      }
      c.v.init();

      $('input:text').keyup(function(event) {
        for(var i = 0; i < NUM_SENSORS; i++) {
          var data = $('#name'+i).val();
          data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣\~\=\{\}\\\"\<\>\?\!\$\%\^\&\*\+\|\:\ ]/g,'');
          $('#name'+i).val(data);  
        }
      });

      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.update(c.m.data);
      });

      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response);
        var chk = [];
        authCheck = new AuthCheck(array);

        this.ptzAct = {};
        for( var ch=0 ; ch < NUM_SENSORS ; ch++ ) {
          // selected ptz preset per each event

          var ptzPresets = makePtzPresets(array);
          var ptzPresetArr = makePtzPresetPick(array, ch);

          this.ptzAct[ch] = new PTZActionDialog(
            ch // event ch
            ,ptzPresets
            ,ptzPresetArr
            ,{
              button: 'input#ptzpre'+ch
            }
          );
        }

        if( INFO_MODEL.indexOf("HDY") >= 0 ) {
          // TODO remove ptz preset
          $("#lang_ptzpreset").parent().hide();
          $('input[id^="ptzpre"]').parent().hide();
          $("input#buzzer_all").parent().prev().hide();
          $("#lang_action").parent().prop("colspan", function() {
            return parseInt($(this).prop("colspan"))-1
          });
        }
        if( !authCheck.check('setup') ) {
          AuthorityNoPermission();
          history.back()
          return;
        }

        c.v.update(array);

        for( var ch=0 ; ch < NUM_SENSORS ; ch++ ) {
          c.v.updateName(ch, array['name'+ch]);
          c.v.updateOperation(ch, array['op_type'+ch]);

          c.v.updateLinkedCamera(ch, array['lcamera'+ch]);
          c.v.updateAlarmOut(ch, array['arout'+ch]);

          c.v.updateBuzzer(ch, array['buzzer'+ch]);
          c.v.updateVpopup(ch, array['vpopup'+ch]);
          c.v.updateOpopup(ch, array['opopup'+ch]);
          c.v.updateEmail(ch, array['email'+ch]);
          if (typeof array['ftp' + ch] != undefined) {
            c.v.updateFtp(ch, array['ftp'+ch]);
          }
          if (typeof array['mobile'] != undefined) {
            c.v.updateMobile(ch, array['mobile'+ch]);
          }
        }

        selectAll.register(
          {
            "op_type_all": {
              "type": "select",
              "recv": {
                "name": "op_type",
                "start": 0,
                "number": NUM_SENSORS
              }
            },
            "lcamera_all": {
              "type": "multi",
              "recv": {
                "name": "lcamera",
                "start": 0,
                "number": NUM_SENSORS
              }
            },
            "arout_all": {
              "type": "multi",
              "recv": {
                "name": "arout",
                "start": 0,
                "number": NUM_SENSORS
              }
            },
            "buzzer_all": {
              "type": "check",
              "recv": {
                "name": "buzzer",
                "start": 0,
                "number": NUM_SENSORS
              }
            },
            "vpopup_all": {
              "type": "check",
              "recv": {
                "name": "vpopup",
                "start": 0,
                "number": NUM_SENSORS
              }
            },
            "opopup_all": {
              "type": "check",
              "recv": {
                "name": "opopup",
                "start": 0,
                "number": NUM_SENSORS
              }
            },
            "email_all": {
              "type": "check",
              "recv": {
                "name": "email",
                "start": 0,
                "number": NUM_SENSORS
              }
            },
            "ftp_all": {
              "type": "check",
              "recv": {
                "name": "ftp",
                "start": 0,
                "number": NUM_SENSORS
              }
            },
            "mobile_all": {
              "type": "check",
              "recv": {
                "name": "mobile",
                "start": 0,
                "number": NUM_SENSORS
              }
            },
            "mobilepush_all": {
              "type": "check",
              "recv": {
                "name": "mobilepush",
                "start": 0,
                "number": NUM_SENSORS
              }
            }
          }
        );

        c.m.initData(array);
      });

    }
  },
  EventMotion: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    channel : function () {

    },
    /**
    * EventMotion index
    */
    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;

      c.form('form',
        function before() {
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

        this.ptzAct = {};
        for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
          // selected ptz preset per each event

          var ptzPresets = makePtzPresets(array);
          var ptzPresetArr = makePtzPresetPick(array, ch);

          this.ptzAct[ch] = new PTZActionDialog(
            ch // event ch
            ,ptzPresets
            ,ptzPresetArr
            ,{
              button: 'input#ptzpre'+ch
            }
          );
        }
        if( INFO_MODEL.indexOf("HDY") >= 0 ) {
          // TODO remove ptz preset
          $("#lang_ptzpreset").parent().hide();
          $('input[id^="ptzpre"]').parent().hide();
          $("input#buzzer_all").parent().prev().hide();
          $("#lang_action").parent().prop("colspan", function() {
            return parseInt($(this).prop("colspan"))-1
          });
        }


        if( !authCheck.check('setup') ) {
          AuthorityNoPermission();
          history.back()
          return;
        }

        c.v.update(array);

        selectAll.register(
          {
            "interval_all": {
              "type": "select",
              "recv": {
                "name": "interval",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "arout_all": {
              "type": "multi",
              "recv": {
                "name": "arout",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "buzzer_all": {
              "type": "check",
              "recv": {
                "name": "buzzer",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "vpopup_all": {
              "type": "check",
              "recv": {
                "name": "vpopup",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "email_all": {
              "type": "check",
              "recv": {
                "name": "email",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "ftp_all": {
              "type": "check",
              "recv": {
                "name": "ftp",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "mobile_all": {
              "type": "check",
              "recv": {
                "name": "mobile",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "mobilepush_all": {
              "type": "check",
              "recv": {
                "name": "mobilepush",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            }

          });

        c.m.initData(array);
      });

    }
  },
  EventVloss: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    ptzAct: {},
    channel : function () {

    },
    /**
    * EventVloss index
    */
    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;

      c.form('form',
        function before() {
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

      // defined ptz presets
      var ptzPresets = new PTZPresets([
        [ // ch1
          { // ptz
            no:0,
            name:"ptz1"
          },
          { //ptz
            no:3,
            name:"ptz2"
          }
        ],
        [ // ch2
          { //ptz
            no:1,
            name:"ptz3"
          },
          { //ptz
            no:2,
            name:"ptz5"
          }
        ],
        null,
        null
      ]);

      var ptzPresetsPick = [
        [0,2,null,null],
        [0,2,null,null],
        [null,null,null,null],
        [null,null,null,null]
      ];

      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response);
        var chk = [];
        authCheck = new AuthCheck(array);

        if( !authCheck.check('setup') ) {
          AuthorityNoPermission();
          history.back()
          return;
        }
        this.ptzAct = {};
        for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
          // selected ptz preset per each event

          var ptzPresets = makePtzPresets(array);
          var ptzPresetArr = makePtzPresetPick(array, ch);

          this.ptzAct[ch] = new PTZActionDialog(
            ch // event ch
            ,ptzPresets
            ,ptzPresetArr
            ,{
              button: 'input#ptzpre'+ch
            }
          );
        }

        if( INFO_MODEL.indexOf("HDY") >= 0 ) {
          // TODO remove ptz preset
          $("#lang_ptzpreset").parent().hide();
          $('input[id^="ptzpre"]').parent().hide();
          $("input#buzzer_all").parent().prev().hide();
          $("#lang_action").parent().prop("colspan", function() {
            return parseInt($(this).prop("colspan"))-1
          });
        }
        c.v.update(array);

        selectAll.register(
          {
            "interval_all": {
              "type": "select",
              "recv": {
                "name": "vlossIgnoreInterval",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "arout_all": {
              "type": "multi",
              "recv": {
                "name": "arout",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "buzzer_all": {
              "type": "check",
              "recv": {
                "name": "buzzer",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "email_all": {
              "type": "check",
              "recv": {
                "name": "email",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "ftp_all": {
              "type": "check",
              "recv": {
                "name": "ftp",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "mobile_all": {
              "type": "check",
              "recv": {
                "name": "mobile",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "mobilepush_all": {
              "type": "check",
              "recv": {
                "name": "mobilepush",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            }
          });

        c.m.initData(array);
      });
    }
  },
  EventTamper: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    ptzAct: {},
    channel : function () {

    },
    /**
    * EventTamper index
    */
    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;

      c.form('form',
        function before() {
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

      // defined ptz presets
      var ptzPresets = new PTZPresets([
        [ // ch1
          { // ptz
            no:0,
            name:"ptz1"
          },
          { //ptz
            no:3,
            name:"ptz2"
          }
        ],
        [ // ch2
          { //ptz
            no:1,
            name:"ptz3"
          },
          { //ptz
            no:2,
            name:"ptz5"
          }
        ],
        null,
        null
      ]);

      var ptzPresetsPick = [
        [0,2,null,null],
        [0,2,null,null],
        [null,null,null,null],
        [null,null,null,null]
      ];

      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response);
        var chk = [];
        authCheck = new AuthCheck(array);

        this.ptzAct = {};
        for( var ch=0 ; ch < NUM_SENSORS ; ch++ ) {
          // selected ptz preset per each event

          var ptzPresets = makePtzPresets(array);
          var ptzPresetArr = makePtzPresetPick(array, ch);

          this.ptzAct[ch] = new PTZActionDialog(
            ch // event ch
            ,ptzPresets
            ,ptzPresetArr
            ,{
              button: 'input#ptzpre'+ch
            }
          );
        }

        if( INFO_MODEL.indexOf("HDY") >= 0 ) {
          // TODO remove ptz preset
          $("#lang_ptzpreset").parent().hide();
          $('input[id^="ptzpre"]').parent().hide();
          $("input#buzzer_all").parent().prev().hide();
          $("#lang_action").parent().prop("colspan", function() {
            return parseInt($(this).prop("colspan"))-1
          });
        }

        if( !authCheck.check('setup') ) {
          AuthorityNoPermission();
          history.back()
          return;
        }

        if( !authCheck.check('setup') ) {
          AuthorityNoPermission();
          history.back()
          return;
        }

        selectAll.register(
          {
            "lcamera_all": {
              "type": "multi",
              "recv": {
                "name": "lcamera",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "arout_all": {
              "type": "multi",
              "recv": {
                "name": "arout",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "buzzer_all": {
              "type": "check",
              "recv": {
                "name": "buzzer",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "vpopup_all": {
              "type": "check",
              "recv": {
                "name": "vpopup",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "email_all": {
              "type": "check",
              "recv": {
                "name": "email",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "ftp_all": {
              "type": "check",
              "recv": {
                "name": "ftp",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "mobile_all": {
              "type": "check",
              "recv": {
                "name": "mobile",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "mobilepush_all": {
              "type": "check",
              "recv": {
                "name": "mobilepush",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            }
          });

        c.v.update(array);
        c.m.initData(array);
      });
    }
  },
  EventVCA: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    channel : function () {

    },
    /**
    * EventVloss index
    */
    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;

      c.form('form',
        function before() {
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
         
        c.v.update(array);

        selectAll.register(
          {
            "buzzer_all": {
              "type": "check",
              "recv": {
                "name": "buzzer",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "vpopup_all": {
              "type": "check",
              "recv": {
                "name": "vpopup",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "email_all": {
              "type": "check",
              "recv": {
                "name": "email",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "ftp_all": {
              "type": "check",
              "recv": {
                "name": "ftp",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "mobile_all": {
              "type": "check",
              "recv": {
                "name": "mobile",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            },
            "mobilepush_all": {
              "type": "check",
              "recv": {
                "name": "mobilepush",
                "start": 0,
                "number": INFO_DVRCHANNEL
              }
            }
          });

        c.m.initData(array);
      });
    }
  },

  EventSystem: {
    multilistAll: [
      'disk_arout_all',
      'rec_arout_all',
      'sys_arout_all',
      'net_arout_all'
    ],
    multilists : [
      'disk_over_arout',
      'disk_full_arout',
      'disk_exhau_arout',
      'disk_smart_arout',
      'disk_nodisk_arout',
      'rec_pstart_arout',
      'rec_stop_arout',
      'sys_booting_arout',
      'sys_logon_fail_arout',
      'sys_fan_fail_arout',
      'sys_temper_fail_arout',
      'sys_POE_fail_arout',
      'net_eth_trouble_arout',
      'net_rfail_arout',
      'net_ddns_fail_arout',
      'net_dhcp_fail_arout'
    ],
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    channel : function () {

    },
    /**
    * EventSystems index
    */
    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;

      c.form('form',
        function before() {
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

        c.v.update(array);
        c.m.initData(array);

        selectAll.register(
          {
            "disk_arout_all": {
              "type": "multi",
              "recv": [
                "disk_over_arout",
                "disk_full_arout",
                "disk_exhau_arout",
                "disk_smart_arout",
                "disk_nodisk_arout"
              ]
            },
            "disk_buzzer_all": {
              "type": "check",
              "recv": [
                "disk_over_buzzer",
                "disk_full_buzzer",
                "disk_exhau_buzzer",
                "disk_smart_buzzer",
                "disk_nodisk_buzzer"
              ]
            },
            "disk_opopup_all": {
              "type": "check",
              "recv": [
                "disk_over_opopup",
                "disk_full_opopup",
                "disk_exhau_opopup",
                "disk_smart_opopup",
                "disk_nodisk_opopup"
              ]
            },
            "disk_email_all": {
              "type": "check",
              "recv": [
                "disk_over_email",
                "disk_full_email",
                "disk_exhau_email",
                "disk_smart_email",
                "disk_nodisk_email"
              ]
            },
            "disk_ftp_all": {
              "type": "check",
              "recv": [
                "disk_over_ftp",
                "disk_full_ftp",
                "disk_exhau_ftp",
                "disk_smart_ftp",
                "disk_nodisk_ftp"
              ]
            },
            "disk_mobile_all": {
              "type": "check",
              "recv": [
                "disk_over_mobile",
                "disk_full_mobile",
                "disk_exhau_mobile",
                "disk_smart_mobile",
                "disk_nodisk_mobile"
              ]
            },
            "disk_mobilepush_all": {
              "type": "check",
              "recv": [
                "disk_over_mobilepush",
                "disk_full_mobilepush",
                "disk_exhau_mobilepush",
                "disk_smart_mobilepush",
                "disk_nodisk_mobilepush"
              ]
            },
            "rec_arout_all": {
              "type": "multi",
              "recv": [
                "rec_pstart_arout",
                "rec_stop_arout"
              ]
            },
            "rec_buzzer_all": {
              "type": "check",
              "recv": [
                "rec_pstart_buzzer",
                "rec_stop_buzzer"
              ]
            },
            "rec_opopup_all": {
              "type": "check",
              "recv": [
                "rec_pstart_opopup",
                "rec_stop_opopup"
              ]
            },
            "rec_email_all": {
              "type": "check",
              "recv": [
                "rec_pstart_email",
                "rec_stop_email"
              ]
            },
            "rec_ftp_all": {
              "type": "check",
              "recv": [
                "rec_pstart_ftp",
                "rec_stop_ftp"
              ]
            },
            "rec_mobile_all": {
              "type": "check",
              "recv": [
                "rec_pstart_mobile",
                "rec_stop_mobile"
              ]
            },
            "rec_mobilepush_all": {
              "type": "check",
              "recv": [
                "rec_pstart_mobilepush",
                "rec_stop_mobilepush"
              ]
            },
            "sys_arout_all": {
              "type": "multi",
              "recv": [
                "sys_booting_arout",
                "sys_logon_fail_arout",
                "sys_fan_fail_arout",
                "sys_temper_fail_arout",
                "sys_POE_fail_arout"
              ]
            },
            "sys_buzzer_all": {
              "type": "check",
              "recv": [
                "sys_booting_buzzer",
                "sys_logon_fail_buzzer",
                "sys_fan_fail_buzzer",
                "sys_temper_fail_buzzer",
                "sys_POE_fail_buzzer"
              ]
            },
            "sys_opopup_all": {
              "type": "check",
              "recv": [
                "sys_booting_opopup",
                "sys_logon_fail_opopup",
                "sys_fan_fail_opopup",
                "sys_temper_fail_opopup",
                "sys_POE_fail_opopup"
              ]
            },
            "sys_email_all": {
              "type": "check",
              "recv": [
                "sys_booting_email",
                "sys_logon_fail_email",
                "sys_fan_fail_email",
                "sys_temper_fail_email",
                "sys_POE_fail_email"
              ]
            },
            "sys_ftp_all": {
              "type": "check",
              "recv": [
                "sys_booting_ftp",
                "sys_logon_fail_ftp",
                "sys_fan_fail_ftp",
                "sys_temper_fail_ftp",
                "sys_POE_fail_ftp"
              ]
            },
            "sys_mobile_all": {
              "type": "check",
              "recv": [
                "sys_booting_mobile",
                "sys_logon_fail_mobile",
                "sys_fan_fail_mobile",
                "sys_temper_fail_mobile",
                "sys_POE_fail_mobile"
              ]
            },
            "sys_mobilepush_all": {
              "type": "check",
              "recv": [
                "sys_booting_mobilepush",
                "sys_logon_fail_mobilepush",
                "sys_fan_fail_mobilepush",
                "sys_temper_fail_mobilepush",
                "sys_POE_fail_mobilepush"
              ]
            },
            "net_arout_all": {
              "type": "multi",
              "recv": [
                "net_eth_trouble_arout",
                "net_rfail_arout",
                "net_ddns_fail_arout",
                "net_dhcp_fail_arout"
              ]
            },
            "net_buzzer_all": {
              "type": "check",
              "recv": [
                "net_eth_trouble_buzzer",
                "net_rfail_buzzer",
                "net_ddns_fail_buzzer",
                "net_dhcp_fail_buzzer"
              ]
            },
            "net_opopup_all": {
              "type": "check",
              "recv": [
                "net_eth_trouble_opopup",
                "net_rfail_opopup",
                "net_ddns_fail_opopup",
                "net_dhcp_fail_opopup"
              ]
            },
            "net_email_all": {
              "type": "check",
              "recv": [
                "net_eth_trouble_email",
                "net_rfail_email",
                "net_ddns_fail_email",
                "net_dhcp_fail_email"
              ]
            },
            "net_ftp_all": {
              "type": "check",
              "recv": [
                "net_eth_trouble_ftp",
                "net_rfail_ftp",
                "net_ddns_fail_ftp",
                "net_dhcp_fail_ftp"
              ]
            },
            "net_mobile_all": {
              "type": "check",
              "recv": [
                "net_eth_trouble_mobile",
                "net_rfail_mobile",
                "net_ddns_fail_mobile",
                "net_dhcp_fail_mobile"
              ]
            },
            "net_mobilepush_all": {
              "type": "check",
              "recv": [
                "net_eth_trouble_mobilepush",
                "net_rfail_mobilepush",
                "net_ddns_fail_mobilepush",
                "net_dhcp_fail_mobilepush"
              ]
            }
          });
      });
    }
  }
});


