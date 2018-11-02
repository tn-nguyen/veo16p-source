/**
 * @author chcha
 */

$z.c({
  SystemDatetime: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    tzoffset : Array(
      720, 660, 600, 540, 480,
      420, 360, 300, 240, 210,
      180, 120, 60,     0,   -60,
      -120, -120,  -180,  -210,  -240,
      -270,   -300,  -330,  -345,  -360,
      -390,   -420,  -480,  -540,  -540,
      -570,   -570,  -600,  -660,  -720,
      -480,   -120,  -120,  -120,  -180,
      -180,   -210,  -240,  -600,  -420
      ),
    origTime : null,
    origTimezone: null,
    time: {
      yyyy: null,
      mm: null,
      dd: null,
      hour : null,
      min : null,
      sec : null
    },

    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;

      c.form('form',
        function before() {
          var err = Validator.test("url", "#nettimeservsetup", 4, 64);
          if( err ) {
            alert("Invalid URL");
            return -1;
          }

          var orig_t = $z.current.origTime;
          var targ_t = $z.current.m.data['curr_gmttime'];

          if(orig_t != targ_t) {
            $('#dialog_change_confirm').dialog('open');
            return -1;
          }
          else {
            return;
          }
        },
        function after() {
          c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
            var array = encode_to_array(response);
            var chk = [];
            authCheck = new AuthCheck(array);

            c.time.yyyy = array['yyyy'];
            c.time.mm = array['mm'];
            c.time.dd = array['dd'];
            c.time.hour = array['hour'];
            c.time.min = array['min'];
            c.time.sec = array['sec'];

            $z.current.origTime = array['curr_gmttime'];

            //--- DO NOT APPLY DST ON JAVASCRIPT ---
            // c.origTime = parseInt(array['curr_gmttime']);
            // dt = c.tmpTime = new Date( c.origTime * 1000);
            // c.origTimezone = c.tzoffset[ parseInt( array['timezone'] ) ];
            //
            //
            // if( parseInt( array['timezone'] ) == 44) {
            //   dt.setUTCMinutes(dt.getUTCMinutes() + dt.getTimezoneOffset() );
            //   dt.setUTCMinutes(dt.getUTCMinutes() + c.origTimezone);
            // }else {
            //   dt.setUTCMinutes(dt.getUTCMinutes() + dt.getTimezoneOffset() );
            //   dt.setUTCMinutes(dt.getUTCMinutes() - c.origTimezone);
            // }
            //
            // array['yyyy'] = c.time.yyyy = dt.getFullYear();
            // array['mm'] = c.time.mm = dt.getMonth() + 1;
            // array['dd'] = c.time.dd = dt.getDate();
            // array['hour'] = c.time.hour = dt.getHours();
            // array['min'] = c.time.min = dt.getMinutes();
            // array['sec'] = c.time.sec = dt.getSeconds();
            //
            // // ajax call
            // $.ajax({
            //   url: "/cgi-bin/webra_fcgi.fcgi",
            //   type: 'POST',
            //   data: "action=get_setup&menu=system.datetime_tzinfo",
            //   async: false,
            //   dataType: 'text'
            // }).done(function(data) {
            //   arr = encode_to_array(data);
            // });
            //
            // var timezone = new TimeZone(arr);
            // var myDate = new MyDate(timezone, {useDST: ($('#dst').val() == '1')});
            //
            // var dst_end = new Date(timezone.data[array['yyyy']]['dstEject']);
            // var dst_start = new Date(timezone.data[array['yyyy']]['dstEntry']);
            //
            // dst_start.setUTCMinutes(dst_start.getUTCMinutes() + dst_start.getTimezoneOffset());
            // dst_start.setUTCMinutes(dst_start.getUTCMinutes() - c.origTimezone);
            // dst_end.setUTCMinutes(dst_end.getUTCMinutes() + dst_end.getTimezoneOffset());
            // dst_end.setUTCMinutes(dst_end.getUTCMinutes() - c.origTimezone);
            //
            // var start_value = dst_start.getFullYear() * 1000000 + (dst_start.getMonth()+1) * 10000 + (dst_start.getDate() * 100) + dst_start.getHours();
            // var end_value = dst_end.getFullYear() * 1000000 + (dst_end.getMonth()+1) * 10000 + (dst_end.getDate() * 100) + dst_end.getHours();
            // var current_value = array['yyyy'] * 1000000 + array['mm'] * 10000 + array['dd'] * 100 + array['hour'];
            //
            // if((array['dst'] == 1) && (dst_start.getFullYear() >= 1980)) {
            //   if(start_value <= end_value) {
            //     if((start_value <= current_value) && (end_value >= current_value))
            //       array['hour'] += 1;
            //   }
            //   else {
            //     if((start_value >= current_value) || (end_value <= current_value)) {
            //       array['hour'] += 1;
            //     }
            //   }
            // }

            c.v.update(array);
            c.m.initData(array);
          });
        }
      );

      if( $z.debug ) {
        action += '&debug=';
      }

      c.v.init();

      $('#dialog_change_confirm').dialog({
        autoOpen: false,
        modal: true,
        show: 'drop',
        hide: 'drop',
        title: langArray['LTXT_CONFIRM_PASSWORD'],
        draggable: false,
        resizable: false,
        closeOnescape: false,
        autoResize: true,
        open: function(event, ui) {
          $('#div_password_check').show();
          $('#div_confirm_msg').hide();
          $('#dialogOk').button({ disabled: false });
          $('#dialogClose').button({ disabled: false });
          cmd_t = new Date();
          cmd_t = cmd_t.getTime() / 1000;
          cmd_t = cmd_t.toFixed();

          this.orig_t = $z.current.origTime;
          this.targ_t = $z.current.m.data['curr_gmttime'];

          this.year = $z.current.m.data['yyyy'];
          this.month = $z.current.m.data['mm'];
          this.day = $z.current.m.data['dd'];
          this.hour = $z.current.m.data['hour'];
          this.minute = $z.current.m.data['min'];
          this.second = $z.current.m.data['sec'];

          this.cmd_t = cmd_t;
          this.state = 'pass';
          $(this).dialog('option', 'title', langArray["LTXT_CONFIRM_PASSWORD"]);
        },
        close: function(event, ui) {
          c.updateTips('', true);
          $('#password').val('');
          this.state = 'pass'
          $.scm.UnregistCallback('IRET_SCM_CHANGE_SYSTEM_TIME', c.CbRetChangeSysTime);
        },
        buttons: [{
          id: "dialogOk",
          text: langArray["LTXT_OK"],
          click: function() {
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
                      var date_orig_t = new Date();
                      var date_targ_t = new Date();

                      date_orig_t.setFullYear($z.current.m.origData.yyyy);
                      date_orig_t.setMonth($z.current.m.origData.mm);
                      date_orig_t.setDate($z.current.m.origData.dd);
                      date_orig_t.setHours($z.current.m.origData.hour);
                      date_orig_t.setMinutes($z.current.m.origData.min);
                      date_orig_t.setSeconds($z.current.m.origData.sec);

                      date_targ_t.setFullYear($z.current.m.data.yyyy);
                      date_targ_t.setMonth($z.current.m.data.mm);
                      date_targ_t.setDate($z.current.m.data.dd);
                      date_targ_t.setHours($z.current.m.data.hour);
                      date_targ_t.setMinutes($z.current.m.data.min);
                      date_targ_t.setSeconds($z.current.m.data.sec);

                      if((+date_orig_t) > (+date_targ_t)) {
                        me.state = 'confirm';
                        $(me).dialog('option', 'title', langArray["LTXT_WARNING"]);
                        $('#div_password_check').hide();
                        $('#div_confirm_msg').show();
                        c.updateTips('', true);
                      }
                      else {
                        me.state = 'done';
                        $('#dialogOk').button({ disabled: true });
                        $('#dialogClose').button({ disabled: true });
                        var action = 'action=set_setup&menu=system.changetime';

                        action += '&curr_gmttime=' +me.targ_t;
                        action += '&cmd_gmttime=' + me.targ_t;

                        action += '&year=' + me.year;
                        action += '&month=' + me.month;
                        action += '&day=' + me.day;
                        action += '&hour=' + me.hour;
                        action += '&minute=' + me.minute;
                        action += '&second=' + me.second;

                        action += '&change_flag=' + 1;

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
                            $('#div_confirm_msg').hide();
                            c.updateTips(langArray['LTXT_SYSTIME_CHANGING']);
                            $(me).dialog('option', 'title', langArray["LTXT_WAITING"]);
                            $.scm.Start();
                            $.scm.RegistCallback('IRET_SCM_CHANGE_SYSTEM_TIME', c.CbRetChangeSysTime);
                            return true;
                          },
                          fail: function(response) {
                            return false;
                          }
                        });
                      }


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
                me.state = 'done';
                $('#dialogOk').button({ disabled: true });
                $('#dialogClose').button({ disabled: true });
                var action = 'action=set_setup&menu=system.changetime';

                action += '&curr_gmttime=' +me.targ_t;
                action += '&cmd_gmttime=' + me.targ_t;

                action += '&year=' + me.year;
                action += '&month=' + me.month;
                action += '&day=' + me.day;
                action += '&hour=' + me.hour;
                action += '&minute=' + me.minute;
                action += '&second=' + me.second;

                action += '&change_flag=' + 1;

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
                    $('#div_confirm_msg').hide();
                    c.updateTips(langArray['LTXT_SYSTIME_CHANGING']);
                    $(me).dialog('option', 'title', langArray["LTXT_WAITING"]);
                    $.scm.Start();
                    $.scm.RegistCallback('IRET_SCM_CHANGE_SYSTEM_TIME', c.CbRetChangeSysTime);
                    return true;
                  },
                  fail: function(response) {
                    return false;
                  }
                });
                break;
              case 'done':
                //if ($z.current.changeTime(c)) {
                $(this).dialog('close');
                break;
            }
          }
        }, {
          id: "dialogClose",
          text: langArray["LTXT_CANCEL"],
          click: function() {
            $('#div_password_check').show();
            $('#div_confirm_message').hide();
            $(this).dialog('close');
          }
        }]
      });

      $('#dialog_timesetting').dialog({
        autoOpen: false,
        modal: true,
        show: 'drop',
        hide: 'drop',
        title: langArray["LTXT_SETUPSYSDATETIME_DATETIMESETTING"],
        width: '320px',
        resizable: false,
        closeOnEscape: false,
        autoResize: true,
        me: null,
        time: null,

        open: function(event, ui) {
          time = $(this).data('time');
          time.hour = $z.current.m.data.hour;
          date = '' + time.mm + '/' + time.dd + '/' + time.yyyy;
          $(".ui-dialog-titlebar-close").hide();
          $('#datepicker').datepicker({
            minDate: new Date(2008, 1 - 1, 1),
            maxDate: new Date(2036, 1 - 1, 1),
            showButtonPanel: true,
            changeMonth: true,
            changeYear: true
          });
          $('#datepicker').datepicker('setDate', date);
          switch($('#dateformat').val()) {
            case '0':
              $('#datepicker').datepicker('option', 'dateFormat', 'yy-mm-dd');
              break;
            case '1':
              $('#datepicker').datepicker('option', 'dateFormat', 'mm-dd-yy');
              break;
            case '2':
              $('#datepicker').datepicker('option', 'dateFormat', 'dd-mm-yy');
              break;
            default:
              $('#datepicker').datepicker('option', 'dateFormat', 'yy-mm-dd');
              break;
          }

          $('#hourpicker').val(parseInt(time.hour));
          $('#minutepicker').val(time.min);
          $('#secondpicker').val(time.sec);
          $('#datePickerCancel').focus();
        },
        close: function(event, ui){
        },
        buttons: [{
          text: langArray["LTXT_OK"],
          click: function() {
            t = $z.current.time;
            picker = $('#datepicker').datepicker('getDate');
            t.yyyy = picker.getFullYear();
            t.mm = picker.getMonth()+1;
            t.dd = picker.getDate();
            t.hour = parseInt($('#hourpicker').val());
            t.min = parseInt($('#minutepicker').val());
            t.sec = parseInt($('#secondpicker').val())
            $('#datepicker').datepicker('destroy');

            var utcTD = new Date();
            utcTD.setFullYear(t.yyyy);
            utcTD.setMonth(t.mm);
            utcTD.setDate(t.dd);
            utcTD.setHours(t.hour);
            utcTD.setMinutes(t.min);
            utcTD.setSeconds(t.sec);
            utcTD.setMilliseconds(0);

            tz = $z.current.tzoffset[parseInt($('#timezone').val())];

            //set YEAR-MONTH-DAY to data(without GTM calculating).
            $z.current.m.data['yyyy'] = utcTD.getFullYear();
            $z.current.m.data['mm'] = utcTD.getMonth();
            $z.current.m.data['dd'] = utcTD.getDate();
            $z.current.m.data['hour'] = utcTD.getHours();
            $z.current.m.data['min'] = utcTD.getMinutes();
            $z.current.m.data['sec'] = utcTD.getSeconds();

            //curr_gmttime is no more using in 'webbase_packet_set_change_time'.
            //utcTD.setUTCMinutes(utcTD.getUTCMinutes() - tz);
            //utcTD.setUTCMinutes(utcTD.getUTCMinutes() + utcTD.getTimezoneOffset());

            $z.current.m.data['curr_gmttime'] = utcTD.getTime() / 1000;
            var e = jQuery.Event("change");
            $('#dateformat').trigger(e);
            $(this).dialog('close');
          }
        }, {
          id: 'datePickerCancel',
          text: langArray["LTXT_CANCEL"],
          click: function() {
            $('#datepicker').datepicker('destroy');
            $(this).dialog('close');
          }
        }]
      });

      $('#dayandtime').button().click( function() {
        $( "#dialog_timesetting" ).data('time', c.time).dialog( "open" );
      });

      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.update(c.m.data);
      });

      $('input#nettimeservsetup').focusout(function(event) {
        if( !CheckDomailFormat($('input#nettimeservsetup').val()) ) {
          alert(errSpecialChar);
          $('input#nettimeservsetup').focus();
        }
        return true;
      });

      $('select#timezone').change( function(event) {
        if( $(this).val() == '99' ) {
          $('select[id^="userdst"]').prop('disabled', false);
        } else {
          $('select[id^="userdst"]').prop('disabled', true);
        }
      });

      $('#dateformat').change( function(event) {
        c.changeScheduleSyncTime();
        c.v.getDayTimeText( c.time, $('#dateformat').val(), $('#timeformat').val() );
      });

      $('#timeformat').change( function(event) {
        c.v.getDayTimeText( c.time, $('#dateformat').val(), $('#timeformat').val() );
      });

      $("#autotimesync").change (function(event) {
        c.changeScheduleSyncTime();
      });

      $("#syncfreq").change (function(event) {
        c.changeScheduleSyncTime();
      });

      $("#synctime").change (function(event) {
        c.changeScheduleSyncTime();
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

        c.origTime = parseInt(array['curr_gmttime']);
        dt = c.tmpTime = new Date( c.origTime * 1000);
        c.origTimezone = c.tzoffset[ parseInt( array['timezone'] ) ];

        if( parseInt( array['timezone'] ) == 44) {
          dt.setUTCMinutes(dt.getUTCMinutes() + dt.getTimezoneOffset() );
          dt.setUTCMinutes(dt.getUTCMinutes() + c.origTimezone);
        }else {
          dt.setUTCMinutes(dt.getUTCMinutes() + dt.getTimezoneOffset() );
          dt.setUTCMinutes(dt.getUTCMinutes() - c.origTimezone);
        }

        array['yyyy'] = c.time.yyyy = dt.getFullYear();
        array['mm'] = c.time.mm = dt.getMonth() + 1;
        array['dd'] = c.time.dd = dt.getDate();
        array['hour'] = c.time.hour = dt.getHours();
        array['min'] = c.time.min = dt.getMinutes();
        array['sec'] = c.time.sec = dt.getSeconds();

        // ajax call
        $.ajax({
          url: "/cgi-bin/webra_fcgi.fcgi",
          type: 'POST',
          data: "action=get_setup&menu=system.datetime_tzinfo",
          async: false,
          dataType: 'text'
        }).done(function(data) {
          arr = encode_to_array(data);
        });

        var timezone = new TimeZone(arr);
        var myDate = new MyDate(timezone, {useDST: ($('#dst').val() == '1')});

        var dst_end = new Date(timezone.data[array['yyyy']]['dstEject']);
        var dst_start = new Date(timezone.data[array['yyyy']]['dstEntry']);

        dst_start.setUTCMinutes(dst_start.getUTCMinutes() + dst_start.getTimezoneOffset());
        dst_start.setUTCMinutes(dst_start.getUTCMinutes() - c.origTimezone);
        dst_end.setUTCMinutes(dst_end.getUTCMinutes() + dst_end.getTimezoneOffset());
        dst_end.setUTCMinutes(dst_end.getUTCMinutes() - c.origTimezone);

        var start_value = dst_start.getFullYear() * 1000000 + (dst_start.getMonth()+1) * 10000 + (dst_start.getDate() * 100) + dst_start.getHours();
        var end_value = dst_end.getFullYear() * 1000000 + (dst_end.getMonth()+1) * 10000 + (dst_end.getDate() * 100) + dst_end.getHours();
        var current_value = array['yyyy'] * 1000000 + array['mm'] * 10000 + array['dd'] * 100 + array['hour'];

        if((array['dst'] == 1) && (dst_start.getFullYear() >= 1980)) {
          if(start_value <= end_value) {
            if((start_value <= current_value) && (end_value >= current_value))
              array['hour'] += 1;
          }
          else {
            if((start_value >= current_value) || (end_value <= current_value)) {
              array['hour'] += 1;
            }
          }
        }

        c.v.update(array);
        c.m.initData(array);
      });
    },
    CbRetChangeSysTime : function (param) {
      $.scm.Stop();

      $z.current.m.origData.yyyy = $z.current.m.data.yyyy;
      $z.current.m.origData.mm = $z.current.m.data.mm;
      $z.current.m.origData.dd = $z.current.m.data.dd;
      $z.current.m.origData.hour = $z.current.m.data.hour;
      $z.current.m.origData.min = $z.current.m.data.min;
      $z.current.m.origData.sec = $z.current.m.data.sec;

      var utcTD = new Date();
          utcTD.setFullYear($z.current.m.data['yyyy']);
          utcTD.setMonth($z.current.m.data['mm']);
          utcTD.setDate($z.current.m.data['dd']);
          utcTD.setHours($z.current.m.data['hour']);
          utcTD.setMinutes($z.current.m.data['min']);
          utcTD.setSeconds($z.current.m.data['sec']);
          utcTD.setMilliseconds(0);

      $z.current.origTime = $z.current.m.data['curr_gmttime'];
      $z.current.m.origData['curr_gmttime'] = parseInt(utcTD.getTime()/1000);
      switch(param) {
        case '0':
          $z.current.updateTips(langArray['LTXT_TIME_CHANGE_SUCCESS']);
          break;
        case '-2':
          $z.current.updateTips(langArray['LTXT_CANT_STOP_FILESYSTEM']);
          break;
        case '-4':
          $z.current.updateTips(langArray['LTXT_CANT_DELETE_RESERVED']);
          break;
        default:
          $z.current.updateTips(langArray['LTXT_ERROR']);
          break;
      }
      $('#dialogOk').button({ disabled: false });
      $("#dialogWaitOk").button({disabled: false});

      var e = jQuery.Event('click');
      $('#submit_button').trigger(e);
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
    },
    changeScheduleSyncTime:function() {
      var temp_array = $.extend(true, [], this.initArray);

      temp_array['dateformat'] = $("#dateformat").val();
      temp_array['autotimesync'] = $("#autotimesync").val();
      temp_array['synctime'] = $("#synctime").val();
      temp_array['syncfreq'] = $("#syncfreq").val();

      if($('#autotimesync').val() == '0'){
        $('#nextsynctime').val(langArray['LTXT_SETUPSYSDATETIME_NOSYNCTIME']);
      } else {
        if(parseInt(temp_array['lastsync']) == '0') {
          temp_array['lastsync'] = temp_array['curr_gmttime'];
        }
        var temp = new Date((parseInt(temp_array['lastsync'])
          + parseInt(temp_array['syncfreq']))
          * 1000);
        var test = this.v.dateTime(temp, temp_array['dateformat'], $('#synctime').val(), temp_array, $('#syncfreq').val());
        $('#nextsynctime').val(test);
      }
    }
  },
  SystemManage: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    currVersion : "x.x.x.x",
    targetVersion :"x.x.x.y",
    timer : 0,
    index : function() {
      var c = this,
        tips = $('.tips');

      var action = 'action=get_setup&menu=' + c.m.menu;

      c.form('form',
        function before() {
          if( $("#system_id").is("input") ) {
            var isEmpty = $("#system_id").val().replace(/^\s+/g, '').length;
            if( isEmpty == 0) {
              alert(langArray['LTXT_PLEASE_INPUT_SYSTEMID']);
              return -1;
            }

            var err = Validator.usrName($("#system_id").val());
            if( err != Validator.ERR_VALID_OK ) {
              alert(Validator.errStr(err));
              return -1;
            }
          }
        },
        function after() {
          setTitle($("#system_id").val(), c.m.data['system_id']);
          c.m.data['system_id'] = $("#system_id").val();
        }
      );

      if( $z.debug ) {
        action += '&debug=';
      }
      c.v.init();

      $('#dialog_nand_fw_upgrade').dialog({
        autoOpen: false,
        modal: true,
        show: 'drop',
        hide: 'drop',
        title: langArray["LTXT_SETUPSYSMANAGE_FWUP"],
        width: '450px',
        resizable: false,
        closeOnEscape: false,
        autoResize: true,
        me: null,
        open: function(event, ui) {
          me = $( this );
          $('#nand_info_note').html("<" + langArray["LTXT_SYSSET_NAND_FWUP_NOTE"] + ">");
          $('#nand_info_dont_close_browser').html("1. " + langArray["LTXT_SYSSET_NAND_FWUP_NOTE_DONT_CLOSE_BROWSER"]);
          $('#nand_info_dont_close_server').html("2. " + langArray["LTXT_SYSSET_NAND_FWUP_NOTE_DONT_CLOSE_SERVER"]);
          $('#nand_info_dont_close_network').html("3. " + langArray["LTXT_SYSSET_NAND_FWUP_NOTE_DONT_CLOSE_NETWORK"]);
        },
        buttons: [{
          id: "startNandFwUpgrade",
          text: langArray["LTXT_SETUPSYSMANAGE_FWUP"],
          click: function() {
            $(".ui-dialog-titlebar-close").hide();
            var action = "action=set_setup&menu=system.nand_fw_prepare"
            + "&urlName=" + encodeURIComponent($('input#urlname').val());
            $.ajax({
              url: "/cgi-bin/webra_fcgi.fcgi",
              type: 'POST',
              data: action,
              success: function(response) {
                switch(response) {
                case 'DVR In Setup!':
                  alert(langArray["LTXT_ERR_DVRINSETUP"]);
                  return;
                case 'DVR In Arch!':
                  alert(langArray["LTXT_ERR_DVRINARCH"]);
                  return;
                case 'DVR In Not Live!':
                  alert(langArray['LTXT_DVR_NOT_LIVE']);
                  return;
                case 'DVR In SCM not ready!':
                  alert(langArray['LTXT_ERR_NVR_NOT_READY']);
                  return;
                }
                $.scm.Start();
                $.scm.RegistCallback('IRPL_SCM_CONFIRM_FWUP_BY_WEB', c.NandFwPrepareCallback);
                $('#nand_fw_info').html(langArray["LTXT_SYSSET_NAND_FWUP_PREPARING"]);
                $('#startNandFwUpgrade').attr('disabled', true);

                return true;
              },
              fail: function(response) {
                console.log(response);
                $.scm.Stop();
                $.scm.UnregistCallback('IRPL_SCM_CONFIRM_FWUP_BY_WEB', c.NandFwPrepareCallback);
                console.log("preparing faill");
                return false;
              },
              error: function(response) {
                console.log(response);
                $.scm.Stop();
                $.scm.UnregistCallback('IRPL_SCM_CONFIRM_FWUP_BY_WEB', c.NandFwPrepareCallback);
                setTimeout(function() {
                  //check scm list and alert and page refresh;
                  if($.scm.isActive('IRPL_SCM_CONFIRM_FWUP_BY_WEB')){
                    alert(langArray["LTXT_SETUPMENU_NET_PORT_STATUS_FAILED"]);
                    window.location.reload();
                    return false;
                  }
                }, 30000);
              }
            });
          }
        }
        ]
      });

      $('#dialog_fw_upgrade').dialog({
        autoOpen: false,
        modal: true,
        show: 'drop',
        hide: 'drop',
        title: langArray["LTXT_SETUPSYSMANAGE_FWUP"],
        width: '450px',
        resizable: false,
        closeOnEscape: false,
        autoResize: true,
        me: null,




        open: function(event, ui) {
          me = $( this );
          $('#dialogUpgrade').button('option', 'disabled', 'false');
          $("#fwurl").removeClass( "ui-state-error" );
          c.updateTips(langArray["LTXT_FW_UPGRADE_ERR1"], true);
          $(".ui-dialog-titlebar-close").hide();
        },
        buttons: [{
          id: "dialogUpgrade",
          text: langArray["LTXT_SETUPSYSMANAGE_FWUP"],
          click: function() {
            $('#div_fw_location input').attr('disabled', true)

            // check ones more
            $('#dialog_fw_upgrade').animate({height:'140px'});
            $('#div_confirm_upgrade').show('clip', null, 500, null);
            $('#dialogUpgrade').button({ disabled: true });
            if (INFO_VENDOR == 'S1') {
              c.updateTips(langArray['LTXT_SETUPSYSMANAGE_FWUP'] + ".. ");
            } else {
              c.updateTips(langArray['LTXT_SETUPSYSMANAGE_FWUP'] + ".. "+ c.currVersion + ' -> ' + c.targetVersion);
            }
          }
        },
        {
          id: "dialogClose",
          text: langArray["LTXT_CANCEL"],
          click: function() {
            // TODO: msg initialize
            $('#div_confirm_upgrade').hide();
            $('#div_update_progress').hide();
            $('#div_fw_location input').attr('disabled', false)
            $(this).dialog('close');
          }
        }]
      });

      $('#dialog_pleasewait').dialog({
        autoOpen: false,
        modal: true,
        show: 'drop',
        hide: 'drop',
        title: langArray["LTXT_SETUPSYSMANAGE_FACTORYDEFAULT"],
        width: '450px',
        resizable: false,
        draggable: false,
        closeOnEscape: false,
        autoResize: true,
        me: null,
        open: function(event, ui) {
          $('.ui-dialog-titlebar-close').hide();
          c.updateTips(langArray['LTXT_MSG_WAIT'], true);
        },
        close: function(event, ui) {
          $.scm.UnregistCallback('IRET_FACTORY_DEFAULT_NOTIFY', c.CbRetFactoryNotify);
        },
        buttons: [{
          id: "dialogFactoryOk",
          text: langArray["LTXT_OK"],
          click: function() {
            $('#dialog_pleasewait').dialog('close');
          }
        }]
      });

      $('#dialog_factory_default').dialog({
        autoOpen: false,
        modal: true,
        show: 'drop',
        hide: 'drop',
        title: langArray["LTXT_SETUPSYSMANAGE_FACTORYDEFAULT"],
        width: '450px',
        resizable: false,
        closeOnEscape: false,
        autoResize: true,
        me: null,

        open: function(event, ui) {
          $(".ui-dialog-titlebar-close").hide();
        },
        buttons: [{
          text: langArray["LTXT_OK"],
          click: function() {
            $(this).dialog('close');
            $('#dialog_pleasewait').dialog('open');
            $('#dialogFactoryOk').button({ disabled: true });

            var action = 'action=set_setup&menu=system.btn&btn=1';

            $.ajax({
              type: "POST",
              url: "/cgi-bin/webra_fcgi.fcgi",
              async: false,
              data: action,
              success: function(response) {
                switch(response) {
                case 'DVR In Setup!':
                  c.updateTips(langArray["LTXT_ERR_DVRINSETUP"]);
                  $('#dialogFactoryOk').button({ disabled: false });
                  return;
                case 'DVR In Arch!':
                  c.updateTips(langArray["LTXT_ERR_DVRINARCH"]);
                  $('#dialogFactoryOk').button({ disabled: false });
                  return;
                case 'DVR In Not Live!':
                  c.updateTips(langArray['LTXT_DVR_NOT_LIVE']);
                  $('#dialogFactoryOk').button({ disabled: false });
                  return;
                case 'DVR In SCM not ready!':
                  c.updateTips(langArray['LTXT_ERR_NVR_NOT_READY']);
                  $('#dialogFactoryOk').button({ disabled: false });
                  return;
                }
                setTimeout( function () {
                  $('#dialog_pleasewait').dialog('close');
                  $('#dialog_factory_default').dialog('close');
                }, 30000);
                $.scm.Start();
                $.scm.RegistCallback('IRET_FACTORY_DEFAULT_NOTIFY', c.CbRetFactoryNotify);
                return true;
              },
              fail: function(response) {
                return false;
              }
            });
          }
        },
        {
          text: langArray["LTXT_CANCEL"],
          click: function() {
            $(this).dialog('close');
          }
        }]
      });


      function reboot_progress() {
        var progressbar = $( "#div_reboot_progress" );

        progressbar.progressbar({
          value: false,
          change: function() {
          },
          complete: function() {
            $('#dialogOk').button({ disabled:false});
            c.updateTips(langArray['LTXT_ERR_COMPLETE'], true); // fixed me - lanugage;
            $(this).hide();
            return true;
          }
        });

        function progress() {
          var val = progressbar.progressbar( "value" ) || 0;

          progressbar.progressbar( "value", val + 1 );

          if ( val < 210 ) {
            setTimeout( progress, 1000 );
          }
        }

        setTimeout( progress, 3000 );
      };

      $('#dialog_reboot_confirm').dialog({
        autoOpen: false,
        modal: true,
        show: 'drop',
        hide: 'drop',
        title: langArray['LTXT_CONFIRM_PASSWORD'],
        draggable: false,
        resizable: false,
        closeOnescape: false,
        autoResize: true,
        width : '450px',
        open: function(event, ui) {
          c.updateTips('', true);
          $('#div_password_check').show();
          $('#div_confirm_msg').hide();
          $('#dialogOk').button({ disabled: false });
          $('#rebootClose').button({ disabled: false });
          this.state = 'pass';
          $(this).dialog('option', 'title', langArray["LTXT_CONFIRM_PASSWORD"]);
        },
        close: function(event, ui) {
          c.updateTips('', true);
          $('#password').val('');
          this.state = 'pass'
        },
        buttons: [{
          id: "dialogOk",
          text: langArray["LTXT_OK"],
          click: function() {
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
                      $(me).dialog('option', 'title', langArray["LTXT_WARNING"]);
                      $('#div_password_check').hide();
                      $('#div_confirm_msg').show();
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
                me.state = 'done';
                var action = 'action=set_system&menu=board.reboot';

                $('#dialogOk').button({ disabled:true});
                $('#rebootClose').button({ disabled: true });
                $('#div_confirm_msg').hide();

                $.ajax({
                  type: "POST",
                  url: "/cgi-bin/webra_fcgi.fcgi",
                  async: false,
                  data: action,
                  success: function(response) {
                    if( !authCheck.check('setup') ) {
                      console.log("setup");
                      AuthorityNoPermission();
                      history.back()
                      return;
                    }
                    $( 'a.ui-dialog-titlebar-close' ).remove();
                    var array = encode_to_array(response);
                    switch(response) {
                      case 'DVR In Setup!':
                        me.state = 'error';
                        c.updateTips(langArray["LTXT_ERR_DVRINSETUP"]);
                        $('#dialogOk').button({ disabled: false });
                        $('#rebootClose').button({ disabled: false });
                        return;
                      case 'DVR In Arch!':
                        me.state = 'error';
                        c.updateTips(langArray["LTXT_ERR_DVRINARCH"]);
                        $('#dialogOk').button({ disabled: false });
                        $('#rebootClose').button({ disabled: false });
                        return;
                      case 'DVR In Not Live!':
                        c.updateTips(langArray['LTXT_DVR_NOT_LIVE']);
                        $('#dialogOk').button({ disabled: false });
                        $('#rebootClose').button({ disabled: false });
                        return;
                      case 'No Permission Error!':
                        me.state = 'error';
                        c.updateTips(langArray['LTXT_ERR_NOPERMISSION']);
                        $('#dialogOk').button({ disabled: false });
                        $('#rebootClose').button({ disabled: false });
                        return;
                    }
                    if(array['error'] == 0) {
                      c.updateTips(langArray["LTXT_MSG_WAIT"], true);
                      $("#div_reboot_progress").show();
                      reboot_progress();
                    }
                    else {
                      me.state = 'error';
                      c.updateTips(langArray["LTXT_ERR_DVRINSETUP"]);
                      $('#dialogOk').button({ disabled: false });
                      $('#rebootClose').button({ disabled: false });
                      return;
                    }
                    return true;
                  },
                  fail: function(response) {
                    return false;
                  }
                });
                break;
              case 'done':
                //if ($z.current.changeTime(c)) {
                $("#div_confirm_msg").hide();
                c.updateTips(langArray["LTXT_MSG_WAIT"], true);
                $(this).dialog('close');
                location.reload();
                break;
              case 'error':
                $("#div_confirm_msg").hide();
                c.updateTips(langArray["LTXT_MSG_WAIT"], true);
                $(this).dialog('close');
                break;
            }
            }
          }, {
          id: "rebootClose",
          text: langArray["LTXT_CANCEL"],
          click: function() {
            $('#div_password_check').show();
            $('#div_confirm_message').hide();
            $(this).dialog('close');
          }
        }]
      });
      $('#dialog_sysdb_upload').dialog({
        autoOpen: false,
        modal: true,
        show: 'drop',
        hide: 'drop',
        title: langArray["LTXT_SYSTEM_DATA_LOAD"],
        width: '450px',
        resizable: false,
        closeOnEscape: false,
        autoResize: true,
        me: null,
        open: function () {
          $(".ui-dialog-titlebar-close").hide();
          c.updateTips('',true);
          $('input#setupFileUpload').change();
          $("#sysdbUploadClose").button({disabled: false});
        },
        close: function() {
          $.scm.UnregistCallback('IRET_SYSTEM_DATA_LOAD_NOTIFY', c.CbRetSysdataLoadNotify);
          $.scm.Stop();
        },
        buttons: [{
          id : "sysdbUploadOk",
          text: langArray["LTXT_OK"],
          click: function() {
            if ( $('input#setupFileUpload').val() == '') {
              return;
            }
            var ret = confirm(langArray['LTXT_LOGOUT_AFTER_SYSDB_LOAD']);
            if (ret == false) {
              return;
            }
            c.updateTips(langArray["LTXT_MSG_WAIT"], true);
            $("#sysdbUploadOk").button({disabled: true});
            $("#sysdbUploadClose").button({disabled: true});
            $('input#uploadfile').attr('disabled' , 'true');
            var action = '';

            $('form#dbup').ajaxSubmit( {
              debug: true,
              beforeSend: function() {
              },
              uploadProgress: function(event, position, total, percentComplete) {
              },
              complete: function(xhr) {
                var action = 'action=set_setup&menu=system.db_upload';
                if(xhr.responseText != "") { // for IE10, Chrome
                  c.updateTips(langArray["LTXT_ERR_SEND"], true);
                  $('#sysdbUploadOk').button({ disabled: false });
                  $('#sysdbUploadClose').button({ disabled: false });
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
                      c.updateTips(langArray["LTXT_ERR_DVRINSETUP"], true);
                      $('#sysdbUploadOk').button({ disabled: false });
                      $('#sysdbUploadClose').button({ disabled: false });
                      return;
                    case 'DVR In Arch!':
                      c.updateTips(langArray["LTXT_ERR_DVRINARCH"], true);
                      $('#sysdbUploadOk').button({ disabled: false });
                      $('#sysdbUploadClose').button({ disabled: false });
                      return;
                    case 'DVR In Not Live!':
                      c.updateTips(langArray["LTXT_DVR_NOT_LIVE"], true);
                      $('#sysdbUploadOk').button({ disabled: false });
                      $('#sysdbUploadClose').button({ disabled: false });
                      return;
                    case 'DVR In SCM not ready!':
                      c.updateTips(langArray["LTXT_ERR_NVR_NOT_READY"], true);
                      $('#sysdbUploadOk').button({ disabled: false });
                      $('#sysdbUploadClose').button({ disabled: false });
                      return;
                    }
                    if (response.indexOf('&error=0') < 0) {
                      c.updateTips(langArray["LTXT_ERR_SEND"], true);
                      $('#sysdbUploadOk').button({ disabled: false });
                      $('#sysdbUploadClose').button({ disabled: false });
                      return false;
                    }
                    setTimeout( function () {
                      $('#dialog_sysdb_upload').dialog('close');
                      $('#sysdbUploadClose').button({ disabled: false });
                    }, 30000);
                    $.scm.Start();
                    $.scm.RegistCallback('IRET_SYSTEM_DATA_LOAD_NOTIFY', c.CbRetSysdataLoadNotify);
                    return true;
                  },
                  fail: function(response) {
                    $('#sysdbUploadOk').button({ disabled: false });
                    $('#sysdbUploadClose').button({ disabled: false });
                    return false;
                  }
                });
                return true;
              },
              error: function() {
                c.updateTips(langArray["LTXT_ERR_SEND"], true);
                $("#sysdbUploadOk").button({disabled: false});
                $("#sysdbUploadClose").button({disabled: false});
                $('input#uploadfile').removeAttr('disabled');
                return false;
              }
            });
          }
        },
        {
          id : "sysdbUploadClose",
          text: langArray["LTXT_CLOSE"],
          click: function() {
            $(this).dialog('close');
          }
        }]
      });

      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.update(c.m.data);
      });

      $('input#setupFileUpload').change( function (event) {
        var ret = Validator.test('sysdbfile', $('input#setupFileUpload').val(), 5, 255);
        if ( ret == Validator.ERR_VALID_OK) {
          $('#sysdbUploadOk').button({ disabled: false });
        } else {
          $('#sysdbUploadOk').button({ disabled: true });
        }
      });

      $('input#load').button().click( function (event) {
        $('#dialog_sysdb_upload').dialog('open');
      });

      $('input#save').button().click( function (event) {
        window.location = '/cgi-bin/webra_fcgi.fcgi?action=get_setup&menu=system.db_download';
      });

      $('input#nvrrestart').button().click(function() {
        $('#dialog_reboot_confirm').dialog('open');
      });

      $('#fwurl').keyup(function(event) {
        if ( !$('#dialogUpgrade').button('option','disabled')) {
          c.updateTips(langArray["LTXT_FW_UPGRADE_ERR2"]);
        }
        $('#dialogUpgrade').button({ disabled: true });
      });

      $('#netfwupdate').button().click( function() {
        if(INFO_MODEL.indexOf('UTM5X') > 0 || INFO_MODEL.indexOf("5HG") > 0){
          $("#dialog_nand_fw_upgrade").dialog('open');
        } else{
        $( "#dialog_fw_upgrade" ).dialog( "open" );
        }
      });

      $('#netfactorydefault').button().click( function() {
        $('#dialog_factory_default').dialog('open');
      });

      $('#upgrade_yes').button().click( function () {
        $('#div_confirm_upgrade').hide();
        $('#dialog_fw_upgrade').animate({height:'140px'});
        $('#div_update_progress').show('clip', null, 500, null);
        $('#dialogUpgrade').button({ disabled: true });
        $('#dialogClose').button({ disabled: true });

        var type = '';
        if(INFO_MODEL.indexOf('IPX') > 0)
        {
          type = 'NVR';
        }
        else
        {
          type = 'DVR';
        }

        c.updateTips(langArray["LTXT_REQ_UPDATE_"+type]);

        c.updateCallback(c);
      });

      $('#upgrade_no').button().click( function () {
        $('#div_fw_location input').attr('disabled', false)
        $('#div_confirm_upgrade').hide('clip', null, 100, null);
        $('#dialog_fw_upgrade').animate({height:'115px'});
        $('#dialogUpgrade').button({ disabled: false });
        $('#dialogClose').button({ disabled: false });
        c.updateTips(langArray["LTXT_FW_UPGRADE_CANCELED"]);
      });

      $('#netfwverify').button().click( function() {

        c.updateTips(langArray["LTXT_VERIFYING"]);
        c.verifyCallback(c);
      });

      $("#passwd_enable").change( function () {
        c.v.passwordCheck();
      });

      $("#auto_logout").change( function () {
        c.v.autoLogoutCheck();
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
    },
    CbRetFactoryNotify : function (param) {
      $('#dialogFactoryOk').button({ disabled: false });
      $z.current.updateTips(langArray['LTXT_ERR_SUCCESS'], true);
      $('#dialogFactoryOk').button().click(function () {
          document.location.pathname = '/html/change_password.htm';
      });

    },
    CbRetSysdataLoadNotify: function (param) {
      $z.current.updateTips(langArray['LTXT_ERR_SUCCESS'], true);
      $('#sysdbUploadClose').button({ disabled: false });
    },
    clearUpdateStatus: function(param) {
      var action = 'action=set_setup&menu=system.nand_fw_status_clear&urlName=http://';
      $.ajax({
        url: "/cgi-bin/webra_fcgi.fcgi",
        type: 'POST',
        data: action,
        success: function(response) {
          window.location.reload();
        }
      });
    },
    check_nand_fw_updating: function(c){
      var action = 'action=get_setup&menu=system.nand_fw_result&'
      action += "urlName=" + encodeURIComponent($('input#urlname').val());

      $.ajax({
        url: "/cgi-bin/webra_fcgi.fcgi",
        type: 'POST',
        data: action,
        success: function(response) {
          console.log(response);
          var array = encode_to_array(response);

          switch ( array['result'] ) {
            case '64':
              setTimeout(function() {
                alert(langArray["LTXT_SYSSET_NAND_FWUP_SUCCESS"]);
                $('#dialog_nand_fwup_progressbar').dialog('close');
                // $z.current.clearUpdateStatus(c);
                window.location.reload();
              }, 40000);
              break;
            case '65':
              setTimeout(function() {
                alert(langArray["LTXT_SYSSET_NAND_FWUP_FAIL"]);
                $('#dialog_nand_fwup_progressbar').dialog('close');
                // $z.current.clearUpdateStatus(c);
                window.location.reload();
              }, 40000);
              break;
            case '66':
              setTimeout(function() {
                alert(langArray["LTXT_SYSSET_NAND_FWUP_FAIL"]);
                $('#dialog_nand_fwup_progressbar').dialog('close');
                // $z.current.clearUpdateStatus(c);
                window.location.reload();
              }, 40000);
              break;
            default:
              setTimeout(function(){
                $z.current.check_nand_fw_updating(c);
              }, 2000 );
              break;
          }
        },
        error: function(response) {
          console.log("timer: " + $z.current.timer);
          if($z.current.timer > 600){
            alert(langArray["LTXT_SYSSET_NAND_FWUP_ERR_UPGRADE"] + "\n"
              + langArray["LTXT_SYSSET_NAND_FWUP_ERR_NOTICE"] + "\n"
              + langArray["LTXT_SYSSET_NAND_FWUP_ERR_USB_RECOVERY_FORMAT"] + "\n"
              + langArray["LTXT_SYSSET_NAND_FWUP_ERR_USB_RECOVERY_CREATE"] + "\n"
              + langArray["LTXT_SYSSET_NAND_FWUP_ERR_USB_RECOVERY_COPY"] + "\n"
              + langArray["LTXT_SYSSET_NAND_FWUP_ERR_USB_RECOVERY_MODIFY"] + "\n"
              + langArray["LTXT_SYSSET_NAND_FWUP_ERR_USB_RECOVERY_REMOVE"] + "\n"
              + langArray["LTXT_SYSSET_NAND_FWUP_ERR_USB_RECOVERY_PROCESS"] + "\n"
              + langArray["LTXT_SYSSET_NAND_FWUP_ERR_USB_RECOVERY_REBOOT"] + "\n"
              + langArray["LTXT_SYSSET_NAND_FWUP_ERR_USB_RECOVERY_CONTACT"] + "\n");
            return false;
          } else {
            setTimeout(function(){
              $z.current.timer += 1;
              $z.current.check_nand_fw_updating(c);
            }, 1000 );
          }
        }
      });
    },
    NandFwUpdateCallback : function(c){
      console.log("FwUpdate replied");
      $.scm.UnregistCallback('IRET_SCM_PREPARE_FWUP_CMPL', $z.current.NandFwUpdateCallback);
      $.scm.Stop();

      var action = 'action=set_system&menu=board.reboot';

      $('#dialog_nand_fwup_progressbar').dialog({
        autoOpen: false,
        modal: true,
        show: 'drop',
        hide: 'drop',
        title: langArray["LTXT_SETUPSYSMANAGE_FWUP"],
        width: '450px',
        resizable: false,
        closeOnEscape: false,
        autoResize: true,
        me: null,
        open: function(event, ui) {
          me = $( this );
          $(".ui-dialog-titlebar-close").hide();
          $('p#nand_fw_prgss_info').html(langArray['LTXT_SYSSET_NAND_FWUP_UPGRADING']);
          $('p#nand_fw_prgss_info1').html(langArray['LTXT_SYSSET_NAND_FWUP_BASIC_TEXT']);
          setTimeout(function(){
            $z.current.check_nand_fw_updating(c);
          }, 20000);
        }
      });

      if(c == '0'){
        setTimeout(function() {
          $.ajax({
            url: "/cgi-bin/webra_fcgi.fcgi",
            type: 'POST',
            data: action,
            success: function(response) {
              $('#nand_fw_info').html(langArray["LTXT_SYSSET_NAND_FWUP_COMPL_UPDATE"]);
              $('#dialog_nand_fw_upgrade').dialog('close');
              $("#dialog_nand_fwup_progressbar").dialog('open');
              return true;
            },
            fail: function(response) {
              console.log("fail to reboot...");
              return false;
            }
          });
        }, 5000);
      } else {
        setTimeout(function() {
          $.ajax({
            url: "/cgi-bin/webra_fcgi.fcgi",
            type: 'POST',
            data: action,
            success: function(response) {
              $('#nand_fw_info').html(langArray["LTXT_SYSSET_NAND_FWUP_INCOMPL_UPDATE"]);
              $('#dialog_nand_fw_upgrade').dialog('close');
              $("#dialog_nand_fwup_progressbar").dialog('open');
              return true;
            },
            fail: function(response) {
              console.log("fail to reboot...");
              return false;
            }
          });
        }, 500);
      }
    },
    NandFwBackUpCallback : function(c){
      console.log("Backup replied");
      $.scm.UnregistCallback('IRET_SCM_PREPARE_FWUP_DATABACKUP', $z.current.NandFwVerifyCallback);
      $.scm.Stop();
      var action = 'action=set_setup&menu=system.nand_fw_upgrade&';
      action += "urlName=" + encodeURIComponent($('input#urlname').val());

      if(c != '0'){
        alert(langArray["LTXT_SYSSET_NAND_FWUP_ERR_BACKUP"]);
        $('#dialog_nand_fw_upgrade').dialog('close');
        window.location.reload();
        return false;
      } else {
        setTimeout(function() {
          $.ajax({
            url: "/cgi-bin/webra_fcgi.fcgi",
            type: 'POST',
            data: action,
            success: function(response) {
              switch (response) {
                case 'DVR In Setup!':
                  $('span#nand_fw_info').html(langArray["LTXT_ERR_DVRINSETUP"]);
                  return;
                case 'DVR In Arch!':
                  $('span#nand_fw_info').html(langArray["LTXT_ERR_DVRINARCH"]);
                  return;
                case 'DVR In Not Live!':
                  $('span#nand_fw_info').html(langArray["LTXT_DVR_NOT_LIVE"]);
                  return;
                case 'DVR In SCM not ready!':
                  $('span#nand_fw_info').html(langArray["LTXT_ERR_NVR_NOT_READY"]);
                  return;
              }
              $.scm.Start();
              $.scm.RegistCallback('IRET_SCM_PREPARE_FWUP_CMPL', $z.current.NandFwUpdateCallback);
              $('#nand_fw_info').html(langArray["LTXT_SYSSET_NAND_FWUP_UPDATING"]);

              return true;
            },
            fail: function(response) {
              console.log("Fail to start fw up");
              $.scm.UnregistCallback('IRET_SCM_PREPARE_FWUP_CMPL', $z.current.NandFwUpdateCallback);
              $.scm.Stop();
              alert(langArray["LTXT_SYSSET_NAND_FWUP_INCOMPL_UPDATE"]);
              $('#dialog_nand_fw_upgrade').dialog('close');
              window.location.reload();
              return false;
            },
            error: function(response) {
              alert(langArray["LTXT_SETUPMENU_NET_PORT_STATUS_FAILED"]);
              window.location.reload();
              return false;
            }
          });
        }, 500);
      }
    },
    NandFwVerifyCallback : function(c){
      console.log("Verify replied");
      $.scm.Stop();
      $.scm.UnregistCallback('IRET_SCM_PREPARE_FWUP_VALIDATE', $z.current.NandFwVerifyCallback);
      var action = "action=set_setup&menu=system.nand_fw_backup"
            + "&urlName=" + encodeURIComponent($('input#urlname').val());

      if(c != '0'){
        alert(langArray["LTXT_SYSSET_NAND_FWUP_ERR_VALIDATE"]);
        $('#dialog_nand_fw_upgrade').dialog('close');
        window.location.reload();
        return false;
      } else {
        $('#nand_fw_info').html(langArray["LTXT_SYSSET_NAND_FWUP_BACKUPING"]);
        setTimeout(function() {
          $.ajax({
            url: "/cgi-bin/webra_fcgi.fcgi",
            type: 'POST',
            data: action,
            success: function(response) {
              switch (response) {
                case 'DVR In Setup!':
                  $('span#nand_fw_info').html(langArray["LTXT_ERR_DVRINSETUP"]);
                  return;
                case 'DVR In Arch!':
                  $('span#nand_fw_info').html(langArray["LTXT_ERR_DVRINARCH"]);
                  return;
                case 'DVR In Not Live!':
                  $('span#nand_fw_info').html(langArray["LTXT_DVR_NOT_LIVE"]);
                  return;
                case 'DVR In SCM not ready!':
                  $('span#nand_fw_info').html(langArray["LTXT_ERR_NVR_NOT_READY"]);
                  return;
              }

              $.scm.Start();
              $.scm.RegistCallback('IRET_SCM_PREPARE_FWUP_DATABACKUP', $z.current.NandFwBackUpCallback);
              return true;
            },
            fail: function(response) {
              console.log(response);
              $.scm.UnregistCallback('IRET_SCM_PREPARE_FWUP_DATABACKUP', $z.current.NandFwVerifyCallback);
              $.scm.Stop();
              alert(langArray["LTXT_SYSSET_NAND_FWUP_ERR_VALIDATE"]);
              $('#dialog_nand_fw_upgrade').dialog('close');
              window.location.reload();
              return false;
            },
            error: function(response) {
              alert(langArray["LTXT_SETUPMENU_NET_PORT_STATUS_FAILED"]);
              window.location.reload();
              return false;
            }
          });
        }, 500);
      }
    },
    NandFwOpenCallback : function (c){
      console.log("Opening replied");
      var action = "action=set_setup&menu=system.nand_fw_verify"
            + "&urlName=" + encodeURIComponent($('input#urlname').val());
      $('#nand_fw_info').html(langArray["LTXT_SYSSET_NAND_FWUP_VALIDATING"]);
      setTimeout(function() {
        $.ajax({
          url: "/cgi-bin/webra_fcgi.fcgi",
          type: 'POST',
          data: action,
          success: function(response) {
            $.scm.Start();
            $.scm.RegistCallback('IRET_SCM_PREPARE_FWUP_VALIDATE', $z.current.NandFwVerifyCallback);

            return true;
          },
          fail: function(response) {
            console.log(response);
            $.scm.Stop();
            $.scm.UnregistCallback('IRET_SCM_PREPARE_FWUP_VALIDATE', $z.current.NandFwVerifyCallback);
            return false;
          },
          error: function(response) {
            alert(langArray["LTXT_SETUPMENU_NET_PORT_STATUS_FAILED"]);
            window.location.reload();
            return false;
          }
        });
      }, 500);
    },
    NandFwPrepareCallback : function (c) {
      $.scm.UnregistCallback('IRPL_SCM_CONFIRM_FWUP_BY_WEB', $z.current.NandFwPrepareCallback);
      $.scm.Stop();

      console.log("Prepare replied");
      if(c == '-1'){
        setTimeout(function(){
          alert(langArray["LTXT_ERR_DVRINSETUP"]);
          $('#dialog_nand_fw_upgrade').dialog('close');
          window.location.reload();
          return false;
        }, 1000);
      }else if(c != '1'){
        setTimeout(function(){
          alert(langArray["LTXT_SYSSET_NAND_FWUP_ERR_BY_LOCAL"]);
          $('#dialog_nand_fw_upgrade').dialog('close');
          window.location.reload();
          return false;
        }, 1000);
      } else {
        var action = "action=set_setup&menu=system.nand_fw_opening"
              + "&urlName=" + encodeURIComponent($('input#urlname').val());
        setTimeout(function () {
          $.ajax({
            url: "/cgi-bin/webra_fcgi.fcgi",
            type: 'POST',
            data: action,
            success: function(response) {
              switch (response) {
                case 'DVR In Setup!':
                  $('span#nand_fw_info').html(langArray["LTXT_ERR_DVRINSETUP"]);
                  return;
                case 'DVR In Arch!':
                  $('span#nand_fw_info').html(langArray["LTXT_ERR_DVRINARCH"]);
                  return;
                case 'DVR In Not Live!':
                  $('span#nand_fw_info').html(langArray["LTXT_DVR_NOT_LIVE"]);
                  return;
                case 'DVR In SCM not ready!':
                  $('span#nand_fw_info').html(langArray["LTXT_ERR_NVR_NOT_READY"]);
                  return;
              }
              var controller = $z.current;
              controller.NandFwOpenCallback(controller);
              return true;
            },
            fail: function(response) {
              $.scm.UnregistCallback('IRPL_SCM_CONFIRM_FWUP_BY_WEB', $z.current.NandFwPrepareCallback);
              alert(langArray["LTXT_SYSSET_NAND_FWUP_ERR_VALIDATE"]);
              $('#dialog_nand_fw_upgrade').dialog('close');
              window.location.reload();
              return false;
            },
            error: function(response) {
              alert(langArray["LTXT_SETUPMENU_NET_PORT_STATUS_FAILED"]);
              window.location.reload();
              return false;
            }
          });
        }, 500);
      }
    },
    verifyCallback : function (c) {
      var action = 'action=set_setup&menu=system.verify_fw_url&';
      action += "urlName=" + encodeURIComponent($("#fwurl").val());

      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response);

        switch (response) {
        case 'DVR In Setup!':
          c.updateTips(langArray["LTXT_ERR_DVRINSETUP"]);
          $('#dialogUpgrade').button({ disabled: true });
          return;
        case 'DVR In Arch!':
          c.updateTips(langArray["LTXT_ERR_DVRINARCH"]);
          $('#dialogUpgrade').button({ disabled: true });
          return;
        case 'DVR In Not Live!':
          c.updateTips(langArray["LTXT_DVR_NOT_LIVE"]);
          $('#dialogUpgrade').button({ disabled: true });

          return;
        case 'DVR In SCM not ready!':
          c.updateTips(langArray["LTXT_ERR_NVR_NOT_READY"]);
          $('#dialogUpgrade').button({ disabled: true });
          return;
        }

        switch ( array['result'] ) {
        case '200':
          c.updateTips(langArray["LTXT_VERIFY_SUCCESS"]);
          c.currVersion = array['currentVersion'];
          c.targetVersion = array['targetVersion'];
          $('#dialogUpgrade').button({ disabled: false });
          break;
        case '300':
          c.updateTips(langArray["LTXT_VERIFY_FAIL"]);
          $('#dialogUpgrade').button({ disabled: true });
          break;
        case '301':
          c.updateTips(langArray["LTXT_FW_UPGRADE_ERR4"]);
          $('#dialogUpgrade').button({ disabled: true });
          break;
        case '302':
          c.updateTips(langArray["LTXT_FW_UPGRADE_ERR5"]);
          $('#dialogUpgrade').button({ disabled: true });
          break;
        case '303':
          c.updateTips(langArray["LTXT_FW_INVALID"]);
          $('#dialogUpgrade').button({ disabled: true });
          break;
        case '400':
          c.updateTips(langArray["LTXT_FW_UPGRADE_ERR6"]);
          $('#dialogUpgrade').button({ disabled: true });
          break;
        default:
          setTimeout( function () {c.verifyCallback(c)}, 500);
          break;
        }
      });
    },
    updateCallback : function (c) {
      var action = 'action=set_setup&menu=system.network_fw_update&';
      action += "urlName=" + encodeURIComponent($("#fwurl").val());

      c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
        var array = encode_to_array(response),
          continue_request = false;

        switch (response) {
        case 'DVR In Setup!':
          c.updateTips(langArray["LTXT_ERR_DVRINSETUP"]);
          $('#dialogUpgrade').button({ disabled: false });
          $('#dialogClose').button({ disabled: false });
          $('#div_confirm_upgrade').hide();
          $('#div_update_progress').hide();
          $('#div_fw_location input').attr('disabled', false)
          $('#dialog_fw_upgrade').animate({height:'115px'});
          return;
        case 'DVR In Arch!':
          c.updateTips(langArray["LTXT_ERR_DVRINARCH"]);
          $('#dialogUpgrade').button({ disabled: false });
          $('#dialogClose').button({ disabled: false });
          $('#div_confirm_upgrade').hide();
          $('#div_update_progress').hide();
          $('#div_fw_location input').attr('disabled', false)
          $('#dialog_fw_upgrade').animate({height:'115px'});
          return;
        case 'DVR In Not Live!':
          c.updateTips(langArray["LTXT_DVR_NOT_LIVE"]);
          $('#dialogUpgrade').button({ disabled: false });
          $('#dialogClose').button({ disabled: false });
          $('#div_confirm_upgrade').hide();
          $('#div_update_progress').hide();
          $('#div_fw_location input').attr('disabled', false)
          $('#dialog_fw_upgrade').animate({height:'115px'});
          return;
        case 'DVR In SCM not ready!':
          c.updateTips(langArray["LTXT_ERR_NVR_NOT_READY"]);
          $('#dialogUpgrade').button({ disabled: false });
          $('#dialogClose').button({ disabled: false });
          $('#div_confirm_upgrade').hide();
          $('#div_update_progress').hide();
          $('#div_fw_location input').attr('disabled', false)
          $('#dialog_fw_upgrade').animate({height:'115px'});
          return;
        }

        switch ( array['result'] ) {
        case '200':
          $( "#progressbar" ).progressbar({
            value: 100
          });
          c.updateTips(langArray["LTXT_UPGRADE_SUCCESS"]);
          setTimeout( function () {c.dvrRestart(c , true)}, 200 );
          break;
        case '300':
          c.updateTips(langArray["LTXT_REQUEST_UPGRADE"], true);
          continue_request = true;
          break;
        case '301':
          c.updateTips(langArray["LTXT_FW_UPGRADING"]);
          continue_request = true;
          break;
        case '302':
          c.updateTips(langArray["LTXT_FW_APPLIED"], true);
          continue_request = true;
          break;
        case '400':

          var type = '';
          if(INFO_MODEL.indexOf('IPX') > 0)
          {
            type = 'NVR';
          }
          else
          {
            type = 'DVR';
          }
          c.updateTips(langArray["LTXT_"+type+"_NOT_LIVE"]);

          $('#dialogUpgrade').button({ disabled: false });
          $('#dialogClose').button({ disabled: false });
          $('#div_confirm_upgrade').hide();
          $('#div_update_progress').hide();
          $('#div_fw_location input').attr('disabled', false)
          $('#dialog_fw_upgrade').animate({height:'115px'});
          break;
        case '401':
          c.updateTips(langArray["LTXT_FW_REJECT"]);
          $('#dialogUpgrade').button({ disabled: false });
          $('#dialogClose').button({ disabled: false });
          $('#div_confirm_upgrade').hide();
          $('#div_update_progress').hide();
          $('#div_fw_location input').attr('disabled', false)
          $('#dialog_fw_upgrade').animate({height:'115px'});
          break;
        case '402':
          c.updateTips(langArray["LTXT_FW_UPGRADE_ERROR"]);
          setTimeout( function () {c.dvrRestart(c, false)}, 200 );
          $('#div_confirm_upgrade').hide();
          $('#div_update_progress').hide();
          $('#div_fw_location input').attr('disabled', false)
          $('#dialog_fw_upgrade').animate({height:'115px'});
          break;
        case '404':
          c.updateTips(langArray["LTXT_FW_UPGRADE_ERR7"]);
          $('#dialogUpgrade').button({ disabled: false });
          $('#dialogClose').button({ disabled: false });
          $('#div_confirm_upgrade').hide();
          $('#div_update_progress').hide();
          $('#div_fw_location input').attr('disabled', false)
          $('#dialog_fw_upgrade').animate({height:'115px'});
          break;
        default:
          if ( 0 <= parseInt(array['result'], 10) && parseInt(array['result'], 10) <= 100) {
            $( "#progressbar" ).progressbar({
              value: parseInt(array['result'], 10)
            });
            c.updateTips(langArray["LTXT_FW_UPGRADING"] + array['result'] + '%', true);
            continue_request = true;
          } else {
            c.updateTips(langArray["LTXT_FW_UPGRADE_ERROR"]);
            setTimeout( function () {c.dvrRestart(c, false)}, 200 );
            $('#div_confirm_upgrade').hide();
            $('#div_update_progress').hide();
            $('#div_fw_location input').attr('disabled', false)
            $('#dialog_fw_upgrade').animate({height:'115px'});
          }

          break;
        }

        if (continue_request) {
          setTimeout( function () {c.updateCallback(c)}, 500 );
        }
      });
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
    },
    dvrRestart : function( c , result) {
      var type = 'NVR';
      if(INFO_MODEL.indexOf('IPX') > 0)
      {
        type = 'NVR';
      }
      else
      {
        type = 'DVR';
      }

      if (result) {
        //c.updateTips(langArray["LTXT_UPGRADE_SUCCESS"] + '<br/>' + langArray["LTXT_NVR_WILL_RESTART"]);
        c.updateTips(langArray["LTXT_UPGRADE_SUCCESS"] + '<br/>' + langArray["LTXT_"+type+"_WILL_RESTART"]);
      } else {
        //c.updateTips(langArray["LTXT_FW_UPGRADE_ERROR"] + '<br/>' + langArray["LTXT_NVR_WILL_RESTART"]);
        c.updateTips(langArray["LTXT_FW_UPGRADE_ERROR"] + '<br/>' + langArray["LTXT_"+type+"_WILL_RESTART"]);
      }

      setTimeout( function () {c.restartCount(c, 180000, result)}, 5000 );
    },
    restartCount : function (c, remain, result) {
      var sec = remain / 1000;
      remain -= 1000;
      if (sec != 0) {
        var type = '';
        if(INFO_MODEL.indexOf('IPX') > 0)
        {
          type = 'NVR';
        }
        else
        {
          type = 'DVR';
        }

        if (result) {
          c.updateTips(langArray["LTXT_UPGRADE_SUCCESS"] + '<br/>' + langArray["LTXT_"+type+"_RESTARTING_REMAIN"] + " " + sec , true);
          setTimeout( function () {c.restartCount(c, remain, result)}, 1000 );
        }
        else
        {
          c.updateTips(langArray["LTXT_FW_UPGRADE_ERROR"] + '<br/>' + langArray["LTXT_"+type+"_RESTARTING_REMAIN"] + " " + sec , true);
          setTimeout( function () {c.restartCount(c, remain, result)}, 1000 );
        }

      } else {
        if (result) {
          c.updateTips(langArray["LTXT_UPGRADE_SUCCESS"] + '<br/>' + langArray["LTXT_FW_UPGRADE_FINISH"]);
          $('#dialogClose').button({ disabled: false });
        } else {
          c.updateTips(langArray["LTXT_FW_UPGRADE_ERROR"] + '<br/>' + langArray["LTXT_FW_UPGRADE_FINISH"]);
          $('#dialogClose').button({ disabled: false });
        }

      }
    }
  },
  SystemInfo: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;

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

        array = c.m.checkNvr(array);
        c.v.update(array);
        c.m.initData(array);
      });
    }
  },
  SystemControlDevice: {
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

      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.update(c.m.data);
      });

      $('#secom_dual_act').change( function (event) {
        c.v.enableSecomDual();
      });
      $('#secom_dual_ip').change( function (event) {
        if (Validator.test('ip', $('#secom_dual_ip').val(), 7, 15) != Validator.ERR_VALID_OK) {
          alert("Invalid IP");
          $('#secom_dual_ip').val(c.m.origData.secom_dual_ip);
        }
      });
      $('#secom_dual_port').change( function (event) {
        if (Validator.test('port', $('#secom_dual_port').val(), 1, 5) != Validator.ERR_VALID_OK) {
          alert("Invalid IP");
          $('#secom_dual_port').val(c.m.origData.secom_dual_port);
        }
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
  },
  SystemSecurity : {
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
