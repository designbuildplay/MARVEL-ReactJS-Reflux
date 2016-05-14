'use strict';

import Reflux             from 'reflux';
import ComicActions       from '../actions/ComicActions';
import CryptoJS           from 'crypto-js';
import request            from 'ajax-request';

const ComicStore = Reflux.createStore({
    listenables: ComicActions,
    apikey: '04bd17b06657c3c7cec97b36e7c69a8e',
    privatekey: '4790d75b27ef0181e415ccc3dc94dcba1b45f4d2',

    createTimestamp: function() {
       let d = new Date();
       return d.getTime();
    },

    fetchList: function(offset) {

       let ts = new Date().getTime();
       let hash = CryptoJS.MD5(ts + this.privatekey + this.apikey).toString();

       let url = 'http://gateway.marvel.com:80/v1/public/comics';
       let self = this;
       
       if(!offset)
        offset = 0;

       request({
          url: url,
          method: 'GET',
          data: {
            ts: ts,
            apikey: this.apikey,
            hash: hash,
            limit:50,
            offset: offset * 50
          }
        }, function(err, res, data) {
            self.data = JSON.parse(data);
            self.triggerStore();
        });

    },

    triggerStore:function() {
        this.trigger(   
           this.data
        );
    }

});

export default ComicStore;
