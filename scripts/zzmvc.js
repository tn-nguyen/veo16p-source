var zzmvc = function (config) {
    if( this == window ) {
        return new zzmvc(config);
    }

    if( typeof(config) != 'object' ) {
        return false;
    }

    try {
        this.config = config;
        this.name = config.name;
        this.action = config.action;
        this.debug = config.debug;

    } catch (ex) {
        this.error(ex);

        return false;
    }

    this.isIE11 = !!navigator.userAgent.match(/Trident\/7\./);

    if( this.isIE11 ) {
      jQuery.browser = {
        msie: true,
        trident: true,
        version: 11.0
      }
    }

    $z = zzmvc = this;

    this.start();

    return true;
};

zzmvc.fn = zzmvc.prototype = {
    /* Properties */

    /**
     * The current version of zzmvc.
     *
     * @private
     * @property
     * @name version
     * @type String
     * @cat core
     */
    version: '0.1',

    /**
     * Name of the current controller.
     *
     * @public
     * @property
     * @name name
     * @type String
     * @cat core
     */
    name: '',

    /**
     * Name of the current action.
     *
     * @public
     * @property
     * @name action
     * @type String
     * @cat core
     */
    action: '',

    /**
     * Current controller object.
     *
     * @public
     * @property
     * @name controller
     * @type Object
     * @cat core
     */
    current: {},

    /**
     * Map of all available models.
     *
     * @public
     * @property
     * @name m
     * @type Map
     * @cat core
     */
    m: {},

    /**
     * Map of all available views.
     *
     * @public
     * @property
     * @name v
     * @type Map
     * @cat core
     */
    v: {},

    /**
     * Map of all available controllers.
     *
     * @public
     * @property
     * @name c
     * @type Map
     * @cat core
     */
    c: {},

    /**
     * zzmvc configuration passed from the root elements class
     *
     * @public
     * @property
     * @name config
     * @type Object
     * @cat core
     */
    config: {},

    /**
     * Debug flag to give more information about jamal in the console.
     *
     * @private
     * @property
     * @name debug
     * @type Boolean
     * @cat core
     */
    debug: false,

    /**
     * zzmvc events
     *
     * @public
     * @property
     * @name events
     * @type Object
     * @cat core
     */
    events: {},

    /* Methods */

    /**
     * Method description
     *
     * @example zzmvc.start();
     * @result zzmvc.current == [ new Controller ]
     *
     * @public
     * @name start
     * @type zzmvc
     * @cat core
     */
    start: function() {
        this.log('Starting the zzmvc application (Version: '+this.version+')...');
        this.log('Browser:');
        this.dir(jQuery.browser);
        this.log('Controller: ' + this.name);
        this.log('Action: ' + this.action);
        if (this.debug === true && typeof window.console != 'undefined' && typeof window.console.time == 'function') {
            window.console.time('Timing');
        }

        // start the object
        var started = this.load();

        if (this.debug === true && typeof window.console != 'undefined' && typeof window.console.timeEnd == 'function') {
            window.console.timeEnd('Timing');
        }
        if (jQuery.browser.mozilla) {
            this.log('zzmvc size: '+this.toSource().length+' Chars');
        }

        // capture errors
        jQuery(window).error(function(message, file, line) {
            var e = {'name':'window.onerror',
                     'message':message,
                     'file':file,
                     'line':line,
                     'stack':''
                    };
            if(zzmvc.fn === undefined) {
                $z.error('Window error captured!', e);
            } else {
                zzmvc.fn.error('Window error captured!', e);
            }
            return true;
        });

        return started;
    },


    /**
     * Log messages on the browser console. Firebug is recommended.
     *
     * @example zzmvc.log('current controller: ' + this.controller);
     *
     * @public
     * @name log
     * @type debug
     * @param String message The message to be displayed on the console
     * @param String message (optional) More messages to be displayed on the console
     * @cat log
     */
    log: function(message) {
        if (this.debug === true && typeof window.console !== 'undefined' && typeof window.console.log == 'function') {
            var log = '';
            for (var i=0; i<arguments.length; i++) {
                log += arguments[i];
                if (i !== (arguments.length-1)) {
                    log += ', ';
                }
            }
            window.console.log(log);
        }
    },

    /**
     * Log objects to the console
     *
     * @example zzmvc.dir(obj);
     * @result [ { prop1: val1, prop2: val2 } ]
     *
     * @public
     * @name dir
     * @type debug
     * @param Object obj The object which should be logged on the console.
     * @cat log
     */
    dir: function(obj) {
        if (this.debug === true && typeof window.console !== 'undefined' && typeof window.console.dir == "function") {
            window.console.dir(obj);
        }
    },

    /**
     * Log zzmvc errors to the console
     *
     * @example zzmvc.error('Controller not found!');
     *
     * @public
     * @name error
     * @type debug
     * @param String message Error message to be displayed on the console
     * @param Object e (optional) Error object to display the original error
     * @cat log
     */
    error: function(message) {
        if (this.debug === true && typeof window.console !== 'undefined' && typeof window.console.error == 'function') {
            if (arguments.length>1) {
                e = arguments[1];
                window.console.error('zzmvc Error: '+message, e);
                if(typeof e === "object") {
                    if(typeof e.message === "object") {
                        this.log(e.name+': ');
                        this.dir(e.message);
                    } else {
                        this.log(e.name+': '+e.message);
                    }
                    this.dir(e);
                    this.log('Stack: ' + e.stack);
                } else {
                    this.log(e);
                    this.log('Stack:');
                    this.dir(this.callstack());
                }
            } else {
                window.console.error('zzmvc Error: '+message);
            }
        }
    },


    /**
     * This function returns an array of objects that contain the
     * information about call stack.
     *
     * @example callstack = zzmvc.callstack();
     *
     * @public
     * @name callstack
     * @type debug
     * @cat log
     */
    callstack: function() {
        var re_without_parenthesis = /[(][^)]*[)]/;
        var re_file_line = /(.*):(\d+)$/;

        var stack = new Error().stack.split('\n');
        stack.splice(0,2); // remove first two stack frames

        var frames = [];
        for(var i in stack) {
            // a stack frame string split into parts
            var frame = stack[i].split('@');
            if(frame && frame.length == 2) {
                frame = {
                    // Stackframe object
                    'name': frame[0],
                    'source': frame[0].replace(re_without_parenthesis, ''),
                    'file': frame[1].match(re_file_line)[1], // first group
                    'line': frame[1].match(re_file_line)[2]  // second group
                };
                this.log('at ' + frame.file + ' (' + frame.name + ': ' + frame.line + ')');
            }
        }
    },


    /**
     * Try to load the controller action
     *
     * @example zzmvc.load();
     *
     * @public
     * @name load
     * @type mvc
     * @cat core
     */
    load: function () {
        var loaded = false;
        if (typeof this.c[this.name] !== 'object') {
            zzmvc.fn = zzmvc;
            $z.c({Generic: {}});
            this.name = 'Generic';
        }

        // controller
        try {
            this.current = this.c[this.name];
        } catch(e) {
            this.error('Controller error!', e);
        }

        // callback before the action
        this.current.beforeAction();

        // components
        if(this.current.components) {
            for(var i in this.current.components) {
                try {
                    this[this.current.components[i]]();
                } catch(e) {
                    this.error(this.current.components[i]+' component error!', e);
                }
            }
        }

        // action
        if (typeof this.c[this.name][this.action] === 'function') {
            try {
                this.current[this.action]();
                loaded = true;
            } catch(e) {
                this.error('Action couldn\'t be started!', e);
            }
        } else {
            this.log('Action not found!');
        }

        // callback after the action
        this.current.afterAction();
        return loaded;
    }
};

