import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import testReducers from "./testReducers"
import * as drawerFormReducers from "./drawerFormReducers"
import * as weekReducers from "./weekReducers"
import * as tasksReducers from "./tasksReducers"

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    ...weekReducers,
    ...tasksReducers,
    ...drawerFormReducers,
    testReducers
  })
}
