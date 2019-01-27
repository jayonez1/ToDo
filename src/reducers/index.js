import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import * as listReducers from "./listReducers"
import * as weekReducers from "./weekReducers"
import * as monthReducers from "./monthReducers"
import * as drawerFormReducers from "./drawerFormReducers"

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    ...weekReducers,
    ...drawerFormReducers,
    ...monthReducers,
    ...listReducers
  })
}
