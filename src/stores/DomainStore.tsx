import { formatBody } from '../utils/domain/DomainUtils';

class DomainStore {
    static baseURL = 'localhost:8088'; // TODO (URL stuff)
    static RESTURL = `http://${DomainStore.baseURL}`; // TODO (Implement https and swap this over)
    static loginRequest = (payload: any): Promise<any> => {
        const properties: RequestInit = {
           //  credentials: 'include', // TODO (Use creds? Breaks the request thing)
            method: 'POST', 
            headers: new Headers(),
            body: JSON.stringify(payload)
        };
                
        return fetch(`${DomainStore.RESTURL}/login`, properties);
    }

    // Need Correct Typing for payload and response
    static registerRequest = (payload: any): Promise<any> => {
        const properties: RequestInit = {
            // credentials: 'include', 
            method: 'POST', 
            headers: new Headers(),
            body: JSON.stringify(payload)
        };

        return fetch(`${DomainStore.RESTURL}/register`, properties);
    }

    static getPrices = (): Promise<any> => {
        const properties: RequestInit = {
            // credentials: 'include', 
            method: 'GET', 
            headers: new Headers()
        };

        return fetch(`${DomainStore.RESTURL}/prices`, properties);
    }
}

export default DomainStore;