/**
 * Extend one object with one or more others, returning the original,
 * modified, object. This is a great utility for simple inheritance.
 *
 * @example var settings = { validate: false, limit: 5, name: "foo" };
 * var options = { validate: true, name: "bar" };
 * zzmvc.extend(settings, options);
 * @result settings == { validate: true, limit: 5, name: "bar" }
 * @desc Merge settings and options, modifying settings
 *
 * @example var defaults = { validate: false, limit: 5, name: "foo" };
 * var options = { validate: true, name: "bar" };
 * var settings = zzmvc.extend({}, defaults, options);
 * @result settings == { validate: true, limit: 5, name: "bar" }
 * @desc Merge defaults and options, without modifying the defaults
 *
 * @name $z.extend
 * @param Object target The object to extend
 * @param Object prop1 The object that will be merged into the first.
 * @param Object propN (optional) More objects to merge into the first
 * @type Object
 * @cat JavaScript
 */
zzmvc.extend = zzmvc.fn.extend = function() {
    // copy reference to target object
    var target = arguments[0], a = 1;

    // extend zzmvc itself if only one argument is passed
    if (arguments.length == 1) {
        target = this;
        a = 0;
    }

    var prop;
    while ((prop = arguments[a++]) != null) {
        // Extend the base object
        for (var i in prop) {
            target[i] = prop[i];
        }
    }

    // Return the modified object
    return target;
};


