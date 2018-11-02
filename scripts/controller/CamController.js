/**
* @author chcha
*/

var AxHandler = function() {
  this.ax = $("#itxview");
  this.hidden = $("div.hidden");
  this.force = false;

  this.setForce = function(force) {
    this.force = force;
  };

  this.hide = function(force) {
    this.force = force;

    this.ax.appendTo(this.hidden);
  };

  this.appendTo = function(obj) {
    if( !this.force ) {
      this.ax.appendTo(obj);
    }
  };
};

var axHandler = new AxHandler();

var snapshotHandler = function() {
  if( this == window ) {
    return new snapshotHandler();
  }

  if( this.init ) {
    return this;
  }

  this.interval = 5000;
  this.chno = 0;

  this.init = true;

  snapshotHandler = this;
};

snapshotHandler.prototype = {
  init: false,
  timerid: null,

  // methods
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
  setCallback: function(callback) {
    this.callback = callback;
  },
  setChno: function(chno) {
    this.chno = chno;
  },
  start: function(interval) {
    if( interval )
      this.interval = interval;
    this.timerid = setTimeout( snapshotHandler.call, 500 );
  },
  stop: function() {
  },
  call: function(callback) {
    var me = this;
    this.timerid = setTimeout( snapshotHandler.call, snapshotHandler.interval);
    jQuery.post('/cgi-bin/webra_fcgi.fcgi' , 'action=get_live&menu=live.jpeg&chno=' + snapshotHandler.chno,
      function success(response, status, jqxHR) {
        var array = encode_to_array(response);
        snapshotHandler.callback(array['filepath']);
      });
  }
};

