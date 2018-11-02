/**
 * @author chcha
 */

var EmailTester = function(opts) {
  this.opts = {
    loading: '/images/images/busy.gif'
  };

  $.extend( this.opts, opts );

  this.init = function() {
  };

  this.run = function(arr, num) {
    this.test(arr, num);
  };

  this.test = function(arr, num) {
    var settings = {};
    var data = [];
    $.extend(data, arr);

    data.push({name:'menu', value:'network.testemail'});
    data.push({name:'action', value:'set_setup'});
    if ( INFO_VENDOR =='VIDECON') {
      if(num == 0)
        data.push({name:'num', value:0});
      else
        data.push({name:'num', value:1});

    } else {
      data.push({name:'num', value:0});
    }


    if( $z.debug ) {
      data.push({ name:'debug', value:1});
    }

    settings.url = '/cgi-bin/webra_fcgi.fcgi';
    settings.type = 'POST';
    settings.data = data;

    settings.beforeSend = function(xhr, setting) {
    };

    settings.success = function(response) {
      if( response ) {
        if( response.indexOf("Send Error") >= 0 ) {
          return false;
        } else {
          var array = encode_to_array(response);

          if( parseInt(array['test_message']) == 1) {
            alert(errSuccess);
          } else {
            alert(errFail);
          }
          return true;
        }
      }

      return false;
    };

    settings.complete = function() {
    };

    jQuery.ajax(settings);
  };
}

