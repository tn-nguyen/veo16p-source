
var Button = function (_id) {
  this.id = _id;
  this.my = $('#'+this.id);
  this.button;
  this.value;
  this.clicked = 0;

  this.init(this.id);
}

Button.prototype = {
    caller: {},
    mouseClickedCallback:null,
    mouseReleasedCallback:null,
    object: {},
    init: function (_id) {
      this.button = $('#'+ this.id);
      this.button.prop('class', this.id + ' button '+ this.id +'_button');
      this.button.prop('name', this.id);
      this.clearObject();
      var me = this;
      this.button.mousedown(function(event) {me.mouseClicked(this.id);});
      this.button.mouseup(function(event) {me.mouseReleased(this.id);});
      this.button.mouseleave(function(event) {me.mouseLeave(this.id);});
      this.clicked = false;
      return;
    },
    setEnable: function (_flag) {
      if (parseInt(_flag).toString() != "NaN")
        if (parseInt(_flag) != 0)
          _flag == true;
        else
          _flag == false;

      if (_flag)
        this.button.removeAttr('disabled');
      else
        this.button.attr('disabled', 'disabled');
    },
    mouseClicked: function (_id) {
      if (this.mouseClickedCallback == null)
        return;

      this.clicked = true;

      this.mouseClickedCallback(_id);
    },
    mouseReleased: function(_id) {
      if (this.clicked == false)
        return;

      this.clicked = false;

      if (this.mouseReleasedCallback == null)
        return;

      this.mouseReleasedCallback(_id);
    },
    mouseLeave:function(_id) {
      this.clicked = false;
    },
    clearObject: function () {
      this.object = {};
      this.setEnable(true);
    },
    setText: function (_text) {
      this.button.attr('value', _text);
    },
    setClickCallback: function (_function) {
      this.mouseClickedCallback = _function;
    },
    setReleaseCallback: function (_function) {
      this.mouseReleasedCallback = _function;
    },
    getType: function() {
      return "button";
    },
    getObject: function() {
      return this.object;
    },
    setObject: function(object) {
      this.object = object;
    },
    setValue: function(dummy) {
      return;
    },
    getValue: function() {
      return null;
    }
}

/**
 * Lable Slider NumericUpDown ScopeText
 * _id : empty div tag or table
 *
 */
var SliderSpinner = function (_id) {
  this.id = _id;
  this.my = $('#'+this.id);

  this.slider;
  this.spinner;
  this.scope;

  this.callbackSliderSpinner;

  this.init();
}

SliderSpinner.prototype = {
    caller: {},
    options: {
      minValue: null,
      maxValue: null,
      curValue: null
    },
    object: {},

    init: function (){
      var me = this;

      this.my.append($("<div id='" + this.id + "_slider' class='sliderspinner slider'></div>"));
      this.my.append($("<div class='sliderspinner spinner'><input type='text' id='" + this.id + "_spinner' name='" + this.id + "' class='spinner' /></div>"));
      this.my.append($("<span id='" + this.id + "_scope' class='sliderspinner scope'></span>"));

      this.slider = $('#'+ this.id+'_slider');
      this.spinner = $('#'+ this.id+'_spinner');
      this.scope = $('#'+ this.id+'_scope');

      //default
      this.options.minValue = 0;
      this.options.maxValue = 0;
      this.options.curValue = 0;

      this.slider.slider({
        range:"min",
        value:this.options.curValue,
        min:this.options.minValue,
        max:this.options.maxValue,
        slide: function( event, ui ) {
          me.options.curValue = ui.value;
          $( '#'+ $(this).parent().attr('id')+'_spinner' ).val(me.options.curValue);
        },
        stop: function ( event, ui ) {
          //me.callbackDnnSensitivity(event);
          if(me.callbackSliderSpinner)
            me.callbackSliderSpinner(event);
        }
      });

      this.spinner.spinner({
        min: this.options.minValue,
        max: this.options.maxValue,
        increment: 'fast'
      });
      var slider = this.slider;
      this.spinner.change( function (event) {
        me.options.curValue = $(this).spinner( "value" );
        slider.slider("value", me.options.curValue);

        setTimeout(function(){
          //me.callbackDnnSensitivity(event);
          if(me.callbackSliderSpinner)
            me.callbackSliderSpinner(event);
        }, 100)


      });
      this.spinner.val(this.options.curValue);

      this.scope.text("["+this.options.minValue+"~"+this.options.maxValue+"]");

    },
    setEnable: function (_flag) {
      if (_flag == true || parseInt(_flag) )
      {
        this.slider.slider( "enable" );
        this.spinner.spinner('enable')
        this.scope.removeAttr('disabled');
      }
      else
      {
        this.slider.slider( "disable" );
        this.spinner.spinner('disable')
        this.scope.attr('disabled', 'disabled');
      }
      return;
    },
    isEnable: function() {
      return !(this.scope.attr('disabled'));
    },
    setMinMaxValue: function (_val1, _val2) {
      _val1 = parseInt(_val1);
      _val2 = parseInt(_val2);
      var _max, _min;
      if (_val1 <= _val2)
      {
        _min = _val1;
        _max = _val2;
      }
      else
      {
        _max = _val1;
        _min = _val2;
      }
      this.options.minValue = _min;
      this.options.maxValue = _max;

      this.slider.slider("option","min", _min);
      this.slider.slider("option","max", _max);
      this.slider.slider("value", this.options.curValue);
      this.spinner.spinner({min:_min, max:_max});
      this.scope.text("["+this.options.minValue+"~"+this.options.maxValue+"]");
    },
    setValue: function (_value) {
      _value = parseInt(_value);
      if (_value < this.options.minValue || this.options.maxValue < _value)
        return null;

      this.slider.slider("value", _value);
      this.spinner.val(_value);
      this.options.curValue = _value;
    },
    setValueWithoutChange: function (_value) {
      _value = parseInt(_value);
      if (_value < this.options.minValue || this.options.maxValue < _value)
        return null;

      this.slider.slider("value", _value);
      document.getElementById(this.id+"_spinner").value = _value;
      this.options.curValue = _value;
    },
    setCallback: function (callback) {
      this.callbackSliderSpinner = callback;
    },
    getValue: function () {
      return this.options.curValue == null ? null : this.options.curValue.toString();
    },
    clearObject: function() {
      this.setMinMaxValue(0, 0);
      this.setValue(0);
      this.options = {};
      this.setEnable(true);
    },
    setObject: function(object) {
      this.object = object;
    },
    getObject: function() {
      return this.object;
    },
    getType: function() {
      return "spinner";
    }
}

