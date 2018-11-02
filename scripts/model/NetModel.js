/**
 * @author chcha
 */

$z.m({
    NetIPSetup: {
        menu : 'network.ipsetup',
        compareToArr: function(curArr, searchArr) {
          for( name in curArr) {
            if( this.origData[name] != null && curArr[name] != this.origData[name] ) {
              if( $z.debug )
                $z.log("compareTo[" + name + "]: curr[" + curArr[name] + "] <> orig[" + this.origData[name] + "]");
                var matchFlag = false;

                for(var i = 0; i < searchArr.length; i++) {
                  if(searchArr[i] == name) {
                    matchFlag = true;
                    break;
                  }
                }

                if(!matchFlag) {
                  return false;
                }
                
            }
          }

          if( $z.debug )
            $z.log("compareTo [==]");

          return true;
        },
        makeupData: function(data) {
          if ($('#dhcp').prop('checked') == true) {
            data['dhcp'] = '1';
          } else if ($('#dhcp').prop('checked') == false) {
            data['dhcp'] = '0';
          }else {
            return;
          }

          $('#checkbox_use_ipv4_lan').prop('checked') == true ? data['lan_ipv4_using'] = 1
                                                              : data['lan_ipv4_using'] = 0;
          $('#checkbox_use_ipv6_lan').prop('checked') == true ? data['lan_ipv6_using'] = 1
                                                              : data['lan_ipv6_using'] = 0;

          data['ipaddress'] = $('#ipaddressA').val() + '.'
                            + $('#ipaddressB').val() + '.'
                            + $('#ipaddressC').val() + '.'
                            + $('#ipaddressD').val();
          data['subnetmask'] = $('#subnetmaskA').val() + '.'
                             + $('#subnetmaskB').val() + '.'
                             + $('#subnetmaskC').val() + '.'
                             + $('#subnetmaskD').val();
          data['gateway'] = $('#gatewayA').val() + '.'
                          + $('#gatewayB').val() + '.'
                          + $('#gatewayC').val() + '.'
                          + $('#gatewayD').val();
          data['ddns1server'] = $('#ddns1serverA').val() + '.'
                              + $('#ddns1serverB').val() + '.'
                              + $('#ddns1serverC').val() + '.'
                              + $('#ddns1serverD').val();
          data['ddns2server'] = $('#ddns2serverA').val() + '.'
                              + $('#ddns2serverB').val() + '.'
                              + $('#ddns2serverC').val() + '.'
                              + $('#ddns2serverD').val();

          data['lan_ipv4_address'] = $('#lan_ipv4_addressA').val() + '.'
                                     + $('#lan_ipv4_addressB').val() + '.'
                                     + $('#lan_ipv4_addressC').val() + '.'
                                     + $('#lan_ipv4_addressD').val();
          data['lan_ipv4_subnetmask'] = $('#lan_ipv4_subnetmaskA').val() + '.'
                                      + $('#lan_ipv4_subnetmaskB').val() + '.'
                                      + $('#lan_ipv4_subnetmaskC').val() + '.'
                                      + $('#lan_ipv4_subnetmaskD').val();
          
          if ($('#ipv6Off').prop('checked') == true) {
            data['ipv6on'] = '0';
          } else if ($('#ipv6Manual').prop('checked') == true) {
            data['ipv6on'] = '1';
          } else if ($('#ipv6Auto').prop('checked') == true) {
            data['ipv6on'] = '2';
          } else {
            return;
          }

	    // TODO: Complete code.
          if (data['ipv6on'] == 1) {
            for(var i = 1; i <= 4; i++) {
              if(data['ipv6ipaddr'+i].length > 0) {
                if(Validator.ipv6(data['ipv6ipaddr'+i]) != Validator.ERR_VALID_OK) {	
                  alert(langArray['LTXT_ERR_CHECK_IPADDRESS']);
                  $('.c_sp_btn_okcancel').removeAttr('disabled');
                  return false;
                }
                if(data['ipv6prefix'+i] == "") {
                  data['ipv6prefix'+i] = "64";
                }
              } else if(data['ipv6ipaddr'+i].length == 0) {
                  data['ipv6prefix'+i] = "";
                }
            }
        
            for(var j = 0; j < 4; j++) {
              for(var i = 4; i > 1; i--) {
                if(data['ipv6ipaddr'+(i-1)].length == 0 && data['ipv6ipaddr'+i].length > 0) {
                  data['ipv6ipaddr'+(i-1)] = data['ipv6ipaddr'+i];
                  data['ipv6ipaddr'+i] = "";
                } else if(data['ipv6prefix'+(i-1)].length == 0 && data['ipv6prefix'+i].length >0) {
                  data['ipv6prefix'+(i-1)] = data['ipv6prefix'+i];
                  data['ipv6prefix'+i] = "";
                }
              }
            }
          }
          
          if(data['lan_ipv6_using'] == 1) {
            if(Validator.ipv6(data['lan_ipv6_address']) != Validator.ERR_VALID_OK) {
              alert(langArray['LTXT_ERR_CHECK_IPADDRESS']);
              $('.c_sp_btn_okcancel').removeAttr('disabled');
              return false;
            }

            if(data['lan_ipv6_prefix'] == "") {
              data['lan_ipv6_prefix'] = "64";
            }

            if(!isValidNumRange(document.getElementById("lan_ipv6_prefix"), 1, 128)) {
              return false;
            }

            var split_lan_ipv6_addr = data['lan_ipv6_address'].split(":");
            if(split_lan_ipv6_addr[0].toLowerCase() != "fec0") {
              alert("The IPv6 address of the LAN port must start with 'fec0'.");
              return false;
            }
          }

          return data;
        },
        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
          $('.c_sp_btn_okcancel').attr('disabled', 'disabled');
            if( !this.compareTo(data) ) {
                return false;
            }

	    
            dvrpoke.stop();

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            data['prevIpaddress'] = this.origData['ipaddress'];
            //IPv6 address check
            
            var arr = ["maxtx", "autoport", "ipv6on", "ipv6ipaddr1", "ipv6ipaddr2", "ipv6ipaddr3", "ipv6ipaddr4",
                       "ipv6prefix1", "ipv6prefix2", "ipv6prefix3", "ipv6prefix4", "ipv6gateway", "ipv6ddns1server", "ipv6ddns2server",
                       "lan_ipv4_using", "lan_ipv4_address", "lan_ipv4_subnetmask",
                       "lan_ipv6_using", "lan_ipv6_address", "lan_ipv6_prefix"];
            
            $('#dialog_pleasewait').dialog('option', 'title', langArray['LTXT_SETUPUSERIPSETUP_RENEW']);
            $z.current.updateTips(langArray['LTXT_NETWORKSERVER_RESTART']);
            
            if(!this.compareToArr(data, arr)) {
              //$("#renew").click();
              $z.current.buttonCmdProc(1);
            } else {
              $z.current.buttonCmdProc(6);
            }

            return data;

        },
        afterLoad : function(result) {
            this.data = encode_to_array(result);
            return result;
        },
        afterSave : function(result) {
          $('.c_sp_btn_okcancel').removeAttr('disabled');
            dvrpoke.start();

            /*var data = encode_to_array(result);

            if( (data != null) && (data.dhcp == 1) && (data.dhcp != this.origData)) {
              //$("#renew").click();
              $('#dialog_pleasewait').dialog('option', 'title', langArray['LTXT_SETUPUSERIPSETUP_RENEW']);
              $z.current.updateTips(langArray['LTXT_NETWORKSERVER_RESTART']);
              $z.current.buttonCmdProc(1);
            }*/
            if ($("#dialog_pleasewait").is(":visible") == true) {
              return procResult2(result, false);
            } else {
              return procResult(result);
            }
        }
    },
    NetDDNS : {
        menu : 'network.ddns',

        beforeLoad : function(data) {
            return data;
        },
        makeupData: function(data) {
          if (INFO_VENDOR ==='S1') {
            data['hostname'] = $('#dvraddress').val();
          } else {
            data['ddnsserver'] = this.data['cfg_' + $('#ddnsserver').val() + '_server'].toLowerCase();
	          // data['hostname'] = $z.current.defaultDvrName;
	          // data['dvraddress'] = $z.current.defaultDvrAddr;
          }

          return data;
        },
        beforeSave : function(data) {
          $('.c_sp_btn_okcancel').attr('disabled', 'disabled');
            if( !this.compareTo(data) ) {
                return false;
            }

            dvrpoke.stop();

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            return data;

        },
        afterLoad : function(result) {
          if ( INFO_VENDOR.indexOf("S1") < 0 ) {
          this.data = encode_to_array(result);
          this.data['ddnsserver'] = this.data['ddnsserver'].toLowerCase();
          for (i = 0 ; i < this.data['cfg_count'] ; i += 1) {
            this.data['cfg_' + i + '_server'] = this.data['cfg_' + i + '_server'].toLowerCase();

            if (this.data['ddnsserver'] == this.data['cfg_' + i + '_server']) {
              // NVR NAME
              this.data['hostname' + i] = this.data['hostname'];

              // USER ID
              if (this.data['cfg_' + i + '_on_id'] == '0') {
                this.data['username' + i] = '';
              } else {
                this.data['username' + i] = this.data['username'];
              }

              // USER PASSWORD
              if (this.data['cfg_' + i + '_on_pwd'] == '0') {
                this.data['passwd' + i] = '';
              } else {
                this.data['passwd' + i] = this.data['passwd'];
              }

              // MAC ADDRESS
              if (this.data['cfg_' + i + '_on_mac'] == '0') {
                this.data['key' + i] = '';
              } else {
                this.data['key' + i] = this.data['key'];
              }
            } else {
              // NVR NAME
              this.data['hostname' + i] = this.data['hostname'];

              // USER ID
              this.data['username' + i] = '';

              // USER PASSWORD
              this.data['passwd' + i] = '';

              // MAC ADDRESS
              if (this.data['cfg_' + i + '_on_mac'] == '0') {
                this.data['key' + i] = '';
              } else {
                this.data['key' + i] = this.data['key'];
              }
            }
          }
          }
	        // $z.current.defaultDvrName = this.data['hostname'];
	        // $z.current.defaultDvrAddr = this.data['dvraddress'];
          return result;
        },
        afterSave : function(result) {
          $('.c_sp_btn_okcancel').removeAttr('disabled');
            dvrpoke.start();
            return procResult(result);
        },
        getDdnsInfo: function(idx) {
          info = {};

          info['hostname_on'] = this.data['cfg_' + idx + '_on_nvrname'];
          info['username_on'] = this.data['cfg_' + idx + '_on_id'];
          info['passwd_on'] = this.data['cfg_' + idx + '_on_pwd'];
          info['key_on'] = this.data['cfg_' + idx + '_on_mac'];

          info['ddnsserver'] = this.data['cfg_' + idx + '_server'];
          info['hostname'] = this.data['hostname' + idx];
          info['username'] = this.data['username' + idx];
          info['passwd'] = this.data['passwd' + idx];
          info['key'] = this.data['key' + idx];

          return info;
        },
        setDdnsInfo: function(idx, info) {
          if ( idx < 0 ) return false;
          this.data['hostname' + idx] = info['hostname'];
          this.data['username' + idx] = info['username'];
          this.data['passwd' + idx] = info['passwd'];

          return true;
        }
    },
    NetEmail: {
        menu : 'network.email',

        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
          $('.c_sp_btn_okcancel').attr('disabled', 'disabled');
            if( !this.compareTo(data) ) {
                return false;
            }

            dvrpoke.stop();

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            return data;

        },
        afterLoad : function(result) {
            this.data = encode_to_array(result);

            return result;
        },
        afterSave : function(result) {
          $('.c_sp_btn_okcancel').removeAttr('disabled');
            dvrpoke.start();
            return procResult(result);
        }
    },
    NetStatus: {
        menu : 'network.status',

        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
          $('.c_sp_btn_okcancel').attr('disabled', 'disabled');
            if( !this.compareTo(data) ) {
                return false;
            }

            dvrpoke.stop();

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            if( $z.debug ) {
                data['debug'] = '1';
            }

            return data;

        },
        afterLoad : function(result) {
            this.data = encode_to_array(result);
            return result;
        },
        afterSave : function(result) {
          $('.c_sp_btn_okcancel').removeAttr('disabled');
            dvrpoke.start();
            return procResult(result);
        }
    },
    NetSecurity: {
      menu : 'network.security',

      beforeLoad : function(data) {
          return data;
      },
      makeupData : function(data) {
        for ( var a in data ) {
          switch (data[a]) {
          case 'NETWORK(A CLASS)':
            data[a] = 8;
            break;
          case 'NETWORK(B CLASS)':
            data[a] = 16;
            break;
          case 'NETWORK(C CLASS)':
            data[a] = 24;
            break;
          case 'IP ADDRESS':
            data[a] = 32;
            break;
          }
        }
        data['filter_rcnt'] = this.data['filter_rcnt'];
        data['debug'] = '1';
        return data;
      },
      beforeSave : function(data) {
        $('.c_sp_btn_okcancel').attr('disabled', 'disabled');
          if( !this.compareTo(data) ) {
              return false;
          }

          dvrpoke.stop();

          data['menu'] = this.menu;
          data['action'] = 'set_setup';

          if( $z.debug ) {
              data['debug'] = '1';
          }

          return data;

      },
      afterLoad : function(result) {
          this.data = encode_to_array(result);

          return result;
      },
      afterSave : function(result) {
        $('.c_sp_btn_okcancel').removeAttr('disabled');
          dvrpoke.start();
          return procResult(result);
      },
      addFilter : function(idx, type, addr) {
        this.data['filter_type' + idx] = type;
        this.data['filter_addr' + idx] = addr;
        this.data['filter_rcnt'] = (parseInt(this.data['filter_rcnt']) + 1).toString();
      },
      editFilter : function (idx, type, addr) {
        this.data['filter_type' + idx] = type;
        this.data['filter_addr' + idx] = addr;
      },
      removeFilter : function (idx) {
        for (var i = parseInt(idx) ; i < 7 ; i += 1) {
          this.data['filter_type' + i] = this.data['filter_type' + (i + 1)];
          this.data['filter_addr' + i] = this.data['filter_addr' + (i + 1)];
        }
        this.data['filter_type7'] = undefined;
        this.data['filter_addr7'] = undefined;
        this.data['filter_rcnt'] = (parseInt(this.data['filter_rcnt']) - 1).toString();
      }
    },
    NetSNMP: {
      menu : 'network.snmp',
      compareTo: function(curArr) {
        for( name in curArr) {
          if (name == 'cmd_gmttime') continue;
          if( this.origData[name] != null && curArr[name] != this.origData[name] ) {
              if( $z.debug )
                  $z.log("compareTo[" + name + "]: curr[" + curArr[name] + "] <> orig[" + this.origData[name] + "]");
              return name;
          }
        }

        if( $z.debug )
            $z.log("compareTo [==]");

        return null;
      },
      beforeLoad : function(data) {
        return data;
      },
      beforeSave : function(data) {
        $('.c_sp_btn_okcancel').attr('disabled', 'disabled');
        var changed_value = this.compareTo(data);

        if(changed_value == 'v3_user_auth_key' || changed_value == 'v3_user_priv_key') {
          if($("#"+changed_value).val().length < 8) {
            alert("minimum length is 8!");
            return false;
          }
          if($("#"+changed_value).val().length > 64) {
            alert("maximum length is 64!");
            return false;
          }
        }

        if( !changed_value ) {


          return false;
        }

        dvrpoke.stop();

        data['menu'] = this.menu;
        data['action'] = 'set_setup';
        /*
        data['v2_communitystring'] = $('#v2_communitystring').text();
        data['v2_trap_conf_address'] = $('#v2_trap_conf_address').text();*/
        data['v3_engineid'] = $('#v3_engineid').text();
        /*data['v3_userid'] = $('#v3_userid').text();
        data['v3_user_auth'] = $('#v3_user_auth').val();
        data['v3_user_auth_key'] = $('#v3_user_auth_key').text();
        data['v3_user_priv'] = $('#v3_user_priv').val();
        data['v3_user_priv_key'] = $('#v3_user_priv_key').text();
        data['v3_receiver_address'] = $('#v3_receiver_address').text();*/
        if( $z.debug ) {
          data['debug'] = '1';
        }

          return data;
        },
        afterLoad : function(result) {
            this.data = encode_to_array(result);
            return result;
        },
        afterSave : function(result) {
            $('.c_sp_btn_okcancel').removeAttr('disabled');
            dvrpoke.start();
            return procResult(result);
        }
    },
    NetRTP : {
      menu : 'network.rtp',
      compareTo: function(curArr) {
        for( name in curArr) {
          if (name == 'cmd_gmttime') continue;
          if( this.origData[name] != null && curArr[name] != this.origData[name] ) {
              if( $z.debug )
                  $z.log("compareTo[" + name + "]: curr[" + curArr[name] + "] <> orig[" + this.origData[name] + "]");
              return name;
          }
        }

        if( $z.debug )
            $z.log("compareTo [==]");

        return null;
      },
      beforeLoad : function(data) {
          return data;
      },
      makeupData : function(data) {
        //index of external loop
        var index_stream = 0;
        var index_channel = 0;
        var tmp_split_string = [];
        var tmp_split_address = [];

        //index of internal loop
        var index_class = 0;
        var index_bit = 0;

        for ( var a in data ) {
          //in case of address_[stream]_[channel]
          if(a.indexOf('address') >= 0) {
            //init temp value.
            index_stream = 0;
            index_channel = 0;
            tmp_split_string = [];
            tmp_split_address = [];

            //convert address data from string... -> vaddr_[stream]_[channel]
            tmp_split_string = a.split('_');
            index_stream = tmp_split_string[1];
            index_channel = tmp_split_string[2];
            data['vaddr_'+index_stream+'_'+index_channel] = 0;

            //split address. -> [A].[B].[C].[D]
            tmp_split_address = data[a].split('.');

            //bitmasking...
            for(var index_class=4;index_class>0;index_class--) {
              for(var index_bit=8;index_bit>0;index_bit--) {
                if((tmp_split_address[4-index_class] & 1<<(index_bit-1)) != 0) {
                  data['vaddr_'+index_stream+'_'+index_channel] |= 1<<((8*index_class)-(8-index_bit+1));
                }
              }
            }
            //bitmasking complete.
          }
        }
        data['filter_rcnt'] = this.data['filter_rcnt'];
        data['debug'] = '1';
        return data;
      },
      beforeSave : function(data) {
        var index_stream = 0;
        var index_ch = 0;
        var index_class = 0;
        var list_port = [];
        var list_multicast = [];
        var tmp_split_address = [];

        var index_multicast = -1;
        var index_vport = -1;
        var index_aport = -1;
        //var index_mport = -1;

        function _revert_port(param_port_name, param_index_stream, param_index_channel) {
          switch(param_port_name) {
            case 'vport':
            case 'aport':
            case 'vaddr':
              //revert current vport/aport
              $.extend($z.current.m.data[param_port_name+'_'+param_index_stream+'_'+param_index_channel], $z.current.m.origData[param_port_name+'_'+param_index_stream+'_'+param_index_channel]);
              $z.current.v.update($z.current.m.data);
            break;

            case 'ttl':
            case 'audio_backch_port':
            case 'rtpeport':
            case 'rtpsport':
            default:
              $.extend($z.current.m.data[param_port_name], $z.current.m.origData[param_port_name]);
              $z.current.v.update($z.current.m.data);
            break;
          }
        }

        for(var a in data) {
          tmp_split_address = [];

          if(a.indexOf('address') >= 0 && data[a].length > 0) {
            tmp_split_address = data[a].split('.');

            if((tmp_split_address[0] & (1<<7)) != 0
              &&(tmp_split_address[0] & (1<<6)) != 0
              &&(tmp_split_address[0] & (1<<5)) != 0
              &&(tmp_split_address[0] & (1<<4)) == 0) {
              //A class must be 1110xxxx.
            } else {
              alert(langArray["LTXT_RTP_OUT_OF_RANGE_MULTICAST"] || "Acceptable Multicast IP Address Range: [224.0.0.0 ~ 239.255.255.255]");
              return false;
            }
          }
        }

        //make list_port.
        for(index_stream=0; index_stream<2; index_stream++) {
          for(index_channel=0; index_channel<INFO_DVRCHANNEL; index_channel++) {
            list_port.push(data['vport_'+index_stream+'_'+index_channel]);
            list_port.push(data['aport_'+index_stream+'_'+index_channel]);
            //list_port.push(data['mport_'+index_stream+'_'+index_channel]);
          }
        }

        //make list_multicast
        for(index_channel=0; index_channel<INFO_DVRCHANNEL; index_channel++) {
          list_multicast.push(data['vaddr_0_'+index_channel]);
          list_multicast.push(data['vaddr_1_'+index_channel]);
        }

        for(index_stream=0; index_stream<2; index_stream++) {
          for(index_channel=0; index_channel<INFO_DVRCHANNEL; index_channel++) {
            //multicast address check
            if(Validator.ip(data['address_'+index_stream+'_'+index_channel]) != Validator.ERR_VALID_OK) {
              alert(langArray['LTXT_ERR_CHECK_IPADDRESS']);

              _revert_port('vaddr', index_stream, index_channel);

              return false;
            }

            //vport range check.
            if(parseInt(data['vport_'+index_stream+'_'+index_channel])< 1025) {
              alert(langArray['LTXT_RTP_PORT_NUMBER_BIGGER_THEN']);

              //revert current vport
              _revert_port('vport', index_stream, index_channel);

              return false;
            }

            if(parseInt(data['vport_'+index_stream+'_'+index_channel])> 65535) {
              alert(langArray['LTXT_RTP_PORT_NUMBER_LESS_THEN']);

              //revert current vport
              _revert_port('vport', index_stream, index_channel);

              return false;
            }

            //aport range check.
            if(parseInt(data['aport_'+index_stream+'_'+index_channel])< 1025) {
              alert(langArray['LTXT_RTP_PORT_NUMBER_BIGGER_THEN']);

              //revert current aport
              _revert_port('aport', index_stream, index_channel);

              return false;
            }

            if(parseInt(data['aport_'+index_stream+'_'+index_channel])> 65535) {
              alert(langArray['LTXT_RTP_PORT_NUMBER_LESS_THEN']);

              //revert current aport
              _revert_port('aport', index_stream, index_channel);

              return false;
            }

            //vport even check.
            if(parseInt(data['vport_'+index_stream+'_'+index_channel])%2 != 0) {
              alert(langArray['LTXT_RTP_PORTNUM_EVEN']);

              //revert current vport
              _revert_port('vport', index_stream, index_channel);

              return false;
            }

            //aport even check.
            if(parseInt(data['aport_'+index_stream+'_'+index_channel])%2 != 0) {
              alert(langArray['LTXT_RTP_PORTNUM_EVEN']);

              //revert current aport
              _revert_port('aport', index_stream, index_channel);

              return false;
            }

            //vport duplicate check.
            index_vport = list_port.indexOf(data['vport_'+index_stream+'_'+index_channel]);
            if(index_vport >= 0) {
              //if index of aport_[stream]_[channel] is exist, then remove it.
              list_port.splice(index_vport, 1);
              index_vport = list_port.indexOf(data['vport_'+index_stream+'_'+index_channel]);
              if(index_vport >= 0) {
                alert(langArray["LTXT_ERR_ALREADY_USE_PORT"]);

                //revert current vport
                _revert_port('vport', index_stream, index_channel);

                return false;
              }
            }

            //aport duplicate check.
            //get index of aport_[stream]_[channel] from port list.
            index_aport = list_port.indexOf(data['aport_'+index_stream+'_'+index_channel]);
            if(index_aport >= 0) {
              //if index of aport_[stream]_[channel] is exist, then remove it.
              list_port.splice(index_aport, 1);
              index_aport = list_port.indexOf(data['aport_'+index_stream+'_'+index_channel]);
              if(index_aport >= 0) {
                alert(langArray["LTXT_ERR_ALREADY_USE_PORT"]);

                //revert current aport
                _revert_port('aport', index_stream, index_channel);

                return false;
              }
            }

            //mport duplicate check.
            //index_mport = list_port.indexOf(data['mport_'+index_stream+'_'+index_channel]);
            //if(index_mport >= 0) {
            //  list_port.slice(index_mport(index_mport, 1));
            //  index_mport = list_port.indexOf(data['mport_'+index_stream+'_'+index_channel]);
            //  if(index_mport >= 0) {
            //    return false;
            //  }
            //}

            //vaddr(converted multicast ip) duplicate check
            //get index of vaddr_[stream]_[channel] from multicast list.
            index_multicast = list_multicast.indexOf(data['vaddr_'+index_stream+'_'+index_channel]);
            if(index_multicast >= 0) {
              list_multicast.splice(index_multicast, 1);
              index_multicast = list_multicast.indexOf(data['vaddr_'+index_stream+'_'+index_channel]);
              if(index_multicast >= 0) {
                alert(langArray["LTXT_RTP_DUPLICATED_MULTICAST"] || "This multicast IP address is already in use.");

                _revert_port('vaddr', index_stream, index_channel);

                return false;
              }
            }

            if(data['audio_backch_port'] == data['rtspport']
              || data['audio_backch_port'] == data['netserviceport']) {
              alert(langArray["LTXT_ERR_ALREADY_USE_PORT"]);

              _revert_port('audio_backch_port');

              return false;
            }

            if(isNaN(parseInt(data['audio_backch_port']))|| parseInt(data['audio_backch_port']) > 65534) {
              alert(langArray['LTXT_RTP_PORT_NUMBER_LESS_THEN']);

              _revert_port('audio_backch_port');

              return false;
            }

            if(isNaN(parseInt(data['audio_backch_port']))|| parseInt(data['audio_backch_port']) < 1025) {
              alert(langArray['LTXT_RTP_PORT_NUMBER_BIGGER_THEN']);

              _revert_port('audio_backch_port');

              return false;
            }

          }
        }

        //rtpeport range check
        if(parseInt(data['rtpeport']) <= parseInt(data['rtpsport'])) {
          alert(langArray['LTXT_RTP_PORTNUM_HIGHER']);

          _revert_port('rtpeport');

          return false;
        }

        if(isNaN(parseInt(data['rtpeport'])) || parseInt(data['rtpeport']) != 0 && parseInt(data['rtpeport']) < 1025) {
          alert(langArray['LTXT_RTP_PORT_NUMBER_BIGGER_THEN']);

          _revert_port('rtpeport');

          return false;
        }

        if(parseInt(data['rtpeport']) != 0 && parseInt(data['rtpeport']) > 65535) {
          alert(langArray['LTXT_RTP_PORT_NUMBER_LESS_THEN']);

          _revert_port('rtpeport');

          return false;
        }

        //rtpsport range check
        if(isNaN(parseInt(data['rtpsport'])) || parseInt(data['rtpsport']) >= parseInt(data['rtpeport'])) {
          alert(langArray['LTXT_RTP_PORTNUM_LOWER']);

          _revert_port('rtpsport');

          return false;
        }

        if(isNaN(parseInt(data['rtpsport'])) || parseInt(data['rtpsport']) != 0 && parseInt(data['rtpsport']) < 1025) {
          alert(langArray['LTXT_RTP_PORT_NUMBER_BIGGER_THEN']);

          _revert_port('rtpsport');

          return false;
        }

        if(parseInt(data['rtpsport']) != 0 && parseInt(data['rtpsport']) > 65534) {
          alert(langArray['LTXT_RTP_PORT_NUMBER_LESS_THEN']);

          _revert_port('rtpsport');

          return false;
        }

        if(isNaN(parseInt(data['ttl'])) || parseInt(data['ttl']) <= 0 || parseInt(data['ttl']) > 255) {
          alert(langArray['LTXT_RTP_TTL_RANGE']);

          _revert_port('ttl');

          return false;
        }

        $('.c_sp_btn_okcancel').attr('disabled', 'disabled');
        if( !this.compareTo(data) ) {
            return false;
        }

        dvrpoke.stop();

        data['menu'] = this.menu;
        data['action'] = 'set_setup';

        if( $z.debug ) {
            data['debug'] = '1';
        }

        return data;

      },
      afterLoad : function(result) {
          this.data = encode_to_array(result);

          return result;
      },
      afterSave : function(result) {
          $('.c_sp_btn_okcancel').removeAttr('disabled');
          dvrpoke.start();
          return procResult(result);
      }
    }
});
