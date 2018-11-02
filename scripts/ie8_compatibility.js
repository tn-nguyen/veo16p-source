
//for IE8
//IE8�는 ArrayindexOf 메소�� �기 �문 직접 구현�줘�다.
if(!Array.indexOf){
  Array.prototype.indexOf = function(obj){
  for(var i=0; i<this.length; i++){
      if(this[i]==obj){
      return i;
      }
  }
  return -1;
  }
}

//IE8�는 Arrayfilter 메소�� �기 �문 직접 구현�줘�다.
if (!Array.prototype.filter)
{
  Array.prototype.filter = function(fun /*, thisp */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t)
      {
        var val = t[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, t))
          res.push(val);
      }
    }

    return res;
  };
}
