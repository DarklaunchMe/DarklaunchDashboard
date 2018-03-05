/**
 * A Store for HTTP actions
 */
class DomainStore {
    static async getDarklaunches() {
        const response = await fetch('/api/darklaunch_bundle', { method: 'GET' });
        const json = await response.json();
        return json;
    }

    static async register(payload: object) {
        const response = await fetch('/api/register', { method: 'POST', body: JSON.stringify(payload) });
        const json = await response.json();
        return json;
    }

    static async signin(payload: object) {
        const response = await fetch('/api/register', { method: 'POST', body: JSON.stringify(payload) });
        const json = await response.json();
        return json;
    }

    static async addCode(payload: object) {
        const response = await fetch('/api/add_code', {
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
    }
}

export default DomainStore;
