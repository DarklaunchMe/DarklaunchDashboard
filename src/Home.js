import React, { Component } from 'react';
import DomainStore from './DomainStore';

class Home extends Component {
    state = {
        darklaunches: []
    }

    async componentDidMount() {
        const darklaunchResponse = await DomainStore.getDarklaunches();
        this.setState({darklaunches: darklaunchResponse});
    }
    
    render() {
        return (
            <div className="home">
                {this.state.darklaunches.map((darklaunch) => {
                    return <div> {darklaunch.code} is {darklaunch.enabled ? 'Enabled' : 'Disabled'} </div>
                })}
            </div>
        );
    }
}

export default Home;