/**
 * validator: input validation
 *
 **/
var Validator = {
  ERR_VALID_OK: 0,
  ERR_VALID_EMPTY: -1,
  ERR_VALID_LEN_OVER: -2,
  ERR_VALID_LEN_SHORT: -3,
  ERR_VALID_SPECIAL: -4,
  ERR_VALID_EMAIL: -5,
  ERR_VALID_DDNS: -6,
  ERR_VALID_NUMBER: -7,
  ERR_VALID_URL: -8,
  ERR_VALID_FWURL: -9,
  ERR_VALID_OUTOFRANGE: -10,
  ERR_VALID_PHONE: -11,
  ERR_VALID_FTP_DIR: -12,
  ERR_VALID_FTP_FILENAME: -13,
  err : 0,

  // for S1 password validation
  ERR_VALID_LENGTH_SHORT:     1<<0,
  ERR_VALID_LENGTH_LONG:      1<<1,
  ERR_VALID_COMBINATION:      1<<2,
  ERR_VALID_EQUAL_TO_ID:      1<<3,
  ERR_VALID_SEQUENTIAL_NUMBER:1<<4,
  ERR_VALID_REPETITIVE_CHAR:  1<<5,
  EER_VALID_INVALID_CHAR:     1<<6,
  // for VIDECON password validation
  EER_VALID_ID_LENGTH_SHORT:  1<<7,

  errStr: function(errCode) {
    if( typeof errCode == "undefined" ) {
      errCode = Validator.err;
    }

    switch( errCode ) {
      case Validator.ERR_VALID_EMPTY:
        //return langArray['LTXT_ERR_FIELDEMPTY'];
      case Validator.ERR_VALID_LEN_SHORT:
        return langArray['LTXT_ERR_FIELDLENSHORT'];
      case Validator.ERR_VALID_LEN_OVER:
        return langArray['LTXT_ERR_FIELDLENOVER'];
      case Validator.ERR_VALID_SPECIAL:
        return langArray['LTXT_ERR_SPECIALCHAR'];
      case Validator.ERR_VALID_EMAIL:
        return langArray['LTXT_ERR_EMAIL'];
      case Validator.ERR_VALID_DDNS:
        return langArray['LTXT_ERR_DDNSSAVE'];
      case Validator.ERR_VALID_NUMBER:
        //return langArray['LTXT_ERR_NUMBER'];
      case Validator.ERR_VALID_URL:
        //return langArray['LTXT_ERR_NUMBER'];
      default:
        return "VALIDATE ERROR";
    }
  },

  passwdApplication : function(passwd, min, max) {
    var me = Validator;    

    if( min < 0 || max <= 0 ) {
      alert("ERROR VALIDATOR");
      return -1;
    }

    if( min == 0 && passwd.length == 0 )
      return me.err=Validator.ERR_VALID_OK;

    if( min > 0 && passwd.length == 0 ) {
      return me.err=Validator.ERR_VALID_EMPTY;
    }

    if( passwd.length < min ) {
      return me.err=Validator.ERR_VALID_LEN_SHORT;
    }

    if( passwd.length > max ) {
      return me.err=Validator.ERR_VALID_LEN_OVER;
    }

    // if passwd is beetween min/max
    if( typeof Validator["usrPasswd"] == 'function' ) {
      return me.err=Validator["usrPasswd"](passwd);
    }

    return me.err=Validator.ERR_VALID_OK;
  },

  test : function(type, elem, min, max) {
    var me = Validator,
        str,
        ret = null;

    try {
      str = $(elem).val();
    } catch (e){
      return me.err=Validator.ERR_VALID_SPECIAL;
    }

    if (str == undefined) {
      str = elem;
    }

    if( type == "number" ) {
      if( typeof Validator[type] == 'function' ) {
        return me.err=Validator[type](str);
      }
    }

    if( type == "port" ) {
      if( typeof Validator[type] == 'function' ) {
        return me.err=Validator[type](str);
      }
    }

    if( min < 0 || max <= 0 ) {
      alert("ERROR VALIDATOR");
      return -1;
    }

    if( min == 0 && str.length == 0 )
      return me.err=Validator.ERR_VALID_OK;

    if( min > 0 && str.length == 0 ) {
      return me.err=Validator.ERR_VALID_EMPTY;
    }

    if( str.length < min ) {
      return me.err=Validator.ERR_VALID_LEN_SHORT;
    }

    if( str.length > max ) {
      return me.err=Validator.ERR_VALID_LEN_OVER;
    }

    // if str is beetween min/max
    if( typeof Validator[type] == 'function' ) {
      return me.err=Validator[type](str);
    }

    return me.err=Validator.ERR_VALID_OK;
  },
  testObject: function (type, elem, min, max) {
    var me = Validator;
    var str = $(elem).val();

    if( type == "number" ) {
      if( typeof Validator[type] == 'function' ) {
        return me.err=Validator[type](str);
      }
    }

    if( min < 0 || max <= 0 ) {
      alert("ERROR VALIDATOR");
      return -1;
    }

    if( min == 0 && str.length == 0 )
      return me.err=Validator.ERR_VALID_OK;

    if( min > 0 && str.length == 0 ) {
      return me.err=Validator.ERR_VALID_EMPTY;
    }

    if( str.length < min ) {
      return me.err=Validator.ERR_VALID_LEN_SHORT;
    }

    if( str.length > max ) {
      return me.err=Validator.ERR_VALID_LEN_OVER;
    }

    // if str is beetween min/max
    if( typeof Validator[type] == 'function' ) {
      return me.err=Validator[type](str);
    }

    return me.err=Validator.ERR_VALID_OK;
  },
  url: function(str) {
    var filter = /^(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if( !filter.test(str) ) {
      return this.ERR_VALID_URL;
    } else {
      return this.ERR_VALID_OK;
    }
  },
  fwurl: function(str) {
    var filter = /^((http\:\/\/|https\:\/\/|ftp\:\/\/)|(www.))+(([a-zA-Z0-9\.-]+\.[a-zA-Z]{2,4})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(\/[a-zA-Z0-9%:\/-_\?\.'~]*)?\.nbn$/;
    if ( !filter.test(str) ) {
      return this.ERR_VALID_FWURL;
    } else {
      return this.ERR_VALID_OK;
    }
  },
  email: function(str) {
    var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if( !filter.test(str) ) {
      return this.ERR_VALID_EMAIL;
    } else {
      return this.ERR_VALID_OK;
    }
  },
  ftp_dir: function(str) {
    var filter = /^([a-zA-Z0-9@\#\$\%\&\(\)\-\_]+)$/;
    if(!filter.test(str))
    {
      return this.ERR_VALID_FTP_DIR;
    }
    else
    {
      return this.ERR_VALID_OK;
    }
  },
  ftp_filename: function(str) {
    var filter = /^([a-zA-Z0-9@\#\(\)\-\_]+)$/;
    if(!filter.test(str))
    {
      return this.ERR_VALID_FTP_FILENAME;
    }
    else
    {
      return this.ERR_VALID_OK;
    }
  },
  phone: function(str) {
    if(INFO_VENDOR == "S1" && INFO_MODEL.indexOf("IPX")){
      var filter = /^([0-9])+$/;
      if( !filter.test(str) ) {
        return this.ERR_VALID_PHONE;
      } else {
        return this.ERR_VALID_OK;
      }
    } else {
      return this.ERR_VALID_OK;
    }

  },
  ip: function(str) {
    var filter = /^(([2]([0-4][0-9]|[5][0-5])|[0-1]?[0-9]?[0-9])[.]){3}(([2]([0-4][0-9]|[5][0-5])|[0-1]?[0-9]?[0-9]))$/;
    if( !filter.test(str) ) {
      return this.ERR_VALID_OUTOFRANGE;
    } else {
      return this.ERR_VALID_OK;
    }
  },
  ipv6: function(str) {
      // var filter = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,})$/;

    var filter = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
      
    if( !filter.test(str) ) {
      return this.ERR_VALID_OUTOFRANGE;
    } else {
      return this.ERR_VALID_OK;
    }
  },
  port: function(str) {
    var tmp = parseInt(str,10);
    if (tmp < 0 || 65535 < tmp) {
      return this.ERR_VALID_OUTOFRANGE;
    } else {
      return this.ERR_VALID_OK;
    }
  },
  camTitle: function(str) {
    var filter = /^[A-z0-9_\.\-]+/;

    if( !filter.test(str) ) {
      return this.ERR_VALID_SPECIAL;
    } else {
      return this.ERR_VALID_OK;
    }
  },
  number: function(str) {
    var filter = /^[0-9]+$/;

    if( !filter.test(str) ) {
      return this.ERR_VALID_NUMBER;
    } else {
      return this.ERR_VALID_OK;
    }
  },
  usrName: function(str) {
    var filter = /^[A-Za-z0-9]+$/;

    if( !filter.test(str) ) {
      return this.ERR_VALID_SPECIAL;
    } else {
      return this.ERR_VALID_OK;
    }
  },
  usrPasswd: function(str) {
    var filter = /^[A-Za-z0-9\~\-\=\{\}\\\.\"\<\>\?\!\@\#\$\%\^\&\*\(\)\_\+\|\:\ ]+$/;

    if( !filter.test(str)) {
      return this.ERR_VALID_SPECIAL;
    } else {
      return this.ERR_VALID_OK;
    }
  },
  ddnsAddr: function(str) {
    return true;
  },
  enhancedPasswd: function(passelem, userIdelem) {
    var pass = $(passelem).val();
    if (typeof pass == 'undefined') {
      pass = passelem;
    }
    var userId = $(userIdelem).val();

    try {
      var password = $(pass).val();
      if (typeof password == 'undefined') {
        password = passelem;
      }
    } catch (e) {
      password = passelem;
    }

    var errorCode = 0,
        combinationCheck = 0,
        passLength  = pass.length,
        filter = /^[^\[\]\;\'\`\,\/\t\r\n]+$/,
        filterUpperCase = /[A-Z]+/,
        filterLowerCase = /[a-z]+/,
        filterNumeric = /[0-9]+/,
        filterSpecial = /[^0-9A-Za-z\[\]\;\'\,\/\t\r\n]+/;
    if (passLength < 8) {
      errorCode |= this.ERR_VALID_LENGTH_SHORT;
    }

    if (16 < passLength) {
      errorCode |= this.ERR_VALID_LENGTH_LONG;
    }

    if (pass.indexOf(userId) >= 0 && userId.length != 0) {
      errorCode |= this.ERR_VALID_EQUAL_TO_ID;
    }

    if (!filter.test(pass)) {
      errorCode |= this.EER_VALID_INVALID_CHAR;
    }

    if (filterUpperCase.test(pass)) {
      combinationCheck += 1;
    }
    if (filterLowerCase.test(pass)) {
      combinationCheck += 1;
    }
    if (filterNumeric.test(pass)) {
      combinationCheck += 1;
    }
    if (filterSpecial.test(pass)) {
      combinationCheck += 1;
    }
    
    // if(INFO_VENDOR.indexOf("VIDECON") >= 0) {
    //   if (combinationCheck < 4) {
    //     errorCode |= this.ERR_VALID_COMBINATION;
    //   }
    // } else {
    //   if (combinationCheck < 3) {
    //     errorCode |= this.ERR_VALID_COMBINATION;
    //   }
    // }
    if (combinationCheck < 4) {
      errorCode |= this.ERR_VALID_COMBINATION;
    }

    if (this.sequenceNum(pass, 3)) {
      errorCode |= this.ERR_VALID_SEQUENTIAL_NUMBER;
    }

    if (this.sequenceAlphabet(pass, 3)) {
      errorCode |= this.ERR_VALID_SEQUENTIAL_NUMBER;
    }
    if (this.repetitiveChar(pass, 3)) {
      errorCode |= this.ERR_VALID_REPETITIVE_CHAR;
    }

    return errorCode;
  },
  enhancedUserid: function(passelem, userIdelem) {
    var pass = $(passelem).val();
    var userId = $(userIdelem).val();
    var errorCode = 0;
    if (typeof pass == 'undefined') {
      pass = passelem;
    };

    if(userId.length < 5) {
      errorCode |= this.EER_VALID_ID_LENGTH_SHORT;
    };

    return errorCode;
  },
  sequenceNum: function(str, seqCnt) {
    var strLen = str.length,
        filterNumeric = /[0-9]+/,
        currentNumber;
    if (seqCnt == undefined || seqCnt == null) {
      return false;
    }

    if (!filterNumeric.test(str)) {
      return false;
    }

    if (strLen < seqCnt) {
      return false;
    }
    if (seqCnt < 2) {
      return false;
    }

    roopCount = strLen - seqCnt;
    for (var i = 0 ; i <= roopCount ; i += 1) {
      currentNumber = parseInt(str.charAt(i));
      if (!isNaN(currentNumber)) {
        for (var j = 1 ; j < seqCnt ; j += 1) {
          if ( (( parseInt(str.charAt(i)) + j) % 10) != ( parseInt(str.charAt(i+j)) % 10) ) {
            break;
          } else if (j == seqCnt - 1) {
            return true;
          }
        }
      }
    }

    for (var i = strLen - 1 ; i >= seqCnt - 1 ; i -= 1) {
      currentNumber = parseInt(str.charAt(i));
      if (!isNaN(currentNumber)) {
        for (var j = 1 ; j < seqCnt ; j += 1) {
          if ( (( parseInt(str.charAt(i)) + j) % 10) != ( parseInt(str.charAt(i-j)) % 10) ) {
            break;
          } else if (j == seqCnt - 1) {
            return true;
          }
        }
      }
    }
    return false;
  },
  sequenceAlphabet: function(str, seqCnt) {
    var strLen = str.length,
        filterAlphabet = /[A-Za-z]+/,
        currentNumber;
    if (seqCnt == undefined || seqCnt == null) {
      return false;
    }

    if (!filterAlphabet.test(str)) {
      return false;
    }

    if (strLen < seqCnt) {
      return false;
    }
    if (seqCnt < 2) {
      return false;
    }

    roopCount = strLen - seqCnt;
    for (var i = 0 ; i <= roopCount ; i += 1) {
      if (!filterAlphabet.test(str.charAt(i)))
        continue;

      currentNumber = parseInt(str.charCodeAt(i));
      if (!isNaN(currentNumber)) {
        for (var j = 1 ; j < seqCnt ; j += 1) {

          if (!filterAlphabet.test(str.charAt(i+j))) {
            break;
          } else if ( ( parseInt(str.charCodeAt(i)) + j ) != ( parseInt(str.charCodeAt(i + j))) ) {
            break;
          } else if (j == seqCnt - 1) {
            return true;
          }
        }
      }
    }

    for (var i = strLen - 1 ; i >= seqCnt - 1 ; i -= 1) {
      if (!filterAlphabet.test(str.charAt(i)))
        continue;

      currentNumber = parseInt(str.charCodeAt(i));
      if (!isNaN(currentNumber)) {
        for (var j = 1 ; j < seqCnt ; j += 1) {
          if (!filterAlphabet.test(str.charAt(i))) {
            break;
          } else if ( ( parseInt(str.charCodeAt(i)) + j) != ( parseInt(str.charCodeAt(i-j))) ) {
            break;
          } else if (j == seqCnt - 1) {
            return true;
          }
        }
      }
    }
    return false;
  },
  repetitiveChar: function(str, repCnt) {
    var strLen = str.length,
        roopCount;

    if (repCnt == undefined || repCnt == null) {
      return false;
    }
    if (strLen < repCnt) {
      return false;
    }
    if (repCnt < 2) {
      return false;
    }

    roopCount = strLen - repCnt;
    for (var i = 0 ; i <= roopCount ; i += 1) {
      for (var j = 1 ; j < repCnt ; j += 1) {
        if (str.charAt(i) != str.charAt(i+j)) {
          break;
        } else if (j == repCnt - 1) {
          return true;
        }
      }
    }

    return false;
  },
  alarmSensor: function(str) {
    var filter = /[`~!\$%\^&\*\+=\|{}\[\]"':;<>,\?/ \\]/;

    if( !filter.test(str) ) {
      return this.ERR_VALID_SPECIAL;
    } else {
      return this.ERR_VALID_OK;
    }
  },
  alarmOut: function(str) {
    var filter = /[`~!\$%\^&\*\+=\|{}\[\]"':;<>,\?/ \\]/;

    if( !filter.test(str) ) {
      return this.ERR_VALID_SPECIAL;
    } else {
      return this.ERR_VALID_OK;
    }
  },
  title: function(str) {
    var filter = /[`~!\$%\^&\*\+=\|{}\[\]"':;<>,\?\\]/;
    if ( filter.test(str) ) {
      return this.ERR_VALID_SPECIAL;
    } else {
      return this.ERR_VALID_OK;
    }
  },
  sysdbfile: function(str) {
    var filter = /.+\.ndb/;
    if (filter.test(str)) {
      return this.ERR_VALID_OK;
    } else {
      return this.ERR_VALID_SPECIAL;
    }
  }
};

