import moment from "moment"
import {
  SWITCH_WEEK,
  RESET_WEEK,
  SWITCH_TAB,
  TASKS_ON_DAY,
  NEW_EL,
  SET_EDIT,
  EDIT_FIELD
} from "../actions/weekAction"

const initialStateWeek = {
  selectDay: moment().format("DD-MM-YYYY"),
  selectTabs: moment().isoWeekday(),
  firstWeekDate: moment().isoWeekday(1).format("DD-MM-YYYY"),
  lastWeekDate: moment().isoWeekday(7).format("DD-MM-YYYY")
}
export function week(state = initialStateWeek, action) {
  switch (action.type) {
    case SWITCH_WEEK:
      return{
        ...state,
        ...action.payload
      };
    case RESET_WEEK:
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

export function weekTasksOnDay(state = [], action) {
  switch (action.type) {
    case TASKS_ON_DAY:
      return action.payload;
    default:
      return state
  }
}

export function weekForm (state = {}, action) {
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
