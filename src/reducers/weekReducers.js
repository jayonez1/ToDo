import moment from "moment"
import {
  SWITCH_WEEK,
  RESET_WEEK,
  SWITCH_TAB
} from "../actions/weekAction"

const initialStateWeek = {
  selectDay: moment().isoWeekday(),
  todayNumWeek: moment().isoWeekday(),
  todayDateWeek: moment().format("DD-MM-YYYY"),
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
      return initialStateWeek;
    case SWITCH_TAB:
      return{
        ...state,
        selectDay: action.payload,
      };
    default:
      return state
  }
}