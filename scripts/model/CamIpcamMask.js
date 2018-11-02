var CompatibilityImageObject = {
    "IMAGE_ONVIF_BRIGHTNESS"         : null,
    "IMAGE_ONVIF_CONTRAST"           : null,
    "IMAGE_ONVIF_SHARPNESS"          : null,
    "IMAGE_ONVIF_COLOR"              : null,
    "IMAGE_ONVIF_FOCUS_MODE"         : null,
    "IMAGE_ONVIF_FOCUS_DEFAULTSPEED" : null,
    "IMAGE_ONVIF_FOCUS_NEARLIMIT"    : null,
    "IMAGE_ONVIF_FOCUS_FARLIMIT"     : null,
    "IMAGE_ONVIF_FOCUS_ONEPUSH"      : null,
    "IMAGE_ONVIF_FOCUS_ABPOSITION"   : null,
    "IMAGE_ONVIF_FOCUS_ABSPEED"      : null,
    "IMAGE_ONVIF_FOCUS_REDISTANCE"   : null,
    "IMAGE_ONVIF_FOCUS_RESPEED"      : null,
    "IMAGE_ONVIF_FOCUS_COSPEED"      : null,
    "IMAGE_ONVIF_WB_MODE"            : null,
    "IMAGE_ONVIF_WB_CRGAIN"          : null,
    "IMAGE_ONVIF_WB_CBGAIN"          : null,
     /*"IMAGE_ONVIF_IRCUT"              : null,*/
    "IMAGE_ONVIF_ROTATION"           : null,
    "IMAGE_ONVIF_FOCUS_HOME"         : null,
    /*"IMAGE_ONVIF_BLC_MODE"           : null,
    "IMAGE_ONVIF_BLC_LEVEL"          : null,*/
    "IMAGE_ONVIF_WB_PRESET"          : null,
    "IMAGE_ONVIF_TINT"               : null,
    /*"IMAGE_ONVIF_DNN_TOGGLE"         : null,*/
    "IMAGE_ONVIF_FOCUS_NEAR"         : null,
    "IMAGE_ONVIF_FOCUS_FAR"          : null,
    "IMAGE_ONVIF_FOCUS_LIMIT"        : null,
    "IMAGE_ONVIF_STABILIZER"         : null,
    "IMAGE_ONVIF_IRCORRECTION"       : null
}

//static
var CompatibilityExposureObject = {
  "EXPOSURE_ONVIF_MODE"      : null,
  "EXPOSURE_ONVIF_PRIORITY"  : null,
  "EXPOSURE_ONVIF_MINETIME"  : null,
  "EXPOSURE_ONVIF_MAXETIME"  : null,
  "EXPOSURE_ONVIF_ETIME"     : null,
  "EXPOSURE_ONVIF_MINGAIN"   : null,
  "EXPOSURE_ONVIF_MAXGAIN"   : null,
  "EXPOSURE_ONVIF_GAIN"      : null,
  "EXPOSURE_ONVIF_MINIRIS"   : null,
  "EXPOSURE_ONVIF_MAXIRIS"   : null,
  "EXPOSURE_ONVIF_IRIS"      : null,
  //"EXPOSURE_ONVIF_BOTTOM"    : null,
  //"EXPOSURE_ONVIF_TOP"       : null,
  //"EXPOSURE_ONVIF_RIGHT"     : null,
  //"EXPOSURE_ONVIF_LEFT"      : null,
  "EXPOSURE_SLOWSHUTTER"     : null,
  "EXPOSURE_MAXAGC"          : null,
  "EXPOSURE_DCIRIS"          : null,
  "EXPOSURE_ANTI_FLICKER"           : null,
  "EXPOSURE_MAX_SHUTTER_50"         : null,
  "EXPOSURE_MAX_SHUTTER_60"         : null,
  "EXPOSURE_MAX_SHUTTER_OFF"        : null,
  "EXPOSURE_ONVIF_BLC_MODE"  : null,
  "EXPOSURE_ONVIF_BLC_LEVEL" : null,
  "EXPOSURE_ONVIF_WDR_MODE"  : null,
  "EXPOSURE_ONVIF_WDR_LEVEL" : null,
  "EXPOSURE_ONVIF_DNR_MODE"  : null,
  "EXPOSURE_ONVIF_IRCUT"     : null,

  "EXPOSURE_ONVIF_DNN_TOGGLE" : null,
  "EXPOSURE_ONVIF_ADAPTIVE_IR" : null,

  "EXPOSURE_ONVIF_DNN_SENSE_NTOD" : null
}

