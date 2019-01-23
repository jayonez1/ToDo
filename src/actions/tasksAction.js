import {
  DRIWER_FORM_OPEN
} from './drawerFormActions'

export const newTask = () => dispatch => {
  dispatch({ type: DRIWER_FORM_OPEN });
}

export const editTask = (id) => dispatch => {
  console.log(id);
  dispatch({ type: DRIWER_FORM_OPEN });
}
