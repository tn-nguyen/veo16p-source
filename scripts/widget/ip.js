/*
 * widget/ip.js
 * ----------
 *
 */

define(['modules/widget', 'modules/ip'], function () {
  'use strict';

  // ip widget - jquery widget factory
  $(function() {
    // the widget definition, where "customWidget" is the namespace,
    // "ip" the widget name
    $.widget('webview_widget.ip', {
      // els
      ip1: null,
      ip2: null,
      ip3: null,
      ip4: null,

      // default options
      options: {
        ip1: '0',
        ip2: '0',
        ip3: '0',
        ip4: '0',
        ipString: '0.0.0.0',
        ipLong: '0'
        // callbacks
      },

      // the constructor
      _create: function() {
        this.element
          // add a class for theming
          .addClass( "webview_widget_ip" )
          // prevent double click to select text
          .disableSelection();

        this.ip1 = $( "<input>", {
          type: "text",
          "class": "webview_widget_ip1",
          maxlength: "3"
        })
        .appendTo( this.element );

        this.element.append('.');

        this.ip2 = $( "<input>", {
          type: "text",
          "class": "webview_widget_ip2",
          maxlength: "3"
        })
        .appendTo( this.element );

        this.element.append('.');

        this.ip3 = $( "<input>", {
          type: "text",
          "class": "webview_widget_ip3",
          maxlength: "3"
        })
        .appendTo( this.element );

        this.element.append('.');

        this.ip4 = $( "<input>", {
          type: "text",
          "class": "webview_widget_ip4",
          maxlength: "3"
        })
        .appendTo( this.element );

        // bind click events on the changer button to the random method

        this._on( this.element, {
          change: "ipChange"
        });

        this._on( this.ip1, {
          focusin: "ipfocusin",
          focusout: "ipChange"
        });

        this._on( this.ip2, {
          focusin: "ipfocusin",
          focusout: "ipChange"
        });

        this._on( this.ip3, {
          focusin: "ipfocusin",
          focusout: "ipChange"
        });

        this._on( this.ip4, {
          focusin: "ipfocusin",
          focusout: "ipChange"
        });

        this._refresh();
      },

      ipfocusin: function(event) {
        var el = $(event.currentTarget);

        if (el.val() === '0'){
          el.val('');
        }
      },

      ipChange: function(event) {
        var el = $(event.currentTarget),
            val = parseInt($(event.currentTarget).val(), 10);

        if (isNaN(parseInt(el.val(), 10)) ||  val < 0 ) {
          val = '0';
        }

        if ( 255 < val) {
          val = '255';
        }

        el.val(val);
        this.setOptionIpFromVal();
        this.setOptionIpString();
        this.setOptionIpLong();

        // trigger a callback/event
        this._trigger( "change" );
      },

      setOptionIpFromArray: function(array) {
        this.options.ip1 = array[0];
        this.options.ip2 = array[1];
        this.options.ip3 = array[2];
        this.options.ip4 = array[3];
      },

      setOptionIpFromVal: function() {
        this.options.ip1 = this.ip1.val();
        this.options.ip2 = this.ip2.val();
        this.options.ip3 = this.ip3.val();
        this.options.ip4 = this.ip4.val();
      },

      setOptionIpString: function() {
        this.options.ipString = this.options.ip1 + '.'
                              + this.options.ip2 + '.'
                              + this.options.ip3 + '.'
                              + this.options.ip4;
      },

      setOptionIpLong: function() {
        this.options.ipLong = w.ip.stringToUint(this.options.ipString);
      },

      enable: function() {
        this.ip1.removeAttr('disabled');
        this.ip2.removeAttr('disabled');
        this.ip3.removeAttr('disabled');
        this.ip4.removeAttr('disabled');
        return this._setOption( "disabled", false );
      },

      disable: function() {
        this.ip1.attr('disabled', 'true');
        this.ip2.attr('disabled', 'true');
        this.ip3.attr('disabled', 'true');
        this.ip4.attr('disabled', 'true');
        return this._setOption( "disabled", true );
      },

      // called when created, and later when changing options
      _refresh: function() {

        this.ip1.val(this.options.ip1);
        this.ip2.val(this.options.ip2);
        this.ip3.val(this.options.ip3);
        this.ip4.val(this.options.ip4).focusout();

        
      },

      // events bound via _on are removed automatically
      // revert other modifications here
      _destroy: function() {
        // remove generated elements
        this.ip1.remove();
        this.ip2.remove();
        this.ip3.remove();
        this.ip4.remove();

        this.element
          .removeClass( "webview_widget_ip" )
          .enableSelection();
      },

      // _setOptions is called with a hash of all options that are changing
      // always refresh when changing options
      _setOptions: function() {
        // _super and _superApply handle keeping the right this-context
        this._superApply( arguments );
        this._refresh();
      },

      // _setOption is called for each individual option that is changing
      _setOption: function( key, value ) {
        var array;

        switch (key) {
          case 'ip1':
          case 'ip2':
          case 'ip3':
          case 'ip4': {
            if (value < 0 || 255 < value) {
              return false;
            }
            break;
          }
          case 'ipString': {
            if (value === '') value = '0.0.0.0';
            array = w.ip.stringToArray(value);
            if (array) {
              this.setOptionIpFromArray(array);
            } else {
              return false;
            }
            break;
          }
          case 'ipLong': {
            array = w.ip.uintToArray(value);
            if (array) {
              this.setOptionIpFromArray(array);
            } else {
              return false;
            }
            break;
          }
        }
        this._super( key, value );
      }
    });
  });
});