////////////////////////////////////////////
/////// controller

/**
 * zzmvc controller constructor
 *
 * @name zzmvc.controller
 * @type Object
 * @param String controller Name of the constructed controller
 * @cat controller
 */
/**
 * Inherit a controller from the zzmvc app controller
 *
 * @example $z.c({Foos:{
 *     index: function(){
 *         alert('hello world');
 *     }
 * });
 * @desc Merge controller into zzmvc.c map and inherit everything from zzmvc.controller
 *
 * @name $z.m
 * @param Object controller The controller that will be merged into the controller map.
 * @type Object
 * @cat core
 * @todo merge zzmvc.c and zzmvc.controller with function overloading
 */
zzmvc.c = zzmvc.fn.c = function(controller) {
    if(typeof controller === 'object') {
        var inherited;
        for(var i in controller) {
            inherited = new zzmvc.fn.c(i);
            zzmvc.extend(inherited, controller[i]);

            // add model
            /*
            var m = i.substr(0, i.length-1).replace(/ie$/, 'y'); // name is singular
            if(zzmvc.fn.m[m]) {
                inherited.m = zzmvc.fn.m[m];
            } else {
                // if no model create one
                inherited.m = zzmvc.fn.m[m] = new zzmvc.fn.m(m);
            }
            */
            if(zzmvc.fn.m[i]) {
                inherited.m = zzmvc.fn.m[i];
            } else {
                // if no model create one
                inherited.m = zzmvc.fn.m[i] = new zzmvc.fn.m(i);
            }

            // add view
            if(zzmvc.fn.v[i]) {
                inherited.v = zzmvc.fn.v[i];
            } else {
                // if no view create one
                inherited.v = zzmvc.fn.v[i] = new zzmvc.fn.v(i);
            }

            controller[i] = inherited;
        }
        zzmvc.extend(zzmvc.fn.c, controller);
    } else {
        this.name = controller;
    }
};

