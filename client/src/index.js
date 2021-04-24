import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// App
import App from './App';

// Router
import { BrowserRouter as Router } from 'react-router-dom';

// Redux
import store from './redux/store';
import { Provider } from 'react-redux';

// Language config
import { I18nextProvider } from 'react-i18next';
import i18n from './locale/i18n';

import * as serviceWorker from './serviceWorker';

const app = (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </I18nextProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
