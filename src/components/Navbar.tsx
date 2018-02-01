import React, { Component } from 'react';

const styles = require('../styles/components/Navbar.module.css'); // TS Imports are Busted (TODO: Fix)

class Navbar extends Component {
    render() {
        return (
            <div className={styles.Navbar}>
                Heck
            </div>
        );
    }
}

export default Navbar;