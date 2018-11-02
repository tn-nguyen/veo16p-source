/** 
 * @author chcha
 */

var resol = {
    'B' : '352x240',
    'C' : '704x240',
    'D' : '704x480',
    'E' : '704x480p',
    'F' : '352x288',
    'G' : '704x288',
    'H' : '704x576',
    'I' : '704x576p',
    'J' : '640x480',
    'K' : '720x480',
    'L' : '720x576',
    'M' : '800x600',
    'N' : '1024x768',
    'O' : '1280x1024',
    'P' : '1600x1200',
    'Q' : '1280x720',
    'R' : '1920x1080',
    'S' : '640x352',
    'T' : '640x360',
    'U' : '1280x960',
    // 'U' : '640x360I',
    // 'V' : '1280x720I',
    // 'W' : '1920x1280I',
    // 'X' : '640x400',
    // 'Y' : '800x450',
    // 'Z' : '1440x900',
    'a' : '960x480',
    'b' : '960x576',
    'c' : '320x180',
    'd' : '3840x2160',
    'e' : '3200x2400',
    'f' : '3072x2048',
    'g' : '2880x2160',
    'h' : '3200x1800',
    'i' : '2880x1800',
    'j' : '2992x1680',
    'k' : '2592x1944',
    'l' : '2592x1920',
    'm' : '2560x1920',
    'n' : '2560x1600',
    'o' : '2688x1520',
    'p' : '2560x1440',
    'q' : '2048x1536',
    'r' : '2304x1296',
    's' : '2592x1520',
    't' : '1920x1440',
    'u' : '1920x1536',
    'v' : '1344x1520',
    'w' : '1296x1944',
    'x' : '1280x1440',
    'y' : '1024x1536'
};

/*
 * fpsTable ( Bit -> Symbol )
 * fpsTable2( Bit <- Symbol )
 * fps_nt| fps_pal ( Symbol-> Real Numeric)
 *
 * FPS(NTSC) :
 *  0      : G : (0fps)
 *  1 << 0 : F : (1fps)
 *  1 << 1 : E : (2)
 *  1 << 2 : D : (4|3)
 *  1 << 3 : C : (7|6)
 *  1 << 4 : B : (15|12)
 *  1 << 5 : A : (30fps|25fps)
 */
var fpsTable = {
  0:"G",
  1:"F",
  2:"E",
  4:"D",
  8:"C",
  16:"B",
  32:"A"
};

var fpsTable2 = {
  "G":0,
  "F":1,
  "E":2,
  "D":4,
  "C":8,
  "B":16,
  "A":32
};

/*
 * fpsCalc_nt
 * fpsCalc_pal
 * Table for FPS Convert
 */
var fpsCalc_nt = {
    'A': '30.0',
    'B': '15.0',
    'C': '7.5',
    'D': '3.75',
    'E': '1.87',
    'F': '0.938',
    'G': '0'
};

var fpsCalc_pal = {
    'A': '25.0',
    'B': '12.5',
    'C': '6.25',
    'D': '3.125',
    'E': '1.563',
    'F': '0.781',
    'G': '0'
};

var fps_nt = {
    'A': '30',
    'B': '15',
    'C': '7',
    'D': '3',
    'E': '2',
    'F': '1',
    'G': '0'
};

if( INFO_MODEL.indexOf("ATM") >= 0
  || INFO_MODEL.indexOf("ANF") >= 0
  || INFO_MODEL.indexOf("UTM5G") >= 0
  || INFO_MODEL.indexOf("UTM5X") >= 0)   {
  var fps_pal = {
    'A': '25',
    'B': '13',
    'C': '7',
    'D': '3',
    'E': '2',
    'F': '1',
    'G': '0'
  };
} else {
  var fps_pal = {
    'A': '25',
    'B': '12',
    'C': '6',
    'D': '3',
    'E': '2',
    'F': '1',
    'G': '0'
  };
}

var RecordCalc = function(data, opt) {
  this.data = data;

  this.opt = {
    model: null,
    numCh:INFO_DVRCHANNEL,
    numGrp:1,
    grpCh: [INFO_DVRCHANNEL],
    grpMax: [fpsTable2["A"]*4],
    grpText: [],
    ispal:false,
    elem: null
  };

  $.extend(this.opt, opt);

  this.totMax = 0;

  this._calc = this.__calc;
  this.fps = fps_nt;
  this.fpsCalc = fpsCalc_nt;
  this.grpRemain = []; // not bitmask, real fps
  this.$txt_remain = [];

  this._grpSum = [];
  this._grpNumSum = [];
  this._grpNumMax = [];

  if( this.opt.model != null ) {
    if( this.opt.model.indexOf("HDY") >=0 ) {
      this.opt.numGrp = 2;
      this.opt.grpCh = [8,8];

      this.opt.grpMax[0] = fpsTable2["A"] * 2;
      this.opt.grpMax[1] = fpsTable2["A"] * 16;

      this.opt.grpText = ["HD REMAINED : ", "SD(@D1) REMAINED : "];
      this._calc = this.__calc_hdy;
    } else if( this.opt.model.indexOf("HDS") >= 0) {
      if( this.opt.numCh == 16 ) {
        this.opt.numGrp = 2;
        this.opt.grpCh = [8,8];

        // if using variable totMax, there might be some shared value
        // for example tot90 = 60+60
        this.totMax = fpsTable2["A"] * 3;
        this.opt.grpMax[0] = fpsTable2["A"] + fpsTable2["B"]
        this.opt.grpMax[1] = fpsTable2["A"] + fpsTable2["B"];

        this.opt.grpText = ["REMAINED GROUP1 : ", "REMAINED GROUP2 : "];
        this._calc = this.__calc;
      } else if ( this.opt.numCh == 8 ) {
        this.opt.numGrp = 1;
        this.opt.grpCh = [8];

        this.opt.grpMax[0] = fpsTable2["A"] * 2;

        this.opt.grpText = ["HD REMAINED : "];
        this._calc = this.__calc;
      }
    }
    else if (this.opt.model.indexOf("UTM4G") >= 0) {
      if( this.opt.numCh == 4 || this.opt.numCh == 8) {
        this.opt.numGrp = 3;
        this.opt.grpCh = [this.opt.numCh];

        // if using variable totMax, there might be some shared value
        this.opt.grpText = [langArray['LTXT_RECTITLE_REMMAIN']+"(@1920X1080) : ", langArray['LTXT_RECTITLE_REMMAIN']+"(@1280X720) : ", langArray['LTXT_RECTITLE_REMMAIN']+"(@960X480) : "];
        this._calc = this.__calc_utm;
      }
      else { //UTM4G 16ch
        this.opt.numGrp = 6;
        this.opt.grpCh = [this.opt.numCh];

        // if using variable totMax, there might be some shared value
        this.opt.grpText = [langArray['LTXT_RECTITLE_REMMAIN']+"(@1920X1080) : ", langArray['LTXT_RECTITLE_REMMAIN']+"(@1280X720) : ", langArray['LTXT_RECTITLE_REMMAIN']+"(@960X480) : ", langArray['LTXT_RECTITLE_REMMAIN']+"(@1920X1080) : ", langArray['LTXT_RECTITLE_REMMAIN']+"(@1280X720) : ", langArray['LTXT_RECTITLE_REMMAIN']+"(@960X480) : "];
        this._calc = this.__calc_utm;
      }

    }
    // else if ((this.opt.model.indexOf("UTM5G") >= 0 || this.opt.model.indexOf("UTM5X") >= 0) && INFO_DVRCHANNEL >= 16) { //UTM5G 16ch
    //   this.opt.numGrp = 3;
    //   this.opt.grpCh = [this.opt.numCh];
    //
    //   // if using variable totMax, there might be some shared value
    //   this.opt.grpText = [langArray['LTXT_RECTITLE_REMMAIN']+"(@1920X1080) : ", langArray['LTXT_RECTITLE_REMMAIN']+"(@1280X720) : ", langArray['LTXT_RECTITLE_REMMAIN']+"(@960X480) : "];
    //   this._calc = this.__calc_utm;
    // }
    else {
      return null;
    }
  }

  if( this.opt.elem == null ) {
    this.useWidget = false;
  } else {
    this.useWidget = true;
    this.$elem = $(this.opt.elem);
  }

  this._init();

  for( var i=0 ; i < this.opt.numGrp ; i++ ) {
    this.grpRemain[i] = this._convert(this.opt.grpMax[i]);
  }
};

