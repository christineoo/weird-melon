import { FIREBASE_LOGIN, FIREBASE_LOGOUT, INIT_AUTH } from '../actions/auth';
import LocalStorageUtils from '../utils/LocalStorageUtils';

const initialState = {
  user: null,
  accessToken: null
};

export default function navigator(state = initialState, action) {
  switch (action.type) {
  case FIREBASE_LOGIN:
    const user = {
      uid: action.result.user.uid,
      email: action.result.user.email,
      displayName: action.result.user.displayName,
      photoURL: action.result.user.photoURL
    };
    LocalStorageUtils.set('user', JSON.stringify(user));
    return Object.assign({}, state, {
      user,
      accessToken: action.result.credential.accessToken
    });

  case FIREBASE_LOGOUT:
    LocalStorageUtils.remove('user');
    return Object.assign({}, initialState);

  case INIT_AUTH:
    return Object.assign({}, state, {
      user: action.user
    });

  default:
    return state;
  }
}
