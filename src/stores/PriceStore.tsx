
import {observable, asMap} from 'mobx';

class PriceStore {
    static syncronize = function() {
        
    }
    /**
     * Maps a pair ("BTC-ETH") to a current price (Retreived from the websocket connection)
     */
    @observable prices = observable.map({});
}


export default PriceStore;