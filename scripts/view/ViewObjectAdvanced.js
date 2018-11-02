/**
 * 
 */

var DropdownBox = function (_caller, _id) {
  if (_id == null) return;

  this.id = _id;

  this.my = $('#'+this.id);
  this.init(_caller);
  this.onChange;
}

DropdownBox.prototype = {
    caller: {},
    enable_category: {},
    disable_category: {},
    init: function (_caller) {
      this.caller = _caller;
      var me = this;
      this.clearObject();   
      this.my.change(function(event) {me.onChange(this);});
    },
    addItem: function (_index, _itemName) {
      // same item check.
      //var spn = "<span id=\"lang_" + _itemName + "\">" + _itemName;
      $(this.my).append($("<option>").val(_index).html(_itemName));
      //$(this.my).append($("<option>").val(_index).html("<span id=\"lang_"+_itemName+"\">"+_itemName));
      //$(this.my).append($("<option>").val(_index).html(langArray["LTXT_SETUPCAMIMAGEADV_"+_itemName]));
    },
    deleteAllItem: function () {
      this.my.children().remove();
    },
    setEnable: function (_flag) {
      if (parseInt(_flag))
        this.my.removeAttr('disabled');
      else
        this.my.attr('disabled', 'disabled');
    },
    getSelected: function () {
      return (this.my || $('option:selected')).val();
    },
    selectItem: function (_index) {
      if (_index == null || _index == '')
      {
        return false;
      }
      $(this.my).val(_index);
      return true;
    },
    setEnableCategory: function(_index, _category) {
      this.enable_category[_index] = _category;
    },
    setDisableCategory: function(_index, _category) {
      this.disable_category[_index] = _category;
    },
    onChange: function (_id) {
      if (_id.id == 'ch')
        this.caller.loadData(this.getSelected());
      else
      {
        var selectedItem = this.getSelected();
        this.caller.ipcamEnableCallback(this.disable_category[selectedItem],
            this.enable_category[selectedItem]);
      }
    },
    clearObject: function () {
      this.enable_category = {};
      this.disable_category = {};
      this.deleteAllItem();
      this.setEnable(true);
    }
}

var Button = function (_caller, _id) {
  this.id = _id;
  this.my = $('#'+this.id);

  this.init(_caller, this.id);
  this.clicked = 0;
}

Button.prototype = {
    caller: {},

    init: function (_caller, _id) {
      this.clearObject();
      this.caller = _caller;
      var me = this;    
      this.my.mousedown(function(event) {me.onClicked(this.id);});
      this.my.mouseleave(function(event) {me.mouseLeave(this.id);});
      this.my.mouseup(function(event) {me.mouseRelease(this.id);});
      this.clicked = 0;
      return;
    },
    setEnable: function (_flag) {
      if (parseInt(_flag))
        this.my.removeAttr('disabled');
      else
        this.my.attr('disabled', 'disabled');
    },
    onClicked: function (_id) {
      var btn;
      if (_id == "btn_zoom_wide")   btn = 1;
      if (_id == "btn_zoom_tele")   btn = 2;
      if (_id == "btn_focus_near")  btn = 3;
      if (_id == "btn_focus_far")   btn = 4;
      if (_id == "btn_focus_one_push")btn = 5;
      if (_id == "btn_focus_home")  btn = 6;

      if (_id == "cancel")      btn = 0;

      if (btn)
      {
        this.clicked = 1;
      }

      this.caller.saveData(btn);
    },
    mouseRelease: function(_id) {
      if (this.clicked)
      {
        this.clicked = 0;
        var btn = 7;

        this.caller.saveData(btn);
      }
    },
    clearObject: function () {
      this.setEnable(true);
    }
}

var TextBox = function (_caller, _id, _scopeId) {
  this.id = _id;
  this.scopeId = _scopeId;
  this.my = $('#'+this.id);
  this.scope = $('#'+this.scopeId);
  this.minValue = this.maxValue = 0;
  this.init(_caller);
}

