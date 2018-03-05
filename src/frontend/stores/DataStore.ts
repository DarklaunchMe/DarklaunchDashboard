/**
 * An Observable Datastore used to render components. holds all darklaunch codes, options, etc.
 */
class DataStore {
    // TODO: CONSTRUCT THESE FROM THE SERVER
    static darklaunchOptions = [
        { key: 'all', value: 'all', text: 'All Users' },
        { key: 'userID', value: 'uuid', text: 'User ID' }
    ];
}

// Support: UserID, Geolocation, Percentage Deploy, callback/defined boolean

export default DataStore;
