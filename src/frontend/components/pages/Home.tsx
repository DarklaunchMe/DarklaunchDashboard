import React, { ChangeEvent, Component, SyntheticEvent } from 'react';
import { Header, Input, InputOnChangeData } from 'semantic-ui-react';

import AddCode from '../AddCode';
import DarklaunchItem from '../DarklaunchItem';
import Navbar from '../Navbar';

import DomainStore from '../../stores/DomainStore';
import { Darklaunch } from '../../types/types';

interface State {
    darklaunches: Darklaunch[];
    filter: string;
    addingCode: boolean;
}

class Home extends Component<{}, State> {
    state = {
        addingCode: false,
        darklaunches: [],
        filter: ''
    };

    async componentDidMount() {
        const darklaunchResponse = await DomainStore.getDarklaunches();
        this.setState({ darklaunches: darklaunchResponse });
    }

    updateFilter = (e: SyntheticEvent<HTMLElement>, data: InputOnChangeData) => {
        this.setState({ filter: data.value });
    };

    search = (darklaunch: Darklaunch) => {
        return darklaunch.code.indexOf(this.state.filter) > -1;
    };

    renderCodes = () => {
        return this.state.darklaunches.filter(this.search).map((darklaunchProps: Darklaunch, i: number) => (
            <div key={i}>
                <DarklaunchItem {...darklaunchProps} />
            </div>
        ));
    };

    render() {
        return (
            <div className="home">
                <Navbar />
                <Input placeholder="Search..." onChange={this.updateFilter} />
                <AddCode />
                {this.renderCodes()}
            </div>
        );
    }
}

export default Home;
