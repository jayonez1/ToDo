import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import testReducers from "./testReducers"

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    testReducers
  })
}
