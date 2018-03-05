/**
 * An Observable UserStore used to render components.
 */
class UserStore {
    // TODO: CONSTRUCT THESE FROM THE SERVER
    isSignedIn: boolean = false;
    userInfo: any = {};
    getUser() {
        // Some day well do auth. Today is not that day.
        return 'testuser';
    }
}

export default new UserStore();
