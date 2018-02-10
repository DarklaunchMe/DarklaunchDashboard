import React, { Component } from 'react';
import DomainStore from './DomainStore';

import { Button, Header, Input, Modal, Icon } from 'semantic-ui-react'

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
        const AddCodeButton = <Button
            content='Add Code'
            icon='privacy'
            labelPosition='left'
        />

        const AddCodeModal = 
        <Modal trigger={AddCodeButton} closeIcon>
            <Header icon='privacy' content='Add Code' />
            <Modal.Content>
                <p>Add Codes Here</p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red'>
                    <Icon name='remove' /> Cancel
                </Button>
                <Button color='green'>
                    <Icon name='checkmark' /> Create
                </Button>
            </Modal.Actions>
        </Modal>

        const AuthButton = <Button
            content='Auth'
            icon='privacy'
            labelPosition='left'
        />

        const AuthModal = 
        <Modal trigger={AuthButton} closeIcon>
            <Header icon='privacy' content='Add Code' />
            <Modal.Content>
                <p>Sign In or Register</p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red'>
                    <Icon name='remove' /> Cancel
                </Button>
                <Button color='green'>
                    <Icon name='checkmark' /> Create
                </Button>
            </Modal.Actions>
        </Modal>

        return (
            <div className="home">
                <Header>
                    <div className="title">Welcome to Twilight</div>
                </Header>
                <Input placeholder="Search..." onChange={this.updateFilter}/>
                {AddCodeModal}
                {AuthModal}
                {this.state.darklaunches.filter(this.search).map((darklaunch) => {
                    return <div> {darklaunch.code} is {darklaunch.enabled ? 'Enabled' : 'Disabled'} </div>
                })}
            </div>
        );
    }
}

export default Home;