import moment from "moment"
import {
  SWITCH_MONTH,
  RESET_MONTH,
  SWITCH_TAB,
  TASKS_ON_DAY,
  NEW_EL,
  SET_EDIT,
  EDIT_FIELD
} from "../actions/monthAction"

const initialStateWeek = {
  selectMonth : moment().month(),
  daysInMonth : moment().daysInMonth(),
  firstMonthDate: moment().date(1).format("DD-MM-YYYY"),
  lastMonthDate: moment().date(moment().daysInMonth()).format("DD-MM-YYYY"),
  selectDay : moment().format("DD-MM-YYYY"),
  selectTabs : moment().date(),
  daysMonth: []
}
export function month(state = initialStateWeek, action) {
  switch (action.type) {
    case SWITCH_MONTH:
      return{
        ...state,
        ...action.payload
      };
    case RESET_MONTH:
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

export function monthTasksOnDay(state = [], action) {
  switch (action.type) {
    case TASKS_ON_DAY:
      return action.payload;
    default:
      return state
  }
}

export function monthForm (state = {}, action) {
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
