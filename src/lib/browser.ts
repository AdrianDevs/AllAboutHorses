import { createBrowserHistory } from 'history';

export const getUserAgent = () =>
  window.navigator ? window.navigator.userAgent : undefined;

export const browserHistory = createBrowserHistory();
