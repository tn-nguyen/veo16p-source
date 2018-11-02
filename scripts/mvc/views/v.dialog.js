/* 
 * v.dialog.js
 * -------------
 * 
 */

define(['views/v.base'], function() {

  'use strict';

  var view = WebView.View.extend({

    defaultDialogInformation : {
      appendTo: '#dialog',
      autoOpen: false,
      modal: true,
      show: 'fade',
      hide: 'fade',
      title: '',
      width: 'auto',
      height: 'auto',
      resizable: false,
      draggable: false,
      closeOnEscape: false,
      autoResize: true,
      dialogData: null,

      _open: null,

      open: function(event, ui) {

        var dialogView = $(this).data('my');
        this.dialogView = dialogView;
        WebView.log(dialogView.model);
        
        if ($.isFunction(dialogView._dialogOpen)) {
          dialogView._dialogOpen();
        }
      },

      close: function(event, ui) {
        var  dialogView = this.dialogView;
        if ($.isFunction(dialogView._dialogClose)) {
          dialogView._dialogClose();
        }
      }
    },

    // The DOM Element associated with this view
    model: null,
    data: null,
    parent: null,
    childView: {},

    // options for dialog
    dialogOptions: {},

    initialize: function(initData) {

      var my = this, tempDom, tempDialogInfo;

      this.defaultDialogInformation = _.extend(this.defaultDialogInformation, {
        buttons: [{
          id: 'ok',
          text: w.text('OK'),
          click: function() {
            if ($.isFunction(my._dialogOk)) {
              my._dialogOk();
            }
          }
        },{
          id: 'cancel',
          text: w.text('CANCEL'),
          click: function() {
            if ($.isFunction(my._dialogCancel)) {
              my._dialogCancel();
            }
          }
        }]
      });

      this.setElement('#' + initData.el);
      my.data = initData;
      my.parent = initData.caller;

      if (this.parent) {
        this.parent.addChild(this);
      }

      this.defaultDialogInformation.title = this.data.content.text;

      this.childView = {};
      tempDom = $('<div id=' + this.data.id + '>');
      tempDom.append(this.data.template);
      tempDom.appendTo($('#dialog'));

      this.setElement('#' + this.data.el);
      this.defaultDialogInformation.width = isNaN(this.$el.width())? 'auto' : (parseInt(this.$el.width(), 10) + 24) + 'px';

      if ($.isFunction(my.dialogInfo)) {
        tempDialogInfo = this.dialogInfo(_.clone(this.defaultDialogInformation));
      }

      tempDom.dialog(typeof tempDialogInfo === 'object' ? tempDialogInfo : this.defaultDialogInformation);

      this.setElement('#' + this.data.el);

      // Calls the view's render method
      this.renderTemplate();

      if (initData.afterLoad) {
        initData.afterLoad.call(undefined, this);
      }

      require(['models/m.' + initData.id]
              , function(Model) {
          m[my.data.id] = my.model = new Model();
          my._afterModelLoad(my.model);
        }
      );
    },

    renderTemplate: function () {
      this.setElement('#' + this.data.el);

      for (var i in this.data.content.loadTemplate) {
        this.loadTemplate({
          el: i,
          id: this.data.content.loadTemplate[i]
        });
      }

      if ($.isFunction(this.init)) {
        this.init();
      }

      if (this.model) {
        this.model.loadData();
      }

      return this;
    },

    _dialogOpen: function() {
      if ($.isFunction(this.dialogOpen)) {
        this.dialogOpen();
      }
    },

    _dialogClose: function() {
      if ($.isFunction(this.dialogClose)) {
        this.dialogClose();
      }
    },

    _dialogOk: function() {
      var data = _.clone(this.model.attributes),
          ret,
          parentCallback;

      if ($.isFunction(this.dialogOk)) {
        ret = this.dialogOk();
        if (!ret) return;
        ret = _.extend(data, ret);
        
      }

      parentCallback = this.dialogOptions['dialogOk'];
      if ($.isFunction(parentCallback)) {
        parentCallback(ret);
      }

      this.close();
    },

    _dialogCancel: function() {
      var ret = _.clone(this.model.attributes),
          parentCallback;
      if ($.isFunction(this.dialogCancel)) {
        ret = _.extend(ret, this.dialogCancel());
        if (!ret) return;
      }

      parentCallback = this.dialogOptions['dialogCancel'];
      if ($.isFunction(parentCallback)) {
        parentCallback(ret);
      }

      this.close();
    },

    /*
     *  Abstract methods
     */

    open: function(data) {
      var tempData = _.clone(data);

      for (var i in tempData) {
        if (i === 'data'){
          for (var j in tempData.data) {
            this.model.set(j, tempData.data[j]);
          }
        } else {
          this.dialogOptions[i] = tempData[i];
        }
      }
      this.model.setDefault(tempData.data);

      $('#' + this.id).data('my', this).dialog('open');
    },

    close: function(data) {
      this.model.clear();
      this.dialogOptions = {};
      $('#' + this.id).dialog('close');
    },

    dialogOpen: function() {
      // abstract method
    },


    dialogClose: function() {
      // abstract method
    },

    dialogOk: function() {
      var ret = {};
      return ret;
      // abstract method
    },

    dialogCancel: function() {
      // abstract method
      var ret = {};
      return ret;
    },

    dialogInfo: function(info) {
      // abstract method
      // you have to return info variable.
      return info;
    },

    init: function() {
      // abstract method
    }
  });

  WebView.DialogView = view;
});
