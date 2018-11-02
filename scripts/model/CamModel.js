/**
* @author chcha
*/

$z.m({
  CamTitle: {
    menu : 'camera.title',

    beforeLoad : function(data) {
      return data;
    },
    beforeSave : function(data) {
      if( !this.compareTo(data) ) {
        return false;
      }

      var isEmpty = 0;

      dvrpoke.stop();

      for(var name in data){
        if((this.origData[name] != data[name]) && (data[name] == "")) {
          isEmpty |= 1;
        }
      }

      if(isEmpty) {
        var isContinueApply = confirm(langArray["LTXT_CAMTITLE_EMPTY"]);
        if(isContinueApply == false) {
          return false;
        }
      }

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
      dvrpoke.start();
      return procResult(result);
    }
  },
  CamImage : {
    menu : 'camera.image',
    compareTo: function(curArr) {
      for( name in curArr) {
        if (name == "ch"
          ||name == "fps_max"
          ||name == "bitrate_max"
          ||name == "bitrate_min")
          continue;
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
      if( !this.compareTo(data) ) {
        return false;
      }

      for(var name in data) {
        if((name.indexOf("brightness")>=0
            || name.indexOf("contrast")>=0
            || name.indexOf("tint")>=0
            || name.indexOf("color")>=0
            || name.indexOf("sharpness")>=0) && data[name] == "") {
          alert(langArray['LTXT_PLEASE_INPUT_NUMBER']);
          return false;
        }

        if(name.indexOf('sharpness') >= 0 && (data[name] < 0 || data[name] > 8)){
          alert(errFieldValOver+" [0~8]");
          return false;
        } else if((name.indexOf("brightness")>=0
            || name.indexOf("contrast")>=0
            || name.indexOf("tint")>=0
            || name.indexOf("color")>=0) && (data[name] < 0 || data[name] > 100)) {
          alert(errFieldValOver+" [0~100]");
          return false;
        }
      }

      for(var ch=0; ch<INFO_DVRCHANNEL; ch++) {
        for(var idx_encoder_cnt=0; idx_encoder_cnt<$z.current.m.origData['encoder_cnt'+ch]; idx_encoder_cnt++) {
          if(parseInt(data['fps_max_default'+ch+'_'+idx_encoder_cnt]) > parseInt($z.current.m.origData['fps_max'+ch+'_'+idx_encoder_cnt])) {
            alert(langArray['LTXT_FPS_IS_WRONG']+'\n'+langArray['LTXT_FPS_CHECK']+' ['+1+'~'+$z.current.m.origData['fps_max'+ch+'_'+idx_encoder_cnt]+']');
            $('input#cancel').click();
            return false;
          } else if(parseInt(data['fps_max_default'+ch+'_'+idx_encoder_cnt]) < 1){
            alert(langArray['LTXT_FPS_IS_WRONG']+'\n'+langArray['LTXT_FPS_CHECK']+' ['+1+'~'+$z.current.m.origData['fps_max'+ch+'_'+idx_encoder_cnt]+']');
            $('input#cancel').click();
            return false;
          }

          if(parseInt(data['br_max_default'+ch+'_'+idx_encoder_cnt]) > parseInt($z.current.m.origData['bitrate_max'+ch+'_'+idx_encoder_cnt])) {
            alert(langArray['LTXT_FPS_CHECK']+' ['+$z.current.m.origData['br_min_default'+ch+'_'+idx_encoder_cnt]+'~'+$z.current.m.origData['bitrate_max'+ch+'_'+idx_encoder_cnt]+']')
            $('input#cancel').click();
            return false;
          } else if(parseInt(data['br_max_default'+ch+'_'+idx_encoder_cnt]) < parseInt(data['br_min_default'+ch+'_'+idx_encoder_cnt])) {
            alert(langArray['LTXT_FPS_CHECK']+' ['+$z.current.m.origData['br_min_default'+ch+'_'+idx_encoder_cnt]+'~'+$z.current.m.origData['bitrate_max'+ch+'_'+idx_encoder_cnt]+']')
            $('input#cancel').click();
            return false;
          }

          if(parseInt(data['br_min_default'+ch+'_'+idx_encoder_cnt]) > parseInt(data['br_max_default'+ch+'_'+idx_encoder_cnt])) {
            alert(langArray['LTXT_FPS_CHECK']+' ['+$z.current.m.origData['bitrate_min'+ch+'_'+idx_encoder_cnt]+'~'+$z.current.m.origData['br_max_default'+ch+'_'+idx_encoder_cnt]+']');
            $('input#cancel').click();
            return false;
          } else if(parseInt(data['br_min_default'+ch+'_'+idx_encoder_cnt]) < parseInt($z.current.m.origData['bitrate_min'+ch+'_'+idx_encoder_cnt])) {
            alert(langArray['LTXT_FPS_CHECK']+' ['+$z.current.m.origData['bitrate_min'+ch+'_'+idx_encoder_cnt]+'~'+$z.current.m.origData['br_max_default'+ch+'_'+idx_encoder_cnt]+']');
            $('input#cancel').click();
            return false;
          }

        }
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
      dvrpoke.start();
      return procResult(result);
    }
  },
  CamImageAdvanced: {
    menu : 'camera.advanced',

    beforeLoad : function(data) {
      $z.log('in Model, beforeLoad called.');
      return data;
    },
    makeupData: function(data) {
      if (!data.cam_adv_btn_cmd)
        data.cam_adv_btn_cmd = '0';
      for (name in data)
      {
        if ( data[name] == null || data[name] == '' )
          data[name] =  this.origData[name];
        this.origData['flag'] = data['falg'];
      }
      return data;
    },
    beforeSave : function(data) {
      $z.log('in Model, beforeSave called.');
      data.flag = "0";
      if (!data.cam_adv_btn_cmd)
        data.cam_adv_btn_cmd = '0';
      for (name in data)
      {
        if ( data[name] == null || data[name] == '' )
          data[name] =  this.origData[name];
        this.origData['flag'] = data['falg'];
      }
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
    updateData: function(data, callback) {
      this.data = data;

      $.event.trigger("EVT_MODEL_UPDATE", [ this.data] );

      if( typeof callback == 'function' ) {
        callback.call();
      }
    },
    afterLoad : function(result) {
      $z.log('in Model, afterLoad called.');
      this.data = encode_to_array(result);
      return result;
    },
    afterSave : function(result) {
      $z.log('in Model, afterSave called.');
      dvrpoke.start();
      return procResult(result);
    }
  },
  CamCompatibility : {
    menu : 'camera.compatibility',
    beforeLoad : function(data) {
      return data;
    },
    makeupData: function(data) {
      for (var i in data) {
        if (data[i] == null)
          data[i] = "0";
      }

      switch(data.mode)
      {
        case '16':  //MANUAL
        case '128':  //AUTO
        case '1048576':  //HI_MANUAL
          break;
        case '262144':  //AUTO(M)
        case '2097152':  //HI_MOTION
          data['antiflicker'] = data['antiflicker_motion_off'];
          break;
        case '524288':  //HI_AUTO
          data['antiflicker'] = data['antiflicker_auto_off'];
          break;
        default:
          break;
      }

      switch(data.antiflicker) {
        case '1':
          data['max_shutter'] = data['max_shutter_60'];
          break;
        case '2':
          data['max_shutter'] = data['max_shutter_50'];
          break;
        case '4':
            if(data.mode == '262144' || data.mode == '2097152'){ //AUTO(M)
              if(data['wdr'] == '16777216')
              {
                data['max_shutter'] = data['max_shutter_motion_off'];
              }
              else
              {
                data['max_shutter'] = data['max_shutter_motion_off_on'];
              }

              if(me.exposureObject_high.EXPOSURE_DCIRIS_MOTION.getObject() != undefined)
              {
                data['dc_iris'] = data['dc_iris_motion'];
              }
            }
            else if(data.mode == '524288')
            {
              if(data['wdr'] == '16777216')
              {
                data['max_shutter'] = data['max_shutter_auto_off_off'];
              }
              else
              {
                data['max_shutter'] = data['max_shutter_off'];
              }
            }
            else{
              data['max_shutter'] = data['max_shutter_off'];
            }
          break;
        default:
          break;
      }
      switch(data.mode)
      {
        case '16384': //AUTO
          break;
        case '32768': //MANUAL
          data['ircut'] = data['ircutm'];

          break;
      }

      switch(me.present_base_shutter)
      {
        case '8192': //BASE SHUTTER 50
          data['base_shutter'] = data['base_shutter_50'];
        break;
        case '16384': //BASE SHUTTER 60
          data['base_shutter'] = data['base_shutter_60'];
        break;
        case '32768': //BASE SHUTTER 100
          data['base_shutter'] = data['base_shutter_100'];
        break;
        case '65536': //BASE SHUTTER 120
          data['base_shutter'] = data['base_shutter_120'];
        break;
        case '131072': //BASE SHUTTER 100_300
          data['base_shutter'] = data['base_shutter_100_300'];
        break;
        case '262144': //BASE SHUTTER 100_5000
          data['base_shutter'] = data['base_shutter_100_5000'];
        break;
        case '524288': //BASE SHUTTER 120_360
          data['base_shutter'] = data['base_shutter_120_360'];
        break;
        case '1048576': //BASE SHUTTER 120_5000
          data['base_shutter'] = data['base_shutter_120_5000'];
        break;
        case '2097152': //BASE SHUTTER 120_262
          data['base_shutter'] = data['base_shutter_120_262'];
        break;
        case '4194304': //BASE SHUTTER 30_262
          data['base_shutter'] = data['base_shutter_30_262'];
        break;
        case '8388608': //BASE SHUTTER 25_100
          data['base_shutter'] = data['base_shutter_25_100'];
        break;
        case '16777216': //BASE SHUTTER 25_300
          data['base_shutter'] = data['base_shutter_25_300'];
        break;
        case '33554432': //BASE SHUTTER 25_5000
          data['base_shutter'] = data['base_shutter_25_5000'];
        break;
        case '67108864': //BASE SHUTTER 30_120
          data['base_shutter'] = data['base_shutter_30_120'];
        break;
        case '134217728': //BASE SHUTTER 30_360
          data['base_shutter'] = data['base_shutter_30_360'];
        break;
        case '268435456': //BASE SHUTTER 30_5000
          data['base_shutter'] = data['base_shutter_30_5000'];
        break;
      }

      return data;
    },
    compareTo: function(curArr) {
      for( name in curArr) {
        if (name == "ch")
          continue;
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
    beforeSave : function(data) {
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
      dvrpoke.start();
      return procResult(result);
    }
  },
  CamCovert : {
    menu : 'camera.covert',
    checks : [
      'cv_admin',
      'cv_manager',
      'cv_user',
      'cv_logoff',
    ],

    makeupData : function(data) {
      /*
      for( var i in this.checks ) {
      for( var j=0 ; j < INFO_DVRCHANNEL ; j++ ) {
      data[this.checks[i] + j ] = data[this.checks[i] + j] ? "1" : "0";
      }
      }
      */

      return data;
    },
    beforeLoad : function(data) {
      return data;
    },
    beforeSave : function(data) {
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
      dvrpoke.start();
      return procResult(result);
    }
  },
  CamMotion : {
    menu : 'camera.motion',

    makeupData : function(data) {
      data['area' ] = this.data['area'];

      return data;
    },
    beforeLoad : function(data) {
      return data;
    },
    beforeSave : function(data) {
      dvrpoke.stop();

      var d = $.extend(true, {}, this.data);
      $.extend(d, data);
      data = $.extend({}, d);

      data['menu'] = this.menu;
      data['action'] = 'set_setup';

      if( $z.debug ) {
        data['debug'] = '1';
      }

      return data;

    },
    afterLoad : function(result) {
      return result;
    },
    afterSave : function(result) {
      dvrpoke.start();
      var c = $z.current;

      c.v.currentCh = c.v.targetCh;
      $('#chno').val("" + c.v.currentCh);
      c.refreshHandler(c.v.currentCh);
      return procResult(result);
    },
    update : function(data) {
      $.extend(this.data, data);
    },
    compareAreaDataChange : function (ch) {
      var ret = true;
      if ($("#time_start").val() != this.data['time_start']) {
        ret = false;
      }
      if ($("#time_end").val() != this.data['time_end']) {
        ret = false;
      }
      if ($("#sense_d").val() != this.data['sense_d']) {
        ret = false;
      }
      if ($("#sense_n").val() != this.data['sense_n']) {
        ret = false;
      }
      if ($("#mini_d").length > 0 && $("#mini_n").length > 0) {
        if ($("#mini_d").val() != this.data['mini_d']) {
          ret = false;
        }
        if ($("#mini_n").val() != this.data['mini_n']) {
          ret = false;
        }
      }
      if ( (this.origData['area'] != this.data['area']) && (this.data['conn'+ch] == "1") ) {
        ret = false;
      }

      return ret;
    }
  },
  CamPrivMask : {
    menu : 'camera.privmask',

    makeupData : function(data) {
      var d = $.extend(true, {}, this.data);
      $.extend(d, data);
      data = $.extend({}, d);
      return data;
    },
    compareTo: function(curArr) {
      for( name in curArr) {
        if (name == "selLayer" || name == "chno")
          continue;
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
      if( !this.compareTo(data) ) {
        return false;
      }

      dvrpoke.stop();

      var d = $.extend(true, {}, this.data);
      $.extend(d, data);
      data = $.extend({}, d);
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
      dvrpoke.start();
      return procResult(result);
    },
    update : function(data) {
      $.extend(this.data, data);
    }
  },
  CamType : {
    menu : 'camera.type',
    beforeLoad : function(data) {
      return data;
    },
    beforeSave : function(data) {
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
      dvrpoke.start();
      return procResult(result);
    }
  },
  CamPTZ : {
    menu : 'camera.ptz',

    beforeLoad : function(data) {
      return data;
    },
    beforeSave : function(data) {
      if( !this.compareTo(data) ) {
        return false;
      }

      dvrpoke.stop();

      for(var name in data) {
        //console.log(data[name])
        if(name.indexOf('address') >= 0 && data[name] == "") {
          alert(langArray['LTXT_PLEASE_INPUT_NUMBER']);
          return false;
        }

        if(name.indexOf('address') >= 0 && (data[name] < 0 || data[name] > 255)) {
          alert(errFieldValOver+" [0~255]");
          return false;
        }
      }

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
      dvrpoke.start();
      return procResult(result);
    }
  },
  CamDmva : {
    menu : 'camera.dmva',
    makeupData : function(data) {
      var d = $.extend(true, {}, this.data);
      $.extend(d, data);
      data = $.extend({}, d);
      return data;
    },
    beforeLoad : function(data) {
      return data;
    },
    beforeSave : function(data) {
      if( !this.compareTo(data) ) {
        return false;
      }

      dvrpoke.stop();
      // c.sendXML();
      var d = $.extend(true, {}, this.data);
      $.extend(d, data);
      data = $.extend({}, d);


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
      dvrpoke.start();
      return procResult(result);
    },
    updateData: function(data, callback) {
      this.data = data;

      if( typeof callback == 'function' ) {
        callback.call();
      }
    }
  },
  CamTamper : {
    menu : 'camera.tamper',

    makeupData : function(data) {
      data['area'] = this.data['area'];
      if (data['area'] == '')
        data['area'] = '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'

      return data;
    },
    beforeLoad : function(data) {
      return data;
    },
    beforeSave : function(data) {
      dvrpoke.stop();

      var d = $.extend(true, {}, this.data);
      $.extend(d, data);
      data = $.extend({}, d);

      data['rebl_area'] = this.data['area'];

      data['menu'] = this.menu;
      data['action'] = 'set_setup';

      if( $z.debug ) {
        data['debug'] = '1';
      }

      return data;

    },
    afterLoad : function(result) {
      this.data = encode_to_array(result);
      this.data['area'] = this.data['rebl_area'];
      return result;
    },
    afterSave : function(result) {
      dvrpoke.start();
      return procResult(result);
    },
    update : function(data) {
      $.extend(this.data, data);
    },
    CamPTZ : {
      menu : 'camera.ptz',

      beforeLoad : function(data) {
        $z.log('beforeLoad called.');
        return data;
      },
      beforeSave : function(data) {
        $z.log('beforeSave called.');
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
      makeupData: function(data) {
        $z.log('makeupData called.');
        return data;
      },
      afterLoad : function(result) {
        $z.log('afterLoad called.');
        this.data = encode_to_array(result);
        return result;
      },
      afterSave : function(result) {
        $z.log('afterSave called.');
        dvrpoke.start();
        return procResult(result);
      }
    }
  },
  AnalogType : {
    menu : 'camera.analogtype',
    is_ipcamera_changed: false,
    compareTo: function(curArr) {
      var _compareTo_default = function(param_current_data, param_original_data) {
        if($z.current.m.is_ipcamera_changed == undefined || $z.current.m.is_ipcamera_changed == false){
          for( name in param_current_data) {
            if (name == "ch")
            continue;
            if( param_original_data[name] != null && param_current_data[name] != param_original_data[name] ) {
              if( $z.debug )
              $z.log("compareTo[" + name + "]: curr[" + param_current_data[name] + "] <> orig[" + param_original_data[name] + "]");
              return name;
            }
          }

          if($z.current.v.isChanged == true && $z.current.v.isSaved == false) {
            return true;
          }

          if( $z.debug )
          $z.log("compareTo [==]");

          return null;
        }
      }

      var _compareTo_5hg = function(param_current_data, param_original_data) {
        var result = null;

        var temp_original_analogtype=0;
        var temp_original_analogmode=0;
        var temp_original_resolution=0;
        var temp_original_input_type=0;
        var temp_original_signal=0;
        var temp_current_analogtype=0;
        var temp_current_analogmode=0;
        var temp_current_resolution=0;
        var temp_current_input_type=0;
        var temp_current_signal=0;

        //excpetion code
        if ($z.current.m.is_ipcamera_changed != undefined && $z.current.m.is_ipcamera_changed == true) {
          return null;
        }

        if ($z.current.v.isInitialized == false) {return null;};

        ///////////
        //please reboot when resolution or input type is changed.
        ///////////
        for(var i=0; i<INFO_DVRCHANNEL; i++) {
          temp_original_analogtype=0;
          temp_original_analogmode=0;
          temp_original_resolution=0;
          temp_original_input_type=0;
          temp_original_signal=0;
          temp_current_analogtype=0;
          temp_current_analogmode=0;
          temp_current_resolution=0;
          temp_current_input_type=0;
          temp_current_signal=0;

          temp_original_analogtype=param_original_data["analogtype"+i];
          temp_original_analogmode=param_original_data["analogmode"+i];
          temp_original_resolution=analogtypeCalculator.get_resolution_from_type(temp_original_analogtype);
          temp_original_input_type=analogtypeCalculator.get_input_type_from_type(temp_original_analogtype);
          temp_original_signal=analogtypeCalculator.get_signal_from_type(temp_original_analogtype);
          temp_current_analogtype=param_current_data["analogtype"+i];
          temp_current_analogmode=param_current_data["analogmode"+i];
          temp_current_resolution=param_current_data["5hg_resolution_"+i];
          temp_current_input_type=param_current_data["5hg_input_type_"+i];
          temp_current_signal=param_current_data["5hg_signal_type_"+i];

          temp_original_analogtype!=temp_current_analogtype ? result="analogtype"+i
            :temp_original_analogmode!=temp_current_analogmode ? result="analogmode"+i
            :temp_original_resolution!=temp_current_resolution ? result="5hg_resolution_"+i
            :temp_original_input_type!=temp_current_input_type ? result="5hg_input_type_"+i
            :temp_original_signal!=temp_current_signal ? result="5hg_signal_type_"+i
            :result=null;

          if(result!=null) {return result;};
        }

        return result;
      }

      var result=null;

      INFO_MODEL.indexOf("5HG")>=0 ? result=_compareTo_5hg(curArr, this.origData)
        :result=_compareTo_default(curArr, this.origData);

      return result;
    },
    makeupData : function(data) {
      var result = null;

      var makeupData_default = function(param_data) {
        for(var i=0; i<INFO_DVRCHANNEL; i++) {
          //data['analogtype'+i] = $("#analogtype"+i+":checked").val(); //make error in ie8
          param_data['analogtype'+i] = $("input[name='analogtype"+i+"']:checked").val();
        }

        return param_data;
      }

      var makeupData_5hg = function(param_data) {
        for(var i=0; i<INFO_DVRCHANNEL; i++) {
          param_data["analogmode"+i] = param_data["5hg_mode_"+i];
          param_data["analogtype"+i] = analogtypeCalculator.make_type_value_from_others_information(
            param_data["5hg_input_type_"+i],
            param_data["5hg_signal_type_"+i],
            param_data["5hg_resolution_"+i]);
        }

        return param_data;
      }

      INFO_MODEL.indexOf("5HG")>=0 ? result=makeupData_5hg(data)
        : result=makeupData_default(data);

      return result;
    },
    beforeLoad : function(data) {
      return data;
    },
    beforeSave : function(data) {
      data['menu'] = this.menu;
      data['action'] = 'set_setup';

      if( $z.debug ) {
        data['debug'] = '1';
      }

      var value_changed = this.compareTo(data);
      var is_need_rebooting = false;

      var _is_need_rebooting_default = function(param_changed_element_name){
        if($z.current.m.origData[param_changed_element_name] == 8 || data[param_changed_element_name] == 8) {
          if(!confirm(langArray["LTXT_SETUPCAMANALOGTYPE_IPCAM_CHANGED_MESSAGE"])) {
            return false;
          }

          $z.current.m.is_ipcamera_changed = true;
          return true;
        }

        return true;
      }

      var _is_need_rebooting_5hg = function(param_changed_element_name){

        var result = false;

        var temp_original_analogtype=0;
        var temp_original_resolution=0;
        var temp_original_input_type=0;
        var temp_current_analogtype=0;
        var temp_current_resolution=0;
        var temp_current_input_type=0;

        ///////////
        //please reboot when resolution or input type is changed.
        ///////////
        for(var i=0; i<INFO_DVRCHANNEL; i++) {
          temp_original_analogtype=0;
          temp_original_resolution=0;
          temp_original_input_type=0;
          temp_current_analogtype=0;
          temp_current_resolution=0;
          temp_current_input_type=0;

          temp_original_analogtype=$z.current.m.origData["analogtype"+i];
          temp_original_resolution=analogtypeCalculator.get_resolution_from_type(temp_original_analogtype);
          temp_original_input_type=analogtypeCalculator.get_input_type_from_type(temp_original_analogtype);
          temp_current_analogtype=$z.current.m.data["analogtype"+i];
          temp_current_resolution=data["5hg_resolution_"+i];
          temp_current_input_type=data["5hg_input_type_"+i];

          temp_original_resolution==0 && temp_current_resolution>0 ? result=true
            :temp_original_resolution>0 && temp_current_resolution==0 ? result=true
            :temp_original_input_type!=temp_current_input_type ? result=true
            :result=false;

          if(result==true){
            if(!confirm(langArray["LTXT_SETUPCAMANALOGTYPE_IPCAM_CHANGED_MESSAGE"])) {
              return false;
            }

            $z.current.m.is_ipcamera_changed = true;

            return result;
          }
        }

        return result;
      }

      /* === UTM5HG MEMORY IS EXTENDED SO THAT _NEED_REBOOTING_5HG FUNCTION NO NEED ANYMORE. ===*/
      // INFO_MODEL.indexOf("5HG")>=0 ? is_need_rebooting=_is_need_rebooting_5hg(value_changed)
      //   : is_need_rebooting=_is_need_rebooting_default(value_changed);
      /* === UTM5HG MEMORY IS EXTENDED SO THAT _NEED_REBOOTING_5HG FUNCTION NO NEED ANYMORE. ===*/
      is_need_rebooting=_is_need_rebooting_default(value_changed)

      //if(is_need_rebooting==false) {return false;}

      return data;
    },
    afterLoad : function(result) {
      this.data = encode_to_array(result);

      return result;
    },
    afterSave : function(result) {
      dvrpoke.start();

      if($z.current.m.is_ipcamera_changed == undefined || $z.current.m.is_ipcamera_changed == false) {
        return procResult(result);
      }

      $("#dialog_please_wait").dialog("open");
      $.scm.Stop();
      setTimeout(function(){
        $z.current.v._checking_reboot();
      }, 30000);
    }
  }
});
