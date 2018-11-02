/**
 * @author chcha
 */

var resol = {
  'B' : '352x240',
  'C' : '704x240',
  'D' : '704x480',
  'E' : '704x480p',
  'F' : '352x288',
  'G' : '704x288',
  'H' : '704x576',
  'I' : '704x576p',
  'J' : '640x480',
  'K' : '720x480',
  'L' : '720x576',
  'M' : '800x600',
  'N' : '1024x768',
  'O' : '1280x1024',
  'P' : '1600x1200',
  'Q' : '1280x720',
  'R' : '1920x1080',
  'S' : '640x352',
  'T' : '640x360',
  'U' : '1280x960',
  // 'U' : '640x360I',
  // 'V' : '1280x720I',
  // 'W' : '1920x1280I',
  // 'X' : '640x400',
  // 'Y' : '800x450',
  // 'Z' : '1440x900',
  'a' : '960x480',
  'b' : '960x576',
  'c' : '320x180',
  'u' : '1920x1536',
  't' : '1920x1440',
  's' : '2592x1520',
  'r' : '2304x1296',
  'q' : '2048x1536',
  'p' : '2560x1440',
  'o' : '2688x1520',
  'n' : '2560x1600',
  'm' : '2560x1920',
  'l' : '2592x1920',
  'k' : '2592x1944',
  'j' : '2992x1680',
  'i' : '2880x1800',
  'h' : '3200x1800',
  'g' : '2880x2160',
  'f' : '3072x2048',
  'e' : '3200x2400',
  'd' : '3840x2160',
  's' : '2592x1520',
  't' : '1920x1440',
  'u' : '1920x1536',
  'v' : '1344x1520',
  'w' : '1296x1944',
  'x' : '1280x1440',
  'y' : '1024x1536',
  'z' : '1280x960'
};

/*
* fpsTable ( Bit -> Symbol )
* fpsTable2( Bit <- Symbol )
* fps_nt| fps_pal ( Symbol-> Real Numeric)
*
* FPS(NTSC) :
*  0      : G : (0fps)
*  1 << 0 : F : (1fps)
*  1 << 1 : E : (2)
*  1 << 2 : D : (4|3)
*  1 << 3 : C : (7|6)
*  1 << 4 : B : (15|12)
*  1 << 5 : A : (30fps|25fps)
*/
var fpsTable = {
0:"G",
1:"F",
2:"E",
4:"D",
8:"C",
16:"B",
32:"A"
};

var fpsTable2 = {
"G":0,
"F":1,
"E":2,
"D":4,
"C":8,
"B":16,
"A":32
};

/*
* fpsCalc_nt
* fpsCalc_pal
* Table for FPS Convert
*/
var fpsCalc_nt = {
  'A': '30.0',
  'B': '15.0',
  'C': '7.5',
  'D': '3.75',
  'E': '1.87',
  'F': '0.938',
  'G': '0'
};

var fpsCalc_pal = {
  'A': '25.0',
  'B': '12.5',
  'C': '6.25',
  'D': '3.125',
  'E': '1.563',
  'F': '0.781',
  'G': '0'
};

var fps_nt = {
  'A': '30',
  'B': '15',
  'C': '7',
  'D': '3',
  'E': '2',
  'F': '1',
  'G': '0'
};

var fps_pal = {
  'A': '25',
  'B': '12',
  'C': '6',
  'D': '3',
  'E': '2',
  'F': '1',
  'G': '0'
};

function fillWindowForModal(id) {
//  var height = $(document).height();
//  var width = $(window).width();
//
//  if ($(document.getElementById("dialog_background")).css("display") != 'none')
//    return;
//
//  $('#dialog_background').css({'width':width, 'height':height});
//  $('#dialog_background').fadeTo("slow",0.3);
  var offset = $("#focus_position").offset();
  $('#' + id).css({'left': offset.left, 'top':offset.top});
  $('#' + id).fadeTo("slow",0.95);
}

function hideModal() {
  //$('#dialog_background').hide();
  $('#dialog_wait').hide();
}

//�국처리 (activex �달- dmva)
var languageArray;
function define(str) {
  languageArray = str;
  var axLangJson = sendMultiLanguageString();
  var activex = document.getElementById("itxview");
  var sendLang = activex.SetJsonLanguage(JSON.stringify(axLangJson, null, 2));

  //console.log(JSON.stringify(axLangJson));
  //console.log(sendLang);
}

function sendMultiLanguageString(){
  // console.log(languageArray);

  return languageArray;
}