RecordCalc.prototype = {
  _init: function() {
    var o = this.opt;
    this.fps = this.opt.ispal ? fps_pal : fps_nt;
    this.fpsCalc = this.opt.ispal ? fpsCalc_pal : fpsCalc_nt;

    if((INFO_MODEL.indexOf("UTM4G") >= 0) && (INFO_DVRCHANNEL >= 16) && this.useWidget)
    {
      var table = $('<table class="rec_remain_fps">').appendTo(this.$elem);
      var table_row;
      var table_title;
      //var table_title = $('<td rowspan="3">').html(o.grpText[0]).appendTo(table_row);


      for(var i=0; i<this.opt.grpText.length/2; i++) {
        table_row = $('<tr>').appendTo(table);

        if(i==0) {
          table_title = $('<td class="rec_remain_fps_grp" rowspan="'+this.opt.grpText.length/2+'">').appendTo(table_row);
          $('<span>').html(langArray["LTXT_SETUPUSER_GROUP"] + 1).appendTo(table_title);
        }

        $('<td class="rec_remain_fps_txt_title">').html(o.grpText[i]).appendTo(table_row);
        this.$txt_remain[i] = $('<td class="rec_remain_fps_txt_value">').html("0").appendTo(table_row);
      }

      for(var i= this.opt.grpText.length/2; i<this.opt.grpText.length; i++) {
        table_row = $('<tr>').appendTo(table);

        if(i==this.opt.grpText.length/2) {
          table_title = $('<td class="rec_remain_fps_grp" rowspan="'+this.opt.grpText.length/2+'">').appendTo(table_row);
          $('<span>').html(langArray["LTXT_SETUPUSER_GROUP"] + 2).appendTo(table_title);
        }

        $('<td class="rec_remain_fps_txt_title">').html(o.grpText[i]).appendTo(table_row);
        this.$txt_remain[i] = $('<td class="rec_remain_fps_txt_value">').html("0").appendTo(table_row);
      }
    }
    else
    {
      if( this.useWidget ) {
        var container = $('<dl>').appendTo(this.$elem);

        for( var i=0 ; i < this.opt.grpText.length ; i++ ) {

          $('<dt>').html(o.grpText[i]).appendTo(container);
          this.$txt_remain[i] = $('<dd>').html("0").appendTo(container);
        }
      }
    }
  },
  _convertCh: function(fpsch) { // ch -> Num
    return parseFloat(this.fpsCalc[fpsch]);
  },
  _convert: function(fpsBit) { // Bit -> (ch) -> Num
    var fpsBitMax = 1<<5;
    var fpsch = 'A';
    var val = 0;
    var minus = false;

    if( fpsBit < 0 ) {
      minus = true;
      fpsBit *= -1;
    }

    if( fpsBit > fpsBitMax ) {
      var mul = Math.floor(fpsBit / fpsBitMax);
      val = this._convertCh(fpsch) * mul;
      fpsBit = fpsBit % fpsBitMax;
    }

    for( var f=1, i=0 ; f <= fpsBit ; i++, f = 1 << i ) {
      if( fpsBit & f ) {
        fpsch = fpsTable[f];
        val += this._convertCh(fpsch);
      }
    }

    val = minus ? val * -1 : val;

    return val;
  },
  __calc: function(resol, fps) {
    // Calculation for Normal DVR
    var o = this.opt;
    var ch = 0;

    for( var g=0 ; g < o.numGrp ; g++ ) {
      this._grpSum[g] = 0;
      this._grpNumSum[g] = 0;
      this._grpNumMax[g] = Math.ceil(this._convert(o.grpMax[g]));

      for( var gch=0 ; gch < o.grpCh[g] ; gch++, ch++ ) {
        var fpsch = fps.charAt(ch);
        var fpsBit;

        fpsBit = fpsTable2[fpsch];
        this._grpSum[g] += fpsBit;
        this._grpNumSum[g] += this._convert(fpsBit);
      }

      this.grpRemain[g] = this._grpNumMax[g] - Math.ceil(this._grpNumSum[g]);
    }
  },
  __calc_hds16: function(resol, fps) {
    // Calculation for HDS 16CH
    // use Shared fps
    var o = this.opt;
    var grpTot;

    var ch = 0;

    var grpShared = [];
    var sharedMax = fpsTable2["A"];
    var sharedMaxNum = Math.ceil(this._convert(sharedMax));
    var usedShared = 0;
    var usedSharedNum = 0;
    var remain;

    var g = 0;

    for( g=0 ; g < o.numGrp ; g++ ) {
      grpShared[g] = 0;
      this._grpSum[g] = 0;
      this._grpNumSum[g] = 0;
      this._grpNumMax[g] = Math.ceil(this._convert(o.grpMax[g]));

      for( var gch=0 ; gch < o.grpCh[g] ; gch++, ch++ ) {
        var fpsch = fps.charAt(ch);
        var fpsBit;

        fpsBit = fpsTable2[fpsch];
        if( (this._grpSum[g] + fpsBit) <= o.grpMax[g] ) {
          // 0 ~ group max
          this._grpSum[g] += fpsBit;
          this._grpNumSum[g] += this._convert(fpsBit);
        } else if( (usedShared + fpsBit) <= sharedMax) {
          // group max ~ (group max + shared max)
          usedShared += fpsBit;
          usedSharedNum += this._convert(fpsBit);
        } else {
          // over shared
          this._grpSum[g] += fpsBit;
          this._grpNumSum[g] += this._convert(fpsBit);
        }
      }

      remain = o.grpMax[g] - this._grpSum[g];
      //this.grpRemain[g] = this._convert(remain);
      this.grpRemain[g] = this._grpNumMax[g] - Math.ceil(this._grpNumSum[g]);
    }

    remain = sharedMax - usedShared;
    //this.grpRemain[g] = this._convert(remain);
    this.grpRemain[g] = sharedMaxNum - Math.ceil(usedSharedNum);
  },
  __calc_hdy: function(resol, fps) {
    // Calculation for HDY 8CH
    var o = this.opt;

    var sum = [];
    var grpMax = o.grpMax;

    var ch = 0;

    for( var g=0 ; g < o.numGrp ; g++ ) {
      sum[g] = 0;
      for( var gch=0 ; gch < o.grpCh[g] ; gch++, ch++ ) {
        var fpsch = fps.charAt(ch);
        var fpsBit;

        if( this.data["camtype"][ch] == 1 ) {
          // HD Camera
          fpsBit = fpsTable2[fpsch];
          if( fpsBit == 1 ) {
            if (grpMax[g] < 70) {
              grpMax[g] += 1;
            }
          }
          sum[g] += fpsBit;
        } else {
          // SD Camera
          fpsBit = fpsTable2[fpsch];

          switch( resol.charAt(ch) ) {
            case "b": //960
            case "a":
              break;
            case "H": //D1
            case "D":
            case "K":
            case "L":
              sum[g] += (4*fpsBit);
              break;

            case "G": //2CIF
            case "C":
              sum[g] += (2*fpsBit);
              break;

            case "F": //CIF
            case "B":
              sum[g] += fpsBit;
              break;
            default:
              sum[g] += (4*fpsBit);
              break;
          }
        }
      }
      this.grpRemain[g] = this._convert(grpMax[g] - sum[g]);
    }

  },
  __calc_utm: function(resol, fps) {
    // Calculation for UTM4G
    if(INFO_MODEL.indexOf('UTM4G') >= 0) {
      var o = this.opt;

      if(o.numCh == 8 || o.numCh == 4) {
        var max_fps = 0;
        var sum_fps = 0;

        var convert_sum = 0;
        var max_convert = 0;

        max_fps = ( (fpsTable2["A"] * (o.numCh >> 1 )) + (fpsTable2["F"] * (o.numCh >> 1)) ) << 2;

        if(o.ispal) {
          max_convert = (fpsCalc_pal["A"] * (o.numCh >> 1))*4 + ((fpsCalc_pal["F"] * (o.numCh >> 1))*4);
        }
        else {
          max_convert = (fpsCalc_nt["A"] * (o.numCh >> 1))*4 + ((fpsCalc_nt["F"] * (o.numCh >> 1))*4);
        }

        for(var i=0; i<o.numCh; i++) {
          var fpsch = fps.charAt(i);

          if(resol.charAt(i) == "R") { // 1080p
            sum_fps += parseFloat((o.ispal ? fps_pal[fpsch] : fps_nt[fpsch]) << 2);
            convert_sum += parseFloat((o.ispal ? fpsCalc_pal[fpsch] : fpsCalc_nt[fpsch]) * 4);
          }
          else if(resol.charAt(i) == "Q") { // 720p
            sum_fps += parseFloat((o.ispal ? fps_pal[fpsch] : fps_nt[fpsch]) << 1);
            convert_sum += parseFloat((o.ispal ? fpsCalc_pal[fpsch] : fpsCalc_nt[fpsch]) * 2);
          }
          else { //below 960h
            sum_fps += parseFloat(o.ispal ? fps_pal[fpsch] : fps_nt[fpsch]);
            convert_sum += parseFloat(o.ispal ? fpsCalc_pal[fpsch] : fpsCalc_nt[fpsch]);
          }
        }

        //this.grpRemain[2] = max_fps - sum_fps; //960h

        convert_sum = convert_sum + 0.9999;
        this.grpRemain[2] = Math.ceil((max_convert + 0.9999) - (convert_sum));
        this.grpRemain[0] = (this.grpRemain[2] >> 2);
        this.grpRemain[1] = (this.grpRemain[2] >> 1);
      }
      else if(o.numCh == 16) {
        var max_fps_group1 = 0;
        var sum_fps_group1 = 0;

        var max_fps_group2 = 0;
        var sum_fps_group2 = 0;

        var convert_sum_group1 = 0;
        var max_convert_group1 = 0;

        var convert_sum_group2 = 0;
        var max_convert_group2 = 0;

        max_fps_group1 = ( (fpsTable2["A"] * ((o.numCh/2) >> 1 )) + (fpsTable2["F"] * ((o.numCh/2) >> 1)) ) << 2;
        max_fps_group2 = ( (fpsTable2["A"] * ((o.numCh/2) >> 1 )) + (fpsTable2["F"] * ((o.numCh/2) >> 1)) ) << 2;

        if(o.ispal) {
          max_convert_group1 = (fpsCalc_pal["A"] * ((o.numCh/2) >> 1))*4 + ((fpsCalc_pal["F"] * ((o.numCh/2) >> 1))*4);
          max_convert_group2 = (fpsCalc_pal["A"] * ((o.numCh/2) >> 1))*4 + ((fpsCalc_pal["F"] * ((o.numCh/2) >> 1))*4);
        }
        else {
          max_convert_group1 = (fpsCalc_nt["A"] * ((o.numCh/2) >> 1))*4 + ((fpsCalc_nt["F"] * ((o.numCh/2) >> 1))*4);
          max_convert_group2 = (fpsCalc_nt["A"] * ((o.numCh/2) >> 1))*4 + ((fpsCalc_nt["F"] * ((o.numCh/2) >> 1))*4);
        }

        for(var i=0; i<(o.numCh/2); i++) {
          var fpsch = fps.charAt(i);

          if(resol.charAt(i) == "R") { // 1080p
            sum_fps_group1 += parseFloat((o.ispal ? fps_pal[fpsch] : fps_nt[fpsch]) << 2);
            convert_sum_group1 += parseFloat((o.ispal ? fpsCalc_pal[fpsch] : fpsCalc_nt[fpsch]) * 4);
          }
          else if(resol.charAt(i) == "Q") { // 720p
            sum_fps_group1 += parseFloat((o.ispal ? fps_pal[fpsch] : fps_nt[fpsch]) << 1);
            convert_sum_group1 += parseFloat((o.ispal ? fpsCalc_pal[fpsch] : fpsCalc_nt[fpsch]) * 2);
          }
          else { //below 960h
            sum_fps_group1 += parseFloat(o.ispal ? fps_pal[fpsch] : fps_nt[fpsch]);
            convert_sum_group1 += parseFloat(o.ispal ? fpsCalc_pal[fpsch] : fpsCalc_nt[fpsch]);
          }
        }

        for(var i=(o.numCh/2); i<o.numCh; i++) {
          var fpsch = fps.charAt(i);

          if(resol.charAt(i) == "R") { // 1080p
            sum_fps_group2 += parseFloat((o.ispal ? fps_pal[fpsch] : fps_nt[fpsch]) << 2);
            convert_sum_group2 += parseFloat((o.ispal ? fpsCalc_pal[fpsch] : fpsCalc_nt[fpsch]) * 4);
          }
          else if(resol.charAt(i) == "Q") { // 720p
            sum_fps_group2 += parseFloat((o.ispal ? fps_pal[fpsch] : fps_nt[fpsch]) << 1);
            convert_sum_group2 += parseFloat((o.ispal ? fpsCalc_pal[fpsch] : fpsCalc_nt[fpsch]) * 2);
          }
          else { //below 960h
            sum_fps_group2 += parseFloat(o.ispal ? fps_pal[fpsch] : fps_nt[fpsch]);
            convert_sum_group2 += parseFloat(o.ispal ? fpsCalc_pal[fpsch] : fpsCalc_nt[fpsch]);
          }
        }

        //this.grpRemain[2] = max_fps_group1 - sum_fps_group1; //960h

        convert_sum_group1 = convert_sum_group1 + 0.9999;
        convert_sum_group2 = convert_sum_group2 + 0.9999;

        this.grpRemain[2] = Math.ceil((max_convert_group1 + 0.9999) - (convert_sum_group1));
        this.grpRemain[0] = (this.grpRemain[2] >> 2);
        this.grpRemain[1] = (this.grpRemain[2] >> 1);

        this.grpRemain[5] = Math.ceil((max_convert_group2 + 0.9999) - (convert_sum_group2));
        this.grpRemain[3] = (this.grpRemain[5] >> 2);
        this.grpRemain[4] = (this.grpRemain[5] >> 1);
      }
    }
    // //calc for utm5g 16ch
    // else if((INFO_MODEL.indexOf('UTM5G') >= 0 || INFO_MODEL.indexOf('UTM5X') >= 0) && INFO_DVRCHANNEL >= 16) {
    //   var o = this.opt;
    //   var max_fps = 0;
    //   var sum_fps = 0;
    //
    //   var convert_sum = 0;
    //   var max_convert = 0;
    //
    //   max_fps = ( (fpsTable2["A"] * (o.numCh >> 1 )) + (fpsTable2["F"] * (o.numCh >> 1)) ) << 2;
    //
    //   if(o.ispal) {
    //     max_convert = (fpsCalc_pal["A"] * (o.numCh >> 1))*4 + ((fpsCalc_pal["F"] * (o.numCh >> 1))*4);
    //   }
    //   else {
    //     max_convert = (fpsCalc_nt["A"] * (o.numCh >> 1))*4 + ((fpsCalc_nt["F"] * (o.numCh >> 1))*4);
    //   }
    //
    //   for(var i=0; i<o.numCh; i++) {
    //     var fpsch = fps.charAt(i);
    //
    //     if(resol.charAt(i) == "R") { // 1080p
    //       sum_fps += parseFloat((o.ispal ? fps_pal[fpsch] : fps_nt[fpsch]) << 2);
    //       convert_sum += parseFloat((o.ispal ? fpsCalc_pal[fpsch] : fpsCalc_nt[fpsch]) * 4);
    //     }
    //     else if(resol.charAt(i) == "Q") { // 720p
    //       sum_fps += parseFloat((o.ispal ? fps_pal[fpsch] : fps_nt[fpsch]) << 1);
    //       convert_sum += parseFloat((o.ispal ? fpsCalc_pal[fpsch] : fpsCalc_nt[fpsch]) * 2);
    //     }
    //     else { //below 960h
    //       sum_fps += parseFloat(o.ispal ? fps_pal[fpsch] : fps_nt[fpsch]);
    //       convert_sum += parseFloat(o.ispal ? fpsCalc_pal[fpsch] : fpsCalc_nt[fpsch]);
    //     }
    //   }
    //
    //   //this.grpRemain[2] = max_fps - sum_fps; //960h
    //
    //   convert_sum = convert_sum + 0.9999;
    //   this.grpRemain[2] = Math.ceil((max_convert + 0.9999) - (convert_sum));
    //   this.grpRemain[0] = (this.grpRemain[2] >> 2);
    //   this.grpRemain[1] = (this.grpRemain[2] >> 1);
    // }
  },
  update: function(resol, fps) {
    this._calc(resol, fps);

    if( this.useWidget ) {
      for( var i=0 ; i < this.opt.grpText.length ; i++ ) {
        if( this.$txt_remain[i] ) {
          if( this.grpRemain[i] < 0 ) {
            this.$txt_remain[i].html('<span class="minus">' + this.grpRemain[i] + '</span>');
          } else {
            this.$txt_remain[i].html('<span>' + this.grpRemain[i] + '</span>');
          }
        }
      }
    }
  },
  validate: function(resol, fps) {
    this._calc(resol, fps);

    for( var i=0 ; i < this.opt.numGrp ; i++ ) {
      if( this.grpRemain[i] >= 0 ) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }
};

var MAX_PREREC=5;

function isFirstStream(resoCapa, reso)
{
  if( resoCapa.indexOf(reso) == 0 ) {
    return true;
  }
  return false;
}

function getCameraType(array)
{
  var camtype = [];

  for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
    if( array['resolcapa'+ch].indexOf("R") >= 0 ||
        array['resolcapa'+ch].indexOf("Q") >= 0 ) {
      // HD Camera
      camtype[ch] = 1;
    } else {
      camtype[ch] = 0;
    }
  }

  return camtype;
}

