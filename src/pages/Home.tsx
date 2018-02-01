import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import PairTable from '../components/PairTable';

const styles = require('../styles/pages/Home.module.css'); // TS Imports are Busted (TODO: Fix)

class Home extends Component {
    render() {
        return (
            <div className={styles.Home}>
                <Navbar />
                <PairTable />
            </div>
        );
    }
}

export default Home;