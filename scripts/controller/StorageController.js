/**
 * @author chcha
 */

/**
 * StorageDiskinfo Controller
 *
 * This is a storage diskinfo controller
 *
 */

$z.c({
  StorageDiskinfo: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    me : null,
    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;
      c.form('form',
        function before() {},
        function after() {}
      );

      if( $z.debug ) {
        action += '&debug=';
      }
      c.v.init();

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
  },
  StorageDiskop: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    origLimitType : '0',
    index : function() {
      var c = this,
        tips = $('.tips');
      this.me = this;

      var action = 'action=get_setup&menu=' + c.m.menu;
      c.form('form',
        function before() {
          var isChange = false;

          if ($z.current.m.origData['timelimit'] != $('#timelimit').val()
            || $z.current.m.origData['overwrite'] != $('#overwrite').val()) {
            isChange = true;
          }
          if (isChange) {
            $('#dialog_pleasewait').dialog('open');
          }
          return -1;
        },
        function after() {}
      );

      if( $z.debug ) {
        action += '&debug=';
      }
      c.v.init();

      var progressbar = $('#progressbar');

      $('#progressbar').progressbar({
        value: false,
        change: function() {
          c.updateTips(progressbar.progressbar( 'value' ) + ' %');
        },
        complete: function () {
          c.updateTips(langArray['LTXT_ERR_SUCCESS']);
          $('#dialogOk').button({ disabled: false });
        }
      });

      $('#dialog_pleasewait').dialog({
        autoOpen: false,
        modal: true,
        show: 'drop',
        hide: 'drop',
        draggable: false,
        title: langArray["LTXT_WAIT"],
        resizable: false,
        closeOnEscape: false,
        autoResize: true,

        open: function(event, ui) {
          $(".ui-dialog-titlebar-close").hide();
          $('#waitOk').button({ disabled: true });
          c.updateTips(langArray['LTXT_WAIT'], true);

          var action = 'action=set_setup&menu=storage.diskop';
          action += '&overwrite=' + $('#overwrite').val();
          action += '&timelimit=' + $('#timelimit').val();
          switch ($('#timelimit_c_type').val()) {
            case '0':
              action += '&timelimit_type=0';
              break;
            case '3600':
              action += '&timelimit_type=1';
              break;
            case '86400':
              action += '&timelimit_type=2';
              break;
            case '604800':
              action += '&timelimit_type=3';
              break;
            default:
              action += '&timelimit_type=0';
              break;
          }

          action += '&systemRestart=1';

          if($("#timelimit_c").prop("disabled") == false && $("#timelimit_c").val() == 0) {
            c.updateTips(langArray["LTXT_RECSET_TIMELIMIT_LARGE_ZERO"]);
            $('#waitOk').button({ disabled: false });
            return false;
          }

          $.ajax({
            type: "POST",
            url: "/cgi-bin/webra_fcgi.fcgi",
            async: false,
            data: action,
            success: function(response) {
              switch(response) {
              case 'DVR In Setup!':
                c.updateTips(langArray["LTXT_ERR_DVRINSETUP"]);
                $('#waitOk').button({ disabled: false });
                return;
              case 'DVR In Arch!':
                c.updateTips(langArray["LTXT_ERR_DVRINARCH"]);
                $('#waitOk').button({ disabled: false });
                return;
              case 'DVR In Not Live!':
                c.updateTips(langArray["LTXT_DVR_NOT_LIVE"]);
                $('#waitOk').button({ disabled: false });
                return;
              case 'DVR In SCM not ready!':
                c.updateTips(langArray["LTXT_ERR_NVR_NOT_READY"]);
                $('#waitOk').button({ disabled: false });
                return;
              }
              c.updateTips(langArray['LTXT_MSG_WAIT'], true);

              if( (INFO_MODEL.indexOf("ATM") < 0 && INFO_MODEL.indexOf("ANF") < 0 && INFO_MODEL.indexOf("UTM") < 0)
                || (INFO_MODEL.indexOf("4G") >= 0)
                || (INFO_MODEL.indexOf("5G") >= 0 || INFO_MODEL.indexOf("5X") >= 0 || INFO_MODEL.indexOf("5HG") >= 0)) {
                $.scm.Start();
                $.scm.RegistCallback('IRET_RESTART_SERVICE', c.CbRetComplete);
              } else {
                $('#waitOk').button({ disabled: false });
                $('.tips').html(langArray['LTXT_ERR_SUCCESS']);
              }
              $z.current.m.origData['timelimit'] = $('#timelimit').val();
              $z.current.m.origData['overwrite'] = $('#overwrite').val() ;
                
              if($('#timelimit_c_type').val()%604800 == 0)
                  $z.current.m.origData['timelimit_type'] = '3';
              else if($('#timelimit_c_type').val()%86400 == 0)
                  $z.current.m.origData['timelimit_type'] = '2';
              else if($('#timelimit_c_type').val()%3600 == 0)
                  $z.current.m.origData['timelimit_type'] = '1';
              else
                  $z.current.m.origData['timelimit_type'] = '0';

                return true;
              },
            fail: function(response) {
              c.updateTips(langArray['LTXT_ERR_SEND']);
              $('#waitOk').button({ disabled: false });
              return false;
            }
          });
        },
        close: function(vent, ui) {
          $.scm.UnregistCallback('IRET_RESTART_SERVICE', c.CbRetComplete);
        },
        buttons: [{
          id: 'waitOk',
          text: langArray['LTXT_OK'],
          click: function() {
            $(this).dialog('close');
          }
        }]
      });

      $('#dialog_format').dialog({
        autoOpen: false,
        modal: true,
        show: 'drop',
        hide: 'drop',
        draggable: false,
        title: langArray["LTXT_SETUPSTORAGE_OPERATION_DISKFORMAT"],
        width: '450px',
        resizable: false,
        closeOnEscape: false,
        autoResize: true,
        me: null,

        open: function(event, ui) {
          $(".ui-dialog-titlebar-close").hide();
          $('#div_password_check').show();
          $('#div_format_message').hide();
          $('#div_format_progress').hide();
          this.state = 'pass';
        },
        close: function(event, ui) {
          c.updateTips('', true);
          $('#password').val('');
          $.scm.UnregistCallback('INFY_FORMAT_RATE', c.CbNfyFormatRate);
          $.scm.UnregistCallback('INFY_FORMAT_CMPL', c.CbNfyFormatCmpl);
          $.scm.UnregistCallback('IRET_SCM_FORMAT_STORAGE', c.CbRetFormatStorage);
        },
        buttons: [{
          id: "dialogOk",
          text: langArray["LTXT_OK"],
          click: function() {
            //btn_input.run(1);
            var me = this;
            switch (this.state) {
            case 'pass':
              var action = 'action=get_info&menu=login.passwd';

              $.ajax({
                type: "POST",
                url: "/cgi-bin/webra_fcgi.fcgi",
                async: false,
                data: action,
                success: function(response) {
                  var p = encode_to_array(response);
                  if ( $('#password').val() == p['login_passwd'] ) {
                    me.state = 'confirm';
                    $('#div_password_check').hide();
                    $('#div_format_message').show();
                    c.updateTips('', true);
                    return true;
                  } else {
                    // update tip
                    c.updateTips(langArray['LTXT_ERR_USERPASSWD']);
                    return false;
                  }
                },
                fail: function(response) {
                  return false;
                }
              });
              break;
            case 'confirm':
              // ajax call
              $('#dialogOk').button({ disabled: true });
              $('#dialogClose').button({ disabled: true });
              var action = 'action=set_setup&menu=storage.btn&btn=1';



              $.ajax({
                type: "POST",
                url: "/cgi-bin/webra_fcgi.fcgi",
                async: false,
                data: action,
                success: function(response) {
                  switch(response) {
                  case 'DVR In Setup!':
                    c.updateTips(langArray["LTXT_ERR_DVRINSETUP"]);
                    $('#dialogOk').button({ disabled: false });
                    $('#dialogClose').button({ disabled: false });
                    return;
                  case 'DVR In Arch!':
                    c.updateTips(langArray["LTXT_ERR_DVRINARCH"]);
                    $('#dialogOk').button({ disabled: false });
                    $('#dialogClose').button({ disabled: false });
                    return;
                  case 'DVR In Not Live!':
                    c.updateTips(langArray['LTXT_DVR_NOT_LIVE']);
                    $('#dialogOk').button({ disabled: false });
                    $('#dialogClose').button({ disabled: false });
                    return;
                  case 'DVR In SCM not ready!':
                    c.updateTips(langArray['LTXT_ERR_NVR_NOT_READY']);
                    $('#dialogOk').button({ disabled: false });
                    $('#dialogClose').button({ disabled: false });
                    return;
                  }
                  $('#div_password_check').hide();
                  $('#div_format_message').hide();
                  $('#div_format_progress').show('clip', null, 500, null);
                  c.updateTips(langArray['LTXT_PROGRESS']);
                  $.scm.Start();
                  $.scm.RegistCallback('INFY_FORMAT_RATE', c.CbNfyFormatRate);
                  $.scm.RegistCallback('INFY_FORMAT_CMPL', c.CbNfyFormatCmpl);
                  $.scm.RegistCallback('IRET_SCM_FORMAT_STORAGE', c.CbRetFormatStorage);
                  $('#progressbar').progressbar({
                    value: 0
                  });
                  me.state = 'done';
                  return true;
                },
                fail: function(response) {
                  return false;
                }
              });
              break;
            case 'done':
              $(this).dialog('close');
              break;
            default:
              break;
            }

            //$('#dialog_fw_upgrade').animate({height:'140px'});
            //$('#div_confirm_upgrade').show('clip', null, 500, null);
            //$('#dialogUpgrade').button({ disabled: true });
          }
        },
        {
          id: "dialogClose",
          text: langArray["LTXT_CANCEL"],
          click: function() {
            // TODO: msg initialize
            $('#div_password_check').show();
            $('#div_format_message').hide();
            $('#div_format_progress').hide();
            $(this).dialog('close');
          }
        }]
      });

      $('#overwrite').change( function () {
        if ( $('#overwrite').val() == '0' ) {
          $('#timelimit').attr('disabled', 'disabled');
          $('#timelimit_s').attr('disabled', 'disabled');
          $('#timelimit_c').attr('disabled', 'disabled');
          $('#timelimit_c_type').attr('disabled', 'disabled');
          $('#timelimit_c_type').change();
        } else {
          $('#timelimit').removeAttr('disabled');
          $('#timelimit_s').removeAttr('disabled');
          $('#timelimit_c').removeAttr('disabled');
          $('#timelimit_c_type').removeAttr('disabled');
          $('#timelimit_c_type').change();
        }
      });

      $('#timelimit_s').change( function () {
        var value;
        value = parseInt($('#timelimit_s').val());
        $('#timelimit').val(value);
      });

      $('#timelimit_c').change( function (e) {
        c.CalcTimelimitComplex(e);
      });

      $('#timelimit_c_type').change( function (e) {
        if($('#overwrite').val() == '0' || $('#timelimit_c_type').val() == '0') {
          $("#timelimit_c").attr("disabled", "disabled");
          // $("#timelimit_c").val(0);
        }
        else {
          $("#timelimit_c").removeAttr("disabled");
          // $("#timelimit_c").val(1);
        }
        c.CalcTimelimitComplex(e);
      });

      $('#format_btn').button().click( function() {
        $( "#dialog_format" ).dialog( "open" );
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
      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.update(c.m.data);
      });
    },
    CalcTimelimitComplex: function(e) {
      var c = this;
      var value = $('#timelimit_c').val();
      var type = parseInt($('#timelimit_c_type').val());

      value = value * type;

      if (value > 7776000) {
        alert(langArray["LTXT_SETUPSTORAGE_TIMELIMIT_3MONTH_ERROR"]);
        $('#timelimit_c_type').val(c.origLimitType);
        value = $('#timelimit').val();

        $('#timelimit_c').val(value / c.origLimitType);
        return;
      }
      $('#timelimit').val(value);
      c.origLimitType = $('#timelimit_c_type').val();
    },
    CbRetComplete: function() {
      $z.current.updateTips(langArray['LTXT_CONFIGURATION_SAVED'], true);
      $.scm.Stop();
      $z.current.m.origData['overwrite'] = $('#overwrite').val();
      setTimeout( function() {
        $('#dialog_pleasewait').dialog('close');
      }, 3000);
    },
    CbNfyFormatRate : function (param) {
      // INFY_FORMAT_RATE
      $('#progressbar').progressbar({
        value: parseInt(param)
      });
      return true;
    },
    CbNfyFormatCmpl : function (param) {
      // INFY_FORMAT_CMPL

      $.scm.Stop();

      $('#progressbar').progressbar({
        value: 100
      });
      return true;
    },
    CbRetFormatStorage : function (Param) {
      // IRET_SCM_FORMAT_STORAGE
      return true;
    },
    updateTips : function ( t , noEffect) {
      tips = $('.tips');
      if (noEffect == undefined) {
          tips
          .html( t );
        try {
          tips.addClass( "ui-state-highlight" );
          setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
          }, 500 );
        } catch (e) {
        }
      } else {
        tips
        .html( t );
      }
    }
  },
  StorageSmart: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;

      if( $z.debug ) {
        action += '&debug=';
      }
      c.v.init();

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
