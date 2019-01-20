import moment from "moment"
import {
  NEXT_WEEK,
  SWICH_TAB
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
    case NEXT_WEEK:
      return{
        ...state,
        ...action.payload
      };
    case SWICH_TAB:
      return{
        ...state,
        selectDay: action.payload,
      };
    default:
      return state
  }
}