$z.v({
  CamTitle : {
    init: function() {
      $('input#iAllTextTitle').change(function(event){
        $('input[name^="cam_title"]').val($(this).val());
      });
     
      $('input:text').keyup(function(event) {
        if(this.id == 'iAllTextTitle'){
          var data = $('#iAllTextTitle').val();
          data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣\~\=\{\}\\\"\<\>\?\!\$\%\^\&\*\+\|\:\ ]/g,'');
          $('#iAllTextTitle').val(data);
        } else {
          for(var i = 0; i < parseInt(INFO_DVRCHANNEL); i++) {
            var data = $('#cam_title'+i).val();
            data = data.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣\~\=\{\}\\\"\<\>\?\!\$\%\^\&\*\+\|\:\ ]/g,'');
            $('#cam_title'+i).val(data);
          }
        }
      });
    },
    update: function(array) {
      $z.log('array = ' + array);

      for( var i=0 ; i < INFO_DVRCHANNEL ; i++ ) {
        $('#cam_title'+i).val(array['cam_title'+i]);
      }

      $("input[id^='iAllText']").val('');

      $('#cam_usenum').val(array['cam_usenum']);
    }
  },
  CamImage : {
    init: function() {
      $("input:text").keypress(function(event) {
        if( !isValidKeyNumber(event.which) ) {
          event.preventDefault();
        }
      }).keyup(function(event){
        if(!isNaN(parseInt(this.value))
          && event.which != 37 && event.which != 39 ){ //left arrow & right arrow
          this.value = parseInt(this.value);
        }

        if(this.name.indexOf('sharpness') >= 0) {
          if(parseInt(this.value) < 0) {
            alert(errFieldValLess+" [0~8]");
            this.value = 0;
          }
          if(parseInt(this.value) > 8) {
            alert(errFieldValOver+" [0~8]");
            this.value = 8;
          } 
        } else if(this.name.indexOf('brightness') >= 0
               || this.name.indexOf('contrast') >= 0
               || this.name.indexOf('tint') >= 0
               || this.name.indexOf('color') >= 0){
          if(parseInt(this.value) < 0) {
            alert(errFieldValLess+" [0~100]");
            this.value = 0;
          }
          if(parseInt(this.value) > 100) {
            alert(errFieldValOver+" [0~100]");
            this.value = 100;
          }
        }
      });

      var _is_not_support_eq = function() {
        var enum_support_eq_model = ['ATM4G', 'ANF4G', 'UTM4G'];

        for(var i=0; i<enum_support_eq_model.length; i++) {
          if (INFO_MODEL.indexOf(enum_support_eq_model[i]) >= 0) {
            return false;
          }
        }

        return true;
      }

      if(_is_not_support_eq()) {
        $('#eqtitle').hide();
        for(var i=0; i<parseInt(INFO_DVRCHANNEL); i++) {
          $('#eqcell'+i).hide();
        }
      }

      if(INFO_MODEL.indexOf('ATM5G') >= 0
        || INFO_MODEL.indexOf('ANF5G') >= 0
        || INFO_MODEL.indexOf('ANF5HG') >= 0
        || ((INFO_MODEL.indexOf('UTM5HG') >= 0 || INFO_MODEL.indexOf('UTM5G') >= 0 || INFO_MODEL.indexOf("UTM5X") > 0) && INFO_DVRCHANNEL <= 8) 
        || INFO_MODEL.indexOf('UTM5HGA') >= 0) {
      }
      else { //is not support noise.
        $('#noise').hide();
        for(var i=0; i<parseInt(INFO_DVRCHANNEL); i++) {
          $('#noise'+i).hide();
          $('#noisecell'+i).hide();
        }
      }

      $("#image_tabs").tabs({
        select: function(event, ui) {
          switch(ui.index) {
            case 0: //image setup tab
            break;
            case 1: //steam setup tab
            break;
          }
        }
       })

    },
    update: function(array) {
      $z.log('array = ' + array);

      
      //$("input[id^='iAllText']").val('');
      //$("input[id^='iAllText']").removeAttr('disabled');
      var tmp_bitfield = null;
      var tmp_resol_support = null;
      var tmp_resol_current = null;
      var tmp_codec_support = 0;
      var tmp_codec_current = 0;
      var tmp_bitctrl_support = 0;
      var tmp_bitctrl_current = 0;

      var codec_option_list = ['', 'H.264', 'H.265'];
      var codec_value_list = ['', 'H.264', 'H.265'];
      var bitctrl_value_list = ['CBR', 'VBR', 'MBR', 'IDNR'];
      var bitctrl_option_list = ['CBR', 'VBR', 'MBR', 'VBR+'];

      langArray['LTXT_CBR'] != undefined ?
        bitctrl_option_list[0] = langArray['LTXT_CBR'] : bitctrl_option_list[0] = 'CBR';
      langArray['LTXT_VBR'] != undefined ?
        bitctrl_option_list[1] = langArray['LTXT_VBR'] : bitctrl_option_list[1] = 'VBR';
      langArray['LTXT_IDNR'] != undefined ?
        bitctrl_option_list[3] = langArray['LTXT_IDNR'] : bitctrl_option_list[3] = 'IDNR';

      var enum_image = {
        "BRIGHTNESS": 0,
        "CONTRAST":   1,
        "SHARPNESS":  2,
        "COLOR":      3,
        "TINT":       20
      }

      for( var i=0 ; i < INFO_DVRCHANNEL ; i++ ) {
        // if($z.debug) {
        //   console.log("low(%d) high(%d)", array['supported_image'+i], array['supported_image_high'+i]);
        // }

        $('#brightness'+i).val(array['brightness'+i]);
        $('#contrast'+i).val(array['contrast'+i]);
        $('#tint'+i).val(array['tint'+i]);
        $('#color'+i).val(array['color'+i]);
        $('#sharpness'+i).val(array['sharpness'+i]);
        $('#noise'+i).val(array['noise'+i]);
        $('#encoder_cnt'+i).val(array['encoder_cnt'+i]);

        if(array['encoder_cnt'+i] > 0) {
          for(var encoder_cnt=0; encoder_cnt<array['encoder_cnt'+i]; encoder_cnt++) {
            tmp_resol_support = array["res_support"+i+'_'+encoder_cnt];
            tmp_resol_current = array["res_default"+i+'_'+encoder_cnt];
            tmp_codec_support = array["vcodec_support"+i+'_'+encoder_cnt];
            tmp_codec_current = array["vcodec_default"+i+'_'+encoder_cnt];
            tmp_bitctrl_support = array["bitctrl_support"+i+'_'+encoder_cnt];
            tmp_bitctrl_current = array["bitctrl_default"+i+'_'+encoder_cnt];

            $('#bitctrl_default'+i+'_'+encoder_cnt).empty();
            for(var j=0; j<bitctrl_option_list.length; j++) {
              if((tmp_bitctrl_support & (1<<j)) != 0) {
                $("#bitctrl_default"+i+'_'+encoder_cnt).prepend($("<option>").val(bitctrl_value_list[j]).html(bitctrl_option_list[j]));
              }

              //update value
              if(!isNaN(parseInt(tmp_bitctrl_current))) {
                if((tmp_bitctrl_current & (1<<j)) != 0) {
                  $("#bitctrl_default"+i+'_'+encoder_cnt).val(bitctrl_value_list[j]);
                  $("#bitctrl_default"+i+'_'+encoder_cnt).change();
                  array['bitctrl_default'+i+'_'+encoder_cnt] = bitctrl_value_list[j];
                }
              } else {
                $("#bitctrl_default"+i+'_'+encoder_cnt).val(tmp_bitctrl_current);
              }
            }

            $('#vcodec_default'+i+'_'+encoder_cnt).empty();
            for(var j=0; j<codec_option_list.length; j++) {
              tmp_codec_support == 0 ? 
              $("#vcodec_default"+i+'_'+encoder_cnt).attr('disabled', true) : $("#vcodec_default"+i+'_'+encoder_cnt).removeAttr('disabled');

              if((tmp_codec_support & (1<<j)) != 0) {
                $("#vcodec_default"+i+'_'+encoder_cnt).prepend($("<option>").val(codec_value_list[j]).html(codec_option_list[j]));
              }                

              //update value
              if(!isNaN(parseInt(tmp_codec_current))) {
                if((tmp_codec_current & (1<<j)) != 0) {
                  $("#vcodec_default"+i+'_'+encoder_cnt).val(codec_value_list[j]);
                  $("#vcodec_default"+i+'_'+encoder_cnt).change();
                  array['vcodec_default'+i+'_'+encoder_cnt] = codec_value_list[j];
                }
              } else {
                $("#vcodec_default"+i+'_'+encoder_cnt).val(tmp_codec_current);
              }
            }

            if(tmp_resol_support != null && tmp_resol_support.length > 0) {
              $("#res_default"+i+'_'+encoder_cnt).prop("disabled", false);
              $("#res_default"+i+'_'+encoder_cnt).empty();
              //append option
              for(var j=0; j<tmp_resol_support.length; j++) {
                $("#res_default"+i+'_'+encoder_cnt).append($("<option>").val(tmp_resol_support[j]).html(resol[tmp_resol_support[j]]));
              }

              //update value
              $("#res_default"+i+'_'+encoder_cnt).val(array["res_default"+i+'_'+encoder_cnt]);
            } else {
              $("#res_default"+i+'_'+encoder_cnt).prop("disabled", true);
            }

            $('#res_default'+i+'_'+encoder_cnt).val(array['res_default'+i+'_'+encoder_cnt]);
            $('#fps_max_default'+i+'_'+encoder_cnt).val(array['fps_max_default'+i+'_'+encoder_cnt]);
            $('#bitctrl_default'+i+'_'+encoder_cnt).val(array['bitctrl_default'+i+'_'+encoder_cnt]);
            $('#br_max_default'+i+'_'+encoder_cnt).val(array['br_max_default'+i+'_'+encoder_cnt]);
            $('#br_min_default'+i+'_'+encoder_cnt).val(array['br_min_default'+i+'_'+encoder_cnt]);
            $('#vcodec_default'+i+'_'+encoder_cnt).val(array['vcodec_default'+i+'_'+encoder_cnt]);
          }
        } else {
          var max_encoder_cnt=2;
          for(var encoder_cnt=0; encoder_cnt<max_encoder_cnt; encoder_cnt++) {
            $('#res_default'+i+'_'+encoder_cnt).val('Q');
            $('#fps_max_default'+i+'_'+encoder_cnt).val(30);
            $('#bitctrl_default'+i+'_'+encoder_cnt).val('VBR');
            $('#br_max_default'+i+'_'+encoder_cnt).val(30);
            $('#br_min_default'+i+'_'+encoder_cnt).val(1);
          }
        }

        if(INFO_MODEL.indexOf("IPX") >= 0) {
          if (!(array['support'+i] & 1<<1))
          $('#brightness'+i).attr('disabled', 'disabled');
          if (!(array['support'+i] & 1<<2))
          $('#contrast'+i).attr('disabled', 'disabled');
          if (!(array['support'+i] & 1<<4))
          $('#tint'+i).attr('disabled', 'disabled');
          if (!(array['support'+i] & 1<<3))
          $('#color'+i).attr('disabled', 'disabled');
        } else if((INFO_MODEL.indexOf("5G") >= 0 || INFO_MODEL.indexOf("5X") >= 0 || INFO_MODEL.indexOf("5HG") >= 0/*(include 6G/5HG A type)*/)
          && typeof INFO_CAMERA_INSTALL_MODE != undefined
          && parseInt(INFO_CAMERA_INSTALL_MODE) == 1
          && parseInt(array['analogtype'+i]) == 8) {
            tmp_bitfield = new bitFieldArray();
            tmp_bitfield.data[0] = array['supported_image'+i];
            tmp_bitfield.data[1] = array['supported_image_high'+i];

            if(tmp_bitfield.isChecked(enum_image["SHARPNESS"]) == false) {
              // if($z.debug) {
              //   console.log("sharpness(%d) is disabled", (i+1))
              // }
              $('#sharpness'+i).attr('disabled', 'disabled');
            }

            if(tmp_bitfield.isChecked(enum_image["BRIGHTNESS"]) == false) {
              // if($z.debug) {
              //   console.log("brightness(%d) is disabled", (i+1))
              // }
              $('#brightness'+i).attr('disabled', 'disabled');
            }

            if(tmp_bitfield.isChecked(enum_image["CONTRAST"]) == false) {
              // if($z.debug) {
              //   console.log("contrast(%d) is disabled", (i+1))
              // }
              $('#contrast'+i).attr('disabled', 'disabled');
            }

            if(tmp_bitfield.isChecked(enum_image["COLOR"]) == false) {
              // if($z.debug) {
              //   console.log("color(%d) is disabled", (i+1))
              // }
              $('#color'+i).attr('disabled', 'disabled');
            }

            if(tmp_bitfield.isChecked(enum_image["TINT"]) == false) {
              // if($z.debug) {
              //   console.log("tint(%d) is disabled", (i+1))
              // }
              $('#tint'+i).attr('disabled', 'disabled');
            }

            $('#noise'+i).attr("disabled", true);  //NO CONDITION...
        }

        //if(INFO_SYSTEM_TYPE == '10') {
        //  $('#brightness'+i).attr('disabled', 'disabled');
        //  $('#contrast'+i).attr('disabled', 'disabled');
        //  $('#tint'+i).attr('disabled', 'disabled');
        //  $('#color'+i).attr('disabled', 'disabled');
        //}
        /*
         * if (parseInt(_flag))
			this.my.removeAttr('disabled');
		else
			this.my.attr('disabled', 'disabled');
         * "IPCAM_IMAGE_BRIGHTNESS" : 1<<1,
		"IPCAM_IMAGE_CONTRAST" : 1<<2,
		"IPCAM_IMAGE_COLOR" : 1<<3,
    "IPCAM_IMAGE_TINT" : 1<<4,*/
    
        if ($('#stream_ch').children().length < INFO_DVRCHANNEL) {
          if(array['model'+i] === "Not connected") {
            $('#stream_ch').append($('<option>').val(i).html('CAM'+(i+1)+' '+langArray['LTXT_SETUPCAMCAMSETUP_NOT_CONNECTED']));
          } else {
            $('#stream_ch').append($('<option>').val(i).html('CAM'+(i+1)+' '+array['model'+i]));
          }
        }

        if((array['cv_admin'+i] == '1' && array['login_group'] == 'ADMIN')
          || (array['cv_manager'+i] == '1' && array['login_group'] == 'MANAGER')
          || (array['cv_user'+i] == '1' && array['login_group'] == 'USER')
          || (array['act_novideo'].charAt(i) == '1'))
        {
          $('#ch'+(i+1)).text('CAM'+(i+1));
        }

        $('#stream_ch').change(function(event){
          var current_ch = this.value;
          var default_encoder_ui_cnt = 2;

          for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
            for(var encoder_cnt=0; encoder_cnt<default_encoder_ui_cnt; encoder_cnt++) {
              if(ch==current_ch) {
                $("#vcodec_default"+ch+"_"+encoder_cnt).show();
                $("#res_default"+ch+"_"+encoder_cnt).show();
                $("#fps_max_default"+ch+"_"+encoder_cnt).show();
                $("#bitctrl_default"+ch+"_"+encoder_cnt).show();
                $("#br_max_default"+ch+"_"+encoder_cnt).show();
                $("#br_min_default"+ch+"_"+encoder_cnt).show();

                if(array["encoder_cnt"+ch] == 0) {
                  $("#vcodec_default"+ch+"_"+encoder_cnt).attr("disabled", true);
                  $("#res_default"+ch+"_"+encoder_cnt).attr("disabled", true);
                  $("#fps_max_default"+ch+"_"+encoder_cnt).attr("disabled", true);
                  $("#bitctrl_default"+ch+"_"+encoder_cnt).attr("disabled", true);
                  $("#br_max_default"+ch+"_"+encoder_cnt).attr("disabled", true);
                  $("#br_min_default"+ch+"_"+encoder_cnt).attr("disabled", true);
                } else {
                  $("#vcodec_default"+ch+"_"+encoder_cnt).is(':disabled') == true ? {} : $("#vcodec_default"+ch+"_"+encoder_cnt).removeAttr("disabled");
                  $("#res_default"+ch+"_"+encoder_cnt).removeAttr("disabled");
                  $("#fps_max_default"+ch+"_"+encoder_cnt).removeAttr("disabled");
                  $("#bitctrl_default"+ch+"_"+encoder_cnt).removeAttr("disabled");
                  $("#br_max_default"+ch+"_"+encoder_cnt).removeAttr("disabled");
                  $("#br_min_default"+ch+"_"+encoder_cnt).removeAttr("disabled");
                }

                if(array["bitctrl_support"+ch+'_'+encoder_cnt] == 0 ||
                    array["bitctrl_support"+ch+'_'+encoder_cnt] == undefined) {
                  $("#bitctrl_default"+ch+"_"+encoder_cnt).attr("disabled", true);
                }
                else {
                  $("#bitctrl_default"+ch+"_"+encoder_cnt).removeAttr("disabled");
                }                  
              } else {
                $("#vcodec_default"+ch+"_"+encoder_cnt).hide();
                $("#res_default"+ch+"_"+encoder_cnt).hide();
                $("#fps_max_default"+ch+"_"+encoder_cnt).hide();
                $("#bitctrl_default"+ch+"_"+encoder_cnt).hide();
                $("#br_max_default"+ch+"_"+encoder_cnt).hide();
                $("#br_min_default"+ch+"_"+encoder_cnt).hide();
              }

              if(INFO_MODEL.indexOf("UTM5HGA") < 0) {
                $("#vcodec_default"+ch+"_"+encoder_cnt).hide();
                $("#lang_codec").hide();
              }
            }
          }
        })

        $('#stream_ch').change();

        if(INFO_MODEL.indexOf("ATM4G") >= 0 || INFO_MODEL.indexOf("ANF4G") >= 0 || INFO_MODEL.indexOf("UTM4G") >= 0) {
          if(array['analogtype'+i] == 2) {
            $('#eq'+i).val(array['eq'+i]);
            $('#eq'+i).attr("disabled", false);
          }
          else {
            $('#eq'+i).val(array['eq'+i]);
            $('#eq'+i).attr("disabled", true);
          }

        }
        //else if(INFO_MODEL.indexOf("ATM5G") >= 0 || INFO_MODEL.indexOf("ANF5G") >= 0 || INFO_MODEL.indexOf("UTM5G") >= 0 || INFO_MODEL.indexOf("UTM5X") > 0 ) {
        else if(INFO_MODEL.indexOf("5G") > 0 || INFO_MODEL.indexOf("5X") > 0) {
          $('#colortitle').attr('class', 'c_sp_tb_cam_image_head2');
          $('#noisecell'+i).attr('class', 'c_sp_td_cam_image3');
          $('#eqtitle').hide();
          $('#eqcell'+i).hide();
        }
        else {
            $('#noise').attr('class', 'c_sp_tb_cam_image_head2');
            $('#colorcell'+i).attr('class', 'c_sp_td_cam_image3');
            $('#eqtitle').hide();
            $('#eqcell'+i).hide();
        }

        //disabled by resolution
        if(INFO_MODEL == "_UTM5HGA_0824D" || INFO_MODEL == "_UTM5HGA_1648D" || INFO_MODEL.indexOf('ANF5HG') >= 0) {
          if(parseInt(array['analogtype'+i]) != 8) {
            array['noiseon'+i] == 0 ? $('#noise'+i).attr('disabled', true) : $('#noise'+i).removeAttr('disabled');
          }
        }
      }
    }
  },
  CamImageAdvanced : {
    // TODO: fix all
    cameraImageAdvancedInfo: null,
    c: {},

    init: function() {
      this.cameraImageAdvancedInfo = new CameraImageAdvancedInfo(),
      $z.log('in View, camImageAdvanced init called.');
      c = $z.current;
      this.cameraImageAdvancedInfo.init(this);

    },
    update: function(_array) {
      $z.log('in View, camImageAdvanced update called.');
      this.cameraImageAdvancedInfo.update(_array);
    },
    updateAdvancedSetupInfo: function(_array) {
      // TODO: from control. setup info upload.
      $z.log('in View, UploadAdvancedSetupInfo update called.');
      this.cameraImageAdvancedInfo.ipcamInfoUpdate(_array);
    },
    updateIpcamEnable: function(_array) {
      $z.log('in View, updateIpcamEnable update called.');
      this.cameraImageAdvancedInfo.ipcamEnableUpdate(_array);
    },
    getCurrentChannel: function () {
      return this.cameraImageAdvancedInfo.getChannel();
    },
    refreshHandler: function(_ch, _flag) {
      c.refreshHandler(_ch, _flag);
    },
    sendButtonCmd: function(_ch, _btnCmd) {
      c.sendButtonCmd(_ch, _btnCmd, '1');
    },
    updateSnapshot: function(url) {
      $("#mimgid").attr("src", url);
    }
  },
  CamCompatibility : {
    c: {},
    me: null,
    ch: null,
    select_ch: null,
    model: null,
    onvif_support: null,
    supported_image: null,
    supported_exposure: null,
    imageObject: null,
    exposureObject: null,
    exposureObject_high: null,
    focusObject: null,
    interval: null,
    btnCmd: false,
    copy_setting: null,
    camera_onoff: null,
    is_on: null,
    saveflag:0,
    saveArray:{},
    baseShutterSpeedTable: null,
    present_base_shutter: null,
    init: function() {
      $('#c_sp_div_menubar_sub').show();
      $('#c_sp_div_contents').show();
      c = $z.current;
      me = this;

      if(INFO_CAMERA_INSTALL_MODE == 1)
        $('#camera_onoff').remove();

      this.ch = new DropdownBox("ch");
      this.select_ch = 0;
      for (var i = 0; i < INFO_DVRCHANNEL; i++)
      {
        this.ch.addItem(i, "CH" + (i + 1) + " - " + INFO_CAMTITLE[i]);
      }
      this.ch.setChangeCallback(this.callbackCh);
      this.model = $("#model");

      this.copy_setting = new Button("copy_setting");
      this.copy_setting.setClickCallback(this.callbackCopySettingButton);

      if( INFO_MODEL.indexOf("IPX") >= 0) {
        this.camera_onoff = new Button("camera_onoff");
        this.camera_onoff.setClickCallback(this.callbackConnectSettingButton);

        var action = 'action=get_cam&menu=poe.control';
        $.ajax({
           type: "POST",
           url: "/cgi-bin/webra_fcgi.fcgi",
           async: false,
           data: action,
           success: function(response) {
             var p = encode_to_array(response);

             if((p['poe_on_off'] & (1<<$('#ch').val())) != 0) {
               $('#camera_onoff').attr('value',langArray["LTXT_SETUPCAMCAMSETUP_CAMERA_DISCONNECT"]);
               $('#poe_msg').text(langArray["LTXT_SETUPCAMCAMSETUP_CONNECT_MESSAGE"]);
             }
             else {
               $('#camera_onoff').attr('value',langArray["LTXT_SETUPCAMCAMSETUP_CAMERA_CONNECT"]);
               $('#poe_msg').text(langArray["LTXT_SETUPCAMCAMSETUP_DISCONNECT_MESSAGE"]);
             }
             return true;
           },
           fail: function(response) {
             return false;
           }
        });

      }
      else {
        $('#camera_onoff').hide();
      }

      $("#dialog_copy_setting").dialog({
        autoOpen : false,
        modal : true,
        resizable :false,
        draggable: false,
        width:350,
        show: "drop",
        hide: "drop",
        title: langArray["LTXT_SETUPCAMCAMSETUP_COPY_SETTINGS_TO"],
        create: function (event,ui) {
          var table = $('<table id="popup_copy_setting">');

          var titleLow = $("<tr>");
          table.append(titleLow);
          titleLow.append("<th><input type='checkbox' id='cpCheckBoxAll'>");
          titleLow.append("<th class='popup_cam_title'>" + langArray["LTXT_SETUP_CH"] + "</th>");
          titleLow.append("<th>" + langArray["LTXT_MODEL"] + "</th>");
          titleLow.append("<th>" + langArray["LTXT_FW_VERSION"] + "</th>");


          for (var i = 0 ; i < INFO_DVRCHANNEL; i++) {
            var tr = $("<tr>");
            tr.append("<td><input type='checkbox' id='cpCheckBox" + i + "'>");
            tr.append("<td>CH" + (i+1) + " - "+ INFO_CAMTITLE[i]);
            tr.append("<td id='cpModel"+ i +"'>" + langArray["LTXT_SETUPCAMCAMSETUP_NOT_CONNECTED"] + "</td>");
            tr.append("<td id='cpSwver"+ i +"'>N/A" + "</td>");
            table.append(tr);
          }
          $(this).append(table);

          $(this).append("<div id='copy_to_progress'>");

          $("#cpCheckBoxAll").change(function() { // ALL
            $("#copy_to_progress").text("");
            for (var i = 0; i < INFO_DVRCHANNEL; i++) {
              if (!$("#cpCheckBox"+i).prop("disabled")) {
                if( $(this).prop('checked') ) {
                  $("#cpCheckBox"+i).prop('checked', true);
                } else {
                  $("#cpCheckBox"+i).prop('checked', false);
                }
              }
            }
          });

          for (var i = 0; i < INFO_DVRCHANNEL; i++) {
            $("#cpCheckBox"+i).change(function() {
              $("#copy_to_progress").text("");
            });
          }

        },
        open: function (event, ui) {
          axHandler.hide(true);
          $("#cpCheckBoxAll").prop('checked',false);
          $("#copy_to_progress").text("");
          for (var i = 0; i < INFO_DVRCHANNEL; i++) {
            $("#cpCheckBox"+i).prop('disabled',"disabled");
            $("#cpCheckBox"+i).prop('checked',false);
          }
          c.getCamModelInfo(me.select_ch);
        },
        close: function (event, ui) {
          var activex = document.getElementById("itxview");
          if (activex) {
            if ($(".cam_image_setup #tab").tabs("option","selected") == 0) {
              axHandler.setForce(false);
              axHandler.appendTo("#image_preview");
              c.connectActivex(c.activex_i, c.activex_p);
            } else if ($(".cam_image_setup #tab").tabs("option","selected") == 1) {
              axHandler.setForce(false);
              axHandler.appendTo("#exposure_preview");
              c.connectActivex(c.activex_i, c.activex_p);
            }
          }
        },
        buttons: [{
          text : langArray["LTXT_SETUP_APPLY"],
          click : function() {
            var a = new Array()
            for (var i = 0; i < INFO_DVRCHANNEL; i++) {
              if ($("#cpCheckBox"+i).prop('checked')) {
                a.push(i);
              }
            }
            if (a.length == 0)
              return;
            me.sendCopyTo(a);
          }
        }, {
          text : langArray["LTXT_CANCEL"],
          click : function() {
            $(this).dialog('close');
          }
        }]
      });

      $("#dialog_camera_onoff").dialog({
        autoOpen: false,
        modal: true,
        show: 'drop',
        hide: 'drop',
        title: "Camera Connect Setting",
        width: '500px',
        resizable: false,
        closeOnEscape: false,
        open: function (event, ui) {
          $(".ui-dialog-titlebar-close").hide();
          axHandler.hide(true);
          this.state = 'pass';
          if($('#camera_onoff').attr('value') == langArray["LTXT_SETUPCAMCAMSETUP_CAMERA_DISCONNECT"])
            $('#poe_msg').text(langArray["LTXT_SETUPCAMCAMSETUP_DISCONNECT_MESSAGE"]);
          else
            $('#poe_msg').text(langArray["LTXT_SETUPCAMCAMSETUP_CONNECT_MESSAGE"]);
        },
        close: function (event, ui) {
          var activex = document.getElementById("itxview");
          if (activex) {
            if ($(".cam_image_setup #tab").tabs("option","selected") == 0) {
              axHandler.setForce(false);
              axHandler.appendTo("#image_preview");
              c.connectActivex(c.activex_i, c.activex_p);
            } else if ($(".cam_image_setup #tab").tabs("option","selected") == 1) {
              axHandler.setForce(false);
              axHandler.appendTo("#exposure_preview");
              c.connectActivex(c.activex_i, c.activex_p);
            }
          }
          this.state = 'pass';
        },
        buttons: [{
          text: langArray["LTXT_OK"],
          click : function() {
            switch (this.state) {
              case 'pass':
                if($('#camera_onoff').attr('value') == langArray["LTXT_SETUPCAMCAMSETUP_CAMERA_DISCONNECT"]) {
                  if(c.setCamConnect(me.select_ch, 0)) {
                    $(this).dialog('close');
                    $('#camera_onoff').attr('value',langArray["LTXT_SETUPCAMCAMSETUP_CAMERA_CONNECT"]);
                    $('#poe_msg').text(langArray["LTXT_SETUPCAMCAMSETUP_CONNECT_MESSAGE"]);
                  }
                  else {
                    this.state = 'done';
                  }
                }
                else {
                  if(c.setCamConnect(me.select_ch, 1)) {
                    $(this).dialog('close');
                    $('#camera_onoff').attr('value',langArray["LTXT_SETUPCAMCAMSETUP_CAMERA_DISCONNECT"]);
                    $('#poe_msg').text(langArray["LTXT_SETUPCAMCAMSETUP_DISCONNECT_MESSAGE"]);
                  }
                  else {
                    this.state = 'done';
                  }
                }
                break;
              case 'done' :
                $(this).dialog('close');
                break;
            }
            }
        }, {
          text : langArray["LTXT_CANCEL"],
          click : function() {
            $(this).dialog('close');
          }
        }]
      });

      { //image
        this.imageObject = CompatibilityImageObject;

        this.imageObject["IMAGE_ONVIF_BRIGHTNESS"] = new SliderSpinner("brightness");
        this.imageObject["IMAGE_ONVIF_CONTRAST"] = new SliderSpinner("contrast");
        this.imageObject["IMAGE_ONVIF_SHARPNESS"] = new SliderSpinner("sharpness");
        this.imageObject["IMAGE_ONVIF_COLOR"] = new SliderSpinner("color");
        this.imageObject["IMAGE_ONVIF_TINT"] = new SliderSpinner("tint");
        this.imageObject["IMAGE_ONVIF_ROTATION"] = new DropdownBox("mirror");
        this.imageObject["IMAGE_ONVIF_ROTATION"].setChangeCallback(this.callbackImageDropboxChange);

        this.imageObject["IMAGE_ONVIF_FOCUS_NEARLIMIT"] = new SliderSpinner("nearlimit");
        this.imageObject["IMAGE_ONVIF_FOCUS_FARLIMIT"] = new SliderSpinner("farlimit");
        this.imageObject["IMAGE_ONVIF_FOCUS_DEFAULTSPEED"] = new SliderSpinner("defaultspeed");
        this.imageObject["IMAGE_ONVIF_FOCUS_ABPOSITION"] = new SliderSpinner("abposition");
        this.imageObject["IMAGE_ONVIF_FOCUS_ABSPEED"] = new SliderSpinner("abspeed");
        this.imageObject["IMAGE_ONVIF_FOCUS_REDISTANCE"] = new SliderSpinner("redistance");
        this.imageObject["IMAGE_ONVIF_FOCUS_RESPEED"] = new SliderSpinner("respeed");
        this.imageObject["IMAGE_ONVIF_FOCUS_COSPEED"] = new SliderSpinner("cospeed");
        this.imageObject["IMAGE_ONVIF_FOCUS_NEAR"] = new Button("focusnear");
        this.imageObject["IMAGE_ONVIF_FOCUS_NEAR"].setClickCallback(this.callbackFocusNearButton);
        this.imageObject["IMAGE_ONVIF_FOCUS_FAR"] = new Button("focusfar");
        this.imageObject["IMAGE_ONVIF_FOCUS_FAR"].setClickCallback(this.callbackFocusFarButton);

        this.imageObject["IMAGE_ONVIF_FOCUS_MODE"] = new DropdownBox("focus");
        this.imageObject["IMAGE_ONVIF_FOCUS_MODE"].setChangeCallback(this.callbackImageDropboxChange);

        this.imageObject["IMAGE_ONVIF_FOCUS_ONEPUSH"] = new Button("onepush");
        this.imageObject["IMAGE_ONVIF_FOCUS_ONEPUSH"].setClickCallback(this.callbackOneButton);
        this.imageObject["IMAGE_ONVIF_FOCUS_HOME"] = new Button("home");
        this.imageObject["IMAGE_ONVIF_FOCUS_HOME"].setClickCallback(this.callbackHomeButton);

        this.imageObject["IMAGE_ONVIF_WB_MODE"] = new DropdownBox("wb");
        this.imageObject["IMAGE_ONVIF_WB_MODE"].setChangeCallback(this.callbackImageDropboxChange);
        this.imageObject["IMAGE_ONVIF_WB_CRGAIN"] = new SliderSpinner("crgain");
        this.imageObject["IMAGE_ONVIF_WB_CBGAIN"] = new SliderSpinner("cbgain");
        this.imageObject["IMAGE_ONVIF_WB_PRESET"] = new DropdownBox("mwb");
        this.imageObject["IMAGE_ONVIF_WB_PRESET"].setChangeCallback(this.callbackImageDropboxChange);

        this.imageObject["IMAGE_ONVIF_FOCUS_LIMIT"] = new DropdownBox("focus_limit");
        this.imageObject["IMAGE_ONVIF_FOCUS_LIMIT"].setChangeCallback(this.callbackImageDropboxChange);
        this.imageObject["IMAGE_ONVIF_STABILIZER"] = new DropdownBox("stabilizer");
        this.imageObject["IMAGE_ONVIF_STABILIZER"].setChangeCallback(this.callbackImageDropboxChange);
        this.imageObject["IMAGE_ONVIF_IRCORRECTION"] = new DropdownBox("ir_correction");
        this.imageObject["IMAGE_ONVIF_IRCORRECTION"].setChangeCallback(this.callbackImageDropboxChange);

        //this.imageObject["IMAGE_ONVIF_IRCUT"] = new DropdownBox("ircut");
        //this.imageObject["IMAGE_ONVIF_IRCUT"].setChangeCallback(this.callbackImageDropboxChange);

        //this.imageObject["IMAGE_ONVIF_DNN_TOGGLE"] = new DropdownBox("dnn_toggle");
        //this.imageObject["IMAGE_ONVIF_DNN_TOGGLE"].setChangeCallback(this.callbackImageDropboxChange);
      }

      { // exposure
        this.exposureObject_high = CompatibilityExposureObject_high;
        this.exposureObject = CompatibilityExposureObject;

        $(".cam_image_setup #tab").tabs("select", 1);

        this.exposureObject["EXPOSURE_ONVIF_MODE"] = new DropdownBox("mode");
        this.exposureObject["EXPOSURE_ONVIF_MODE"].setChangeCallback(this.callbackModeChange);
        this.exposureObject["EXPOSURE_ONVIF_PRIORITY"] = new DropdownBox("priority");
        this.exposureObject["EXPOSURE_ONVIF_PRIORITY"].setChangeCallback(this.callbackExposureDropboxChange);

        this.exposureObject["EXPOSURE_ONVIF_MINETIME"] = new SliderSpinner("minetime");
        this.exposureObject["EXPOSURE_ONVIF_MAXETIME"] = new SliderSpinner("maxetime");
        this.exposureObject["EXPOSURE_ONVIF_ETIME"] = new SliderSpinner("etime");
        this.exposureObject["EXPOSURE_ONVIF_MINGAIN"] = new SliderSpinner("mingain");
        this.exposureObject["EXPOSURE_ONVIF_MAXGAIN"] = new SliderSpinner("maxgain");
        this.exposureObject["EXPOSURE_ONVIF_GAIN"] = new SliderSpinner("gain");
        this.exposureObject["EXPOSURE_ONVIF_MINIRIS"] = new SliderSpinner("maxiris");
        this.exposureObject["EXPOSURE_ONVIF_MAXIRIS"] = new SliderSpinner("miniris");
        this.exposureObject["EXPOSURE_ONVIF_IRIS"] = new SliderSpinner("iris");
        /*this.exposureObject["EXPOSURE_ONVIF_BOTTOM"] = new SliderSpinner("bottom");
        this.exposureObject["EXPOSURE_ONVIF_TOP"] = new SliderSpinner("top");
        this.exposureObject["EXPOSURE_ONVIF_RIGHT"] = new SliderSpinner("right");
        this.exposureObject["EXPOSURE_ONVIF_LEFT"] = new SliderSpinner("left");*/

        this.exposureObject["EXPOSURE_SLOWSHUTTER"] = new DropdownBox("slowshutter");
        this.exposureObject["EXPOSURE_SLOWSHUTTER"].setChangeCallback(this.callbackExposureDropboxChange);
        this.exposureObject["EXPOSURE_MAXAGC"] = new DropdownBox("maxagc");
        this.exposureObject["EXPOSURE_MAXAGC"].setChangeCallback(this.callbackExposureDropboxChange);
        this.exposureObject["EXPOSURE_DCIRIS"] = new DropdownBox("dc_iris");
        this.exposureObject["EXPOSURE_DCIRIS"].setChangeCallback(this.callbackExposureDropboxChange);

        this.exposureObject["EXPOSURE_ONVIF_WDR_MODE"] = new DropdownBox("wdr");
        this.exposureObject["EXPOSURE_ONVIF_WDR_MODE"].setChangeCallback(this.callbackWDRChange);
        this.exposureObject["EXPOSURE_ONVIF_WDR_LEVEL"] = new SliderSpinner("wdrlevel");

        this.exposureObject["EXPOSURE_ONVIF_DNR_MODE"] = new DropdownBox("dnr");
        this.exposureObject["EXPOSURE_ONVIF_DNR_MODE"].setChangeCallback(this.callbackExposureDropboxChange);

        this.exposureObject["EXPOSURE_ONVIF_BLC_MODE"] = new DropdownBox("blc");
        this.exposureObject["EXPOSURE_ONVIF_BLC_MODE"].setChangeCallback(this.callbackExposureDropboxChange);
        this.exposureObject["EXPOSURE_ONVIF_BLC_LEVEL"] = new SliderSpinner("blclevel");

        this.exposureObject["EXPOSURE_ANTI_FLICKER"] = new DropdownBox("antiflicker");
        this.exposureObject["EXPOSURE_ANTI_FLICKER"].setChangeCallback(this.callbackAntiflickerChange);
        this.exposureObject["EXPOSURE_MAX_SHUTTER_50"] = new DropdownBox("max_shutter_50");
        this.exposureObject["EXPOSURE_MAX_SHUTTER_50"].setChangeCallback(this.callbackMaxShutterChange);
        this.exposureObject["EXPOSURE_MAX_SHUTTER_60"] = new DropdownBox("max_shutter_60");
        this.exposureObject["EXPOSURE_MAX_SHUTTER_60"].setChangeCallback(this.callbackMaxShutterChange);
        this.exposureObject["EXPOSURE_MAX_SHUTTER_OFF"] = new DropdownBox("max_shutter_off");
        this.exposureObject["EXPOSURE_MAX_SHUTTER_OFF"].setChangeCallback(this.callbackMaxShutterChange);

        this.exposureObject["EXPOSURE_ONVIF_IRCUT"] = new DropdownBox("ircut");
        this.exposureObject["EXPOSURE_ONVIF_IRCUT"].setChangeCallback(this.callbackExposureDropboxChange);

        this.exposureObject["EXPOSURE_ONVIF_DNN_TOGGLE"] = new DropdownBox("dnn_toggle");
        this.exposureObject["EXPOSURE_ONVIF_DNN_TOGGLE"].setChangeCallback(this.callbackExposureDropboxChange);

        this.exposureObject["EXPOSURE_ONVIF_ADAPTIVE_IR"] = new DropdownBox("adaptive_ir");
        this.exposureObject["EXPOSURE_ONVIF_ADAPTIVE_IR"].setChangeCallback(this.callbackExposureDropboxChange);

        this.exposureObject["EXPOSURE_ONVIF_DNN_SENSE_NTOD"] = new SliderSpinner("dnn_sense_ntod");
        this.exposureObject["EXPOSURE_ONVIF_DNN_SENSE_NTOD"].setCallback(this.callbackDnnSensitivity);

        this.exposureObject_high["EXPOSURE_ONVIF_DNN_SENSE_DTON"] = new SliderSpinner("dnn_sense_dton");
        this.exposureObject_high["EXPOSURE_ONVIF_DNN_SENSE_DTON"].setCallback(this.callbackDnnSensitivity);

        this.exposureObject_high["EXPOSURE_ONVIF_DEFOG"] = new DropdownBox("defog");
        this.exposureObject_high["EXPOSURE_ONVIF_DEFOG"].setChangeCallback(this.callbackExposureDropboxChange);

        this.exposureObject_high["EXPOSURE_ONVIF_HLC"] = new DropdownBox("hlc");
        this.exposureObject_high["EXPOSURE_ONVIF_HLC"].setChangeCallback(this.callbackExposureDropboxChange);

        this.exposureObject_high["EXPOSURE_ONVIF_IRCUT_M"] = new DropdownBox("ircutm");
        this.exposureObject_high["EXPOSURE_ONVIF_IRCUT_M"].setChangeCallback(this.callbackExposureDropboxChange);

        this.exposureObject_high["EXPOSURE_MAX_SHUTTER_MOTION_OFF"] = new DropdownBox("max_shutter_motion_off");
        this.exposureObject_high["EXPOSURE_MAX_SHUTTER_MOTION_OFF"].setChangeCallback(this.callbackMaxShutterChange);

        this.exposureObject_high["EXPOSURE_ONVIF_DC_IRIS_CAL"] = new Button("calibration");
        this.exposureObject_high["EXPOSURE_ONVIF_DC_IRIS_CAL"].setClickCallback(this.callbackIrisCalButton);

        this.exposureObject_high["EXPOSURE_ANTI_FLICKER_MOTION"] = new DropdownBox("antiflicker_motion");
        this.exposureObject_high["EXPOSURE_ANTI_FLICKER_MOTION"].setChangeCallback(this.callbackAntiflickerChange);

        this.exposureObject_high["EXPOSURE_MAX_SHUTTER_MOTION_OFF_ON"] = new DropdownBox("max_shutter_motion_off_on");
        this.exposureObject_high["EXPOSURE_MAX_SHUTTER_MOTION_OFF_ON"].setChangeCallback(this.callbackMaxShutterChange);

        this.exposureObject_high["EXPOSURE_MAX_SHUTTER_AUTO_OFF_OFF"] = new DropdownBox("max_shutter_auto_off_off");
        this.exposureObject_high["EXPOSURE_MAX_SHUTTER_AUTO_OFF_OFF"].setChangeCallback(this.callbackMaxShutterChange);

        this.exposureObject_high["EXPOSURE_MAX_SHUTTER_AUTO_OFF_ON_TV"] = new DropdownBox("max_shutter_auto_off_on_tv");
        this.exposureObject_high["EXPOSURE_MAX_SHUTTER_AUTO_OFF_ON_TV"].setChangeCallback(this.callbackMaxShutterChange);

        this.exposureObject_high["EXPOSURE_MAX_SHUTTER_AUTO_OFF_ON"] = new DropdownBox("max_shutter_auto_off_on");
        this.exposureObject_high["EXPOSURE_MAX_SHUTTER_AUTO_OFF_ON"].setChangeCallback(this.callbackMaxShutterChange);

        this.exposureObject_high["EXPOSURE_ANTI_FLICKER_MOTION_OFF"] = new DropdownBox("antiflicker_motion_off");
        this.exposureObject_high["EXPOSURE_ANTI_FLICKER_MOTION_OFF"].setChangeCallback(this.callbackAntiflickerChange);

        this.exposureObject_high["EXPOSURE_ANTI_FLICKER_AUTO_OFF"] = new DropdownBox("antiflicker_auto_off");
        this.exposureObject_high["EXPOSURE_ANTI_FLICKER_AUTO_OFF"].setChangeCallback(this.callbackAntiflickerChange);

        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_50"] = new DropdownBox("base_shutter_50");
        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_50"].setChangeCallback(this.callbackBaseShutterChange);

        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_60"] = new DropdownBox("base_shutter_60");
        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_60"].setChangeCallback(this.callbackBaseShutterChange);

        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_100"] = new DropdownBox("base_shutter_100");
        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_100"].setChangeCallback(this.callbackBaseShutterChange);

        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_120"] = new DropdownBox("base_shutter_120");
        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_120"].setChangeCallback(this.callbackBaseShutterChange);

        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_100_300"] = new DropdownBox("base_shutter_100_300");
        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_100_300"].setChangeCallback(this.callbackBaseShutterChange);

        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_100_5000"] = new DropdownBox("base_shutter_100_5000");
        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_100_5000"].setChangeCallback(this.callbackBaseShutterChange);

        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_120_360"] = new DropdownBox("base_shutter_120_360");
        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_120_360"].setChangeCallback(this.callbackBaseShutterChange);

        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_120_5000"] = new DropdownBox("base_shutter_120_5000");
        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_120_5000"].setChangeCallback(this.callbackBaseShutterChange);

        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_120_262"] = new DropdownBox("base_shutter_120_262");
        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_120_262"].setChangeCallback(this.callbackBaseShutterChange);

        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_30_262"] = new DropdownBox("base_shutter_30_262");
        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_30_262"].setChangeCallback(this.callbackBaseShutterChange);

        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_25_100"] = new DropdownBox("base_shutter_25_100");
        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_25_100"].setChangeCallback(this.callbackBaseShutterChange);

        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_25_300"] = new DropdownBox("base_shutter_25_300");
        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_25_300"].setChangeCallback(this.callbackBaseShutterChange);

        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_25_5000"] = new DropdownBox("base_shutter_25_5000");
        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_25_5000"].setChangeCallback(this.callbackBaseShutterChange);

        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_30_120"] = new DropdownBox("base_shutter_30_120");
        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_30_120"].setChangeCallback(this.callbackBaseShutterChange);

        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_30_360"] = new DropdownBox("base_shutter_30_360");
        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_30_360"].setChangeCallback(this.callbackBaseShutterChange);

        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_30_5000"] = new DropdownBox("base_shutter_30_5000");
        this.exposureObject_high["EXPOSURE_BASE_SHUTTER_30_5000"].setChangeCallback(this.callbackBaseShutterChange);

        this.exposureObject_high["EXPOSURE_DCIRIS_MOTION"] = new DropdownBox("dc_iris_motion");
        this.exposureObject_high["EXPOSURE_DCIRIS_MOTION"].setChangeCallback(this.callbackExposureDropboxChange);

        this.exposureObject_high["EXPOSURE_ONVIF_DNN_SCHEDULE_START_HOUR"] = new TimeDropdownBox("dnn_schedule_start_hour", 24);
        this.exposureObject_high["EXPOSURE_ONVIF_DNN_SCHEDULE_START_HOUR"].setChangeCallback(this.callbackExposureDropboxChange);
        this.exposureObject_high["EXPOSURE_ONVIF_DNN_SCHEDULE_START_MIN"] = new TimeDropdownBox("dnn_schedule_start_min", 60);
        this.exposureObject_high["EXPOSURE_ONVIF_DNN_SCHEDULE_START_MIN"].setChangeCallback(this.callbackExposureDropboxChange);
        this.exposureObject_high["EXPOSURE_ONVIF_DNN_SCHEDULE_END_HOUR"] = new TimeDropdownBox("dnn_schedule_end_hour", 24);
        this.exposureObject_high["EXPOSURE_ONVIF_DNN_SCHEDULE_END_HOUR"].setChangeCallback(this.callbackExposureDropboxChange);
        this.exposureObject_high["EXPOSURE_ONVIF_DNN_SCHEDULE_END_MIN"] = new TimeDropdownBox("dnn_schedule_end_min", 60);
        this.exposureObject_high["EXPOSURE_ONVIF_DNN_SCHEDULE_END_MIN"].setChangeCallback(this.callbackExposureDropboxChange);
      }

      { // focus
        this.focusObject = CompatibilityFocusObject;
        this.focusObject["FOCUS_TEM_COMP"] = new DropdownBox("tem_comp_mode");
        this.focusObject["FOCUS_DNN_COMP"] = new DropdownBox("dnn_comp_mode");
      }

      { // video stream
        var video_stream_preview = new Button("video_stream_preview");
        video_stream_preview.setClickCallback(this.callbackStreamPresetButton);
      }
      $(".cam_image_setup #tab").tabs("select", 0);

      //*
      $('#c_sp_div_menubar_sub').hide();
      $('#c_sp_div_contents').hide();
      //*/
    },
    update: function(array) {
      this.initView();
      this.updateModel(array);

      //init base shutter speed table start
      this.baseShutterSpeedTable = new Array(parseInt(array["base_shutter_speed_height"]));

      for(var row=0; row<array["base_shutter_speed_height"]; row++)
      {
        this.baseShutterSpeedTable[row] = new Array(parseInt(array["base_shutter_speed_width"]));
        for(var col=0; col<array["base_shutter_speed_width"]; col++)
        {
          this.baseShutterSpeedTable[row][col] = {
            "high": array["base_shutter_speed_"+row+"_"+col+"_high"],
            "low": array["base_shutter_speed_"+row+"_"+col+"_low"]
          }
        }
      }
      //init base shutter speed table end

      this.supported_image_high = array["supported_image_high"];
      this.supported_image = array["supported_image"];
      this.supported_exposure_high = array["supported_exposure_high"];
      this.supported_exposure = array["supported_exposure"];
      this.supported_focus = array["supported_focus"];
      this.updateView(array);

      this.supportCheck(this.imageObject, this.supported_image);
      this.supportCheck(this.exposureObject, this.supported_exposure);
      this.supportCheck_high(this.imageObject_high, this.supported_image_high);
      this.supportCheck_high(this.exposureObject_high, this.supported_exposure_high);
      this.supportCheck_focus(this.focusObject, this.supported_focus);

      for(var i in this.exposureObject_high)
      {
        if(i.indexOf('BASE_SHUTTER') > 0)
        {
          //console.log("base shutter: "+this.exposureObject_high[i].id+"]");
          $("."+this.exposureObject_high[i].id).hide();
        }
      }

      this.updateViewValue(this.imageObject, array);
      this.updateViewValue(this.exposureObject, array);
      this.updateViewValue(this.imageObject_high, array);
      this.updateViewValue(this.exposureObject_high, array);
      this.updateViewValue(this.focusObject, array);

      if(array['model'] == "Not connected") {
        this.initNotConnect(this.imageObject, 34095135);
        this.initNotConnect(this.exposureObject, 113771373);
        return array;
      } else {
        this.removeTitle();
      }

      array = {};

      for (var i in this.imageObject) {
        if(this.imageObject[i] != undefined)
          array[this.imageObject[i].id] = this.imageObject[i].getValue();
      }

      for (var i in this.imageObject_high){
        if(this.imageObject_high[i] != undefined)
          array[this.imageObject_high[i].id] = this.imageObject_high[i].getValue();
      }

      for (var i in this.exposureObject) {
        if(this.exposureObject[i] != undefined)
          array[this.exposureObject[i].id] = this.exposureObject[i].getValue();
      }

      for (var i in this.exposureObject_high) {
        if(this.exposureObject_high[i] != undefined)
          array[this.exposureObject_high[i].id] = this.exposureObject_high[i].getValue();
      }

      for (var i in this.focusObject) {
        array[this.focusObject[i].id] = this.focusObject[i].getValue();
      }

      // $('input#camera_onoff').click(function() {

      //   $("#dialog_camera_onoff").dialog('open');
      // });

      var action = 'action=get_cam&menu=poe.control';
      $.ajax({
        type: "POST",
        url: "/cgi-bin/webra_fcgi.fcgi",
        async: false,
        data: action,
        success: function(response) {
          var p = encode_to_array(response);
          if((p['poe_on_off'] & (1<<$('#ch').val())) != 0) {
            $('#camera_onoff').attr('value',langArray["LTXT_SETUPCAMCAMSETUP_CAMERA_DISCONNECT"]);
            $('#poe_msg').text(langArray["LTXT_SETUPCAMCAMSETUP_DISCONNECT_MESSAGE"]);
          }
          else {
            $('#camera_onoff').attr('value',langArray["LTXT_SETUPCAMCAMSETUP_CAMERA_CONNECT"]);
            $('#poe_msg').text(langArray["LTXT_SETUPCAMCAMSETUP_CONNECT_MESSAGE"]);
          }
          return true;
       },
       fail: function(response) {
         return false;
       }
     });

      return array;
    },
    updateSnapshot: function(url) {
      $(".preview_jpeg").attr("src", url);
    },
    updateModel: function(array) {
      if (array["model"] == "Not connected" || array["model" == undefined]) {
        // for support NOT CONNECT multi lang
        this.model.text(langArray['LTXT_SETUPCAMCAMSETUP_NOT_CONNECTED']);
        this.copy_setting.setEnable(false);
      }
      else {
        this.model.text(array["model"]);
        this.copy_setting.setEnable(true);
      }
    },
    supportCheck: function(objects, supportMask) {
      for (var i in objects) {
        if (objects[i] == null || objects[i] == undefined)
        {
          continue;
        }

        if (objects[i].getObject() == null || objects[i].getObject() == undefined)
        {
          objects[i].setEnable(false);
          continue;
        }

        if ((parseInt(objects[i].getObject().category) & parseInt(supportMask)) != 0)
        {
          $("." + objects[i].id).show();
          objects[i].setEnable(true);
        }
        else
        {
          $("." + objects[i].id).hide();
          objects[i].setEnable(false);
        }
      }
    },
    supportCheck_high: function(objects, supportMask) {
      for (var i in objects) {
        if (objects[i] == null || objects[i] == undefined)
        {
          continue;
        }

        if (objects[i].getObject() == null || objects[i].getObject() == undefined)
        {
          $("." + objects[i].id).hide();
          continue;
        }

        if ((parseInt(objects[i].getObject().category_high) & parseInt(supportMask)) != 0)
        {
          $("." + objects[i].id).show();
          objects[i].setEnable(true);
        }
        else
        {
          $("." + objects[i].id).hide();
          objects[i].setEnable(false);
        }
      }
    },
    supportCheck_focus: function(objects, supportMask) {
      var focus_elem = {
        "FOCUS_DNN_COMP": 1 << 0,
        "FOCUS_TEM_COMP": 1 << 1
      }

      for (var i in objects) {
        if(objects[i] == null || objects[i] == undefined)
        {
          continue;
        }

        if((supportMask & focus_elem[i]) > 0)
        { //in case of support.
          $("#" + objects[i].id).attr("disabled", false);
        }
        else
        { //in case of not support.
          $("#" + objects[i].id).attr("disabled", true);
        }
      }
    },
    initNotConnect: function(objects, supportMask) {
      for (var i in objects) {
        if (objects[i] == null || objects[i] == undefined)
          continue;
        if (objects[i].getObject() == null || objects[i].getObject() == undefined)
          continue;

        if ((parseInt(objects[i].getObject().category) & parseInt(supportMask)) != 0) {
          $("." + objects[i].id).show();
          objects[i].setEnable(false);
        }
        else {
          $("." + objects[i].id).hide();
          objects[i].setEnable(false);
        }
      }
    },
    removeTitle: function() {
      if(($('.wdr').css("display") == "block") || ($('.wdrlevel').css("display") == "block"))
        $(".wide_dynamic_range").show();
      else
        $(".wide_dynamic_range").hide();

      if($('.maxiris').css("display") == "block" || $('.miniris').css("display") == "block" || $('.dc_iris').css("display") == "block" || $('.iris').css("display") == "block" || $('.dc_iris_motion').css("display") == "block")        $('.exposure_iris').show();
      else
        $('.exposure_iris').hide();

      if($('.mingain').css("display") == "block" || $('.maxgain').css("display") == "block" || $('.gain').css("display") == "block" || $('.maxagc').css("display") == "block")
        $('.exposure_gain').show();
      else
        $('.exposure_gain').hide();

      if($('.minetime').css("display") == "block" || $('.maxetime').css("display") == "block" || $('.etime').css("display") == "block" || $('.slowshutter').css("display") == "block")
        $('.exposure_gain').show();
      else
        $('.exposure_gain').hide();
    },
    updateView: function(array) {
      { // image
        this.updateViewSpinner(this.imageObject["IMAGE_ONVIF_BRIGHTNESS"], array);
        this.updateViewSpinner(this.imageObject["IMAGE_ONVIF_CONTRAST"], array);
        this.updateViewSpinner(this.imageObject["IMAGE_ONVIF_SHARPNESS"], array);
        this.updateViewSpinner(this.imageObject["IMAGE_ONVIF_COLOR"], array);
        this.updateViewSpinner(this.imageObject["IMAGE_ONVIF_TINT"], array);
        this.updateViewDropdown(this.imageObject["IMAGE_ONVIF_ROTATION"], array);
        this.updateViewDropdown(this.imageObject["IMAGE_ONVIF_FOCUS_MODE"], array);
        this.imageObject["IMAGE_ONVIF_FOCUS_ONEPUSH"].setObject(new CompatibilityValueObject(1<<8, 0));
        this.imageObject["IMAGE_ONVIF_FOCUS_HOME"].setObject(new CompatibilityValueObject(1<<18, 0));
        this.updateViewSpinner(this.imageObject["IMAGE_ONVIF_FOCUS_DEFAULTSPEED"], array);
        this.updateViewSpinner(this.imageObject["IMAGE_ONVIF_FOCUS_NEARLIMIT"], array);
        this.updateViewSpinner(this.imageObject["IMAGE_ONVIF_FOCUS_FARLIMIT"], array);
        this.updateViewSpinner(this.imageObject["IMAGE_ONVIF_FOCUS_ABPOSITION"], array);
        this.updateViewSpinner(this.imageObject["IMAGE_ONVIF_FOCUS_ABSPEED"], array);
        this.updateViewSpinner(this.imageObject["IMAGE_ONVIF_FOCUS_REDISTANCE"], array);
        this.updateViewSpinner(this.imageObject["IMAGE_ONVIF_FOCUS_RESPEED"], array);
        this.imageObject["IMAGE_ONVIF_FOCUS_NEAR"].setObject(new CompatibilityValueObject(1<<21, 0));
        this.imageObject["IMAGE_ONVIF_FOCUS_FAR"].setObject(new CompatibilityValueObject(1<<21, 0));
        this.updateViewSpinner(this.imageObject["IMAGE_ONVIF_FOCUS_COSPEED"], array);
        this.updateViewDropdown(this.imageObject["IMAGE_ONVIF_WB_MODE"], array);
        this.updateViewSpinner(this.imageObject["IMAGE_ONVIF_WB_CRGAIN"], array);
        this.updateViewSpinner(this.imageObject["IMAGE_ONVIF_WB_CBGAIN"], array);
        this.updateViewDropdown(this.imageObject["IMAGE_ONVIF_WB_PRESET"], array);

        this.updateViewDropdown(this.imageObject["IMAGE_ONVIF_FOCUS_LIMIT"], array);
        this.updateViewDropdown(this.imageObject["IMAGE_ONVIF_STABILIZER"], array);
        this.updateViewDropdown(this.imageObject["IMAGE_ONVIF_IRCORRECTION"], array);
      }

      { // exposure
        this.updateViewDropdown(this.exposureObject["EXPOSURE_ONVIF_MODE"], array);
        this.updateViewDropdown(this.exposureObject["EXPOSURE_ONVIF_PRIORITY"], array);
        this.updateViewDropdown(this.exposureObject["EXPOSURE_ONVIF_BLC_MODE"], array);
        this.updateViewSpinner(this.exposureObject["EXPOSURE_ONVIF_BLC_LEVEL"], array);
        this.updateViewDropdown(this.exposureObject["EXPOSURE_ANTI_FLICKER"], array);
        this.updateViewDropdown(this.exposureObject["EXPOSURE_MAX_SHUTTER_50"], array);
        this.updateViewDropdown(this.exposureObject["EXPOSURE_MAX_SHUTTER_60"], array);
        this.updateViewDropdown(this.exposureObject["EXPOSURE_MAX_SHUTTER_OFF"], array);
        this.updateViewSpinner(this.exposureObject["EXPOSURE_ONVIF_MINETIME"], array);
        this.updateViewSpinner(this.exposureObject["EXPOSURE_ONVIF_MAXETIME"], array);
        this.updateViewSpinner(this.exposureObject["EXPOSURE_ONVIF_ETIME"], array);
        this.updateViewSpinner(this.exposureObject["EXPOSURE_ONVIF_MINGAIN"], array);
        this.updateViewSpinner(this.exposureObject["EXPOSURE_ONVIF_MAXGAIN"], array);
        this.updateViewSpinner(this.exposureObject["EXPOSURE_ONVIF_GAIN"], array);
        this.updateViewSpinner(this.exposureObject["EXPOSURE_ONVIF_MINIRIS"], array);
        this.updateViewSpinner(this.exposureObject["EXPOSURE_ONVIF_MAXIRIS"], array);
        this.updateViewSpinner(this.exposureObject["EXPOSURE_ONVIF_IRIS"], array);
        this.updateViewDropdown(this.exposureObject["EXPOSURE_ONVIF_WDR_MODE"], array);
        this.updateViewSpinner(this.exposureObject["EXPOSURE_ONVIF_WDR_LEVEL"], array);
        this.updateViewDropdown(this.exposureObject["EXPOSURE_ONVIF_DNR_MODE"], array);
        this.updateViewDropdown(this.exposureObject["EXPOSURE_ONVIF_ADAPTIVE_IR"], array);
        /*this.updateViewSpinner(this.exposureObject["EXPOSURE_ONVIF_BOTTOM"], array);
        this.updateViewSpinner(this.exposureObject["EXPOSURE_ONVIF_TOP"], array);
        this.updateViewSpinner(this.exposureObject["EXPOSURE_ONVIF_RIGHT"], array);
        this.updateViewSpinner(this.exposureObject["EXPOSURE_ONVIF_LEFT"], array);*/
        this.updateViewDropdown(this.exposureObject["EXPOSURE_SLOWSHUTTER"], array);
        this.updateViewDropdown(this.exposureObject["EXPOSURE_MAXAGC"], array);
        this.updateViewDropdown(this.exposureObject["EXPOSURE_DCIRIS"], array);
        this.updateViewDropdown(this.exposureObject["EXPOSURE_ONVIF_IRCUT"], array);
        this.updateViewDropdown(this.exposureObject["EXPOSURE_ONVIF_DNN_TOGGLE"], array);
        this.updateViewSpinner(this.exposureObject["EXPOSURE_ONVIF_DNN_SENSE_NTOD"], array);

        this.updateViewSpinner(this.exposureObject_high["EXPOSURE_ONVIF_DNN_SENSE_DTON"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_ONVIF_DEFOG"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_ONVIF_HLC"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_ONVIF_IRCUT_M"], array);

        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_MAX_SHUTTER_MOTION_OFF"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_ANTI_FLICKER_MOTION"], array);

        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_MAX_SHUTTER_MOTION_OFF_ON"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_MAX_SHUTTER_AUTO_OFF_OFF"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_MAX_SHUTTER_AUTO_OFF_ON_TV"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_MAX_SHUTTER_AUTO_OFF_ON"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_ANTI_FLICKER_MOTION_OFF"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_ANTI_FLICKER_AUTO_OFF"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_BASE_SHUTTER_50"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_BASE_SHUTTER_60"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_BASE_SHUTTER_100"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_BASE_SHUTTER_120"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_BASE_SHUTTER_100_300"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_BASE_SHUTTER_100_5000"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_BASE_SHUTTER_120_360"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_BASE_SHUTTER_120_5000"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_BASE_SHUTTER_120_262"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_BASE_SHUTTER_30_262"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_BASE_SHUTTER_25_100"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_BASE_SHUTTER_25_300"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_BASE_SHUTTER_25_5000"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_BASE_SHUTTER_30_120"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_BASE_SHUTTER_30_360"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_BASE_SHUTTER_30_5000"], array);
        this.updateViewDropdown(this.exposureObject_high["EXPOSURE_DCIRIS_MOTION"], array);

        this.exposureObject_high["EXPOSURE_ONVIF_DC_IRIS_CAL"].setObject(new CompatibilityValueObject(null, 1<<5));//37

        this.updateViewDropdown_time(this.exposureObject_high["EXPOSURE_ONVIF_DNN_SCHEDULE_START_HOUR"], array);
        this.updateViewDropdown_time(this.exposureObject_high["EXPOSURE_ONVIF_DNN_SCHEDULE_START_MIN"], array);
        this.updateViewDropdown_time(this.exposureObject_high["EXPOSURE_ONVIF_DNN_SCHEDULE_END_HOUR"], array);
        this.updateViewDropdown_time(this.exposureObject_high["EXPOSURE_ONVIF_DNN_SCHEDULE_END_MIN"], array);
      }

      { // focus
        this.updateViewDropdown_focus(this.focusObject["FOCUS_TEM_COMP"], array);
        this.updateViewDropdown_focus(this.focusObject["FOCUS_DNN_COMP"], array);
      }
    },
    updateViewSpinner: function(spinner, array) {
      if (spinner == undefined)
        return false;
      if (spinner.id == null || spinner.id == undefined)
        return false;
      spinner.setMinMaxValue(array[spinner.id+"_min"], array[spinner.id+"_max"]);

      var object = new CompatibilityValueObject();
      object.category = array[spinner.id+"_category"];
      object.category_high = array[spinner.id+"_category_high"];
      object.value = array[spinner.id+"_value"];
      object.dependent_category = array[spinner.id+"_dependent_category"];
      object.dependent_category_high = array[spinner.id+"_dependent_category_high"];
      object.difference = array[spinner.id+"_difference"];
      spinner.setObject(object);
    },
    updateViewDropdown: function(dropdown, array) {
      if (dropdown == undefined)
        return false;
      if (dropdown.id == null || dropdown.id == undefined)
        return false;
      var selected = null;
      var multilang = null;
      if (parseInt(array[dropdown.id+"_cnt"]) == 0)
      {
        $("." + dropdown.id).hide();
      }

      for (var i = 0; i < parseInt(array[dropdown.id+"_cnt"]); i++) {
        var object = new CompatibilityOptionObject();

        object.category = array[dropdown.id+i+"_category"];
        object.category_high = array[dropdown.id+i+"_category_high"];
        object.value = array[dropdown.id+i+"_value"];
        object.selected = array[dropdown.id+i+"_selected"];

        if (parseInt(object.selected) == true)
        {
          dropdown.selected = object.value;
        }

        object.dependent_category = array[dropdown.id+i+"_dependent_category"];
        object.dependent_category_high = array[dropdown.id+i+"_dependent_category_high"];
        object.enable_category = array[dropdown.id+i+"_enable_category"];
        object.enable_category_high = array[dropdown.id+i+"_enable_category_high"];
        object.disable_category = array[dropdown.id+i+"_disable_category"];
        object.disable_category_high = array[dropdown.id+i+"_disable_category_high"];
        object.visible_category = array[dropdown.id+i+"_visible_category"];
        object.visible_category_high = array[dropdown.id+i+"_visible_category_high"];
        object.invisible_category = array[dropdown.id+i+"_invisible_category"];
        object.invisible_category_high = array[dropdown.id+i+"_invisible_category_high"];

        multilang = this.supportMultiLanguage(array[dropdown.id+i+"_caption"]);
        object.caption = multilang;

        dropdown.addItem(array[dropdown.id+i+"_value"], multilang, object);
      }
      if((array['poe_on_off'] & (1<<$('#ch').val())) != 0) {
        $('#camera_onoff').attr('value',langArray["LTXT_SETUPCAMCAMSETUP_CAMERA_DISCONNECT"]);
        $('#poe_msg').text(langArray["LTXT_SETUPCAMCAMSETUP_DISCONNECT_MESSAGE"]);
      }
      else {
        $('#camera_onoff').attr('value',langArray["LTXT_SETUPCAMCAMSETUP_CAMERA_CONNECT"]);
        $('#poe_msg').text(langArray["LTXT_SETUPCAMCAMSETUP_CONNECT_MESSAGE"]);
      }
    },
    updateViewDropdown_focus : function(dropdown, array) {
      if (dropdown == undefined)
      {
        return false;
      }

      if (dropdown.id == null || dropdown.id == undefined)
      {
        return false;
      }

      dropdown.selected = array[dropdown.id];

      var option_off = new CompatibilityOptionObject();
      var option_on = new CompatibilityOptionObject();
      var multilang_off = this.supportMultiLanguage("OFF");
      var multilang_on = this.supportMultiLanguage("ON");
      dropdown.addItem(0, multilang_off, option_off);
      dropdown.addItem(1, multilang_on, option_on);
    },
    updateViewDropdown_time : function(dropdown, array) {
      if (dropdown == undefined)
      {
        return false;
      }

      if (dropdown.id == null || dropdown.id == undefined)
      {
        return false;
      }

      var object = new CompatibilityOptionObject();

      object.category = array["dnn_schedule_time_category"];
      object.category_high = array["dnn_schedule_time_category_high"];
      dropdown.setObject(object);
    },
    updateViewValue: function(objects, array) {
      for (var i in objects) {
        if (objects[i] == undefined)
          continue;
        if (objects[i].getObject() == undefined)
          continue;

        switch (objects[i].getType()) {
        case "button":
          break;
        case "spinner":
          if (array[objects[i].id] == undefined)
          {
            objects[i].setValue(parseInt(objects[i].getObject().value));
          }
          else
            objects[i].setValue(parseInt(array[objects[i].id]));
          break;
        case "dropdownbox":
          if (array[objects[i].id] == undefined)
            objects[i].setValue(objects[i].selected);
          else
            objects[i].setValue(parseInt(array[objects[i].id]));
            break;
        case "timedropdownbox":
          if (array[objects[i].id] == undefined)
            objects[i].setValue(array[objects[i].id+this.select_ch]);
          else
            objects[i].setValue(array[objects[i].id]);
          break;
        default:
          break;
        }
      }
    },
    supportMultiLanguage: function(caption) {
      var retstr = '';
      switch (caption) {
      case "NONE":
        retstr = langArray["LTXT_NONE"];
        break;
      case "HORIZONTAL":
        retstr = langArray["LTXT_HORIZONTAL"];
        break;
      case "VERTICAL":
        retstr = langArray["LTXT_VERTICAL"];
        break;
      case "FLIP":
        retstr = langArray["LTXT_FLIP"];
        break;
      case "CONTINUOUS":
        retstr = langArray["LTXT_CONTINUOUS"];
        break;
      case "DAYTIME":
        retstr = langArray["LTXT_DAYTIME"];
        break;
      case "NIGHTTIME":
        retstr = langArray["LTXT_NIGHTTIME"];
        break;
      case "SCHEDULE":
        retstr = langArray["LTXT_SCHEDULE"];
        break;
      case "ON":
        retstr = langArray["LTXT_ON"];
        break;
      case "OFF":
        retstr = langArray["LTXT_OFF"];
        break;
      case "AUTO":
        retstr = langArray["LTXT_AUTO"];
        break;
      case "MANUAL":
        retstr = langArray["LTXT_MANUAL"];
        break;
      case "AUTO(Motion Priority)":
        retstr = langArray["LTXT_AUTO_MOTION"];
        break;
      case "MAX":
        retstr = langArray["LTXT_MAX"];
        break;
      case "AUTO(WIDE MODE)":
        retstr = langArray["LTXT_AUTO_WIDE_MODE"];
        break;
      case "POSITION":
        retstr = langArray["LTXT_POSITION"];
        break;
      case "DISTANCE":
        retstr = langArray["LTXT_DISTANCE"];
        break;
      case "SPEED":
        retstr = langArray["LTXT_SPEED"];
        break;
      case "HIGH":
        retstr = langArray["LTXT_COMBO_MENU_HIGH"];
        break;
      case "MID":
        retstr = langArray["LTXT_COMBO_MENU_MID"];
        break;
      case "LOW":
        retstr = langArray["LTXT_COMBO_MENU_LOW"];
        break;
      case "AUTO - HIGH":
        retstr = langArray["LTXT_COMBO_MENU_AUTO_HIGH"];
        break;
      case "AUTO - MIDDLE":
        retstr = langArray["LTXT_COMBO_MENU_AUTO_MID"];
        break;
      case "AUTO - LOW":
        retstr = langArray["LTXT_COMBO_MENU_AUTO_LOW"];
        break;
      case "MANUAL - HIGH":
        retstr = langArray["LTXT_COMBO_MENU_MANUAL_HIGH"];
        break;
      case "MANUAL - MIDDLE":
        retstr = langArray["LTXT_COMBO_MENU_MANUAL_MID"];
        break;
      case "MANUAL - LOW":
        retstr = langArray["LTXT_COMBO_MENU_MANUAL_LOW"];
        break;
      case "LOW MID":
        retstr = langArray["LTXT_COMBO_MENU_LOW_MID"];
        break;
      case "HIGH MID":
        retstr = langArray["LTXT_COMBO_MENU_HIGH_MID"];
        break;
      case "BEST QUALITY":
        retstr = langArray["LTXT_COMBO_MENU_BEST_QUALITY"];
        break;
      case "DEPTH OF FIELD":
        retstr = langArray["LTXT_COMBO_MENU_DEPTH_OF_FIELD"];
        break;
      case "ADAPTIVE":
        retstr = langArray["LTXT_COMBO_MENU_ADAPTIVE"];
        break;
      case "ZONE - LOWER":
        retstr = langArray["LTXT_COMBO_MENU_ZONE_LOWER"];
        break;
      case "ZONE - MIDDLE":
        retstr = langArray["LTXT_COMBO_MENU_ZONE_MIDDLE"];
        break;
      case "ZONE - UPPER":
        retstr = langArray["LTXT_COMBO_MENU_ZONE_UPPER"];
        break;
      case "ZONE - LEFT":
        retstr = langArray["LTXT_COMBO_MENU_ZONE_LEFT"];
        break;
      case "ZONE - RIGHT":
        retstr = langArray["LTXT_COMBO_MENU_ZONE_RIGHT"];
        break;
      case "SEMI AUTO":
        retstr = langArray["LTXT_COMBO_MENU_SEMI_AUTO"];
        break;
      case "AUTO(low)":
        retstr = langArray["LTXT_COMBO_MENU_AUTO_SMALL_LOW"];
        break;
      case "AUTO(medium)":
        retstr = langArray["LTXT_COMBO_MENU_AUTO_SMALL_MEDIUM"];
        break;
      case "AUTO(high)":
        retstr = langArray["LTXT_COMBO_MENU_AUTO_SMALL_HIGH"];
        break;
      case '0 SEC':
        retstr = langArray['LTXT_0SEC'];
        break;
      case '5 SEC':
        retstr = langArray['LTXT_5SEC'];
        break;
      case '10 SEC':
        retstr = langArray['LTXT_10SEC'];
        break;
      case '15 SEC':
        retstr = langArray['LTXT_15SEC'];
        break;
      case '30 SEC':
        retstr = langArray['LTXT_30SEC'];
        break;
      case '60 SEC':
        retstr = langArray['LTXT_60SEC'];
        break;
      case 'INDOOR (2800K)':
        retstr = langArray['LTXT_SETUPCAMIMAGEADV_INDOOR_(2800K)'];
        break;
      case "OUTDOOR (6500K)":
        retstr = langArray['LTXT_SETUPCAMIMAGEADV_OUTDOOR_(6500K)'];
        break;
      case "FLUORESCENT (4000K)":
        retstr = langArray['LTXT_SETUPCAMIMAGEADV_FLUORESCENT_(4000K)'];
        break;
      }
      return retstr != '' ? retstr : caption;
    },
    findObjectUseBitmask_high: function(objects, bitmask){
      var objectArray = new Array();
      for (var i in objects) {
        if (objects[i] == undefined)
          continue;
        if (objects[i].getObject() == undefined)
          continue;

        if ((parseInt(objects[i].getObject().category_high) & parseInt(bitmask)) != 0) {
          objectArray.push(objects[i]);
        }
      }
      return objectArray;
    },
    findObjectUseBitmask_reverse: function(objects, bitmask, mode){
      var objectArray = new Array();
      for (var i in objects) {
        if (objects[i] == undefined)
          continue;
        if (objects[i].getObject() == undefined)
          continue;

        if($('.'+objects[i].id).css('display') == 'none')
        {
          continue;
        }

        switch(mode)
        {
          case "disabled":
            if ((parseInt(objects[i].getObject().disable_category) & parseInt(bitmask)) != 0) {
              objectArray.push(objects[i]);
            }
          break;
          case "enabled":
            if ((parseInt(objects[i].getObject().enable_category) & parseInt(bitmask)) != 0) {
              objectArray.push(objects[i]);
            }
          break;
          case "visible":
            if ((parseInt(objects[i].getObject().visible_category) & parseInt(bitmask)) != 0) {
              objectArray.push(objects[i]);
            }
          break;
          case "invisible":
            if ((parseInt(objects[i].getObject().invisible_category) & parseInt(bitmask)) != 0) {
              objectArray.push(objects[i]);
            }
          break;
        }

      }
      return objectArray;
    },
    findObjectUseBitmask_high_reverse: function(objects, bitmask, mode){
      var objectArray = new Array();
      for (var i in objects) {
        if (objects[i] == undefined)
          continue;
        if (objects[i].getObject() == undefined)
          continue;

        if($('.'+objects[i].id).css('display') == 'none')
        {
          continue;
        }

        switch(mode)
        {
          case "disabled":
            if ((parseInt(objects[i].getObject().disable_category_high) & parseInt(bitmask)) != 0) {
              objectArray.push(objects[i]);
            }
          break;
          case "enabled":
            if ((parseInt(objects[i].getObject().enable_category_high) & parseInt(bitmask)) != 0) {
              objectArray.push(objects[i]);
            }
          break;
          case "visible":
            if ((parseInt(objects[i].getObject().visible_category_high) & parseInt(bitmask)) != 0) {
              objectArray.push(objects[i]);
            }
          break;
          case "invisible":
            if ((parseInt(objects[i].getObject().invisible_category_high) & parseInt(bitmask)) != 0) {
              objectArray.push(objects[i]);
            }
          break;
        }

      }
      return objectArray;
    },
    findObjectUseBitmask: function(objects, bitmask){
      var objectArray = new Array();
      for (var i in objects) {
        if (objects[i] == undefined)
          continue;
        if (objects[i].getObject() == undefined)
          continue;

        if ((parseInt(objects[i].getObject().category) & parseInt(bitmask)) != 0) {
          objectArray.push(objects[i]);
        }
      }
      return objectArray;
    },
    findObjectUseBitmaskForDependent: function(objects, bitmask){
      var objectArray = new Array();
      for (var i in objects) {
        if (objects[i] == undefined)
          continue;
        if (objects[i].getObject() == undefined)
          continue;

        if ((parseInt(objects[i].getObject().dependent_category) & parseInt(bitmask)) != 0) {
          objectArray.push(objects[i]);
        }
      }
      return objectArray;
    },
    findObjectUseBitmaskForDependent_high: function(objects, bitmask){
      var objectArray = new Array();
      for (var i in objects) {
        if (objects[i] == undefined)
          continue;
        if (objects[i].getObject() == undefined)
          continue;

        if ((parseInt(objects[i].getObject().dependent_category_high) & parseInt(bitmask)) != 0) {
          objectArray.push(objects[i]);
        }
      }
      return objectArray;
    },
    initView: function(){
      $(".wide_dynamic_range").show();
      $('.exposure_iris').show();
      $('.exposure_gain').show();
      $('.exposure_gain').show();
      for (var i in this.imageObject)
      {
        if (this.imageObject[i] != undefined)
        {
          //$("." + this.imageObject[i].id).show();
          this.imageObject[i].clearObject();
        }
      }
      for (var i in this.imageObject_high)
      {
        if (this.imageObject_high[i] != undefined)
        {
          this.imageObject_high[i].clearObject();
        }
      }
      for (var i in this.exposureObject)
      {
        if (this.exposureObject[i] != undefined)
        {
          $("." + this.exposureObject[i].id).show();
          this.exposureObject[i].clearObject();
        }
      }
      for (var i in this.exposureObject_high)
      {
        if (this.exposureObject_high[i] != undefined)
        {
          $("." + this.exposureObject_high[i].id).show();
          this.exposureObject_high[i].clearObject();
        }
      }
      for (var i in this.focusObject)
      {
        if (this.focusObject[i] != undefined)
        {
          this.focusObject[i].clearObject();
        }
      }

    },
    callbackCh: function(index, dummy) {
      if (parseInt(index) != parseInt(me.select_ch))
        if (c.refreshHandler(index) )
          me.select_ch = me.ch.getValue();
        else
          me.ch.setValue(me.select_ch.toString());
    },
    callbackImageDropboxChange: function(index, object) {
      if (object.getObject() == null || object.getObject() == undefined)
        return;
      if (object.getObject().category == null)
        return;

      var targetObject;

      //low.
      targetObject = me.findObjectUseBitmask(me.imageObject, object.getObject().invisible_category);
      for (var i in targetObject) {
        if ( ((targetObject[i].getObject().category & object.getObject().dependent_category) != 0) &&
           ((targetObject[i].getObject().category & me.supported_image) != 0)) {
          $("." + targetObject[i].id).hide();
        }
      }
      targetObject = me.findObjectUseBitmask(me.imageObject, object.getObject().visible_category);
      for (var i in targetObject) {
        if ( (targetObject[i].getObject().category & object.getObject().dependent_category) != 0) {
          $("." + targetObject[i].id).show();
        }
      }
      targetObject = me.findObjectUseBitmask(me.imageObject, object.getObject().disable_category);
      for (var i in targetObject) {
        if ( (targetObject[i].getObject().category & object.getObject().dependent_category) != 0)
        {
          targetObject[i].setEnable(false);
        }
      }
      targetObject = me.findObjectUseBitmask(me.imageObject, object.getObject().enable_category);
      for (var i in targetObject) {
        if ( ((targetObject[i].getObject().category & me.supported_image) > 0) &&
        ((targetObject[i].getObject().category & object.getObject().dependent_category) != 0))
        targetObject[i].setEnable(true);
      }

      //high.
      targetObject = me.findObjectUseBitmask(me.imageObject, object.getObject().invisible_category_high);
      for (var i in targetObject) {
        if ( (targetObject[i].getObject().category_high & object.getObject().dependent_category_high) != 0) {
          $("." + targetObject[i].id).hide();
        }
      }
      targetObject = me.findObjectUseBitmask(me.imageObject, object.getObject().visible_category_high);
      for (var i in targetObject) {
        if ( (targetObject[i].getObject().category_high & object.getObject().dependent_category_high) != 0) {
          $("." + targetObject[i].id).show();
        }
      }
      targetObject = me.findObjectUseBitmask(me.imageObject, object.getObject().disable_category_high);
      for (var i in targetObject) {
        if ( (targetObject[i].getObject().category_high & object.getObject().dependent_category_high) != 0)
        {
          targetObject[i].setEnable(false);
        }
      }
      targetObject = me.findObjectUseBitmask(me.imageObject, object.getObject().enable_category_high);
      for (var i in targetObject) {
        if ( ((targetObject[i].getObject().category_high & me.supported_image) != 0) &&
        ((targetObject[i].getObject().category_high & object.getObject().dependent_category_high) != 0))
        targetObject[i].setEnable(true);
      }
    },
    callbackExposureDropboxChange: function(index, object) {
      if (object.getObject() == null || object.getObject() == undefined)
        return;
      if (object.getObject().category == null)
        return;

      var subTargetObject;
      var subTargetObject_high;

      //�겨�객체��서처리�� �습�다.
      if($('.'+object.id).css('display') == 'none')
      {
        return;
      }

      //low
      targetObject = me.findObjectUseBitmask(me.exposureObject, object.getObject().invisible_category);
      for (var i in targetObject) {
        if ( (targetObject[i].getObject().category & object.getObject().dependent_category) != 0) {
          $("." + targetObject[i].id).hide();
        }
      }
      targetObject = me.findObjectUseBitmask(me.exposureObject, object.getObject().visible_category);
      for (var i in targetObject) {
        if ( ((targetObject[i].getObject().category & object.getObject().dependent_category) != 0) &&
             ((targetObject[i].getObject().category & me.supported_exposure) != 0)) {
          $("." + targetObject[i].id).show();

          //object�invisible �키object�을 exposureObject, exposureObject_high�서 찾습�다.
          subTargetObject = me.findObjectUseBitmask_reverse(me.exposureObject, targetObject[i].getObject().category, "invisible");
          subTargetObject_high = me.findObjectUseBitmask_reverse(me.exposureObject_high, targetObject[i].getObject().category, "invisible");
          if(subTargetObject.length > 0 || subTargetObject_high.length > 0)
          {
            if(subTargetObject)
            {
              //object�invisible �키object가 1갴상 존재경우, object륤시 hide�킵�다.
              //console.log(object.id+" "+((targetObject[i].getObject().category & me.supported_exposure) != 0)+" [[2]hide(low)] "+targetObject[i].id)
              $("." + targetObject[i].id).hide();
            }
          }
        }
      }
      for(var i in targetObject) {
        subTargetObject =  me.findObjectUseBitmask(me.exposureObject, targetObject[i].getObject().invisible_category);
        for(var j in subTargetObject) {
          if ( (subTargetObject[j].getObject().category & targetObject[i].getObject().dependent_category) != 0) {
            $("." + subTargetObject[j].id).hide();
          }
        }
      }

      targetObject = me.findObjectUseBitmask(me.exposureObject, object.getObject().disable_category);
      for (var i in targetObject) {
          targetObject[i].setEnable(false);
      }

      targetObject = me.findObjectUseBitmask(me.exposureObject, object.getObject().enable_category);
      for (var i in targetObject) {
        if ( ((targetObject[i].getObject().category & me.supported_exposure) != 0)) {
          targetObject[i].setEnable(true);

          //�재 object�disabled�키것들exposureObject, exposureObject_high�서 찾습�다.
          subTargetObject = me.findObjectUseBitmask_reverse(me.exposureObject, targetObject[i].getObject().category, "disabled");
          subTargetObject_high = me.findObjectUseBitmask_reverse(me.exposureObject_high, targetObject[i].getObject().category, "disabled");

          //object�disabled�태롤정�는 객체가 �나�도 �다� disabled�태롤정�니
          //ircut��서reverse 체크류� �습�다.(ircutm문제롸함.)
          if((subTargetObject.length > 0) || (subTargetObject_high.length > 0) && object.id != 'ircut')
          {
            targetObject[i].setEnable(false);
          }
        }
      }
      for(var i in targetObject) {
        subTargetObject =  me.findObjectUseBitmask(me.exposureObject, targetObject[i].getObject().disable_category);
        for(var j in subTargetObject) {
          if ( (subTargetObject[j].getObject().category & targetObject[i].getObject().dependent_category) != 0) {
            subTargetObject[j].setEnable(false);
          }
        }
        subTargetObject =  me.findObjectUseBitmaskForDependent(me.exposureObject, targetObject[i].getObject().category);
        for(var j in subTargetObject) {
          if( ((subTargetObject[j].getObject().dependent_category & targetObject[i].getObject().category) != 0) &&
              ((subTargetObject[j].getObject().disable_category & targetObject[i].getObject().category) != 0) ){
            targetObject[i].setEnable(false);
          }
        }
      }

      //high
      targetObject = me.findObjectUseBitmask_high(me.exposureObject_high, object.getObject().invisible_category_high);
      for (var i in targetObject) {
        if ( (targetObject[i].getObject().category_high & object.getObject().dependent_category_high) != 0) {
          $("." + targetObject[i].id).hide();
        }
      }
      targetObject = me.findObjectUseBitmask_high(me.exposureObject_high, object.getObject().visible_category_high);
      for (var i in targetObject) {
        if ( ((targetObject[i].getObject().category_high & object.getObject().dependent_category_high) != 0) &&
            ((targetObject[i].getObject().category_high & me.supported_exposure_high) != 0)) {
          $("." + targetObject[i].id).show();

          //object�invisible �키object�을 exposureObject, exposureObject_high�서 찾습�다.
          subTargetObject = me.findObjectUseBitmask_high_reverse(me.exposureObject, targetObject[i].getObject().category_high, "invisible");
          subTargetObject_high = me.findObjectUseBitmask_high_reverse(me.exposureObject_high, targetObject[i].getObject().category_high, "invisible");

          if(subTargetObject.length > 0 || subTargetObject_high.length > 0)
          {
            //object�invisible �키object가 1갴상 존재경우, object륤시 hide�킵�다.
            $("." + targetObject[i].id).hide();
          }
        }
      }
      for(var i in targetObject) {
        subTargetObject =  me.findObjectUseBitmask(me.exposureObject_high, targetObject[i].getObject().invisible_category_high);
        for(var j in subTargetObject) {
          if ( (subTargetObject[j].getObject().category_high & targetObject[i].getObject().dependent_category_high) != 0) {
            $("." + subTargetObject[j].id).hide();
          }
        }
      }

      targetObject = me.findObjectUseBitmask_high(me.exposureObject_high, object.getObject().disable_category_high);
      for (var i in targetObject) {
        targetObject[i].setEnable(false);
      }

      targetObject = me.findObjectUseBitmask_high(me.exposureObject_high, object.getObject().enable_category_high);
      for (var i in targetObject) {
        if ( ((targetObject[i].getObject().category_high & me.supported_exposure_high) != 0)) {
          targetObject[i].setEnable(true);

          //�재 object�disabled�키것들exposureObject, exposureObject_high�서 찾습�다.
          subTargetObject = me.findObjectUseBitmask_high_reverse(me.exposureObject, targetObject[i].getObject().category_high, "disabled");
          subTargetObject_high = me.findObjectUseBitmask_high_reverse(me.exposureObject_high, targetObject[i].getObject().category_high, "disabled");
          //�나�도 object�disabled�태롤정�는 객체가 �다� disabled�태롤정�니
          if((targetObject[i].getObject().category_high > 0) && ((subTargetObject.length > 0) || (subTargetObject_high.length > 0)) && object.id != 'ircut')
          {
            targetObject[i].setEnable(false);
          }
        }
      }
      for(var i in targetObject) {
        subTargetObject =  me.findObjectUseBitmask_high(me.exposureObject_high, targetObject[i].getObject().disable_category_high);
        for(var j in subTargetObject) {
          if ( (subTargetObject[j].getObject().category_high & targetObject[i].getObject().dependent_category_high) != 0) {
            subTargetObject[j].setEnable(false);
          }
        }
        subTargetObject =  me.findObjectUseBitmaskForDependent_high(me.exposureObject_high, targetObject[i].getObject().category_high);
        for(var j in subTargetObject) {
          if( ((subTargetObject[j].getObject().dependent_category_high & targetObject[i].getObject().category_high) != 0) &&
              ((subTargetObject[j].getObject().disable_category_high & targetObject[i].getObject().category_high) != 0)
              && (document.getElementById(subTargetObject[j]) != null)){
            targetObject[i].setEnable(false);
          }
        }
      }

      //base shutter speed check
      var exposure_mode = parseInt(me.exposureObject.EXPOSURE_ONVIF_MODE.getValue());
      var antiflicker = parseInt(me.exposureObject.EXPOSURE_ANTI_FLICKER.getValue());
      var iris = parseInt(me.exposureObject.EXPOSURE_DCIRIS.getValue());
      var wdr_mode = parseInt(me.exposureObject.EXPOSURE_ONVIF_WDR_MODE.getValue());
      var analog_format = (INFO_CAMTYPE == "NTSC" ? 1:2);

      switch(parseInt(exposure_mode))
      {
        case 16:    //MANUAL
        case 128:   //AUTO
        case 1048576://HI_MANUAL
          break;
        case 524288:
          antiflicker = me.exposureObject_high.EXPOSURE_ANTI_FLICKER_AUTO_OFF.selected;
          break;
        case 2097152:
          antiflicker = me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION_OFF.selected;
          if(me.exposureObject_high.EXPOSURE_DCIRIS_MOTION.getObject() != undefined)
          {
            iris = me.exposureObject_high.EXPOSURE_DCIRIS_MOTION.selected;
          }
        default:
        break;
      }

      var baseshutterObject = null;

      var flag_exposure_mode = false;
      var flag_antiflicker = false;
      var flag_wdr_mode = false;
      var flag_iris_ctrl = false;
      var flag_analog_format = false;

      me.present_base_shutter = 0;

      for(var i=0; i<me.baseShutterSpeedTable.length; i++)
      {
        baseshutterObject = me.findObjectUseBitmask_high(me.exposureObject_high, me.baseShutterSpeedTable[i][5].high);

        //make base shutter table flag start
        flag_exposure_mode = ((parseInt(me.baseShutterSpeedTable[i][0].low) & exposure_mode));
        flag_iris_ctrl = ((parseInt(me.baseShutterSpeedTable[i][1].low) & iris));
        flag_wdr_mode = ((parseInt(me.baseShutterSpeedTable[i][2].low) & wdr_mode));
        flag_antiflicker = ((parseInt(me.baseShutterSpeedTable[i][3].low) & antiflicker));
        flag_analog_format = ((parseInt(me.baseShutterSpeedTable[i][4].low) & analog_format));

        if(iris == null || isNaN(iris)) //iris is not support.
        {
          flag_iris_ctrl = true;
        }

        //console.log(flag_exposure_mode+" "+flag_antiflicker+" "+flag_wdr_mode+" "+flag_iris_ctrl+" "+flag_analog_format+" ["+me.baseShutterSpeedTable[i][5].high+"]");
        //make base shutter table flag end

        if(flag_exposure_mode
          && flag_antiflicker
          && flag_wdr_mode
          && flag_iris_ctrl
          && flag_analog_format
          && (me.present_base_shutter == 0 && me.baseShutterSpeedTable[i][5] != 0)
          )
        {
          me.present_base_shutter = me.baseShutterSpeedTable[i][5].high;
        }

        if(me.present_base_shutter == 0)
        {
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_50.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_60.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_100.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_120.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_100_300.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_100_5000.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_120_360.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_120_5000.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_120_262.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_30_262.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_25_100.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_25_300.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_25_5000.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_30_120.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_30_360.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_30_5000.id).hide();

          if(((me.exposureObject_high.EXPOSURE_BASE_SHUTTER_120_5000.getObject() != undefined) && ((me.supported_exposure_high & me.exposureObject_high.EXPOSURE_BASE_SHUTTER_120_5000.getObject().category_high) > 0)))
          {
            $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_120_5000.id).show();
            me.exposureObject_high.EXPOSURE_BASE_SHUTTER_120_5000.setEnable(false);
          }
        }
        else if(me.present_base_shutter >= 8192 && me.present_base_shutter <= 268435456)
        {
          //baseshutter hide start
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_50.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_60.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_100.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_120.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_100_300.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_100_5000.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_120_360.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_120_5000.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_120_262.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_30_262.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_25_100.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_25_300.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_25_5000.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_30_120.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_30_360.id).hide();
          $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_30_5000.id).hide();
          //baseshutter hide end

          switch(me.present_base_shutter)
          {
            case '8192': //BASE SHUTTER 50
              $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_50.id).show();
            break;
            case '16384': //BASE SHUTTER 60
              $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_60.id).show();
            break;
            case '32768': //BASE SHUTTER 100
              $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_100.id).show();
            break;
            case '65536': //BASE SHUTTER 120
              $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_120.id).show();
            break;
            case '131072': //BASE SHUTTER 100_300
              $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_100_300.id).show();
            break;
            case '262144': //BASE SHUTTER 100_5000
              $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_100_5000.id).show();
            break;
            case '524288': //BASE SHUTTER 120_360
              $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_120_360.id).show();
            break;
            case '1048576': //BASE SHUTTER 120_5000
              $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_120_5000.id).show();
              me.exposureObject_high.EXPOSURE_BASE_SHUTTER_120_5000.setEnable(true);
            break;
            case '2097152': //BASE SHUTTER 120_262
              $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_120_262.id).show();
            break;
            case '4194304': //BASE SHUTTER 30_262
              $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_30_262.id).show();
            break;
            case '8388608': //BASE SHUTTER 25_100
              $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_25_100.id).show();
            break;
            case '16777216': //BASE SHUTTER 25_300
              $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_25_300.id).show();
            break;
            case '33554432': //BASE SHUTTER 25_5000
              $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_25_5000.id).show();
            break;
            case '67108864': //BASE SHUTTER 30_120
              $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_30_120.id).show();
            break;
            case '134217728': //BASE SHUTTER 30_360
              $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_30_360.id).show();
            break;
            case '268435456': //BASE SHUTTER 30_5000
              $("."+me.exposureObject_high.EXPOSURE_BASE_SHUTTER_30_5000.id).show();
            break;
          }
        }
      }
      //base shutter speed check

      //mode��외처리.
      //ircut, ircutmonChange른출�니
      if(object.id == 'mode')
      {
        //초기�에onChange른출�� �습�다.
        if(me.exposureObject.EXPOSURE_ONVIF_IRCUT.selected == me.exposureObject.EXPOSURE_ONVIF_IRCUT.getValue())
        {
          me.exposureObject.EXPOSURE_ONVIF_IRCUT.onChange();
          me.exposureObject_high.EXPOSURE_ONVIF_IRCUT_M.onChange();
        }

        if(me.exposureObject.EXPOSURE_ANTI_FLICKER.selected == me.exposureObject.EXPOSURE_ANTI_FLICKER.getValue()
          || me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION.selected == me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION.getValue()
          || me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION_OFF.selected == me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION_OFF.getValue()
          || me.exposureObject_high.EXPOSURE_ANTI_FLICKER_AUTO_OFF.selected == me.exposureObject_high.EXPOSURE_ANTI_FLICKER_AUTO_OFF.getValue()){
          me.exposureObject.EXPOSURE_ANTI_FLICKER.onChange();
          me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION.onChange();
          me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION_OFF.onChange();
          me.exposureObject_high.EXPOSURE_ANTI_FLICKER_AUTO_OFF.onChange();
        }
      }

      if( (((me.supported_exposure & 1<<19 != 0))
        || ((me.supported_exposure & 1<<20 != 0))
        || ((me.supported_exposure & 1<<21 != 0))
        || ((me.supported_exposure_high & 1<<4 != 0))
        || ((me.supported_exposure_high & 1<<7 != 0))
        || ((me.supported_exposure_high & 1<<8 != 0))
        || ((me.supported_exposure_high & 1<<9 != 0))
        || ((me.supported_exposure_high & 1<<10 != 0))
        )  //if max shutter speed is supported
        && (
          $("."+me.exposureObject.EXPOSURE_MAX_SHUTTER_OFF.id).css('display') == 'none'
          && $("."+me.exposureObject.EXPOSURE_MAX_SHUTTER_50.id).css('display') == 'none'
          && $("."+me.exposureObject.EXPOSURE_MAX_SHUTTER_60.id).css('display') == 'none'
          && $("."+me.exposureObject_high.EXPOSURE_MAX_SHUTTER_MOTION_OFF.id).css('display') == 'none'
          && $("."+me.exposureObject_high.EXPOSURE_MAX_SHUTTER_MOTION_OFF_ON.id).css('display') == 'none'
          && $("."+me.exposureObject_high.EXPOSURE_MAX_SHUTTER_AUTO_OFF_OFF.id).css('display') == 'none'
          && $("."+me.exposureObject_high.EXPOSURE_MAX_SHUTTER_AUTO_OFF_ON_TV.id).css('display') == 'none'
          && $("."+me.exposureObject_high.EXPOSURE_MAX_SHUTTER_AUTO_OFF_ON.id).css('display') == 'none'
          )
        )
      {
        $("."+me.exposureObject.EXPOSURE_MAX_SHUTTER_60.id).show();
      }
    },
    callbackModeChange: function(index, object) {
      if(object.getObject().caption.indexOf(me.supportMultiLanguage("MANUAL")) >= 0) //exposure mode: manual
      {
        me.exposureObject.EXPOSURE_ONVIF_WDR_MODE.setValue(me.exposureObject.EXPOSURE_ONVIF_WDR_MODE.getValueByCaption(me.supportMultiLanguage("OFF")));
      }
      me.callbackExposureDropboxChange(index, object);
    },
    callbackAntiflickerChange: function(index, object) {
      if(object.id != me.exposureObject.EXPOSURE_ANTI_FLICKER.id)
      {
        me.exposureObject.EXPOSURE_ANTI_FLICKER.setValueWithoutChange(object.getValue());
      }

      if(object.id != me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION.id)
      {
        me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION.setValueWithoutChange(object.getValue());
      }

      if(object.id != me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION_OFF.id)
      {
        me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION_OFF.setValueWithoutChange(object.getValue());
      }

      if(object.id != me.exposureObject_high.EXPOSURE_ANTI_FLICKER_AUTO_OFF.id)
      {
        me.exposureObject_high.EXPOSURE_ANTI_FLICKER_AUTO_OFF.setValueWithoutChange(object.getValue());
      }

      me.callbackExposureDropboxChange(index, object);
    },
    callbackWDRChange: function(index, object) {
      var captionToSet = me.supportMultiLanguage("OFF");
      if(object.getObject().caption.indexOf(me.supportMultiLanguage("ON")) >= 0)
      {
        if(me.exposureObject.EXPOSURE_SLOWSHUTTER.selected == me.exposureObject.EXPOSURE_SLOWSHUTTER.getValue())
        {
          me.exposureObject.EXPOSURE_SLOWSHUTTER.setValue(me.exposureObject.EXPOSURE_SLOWSHUTTER.getValueByCaption(captionToSet));
        }
        if(me.exposureObject.EXPOSURE_ANTI_FLICKER.selected == me.exposureObject.EXPOSURE_ANTI_FLICKER.getValue())
        {
          me.exposureObject.EXPOSURE_ANTI_FLICKER.setValue(me.exposureObject.EXPOSURE_ANTI_FLICKER.getValueByCaption(captionToSet));
        }
        if(me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION.selected == me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION.getValue())
        {
          me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION.setValue(me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION.getValueByCaption(captionToSet));
        }
        if(me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION_OFF.selected == me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION_OFF.getValue())
        {
          me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION_OFF.setValue(me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION_OFF.getValueByCaption(captionToSet));
        }
        if(me.exposureObject_high.EXPOSURE_ANTI_FLICKER_AUTO_OFF.selected == me.exposureObject_high.EXPOSURE_ANTI_FLICKER_AUTO_OFF.getValue())
        {
          me.exposureObject_high.EXPOSURE_ANTI_FLICKER_AUTO_OFF.setValue(me.exposureObject_high.EXPOSURE_ANTI_FLICKER_AUTO_OFF.getValueByCaption(captionToSet));
        }
        if(me.exposureObject.EXPOSURE_ONVIF_BLC_MODE.selected == me.exposureObject.EXPOSURE_ONVIF_BLC_MODE.getValue())
        {
          me.exposureObject.EXPOSURE_ONVIF_BLC_MODE.setValue(me.exposureObject.EXPOSURE_ONVIF_BLC_MODE.getValueByCaption(captionToSet));
        }
        if(me.exposureObject_high.EXPOSURE_ONVIF_DEFOG.selected == me.exposureObject_high.EXPOSURE_ONVIF_DEFOG.getValue())
        {
          me.exposureObject_high.EXPOSURE_ONVIF_DEFOG.setValue(me.exposureObject_high.EXPOSURE_ONVIF_DEFOG.getValueByCaption(captionToSet));
        }
      }
      me.callbackExposureDropboxChange(index, object);
    },
    callbackMaxShutterChange: function(index, object) {
      var list_base_shutter = me.findObjectUseBitmask_high(me.exposureObject_high, me.present_base_shutter);

      if((me.present_base_shutter != 0) && (me.present_base_shutter != null) && (parseInt(object.selected) > parseInt(list_base_shutter[0].selected)) && (object.selected != object.pre_selected))
      {
        object.selected = object.pre_selected;
        this.select.val(object.selected);
        alert(langArray['LTXT_MAX_BASE_SHUTTER_SPEED_ALERT']);
      }

      setTimeout(function(){me.callbackExposureDropboxChange(index, object);}, 1000);
      //console.log('max shutter [pre: '+object.pre_selected+'][sel: '+object.selected+'][base: '+list_base_shutter[0].selected+']')
    },
    callbackBaseShutterChange: function(index, object) {
      var exposure_mode = me.exposureObject.EXPOSURE_ONVIF_MODE.selected;
      var antiflicker = 0; //antiflicker value
      var maxshutter = 0;  //maxshutter value
      var wdr = me.exposureObject.EXPOSURE_ONVIF_WDR_MODE.selected;

      switch(exposure_mode)
      {
        case '262144':
          antiflicker = me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION.selected;
          break;
        case '524288':
          antiflicker = me.exposureObject_high.EXPOSURE_ANTI_FLICKER_AUTO_OFF.selected;
          break;
        case '2097152':
          antiflicker = me.exposureObject_high.EXPOSURE_ANTI_FLICKER_MOTION_OFF.selected;
        case '16':    //MANUAL
        case '128':   //AUTO
        case '1048576'://HI_MANUAL
        default:
          antiflicker = me.exposureObject.EXPOSURE_ANTI_FLICKER.selected;
          break;
        break;
      }

      switch(antiflicker)
      {
        case '1':
          maxshutter = me.exposureObject.EXPOSURE_MAX_SHUTTER_50.selected;
        break;
        case '2':
          maxshutter = me.exposureObject.EXPOSURE_MAX_SHUTTER_60.selected;
        break;
        case '4':
          if(exposure_mode == '262144' || exposure_mode == '2097152')
          {
            if(wdr == '16777216')  //wdr off
            {
              maxshutter = me.exposureObject_high.EXPOSURE_MAX_SHUTTER_MOTION_OFF.selected;
            }
            else
            {
              maxshutter = me.exposureObject_high.EXPOSURE_MAX_SHUTTER_MOTION_OFF_ON.selected;
            }
          }
          else if(exposure_mode == '524288')
          {
            if(wdr == '16777216')
            {
              maxshutter = me.exposureObject_high.EXPOSURE_MAX_SHUTTER_AUTO_OFF_OFF.selected;
            }
            else
            {
              maxshutter = me.exposureObject.EXPOSURE_MAX_SHUTTER_OFF.selected;
            }
          }
          else
          {
            maxshutter = me.exposureObject.EXPOSURE_MAX_SHUTTER_OFF.selected;
          }
        break;

        default:
        break;
      }

      if((this.getObject().category_high == me.present_base_shutter) && (parseInt(this.selected) < parseInt(maxshutter)))
      {
        this.selected = object.pre_selected;
        this.select.val(object.selected);
        alert(langArray['LTXT_MAX_BASE_SHUTTER_SPEED_ALERT']);
      }
    },
    callbackOneButton:function(_id) {
      me.callButtonCmd("image_focus_one_push");
    },
    callbackHomeButton:function(_id) {
      me.callButtonCmd("image_focus_home");
    },
    callbackFocusNearButton:function(_id) {
      me.callButtonCmd("image_focus_near");
    },
    callbackFocusFarButton:function(_id) {
      me.callButtonCmd("image_focus_far");
    },
    callbackIrisCalButton:function(_id) {
      me.callButtonCmd("exposure_iris_cal");
    },
    callbackCopySettingButton:function(_id) {
      var activex = document.getElementById("itxview");
      if (activex) {
        try {
          var ret = activex.SessionClose();
        } catch (e) {}
      }
      $("#dialog_copy_setting").dialog('open');
    },
    callbackConnectSettingButton:function(_id) {
      var activex = document.getElementById("itxview");
      if (activex) {
        try {
          var ret = activex.SessionClose();
        } catch (e) {}
      }
      $("#dialog_camera_onoff").dialog('open');
    },
    callbackStreamPresetButton:function(_id) {
      alert("callbackStreamPresetButton");
    },
    callbackConfigureStartButton:function(_id) {
      alert("callbackConfigureStartButton");
    },
    callbackDnnSensitivity: function(event)
    {
      if(this.id.indexOf('dnn_sense') >= 0)
      {
        for(var i in CompatibilityExposureObject)
        {
          if(CompatibilityExposureObject[i].getObject()
            && ((CompatibilityExposureObject[i].getObject().category & this.getObject().dependent_category) != 0))
          {
            if(CompatibilityExposureObject[i].id == 'dnn_sense_ntod')
            {
              var ntod = $('#'+CompatibilityExposureObject[i].id+'_slider').slider("value");
              var dton = this.options.curValue;

              if(dton - ntod > this.getObject().difference)
              {
                var _value = parseInt(ntod) + parseInt(this.getObject().difference);
                event.preventDefault();
                this.setValueWithoutChange(_value);

                alert(
                  (langArray['LTXT_DNN_NOTICE_1'])
                 +"\n"
                 +(langArray['LTXT_DNN_NOTICE_2']));
              }
            }
          }
        }
        for(var i in CompatibilityExposureObject_high)
        {
          if(CompatibilityExposureObject_high[i].getObject()
            && ((CompatibilityExposureObject_high[i].getObject().category_high & this.getObject().dependent_category_high) != 0))
          {
            if(CompatibilityExposureObject_high[i].id == 'dnn_sense_dton')
            {
              var dton = $('#'+CompatibilityExposureObject_high[i].id+'_slider').slider("value");
              var ntod = this.options.curValue;

              if(ntod - dton < this.getObject().difference)
              {
                var _value = parseInt(dton) + parseInt(this.getObject().difference);
                event.preventDefault();
                this.setValueWithoutChange(_value);

                alert(
                  (langArray['LTXT_DNN_NOTICE_1'])
                 +"\n"
                 +(langArray['LTXT_DNN_NOTICE_2']));
              }
            }
          }
        }
      }
    },
    callButtonCmd: function(_cmd) {
      var my = this;
      if (this.btnCmd)
        return false;

      c.sendButtonCmd(me.select_ch, _cmd);

      // var func = function() {c.sendButtonCmd(me.select_ch, _cmd)};
      // if (this.interval != undefined)
      //   return false;
      // this.test = 30;
      // this.btnCmd = true;
      // this.interval = setInterval(func ,1000);
      // setTimeout(this.clearButtonCmd, 30000);
    },
    checkResponse:function(response) {
      if (response == null || response == undefined)
        return true;

      if (response == 'DVR In Setup!') {
        alert(langArray['LTXT_ERR_DVRINSETUP']);
        this.clearButtonCmd();
        return true;
      }
      if (response == 'DVR In Arch!') {
        alert(langArray['LTXT_ERR_DVRINARCH']);
        this.clearButtonCmd();
        return true;
      }
      if (response == 'DVR In SCM not ready!') {
        alert(langArray['LTXT_ERR_NVR_NOT_READY']);
        this.clearButtonCmd();
        return true;
      }
      if (response == 'fail') {
        alert("FAIL!");
        this.clearButtonCmd();
        return true;
      }
      //$("#test_text").text(this.test--);
      if (this.test < 0) {
        this.clearButtonCmd();
        return true;
      }
      switch (response) {
      case 0:
        this.clearButtonCmd();
        return true;
      case '1':
        this.clearButtonCmd();
        return true;
      case '2':
        if (this.interval == null)
          return true;
        //axHandler.hide(true);
        //fillWindowForModal("dialog_wait");

        return false;
      case '3':
        if (this.interval == null)
          return true;
        //axHandler.hide(true);
        //fillWindowForModal("dialog_wait");
        return false;
      case '4':
        this.clearButtonCmd();
        //alert("REQUIREMENT FAILED!");
      case '5':
        this.clearButtonCmd();
        //alert("TIME OUT!");
        return true;
      default:
        this.clearButtonCmd();
        return true;
      }
    },
    clearButtonCmd: function () {
      if (this.btnCmd) {
        if (this.interval != undefined && this.interval != null) {
          clearInterval(this.interval);
          this.interval = null;
           hideModal();
          //axHandler.setForce(false);
          //axHandler.appendTo("#image_preview");
        }
        this.btnCmd = false;
      }
    },
    cpSettingOpenHandler: function (response) {
      $("#cpCheckBoxAll").removeAttr("disabled");
      for ( var i = 0; i < INFO_DVRCHANNEL; i++) {
        if (response["model" + i ] == "Not connected") {
          $("#cpModel" + i).text(langArray["LTXT_SETUPCAMCAMSETUP_NOT_CONNECTED"]);
        } else {
          $("#cpModel" + i).text(response["model"+i]);
        }
        $("#cpSwver" + i).text(response["swver"+i]);
        if (i != parseInt(response['ch'])) {
          if (parseInt(response['enable'+i])) {
            $("#cpCheckBox" + i).removeAttr("disabled");
          }
        }
        else {
          $("#cpCheckBox"+i).prop('checked', true);
        }
      }
    },
    sendCopyTo: function(array) {
      if (this.saveflag != 0)
        return;

      me.saveflag = array.length;
      this.saveArray = array;
      setTimeout(this.sendCopyTimer, 50);
    },
    sendCopyToPrintResult: function (response) {
      if (response == 'DVR In Setup!') {
        $("#copy_to_progress").text(langArray['LTXT_ERR_DVRINSETUP']);
        this.saveflag = -1;
        return false;
      }
      if (response == 'DVR In Arch!') {
        $("#copy_to_progress").text(langArray['LTXT_ERR_DVRINARCH']);
        this.saveflag = -1;
        return false;
      }
      if (response == 'DVR In SCM not ready!') {
        $("#copy_to_progress").text(langArray['LTXT_ERR_NVR_NOT_READY']);
        this.saveflag = -1;
        return false;
      }
    },
    sendCopyTimer : function () {
      if (me.saveflag < 0 ) {
        me.saveflag = 0;
        return;
      }
      else if (me.saveflag == 0) {
        $("#copy_to_progress").text(langArray["LTXT_ERR_SUCCESS"]);
      }
      else if (me.saveflag > 0) {
        $("#copy_to_progress").text(langArray["LTXT_MSG_RUN"] + (me.saveArray[(me.saveArray.length - me.saveflag)] + 1));
        c.sendCopyTo(me.saveArray[(me.saveArray.length - me.saveflag)]);
        me.saveflag--;
        setTimeout(me.sendCopyTimer, 50);
      }
    }
  },
  CamCovert : {
    init: function() {
      $('input[id^="iAllChk"]').prop('checked', false);

      function _changeHandlerGenerator(param_id) {
        return function(){
          var flag_all_checked = true;
          for(var i=0; i<INFO_DVRCHANNEL; i++) {
            if($('#cv_'+param_id+i).prop('checked') == false) {
              flag_all_checked = false;
            }
          }

          if(flag_all_checked == true) {
            $('#iAllChk'+param_id.charAt(0).toUpperCase()+param_id.slice(1)).prop('checked', 'checked');
          } else {
            $('#iAllChk'+param_id.charAt(0).toUpperCase()+param_id.slice(1)).prop('checked', false);
          }
        }
      }

      for( var i=0; i<INFO_DVRCHANNEL; i++) {
        $('#cv_admin'+i).change(_changeHandlerGenerator('admin'));
        $('#cv_manager'+i).change(_changeHandlerGenerator('manager'));
        $('#cv_user'+i).change(_changeHandlerGenerator('user'));
        $('#cv_logoff'+i).change(_changeHandlerGenerator('logoff'));
      }

    },
    update: function(array) {
      var flag_all_checked_admin = true;
      var flag_all_checked_manager = true;
      var flag_all_checked_user = true;
      var flag_all_checked_logoff = true;

      for( var i=0 ; i < INFO_DVRCHANNEL ; i++ ) {

        $('#cv_admin'+i).prop('checked', array['cv_admin'+i] == '1' ? true : false );
        if($('#cv_admin'+i).prop('checked') == false) {
          flag_all_checked_admin = false;
        }
        $('#cv_manager'+i).prop('checked', array['cv_manager'+i] == '1' ? true : false );
        if($('#cv_manager'+i).prop('checked') == false) {
          flag_all_checked_manager = false;
        }
        $('#cv_user'+i).prop('checked', array['cv_user'+i] == '1' ? true : false );
        if($('#cv_user'+i).prop('checked') == false) {
          flag_all_checked_user = false;
        }
        $('#cv_logoff'+i).prop('checked', array['cv_logoff'+i] == '1' ? true : false );
        if($('#cv_logoff'+i).prop('checked') == false) {
          flag_all_checked_logoff = false;
        }


        if((array['cv_admin'+i] == '1' && array['login_group'] == 'ADMIN')
          || (array['cv_manager'+i] == '1' && array['login_group'] == 'MANAGER')
          || (array['cv_user'+i] == '1' && array['login_group'] == 'USER')
          || (array['act_novideo'].charAt(i) == '1'))
        {
          $('#ch'+(i+1)).text('CAM'+(i+1));
        }

      }

      if(flag_all_checked_admin == true) {
        $('#iAllChkAdmin').prop('checked', 'checked');
      }
      else {
        $('#iAllChkAdmin').prop('checked', false);
      }

      if(flag_all_checked_manager == true) {
        $('#iAllChkManager').prop('checked', 'checked');
      }
      else {
        $('#iAllChkManager').prop('checked', false);
      }

      if(flag_all_checked_user == true) {
        $('#iAllChkUser').prop('checked', 'checked');
      }
      else {
        $('#iAllChkUser').prop('checked', false);
      }

      if(flag_all_checked_logoff == true) {
        $('#iAllChkLogoff').prop('checked', 'checked');
      }
      else {
        $('#iAllChkLogoff').prop('checked', false);
      }

      $('#cvt_disp0').val(array['cvt_disp0']);
      $('#cvt_disp1').val(array['cvt_disp1']);
      $('#cvt_disp2').val(array['cvt_disp2']);
      $('#cvt_disp3').val(array['cvt_disp3']);
    }
  },
  CamMotion : {
    col : 12,
    row : 6,
    area_interval: null,
    motionWidget: {},
    currentCh: 0,
    targetCh: 0,
    check_ie : true, // for IE8

    init: function() {

      function _actEventHandlerGenerator(param_ch) {
        return function(event) {
          if($(this).val() == 0) {
            $("#detect"+(param_ch+1)).attr("disabled", "disabled");
          } else {
            $("#detect"+(param_ch+1)).removeAttr("disabled");
          }
        }
      }

      var chlist = [];
      check_ie = true;
      $("#motion-tab").tabs();

      $("#motion-tab").tabs("select", 1);

      $('#c_sp_div_menubar_sub').show();
      $('#c_sp_div_contents').show();
      area_interval = new SliderSpinner("interval");
      $("#motion-tab").tabs("select", 0);
      $('#c_sp_div_menubar_sub').hide();
      $('#c_sp_div_contents').hide();

      area_interval.setMinMaxValue(1, 100);
      area_interval.setValue(1); // init

/*
      $("#slider-sense_d").slider({
        min: 1,
        max: 10,
        slide: function( event, ui ) {
          $( "#sense_d" ).spinner("value", ui.value );
        }
      });

      $("#sense_d").spinner({
        min: 1,
        max: 10,
        spinner: function( event, ui ) {
          $( "#slider-sense_d" ).slider("value", ui.value );
        }
      });

      $("#slider-sense_n").slider({
        min: 1,
        max: 10,
        slide: function( event, ui ) {
          $( "#sense_d" ).spinner("value", ui.value );
        }
      });

      $("#sense_n").spinner({
        min: 1,
        max: 10,
        increment: 'fast',
        spinner: function( event, ui ) {
          $( "#slider-sense_n" ).slider("value", ui.value );
        }
      });


      $('#c_sp_div_menubar_sub').show();
      $('#c_sp_div_contents').show();
      $("#motion-tab").tabs("select", 1);

      var sense_n = new SliderSpinner("sense_n").setMinMaxValue(1,10);

      $('#c_sp_div_menubar_sub').hide();
      $('#c_sp_div_contents').hide();
      $("#motion-tab").tabs("select", 0);
*/

      for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
        chlist[ch] = ch+1;

        $('#act'+(ch+1)).change(_actEventHandlerGenerator(ch));
      }
      makeSelectOptions($('select#chno'), chlist);

      this.registerEvent();
    },
    registerEvent: function(len) {
      var v = this;
      var len = len;

      $('#chno').change(function(event, ui) {
        var c = $z.current;
        if(check_ie == true) {
          if (!c.m.compareAreaDataChange(v.currentCh)) {
            if (!confirm(langArray['LTXT_CONFIGURATION_UNSAVED'])) {
              $('#chno').val("" + v.currentCh);
              if(getInternetExplorerVersion() < 9)
                check_ie = false;
              return;
            }
          }
          if (!c.checkMinBlock()) {
            $('#chno').val("" + v.currentCh);
              if(getInternetExplorerVersion() < 9)
              check_ie = false;
            return;
          }
        }

        if(check_ie == false) {
          check_ie = true;
          return;
        }


        var ch = parseInt($(event.target).val());
        v.currentCh = ch;
        v.targetCh = ch;
        c.refreshHandler(ch);
      });

      $('#selectall').click(function(event,ui) {
        v.motionWidget.updateMblockAll('1');
      });


      $('#reverseall').click(function(event,ui) {
        v.motionWidget._updateMblockReverse();
      });

      $('#deleteall').click(function(event,ui) {
        v.motionWidget.updateMblockAll('0');
      });

      $("#activation_tab").click(function(event, ui) {
        var c = $z.current;
        if (!c.checkMinBlock()) {
          $( "#motion-tab" ).tabs( "option", "selected", 1 );
        }

      });
    },
    updateSnapshot: function(url) {
      $("#mimgid").attr("src", url);
    },
    update: function(array) {
      var ch = parseInt(array['chno']);

      $('select#chno').val(ch);
      $('select#act').val(array['act']);
      $('select#detect').val(array['detect']);

      for( var i=0 ; i < INFO_DVRCHANNEL; i++ ) {
        var c = i+1;
        $('select#act'+c).val(array['act'+c]);
        $('select#act'+c).change();
        $('select#detect'+c).val(array['detect'+c]);

        if((array['cv_admin'+i] == '1' && array['login_group'] == 'ADMIN')
          || (array['cv_manager'+i] == '1' && array['login_group'] == 'MANAGER')
          || (array['cv_user'+i] == '1' && array['login_group'] == 'USER')
          || (array['act_novideo'].charAt(i) == '1'))
        {
          $('#cam'+(i+1)).text('CAM'+(i+1));
        }
      }

      var _setting_motion_area_for_nvr = function() {
        $("#sense_d").empty();
        $("#sense_n").empty();
        $("#mini_d").empty();
        $("#mini_n").empty();
        
        // cam_sensmin0
        for( var i=array['cam_sensmin'+ch] ; i <= array['cam_sensmax'+ch] ; i++ ) {
          $("#sense_d").append($("<option>", { value: i, text: i}));
          $("#sense_n").append($("<option>", { value: i, text: i}));
        }


        for( var i=array['cam_bl_min'+ch] ; i <= array['cam_bl_num'+ch] ; i++ ) {
          $("#mini_d").append($("<option>", { value: i, text: i}));
          $("#mini_n").append($("<option>", { value: i, text: i}));
        }

        $('select#time_start').val(array['time_start']);
        $('select#time_end').val(array['time_end']);

        $('select#sense_d').val(array['sense_d']);
        $('select#mini_d').val(array['mini_d']);

        $('select#spatial_d').val(array['spatial_d']);
        $('select#temporal_d').val(array['temporal_d']);
        $('select#velocity_d').val(array['velocity_d']);

        $('select#sense_n').val(array['sense_n']);
        $('select#mini_n').val(array['mini_n']);
      }

      if( INFO_MODEL.indexOf("IPX") >= 0) {
        _setting_motion_area_for_nvr();
      }
      else if( INFO_MODEL.indexOf("ATM") >= 0 || INFO_MODEL.indexOf("ANF") >= 0  || INFO_MODEL.indexOf("UTM") >= 0 ) {
          $("#sense_d").empty();
          $("#sense_n").empty();
          for( var i=1 ; i <= 30 ; i++ ) {
            $("#sense_d").append($("<option>", { value: i, text: i}));
            $("#sense_n").append($("<option>", { value: i, text: i}));
          }

          $("#mini_d").empty();
          $("#mini_n").empty();
          for( var i=1 ; i <= 30 ; i++ ) {
            $("#mini_d").append($("<option>", { value: i, text: i}));
            $("#mini_n").append($("<option>", { value: i, text: i}));
          }
          $('#lang_min_block').remove();
          $('#mini_d').remove();
          $('#mini_n').remove();

          $('select#time_start').val(array['time_start']);
          $('select#time_end').val(array['time_end']);

          $('select#sense_n').val(array['sense_n']);
          $('select#sense_d').val(array['sense_d']);
      }

      area_interval.setValue(array['interval']);

      $('select#spatial_n').val(array['spatial_n']);
      $('select#temporal_n').val(array['temporal_n']);
      $('select#velocity_n').val(array['velocity_n']);

      $('.warning_not_itx_cam').hide();
      if (array['cam_is_itx_cam' + ch] == 0 && array['conn' + ch] == 1) {
        $('.warning_not_itx_cam').show();
      }

      // draw motion blocks
      var area = array['area'];
      var cols = parseInt(array['cam_blockw'+ch]);
      var rows = parseInt(array['cam_blockh'+ch]);
      var mam = parseInt(array['cam_area_method'+ch]);

      if( INFO_MODEL.indexOf("_HDI") >= 0 ) {
        cols = 20;
        rows = 18;
      } else if( INFO_MODEL.indexOf("ANF5G") >= 0 || INFO_MODEL.indexOf("5X") >= 0 || INFO_MODEL.indexOf("5HG") >= 0) {
        if(array['analogtype'+ch] != undefined && parseInt(array['analogtype'+ch]) != 8) {
          cols = 22;
          if(INFO_CAMTYPE.indexOf("NTSC") >= 0) {
            rows = 15;
          } else {
            rows = 18;
          }
        } else if(array['analogtype'+ch] != undefined && parseInt(array['analogtype'+ch]) == 8) {
          _setting_motion_area_for_nvr();
        } else {
          cols = 12;
          rows = 8;
        }
      } else if( INFO_MODEL.indexOf("ATM_") >= 0 || INFO_MODEL.indexOf("ANF_") >= 0 ) {
        cols = 16;
        rows = 12;
      } else if (INFO_MODEL.indexOf("_HDS") >= 0 ) {
        cols = 48;
        rows = 24;
      } else {
        if ( cols == 0 || rows == 0 ) {
          cols = 12;
          rows = 8;
        }
      }


      $('.area_setup').removeAttr('disabled');
      area_interval.setEnable(true);

      switch(mam) {
      case 1: // rect
      case 3: // cell
        //case 4: // raw stream // TODO test
        this.motionWidget = new MotionLayerWidget(
            '#mblock',
            {
              cols:cols,
              rows:rows,
              selectLimit:parseInt(array['cam_rect_num'+ch]),
              img:$("#mimgid"),
              msgOverflow: langArray['LTXT_MOTION_OVERFLOW'],
              callback: this.updateArea
            }
        );

        $('#mini_d').attr('disabled', 'disabled');
        $('#mini_n').attr('disabled', 'disabled');

        this.motionWidget.updateMblock(array);
        break;
      case 2: // polygon (yet)
        //TODO
        break;
      case 0:
        if (this.motionWidget.elem) {
          this.motionWidget.updateMblockAll('0');
          this.motionWidget.elem.selectable('destroy');
        }
        $('.area_setup').attr('disabled', 'disabled');
        area_interval.setEnable(false);
        break;
      case 4: // raw stream
      default:
        this.motionWidget = new MotionCellWidget(
            '#mblock',
            {
              cols:cols,
              rows:rows,
              selectLimit:0,
              img:$("#mimgid"),
              callback: this.updateArea
            }
        );
        if((array['cam_bl_min'+ch] == 0) || array['cam_is_itx_cam'+ch] == 0) {
          $('#mini_d').attr('disabled', 'disabled');
          $('#mini_n').attr('disabled', 'disabled');
        }

        this.motionWidget.updateMblock(array);
      break;
      }
    },
    updateArea: function(data) {
      var c = $z.current;
      c.blockChanged(data);
    }
  },
  CamPrivMask : {
    col : 12,
    row : 6,
    area_interval: null,

    init: function() {
      var chlist = [];

      function _actEventHandlerGenerator(param_ch) {
        return function(event) {
          if($(this).val() == 0) {
            $("#maskcolor"+(param_ch+1)).attr("disabled", "disabled");
          } else {
            $("#maskcolor"+(param_ch+1)).removeAttr("disabled");
          }
        }
      }

      $("#privmask-tab").tabs();

      $("#privmask-tab").tabs("select", 1);

      $('#c_sp_div_menubar_sub').show();
      $('#c_sp_div_contents').show();
      $("#privmask-tab").tabs("select", 0);
      $('#c_sp_div_menubar_sub').hide();
      $('#c_sp_div_contents').hide();

      /* multilang here for sprintf */
      $("span.lang_area").each( function(i, e) {
        $(e).html(sprintf(langArray['LTXT_AREA_N'], (i+1)));
      });

      langArray['LTXT_AREA_N']
      for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
        chlist[ch] = ch+1;

        $('#act'+(ch+1)).change(_actEventHandlerGenerator(ch));
      }
      makeSelectOptions($('select#chno'), chlist);
    },
    updateSnapshot: function(url) {
      var current_ch = $("select#chno").val();
      var current_analogtype = parseInt($z.current.m.data["analogtype"+current_ch]);

      // if(isNVR() == true || (!isNaN(current_analogtype) && current_analogtype == 8))
      // {
      //   var img = new Image();
      //   img.src = url;

      //   if(img.height == 480)
      //   {
      //     $("img#privmaskimg").width("540");
      //   }
      //   else if(url.indexOf('vloss') > 0 || img.height == 360)
      //   {
      //     $("img#privmaskimg").width("720");
      //   }
      // } else {
      //   $("img#privmaskimg").width("720");
      // }

      $("img#privmaskimg").attr("src", url);
    },
    update: function(array) {
      for( var i=0 ; i < INFO_DVRCHANNEL; i++ ) {
        var c = i+1;
        $('select#act'+c).val(array['act'+c]);
        $('select#act'+c).change();
        $('select#maskcolor'+c).val(array['maskcolor'+c]);
        $('select#detect'+c).val(array['detect'+c]);

        if((array['cv_admin'+i] == '1' && array['login_group'] == 'ADMIN')
          || (array['cv_manager'+i] == '1' && array['login_group'] == 'MANAGER')
          || (array['cv_user'+i] == '1' && array['login_group'] == 'USER')
          || (array['act_novideo'].charAt(i) == '1'))
        {
          $('#cam'+(i+1)).text('CAM'+(i+1));
        }

      }
    }
  },
  CamDmva : {
    c: {},
    // Schedule Widget
    schedWidget: new SchedWidget( {
        indices : [
            {name: langArray['LTXT_OFF'],   style_cls: 'td_isoff',     button: 'dlg_off'},
            {name: langArray['LTXT_ON'],    style_cls: 'td_ison',      button: 'dlg_on'},
        ]},
        function schedcb(widget) {
            var data = widget.getBindData();
            var day = widget.currentDay;

            // notify event occur
            c.getSchedule(data);
            $.event.trigger("EVT_SCHED_CHANGE", [ data, day ] );
        }
    ),
    parseSched: function(array) {
        var sched = [];
        var str = "";
        var week = $("#schmodeSelect option:selected").val();
        for( var day=0 ; day < 9 ; day++ ) {
            sched[day] = c.dmva_schedule['day'+day];
        }

        return sched;
    },
    updateSched: function(array) {
        var weekly = parseInt(array['schedule']);

        if( weekly == 0 ) {
            day = 7;
        } else {
            day = parseInt($('#schmodeSelect').val());
        }

        var sched = this.parseSched(array);
        this.schedWidget.bind(sched, day);
        this.schedWidget.updateByDay(day);
    },
    init: function() {
      c = $z.current;
      this.selectChannelInfo();
      this.schedWidget.init();

      var dayList = [langArray['LTXT_COMBO_MENU_SUN'], langArray['LTXT_COMBO_MENU_MON'], langArray['LTXT_COMBO_MENU_TUE'], langArray['LTXT_COMBO_MENU_WED'], langArray['LTXT_COMBO_MENU_THU'], langArray['LTXT_COMBO_MENU_FRI'], langArray['LTXT_COMBO_MENU_SAT']];
      $("#schmodeSelect").empty()
      for( var i=0 ; i < dayList.length ; i++ ) {
        $("#schmodeSelect").append(
          $("<option>").html(dayList[i]).val(i));
      }


      if ( browerIE == false)
        this.notiIE();

      this.loadMultiLanguage();
    },
    loadMultiLanguage : function(){
      var cookieLang = getCookie("local_language");
      var langs = INFO_LANGUAGE;

      if( cookieLang ) {
        langs = cookieLang;
      }

      if ( langs == null) {
        langs = 'ENGLISH';
      } else {
        langs = langs.toUpperCase();
      }
      var js_lang = LANGLIST[langs];
      var define = function(str){
        // console.log(str);
      };
      if( js_lang.length > 0 ) {
        loadScript("../language/" + js_lang + "/languageData.js",null);
      } else {
        loadScript("../language/english/languageData.js",null);
      }
    },
    notiIE : function() {

    },
    update: function(array) {
      $('#schmodeSelect').change(function(event, ui) {
        var day = parseInt($(this).val());
        c.v.schedWidget.updateByDay(day);
      });

      this.updateSched(array);
      //진입xml �달 부�      $("#ch_select").val(0);
      c.getXmlFile(0,array);

      c.connectActivex(c.activex_i, c.activex_p);

      $('#ch_select').change(function(event, ui) {
        var ch = $("#ch_select option:selected").val();
        c.changeChannel(ch);
        c.getXmlFile(ch,array);
      });

      $("#ch_select").bind("keyup change", function(e) {
        var ch = $("#ch_select option:selected").val();
        c.changeChannel(ch);
        c.getXmlFile(ch,array);
      });

      $('#vca_reset').click(function(e) {
        var ch = $("#ch_select option:selected").val();
        c.sendVcaReset(ch);
      });

      $('#vca_wizard').click(function(e) {
        var ch = $("#ch_select option:selected").val();
        c.Wizard(ch);
      });

      $('#vca_submenu').click(function(e) {
        var ch = $("#ch_select option:selected").val();
        c.showSubMenu(ch);
      });


      $('#ch_activation').change(function(event, ui) {
        var ch = $("#ch_select option:selected").val();
        c.EnableVA(ch, parseInt($("#ch_activation").val()))
      });

      $("#ch_activation").bind("keyup change", function(e) {
        var ch = $("#ch_select option:selected").val();
        c.EnableVA(ch, parseInt($("#ch_activation").val()))
      });


    },
    selectChannelInfo: function() {
      for(var i=0; i < INFO_DVRCHANNEL ; i++){
        $("#ch_select").append($("<option></option>").attr("value",i).text("CAM"+parseInt(i+1)));
      }
    }
  },
  CamType : {
    init: function() {
    },
    update: function(array) {
      for( var i=0 ; i < INFO_DVRCHANNEL ; i ++ ) {
        var ch = i+1;
        $('#camtype'+ch).val(array['camtype'+i]);
      }
    }
  },
  CamPTZ : {
    init: function() {
      //adress validate 0~255
      // p/t speed, zoom speed, focus speed, iris speed 0~ 100 term 10
      for (var i = 1 ; i <= 10 ; i++)
      {
        $(".set_speed").append($("<option>").val(i * 10).html(i));
      }

      $('input[name^="rs485"]').change( function (event) {
        if (INFO_MODEL.indexOf('IPX') < 0 && INFO_MODEL.indexOf('ANF5G') < 0) {
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
        if(row.find('select[name^="protocol"]').val() == "COAXITRON") {
          row.find('select[name^="protocol"]').change();
        }

        el.prop("disabled", false);

      });

      var generator_protocol_change_handler = function(param_index){
        return function(event) {
          if($("#protocol"+param_index).val() == "COAXITRON") {
            $("#address"+param_index).prop("disabled", true);
            $("#baudrate"+param_index).prop("disabled", true);
          } else {
            $("#address"+param_index).removeProp("disabled");
            $("#baudrate"+param_index).removeProp("disabled");
          }
        }
      }

      for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
        $("#protocol"+ch).change(generator_protocol_change_handler(ch));
      }

      $('.c_sp_txt_cam_ptz_addr').each(function(index){
        $('#address'+index).keyup(function(event){
          if(!isNaN(parseInt(this.value))
            && event.which != 37 && event.which != 39 ){ //left arrow & right arrow
            this.value = parseInt(this.value);
          }

          if(parseInt(this.value) < 0) {
            alert(errFieldValLess+" [0~255]");
            this.value = 0;
          }
          if(parseInt(this.value) > 255) {
            alert(errFieldValOver+" [0~255]");
            this.value = 255;
          }
        });
      });

    },
    update: function(array) {
      // protocol list
      var protocolCount = array['prtlstcnt'];
      for (var i = 0 ; i < protocolCount ; i++)
      {
        $(".cam_protocol").append($("<option>").val(array['prtlst' + i]).html(array['prtlst' + i]));
      }

      for (var i = 0 ; i < INFO_DVRCHANNEL ; i++)
      {
        $("#address" +i).val(array['address' + i]);
        $("#protocol" + i).val(array['protocol' + i]);
        $("#baudrate" + i).val(array['baudrate' + i]);

        $("#rs485_" + i).prop("checked", array['rs485_' + i] == "1").trigger('change');

        $("#protocol"+i).change();

        if ( INFO_MODEL.indexOf("IPX") < 0 ) {
          $("#address" + i).val(array['address' + i]);
          $("#autofocus" + i).val(array['autofocus' + i]);
          $("#ptspeed" + i).val(array['ptspeed' + i]);
          $("#focusspeed" + i).val(array['focusspeed' + i]);
          $("#autoiris" + i).val(array['autoiris' + i]);
          $("#zoomspeed" + i).val(array['zoomspeed' + i]);
          $("#irisspeed" + i).val(array['irisspeed' + i]);
        }

        if((array['cv_admin'+i] == '1' && array['login_group'] == 'ADMIN')
          || (array['cv_manager'+i] == '1' && array['login_group'] == 'MANAGER')
          || (array['cv_user'+i] == '1' && array['login_group'] == 'USER')
          || (array['act_novideo'].charAt(i) == '1'))
        {
          $('#ch'+(i+1)).text('CAM'+(i+1));
        }

      }
    }
  },
  CamTamper : {
    col : 16,
    row : 12,

    motionWidget: {},

    init: function() {
      var chlist = [];
      if( INFO_MODEL.indexOf("ATM") >= 0 || INFO_MODEL.indexOf("ANF") >= 0 ) {
        $("#tamper-tab").tabs();

        $("#tamper-tab").tabs("select", 1);

        $('#c_sp_div_menubar_sub').show();
        $('#c_sp_div_contents').show();
        $("#tamper-tab").tabs("select", 0);
        $('#c_sp_div_menubar_sub').hide();
        $('#c_sp_div_contents').hide();


        $("#redirect_level_d").empty();
        $("#redirect_level_n").empty();
        for (var j = 1 ; j <= 30 ; j++) {
          $("#redirect_level_d").append($("<option></option>").attr("value",j).text(j));
          $("#redirect_level_n").append($("<option></option>").attr("value",j).text(j));
        }
      }

      for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
        chlist[ch] = ch+1;
      }
      makeSelectOptions($('select#chno'), chlist);

      this.registerEvent();
    },
    registerEvent: function(len) {
      var v = this;
      var len = len;

      $('#chno').change(function(event, ui) {
        var c = $z.current;
        var ch = parseInt($(event.target).val());
        c.refreshHandler(ch);
      });

      $('#selectall').click(function(event,ui) {
        v.motionWidget.updateMblockAll('1');
      });

      $('#reverseall').click(function(event,ui) {
        v.motionWidget._updateMblockReverse();
      });

      $('#deleteall').click(function(event,ui) {
        v.motionWidget.updateMblockAll('0');
      });

    },
    updateSnapshot: function(url) {
      $("#tamper_jpegarea").attr("src", url);
    },
    update: function(array) {
      var ch = parseInt(array['chno']);

      $('select#chno').val(ch);

      if( INFO_MODEL.indexOf("ATM") >= 0 || INFO_MODEL.indexOf("ANF") >= 0 ) {
        for(var i=1 ; i <= INFO_DVRCHANNEL ; i++) {
          $('select#act' + i).val(array['act' + i]);
          $('select#mark' + i).val(array['mark'+i]);
        }
        $('select#rebl_time_start').val(array['rebl_time_start']);
        $('select#rebl_time_end').val(array['rebl_time_end']);
        $('select#redirect_level_d').val(array['redirect_level_d']);
        $('select#redirect_level_n').val(array['redirect_level_n']);
      } else {
        $('select#rebl_act').val(array['rebl_act']);
        $('select#rebl_time_start').val(array['rebl_time_start']);
        $('select#rebl_time_end').val(array['rebl_time_end']);

        $('select#redirect_mark').val(array['redirect_mark']);
        $('select#redirect_level_d').val(array['redirect_level_d']);
        $('select#redirect_spatial_d').val(array['redirect_spatial_d']);
        $('select#redirect_temporal_d').val(array['redirect_temporal_d']);

        $('select#redirect_level_n').val(array['redirect_level_n']);
        $('select#redirect_spatial_n').val(array['redirect_spatial_n']);
        $('select#redirect_temporal_n').val(array['redirect_temporal_n']);

        $('select#blockage_mark').val(array['blockage_mark']);
        $('select#blockage_level_d').val(array['blockage_level_d']);
        $('select#blockage_spatial_d').val(array['blockage_spatial_d']);
        $('select#blockage_temporal_d').val(array['blockage_temporal_d']);

        $('select#blockage_level_n').val(array['blockage_level_n']);
        $('select#blockage_spatial_n').val(array['blockage_spatial_n']);
        $('select#blockage_temporal_n').val(array['blockage_temporal_n']);

        $('select#defocus_act').val(array['defocus_act']);
        $('select#defocus_time_start').val(array['defocus_time_start']);
        $('select#defocus_time_end').val(array['defocus_time_end']);

        $('select#defocus_mark').val(array['defocus_mark']);
        $('select#defocus_level_d').val(array['defocus_level_d']);
        $('select#defocus_spatial_d').val(array['defocus_spatial_d']);
        $('select#defocus_temporal_d').val(array['defocus_temporal_d']);

        $('select#defocus_level_n').val(array['defocus_level_n']);
        $('select#defocus_spatial_n').val(array['defocus_spatial_n']);
        $('select#defocus_temporal_n').val(array['defocus_temporal_n']);

      // draw motion blocks
      var area = array['rebl_area'];
      var cols = 16;
      var rows = 12;

      this.motionWidget = new MotionCellWidget(
        '#tblock',
        {
          cols:cols,
          rows:rows,
          selectLimit:0,
          img:$("#tamper_jpegarea"),
          callback: this.updateArea
        }
      );
      this.motionWidget.updateMblock(array);
      }
    },
    updateArea: function(data) {
      var c = $z.current;
      c.blockChanged(data);
    }
  },
  AnalogType : {
    object_ipcam_list: [],
    max_count_in_page: 16,
    isSaved: false,
    isChanged: false,
    isInitialized: false,
    isRefreshing: false,
    assgined_cnt: 0,
    _checking_reboot: function() {
      setTimeout(function(){
        $.ajax({
          type: "POST",
          url: "/info/info.js",
          async: true,
          success: function(response){
            if(!isNaN(parseInt(INFO_DVRREADY)) && parseInt(INFO_DVRREADY) == 2) {

              setTimeout(function(){
                window.location.reload(true);
                $('#dialog_please_wait').dialog('close');
              }, 10000);

              return false;
            }

            setTimeout(function(){
              $z.current.v._checking_reboot();
            }, 2000);
          },
          error: function(response) {
            setTimeout(function(){
              $z.current.v._checking_reboot();
            }, 2000);
          }
        });
      }, 3000);
    },
    _getIpcamlist: function() {
      var timestamp = new Date().getTime() + new Date().getMilliseconds();
      var rand = Math.floor(Math.random() * 10000) + 1;
      if($z.current.v.isRefreshing == false) {
        $z.current.v.isRefreshing = true;
        $.ajax({
          type: "POST",
          url: "/cgi-bin/webra_fcgi.fcgi",
          async: true,
          cache: false,
          data: 'action=get_setup&menu=camera.openmode_list'+'&'+timestamp+rand,
          success: function(response) {
            var recv_data = recv_encode(response);
            $z.current.v.update_ipcam_list(recv_data);
            $z.current.v.isRefreshing = false;
          }
        });
      }
    },
    init: function() {
      //confirm: recording stop
      if(!confirm(langArray["LTXT_SETUPCAMINSTALLATION_WARNING_MESSAGE3"]+"\n"+langArray["LTXT_SETUPCAMINSTALLATION_WARNING_MESSAGE2"])){
        history.back();
        return false;
      };

      //scm init
      
      $.scm.RegistCallback("INFY_IPCAM_INSTALL_NOTIFY", function(param){
        if($("#dialog_please_wait").dialog("isOpen") == true) {
          $("#dialog_please_wait").dialog("close");
        }
        if($z.current.v.isRefreshing == false) {
          $z.current.v._getIpcamlist();
        }
      });
      
      // _setIpcamScanCamera();

      if (INFO_MODEL == "_UTM5HGA_0412D" || INFO_MODEL == "_UTM5HGA_0824D") {
        for(var i = INFO_DVRCHANNEL/2; i < INFO_DVRCHANNEL; i++ ) {
          $("#5hg_input_type_" + i + " " + "option:first").remove();
        }
      }

      if (INFO_MODEL.indexOf("5HG")>=0) {
        var _make_all_select_ui=function(param_elem_id_prefix) {
          return function(){
            var current_value=$("#"+param_elem_id_prefix+"_all").val();

            if(current_value<0) {return false;}

            for(var i=0; i<INFO_DVRCHANNEL; i++){
              if((param_elem_id_prefix=="5hg_signal_type" || param_elem_id_prefix=="5hg_resolution") && $("#5hg_mode_"+i).val()==0) {
                continue;
              }

              $("#"+param_elem_id_prefix+"_"+i).val(current_value);
              $("#"+param_elem_id_prefix+"_"+i).change();
            }

            return true;
          }
        };

        //regist all select event regist.
        $("#5hg_input_type_all").change(_make_all_select_ui("5hg_input_type"));
        $("#5hg_mode_all").change(_make_all_select_ui("5hg_mode"));
        $("#5hg_signal_type_all").change(_make_all_select_ui("5hg_signal_type"));
        $("#5hg_resolution_all").change(_make_all_select_ui("5hg_resolution"));
      }

      // API call: stop streaming... for block local UI.
      // We have no need block local UI because WebRA not showing camera preview.
      $.ajax({
        type: "POST",
        url: "/cgi-bin/webra_fcgi.fcgi",
        async: true,
        cache: false,
        data: 'action=set_setup&menu=camera.openmode_stop_streaming',
        success: function(response) {
          if(response != null && response.indexOf("DVR In Setup!") >= 0) {
            //$("#analog_tabs a[href='#analog_tab_type']").click();
            $("#analog_tabs").tabs("option", "selected", 0);
            alert(langArray['LTXT_ERR_DVRINSETUP']);
            history.back();
            return false;
          } else if(response != null && response.indexOf("DVR In Not Live!") >= 0) {
            //$("#analog_tabs a[href='#analog_tab_type']").click();
            $("#analog_tabs").tabs("option", "selected", 0);
            alert(langArray['LTXT_DVR_NOT_LIVE']);
            history.back();
            return false;
          } else {
            if(window.addEventListener == undefined) {
              window.attachEvent('onunload', _finalize_installation);
            }
            else {
              window.addEventListener('unload', _finalize_installation);
            }

            _setIpcamInitCameraList();
            //_setIpcamScanCamera();
          }
        }
      });

      //analog_tabs init
      $("#analog_tabs").tabs({
        select: function(event, ui) {
          switch(ui.index) {
            case 0: //analog type tab
              if($z.current.v.isChanged == true && $z.current.v.isSaved == false) {
                if(confirm(langArray['LTXT_CONFIGURATION_CHANGED'])) {
                  //click 'OK'
                  $("#button_apply_openmode_setting").click();
                  //event.preventDefault();
                  //return false;
                }
              }
              $("#button_submit").show();
              $("#cancel").show();
              $("#button_apply_openmode_setting").hide();
              $("#button_cancel_openmode_setting").hide();
              //return false;
            break;
            case 1: //ipcam setup tab
              $("#button_submit").hide();
              $("#cancel").hide();
              $("#button_apply_openmode_setting").show();
              $("#button_cancel_openmode_setting").show();
              $z.current.v.isSaved = false;
              $z.current.v.isChanged = false;
              //$("#dialog_warning").dialog("open");
            break;
          }
        }
      });

      $("#tab_installation").click(function(event){
        if($("#analog_tabs").tabs("option", "disabled") != null
          && $("#analog_tabs").tabs("option", "disabled")[0]) {
          //alert("HOW!!!");
        }
      });

      if(INFO_MODEL.indexOf("5HG")>=0) {

        $("#5hg_refresh_all").bind("click", function(){
          var action = "action=get_setup&menu=refresh.analogtype";

          for(var i=0; i<INFO_DVRCHANNEL; i++) {
            action += "&analogmode"+i+"="+$("#analogmode"+i).val();
            action += "&analogtype"+i+"="+analogtypeCalculator.make_type_value_from_others_information($("#5hg_input_type_"+i).val(), $("#5hg_signal_type_"+i).val(), $("#5hg_resolution_"+i));
          }

          if($z.debug){
            action += "&debug";
          }

          $.ajax({
            type: "POST",
            url: "/cgi-bin/webra_fcgi.fcgi",
            async: true,
            cache: false,
            data: action,
            success: function(response) {
              var array = encode_to_array(response);
              var temp_analogtype=0;
              var temp_analogmode=0;
              var temp_input_type=0;
              var temp_resolution=0;
              var temp_signaltype=0;

              if(response != null && response.indexOf("DVR In Setup!") >= 0) {
                alert(langArray['LTXT_ERR_DVRINSETUP']);
                return false;
              } else {
                for(var i=0; i<INFO_DVRCHANNEL; i++) {
                  temp_analogtype=0;
                  temp_analogmode=0;
                  temp_input_type=0;
                  temp_resolution=0;
                  temp_signaltype=0;

                  temp_analogtype=array["analogtype"+i];
                  temp_analogmode=$("#5hg_mode_"+i).val();
                  temp_input_type=analogtypeCalculator.get_input_type_from_type(temp_analogtype);
                  temp_resolution=analogtypeCalculator.get_resolution_from_type(temp_analogtype)
                  temp_signaltype=analogtypeCalculator.get_signal_from_type(temp_analogtype);

                  if(temp_analogmode==0 && temp_input_type==0) {
                    $("#5hg_signal_type_"+i).val(temp_signaltype);
                    $("#5hg_resolution_"+i).val(temp_resolution);
                  }


                }
              }

              return true;
            }, fail: function(response) {
              alert(langArray["LTXT_ERROR"]);
              return false;
            }
          });

        });
      }

      if(INFO_MODEL.indexOf("ANF5G") < 0) {
        $("#analog_tabs").tabs("option", "hide");
      }

      function _selectChangeAllGenerator(param_index) {
        return function(event) {
          $(this).val(0);
          $('input[value="'+param_index+'"]').prop('checked', true);
          $('input[value="'+param_index+'"]').change();
        }
      }

      function _buttonMouseOverGenerator(param_index) {
        return function(event) {
          //console.log(param_index+' button over');
          this.src="../../images/ITX_OLD/bt_pop_setting_o.png";
        }
      }

      function _buttonMousePushGenerator(param_index) {
        return function(event) {
          //console.log(param_index+' button clicked');
          this.src="../../images/ITX_OLD/bt_pop_setting_p.png";
        }
      }

      function _buttonMouseLeaveGenerator(param_index) {
        return function(event) {
          //console.log(param_index+' button leaved');
          this.src="../../images/ITX_OLD/bt_pop_setting_n.png";
        }
      }

      function _buttonTypeChanged(param_index) {
        return function(event) {
          var count_ipcam = 0;
          for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
            if($("input[name=analogtype"+ch+"]:checked").val() == 8) {
              count_ipcam++;
            }
          }

          if(count_ipcam <= 0) {
            $("#analog_tabs").tabs("disable", 1);
          } else {
            $("#analog_tabs").tabs("enable", 1);
          }
        }
      }

      // for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
      //   $("input[name=analogtype"+ch+"]").change(_buttonTypeChanged(ch));
      // }

      function _vcamRtspAddressChangeGenerator() {
        var protocol = "rtsp://"
        var id = $("#ipcam_install_vcam_id").val();
        var pass = $("#ipcam_install_vcam_password").val();
        var addr = $("#ipcam_install_vcam_ipaddress").val();
        var port = $("#ipcam_install_vcam_port").val();

        $("#ipcam_install_vcam_1st_rtsp").val(protocol+id+":"+pass+"@"+addr+":"+port+"/"+"live"+"/"+"main");
        $("#ipcam_install_vcam_2nd_rtsp").val(protocol+id+":"+pass+"@"+addr+":"+port+"/"+"live"+"/"+"second");
      }

      function _changeAssignChannelGenerator(param_index) {
        return function(event) {
          var current_page = $("#current_page").text();
          var max_count_in_page = $z.current.v.max_count_in_page;
          var real_index = ((current_page-1)*max_count_in_page)+param_index;
          var index_start = (current_page-1)*($z.current.v.max_count_in_page);
          var entry_cnt = $("#ipcam_found_count").text();

          var current_assigned_channel = $(this).val();
          var list = $z.current.v.object_ipcam_list;

          var timestamp = new Date().getTime() + new Date().getMilliseconds();
          var rand = Math.floor(Math.random() * 10000) + 1;

          var action = "action=set_setup&menu=camera.openmode_set_channel"
          action += "&index="+real_index;
          action += "&ch="+current_assigned_channel;
          action += "&"+timestamp+rand;

          if($z.debug) {
            action += "&debug=";
          }

          $.ajax({
            type: "POST",
            url: "/cgi-bin/webra_fcgi.fcgi",
            async: true,
            cache: false,
            data: action,
            success: function(response) {
              //var recv_data = recv_encode(response);
              $("#dialog_please_wait").dialog("open");
              $z.current.v.isChanged = true;
              return true;
            },
            fail: function(response) {
              alert(langArray["LTXT_ERROR"]);
              return false;
            }
          });

          //for(var i=0; i<list.length; i++) {
          //  if((list[i].ch >= 0) && (list[i].ch == current_assigned_channel)) {
          //    list[i].ch = list[real_index].ch;
          //    break;
          //  }
          //}

          list[real_index].ch = current_assigned_channel;

          for(var i=0, j=index_start; i<max_count_in_page; i++, j++) {
            if(j<entry_cnt) {
              $("#model"+i).text(list[j].model);
              $("#ipaddr"+i).text(list[j].ipaddr);
              $("#state"+i).text(list[j].str_state);
              $("#select_assign_"+i).val(list[j].ch);

              $("#ipcam_setup"+i).removeProp("disabled");
              $("#select_assign_"+i).removeProp("disabled");
          } else {
              $("#model"+i).text("-");
              $("#ipaddr"+i).text("-");
              $("#state"+i).text("-");

              $("#ipcam_setup"+i).prop("disabled", "disabled");
              $("#select_assign_"+i).prop("disabled", "disabled");
              $("#select_assign_"+i).val(-1);
            }
          }
        }
      }

      function _buttonMouseClickGenerator(param_index) {
        //if(param_index<2) {
        //  return function(event) {
        //    $("#dialog_warning")
        //      .data("param_index", param_index)
        //      .dialog("open");
        //  }
        //} else {
          return function(event) {
            event.preventDefault;

            var current_page = $("#current_page").text();
            var max_count_in_page = $z.current.v.max_count_in_page;
            var real_index = (current_page-1)*max_count_in_page+param_index;

            $("#dialog_ipcam_install")
              .data("param_index", real_index)
              .dialog("open");
            //console.log(param_index+' button click event occured');
          }
        //}
      }

      function _setIpcamScanCamera() {
        $("#dialog_please_wait").dialog("open");

        $.ajax({
          type: "POST",
          url: "/cgi-bin/webra_fcgi.fcgi",
          async: true,
          cache: false,
          data: 'action=set_setup&menu=camera.openmode_scan_camera',
          success: function(response) {
            var recv_data = recv_encode(response);
            //setTimeout($z.current.v._getIpcamlist, 1000);
            //$z.current.v.update_ipcam_list(recv_data);
          }
        });
      }

      function _setIpcamInitCameraList() {
        $("#dialog_please_wait").dialog("open");

        $.ajax({
          type: "POST",
          url: "/cgi-bin/webra_fcgi.fcgi",
          async: true,
          cache: false,
          data: 'action=get_setup&menu=camera.openmode_chlist',
          success: function(response) {
            var recv_data = recv_encode(response);
            //setTimeout($z.current.v._getIpcamlist, 1000);
            //$z.current.v.update_ipcam_list(recv_data);

            _setIpcamScanCamera();
          }
        });
      }

      function _finalize_installation() {
        //beforeunload �에api�송�� �고 브라�져 종료�는 �상�로 �해 xmlhttprequest �용
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("PUT", "/cgi-bin/webra_fcgi.fcgi?action=set_setup&menu=camera.openmode_finalize_installation", false);//the false is for making the call synchronous
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send();
      }

      var count_camera_type = 9;
      for(var i=0; i<count_camera_type; i++) {
          $("#camera_type_"+i).change(_selectChangeAllGenerator(i));
      }

      for(var ch=0; ch<$z.current.v.max_count_in_page; ch++) {
        $("#select_assign_"+ch).change(_changeAssignChannelGenerator(ch));
      }

      for( var ch=parseInt(INFO_DVRCHANNEL) ; ch <= 16 ; ch++ ) {
        // Make Camera title label
        var elem_ch = undefined;
        var elem_td = undefined;

        if(ch > INFO_DVRCHANNEL)
        {
          elem_ch = document.getElementById('ch'+ch);
          elem_td = elem_ch.parentNode.parentNode;
          if(elem_ch != undefined)
          {
            elem_ch.parentNode.removeChild(elem_ch);
            elem_td.parentNode.removeChild(elem_td);
          }

          elem_ch = undefined;
          elem_td = undefined;
        }
      }

      $("#button_cancel_openmode_setting").click(function(event){
        var timestamp = new Date().getTime() + new Date().getMilliseconds();
        var rand = Math.floor(Math.random() * 10000) + 1;

        var action = "action=set_setup&menu=camera.openmode_cancel"
        action += "&"+timestamp+rand;

        if($z.debug) {
          action += "&debug=";
        }

        $.ajax({
          type: "POST",
          url: "/cgi-bin/webra_fcgi.fcgi",
          async: true,
          cache: false,
          data: action,
          success: function(response) {
            //$("#analog_tabs a[href='#analog_tab_type']").click();
            $("#analog_tabs").tabs("option", "selected", 0);
          },
          fail: function(response) {
            alert(langArray["LTXT_ERROR"]);
          }
        });
      });

      $("#button_apply_openmode_setting").click(function(event){
        var list = $z.current.v.object_ipcam_list;

        var timestamp = new Date().getTime() + new Date().getMilliseconds();
        var rand = Math.floor(Math.random() * 10000) + 1;

        var action = "action=set_setup&menu=camera.openmode_apply"
        action += "&"+timestamp+rand;

        if($z.debug) {
          action += "&debug=";
        }

        $.ajax({
          type: "POST",
          url: "/cgi-bin/webra_fcgi.fcgi",
          async: true,
          cache: false,
          data: action,
          success: function(response) {
            //$("#dialog_warning_ipcam_apply").dialog("open");
            var list = $z.current.v.object_ipcam_list;
            var timestamp = new Date().getTime() + new Date().getMilliseconds();
            var rand = Math.floor(Math.random() * 10000) + 1;

            var bitmask_ch_updated = new bitField(16);

            var action = "action=set_setup&menu=camera.openmode";
            for(var i=0; i<list.length; i++) {
              if(list[i].ch >= 0) {
                action+="&id_"+list[i].ch+"="+list[i].u;
                action+="&pwd_"+list[i].ch+"="+list[i].p;
                action+="&hostname_"+list[i].ch+"="+list[i].hostname;
                action+="&http_port_"+list[i].ch+"="+list[i].http_port;

                bitmask_ch_updated.check(list[i].ch);
              }
            }

            for(var i=0; i<INFO_DVRCHANNEL; i++) {
              if(bitmask_ch_updated.isChecked(i) == false) {
                action+="&id_"+i+"=";
                action+="&pwd_"+i+"=";
                action+="&hostname_"+i+"=";
                action+="&http_port_"+i+"=";
              }
            }

            action += "&"+timestamp+rand;

            if($z.debug) {
              action += "&debug=";
            }

            $.ajax({
              type: "POST",
              url: "/cgi-bin/webra_fcgi.fcgi",
              async: true,
              cache: false,
              data: action,
              success: function(response) {
                $z.current.v.isSaved = true;
                alert(errComplete);
              },
              fail: function(response) {
                alert(langArray['LTXT_ERROR']);
              }
            });

            return true;
          },
          fail: function(response) {
            alert(langArray["LTXT_ERROR"]);
            return false;
          }
        });

        //for(var i=0; i<list.length; i++) {
        //  if(list[i].ch >= 0) {
        //    //data['u_'+list[i].ch] = list[i].id;
        //    //data['p_'+list[i].ch] = list[i].pwd;
        //    //data['hostname_'+list[i].ch] = list[i].hostname;
        //    //data['http_port_'+list[i].ch] = list[i].http_port;
        //
        //    console.log('list[%d] ipaddr[%s] model[%s]', i, list[i].ipaddr, list[i].model);
        //  }
        //}
      })

      var count_img_button = $("input[type='image']").length;
      for (var i=0; i<count_img_button; i++) {
        $($("input[type='image']")[i]).mouseover(_buttonMouseOverGenerator(i));
        $($("input[type='image']")[i]).mouseup(_buttonMouseOverGenerator(i));
        $($("input[type='image']")[i]).mousedown(_buttonMousePushGenerator(i));
        $($("input[type='image']")[i]).mouseleave(_buttonMouseLeaveGenerator(i));
        $($("input[type='image']")[i]).click(_buttonMouseClickGenerator(i));
      }

      var ipcamera_option_list = [];
      for (var ch=0; ch<INFO_DVRCHANNEL; ch++) {
        if($z.current.m.data['analogtype'+ch] == 8) {
          ipcamera_option_list.push(ch);
        }
      }


      //event handler init start
      $("#select_mode").change(function(event){
        var current_mode = parseInt($("#select_mode").val());

        if(isNaN(current_mode)) {
          $("#select_mode").val(0);
          current_mode = 0;
        }

        switch(current_mode) {
          case 0:
          default:
            $("#button_search").show();
            $("#button_add").hide();
            $("#div_ipcam_access_info").hide();
            break;
          case 1:
            $("#button_search").hide();
            $("#button_add").show();
            $("#div_ipcam_access_info").show();
            break;
        }
      });

      //$("input[name='analogtype0']").change(_radioEventHandlerGenerator(undefined));
      //$("input[name='analogtype8']").change(_radioEventHandlerGenerator(undefined));
      //event handler init end

      $("#button_prev").click(function(event){
        var list = $z.current.v.object_ipcam_list;
        var current_page = $("#current_page").text();
        var max_page = $("#max_page").text();
        var index_start = (current_page-2) * ($z.current.v.max_count_in_page);
        var entry_cnt = parseInt(list.length);

        if(current_page <= 1) {
          return false;
        }

        for(var i=0, j=index_start; i<$z.current.v.max_count_in_page; i++, j++) {
          if(j<entry_cnt) {
            $("#model"+i).text(list[j].model);
            $("#ipaddr"+i).text(list[j].ipaddr);
            $("#state"+i).text(list[j].str_state);
            $("#select_assign_"+i).val(list[j].ch);

            $("#ipcam_setup"+i).removeProp("disabled");
            $("#select_assign_"+i).removeProp("disabled");
            if(list[j].state == 1) {
              is_rescan_for_connecting = true;
            }
          } else {
            $("#model"+i).text("-");
            $("#ipaddr"+i).text("-");
            $("#state"+i).text("-");

            $("#ipcam_setup"+i).prop("disabled", "disabled");
            $("#select_assign_"+i).prop("disabled", "disabled");
          }
        }

        $("#current_page").text(parseInt(current_page)-1);
      });

      $("#button_next").click(function(event){
        var list = $z.current.v.object_ipcam_list;
        var current_page = $("#current_page").text();
        var max_page = $("#max_page").text();
        var index_start = current_page * ($z.current.v.max_count_in_page);
        var entry_cnt = parseInt(list.length);

        if(current_page >= max_page) {
          return false;
        }

        for(var i=0, j=index_start; i<$z.current.v.max_count_in_page; i++, j++) {
          if(j<entry_cnt) {
            $("#model"+i).text(list[j].model);
            $("#ipaddr"+i).text(list[j].ipaddr);
            $("#state"+i).text(list[j].str_state);
            $("#select_assign_"+i).val(list[j].ch);

            $("#ipcam_setup"+i).removeProp("disabled");
            $("#select_assign_"+i).removeProp("disabled");

            if(list[j].state == 1) {
              is_rescan_for_connecting = true;
            }
          } else {
            $("#model"+i).text("-");
            $("#ipaddr"+i).text("-");
            $("#state"+i).text("-");

            $("#ipcam_setup"+i).prop("disabled", "disabled");
            $("#select_assign_"+i).prop("disabled", "disabled");
            $("#select_assign_"+i).val(-1);
          }
        }

        $("#current_page").text(parseInt(current_page)+1);
      });

      $("#select_mode").change();

      $("#button_ipcam_search").click(function(event){
        _setIpcamScanCamera();
      });

      $("#button_ipcam_specific").click(function(event){
        $("#dialog_ipcam_install_specific").dialog("open");
      });

      $("#button_ipcam_vcam").click(function(event){
        $("#dialog_ipcam_install_vcam").dialog("open");
      });

      $("#button_ipcam_ping").click(function(event) {
        var index = $("#dialog_ipcam_install").data("param_index");
        var host = $z.current.v.object_ipcam_list[index].ipaddr

        $.ajax({
          type: "POST",
          url: "/cgi-bin/webra_fcgi.fcgi",
          async: true,
          cache: false,
          data: 'action=get_setup&menu=camera.openmode_ping_test&host='+host,
          success: function(response) {
            var recv_data = recv_encode(response);
            //setTimeout(_getIpcamlist(), 1000);
            alert(recv_data['result']);
          }
        });
      });

      //warning dialog init start
      $("#dialog_warning").dialog({
        autoOpen : false,
        modal : true,
        resizable :false,
        draggable: false,
        width: "350px",
        show: "drop",
        hide: "drop",
        title: "WARNING",
        create: function (event,ui) {

        },
        open: function (event, ui) {

        },
        close: function (event, ui) {

        },
        buttons: [{
          text : langArray["LTXT_SETUP_APPLY"],
          click : function() {
            /*var param_index = $("#dialog_warning").data("param_index");

            if(param_index >= 0) {
              $("#dialog_ipcam_install")
                .data("param_index", param_index)
                .dialog("open");
              $(this).dialog('close');
            } else {
              $("#dialog_camera_add_delete")
                .dialog("open");
              $(this).dialog('close');
            }
*/
            $("#button_submit").hide();
            $("#cancel").hide();
            $("#button_apply_openmode_setting").show();
            $("#button_cancel_openmode_setting").show();

            $.ajax({
              type: "POST",
              url: "/cgi-bin/webra_fcgi.fcgi",
              async: true,
              cache: false,
              data: 'action=set_setup&menu=camera.openmode_stop_streaming',
              success: function(response) {
                if(response != null && response.indexOf("DVR In Setup!") >= 0) {
                  //$("#analog_tabs a[href='#analog_tab_type']").click();
                  $("#analog_tabs").tabs("option", "selected", 0);
                  alert(langArray['LTXT_ERR_DVRINSETUP']);
                } else {
                  if(window.addEventListener == undefined) {
                    window.attachEvent('onunload', _finalize_installation);
                  }
                  else {
                    window.addEventListener('unload', _finalize_installation);
                  }

                  _setIpcamInitCameraList();
                  //_setIpcamScanCamera();
                }
              }
            });

            $(this).dialog('close');
          }
        }, {
          text : langArray["LTXT_CANCEL"],
          click : function() {
            //$("#analog_tabs a[href='#analog_tab_type']").click();
            $z.current.v.isSaved = true;
            //$("#analog_tabs").tabs("option", "selected", 0);
            history.back();

            $(this).dialog('close');
          }
        }]
      });

      $("#dialog_warning_ipcam_apply").dialog({
        autoOpen : false,
        modal : true,
        resizable :false,
        draggable: false,
        width: "350px",
        show: "drop",
        hide: "drop",
        title: "WARNING",
        create: function (event,ui) {

        },
        open: function (event, ui) {

        },
        close: function (event, ui) {

        },
        buttons: [{
          text : langArray["LTXT_SETUP_APPLY"],
          click : function() {
            var list = $z.current.v.object_ipcam_list;
            var timestamp = new Date().getTime() + new Date().getMilliseconds();
            var rand = Math.floor(Math.random() * 10000) + 1;

            var bitmask_ch_updated = new bitField(16);

            var action = "action=set_setup&menu=camera.openmode";
            for(var i=0; i<list.length; i++) {
              if(list[i].ch >= 0) {
                action+="&id_"+list[i].ch+"="+list[i].u;
                action+="&pwd_"+list[i].ch+"="+list[i].p;
                action+="&hostname_"+list[i].ch+"="+list[i].hostname;
                action+="&http_port_"+list[i].ch+"="+list[i].http_port;

                bitmask_ch_updated.check(list[i].ch);
              }
            }

            for(var i=0; i<INFO_DVRCHANNEL; i++) {
              if(bitmask_ch_updated.isChecked(i) == false) {
                action+="&id_"+i+"=";
                action+="&pwd_"+i+"=";
                action+="&hostname_"+i+"=";
                action+="&http_port_"+i+"=";
              }
            }

            action += "&"+timestamp+rand;

            if($z.debug) {
              action += "&debug=";
            }

            $.ajax({
              type: "POST",
              url: "/cgi-bin/webra_fcgi.fcgi",
              async: true,
              cache: false,
              data: action,
              success: function(response) {
                alert(errComplete);
              },
              fail: function(response) {
                alert(langArray['LTXT_ERROR']);
              }
            });

            $(this).dialog('close');
          }
        }]
      });

      $("#dialog_please_wait").dialog({
        autoOpen : false,
        modal : true,
        resizable :false,
        draggable: false,
        width: "350px",
        show: "drop",
        hide: "drop",
        dialogClass: "no-close",
        title: langArray["LTXT_NOTICE"],
        create: function (event,ui) {

        },
        open: function (event, ui) {
          $(".ui-dialog-titlebar-close").hide();
        },
        close: function (event, ui) {

        },
        buttons: []
      });
      //warning dialog init end.

      //camera vcam dialog ini start.
      $("#dialog_ipcam_install_vcam").dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        draggable: false,
        width: "420px",
        show: "drop",
        hide: "drop",
        title: langArray['LTXT_SETUPMENU_CAM_VIRTUAL_CAMERA_INSTALLATION'],
        create: function(event, ui) {
          $("#ipcam_install_vcam_ipaddress").keyup(_vcamRtspAddressChangeGenerator);
          $("#ipcam_install_vcam_port").keyup(_vcamRtspAddressChangeGenerator);
          $("#ipcam_install_vcam_id").keyup(_vcamRtspAddressChangeGenerator);
          $("#ipcam_install_vcam_password").keyup(_vcamRtspAddressChangeGenerator);
        },
        open: function(event, ui) {
          $("#ipcam_install_vcam_model").val("VCAM");
          $("#ipcam_install_vcam_ipaddress").val("0.0.0.0");
          $("#ipcam_install_vcam_port").val("0");

          $("#ipcam_install_vcam_id").val("");
          $("#ipcam_install_vcam_password").val("");
          $("#ipcam_install_vcam_1st_rtsp").val("");
          $("#ipcam_install_vcam_2nd_rtsp").val("");
        },
        close: function(event, ui) {

        },
        buttons: [
          {
            text: langArray["LTXT_OK"],
            click: function() {
              //$(this).dialog('ok');
              var main = $("#ipcam_install_vcam_1st_rtsp").val();
              var second = $("#ipcam_install_vcam_2nd_rtsp").val();
              var model = $("#ipcam_install_vcam_model").val();
              var timestamp = new Date().getTime() + new Date().getMilliseconds();
              var rand = Math.floor(Math.random() * 10000) + 1;

              var dialog = $(this);

              var action = "action=set_setup&menu=camera.openmode_add_virtual_camera";
              action += "&main="+main;
              action += "&second="+second;
              action += "&model_name="+model;
              action += "&"+timestamp+rand;

              if($z.debug) {
                action += "&debug=";
              }

              $.ajax({
                type: "POST",
                url: "/cgi-bin/webra_fcgi.fcgi",
                async: true,
                cache: false,
                data: action,
                success: function(response) {
                  var recv_data = recv_encode(response);
                  var status_code = parseInt(recv_data['status']);

                  switch(status_code) {
                    case 0:
                      alert(langArray['LTXT_ERR_SUCCESS']);

                      //$z.current.v._getIpcamlist();
                      dialog.dialog('close');

                      break;
                    case 1:
                      alert('ADD FAIL');
                      break;
                    case 2:
                      alert('Please check RTSP 1 address');
                      break;
                    case 3:
                      alert('Please check RTSP 2 address');
                      break;
                    default:
                      alert('Please input a name.');
                      break;
                  }

                  return true;
                },
                fail: function(response) {
                  alert(langArray["LTXT_ERROR"]);
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
          }
        ]
      });
      //camera vcam dialog init end.

      $("#dialog_ipcam_install_specific").dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        draggable: false,
        width: "330px",
        show: "drop",
        hide: "drop",
        title: langArray['LTXT_SETUPMENU_CAM_IP_CAMERA_INSTALLATION'],
        create: function(event, ui) {

        },
        open: function(event, ui) {

        },
        close: function(event, ui) {

        },
        buttons: [
          {
            text: langArray["LTXT_SETUPUSERMANAGEMENT_ADD"],
            click: function() {
              $(this).dialog('ok');
              var host = $("#ipcam_install_specific_host").val();
              var port = $("#ipcam_install_specific_port").val();
              var timestamp = new Date().getTime() + new Date().getMilliseconds();
              var rand = Math.floor(Math.random() * 10000) + 1;

              var dialog = $(this);

              var action = "action=set_setup&menu=camera.openmode_add_device_manual";
              action += "&host="+host;
              action += "&port="+port;
              action += "&"+timestamp+rand;

              if($z.debug) {
                action += "&debug=";
              }

              $.ajax({
                type: "POST",
                url: "/cgi-bin/webra_fcgi.fcgi",
                async: true,
                cache: false,
                data: action,
                success: function(response) {
                  var recv_data = recv_encode(response);

                  dialog.dialog('close');

                  return true;
                },
                fail: function(response) {
                  alert(langArray["LTXT_ERROR"]);

                  dialog.dialog('close');

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
          }
        ]
      });

      //camera add/delete dialog init start
      $("#dialog_camera_add_delete").dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        draggable: false,
        width: "890px",
        show: "drop",
        hide: "drop",
        title: langArray['LTXT_SETUPMENU_CAM_CAMERAINSTALLATION'],
        create: function(event, ui) {

        },
        open: function(event, ui) {
          var analogtype_ch1 = parseInt($("input[name=analogtype0]:checked").val());
          var analogtype_ch9 = parseInt($("input[name=analogtype8]:checked").val());

          //1ch camera type check.
          if(analogtype_ch1 != 3) {
            $("option[value=0]").prop('disabled', true);
          }

          //9ch camera type check.
          if(analogtype_ch9 != 3) {
            $("option[value=8]").prop('disabled', true);
          }

          //both camera type check.
          if(analogtype_ch1 != 3 && analogtype_ch9 != 3) {
            for(var ch=1; ch<(INFO_DVRCHANNEL+1); ch++) {
              $("#select_assign_"+ch).prop('disabled', true);
            }
          }
        },
        close: function(event, ui) {

        },
        buttons: [
          {
            text: langArray["LTXT_CANCEL"],
            click: function() {
              $(this).dialog('close');
            }
          }
        ]
      });
      //camera add/delete dialog init end

      $("#dialog_ipcam_install").dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        draggable: false,
        width: "720px",
        show: "drop",
        hide: "drop",
        title: langArray['LTXT_SETUPMENU_CAM_IP_CAMERA_INSTALLATION'],
        create: function(event, ui) {
          $("#ipcam_install_login").click(function(event){
            var timestamp = new Date().getTime() + new Date().getMilliseconds();
            var rand = Math.floor(Math.random() * 10000) + 1;

            var param_index = $("#dialog_ipcam_install").data("param_index");

            var action = "action=set_setup&menu=camera.openmode_set_login_info";
            action += "&index="+param_index;
            action += "&u="+$("#ipcam_install_u").val();
            action += "&p="+$("#ipcam_install_p").val();
            action += "&"+timestamp+rand;

            if($z.debug) {
              action += "&debug=";
            }

            $.ajax({
              type: "POST",
              url: "/cgi-bin/webra_fcgi.fcgi",
              async: true,
              cache: false,
              data: action,
              success: function(response) {
                var recv_data = recv_encode(response);

                if(parseInt(recv_data['result']) == 2) {
                  alert(langArray["LTXT_DIAGNOSIS_LOGIN_FAIL_CAMERA"]);
                } else {
                  alert(langArray['LTXT_ERR_SUCCESS']);
                  $("#ipcam_install_changepw").show();
                  $("#ipcam_install_login").hide();
                  $("#ipcam_install_u").prop("disabled", "disabled");
                  $("#ipcam_install_p").prop("disabled", "disabled");
                }
                //dialog.dialog('close');

                return true;
              },
              fail: function(response) {
                alert(langArray["LTXT_ERROR"]);

                //dialog.dialog('close');

                return false;
              }
            });
          });
        },
        open: function(event, ui) {
          var v = $z.current.v;
          var list = v.object_ipcam_list;

          //get param_index.
          var param_index = $("#dialog_ipcam_install").data("param_index");

          //update data.
          $("#ipcam_install_model").val(list[param_index].model);
          $("#ipcam_install_ipaddr").val(list[param_index].ipaddr);
          $("#ipcam_install_httpport").val(list[param_index].http_port);
          $("#ipcam_install_rtspport").val(list[param_index].rtsp_port);
          $("#ipcam_install_u").val(list[param_index].u);
          $("#ipcam_install_p").val(list[param_index].p);
          $("#ipcam_install_mac").val(list[param_index].macaddr);
          $("#ipcam_install_fwver").val(list[param_index].firmware_version);

          if(list[param_index].state == 10) {
            $("#ipcam_install_changepw").hide();
            $("#ipcam_install_login").show();
          } else {
            $("#ipcam_install_changepw").show();
            $("#ipcam_install_login").hide();
          }

          if(list[param_index].state != 10) {
            $("#ipcam_install_u").prop("disabled", "disabled");
            $("#ipcam_install_p").prop("disabled", "disabled");
          } else {
            $("#ipcam_install_u").removeProp("disabled");
            $("#ipcam_install_p").removeProp("disabled");
          }
        },
        close: function(event, ui) {

        },
        buttons: [
          {
            text: langArray["LTXT_OK"],
            click: function() {
              $(this).dialog('close');
            }
          },
          {
            text: langArray["LTXT_CANCEL"],
            click: function() {
              $(this).dialog('close');
            }
          }
        ]
      });

      $("#camera_add_delete").click(function(event){
        $("#dialog_warning")
          .data('param_index', -1)
          .dialog('open');
      });

      $("#redirectNetworkSetup").click(function(event){
        if($z.current.v.isChanged == true && $z.current.v.isSaved == false) {
          if(!confirm(langArray['LTXT_CONFIGURATION_CHANGED'])) {
          } else {
            window.location.pathname = '/html/setup_network_ipsetup.htm';
          }
        } else {
          window.location.pathname = '/html/setup_network_ipsetup.htm';
        }
      });

      $z.current.v.isInitialized = true;
    },
    update_ipcam_list: function(array) {
      var convertStateToStr = function(param_state_code) {
        var ret = "-";
        switch(parseInt(param_state_code)){
          case 1:
            ret = langArray["LTXT_DIAGNOSIS_CONNECTING_CAEMRA"];
            break;
          case 3:
          case 4:
            ret = langArray["LTXT_OK"];
            break;
          case 5:
            ret = langArray['LTXT_SETUPCAMINSTALLATION_ASSIGNEDCHANNEL'];
            break;
          case 6:
            ret = langArray["LTXT_OK"];
            break;
          case 7:
            ret = "INVALID IP";
            break;
          case 8:
            ret = "NEED TO CHANGE PASSWORD";
            break;
          case 9:
            ret = langArray["LTXT_DIAGNOSIS_CONNECTION_FAIL_CAMERA"];
            break;
          case 10:
            ret = langArray['LTXT_DIAGNOSIS_LOGIN_FAIL_CAMERA'];
            break;
          case 11:
            ret = "STREAM FAIL";
            break;
          case 12:
            ret = langArray['LTXT_DIAGNOSIS_UNSUPPORTED_CAMERA'];
            break;
          case 13:
            ret = langArray["LTXT_OK"];
            break;
          default:
            break;
        }
        return ret;
      }

      $z.current.v.object_ipcam_list.length = 0;
      var list = $z.current.v.object_ipcam_list;
      var tmp_ipaddr = 0;
      var tmp_ipaddr_array = [0, 0, 0, 0];
      var tmp_addr_string = "";

      $("#ipcam_assigned_count").text(sprintf(langArray['LTXT_SETUPCAMINSTALLATION_SEARCH_ASSIGNED'], array['assigned_cnt']));
      $("#ipcam_found_count").text(sprintf(langArray['LTXT_SETUPCAMINSTALLATION_SEARCH_FOUND'], array['entry_cnt']));
      $("#ipcam_need_count").text(sprintf(langArray['LTXT_SETUPCAMINSTALLATION_SEARCH_NEED'], array['setup_needed_cnt']));

      for(var i=0; i<array['entry_cnt']; i++) {
        tmp_ipaddr = array['ipaddr_'+i];
        tmp_ipaddr_array = [0, 0, 0, 0];
        tmp_addr_string = "";

        for(index_addr=4; index_addr>0; index_addr--) {
          for(var index_bit=8; index_bit>0; index_bit--) {
            //(8-m+1) bit of n class(4:A, 1:D): 2^(8*n-(8-m+1)), n[4..1], m[8..1].
            if((tmp_ipaddr & 1<<(8*index_addr)-(8-index_bit+1)) != 0) {
              tmp_ipaddr_array[index_addr-1] |= (1<< (index_bit-1));
            }
          }

          tmp_addr_string += ""+tmp_ipaddr_array[index_addr-1];
          if(index_addr > 1) {
            tmp_addr_string += ".";
          }
        }

        list.push({
          "index":array["index_"+i],
          "state":array["state_"+i],
          "str_state":convertStateToStr(array["state_"+i]),
          "ch":array["ch_"+i],
          "xid":array["xid_"+i],
          "hostname":array["hostname_"+i],
          "gwstr":array["gwstr_"+i],
          "maskstr":array["maskstr_"+i],
          "dns1str":array["dns1str_"+i],
          "dns2str":array["dns2str_"+i],
          "is_dhcp":array["is_dhcp_"+i],
          "ipaddr":tmp_addr_string,
          "gw":array["gw_"+i],
          "mask":array["mask_"+i],
          "dns1":array["dns1_"+i],
          "dns2":array["dns2_"+i],
          "http_port":array["http_port_"+i],
          "rtsp_port":array["rtsp_port_"+i],
          "macaddr":array["macaddr_"+i],
          "model":array["model_"+i],
          "model_std":array["model_std_"+i],
          "firmware_version":array["firmware_version_"+i],
          "firmware_version2":array["firmware_version2_"+i],
          "vendor":array["vendor_"+i],
          "sdkver":array["sdkver_"+i],
          "tail":array["tail_"+i],
          "media_xaddr":array["media_xaddr_"+i],
          "token":array["token_"+i],
          "u":array["u_"+i],
          "p":array["p_"+i],
          "auth":array["auth_"+i],
          "use_ssl":array["use_ssl_"+i],
          "u_done":array["u_done_"+i],
          "p_done":array["p_done_"+i],
          "preview_rtsp":array["preview_rtsp_"+i]
        });
      }

      var is_rescan_for_connecting = false;

      for(var i=0; i<$z.current.v.max_count_in_page; i++) {
        if(i<array['entry_cnt']) {
          $("#model"+i).text(list[i].model);
          $("#ipaddr"+i).text(list[i].ipaddr);
          $("#state"+i).text(list[i].str_state);
          $("#select_assign_"+i).val(list[i].ch);

          $("#ipcam_setup"+i).removeProp("disabled");
          $("#select_assign_"+i).removeProp("disabled");
          if(list[i].state == 1) {
            is_rescan_for_connecting = true;
          }
        } else {
          $("#model"+i).text("-");
          $("#ipaddr"+i).text("-");
          $("#state"+i).text("-");

          $("#ipcam_setup"+i).prop("disabled", "disabled");
          $("#select_assign_"+i).prop("disabled", "disabled");
        }
      }

      var max_page = parseInt(parseInt(array['entry_cnt'])/$z.current.v.max_count_in_page);
      if(parseInt(array['entry_cnt'])%$z.current.v.max_count_in_page > 0) {
        max_page += 1;
      }

      $("#max_page").text(max_page);
      $("#current_page").text(1);

      if(is_rescan_for_connecting == true && $z.current.v.isRefreshing == false) {

        setTimeout(function(){
          $z.current.v._getIpcamlist();
        }, 5000);
      }

    },
    update: function(array) {
      //5G Model is default...
      var _update_default = function(array) {
        var analog_type_option = {
          0:"TVI (A)",
          1:"TVI (B)",
          2:"AHD"
        }

        var list_analogtype_radio = null;

        for( var i=0 ; i < INFO_DVRCHANNEL ; i++ ) {
          list_analogtype_radio = $("input[name=analogtype"+i+"]:radio");
          for(var index_list = 0; index_list<list_analogtype_radio.length; index_list++) {
            if(parseInt(list_analogtype_radio[index_list].value) === parseInt(array['analogtype'+i])) {

              list_analogtype_radio[index_list].checked = true;
            }
          }
        }

        //check ipcamera setting start.
        var count_ipcam = 0;
        var options_ipcamera_channel = [];

        for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
          if($("input[name=analogtype"+ch+"]:checked").val() == 8) {
            count_ipcam++;
            options_ipcamera_channel.push(ch);
          }
        }

        if(count_ipcam <= 0) {
          $("#analog_tabs").tabs("disable", 1);
        } else {
          $("#analog_tabs").tabs("enable", 1);
        }

        for(var ch=0; ch<$z.current.v.max_count_in_page; ch++) {
          for(var i=0; i<options_ipcamera_channel.length; i++) {
            $("#select_assign_"+ch).append(
              $('<option></option>').val(options_ipcamera_channel[i]).html("CAM"+(parseInt(options_ipcamera_channel[i])+1))
            );
          }
        }
        //check ipcamera setting end.
      }

      var _update_5hg = function(array) {
        //inner function
        var _make_disable_signal_and_resolution_ui = function(param_index, param_flag){
          $("#5hg_signal_type_"+param_index).prop("disabled", param_flag);
          //$("#5hg_resolution_"+param_index).prop("disabled", param_flag);
          $("#5hg_refresh_"+param_index).prop("disabled", !param_flag); //this condition is opposite with other ui.
        }

        var _hide_mode_signal_resolution_ui = function(param_index) {
          $("#5hg_mode_"+param_index).hide();
          $("#5hg_signal_type_"+param_index).hide();
          $("#5hg_resolution_"+param_index).hide();
          $("#5hg_refresh_"+param_index).hide();
        }

        var _show_mode_signal_resolution_ui = function(param_index) {
          $("#5hg_mode_"+param_index).show();
          $("#5hg_signal_type_"+param_index).show();
          $("#5hg_resolution_"+param_index).show();
          $("#5hg_refresh_"+param_index).show();
        }

        var _make_mode_ui_event_handler = function(param_index) {
          return function() {
            ($("#5hg_mode_"+param_index).val()==0) ? _make_disable_signal_and_resolution_ui(param_index, true)
              : _make_disable_signal_and_resolution_ui(param_index, false);
          }
        }

        var _make_resolution_ui_event_handler = function(param_index) {
          return function() {
            ($("#5hg_resolution_"+param_index).val()==0) ? $("#5hg_nr_filter_"+param_index).val(1)
            : $("#5hg_nr_filter_"+param_index).val(0);
          }
        }

        var _make_input_type_ui_event_handler = function(param_index) {
          return function() {
            ($("#5hg_input_type_"+param_index).val()==1) ? _hide_mode_signal_resolution_ui(param_index)
             : _show_mode_signal_resolution_ui(param_index);
          }
        }

        var _make_refresh_button_ui_event_handler = function(param_index) {
          return function() {
            var action = "action=get_setup&menu=refresh.analogtype";

            for(var i=0; i<INFO_DVRCHANNEL; i++) {
              action += "&analogmode"+i+"="+$("#analogmode"+i).val();
              action += "&analogtype"+i+"="+analogtypeCalculator.make_type_value_from_others_information($("#5hg_input_type_"+i).val(), $("#5hg_signal_type_"+i).val(), $("#5hg_resolution_"+i));
            }
            if($z.debug) {
              actopm += "&debug";
            }

            $.ajax({
              type: "POST",
              url: "/cgi-bin/webra_fcgi.fcgi",
              async: true,
              cache: false,
              data: action,
              success: function(response) {
                var array = encode_to_array(response);
                var temp_analogtype=0;
                var temp_analogmode=0;
                var temp_input_type=0;
                var temp_resolution=0;
                var temp_signaltype=0;

                if(response != null && response.indexOf("DVR In Setup!") >= 0) {
                  alert(langArray['LTXT_ERR_DVRINSETUP']);
                  return false;
                } else {
                  temp_analogtype=0;
                  temp_analogmode=0;
                  temp_input_type=0;
                  temp_resolution=0;
                  temp_signaltype=0;

                  temp_analogtype=array["analogtype"+param_index];
                  temp_analogmode=$("#5hg_mode_"+param_index).val();
                  temp_input_type=analogtypeCalculator.get_input_type_from_type(temp_analogtype);
                  temp_resolution=analogtypeCalculator.get_resolution_from_type(temp_analogtype)
                  temp_signaltype=analogtypeCalculator.get_signal_from_type(temp_analogtype);

                  if(temp_analogmode==0 && temp_input_type==0) {
                    $("#5hg_signal_type_"+param_index).val(temp_signaltype);
                    $("#5hg_resolution_"+param_index).val(temp_resolution);
                  }


                }

                return true;
              }, fail: function(response) {
                alert(langArray["LTXT_ERROR"]);
                return false;
              }
            });
          }
        }

        for(var i=0; i<INFO_DVRCHANNEL; i++) {
          //init value
          temp_input_type=0;

          //update value
          $("#5hg_mode_"+i).val(array["analogmode"+i]);
          $("#5hg_signal_type_"+i).val(analogtypeCalculator.get_signal_from_type(array["analogtype"+i]));
          $("#5hg_resolution_"+i).val(analogtypeCalculator.get_resolution_from_type(array["analogtype"+i]));

          temp_input_type = analogtypeCalculator.get_input_type_from_type(array["analogtype"+i])

          $("#5hg_input_type_"+i).val(temp_input_type);
          temp_input_type==1 ? count_ipcam++ : {};

          //regist event handler
          $("#5hg_mode_"+i).change(_make_mode_ui_event_handler(i));
          $("#5hg_input_type_"+i).change(_make_input_type_ui_event_handler(i));
          $("#5hg_resolution_"+i).change(_make_resolution_ui_event_handler(i));
          $("#5hg_refresh_"+i).bind("click", _make_refresh_button_ui_event_handler(i));
          //disable&enable ui
          $("#5hg_mode_"+i).change();
          $("#5hg_input_type_"+i).change();
          $("#5hg_resolution_"+i).change();
        }
        
        //check ipcamera setting start.
        var temp_input_type=0;
        var count_ipcam = 0;
        var options_ipcamera_channel = [];
        
        for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
          if($("#5hg_input_type_"+ch).val() == 1) {
            count_ipcam++;
            options_ipcamera_channel.push(ch);
          }
        }

        count_ipcam<=0 ? $("#analog_tabs").tabs("disable", 1)
          : $("#analog_tabs").tabs("enable", 1);

        for(var ch=0; ch<$z.current.v.max_count_in_page; ch++) {
          for(var i=0; i<options_ipcamera_channel.length; i++) {
            $("#select_assign_"+ch).append(
              $('<option></option>').val(options_ipcamera_channel[i]).html("CAM"+(parseInt(options_ipcamera_channel[i])+1))
            );
          }
        }

      }

      if (INFO_MODEL.indexOf("5HG")>=0) {
        _update_5hg(array);
      } else {
        _update_default(array);
      }

      if((array['cv_admin'+i] == '1' && array['login_group'] == 'ADMIN')
        || (array['cv_manager'+i] == '1' && array['login_group'] == 'MANAGER')
        || (array['cv_user'+i] == '1' && array['login_group'] == 'USER')
        || (array['act_novideo'].charAt(i) == 1))
      {
        $('#ch'+(i+1)).text('CAM'+(i+1));
      }

      //$("input[name='analogtype0']").change();
      //$("input[name='analogtype8']").change();
      $.scm.Start(true);
    }
  }
});
