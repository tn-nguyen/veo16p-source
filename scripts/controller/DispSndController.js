/**
 * @author chcha
 */
$z.c({
    DispOSD: {
        language: '',
        actionUrl : '/cgi-bin/webra_fcgi.fcgi',
        index : function() {
            var c = this;

            var action = 'action=get_setup&menu=' + c.m.menu;

            c.form('form',
                function before(data) {
                },
                function after(response) {
                    var array = encode_to_array(response);

                    if( array['language'] != c.language ) {
                      setCookie("local_language", array['language'], 7);
                      location.reload();
                    }
                }
            );

            if( $z.debug ) {
                action += '&debug=';
            }
            c.v.init();

            $('input#cancel').click( function (event) {
                c.m.revert();
                c.v.update(c.m.data);
            });


            c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
                var array = encode_to_array(response);
                var chk = [];
                authCheck = new AuthCheck(array);

                if( !authCheck.check('setup') ) {
                    AuthorityNoPermission();
                    history.back()
                    return;
                }

                var cookieLang = getCookie("local_language");
                if( cookieLang ) {
                  c.language = cookieLang;
                  array['language'] = cookieLang;
                } else {
                  c.language = array['language'];
                  setCookie("local_language", array['language'], 7);
                }

                c.v.update(array);
                c.m.initData(array);

            });
        }
    },
    DispMonitor: {
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

            $('input#cancel').click( function (event) {
                c.m.revert();
                c.v.update(c.m.data);
            });


            //if( INFO_MODEL.indexOf("IPX") >= 0 ) {
            if( INFO_MODEL.indexOf("ATM") < 0 && INFO_MODEL.indexOf("ANF") < 0 && INFO_MODEL.indexOf("UTM") < 0) {
              $('.nonipx').hide();
            } else {
              $(".hdspotdwell").hide();
            }

            if( (INFO_MODEL.indexOf("UTM") > 0) && (INFO_MODEL.indexOf("4G") > 0) ) {
              $(".spotdwell").hide();
            }

            c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
                var array = encode_to_array(response);
                var chk = [];
                authCheck = new AuthCheck(array);

                if( !authCheck.check('setup') ) {
                    AuthorityNoPermission();
                    history.back()
                    return;
                }

                c.v.update(array);
                c.m.initData(array);
            });
        }
    },
    SoundAudio: {
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

            $('input#cancel').click( function (event) {
                c.m.revert();
                c.v.update(c.m.data);
            });

            c.m.get('/cgi-bin/webra_fcgi.fcgi', action , function (response) {
                var array = encode_to_array(response);
                var chk = [];
                authCheck = new AuthCheck(array);

                if( !authCheck.check('setup') ) {
                    AuthorityNoPermission();
                    history.back()
                    return;
                }

                c.v.update(array);
                c.m.initData(array);
            });
        }
    }
});
