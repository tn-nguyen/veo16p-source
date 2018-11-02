/**
 * @author chcha
 */

var Layers = function(maxlen) {
  this.arr = [
    {
      t:'_layer0',
      x1:0,
      y1:0,
      x2:0,
      y2:0
    }
  ];

  this.maxlen = maxlen;
};

Layers.prototype = {
  add: function(l) {
    if( l.t != '_layer' ) {
      if( l.length ) {
        for( var i=0 ; i < l.length ; i++ ) {
          this.add(l[i]);
        }
      }
      return;
    }

    if( this.length() >= this.maxlen ) {
      return false;
    }

    this.arr.push(l);

    return true;
  },
  del: function(idx) {
    if( this.arr.length > idx ) {
      this.arr.splice(idx, 1);
    }
  },
  length: function() {
    return this.arr.length - 1;
  },
  get: function(idx) {
    var i = idx+1;

    if( this.arr.length > i ) {
      return this.arr[i];
    }
  },
  empty: function() {
    this.arr.splice(1, this.length());
  },
  setData: function(data) {
    // rect [r0x1, r0x2, r0y1, r0y2]
    var n = parseInt(data['rectCnt']);
    
    for( var i=0 ; i < n ; i++ ) {
      var x1 = parseInt(data['r'+i+'x1']);
      var y1 = parseInt(data['r'+i+'y1']);
      var x2 = parseInt(data['r'+i+'x2']);
      var y2 = parseInt(data['r'+i+'y2']);

      var nl = {
        t: '_layer',
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
      };

      this.add(nl);
    }
  },
  getData: function() {
    var data = {};

    for( var i=0 ; i < this.length() ; i++ ) {
      data['r'+i+'x1'] = this.get(i).x1;
      data['r'+i+'y1'] = this.get(i).y1;
      data['r'+i+'x2'] = this.get(i).x2;
      data['r'+i+'y2'] = this.get(i).y2;
    }

    return data;
  }
};

/**
 * 
 * Private Mask Layer Widget
 *
 **/
var PrivMaskLayerWidget = function(elem, opts, layers) {
  this.opts = {
    cols: 12,
    rows: 6,
    selectLimit: 0,
    img: null,
    msgOverflow: "Selection Overflow",
    callback: null
  }

  // elem must be <table>
  this.elem = $(elem);

  $.extend(this.opts, opts);

  this._isinit = true;
  this._create();
  this._setup();
  this._makeSelectable();
  
  this.nSelected = 0;
  
  this.area = '';
  this.prevarea = '';
  this.layers = new Layers(this.opts.selectLimit);

  this.bgcls = [ 
    "pmask_bg0", 
    "pmask_bg1", 
    "pmask_bg2", 
    "pmask_bg3"
  ];
};

