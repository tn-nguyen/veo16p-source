var analogtypeCalculator = {
  get_signal_from_type: function(param_type){
    var result=0; //TVI=0, AHD=1. default is 0.

    param_type==9
      || param_type==26/*3M CVI*/
      || param_type==27/*4M CVI*/
      || param_type==28/*5M CVI*/
      || param_type==29/*6M CVI*/
      || param_type==30/*QHD CVI*/
      || param_type==31/*8M CVI*/
        ? result=2/*CVI*/
    : param_type==0 /*TVI G*/
      || param_type==1 /*TVI H*/
      || param_type==3 /*EXSDI*/
      || param_type==4 /*SD*/
      || param_type==5 /*HDSDI*/
      || param_type==6 /*3M*/
      || param_type==7 /*5M*/
      //|| param_type==9 /*CVI*/
      || param_type==6 /*3M TVI*/
      || param_type==13 /*4M TVI*/
      || param_type==16 /*6M TVI*/
      || param_type==18 /*8M TVI*/
      || param_type==20 /*QHD TVI*/
        ? result=0/*TVI*/
    : result=1/*AHD*/;

    return result;
  },
  get_resolution_from_type: function(param_type){
    var result=0; //2M=0, 3M=1, 3.7M=2, 4M=3, 5M=4

    (param_type==0||param_type==1||param_type==3||param_type==4||param_type==5) ? result=0
      : (param_type==6||param_type==11) ? result=1
      : (param_type==20||param_type==21) ? result=2
      : (param_type==12||param_type==13) ? result=3
      : (param_type==7||param_type==15) ? result=4
      : result=0

    return result;
  },
  get_input_type_from_type: function(param_type){
    var result=0; //0: analog, 1: ipcamera

    param_type==8 ? result=1 : result=0;

    return result;
  },
  make_type_value_from_others_information: function(param_input_type,
                                                    param_signal_type,
                                                    param_resolution) {
    var result_analogtype=0;

    param_input_type==0 ?
      //tvi camera
      param_signal_type==2 ?
        param_resolution==0 ? result_analogtype=9 //2M CVI
        :param_resolution==1 ? result_analogtype=26 //3M CVI
        :param_resolution==2 ? result_analogtype=27 //4M CVI
        :param_resolution==3 ? result_analogtype=28 //5M CVI
        :param_resolution==4 ? result_analogtype=29 //6M CVI
        :param_resolution==5 ? result_analogtype=30 //QHD CVI
        :result_analogtype=31 //8M CVI
      :param_signal_type==0 ?
        param_resolution==0 ? result_analogtype=0 //2M TVI
        :param_resolution==1 ? result_analogtype=6 //3M TVI
        :param_resolution==2 ? result_analogtype=20 //QHD TVI
        :param_resolution==3 ? result_analogtype=13 //4M TVI
        :param_resolution==4 ? result_analogtype=7 //5M TVI
        //default is 2M General.
        :result_analogtype=0
      //ahd camera.
      :param_resolution==0 ? result_analogtype=2 //2M AHD
      :param_resolution==1 ? result_analogtype=11 //3M AHD
      :param_resolution==2 ? result_analogtype=21 //QHD AHD
      :param_resolution==3 ? result_analogtype=12 //4M AHD
      :param_resolution==4 ? result_analogtype=15 //5M AHD
      //default is 2M AHD.
      :result_analogtype=2
    //ip camera.
    :result_analogtype=8;


    return result_analogtype;
  }
}
