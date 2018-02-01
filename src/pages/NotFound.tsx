import React, { Component } from 'react';

const styles = require('../styles/pages/NotFound.module.css'); // TS Imports are Busted (TODO: Fix)

class NotFound extends Component {
    render() {
        return (
            <div className={styles.Home}>
                Ya just got 404'd. Tag 3 friends to totally 404 them.
            </div>
        );
    }
}

export default NotFound;