/* 
 * template.js
 * -------------
 */

define(['handlebars',
        'modules/ajax',
        'modules/style'
        ], function() {
  // Template load
  'use strict';

  var template = function() {
    var preferences = w.INFO;
    this.Vendor;
    this.Model;

    if (typeof preferences == 'undefined'
      || typeof preferences == 'null') {
      alert('[template] There is no preferences!');
      // default model & vendor
      this.Model = 'IPX_L';
      this.Vendor = 'ITX';
    } else {
      if (typeof preferences.Model == 'undefined'
        || typeof preferences.Model == 'null') {
        alert('[template] There is no Model information!');
        this.Model = 'IPX_L';
      } else {
        this.Model = preferences.Model;
      }

      if (typeof preferences.Vendor == 'undefined'
        || typeof preferences.Vendor == 'null') {
        alert('[template] There is no Vendor information!');
        this.Vendor = 'ITX';
      } else {
        this.Vendor = preferences.Vendor;
      }
    }
  };

  template.prototype = {

    load: function(data) {
      var html = null,
          template = null;

      if (!data.id) {
        WebView.log('template load error : No ID in data!');
        return false;
      }

      if (v[data.id]) {
        v[data.id].renderTemplate();
        return false;
      }

      // load json
      data.content = this._loadContent(data.id);
      if (data.content == '') {
        WebView.log('There is No Template');
      }

      // localization
      data.content = WebView.language.replaceText(data.content);

      // load html
      if (data.content.html) {
        html = this._loadHtml(data.content.html);

        template = Handlebars.compile(html);
        data.template = template(data.content);
      }

      // load css
      this._loadStyle(data.content.css, data.content.id);

      // load View
      if (!data.content.el) {
        data.content.el = data.content.id;
      }

      this._loadView(data);

      return true;
    },

    _loadContent: function(id) {
      var Json = 'content/' + this.Model + '/base/json/' + id + '.json',
          vendorJson = 'content/' + this.Model + '/' + this.Vendor + '/json/' + id + '.json';

      Json = WebView.ajax.syncLoadData(Json, "json");

      if (this.Vendor != 'ITX') {
        vendorJson = WebView.ajax.syncLoadData(vendorJson);
        Json = _.extend(Json, vendorJson);
      }
      return Json;
    },

    _loadHtml: function(url) {
      return WebView.ajax.syncLoadData(url, 'html');
    },

    // Load CSS file for content
    _loadStyle: function(loadOwnCss, id) {
      var css = 'content/' + this.Model + '/base/css/' + id + '.css',
          vendorCss = 'content/' + this.Model + '/' + this.Vendor + '/css/' + id + '.css';
      if (loadOwnCss) {
        WebView.style.loadCss(vendorCss);
      } else {
        WebView.style.loadCss(css);
      }
      
      return true;
    },

    _loadView: function(data) {
      require(['views/v.' + data.id], function(view) {
        v[data.id] = new view(data);
      });
    }
  };

  return template;
});
