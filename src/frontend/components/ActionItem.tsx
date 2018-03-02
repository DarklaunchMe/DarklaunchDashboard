import React, { Component } from 'react';

import { Button, Form, Header, Icon, Input, InputOnChangeData, Modal } from 'semantic-ui-react';

import { AuthAction, AuthFields, Field } from '../types/types';

import { fieldFactory } from '../utils/fieldFactory';

import DomainStore from '../stores/DomainStore';

interface Props {
    action: AuthAction;
}

interface State {
    contents: AuthFields;
    open: boolean;
}

class ActionItem extends Component<Props, State> {
    state = {
        contents: {
            confirmpassword: '',
            email: '',
            password: ''
        },
        open: false
    };

    doAction = () => {
        // TODO: Register and login stuff
        switch (this.props.action) {
            case AuthAction.REGISTER:
                DomainStore.register(this.state.contents);
                break;
            case AuthAction.SIGNIN:
                DomainStore.signin(this.state.contents);
                break;
            default:
                return;
        }
    };

    openModal = () => {
        this.setState({ open: true });
    };

    closeModal = () => {
        this.setState({ open: false });
    };

    getModalFields(action: AuthAction): Field[] {
        let stringFields = [ 'Email', 'Password' ];
        if (action === AuthAction.REGISTER) {
            stringFields = stringFields.concat([ 'Confirm Password' ]);
        }
        return fieldFactory(stringFields);
    }

    updateField = (field: string, data: InputOnChangeData) => {
        const { contents } = this.state;
        contents[field] = data.value;
        this.setState({ contents });
    };

    getFieldType(key: string) {
        return key.indexOf('password') > -1 ? 'password' : '';
    }

    getModalContent = () => {
        return this.getModalFields(this.props.action).map(({ key, value }, i) => {
            return (
                <div key={key}>
                    <Form.Field>
                        <label>{value}</label>
                        <Input
                            placeholder={value}
                            type={this.getFieldType(key)}
                            onChange={(e, data) => this.updateField(key, data)}
                        />
                    </Form.Field>
                </div>
            );
        });
    };

    getModal = () => {
        const { action } = this.props;
        return (
            <Modal open={this.state.open} closeIcon={true} onClose={this.closeModal}>
                <Header icon="privacy" content={action} />
                <Modal.Content>{this.getModalContent()}</Modal.Content>
                <Modal.Actions>
                    <Button color="red" onClick={this.closeModal}>
                        <Icon name="remove" /> Cancel
                    </Button>
                    <Button color="green" onClick={this.doAction}>
                        <Icon name="checkmark" /> {action}
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    };

    render() {
        const { action } = this.props;
        const actionElement = <span onClick={this.openModal}> {action} </span>;
        return (
            <span>
                {actionElement}
                {this.state.open ? this.getModal() : null}
            </span>
        );
    }
}

export default ActionItem;