/**
 * _id : empty div tag or table
 *
 */

var DropdownBox = function (_id) {
  if (_id == null) return;

  this.id = _id;
  this.my = $('#'+this.id);
  this.select;
  this.init();
  this.onChange;
}

DropdownBox.prototype = {
    caller: {},
    onChange_callback: null,
    object: {},
    object_cnt: 0,
    selected: null,
    pre_selected: null,
    init: function () {
      this.select = $('#'+ this.id);
      this.select.prop("class","dropdownbox select");
      this.select.prop('name', this.id);

      var me = this;
      this.clearObject();
      this.select.change(function(event) {me.onChange(me);});
    },
    addItem: function (_index, _itemName, _object) {
      // TODO: same item check.
      $(this.select).append($("<option>").val(_index).html(_itemName));
      if (_object != undefined) {
        this.object[_index] = _object;
        this.object_cnt++;
      }
    },
    deleteAllItem: function () {
      this.select.children().remove();
      this.selected = null;
      this.pre_selected = null;
      this.object = {};
      this.object_cnt = 0;
    },
    setEnable: function (_flag) {
      if (parseInt(_flag) || _flag == true)
        this.select.removeAttr('disabled');
      else
        this.select.attr('disabled', 'disabled');
    },
    isEnable: function() {
      return !(this.select.attr('disabled'));
    },
    getValue: function () {
      return (this.select || $('option:selected')).val();
    },
    getValueByCaption: function(caption) {
      elem = document.getElementById(this.id);

      if(elem != null || elem.children.length != 0)
      {
        for(var i=0; i<elem.children.length; i++)
        {
          if(elem.children[i].text.indexOf(caption) >= 0)
          {
            return elem.children[i].value;
          }
        }
      }

      return undefined;
    },
    getObject: function () {
      var index = (this.select || $('option:selected')).val();
      return this.object[index];
    },
    setValue: function (_index) {
      if (_index == null || _index == '')
      {
        _index = this.getValue();
      }
      $(this.select).val(_index);
      this.onChange();
      return true;
    },
    setValueWithoutChange: function (_index) {
      if (_index == null || _index == '')
      {
        _index = this.getValue();
      }
      $(this.select).val(_index);
      return true;
    },
    onChange: function (caller) {
      if (this.onChange_callback == null)
        return;
      this.pre_selected = this.selected;
      this.selected = this.getValue();
      this.onChange_callback(this.selected, this, this.pre_selected);
    },
    setChangeCallback: function (_callback) {
      this.onChange_callback = _callback;
    },
    clearObject: function () {
      this.deleteAllItem();
      this.setEnable(true);
    },
    getType: function() {
      return "dropdownbox";
    }
}

var TimeDropdownBox = function (_id, _max) {
    if(_id == null) return;

    this.id = _id;
    this.my = $('#'+this._id);
    this.select;
    this.value;
    this.max = _max;
    this.init();
    this.onChange;
}

TimeDropdownBox.prototype = {
    caller : {},
    object : {},
    selected: null,
    onChange_callback: null,
    object : {},
    init: function () {
        this.select = $('#'+this.id);
        this.select.prop('name', this.id);
        this.clearObject();
        this.addItem();
        var me = this;
        this.select.change(function(event) {me.onChange(me);});
    },
    addItem: function() {
        var option_time = new Array();

        for(var i = 0; i < this.max; i++){
            if(i < 10)
                option_time.push('0'+i);
            else
                option_time.push(''+i);
        }
        makeSelectOptions('#'+this.id, option_time);
    },
    clearObject: function () {
        this.object = {};
        this.setEnable(true);
    },
    setEnable: function (_flag) {
        if (parseInt(_flag) || _flag == true)
            this.select.removeAttr('disabled');
        else
            this.select.attr('disabled', 'disabled');
    },
    getObject : function() {
        var index = (this.select || $('option:selected')).val();
        return this.object;
    },
    setObject : function(object) {
        this.object = object;
    },
    getValue : function() {
        return (this.select || $('option:selected')).val();
    },
    setValue : function( _index) {
        this.select.val(_index);
        return true;
    },
    getType : function() {
        return "timedropdownbox";
    },
    onChange: function (caller) {
        if (this.onChange_callback == null)
            return;

        this.selected = this.getValue();
        this.onChange_callback(this.selected, this);
    },
    setChangeCallback: function (_callback) {
        this.onChange_callback = _callback;
    }
}

/*
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
*/
