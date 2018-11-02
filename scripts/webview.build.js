({
  appDir: "../",
  baseUrl: "scripts/",
  dir: "../scripts_build",
  //Comment out the optimize line if you want
  //the code minified by UglifyJS
  
  paths: {
    // Core Libraries
    // --------------
    'html5shiv': 'libs/html5shiv_printshiv',
    'jqueryUI': 'libs/jquery_ui_custom',
    'underscore': 'libs/underscore',
    'backbone': 'libs/backbone',
    
    // Plugins
    // -------
    'text': 'libs/require_text',
    
    // Application Folders
    // -------------------
    'collections': 'mvc/collections',
    'models': 'mvc/models',
    'routers': 'mvc/routers',
    'views': 'mvc/views',
    
    'templates': '../html/template',
    'modules': 'modules'
  },

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
  },

  modules: [
    //Optimize the application files. jQuery is not 
    //included since it is already in require-jquery.js
    {
      name: "main",
    }
  ]
})
