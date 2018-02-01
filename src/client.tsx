import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

import WebSocketStore from './stores/WebSocketStore';

// Load Websocket shit here, maybe.

WebSocketStore.init(); // TODO (Minimize websocket refreshing by keeping this near reactrouter)    

ReactDOM.hydrate(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
