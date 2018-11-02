/**
 * @author chcha
 */
var ParamWidget = function(settings, showParamByHour) {
    this.settings = {
        indices : [
                   {bgcol: '#00e1ff'},
                   {bgcol: '#fff59b'},
                   {bgcol: '#f567ff'},
                   {bgcol: '#8dcbff'},
                   {bgcol: '#37c61f'},
                   {bgcol: '#664fb4'},
                   {bgcol: '#a75c78'},
                   {bgcol: '#ff5a09'},
                   {bgcol: '#1f7311'},
                   {bgcol: '#007eff'},
                   {bgcol: '#461ce3'},
                   {bgcol: '#ff9518'},
                   {bgcol: '#0f4d0c'},
                   {bgcol: '#002dff'},
                   {bgcol: '#5e009e'},
                   {bgcol: '#e000be'},
                   {bgcol: '#ffe715'},
                   {bgcol: '#1a6f7c'},
                   {bgcol: '#192a67'},
                   {bgcol: '#00eae5'},
                   {bgcol: '#8c2422'},
                   {bgcol: '#2faec2'},
                   {bgcol: '#9ff00c'},
                   {bgcol: '#3f4996'},
                   {bgcol: '#fe1809'}
                   ],
                   curBg : '#fcff00',
                   divID : 'select_param',
                   cellClass : 'cell_param'
    };
    
    $.extend(this.settings, settings);
    
    if( typeof showParamByHour == 'function' ) {
        this.showParamByHour = showParamByHour;
    }
    
    this.data = {}; // Original Data
    this.isBound = false;
};

