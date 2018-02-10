import React, { Component } from 'react';

import AuthModal from '../AuthModal';
import AddModal from '../AddModal';

import DomainStore from '../../stores/DomainStore';

import { Header, Input } from 'semantic-ui-react'

class Home extends Component {
    state = {
        darklaunches: [],
        filter: "",
        addingCode: false
    }

    async componentDidMount() {
        const darklaunchResponse = await DomainStore.getDarklaunches();
        this.setState({darklaunches: darklaunchResponse});
    }

    updateFilter(e) {
        this.setState({filter: e.target.value})
    }

    search(darklaunch) {
        return darklaunch.code.contain(this.state.filter)
    }
    
    render() {
        return (
            <div className="home">
                <Header>
                    <div className="title">Welcome to Twilight</div>
                </Header>
                <Input placeholder="Search..." onChange={this.updateFilter}/>
                <AddModal />
                <AuthModal />
                {this.state.darklaunches.filter(this.search).map((darklaunch) => {
                    return <div> {darklaunch.code} is {darklaunch.enabled ? 'Enabled' : 'Disabled'} </div>
                })}
            </div>
        );
    }
}

export default Home;