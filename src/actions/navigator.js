import { constructUrl, parseUrl } from '../utils/RouteUtils';

export const CHANGE_PATH = 'CHANGE_PATH';
export function initNavigator() {
    return dispatch => {
        window.onpopstate = e => {
            dispatch(navigateBack(e));
        };

        if (window.location.hash !== '') {
            dispatch(navigateTo(parseUrl(window.location.hash)));
        }
    };
}

export function navigateTo(route, shouldPushState = true) {
  return (dispatch, getState) => {
    const { navigator } = getState();
    if (constructUrl(route) === constructUrl(navigator.route)) {
      return null;
    }

    if (shouldPushState) {
      pushState(route);
    }

    return dispatch(changePath(route));
  };
}

function pushState(route) {
  history.pushState({ route }, '', `#/${constructUrl(route)}`);
}
