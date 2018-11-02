/**
          {
            "act_all": {
              "type": "select",
              "recv": [
                "act1",
                "act2",
                "act3",
                "act4"
            ]},
            "detect_all": {
              "type": "select",
              "recv": [
                "detect1",
                "detect2",
                "detect3",
                "detect4"
            ]},
          });
 **/

var selectAll = function() {
  var gobj;
  var me;

  function setval(elm, type, obj) {
    if( $(elm).prop("disabled") ) {
      return;
    }

    var v;

    switch( type ) {
      case 'select':
        v = $(obj).val();
        $(elm).val(v);
        break;
      case 'check':
        v = $(obj).prop('checked');
        $(elm).prop('checked', v);
        break;
      case 'multi':
        v = $(obj).parent().find("select").val();
        $(elm).val(v);
        $(elm).multiselect("refresh");
        break;
      default:
        break;
    }
  }

  function _eventHandlerGenerator_obj(param_index, param_all_id, param_obj) {
    return function(event) {

        // if($('#'+this.id).prop('disabled') != undefined || $('#'+this.id).prop('disabled') == true) {
        //   return false;
        // }
     
      if($('#'+this.id).prop('checked') == false) {
        $('#'+param_all_id).prop('checked', false);
      } else {
        var flag_all_checked = true;
        for(var i in param_obj) {
          if(($('#'+param_obj[i]).prop('disabled') == undefined || $('#'+param_obj[i]).prop('disabled') == false)) {
            if($('#'+param_obj[i]).prop('checked') == false && $('#'+param_obj[i]).is(':visible') == true) {
              flag_all_checked = false;
            } 
          }
        }

        if(flag_all_checked == false) {
          $('#'+param_all_id).prop('checked', false);
        } else {
          $('#'+param_all_id).prop('checked', true);
        }
      }
    }
  }

  function _eventHandlerGenerator_arr(param_index, param_all_id, param_obj) {
    return function(event) {

        // if($('#'+this.id).prop('disabled') != undefined || $('#'+this.id).prop('disabled') == true) {
        //   return false;
        // }

      if($('#'+this.id).prop('checked') == false) {
        $('#'+param_all_id).prop('checked', false);
      } else {
        var flag_all_checked = true;
        for(var i=param_obj.start; i<param_obj.number; i++) {
            if(($('#'+param_obj.name+i).prop('disabled') == undefined || $('#'+param_obj.name+i).prop('disabled') == false)) {
            if($('#'+param_obj.name+i).prop('checked') == false && $('#'+param_obj.name+i).is(':visible') == true) {
             flag_all_checked = false;
            } 
          }
        }

        if(flag_all_checked == false) {
          $('#'+param_all_id).prop('checked', false);
        } else {
          $('#'+param_all_id).prop('checked', true);
        }
      }
    }
  }

  function register(obj) {
    if( obj == undefined ||
        typeof obj != "object" ) {
      console && console.error("Argument is not ok!");
      return;
    };

    me = this;
    gobj = obj;

    for( id in obj ) {
      var set = obj[id];

      ////////////////////////////////
      /////// Initialize /////////////
      try {
        switch (set.type) {
          case "multi":
            break;
          case "select":
            $("<option value='NN'>-----</option>")
              .prependTo($("#"+id))
              .prop("selected", true);
            $('#' + id).val('NN');
            break;
          case "check":

            //TODO
            if(INFO_MODEL.indexOf("UTM5HG") >= 0) {
              $("#sys_opopup_all").prop('checked', false);
            }

            if(obj[id].recv.start != undefined) {
              for(var i=obj[id].recv.start; i<parseInt(obj[id].recv.number); i++) {
                $("#"+obj[id].recv.name+''+i).change(_eventHandlerGenerator_arr(i, id, obj[id].recv));
              }
            } else {
              for(var i in obj[id].recv) {
                $("#"+obj[id].recv[i]).change(_eventHandlerGenerator_obj(obj[id].recv[i], id, obj[id].recv));
              }
            }
            break;
          default:
            break;
        }

        ///////////////////////////
        ///// Event Occurs ////////
        switch (set.type) {
          case "multi":
            $("#"+id).parent().delegate("button", "blur", function(e) {
              var eid = $(this).parent().find('select').attr('id');
              var type = gobj[eid].type;
              var recv = gobj[eid].recv;

              if( $.isArray(recv) ) {
                // if receiver is array
                for( r in recv ) {
                  if( !$("#" + recv[r]).prop("disabled") ) {
                    me.setval("#"+recv[r], type, this);
                  }
                }
              } else if( typeof recv == 'object' ) {
                // if receiver is {} object
                for( var i=0, j=parseInt(recv["start"]) ; i < parseInt(recv["number"]) ; i++ , j++ ) {
                  me.setval("#"+recv["name"]+j, type, this);
                }
              }
            });
            break;
          default:
            $(document).delegate("#"+id, "change", function(e) {
              var eid = this.id;
              var type = gobj[eid].type;
              var recv = gobj[eid].recv;

              if( $.isArray(recv) ) {
                // if receiver is array
                for( r in recv ) {
                  if( !$("#" + recv[r]).prop("disabled") && $('#'+recv[r]).is(':visible') == true) {
                    me.setval("#"+recv[r], type, this);
                  }
                }
              } else if( typeof recv == 'object' ) {
                // if receiver is {} object
                for( var i=0, j=parseInt(recv["start"]) ; i < parseInt(recv["number"]) ; i++ , j++ ) {
                  me.setval("#"+recv["name"]+j, type, this);
                }
              }
              for (var i in recv) {
                if(!$("#"+recv[i]).prop("disabled") && $("#"+recv[i]).is(':visible') == true) {
                  $('#' + recv[i]).change();
                }
              }
            });
            break;
        }
      } catch (e) {
        console && console.error(e);
      }
    }
  }

  return {
    register: register,
    setval: setval
  };
}();