PrivMaskLayerWidget.prototype = {
  _caller : {},
  _getCellIndex2: function(x, y) {
    var o = this.opts;
    return o.cols * y + x;
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
  _toArray: function(i) {
    if( typeof i == 'undefined' ) {
      var l;
      var ret2 = [];

      for( l=0 ; l < this.layers.length() ; l++ ) {
        ret2 = ret2.concat(this._toArray(l));
      }

      return ret2;
    }

    var x, y;
    var ar = this.layers;
    var x1, y1, x2, y2;
    var o = this.opts;
    var c = o.cols, r = o.rows;
    var ret = [];

    if( ar.get(i).x1 < ar.get(i).x2 ) {
      x1 = ar.get(i).x1;
      x2 = ar.get(i).x2;
    } else {
      x2 = ar.get(i).x1;
      x1 = ar.get(i).x2;
    }

    if( ar.get(i).y1 < ar.get(i).y2 ) {
      y1 = ar.get(i).y1;
      y2 = ar.get(i).y2;
    } else {
      y2 = ar.get(i).y1;
      y1 = ar.get(i).y2;
    }

    for( y=y1 ; y <= y2 ; y++ ) {
      for( x=x1 ; x <= x2 ; x++ ) {
        var n = this._getCellIndex2(x, y);
        ret.push(n);
      }
    }

    return ret;
  },
  _toArea: function() {
    var ls = this._toArray();

    for( var c=0 ; c < this.area.length ; c++ ) {
      this.area = this.area.setCharAt(c, '0');
    }

    for( var i=0 ; i < ls.length ; i++ ) {
      this.area = this.area.setCharAt(ls[i], '1');
    }

    return this.area;
  },
  _makeSelectable: function() {
    var me = this;
    var o = this.opts;
    var selected = [];

    var dragval = '2';
  
    this.elem.selectable({
      filter : 'td',
      selecting : function(e, ui) {
        $(ui.selecting).removeClass( function(i, css) {
          return (css.match (/\bpmask_bg[0-9]+/g) || []).join(' ');
        }).addClass(me.bgcls[3]);
      },
      unselecting : function(e, ui) {
        var val = $(ui.unselecting).data('val');

        if ( val == '0' ) {
          $(ui.unselecting).removeClass( function(i, css) {
            return (css.match (/\bpmask_bg[0-9]+/g) || []).join(' ');
          }).addClass(me.bgcls[0]);
        } else {
          $(ui.unselecting).removeClass( function(i, css) {
            return (css.match (/\bpmask_bg[0-9]+/g) || []).join(' ');
          }).addClass(me.bgcls[1]);
        }                                        
      },
      selected : function(e, ui) {
        selected.push(ui.selected);
      },
      stop : function(e, ui) {
        var val;
        var color;
        var pos;
        var data = {};
        
        var firstEl = selected[0];
        var lastEl = selected[selected.length-1];

        pos1 = me._getCellPos(firstEl);
        pos2 = me._getCellPos(lastEl);

        var curLayer = {
          t: '_layer',
          x1: pos1.x,
          y1: pos1.y,
          x2: pos2.x,
          y2: pos2.y
        };

        if( me.layers.length() == 1 ) {
          var l = me.layers.get(0);
          if( (l.x2 - l.x1 + 1) == o.cols &&
              (l.y2 - l.y1 + 1) == o.rows)
          me.layers.empty();
        }

        if( !me.layers.add( curLayer ) ) {
          if( confirm(me.opts.msgOverflow) ) {
            me.layers.empty();
            me.layers.add( curLayer );
          } else {
            for( var i=0 ; i < selected.length ; i++ ) {
              var val = parseInt($(selected[i]).data('val'));

              $(selected[i]).removeClass( function(i, css) {
                return (css.match (/\bpmask_bg[0-9]+/g) || []).join(' ');
              }).addClass(me.bgcls[val]);
            }

            return;
          }
        }

        me._updateMblock();

        selected = [];

        me.prevarea = $.extend(true, {}, me._toArea());
      }
    });
  },
  _create: function() {
    var self=this;
    var o=this.opts;

    var width = (o.img != null)  && o.img.outerWidth();
    var height = (o.img != null) && o.img.outerHeight();

    var tbl, tdobj, trobj;
    tbl = this.elem;

    tbl.empty();

    for( var r=0 ; r < o.rows ; r++ ) {
      trobj = $('<tr>').appendTo(tbl);

      for( var c=0 ; c < o.cols ; c++ ) {
        tdobj = $('<td class="pmask_td pmask_bg0"></td>')
          .prop('id', 'line' + r + '_' + c)
          .data('idx', r * o.cols + c)
          .appendTo(trobj);
      }
    }

  },
  _setup : function (caller, col, row, areaMethod) {
    var self=this;
    var o=this.opts;
  },
  _makeupData: function() {
    var me = this;
    var data = {};

    $.extend(data, me.layers.getData());
    data['rectCnt'] = me.layers.length();
    data['area'] = me._toArea();

    return data;
  },
  _updateMblock: function() {
    var me = this;
    var data = {};
    var o = me.opts;
    var area = me._toArea();

    $.extend(data, me.layers.getData());
    data['rectCnt'] = me.layers.length();
    data['area'] = me._toArea();

    o.callback(data);
    //me._updateLayer();
    me._updateArea(area);
  },
  updateMblock: function(data) {
    var me = this;

    this.layers.empty();
    this.layers.setData(data);

    this.area = data['area']; //base value
    this.area = this._toArea();

    //this._updateLayer();
    this._updateArea(this.area);
  },
  _getLayerIdx: function(o) {
    var l;

    var pos  = this._getCellPos(o);
    var ret = 0;

    for( l=0 ; l < this.layers.length() ; l++ ) {
      var la = this.layers.get(l);

      if( pos >= la.x1 && pos <= la.x2 &&
            pos >= la.y1 && pos <= la.y2 ) {
        ret |= ( 1<<l );
      }
    }

    return ret;
  },
  _updateLayers: function() { // not used
    var me = this;
    var td = this.elem.find('td');
    td.each(function(idx, obj) {
      //var t = _getLayerIdx(obj);

      if( me.area.charAt(idx) == '0' ) {
        $(obj).data('val', me.area.charAt(idx))
        .removeClass( function(i, css) {
          return (css.match (/\bpmask_bg[0-9]+/g) || []).join(' ');
        })
        .addClass(me.bgcls[0]);
      } else if ( me.area.charAt(idx) == '1' ) {
        $(obj).data('val', me.area.charAt(idx))
        .removeClass( function(i, css) {
          return (css.match (/\bpmask_bg[0-9]+/g) || []).join(' ');
        })
        .addClass(me.bgcls[1]);
      }
    });
  },
  _updateArea: function(area) {
    var me = this;
    var td = this.elem.find('td');

    td.each(function(idx, obj) {
      if( area.charAt(idx) == '0' ) {
        $(obj).data('val', area.charAt(idx))
        .removeClass( function(i, css) {
          return (css.match (/\bpmask_bg[0-9]+/g) || []).join(' ');
        })
        .addClass(me.bgcls[0]);
      } else if ( area.charAt(idx) == '1' ) {
        $(obj).data('val', area.charAt(idx))
        .removeClass( function(i, css) {
          return (css.match (/\bpmask_bg[0-9]+/g) || []).join(' ');
        })
        .addClass(me.bgcls[1]);
      }
    });
  },
  updateMblockAll: function(val) {
    var o = this.opts;
    var len = o.cols * o.rows;
    var area = this.area;
    var data = {};
    
    if ( area.length < len ) {
      $z.log("area len error");
      return;
    }

    for(var i=0 ; i < len ; i++ ) {
        area = area.setCharAt(i, val);
    }
    this.layers.empty();

    if( parseInt(val) == 1 ) {
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
    this.updateMblock(data);
  }
};

