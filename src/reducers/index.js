import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import * as weekReducers from "./weekReducers"

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    ...weekReducers
  })
}
