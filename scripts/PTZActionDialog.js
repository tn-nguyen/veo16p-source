var PTZPresets = function(arr) {
  this.type = "_ptzSets";
  this.presets = [];

  for( var ch=0 ; ch < arr.length ; ch++ ) {
    this.presets.push(arr[ch]);
  }
};

var PTZPresetsCh = function(use, presets) {
  this.type = "_ptzChs";
  this.use = (use != "0");

  this.arr = presets;
};

var PTZActionDialog = function(ch, presets, presetsPick, opts){
  this.ch = ch;
  this._isOpen = false;
  this.dialog = {};
  this.button = {};

  if( presets.type == "_ptzSets" ) {
    this.presets = presets;
  } else {
    this.presets = null;
  }

  this.opts = {
    button: null,
    width: 50,
    minheight: 50,
    dialogWidth: 300,
    dialogMinHeight: 150,
    posX: 0,
    posY: 0,
    //header: "PTZ preset",
    header: /*langArray['LTXT_LIVE_PTZ']+' '+langArray['LTXT_PRESET']*/langArray['LTXT_PRESET_EDIT'],
    classes: ""
  };

  $.extend(this.opts, opts);

  this._create();

  if( presetsPick != null  ) {
    this.update(presetsPick);
  }
};

PTZActionDialog.prototype = {
  _bindEvents: function() {
    var self = this;
    var button = self.button;

    // enabler(check box) event
    self.enabler.change(function() {
      self._setEnable(self.enabler.prop('checked'));
    });

    function clickHandler() {
      self[ self._isOpen ? 'close' : 'open' ]();
    }

    // set click event to elem
    self.button.click( clickHandler );
    self.button
    .mouseover( function() {
      tooltip.show($(this).val());
    })
    .mouseout( function() {
      tooltip.hide();
    });

    self.dialog.find("select").change( function(e) {
      if( $(this).val() == "-2" ) {
        $(this).val(0);
        return;
      }

      var val = [];

      self.dialog.find("select").each(function(i, o) {
        if( parseInt($(o).val()) < 0 ) {
          val[i] = 0;
        } else {
          val[i] = $(o).val();
        }
      });

      self.updateButton(val);
      self._updateValue(val);
    });

    $(document).bind('mousedown', function(e) {
      if( self._isOpen 
            && !$.contains(self.dialog[0], e.target) 
            && !$.contains(self.button[0], e.target) 
            && e.target !== self.button[0] ) {
        self.close();
      }
    });
  },
  _create: function() {
    var self = this;
    var p = this.presets;
    var o = this.opts;
    var b = this.button = $(o.button);

    // make enabler checkbox for button
    var $chk = this.enabler = $('<input type="checkbox">')
              .prop("name", "usePtz" + self.ch)
              .addClass("ptzenabler")
              .insertBefore(b);

    // make new element containing presets
    var name = b.prop("name");
    var id   = b.prop("id");

    b.prop("name", "btn" + name).prop("id", "btn" + id);
    b.addClass("ptzact-button");

    var $helm = this.elem = $('<input type="hidden">')
                .prop("name", name)
                .prop("id", id)
                .insertAfter(b);

    // make dialog for button
    var dlg = this.dialog = $("<div>")
      .addClass("ptzact ptzdialog")
      .addClass(o.classes)
      .css('min-height', o.dialogMinHeight)
      .hide()
      .insertAfter(b);

    $('<h2>')
      .html(function() {
        return o.header/* + " #" + (self.ch+1)*/;
      })
      .appendTo(dlg);

    var container = this.container 
      = $('<table>').appendTo(dlg);

    if(INFO_VENDOR == 'ALSOK' || INFO_VENDOR == 'TAKENAKA') {
      $('<tr>')
        .append($('<th>').addClass('c1').html(langArray['LTXT_SEARCHBYTEXTSEARCH_ELECTRIC_PATH']))
        .append($('<th>').addClass('c2').html(langArray['LTXT_PRESET']))
        .appendTo(container);
    } else {
      $('<tr>')
        .append($('<th>').addClass('c1').html(langArray['LTXT_SETUP_CH']))
        .append($('<th>').addClass('c2').html(langArray['LTXT_PRESET']))
        .appendTo(container);
    }

    //make OK/CANCEL button container.
    var container_button = $('<div>')
      .appendTo(dlg);

    //make OK button & append to container.
    $('<button>').css('width', '50%').html(langArray['LTXT_OK']).click(function(event){
      event.preventDefault();
      self.close();
    }).appendTo(container_button);

    //make CANCEL button & append to container.
    $('<button>').css('width', '50%').html(langArray['LTXT_CANCEL']).click(function(event){
      event.preventDefault();

      //revert current channel.
      self.updateButton(self.origData);
      self.updateDialog(self.origData);
      self._updateValue(self.origData);
      //self.update({
      //  use: $z.current.m.origData["usePtz"+self.ch],           //preset checkbox.
      //  arr: $z.current.m.origData["ptzpre"+self.ch].split("p") //preset array (string->array)
      //});

      //close current dialog.
      self.close();
    }).appendTo(container_button);

    this._refreshControl();
    this._bindEvents();
  },
  _setEnable: function(b) {
    if( b ) {
      this.enabler.prop("checked", true);

      this.button.removeClass("ptzact-disabled");
      this.button.removeProp("disabled");
    } else {
      this.enabler.prop("checked", false);

      this.button.addClass("ptzact-disabled");
      this.button.prop("disabled", "disabled");
    }
  },
  _refreshControl: function() {
    var self = this;
    var p = self.presets.presets;
    var id = this.elem.prop("id"),
        name = this.elem.prop("name");

    for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
      var tr = $("<tr>").appendTo(this.container);

      $('<td>')
        .html(ch+1)
        .appendTo( tr );

      var selem = $('<select>')
          .prop('id', id + "_" + ch)
          .prop('name', name + "_" + ch);
                 
      $('<option>')
          .val(0)
          .html(langArray["LTXT_SETUPRECCONTINUOUSACT_NONE"])
          .appendTo(selem);

      $('<option>')
          .val(-2)
          .html("-----")
          .appendTo(selem);

      var ptzarr = p[ch];

      if( ptzarr != null ) {
        for( var pi=0; pi < ptzarr.length ; pi++ ) {
          var txt = ptzarr[pi].no + " : " + ptzarr[pi].name;

          var option = $('<option>')
          .val(ptzarr[pi].no)
          .html(txt)
          .appendTo(selem);
        }
      }

      $("<td>")
        .appendTo( tr )
        .append(selem);

    }
  },
  _setDlgWidth: function(w) {
    var self = this;

    self.dialog.width(w);
  },
  _setDlgPos: function() {
    var self = this;
    var b = self.button,
        o = self.opts;

    var pos = b.position();

    if( o.posX == 0 ) {
      o.posX = pos.left;
    }

    if( o.posY == 0 ) {
      o.posY = pos.top + b.outerHeight();
    }

    self.dialog.css({
      top:o.posY,
      left:o.posX
    });
  },
  open: function() {
    var self = this,
        o = this.opts,
        b = this.button;

    //make original value.
    val = [];
    self.dialog.find("select").each(function(i, o) {
      if( parseInt($(o).val()) < 0 ) {
        val[i] = 0;
      } else {
        val[i] = $(o).val();
      }
    });
    self.origData = val;

    self._setDlgWidth(o.dialogWidth);
    self._setDlgPos();
    self.dialog.show();
    self._isOpen = true;
  },
  close: function() {
    var self = this;

    self.dialog.hide();
    self._isOpen = false;
  },
  _updateValue: function(val) {
    var self = this;

    self.elem.val(val.join("p"));
  },
  updateButton: function(val) {
    var self = this;
    var str = val.join();

    self.button.val(str);
  },
  updateDialog: function(val) {
    var self = this;

    self.dialog.find("select").each(function(i, o) {
      $(o).val(val[i]);
    });
  },
  update: function(val) {
    var use = val.use;
    var arr = val.arr;

    this._setEnable(use);

    this.updateButton(arr);
    this.updateDialog(arr);
    this._updateValue(arr);
  }
};

