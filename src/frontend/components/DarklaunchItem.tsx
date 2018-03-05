import React, { Component } from 'react';

import { Darklaunch } from '../types/types';

class DarklaunchItem extends Component<Darklaunch, {}> {
    render() {
        return (
            <div>
                {this.props.code} is {this.props.enabled ? 'Enabled' : 'Disabled'} and was created by {' '}
                {this.props.createdby}
            </div>
        );
    }
}

export default DarklaunchItem;
