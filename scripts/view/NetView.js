/**
 * @author chcha
 */

$z.v({
  NetIPSetup : {
    init: function() {
      $('.renew').button();
      $('input[type="button"].portsettingbtn').button();

      if(INFO_MODEL.indexOf("IPX") > 0)
      {
        $('#dhcp').click(function(){
          if ($("#dhcp").attr("checked") == "checked") {
            $('#dialog_dhcpmsg').dialog('open');  
          }
        });  
      }

      $('#confirm_conflict').click(function(event){
        $.ajax({
          type: "POST",
          url: "/cgi-bin/webra_fcgi.fcgi",
          async: true,
          cache: false,
          data: 'action=set_setup&menu=network.confirm_conflict',
          success: function(response) {
            var recv_data = recv_encode(response);
            $z.v.NetIPSetup.updateAutoPortStatus(recv_data['is_conflict'], recv_data['upnp_status']);
          }
        });
      });
    },
    update: function(array) {
      var dhcp = (array['dhcp'] == '1');
      var dhcp_changed = false;

      if ($("#dhcp").attr("checked") != "checked") {
        if (dhcp) {
          dhcp_changed = true;
        } else {
          dhcp_changed = false;
        }
      }

      $('#dhcp').prop('checked', dhcp);
      $('#ipaddress').val(array['ipaddress']);
      var ipaddr = array['ipaddress'].split('.');
      $('#ipaddressA').val(ipaddr[0]);
      $('#ipaddressB').val(ipaddr[1]);
      $('#ipaddressC').val(ipaddr[2]);
      $('#ipaddressD').val(ipaddr[3]);

      $('#subnetmask').val(array['subnetmask']);
      var subnetmask = array['subnetmask'].split('.');
      $('#subnetmaskA').val(subnetmask[0]);
      $('#subnetmaskB').val(subnetmask[1]);
      $('#subnetmaskC').val(subnetmask[2]);
      $('#subnetmaskD').val(subnetmask[3]);

      $('#gateway').val(array['gateway']);
      var gateway = array['gateway'].split('.');
      $('#gatewayA').val(gateway[0]);
      $('#gatewayB').val(gateway[1]);
      $('#gatewayC').val(gateway[2]);
      $('#gatewayD').val(gateway[3]);

      $('#ddns1server').val(array['ddns1server']);
      var ddns1server = array['ddns1server'].split('.');
      $('#ddns1serverA').val(ddns1server[0]);
      $('#ddns1serverB').val(ddns1server[1]);
      $('#ddns1serverC').val(ddns1server[2]);
      $('#ddns1serverD').val(ddns1server[3]);

      $('#ddns2server').val(array['ddns2server']);
      var ddns2server = array['ddns2server'].split('.');
      $('#ddns2serverA').val(ddns2server[0]);
      $('#ddns2serverB').val(ddns2server[1]);
      $('#ddns2serverC').val(ddns2server[2]);
      $('#ddns2serverD').val(ddns2server[3]);

      $('#rtspport').val(array['rtspport']);
      $('#netserviceport').val(array['netserviceport']);

      $('#maxtx').val(array['maxtx']);
      $('#ddns').val(array['ddns']);

      $('#autoport').val(array['autoport']);
      this.updateAutoPortStatus(array['is_conflict'], array['upnp_status']);

      if(array['ipv6on'] == '0') {
        $('#ipv6Off').prop('checked', true);
      } else if(array['ipv6on'] == '1') {
        $('#ipv6Manual').prop('checked', true);
      } else if(array['ipv6on'] == '2') {
        $('#ipv6Auto').prop('checked', true);
      } else {
        $('#ipv6Off').prop('checked', true);
      }
      
      $('#ipv6linklocal').val(array['ipv6linklocal']);
      $('#ipv6ipaddr1').val(array['ipv6ipaddr1']);
      $('#ipv6ipaddr2').val(array['ipv6ipaddr2']);
      $('#ipv6ipaddr3').val(array['ipv6ipaddr3']);
      $('#ipv6ipaddr4').val(array['ipv6ipaddr4']);
      
      for(var i=1; i<=4; i++) {
        if (array['ipv6prefix'+i] == 0) {
          $('#ipv6prefix'+i).val("");
          array['ipv6prefix'+i] = "";
        } else {
          $('#ipv6prefix'+i).val(array['ipv6prefix'+i]);
        }
        
        if (array['ipv6ipaddr'+i] == "") {
          $('#ipv6prefix'+i).val("");
          array['ipv6prefix'+i] = "";
        }
      }
      $('#ipv6gateway').val(array['ipv6gateway']);
      $('#ipv6ddns1server').val(array['ipv6ddns1server']);
      $('#ipv6ddns2server').val(array['ipv6ddns2server']);
      if(array['ipv6on'] == '0') {
        this.DisableIpv6setup();
      } else if(array['ipv6on'] == '1') {
        this.EnableIpv6setup();
      } else if(array['ipv6on'] == '2') {
        this.EnableIpv6autosetup();
        // for(var i = 1; i < 5; i++) {
          //   $('#ipv6ipaddr'+i).val('');
        // }
      } else {
        this.DisableIpv6setup();
      }

      array['lan_ipv4_using'] == 1 ? $('#checkbox_use_ipv4_lan').prop('checked', true)
                                    :$('#checkbox_use_ipv4_lan').prop('checked', false);
      array['lan_ipv6_using'] == 1 ? $('#checkbox_use_ipv6_lan').prop('checked', true)
                                    :$('#checkbox_use_ipv6_lan').prop('checked', false);

      var lan_ipv4_address = array['lan_ipv4_address'].split('.');
      $('#lan_ipv4_addressA').val(lan_ipv4_address[0]);
      $('#lan_ipv4_addressB').val(lan_ipv4_address[1]);
      $('#lan_ipv4_addressC').val(lan_ipv4_address[2]);
      $('#lan_ipv4_addressD').val(lan_ipv4_address[3]);

      var lan_ipv4_subnetmask = array['lan_ipv4_subnetmask'].split('.');
      $('#lan_ipv4_subnetmaskA').val(lan_ipv4_subnetmask[0]);
      $('#lan_ipv4_subnetmaskB').val(lan_ipv4_subnetmask[1]);
      $('#lan_ipv4_subnetmaskC').val(lan_ipv4_subnetmask[2]);
      $('#lan_ipv4_subnetmaskD').val(lan_ipv4_subnetmask[3]);

      $('#lan_ipv6_address').val(array['lan_ipv6_address']);
      $('#lan_ipv6_prefix').val(array['lan_ipv6_prefix']);
      
      if (dhcp_changed) {
        $('#dhcp').change();
        $('#dhcp').trigger($.Event('change'));
      }

      $('#checkbox_use_ipv4_lan').change();
      $('#checkbox_use_ipv6_lan').change();

      if ($('#dhcp').prop('checked') == false) {
        this.EnableIpsetup();
      }
    },
    EnableIpsetup: function() {
      $('#renew').attr('disabled', 'disabled');
      $('.ipsetting').removeAttr('disabled');
    },
    DisableIpsetup: function() {  
      $('#renew').removeAttr('disabled');
      $('.ipsetting').attr('disabled', 'disabled');
    },
    EnableIPv4LanIpsetup: function() {
      $('.lan_ipv4_ipsetting').removeAttr('disabled');
    },
    DisableIPv4LanIpsetup: function() {
      $('.lan_ipv4_ipsetting').attr('disabled', 'disabled');
    },
    EnableIPv6LanIpsetup: function() {
      $('.lan_ipv6_ipsetting').removeAttr('disabled');
      $('.lan_ipv6_prefix').removeAttr('disabled');
    },
    DisableIPv6LanIpsetup: function() {
      $('.lan_ipv6_ipsetting').attr('disabled', 'disabled');
      $('.lan_ipv6_prefix').attr('disabled', 'disabled');
    },
    DisableIpv6setup: function() {
      $('#ipv6renew').attr('disabled', 'disabled');
      $('#ipv6linklocal').attr('disabled', 'disabled');
      $('.ipv6ipset').attr('disabled', 'disabled');
      $('.ipv6prefixset').attr('disabled', 'disabled');
      $('.ipv6gatewayset').attr('disabled', 'disabled');
      $('.ipv6dnsset').attr('disabled', 'disabled');
    },
    EnableIpv6setup: function() {
      $('#ipv6renew').attr('disabled', 'disabled');
      $('#ipv6linklocal').attr('disabled', 'disabled');
      $('.ipv6ipset').removeAttr('disabled');
      $('.ipv6prefixset').removeAttr('disabled');
      $('.ipv6gatewayset').removeAttr('disabled');
      $('.ipv6dnsset').removeAttr('disabled');
    },
    EnableIpv6autosetup: function() {
      $('#ipv6renew').removeAttr('disabled');
      $('#ipv6linklocal').attr('disabled', 'disabled');
      $('.ipv6ipset').attr('disabled', 'disabled');
      $('.ipv6prefixset').attr('disabled', 'disabled');
      $('.ipv6gatewayset').attr('disabled', 'disabled');
      $('.ipv6dnsset').attr('disabled', 'disabled');
    },
    updateAutoPortStatus: function(param_is_conflict, param_port_status) {
      if(!isNaN(parseInt(param_is_conflict)) && parseInt(param_is_conflict)) {
        $('#port_status').val(langArray['LTXT_SETUPMENU_NET_PORT_STATUS_CONFLICT']);
        $('#port_status').attr("title", langArray['LTXT_SETUPMENU_NET_PORT_STATUS_CONFLICT']);
      } else {
        switch(parseInt(param_port_status)) {
          case 1:
            $('#port_status').val(langArray['LTXT_SETUPMENU_NET_PORT_STATUS_SUCCESS']);
            $('#port_status').attr("title", langArray['LTXT_SETUPMENU_NET_PORT_STATUS_SUCCESS']);
          break;
          case 3:
            $('#port_status').val(langArray['LTXT_SETUPMENU_NET_PORT_STATUS_FAILED']);
            $('#port_status').attr("title", langArray['LTXT_SETUPMENU_NET_PORT_STATUS_FAILED']);
          break;
          case 4:
            $('#port_status').val(langArray['LTXT_SETUPMENU_NET_PORT_STATUS_NOT_SUPPORT']);
            $('#port_status').attr("title", langArray['LTXT_SETUPMENU_NET_PORT_STATUS_NOT_SUPPORT']);
          break;
          case 5:
            $('#port_status').val(langArray['LTXT_SETUPMENU_NET_PORT_STATUS_FAILED_UPDATE']);
            $('#port_status').attr("title", langArray['LTXT_SETUPMENU_NET_PORT_STATUS_FAILED_UPDATE']);
          break;
          case 6:
            $('#port_status').val(langArray['LTXT_SETUPMENU_NET_PORT_STATUS_STOPPED']);
            $('#port_status').attr("title", langArray['LTXT_SETUPMENU_NET_PORT_STATUS_STOPPED']);
          break;
          default:
            $('#port_status').val(langArray['LTXT_SETUPMENU_NET_PORT_STATUS_CONFLICT']);
            $('#port_status').attr("title", langArray['LTXT_SETUPMENU_NET_PORT_STATUS_CONFLICT']);
          break;
        }
      }
    }
  },
    NetDDNS : {
        init: function() {
          if (INFO_VENDOR === 'ALSOK' || INFO_VENDOR === 'TAKENAKA') {
            $(".remove_alsok").hide();
          }

          $('#ddnson').change(function(event){
            if(this.value == 0) { //DDNS -> OFF
              $('#ddnsserver').attr('disabled', 'disabled');
              $('#ddnsserverone').attr('disabled', 'disabled');
              $('#hostname').attr('disabled', 'disabled');
              $('#ddnsRegTest').attr('disabled', 'disabled');
              $('#ddnsConnTest').attr('disabled', 'disabled');
              $('#username').attr('disabled', 'disabled');
              $('#passwd').attr('disabled', 'disabled');
              $z.current.v.hideTextFieldForDDNS();
              $('#hidehostname').attr('disabled', 'disabled');
              $('#hidedvraddress').attr('disabled', 'disabled');
              $('#hideusername').attr('disabled', 'disabled');
              $('#hidepasswd').attr('disabled', 'disabled');
            } else { //DDNS -> ON
              $('#ddnsserver').removeAttr('disabled');
              $('#ddnsserverone').removeAttr('disabled');
              $('#hostname').removeAttr('disabled');
              $('#ddnsRegTest').removeAttr('disabled');
              $('#ddnsConnTest').removeAttr('disabled');
              if($('#ddnsserver').val() == 1) {
                $('#username').removeAttr('disabled');
                $('#passwd').removeAttr('disabled');
              }
              $z.current.v.showTextFieldForDDNS();
              $('#hidehostname').removeAttr('disabled');
              $('#hidedvraddress').removeAttr('disabled');
              $('#hideusername').removeAttr('disabled');
              $('#hidepasswd').removeAttr('disabled');
            }
          });

          if (INFO_VENDOR === 'I3DVR') {
            $('#sequrinet_config').hide();
            $('#sequrinet_title').hide();
          }
        },
        update: function(array) {
          ddnsServerIndex = 0;

          if (INFO_VENDOR === 'S1') {
            $('#ddnson').val(array['ddnson']);
            $('#ddnsservers1').val(array['ddnsserver']);
            $('#dvraddress').val(array['hostname']);
            $('#s1_p2pEnable').val(array['s1_p2pEnable']);
          } else if (INFO_VENDOR === 'ALSOK' || INFO_VENDOR === 'TAKENAKA') {
            $('#ddnsserver').empty();
            for (i = 0 ; i < array['cfg_count'] ; i += 1) {
              if (array['ddnsserver'] == array['cfg_' + i + '_server']) {
                ddnsServerIndex = i;
              }
              option = $('<option>')
                .val(i)
                .html(array['cfg_' + i + '_server'].toLowerCase());
              $('#ddnsserver').append(option);
            }
            if(array['cfg_count'] == 1) {
                $("#ddnsserverone").val(array['cfg_0_server']);
                $(".show_alsok").show();
                $("#ddnsserver").hide();
            }
            else {
                $(".show_alsok").hide();
                $("#ddnsserver").show();
            }
              


            $('#ddnson').val(array['ddnson']);
            $('#ddnsserver').val(ddnsServerIndex );
            $('#ddnsservers1').val(array['ddnsserver']);

            $('#ddnsserver').trigger($.Event('change'));
          } 
          else {
            $(".show_alsok").hide();
            $('#ddnsserver').empty();
            for (i = 0 ; i < array['cfg_count'] ; i += 1) {
              if (array['ddnsserver'] == array['cfg_' + i + '_server']) {
                ddnsServerIndex = i;
              }
              option = $('<option>')
                .val(i)
                .html(array['cfg_' + i + '_server'].toLowerCase());
              $('#ddnsserver').append(option);
            }

            $('#ddnson').val(array['ddnson']);
            $('#ddnsserver').val(ddnsServerIndex );
            $('#ddnsservers1').val(array['ddnsserver']);

            $('#ddnsserver').trigger($.Event('change'));
            $('#ddnson').trigger($.Event('change'));
          }

          $("#sequrinet_enable").val(array['sequrinet_enable']);
        },
        showCurrentDdnsServer: function (array) {
          $('#hostname').val(array['hostname']);
          $('#username').val(array['username']);
          $('#passwd').val(array['passwd']);

          array['hostname_on'] == '0' ? $('#hostname').attr('disabled', 'disabled') : $('#hostname').removeAttr('disabled');
          array['username_on'] == '0' ? $('#username').attr('disabled', 'disabled') : $('#username').removeAttr('disabled');
          array['passwd_on'] == '0' ? $('#passwd').attr('disabled', 'disabled') : $('#passwd').removeAttr('disabled');
          $('#dvraddress').attr('disabled', 'disabled');
          /* TODO : is this code ok for IPX, S1-IPX?
          if (INFO_MODEL.indexOf('IPX') < 0) {
            $('#ddnsserver').hide();
            $('#hostname').removeAttr('disabled');
          }
          */
          this.changeNVRAddress()
        },
        changeNVRAddress: function() {
          if( $('#dvraddress').val.length >= 1 ) {
            $('#dvraddress').val( $('#hostname').val() + "."
                + $('#ddnsserver option')[$('#ddnsserver').val()].text.toLowerCase() );
          }
        },
	hideTextFieldForDDNS: function() {
	    $("#hostname").hide();
	    $("#dvraddress").hide();
	    $("#username").hide();
	    $("#passwd").hide();
	    
	    $("#hidehostname").show();
	    $("#hidedvraddress").show();
	    $("#hideusername").show();
	    $("#hidepasswd").show();
	},
	showTextFieldForDDNS: function() {
	    $("#hostname").show();
	    $("#dvraddress").show();
	    $("#username").show();
	    $("#passwd").show();
	    
	    $("#hidehostname").hide();
	    $("#hidedvraddress").hide();
	    $("#hideusername").hide();
	    $("#hidepasswd").hide();
	}
    },
    NetEmail : {
        init: function() {
        },
        update: function(array) {
          $('#server1').val(array['server1']);
          $('#port1').val(array['port1']);
          $('#security1').val(array['security1']);
          $('#user1').val(array['user1']);
          $('#password1').val(array['password1']);
          $('#testmailto1').val(array['testmailto1']);
        if (INFO_VENDOR =='VIDECON') {
          $('#server2').val(array['server2']);
          $('#port2').val(array['port2']);
          $('#security2').val(array['security2']);
          $('#user2').val(array['user2']);
          $('#password2').val(array['password2']);
          $('#testmailto2').val(array['testmailto2']);
          $('#individual1').val(array['individual1']);
          $('#individual2').val(array['individual2']);
        }
      }
    },
    NetStatus : {
        init: function() {

        },
        update: function(array) {
        }
    },
    NetSecurity: {
      init: function() {
        $('#table_filter input').attr('disabled', 'disabled');

        $('#dialog_filter').dialog({
          autoOpen: false,
          modal: true,
          resizable: false,
          draggable: false,
          show: "drop",
          hide: "drop",
          me: null,
          c: null,
          mode: null,
          filterIdx: null,

          open: function(event, ui) {
            me = $(this);
            mode = me.data('mode');
            c = me.data('c');
            filterIdx = $(this).data('filterIdx');
            if(mode == 'add') {
              me.dialog('option', 'title', langArray["LTXT_SETUP_ADD"]);
              $('#diag_filter_type').val('8');
              $('#dialog_filter .addr').val('0');
            } else if (mode == 'edit') {
              me.dialog('option', 'title', langArray["LTXT_EDIT"]);
              $('#diag_filter_type').val(c.m.data['filter_type' + filterIdx]);
              ipaddr = c.m.data['filter_addr' + filterIdx].split('.');
              $('#diag_filter_addr_a').val(ipaddr[0]);
              $('#diag_filter_addr_b').val(ipaddr[1]);
              $('#diag_filter_addr_c').val(ipaddr[2]);
              $('#diag_filter_addr_d').val(ipaddr[3]);
            } else {
              me.dialog('close');
            }
          },
          buttons: [{
            text: langArray['LTXT_OK'],
            click: function() {
              addr = $('#diag_filter_addr_a').val() + '.'
                   + $('#diag_filter_addr_b').val() + '.'
                   + $('#diag_filter_addr_c').val() + '.'
                   + $('#diag_filter_addr_d').val();
              if(mode == 'add') {
                c.m.addFilter(filterIdx, $('#diag_filter_type').val(), addr);
              } else {
                // edit
                c.m.editFilter(filterIdx, $('#diag_filter_type').val(), addr);
              }
              c.v.update(c.m.data);
              $(this).dialog('close');
            }
          },
          {
            text: langArray['LTXT_CANCEL'],
            click: function() {
              $(this).dialog('close');
            }
          }]
        });
      },
      update: function(array) {
        $('#srtspon').val(array['srtspon']);
        $('#srtsp_method').val("SEED_128")
          .keypress( function(e) {
            return false;
          })
          .focus( function(e) {
            $(this).blur();
          });
        //$('#srtsp_method').val(array['srtsp_method']);
        $('#httpson').val(array['httpson']);
        $('#httpauth_method').val(array['httpauth_method']);
        $('#filter_enable').val(array['filter_enable']);
        $('#filter_opmode').val(array['filter_opmode']);

        for (var i = 0 ; i < 8 ; i += 1) {
          switch (array['filter_type' + i]) {
          case '0':
            $('#filter_type' + i).val("");
            break;
          case '8':
            $('#filter_type' + i).val("NETWORK(A CLASS)");
            break;
          case '16':
            $('#filter_type' + i).val("NETWORK(B CLASS)");
            break;
          case '24':
            $('#filter_type' + i).val("NETWORK(C CLASS)");
            break;
          case '32':
            $('#filter_type' + i).val("IP ADDRESS");
            break;
          case undefined:
          case '':
            $('#filter_type' + i).val("");
            $('#filter_addr' + i).val("");
            continue;
          }

          $('#filter_addr' + i).val(array['filter_addr' + i]);
        }

        var e = jQuery.Event("change");
        $('#filter_enable').trigger(e);
      },
      ipfilterEnable: function(onOff) {
        if ($('#filter_enable').val() == 0) {
          // OFF
          $('#filter_opmode').attr('disabled', 'disabled');
          $('#table_filter td').attr('disabled', 'disabled');
          $('#table_filter input:button').attr('disabled', 'disabled');
        } else {
          // ON
          $('#filter_opmode').removeAttr('disabled');
          $('#table_filter td').removeAttr('disabled');
          $('#table_filter input:button').removeAttr('disabled');
        }
      },
      displayButtons: function(cnt) {
        cnt = parseInt(cnt);
        $('#table_filter input:button').hide();
        for (var i = 0; i < cnt ; i += 1) {

          $('#table_filter #edit' + i).show();
          $('#table_filter #delete' + i).show();
        }
        $('#table_filter #add' + (cnt)).show();
      }
    },
    NetSNMP : {
        init: function() {
          $(":radio[name='version']").change(function()
          {
            var selected_value = parseInt($("input[name='version']:checked").val());
            switch(selected_value)
            {
              case 0:
                $z.v.NetSNMP.checkV2(true);
                $z.v.NetSNMP.checkV3(true);
              break;
              case 1:
                $z.v.NetSNMP.checkV2(false);
                $z.v.NetSNMP.checkV3(true);
              break;
              case 2:
                $z.v.NetSNMP.checkV2(true);
                $z.v.NetSNMP.checkV3(false);
              break;
            }
          });

          $('#v3_userid').keyup(function(event){
            var text_userid = this.value.replace(/ /g, '');
            if(text_userid.length > 0)
            {
              $('#v3_user_priv').prop('disabled', false);
              $('#authv3_user_auth').change();
            }
            else
            {
              $('#v3_user_auth').prop('disabled', true);
              $('#v3_user_auth_key').prop('disabled', true);
              $('#v3_user_priv').prop('disabled', true);
              $('#v3_user_priv_key').prop('disabled', true);
            }
          });

          $('#v3_user_priv').change(function(){
            if(this.value == 'NONE')
            {
              $('#v3_user_auth').prop('disabled', true);
              $('#v3_user_auth_key').prop('disabled', true);
              $('#v3_user_priv_key').prop('disabled', true);
            }
            else
            {
              $('#v3_user_auth').prop('disabled', false);
              $('#v3_user_priv_key').prop('disabled', false); 

              $('#v3_user_priv').change();
            }
          });

          $('#v3_user_auth').change(function(){
            if(this.value == 'NONE')
            {
              $('#v3_user_auth_key').prop('disabled', true);
            }
            else
            {
              $('#v3_user_auth_key').prop('disabled', false); 
            }
          });
        },
        update: function(array) {
          //$("input[name='version']:checked").val()
          $("input[name='version'][value="+array['version']+"]").prop('checked', true);
          $("#v2_communitystring").val(array['v2_communitystring']);
          $("#v2_trap_conf_address").val(array['v2_trap_conf_address']);
          $("#v2_trap_conf_communitystring").val(array['v2_trap_conf_communitystring']);
          $("#v3_engineid").text(array['v3_engineid']);
          $("#v3_engineid").val(array['v3_engineid']);
          $("#v3_userid").val(array['v3_userid']);
          $("#v3_user_auth").val(array['v3_user_auth']);
          $("#v3_user_auth_key").val(array['v3_user_auth_key']);
          $("#v3_user_priv").val(array['v3_user_priv']);
          $("#v3_user_priv_key").val(array['v3_user_priv_key']);
          $("#v3_receiver_address").val(array['v3_receiver_address']);

          //$("input[name='version'][value="+array['version']+"]").change();
          
          //$('#v3_userid').keyup();
          //$('#v3_user_priv').change();

          var selected_value = parseInt($("input[name='version']:checked").val());
            switch(selected_value)
            {
              case 0:
                $z.v.NetSNMP.checkV2(true);
                $z.v.NetSNMP.checkV3(true);
              break;
              case 1:
                $z.v.NetSNMP.checkV2(false);
                $z.v.NetSNMP.checkV3(true);
              break;
              case 2:
                $z.v.NetSNMP.checkV2(true);
                $z.v.NetSNMP.checkV3(false);
              break;
            }

          /*if(array['version'] == 2 && array['v3_userid'].length > 0) {
            $('#v3_user_priv').prop('disabled', false);
            if($('#v3_user_priv').val() != 'NONE') {
              $('#v3_user_priv_key').prop('disabled', false);
              $('#v3_user_auth').prop('disabled', false);
            }

            if($('#v3_user_auth').val() != 'NONE') {
              $('#v3_user_auth_key').prop('disabled', false);
            }
          }*/
        },
        userNameChanged: function(event){

        },
        checkV2: function(flag){
          if(typeof(flag) != 'boolean')
          {
            return false;
          }

          $('#v2_communitystring').prop('disabled', flag);
          $('#v2_trap_conf_address').prop('disabled', flag);
          $('#v2_trap_conf_communitystring').prop('disabled', flag);
        },
        checkV3: function(flag){
          if(typeof(flag) != 'boolean')
          {
            return false;
          }

          $('#v3_userid').prop('disabled', flag);
          //$('#v3_user_auth').prop('disabled', flag);
          /*$('#v3_user_auth_key').prop('disabled', flag);
          $('#v3_user_priv').prop('disabled', flag);
          $('#v3_user_priv_key').prop('disabled', flag);*/
          $('#v3_receiver_address').prop('disabled', flag);

          if( flag == true) {
            $('#v3_user_auth').prop('disabled', flag);
            $('#v3_user_auth_key').prop('disabled', flag);
            $('#v3_user_priv').prop('disabled', flag);
            $('#v3_user_priv_key').prop('disabled', flag);
          }

          if( flag == false && $('#v3_userid').val().length > 0) {
            $('#v3_user_priv').prop('disabled', false);
            if($('#v3_user_priv').val() != 'NONE') {
              $('#v3_user_priv_key').prop('disabled', false);
              $('#v3_user_auth').prop('disabled', false);

              if($('#v3_user_auth').val() != 'NONE') {
                $('#v3_user_auth_key').prop('disabled', false);
              }
            }

            
          }
        }
    },
    NetRTP : {
      init: function() {
        $("#audio_backch_mode").change(function(event){
          if(this.value == 1) { //auto
            $("#audio_backch_port").prop("disabled", true);
          } else { //manual
            $("#audio_backch_port").prop("disabled", false);
          }
        });

        $("#audio_backch_port").change(function(event){
          if(!isNaN(parseInt(this.value))) {
            $("#audio_backch_port2").val(parseInt(this.value)+1);
          } 
        });
      },
      update: function(array) {
        //index
        var index_ch = 0;
        var index_stream = 0;
        var index_addr = 0;

        //multicast address bitmask calc
        var tmp_addr = [0, 0, 0, 0];
        var tmp_addr_string = "";

        //rtp tab
        $("#audio_backch_mode").val(array['audio_backch_mode']);
        $("#audio_backch_port").val(array['audio_backch_port']);
        
        $("#rtpsport").val(array['rtpsport']);
        $("#rtpeport").val(array['rtpeport']);

        $("#ttl").val(array['ttl']);

        $("#audio_backch_mode").change();  //trigger mode change for update value.
        $("#audio_backch_port").change();  //trigger port change for update value.

        //multicast tab
        for(index_stream=0; index_stream<2; index_stream++){
          for(index_ch=0; index_ch<INFO_DVRCHANNEL; index_ch++) {
            //calculate bitmasking multicast address
            tmp_addr = [0, 0, 0, 0];
            tmp_addr_string = "";

            for(index_addr=4; index_addr>0; index_addr--) {
              for(var i=8; i>0; i--) {
                //(8-m+1) bit of n class(4:A, 1:D): 2^(8*n-(8-m+1)), n[4..1], m[8..1]. n->index_addr, m->i.
                if((array["vaddr_"+index_stream+"_"+index_ch] & 1<<(8*index_addr)-(8-i+1)) != 0) {
                  tmp_addr[index_addr-1] |= (1 << (i-1));
                } 
              }
              //transalte array to string
              tmp_addr_string += ""+tmp_addr[index_addr-1];
              if(index_addr > 1) {
                tmp_addr_string += ".";
              }
            }
            //calculate done.

            $("#address_"+index_stream+"_"+index_ch).val(tmp_addr_string);
            $("#vport_"+index_stream+"_"+index_ch).val(array["vport_"+index_stream+"_"+index_ch]);
            $("#aport_"+index_stream+"_"+index_ch).val(array["aport_"+index_stream+"_"+index_ch]);

            $("#rtspport").val(array["rtspport"]);
            $("#netserviceport").val(array["netserviceport"]);
          }
        }
      }
    }

});
