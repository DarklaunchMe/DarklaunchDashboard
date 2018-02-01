import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import WebSocketStore from './stores/WebSocketStore';

// const styles = require('./App.module.css'); // TS Imports are Busted (TODO: Fix)

const App = () => (
    <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/lost" component={NotFound} />
    </Switch>
);

export default App;