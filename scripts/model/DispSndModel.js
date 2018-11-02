/**
 * @author chcha
 */

$z.m({
    DispOSD: {
        menu : 'display.osd',
        
        makeupData : function(data) {
            data['language'] = data['language'].toUpperCase();
            
            return data;            
        },     
        beforeLoad : function(data) {
            return data;            
        },
        beforeSave : function(data) {
            data['menu'] = this.menu;
            data['action'] = 'set_setup';
                        
            if( $z.debug ) {
                data['debug'] = '1';
            }
            
            dvrpoke.stop();

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
    },
    DispMonitor: {
        menu : 'display.monitor',
        
        beforeLoad : function(data) {
            return data;
        },
        beforeSave : function(data) {            
        	/*            
            if( !this.compareTo(data) ) {
                return false;
            }
            */

            
            data['menu'] = this.menu;
            data['action'] = 'set_setup';
                        
            if( $z.debug ) {
                data['debug'] = '1';
            }
            
            dvrpoke.stop();

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
    },
  SoundAudio: {
    menu : 'sound.audio',
    beforeLoad : function(data) {
        return data;            
    },
    beforeSave : function(data) {
      data['menu'] = this.menu;
      data['action'] = 'set_setup';
      if( $z.debug ) {
          data['debug'] = '1';
      }

      dvrpoke.stop();
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
