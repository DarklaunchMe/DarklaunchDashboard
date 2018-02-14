import React, { Component } from 'react';

import { Button, Header, Modal, Icon, Input } from 'semantic-ui-react';

import DomainStore from '../stores/DomainStore';

class AuthModal extends Component {
    onClick = () => {
        console.log('HE');
    };

    render() {
        const AddCodeButton = <Button content="Auth" icon="privacy" labelPosition="left" />;
        return (
            <Modal trigger={AddCodeButton} closeIcon={true}>
                <Header icon="privacy" content="Add Code" />
                <Modal.Content>
                    <Input placeholder="Code..." />
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red">
                        <Icon name="remove" /> Cancel
                    </Button>
                    <Button color="green">
                        <Icon name="checkmark" onClick={this.onClick} /> Create
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AuthModal;