$z.c({
  NetIPSetup: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    timeout_msg : null,
    registerEvent : function() {
      var c = this;

      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.update(c.m.data);
      });

      $('#renew').click(function() {
         $('#dialog_pleasewait').dialog('option', 'title', langArray['LTXT_SETUPUSERIPSETUP_RENEW']);
         c.updateTips(langArray['LTXT_NETWORKSERVER_RESTART']);
         c.buttonCmdProc(1);
      });

      $('#ipv6renew').click(function() {
        $('#dialog_pleasewait').dialog('option', 'title', langArray['LTXT_SETUPUSERIPSETUP_RENEW']);
        c.updateTips(langArray['LTXT_NETWORKSERVER_RESTART']);
        c.buttonCmdProc(1);
      });

      $('#rtsp_autoport').click(function() {
        var ret = c.portValidation(this);
        if (typeof ret == 'boolean' && ret == true) {
          c.buttonCmdProc(2);
        } else {
          alert(ret);
        }
      });

      $('#rtsp_removeport').click(function() {
        var ret = c.portValidation(this);
        if (typeof ret == 'boolean' && ret == true) {
          c.buttonCmdProc(3);
        } else {
          alert(ret);
        }
      });

      $('#net_autoport').click(function() {
        var ret = c.portValidation(this);
        if (typeof ret == 'boolean' && ret == true) {
          c.buttonCmdProc(4);
        } else {
          alert(ret);
        }
      });

      $('#net_removeport').click(function() {
        var ret = c.portValidation(this);
        if (typeof ret == 'boolean' && ret == true) {
          c.buttonCmdProc(5);
        } else {
          alert(ret);
        }
      });


      $('input:text').keyup(function(event) {
        for(var i = 1; i < 5; i++ ) {
          if((this.id == 'ipv6ipaddr' + i)) {
            var data = $('input#ipv6ipaddr' + i).val();
            data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣A-Zg-z\~\-\=\{\}\\\.\"\<\>\?\!\@\#\$\%\^\&\*\(\)\_\+\|\,\/\;\'\[\]\ ]/g,'');
            $('input#ipv6ipaddr' + i).val(data);
          } 
        }
        if((this.id == 'ipv6gateway')) {
          var data = $('input#ipv6gateway').val();
          data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣A-Zg-z\~\-\=\{\}\\\.\"\<\>\?\!\@\#\$\%\^\&\*\(\)\_\+\|\,\/\;\'\[\]\ ]/g,'');
          $('input#ipv6gateway').val(data);
        } 
        if((this.id == 'ipv6ddns1server')) {
          var data = $('input#ipv6ddns1server').val();
          data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣A-Zg-z\~\-\=\{\}\\\.\"\<\>\?\!\@\#\$\%\^\&\*\(\)\_\+\|\,\/\;\'\[\]\ ]/g,'');
          $('input#ipv6ddns1server').val(data);
        }
        if((this.id == 'ipv6ddns2server')) {
          var data = $('input#ipv6ddns2server').val();
          data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣A-Zg-z\~\-\=\{\}\\\.\"\<\>\?\!\@\#\$\%\^\&\*\(\)\_\+\|\,\/\;\'\[\]\ ]/g,'');
          $('input#ipv6ddns2server').val(data);
        }
      });
      
      $('.ipv6prefixset').keypress(function(event) {
        if( !isValidKeyNumber(event.which) ) {
          event.preventDefault();
          return false;
        }
        return true;
      }).change(function(event) {
        if( !isValidNumRange(this, 1, 128) ) {
          event.preventDefault();
          return false;
        }
        return true;
      }).keyup(function(event) {
        for(var i = 1; i < 5; i ++ ){
          var data = $('input#ipv6prefix' + i).val();
          data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣A-Za-z\~\-\=\{\}\\\.\"\<\>\?\!\@\#\$\%\^\&\*\(\)\_\+\|\:\ ]/g,'');
          $('input#ipv6prefix' + i).val(data);
        }
      });

      $('#dialog_dhcpmsg').dialog({
        autoOpen: false,
        modal: true,
        show: 'drop',
        hide: 'drop',
        title: langArray['LTXT_NOTICE'],
        width: '450px',
        resizable: false,
        draggable: false,
        closeOnEscape: false,
        autoResize: true,
        buttons: [{
          text: langArray['LTXT_OK'],
          click: function() {
           $('#dialog_dhcpmsg').dialog('close');
          }
        }]
      });

      $('#dialog_pleasewait').dialog({
        autoOpen: false,
        modal: true,
        show: 'drop',
        hide: 'drop',
        title: langArray["LTXT_WAIT"],
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
          $.scm.UnregistCallback('IRET_SCM_REG_RTSP', c.CbRetRegistRtsp);
          $.scm.UnregistCallback('IRET_SCM_RMV_RTSP', c.CbRetRemoveRtsp);
          $.scm.UnregistCallback('IRET_SCM_REG_WEB', c.CbRetRegistWeb);
          $.scm.UnregistCallback('IRET_SCM_RMV_WEB', c.CbRetRemoveWeb);
          $.scm.UnregistCallback('IRET_SCM_DHCP_RENEW', c.CbRetDhcpRenew);
          // $.scm.UnregistCallback('IRET_SCM_IPV6_RENEW', c.CbRetIpv6Renew);
          $.scm.UnregistCallback('IRET_SCM_APPLY_NETINFO', c.CbRetApplyNetinfo);
          $(this).dialog('option', 'title', langArray["LTXT_WAIT"]);
          c.updateTips(langArray['LTXT_MSG_WAIT'], true);
        },
        buttons: [{
          id: "dialogOk",
          text: langArray["LTXT_OK"],
          click: function() {
            var me = this;
          }
        }]
      });

      $('#dialogOk').click(function() {
        $('#dialog_pleasewait').dialog('close');
      });

    },
    updatePortCmdError : function(param, flag) {
      var errorCode = parseInt(param);
      switch(errorCode) {
      case 101:
        if (flag == true) {
          this.updateTips(sprintf(langArray['LTXT_UPNP_ERROR_101_REGISTER'], ''));
        } else {
          this.updateTips(sprintf(langArray['LTXT_UPNP_ERROR_101_REMOVE'], ''));
        }
        break;
      case 102:
        this.updateTips(sprintf(langArray['LTXT_UPNP_ERROR_102'], ''));
        break;
      case 103:
        this.updateTips(sprintf(langArray['LTXT_UPNP_ERROR_103'], ''));
        break;
      case 104:
        this.updateTips(sprintf(langArray['LTXT_UPNP_ERROR_104'], ''));
        break;
      case 105:
        this.updateTips(sprintf(langArray['LTXT_UPNP_ERROR_105'], ''));
        break;
      case 106:
        this.updateTips(sprintf(langArray['LTXT_UPNP_ERROR_106'], ''));
        break;
      case 107:
        this.updateTips(sprintf(langArray['LTXT_UPNP_ERROR_107'], ''));
        break;
      case 108:
        this.updateTips(sprintf(langArray['LTXT_UPNP_ERROR_108'], ''));
        break;
      default:
        this.updateTips(sprintf(langArray['LTXT_UPNP_ERROR_100'], errorCode));
        break;
      }
    },
    CbRetRegistRtsp : function(param) {
      $('#dialogOk').button({ disabled: false });
      $z.current.updatePortCmdError(param, true);
    },
    CbRetRemoveRtsp : function(param) {
      $('#dialogOk').button({ disabled: false });
      $z.current.updatePortCmdError(param, false);
    },
    CbRetRegistWeb : function(param) {
      $('#dialogOk').button({ disabled: false });
      $z.current.updatePortCmdError(param, true);
    },
    CbRetRemoveWeb : function(param) {
      $('#dialogOk').button({ disabled: false });
      $z.current.updatePortCmdError(param, false);
    },
    CbRetDhcpRenew : function(param) {
      $.scm.Stop();

      clearTimeout($z.current.timeout_msg);
      $z.current.timeout_msg = null;

      if($('input#ipv6renew')) {
        $z.current.updateTips(langArray["LTXT_MSG_DHCP_RENEWAL_COMPLETE"]);
      } else if($('input#renew')) {
        $z.current.updateTips(langArray["LTXT_MSG_DHCP_RENEWAL_COMPLETE"]);
      } else {
        return;
      }
      
      /*$z.current.timeout_msg = setTimeout(function(){
        $z.current.updateTips(langArray['LTXT_ERR_SUCCESS']);
        $('#dialogOk').button({ disabled: false });  

        clearTimeout($z.current.timeout_msg);
        $z.current.timeout_msg = null;
      }, 5000);*/
    },
    // CbRetIpv6Renew : function(param) {
    //   $.scm.Stop();

    //   clearTimeout($z.current.timeout_msg);
    //   $z.current.timeout_msg = null;

    //   $z.current.updateTips(langArray["LTXT_MSG_DHCP_RENEWAL_COMPLETE"]);
    // },
    CbRetApplyNetinfo : function(param) {
      // $.scm.UnregistCallback("IRET_SCM_APPLY_NETINFO", c.CbRetApplyNetinfo);
      $z.current.updateTips(langArray["LTXT_ERR_COMPLETE"]);
      $('#dialogOk').button({ disabled: false });
    },
    buttonCmdProc : function(btnId) {
      var c = this;
      $('#dialogOk').button({ disabled: false });
      data = this.getCurrData();
      data['btn'] = btnId.toString();
      data['action'] = 'set_setup';
      data['menu'] = 'network.ipsetup';

      data = $.param(data);
      data+="&debug=";
      $('#dialog_pleasewait').dialog('open');
      $('#dialogOk').button({ disabled: true });

      $.ajax({
        type: "POST",
        url: "/cgi-bin/webra_fcgi.fcgi",
        async: false,
        data: data,
        success: function(response) {
          switch(response) {
          case 'DVR In Setup!':
            c.updateTips(langArray["LTXT_ERR_DVRINSETUP"]);
            $('#dialogOk').button({ disabled: false });
            return;
          case 'DVR In Arch!':
            c.updateTips(langArray["LTXT_ERR_DVRINARCH"]);
            $('#dialogOk').button({ disabled: false });
            return;
          case 'DVR In SCM not ready!':
            c.updateTips(langArray["LTXT_ERR_NVR_NOT_READY"]);
            $('#dialogOk').button({ disabled: false });
            return;
          }
          
          if(btnId == 1)
          { //if DHCP Renew button clicked, then start scm async mode.
            $.scm.Stop();
            $.scm.Start(true);
          }
          else
          { //if not DHCP Renew button clicked, then start scm sync mode. 
            $.scm.Stop();
            $.scm.Start();
          }
          
          if (btnId != 1)
          {
            setTimeout( function () {
              $('#dialog_pleasewait').dialog('close');
            }, 60000);  
          }
          
          switch(btnId) {
          case 1:
            $.scm.RegistCallback('IRET_SCM_DHCP_RENEW', c.CbRetDhcpRenew);

            $z.current.timeout_msg = setTimeout( function(){
              $.scm.UnregistCallback('IRET_SCM_DHCP_RENEW', c.CbRetDhcpRenew);
              // if($('input#ipv6renew')) {
              //   c.updateTips(langArray["LTXT_MSG_DHCP_RENEWAL_COMPLETE"]);
              // } else if($('input#renew')) {
                c.updateTips(langArray["LTXT_MSG_DHCP_RENEWAL_COMPLETE"]);
              // } else {
              //   return;
              // }
            }, 30000);
            
            break;
          case 2:
            $.scm.RegistCallback('IRET_SCM_REG_RTSP', c.CbRetRegistRtsp);
            break;
          case 3:
            $.scm.RegistCallback('IRET_SCM_RMV_RTSP', c.CbRetRemoveRtsp);
            break;
          case 4:
            $.scm.RegistCallback('IRET_SCM_REG_WEB', c.CbRetRegistWeb);
            break;
          case 5:
            $.scm.RegistCallback('IRET_SCM_RMV_WEB', c.CbRetRemoveWeb);
            break;
          case 6:
            $.scm.RegistCallback('IRET_SCM_APPLY_NETINFO', c.CbRetApplyNetinfo);
            break;
          }
          return true;
        },
        fail: function(response) {
          c.updateTips(langArray["LTXT_ERR_SEND"]);

          switch(btnId) {
            case 1:
              $.scm.UnregistCallback('IRET_SCM_DHCP_RENEW', c.CbRetDhcpRenew);

              break;
          }

          $('#dialogOk').button({ disabled: false });
          return false;
        }
      });
    },
    getCurrData : function() {
      data = form2Array('form');
      data = $z.current.m.makeupData(data);
      return data;
    },
    index : function() {
      var c = this;
      var action = 'action=get_setup&menu=' + c.m.menu;

      c.form('form',
      function before() {
        var retRtsp = c.portValidation($('#rtspport')[0]);
        var retWeb = c.portValidation($('#netserviceport')[0]);

        if (typeof retRtsp == 'boolean' && retRtsp == true) {
        } else {
          alert(retRtsp);
        }
        
        if (typeof retWeb == 'boolean' && retWeb == true) {
        } else {
          alert(retWeb);
        }

        if (typeof retRtsp == 'boolean' && retRtsp == true 
            && typeof retWeb == 'boolean' && retWeb == true) {
          return true;
        } else {
          return -1;
        }
      },
      function after() {
        prevIpaddress = $z.current.m.origData['prevIpaddress'];
       

        if ( prevIpaddress == document.location.hostname ) {
          ipaddr = $('#ipaddressA').val() + '.'
            + $('#ipaddressB').val() + '.'
            + $('#ipaddressC').val() + '.'
            + $('#ipaddressD').val();
        } else {
          ipaddr = document.location.hostname;
        }
        port = $('#netserviceport').val();


        if (ipaddr != document.location.hostname || port != document.location.port) {
          setTimeout(function () {document.location.host = '' + ipaddr + ':' + port}, 3000);
        }
      });

      if( $z.debug ) {
        action += '&debug=';
      }
      c.v.init();

      $('#dhcp').change(function (event) {
        /*
        if (INFO_MODEL.indexOf('IPX') < 0) {
          return;
        }
        */

        if ($('#dhcp').prop('checked') == true) {
          //when dialog is opened in this scope, then dialog is opened when button cancel is clicked.
          //$('#dialog_dhcpmsg').dialog('open');
          c.v.DisableIpsetup();
        } else if ($('#dhcp').prop('checked') == false) {
          c.v.EnableIpsetup();
        } else {
          c.v.DisableIpsetup();
          return;
        }
      });

      $('#checkbox_use_ipv4_lan').change(function(event) {
        var is_checked_ipv4_lan = $(this).prop('checked');
        is_checked_ipv4_lan == true ? c.v.EnableIPv4LanIpsetup()
                                    : c.v.DisableIPv4LanIpsetup();
      });

      $('#checkbox_use_ipv6_lan').change(function(event) {
        var is_checked_ipv6_lan = $(this).prop('checked');
        is_checked_ipv6_lan == true ? c.v.EnableIPv6LanIpsetup()
                                    : c.v.DisableIPv6LanIpsetup();
      })

      $("input[name='ipv6on']").change(function (event) {
        if ($('input#ipv6Off').prop('checked') == true) {
          c.v.DisableIpv6setup();
        } else if ($('input#ipv6Manual').prop('checked') == true) {
          c.v.EnableIpv6setup();
        } else if ($('input#ipv6Auto').prop('checked') == true) {
          c.v.EnableIpv6autosetup();
        } else {
          c.v.DisableIpv6setup();
          return;
        }
      });
  
      $('.ipv6ipset').focusout( function(event) {
        for(var i = 1; i <= 4; i++ ) {
          if($('#ipv6ipaddr'+i).val().length > 0) {
            $('#ipv6prefix'+i).val('64');
          } else if($('#ipv6ipaddr'+i).val().length == 0) {
            $('#ipv6prefix'+i).val('');
          }
        }
      });

      $('.iptextbox').focusin( function (event) {
        if ( $(this).val() == '0') $(this).val('');
      });

      $('.iptextbox').focusout( function (event) {
        var value;
        value = parseInt($(this).val());
        var max = 255;
        this.id.indexOf("addressD") >= 0 ? max=254 : max=255;

        if (isNaN(value) ||
            Validator.test('number', this, 0, max) == Validator.ERR_VALID_NUMBER) {
          $(this).val('0');
          return;
        }

        if ( value < 0 ) {
          $(this).val('0');
          alert(langArray['LTXT_ERR_FIELDVALLESS'] + " [0~254]");
        }
        else if (value > max ) {
          $(this).val('254');
          alert(langArray['LTXT_ERR_FIELDVALOVER'] + " [0~254]");
        }

      });

      $('.portsetting').focusout( function (event) {
        var ret = c.portValidation(this);

        if (typeof ret == 'string') {
          alert(ret);
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
        c.registerEvent();
      });
    },
    portValidation: function(element) {
      var rtsp = parseInt($('#rtspport').val()),
          net = parseInt($('#netserviceport').val());

      if (isNaN(rtsp) || isNaN(net) ||
          Validator.test('port', element, 0, 65535) != Validator.ERR_VALID_OK) {

        return langArray['LTXT_PORT_OUTOFRANGE'];
      }

      if (rtsp == net) {
        return langArray['LTXT_PORT_ALREADY_USED'];
      }

      if (element.id.indexOf('rtsp') >= 0) {
        if (rtsp != 554 && rtsp <= 1024) {
          return langArray['LTXT_PORT_RTSP_ERR'];
        }
      } else {
        if (net != 80 && net <= 1024) {
          return langArray['LTXT_PORT_WEB_ERR'];
        }
      }

      return true;
    },
    updateTips : function ( t , noEffect) {
      tips = $('.tips');
      if (noEffect == undefined) {
        tips.html( t );

        try {
          tips.addClass( "ui-state-highlight" );
          setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
          }, 500 );
        } catch (e) {
          console.log(t + ' ' + noEffect);
        }
      } else {
        tips
        .html( t );
      }
    }
  },
  NetDDNS: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    currServer : -1,
    // defaultDvrName: "",
    // defaultDvrAddr: "",
    CbRetDDNSRegistTest: function(data){
      $.scm.Stop();
      $("#pleasewait_ok").button('enable');
      switch(data){
        case 1:
        case 200:
          $('.tips').text(langArray['LTXT_SYSSET_NET_DDNS_REG_OK']);
        break;
        case 404:
          $('.tips').text(langArray['LTXT_SYSSET_NET_DDNS_REG_NOTFOUND']);
        break;
        case 406:
          $('.tips').text(langArray['LTXT_SYSSET_NET_DDNS_REG_NOTACCEPT']);
        break;
        case 409:
          $('.tips').text(langArray['DDNS2_RES_HOST_CONFLICT_ERR']);
        break;
        case 400:
          $('.tips').text(langArray['LTXT_SYSSET_NET_DDNS_REG_BADREQUEST']);
        break;
        default:
          $('.tips').text(sprintf(langArray['LTXT_SYSSET_NET_DDNS_REG_DEFAULT'], data));
        break;
      }
      if(data == 1) {
        $('.tips').text(langArray['LTXT_SYSSET_NET_DDNS_REG_OK']);
      } else {
        $('.tips').text(langArray['']);
      }
    },
    CbRetDDNSConnectTest: function(data){
      $.scm.Stop();
      $("#pleasewait_ok").button('enable')

      if(data != -1) {
        $('.tips').text(langArray['LTXT_SYSSET_NET_DDNS_CON_SUCCESS']);
      } else {
        $('.tips').text(langArray['LTXT_SYSSET_NET_DDNS_CON_FAIL']);
      }
    },
    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;

      c.form('form',
        function before() {
          var err = Validator.test(null, "input#hostname", 0, 63);

          if( err != Validator.ERR_VALID_OK ) {
            alert(Validator.errStr());
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

      //$('#checkDVRName').click(function() {
      //  alert("Not implemented");
      //});

      //init pleasewait dialog
      $('#dialog_pleasewait').dialog({
        autoOpen: false,
        modal: true,
        show: 'drop',
        hide: 'drop',
        title: langArray['LTXT_NOTICE'],
        width: '450px',
        resizable: false,
        draggable: false,
        closeOnEscape: false,
        autoResize: true,
        buttons: [{
          text: langArray['LTXT_OK'],
          id: 'pleasewait_ok',
          click: function() {
            $('#dialog_pleasewait').dialog('close');
          }
        }],
        open: function(){
            var flag_cmd = $('#dialog_pleasewait').data('flag_cmd');

            var settings = {};
            var data = [];

            $(".ui-dialog-titlebar-close").hide();
            //$.extend(data, arr);

            $('.tips').text(langArray['LTXT_MSG_WAIT']);

            $("#pleasewait_ok").button('disable')

            data.push({name:'action', value:'set_setup'});
            data.push({name: 'ddnsserver', value: $z.current.m.data['ddnsserver']});
            data.push({name: 'hostname', value: $z.current.m.data['hostname']});
            data.push({name: 'username', value: $z.current.m.data['username']});
            data.push({name: 'passwd', value: $z.current.m.data['passwd']});
            switch(flag_cmd) {
              case 'regist':
                data.push({name:'menu', value:'network.ddns_reg_test'});
                $.scm.RegistCallback('IRET_SCM_REG_DDNS', $z.current.CbRetDDNSRegistTest);
              break;
              case 'connect':
                data.push({name:'menu', value:'network.ddns_con_test'});
                $.scm.RegistCallback('IRET_SCM_TST_DDNS', $z.current.CbRetDDNSConnectTest);
              break;
            }

            //if( $z.debug ) {
              data.push({ name:'debug', value:1});
            //}

            settings.url = '/cgi-bin/webra_fcgi.fcgi';
            settings.type = 'POST';
            settings.data = data;

            settings.beforeSend = function(xhr, setting) {
            };

            settings.success = function(response) {
              if( response ) {
                if( response.indexOf("Send Error") >= 0 ) {
                  return false;
                } else {
                  var array = encode_to_array(response);
                  return true;
                }
              }

              return false;
            };

            settings.complete = function() {
            };

            jQuery.ajax(settings);
          }

      });

      $('#ddnsRegTest').click(function() {
        $.scm.Start();
        $('#dialog_pleasewait').data('flag_cmd', 'regist').dialog('open');
      });
      $('#ddnsConnTest').click(function() {
        $.scm.Start();
        $('#dialog_pleasewait').data('flag_cmd', 'connect').dialog('open');
      });

      // Key Validation Event Bind
      $('input:text').keypress(function(event) {
        if( !isValidKeyVirtualKeyboard(event.which) ) {
          event.preventDefault();
          return false;
        }
        return true;
      });

      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.update(c.m.data);
      });

      $('#hostname').focusout( function (event) {
        if ($('#hostname').val().length == 0){
          c.currServer = $('#ddnsserver').val();
          info = c.m.getDdnsInfo(c.currServer);
          $('#hostname').val(info['hostname']);
        }
        c.v.changeNVRAddress();
      });

      $('.alphanumeric').focusout( function (event) {
        if (Validator.test('usrName', this, 0, 64) != Validator.ERR_VALID_OK) {
          alert(langArray['LTXT_ERR_SPECIALCHAR']);
          info = c.m.getDdnsInfo(c.currServer);
          $(this).val(info[this.name]);
        }
      });
      $('#ddnsserver').change( function (event) {
        c.m.setDdnsInfo(c.currServer, {
          'hostname': $('#hostname').val(),
          'username': $('#username').val(),
          'passwd': $('#passwd').val()
        });
        c.currServer = $('#ddnsserver').val();
        info = c.m.getDdnsInfo(c.currServer);
        c.v.showCurrentDdnsServer(info);
      });
      $('#ddnson').change( function (event) {
        if($('#ddnson').val() == 1) {
          c.m.setDdnsInfo(c.currServer, {
            'hostname': $('#hostname').val(),
            'username': $('#username').val(),
            'passwd': $('#passwd').val()
          });
          c.currServer = $('#ddnsserver').val();
          info = c.m.getDdnsInfo(c.currServer);
          c.v.showCurrentDdnsServer(info);
        }
      });

      c.m.get(this.actionUrl, action , function (response) {
        var array = encode_to_array(response);
        var chk = [];
        authCheck = new AuthCheck(array);

        if( !authCheck.check('setup') ) {
          AuthorityNoPermission();
          history.back()
          return;
        }

        array['ddnsserver'] = array['ddnsserver'].toLowerCase();
        for (i = 0 ; i < array['cfg_count'] ; i += 1) {
          array['cfg_' + i + '_server'] = array['cfg_' + i + '_server'].toLowerCase();
        }
        c.v.update(array);
        c.m.initData(array);
      });
    }
  },
  NetEmail: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    //////////// Specific //////////////////////
    emailtest : function(form) {
    },
    index : function() {
      var c = this;

      var emailtest = new EmailTester();

      var action = 'action=get_setup&menu=' + c.m.menu;

      c.form('form',
        function before() {
          var err1 = Validator.test("email", "#testmailto1", 0, 64);


          if( err1 != Validator.ERR_VALID_OK ) {
            alert(Validator.errStr(err1));
            return -1;
          }
          if ( INFO_VENDOR =='VIDECON') {
            var err2 = Validator.test("email", "#testmailto2", 0, 64);
            if( err2 != Validator.ERR_VALID_OK ) {
              alert(Validator.errStr(err1));
              return -1;
            }
          }
          var err1 = Validator.test("number", "#port1");

          if (err1 != Validator.ERR_VALID_OK) {
            alert(langArray["LTXT_ERR_PORTNUM"]);
            $("#port1").val('25');
            return -1;
          }

          if ( INFO_VENDOR =='VIDECON') {
            var err2 = Validator.test("number", "#port2");
            if (err2 != Validator.ERR_VALID_OK) {
              alert(langArray["LTXT_ERR_PORTNUM"]);
              $("#port2").val('25');
              return -1;
            }
          }

          var err1 = Validator.test("port", "#port1", 0, 5);
          if( err1 != Validator.ERR_VALID_OK) {
            alert(langArray["LTXT_ERR_PORTNUM"]);
            $("#port1").val('25');
            return -1;
          }

          if ( INFO_VENDOR =='VIDECON') {
            var err2 = Validator.test("port", "#port1", 0, 5);
            if( err2 != Validator.ERR_VALID_OK) {
              alert(langArray["LTXT_ERR_PORTNUM"]);
              $("#port2").val('25');
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

      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.update(c.m.data);
      });

      // Key Validation Event Bind
      $('input:text').keypress(function(event) {
        if ((this.id == 'testmailto1') || (this.id == 'testmailto2')) {
          return true;
        }
        if (this.id == 'server1') {
          return true;
        }
        if (this.id == 'server2') {
          return true;
        }
          if( !isValidKeyVirtualKeyboard(event.which) ) {
            event.preventDefault();
            return false;
          }
          return true;
      });

      $('#btntestemail1').click(function() {
        emailtest.run($("form").serializeArray(),0);
      });

      // Key Validation Event Bind
      $('input:text').keypress(function(event) {
        if(this.id == 'testmailto1' || this.id == 'testmailto2')
            return true;
        if(this.id == 'server1' || this.id == 'server2')
          return true;
        if( !isValidKeyVirtualKeyboard(event.which)) {
          event.preventDefault();
          return false;
        }
        return true;
      });

      $('input#server1').keypress(function(event) {
        if( !isValidKeyDomain(event.which) ) {
          event.preventDefault();
          alert(errSpecialChar);
          $('input#server1').focus();
        }
        return true;
      }).keyup(function(event){
        var data = $('input#server1').val();
        data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g,'');
        $('input#server1').val(data); 
      });

      $('input#port1').keypress(function(event) {
        if( !isValidKeyNumber(event.which) ) {
          event.preventDefault();
          return false;
        }
        return true;
      }).change(function(event) {
        if( !isValidNumRange(this, 0, 65535) ) {
          event.preventDefault();
          return false;
        }
        return true;
      }).keyup(function(event) {
        var data = $('input#port1').val();
        data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣A-Za-z\~\-\=\{\}\\\.\"\<\>\?\!\@\#\$\%\^\&\*\(\)\_\+\|\:\ ]/g,'');
        $('input#port1').val(data);
      });
      
      $('input#user1').keyup(function(event) {
        var data = $('input#user1').val();
        data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g,'');
        $('input#user1').val(data);
      });

      $('input#user2').keyup(function(event) {
        var data = $('input#user2').val();
        data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g,'');
        $('input#user2').val(data);
      });

      $('input#password1').keyup(function(event) {
        var data = $('input#password1').val();
        data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g,'');
        $('input#password1').val(data);
      });

      $('input#password2').keyup(function(event) {
        var data = $('input#password2').val();
        data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g,'');
        $('input#password2').val(data);
      });

      $('input#testmailto1').keyup(function(event) {
        var data = $('input#testmailto1').val();
        data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g,'');
        $('input#testmailto1').val(data);
      });

      $('#btntestemail2').click(function() {
        emailtest.run($("form").serializeArray(),1);
      });

      $('input#port2').keypress(function(event) {
        if( !isValidKeyNumber(event.which) ) {
          event.preventDefault();
          return false;
        }
        return true;
      });

      $('input#port2').change(function(event) {
        if( !isValidNumRange(this, 0, 65535) ) {
          event.preventDefault();
          return false;
        }
        return true;
      });

      //$('input#server2').focusout(function(event) {
      //  if( !CheckDomailFormat($('input#server2').val()) ) {
      //    alert(errSpecialChar);
      //    $('input#server2').focus();
      //  }
      //  return true;
      //});

      c.m.get(this.actionUrl, action , function (response) {
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
  NetStatus: {
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

      c.m.get(this.actionUrl, action , function (response) {
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
  NetSecurity: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    index : function() {
      var c = this;

      var action = 'action=get_setup&menu=' + c.m.menu;

      c.form('form', function before() {

      },
      function after() {

      });

      if( $z.debug ) {
        action += '&debug=';
      }

      if(INFO_MODEL.indexOf("UTM4G") >= 0
        || INFO_MODEL.indexOf("UTM5G") >= 0
        || INFO_MODEL.indexOf("UTM5X") >= 0
        || INFO_MODEL.indexOf("5HG") >= 0
        || INFO_VENDOR =='CBC') {
        $(".for_ipx").hide();
      }
      else {
        $(".for_ipx").show();
      }

      if(INFO_MODEL.indexOf("5G") > 0 || INFO_MODEL.indexOf("5X") > 0 || INFO_MODEL.indexOf("5HG") > 0) {
        $(".rtsp_service").show();
      }

      c.v.init();

      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.update(c.m.data);
      });

      $('#filter_enable').change( function (event) {
        c.v.ipfilterEnable($('#filter_enable').val());
        c.v.displayButtons(c.m.data['filter_rcnt']);
      });

      $('#table_filter .add').click( function (event) {
        var idx = this.id.split('add')[1];
        $('#dialog_filter').data('mode', 'add').data('c', c).data('filterIdx', idx).dialog('open');
      });

      $('#table_filter .edit').click( function (event) {
        var idx = this.id.split('edit')[1];
        $('#dialog_filter').data('mode', 'edit').data('c', c).data('filterIdx', idx).dialog('open');
      });

      $('#table_filter .delete').click( function (event) {
        var idx = this.id.split('delete')[1];
        c.m.removeFilter(idx);
        c.v.update(c.m.data);
      });

      $('#dialog_filter .addr').focusin( function (event) {
        if ( $(this).val() == '0') $(this).val('');
      });

      $('#dialog_filter .addr').focusout( function (event) {
        var value;
        value = parseInt($(this).val());
        if (isNaN(value) ||
            Validator.test('number', this, 0, 255) == Validator.ERR_VALID_NUMBER) {
          $(this).val('0');
          return;
        }

        if ( value < 0 )
          $(this).val('0');
        else if (value > 255 )
          $(this).val('255');

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
  NetSNMP: {
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

      c.m.get(this.actionUrl, action , function (response) {
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
  NetRTP : {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    index : function() {
      var c = this;

      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.update(c.m.data);
      });

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

      c.m.get(this.actionUrl, action , function (response) {
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
