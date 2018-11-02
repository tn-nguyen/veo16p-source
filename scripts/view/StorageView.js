/**
 * @author chcha
 */

/**
 * The round() method rounds a number to the nearest number.
 *
 * @param f
 *  number want to round
 * @param n
 *  number of decimal under 0
 **/
function round(f, n) {
  if( n != null && n > 0 ) {
    var a = Math.pow(10, n);
    return Math.round(f * a) / a;
  }

  return Math.round(f);
}

function calc_capa(str_capa) {
  var num;
  var strCapa;

  try {
    num = parseInt(str_capa);

    if( num == NaN ) {
      strCapa = 'x';
    } else if( num > 1024 * 1024 * 1024) {
      // TB
      var b = num / 1024 / 1024 / 1024;
      strCapa = round(b, 1) + ' TB';
    } else if( num > 1024 * 1024 ) {
      // GB
      var b = num / 1024 / 1024;
      strCapa = round(b, 1) + ' GB';
    } else if( num > 1024 ) {
      // MB
      var b = num / 1024;
      strCapa = round(b, 1) + ' MB';
    }

  } catch (e) {
    $z.error(e);
  }

  return strCapa;
}

/*
var dstatus = {
    0: 'NOT IN USE',
    1: 'IN USE'
};

var smart_status = {
    0: 'NORMAL',
    1: 'NORMAL',
    2: 'CHECK',
    3: 'ERROR',
    100: '-'
};
*/
var dstatus = {
    0: langArray['LTXT_NOTINUSE'],
    1: langArray['LTXT_INUSE']
};

var smart_status = {
    0: langArray['LTXT_NORMAL'],
    1: langArray['LTXT_NORMAL'],
    2: langArray['LTXT_CHECK'],
    3: langArray['LTXT_ERROR'],
    100: '-'
};

var MAX_DISK_IN = 5;
var MAX_DISK_EX = 16;

