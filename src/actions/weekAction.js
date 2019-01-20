import moment from "moment"

export const SWICH_TAB = "SWICH_TAB";
export const NEXT_WEEK = "NEXT_WEEK";

export const switchTabs = (tabId) => dispatch => {
  dispatch({ type: SWICH_TAB, payload:tabId })
}


// Пофиксить переход на след неделю !!!!

export const nextWeek = (weekDays) => dispatch => {
  const {first, last} = weekDays;

  const payload = {
    firstWeekDate: moment(first, "DD-MM-YYYY").add(1, 'week').format("DD-MM-YYYY"),
    lastWeekDate: moment(last, "DD-MM-YYYY").add(1, 'week').format("DD-MM-YYYY"),
    selectDay: (moment().isoWeek() === moment(first, "DD-MM-YYYY").isoWeek())
      ? moment().isoWeekday()
      : 6
  }

  dispatch({ type: NEXT_WEEK, payload })
}