zzmvc.fn.extend(zzmvc.fn.c.prototype, {
    actionUrl : {},

    /**
     * Callback which get called before an action
     *
     * Overwrite this method in your own (app)controller
     *
     * @public
     * @name beforeAction
     * @cat controller
     */
    beforeAction: function(filter){
    },

    /**
     * Callback which get called after an action
     *
     * Overwrite this method in your own (app)controller
     *
     * @public
     * @name beforeAction
     * @cat controller
     */
    afterAction: function(filter){
    },


    /**
     * Bind a form to the model method
     *
     * @example controller.form('form');
     *
     * @public
     * @name form
     * @cat controller
     * @param string element
     * @param function before
     * @param function after
     *
     * @return void
     */
    form: function(element, before, after){
        // set the clicked button to proof
        $(element + " input:submit").live('click', function(event){
            var form = $(this).parents("form");
            form.get(0).clicked = this;
        });

        $(window).bind('beforeunload', function() {
            var form = element;

            // get the form elements
            var data = form2Array(form);
            data = $z.current.m.makeupData(data);

            var isChanged = $z.current.m.compareTo(data);

            if( isChanged )
                return langArray['LTXT_UNSAVED_CHECK'];
            else
                return;
        });

        zzmvc.ajaxSend(function() {
            //$z.current.v.addMessage(msgWait);
        });

        zzmvc.ajaxSuccess(function() {
            //$z.current.v.removeMessages();
        });

        // check submited form data
        return $(element).live('submit', function(event){
            event.preventDefault();

            var form = this;

            if($.isFunction(before)) {
                if( before.call(form) == -1 ) {
                	return false;
                }
            }

            // get the form elements
            var data = form2Array(form);
            var action = $(form).prop('action');

            if( !action ) {
                action = $z.current.actionUrl;
            }

            // start the ajax submit
            $z.current.m.put(action, data, function(response){
                if(response.error_code) {
                    $z.current.v.addError(response.error_message, form);
                }
                $z.current.v.removeSpinner();
                $z.current.v.removeMessages();

                if($.isFunction(after)) {
                    after.call(form, response); // this from put callback (c)
                }
            });
            return true;
        });
    }, // form

    /**
     * (Re-)Initialize a controller
     *
     * @example zzmvc.controller.init()
     * @desc initializes the current controller action
     *
     * @example filter = $('#list');
     * zzmvc.controller.init(filter)
     * @desc initializes the current controller action but events are only
     * bind to elements in #list
     *
     * @public
     * @name init
     * @param Object filter Dom element which should be reinitialized
     * @cat controller
     */
    init: function(filter){
        zzmvc.current.beforeAction(filter);
        zzmvc.current[zzmvc.action](filter);
        zzmvc.current.afterAction(filter);
    }
});



////////////////////////////////////////////
/////////////////////////////// Model

/**
 * zzmvc model constructor
 *
 * @name zzmvc.model
 * @type Object
 * @param String model Name of the constructed model
 * @cat core
 */
/**
 * Inherit a model from the zzmvc app model.
 *
 * @example $z.m({Foo:{
 *     getBar: function(){
 *         $z.json('/test/', function(response){
 *         });
 *     }
 * });
 * @desc Merge model into zzmvc.m map and inherit everything from zzmvc.model
 *
 * @name $z.m
 * @param Object model The model that will be merged into the model map.
 * @type Object
 * @cat core
 * @todo merge zzmvc.m and zzmvc.model with function overloading
 */
zzmvc.m = zzmvc.fn.m = function(model) {
    if(typeof model === 'object') {
        var inherited;
        for (var i in model) {
            // get the zzmvc model
            inherited = new zzmvc.fn.m(i);

            // inherit the new model
            zzmvc.extend(inherited, model[i]);
            model[i] = inherited;
        }
        zzmvc.extend(zzmvc.fn.m, model);
    } else {
        this.name = model;
    }
};