var CompatibilityExposureObject_high = {
/*32*/  "EXPOSURE_ONVIF_DNN_SENSE_DTON" : null,
/*33*/  "EXPOSURE_ONVIF_DEFOG" : null,
/*34*/  "EXPOSURE_ONVIF_HLC" : null,
/*35*/  "EXPOSURE_ONVIF_IRCUT_M"   : null,

/*36*/  "EXPOSURE_MAX_SHUTTER_MOTION_OFF": null,
/*37*/  "EXPOSURE_ONVIF_DC_IRIS_CAL": null,
/*38*/  "EXPOSURE_ANTI_FLICKER_MOTION": null,

/*39*/  "EXPOSURE_MAX_SHUTTER_MOTION_OFF_ON": null,
/*40*/  "EXPOSURE_MAX_SHUTTER_AUTO_OFF_OFF": null,
/*41*/  "EXPOSURE_MAX_SHUTTER_AUTO_OFF_ON_TV": null,
/*42*/  "EXPOSURE_MAX_SHUTTER_AUTO_OFF_ON": null,
/*43*/  "EXPOSURE_ANTI_FLICKER_MOTION_OFF": null,
/*44*/  "EXPOSURE_ANTI_FLICKER_AUTO_OFF": null,
/*45*/  "EXPOSURE_BASE_SHUTTER_50": null,
/*46*/  "EXPOSURE_BASE_SHUTTER_60": null,
/*47*/  "EXPOSURE_BASE_SHUTTER_100": null,
/*48*/  "EXPOSURE_BASE_SHUTTER_120": null,
/*49*/  "EXPOSURE_BASE_SHUTTER_100_300": null,
/*50*/  "EXPOSURE_BASE_SHUTTER_100_5000": null,
/*51*/  "EXPOSURE_BASE_SHUTTER_120_360": null,
/*52*/  "EXPOSURE_BASE_SHUTTER_120_5000": null,
/*53*/  "EXPOSURE_BASE_SHUTTER_120_262": null,
/*54*/  "EXPOSURE_BASE_SHUTTER_30_262": null,
/*55*/  "EXPOSURE_BASE_SHUTTER_25_100": null,
/*56*/  "EXPOSURE_BASE_SHUTTER_25_300": null,
/*57*/  "EXPOSURE_BASE_SHUTTER_25_5000": null,
/*58*/  "EXPOSURE_BASE_SHUTTER_30_120": null,
/*59*/  "EXPOSURE_BASE_SHUTTER_30_360": null,
/*60*/  "EXPOSURE_BASE_SHUTTER_30_5000": null,
/*61*/  "EXPOSURE_DCIRIS_MOTION": null,
/*62*/  "EXPOSURE_ONVIF_DNN_SCHEDULE_START_HOUR" : null,
/*63*/  "EXPOSURE_ONVIF_DNN_SCHEDULE_START_MIN" : null,
/*64*/  "EXPOSURE_ONVIF_DNN_SCHEDULE_END_HOUR" : null,
/*65*/  "EXPOSURE_ONVIF_DNN_SCHEDULE_END_MIN" : null
}

var CompatibilityFocusObject = {
  "FOCUS_TEM_COMP" : null,
  "FOCUS_DNN_COMP" : null
}

//class

var CompatibilityValueObject = function(category, category_high, value, dependent, dependent_high, difference) {
  if (category != null || category != undefined)
    this.category = category;
  else
    this.category = null;
  
  if (category_high != null || category_high != undefined)
    this.category_high = category_high;
  else
    this.category_high = null;

  if (value != null || value != undefined)
    this.value = value;
  else
    this.value = null;
  
  if (dependent != null || dependent != undefined)
    this.dependent_category = dependent;
  else
    this.dependent_category = null;

  if (dependent_high != null || dependent_high != undefined)
    this.dependent_category_high = dependent;
  else
    this.dependent_category_high = null;

  if (difference != null || difference != undefined)
    this.difference = difference;
  else
    this.difference = null;
}

var CompatibilityOptionObject = function() {
  this.category = null;
  this.category_high = null;
  this.value = null;
  this.selected = null; // 0= false; 1= true
  this.dependent_category = null;
  this.dependent_category_high = null;
  this.enable_category = null;
  this.enable_category_high = null;
  this.disable_category = null;
  this.disable_category_high = null;
  this.visible_category = null;
  this.visible_category_high = null;
  this.invisible_category = null;
  this.invisible_category_high = null;
  this.caption = null;
  this.difference = null;
}

