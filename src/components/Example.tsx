import React, { Component } from 'react';
import logo from '../static/svgs/react.svg'; // Add SVG Loader
import Navbar from '../components/Navbar';

const styles = require('../styles/pages/Home.module.css'); // TS Imports are Busted (TODO: Fix)

interface Props {
    isProp: boolean;
}

interface State {
    isState: boolean;
}

class Home extends Component<Props, State> {
    render() {
        return (
            <div className={styles.Home}>
                <Navbar />
                <div className={styles.HomeHeader}>
                    <img src={logo} className={styles.HomeLogo} alt="logo" />
                    <h2>Welcome to Test</h2>
                </div>
                <p className={styles.HomeIntro}>
                    To get started, edit <code>src/App.tsx</code> or{' '}
                    <code>src/Home.tsx</code> and save to reload.
                </p>
                <ul className="Home-resources">
                    <li>
                        <a href="https://github.com/jaredpalmer/razzle">Docs</a>
                    </li>
                    <li>
                        <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
                    </li>
                    <li>
                        <a href="https://palmer.chat">Community Slack</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Home;