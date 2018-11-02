/**
 * @author chcha
 */
var User = function (user) {
  this.id = '';
  this.passwd = '';
  this.grp = '';
  this.covert = '';
  this.email = '';
  this.noti = false;
  this.email_serv = 0;
  this.phone = '';
  this.phone_notify = false;
  this.pwlastchanged = "0";
  this.init_pw_changed = "0";

  if( user ) {
    this.init(user);
  }
};

User.prototype = {
  init : function( user ) {
    this.id = user.id;
    this.passwd = user.passwd;
    this.grp = user.grp;
    this.covert= user.covert;
    this.email = user.email;
    this.noti = user.noti;
    this.email_serv = user.email_serv;
    this.phone = user.phone;
    this.phone_notify = user.phone_notify;
    this.init_pw_changed = user.init_pw_changed;
    if (user.pwlastchanged == undefined) {
      this.pwlastchanged = 0;
    } else {
      this.pwlastchanged = user.pwlastchanged;
    }
  },
  setId : function (id) {this.id = id;},
  setPasswd : function (pw) {this.passwd = pw;},
  setGrp : function (grp) {this.grp = grp;},
  setCovert : function (covert) {this.covert = covert;},
  setEmail : function (email) {this.email = email;},
  setNoti : function (noti) {this.noti = noti;},
  setEmail_serv : function (email_serv) {this.email_serv = email_serv;},
  setPhone : function (email) {this.email = phone;},
  setPhoneNotify : function (noti) {this.noti = phone_notify;},
  setpwlastchanged : function (date) {this.pwlastchanged = date;},
  setInitPwChanged : function (date) {this.init_pw_changed = date;},

  getId : function () {return this.id;},
  getPasswd : function () {return this.passwd;},
  getGrp : function () {return this.grp;},
  getCovert : function () {return this.covert;},
  getEmail : function () {return this.email;},
  getNoti : function () {return this.noti;},
  getEmail_serv : function () {return this.email_serv;},
  getPhone : function () {return this.phone;},
  getPhoneNotify : function () {return this.phone_notify;},
  getpwlastchanged : function () {return this.pwlastchanged;},
  getinitpwchanged : function () {return this.init_pw_changed;},

  _end : {}
};

var UserManager = function() {
  this.maxusr = 8;
  this.usrcnt = 0;
  this.users = [];

  for( var i=0 ; i < this.maxusr ; i++ ) {
    this.users[i] = new User();
  }

  this.curAuth = 'USER';
  this.curAuthVal = 0;
};

UserManager.prototype = {
  getUsrCnt : function() { return this.usrcnt; },
  getUsers : function() {return this.users; },
  addUser: function(usr) {
    try {
      if( typeof usr.id == 'undefined' ) {
        throw 'User is null';
      }

      if( this.usrcnt >= this.maxusr ) {
        //throw langArray["LTXT_ERR_USER_EXCEED"];
        throw langArray["LTXT_ERR_MAX_USER_EXCEED"];
      }

      if( this.searchById(usr.id) >= 0 ) {
        throw langArray["LTXT_ERR_USERDUP"];
      }
      this.users[this.usrcnt++] = usr;

      return this.usrcnt;
    } catch (e) {
      alert(e);
    }

    return -1;
  },
  delUser: function(idx) {
    for( var i=idx ; i < this.usrcnt-1 ; i++ ) {
      this.users[i] = this.users[i+1];
      $("#covert" + i).val($("#covert" + (i+1) ).val());
    }

    this.users[i] = new User();

    return --this.usrcnt;
  },
  deleteAllUser: function() {
    for( var i=0 ; i < this.usrcnt ; i++ ) {
      this.users[i] = new User();
    }

    return this.usrcnt = 0;
  },
  editUser: function(idx, usr) {
    this.users[idx] = usr;
  },
  searchById : function(id) {
    var users = this.getUsers();

    for( var i=0 ; i < this.getUsrCnt() ; i++ ) {
      if( users[i].getId() == id ) {
        return i;
      }
    }

    return -1;
  },
  makeUserList: function(usrArr) {
    var usrcnt = parseInt(usrArr['usrcnt0']);

    for( var i=0 ; i < usrcnt ; i++ ) {
      var user = new User({
        id: usrArr['usrid'+i],
        passwd : usrArr['passwd'+i],
        grp : usrArr['grpname'+i],
        covert : usrArr['covert'+i],
        email : usrArr['email'+i],
        noti : usrArr['noti'+i] == '0' ? false : true,
        email_serv : usrArr['email_serv'+i],
        phone : usrArr['phone'+i],
        phone_notify : usrArr['phone_notify'+i] == '0' ? false : true,
        pwlastchanged : usrArr['pwlastchgd'+i],
        init_pw_changed: usrArr['init_pw_changed'+i]
      });

      this.addUser(user);
    }
  }
};

