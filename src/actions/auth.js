import Firebase from 'firebase';
import LocalStorageUtils from '../utils/LocalStorageUtils';

let config = {
    apiKey: __API_KEY__,
    authDomain: __AUTH_DOMAIN__,
    databaseURL: __DATABASE_URL__,
    storageBucket: __STORAGE_BUCKET__
}

const firebase = Firebase.initializeApp(config);
let provider = new Firebase.auth.GithubAuthProvider();

export const FIREBASE_LOGIN = 'FIREBASE_LOGIN';
export function loginUser() {
    return dispatch => {
        firebase.auth().signInWithPopup(provider).then((result) => {
            console.log('result: ', result);
            dispatch({type: FIREBASE_LOGIN, result})
        })
    }
}

export const FIREBASE_LOGOUT = 'FIREBASE_LOGOUT';
export function logoutUser() {
    return dispatch => {
        firebase.auth().signOut().then(function() {
            dispatch({type: FIREBASE_LOGOUT})
            console.log('signOut successful')
        }, function(error) {
            console.log('signOut error: ', error)

            // An error happened.
        });
    }
}

export const INIT_AUTH = 'INIT_AUTH';
export function initAuth() {
  return dispatch => {
    let user = JSON.parse(LocalStorageUtils.get('user'));
    if (user) {
      return dispatch({type: INIT_AUTH, user});
    }
    return null;
  };
}