function checkCameraCapable(array, asc, nday)
{
  var resoCapa, fpsCapa;
  var fps2Capa; // fpr Capability for 2nd strem
  var resoCur, fpsCur;

  if( typeof nday == 'undefined' ) {
    nday = 1;
  }

  for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
    if( array['conn'+ch] == '1' ) {
      resoCapa = array['resolcapa' + ch];
      resoCur = array['resolcur' + ch];

      fpsCapa = array['fpscapa' + ch];
      fps2Capa = array['fps2capa' + ch];
      fpsCur = array['fpscur' + ch];

      for( var day=0 ; day < nday ; day++ ) {
        if( nday == 1 ) {
          day = '';
        }

        if( resoCapa.indexOf(array['size'+day].charAt(ch)) < 0 ) {
          for( var hr=0 ; hr < 24 ; hr++ ) {
            if( asc )
              array['size'+day] = array['size'+day].setCharAt(16*hr + ch, resoCapa.charAt(resoCapa.length-1));
            else
              array['size'+day] = array['size'+day].setCharAt(16*hr + ch, resoCapa.charAt(0));
          }
        }
      }
    }
  }
}

//made by zerodice0.
//this api making option list based on fps string.
//this api is added from 5hg model, so not working on other model.
var _fps_table_alphabet_to_number = {A: 0,B: 1,C: 2,D: 3,E: 4,F: 5,G: 6,H: 7,I: 8,J: 9,K: 10,L: 11,M: 12,N: 13,O: 14,P: 15,Q: 16,R: 17,S: 18,T: 19,U: 20,V: 21,W: 22,X: 23,Y: 24,Z: 25,a: 26,b: 27,c: 28,d: 29,e: 30};
var _convert_fps_to_options = function(param_original_fps) {
  var enum_real_value = ['F', 'E', 'D', 'C', 'B', 'A'];
  var tmp_real_value = '';

  for(var i=param_original_fps.length-1; i>=0; i--) {
    tmp_real_value = enum_real_value[i] + tmp_real_value;
  }
  
  return tmp_real_value;
}

/**
 * @param array HTTP api call response
 * @custom_setting user customized setting
 * @param sizestr  size chracters for channel 1~16
 **/
function setCamProfile(array, custom_setting, sizestr)
{
  var setting = {
    sizeName : "#size",
    fpsName : "#fps",
    resoCapa : "RQS",
    fpsCapa : "ABF",
    resoCur : 'R',
    fpsCur : 'A',
    from: 0,
    to: INFO_DVRCHANNEL-1,
    inverse : false
  };

  $.extend(setting, custom_setting);

  var from = setting.from;
  var to = setting.to;

  var resoCapa, fpsCapa;
  var resoCur, fpsCur;

  var sizeObj;
  var fpsObj;

  var fps;

  for( var ch=from ; ch <= to ; ch++ ) {
    sizeObj = $(setting.sizeName + ch);
    fpsObj = $(setting.fpsName + ch);

    fps = ( INFO_CAMTYPE == 'NTSC' ) ? fps_nt : fps_pal;

    if( INFO_MODEL.indexOf("IPX") >= 0 ) {
      // Make Parameter List
      resoCapa = array['resolcapa' + ch];
      fpsCapa = array['fpscapa' + ch];

      if( array['conn'+ch] == '0' ) {
        //disconnected, set Default
        resoCur = setting.resoCur;
        fpsCur = setting.fpsCur;
      } else {
        //connected, use camera info
        resoCur = array['resolcur' + ch];
        fpsCur = array['fpscur' + ch];
      }
    }
    else if ( INFO_MODEL.indexOf("5HG") >= 0) {
      resoCapa = array['resolcapa'+ch];
      fpsCapa = array['fpscapa'+ch];

      if( array['conn'+ch] == '0' ) {
        //disconnected, set Default
        resoCur = setting.resoCur;
        fpsCur = setting.fpsCur;
      } else {
        //connected, use camera info
        resoCur = array['resolcur' + ch];
        fpsCur = _convert_fps_to_options(array['fpscur' + ch]);
      }
    }
    else if ( INFO_MODEL.indexOf("_HDY_") >= 0) {
      if( array['camtype'][ch] == 1 ) {
        // HD Channel
        resoCur = sizeObj.val();
        if( !resoCur || resoCur.length <= 0 ) {
          resoCur = sizestr.charAt(ch);
        }

        resoCapa = array['resolcapa' + ch];

        if( resoCur != "R" && resoCur != "Q" ) { // curr set not HD
          fpsCapa = "EF";
          fpsCur = "E";
        }
        else {
          fpsCapa = array['fpscapa' + ch];
          fpsCur = array['fpscur' + ch];
        }
      }
      else {
        // SD Channel
        resoCapa = array['resolcapa' + ch];

        fpsCapa = array['fpscapa' + ch];
        fpsCur = array['fpscur' + ch];
      }
    }
    else if (INFO_MODEL.indexOf("_HDS_") >= 0 ) {
      resoCur = sizeObj.val();
      if (!resoCur || resoCur.length <= 0 ) {
        resoCur = sizestr.charAt(ch);
      }
      resoCapa = array['resolcapa' + ch];
      fpsCapa = array['fpscapa' + ch];
      fpsCur = array['fpscur' + ch];
    }
    else if ( INFO_MODEL.indexOf("_HDI_") >= 0 ) {
      resoCur = sizeObj.val();
      if( !resoCur || resoCur.length <= 0 ) {
        resoCur = sizestr.charAt(ch);
      }

      resoCapa = array['resolcapa' + ch];

      if( resoCur != "R" && resoCur != "Q" ) { // curr set not HD
        fpsCapa = "BCDEF";
        fpsCur = "B";
      }
      else {
        fpsCapa = array['fpscapa' + ch];
        fpsCur = array['fpscur' + ch];
      }
    }
    else {
      if( array['conn'+ch] == '0' ) {
        //disconnected, set Default
        resoCapa = setting.resoCapa;
        resoCur = setting.resoCur;

        fpsCapa = setting.fpsCapa;
        fpsCur = setting.fpsCur;
      }
      else {
        resoCapa = array['resolcapa' + ch];
        resoCur = array['resolcur' + ch];

        fpsCapa = array['fpscapa' + ch];
        fpsCur = array['fpscur' + ch];
      }
    }

    resoCapa = resoCapa ? resoCapa : "";
    fpsCapa = fpsCapa ? fpsCapa : "";

    sizeObj.empty();
    fpsObj.empty();
    for( var j=0 ; j < resoCapa.length ; j++ ) {
      var c = resoCapa.charAt(j);
      
      if( setting.inverse ) {
        sizeObj.prepend( $('<option>').val(c).html(resol[c]) );
      }
      else {
        sizeObj.append( $('<option>').val(c).html(resol[c]) );
      }
    }
                  
    if(INFO_MODEL.indexOf("5HG")>=0) {
      var real_fpsCapa = _convert_fps_to_options(fpsCapa);

      for( var j=0 ; j < fpsCapa.length ; j++ ) {
        var c = fpsCapa.charAt(j);
        var r = real_fpsCapa.charAt(j);
        var label = Math.ceil(parseFloat(_fps_table_alphabet_to_number[c]));
  
        //fpsObj.append( $('<option>').val(c).html( Math.ceil(parseFloat(fps[c]))) );
        fpsObj.prepend( $('<option>').val(r).html( Math.ceil(parseFloat(label))) );
      }
    } else {
      for( var j=0 ; j < fpsCapa.length ; j++ ) {
        var c = fpsCapa.charAt(j);
        var label = Math.ceil(parseFloat(fps[c]));
        if(parseInt($z.current.m.data['analogtype'+ch]) == 6) {
          switch(label) {
            case 30:
            case 25:
              label=18;
              break;
            case 15:
            case 13:
              label=9;
              break;
            case 7:
              label=4;
              break;
          }
        }
  
        //fpsObj.append( $('<option>').val(c).html( Math.ceil(parseFloat(fps[c]))) );
        fpsObj.append( $('<option>').val(c).html( Math.ceil(parseFloat(label))) );
      }  
    }
    
  }
}

