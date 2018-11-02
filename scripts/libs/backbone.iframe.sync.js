/* 
 * backbone.iframe.sync.js
 * -------------
 * 
 */

define(['jquery',
        'backbone'],
        function(jQuery, Backbone) {

  'use strict';

  (function () {
    Backbone.syncWithoutUpload = Backbone.sync
    Backbone.syncWithUpload = function(method, model, options) {
      // Create iframe
      var iframe_id = 'file_upload_iframe_' + Date.now()
        , iframe = jQuery('<iframe id="' + iframe_id + '" name="' + iframe_id + '" ></iframe>').hide()
   
      // Create an hidden form
      var authToken = jQuery('meta[name=csrf-token]').attr('content')
        , authParam = jQuery('meta[name=csrf-param]').attr('content')
        , push_session_id = Teambox.controllers.application.push_session_id
   
      var toForm = function(object, nested) {
        inputs = _.map(object, 
          function(attr, key) {
            if (nested) {
              var key = nested + '[' + key +']'
            }
   
            if ( _.isElement(attr) ) {
              return attr;
            } 
   
            var isNotEmpty = !_.isEmpty( attr )
              , isArray = _.isArray( attr )
              , isObject = ( typeof attr == 'object' )
   
            if ( isNotEmpty && (isArray || isObject) ) {
              return toForm( attr, key );
            }
    
            return jQuery('<input type="hidden" name"'+ key +'" value="'+ attr +'" />')[0];
          });
   
        return _.flatten(inputs);
      }
   
      var changeFormat = function(action) {
        if (action.endsWith('.text')) {
          return action.gsub(/\.text$/, '');
        }
        else {
          return action.gsub(/(\/?)$/, function (m) {
            return '.text';
          });
        }
      }
   
      var form = jQuery( '<form id="new_upload" enctype="multipart/form-data" target="'+ iframe_id +'" action="'+ changeFormat(model.url()) +'" method="POST">' +
                         '<input type="hidden" name="'+ authParam +'" value="'+ authToken +'" />' +
                         '<input type="hidden" name="_x-pushsession-id" class="x-pushsession-id" value="'+ push_session_id +'" />' +
                         '<input type="hidden" name="iframe" value="1" />' +
                         '</form>' ).hide();
   
      // Add attribute as input field
      _.each( toForm(model), function(el) {
        form.prepend(el)
      });
   
      jQuery(document.body).prepend(iframe);
      jQuery(document.body).prepend(form);
   
      function callback() {
        // contentDocument doesn't work in IE (7)
        var iframe_body = (iframe[0].contentDocument || iframe[0].contentWindow.document).body
          , response = JSON.parse(iframe_body.innerHTML);
   
        // TODO: Migrate to api v2. Make this check redundant
        response = response.objects ? response.objects : response;
   
        if (iframe_body.className !== "error") {
          var success = options.success
          if (success) options.success(response)
        } else {
          var error = options.error
          if (error) options.error(response)
        }
   
        iframe.remove();
        form.remove();
      }
   
      // Setup the iframe callback
      // for IE (7)
      iframe[0].onreadystatechange = function() {
        if (this.readyState === 'complete') {
          callback()
        }
      };
   
      // non-IE
      iframe[0].onload = callback;
   
      form[0].submit();
    }
   
    Backbone.sync = function(method, model, options) {
      if ( options && options.iframe ){
        Backbone.syncWithUpload(method, model, options)
      } else {
        Backbone.syncWithoutUpload(method, model, options)
      }
    };
   
}());

});