zzmvc.fn.extend(zzmvc.fn.m.prototype, {
    origData : {},
    data : {},
    ajaxretry : false,

    getData: function() {
        return this.data;
    },
    compareTo: function(curArr) {
        for( name in curArr) {
            if( this.origData[name] != null && curArr[name] != this.origData[name] ) {
                if( $z.debug )
                    $z.log("compareTo[" + name + "]: curr[" + curArr[name] + "] <> orig[" + this.origData[name] + "]");
                return name;
            }
        }

        if( $z.debug )
            $z.log("compareTo [==]");

        return null;
    },
    makeupData: function(data) {
      return data;
    },
    updateData: function(data, callback) {
        this.data = data;

        $.event.trigger("EVT_MODEL_UPDATE", [ this.data] );

        if( typeof callback == 'function' ) {
            callback.call();
        }
    },
    initData: function(data) {
      this.origData = data;
      copyArray(this.data, data);
    },
    revert: function() {
        $.extend(this.data, this.origData);
    },
    /**
     * Basic ajax settings for a model
     *
     * @private
     * @name ajaxSettings
     */
    ajaxSettings: function(){
        var model = this;

        return {
            //dataType: 'json',
            processData: true,
            error: function(xhr, type, exception){
                if(model.error()) {
                    var status = xhr.status + ' ' + xhr.statusText;
                    zzmvc.error('Ajax - ' + type + ' (' + status + ')', exception);
                }
            },
            success: function(response) {
                zzmvc.ajaxSuccess(response);
                if(model.callback(response)) {
                    if(this.callback) {
                        this.callback(response);
                    }
                }
            }
        };
    },

    /**
     * Get a models url
     *
     * @private
     * @name getUrl
     * @cat model
     */
    getUrl: function() {
        return '/' + zzmvc.Inflector.pluralize(this.name) + '/' + this.id;
    },

    /**
     * Gets a model
     *
     * @example zzmvc.model.get(
     *   function(response) {
     *     zzmvc.dir(response.data);
     *   }
     * );
     *
     * @public
     * @name get
     * @param int id Id of the model
     * @param object data Data that should be required to get
     * @param Function callback A function to be executed whenever the data is loaded.
     * @cat model
     */
    get: function(action, data, callback) {
        var model = this;
        var settings = this.ajaxSettings();

        settings.type = 'POST';
        settings.url = action;

        if( data ) {
            settings.data = data;
        }

        settings.beforeSend = function(xhr) {
            $z.ajaxSend(xhr);
            return model.beforeLoad();

        };

        settings.callback = function(result) {
            if ( model.ajaxretry ) {
              model.ajaxretry = false;
            } else {
              // first try
              if( result.indexOf("WEBSVR_ERR_RET_INTERNAL") >= 0 ) {
                model.ajaxretry = true;
                model.get(action, data, callback);
              }
            }

            result = model.afterLoad(result);
            callback(result);

            $('#c_sp_div_menubar_sub').show();
            $('#c_sp_div_contents').show();

        };

        jQuery.ajax(settings);
    },

    /**
     * Saves a model
     *
     * @example zzmvc.model.put(1, {name: 'John', lastname:'Doe'},
     *   function(response) {
     *     zzmvc.dir(response.data);
     *   });
     *
     * @public
     * @name put
     * @param int id Id of the model
     * @param object data Data that should be saved
     * @param Function callback A function to be executed whenever the data is loaded.
     * @cat model
     */
    put: function(action, data, callback) {
        var model = this;
        model.ajaxdata = data;
        var settings = this.ajaxSettings();

        settings.type = 'POST';
        settings.url = action;

        /*
         * modify by chcha,
         *
         * beforeSend event callback is called after data being processed,
         * So, process data before ajax callback.
        model.processDataBeforeSave(data);
        settings.data = data;
         */
        settings.data = data;;

        settings.beforeSend = function(xhr, setting) {
            var ajaxdata;

            zzmvc.ajaxSend(xhr); // make event 'z_ajaxsend'

            ajaxdata = model.makeupData(data);

            if( !model.compareTo(ajaxdata) ) {
                return false;
            }

            ajaxdata = model.beforeSave(ajaxdata); // this=$ajax

            if( !ajaxdata ) {
                return false;
            }

            $z.current.v.addMessage(msgWait);

            if( ajaxdata )
                setting.data = jQuery.param(ajaxdata); // encode to query string manually (chcha)

            data = ajaxdata;

            return setting.data;
        };

        settings.callback = function(response) {
            if(model.afterSave(response)) {
                model.origData = data;
                callback.call($z.current, response);
            }

            $z.current.v.removeMessages();

        };

        jQuery.ajax(settings);
    },

    /**
     * removes a model
     *
     * @example zzmvc.model.json('/test/',
     *   function(response) {
     *     zzmvc.dir(response.data);
     *   });
     *
     * @public
     * @name remove
     * @param int id Id of the model
     * @param Function callback A function to be executed whenever the model is delete.
     * @cat model
     */
    remove: function(id, callback) {
        var model = this;
        model.id = id;
        var settings = this.ajaxSettings();

        settings.type = 'DELETE';
        settings.url = this.getUrl();

        settings.beforeSend = function(xhr) {
            zzmvc.ajaxSend(xhr);
            return model.beforeDelete();
        };

        settings.callback = function(result) {
            model.afterDelete(result);
        };

        jQuery.ajax(settings);
    },

    /**
     * Callback to modify the data which should be saved
     *
     * Overwrite this method in your own (app)model
     *
     * @public
     * @name processDataBeforeSave
     * @param object data
     * @cat model
     */
    processDataBeforeSave: function(data) {
        return data;
    },

    /**
     * Callback to modify the data which should be saved
     * Called by callback of Ajax
     *
     * Overwrite this method in your own (app)model
     *
     * @public
     * @name beforeSave
     * @param object data
     * @cat model
     */
    beforeSave: function(data){
        return data;
    },

    /**
     * Callback before an object is requested
     *
     * Overwrite this method in your own (app)model
     *
     * @public
     * @name beforeLoad
     * @cat model
     */
    beforeLoad: function(){
        return true;
    },

    /**
     * Callback before an object is deleted
     *
     * Overwrite this method in your own (app)model
     *
     * @public
     * @name beforeRemove
     * @cat model
     */
    beforeRemove: function(){
        return true;
    },

    /**
     * Callback after data was saved
     *
     * Overwrite this method in your own (app)model
     *
     * @public
     * @name afterSave
     * @cat model
     */
    afterSave: function(result){
        return result;
    },

    /**
     * Callback after data was retrieved
     *
     * Overwrite this method in your own (app)model
     *
     * @public
     * @name afterLoad
     * @cat model
     */
    afterLoad: function(result){
        return result;
    },

    /**
     * Callback after an model was deleted
     *
     * Overwrite this method in your own (app)model
     *
     * @public
     * @name afterRemove
     * @cat model
     */
    afterRemove: function(result){
        return result;
    },

    /**
     * A function to be called if the request fails. The function gets passed
     * three arguments: The XMLHttpRequest object, a string describing the type
     * of error that occurred and an optional exception object, if one occurred.
     *
     * @public
     * @name error
     * @cat model
     */
    error: function(xhr, type, exception){
        return true;
    },

    /**
     * A general callback for the model
     *
     * zzmvc expects a JSON response like
     * {
     *   data: {}
     * }
     *
     * @example zzmvc.model.callback(response,
     *   function(response){
     *     zzmvc.dir(response.data)
     *   });
     *
     * @public
     * @name callback
     * @param Object response JSON response from the server.
     * @cat model
     */
    callback: function(response){
        if(response.error) {
            var error = response.error;

            $z.error(error.error + ' (' + error.code + '): ' + error.description + ' in ' + error.file);
            $z.log('Stack:');
            $z.log(error.stack);
            $z.log('Context:');
            $z.log(error.context);
            $z.log('Listing:');
            $z.dir(error.listing);
            return false;
        }
        return true;
    }
});

