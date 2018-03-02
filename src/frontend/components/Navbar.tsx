import React, { ChangeEvent, Component, SyntheticEvent } from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';

import { AuthAction } from '../types/types';

import ActionItem from './ActionItem';

import logo from '../static/darklaunchlogo.png';

import '../styles/components/Navbar.css';

// import Darklaunch from 'darklaunch-js';
const Darklaunch = require('darklaunch-js');
interface State {
    signingIn: boolean;
}

class Navbar extends Component<{}, State> {
    state = {
        signingIn: false
    };
    showSignInModal = () => {
        this.setState({ signingIn: true });
    };
    render() {
        const title = <span className="header-content">Darklaunch Dashboard</span>;
        return (
            <div className="nav-bar">
                <Grid columns={2} relaxed className="header-bar">
                    <Grid.Column floated="left" width={10} verticalAlign="middle">
                        <Header as="h2" size="huge" image={logo} content={title} />
                    </Grid.Column>
                    <Grid.Column floated="right" width={5} verticalAlign="middle">
                        <ActionItem action={AuthAction.SIGNIN} />
                        |
                        <ActionItem action={AuthAction.REGISTER} />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Navbar;
