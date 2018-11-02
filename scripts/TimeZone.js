function isNull(obj) {
  if( typeof obj == 'undefined' ) {
    return true;
  }

  if( obj == null ) {
    return true;
  }

  return false;
}

var TimeZone = function(arr) {
  if( isNull(arr) ) {
    return null;
  }

  this.tz_idx = arr['tz_idx'];
  this.tz_name = arr['tz_name'];
  this.count = arr['count'];
  this.offset = 0;
  this.data = {};
  this.isDstZone = false;

  this.parse(arr);
};

TimeZone.prototype = {
  _getOffsetmSec: function(str) {
    var len = str.length;
    var tmp = str.substr(len-8);
    var minus = str.substr(len-11,3) != "+";

    if( !isNull(tmp) ) {
      var t = tmp.split(":");
      var sec = parseInt(t[0],10) * 3600 + parseInt(t[1],10) * 60 + parseInt(t[2],10);

      if( minus ) {
        sec = sec * -1;
      }
      return sec * 1000;
    }

    return 0;
  },
  _getJDatemSec: function(stryear, str) {
    // J169/03:00:00
    var tmps = str.split("/");
    var days = parseInt(tmps[0].substr(1),10);

    if(days > 1000)
      days -= 1000;
    else
      days -= 100;
    var t = tmps[1].split(":");
    var sec = parseInt(t[0],10) * 3600 + parseInt(t[1],10) * 60 + parseInt(t[2],10);

    var year = parseInt(stryear, 10);
    var ms = Date.UTC(year, 0, 1) + 
            ( days * 24 * 60 * 60 + sec ) * 1000;
            
    return ms;
  },
  parse: function(arr) {
    var me = this;

    for( var i=0; i < this.count ; i++ ) {
      var strData = arr['data'+i];
      
      if( isNull(strData) ) {
        return;
      }

      // data변수 값 형식 
      // 2008,GMT-12:00:00
      // 2008,NZST-12:00:00,NZDT-13:00:00,J1272/03:00:00,J197/02:00:00
      // 2008,CST+06:00:00,CDT+05:00:00,J169/03:00:00,J1307/01:00:00&
      // 연도,이름 + GMT Offset,DST이름 + GMT Offset,J진입일시,J탈출일시
      var val = strData.split(",");
      var data = this.data[val[0]] = {
        year: parseInt(val[0]),
        name: val[1],
        dstName: '',
        dstOffset: 0,
        dstEntry: 0,
        dstEject: 0
      };

      this.offset = me._getOffsetmSec(val[1]);

      if( val.length > 2 ) {
        // dst
        me.isDstZone = true;
        data.dstName = val[2];
        data.dstOffset = me._getOffsetmSec(val[2]);
        data.dstEntry = me._getJDatemSec(val[0], val[3]) - data.dstOffset;
        data.dstEject = me._getJDatemSec(val[0], val[4]);
      }
    }
  },
  isDstSaving: function(unixtime) {
    var u = unixtime + this.offset;
    var d = new Date(u);
    var y = d.getFullYear();

    if( unixtime >= this.data[y].dstEntry ||
        unixtime < this.data[y].dstEject ) {
      return true;
    } else {
      return false;
    }
  },
  getDate: function(unixtime) {
    var u = unixtime + this.offset;
    var d = new Date(u);
    var y = d.getFullYear();

    if( this.isDstSaving(unixtime) ) {
      u = unixtime + this.data[y].dstOffset;
    }

    d = new Date(u);

    return {
      y: d.getFullYear(),
      M: d.getMonth(),
      d: d.getDate(),
      h: d.getHour(),
      m: d.getMinute(),
      s: d.getSeconds()
    };
  },
  getDstOffset: function(u) {
    var d = new Date(u);
    var y = d.getFullYear();

    return this.data[y].dstOffset;
  },
  getOffset: function() {
    return this.offset;
  }
};

var TimeZoneTest = function() {
  var obj = { 
    tz_idx: 0,
    tz_name: "CST",
    count: "2",
    data0: "2008,CST+06:00:00,CDT+05:00:00,J169/03:00:00,J1307/01:00:00",
    data1: "2009,CST+06:00:00,CDT+05:00:00,J169/03:00:00,J1307/01:00:00"
  };  

  var timezone1 = new TimeZone(obj);

  var obj = { 
    tz_idx: 0,
    tz_name: "SST",
    count: "1",
    data0: "2008,CST+11:00:00"
  };  

  var timezone2 = new TimeZone(obj);

  var obj = {
    tz_idx: 0,
    tz_name: "NST",
    count: "1",
    data0: "2008,NZST-12:00:00,NZDT-13:00:00,J1272/03:00:00,J197/02:00:00"
  };

  var timezone3 = new TimeZone(obj);

  return true;
};