ParamWidget.prototype = {
    master : {},
    currentDay : 0,
    currentHour : 0,
    selected : [],
    cellGroup : [],
    hoverable: true,
    
    init: function() {
        var widget = this;
        var settings = this.settings;
        var divID = '#' + settings.divID;
        var cellClass = '.' + settings.cellClass;
        
        this.hoverable = true;
        // Schedule Init
        $(divID).selectable( {
            filter:'td' + cellClass,
            selecting: function(event, ui) {
                widget.removeColor(ui.selecting);
                widget.hoverable = false;
                widget.currentHour = $(ui.selecting);
            },
            unselecting: function(event, ui) {
                widget.restoreColor(ui.unselecting);
                widget.selected = [];
            },
            unselected: function(event, ui) {
                var s = $(divID).find('.ui-selected');
                
                if ( s.length == 0 ) {
                  widget.makeColor();
                }
                widget.hoverable = true;
            },
            stop: function(event, ui) {
                var s = $(this).find('.ui-selected');
                
                if ( s.length <= 0 )
                    return;
                
                var selectee = $('.ui-selectee', this);
                var hr = selectee.index(s[0]);
                
                widget.selected = [];
                
                s.each( function(index) {
                    widget.selected[index] = selectee.index(this);
                });
                
                widget.hoverable = false;                
                widget.showParamByHour(widget.currentDay, hr);
            }
        });
        
        $(cellClass).mouseover( function(event) {
            if( !widget.hoverable ) {
                return;
            }

            var hr = $(cellClass).index($(this));
            
            widget.removeColor(this);
            $(this).css('background-color', widget.settings.curBg);
            
            widget.showParamByHour(widget.currentDay, hr);
            
        }).mouseout( function(event) {
            if( !widget.hoverable ) {
                return;
            }
            
            widget.restoreColor(this);
        });
    },
    showParamByHour : function() {        
    },
    makeGroup : function(size, fps, quality, audio) {
        var group = [];

        for( var i=0 ; i < 24 ; i++ ) {
            group[i] = 0;
        }
        
        var all_same = true;
        
        for( var i=0 ; i < 24 ; i++ ) {             
            for( var j=i+1 ; j < 24 ; j++ ) {
                if( group[j] >= i ) {
                    if( size.substr(i*16, INFO_DVRCHANNEL) == size.substr(j*16, INFO_DVRCHANNEL) &&
                        fps.substr(i*16, INFO_DVRCHANNEL) == fps.substr(j*16, INFO_DVRCHANNEL) &&
                        quality.substr(i*16, INFO_DVRCHANNEL) == quality.substr(j*16, INFO_DVRCHANNEL) &&
                        audio.substr(i*16, INFO_DVRCHANNEL) == audio.substr(j*16, INFO_DVRCHANNEL)
                        ) {
                        group[j] = group[i];
                    } else {
                        group[j] = group[j] + 1;
                        all_same = false;
                    }                    
                } 
            }

            if( all_same ) {
                break;
            }
        }
        
        return group;
    },
    /**
     * data should be formed as
     * size    : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon []...  
     * fps     : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon []...  
     * quality : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon []...
     * audio   : Sun "[1hr(CH1~16)(2hr(CH1~16))...]" Mon []...
     * 
     * day : 0-6 (Sun-Sat) 7 (daily) 8 (Holiday)
     */
    bind: function(data, day) {
        var settings = this.settings;
        var divID = '#' + settings.divID;
        var cellClass = '.' + settings.cellClass;
        var cells = $(cellClass);
        
        this.data = data;

        if( day == null ) {
            this.currentDay = 7;
        } else {
            this.currentDay = day;
        }        
        
        $(divID).data('param', data);
        
        
        var widget = this;
        var settings = this.settings;
        var indices = this.settings.indices;
        
        var size =      data.size[this.currentDay];
        var fps =       data.fps[this.currentDay];
        var quality =   data.quality[this.currentDay];
        var audio =     data.audio[this.currentDay];

        this.cellGroup = this.makeGroup(size, fps, quality, audio);
        
        cells.each( function (hr, value) {
            for( var day=0 ; day < 7 ; day++ ) {
                $(this).data('param.size'+day, data.size[day].substr(16*hr, INFO_DVRCHANNEL));
                $(this).data('param.fps'+day, data.fps[day].substr(16*hr, INFO_DVRCHANNEL));
                $(this).data('param.quality'+day, data.quality[day].substr(16*hr, INFO_DVRCHANNEL));
                $(this).data('param.audio'+day, data.audio[day].substr(16*hr, INFO_DVRCHANNEL));
            }

            var v = parseInt(widget.cellGroup[hr]);
                        
            //$(this).css('background-color', indices[v].bgcol);
            $(this).data('bgcol', indices[v].bgcol);
        });
        
        this.isBound = true;
        //this.hoverable = true;
    },
    getBindData: function() {
        return $('#' + this.settings.divID).data('param');
    },
    makeColor : function() {
        var settings = this.settings;
        var cellClass = '.' + settings.cellClass;
        var cells = $(cellClass);

        var widget = this;
        var settings = this.settings;
        var indices = this.settings.indices;
        
        var data = this.data;

        cells.each( function (hr, value) {
            var v = parseInt(widget.cellGroup[hr]);
                        
            $(this).css('background-color', indices[v].bgcol);
        });
    },
    restoreColor : function(element) {
        var indices = this.settings.indices;
        var val = parseInt($(element).data('param'));
        
        //$(element).addClass(indices[val].style_cls);
        var bgcol =  $(element).data('bgcol');

        $(element).css('background-color', bgcol);
    },
    removeColor : function(element) {
        var indices = this.settings.indices;
        
        for( i in indices ) {
            //$(element).removeClass(indices[i].style_cls);
            $(element).css('background-color',  this.settings.curBg);
        }
    },
    updateByDay: function(newDay) {
        try {
            if( !this.isBound ) {
                return;
            }
            
            var widget = this;
            var settings = widget.settings;
            var indices = widget.settings.indices;
            var cellClass = '.' + widget.settings.cellClass;
            var divID = '#' + widget.settings.divID;
            
            var s = $(divID).find('.ui-selected');
            if( s.length > 0 ) {
                s.removeClass('.ui-selected');
            }
            
            if( !(newDay >= 0 && newDay <= 8) ) {
                newDay = this.currentDay;
            }

            var size1 =     this.data.size[newDay];
            var fps1 =      this.data.fps[newDay];
            var quality1 =  this.data.quality[newDay];
            var audio1 =    this.data.audio[newDay];

            //this.cellGroup = this.makeGroup(this.data);
            this.cellGroup = this.makeGroup(size1, fps1, quality1, audio1);
            
            var cursize = '';
            var curfps = '';
            var curquality = '';
            var curaudio = '';
            
            var cells = $(cellClass, divID);

            cells.each( function (hr, value) {
                // set values on each cell data 
                cursize += $(this).data('param.size'+newDay);
                curfps += $(this).data('param.fps'+newDay);
                curquality += $(this).data('param.quality'+newDay);
                curaudio += $(this).data('param.audio'+newDay);
                
                var v = parseInt(widget.cellGroup[hr]);
                
                //$(this).data('param.size', size1.substr(16*hr, 16));
                //$(this).data('param.fps', fps1.substr(16*hr, 16));
                //$(this).data('param.quality', quality1.substr(16*hr, 16));
                //$(this).data('param.audio', audio1.substr(16*hr, 16));
                $(this).data('param.size'+newDay, size1.substr(16*hr, INFO_DVRCHANNEL));
                $(this).data('param.fps'+newDay, fps1.substr(16*hr, INFO_DVRCHANNEL));
                $(this).data('param.quality'+newDay, quality1.substr(16*hr, INFO_DVRCHANNEL));
                $(this).data('param.audio'+newDay, audio1.substr(16*hr, INFO_DVRCHANNEL));
                
                $(this).css('background-color', indices[v].bgcol);
                $(this).data('bgcol', indices[v].bgcol);
            });
            
            if( newDay != this.currentDay ) {
                var currentSched = $(divID).data('param');
                //currentSched[this.currentDay] = curstr;
                this.currentDay = newDay;
            }            
        } catch(e) {
            if( typeof window.console != 'undefined' )
                window.console.error(e);
            else
                alert(e);
        }        
    },
    /*
    updateByHour: function(hour) {
        try {
            if( !this.isBound ) {
                return;
            }
            
            var widget = this;
            var settings = widget.settings;
            var indices = widget.settings.indices;
            var cellClass = '.' + widget.settings.cellClass;
            var divID = '#' + widget.settings.divID;
            
            var s = $(divID).find('.ui-selected');
            if( s.length > 0 ) {
                s.removeClass('.ui-selected');
            }

            var size1 =     this.data.size[this.currentDay];
            var fps1 =      this.data.fps[this.currentDay];
            var quality1 =  this.data.quality[this.currentDay];
            var audio1 =    this.data.audio[this.currentDay];

            //this.cellGroup = this.makeGroup(this.data);
            this.cellGroup = this.makeGroup(size1, fps1, quality1, audio1);
            
            var cursize = '';
            var curfps = '';
            var curquality = '';
            var curaudio = '';
            
            var cells = $(cellClass, divID);

            cells.each( function (hr, value) {
                // set values on each cell data 
                cursize += $(this).data('param.size'+newDay);
                curfps += $(this).data('param.fps'+newDay);
                curquality += $(this).data('param.quality'+newDay);
                curaudio += $(this).data('param.audio'+newDay);
                
                var v = parseInt(widget.cellGroup[hr]);
                
                //$(this).data('param.size', size1.substr(16*hr, 16));
                //$(this).data('param.fps', fps1.substr(16*hr, 16));
                //$(this).data('param.quality', quality1.substr(16*hr, 16));
                //$(this).data('param.audio', audio1.substr(16*hr, 16));
                $(this).data('param.size'+newDay, size1.substr(16*hr, 16));
                $(this).data('param.fps'+newDay, fps1.substr(16*hr, 16));
                $(this).data('param.quality'+newDay, quality1.substr(16*hr, 16));
                $(this).data('param.audio'+newDay, audio1.substr(16*hr, 16));
                
                $(this).css('background-color', indices[v].bgcol);
                $(this).data('bgcol', indices[v].bgcol);
            });            
        } catch(e) {
            if( console )
                console.error(e);
        }        
    },
    */
    setSched: function(index, callback) {        
        try {
            if( !this.isBound ) {
                throw('is not Bound');
            }
            
            var widget = this;
            var settings = widget.settings;
            var indices = widget.settings.indices;
            var cellClass = '.' + widget.settings.cellClass;
            var divID = '#' + widget.settings.divID;
    
            var cells = $(cellClass, divID);
            var curstr = '';
            
            $('.ui-selected').data('sched', index);
    
            cells.each( function (idx, value) {
                curstr += $(this).data('sched');
                
                for( i in indices ) {
                    $(this).removeClass(indices[i].style_cls);
                }
                
                var v = parseInt($(this).data('sched'));
                $(this).addClass(indices[v].style_cls);
            });
            
            var currentSched = $(divID).data('sched');
            currentSched[this.currentDay] = curstr;        
        } catch(e) {
            if( typeof window.console != 'undefined' )
                window.console.error(e);
            else
                alert(e);
        }
    },
    updateData: function(data, event) {
        var widget = this;
        var settings = widget.settings;
        var indices = widget.settings.indices;
        var cellClass = '.' + widget.settings.cellClass;
        
        
    }
};
