import React, { Component, SyntheticEvent } from 'react';

import { Button, Dropdown, Header, Icon, Input, Modal } from 'semantic-ui-react';

import DataStore from '../stores/DataStore';
import DomainStore from '../stores/DomainStore';
import UserStore from '../stores/UserStore';

import { Darklaunch } from '../types/types';

interface State {
    contents: Darklaunch;
}

class AddCode extends Component<{}, State> {
    state = {
        contents: {
            code: '',
            createdby: UserStore.getUser(),
            enabled: 0,
            key: '',
            value: ''
        }
    };

    onChange = (field: string, data: any) => {
        const { contents } = this.state;
        contents[field] = data.value;
        this.setState({ contents });
    };

    doAddCode = () => {
        if (Object.values(this.state.contents).some((val) => val === '')) {
            // If anything isn't filled out throw an error
            console.log('invalid');
            return;
        }
        DomainStore.addCode(this.state.contents);
    };

    render() {
        const AddCodeButton = <Button content="Add Code" icon="privacy" labelPosition="left" />;
        const enabledOptions = [
            { icon: 'checkmark', value: 1, text: 'Enabled' },
            { icon: 'remove', value: 0, text: 'Disabled' }
        ];
        return (
            <Modal trigger={AddCodeButton} closeIcon>
                <Header icon="privacy" content="Add Code" />
                <Modal.Content>
                    <div> Code </div>
                    <Input
                        placeholder="Code"
                        onChange={(e: SyntheticEvent<HTMLElement>, data: any) => this.onChange('code', data)}
                    />
                    <div> State </div>
                    <Dropdown
                        placeholder="State"
                        onChange={(e: SyntheticEvent<HTMLElement>, data: any) => this.onChange('enabled', data)}
                        selection
                        options={enabledOptions}
                        width={'200px'}
                    />
                    <div> Launch Type </div>
                    <Dropdown
                        placeholder="Launch Type"
                        onChange={(e: SyntheticEvent<HTMLElement>, data: any) => this.onChange('key', data)}
                        search
                        selection
                        options={DataStore.darklaunchOptions}
                    />
                    <div> Launch Parameter </div>
                    <Input
                        onChange={(e: SyntheticEvent<HTMLElement>, data: any) => this.onChange('value', data)}
                        placeholder="Launch Parameter"
                    />
                    <div> Created By </div>
                    <Input disabled placeholder={this.state.contents.createdby} />
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red">
                        <Icon name="remove" /> Cancel
                    </Button>
                    <Button color="green" onClick={this.doAddCode}>
                        <Icon name="checkmark" /> Create
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AddCode;