var MyDate = function(tz, opts, val) {
  this.opts = {
    useDST: true
  };

  this.utc = 0;

  $.extend(this.opts, opts);

  if( isNull(tz) ) {
    var arr = [];

    // ajax call
    $.ajax({
      url: "/cgi-bin/webra_fcgi.fcgi",
      type: 'POST',
      data: "action=get_setup&menu=system.datetime_tzinfo",
      async: false,
      dataType: 'text'
    }).done(function(data) {
      arr = encode_to_array(data);
    });

    this.timezone = new TimeZone(arr);
  } else {
    this.timezone = tz;
  } 

};

MyDate.prototype = {
  _getOffset: function() {
    var bDST = this.timezone.isDstSaving(this.utc);

    if( !this.opts.useDST ) {
      bDST = false;
    }

    if( bDST ) {
      return this.timezone.getDstOffset(this.utc);
    } else {
      return this.timezone.getOffset();
    }
  },
  _getDate: function() {
    return new Date(this.utc - this._getOffset());
  },
  getYear: function() {
    return this._getDate().getUTCFullYear();
  },
  getMonth: function() {
    return this._getDate().getUTCMonth();
  },
  getDate: function() {
    return this._getDate().getUTCDate();
  },
  getHours: function() {
    return this._getDate().getUTCHours();
  },
  getMinutes: function() {
    return this._getDate().getUTCMinutes();
  },
  getSeconds: function() {
    return this._getDate().getUTCSeconds();
  },
  toUTCString: function() {
    var str = this.getYear() + "/" + (this.getMonth()+1) + "/" + this.getDate() + " " +
        this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
    return str;
  },
  toString: function() {
    var str = this.getYear() + "/" + (this.getMonth()+1) + "/" + this.getDate() + " " +
        this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
    return str;
  },
  getTime: function() {
  },
  getTimezoneOffset: function() {
  },
  getUTC: function() {
    return this.utc;
  },
  setDate: function(dat) {
    if( isNull(dat) || isNull(dat.year) || isNull(dat.month) || isNull(dat.day) ) {
      // use system time (DONE)
      var _date = new Date();
      this.utc = _date.getTime();
    } else {
      // use year, month, day
      // _date is using browser timezone
      this.utc = Date.UTC(dat.year, dat.month, dat.day
                          ,dat.hour, dat.min, dat.sec);

      this.utc += this._getOffset();
    }
  },
  setMs: function(ms) {
    this.utc = ms;
  }
};

var MyDateTest = function() {
  /*
  var obj = { 
    tz_idx: 0,
    tz_name: "CST",
    count: "5",
    data0: "2008,CST+06:00:00,CDT+05:00:00,J169/03:00:00,J1307/01:00:00",
    data1: "2009,CST+06:00:00,CDT+05:00:00,J170/03:00:00,J1307/01:00:00",
    data2: "2010,CST+06:00:00,CDT+05:00:00,J171/03:00:00,J1307/01:00:00",
    data3: "2011,CST+06:00:00,CDT+05:00:00,J172/03:00:00,J1307/01:00:00",
    data4: "2012,CST+06:00:00,CDT+05:00:00,J173/03:00:00,J1307/01:00:00"
  };  
  */

  var arr = [];

  // ajax call
  $.ajax({
    url: "/cgi-bin/webra_fcgi.fcgi",
    type: 'POST',
    data: "action=get_setup&menu=system.datetime_tzinfo",
    async: false,
    dataType: 'text'
  }).done(function(data) {
    arr = encode_to_array(data);
  });

  var timezone = new TimeZone(arr);
  var mydate = {};

  mydate = new MyDate(timezone, {
    useDST: ($('#dst').val() == '1') 
  });

  console.log("-----------------------");
  mydate.setDate({
    year: 2012,
    month: 7,
    day: 23,
    hour: 10,
    min: 10,
    sec: 10
  });
  console.log(mydate.toString());
  console.log(mydate.getUTC());
  console.log(new Date(mydate.getUTC()));

  console.log("-----------------------");
  mydate.setMs(1338796391256); // GMT 2012-06-04 07:53 (16:53 KST)
  console.log(mydate.toString());

  console.log("-----------------------");
  mydate.setDate();
  console.log(mydate.toString());
  console.log(mydate.getUTC());
  console.log(new Date(mydate.getUTC()));
  console.log("-----------------------");

};

