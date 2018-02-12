import React, { Component } from 'react';

import AuthModal from '../AuthModal';
import AddModal from '../AddModal';

import DomainStore from '../../stores/DomainStore';

import { Header, Input } from 'semantic-ui-react';

type Darklaunch = {
    code: string,
    enabled: boolean
};

type State = {
    darklaunches: Darklaunch[],
    filter: string,
    addingCode: boolean
};

class Home extends Component<{}, State> {
    state = {
        darklaunches: [],
        filter: '',
        addingCode: false
    };

    async componentDidMount() {
        const darklaunchResponse = await DomainStore.getDarklaunches();
        this.setState({darklaunches: darklaunchResponse});
    }

    updateFilter(e: any) {
        this.setState({filter: e.target.value});
    }

    search(darklaunch: Darklaunch) {
        return darklaunch.code.indexOf(this.state.filter) > -1;
    }

    renderCodes() {
        return this.state.darklaunches.filter(this.search).map((darklaunch: Darklaunch, i) => 
            <div key={i}> {darklaunch.code} is {darklaunch.enabled ? 'Enabled' : 'Disabled'} </div>
        );       
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
                {this.renderCodes()}
            </div>
        );
    }
}

export default Home;