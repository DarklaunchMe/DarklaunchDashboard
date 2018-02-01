import React, { Component, ChangeEvent } from 'react';

import { observer } from 'mobx-react';

const styles = require('../styles/components/PairTable.module.css'); // TS Imports are Busted (TODO: Fix)

interface State {
    searchText: string;
}

@observer
class PairTable extends Component {
    state = {
        searchText: ''
    };

    onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value;
        this.setState({searchText});
    }

    render() {
        return (
            <div className={styles.Navbar}>
                <input onChange={this.onChange} value={this.state.searchText}/>
                {this.state.searchText}
            </div>
        );
    }
}

export default PairTable;