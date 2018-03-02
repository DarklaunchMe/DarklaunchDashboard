import React, { Component, SyntheticEvent } from 'react';

import { Button, Dropdown, Header, Icon, Input, Modal } from 'semantic-ui-react';

import DataStore from '../stores/DataStore';
import DomainStore from '../stores/DomainStore';

interface State {
    contents: {
        code: string;
        enabled: boolean;
        launchParameter: string;
        launchType: string;
    };
}

class AddCode extends Component<{}, State> {
    state = {
        contents: {
            code: '',
            enabled: false,
            launchParameter: '',
            launchType: ''
        },
    };
    onChange = (e: SyntheticEvent<HTMLElement>, data: any) => {
        console.log(data);
    };

    doAddCode() {
        DomainStore.addCode({});
    }

    render() {
        const AddCodeButton = <Button content="Add Code" icon="privacy" labelPosition="left" />;
        const enabledOptions = [
            { icon: 'checkmark', value: 1, text: 'Enabled' },
            { icon: 'remove', value: 0, text: 'Disabled' }
        ];
        return (
            <Modal trigger={AddCodeButton}>
                <Header icon="privacy" content="Add Code" closeIcon />
                <Modal.Content>
                    <div> Code </div>
                    <Input placeholder="Code" />
                    <div> State </div>
                    <Dropdown placeholder="State" selection options={enabledOptions} width={'200px'} />
                    <div> Launch Type </div>
                    <Dropdown placeholder="Launch Type" search selection options={DataStore.darklaunchOptions} />
                    <div> Launch Parameter </div>
                    <Input placeholder="Launch Parameter" />
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red">
                        <Icon name="remove" /> Cancel
                    </Button>
                    <Button color="green">
                        <Icon name="checkmark" onClick={this.doAddCode}/> Create
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AddCode;
