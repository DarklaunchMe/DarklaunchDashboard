export enum AuthAction {
    SIGNIN = 'Sign In',
    REGISTER = 'Register'
}

export interface Field {
    key: string;
    value: string;
}

export interface AuthFields {
    confirmpassword?: string;
    email: string;
    password: string;
}
