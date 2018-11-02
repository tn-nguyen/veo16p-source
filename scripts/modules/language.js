/* 
 * language.js
 * -------------
 */

define(['i18n!nls/languageData',
        'modules/sprintf',
        'modules/cookie',
        'modules/ajax'],
       function(languageData, sprintf) {
  // Template load
  'use strict';

  var language = function() {
    this.langcheck();
    this.sprintf = sprintf;
    this.initialize();
  };

  language.prototype = {
    initialize: function() {
       var locale = WebView.cookie.getCookie('backbone_lang');

      if (locale === null) {
        this.setDefaultLocale();
      }

      if (this.checkSupportLocaleKey(locale) === false && this.checkSupportLocaleValue(locale) === false) {
        // this.setDefaultLocale();
      }

      WebView.languageData = languageData;
      WebView.text = this.useSprintf;
    },
    langcheck: function() {
        var local_lang = WebView.cookie.getCookie('local_language');
        var languageList = w.INFO.LanguageList;
      
        if(!local_lang) {
          WebView.cookie.setCookie("local_language",w.INFO.Language);
          local_lang = w.INFO.Language;
        }
        
        $.each(w.INFO.LanguageList, function(key,value) {
          if(key == "") return;
          if(key == local_lang) {
            if(WebView.cookie.getCookie('backbone_lang') != value)
            {
              WebView.cookie.setCookie('backbone_lang', value);
              window.location.reload();
            }
            WebView.cookie.setCookie('backbone_lang', value);
          }
        });
    },
    checkSupportLocaleKey: function(locale) {
      var languageList = w.INFO.LanguageList,
          support = false;
          
      if (languageList[locale]) {
        support = true;
      }

      return support;
    },

    checkSupportLocaleValue: function(locale) {
      var languageList = w.INFO.LanguageList,
          support = false;

      for (var i in languageList) {
        if (languageList[i] === locale) {
          support = true;
          break;
        }
      }

      return support;
    },

    setDefaultLocale: function() {
      var languageList = w.INFO.LanguageList;
      WebView.cookie.setCookie("local_language",languageList[w.INFO.Language]);

      // localStorage.setItem('locale', languageList[w.INFO.Language]);
      window.location.reload();
    },

    setLocale: function(locale) {
      if (this.checkSupportLocaleKey(locale)) this.setLocaleByKey(locale);
      if (this.checkSupportLocaleValue(locale)) this.setLocaleByValue(locale);
    },

    setLocaleByKey: function(localeKey) {
      var languageList = w.INFO.LanguageList;

      if (this.checkSupportLocaleKey(localeKey)) {
        WebView.cookie.setCookie("local_language",languageList[localeKey]);
        // localStorage.setItem('locale', languageList[localeKey]);
        window.location.reload();
      }

      return false;
    },

    setLocaleByValue: function(localeValue) {
      var languageList = w.INFO.LanguageList;

      if (this.checkSupportLocaleValue(localeKey)) {
        WebView.cookie.setCookie("local_language",localeValue);
        // localStorage.setItem('locale', localeValue);
        window.location.reload();
      }

      return false;
    },

    replaceText: function(json) {
      if (typeof json !== 'object') return false;

      for (var i in json) {
        if ((i.indexOf('text') === 0 || i === 'label') && typeof json[i] == 'string') {
          if (w.languageData[json[i]])
            json[i] = this.useSprintf(w.languageData[json[i]]);
        }
        if (typeof json[i] === 'object') {
          json[i] = this.replaceText(json[i]);
        }
      }

      return json;
    },

    useSprintf: function() {
      var key, ret;

      key = w.languageData[arguments[0]];
      if (typeof key == 'undefined')
        ret = arguments[0];
      else
        arguments[0] = key;
        ret = sprintf.initialize.apply( this, arguments );

      return ret
    }
  };

  return language;
});