$z.v({
    StorageDiskinfo : {
        init: function() {
            if (INFO_VENDOR === 'ALSOK') {
                MAX_DISK_IN = 2;
                MAX_DISK_EX = 0;
                $(".remove_alsok").hide();
            }
            else if(INFO_VENDOR == 'TAKENAKA') {
                $(".remove_alsok").hide();
            }
        },
        update: function(array) {
            var diskcount;
            var strCapa = '';
            var hw_ver = array['hw_ver'];
            var support_hdd_cnt = 0;

            if(hw_ver != null && hw_ver.length > 0) {
              support_hdd_cnt = parseInt(hw_ver.slice(-2).split('A')[0]); //SUPPOSE MAX HDD COUNT IS 9.
            }

            $('input#trec_start').val(array['tstart']);
            $('input#trec_end').val(array['tend']);

            $('select#overwrite').val(array['overwrite']);
            $('select#timelimit').val(array['timelimit']);

            //INTERNAL
            diskcount = parseInt(array['in_count']);

            if( diskcount > MAX_DISK_IN ) {
                // if diskcount is more than number of rows of table drawn already
                diskcount = MAX_DISK_IN; // can't be over
            }

            strCapa = calc_capa(array['in_tsize']);

            if(strCapa == undefined) {
              $('td#in_capacity_all').html("-");
            } else {
            $('td#in_capacity_all').html(strCapa);
            }
            $('td#in_tstart').html(array['in_tstart']);
            $('td#in_tend').html(array['in_tend']);

            if((INFO_MODEL.indexOf('UTM5G') > 0 || INFO_MODEL.indexOf('UTM5X') > 0)
              && support_hdd_cnt >= 2) {
              //HDD NUMBER IS REVERSED IN UTM5G.
              var reversed_index = 0;
              var reversed_index_list = [];
              var index_of_storage = 0;

              //LOOP FOR MAKING REVERSED INDEX LIST.
              //for(var i=0; i<MAX_DISK_IN; i++) {
              //  if( array['in_smart'+i] != '100' ) {
              //    reversed_index_list.push(i);
              //  }
              //}
              for(var i=support_hdd_cnt-1; i>=0; i--) {
                  reversed_index_list.push(i);
                }

              //LOOP FOR PARSING REVERSED STORAGE.
              for(; index_of_storage<reversed_index_list.length; index_of_storage++) {
                //reversed_index = reversed_index_list.pop();
                reversed_index = reversed_index_list[index_of_storage];

                if(array['in_smart'+reversed_index] != '100') {
                  $('td#in_start_time' +index_of_storage).html(array['in_mintm' +reversed_index]);
                  $('td#in_end_time' +index_of_storage).html(array['in_maxtm' +reversed_index]);
                  $('td#in_status' +index_of_storage).html(dstatus[array['in_use'+reversed_index]]);

                  strCapa = calc_capa(array['in_size'+reversed_index]);
                  $('td#in_capacity' +index_of_storage).html(strCapa);
                  $('td#in_model' +index_of_storage).html(array['in_model'+reversed_index]);
                  $('td#in_smart' +index_of_storage).html(smart_status[array['in_smart'+reversed_index]]);
                  $('td#in_model' +index_of_storage)
                    .data('serial', array['in_serial'+reversed_index])
                    .mouseover( function() {
                      tooltip.show($(this).data('serial'));
                    })
                    .mouseout( function() {
                      tooltip.hide();
                    });
                } else {
                  $('td#in_start_time' + index_of_storage).html('-');
                  $('td#in_end_time' + index_of_storage).html('-');
                  $('td#in_status' + index_of_storage).html('-');
                  $('td#in_capacity' + index_of_storage).html('-');
                  $('td#in_model' + index_of_storage).html('-');
                  $('td#in_smart' + index_of_storage).html('-');
                }
              }

              for(; index_of_storage<MAX_DISK_IN; index_of_storage++) {
                $('td#in_start_time' + index_of_storage).html('-');
                $('td#in_end_time' + index_of_storage).html('-');
                $('td#in_status' + index_of_storage).html('-');
                $('td#in_capacity' + index_of_storage).html('-');
                $('td#in_model' + index_of_storage).html('-');
                $('td#in_smart' + index_of_storage).html('-');
              }

            } else {
              for( var i=0 ; i < MAX_DISK_IN ; i++ ) {
                  if( array['in_smart'+i] == '100' ) {
                    $('td#in_start_time' + i).html('-');
                    $('td#in_end_time' + i).html('-');
                    $('td#in_status' + i).html('-');
                    $('td#in_capacity' + i).html('-');
                    $('td#in_model' + i).html('-');
                    $('td#in_smart' + i).html('-');
                  } else {
                    $('td#in_start_time' + i).html(array['in_mintm' + i]);
                    $('td#in_end_time' + i).html(array['in_maxtm' + i]);
                    $('td#in_status' + i).html(dstatus[array['in_use'+i]]);

                    strCapa = calc_capa(array['in_size'+i]);
                    $('td#in_capacity' + i).html(strCapa);
                    $('td#in_model' + i).html(array['in_model'+i]);
                    $('td#in_smart' + i).html(smart_status[array['in_smart'+i]]);
                    $('td#in_model' + i)
                      .data('serial', array['in_serial'+i])
                      .mouseover( function() {
                        tooltip.show($(this).data('serial'));
                      })
                      .mouseout( function() {
                        tooltip.hide();
                      });

                  }
              }
            }

            //EXTERNAL
            diskcount = parseInt(array['ex_count']);

            if( diskcount > MAX_DISK_EX ) {
                // if diskcount is more than number of rows of table drawn already
                diskcount = MAX_DISK_EX; // can't be over MAX
            }

            strCapa = calc_capa(array['ex_tsize']);

            $('td#ex_capacity_all').html(strCapa);
            $('td#ex_tstart').html(array['ex_tstart']);
            $('td#ex_tend').html(array['ex_tend']);

            for( var i=0 ; i < MAX_DISK_EX ; i++ ) {
                if( array['ex_smart'+i] == '100' ) {
                  $('td#ex_start_time' + i).html('-');
                  $('td#ex_end_time' + i).html('-');
                  $('td#ex_status' + i).html('-');
                  $('td#ex_capacity' + i).html('-');
                  $('td#ex_model' + i).html('-');
                  $('td#ex_smart' + i).html('-');
                } else {
                  $('td#ex_start_time' + i).html(array['ex_mintm' + i]);
                  $('td#ex_end_time' + i).html(array['ex_maxtm' + i]);
                  $('td#ex_status' + i).html(dstatus[array['ex_use'+i]]);

                  strCapa = calc_capa(array['ex_size'+i]);
                  $('td#ex_capacity' + i).html(strCapa);
                  $('td#ex_model' + i).html(array['ex_model'+i]);
                  $('td#ex_smart' + i).html(smart_status[array['ex_smart'+i]]);
                  $('td#ex_model' + i)
                    .data('serial', array['ex_serial'+i])
                    .mouseover( function() {
                      tooltip.show($(this).data('serial'));
                    })
                    .mouseout( function() {
                      tooltip.hide();
                    });
                }
            }

            $z.log(array);
        }
    },
     StorageDiskop : {
        init: function() {
          if( (INFO_MODEL.indexOf("ATM") >= 0 || INFO_MODEL.indexOf("ANF") >= 0 || INFO_MODEL.indexOf("UTM") >= 0)
            && INFO_MODEL.indexOf("5G") < 0 && INFO_MODEL.indexOf("5X") < 0 ) {
            $('#lang_diskformat').remove();
            $('#format_btn').remove();
          }
        },
        update: function(array) {
            var type, value;

            $('select#overwrite').val(array['overwrite']);
            $('input#timelimit').val(parseInt(array['timelimit']));

            $('select#timelimit_s').val(array['timelimit']);

            switch (array['timelimit_type']) {
              case '0':
                $('select#timelimit_c_type').val('0');
                $('input#timelimit_c').val(0);
                break;
              case '1':
                $('select#timelimit_c_type').val('3600');
                $('input#timelimit_c').val(parseInt(array['timelimit']) / 3600);
                break;
              case '2':
                $('select#timelimit_c_type').val('86400');
                $('input#timelimit_c').val(parseInt(array['timelimit']) / 86400);
                break;
              case '3':
                $('select#timelimit_c_type').val('604800');
                $('input#timelimit_c').val(parseInt(array['timelimit']) / 604800);
                break;
              default:
                $('select#timelimit_c_type').val('0');
                $('input#timelimit_c').val(0);
                break;
            }
            $('#overwrite').change();
        }
    },
    StorageSmart : {
        init: function() {
            $('input#but_detail_in').toggle(function(event) {
                $('tbody#in_detail').show();
                $(this).val(langArray["LTXT_CLOSE"]);
            }, function(event) {
                $('th.in_detail, td.in_detail').hide();
                $('#in_detail').hide();
                $(this).val(langArray["LTXT_DETAIL"]);
            });

            $('input#but_detail_ex').toggle(function(event) {
                $('tbody#ex_detail').show();
                $(this).val(langArray["LTXT_CLOSE"]);
            }, function(event) {
                $('th.ex_detail, td.ex_detail').hide();
                $('#ex_detail').hide();
                $(this).val(langArray["LTXT_DETAIL"]);
            });

            if (INFO_VENDOR === 'ALSOK') {
                MAX_DISK_IN = 2;
                MAX_DISK_EX = 0;
                $(".remove_alsok").hide();
            }
            else if(INFO_VENDOR == 'TAKENAKA') {
                $(".remove_alsok").hide();
            }
            // $('span[id*="_serial"]').css('font-size', '10px');

        },
        update: function(array) {
            var serial = [];
            $z.log(array);

            var hw_ver = array['hw_ver'];
            var support_hdd_cnt = 0;

            if(hw_ver != null && hw_ver.length > 0) {
              support_hdd_cnt = parseInt(hw_ver.slice(-2).split('A')[0]); //SUPPOSE MAX HDD COUNT IS 9.
            }

            //INTERNAL
            if((INFO_MODEL.indexOf('UTM5G') > 0 || INFO_MODEL.indexOf('UTM5X') > 0)
              && support_hdd_cnt >= 2) {
              //HDD NUMBER IS REVERSED IN UTM5G
              var reversed_index = 0;
              var reversed_index_list = [];
              var index_of_storage = 0;

              //LOOP FOR MAKING REVERSED INDEX LIST.
              // for(var i=0; i<MAX_DISK_IN; i++) {
              //   if( array['in_status'+i] != '100' ) {
              //     reversed_index_list.push(i);
              //   }
              // }
              for(var i=support_hdd_cnt-1; i>=0; i--) {
                  reversed_index_list.push(i);
                }

              //LOOP FOR PARSING REVERSED STORAGE.
              for(; index_of_storage<reversed_index_list.length; index_of_storage++) {
                //reversed_index = reversed_index_list.pop();
                reversed_index = reversed_index_list[index_of_storage];

                if(array['in_status'+reversed_index] != '100') {
                  $('span#in_status' + index_of_storage).html(smart_status[array['in_status'+reversed_index]]);
                  $('span#in_temperature' + index_of_storage).html(array['in_temperature'+reversed_index] + "&#x2103;");
                  $('span#in_readerr' + index_of_storage).html(array['in_readerr'+reversed_index]);
                  $('span#in_seekerr' + index_of_storage).html(array['in_seekerr'+reversed_index]);
                  $('span#in_realloc' + index_of_storage).html(array['in_realloc'+reversed_index]);
                  $('span#in_spinup' + index_of_storage).html(array['in_spinup'+reversed_index]);
                  $('span#in_spinretry' + index_of_storage).html(array['in_spinretry'+reversed_index]);
                  $('span#in_startstop' + index_of_storage).html(array['in_startstop'+reversed_index]);
                  $('span#in_powercyc' + index_of_storage).html(array['in_powercyc'+reversed_index]);
                  $('span#in_diskonhours' + index_of_storage).html(sprintf(langArray['LTXT_HOURS'], array['in_diskonhours'+reversed_index]));
                  $('span#in_serial' + index_of_storage)
                    .html(array['in_serial'+reversed_index])
                    .mouseover(function() {
                      tooltip.show($(this).html())
                    })
                    .mouseout(function() {
                      tooltip.hide();
                    });
                } else {
                  $('span#in_status' + index_of_storage).html('-');
                  $('span#in_temperature' + index_of_storage).html('-');
                  $('span#in_readerr' + index_of_storage).html('-');
                  $('span#in_seekerr' + index_of_storage).html('-');
                  $('span#in_realloc' + index_of_storage).html('-');
                  $('span#in_spinup' + index_of_storage).html('-');
                  $('span#in_spinretry' + index_of_storage).html('-');
                  $('span#in_startstop' + index_of_storage).html('-');
                  $('span#in_powercyc' + index_of_storage).html('-');
                  $('span#in_diskonhours' + index_of_storage).html('-');
                  $('span#in_serial' + index_of_storage).html('-');
                }
              }

              for(; index_of_storage<MAX_DISK_IN; index_of_storage++) {
                $('span#in_status' + index_of_storage).html('-');
                $('span#in_temperature' + index_of_storage).html('-');
                $('span#in_readerr' + index_of_storage).html('-');
                $('span#in_seekerr' + index_of_storage).html('-');
                $('span#in_realloc' + index_of_storage).html('-');
                $('span#in_spinup' + index_of_storage).html('-');
                $('span#in_spinretry' + index_of_storage).html('-');
                $('span#in_startstop' + index_of_storage).html('-');
                $('span#in_powercyc' + index_of_storage).html('-');
                $('span#in_diskonhours' + index_of_storage).html('-');
                $('span#in_serial' + index_of_storage).html('-');
              }

              // for(var i=0; i<MAX_DISK_IN; i++) {
              //   if(array['in_status'+i] != '100') {
              //     reversed_index = reversed_index_list.pop();
              //
              //     $('span#in_temperature' + i).html(array['in_temperature'+reversed_index] + "&#x2103;");
              //     $('span#in_readerr' + i).html(array['in_readerr'+reversed_index]);
              //     $('span#in_seekerr' + i).html(array['in_seekerr'+reversed_index]);
              //     $('span#in_realloc' + i).html(array['in_realloc'+reversed_index]);
              //     $('span#in_spinup' + i).html(array['in_spinup'+reversed_index]);
              //     $('span#in_spinretry' + i).html(array['in_spinretry'+reversed_index]);
              //     $('span#in_startstop' + i).html(array['in_startstop'+reversed_index]);
              //     $('span#in_powercyc' + i).html(array['in_powercyc'+reversed_index]);
              //     $('span#in_diskonhours' + i).html(sprintf(langArray['LTXT_HOURS'], array['in_diskonhours'+reversed_index]));
              //
              //     $('span#in_serial' + i)
              //       .html(array['in_serial'+reversed_index])
              //       .mouseover(function() {
              //         tooltip.show($(this).html())
              //       })
              //       .mouseout(function() {
              //         tooltip.hide();
              //       });
              //   }
              // }
            } else {
              for( var i=0 ; i < MAX_DISK_IN ; i++ ) {
                $('span#in_status' + i).html(smart_status[array['in_status'+i]]);

                if( array['in_status'+i] == '100' ) {
                  $('span#in_temperature' + i).html('-');
                  $('span#in_readerr' + i).html('-');
                  $('span#in_seekerr' + i).html('-');
                  $('span#in_realloc' + i).html('-');
                  $('span#in_spinup' + i).html('-');
                  $('span#in_spinretry' + i).html('-');
                  $('span#in_startstop' + i).html('-');
                  $('span#in_powercyc' + i).html('-');
                  $('span#in_diskonhours' + i).html('-');
                  $('span#in_serial' + i).html('-');
                } else {
                  $('span#in_temperature' + i).html(array['in_temperature'+i] + "&#x2103;");
                  $('span#in_readerr' + i).html(array['in_readerr'+i]);
                  $('span#in_seekerr' + i).html(array['in_seekerr'+i]);
                  $('span#in_realloc' + i).html(array['in_realloc'+i]);
                  $('span#in_spinup' + i).html(array['in_spinup'+i]);
                  $('span#in_spinretry' + i).html(array['in_spinretry'+i]);
                  $('span#in_startstop' + i).html(array['in_startstop'+i]);
                  $('span#in_powercyc' + i).html(array['in_powercyc'+i]);
                  $('span#in_diskonhours' + i).html(sprintf(langArray['LTXT_HOURS'], array['in_diskonhours'+i]));

                  $('span#in_serial' + i)
                    .html(array['in_serial'+i])
                    .mouseover(function() {
                      tooltip.show($(this).html())
                    })
                    .mouseout(function() {
                      tooltip.hide();
                    });
                }
              }
            }
            $('span#in_readerr_threshold').html(array['in_readerr_th']);
            $('span#in_seekerr_threshold').html(array['in_seekerr_th']);
            $('span#in_realloc_threshold').html(array['in_realloc_th']);

            //EXTERNAL
            for( var i=0 ; i < 5 /*MAX_DISK_EX*/ ; i++ ) {
                $('span#ex_status' + i).html(smart_status[array['ex_status'+i]]);

                if( array['ex_status'+i] == '100' ) {
                    $('span#ex_temperature' + i).html('-');
                    $('span#ex_readerr' + i).html('-');
                    $('span#ex_seekerr' + i).html('-');
                    $('span#ex_realloc' + i).html('-');
                    $('span#ex_spinup' + i).html('-');
                    $('span#ex_spinretry' + i).html('-');
                    $('span#ex_startstop' + i).html('-');
                    $('span#ex_powercyc' + i).html('-');
                    $('span#ex_diskonhours' + i).html('-');
                    $('span#ex_serial' + i).html('-');
                } else {
                    $('span#ex_temperature' + i).html(array['ex_temperature'+i] + "&#x2103;");
                    $('span#ex_readerr' + i).html(array['ex_readerr'+i]);
                    $('span#ex_seekerr' + i).html(array['ex_seekerr'+i]);
                    $('span#ex_realloc' + i).html(array['ex_realloc'+i]);
                    $('span#ex_spinup' + i).html(array['ex_spinup'+i]);
                    $('span#ex_spinretry' + i).html(array['ex_spinretry'+i]);
                    $('span#ex_startstop' + i).html(array['ex_startstop'+i]);
                    $('span#ex_powercyc' + i).html(array['ex_powercyc'+i]);
                    $('span#ex_diskonhours' + i).html(sprintf(langArray['LTXT_HOURS'], array['ex_diskonhours'+i]));
                    $('span#ex_serial' + i)
                      .html(array['ex_serial'+i])
                      .mouseover(function() {
                        tooltip.show($(this).html())
                      })
                      .mouseout(function() {
                        tooltip.hide();
                      });
                }
            }
            $('span#ex_readerr_threshold').html(array['ex_readerr_th']);
            $('span#ex_seekerr_threshold').html(array['ex_seekerr_th']);
            $('span#ex_realloc_threshold').html(array['ex_realloc_th']);

        }
    }
});
