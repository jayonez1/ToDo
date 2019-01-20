import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import WeekPage from './containers/WeekPage';
import SecondPage from './containers/SecondPage';

export default () => (
  <App>
    <div>
      <Switch>
        <Route path="/second" component={SecondPage} />
        <Route path="/" component={WeekPage} />
      </Switch>
    </div>
  </App>
);
