import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import "./index.css"
import 'antd/dist/antd.css';

const store = configureStore();

ReactDOM.render(
  <Root store={store} history={history} />
  , document.getElementById('root'));

serviceWorker.unregister();
