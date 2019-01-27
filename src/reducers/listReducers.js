import {
  RESET_LIST,
  SWITCH_TAB,
  TASKS_ON_DAYS,
  NEW_EL,
  SET_EDIT,
  EDIT_FIELD
} from "../actions/listAction"

const initialStateList = {
  selectTabs : "today",
}
export function list(state = initialStateList, action) {
  switch (action.type) {
    case RESET_LIST:
      return action.payload;
    case SWITCH_TAB:
      return{
        ...state,
        ...action.payload
      };
    default:
      return state
  }
}

export function listTasksOnDays(state = [], action) {
  switch (action.type) {
    case TASKS_ON_DAYS:
      return action.payload;
    default:
      return state
  }
}

export function listForm (state = {}, action) {
  switch (action.type) {
    case NEW_EL:
      return {
        nameForm: "Создание",
        typeForm: "create",
      }
    case SET_EDIT:
      return {
        nameForm: "Редактирование",
        typeForm: "edit",
        ...action.payload
      }
    case EDIT_FIELD: {
      const newState = {...state}
      newState[action.payload.nameField] = action.payload.value
      if (action.payload.additionalNameField) { // Если есть еще одни параметр для обновления
        newState[action.payload.additionalNameField] = action.payload.additionalValue
      }
      return newState
    }
    default:
      return state;
  }
}
