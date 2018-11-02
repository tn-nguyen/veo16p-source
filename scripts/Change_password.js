// Initialize
$(function () {
  if (typeof(INFO_PASSWORD_RENEW) == 'undefined' || INFO_PASSWORD_RENEW == '0') {
    document.location.pathname='/html/live.htm';
    return;
  }
  var changePassword = new ChangePassword();
});

var ChangePassword = function () {
  this.init();
}

ChangePassword.prototype = {
  init: function () {
    var c = this;
    c.passwdRuleCheck('', 'ADMIN');
    $('#passwd_new').keyup(function(event) {
      c.passwdRuleCheck($('#passwd_new').val(), 'ADMIN');
    });
    
    $('#submit').click(function(event) {
      var password = $('#passwd_new').val(),
          err = Validator.enhancedPasswd('#passwd_new', 'admin'),
          ajaxQuery;
      if( password != $('#confirm_new').val()) {
        alert(langArray['LTXT_DIFF_CONFIRM_PASS']);
        return;
      }
      if(err) {
        alert(langArray['LTXT_ERR_USERPASSWD']);
        return false;
      } else {
        anaxQuery = 'action=set_setup.usr&menu=change_password'
          + '&passwd=' + encodeURIComponent($('#passwd_new').val());
        $.ajax({
          type: "POST",
          url: "/cgi-bin/webra_fcgi.fcgi",
          async: false,
          data: anaxQuery,
          success: function(response) {c.ajaxSuccess(response)},
          fail: function(response) {
            alert(langArray['LTXT_ERR_SEND']);
          }
        });
      }
    });
  },
  ajaxSuccess: function(response) {
    var array = encode_to_array(response);
    
    switch (response) {
    case 'DVR In Setup!':
      c.updateTips(langArray["LTXT_ERR_DVRINSETUP"]);
      $('#dialogUpgrade').button({ disabled: true });
      return;
    case 'DVR In Arch!':
      c.updateTips(langArray["LTXT_ERR_DVRINARCH"]);
      $('#dialogUpgrade').button({ disabled: true });
      return;
    case 'DVR In SCM not ready!':
      c.updateTips(langArray["LTXT_ERR_NVR_NOT_READY"]);
      $('#dialogUpgrade').button({ disabled: true });
      return;
    }
    alert(langArray['LTXT_ERR_COMPLETE']);
    document.location.pathname='/html/live.htm';
  },
  passwdRuleCheck: function(str, id) {
    var err = Validator.enhancedPasswd(str, id);
    if (err & Validator.ERR_VALID_LENGTH_SHORT ||
        err & Validator.ERR_VALID_LENGTH_LONG) {
      $('#passwd_rule1').css('color', 'red');
    } else {
      $('#passwd_rule1').css('color', 'green');
    }
    
    if (err & Validator.ERR_VALID_COMBINATION) {
      $('#passwd_rule2').css('color', 'red');
    } else {
      $('#passwd_rule2').css('color', 'green');
    }
    
    if (err & Validator.ERR_VALID_REPETITIVE_CHAR) {
      $('#passwd_rule3').css('color', 'red');
    } else {
      $('#passwd_rule3').css('color', 'green');
    }
    
    if (err & Validator.ERR_VALID_SEQUENTIAL_NUMBER) {
      $('#passwd_rule4').css('color', 'red');
    } else {
      $('#passwd_rule4').css('color', 'green');
    }
    
    if (err & Validator.ERR_VALID_EQUAL_TO_ID) {
      $('#passwd_rule5').css('color', 'red');
    } else {
      $('#passwd_rule5').css('color', 'green');
    }
    
    if (err & Validator.EER_VALID_INVALID_CHAR) {
      $('#passwd_rule6').css('color', 'red');
    } else {
      $('#passwd_rule6').css('color', 'green');
    }
  }
}