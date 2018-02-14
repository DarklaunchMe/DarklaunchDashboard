import * as React from 'react';

import './styles/App.css';

import Home from './components/pages/Home';

import { Route, Switch } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

const App = () => (
    <Switch>
        <Route exact={true} path="/" component={Home} />
    </Switch>
);

export default App;
