/**
 * @author chcha
 */

function selectDrop(jqObj, val)
{
  var inFps = false;

  jqObj.children("option").each( function() {
    if( $(this).val() == val ) {
      inFps = true;
    }
  });

  if( inFps ) {
    jqObj.val(val);
    return null;
  } else {
    jqObj.val(jqObj.children("option:first").val())

    if (jqObj.children("option:first").val() != undefined) {
      return jqObj.children("option:first").val();
    } else {
      return null;
    }

  }
}

$z.v({
    RecOp : {
        showhide_rec_option : function (recmode) {
            if( parseInt(recmode) == 0 ) { // automatic
                $("#automatic_config").show();
                $("#manual_config").hide();
            } else {
                $("#automatic_config").hide();
                $("#manual_config").show();
            }
        },
        init: function() {
          //$("#hd_priority option").text('');
          $('#hd_priority').append($('<option value="0">').html(langArray['LTXT_SETUPREC_OP_HDRECORDINGDATAPRIORITY']));
          $('#hd_priority').append($('<option value="1">').html(langArray['LTXT_SETUPREC_OP_HDIMAGEQUALITYPRIORITY']));
          if (INFO_AUDIO_SUPPORT == '1') {
            $('.tdsfq5 select').removeAttr('disabled');
          } else {
            $('.tdsfq5 select').attr('disabled', 'disabled');
          }

          if(INFO_MODEL.indexOf("5HG") >= 0) {
            $(".warning_1080p").hide();
          }

          if(INFO_MODEL.indexOf("5HGA") < 0) {
            $(".codec").hide();
          }

          var v = this;

          var audList = [langArray['LTXT_OFF'], langArray['LTXT_ON']];

          if( INFO_MODEL.indexOf("ANF") >= 0 || INFO_MODEL.indexOf("ATM") >= 0 ) {
            if(INFO_MODEL.indexOf("H") >= 0 || INFO_MODEL.indexOf("4G") >= 0 || INFO_MODEL.indexOf("5G") >= 0)
              audList = [langArray['LTXT_OFF'],langArray['LTXT_ON']];
            else
              audList = [langArray['LTXT_OFF'], "Ch1", "Ch2", "Ch3", "Ch4"];
          }

          if((INFO_MODEL.indexOf("UTM4G") >= 0) && INFO_DVRCHANNEL >= 16) {
            $("#rec-calc-ima1").parent().attr('colspan', '5');
          }
          else {
            $(".forUTM4G").hide();
          }

          for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
              // Make Camera title label
            $("span.title" + (ch+1) ).html(INFO_CAMTITLE[ch]);

            $("#audio" + ch).empty();
            $("#a_audio" + ch).empty();

            for( var i=0 ; i < audList.length ; i++ ) {
              $("#audio" + ch).append(
                $("<option>").html(audList[i]).val(i));
              $("#a_audio" + ch).append(
                $("<option>").html(audList[i]).val(i));
            }

          }

          $('body').bind("EVT_MODEL_UPDATE", function(event, data) {
              var c = $z.current;

              c.v.update(data);
          });

          if (INFO_VENDOR === 'ALSOK' || INFO_VENDOR == 'TAKENAKA') {
              $(".remove_alsok").hide();
          }
        },
        updateAlarm: function(array, type) {
            var c = $z.current;
            var pre = '';
            var ret;

            if ( type == null ) {
                type = 1;
            }

            switch (type) {
                case 1: // Motion
                default:
                    pre = 'm_';
                    break;
                case 2: // Alarm
                    pre = 'a_';
                    break;
                case 3: // Motion/Alarm
                    pre = 'ma_';
                    break;
            }

            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
              ret = selectDrop($('#size'+ch,'#alarm_rec'), array[pre+'size'].charAt(ch));
              if (ret != null) {
                array[pre+'size'][ch] = ret;
              }
              ret = selectDrop($('#fps'+ch,'#alarm_rec'), array[pre+'fps'].charAt(ch));
              if (ret != null) {
                array[pre+'fps'][ch] = ret;
              }
              ret = selectDrop($('#quality'+ch,'#alarm_rec'), array[pre+'q'].charAt(ch));
              if (ret != null) {
                array[pre+'q'][ch] = ret;
              }
              ret = selectDrop($('#audio'+ch,'#alarm_rec'), array[pre+'aud'].charAt(ch));
              if (ret != null) {
                array[pre+'aud'][ch] = ret;
              }
            }
            c.recCalcAlarm.update(array[pre+'size'], array[pre+'fps']);
        },
        updateIntensive: function(array, type) {
            var c = $z.current;
            var pre = '';

            if ( type == null ) {
                type = 4;
            }

            switch (type) {
                case 4: // Motion
                default:
                    pre = 'im_';
                    break;
                case 5: // Alarm
                    pre = 'ia_';
                    break;
                case 6: // Motion/Alarm
                    pre = 'ima_';
                    break;

            }

            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
              ret = selectDrop($('#n_size'+ch,'#intensive_rec'), array[pre+'size1'].charAt(ch));

              if (ret != null) {
                array[pre+'size1'][ch] = ret;
              }

              ret = selectDrop($('#n_fps'+ch,'#intensive_rec'), array[pre+'fps1'].charAt(ch));
              if (ret != null) {
                array[pre+'fps1'][ch] = ret;
              }
              ret = selectDrop($('#n_quality'+ch,'#intensive_rec'), array[pre+'q1'].charAt(ch));
              if (ret != null) {
                array[pre+'q1'][ch] = ret;
              }
              ret = selectDrop($('#a_size'+ch,'#intensive_rec'), array[pre+'size2'].charAt(ch));
              if (ret != null) {
                array[pre+'size2'][ch] = ret;
              }

              ret = selectDrop($('#a_fps'+ch,'#intensive_rec'), array[pre+'fps2'].charAt(ch));
              if (ret != null) {
                array[pre+'fps2'][ch] = ret;
              }

              ret = selectDrop($('#a_quality'+ch,'#intensive_rec'), array[pre+'q2'].charAt(ch));
              if (ret != null) {
                array[pre+'q2'][ch] = ret;
              }
              ret = selectDrop($('#a_audio'+ch,'#intensive_rec'), array[pre+'aud'].charAt(ch));
              if (ret != null) {
                array[pre+'aud'][ch] = ret;
              }
            }
            c.recCalcIntensive1.update(array[pre+'size1'], array[pre+'fps1']);
            c.recCalcIntensive2.update(array[pre+'size2'], array[pre+'fps2']);
        },
        updateCommon: function(array) {
          $('select#prerec').val(array['prerec']);
          $('select#postrec').val(array['postrec']);
          $('select#panicrec').val(array['panicrec']);

          $('select#prerec2').val(array['prerec']);
          $('select#postrec2').val(array['postrec']);
          $('select#prerec3').val(array['prerec']);
          $('select#postrec3').val(array['postrec']);
        },
        update: function(array) {
            //this.setCameraProfile(array);
            var autocfg = parseInt(array['autocfg']);
            var recmode = array['recmode'];
            var hd_priority = array['hd_priority'];

            $("input:radio").val([autocfg]);

            $('select#recmode').val(array['recmode']);
            $('select#hd_priority').val(array['hd_priority']);
            $('select#schedmode').val(array['schedmode']);
            $('select#bitrate').val(array['bitrate']);
            $('select#codec').val(array['codec']);

            this.showhide_rec_option(recmode);

            this.updateAlarm(array, autocfg);
            this.updateIntensive(array, autocfg);
            this.updateCommon(array);
            switch( autocfg ) {
            case 0:
              $('#hd_priority').removeAttr('disabled');
              break;
            case 1:
            case 2:
            case 3:
              $('#hd_priority').attr('disabled', 'disabled');
              break;
            case 4:
            case 5:
            case 6:
              $('#hd_priority').attr('disabled', 'disabled');
              break;
            }

            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
              if((array['cv_admin'+ch] == '1' && array['login_group'] == 'ADMIN')
                || (array['cv_manager'+ch] == '1' && array['login_group'] == 'MANAGER')
                || (array['cv_user'+ch] == '1' && array['login_group'] == 'USER')
                || (array['act_novideo'].charAt(ch) == '1'))
              {
                $('span.title'+(ch+1)).text('CAM'+(ch+1));
              }
            }
        }
    },
    RecCont : {
        // Param Widget
        paramWidget: new ParamWidget(null,
            function hovercb(day, hour) {
                var c = $z.current;
                var v = c.v;
                var m = c.m;

                c.setCameraProfile(m.data, day, hour);
                v.updateParamByHour(day, hour);
            }
        ),

        // Schedule Widget
        schedWidget: new SchedWidget( {
            indices : [
                {name: langArray['LTXT_OFF'],   style_cls: 'td_isoff',     button: 'dlg_off'},
                {name: langArray['LTXT_ON'],    style_cls: 'td_ison',      button: 'dlg_on'},
            ]},
            function schedcb(widget) {
                var c = $z.current;
                var v = c.v;
                var m = c.m;

                var data = widget.getBindData();
                var day = widget.currentDay;

                var array = v.getSchedArray(data);

                // notify event occur
                $.event.trigger("REC_SCHED_CHANGE", [ data, day ] );
            }
        ),

        /*****************************************
         * Functions for Param Widget
         */

        /*
         * xxxxxxxxxxxxxxxxxxx Not Use this any morexxxxxxxxxxxxxxxxxxxxx
         * xxxxx Make Array for Param Widget (sysdb format -> param widget)
         * xxxxx size    : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon {}...
         * xxxxx fps     : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon {}...
         * xxxxx quality : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon {}...
         * xxxxx audio   : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon {}...
         * xxxxxxxxxxxxxxxxxxx Not Use this any morexxxxxxxxxxxxxxxxxxxxx
         *
         * resolcur
         * fpscur
         * audin
         *
         * *Sysdb format*
         * size : size[day] = "CH1(hr0~23)CH2(hr0~23)..."
         * ...
         *
         * *webra format* (from fcgi)
         * size : size[day] = "HR0(CH1~16) HR1(CH1~16) ..."
         * ...
         *
         */
        parseParam: function(array) {
            var param = {
                size : [],
                fps : [],
                quality : [],
                audio : [],

                resolcur : '',
                fpscur : '',
                audin : ''
            };

            for( var day=0 ; day < 9 ; day++ ) {
                param.size[day] = "";
                param.fps[day] = "";
                param.quality[day] = "";
                param.audio[day] = "";

                param.size[day] = array['size'+day];
                param.fps[day] = array['fps'+day];
                param.quality[day] = array['quality'+day];
                param.audio[day] = array['audio'+day];
            }

            for( var ch =0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                param.resolcur = array['resolcur'+ch];
                param.fpscur = array['fpscur'+ch];
                param.audin = array['audin'+ch];
            }

            return param;
        },

        /*
         * Make Array for Record Sysdb (param widget -> sysdb format)
         * size    : [(CH1:24hr)] [(CH2:24hr)...]
         * fps     : [(CH1:24hr)] [(CH2:24hr)...]
         * quality : [(CH1:24hr)] [(CH2:24hr)...]
         * audio   : [(CH1:24hr)] [(CH2:24hr)...]
         *
         * resolcur
         * fpscur
         * audin
         */
        getParamArray: function() {
            var param = this.paramWidget.getBindData();
            var array = {
                size : [],
                fps : [],
                quality : [],
                audio : [],

                resolcur : '',
                fpscur : '',
                audin : ''
            };

            for( var day=0 ; day < 9 ; day++ ) {
                array['size'+day] = param.size[day];
                array['fps'+day] = param.fps[day];
                array['quality'+day] = param.quality[day];
                array['audio'+day] = param.audio[day];

                array['resolcur'+day] = this.data['resolcur'+day];
            }



            return array;
        },

        /*****************************************
         * Functions for Schedule Widgets
         */

        /*
         * Make Array for Schedwidget (sysdb format -> param widget)
         * Sun[ '(Ch1:24hr)(Ch2:24hr)...' ]
         * Mon[ '(Ch1:24hr)(Ch2:24hr)...' ]  ...
         *
         * day: 0-6(Sun~Sat) 7(Weekly) 8(Holiday)
         *
         * *Sysdb format*
         * size : mode[day] = "CH1(hr0~23)CH2(hr0~23)..."
         *
         */
        parseSched: function(array) {
            var sched = [];

            for( var day=0 ; day < 9 ; day++ ) {
                sched[day] = array['mode'+day];
            }

            return sched;
        },
        // Schedule Widget Function
        /*
         * Make Array for Record Sysdb (param widget -> sysdb format)
         * Sun['(CH1:24hr)(CH2:24hr)...']
         * Mon['(CH1:24hr)(CH2:24hr)...'] ...
         */
        getSchedArray: function() {
            var sched = this.schedWidget.getBindData();
            var array = [];

            for( var day=0 ; day < 9 ; day++ ) {
                array[day] = sched[day];
            }

            return array;
        },

        /*******************************/
        init: function() {
          if (INFO_AUDIO_SUPPORT == '1') {
            $('.audio').removeAttr('disabled');
          } else {
            $('.audio').attr('disabled', 'disabled');
          }

          if ((INFO_MODEL.indexOf('_UTM4G_') >= 0) && INFO_DVRCHANNEL >= 16) {
            $(".tdhead2").css({"width":"19%"});
            $(".tdhead3").css({"width":"19%"});
            $(".tdhead4").css({"width":"19%"});
          }
          else {
            $(".forUTM4G").hide();
          }

          if(INFO_MODEL.indexOf("5HG") >= 0) {
            $(".warning_1080p").hide();
          }

            var v = this;

            var audList = [langArray['LTXT_OFF'], langArray['LTXT_ON']];

            var dayList = [langArray['LTXT_COMBO_MENU_SUN'], langArray['LTXT_COMBO_MENU_MON'], langArray['LTXT_COMBO_MENU_TUE'], langArray['LTXT_COMBO_MENU_WED'], langArray['LTXT_COMBO_MENU_THU'], langArray['LTXT_COMBO_MENU_FRI'], langArray['LTXT_COMBO_MENU_SAT']];
              $("#schmodeSelect").empty()
              for( var i=0 ; i < dayList.length ; i++ ) {
                $("#schmodeSelect").append(
                  $("<option>").html(dayList[i]).val(i));
              }

              $("#schmodeSelect1").empty()
              for( var i=0 ; i < dayList.length ; i++ ) {
                $("#schmodeSelect1").append(
                  $("<option>").html(dayList[i]).val(i));
              }

            if( INFO_MODEL.indexOf("ANF") >= 0 || INFO_MODEL.indexOf("ATM") >= 0 ) {
              if(INFO_MODEL.indexOf("H") >= 0 || (INFO_MODEL.indexOf("4G") >= 0) || INFO_MODEL.indexOf("5G") >= 0)
                audList = [langArray['LTXT_OFF'],langArray['LTXT_ON']];
              else
                audList = [langArray['LTXT_OFF'], "Ch1", "Ch2", "Ch3", "Ch4"];
            }

            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                // Make Camera title label
              //$("span.title" + (ch+1) ).html(INFO_CAMTITLE[ch]);

              $("#paramAudio" + ch).empty()
              for( var i=0 ; i < audList.length ; i++ ) {
                $("#paramAudio" + ch).append(
                  $("<option>").html(audList[i]).val(i));
              }

            }

            this.schedWidget.init();
            this.paramWidget.init();

            $('body').bind("EVT_MODEL_UPDATE", function(event, data) {
                var c = $z.current;

                if( v.paramWidget.selected.length == 0 ) {
                  return;
                }

                var day = v.paramWidget.currentDay;
                var hour = v.paramWidget.selected[0];

                // param update
                var paramdata = v.parseParam(data);
                v.paramWidget.bind(paramdata, day);

                //c.setCameraProfile(data);

                v.updateParamByHour(day, hour);
            });
        },
        updateParam: function(array, hour) {
            var weekly = parseInt(array['schedule']);
            var day;

            if( weekly == 0 ) {
                day = 7;
            } else {
                day = parseInt($('#schmodeSelect').val());
            }

            var paramdata = this.parseParam(array);
            this.paramWidget.bind(paramdata, day);
            this.updateParamByHour(day, hour);
            this.paramWidget.makeColor();
        },
        updateSched: function(array) {
            var weekly = parseInt(array['schedule']);
            var day;

            if( weekly == 0 ) {
                day = 7;
            } else {
                day = parseInt($('#schmodeSelect1').val());
            }
            var sched = this.parseSched(array);
            this.schedWidget.bind(sched, day);
            this.schedWidget.updateByDay(day);
        },
        update: function(array) {
            var weekly = parseInt(array['schedule']);

            if( weekly == 0 ) {
                $(".schmodediv").hide();
            } else {
                $(".schmodediv").show();
            }

            this.updateParam(array, 0);
            this.updateSched(array);
            $z.current.setCameraProfile(array);

            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
              if((array['cv_admin'+ch] == '1' && array['login_group'] == 'ADMIN')
                || (array['cv_manager'+ch] == '1' && array['login_group'] == 'MANAGER')
                || (array['cv_user'+ch] == '1' && array['login_group'] == 'USER')
                || (array['act_novideo'].charAt(ch) == '1'))
              {
                $('span.title'+(ch+1)).text('CAM'+(ch+1));
              }
              else{
                $("span.title" + (ch+1) ).html(INFO_CAMTITLE[ch]);
              }
            }
        },

        /*
         * param should be formed as
         * size    : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon []...
         * fps     : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon []...
         * quality : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon []...
         * audio   : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon []...
         *
         * day : 0-6 (Sun-Sat) 7 (daily) 8 (Holiday)
         */
        updateParamByDay: function(day) {
            this.updateParamByHour(day, 0);
            return;

        },
        updateParamByHour: function(day, hour) {
            var c = $z.current;
            var m = $z.current.m;

            var array = m.data;
            var orig = m.origData;
            var paramdata = this.paramWidget.data;

            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                var sizeObj = $('select#paramsize' + ch);
                var fpsObj = $('select#paramFps' + ch);
                var qObj = $('select#paramQ' + ch);
                var audObj = $('select#paramAudio' + ch);

                var size1, fps1, q1, aud1; // sysdb(converted)
                var size2, fps2, q2, aud2; // orig
                var size_cam, fps_cam, q_cam, aud_cam; // camera

                size1 = paramdata['size'][day].charAt(ch + 16*hour);
                fps1 = paramdata['fps'][day].charAt(ch + 16*hour);
                q1 = paramdata['quality'][day].charAt(ch + 16*hour);
                aud1 = paramdata['audio'][day].charAt(ch + 16*hour);

                size2 = orig['size'+day].charAt(ch + 16*hour);
                fps2 = orig['fps'+day].charAt(ch + 16*hour);
                q2 = orig['quality'+day].charAt(ch + 16*hour);
                aud2 = orig['audio'+day].charAt(ch + 16*hour);

                size_cam = array['resolcur'+ch];
                fps_cam = array['fpscur'+ch];
                q_cam = paramdata['quality'][day].charAt(ch + 16*hour);
                aud_cam = array['audin'+ch];

                // Make Parameter List
                if( array['conn'+ch] == '1' ) {
                    //connected, use camera info
                    if( size1 != size_cam && size1 == size2 )
                        ; // size1 = size2; // TODO Cam Setting

                }

                q = paramdata['quality'][day].charAt(ch + 16*hour);

                sizeObj.val(size1);
                fpsObj.val(fps1);
                qObj.val(q1);
                audObj.val(aud1);
            }
            //update recCalc
            var size = paramdata['size'][day].substr(16*hour, 16);
            var fps = paramdata['fps'][day].substr(16*hour, 16);
            c.recCalc.update(size, fps);
        }

    },
    RecMotion : {
        // Param Widget
        paramWidget: new ParamWidget(null,
            function hovercb(day, hour) {
                var c = $z.current;
                var v = c.v;
                var m = c.m;

                c.setCameraProfile(m.data, day, hour);
                v.updateParamByHour(day, hour);
            }
        ),

        // Schedule Widget
        schedWidget: new SchedWidget( {
            indices : [
                {name: langArray['LTXT_OFF'],   style_cls: 'td_isoff',     button: 'dlg_off'},
                {name: langArray['LTXT_ON'],    style_cls: 'td_ison',      button: 'dlg_on'},
            ]},
            function schedcb(widget) {
                var c = $z.current;
                var v = c.v;
                var m = c.m;

                var data = widget.getBindData();
                var day = widget.currentDay;

                var array = v.getSchedArray(data);

                // notify event occur
                $.event.trigger("REC_SCHED_CHANGE", [ data, day ] );
            }
        ),

        /*****************************************
         * Functions for Param Widget
         */

        /*
         * Make Array for Param Widget (sysdb format -> param widget)
         * size    : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon {}...
         * fps     : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon {}...
         * quality : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon {}...
         * audio   : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon {}...
         *
         * resolcur
         * fpscur
         * audin
         *
         * *Sysdb format*
         * size : size[day] = "CH1(hr0~23)CH2(hr0~23)..."
         * ...
         *
         */
        parseParam2: function(array) {
            var param = {
                size : [],
                fps : [],
                quality : [],
                audio : [],

                resolcur : '',
                fpscur : '',
                audin : ''
            };

            for( var day=0 ; day < 9 ; day++ ) {
                param.size[day] = "";
                param.fps[day] = "";
                param.quality[day] = "";
                param.audio[day] = "";

                for( var hr=0 ; hr < 24 ; hr++ ) {
                    for( var ch=0 ; ch < 16 ; ch++ ) {
                        param.size[day] += array['size'+day].charAt(ch*24+hr);
                        param.fps[day] += array['fps'+day].charAt(ch*24+hr);
                        param.quality[day] += array['quality'+day].charAt(ch*24+hr);
                        param.audio[day] += array['audio'+day].charAt(ch*24+hr);
                    }
                }
            }

            for( var ch =0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                param.resolcur = array['resolcur'+ch];
                param.fpscur = array['fpscur'+ch];
                param.audin = array['audin'+ch];
            }

            return param;
        },

        parseParam: function(array) {
            var param = {
                size : [],
                fps : [],
                quality : [],
                audio : [],

                resolcur : '',
                fpscur : '',
                audin : ''
            };

            for( var day=0 ; day < 9 ; day++ ) {
                param.size[day] = "";
                param.fps[day] = "";
                param.quality[day] = "";
                param.audio[day] = "";

                param.size[day] = array['size'+day];
                param.fps[day] = array['fps'+day];
                param.quality[day] = array['quality'+day];
                param.audio[day] = array['audio'+day];
            }

            for( var ch =0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                param.resolcur = array['resolcur'+ch];
                param.fpscur = array['fpscur'+ch];
                param.audin = array['audin'+ch];
            }

            return param;
        },


        /*
         * Make Array for Record Sysdb (param widget -> sysdb format)
         * size    : [(CH1:24hr)] [(CH2:24hr)...]
         * fps     : [(CH1:24hr)] [(CH2:24hr)...]
         * quality : [(CH1:24hr)] [(CH2:24hr)...]
         * audio   : [(CH1:24hr)] [(CH2:24hr)...]
         *
         * resolcur
         * fpscur
         * audin
         */
        getParamArray: function() {
            var param = this.paramWidget.getBindData();
            var array = {
                size : [],
                fps : [],
                quality : [],
                audio : [],

                resolcur : '',
                fpscur : '',
                audin : ''
            };

            for( var day=0 ; day < 9 ; day++ ) {
                array['size'+day] = param.size[day];
                array['fps'+day] = param.fps[day];
                array['quality'+day] = param.quality[day];
                array['audio'+day] = param.audio[day];

                array['resolcur'+day] = this.data['resolcur'+day];
            }



            return array;
        },

        /*****************************************
         * Functions for Schedule Widgets
         */

        /*
         * Make Array for Schedwidget (sysdb format -> param widget)
         * Sun[ '(Ch1:24hr)(Ch2:24hr)...' ]
         * Mon[ '(Ch1:24hr)(Ch2:24hr)...' ]  ...
         *
         * day: 0-6(Sun~Sat) 7(Weekly) 8(Holiday)
         *
         * *Sysdb format*
         * size : mode[day] = "CH1(hr0~23)CH2(hr0~23)..."
         *
         */
        parseSched: function(array) {
            var sched = [];

            for( var day=0 ; day < 9 ; day++ ) {
                sched[day] = array['mode'+day];
            }

            return sched;
        },
        // Schedule Widget Function
        /*
         * Make Array for Record Sysdb (param widget -> sysdb format)
         * Sun['(CH1:24hr)(CH2:24hr)...']
         * Mon['(CH1:24hr)(CH2:24hr)...'] ...
         */
        getSchedArray: function() {
            var sched = this.schedWidget.getBindData();
            var array = [];

            for( var day=0 ; day < 9 ; day++ ) {
                array[day] = sched[day];
            }

            return array;
        },

        /*******************************/
        init: function() {
          if (INFO_AUDIO_SUPPORT == '1') {
            $('.audio').removeAttr('disabled');
          } else {
            $('.audio').attr('disabled', 'disabled');
          }

          if ((INFO_MODEL.indexOf('_UTM4G_') >= 0) && INFO_DVRCHANNEL >= 16) {
            $(".tdhead2").css({"width":"19%"});
            $(".tdhead3").css({"width":"19%"});
            $(".tdhead4").css({"width":"19%"});
          }
          else {
            $(".forUTM4G").hide();
          }

          if(INFO_MODEL.indexOf("5HG") >= 0) {
            $(".warning_1080p").hide();
          }

            var v = this;

            var audList = [langArray['LTXT_OFF'], langArray['LTXT_ON']];
            var dayList = [langArray['LTXT_COMBO_MENU_SUN'], langArray['LTXT_COMBO_MENU_MON'], langArray['LTXT_COMBO_MENU_TUE'], langArray['LTXT_COMBO_MENU_WED'], langArray['LTXT_COMBO_MENU_THU'], langArray['LTXT_COMBO_MENU_FRI'], langArray['LTXT_COMBO_MENU_SAT']];
              $("#schmodeSelect").empty()
              for( var i=0 ; i < dayList.length ; i++ ) {
                $("#schmodeSelect").append(
                  $("<option>").html(dayList[i]).val(i));
              }
              $("#schmodeSelect1").empty()
              for( var i=0 ; i < dayList.length ; i++ ) {
                $("#schmodeSelect1").append(
                  $("<option>").html(dayList[i]).val(i));
              }


            if( INFO_MODEL.indexOf("ANF") >= 0 || INFO_MODEL.indexOf("ATM") >= 0 ) {
              if(INFO_MODEL.indexOf("H") >= 0 || INFO_MODEL.indexOf("4G") || INFO_MODEL.indexOf("5G") >= 0)
                audList = [langArray['LTXT_OFF'],langArray['LTXT_ON']];
              else
                audList = [langArray['LTXT_OFF'], "Ch1", "Ch2", "Ch3", "Ch4"];
            }

            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                // Make Camera title label
              $("span.title" + (ch+1) ).html(INFO_CAMTITLE[ch]);

              $("#paramAudio" + ch).empty()
              for( var i=0 ; i < audList.length ; i++ ) {
                $("#paramAudio" + ch).append(
                  $("<option>").html(audList[i]).val(i));
              }
            }

            this.schedWidget.init();
            this.paramWidget.init();

            $('body').bind("EVT_MODEL_UPDATE", function(event, data) {
                var c = $z.current;

                //v.paramWidget.updateData(encode_to_array(data));
                if( v.paramWidget.selected.length == 0 ) {
                  return;
                }

                var day = v.paramWidget.currentDay;
                var hour = v.paramWidget.selected[0];

                // param update
                var paramdata = v.parseParam(data);
                v.paramWidget.bind(paramdata, day);

                //c.setCameraProfile(data);

                v.updateParamByHour(day, hour);

            });
        },
        updateParam: function(array, hour) {
            var weekly = parseInt(array['schedule']);
            var day;

            if( weekly == 0 ) {
                day = 7;
            } else {
                day = parseInt($('#schmodeSelect').val());
            }

            var paramdata = this.parseParam(array);
            this.paramWidget.bind(paramdata, day);
            this.updateParamByHour(day, hour);
        },
        updateSched: function(array) {
            var weekly = parseInt(array['schedule']);
            var day;

            if( weekly == 0 ) {
                day = 7;
            } else {
                day = parseInt($('#schmodeSelect1').val());
            }
            var sched = this.parseSched(array);
            this.schedWidget.bind(sched, day);
            this.schedWidget.updateByDay(day);
        },
        update: function(array) {
            var weekly = parseInt(array['schedule']);

            if( weekly == 0 ) {
                $(".schmodediv").hide();
            } else {
                $(".schmodediv").show();
            }

            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
              if((array['cv_admin'+ch] == '1' && array['login_group'] == 'ADMIN')
                || (array['cv_manager'+ch] == '1' && array['login_group'] == 'MANAGER')
                || (array['cv_user'+ch] == '1' && array['login_group'] == 'USER')
                || (array['act_novideo'].charAt(ch) == '1'))
              {
                $('span.title'+(ch+1)).text('CAM'+(ch+1));
              }
            }

            this.updateParam(array, 0);
            this.paramWidget.makeColor();
            this.updateSched(array);
            $z.current.setCameraProfile(array);
        },

        /*
         * param should be formed as
         * size    : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon []...
         * fps     : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon []...
         * quality : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon []...
         * audio   : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon []...
         *
         * day : 0-6 (Sun-Sat) 7 (daily) 8 (Holiday)
         */
        updateParamByDay: function(day) {
            this.updateParamByHour(day, 0);
            return;
        },
        updateParamByHour: function(day, hour) {
            var c = $z.current;
            var m = $z.current.m;

            var array = m.data;
            var orig = m.origData;
            var paramdata = this.paramWidget.data;

            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                var sizeObj = $('select#paramsize' + ch);
                var fpsObj = $('select#paramFps' + ch);
                var qObj = $('select#paramQ' + ch);
                var audObj = $('select#paramAudio' + ch);

                var size1, fps1, q1, aud1; // sysdb
                var size2, fps2, q2, aud2; // orig
                var size_cam, fps_cam, q_cam, aud_cam; // camera

                size1 = paramdata['size'][day].charAt(ch + 16*hour);
                fps1 = paramdata['fps'][day].charAt(ch + 16*hour);
                q1 = paramdata['quality'][day].charAt(ch + 16*hour);
                aud1 = paramdata['audio'][day].charAt(ch + 16*hour);

                size2 = orig['size'+day].charAt(ch + 16*hour);
                fps2 = orig['fps'+day].charAt(ch + 16*hour);
                q2 = orig['quality'+day].charAt(ch + 16*hour);
                aud2 = orig['audio'+day].charAt(ch + 16*hour);

                size_cam = array['resolcur'+ch];
                fps_cam = array['fpscur'+ch];
                q_cam = paramdata['quality'][day].charAt(ch + 16*hour);
                aud_cam = array['audin'+ch];

                // Make Parameter List
                if( array['conn'+ch] == '1' ) {
                    //connected, use camera info
                    if( size1 != size_cam && size1 == size2 )
                        ; // size1 = size2; // TODO Cam Setting

                    /*
                    if( fps1 != fps_cam && fps1 == fps2 )
                        fps1 = fps_cam;

                    if( aud1 != aud_cam )
                        aud1 = aud_cam;
                    */
                }

                q = paramdata['quality'][day].charAt(ch + 16*hour);

                sizeObj.val(size1);
                fpsObj.val(fps1);
                qObj.val(q1);
                audObj.val(aud1);
            }
            //update recCalc
            var size = paramdata['size'][day].substr(16*hour, 16);
            var fps = paramdata['fps'][day].substr(16*hour, 16);
            c.recCalc.update(size, fps);
        }
    },
    RecAlarm : {
        // Param Widget
        paramWidget: new ParamWidget(null,
            function hovercb(day, hour) {
                var c = $z.current;
                var v = c.v;
                var m = c.m;

                c.setCameraProfile(m.data, day, hour);
                v.updateParamByHour(day, hour);
            }
        ),

        // Schedule Widget
        schedWidget: new SchedWidget( {
            indices : [
                {name: langArray['LTXT_OFF'],   style_cls: 'td_isoff',     button: 'dlg_off'},
                {name: langArray['LTXT_ON'],    style_cls: 'td_ison',      button: 'dlg_on'},
            ]},
            function schedcb(widget) {
                var c = $z.current;
                var v = c.v;
                var m = c.m;

                var data = widget.getBindData();
                var day = widget.currentDay;

                var array = v.getSchedArray(data);

                // notify event occur
                $.event.trigger("REC_SCHED_CHANGE", [ data, day ] );
            }
        ),

        /*****************************************
         * Functions for Param Widget
         */

        /*
         * Make Array for Param Widget (sysdb format -> param widget)
         * size    : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon {}...
         * fps     : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon {}...
         * quality : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon {}...
         * audio   : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon {}...
         *
         * resolcur
         * fpscur
         * audin
         *
         * *Sysdb format*
         * size : size[day] = "CH1(hr0~23)CH2(hr0~23)..."
         * ...
         *
         */
        parseParam2: function(array) {
            var param = {
                size : [],
                fps : [],
                quality : [],
                audio : [],

                resolcur : '',
                fpscur : '',
                audin : ''
            };

            for( var day=0 ; day < 9 ; day++ ) {
                param.size[day] = "";
                param.fps[day] = "";
                param.quality[day] = "";
                param.audio[day] = "";

                for( var hr=0 ; hr < 24 ; hr++ ) {
                    for( var ch=0 ; ch < 16 ; ch++ ) {
                        param.size[day] += array['size'+day].charAt(ch*24+hr);
                        param.fps[day] += array['fps'+day].charAt(ch*24+hr);
                        param.quality[day] += array['quality'+day].charAt(ch*24+hr);
                        param.audio[day] += array['audio'+day].charAt(ch*24+hr);
                    }
                }
            }

            for( var ch =0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                param.resolcur = array['resolcur'+ch];
                param.fpscur = array['fpscur'+ch];
                param.audin = array['audin'+ch];
            }

            return param;
        },

        parseParam: function(array) {
            var param = {
                size : [],
                fps : [],
                quality : [],
                audio : [],

                resolcur : '',
                fpscur : '',
                audin : ''
            };

            for( var day=0 ; day < 9 ; day++ ) {
                param.size[day] = "";
                param.fps[day] = "";
                param.quality[day] = "";
                param.audio[day] = "";

                param.size[day] = array['size'+day];
                param.fps[day] = array['fps'+day];
                param.quality[day] = array['quality'+day];
                param.audio[day] = array['audio'+day];
            }

            for( var ch =0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                param.resolcur = array['resolcur'+ch];
                param.fpscur = array['fpscur'+ch];
                param.audin = array['audin'+ch];
            }

            return param;
        },


        /*
         * Make Array for Record Sysdb (param widget -> sysdb format)
         * size    : [(CH1:24hr)] [(CH2:24hr)...]
         * fps     : [(CH1:24hr)] [(CH2:24hr)...]
         * quality : [(CH1:24hr)] [(CH2:24hr)...]
         * audio   : [(CH1:24hr)] [(CH2:24hr)...]
         *
         * resolcur
         * fpscur
         * audin
         */
        getParamArray: function() {
            var param = this.paramWidget.getBindData();
            var array = {
                size : [],
                fps : [],
                quality : [],
                audio : [],

                resolcur : '',
                fpscur : '',
                audin : ''
            };

            for( var day=0 ; day < 9 ; day++ ) {
                array['size'+day] = param.size[day];
                array['fps'+day] = param.fps[day];
                array['quality'+day] = param.quality[day];
                array['audio'+day] = param.audio[day];

                array['resolcur'+day] = this.data['resolcur'+day];
            }



            return array;
        },

        /*****************************************
         * Functions for Schedule Widgets
         */

        /*
         * Make Array for Schedwidget (sysdb format -> param widget)
         * Sun[ '(Ch1:24hr)(Ch2:24hr)...' ]
         * Mon[ '(Ch1:24hr)(Ch2:24hr)...' ]  ...
         *
         * day: 0-6(Sun~Sat) 7(Weekly) 8(Holiday)
         *
         * *Sysdb format*
         * size : mode[day] = "CH1(hr0~23)CH2(hr0~23)..."
         *
         */
        parseSched: function(array) {
            var sched = [];

            for( var day=0 ; day < 9 ; day++ ) {
                sched[day] = array['mode'+day];
            }

            return sched;
        },
        // Schedule Widget Function
        /*
         * Make Array for Record Sysdb (param widget -> sysdb format)
         * Sun['(CH1:24hr)(CH2:24hr)...']
         * Mon['(CH1:24hr)(CH2:24hr)...'] ...
         */
        getSchedArray: function() {
            var sched = this.schedWidget.getBindData();
            var array = [];

            for( var day=0 ; day < 9 ; day++ ) {
                array[day] = sched[day];
            }

            return array;
        },

        /*******************************/
        init: function() {
          if (INFO_AUDIO_SUPPORT == '1') {
            $('.audio').removeAttr('disabled');
          } else {
            $('.audio').attr('disabled', 'disabled');
          }

          if ((INFO_MODEL.indexOf('_UTM4G_') >= 0) && INFO_DVRCHANNEL >= 16) {
            $(".tdhead2").css({"width":"19%"});
            $(".tdhead3").css({"width":"19%"});
            $(".tdhead4").css({"width":"19%"});
          }
          else {
            $(".forUTM4G").hide();
          }

          if(INFO_MODEL.indexOf("5HG") >= 0) {
            $(".warning_1080p").hide();
          }

            var v = this;

            var audList = [langArray['LTXT_OFF'], langArray['LTXT_ON']];
            var dayList = [langArray['LTXT_COMBO_MENU_SUN'], langArray['LTXT_COMBO_MENU_MON'], langArray['LTXT_COMBO_MENU_TUE'], langArray['LTXT_COMBO_MENU_WED'], langArray['LTXT_COMBO_MENU_THU'], langArray['LTXT_COMBO_MENU_FRI'], langArray['LTXT_COMBO_MENU_SAT']];
              $("#schmodeSelect").empty()
              for( var i=0 ; i < dayList.length ; i++ ) {
                $("#schmodeSelect").append(
                  $("<option>").html(dayList[i]).val(i));
              }

              $("#schmodeSelect1").empty()
              for( var i=0 ; i < dayList.length ; i++ ) {
                $("#schmodeSelect1").append(
                  $("<option>").html(dayList[i]).val(i));
              }

            if( INFO_MODEL.indexOf("ANF") >= 0 || INFO_MODEL.indexOf("ATM") >= 0 ) {
              if(INFO_MODEL.indexOf("H") >= 0 || INFO_MODEL.indexOf("4G") || INFO_MODEL.indexOf("5G") >= 0)
                audList = [langArray['LTXT_OFF'],langArray['LTXT_ON']];
              else
                audList = [langArray['LTXT_OFF'], "Ch1", "Ch2", "Ch3", "Ch4"];
            }

            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                // Make Camera title label
              $("span.title" + (ch+1) ).html(INFO_CAMTITLE[ch]);

              $("#paramAudio" + ch).empty()
              for( var i=0 ; i < audList.length ; i++ ) {
                $("#paramAudio" + ch).append(
                  $("<option>").html(audList[i]).val(i));
              }
            }

            this.schedWidget.init();
            this.paramWidget.init();

            $('body').bind("EVT_MODEL_UPDATE", function(event, data) {
                var c = $z.current;

                //v.paramWidget.updateData(encode_to_array(data));
                if( v.paramWidget.selected.length == 0 ) {
                  return;
                }

                var day = v.paramWidget.currentDay;
                var hour = v.paramWidget.selected[0];

                // param update
                var paramdata = v.parseParam(data);
                v.paramWidget.bind(paramdata, day);

                //c.setCameraProfile(data);

                v.updateParamByHour(day, hour);
            });
        },
        updateParam: function(array, hour) {
            var weekly = parseInt(array['schedule']);
            var day;

            if( weekly == 0 ) {
                day = 7;
            } else {
                day = parseInt($('#schmodeSelect').val());
            }

            var paramdata = this.parseParam(array);
            this.paramWidget.bind(paramdata, day);
            this.updateParamByHour(day, hour);
        },
        updateSched: function(array) {
            var weekly = parseInt(array['schedule']);
            var day;

            if( weekly == 0 ) {
                day = 7;
            } else {
                day = parseInt($('#schmodeSelect1').val());
            }
            var sched = this.parseSched(array);
            this.schedWidget.bind(sched, day);
            this.schedWidget.updateByDay(day);
        },
        update: function(array) {
            var weekly = parseInt(array['schedule']);

            if( weekly == 0 ) {
                $(".schmodediv").hide();
            } else {
                $(".schmodediv").show();
            }

            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
              if((array['cv_admin'+ch] == '1' && array['login_group'] == 'ADMIN')
                || (array['cv_manager'+ch] == '1' && array['login_group'] == 'MANAGER')
                || (array['cv_user'+ch] == '1' && array['login_group'] == 'USER')
                || (array['act_novideo'].charAt(ch) == '1'))
              {
                $('span.title'+(ch+1)).text('CAM'+(ch+1));
              }
            }

            this.updateParam(array, 0);
            this.paramWidget.makeColor();
            this.updateSched(array);
            $z.current.setCameraProfile(array);
        },

        /*
         * param should be formed as
         * size    : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon []...
         * fps     : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon []...
         * quality : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon []...
         * audio   : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon []...
         *
         * day : 0-6 (Sun-Sat) 7 (daily) 8 (Holiday)
         */
        updateParamByDay: function(day) {
            this.updateParamByHour(day, 0);
            return;
        },
        updateParamByHour: function(day, hour) {
            var c = $z.current;
            var m = $z.current.m;

            var array = m.data;
            var orig = m.origData;
            var paramdata = this.paramWidget.data;

            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                var sizeObj = $('select#paramsize' + ch);
                var fpsObj = $('select#paramFps' + ch);
                var qObj = $('select#paramQ' + ch);
                var audObj = $('select#paramAudio' + ch);

                var size1, fps1, q1, aud1; // sysdb
                var size2, fps2, q2, aud2; // camera

                var size1, fps1, q1, aud1; // sysdb
                var size2, fps2, q2, aud2; // orig
                var size_cam, fps_cam, q_cam, aud_cam; // camera

                size1 = paramdata['size'][day].charAt(ch + 16*hour);
                fps1 = paramdata['fps'][day].charAt(ch + 16*hour);
                q1 = paramdata['quality'][day].charAt(ch + 16*hour);
                aud1 = paramdata['audio'][day].charAt(ch + 16*hour);

                size2 = orig['size'+day].charAt(ch + 16*hour);
                fps2 = orig['fps'+day].charAt(ch + 16*hour);
                q2 = orig['quality'+day].charAt(ch + 16*hour);
                aud2 = orig['audio'+day].charAt(ch + 16*hour);

                size_cam = array['resolcur'+ch];
                fps_cam = array['fpscur'+ch];
                q_cam = paramdata['quality'][day].charAt(ch + 16*hour);
                aud_cam = array['audin'+ch];

                // Make Parameter List
                if( array['conn'+ch] == '1' ) {
                    //connected, use camera info
                    if( size1 != size_cam && size1 == size2 )
                        ; // size1 = size2; // TODO Cam Setting

                    /*
                    if( fps1 != fps_cam && fps1 == fps2 )
                        fps1 = fps_cam;

                    if( aud1 != aud_cam )
                        aud1 = aud_cam;
                    */
                }

                q = paramdata['quality'][day].charAt(ch + 16*hour);

                sizeObj.val(size1);
                fpsObj.val(fps1);
                qObj.val(q1);
                audObj.val(aud1);
            }
            //update recCalc
            var size = paramdata['size'][day].substr(16*hour, 16);
            var fps = paramdata['fps'][day].substr(16*hour, 16);
            c.recCalc.update(size, fps);
        }
    },
    RecPanic : {
        init: function() {
          if (INFO_AUDIO_SUPPORT == '1') {
            $('.audio').removeAttr('disabled');
          } else {
            $('.audio').attr('disabled', 'disabled');
          }

          if ((INFO_MODEL.indexOf('_UTM4G_') >= 0) && INFO_DVRCHANNEL >= 16) {
            $(".tdhead2").css({"width":"19%"});
            $(".tdhead3").css({"width":"19%"});
            $(".tdhead4").css({"width":"19%"});
          }
          else {
            $(".forUTM4G").hide();
          }

          if(INFO_MODEL.indexOf("5HG") >= 0) {
            $(".warning_1080p").hide();
          }

            var audList = [langArray['LTXT_OFF'], langArray['LTXT_ON']];

            if( INFO_MODEL.indexOf("ANF") >= 0 || INFO_MODEL.indexOf("ATM") >= 0 ) {
              if(INFO_MODEL.indexOf("H") >= 0 || INFO_MODEL.indexOf("4G") || INFO_MODEL.indexOf("5G") >= 0)
                audList = [langArray['LTXT_OFF'],langArray['LTXT_ON']];
              else
                audList = [langArray['LTXT_OFF'], "Ch1", "Ch2", "Ch3", "Ch4"];
            }

            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                // Make Camera title label
                //$("span.title" + (ch+1) ).html(INFO_CAMTITLE[ch]);

              $("select#audio" + ch).empty()
              for( var i=0 ; i < audList.length ; i++ ) {
                $("select#audio" + ch).append(
                  $("<option>").html(audList[i]).val(i));
              }
            }
            $('body').bind("EVT_MODEL_UPDATE", function(event, data) {
                var c = $z.current;

                c.v.update(data);
            });
        },
        update: function(array) {
            var c = $z.current;
            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                $('select#size'+ch).val(array['size'].charAt(ch));
                $('select#fps'+ch).val(array['fps'].charAt(ch));
                $('select#quality'+ch).val(array['quality'].charAt(ch));
                $('select#audio'+ch).val(array['audio'].charAt(ch));

                if((array['cv_admin'+ch] == '1' && array['login_group'] == 'ADMIN')
                  || (array['cv_manager'+ch] == '1' && array['login_group'] == 'MANAGER')
                  || (array['cv_user'+ch] == '1' && array['login_group'] == 'USER')
                  || (array['act_novideo'].charAt(ch) == '1'))
                {
                  $('span.title'+(ch+1)).text('CAM'+(ch+1));
                }
                else {
                  $("span.title" + (ch+1) ).html(INFO_CAMTITLE[ch]);
                }
            }
            //update recCalc

            c.recCalc.update(array['size'], array['fps']);
        }
    },
    NetStream : {
        init: function() {
            channel_enable();

            /*for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                // Make Camera title label
                $("span.title" + (ch+1) ).html(INFO_CAMTITLE[ch]);

            }*/
            $('body').bind("EVT_MODEL_UPDATE", function(event, data) {
                var c = $z.current;

                c.v.update(data);
            });

            $(".tdhead2").hide();
            $(".tdsfq2").hide();

            if (INFO_VENDOR === 'ALSOK' || INFO_VENDOR === 'TAKENAKA') {
              $(".tdsfq4").show();
              $(".tdhead4").show();
            }
            else {
              $(".tdsfq4").hide();
              $(".tdhead4").hide();
            }

            if (INFO_VENDOR === 'ALSOK' || INFO_VENDOR == 'TAKENAKA') {
                $(".remove_alsok").hide();
            }
        },
        update: function(array) {
            var c = $z.current;
            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                $('select#size'+ch).val(array['size'].charAt(ch));
                $('select#fps'+ch).val(array['fps'].charAt(ch));
                $('select#quality'+ch).val(array['quality'].charAt(ch));

                if((array['cv_admin'+ch] == '1' && array['login_group'] == 'ADMIN')
                  || (array['cv_manager'+ch] == '1' && array['login_group'] == 'MANAGER')
                  || (array['cv_user'+ch] == '1' && array['login_group'] == 'USER')
                  || (array['act_novideo'].charAt(ch) == '1'))
                {
                  $('span.title'+(ch+1)).text('CAM'+(ch+1));
                }
                else {
                  $("span.title" + (ch+1) ).html(INFO_CAMTITLE[ch]);
                }
            }
            //update recCalc
            if( INFO_MODEL.indexOf("_HDY_") < 0 ) {
              c.recCalc.update(array['size'], array['fps']);
            }
            if (array['stream_control']) {
              setCheckByChar($('#stream_control'), array['stream_control']);
            }
        }

    },
    StorageCalc : {
        init: function() {

        },
        update: function(array) {
        }
    },
  RecAudioMap : {
    init: function() {
      var audioin = new Array();

      for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
        // Make Camera title label
        $("#cam" + ch ).html(INFO_CAMTITLE[ch]);
      }

      if( (INFO_MODEL.indexOf('4G') > 0 || INFO_MODEL.indexOf('5G') > 0 || INFO_MODEL.indexOf('5X') > 0) || INFO_MODEL.indexOf('5HG') > 0 && (typeof(INFO_AUDIO_IN_COUNT) != 'undefined') && (parseInt(INFO_AUDIO_IN_COUNT) > 0) ) {
        var audioTotal = parseInt(INFO_AUDIO_IN_COUNT) + parseInt(INFO_AUDIO_IN_IPCAM_COUNT);
        audioin.push(langArray['LTXT_AUDIO_IN'] + '');
        // for (var i = 1; i <= INFO_AUDIO_IN_COUNT; i += 1) {
        //   audioin.push(langArray['LTXT_AUDIO'] +' ' + i);// audio multi lang + number
        // }
        for (var i = 1; i <= audioTotal; i += 1) {
          i <= INFO_AUDIO_IN_COUNT ? audioin.push(langArray['LTXT_AUDIO'] +' ' + i) : audioin.push("IPCAM AUDIO " + (i-INFO_AUDIO_IN_COUNT));
        }
      } else if (INFO_MODEL.indexOf('HDS') >= 0) {
        audioin.push(langArray['LTXT_AUDIO_IN'] + '');
        var normalStart, normalEnd,
            sdiStart, sdiEnd;

        if (INFO_MODEL.indexOf('0806') >= 0) {
          normalStart = 1;
          normalEnd = 4;
          sdiStart = 1;
          sdiEnd = 8;
        } else if (INFO_MODEL.indexOf('1609') >= 0) {
          normalStart = 1;
          normalEnd = 8;
          sdiStart = 9;
          sdiEnd = 16;
        }

        for (var ch = normalStart ; ch <= normalEnd ; ch += 1) {
          audioin.push(langArray['LTXT_AUDIO'] + ' ' + ch);
        }

        for (var ch = sdiStart ; ch <= sdiEnd ; ch += 1) {
          audioin.push(langArray['LTXT_AUDIO'] + ' ' + ch + '(SDI)');
        }
      } else if ( INFO_MODEL.match("ATM_[0-9]+H") != null ) {
        audioin.push(langArray['LTXT_AUDIO_IN'] + '');
        for (var i = 1; i <= 4; i += 1) {
          audioin.push(langArray['LTXT_AUDIO'] +' ' + i);// audio multi lang + number
        }
      } else if ( INFO_MODEL.match("ANF_[0-9]+H") != null ) {
        audioin.push(langArray['LTXT_AUDIO_IN'] + '');
        for (var i = 1; i <= INFO_DVRCHANNEL; i += 1) {
          audioin.push(langArray['LTXT_AUDIO'] +' ' + i);// audio multi lang + number
        }
      } else if ( INFO_MODEL.match("UTM_[0-9]+D") != null ) {
        audioin.push(langArray['LTXT_AUDIO_IN'] + '');
        for (var i = 1; i <= 4; i += 1) {
          audioin.push(langArray['LTXT_AUDIO'] +' ' + i);// audio multi lang + number
        }
      } else {
        audioin.push(langArray['LTXT_AUDIO_IN'] + '');
        for (var i = 1; i <= INFO_DVRCHANNEL; i += 1) {
          audioin.push(langArray['LTXT_AUDIO'] +' ' + i);// audio multi lang + number
        }

      }

      makeSelectOptions('#audio_in', audioin);
      audioin.shift();
      for (var i = 0; i < INFO_DVRCHANNEL; i += 1) {
        makeSelectOptions('#audio_in' + i, audioin);
      }

      // event
    },
    update: function(array) {
      for (var i = 0 ; i < INFO_DVRCHANNEL ; i += 1) {
        makeSelectSelected('#audio_in' + i, parseInt(array['audio_ch'].charAt(i), 32));

        if((array['cv_admin'+i] == '1' && array['login_group'] == 'ADMIN')
          || (array['cv_manager'+i] == '1' && array['login_group'] == 'MANAGER')
          || (array['cv_user'+i] == '1' && array['login_group'] == 'USER')
          || (array['act_novideo'].charAt(i) == '1'))
        {
          $('#cam'+(i)).text('CAM'+(i+1));
        }
      }
    }
  }
});
