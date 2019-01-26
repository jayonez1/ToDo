import moment from "moment"
import {
  SWITCH_WEEK,
  RESET_WEEK,
  SWITCH_TAB,
  TASKS_ON_DAY
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
