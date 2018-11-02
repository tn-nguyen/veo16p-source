/**
 * @author chcha
 */

var Layers = function(numCh, maxLayers) {
  this.__tmpl = 
    {
      t:'_layer',
      x1:0,
      y1:0,
      x2:0,
      y2:0
    };

  this.arr = [];
  this.numCh = numCh;
  this.maxLayers = maxLayers;

  this.empty();
};

Layers.prototype = {
  empty: function(ch, layerid) {
    if( ch == null ) {
      for ( var i=0 ; i < this.numCh ; i++ ) {
        this.empty(i);
      }
    } else {
      if( layerid == null ) {
        this.arr[ch] = [];
      } else {
        if( this.arr[ch][layerid] != null ) {
          this.arr[ch][layerid] = null;
        }
      }
    }
  },
  _parseLayerStr: function(str) {
    /**
     * str [x1]x[y1]n[x2]x[y2]
     */
    var x1, y1, x2, y2;
    var spot = str.split("n", 2);

    if( spot[0] ) {
      x1 = spot[0].slice(0, spot[0].indexOf('x'));
      y1 = spot[0].slice(spot[0].indexOf('x')+1);
    } else {
      return null;
    }

    if( spot[1] ) {
      x2 = spot[1].slice(0, spot[1].indexOf('x'));
      y2 = spot[1].slice(spot[1].indexOf('x')+1);
    } else {
      return null;
    }

    return {
      t: '_layer',
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2
    }
  },
  _makeLayerStr: function(layer) {
    if( layer && layer.t == '_layer' ) {
      return layer.x1 + 'x' + layer.y1 + 'n' + layer.x2 + 'x' + layer.y2;
    }

    return "-1x-1n-1x-1";
  },
  setData: function(data) {
    var n = parseInt(data['rectCnt']);
    
    for( var ch=0 ; ch < this.numCh ; ch++ ) {
      for( var l=0 ; l < this.maxLayers ; l++ ) {
        try {
          var nl;
          if( data['c'+ch+'r'+l] ) {
             nl = this._parseLayerStr(data['c'+ch+'r'+l]);
          } else {
            nl = {};
          }

          this.arr[ch][l] = nl;
        } catch (e) {
          console && console.log(e + " ch:" + ch + " l:" + l);
        }
      }
    }
  },
  getData: function() {
    var data = {};

    for( var ch=0 ; ch < this.numCh ; ch++ ) {
      for( var l=0 ; l < this.maxLayers ; l++ ) {
        data['c'+ch+'r'+l] = this._makeLayerStr(this.arr[ch][l]);
      }
    }

    return data;
  }
};

/**
 * 
 * Private Mask Layer Widget
 *
 **/
var PrivMaskWidget = function(elem, opts, layers) {
  this.opts = {
    numCh: 16,
    maxLayers: 0,
    img: null,
    callback: null,
    layerSel: null,
    deselect: null
  }

  // elem must be <table>
  this.elem = $(elem);

  $.extend(this.opts, opts);

  this._isinit = true;
  this._setup();
  
  this.curCh = 0;
  this.curLayer = -1;
  
  this.area = '';
  this.prevarea = '';

  this._layers = [];
  this._initLayers();

  this.bgcls = [ 
    "privbg0",//unselected 
    "privbg1",//selected
    "privbg2",//hover
    "privbg3" //selecting
  ];

  this._registerEvent();
};

