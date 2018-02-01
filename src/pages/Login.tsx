import React, { Component, ChangeEvent } from 'react';
import Navbar from '../components/Navbar';
import PairTable from '../components/PairTable';

import DomainStore from '../stores/DomainStore';

const styles = require('../styles/pages/Login.module.css'); // TS Imports are Busted (TODO: Fix)

interface State {
    username: string;
    password: string;
}

class Login extends Component<{}, State> {
    state = {
        username: '',
        password: ''
    };

    updateUsername = (event: ChangeEvent<HTMLInputElement>) => {
        const username = event.target.value;
        this.setState({username});
    }

    updatePassword = (event: ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;
        this.setState({password});
    }

    // Needs button event
    login = (event: any) => {
        const promise: Promise<any> = DomainStore.loginRequest({
            username: this.state.username,
            password: this.state.password
        });

        promise.then((response: Response) => {
            console.log(response);
        })
        .catch((error: Error) => {
            console.log(error);
        });
    }

    // Needs button event
    register = (event: any) => {
        const promise: Promise<any> = DomainStore.registerRequest({
            email: this.state.username,
            password: this.state.password
        });

        promise.then((response: Response) => {
            if (response.ok) {
                return response.json();
            }
            return false; // Go to error state IDK how yet (TODO)
        })
        .then((json: any) => {
            console.log(`Your session token is${json.token}`);
        })
        .catch((error: Error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className={styles.Login}>
                Login
                <input value={this.state.username} onChange={this.updateUsername} />
                <input value={this.state.password} onChange={this.updatePassword} type="password" />
                <button onClick={this.register}> Login </button>
            </div>
        );
    }
}

export default Login;