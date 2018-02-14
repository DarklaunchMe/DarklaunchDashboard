import React, { Component, ChangeEvent } from 'react';
import { Header, Input, InputOnChangeData } from 'semantic-ui-react';

import AuthModal from '../AuthModal';
import AddModal from '../AddModal';

import DomainStore from '../../stores/DomainStore';

type Darklaunch = {
    code: string;
    enabled: boolean;
};

type State = {
    darklaunches: Darklaunch[];
    filter: string;
    addingCode: boolean;
};

class Home extends Component<{}, State> {
    state = {
        darklaunches: [],
        filter: '',
        addingCode: false
    };

    async componentDidMount() {
        const darklaunchResponse = await DomainStore.getDarklaunches();
        this.setState({ darklaunches: darklaunchResponse });
    }

    updateFilter = (e: ChangeEvent<any>, data: InputOnChangeData) => {
        this.setState({ filter: data.value });
    };

    search(darklaunch: Darklaunch) {
        return darklaunch.code.indexOf(this.state.filter) > -1;
    }

    renderCodes() {
        return this.state.darklaunches.filter(this.search).map((darklaunch: Darklaunch, i: number) => (
            <div key={i}>
                {darklaunch.code} is {darklaunch.enabled ? 'Enabled' : 'Disabled'}
            </div>
        ));
    }

    render() {
        return (
            <div className="home">
                <Header>
                    <div className="title">Welcome to Twilight</div>
                </Header>
                <Input placeholder="Search..." onChange={this.updateFilter} />
                <AddModal />
                <AuthModal />
                {this.renderCodes()}
            </div>
        );
    }
}

export default Home;
