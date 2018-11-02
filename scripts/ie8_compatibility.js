
//for IE8
//IE8ëŠ” ArrayindexOf ë©”ì†Œœê †ê¸° Œë¬¸ ì§ì ‘ êµ¬í˜„´ì¤˜œë‹¤.
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

//IE8ëŠ” Arrayfilter ë©”ì†Œœê †ê¸° Œë¬¸ ì§ì ‘ êµ¬í˜„´ì¤˜œë‹¤.
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