TextBox.prototype = {
    caller: {},
    value: {},
    init: function (_caller, _id, _scopeId) {
      this.caller = _caller;
      this.clearObject();
      var me = this;

      this.my.keydown(function(event) {me.txtKkeyDown(event)});
      this.my.change(function(event) {me.txtOnChange(event);});

      return;
    },
    setEnable: function (_flag) {
      if (parseInt(_flag))
        this.my.removeAttr('disabled');
      else
        this.my.attr('disabled', 'disabled');
    },
    setValue: function (_value) {
      var tempValue;
      if (_value == null || _value == '')
      {
        return false;
      }

      try{
        tempValue = _value.valueOf();
      }
      catch(e){
        return false;
      }

      if (parseInt(tempValue) < parseInt(this.minValue)
          || parseInt(this.maxValue) < parseInt(tempValue))
        return false;

      this.my.val(_value);
      return true;
    },
    setMinMaxValue: function (_min, _max) {
      if (parseInt(_min) > parseInt(_max))
        return;

      this.minValue = _min;
      this.maxValue = _max;
      this.scope.text('['+this.minValue+'..'+this.maxValue+']');
      if (_min == _max && _min == 0)
        this.scope.text('');
      return;
    },
    clearObject: function () {
      this.my.val('');
      this.setEnable(true);
      this.minValue = 0;
      this.maxValue = 0;
      this.scope.text('');
    },
    txtOnChange: function (_event) {
      var me = this;    
      //alert('change');
      if( !isValidNumRange(me.my[0] , me.minValue, me.maxValue) ) {
        _event.preventDefault();
        return;
      }
    },
    focusOut: function (_id) {
      // text 에러 처리.

    },
    txtKkeyDown: function (_event) {
      // TODO:숫자만 입력 받게해야함미다.
      //alert('down');
      if( !isValidKeyNumber(_event.which) ) {
        _event.preventDefault();
      }
    }
}

var Text = function (_id) {
  this.id = _id;
  this.my = $('#'+this.id);

  this.init();
}

Text.prototype = {
    caller: {},

    init: function () {
      this.clearObject();
    },
    setEnable: function (_flag) {
      if (parseInt(_flag))
        this.my.removeAttr('disabled');
      else
        this.my.attr('disabled', 'disabled');
    },
    setText: function (_text) {
      if (_text == null || _text == '')
      {
        //zzmvc.
        return false;
      }
      this.my.text(_text);
      return true;
    },
    clearObject: function () {
      this.my.text('Unknown');
    }
}

var CameraImageAdvancedInfo = function () {
  if (this == window) {
    return new cameraImageAdvancedInfo();
  }

  if (this.alreadyCreated) {
    return this;
  }

  this.alreadyCreated = true;
  cameraImageAdvancedInfo = this;

  // variables.
  this.preview;

  this.ch = new DropdownBox(this, 'ch');
  this.modelName = new Text('model');
  this.fwVersion = new Text('fw_version');

  this.sharpness = new TextBox(this, 'sharpness', 'sharpness_scope');
  this.rotate = new DropdownBox(this, 'rotate');
  this.step = new DropdownBox(this, 'step');

  this.wide = new Button(this, 'btn_zoom_wide');
  this.tele = new Button(this, 'btn_zoom_tele');
  this.near = new Button(this, 'btn_focus_near');
  this.far = new Button(this, 'btn_focus_far');
  this.onepush = new Button(this, 'btn_focus_one_push');
  this.home = new Button(this, 'btn_focus_home');
  this.whiteBalanceMode = new DropdownBox(this, 'wb_mode');
  this.mWhiteBalanceMode = new DropdownBox(this, 'mwb_mode');
  this.exposureMode = new DropdownBox(this, 'exposure_mode');
  this.agcGain = new TextBox(this, 'agc_gain', 'agc_gain_scope');
  this.eshutterSpeed = new TextBox(this, 'eshutter_speed', 'eshutter_speed_scope');
  this.slowShutter = new DropdownBox(this, 'slow_shutter');
  this.maxAgc = new DropdownBox(this, 'max_agc');
  this.irisControl = new DropdownBox(this, 'iris_control');
  this.blcControl = new DropdownBox(this, 'blc_control');
  this.dayNightMode = new DropdownBox(this, 'day_night_mode');
  this.dayNightInterval = new DropdownBox(this, 'day_night_mode_sec');

};

