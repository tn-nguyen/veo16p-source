/* 
 * video.js
 * -------------
 */

define(['modules/activex',
        'modules/jpeg'],
       function(Activex, Jpeg) {
  // Template load
  'use strict';

  var video = function() {
    if( this == window ) {
      return new video();
    }

    if( this.init ) {
      return this;
    }

    this.activex = new Activex();
    this.jpeg = new Jpeg();

    this.initialize();

    this.init = true;

    //jpeg = this;
  };

  video.prototype = {
    init: false,
    timerid: null,

    // methods
    initialize: function() {

    }
  };

  return video;
});
