/* 
 * v.recordsetup.js
 * -------------
 * 
 */

define([], function() {

  'use strict';
  
  var view = WebView.View.extend({

    _afterModelLoad: function(model) {
      this.changePage(this.data.changePage.global, this.data.changePage.local);
    },

    changePage: function(global, local) {

      var target = global + local;

      WebView.log('');
      WebView.log('recsetupRoute global: ' + global);
      WebView.log('recsetupRoute local: ' + local);

      if (local == '') {
        WebView.log('recSetup page route default page');
        //r.router.navigate(this.data.content.initializePage, {trigger: true, replace: true});
        r.router.navigate(this.data.content.defaultPage, {trigger: true, replace: true});
        return false;
      }

      if (!_.has(this.page, target) {
        // load page
        WebView.log('New recSetup Page loading... -> ' + target);
        this.page[target] = 'loading';
        this.loadTemplate({
          el: 'recordsetuppage',
          id: target
        });
      } else {
        // loaded page render
        var view = this.page[target];

        if (view == 'loading') {
          var my = this;
          setTimeout( function() {my.changePage(global, local)}, 100);
          return false;
        } else {
          view.renderTemplate();
          return true;
        }
      }
    }
  });
  
  return view;
});

