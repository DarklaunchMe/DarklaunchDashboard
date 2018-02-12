import React, { Component } from 'react';

import { Button, Header, Modal, Icon } from 'semantic-ui-react';

class AuthModal extends Component {
    render() {
        const AddCodeButton = <Button
            content="Auth"
            icon="privacy"
            labelPosition="left"
        />;
        return (
            <Modal trigger={AddCodeButton} closeIcon={true}>
                <Header icon="privacy" content="Add Code" />
                <Modal.Content>
                    <p>Sign In Or Register</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red">
                        <Icon name="remove" /> Cancel
                    </Button>
                    <Button color="green">
                        <Icon name="checkmark" /> Create
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AuthModal;