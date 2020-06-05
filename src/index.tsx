import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import * as serviceWorker from './serviceWorker';
import configureStore from 'store/configureStore';

import { version } from '../package.json';

import App from './ui/App';
import theme from 'ui/theme';

import './index.css';
import { Provider } from 'react-redux';

global.appVersion = version;

const store = configureStore();

function Root() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <App />
          </CssBaseline>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
