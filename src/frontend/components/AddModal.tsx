import React, { Component } from 'react';

import { Button, Dropdown, Header, Icon, Input, Modal } from 'semantic-ui-react';

class AddModal extends Component {
    render() {
        const AddCodeButton = <Button content="Add Code" icon="privacy" labelPosition="left" />;
        const countryOptions = [ { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' } ];
        return (
            <Modal trigger={AddCodeButton} closeIcon={true}>
                <Header icon="privacy" content="Add Code" />
                <Modal.Content>
                    <Input placeholder="Code" />
                    <Dropdown placeholder="Select Country" fluid search selection options={countryOptions} />
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

export default AddModal;
