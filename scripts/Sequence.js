var Sequence = function () {
  this._sequenceData = {};
  this.usable = false;
  this.state = 'stop';
  this.timer;
  this.currSequence;
}

Sequence.prototype = {
    setSequenceData : function(_array) {
      seq = this._sequenceData;
      seq['mcnt'] = _array['sq_mcnt'];
      seq['dwell'] = _array['sq_dwell'];
      
      for (var i = 0 ; i < seq['mcnt'] ; i += 1) {
        if (_array['sq_valid_mode' + i] == 2) { // 2 is SEQ_MODE_VALID
          seq['tcnt'] = _array['sq_tcnt' + i];
          seq['type'] = _array['sq_type' + i];
          seq['ch'] = _array['sq_ch' + i];
          this.usable = true;
          break;
        }
      }
    },
    start : function() {
      var s = this;
      if (this._sequenceData == undefined || this._sequenceData == null) {
        usable = false;
        return false;
      }
      if (this.state != 'stop') {
        return false;
      }
      
      // code
      console.log('sequence start');
      
      this.currSequence = 0;
      this.sequence();
      var func = function() {s.sequence()};
      this.timer = setInterval(func, parseInt(this._sequenceData['dwell'], 10) * 1000 );
      this.state = 'start';
    },
    stop : function() {
      if (this.state != 'start') {
        return false;
      }
      
      console.log('sequence stop');
      if (this.timer != undefined) {
        clearInterval(this.timer);
        this.currSequence = 0;
        this.state = 'stop';
      }
    },
    sequence : function() {
      if (this._sequenceData['tcnt'] <= this.currSequence) {
        this.currSequence = 0;
      }
      
      console.log('sequencing ' + this.currSequence + ' of ' + this._sequenceData['tcnt']
          + ' type[' + this._sequenceData['type'][this.currSequence] + ']'
          + ' ch[' + this._sequenceData['ch'][this.currSequence] + ']');
      
      this.currSequence += 1;
    }
}