/**
 * A Store for HTTP actions
 */
class DomainStore {
    static async getDarklaunches() {
        const response = await fetch('/api/darklaunch_bundle', { method: 'GET' });
        const json = await response.json();
        return json;
    }
}

export default DomainStore;
