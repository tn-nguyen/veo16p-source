/*
 * widget/port.js
 * ----------
 *
 */

define(['modules/widget', 'modules/ip'], function () {
  'use strict';

  // port widget - jquery widget factory
  $(function() {
    // the widget definition, where "customWidget" is the namespace,
    // "port" the widget name
    $.widget('webview_widget.port', {
      // els
      port: null,

      // default options
      options: {
        port: '0'
        // callbacks
      },

      // the constructor
      _create: function() {
        // this.element
        //   // add a class for theming
        //   .addClass( "webview_widget_port" )
        //   // prevent double click to select text
        //   .disableSelection();

        // // this.port = $( "<input>", {
        // //   type: "text",
        // //   maxlength: "5"
        // // })
        // // .appendTo( this.element );

        // // bind click events on the changer button to the random method

        // this._on( this.element, {
        //   change: "portChange"
        // });

        // this._on( this.port, {
        //   focusin: "portfocusin",
        //   focusout: "portChange"
        // });

        // this._refresh();
      }//,

      // portfocusin: function(event) {
      //   var el = $(event.currentTarget);

      //   if (el.val() === '0'){
      //     el.val('');
      //   }
      // },

      // portChange: function(event) {
      //   var el = $(event.currentTarget),
      //       val = parseInt($(event.currentTarget).val(), 10);

      //   if (isNaN(parseInt(el.val(), 10)) ||  val < 0 ) {
      //     val = '0';
      //   }

      //   if ( 65535 < val) {
      //     val = '65535';
      //   }

      //   el.val(val);
      //   this.setOptionPortFromVal();

      //   // trigger a callback/event
      //   this._trigger( "change" );
      // },

      // setOptionPortFromVal: function() {
      //   this.options.port = this.port.val();
      // },

      // enable: function() {
      //   this.port.removeAttr('disabled');
      //   return this._setOption( "disabled", false );
      // },

      // disable: function() {
      //   this.port.attr('disabled', 'true');
      //   return this._setOption( "disabled", true );
      // },

      // // called when created, and later when changing options
      // _refresh: function() {

      //   this.port.val(this.options.port).focusout();

      // },

      // // events bound via _on are removed automatically
      // // revert other modifications here
      // _destroy: function() {
      //   // remove generated elements
      //   this.port.remove();

      //   this.element
      //     .removeClass( "webview_widget_port" )
      //     .enableSelection();
      // },

      // // _setOptions is called with a hash of all options that are changing
      // // always refresh when changing options
      // _setOptions: function() {
      //   // _super and _superApply handle keeping the right this-context
      //   this._superApply( arguments );
      //   this._refresh();
      // },

      // // _setOption is called for each individual option that is changing
      // _setOption: function( key, value ) {
      //   var array;

      //   switch (key) {
      //     case 'port':
      //       if (value < 0 || 65535 < value) {
      //         return false;
      //       }
      //       break;
      //     case 'mode': {
      //       if (value === '') value = '0.0.0.0';
      //       array = w.ip.stringToArray(value);
      //       if (array) {
      //         this.setOptionIpFromArray(array);
      //       } else {
      //         return false;
      //       }
      //       break;
      //     }
      //   }
      //   this._super( key, value );
      // }
    });
  });
});