/**
 * Bind the zzmvc ajax callbacks to the jQuery event handling
 *
 * @example zzmvc.ajaxSend(function() { alert("Hello"); });
 *
 * @name event
 * @type zzmvc
 * @param Function fn A function to bind to the jamal event
 * @cat model
 */
(function() {
    // Handle ajax event binding
    zzmvc.fn.ajaxSend = function(f){
        return typeof f === 'function' ? jQuery('body').bind('z_ajaxSend', f) : jQuery.event.trigger('z_ajaxSend', [f]);
    };
    zzmvc.fn.ajaxSuccess = function(f){
        return typeof f === 'function' ? jQuery('body').bind('z_ajaxSuccess', f) : jQuery.event.trigger('z_ajaxSuccess', [f]);
    };
})();




////////////////////////////////////////////
/////////////////////////////////// View
/**
 * zzmvc view constructor
 *
 * @name zzmvc.view
 * @type Object
 * @param String view Name of the constructed view
 * @cat view
 */
/**
 * Inherit a view from the zzmvc app view.
 *
 * @example $z.v({Foos:{
 *     removeMessage: function(){
 *         $('div.message').remove();
 *     }
 * });
 * @desc Merge view into zzmvc.v map and inherit everything from zzmvc.view
 *
 * @name $z.v
 * @param Object view The view that will be merged into the view map.
 * @type Object
 * @cat core
 * @todo merge zzmvc.v and zzmvc.view with function overloading
 */