$z.c({
  CamTitle: {
    _validate: function(ids, min, max) {
          var ret = true;
      $(ids).each( function(i, o) {
        var err = Validator.test("title", o, 0, 16 );
        if( err != Validator.ERR_VALID_OK ) {
          alert( Validator.errStr(err) );
              ret = false;
          return false;
        }
      });
          return ret;
    },
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;

      if(INFO_MODEL.indexOf('UTM5X') > 0)
        checkFwUpdateStatus();

      c.form('form',
        function before() {
          if( !c._validate('input[id^="cam_title"]', 0, 12) ) {
            return -1;
          }
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
          if( !authCheck.check('recset') ) {
            history.back();
          } else {
            location.href="setup_record_operation.htm";
          }
          return;
        }

        c.m.initData(array);;
        c.v.update(array);
      });
    }
  },
  CamImage: {
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

      if( $z.debug ) {
        action += '&debug=';
      }
      c.v.init();

      if( INFO_MODEL.indexOf("IPX") >= 0 ) {
        $('input#goto_advanced').click( function(e) {
          if (getCookie("ADVANCED_IMAGE_SETUP_POPUP"))
          {
            location.href="../html/setup_cam_image_advanced.htm";
            return;
          }

          if (confirm(langArray["LTXT_SETUPCAMIMAGEADV_SETTINGCAUTION_MESSAGE"]))
          {
            setCookie("ADVANCED_IMAGE_SETUP_POPUP", "true", 7)
            location.href="../html/setup_cam_image_advanced.htm";
          }
        });
      } else {
        $('input#goto_advanced').remove();
      }


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

        c.m.initData(array);;
        c.v.update(array);
      });
    }
  },
  CamImageAdvanced: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    snapshot: null,
    loginid: null,
    loginpassword: null,
    loginCallback: function(response) {
      if (response == 'DVR In Setup!')
      {
        alert(langArray['LTXT_ERR_DVRINSETUP']);
      }
      if (response == 'DVR In Arch!')
      {
        alert(langArray['LTXT_ERR_DVRINARCH']);
      }
      if (response == 'DVR In SCM not ready!')
      {
        alert(langArray['LTXT_ERR_NVR_NOT_READY']);
      }
      var array = encode_to_array(response);

      var activex = document.getElementById("itxview");
      var c = this;
      axHandler.appendTo("#preview");
      //$("#itxview").appendTo("#preview");
      //$('div.hidden').remove();

      if (ActiveX_IsConnection() == true) {
        activex.SessionClose();
      }

      if (parseInt(INFO_DVRREADY) == 0) {

        alert("Recorder is not ready.");
        $('#itxview').remove();
        c.snapshot = snapshotHandler();
        c.snapshot.setChno(($("#ch") && $('option:selected')).val());
        c.snapshot.setCallback(c.v.updateSnapshot);
        c.snapshot.start(500);
      } else {
        if ( !activex || browerIE == false) {
          c.snapshot = snapshotHandler();
          c.snapshot.setChno(($("#ch") && $('option:selected')).val());
          c.snapshot.setCallback(c.v.updateSnapshot);
          c.snapshot.start(500);
        } else {
          $('#mimgid').remove();
          activex.SetAccount(array['login_id'], array['login_passwd']);
          var PORT = INFO_RTSPPORT;

          var PROXY_SVR = "127.0.0.1:";
          if (window.location.host.indexOf(PROXY_SVR) >= 0) {
            {
               PORT = parseInt(window.location.port) - 1;
            }
          }
//          activex.SetMaxLayout(1);

          var model = INFO_MODEL.substring(1, INFO_MODEL.length);
          activex.SetOEMCode("ITX", model);
          activex.SetAudioSync(false);
          activex.SetStreamType(2);

          if (!activex) {
            alert("activex connection fail!");
            return false;
          }

          try{
             activex.SessionOpen(window.location.hostname+"/live", PORT, 1, 1, 1, 0, 0);

          } catch (No_Activex_download) {
            alert('activex connection fail!');
          }
          SetSplitMode1('1');
        }
      }
    },
    activex: document.getElementById("itxview"),
    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu + '&ch=0&cam_adv_btn_cmd=0';
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
      c.v.addMessage(msgWait);

      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.updateAdvancedSetupInfo(c.m.data);
        c.v.update(c.m.data);
        c.v.updateIpcamEnable(c.m.data);
      });
      $(window).unload(function() {
        var activex = document.getElementById("itxview");
        if (activex)
        {
          try {
            activex.SessionClose();
          }
          catch (e)
          {

          }
        }
      });

      $z.log('in controller, get db.');
      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response);
        var chk = [];
        authCheck = new AuthCheck(array, true);
        authCheck.checkPwExpired(
          function() {
            //$("#itxview").appendTo("div.hidden");
            axHandler.hide(true);
          },
          function() {
            axHandler.setForce(false);
            axHandler.appendTo("#preview");
          }
        );

        if( !authCheck.check('setup') ) {
          AuthorityNoPermission();
          history.back()
          return;
        }
        c.v.updateAdvancedSetupInfo(array);
        c.v.update(array);
        c.v.updateIpcamEnable(array);
        c.m.initData(array);
        c.v.removeMessages();

        $z.log('in controller, get db. done.');

        $.ajax({
          type: "POST",
          url: "/cgi-bin/webra_fcgi.fcgi",
          async: false,
          data: 'action=get_info&menu=login.passwd',
          success: function(response) {c.loginCallback(response)},
          fail: function(response) {
            alert('fail!');
            c.v.removeMessages();
          }
        });

      });
    },
    refreshHandler: function(_ch, _flag) {
      var c = this;
      this.ch = _ch;
      this.flag = _flag;

      var data = form2Array(form);
      data = c.m.makeupData(data);

      var isChanged = c.m.compareTo(data);

      if( isChanged ) {
        // TODO: multi language
        if (!confirm(langArray['LTXT_UNSAVED_CHECK_CHANNEL'])) {
          return false;
        }
      }

      var action = 'action=get_setup&menu=' + c.m.menu;

      action += '&ch=' + this.ch;
      c.v.addMessage(msgWait);
      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response);
        var chk = [];

        if (!c.flag )
        {
          c.v.updateAdvancedSetupInfo(array);
          c.v.update(array);
          c.v.updateIpcamEnable(array);
          c.m.updateData(array);
          c.m.initData(array);
          c.v.removeMessages();
          if (c.snapshot)
            c.snapshot.setChno(($("#ch") && $('option:selected')).val());
          var activex = document.getElementById("itxview");
          if (activex) {
            if (activex.GetSelectedChannel() != c.ch )
              activex.SetSplitMode(0, parseInt(parseInt(c.ch) + 1));
          }
        }
        c.v.removeMessages();
      });
    },
    sendButtonCmd: function (_ch, _btnCmd) {
      var c = this;
      this.ch = _ch;
      this.btnCmd = _btnCmd;
      $z.log('preset save call');
      var form = 'form';
      var data = form2Array(form);
      if( data )
        data = jQuery.param(data);

      var action = 'action=set_setup&menu=' + c.m.menu + '_preset';
      action += '&flag=1';
      action += '&cam_adv_btn_cmd=' + this.btnCmd;
      action += '&' + data;

      c.v.addMessage(msgWait );
      //setTimeout(c.v.removeMessages(), 5000);
      $.ajax({
        type: "POST",
        url: "/cgi-bin/webra_fcgi.fcgi",
        async: false,
        data: action,
        success: function(response) {
          if (response == 'DVR In Setup!')
          {
            alert(langArray['LTXT_ERR_DVRINSETUP']);
          }
          if (response == 'DVR In Arch!')
          {
            alert(langArray['LTXT_ERR_DVRINARCH']);
          }
          if (response == 'DVR In SCM not ready!')
          {
            alert(langArray['LTXT_ERR_NVR_NOT_READY']);
          }
          c.v.removeMessages();

        },
        fail: function(response) {
          alert('fail!');
          c.v.removeMessages();
        }
      });
    },
    beforeAction: function() {
      $z.log('in controller, beforeAction called. for get ip cam data.');
    },
    afterAction: function() {
      $z.log('in controller, afterAction called.');
    }
  },
  CamCovert: {
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

      if( $z.debug ) {
        action += '&debug=';
      }
      c.v.init();

      $('input#iAllChkAdmin').change(function(event) {
        $('input[name^="cv_admin"]').prop('checked', $(this).prop('checked'));
      });

      $('input#iAllChkManager').change(function(event) {
        $('input[name^="cv_manager"]').prop('checked', $(this).prop('checked'));
      });

      $('input#iAllChkUser').change(function(event) {
        $('input[name^="cv_user"]').prop('checked', $(this).prop('checked'));
      });

      $('input#iAllChkLogoff').change(function(event) {
        $('input[name^="cv_logoff"]').prop('checked', $(this).prop('checked'));
      });

      $('input#cancel').click( function (event) {
        $('input[id^="iAllChk"]').prop('checked', false);

        c.m.revert();
        c.v.update(c.m.data);
      });

      if( INFO_MODEL.indexOf("HDY") >=0  ) {
        $("#covert-shownas").remove();
      }

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
        c.m.initData(array);;
      });
    }
  },
  CamCompatibility: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    snapshot: null,
    activex: document.getElementById("itxview"),
    me : null,
    activex_i : null,
    activex_p : null,
    activex_m : null,
    index : function() {
      var c = this;
      me = this;

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

      $(window).unload(function() {
        var activex = document.getElementById("itxview");
        if (activex) {
          try {
            activex.SessionClose();
          } catch (e) {}
        }
      });

      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response);
        var chk = [];
        c.activex_i = array['login_id'];
        c.activex_p = array['login_passwd'];
        c.activex_m = array['mac_address'];
        UCOVERT = array["covert"];
        COVERT_DISP = array["covert_disp"];
        var my = this;
        authCheck = new AuthCheck(array, true);
        authCheck.checkPwExpired(
          function() {
            axHandler.hide(true);
          },
          function() {
            axHandler.setForce(false);
            axHandler.appendTo("#image_preview");
          }
        );

        if( !authCheck.check('setup') ) {
          AuthorityNoPermission();
          history.back()
          return;
        }

        array = c.v.update(array);
        c.m.initData(array);

        $("#ch").val(0);

        if (!c.activeActivex(c.activex_i, c.activex_p, c.activex_m)) {
          c.snapshot = snapshotHandler();
          c.snapshot.setChno((c.v.ch.getValue()));
          c.snapshot.setCallback(c.v.updateSnapshot);
          c.snapshot.start(500);

          $(".cam_image_setup #tab").bind( "tabsshow", function(event, ui) {
            switch (ui.index) {
            case 0:
              $("#preview_image").appendTo("#image_preview");
              break;
            case 1:
              $("#preview_image").appendTo("#exposure_preview");
              break;
              default:
            }
          });

        }
        else {
          $(".cam_image_setup #tab").bind( "tabsselect", function(event, ui) {
            var activex = document.getElementById("itxview");
            if (activex) {
              try {
                var ret = activex.SessionClose();
              } catch (e) {}
            }
          });

          $(".cam_image_setup #tab").bind( "tabsshow", function(event, ui) {
            var activex = document.getElementById("itxview");
            switch (ui.index) {
            case 0:
              axHandler.appendTo("#image_preview");
              c.connectActivex(c.activex_i, c.activex_p, c.activex_m);
              break;
            case 1:
              axHandler.appendTo("#exposure_preview");
              c.connectActivex(c.activex_i, c.activex_p, c.activex_m);
              break;
              default:
            }
          });
        }
      });
    },
    refreshHandler: function(_ch) {
      var c = this;
      this.ch = _ch;
      var form = "form";

      var data = form2Array(form);
      data = c.m.makeupData(data);

      var isChanged = c.m.compareTo(data);

      if( isChanged ) {
        // TODO: multi language
        if (!confirm(langArray["LTXT_SETUPCAMIMAGEADV_UNSAVED_MESSAGE"])) {
          return false;
        }
      }

      var action = 'action=get_setup&menu=' + c.m.menu;

      action += '&ch=' + this.ch;
      c.v.addMessage(msgWait);
      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var activex = document.getElementById("itxview");
        var array = encode_to_array(response);
        var chk = [];

        array = c.v.update(array);
        c.m.initData(array);

        if (browerIE && activex) {
          if (activex.GetSelectedChannel() != c.v.ch.getValue() )
            activex.SetSplitMode(0, parseInt(parseInt(c.v.ch.getValue()) + 1));
        } else {
          if (c.snapshot)
            c.snapshot.setChno(c.v.ch.getValue());
        }
        c.v.removeMessages();
      });
      return true;
    },
    connectActivex : function(id, pass, mac) {
      var activex = document.getElementById("itxview");
      activex.SetAccount(id, pass);
      //activex.SetMaxLayout(1);
      activex.SetMacAddress(mac);

      var model = INFO_MODEL.substring(1, INFO_MODEL.length);
      activex.SetOEMCode("ITX", model);

      for ( var ch = 0; ch < INFO_DVRCHANNEL; ch++) {
        if (parseInt(INFO_CAMTITLE_ON)) {
          activex.SetCameraName(ch, INFO_CAMTITLE[ch]);
        } else {
          activex.SetCameraName(ch, "");
        }
      }

      var PORT = INFO_RTSPPORT;

      var PROXY_SVR = "127.0.0.1:";
      if (window.location.host.indexOf(PROXY_SVR) >= 0) {
        PORT = parseInt(window.location.port) - 1;
      }

      SetCovertSetting();
      activex.SetEventOSD(INFO_EVENTICON_ON);
      activex.SetDatetimeFormat(INFO_DATEFORMAT, INFO_TIMEFORMAT);
      activex.SetAudioSync(false);
      activex.SetStreamType(2);

      if (!activex) {
        alert("activex connection fail!");
        return false;
      }

      try{
        activex.SessionOpen(window.location.hostname+"/live", PORT, 1, 1, 1, 0, 0);
      } catch (No_Activex_download) {
        alert('activex connection fail!');
        return false;
      }
      activex.SetSplitMode(0, parseInt(parseInt(c.v.ch.getValue()) + 1));
      return true;
    },
    activeActivex : function(id, pass, mac) {
      var activex = document.getElementById("itxview");
      var c = this;
      axHandler.appendTo("#image_preview");

      if (ActiveX_IsConnection() == true) {
        activex.SessionClose();
      }

      if (parseInt(INFO_DVRREADY) == 0) {
        alert("Recorder is not ready.");
        $('#itxview').remove();
        return false;
      } else {
        if ( !activex || browerIE == false) {
          return false;
        } else {
          if (!this.connectActivex(id, pass, mac)) {
            return false;
          }
          $(".preview_jpeg").remove();
        }
      }

      var ax = $("#itxview");
      var w = ax.outerWidth(), h = ax.outerHeight();

      $("#image_preview").css({
        'width': w,
        'height': h,
        'background-color': 'black'
      });
      $("#exposure_preview").css({
        'width': w,
        'height': h,
        'background-color': 'black'
      });

      return true;
    },
    sendButtonCmd : function(ch, cmd) {
      var c = this;
      this.ch = ch;
      this.btnCmd = cmd;
      $z.log('send button cmd call');

      var action = 'action=set_setup&menu=' + c.m.menu + '_button_cmd';
      action += '&ch=' + ch;
      action += '&cmd=' + cmd;

      $.ajax({
          type: "POST",
          url: "/cgi-bin/webra_fcgi.fcgi",
          async: false,
          data: action,
          success: function(response) {
            if (response == 'DVR In Setup!' || response == 'DVR In Arch!')
              return c.v.checkResponse(response);

            var array = encode_to_array(response);
            return c.v.checkResponse(array["result"]);
          },
          fail: function(response) {
            return c.v.checkResponse('fail');
          }
      });
    },
    getCamModelInfo: function(ch) {
      var c = this;
      this.ch = ch;
      $z.log('send get cam model info');

      var action = 'action=get_setup&menu=' + c.m.menu + '_copy_setting_info';
      action += '&ch=' + ch;

      $.ajax({
          type: "POST",
          url: "/cgi-bin/webra_fcgi.fcgi",
          async: false,
          data: action,
          success: function(response) {
            var array = encode_to_array(response);
            return c.v.cpSettingOpenHandler(array);
          },
          fail: function(response) {
            return ;
          }
      });
    },
    setCamConnect : function(ch, is_on) {
      var action = 'action=set_cam&menu=poe.control&port=' + ch + '&is_on=' + is_on + '&is_fail=0';
      var state = false;
      $.ajax({
        type: "POST",
        url: "/cgi-bin/webra_fcgi.fcgi",
        async: false,
        data: action,
        success : function(response) {
          var array = encode_to_array(response);
          if (response == 'DVR In Setup!') {
            $('#poe_msg').text(langArray["LTXT_ERR_DVRINSETUP"]);
            $('#dialogOk').button({ disabled: false });
            $('#dialogClose').button({ disabled: false });
            state = false;
          }
          else if(response == 'DVR In Arch!') {
            $('#poe_msg').text(langArray["LTXT_ERR_DVRINARCH"]);
            $('#dialogOk').button({ disabled: false });
            $('#dialogClose').button({ disabled: false });
            state = false;
          }
          else if(array['is_fail'] != 1) {
            $('#poe_msg').text(errSend);
            state = false;
          }
          else
            state = true;
          return state;
         },
        fail : function(response) {
          state = false;
          return false;
        }
      });
      return state;
    },

    sendCopyTo: function(ch) {
      var c = this;
      this.ch = ch;

      $z.log('send copy to' + ch);

      var form = $('form');
      var data = form2Array(form);
      data = $z.current.m.makeupData(data);
      data["ch"] = ch;
      var jquertdata = jQuery.param(data)
      var action = 'action=set_setup&menu=' + c.m.menu + "&" + jquertdata;

      $.ajax({
        type: "POST",
        url: "/cgi-bin/webra_fcgi.fcgi",
        async: false,
        data: action,
        success: function(response) {
          c.m.initData(data);
          c.v.sendCopyToPrintResult(response);
          return true;
        },
        fail: function(response) {
          c.v.sendCopyToPrintResult(response);
          return false;
        }
      });
    }
  },
  CamMotion: {
    chno : 0,

    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    _retouchData: function(array) {
      if (array['conn' + array['chno']] == '0' ) {
        if( INFO_MODEL.indexOf("IPX") >= 0) {
          array['sense_d'] = '0';
          array['sense_n'] = '0';
          array['mini_d'] = '0';
          array['mini_n'] = '0';
        }

      }

      // if( parseInt(array['cam_area_method'+array['chno']]) == 1 ) {
      //   array['cam_bl_min'+array['chno']] = '1';
      // }
    },
    checkMinBlock: function() {
      var c = $z.current,
          ch = c.v.currentCh,
          settedArea = 0,
          day = $('#mini_d').val(),
          night = $('#mini_n').val(),
          area = c.m.data.area;
      if (c.m.data['cam_is_itx_cam' + ch] != '1' || c.m.data['cam_bl_min' + ch] == 0) {
        return true;
      }

      if(getInternetExplorerVersion() > 7) {
        for (var i = 0; i < c.m.data['cam_bl_num' + ch] ; i += 1) {
          if (area[i] == '1') {
            settedArea += 1;
          }
        }
      }
      else {
        var areaSlice = area.split("");
        for (var i = 0; i < c.m.data['cam_bl_num' + ch] ; i += 1) {
          if (areaSlice[i] == '1') {
            settedArea += 1;
          }
        }
      }

      if (settedArea < parseInt(day, 10) || settedArea < parseInt(night, 10)) {
        alert(langArray['LTXT_WARNING_MIN_BLOCK']);
        return false;
      }
      return true;
    },
    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;

      c.form('form',
        function before() {
          if (!c.checkMinBlock()) {
            return -1;
          }
        },
        function after() {

        }
      );

      action += '&chno=' + this.chno;

      if( $z.debug ) {
        action += '&debug=';
      }
      c.v.init();

      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.update(c.m.data);

        $("#act_all").val("NN");
        $("#detect_all").val("NN");
      });

      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response);

        if (array['conn' + array['chno']] == '0' ) {
          if( INFO_MODEL.indexOf("IPX") >= 0) {
            array['sense_d'] = '0';
            array['sense_n'] = '0';
            array['mini_d'] = '0';
            array['mini_n'] = '0';
          }
        }

        if( parseInt(array['cam_area_method'+array['chno']]) == 1 ) {
          array['cam_bl_min'+array['chno']] = '1';
        }

        c._retouchData(array);

        var chk = [];
        authCheck = new AuthCheck(array);

        if( !authCheck.check('setup') ) {
          AuthorityNoPermission();
          history.back()
          return;
        }

        c.m.initData(array);;
        c.v.update(array);

        selectAll.register(
          {
            "act_all": {
              "type": "select",
              "recv": [
                "act1",
                "act2",
                "act3",
                "act4",
                "act5",
                "act6",
                "act7",
                "act8",
                "act9",
                "act10",
                "act11",
                "act12",
                "act13",
                "act14",
                "act15",
                "act16"
              ]
            },
            "detect_all": {
              "type": "select",
              "recv": {
                "name": "detect",
                "start": 1,
                "number": INFO_DVRCHANNEL
              }
            }
          });

        snapshotHandler();

        snapshotHandler.setChno(c.chno);
        snapshotHandler.setCallback(c.v.updateSnapshot);
        snapshotHandler.start(1500);
      });
    },
    refreshHandler: function(chno) {
      var c = this;
      this.chno = chno;

      snapshotHandler.setChno(c.chno);

      var action = 'action=get_setup&menu=' + c.m.menu;
      action += '&chno=' + this.chno;

      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response);
        var chk = [];

        c._retouchData(array);

        c.m.initData(array);;
        c.v.update(array);
      });
    },
    blockChanged: function(data) {
      var c = this;
      var m = c.m;

      m.update(data);
    }
  },
  CamPrivMask: {
    chno : 0,
    privmaskWidget: {},

    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    registerEvent: function(len) {
      var v = this;
      var len = len;

      $('#chno').change(function(event, ui) {
        var c = $z.current;
        var ch = parseInt($(event.target).val());

        var width_ratio = $z.current.m.data["width_ratio"+ch];
        var height_ratio = $z.current.m.data["height_ratio"+ch];

        if(width_ratio == 4 && height_ratio == 3) {
          $("img#privmaskimg").width("540");
        } else {
          $("img#privmaskimg").width("720");
        }

        c.refreshHandler(ch);
        c.updatePrivMask(c.m.data);
      });
      $('#chno').change();

      $('#selectall').click(function(event,ui) {
        c.privmaskWidget.updateMblockAll('1');
      });

      $('#reverseall').click(function(event,ui) {
        c.privmaskWidget._updateMblockReverse();
      });

      $('#deleteall').click(function(event,ui) {
        c.privmaskWidget.updateMblockAll('0');
      });

    },
    initPrivMask: function(array) {
      // draw privmask blocks
      var c = this;

      c.privMaskWidget = new PrivMaskWidget(
          '#privmaskBlock',
          {
            numCh: INFO_DVRCHANNEL,
            maxLayers:10,
            img:$("#privmaskimg"),
            callback: c.maskChanged,
            layerSel: "selLayer",
            deselect: $("#deselect")
          }
          );

      c.privMaskWidget.updateData(array);

    },
    updatePrivMask: function(array) {
      // draw privmask blocks
      var c = this;
      var ch = parseInt(c.chno);

      c.privMaskWidget.updateCh(ch, array);

    },
    index : function() {
      var c = this;
      var action = 'action=get_setup&menu=' + c.m.menu;

      c.form('form',
        function before() {

        },
        function after() {

        }
      );

      action += '&chno=' + this.chno;

      if( $z.debug ) {
        action += '&debug=';
      }

      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response);
        var chk = [];
        authCheck = new AuthCheck(array);

        if( !authCheck.check('setup') ) {
          AuthorityNoPermission();
          history.back()
          return;
        }

        c.m.initData(array);;
        c.v.update(array);

        selectAll.register(
          {
            "act_all": {
              "type": "select",
              "recv": [
                "act1",
                "act2",
                "act3",
                "act4",
                "act5",
                "act6",
                "act7",
                "act8",
                "act9",
                "act10",
                "act11",
                "act12",
                "act13",
                "act14",
                "act15",
                "act16"
              ]
            },
            "maskcolor_all": {
              "type": "select",
              "recv": {
                "name": "maskcolor",
                "start": 1,
                "number": INFO_DVRCHANNEL
              }
            }
          });

        c.initPrivMask(array);
        c.updatePrivMask(array);

        c.registerEvent();
      });

      c.v.init();

      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.update(c.m.data);
        c.initPrivMask(c.m.data);
        c.updatePrivMask(c.m.data);
      });

      snapshotHandler();

      snapshotHandler.setChno(c.chno);
      snapshotHandler.setCallback(c.v.updateSnapshot);
      snapshotHandler.start(1500);

    },
    refreshHandler: function(chno) {
      var c = this;
      this.chno = chno;

      snapshotHandler.setChno(c.chno);
    },
    maskChanged: function(data, msg) {
      var c = $z.current;
      var m = c.m;
      var v = c.v;

      m.update(data);
    }
  },
  CamDmva: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    activex: document.getElementById("itxview"),
    me : null,
    activex_i : null,
    activex_p : null,
    activex_m : null,
    dmva_schedule : {},
    xmldata_old: [],
    xmldata_new: [],
    xmldata_path: [],
    index : function() {
      var c = this;
      var action = 'action=get_setup&menu=' + c.m.menu;

      c.form('form',
        function before() {
          $("#printMsg").text(langArray['LTXT_MSG_WAIT']);
          c.sendXML();
          $("#printMsg").text("");
        },
        function after() {
          // console.log("after");
        }
      );

      if( $z.debug ) {
        action += '&debug=';
      }
      c.v.init();

      $('input#cancel').click( function (event) {
        // c.m.revert();
        // c.v.update(c.m.data);
        // �시방편.
        location.reload();
      });

      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {

        var array = encode_to_array(response);
        var chk = [];

        c.activex_i = array['login_id'];
        c.activex_p = array['login_passwd'];
        c.activex_m = array['mac_address'];
        var auth = new AuthCheck(array);

        if( !auth.check('setup') ) {
          AuthorityNoPermission();
          history.back();
          return;
        }
        if(!isIE()) {
          browerErr();
          history.back();
          return;
        }

        c.setSchedule(response);

        $(window).unload(function() {
          var activex = document.getElementById("itxview");
          if (activex)
          {
            try {
              activex.SessionClose();
            }
            catch (e)
            {

            }
          }
        });
        c.m.initData(array);
        c.v.update(array);
      });
    },
    setXmlFile : function(ch) {
      var form = 'form';
      var data = form2Array(form);
      if( data )
        data = jQuery.param(data);

      var action = 'action=set_setup&menu=' + c.m.menu;
      action += '&chno=' + ch;
      action += '&text=' + data;
      alert(action);
      $.ajax({
        type: "GET",
        url: "/cgi-bin/webra_fcgi.fcgi",
        async: false,
        data: action,
        success: function(response) {
          // console.log("success");
        },
        fail: function(response) {
          alert('fail!');
        }
      });
    },
    EnableVA : function(ch, Flag) {
      if ( browerIE == false)
        return false;
      // console.log(ch);
      // console.log(Flag);
      var activex = document.getElementById("itxview");
      activex.EnableVA(Flag);
    },
    getXmlFile : function(ch,response) {
      var xml;
      var timestp = new Date().getTime();

      var vaChecker = response["va_cam_list"];
      var status = parseInt(vaChecker[ch]);
      if(status)
      {
        $("#ch_activation").attr("disabled",false);
        $("#vca_wizard").attr("disabled",false);
        $("#vca_submenu").attr("disabled",false);
        $("#vca_reset").attr("disabled",false);
      } else {
        $("#ch_activation").attr("disabled",true);
        $("#vca_wizard").attr("disabled",true);
        $("#vca_submenu").attr("disabled",true);
        $("#vca_reset").attr("disabled",true);

      }

      $.ajax({
          url : "/cgi-bin/webra_fcgi.fcgi?api=get_vaxml_raw&chno=" + ch + "&" + timestp,
          dataType: "xml",

          success : function (data) {
            var xmlstr = data.xml ? data.xml : (new XMLSerializer()).serializeToString(data);
            xmlstr += "\r\n";


            c.xmldata_old['xml_'+ch] = data;
            if ( browerIE == false)
              return false;

            var activex = document.getElementById("itxview");
            var inputCheck = activex.VCAGetConfig(ch);
            if(inputCheck.length <= 40){
              var SetVCA = activex.VCASetConfig(xmlstr, ch);
              if(!SetVCA)
                alert("Error");
            }

          },
          fail: function(data) {
            alert('Error');
          }
      });
    },
    sendXML : function(){
      var timestp = new Date().getTime();
      if ( browerIE == false)
        return false;

      var activex = document.getElementById("itxview");
      for(var i=0;i<INFO_DVRCHANNEL;i++){
        c.xmldata_new['xml_' + i] = activex.VCAGetConfig(i);

        if(c.xmldata_new['xml_' + i].length < 200){
          c.xmldata_new['xml_' + i] = ""
        }
      }


      for(var i=0;i<INFO_DVRCHANNEL;i++){
        if(c.xmldata_new['xml_'+i].length > 200){

          // console.log(c.xmldata_new['xml_'+i]);

          $.ajax({
            type: 'POST',
            url: '/cgi-bin/webra_vadata_upload.cgi',
            async: false,
            data: {
              chno : i,
              text: c.xmldata_new['xml_'+i]
            },
            success : function (data) {
              //file path 받아              if(data == "Error")
                return false;

              // console.log("success data");
              // console.log(data);
              var path = data.split("=");

              c.xmldata_path['path_'+i] = "/tmp/VCAXML/ch_"+i;
            },
            fail: function(data) {
              alert('Error');
            }
          });
        }
      }

      //�정�보 보내�
      var schedule_data = c.v.schedWidget.getBindData();
      schedule_data = c.getSchedule(schedule_data);

      var sendString = "";

      for(var i=0;i<INFO_DVRCHANNEL;i++){
        // console.log(c.xmldata_path['path_'+i]);
        if(c.xmldata_path['path_'+i] != undefined){
          sendString += "&path_" + i + "=" + c.xmldata_path['path_'+i];
        } else {
          sendString += "&path_" + i + "=" + 0;
        }

        sendString += "&schedule_" + i + "=" + c.dmva_schedule['va_cam'+i];

      }
      $.ajax({
        url : "/cgi-bin/webra_fcgi.fcgi?action=set_setup&menu=camera.dmva&" + timestp + sendString,
        type: "POST",
        async: false,
        success : function (data) {
          switch(data) {
          case 'DVR In Setup!':
            alert(langArray["LTXT_ERR_DVRINSETUP"]);
            return;
          case 'DVR In Arch!':
            alert(langArray["LTXT_ERR_DVRINARCH"]);
            return;
          }
          alert(langArray['LTXT_ERR_COMPLETE']);
        },
        fail: function(data) {
          alert('Send Error');
        }
      });
    },
    Wizard : function(ch) {
      if ( browerIE == false)
        return false;

      var activex = document.getElementById("itxview");
      activex.StartWizard();
    },
    showSubMenu : function(ch) {
      if ( browerIE == false)
        return false;

      var activex = document.getElementById("itxview");
      activex.SetupSubmenu();
    },
    sendVcaReset : function(ch) {
      var timestp = new Date().getTime();

      $.ajax({
        url : "/cgi-bin/webra_fcgi.fcgi?action=set_setup&menu=camera.dmvareset&" + timestp + "&chno=" + ch,
        type: "get",
        async: false,
        success : function (data) {
          switch(data) {
          case 'Send Error! 3':
            alert(langArray["LTXT_ERROR"]);
            return;
          case 'Send Error! 2':
            alert(langArray["LTXT_ERROR"]);
            return;
          }
          alert(langArray['LTXT_ERR_COMPLETE']);
        },
        fail: function(data) {
          alert(langArray["LTXT_ERROR"]);
        }
      });
    },
    importStrReplace : function(str) {
      var RepStr = str.replace(/"\//gi, '\\/');
      return RepStr;
    },
    xmlToString : function(xmlData) {
      var xmlString;
      //IE
      if (window.ActiveXObject){
          xmlString = xmlData.xml;
      }
      // code for Mozilla, Firefox, Opera, etc.
      else{
          xmlString = (new XMLSerializer()).serializeToString(xmlData);
      }

      return xmlString;
    },
    setSchedule : function(response) {
      var array = encode_to_array(response);

      c = this;

      var VaScheduleData = {};
      var pointer = 0;

      for(var i=0; i<7;i++){
        var item = {};
        var item1 = "";
        for(var j=0; j<INFO_DVRCHANNEL;j++){
          var data = array['va_sched'+j];
          var value = data.substr(pointer,24);
          item1 += value;
          // item['cam' + j] = value;
        }
        VaScheduleData['day'+i] = item1;

        pointer +=24;
      }
      c.dmva_schedule = VaScheduleData;
      // console.log(c.dmva_schedule);
    },
    getSchedule : function(schedule) {
      var pointer = 0;

      var VaScheduleData = {};
      for(var i=0; i<INFO_DVRCHANNEL;i++){
        var item = {};
        var item1 = "";
        for(var j=0; j<7;j++){
          var data = schedule[j];
          var value = data.substr(pointer,24);
          item1 += value;
          // item['cam' + j] = value;
        }
        VaScheduleData['va_cam'+i] = item1;

        pointer +=24;
      }

      c.dmva_schedule = VaScheduleData;
    },
    changeChannel : function(channel) {
      if ( browerIE == false)
        return false;
      SetSplitMode1(parseInt(channel)+1);
    },
    multiLanguage : function(key) {
      var value = "";

      return value;
    },
    connectActivex : function(id, pass, mac) {
      if ( browerIE == false)
        return false;

      var activex = document.getElementById("itxview");

      activex.SetAccount(id, pass);
      // activex.SetMaxLayout(1);
      activex.SetMacAddress(mac);

      var model = INFO_MODEL.substring(1, INFO_MODEL.length);
      activex.SetOEMCode(INFO_VENDOR, model);

      for ( var ch = 0; ch < INFO_DVRCHANNEL; ch++) {
        if (parseInt(INFO_CAMTITLE_ON)) {
          activex.SetCameraName(ch, INFO_CAMTITLE[ch]);
        } else {
          activex.SetCameraName(ch, "");
        }
      }

      var PORT = INFO_RTSPPORT;

      var PROXY_SVR = "127.0.0.1:";
      if (window.location.host.indexOf(PROXY_SVR) >= 0) {
        PORT = parseInt(window.location.port) - 1;
      }
      activex.SetSetupMode(2);
      SetCovertSetting();
      activex.SetEventOSD(INFO_EVENTICON_ON);
      activex.SetDatetimeFormat(INFO_DATEFORMAT, INFO_TIMEFORMAT);
      activex.SetAudioSync(false);
      activex.SetStreamType(1);

      if (!activex) {
        alert("activex connection fail!");
        return false;
      }

      try{
        activex.SessionOpen(window.location.hostname+"/live", PORT, 1, 1, 1, 0, 0);
      } catch (No_Activex_download) {
        alert('activex connection fail!');
        return false;
      }

      var ch = $("#ch_select option:selected").val();
      SetSplitMode1(parseInt(ch)+1);
      // activex.SetSplitMode(0, parseInt(parseInt(c.v.ch.getValue()) + 1));
      return true;
    }
  },
  CamType: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;

      /*
      c.form('form',
      function before() {
      if( !confirm('System will be reboot') ) {
      return -1;
      }

      return 0;
      },
      function after() {

      }
      );
      */

      if( $z.debug ) {
        action += '&debug=';
      }
      c.v.init();

      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response);
        var chk = [];
        var auth = new AuthCheck(array);

        if( !auth.check('setup') ) {
          AuthorityNoPermission();
          history.back()
          return;
        }

        c.v.update(array);
        c.m.initData(array);;
      });
    }
  },
  CamPTZ: {
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

      if( $z.debug ) {
        action += '&debug=';
      }
      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.update(c.m.data);
      });

      $('input[name^="rs485"]').change( function (event) {
        if (INFO_MODEL.indexOf('IPX') < 0) {
          return;
        }
        var el = $(event.target);
        var row = el.parents("tr");

        if( el.prop("checked") ) {
          row.children('.disabled_target').removeClass("disabled");
          row.find("input,select").prop("disabled", false);
        } else {
          row.children('.disabled_target').addClass("disabled")
          row.find("input,select").prop("disabled", true);
        }

        el.prop("disabled", false);

      });

      c.v.init();

      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response);
        var chk = [];
        var auth = new AuthCheck(array);

        if( !auth.check('setup') ) {
          AuthorityNoPermission();
          history.back()
          return;
        }

        c.v.update(array);
        c.m.initData(array);
      });
    }
  },
  CamTamper: {
    chno : 0,

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

      action += '&chno=' + this.chno;

      if( $z.debug ) {
        action += '&debug=';
      }
      c.v.init();

      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.update(c.m.data);
      });

      $('#tamper-tabs').bind('tabsselect', function(e, ui) {
        if( ui.index == 0 ) {
          $('#tamper_block').show();
        } else if( ui.index == 1 ) {
          $('#tamper_block').hide();
        }
      });

      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response);
        array['area'] = array['rebl_area']; // to use MotionWidget
        var chk = [];
        authCheck = new AuthCheck(array);

        if( !authCheck.check('setup') ) {
          AuthorityNoPermission();
          history.back()
          return;
        }

        c.v.update(array);
        c.m.initData(array);;
        selectAll.register(
          {
            "act_all": {
              "type": "select",
              "recv": [
                "act1",
                "act2",
                "act3",
                "act4",
                "act5",
                "act6",
                "act7",
                "act8",
                "act9",
                "act10",
                "act11",
                "act12",
                "act13",
                "act14",
                "act15",
                "act16"
              ]
            },
            "mark_all": {
              "type": "select",
              "recv": {
                "name": "mark",
                "start": 1,
                "number": INFO_DVRCHANNEL
              }
            }
          });
        c.v.update(array);
        c.m.initData(array);

      });
      snapshotHandler();

      snapshotHandler.setChno(c.chno);
      snapshotHandler.setCallback(c.v.updateSnapshot);
      snapshotHandler.start(1500);
    },
    refreshHandler: function(chno) {
      var c = this;
      this.chno = chno;

      snapshotHandler.setChno(c.chno);

      var action = 'action=get_setup&menu=' + c.m.menu;
      action += '&chno=' + this.chno;

      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response);
        array['area'] = array['rebl_area']; // to use MotionWidget
        var chk = [];

        c.v.update(array);
        c.m.initData(array);;
      });
    },
    blockChanged: function(data) {
      var c = this;
      var m = c.m;

      m.update(data);
    },
    update : function(data) {
      $.extend(this.data, data);
    }
  },
  AnalogType: {
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

      if( $z.debug ) {
        action += '&debug=';
      }
      c.v.init();

      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response);
        var chk = [];
        authCheck = new AuthCheck(array);

        if(response.indexOf("DVR In Setup!") >= 0) {
            alert(dvrinsetup);
            history.back();
            return false;
        } else if(response.indexOf("DVR In Arch!") >= 0) {
            alert(dvrinarchive);
            history.back();
            return false;
        } else if(response.indexOf("Send Error!") >= 0) {
            alert(errSend);
            history.back();
            return false;
        } else if(response.indexOf('DVR In Not Live!') >= 0) {
            alert(langArray['LTXT_DVR_NOT_LIVE']);
            history.back();
            return false;
        } else if(response.indexOf('DVR In SCM not ready!') >= 0) {
            alert(langArray['LTXT_ERR_NVR_NOT_READY']);
            history.back();
            return false;
        }

        if( !authCheck.check('setup') ) {
          AuthorityNoPermission();
          history.back()
          return;
        }

        c.v.update(array);
        c.m.initData(array);

        $('input#cancel').click( function (event) {
          c.m.revert();
          c.v.update(c.m.data);
        });
      });
    }
  }
});