CameraImageAdvancedInfo.prototype = {
    caller: {},
    support: {},
    ipcamImage: {
      "IPCAM_IMAGE_SHARPNESS" : 1<<0,
      "IPCAM_IMAGE_BRIGHTNESS" : 1<<1,
      "IPCAM_IMAGE_CONTRAST" : 1<<2,
      "IPCAM_IMAGE_COLOR" : 1<<3,
      "IPCAM_IMAGE_TINT" : 1<<4,
      "IPCAM_IMAGE_EXPOSURE" : 1<<5,
      "IPCAM_IMAGE_AGC" : 1<<6,
      "IPCAM_IMAGE_ESHUTTER" : 1<<7,
      "IPCAM_IMAGE_SLOWSHUTTER" : 1<<8,
      "IPCAM_IMAGE_MAXAGC" : 1<<9,
      "IPCAM_IMAGE_DCIRIS" : 1<<10,
      "IPCAM_IMAGE_BLC" : 1<<11,
      "IPCAM_IMAGE_CALIBRATION" : 1<<12,
      "IPCAM_IMAGE_ICF" : 1<<13,
      "IPCAM_IMAGE_WB" : 1<<14,
      "IPCAM_IMAGE_MWB" : 1<<15,
      "IPCAM_IMAGE_WDR" : 1<<16,
      "IPCAM_IMAGE_MIRRORING" : 1<<17,
      "IPCAM_IMAGE_ANTIFLICKER" : 1<<18,
      "IPCAM_IMAGE_DNN" : 1<<19,
      "IPCAM_IMAGE_PIRIS" : 1<<20,
      "IPCAM_IMAGE_PAN" : 1<<21,
      "IPCAM_IMAGE_TILT" : 1<<22,
      "IPCAM_IMAGE_ZOOM" : 1<<23,
      "IPCAM_IMAGE_FOCUS" : 1<<24,
      "IPCAM_IMAGE_ONEPUSH" : 1<<25,
      "IPCAM_IMAGE_DNN_TOGGLE" : 1<<26,
      "IPCAM_IMAGE_NR" : 27
    },
    alreadyCreated: false,

    init: function(_caller) {
      var i;
      this.caller = _caller;
      for (i = 0; i < INFO_DVRCHANNEL; i++)
      {
        this.ch.addItem(i, (i+1) + 'ch');
        if (i > 16)
          break;
      }
      return;
    },
    loadData: function(_ch) {
      this.caller.refreshHandler(_ch, 0);   
    },
    saveData: function(_btnCmd) {
      this.caller.sendButtonCmd(this.ch.getSelected(), _btnCmd);
      this.caller.refreshHandler(this.ch.getSelected(), 1);
    },
    update: function(_array) {
      this.ch.selectItem(_array['ch']);
      this.ch.setEnable('1');
      this.sharpness.setValue(_array['sharpness']);
      this.rotate.selectItem(_array['rotate']);
      this.step.selectItem(_array['step']);
      this.whiteBalanceMode.selectItem(_array['wb_mode']);
      this.mWhiteBalanceMode.selectItem(_array['mwb_mode']);
      this.exposureMode.selectItem(_array['exposure_mode']);
      this.agcGain.setValue(_array['agc_gain']);
      this.eshutterSpeed.setValue(_array['eshutter_speed']);
      this.slowShutter.selectItem(_array['slow_shutter']);
      this.maxAgc.selectItem(_array['max_agc']);
      this.irisControl.selectItem(_array['iris_control']);
      this.blcControl.selectItem(_array['blc_control']);
      this.dayNightMode.selectItem(_array['day_night_mode']);
      this.dayNightInterval.selectItem(_array['day_night_mode_sec']);

      return;
    },
    getChannel: function () {
      return this.ch.getSelected();
    },
    ipcamEnableUpdate: function (_array) {
      this.support = _array['support'];
      this.wide.setEnable(_array['zoom_btn_enabled']);
      this.tele.setEnable(_array['zoom_btn_enabled']);
      this.near.setEnable(_array['focus_btn_enabled']);
      this.far.setEnable(_array['focus_btn_enabled']);
      this.onepush.setEnable(_array['onepush_btn_enabled']);
      this.home.setEnable(_array['onepush_btn_enabled']);

      this.sharpness.setEnable(_array['sharpness_enabled']);
      this.rotate.setEnable(_array['rotate_enabled']);
      this.step.setEnable(_array['zoom_btn_enabled']);

      this.whiteBalanceMode.setEnable(_array['wb_mode_enabled']);
      this.whiteBalanceMode.onChange(this.whiteBalanceMode);
      this.exposureMode.setEnable(_array['exposure_enabled']);
      this.exposureMode.onChange(this.exposureMode);
      this.dayNightMode.setEnable(_array['day_night_mode_enabled']);
      this.dayNightMode.onChange(this.dayNightMode);
      // 3개 callback 임의 호출.
    },
    ipcamEnableCallback: function(_disable, _enable) {
      var i;
      for ( i = 0; i < this.ipcamImage['IPCAM_IMAGE_NR']; i++)
      {
        if (_disable & (1 << i))
          this.setEnable(1<<i, '0');
      }
      for ( i = 0; i < this.ipcamImage['IPCAM_IMAGE_NR']; i++)
      {
        if (_enable & (1 << i))
          this.setEnable(1<<i, '1');
      }
    },
    setEnable: function(_index, _enable)
    {
      if (_index == this.ipcamImage['IPCAM_IMAGE_SHARPNESS'])   {this.sharpness.setEnable(_enable);return true;}
      if (_index == this.ipcamImage['IPCAM_IMAGE_BRIGHTNESS'])  return false;
      if (_index == this.ipcamImage['IPCAM_IMAGE_CONTRAST'])    return false;
      if (_index == this.ipcamImage['IPCAM_IMAGE_COLOR'])     return false;
      if (_index == this.ipcamImage['IPCAM_IMAGE_TINT'])      return false;
      if (_index == this.ipcamImage['IPCAM_IMAGE_EXPOSURE'])    {this.exposureMode.setEnable(_enable);return true;}
      if (_index == this.ipcamImage['IPCAM_IMAGE_AGC'])       {this.agcGain.setEnable(_enable);return true;}
      if (_index == this.ipcamImage['IPCAM_IMAGE_ESHUTTER'])    {this.eshutterSpeed.setEnable(_enable);return true;}
      if (_index == this.ipcamImage['IPCAM_IMAGE_SLOWSHUTTER'])   {this.slowShutter.setEnable(_enable);return true;}
      if (_index == this.ipcamImage['IPCAM_IMAGE_MAXAGC'])    {this.maxAgc.setEnable(_enable);return true;}
      if (_index == this.ipcamImage['IPCAM_IMAGE_DCIRIS'])    {this.irisControl.setEnable(_enable);return true;}
      if (_index == this.ipcamImage['IPCAM_IMAGE_BLC'])       {this.blcControl.setEnable(_enable);return true;}
      if (_index == this.ipcamImage['IPCAM_IMAGE_CALIBRATION'])   return false;
      if (_index == this.ipcamImage['IPCAM_IMAGE_ICF'])       return false;
      if (_index == this.ipcamImage['IPCAM_IMAGE_WB'])      {this.whiteBalanceMode.setEnable(_enable);return true;}
      if (_index == this.ipcamImage['IPCAM_IMAGE_MWB'])       {this.mWhiteBalanceMode.setEnable(_enable);return true;}
      if (_index == this.ipcamImage['IPCAM_IMAGE_WDR'])       return false;
      if (_index == this.ipcamImage['IPCAM_IMAGE_MIRRORING'])   {this.rotate.setEnable(_enable);return true;}
      if (_index == this.ipcamImage['IPCAM_IMAGE_ANTIFLICKER'])   return false;
      if (_index == this.ipcamImage['IPCAM_IMAGE_DNN'])       {this.dayNightMode.setEnable(_enable);return true;}

      if (_index == this.ipcamImage['IPCAM_IMAGE_PIRIS'])     return false;
      if (_index == this.ipcamImage['IPCAM_IMAGE_PAN'])       return false;
      if (_index == this.ipcamImage['IPCAM_IMAGE_TILT'])      return false;
      if (_index == this.ipcamImage['IPCAM_IMAGE_ZOOM'])      {this.wide.setEnable(_enable);this.tele.setEnable(_enable);this.step.setEnable(_enable);return true;}
      if (_index == this.ipcamImage['IPCAM_IMAGE_FOCUS'])     {this.near.setEnable(_enable);this.far.setEnable(_enable);return true;}
      if (_index == this.ipcamImage['IPCAM_IMAGE_ONEPUSH'])     {this.onepush.setEnable(_enable);this.home.setEnable(_enable);return true;}
      if (_index == this.ipcamImage['IPCAM_IMAGE_DNN_TOGGLE'])  {this.dayNightInterval.setEnable(_enable);return true;}
      return false;
    },
    ipcamInfoUpdate: function (_array) {
      // TODO:
      var i;
      this.clearObject();

      this.modelName.setText(_array['model']);
      this.fwVersion.setText(_array['fw_version']);

      this.sharpness.setMinMaxValue(_array['sharpness_min'], _array['sharpness_max']);

      for ( i = 0; i < _array['rotate_cnt']; i++)
      {
        this.rotate.addItem(_array['rotate' + i + '_index'], _array['rotate' + i + '_caption']);
        this.rotate.setEnableCategory(_array['rotate' + i + '_index'], parseInt(_array['rotate' + i + '_enable']));
        this.rotate.setDisableCategory(_array['rotate' + i + '_index'], parseInt(_array['rotate' + i + '_disable']));
        if (i > 20) break;
      }

      for ( i = 0; i < _array['step_cnt']; i++)
      {
        this.step.addItem(_array['step' + i + '_index'], _array['step' + i + '_caption']);
        this.step.setEnableCategory(_array['step' + i + '_index'], parseInt(_array['step' + i + '_enable']));
        this.step.setDisableCategory(_array['step' + i + '_index'], parseInt(_array['step' + i + '_disable']));
        if (i > 20) break;
      }

      for ( i = 0; i < _array['wb_mode_cnt']; i++)
      {
        this.whiteBalanceMode.addItem(_array['wb_mode' + i + '_index'], _array['wb_mode' + i + '_caption']);
        this.whiteBalanceMode.setEnableCategory(_array['wb_mode' + i + '_index'], parseInt(_array['wb_mode' + i + '_enable']));
        this.whiteBalanceMode.setDisableCategory(_array['wb_mode' + i + '_index'], parseInt(_array['wb_mode' + i + '_disable']));
        if (i > 20) break;
      }
      for ( i = 0; i < _array['mwb_mode_cnt']; i++)
      {
        this.mWhiteBalanceMode.addItem(_array['mwb_mode' + i + '_index'], _array['mwb_mode' + i + '_caption']);
        this.mWhiteBalanceMode.setEnableCategory(_array['mwb_mode' + i + '_index'], parseInt(_array['mwb_mode' + i + '_enable']));
        this.mWhiteBalanceMode.setDisableCategory(_array['mwb_mode' + i + '_index'], parseInt(_array['mwb_mode' + i + '_disable']));
        if (i > 20) break;
      }
      for ( i = 0; i < _array['exposure_cnt']; i++)
      {
        this.exposureMode.addItem(_array['exposure' + i + '_index'], _array['exposure' + i + '_caption']);
        this.exposureMode.setEnableCategory(_array['exposure' + i + '_index'], parseInt(_array['exposure' + i + '_enable']));
        this.exposureMode.setDisableCategory(_array['exposure' + i + '_index'], parseInt(_array['exposure' + i + '_disable']));
        if (i > 20) break;
      }
      this.agcGain.setMinMaxValue(_array['agc_gain_min'], _array['agc_gain_max']);
      this.eshutterSpeed.setMinMaxValue(_array['eshutter_speed_min'], _array['eshutter_speed_max']);

      for ( i = 0; i < _array['slow_shutter_cnt']; i++)
      {
        this.slowShutter.addItem(_array['slow_shutter' + i + '_index'], _array['slow_shutter' + i + '_caption']);
        this.slowShutter.setEnableCategory(_array['slow_shutter' + i + '_index'], parseInt(_array['slow_shutter' + i + '_enable']));
        this.slowShutter.setDisableCategory(_array['slow_shutter' + i + '_index'], parseInt(_array['slow_shutter' + i + '_disable']));
        if (i > 20) break;
      }
      for ( i = 0; i < _array['max_agc_cnt']; i++)
      {
        this.maxAgc.addItem(_array['max_agc' + i + '_index'], _array['max_agc' + i + '_caption']);
        this.maxAgc.setEnableCategory(_array['max_agc' + i + '_index'], parseInt(_array['max_agc' + i + '_enable']));
        this.maxAgc.setDisableCategory(_array['max_agc' + i + '_index'], parseInt(_array['max_agc' + i + '_disable']));
        if (i > 20) break;
      }
      for ( i = 0; i < _array['iris_control_cnt']; i++)
      {
        this.irisControl.addItem(_array['iris_control' + i + '_index'], _array['iris_control' + i + '_caption']);
        this.irisControl.setEnableCategory(_array['iris_control' + i + '_index'], parseInt(_array['iris_control' + i + '_enable']));
        this.irisControl.setDisableCategory(_array['iris_control' + i + '_index'], parseInt(_array['iris_control' + i + '_disable']));
        if (i > 20) break;
      }
      for ( i = 0; i < _array['blc_control_cnt']; i++)
      {
        this.blcControl.addItem(_array['blc_control' + i + '_index'], _array['blc_control' + i + '_caption']);
        this.blcControl.setEnableCategory(_array['blc_control' + i + '_index'], parseInt(_array['blc_control' + i + '_enable']));
        this.blcControl.setDisableCategory(_array['blc_control' + i + '_index'], parseInt(_array['blc_control' + i + '_disable']));
        if (i > 20) break;
      }
      for ( i = 0; i < _array['day_night_mode_cnt']; i++)
      {
        this.dayNightMode.addItem(_array['day_night_mode' + i + '_index'], _array['day_night_mode' + i + '_caption']);
        this.dayNightMode.setEnableCategory(_array['day_night_mode' + i + '_index'], parseInt(_array['day_night_mode' + i + '_enable']));
        this.dayNightMode.setDisableCategory(_array['day_night_mode' + i + '_index'], parseInt(_array['day_night_mode' + i + '_disable']));
        if (i > 20) break;
      }
      for ( i = 0; i < _array['day_night_mode_sec_cnt']; i++)
      {
        this.dayNightInterval.addItem(_array['day_night_mode_sec' + i + '_index'], _array['day_night_mode_sec' + i + '_caption']);
        this.dayNightInterval.setEnableCategory(_array['day_night_mode_sec' + i + '_index'], parseInt(_array['day_night_mode_sec' + i + '_enable']));
        this.dayNightInterval.setDisableCategory(_array['day_night_mode_sec' + i + '_index'], parseInt(_array['day_night_mode_sec' + i + '_disable']));
        if (i > 20) break;
      }

      return 0;
    },
    clearObject: function () {    
      //this.ch.clearObject();
      this.modelName.clearObject();
      this.fwVersion.clearObject();
      this.sharpness.clearObject();
      this.rotate.clearObject();
      this.step.clearObject();
      this.wide.clearObject();
      this.near.clearObject();
      this.tele.clearObject();
      this.far.clearObject();
      this.home.clearObject();
      this.onepush.clearObject();
      this.whiteBalanceMode.clearObject();
      this.mWhiteBalanceMode.clearObject();
      this.exposureMode.clearObject();
      this.agcGain.clearObject();
      this.eshutterSpeed.clearObject();
      this.slowShutter.clearObject();
      this.maxAgc.clearObject();
      this.irisControl.clearObject();
      this.blcControl.clearObject();
      this.dayNightMode.clearObject();
      this.dayNightInterval.clearObject();
    }
};


