/**
 * @author chcha
 */

$z.v({
    UserManage : {
      usrDraw : 0,
      init: function() {
        for( var i=0 ; i < 8 ; i++ ) {
          $("#trUsr" + i).hide();				
        }

        var _covertChangeTriggerGenerator = function(param_ch) {
          return function(event){
            var flag_all_checked = true;
            var elem = null;

            for(var i=0; i<INFO_DVRCHANNEL; i++) {
              elem = $('input[name=covert'+i+'_new]');
              if(elem.prop('checked') == false) {
                flag_all_checked = false;
              }
            }

            if(flag_all_checked == false) {
              $('input[name=covert_all_new]').prop('checked', false);
            } else {
              $('input[name=covert_all_new]').prop('checked', true);
            }
          }
        }

        var covert_ch = [];

        // covert channel list to add form dialog
        var name = 'covert_all_new';

        var lbl = $('<label>').attr('id', 'lblcovert_new_all')
        .append($('<input type="checkbox">').attr('name', name).attr('name', name))
        .append($('<span>').append(langArray['LTXT_SELECT_ALL']));

        var li = $('<li style="width:100%">').append(lbl);
        var ul_all = $('<ul>').append(li);

        $('#new_covert').append(ul_all);
        //$('#new_covert ul').append(li);
        //$('#new_covert ul').append('<br>');

        var ul_ch = $('<ul>');

        for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
          var name = 'covert' + ch + '_new';

          var lbl = $('<label>').attr('id', 'lblcovert_new'+ch)
          .append($('<input type="checkbox">').attr('name', name).attr('name', name))
          .append($('<span>').attr('id', 'covertch').append(ch+1));

          var li = $('<li style="display:inline-block">').append(lbl);

          //$('#new_covert ul').append(li);

          covert_ch[ch] = ch+1;
          ul_ch.append(li);

          if((ch+1)%4 == 0 && ch != 0) {
            $('#new_covert').append(ul_ch);
            var ul_ch = $('<ul>');
          }
        }

        for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
          $('input[name=covert'+ch+'_new]').change(_covertChangeTriggerGenerator(ch));
        }

        /*for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
          var name = 'covert' + ch + '_new';

          var lbl = $('<label>').attr('id', 'lblcovert_new'+ch)
          .append($('<input type="checkbox">').attr('name', name).attr('name', name))
          .append($('<span id="covertch">').append(ch+1));

          var li = $('<li>').append(lbl);

          $('#new_covert ul').append(li);

          covert_ch[ch] = ch+1;
        }*/

        makeSelectOptions($('select[multiple]'), covert_ch);
        $('input[name="covert_all_new"]').click(function(){
          var isChecked = $('input[name="covert_all_new"]').is(':checked');

          for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
            if(isChecked) $('input[name="covert'+ch+'_new"]').attr("checked", true);
            else $('input[name="covert'+ch+'_new"]').attr("checked", false);
          }
        });

        $('select[multiple]').multiselect({
          horizontal: true,
          autoShow: false,
          noneSelectedText: '',
          selectedList: 16,
          width : '90%'
        });
        $('select[multiple]').multiselect('disable');
        
        if (INFO_VENDOR === 'ALSOK' || INFO_VENDOR === 'TAKENAKA') {
          $("#passwd_new").attr("maxlength", 8);
          $("#confirm_new").attr("maxlength", 8);
        }
      },
      disableOne: function(idx) {
        $('#usrid'+idx).prop('disabled', true);
        $('#grpname'+idx).prop('disabled', true);
        $('#email'+idx).prop('disabled', true);
        $('#noti'+idx).prop('disabled', true);

        $('#covert'+idx).multiselect('disable');

        $('#del'+idx).prop('disabled', true);
        $('#editor'+idx).prop('disabled', true);
      },
      clearOne: function(idx) {
        $('#usrid'+idx).val("");
        $('#grpname'+idx).val("ADMIN");
        $('#email'+idx).val("");
        $('#noti'+idx).prop('checked', false);

        setListByStr( $('#covert'+idx), "");
        $('#covert'+idx).multiselect('refresh');
      },
      setOne: function(idx) {
        var c = $z.current;
        var usrMan = c.m.usrManager;
        var users = usrMan.getUsers();

        $('#usrid'+idx).val(users[idx].getId());
        $('#grpname'+idx).val(users[idx].getGrp());
        $('#email'+idx).val(users[idx].getEmail());
        $('#noti'+idx).prop('checked', users[idx].getNoti());
        $('#covert'+idx).val("");
        setListByStr( $('#covert'+idx), users[idx].getCovert());
        $('#covert'+idx).multiselect('refresh');
      },
      redraw: function() {
        var c = $z.current;
        var usrMan = c.m.usrManager;
        var users = usrMan.getUsers();
        var usrCnt = usrMan.getUsrCnt();

        if( usrCnt > this.usrDraw ) {
          // usr added
          for( var i=0/*this.usrDraw*/ ; i < usrCnt; i++ ) {
            this.setOne(i);
            $('#covert'+i).next().show();
            $('#trUsr'+i).show();
          }
        } else {
          // usr removed
          for( var i=0 ; i < usrMan.maxusr; i++ ) {
            if( i >= usrCnt ) {
              this.clearOne(i);
              $('#trUsr'+i).hide();
            } else {
              this.setOne(i);
            }
          }
        }

        this.usrDraw = usrMan.getUsrCnt();

        $('#usrcnt0').val(usrMan.getUsrCnt());

      },
      update: function(array) {
        var c = $z.current;
        var usrMan = c.m.usrManager;

        this.redraw();
      }
    },
    UserAuth : {
      init: function() {
        if (INFO_AUDIO_SUPPORT == '1') {
          $("#audioman").removeAttr('disabled');
          $("#audiousr").removeAttr('disabled');
        } else {
          $("#audioman").attr('disabled', 'disabled');
          $("#audiousr").attr('disabled', 'disabled');
        }
      },
      update: function(array) {
        $z.log('array = ' + array);

        var chks = $z.current.chks;

        for( i in chks ) {
          var idx = chks[i];

          $('#' + idx).get(0).checked = array[idx] == '1' ? true : false;
        }
      }
    }
});
