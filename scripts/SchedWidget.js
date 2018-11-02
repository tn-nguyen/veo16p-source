/**
 * @author chcha
 */

var start, stop;

var chkEventHandler = function(ch){
  return function(event){
    var flag_all_checked = true;

    for(var day=1; day<8; day++) { //1~7(Mon~Sun)
      if($("input#cpSch"+day).is(':checked') == false) {
        flag_all_checked = false;
      }
    }

    if(flag_all_checked === false) {
      if($("input#cpSch0").attr('checked', false));
    } else {
      if($("input#cpSch0").attr('checked', true));
    }
  }
};

var SchedWidget = function (settings, callback) {
    this.settings = {
        indices : [
            {name: langArray["LTXT_OFF"],   style_cls: 'color_off',     button: 'dlg_off'},
            {name: langArray["LTXT_ON"],    style_cls: 'color_on',      button: 'dlg_on'},
            {name: langArray["LTXT_SETUPEVENT_EVENT"], style_cls: 'color_event',   button: 'dlg_event'},
        ],
        divID : 'select_sched',
        cellClass : 'cell_sched',
        dialogID : 'dialog_select',
        cpButtonID : 'cp_button',
        popupCPID : 'popupCP',
        closeOnEscape: false
    };
    
    $.extend(this.settings, settings);
    
    this.allClass = "";
    for( i in this.settings.indices ) {
      this.allClass += ( this.settings.indices[i].style_cls + " " );
    }

    if( typeof callback == 'function' )
        this.callback = callback;
    else {
        this.callback = function() {            
        } ;
    }
       
    this._data = {}; // Original Data
    this.isBound = false;
};