PrivMaskWidget.prototype = {
  _caller : {},
  _procChannel: function(ch) {
    this.curCh = ch;
  },
  _initLayers : function() {
    this.layers = new Layers(this.opts.numCh, this.opts.maxLayers);
  },
  _getCellIndex2: function(x, y) {
    var o = this.opts;
    return o.cols * y + x;
  },
  _activateLayers: function(ch, data) {
    var o = this.opts;

    for( var i=0 ; i < o.maxLayers ; i++ ) {
      if( i < data["area_num" + ch] ) {
        //$("input.area[value="+i+"]").prop('disabled', false);
        $("input.area[value="+i+"]").parent("label").show();
      } else {
        //$("input.area[value="+i+"]").prop('disabled', true);
        $("input.area[value="+i+"]").parent("label").hide();
      }
    }
  },
  _drawLayers: function(ch, selectedLayer) {
    if( selectedLayer != null ) {
      // Draw for specific layer
      var layer = this.layers.arr[ch][selectedLayer];

      if( layer && layer.t == "_layer" ) {
        if( parseInt(layer.x1) >= 0 &&
            parseInt(layer.y1) >= 0 &&
            parseInt(layer.x2) >= 0 &&
            parseInt(layer.y2) >= 0 ) {
          var xa = Math.min(layer.x1, layer.x2);
          var xb = Math.max(layer.x1, layer.x2);
          var ya = Math.min(layer.y1, layer.y2);
          var yb = Math.max(layer.y1, layer.y2);

          for( var x=xa ; x <= xb ; x++ ) {
            for( var y=ya ; y <= yb ; y++ ) {
              $("td#line"+y+"_"+x).addClass("ui-selected");
            }
          }
        }
      }
    } else {
      // Draw all layer
      for( var l=0 ; l < this.layers.maxLayers ; l++ ) {
        this._drawLayers(ch, l);
      }
    }
  },
  _procLayer: function(ch) {
    // Layer (Area) Radio Button
    var o = this.opts;
    var selectedLayer = ($("input[name="+o.layerSel+"]:checked").val());

    this._clearDrawedLayer();

    if( selectedLayer.indexOf('all') >=0 ) {
      $(this.elem).selectable("disable");
      this._drawLayers(ch, null);
    } else {
      $(this.elem).selectable("enable");
      this._drawLayers(ch, selectedLayer);
    }
    this.curLayer = selectedLayer;
  },
  _clearDrawedLayer: function() {
    $(this.elem).find('.ui-selected').removeClass('ui-selected');
  },
  _registerEvent: function () {
    var me = this;
    var o = this.opts;

    $("input[name="+o.layerSel+"]").change(function(e) {
      // Layer Radio Button
      me._procLayer(me.curCh);
    });

    $(o.deselect).click(function(e) {
      // Deselect Button
      var selectedLayer = ($("input[name="+o.layerSel+"]:checked").val());

      me._clearDrawedLayer();

      try {
        if( selectedLayer == "all" ) {
          me.layers.empty(me.curCh);
        } else {
          me.layers.empty(me.curCh, parseInt(selectedLayer));
        }
      } catch (e) {
        $z.log("deselect error");
      }
      me._changedBlock();
    });
  },
  _getCellIndex: function(e) {
    var o = this.opts;

    var y = $(e).parent().index();
    var x = $(e).index();

    return o.cols * y + x;
  },
  _getCellPos: function(e) {
    var o = this.opts;

    var y = $(e).parent().index();
    var x = $(e).index();

    return {x:x, y:y};
  },
  _makeSelectable: function() {
    var me = this;
    var o = this.opts;
    var selected = [];

    this.elem.selectable({
      filter : 'td',
      start: function(e, ui) {
      },
      selecting : function(e, ui) {
      },
      selected : function(e, ui) {
        selected.push(ui.selected);
        if ($(ui.selected).hasClass('selectedfilter')) {
            $(ui.selected).removeClass('selectedfilter');
            // do unselected stuff
        } else {            
            $(ui.selected).addClass('selectedfilter');
            // do selected stuff
        }
      },
      unselected: function (e, ui) {
        $(ui.unselected).removeClass('selectedfilter');
      },
      stop : function(e, ui) {
        e.metaKey = false;
        var sts;
        var color;
        var pos;
        var data = {};
        
        var firstEl = selected[0];
        var lastEl = selected[selected.length-1];

        pos1 = me._getCellPos(firstEl);
        pos2 = me._getCellPos(lastEl);

        var layer = {
          t: '_layer',
          x1: pos1.x,
          y1: pos1.y,
          x2: pos2.x,
          y2: pos2.y
        };

        me.layers.arr[me.curCh][me.curLayer] = layer;
        selected = [];

        me._changedBlock();
      }
    });
  },
  _createCanvas: function(cols, rows, data) {
    var self=this;
    var o=this.opts;

    var width = (o.img != null)  && o.img.outerWidth();
    var height = (o.img != null) && o.img.outerHeight();

    var tbl, tdobj, trobj;
    tbl = this.elem;

    tbl.empty();

    for( var r=0 ; r < rows ; r++ ) {
      trobj = $('<tr>').appendTo(tbl);

      for( var c=0 ; c < cols ; c++ ) {
        tdobj = $('<td class="privcell"></td>')
          .prop('id', 'line' + r + '_' + c)
          .data('idx', r * cols + c)
          .appendTo(trobj);
      }
    }

    if (getInternetExplorerVersion() <= 8)
    {

      var width_cell = width / cols -2;

      $('.privcell').width(width_cell);
    }

  },
  _setup : function (caller, col, row, areaMethod) {
    var self=this;
    var o=this.opts;
  },
  updateData: function(data) {
    // init or update of data
    var me = this;

    this.layers.empty();
    this.layers.setData(data);
  },
  updateCh: function(ch, data) {
    // reconfig canvas
    var cols = parseInt(data['blockw'+ch]);
    var rows = parseInt(data['blockh'+ch]);

    this._createCanvas(cols, rows, data);
    this._makeSelectable();

    // reconfig layer selector
    this._activateLayers(ch, data);
    $("input:radio[name=selLayer][value='all']").prop("checked", true);

    // currnet Channel
    this._procChannel(ch);
    this._procLayer(ch);

  },
  updateMblockAll: function(sts) {
    var o = this.opts;
    var len = o.cols * o.rows;
    var area = this.area;
    var data = {};
    
    if ( area.length < len ) {
      $z.log("area len error");
      return;
    }

    for(var i=0 ; i < len ; i++ ) {
        area = area.setCharAt(i, sts);
    }
    this.layers.empty();

    if( parseInt(sts) == 1 ) {
      this.layers.add({
        t: '_layer',
        x1: 0,
        y1: 0,
        x2: o.cols-1,
        y2: o.rows-1
      });
    }
    
    data['rectCnt'] = this.layers.length();
    data['area'] = area;
    $.extend(data, this.layers.getData());

    o.callback(data);
    this.update(data);
  },
  _changedBlock: function() {
    var me = this;
    var data = {};
    var o = me.opts;

    $.extend(data, me.layers.getData());
    o.callback(data);
  }
};

