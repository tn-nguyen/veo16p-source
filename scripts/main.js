/* 
 * main.js
 * -------------
 * require_jquery.js allows this file(main.js) to configure dependencies for
 * scripts that do not call define() to register a module.
 * require_jquery.js include jquery core.
 */

// Namespace module
var WebView = WebView || {};

WebView.name = "WebView";
WebView.toString = function () {
  'use strict';
  return "WebView";
};

WebView.nameSpace = function(namespaceString) {
  'use strict';
  if (typeof namespaceString !== "string") {
    return;
  }

  var parts = namespaceString.split("."),
      parent = WebView,
      nameSpace;


  if (parts[0] === "WebView") {
    parts = parts.slice(1);
  } else {
    namespaceString = "WebView." + namespaceString;
  }
  
  for (var i = 0; i < parts.length; i += 1) {
    if (typeof parent[parts[i]] === "undefined") {
      nameSpace = parent[parts[i]] = {};
      nameSpace.name = parts[i];
      nameSpace.toString = function() {return namespaceString;};
    }
    parent = parent[parts[i]];
  }

  return parent;
};

// Initialize Namespace
var w = WebView,
    m = WebView.nameSpace('Models'),
    v = WebView.nameSpace('Views'),
    c = WebView.nameSpace('Collections'),
    r = WebView.nameSpace('Routers');

WebView.log = function(string) {
  'use strict';
  if (typeof WebView.debugging !== 'undefined') {
    if (WebView.debugging === true) {
      try {
        console.log(string);
      } catch (e) {
      }
    }
  }
};

var getCookie = function(cName) {
  cName = cName + '=';
  var cookieData = document.cookie;
  var start = cookieData.indexOf(cName);
  var cValue = '';
  if(start != -1){
    start += cName.length;
    var end = cookieData.indexOf(';', start);
    if(end == -1)end = cookieData.length;
      cValue = cookieData.substring(start, end);
  }

  return unescape(cValue);
};

WebView.debug = function(string) {
  'use strict';
  if (typeof WebView.debugging !== 'undefined') {
    if (WebView.debugging === true) {
      try {
        console.debug(string);
      } catch (e) {
      }
    }
  }
};

// Require.js Config
require.config({

  //Sets the js folder as the base directory for all future relative paths
  baseUrl: '../scripts',

  config: {
    //Set the config for the i18n
    //module ID
    i18n: {
      locale: getCookie('backbone_lang')|| 'english'
    }
  },

  //3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
  // probably a good idea to keep version numbers in the file names for updates checking
  paths: {
    // Core Libraries
    // --------------
    'html5shiv': 'libs/html5shiv_printshiv',
    'jqueryUI': 'libs/jquery_ui_custom',
    'underscore': 'libs/underscore',
    'backbone': 'libs/backbone',
    'backboneIframe': 'libs/backbone.iframe.sync',
    'handlebars': 'libs/handlebars',

    // Plugins
    // -------
    'text': 'libs/require_text',
    'i18n' : 'libs/i18n',

    // Application Folders
    // -------------------
    'directoryRoot': '..',
    'collections': 'mvc/collections',
    'models': 'mvc/models',
    'routers': 'mvc/routers',
    'views': 'mvc/views',

    'templates': '../template',
    'contents': '../content',
    'nls': '../language',

    // Modules
    // -------
    'modules': 'modules',
    'widgets': 'widget',
    'cookie': 'modules/cookie',

    '':''
  },

  //Sets the dependency and shim configurations
  // - Helpful for including non-AMD compatible scripts and managing dependencies
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    'handlebars': {
      deps: [
        'jquery'
      ],
      exports: 'handlebars'
    },
    'views/v.app': {
      deps: [
        'backbone',
        'handlebars',
        'jqueryUI',
        'text',
        'models/m.base',
        'models/m.dialog', 
        'views/v.base',
        'views/v.dialog',
        'modules/style',
      ]
    }
  }
});

//Main Entry Point
require([ 'views/v.app',
          'modules/template',
          'modules/scmListener',
          'modules/importInfo',
          'modules/language',
          'modules/video',
          'modules/authorization',
          'modules/loginInfo'],
          function(MainView, Template, Scm, Info, Language,
          Video, Autorization, LoginInfo) {

  'use strict';

  WebView.debugging = false;

  // Initialize App Information
  // w.preferences = $.parseJSON(preferences);
  // Initialize modules 
  w.info = new Info(w.preferences);
  // for dynamic information.
  // w.info.start(false);
  var lang;
  w.language = new Language();

  w.template = new Template();
  w.scm = new Scm(WebView);
  w.video = new Video();
  w.authorization = new Autorization();
  w.loginInfo = new LoginInfo();

  // Load first template.
  WebView.template.load({
    el: 'wrap',
    id: 'app'
   });
});
