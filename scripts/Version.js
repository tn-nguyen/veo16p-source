var Version = function() {
  // default version unless version is specified
  this.activexver = '1.2.7.3';

  if( getActiveXInfo ) {
    this.axInfo = getActiveXInfo();
    this.activexver = this.axInfo.data.WebViewer.Version;
  }

    this.webver = '2.7.3';
    this.relDate = '140627';

    this.version = 'WEB_v' + this.webver + "_" + this.activexver + "_" + this.relDate;

    this.authCheck = new AuthCheck();
};

Version.prototype = {
    infoheader : '',
    info1 : '',
    info2 : '',
    info3 : '',

    request: function() {
        var me = this;
        if(INFO_MODEL.indexOf('UTM5X') > 0)
          checkFwUpdateStatus();
        $.ajaxSetup({async:false});
        $.post(
            '/cgi-bin/webra_fcgi.fcgi',
            'action=get_info&menu=verinfo.info',
            function(response) {
                var data = encode_to_array(response);
                me.authCheck.reset(data, 'info');
            }
        );
    },
    makeinfo : function() {
    	var link = "/cgi-bin/webra_fcgi.fcgi?action=get_log&menu=nand";

        var model = INFO_MODEL.substring(5, INFO_MODEL.length - 2) + langArray['LTXT_CAMCH']
             + ' / ' + INFO_MODEL.substring(INFO_MODEL.length - 2, INFO_MODEL.length) + '0' + langArray['LTXT_RECTITLE_FPS'];

        var model_array = INFO_MODEL.split("_");
        model = model_array[2].substring(0, 2) + langArray['LTXT_CAMCH'] + " / " + model_array[2].substring(2, 4) + '0' + langArray['LTXT_RECTITLE_FPS'];

        if(INFO_VENDOR == 'CBC') {
          this.infoheader = 'CBC Web Viewer Information';
          this.info1 = 'HVR Model : ' + model;
          this.info2 = 'WEB Version : ' + this.version;
          this.info3 = 'Copyright &copy;2010 CBC Technologies Inc.';
        } else if (INFO_MODEL.indexOf("IPX") >= 0 ) {
          this.infoheader = 'Web Viewer Information';
          this.info1 = 'HVR Model : ' + model;
          this.info2 = 'WEB Version : ' + this.version;
        } else if (INFO_VENDOR == 'ALSOK' || INFO_VENDOR == 'TAKENAKA') {
          this.infoheader = 'Web Viewer Information';
          this.info1 = 'DVR Model : ' + sprintf("DR-C%03d-C", model_array[2].substring(0, 2))
              + ' / ' + model_array[2].substring(2, 4) + '0' + langArray['LTXT_RECTITLE_FPS'];
          this.info2 = 'WEB Version : ' + this.version;
        } else if (INFO_VENDOR.indexOf("I3DVR") >= 0) {
            this.infoheader = 'Web Viewer Information';
          //this.info1 = 'DVR Model : ' + model;
          this.info1 = 'HVR Model : ' + 'Veo' + model_array[2].substring(0, 2) + 'p';//  + " / " + model_array[2].substring(2, 4) + '0' + langArray['LTXT_RECTITLE_FPS'];
          this.info2 = 'WEB Version : ' + this.version;
          this.info3 = "&copy; Copyright 2018 i3international Inc."
        } else {
          this.infoheader = 'Web Viewer Information';
          this.info1 = 'DVR Model : ' + model;
          this.info2 = 'WEB Version : ' + this.version;
        }
    },
    update: function() {
        this.request();

        if( !this.authCheck.check('setup') ) {
          alert(errNoPermission);
          history.back();
          return;
        }

        this.makeinfo();

        $('#infoheader').html(this.infoheader);
        $('#infobody1').html(this.info1);
        $('#infobody2').html(this.info2);
        $('#infobody3').html(this.info3);
    },
    encode: function() {
        return escape(this.version);
    }
};

var $VER = new Version();