zzmvc.v = zzmvc.fn.v = function(view) {
    if(typeof view === 'object') {
        var inherited;
        for (var i in view) {
            inherited = new zzmvc.fn.v(i);
            zzmvc.extend(inherited, view[i]);
            view[i] = inherited;
        }
        zzmvc.extend(zzmvc.fn.v, view);
    } else {
        this.name = view;
    }
};

zzmvc.fn.extend(zzmvc.fn.v.prototype, {
    /**
     * Add a spinner to an element
     *
     * @name addSpinner
     * @param Mixed obj Element / jQuery object / css selector of an dom element which should contain the spinner
     * @cat view
     */
    addSpinner: function(obj) {
        // create spinner
        var spinner;
        try {
            spinner = document.createElement('div');
            spinner.className = 'message_spinner';
        } catch( ex ) {
            zzmvc.error( 'Cannot create <' + tag + '> element:\n' +
                args.toSource() + '\n' + args );
            spinner = null;
        }
        $(obj).prepend(spinner);
    },

    /**
     * Remove all spinner
     *
     * @name removeSpinner
     * @cat view
     */
    removeSpinner: function() {
        /*$('div.spinner').remove();*/
      $('div.message_spinner').remove();
    },

    /**
     * Add a (success) message at the top of the current page
     *
     * @name addMessage
     * @param String message The message that should be displayed
     * @cat view
     */
    addMessage: function(message){
        $('#content').prepend(message);
        $('div#printMsg').prepend(message);
    },

    /**
     * Remove all messages and errors
     *
     * @name removeMessages
     * @cat view
     */
    removeMessages: function() {
        $('div.error').remove();
        $('div.message').remove();
        $('div#printMsg').empty();
    },

    /**
     * Add an error message
     *
     * @name addError
     * @param String message The error message that should be displayed
     * @param Mixed obj Element / jQuery object / css selector of an dom element which should contain the error message
     */
    addError: function(message, obj) {
        $('div.error', obj).remove();
        $(obj).prepend(message);
        $('div.error', obj).show();
    },

    /**
     * Start a form submit
     */
    submitInProgress: function() {
        this.addSpinner(this);
        $('div.submit', this).hide();
    },

    /**
     * Form submit done
     */
    submitDone: function() {
        this.removeSpinner();
        $('div.submit', this).show();
    },

    /**
     * Decode HTML entities
     *
     * @example zzmvc.view.decode_html()
     *
     * @public
     * @name decode_html
     * @type zzmvc
     * @cat view
     */
    decode_html: function(str) {
        if (typeof str === 'string') {
            var div = document.createElement('div');
            div.innerHTML = str.replace(/<\/?[^>]+>/gi, '');
            return div.childNodes[0] ? div.childNodes[0].nodeValue : '';
        } else {
            return '';
        }
    }
});

// Map the jamal namespace to '$z'
var $z = zzmvc;

/**
 * Window onload replacement of jquery
 *
$(function(){
    $z = zzmvc = zzmvc();
    $z.start();
});
*/

if ($ != undefined) {
  $.download = function (url, data, method) {
    if (url) {
      var inputs = '';
      if (data) {
        data = typeof data == 'string' ? data : $.param(data);
        $.each(data.split('&'), function() {
          var pair = this.split('=');
          inputs += '<input type="hidden" name="' + pair[0] + '"value"' +pair[1] + '"/>';
        });
      }

      $('<iframe action="' + url + '" method="' + (method||'post') + '" style="">' + inputs + '</form>')
        .appendTo('body').submit().remove();
    }
  }
}
