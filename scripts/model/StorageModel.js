/**
 * @author chcha
 */

$z.m({
    StorageDiskinfo: {
        menu : 'storage.diskinfo',
        
        beforeLoad : function(data) {
            return data;            
        },
        beforeSave : function(data) {
            if( !this.compareTo(data) ) {
                return false;
            }
            
            dvrpoke.stop();
            
            data['menu'] = this.menu;
            data['action'] = 'set_setup';
                        
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
    },
    StorageDiskop: {
        menu : 'storage.diskop',
        
        beforeLoad : function(data) {
            return data;            
        },
        beforeSave : function(data) {
            if( !this.compareTo(data) ) {
                return false;
            }
            
            dvrpoke.stop();
            
            data['menu'] = this.menu;
            data['action'] = 'set_setup';
            
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
    },
 
    StorageSmart : {
        menu : 'storage.smart',

        beforeLoad : function(data) {
            return data;            
        },
        beforeSave : function(data) {
            if( !this.compareTo(data) ) {
                return false;
            }
            
            dvrpoke.stop();
            
            data['menu'] = this.menu;
            data['action'] = 'set_setup';
                        
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
