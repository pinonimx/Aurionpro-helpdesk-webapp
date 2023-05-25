import { handleResponse } from '../_helpers';

const currentUserKey = 'currentUser';

export const authenticationService = {
    login,
    logout,
    getCurrentUser,
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`http://localhost:4000/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in session storage to keep user logged in between page refreshes
            sessionStorage.setItem(currentUserKey, JSON.stringify(user));
            return user;
        });
}

function logout() {
    // remove user from session storage to log user out
    sessionStorage.removeItem(currentUserKey);
}

function getCurrentUser() {
    const currentUser = sessionStorage.getItem(currentUserKey);
    return currentUser ? JSON.parse(currentUser) : null;
}