SchedWidget.prototype = {
    selected : [],
    currentDay : 0,
    
    init: function() {
        var widget = this;
        var settings = this.settings;
        var divID = '#' + settings.divID;
        var cellClass = '.' + settings.cellClass;
        var dialogID = '#' + settings.dialogID;
        var cpButtonID = '#' + settings.cpButtonID;
        var popupCPID = '#' + settings.popupCPID;
        
        // Schedule Init
        $(divID).selectable( {
            filter:'td' + cellClass,
            start: function() {
                start = getMillisec();
            },
            selecting: function(event, ui) {
                widget._removeColor(ui.selecting);
                
                //debug('[selecting] ' + getMillisec());
            },
            unselecting: function(event, ui) {
                widget._restoreColor(ui.unselecting);
            },
            stop: function(event, ui) {
                var s = $(this).find('.ui-selected');
                
                stop = getMillisec();
        
                //debug('[stop] ' + (stop-start));
                
                if( s.length > 0 ) {
                  $('#' + settings.dialogID).dialog('open');
                }
            }
        });
        
        if( $('#' + settings.dialogID).length == 0 ) {
            var div = $('<div>').attr('id', settings.dialogID);
                    
            for( var index in settings.indices) {
                var button = $('<button>')
                            .attr('id', settings.indices[index].button)
                            .attr('idx', index)
                            .text(settings.indices[index].name);
                div.append(button);
            }
            
            $('body').append(div);
            
            
        }
        
        $(dialogID).dialog( {
            autoOpen : false,
            modal : true,
            draggable: false,
            resizable: false,
            width: 200,
            title: langArray["LTXT_SETUPEVENT_ONOFF_SCHED"],
            
            create: function(event, ui) {
              //$(".ui-dialog-titlebar").hide();
              $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
            },

            close: function(e, ui) {
              widget.updateByDay(-1);
            },

            buttons: [{
              text : langArray["LTXT_CANCEL"],
              click : function () {
                $(this).dialog('close');
              }
            }]
            
        });

        $(popupCPID).dialog({
            autoOpen : false,
            modal : true,
            width : 180,
            title : langArray["LTXT_SETUPEVENT_COPY_SCHED"],
            create: function(event, ui) {
                var ul = $('<ul>');
                var li;
                var title = [langArray["LTXT_SELECT_ALL"],
                             langArray["LTXT_SUNDAY"],
                             langArray["LTXT_MONDAY"],
                             langArray["LTXT_TUESDAY"],
                             langArray["LTXT_WEDNESDAY"],
                             langArray["LTXT_THURSDAY"],
                             langArray["LTXT_FRIDAY"],
                             langArray["LTXT_SATURDAY"] ];
                
                for( var day=0 ; day < 8 ; day++ ) {
                    li = $('<li>').append(
                        $('<label>').append(
                            $('<input>').attr('type', 'checkbox').attr('id', 'cpSch'+day)
                        ).append(title[day])
                    );
                    ul.append(li);
                }
                $(this).append(ul);
                
                // setup event handler
                $('input#cpSch0').change( function() {// All
                    if( $(this).prop('checked') ) {
                        $(this).closest('ul').find('input:checkbox').prop('checked', true);                        
                    } else {
                        $(this).closest('ul').find('input:checkbox').is( function (index) {
                            if( index != (widget.currentDay+1) ) {
                                $(this).prop('checked', false);
                            }
                        });
                    } 
                });

                for(var day=1; day<8; day++) {
                  $('input#cpSch'+day).change(chkEventHandler(day));
                }
            },
            open : function (event, ui) {
                var chks = $(this).find('input:checkbox');
                chks.removeAttr("disabled");

                $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();

                for(var day=0; day<8; day++) {
                  $('#cpSch'+day).attr('checked', false);
                }

                chks.is( function(index) {
                    if( index == (widget.currentDay+1) ) { // 0 is All
                        $(this).attr("disabled", "disabled");
                        $(this).prop("checked", true);
                    }
                });

                widget.currentDay;
            },
            buttons: [{
              text : langArray["LTXT_OK"],
              click : function () {
                var chks = $(this).find('input:checkbox');
                var from = widget.currentDay;
                var to;
                
                for( to=0 ; to < 7 ; to ++ ) {
                  if( from != to && chks[to+1].checked ) {
                    widget._copySched(from, to);
                  }
                }
                
                if( typeof widget.callback == 'function' ) {
                  widget.callback(widget);
                }
                
                $(this).dialog('close');
              }
            } , {
              text : langArray["LTXT_CANCEL"],
              click : function () {
                $(this).dialog('close');
              }
            }]
        });

        //////////////////////////////////////////
        // Schedule Dialog Button Event Bind
        //////////////////////////////////////////
        for( var index in settings.indices) {
            $('#' + settings.indices[index].button).click( function(event, ui) {
                widget._setSched($(this).attr('idx'));
                widget.updateByDay(-1);
                
                if( typeof widget.callback == 'function' ) {
                    widget.callback(widget);
                }
                $(dialogID).dialog('close');
            });            
        }
        
        $('#dlg_close').click( function(event, ui) {
            $(dialogID).dialog('close');
        });
        
        // "Copy Schedule To" Button
        $(cpButtonID).click(function () {
            var offset = $(cpButtonID).offset();
            offset.top += $(this).outerHeight();
            
            $(popupCPID).dialog(
                "option", "position", [offset.left, offset.top]
            );
            
            $(popupCPID).dialog('open');
        });

        
    },
    /**
     * data should be formed as Array
     * Sun[ '(Ch1:24hr)(Ch2:24hr)' ]  
     * Mon[ '(Ch1:24hr)(Ch2:24hr)' ]  ...
     * 
     * day : 0-6 (Sun-Sat) 7 (daily) 8 (Holiday)
     */
    bind: function(data, day) {
        var settings = this.settings;
        var divID = '#' + settings.divID;
        var cellClass = '.' + settings.cellClass;
        
        this._data = data;
        
        if( day == null ) {
            this.currentDay = 7;
        } else {
            this.currentDay = day;
        }
        
        var cells = $(cellClass);
        var str = data[this.currentDay];
        
        var widget = this;
        var settings = widget.settings;
        var indices = widget.settings.indices;
        var cellClass = '.' + widget.settings.cellClass;
        var divID = '#' + widget.settings.divID;
        
        // TODO : if length of str is same with the number of cells
        //        modify this code to the loop for length of str
        cells.each( function (index, value) {
            $(this).data('sched', str.charAt(index));
            ////widget._updateAnHour(this, str.charAt(index));
        });
        
        this.isBound = true;
    },
    getBindData: function() {
      return this._data;
    },
    _restoreColor : function(element) {
        var indices = this.settings.indices;
        var val = parseInt($(element).data('sched'));
        
        $(element).addClass(indices[val].style_cls);
    },
    _removeColor : function(element) {
        var indices = this.settings.indices;
        
        $(element).removeClass(this.allClass);
    },
    _copySched: function(from, to) {
        var widget = this;
        var divID = '#' + widget.settings.divID;
        var currentSched = this._data;
        
        currentSched[to] = currentSched[from];
        
    },
    _updateAnHour: function(cell, vstr) {
      var classRemove = "";
      var v = parseInt(vstr);
      var widget = this;
      var indices = widget.settings.indices;

      $(cell).removeClass(this.allClass);
      $(cell).addClass(indices[v].style_cls);
      $(cell).data('sched', vstr);
    },
    _unselectAll: function() {
      var widget = this;
      var settings = widget.settings;
      var divID = '#' + widget.settings.divID;

      var s = $(divID).find('.ui-selected');
      s.each( function (index, value) {
        $(this).removeClass('ui-selected');
      });

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

        this._unselectAll();

        if( typeof newDay == 'undefined' ) {
          newDay = this.currentDay;
        }

        if( !(newDay >= 0 && newDay <= 8) ) {
          newDay = this.currentDay;
        } else {
          this.currentDay = newDay;
          this.bind(this._data, this.currentDay);
        }

        var str = this._data[newDay];
        var curstr = '';

        var cells = $(cellClass, divID);

        cells.each( function (index, value) {
          curstr += $(this).data('sched');
          widget._updateAnHour(this, $(this).data('sched'));
        });
      } catch(e) {
        if( typeof window.console != 'undefined' )
          window.console.error(e);
        else
          alert(e);
      }        
    },
    _setSched: function(v, callback) {        
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

        $('.ui-selected').data('sched', v);

        cells.each( function (idx, value) {
          curstr += $(this).data('sched');

        });

        this._data[this.currentDay] = curstr;        
      } catch(e) {
        if( typeof window.console != 'undefined' )
          window.console.error(e);
        else
          alert(e);
      }
    }
};

