import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Root store={store} history={history} />
  , document.getElementById('root'));

serviceWorker.unregister();