$z.m({
    UserManage: {
      usrManager : {},
      menu : 'usr.usrmanage',
      isExistUsr: function(name) {
        for( i=0 ; i < parseInt(this.data['usrcnt0']) ; i++ ) {
          if( this.data['usrid'+i] == name ) {
            return true;
          }
        }

        return false;
      },
      validateUsr: function(data, tail) {
        // check duplicate
        if( this.isExistUsr(data['usrid' + tail]) ) {
          alert(langArray['LTXT_ERR_USERDUP']);
          return false;
        }

        // ID, Password Character check
        if( data['usrid' + tail].length == 0 ) {
          alert(langArray["LTXT_ENTER_VALID_ID"]);
          return false;
        }

//        if( data['passwd' + tail].length == 0 ) {
//          alert(langArray['LTXT_ERR_USERPASSWD']);
//          return false;
//        }

        // E-Mail Character check
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if( data['email' + tail].length > 0 && !filter.test(data['email' + tail]) ) {
          alert(langArray['LTXT_ERR_USER_EMAIL']);
          return false;
        }

        // TODO: Authority check

        return true;
      },
      makeupData: function(data) {
        var covert = '0000000000000000';

        for( var usr=0; usr < 8; usr++ ) {
          if( usr >= parseInt(data['usrcnt0']) ) {
            data['grpname'+usr] = '';
            data['covert'+usr] = '';
            continue;
          }

          covert = '0000000000000000';
          var arr = data['covert'+usr];

          if( arr ) {
            for( var i=0; i<arr.length; i++) {
              covert = covert.setCharAt( parseInt(arr[i]), '1');
            }
          }

          data['passwd'+usr] = this.usrManager.users[usr].passwd;

          data['covert'+usr] = covert;
          if (this.usrManager != undefined) {
            data['phone' + usr] = this.usrManager.users[usr].getPhone();
            data['phone_notify' + usr] = this.usrManager.users[usr].getPhoneNotify() ? '1' : '0';
            var flag = -1;
            for (var i = 0; i < 8 ; i+= 1) {
              data['email_serv'+i] = this.usrManager.users[i].email_serv;
              if (this.origData['usrid' + i] == this.usrManager.users[usr].id) {
                if (this.origData['passwd' + i] != data['passwd'+usr]) {
                  this.usrManager.users[usr].pwlastchanged = 0;
                }
              }
            }

            data['pwlastchgd'+usr] = this.usrManager.users[usr].pwlastchanged;
            data['init_pw_changed'+usr] = this.usrManager.users[usr].init_pw_changed;
          }
          $z.log(this.usrManager.users[usr].email_serv);
          $z.log(data);
        }

        return data;
      },
      beforeLoad : function(data) {
        return data;
      },
      beforeSave : function(data) {
        data['menu'] = this.menu;
        data['action'] = 'set_setup';

        dvrpoke.stop();

        if( $z.debug ) {
          data['debug'] = '1';
        }

        return data;
      },
      afterLoad : function(result) {
        this.data = encode_to_array(result);

        this.usrManager = new UserManager();
        this.usrManager.curAuth = this.data['login_group'];
        this.usrManager.makeUserList(this.data);

        return result;
      },
      afterSave : function(result) {
        dvrpoke.start();
        return procResult(result);
      },
      revert: function() {
        this.usrManager.deleteAllUser();
        this.usrManager.curAuth = this.origData['login_group'];
        this.usrManager.makeUserList(this.origData);
      }
    },
    UserAuth: {
        menu : 'usr.usrauthority',

        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {
            if( !this.compareTo(data) ) {
                return false;
            }

            data['menu'] = this.menu;
            data['action'] = 'set_setup';

            dvrpoke.stop();

            if( $z.debug ) {
                data['debug'] = '1';
            }

            return data;

        },
        afterLoad : function(result) {
            this.data = encode_to_array(result);
            return result;
        },
        afterSave : function(result) {
            dvrpoke.start();
            return procResult(result);
        }
    }
});
