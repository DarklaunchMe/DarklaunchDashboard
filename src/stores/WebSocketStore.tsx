import DomainStore from './DomainStore';

class WebSocketStore {
    static websocketURL = `ws://${DomainStore.baseURL}/ws`;

    static init = function() {
        const supportsWebsockets = true; // Figure out later if things don't
        if (supportsWebsockets) {
            const conn = new WebSocket(WebSocketStore.websocketURL);
            conn.onopen = function() {
                conn.send(localStorage.getItem('coinexchange_sessiontoken'));
            };
            conn.onmessage = function(messageEvent: MessageEvent) {
                console.log(messageEvent.data);
            };
            conn.onclose = function() {
                console.log('Connection closed');
            };
            conn.onerror = function(error: Event) {
                console.log('A websocket error has occured');
            };
        } else {
            // You'll have to do vanilla calls
        }
    };
}

export default WebSocketStore;