$z.c({
    RecOp: {
        autocfg : 0,
        recmode : 0,
        actionUrl : '/cgi-bin/webra_fcgi.fcgi',

        setCameraProfile: function(array, day, hour) {
            var autocfg = this.autocfg;
            var recmode = parseInt(array['recmode']);

            var arr = [ '', 'm_', 'a_', 'ma_', 'im_', 'ia_', 'ima_' ];
            var prefix = arr[autocfg];

            switch ( parseInt(autocfg) ) {
              case 0:
                break;
              case 1: // MOTION, ALARM
              case 2:
              case 3:
                var str = array[prefix + "size"];

                setCamProfile(array, {
                  sizeName: "#alarm_rec select#size",
                  fpsName: "#alarm_rec select#fps",
                  inverse: false
                }, str);
                break;
              case 4: // INTENSIVE
              case 5:
              case 6:
                var str1 = array[prefix + "size1"];
                var str2 = array[prefix + "size2"];

                setCamProfile(array, {
                  sizeName: "#intensive_rec select#n_size",
                  fpsName: "#intensive_rec select#n_fps",
                  inverse: false
                }, str1);
                setCamProfile(array, {
                  sizeName: "#intensive_rec select#a_size",
                  fpsName: "#intensive_rec select#a_fps",
                  inverse: false
                }, str2);
                break;
            }

        },

        /**
         * Set Values into <input> element (with sysdb format value)
         */
        setParamForm: function(array) {
            var arr = [ 'm_', 'a_', 'ma_' ];
            for( var idx in arr ) {
                var prefix = arr[idx];

                if( INFO_MODEL.indexOf("HDY") >= 0  ) {
                  // For HDY 640x360, Maximum FPS is 2fps
                  for (var i = 0 ; i < array[prefix + 'size2'].length ; i += 1) {
                    if (array[prefix + 'size'][i] == 'T') {
                      if (array[prefix + 'fps'][i] != 'E' &&
                          array[prefix + 'fps'][i] != 'F') {
                            array[prefix + 'fps'] = array[prefix + 'fps'].setCharAt(i, 'E');
                          }
                    }
                  }
                }

               $('input#' + prefix + 'size').val(array[prefix + 'size']);
                $('input#' + prefix + 'fps').val(array[prefix + 'fps']);
                $('input#' + prefix + 'q').val(array[prefix + 'q']);
                $('input#' + prefix + 'aud').val(array[prefix + 'aud']);
            }

            var arr = [ 'im_', 'ia_', 'ima_' ];
            for( var idx in arr ) {
                var prefix = arr[idx];

                if( INFO_MODEL.indexOf("HDY") >= 0  ) {
                  // For HDY 640x360, Maximum FPS is 2fps
                  for (var i = 0 ; i < array[prefix + 'size1'].length ; i += 1) {
                    if (array[prefix + 'size1'][i] == 'T') {
                      if (array[prefix + 'fps1'][i] != 'E' &&
                          array[prefix + 'fps1'][i] != 'F') {
                            array[prefix + 'fps1'] = array[prefix + 'fps1'].setCharAt(i, 'E');
                          }
                    }

                    if (array[prefix + 'size2'][i] == 'T') {
                      if (array[prefix + 'fps2'][i] != 'E' &&
                          array[prefix + 'fps2'][i] != 'F') {
                            array[prefix + 'fps2'] = array[prefix + 'fps2'].setCharAt(i, 'E');
                          }
                    }
                  }
                }

                $('input#' + prefix + 'size1').val(array[prefix + 'size1']);
                $('input#' + prefix + 'size2').val(array[prefix + 'size2']);
                $('input#' + prefix + 'fps1').val(array[prefix + 'fps1']);
                $('input#' + prefix + 'fps2').val(array[prefix + 'fps2']);
                $('input#' + prefix + 'q1').val(array[prefix + 'q1']);
                $('input#' + prefix + 'q2').val(array[prefix + 'q2']);
                $('input#' + prefix + 'aud').val(array[prefix + 'aud']);

            }
        },

        index : function() {
            var c = this;

            var action = 'action=get_setup&menu=' + c.m.menu;

            var arr = [ 'm_', 'a_', 'ma_' ];
            for( idx in arr ) {
                var prefix = arr[idx];

                $('form#recordsetting_operation').append (
                    $('<input type="hidden">').attr('name', prefix + 'size').attr('id', prefix + 'size'),
                    $('<input type="hidden">').attr('name', prefix + 'fps').attr('id', prefix + 'fps'),
                    $('<input type="hidden">').attr('name', prefix + 'q').attr('id', prefix + 'q'),
                    $('<input type="hidden">').attr('name', prefix + 'aud').attr('id', prefix + 'aud')
                );
            }

            var arr = [ 'im_', 'ia_', 'ima_' ];
            for( idx in arr ) {
                var prefix = arr[idx];

                $('form#recordsetting_operation').append (
                    $('<input type="hidden">').attr('name', prefix + 'size1').attr('id', prefix + 'size1'),
                    $('<input type="hidden">').attr('name', prefix + 'fps1').attr('id', prefix + 'fps1'),
                    $('<input type="hidden">').attr('name', prefix + 'q1').attr('id', prefix + 'q1'),
                    $('<input type="hidden">').attr('name', prefix + 'size2').attr('id', prefix + 'size2'),
                    $('<input type="hidden">').attr('name', prefix + 'fps2').attr('id', prefix + 'fps2'),
                    $('<input type="hidden">').attr('name', prefix + 'q2').attr('id', prefix + 'q2'),
                    $('<input type="hidden">').attr('name', prefix + 'aud').attr('id', prefix + 'aud')
                );
            }

            if( INFO_MODEL.indexOf("HDY") >=0 ) {
              $('#prerec .hidden').remove();
            }

            c.form('form#recordsetting_operation',
                function before() {
                  var isZeroFps = false,
                      fps = $('select[id^="fps"]'),
                      nfps = $('select[id^="n_fps"]'),
                      afps = $('select[id^="a_fps"]');

                  for (var i = 0 ; i < INFO_DVRCHANNEL ; i += 1) {
                    if ( fps[i].value == fpsTable[0]
                      || nfps[i].value == fpsTable[0]
                      || afps[i].value == fpsTable[0]) {
                      isZeroFps = true;
                      break;
                    }
                  }

                  if (isZeroFps == true) {
                    if (!confirm(langArray['LTXT_WARNING_0FPS'])) {
                      return -1;
                    }
                  }
                },
                function after() {

                }
            );

            if( $z.debug ) {
                action += '&debug=';
            }
            c.v.init();

            $('input#cancel').click( function (event) {
                c.m.revert();
                c.setCameraProfile(c.m.data);
                c.v.update(c.m.data);
                c.setParamForm(c.m.data);
            });

            $("input[name='autocfg']").click( function(event) {
                var title = [
                    "HQ",
                    langArray['LTXT_SETUPREC_OP_MOTION'],
                    langArray['LTXT_SETUPREC_OP_ALARM'],
                    langArray['LTXT_SETUPREC_OP_MOTION_ALARM'],
                    langArray['LTXT_SETUPREC_OP_INTENSE_MOTION'],
                    langArray['LTXT_SETUPREC_OP_INTENSE_ALARM'],
                    langArray['LTXT_SETUPREC_OP_INTENSE_MOTIONALARM']
                ];

                var al_mo_title = [
                  "",
                  "",
                  "",
                  "",
                  langArray['LTXT_SETUPREC_OP_WHEN_MOTION'],
                  langArray['LTXT_SETUPREC_OP_WHEN_ALARM'],
                  langArray['LTXT_SETUPREC_OP_WHEN_MA']
                ];
                var m = c.m;
                var array = m.data;
                c.autocfg = event.target.value;

                c.setCameraProfile(array);

                var autocfg = parseInt( c.autocfg );

                switch( autocfg ) {
                    case 0:
                      $('#hd_priority').removeAttr('disabled');
                        $("div#dlgMotionAlarm").dialog("close");
                        $("div#dlgIntensive").dialog("close");
                        break;
                    case 1:
                    case 2:
                    case 3:
                      $('#hd_priority').attr('disabled', 'disabled');
                        $("div#dlgMotionAlarm").dialog({title : title[autocfg],
                        focus: function(event, ui) {
                        },
                        position : 'center'
                        });
                        $("div#dlgMotionAlarm").dialog("open");

                        c.v.updateAlarm(array, autocfg);
                        break;

                    case 4:
                    case 5:
                    case 6:
                      $('#hd_priority').attr('disabled', 'disabled');
                        $("div#dlgIntensive").dialog({title : title[autocfg],
                        position : 'center',
                        focus: function(event, ui) {
                        }
                        });
                        $("div#dlgIntensive").dialog("open");

                        $("span#lang_action").html(al_mo_title[autocfg]);

                        c.v.updateIntensive(array , autocfg);
                        break;
                }
            });

            $("select#recmode").change( function() {
              c.recmode = $(this).val();
              c.v.showhide_rec_option(c.recmode);
            });

            c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
                var array = encode_to_array(response);

                var chk = [];
                authCheck = new AuthCheck(array);

                if( !authCheck.check('recset') ) {
                    AuthorityNoPermission();
                    history.back()
                    return;
                }

                array['camtype'] = getCameraType(array);

                if( array['recmode'] == '0' ) {
                    $('.manual-rec').each( function() {
                        $(this).find('a').bind('click', disabler);
                        $(this).addClass('disabled-menu');
                    });
                } else {
                    $('.manual-rec').each( function() {
                        $(this).find('a').unbind('click', disabler);
                        $(this).removeClass('disabled-menu');
                    });

                }

                c.recCalcAlarm = new RecordCalc(
                array,
                {
                  model: INFO_MODEL,
                  ch:INFO_DVRCHANNEL,
                  ispal:(INFO_CAMTYPE=="PAL"),
                  elem:"#rec-calc-ma"
                });

                c.recCalcIntensive1 = new RecordCalc(
                array,
                {
                  model: INFO_MODEL,
                  ch:INFO_DVRCHANNEL,
                  ispal:(INFO_CAMTYPE=="PAL"),
                  elem:"#rec-calc-ima1"
                });

                c.recCalcIntensive2 = new RecordCalc(
                array,
                {
                  model: INFO_MODEL,
                  ch:INFO_DVRCHANNEL,
                  ispal:(INFO_CAMTYPE=="PAL"),
                  elem:"#rec-calc-ima2"
                });

                if($("#rec-calc-ima1").children().size() == 0 && $("#rec-calc-ima1").children().size() == 0) {
                  $("#intensive_fps_calc").remove();
                }

                c.recmode = array["recmode"];
                c.autocfg = array["autocfg"];

                c.setParamForm(array);
                c.setCameraProfile(array);
                c.m.initData(array);
                c.v.update(array);
            });

            $("#prerec, #prerec2, #prerec3").change(function(e) {
              var prerec = $(this).val();
              var data = c.m.data;

              if( prerec > MAX_PREREC ) {
                if( !confirm(langArray['LTXT_RECSET_CONFIRM_LONG_PREREC']) ) {
                  $(this).val(data['prerec']);
                  return;
                }
              }

              data['prerec'] = prerec;
              c.v.updateCommon(data);
            });

            $("#postrec, #postrec2, #postrec3").change(function(e) {
              var postrec = $(this).val();
              var data = c.m.data;

              data['postrec'] = postrec;

              c.v.updateCommon(data);
            });

            $("#alarm_rec select").change( function(event) {
                var name = $(this).attr('name');
                var type, ch;
                var val = $(this).val();
                var autocfg = c.autocfg;
                var data = c.m.data;
                var prerec, postrec;

                if ( name.indexOf('size') >= 0 ) {
                  type = 0;
                } else if ( name.indexOf('fps') >= 0 ) {
                  type = 1;
                } else if ( name.indexOf('quality') >= 0 ) {
                  type = 2;
                } else if ( name.indexOf('audio') >= 0 ) {
                  type = 3;
                } else {
                  type = -1;
                }

                if ( type >= 0 ) {
                  ch = parseInt( name.charAt( name.length-1 ) );
                } else {
                  return;
                }

                var arr = [ '', 'm_', 'a_', 'ma_', 'im_', 'ia_', 'ima_' ];
                var prefix = arr[autocfg];

                switch ( parseInt(autocfg) ) {
                    case 0:
                        break;
                    case 1: // MOTION, ALARM
                    case 2:
                    case 3:
                        var arr2 = [ 'size', 'fps', 'q', 'aud'];
                        var idx = arr2[type];

                        prerec = $("#prerec2").val();
                        postrec = $("#postrec2").val();
                        break;
                    case 4: // INTENSIVE
                    case 5:
                    case 6:
                        var arr2 = [ 'size1', 'fps1', 'q1', 'size2', 'fps2', 'q2', 'aud'];
                        var idx = arr2[type];

                        prerec = $("#prerec3").val();
                        postrec = $("#postrec3").val();
                        break;
                }

                data['prerec'] = prerec;
                data['postrec'] = postrec;
                data['recmode'] = c.recmode;
                data['autocfg'] = c.autocfg;

                var params = {};

                var selects = $('form#alarm_rec select');

                for (var i in selects) {
                  params[selects[i].name] = selects[i].value;
                }
                if( type > 0 ) {
                  // TODO 카메�환�업
                  if( idx.indexOf("size") > 0 ) {
                    var oldsize = data[prefix + idx].charAt(ch);

                    if( oldsize != val ) {
                      params['fps'+ch] = c.m.origData[prefix + 'fps'].charAt(ch);
                    }
                  }

                  data[prefix + idx] = data[prefix + idx].setCharAt(ch, val);
                }


                for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                  data[prefix + 'size'] = data[prefix + 'size'].setCharAt(ch, params['size'+ch]);
                  data[prefix + 'fps'] = data[prefix + 'fps'].setCharAt(ch, params['fps'+ch]);
                  data[prefix + 'q'] = data[prefix + 'q'].setCharAt(ch, params['quality'+ch]);
                  data[prefix + 'aud'] = data[prefix + 'aud'].setCharAt(ch, params['audio'+ch]);

                }

                c.setCameraProfile(data);
                c.v.update(data);

                // Re-check
                for (var i in selects) {
                  params[selects[i].name] = selects[i].value;
                }

                for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                  data[prefix + 'size'] = data[prefix + 'size'].setCharAt(ch, params['size'+ch]);
                  data[prefix + 'fps'] = data[prefix + 'fps'].setCharAt(ch, params['fps'+ch]);
                  data[prefix + 'q'] = data[prefix + 'q'].setCharAt(ch, params['quality'+ch]);
                  data[prefix + 'aud'] = data[prefix + 'aud'].setCharAt(ch, params['audio'+ch]);

                }

                c.setCameraProfile(data);
                c.v.update(data);
                // ~Re-check

                c.m.updateData(data); // then, notify to model that data changed
                c.setParamForm(data);

            });

            $("#intensive_rec select").change( function(event) {
                var name = $(this).attr('name');
                var type, ch;
                var val = $(this).val();
                var autocfg = c.autocfg;
                var data = c.m.data;
                var prerec, postrec;

                if ( name.indexOf("n_size") == 0 ) {
                  type = 0;
                } else if ( name.indexOf("n_fps") == 0 ) {
                  type = 1;
                } else if ( name.indexOf("n_quality") == 0 ) {
                  type = 2;
                } else if ( name.indexOf("a_size") == 0 ) {
                  type = 3;
                } else if ( name.indexOf("a_fps" ) == 0 ) {
                  type = 4;
                } else if ( name.indexOf("a_quality") == 0 ) {
                  type = 5;
                } else if ( name.indexOf("a_audio") == 0 ) {
                  type = 6;
                } else {
                  type = -1;
                }

                if ( type >= 0 ) {
                  ch = parseInt( name.charAt( name.length-1 ) );
                } else {
                  return;
                }

                var arr = [ '', 'm_', 'a_', 'ma_', 'im_', 'ia_', 'ima_' ];
                var prefix = arr[autocfg];

                switch ( parseInt(autocfg) ) {
                    case 0:
                        break;
                    case 1: // MOTION, ALARM
                    case 2:
                    case 3:
                        var arr2 = [ 'size', 'fps', 'q', 'aud'];
                        var idx = arr2[type];

                        prerec = $("#prerec2").val();
                        postrec = $("#postrec2").val();
                        break;
                    case 4: // INTENSIVE
                    case 5:
                    case 6:
                        var arr2 = [ 'size1', 'fps1', 'q1', 'size2', 'fps2', 'q2', 'aud'];
                        var idx = arr2[type];

                        prerec = $("#prerec3").val();
                        postrec = $("#postrec3").val();
                        break;
                }

                data['prerec'] = prerec;
                data['postrec'] = postrec;
                data['recmode'] = c.recmode;
                data['autocfg'] = c.autocfg;

                var params = {};

                var selects = $('form#intensive_rec select');

                for (var i in selects) {
                  params[selects[i].name] = selects[i].value;
                }

                // TODO 카메�환�업
                /*switch (type) {
                  case 0: //size
                    var oldsize = data[prefix + idx].charAt(ch);

                    if( oldsize != val ) {
                      params['n_fps'+ch] = c.m.origData[prefix + 'fps1'].charAt(ch);
                    }

                    break;
                  case 3: // size
                    var oldsize = data[prefix + idx].charAt(ch);

                    if( oldsize != val ) {
                      params['a_fps'+ch] = c.m.origData[prefix + 'fps2'].charAt(ch);
                    }
                    break;
                }*/

                if( type >= 0 ) {
                  data[prefix + idx] = data[prefix + idx].setCharAt(ch, val);
                }


                for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                  data[prefix + 'size1'] = data[prefix + 'size1'].setCharAt(ch, params['n_size'+ch]);
                  data[prefix + 'fps1'] = data[prefix + 'fps1'].setCharAt(ch, params['n_fps'+ch]);
                  data[prefix + 'q1'] = data[prefix + 'q1'].setCharAt(ch, params['n_quality'+ch]);
                  data[prefix + 'size2'] = data[prefix + 'size2'].setCharAt(ch, params['a_size'+ch]);
                  data[prefix + 'fps2'] = data[prefix + 'fps2'].setCharAt(ch, params['a_fps'+ch]);
                  data[prefix + 'q2'] = data[prefix + 'q2'].setCharAt(ch, params['a_quality'+ch]);
                  data[prefix + 'aud'] = data[prefix + 'aud'].setCharAt(ch, params['a_audio'+ch]);

                }

                c.setCameraProfile(data);
                c.v.update(data);

                // Re-check
                for (var i in selects) {
                  params[selects[i].name] = selects[i].value;
                }

                for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                  data[prefix + 'size1'] = data[prefix + 'size1'].setCharAt(ch, params['n_size'+ch]);
                  data[prefix + 'fps1'] = data[prefix + 'fps1'].setCharAt(ch, params['n_fps'+ch]);
                  data[prefix + 'q1'] = data[prefix + 'q1'].setCharAt(ch, params['n_quality'+ch]);
                  data[prefix + 'size2'] = data[prefix + 'size2'].setCharAt(ch, params['a_size'+ch]);
                  data[prefix + 'fps2'] = data[prefix + 'fps2'].setCharAt(ch, params['a_fps'+ch]);
                  data[prefix + 'q2'] = data[prefix + 'q2'].setCharAt(ch, params['a_quality'+ch]);
                  data[prefix + 'aud'] = data[prefix + 'aud'].setCharAt(ch, params['a_audio'+ch]);

                }

                c.setCameraProfile(data);
                c.v.update(data);
                // ~ Re-check

                c.m.updateData(data); // then, notify to model that data changed
                c.setParamForm(data);
            });


        }
    },
    RecCont: {
        recCalc : {},
        actionUrl : '/cgi-bin/webra_fcgi.fcgi',

        setCameraProfile: function(array, day, hour) {
          if( typeof day == 'undefined' )
            day = hour = 0;

          var sizestr = array['size'+ day].substr(0, 16);

          setCamProfile(array, {
            sizeName: 'select#paramsize',
            fpsName: 'select#paramFps',
            inverse: false
          }, sizestr);
        },

        /**
         * Set Values into <input> element (with converted format value)
         */
        setParamForm: function(array) {
            for( var day=0 ; day < 9 ; day++ ) {
                $('input#size' + day).val(array['size'+day]);
                $('input#fps' + day).val(array['fps'+day]);
                $('input#quality' + day).val(array['quality'+day]);
                $('input#audio' + day).val(array['audio'+day]);
            }

        },

        paramCallback : function(index) {
            $z.log(index);
        },

        /**
         * Set Values into <input> element (with sysdb format data)
         */
        setSchedForm: function(array) {
            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                $('input#sched' + ch).val(array['size'+ch]);
            }
        },
        setData: function(array) {
            this.setSchedForm(array);
            this.setParamForm(array);

            for( var day=0 ; day < 9 ; day++ ) {
                //param
                $('form#recordsetting_continuous input#size'+day).val(array['size'+day]);
                $('form#recordsetting_continuous input#fps'+day).val(array['fps'+day]);
                $('form#recordsetting_continuous input#quality'+day).val(array['quality'+day]);
                $('form#recordsetting_continuous input#audio'+day).val(array['audio'+day]);

                //sched
                $('form#recordsetting_continuous input#mode'+day).val(array['mode'+day]);
            }
        },
        updateRecCalcxxx: function(params) {
          var c = this;
          var res = "RRRRRRRRRRRRRRRR";
          var fps = "AAAAAAAAAAAAAAAA";

          for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
            res = res.setCharAt(ch, params["paramsize"+ch]);
            fps = fps.setCharAt(ch, params["paramFps"+ch]);
          }

          c.recCalc.update(res, fps);
        },
        index : function() {
            var c = this;

            var action = 'action=get_setup&menu=' + c.m.menu;

            for( var day=0 ; day < 9 ; day++ ) {
                $('form#recordsetting_continuous').append(
                    $('<input type="hidden">').attr('name', 'size'+day).attr('id', 'size'+day),
                    $('<input type="hidden">').attr('name', 'fps'+day).attr('id', 'fps'+day),
                    $('<input type="hidden">').attr('name', 'quality'+day).attr('id', 'quality'+day),
                    $('<input type="hidden">').attr('name', 'audio'+day).attr('id', 'audio'+day),
                    $('<input type="hidden">').attr('name', 'mode'+day).attr('id', 'mode'+day)
                );
            }

            c.form('form#recordsetting_continuous',
                function before() {
                  var isZeroFps = false,
                      fps = $('select[id^="paramFps"]');

                  for (var i = 0 ; i < INFO_DVRCHANNEL ; i += 1) {
                    if ( fps[i].value == fpsTable[0] ) {
                      isZeroFps = true;
                    }
                  }

                  if (isZeroFps == true) {
                    if (!confirm(langArray['LTXT_WARNING_0FPS'])) {
                      return -1;
                    }
                  }
                },
                function after() {

                }
            );

            $('form').bind('REC_SCHED_CHANGE', function(event, array, day) {
              for( var i in array ) {
                $('#mode'+i).val(array[i]);
              }
            });

            if( $z.debug ) {
                action += '&debug=';
            }
            c.v.init();

            $('#schmodeSelect1').change(function() {
                var day = parseInt($(this).val());

                c.v.schedWidget.updateByDay(day);
            });

            $('#schmodeSelect').change(function() {
                var day = parseInt($(this).val());

                c.v.paramWidget.updateByDay(day);
                c.v.updateParamByDay(day);
            });

            $('input#cancel').click( function (event) {
                c.m.revert();
                c.setCameraProfile(c.m.data);
                c.v.update(c.m.data);
                c.setData(c.m.data);
            });

            // array[schedule] 0: daily 1: weekly
            c.m.get(this.actionUrl, action , function (response) {
                var array = encode_to_array(response);

                var chk = [];
                authCheck = new AuthCheck(array);

                if( !authCheck.check('recset') ) {
                    AuthorityNoPermission();
                    history.back()
                    return;
                }

                array['camtype'] = getCameraType(array);

                if( array['recmode'] == '0' ) {
                    $('.manual-rec').each( function() {
                        $(this).find('a').bind('click', disabler);
                        $(this).addClass('disabled-menu');
                    });
                } else {
                    $('.manual-rec').each( function() {
                        $(this).find('a').unbind('click', disabler);
                        $(this).removeClass('disabled-menu');
                    });

                }

                c.recCalc = new RecordCalc(
                  array,
                  {
                    model: INFO_MODEL,
                    ch:INFO_DVRCHANNEL,
                    ispal:(INFO_CAMTYPE=="PAL"),
                    elem:"#rec-calc"
                  });

                checkCameraCapable(array, false, 8);
                c.setCameraProfile(array);

                c.m.initData(array);
                c.v.update(array);

                c.setData(array);

                var params = {};

                $('form#recordsetting_continuous').bind("EVT_SCHED_CHANGE", function(event, newdata, day) {
                    var data = c.m.data;

                    var str = $('form#recordsetting_continuous input#mode'+day).val();
                    str = newdata[day] + str.slice(newdata[day].length);
                    //sched
                    $('form#recordsetting_continuous input#mode'+day).val(str);

                });

            });

            $('form#param select').change( function(event) {
              var dayobj = $('#schmodeSelect');
              var day = 0;
              var c = $z.current;
              var m = c.m;
              var v = c.v;
              var data = m.data;

              if ( v.paramWidget.selected.length <= 0 ) {
                alert(langArray['LTXT_ERR_SELECT_LEAST_ONE_HOUR']);
                event.preventDefault();
                return;
              }

              if ( data['schedule'] == 0) {
                day = 7;
              } else {
                day = parseInt($('#schmodeSelect').val());
              }

              var params = {};
              var hours = v.paramWidget.selected;

              var selects = $('form#param select');

              for (var i in selects) {
                params[selects[i].name] = selects[i].value;
              }

              for( var hr in hours ) {
                for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                  data['size' + day] = data['size' + day].setCharAt(hours[hr]*16+ch, params['paramsize'+ch]);
                  data['fps' + day] = data['fps' + day].setCharAt(hours[hr]*16+ch, params['paramFps'+ch]);
                  data['quality' + day] = data['quality' + day].setCharAt(hours[hr]*16+ch, params['paramQ'+ch]);
                  data['audio' + day] = data['audio' + day].setCharAt(hours[hr]*16+ch, params['paramAudio'+ch]);

                }
              }

              checkCameraCapable(data, true, 8);
              c.setCameraProfile(data, day, hours[0]);
              c.v.updateParam(data, hours[0]);

              // re-check if camera profile change the data set
              var params = {};
              var hours = v.paramWidget.selected;

              for (var i in selects) {
                params[selects[i].name] = selects[i].value;
              }

              for( var hr in hours ) {
                for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                  data['size' + day] = data['size' + day].setCharAt(hours[hr]*16+ch, params['paramsize'+ch]);
                  data['fps' + day] = data['fps' + day].setCharAt(hours[hr]*16+ch, params['paramFps'+ch]);
                  data['quality' + day] = data['quality' + day].setCharAt(hours[hr]*16+ch, params['paramQ'+ch]);
                  data['audio' + day] = data['audio' + day].setCharAt(hours[hr]*16+ch, params['paramAudio'+ch]);

                }
              }

              checkCameraCapable(data, true, 8);
              c.setCameraProfile(data, day, hours[0]);
              c.v.updateParam(data, hours[0]);

              c.m.updateData(data); // then, model notify data changed

              for( var day=0 ; day < 9 ; day++ ) {
                //param
                $('form#recordsetting_continuous input#size'+day).val(data['size'+day]);
                $('form#recordsetting_continuous input#fps'+day).val(data['fps'+day]);
                $('form#recordsetting_continuous input#quality'+day).val(data['quality'+day]);
                $('form#recordsetting_continuous input#audio'+day).val(data['audio'+day]);
              }

            });
        }
    },
    RecMotion: {
        actionUrl : '/cgi-bin/webra_fcgi.fcgi',

        setCameraProfile: function(array, day, hour) {
          if( typeof day == 'undefined' )
            day = hour = 0;

          var sizestr = array['size'+ day].substr(0, 16);

          setCamProfile(array, {
            sizeName: 'select#paramsize',
            fpsName: 'select#paramFps',
            inverse: false
          }, sizestr);
        },

        /**
         * Set Values into <input> element (with sysdb format value)
         */
        setParamForm: function(array) {
            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                $('input#size' + ch).val(array['size'+ch]);
                $('input#fps' + ch).val(array['fps'+ch]);
                $('input#quality' + ch).val(array['quality'+ch]);
                $('input#audio' + ch).val(array['audio'+ch]);
            }

        },

        paramCallback : function(index) {
            $z.log("motion" + index);
        },

        /**
         * Set Values into <input> element (with sysdb format data)
         */
        setSchedForm: function(array) {
            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                $('input#sched' + ch).val(array['size'+ch]);
            }
        },
        setData: function(array) {
            this.setSchedForm(array);
            this.setParamForm(array);

            for( var day=0 ; day < 9 ; day++ ) {
                //param
                $('form#recordsetting_motion input#size'+day).val(array['size'+day]);
                $('form#recordsetting_motion input#fps'+day).val(array['fps'+day]);
                $('form#recordsetting_motion input#quality'+day).val(array['quality'+day]);
                $('form#recordsetting_motion input#audio'+day).val(array['audio'+day]);

                //sched
                $('form#recordsetting_motion input#mode'+day).val(array['mode'+day]);
            }
        },
        index : function() {
            var c = this;

            var action = 'action=get_setup&menu=' + c.m.menu;

            for( var day=0 ; day < 9 ; day++ ) {
                $('form#recordsetting_motion').append(
                    $('<input type="hidden">').attr('name', 'size'+day).attr('id', 'size'+day),
                    $('<input type="hidden">').attr('name', 'fps'+day).attr('id', 'fps'+day),
                    $('<input type="hidden">').attr('name', 'quality'+day).attr('id', 'quality'+day),
                    $('<input type="hidden">').attr('name', 'audio'+day).attr('id', 'audio'+day),
                    $('<input type="hidden">').attr('name', 'mode'+day).attr('id', 'mode'+day)
                );
            }

            c.form('form#recordsetting_motion',
                function before() {
                  var isZeroFps = false,
                      fps = $('select[id^="paramFps"]');

                  for (var i = 0 ; i < INFO_DVRCHANNEL ; i += 1) {
                    if ( fps[i].value == fpsTable[0] ) {
                      isZeroFps = true;
                    }
                  }

                  if (isZeroFps == true) {
                    if (!confirm(langArray['LTXT_WARNING_0FPS'])) {
                      return -1;
                    }
                  }

                },
                function after() {

                }
            );

            $('form').bind('REC_SCHED_CHANGE', function(event, array, day) {
              for( var i in array ) {
                $('#mode'+i).val(array[i]);
              }
            });

            if( $z.debug ) {
                action += '&debug=';
            }
            c.v.init();

            $('#schmodeSelect1').change(function() {
                var day = parseInt($(this).val());

                c.v.schedWidget.updateByDay(day);
            });

            $('#schmodeSelect').change(function() {
                var day = parseInt($(this).val());

                c.v.paramWidget.updateByDay(day);
                c.v.updateParamByDay(day);
            });

            $('input#cancel').click( function (event) {
                c.m.revert();
                c.setCameraProfile(c.m.data);
                c.v.update(c.m.data);
                c.setData(c.m.data);
            });

            // array[schedule] 0: daily 1: weekly
            c.m.get(this.actionUrl, action , function (response) {
                var array = encode_to_array(response);

                var chk = [];
                authCheck = new AuthCheck(array);

                if( !authCheck.check('recset') ) {
                    AuthorityNoPermission();
                    history.back()
                    return;
                }

                array['camtype'] = getCameraType(array);

                if( array['recmode'] == '0' ) {
                    $('.manual-rec').each( function() {
                        $(this).find('a').bind('click', disabler);
                        $(this).addClass('disabled-menu');
                    });
                } else {
                    $('.manual-rec').each( function() {
                        $(this).find('a').unbind('click', disabler);
                        $(this).removeClass('disabled-menu');
                    });

                }

                c.recCalc = new RecordCalc(
                  array,
                  {
                    model: INFO_MODEL,
                    ch:INFO_DVRCHANNEL,
                    ispal:(INFO_CAMTYPE=="PAL"),
                    elem:"#rec-calc"
                  });

                checkCameraCapable(array, false, 8);
                c.setCameraProfile(array);

                c.m.initData(array);
                c.v.update(array);  // 3sec

                c.setData(array);

                $('form#recordsetting_motion').bind("EVT_SCHED_CHANGE", function(event, newdata, day) {
                    var data = c.m.data;

                    var str = $('form#recordsetting_motion #mode'+day).val();
                    str = newdata[day] + str.slice(newdata[day].length);
                    //sched
                    $('form#recordsetting_motion #mode'+day).val(str);
                });

                $('form#recordsetting_motion').bind("EVT_PARAM_CHANGE__", function(event, data) {
                    c.m.updateData(data); // then, model notify data changed

                    for( var day=0 ; day < 9 ; day++ ) {
                        //param
                        $('form#recordsetting_motion #size'+day).val(data['size'+day]);
                        $('form#recordsetting_motion #fps'+day).val(data['fps'+day]);
                        $('form#recordsetting_motion #quality'+day).val(data['quality'+day]);
                        $('form#recordsetting_motion #audio'+day).val(data['audio'+day]);

                    }

                });

            });

            $('form#param select').change( function(event) {
              var dayobj = $('#schmodeSelect');
              var day = 0;
              var c = $z.current;
              var m = c.m;
              var v = c.v;
              var data = m.data;

              if ( v.paramWidget.selected.length <= 0 ) {
                alert(langArray['LTXT_ERR_SELECT_LEAST_ONE_HOUR']);
                event.preventDefault();
                return;
              }

              if ( data['schedule'] == 0) {
                day = 7;
              } else {
                day = parseInt($('#schmodeSelect').val());
              }

              var params = {};
              var hours = v.paramWidget.selected;

              var selects = $('form#param select');

              for (var i in selects) {
                params[selects[i].name] = selects[i].value;
              }

              for( var hr in hours ) {
                for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                  data['size' + day] = data['size' + day].setCharAt(hours[hr]*16+ch, params['paramsize'+ch]);
                  data['fps' + day] = data['fps' + day].setCharAt(hours[hr]*16+ch, params['paramFps'+ch]);
                  data['quality' + day] = data['quality' + day].setCharAt(hours[hr]*16+ch, params['paramQ'+ch]);
                  data['audio' + day] = data['audio' + day].setCharAt(hours[hr]*16+ch, params['paramAudio'+ch]);

                }
              }

              checkCameraCapable(data, true, 8);
              c.setCameraProfile(data, day, hours[0]);
              c.v.updateParam(data, hours[0]);

              // re-check if camera profile change the data set
              var params = {};
              var hours = v.paramWidget.selected;

              for (var i in selects) {
                params[selects[i].name] = selects[i].value;
              }

              for( var hr in hours ) {
                for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                  data['size' + day] = data['size' + day].setCharAt(hours[hr]*16+ch, params['paramsize'+ch]);
                  data['fps' + day] = data['fps' + day].setCharAt(hours[hr]*16+ch, params['paramFps'+ch]);
                  data['quality' + day] = data['quality' + day].setCharAt(hours[hr]*16+ch, params['paramQ'+ch]);
                  data['audio' + day] = data['audio' + day].setCharAt(hours[hr]*16+ch, params['paramAudio'+ch]);

                }
              }

              checkCameraCapable(data, true, 8);
              c.setCameraProfile(data, day, hours[0]);
              c.v.updateParam(data, hours[0]);


              c.m.updateData(data); // then, model notify data changed


              for( var day=0 ; day < 9 ; day++ ) {
                //param
                $('form#recordsetting_motion input#size'+day).val(data['size'+day]);
                $('form#recordsetting_motion input#fps'+day).val(data['fps'+day]);
                $('form#recordsetting_motion input#quality'+day).val(data['quality'+day]);
                $('form#recordsetting_motion input#audio'+day).val(data['audio'+day]);

              }

            });
        }
    },
    RecAlarm: {
        actionUrl : '/cgi-bin/webra_fcgi.fcgi',

        setCameraProfile: function(array, day, hour) {
          if( typeof day == 'undefined' )
            day = hour = 0;

          var sizestr = array['size'+ day].substr(0, 16);

          setCamProfile(array, {
            sizeName: 'select#paramsize',
            fpsName: 'select#paramFps',
            inverse: false
          }, sizestr);
        },

        /**
         * Set Values into <input> element (with sysdb format value)
         */
        setParamForm: function(array) {
            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                $('input#size' + ch).val(array['size'+ch]);
                $('input#fps' + ch).val(array['fps'+ch]);
                $('input#quality' + ch).val(array['quality'+ch]);
                $('input#audio' + ch).val(array['audio'+ch]);
            }

        },

        paramCallback : function(index) {
            $z.log(index);
        },

        /**
         * Set Values into <input> element (with sysdb format data)
         */
        setSchedForm: function(array) {
            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                $('input#sched' + ch).val(array['size'+ch]);
            }
        },
        setData: function(array) {
            this.setSchedForm(array);
            this.setParamForm(array);

            for( var day=0 ; day < 9 ; day++ ) {
                //param
                $('form#recordsetting_alarm input#size'+day).val(array['size'+day]);
                $('form#recordsetting_alarm input#fps'+day).val(array['fps'+day]);
                $('form#recordsetting_alarm input#quality'+day).val(array['quality'+day]);
                $('form#recordsetting_alarm input#audio'+day).val(array['audio'+day]);

                //sched
                $('form#recordsetting_alarm input#mode'+day).val(array['mode'+day]);
            }
        },
        index : function() {
            var c = this;

            var action = 'action=get_setup&menu=' + c.m.menu;

            for( var day=0 ; day < 9 ; day++ ) {
                $('form#recordsetting_alarm').append(
                    $('<input type="hidden">').attr('name', 'size'+day).attr('id', 'size'+day),
                    $('<input type="hidden">').attr('name', 'fps'+day).attr('id', 'fps'+day),
                    $('<input type="hidden">').attr('name', 'quality'+day).attr('id', 'quality'+day),
                    $('<input type="hidden">').attr('name', 'audio'+day).attr('id', 'audio'+day),
                    $('<input type="hidden">').attr('name', 'mode'+day).attr('id', 'mode'+day)
                );
            }

            c.form('form#recordsetting_alarm',
                function before() {
                  var isZeroFps = false,
                      fps = $('select[id^="paramFps"]');

                  for (var i = 0 ; i < INFO_DVRCHANNEL ; i += 1) {
                    if ( fps[i].value == fpsTable[0] ) {
                      isZeroFps = true;
                    }
                  }

                  if (isZeroFps == true) {
                    if (!confirm(langArray['LTXT_WARNING_0FPS'])) {
                      return -1;
                    }
                  }

                },
                function after() {

                }
            );

            $('form').bind('REC_SCHED_CHANGE', function(event, array, day) {
              for( var i in array ) {
                $('#mode'+i).val(array[i]);
              }
            });

            if( $z.debug ) {
                action += '&debug=';
            }
            c.v.init();

            $('#schmodeSelect1').change(function() {
                var day = parseInt($(this).val());

                c.v.schedWidget.updateByDay(day);
            });

            $('#schmodeSelect').change(function() {
                var day = parseInt($(this).val());

                c.v.paramWidget.updateByDay(day);
                c.v.updateParamByDay(day);
            });

            $('input#cancel').click( function (event) {
                c.m.revert();
                c.setCameraProfile(c.m.data);
                c.v.update(c.m.data);
                c.setData(c.m.data);
            });

            // array[schedule] 0: daily 1: weekly
            c.m.get(this.actionUrl, action , function (response) {
                var array = encode_to_array(response);

                var chk = [];
                authCheck = new AuthCheck(array);

                if( !authCheck.check('recset') ) {
                    AuthorityNoPermission();
                    history.back()
                    return;
                }

                array['camtype'] = getCameraType(array);

                if( array['recmode'] == '0' ) {
                    $('.manual-rec').each( function() {
                        $(this).find('a').bind('click', disabler);
                        $(this).addClass('disabled-menu');
                    });
                } else {
                    $('.manual-rec').each( function() {
                        $(this).find('a').unbind('click', disabler);
                        $(this).removeClass('disabled-menu');
                    });

                }

                c.recCalc = new RecordCalc(
                  array,
                  {
                    model: INFO_MODEL,
                    ch:INFO_DVRCHANNEL,
                    ispal:(INFO_CAMTYPE=="PAL"),
                    elem:"#rec-calc"
                  });


                checkCameraCapable(array, false, 8);
                c.setCameraProfile(array);
                c.m.initData(array);
                c.v.update(array);

                c.setData(array);

                $('form#recordsetting_alarm').bind("EVT_SCHED_CHANGE", function(event, newdata, day) {
                    var data = c.m.data;

                    var str = $('form#recordsetting_alarm #mode'+day).val();
                    str = newdata[day] + str.slice(newdata[day].length);
                    //sched
                    $('form#recordsetting_alarm #mode'+day).val(str);

                });

                $('form#recordsetting_alarm').bind("EVT_PARAM_CHANGE__", function(event, data) {
                    c.m.updateData(data); // then, model notify data changed

                    for( var day=0 ; day < 9 ; day++ ) {
                        //param
                        $('form#recordsetting_alarm #size'+day).val(data['size'+day]);
                        $('form#recordsetting_alarm #fps'+day).val(data['fps'+day]);
                        $('form#recordsetting_alarm #quality'+day).val(data['quality'+day]);
                        $('form#recordsetting_alarm #audio'+day).val(data['audio'+day]);

                    }

                });
            });

            $('form#param select').change( function(event) {
              var dayobj = $('#schmodeSelect');
              var day = 0;
              var c = $z.current;
              var m = c.m;
              var v = c.v;
              var data = m.data;

              if ( v.paramWidget.selected.length <= 0 ) {
                alert(langArray['LTXT_ERR_SELECT_LEAST_ONE_HOUR']);
                event.preventDefault();
                return;
              }

              if ( data['schedule'] == 0) {
                day = 7;
              } else {
                day = parseInt($('#schmodeSelect').val());
              }

              var params = {};
              var hours = v.paramWidget.selected;

              var selects = $('form#param select');

              for (var i in selects) {
                params[selects[i].name] = selects[i].value;
              }

              for( var hr in hours ) {
                for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                  data['size' + day] = data['size' + day].setCharAt(hours[hr]*16+ch, params['paramsize'+ch]);
                  data['fps' + day] = data['fps' + day].setCharAt(hours[hr]*16+ch, params['paramFps'+ch]);
                  data['quality' + day] = data['quality' + day].setCharAt(hours[hr]*16+ch, params['paramQ'+ch]);
                  data['audio' + day] = data['audio' + day].setCharAt(hours[hr]*16+ch, params['paramAudio'+ch]);

                }
              }

              checkCameraCapable(data, true, 8);
              c.setCameraProfile(data, day, hours[0]);
              c.v.updateParam(data, hours[0]);

              // re-check if camera profile change the data set
              var params = {};
              var hours = v.paramWidget.selected;

              for (var i in selects) {
                params[selects[i].name] = selects[i].value;
              }

              for( var hr in hours ) {
                for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                  data['size' + day] = data['size' + day].setCharAt(hours[hr]*16+ch, params['paramsize'+ch]);
                  data['fps' + day] = data['fps' + day].setCharAt(hours[hr]*16+ch, params['paramFps'+ch]);
                  data['quality' + day] = data['quality' + day].setCharAt(hours[hr]*16+ch, params['paramQ'+ch]);
                  data['audio' + day] = data['audio' + day].setCharAt(hours[hr]*16+ch, params['paramAudio'+ch]);

                }
              }

              checkCameraCapable(data, true, 8);
              c.setCameraProfile(data, day, hours[0]);
              c.v.updateParam(data, hours[0]);

              c.m.updateData(data); // then, model notify data changed

              for( var day=0 ; day < 9 ; day++ ) {
                //param
                $('form#recordsetting_alarm input#size'+day).val(data['size'+day]);
                $('form#recordsetting_alarm input#fps'+day).val(data['fps'+day]);
                $('form#recordsetting_alarm input#quality'+day).val(data['quality'+day]);
                $('form#recordsetting_alarm input#audio'+day).val(data['audio'+day]);

              }

            });
        }
    },
    RecPanic: {
        actionUrl : '/cgi-bin/webra_fcgi.fcgi',

        /**
         * Set Values into <input> element (with sysdb format value)
         */
        setParamForm: function(array) {
            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                $('input#size' + ch).val(array['size'+ch]);
                $('input#fps' + ch).val(array['fps'+ch]);
                $('input#quality' + ch).val(array['quality'+ch]);
                $('input#audio' + ch).val(array['audio'+ch]);
            }

        },
        setCameraProfile: function(array, day, hour) {
          var sizestr = array['size'].substr(0, 16);

          setCamProfile(array, {
            sizeName: 'select#size',
            fpsName: 'select#fps',
            inverse: false

          }, sizestr);
        },
        index : function() {
            var c = this;

            var action = 'action=get_setup&menu=' + c.m.menu;

            c.form('form',
                function before() {
                  var isZeroFps = false,
                      fps = $('select[id^="fps"]');

                  for (var i = 0 ; i < INFO_DVRCHANNEL ; i += 1) {
                    if ( fps[i].value == fpsTable[0] ) {
                      isZeroFps = true;
                    }
                  }

                  if (isZeroFps == true) {
                    if (!confirm(langArray['LTXT_WARNING_0FPS'])) {
                      return -1;
                    }
                  }

                },
                function after() {

                }
            );

            if( $z.debug ) {
                action += '&debug=';
            }
            c.v.init();

            $('#schmodeSelect1').change(function() {
                var day = parseInt($(this).val());

                c.v.schedWidget.updateByDay(day);
            });

            $('#schmodeSelect').change(function() {
                var day = parseInt($(this).val());

                c.v.paramWidget.updateByDay(day);
                c.v.updateParamByDay(day);
            });

            $('input#cancel').click( function (event) {
                c.m.revert();
                c.setCameraProfile(c.m.data);
                c.v.update(c.m.data);
            });

            c.m.get(this.actionUrl, action , function (response) {
                var array = encode_to_array(response);

                var chk = [];
                authCheck = new AuthCheck(array);

                if( !authCheck.check('recset') ) {
                    AuthorityNoPermission();
                    history.back()
                    return;
                }

                array['camtype'] = getCameraType(array);

                if( array['recmode'] == '0' ) {
                    $('.manual-rec').each( function() {
                        $(this).find('a').bind('click', disabler);
                        $(this).addClass('disabled-menu');
                    });
                } else {
                    $('.manual-rec').each( function() {
                        $(this).find('a').unbind('click', disabler);
                        $(this).removeClass('disabled-menu');
                    });

                }

                c.recCalc = new RecordCalc(
                  array,
                  {
                    model: INFO_MODEL,
                    ch:INFO_DVRCHANNEL,
                    ispal:(INFO_CAMTYPE=="PAL"),
                    elem:"#rec-calc"
                  });


                checkCameraCapable(array, false, 1);
                c.setCameraProfile(array);
                c.m.initData(array);
                c.v.update(array);
                $('#c_sp_div_menubar_sub').show();
                $('#c_sp_div_contents').show();
            });

            $('form select').change( function(event) {
              var c = $z.current;
              var m = c.m;
              var v = c.v;
              var data = m.data;

              var params = {};
              var selects = $('form select');

              for (var i in selects) {
                params[selects[i].name] = selects[i].value;
              }

              for ( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                data['size'] = data['size'].setCharAt(ch, params['size'+ch]);
                data['fps'] = data['fps'].setCharAt(ch, params['fps'+ch]);
                data['quality'] = data['quality'].setCharAt(ch, params['quality'+ch]);
                data['audio'] = data['audio'].setCharAt(ch, params['audio'+ch]);
              }
              checkCameraCapable(data, false, 1);
              c.setCameraProfile(data);
              c.v.update(data);

              // re-check if camera profile change the data set
              var params = {};

              for (var i in selects) {
                params[selects[i].name] = selects[i].value;
              }

              for ( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                data['size'] = data['size'].setCharAt(ch, params['size'+ch]);
                data['fps'] = data['fps'].setCharAt(ch, params['fps'+ch]);
                data['quality'] = data['quality'].setCharAt(ch, params['quality'+ch]);
                data['audio'] = data['audio'].setCharAt(ch, params['audio'+ch]);
              }
              checkCameraCapable(data, false, 1);
              c.setCameraProfile(data);

              c.m.updateData(data); // then, model notify data changed
              c.v.update(data);
            });
        }
    },
    NetStream: {
        actionUrl : '/cgi-bin/webra_fcgi.fcgi',

        setCameraProfile: function(array, day, hour) {
          var sizestr = array['size'].substr(0, 16);

          setCamProfile(array, {
            fpsName: 'select#fps',
            inverse: false
          }, sizestr);
        },
        /**
         * Set Values into <input> element (with sysdb format value)
         */
        setParamForm: function(array) {
            for( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                $('input#size' + ch).val(array['size'+ch]);
                $('input#fps' + ch).val(array['fps'+ch]);
                $('input#quality' + ch).val(array['quality'+ch]);
                $('input#audio' + ch).val(array['audio'+ch]);
            }

        },
        index : function() {
            var c = this;

            var action = 'action=get_setup&menu=' + c.m.menu;

            c.form('form',
                function before() {
                  var isZeroFps = false,
                      fps = $('select[id^="fps"]');

                  for (var i = 0 ; i < INFO_DVRCHANNEL ; i += 1) {
                    if ( fps[i].value == fpsTable[0] ) {
                      isZeroFps = true;
                    }
                  }

                  if (isZeroFps == true) {
                    if (!confirm(langArray['LTXT_WARNING_0FPS'])) {
                      return -1;
                    }
                  }

                },
                function after() {

                }
            );

            if( $z.debug ) {
                action += '&debug=';
            }
            c.v.init();

            $('input#cancel').click( function (event) {
                c.m.revert();
                c.setCameraProfile(c.m.data);
                c.v.update(c.m.data);
            });

            c.m.get(this.actionUrl, action , function (response) {
                var array = encode_to_array(response);

                var chk = [];
                authCheck = new AuthCheck(array);

                if( !authCheck.check('recset') ) {
                    AuthorityNoPermission();
                    history.back()
                    return;
                }

                array['camtype'] = getCameraType(array);

                if( array['recmode'] == '0' ) {
                    $('.manual-rec').each( function() {
                        $(this).find('a').bind('click', disabler);
                        $(this).addClass('disabled-menu');
                    });
                } else {
                    $('.manual-rec').each( function() {
                        $(this).find('a').unbind('click', disabler);
                        $(this).removeClass('disabled-menu');
                    });

                }
                c.recCalc = new RecordCalc(
                  array,
                  {
                    model: INFO_MODEL,
                    ch:INFO_DVRCHANNEL,
                    ispal:(INFO_CAMTYPE=="PAL"),
                    elem:"#rec-calc"
                  }
                );

                c.m.initData(array);
                checkCameraCapable(array, true);
                c.setCameraProfile(array);
                c.v.update(array);
                $('#c_sp_div_menubar_sub').show();
                $('#c_sp_div_contents').show();
            });

            $('form select').change( function(event) {
              var c = $z.current;
              var m = c.m;
              var v = c.v;
              var data = m.data;

              var params = {};

              var selects = $('form select');

              for (var i in selects) {
                params[selects[i].name] = selects[i].value;
              }

              for ( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                data['size'] = data['size'].setCharAt(ch, params['size'+ch]);
                data['fps'] = data['fps'].setCharAt(ch, params['fps'+ch]);
                data['quality'] = data['quality'].setCharAt(ch, params['quality'+ch]);
              }
              checkCameraCapable(data, true, 1);
              c.setCameraProfile(data);
              c.v.update(data);

              // re-check if camera profile change the data set
              var params = {};

              for (var i in selects) {
                params[selects[i].name] = selects[i].value;
              }

              for ( var ch=0 ; ch < INFO_DVRCHANNEL ; ch++ ) {
                data['size'] = data['size'].setCharAt(ch, params['size'+ch]);
                data['fps'] = data['fps'].setCharAt(ch, params['fps'+ch]);
                data['quality'] = data['quality'].setCharAt(ch, params['quality'+ch]);
              }
              checkCameraCapable(data, false, 1);
              c.setCameraProfile(data);

              c.m.updateData(data); // then, model notify data changed
              c.v.update(data);
            });
        }
    },
    StorageCalc: {
        actionUrl : '/cgi-bin/webra_fcgi.fcgi',
        index : function() {
            var c = this;

            var action = 'action=get_setup&menu=' + c.m.menu;

            c.form('form',
                function before() {

                },
                function after() {

                }
            );

            if( $z.debug ) {
                action += '&debug=';
            }
            c.v.init();

            c.m.get(this.actionUrl, action , function (response) {
                var array = encode_to_array(response);
                var chk = [];
                authCheck = new AuthCheck(array);

                if( !authCheck.check('recset') ) {
                    AuthorityNoPermission();
                    history.back()
                    return;
                }

                c.v.update(array);
                c.m.initData(array);
            });
        }
    },
  RecAudioMap: {
    actionUrl : '/cgi-bin/webra_fcgi.fcgi',
    index : function() {

      var c = this;
      var action = 'action=get_setup&menu=' + c.m.menu;

      c.form('form',
        function before() {},
        function after() {}
      );
      if( $z.debug ) {
        action += '&debug=';
      }

      c.v.init();

      $('input#cancel').click( function (event) {
        c.m.revert();
        c.v.update(c.m.data);
      });

      $('#audio_in').change( function () {
        if (this.value == 0 )
          return;
        for (var i = 0 ; i < INFO_DVRCHANNEL ; i += 1) {
          makeSelectSelected('#audio_in' + i, this.value - 1);
        }
        makeSelectSelected('#audio_in', 0);
      });

      for (var i = 0; i < INFO_DVRCHANNEL; i += 1) {
        $('#audio_in' + i).change( function () {
          c.m.setDataAt('audio_ch', parseInt(this.id.slice(8)), this.value);
        });
      }

      c.m.get(this.actionUrl, action , function (response) {
        var array = encode_to_array(response);
        var chk = [];
        authCheck = new AuthCheck(array);
        if( !authCheck.check('recset') ) {
          AuthorityNoPermission();
          history.back()
          return;
        }
        if( array['recmode'] == '0' ) {
          $('.manual-rec').each( function() {
            $(this).find('a').bind('click', disabler);
            $(this).addClass('disabled-menu');
          });
        } else {
          $('.manual-rec').each( function() {
            $(this).find('a').unbind('click', disabler);
            $(this).removeClass('disabled-menu');
          });
        }
        c.v.update(array);
        c.m.initData(array);
      });
    }
  }
});
