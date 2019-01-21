import moment from "moment"

export const SWITCH_TAB = "SWITCH_TAB";
export const SWITCH_WEEK = "SWITCH_WEEK";
export const RESET_WEEK = "RESET_WEEK";

export const switchTabs = (tabId) => dispatch => {
  dispatch({ type: SWITCH_TAB, payload:tabId })
}

export const resetWeek = () => dispatch => {
  dispatch({ type: RESET_WEEK })
}

export const nextWeek = (weekDays) => dispatch => {
  const {selectFirst, selectLast} = weekDays;
  const firstWeekDate = moment(selectFirst, "DD-MM-YYYY").add(1, 'week').format("DD-MM-YYYY");
  const lastWeekDate = moment(selectLast, "DD-MM-YYYY").add(1, 'week').format("DD-MM-YYYY")
  const payload = {
    firstWeekDate,
    lastWeekDate,
    selectDay: (moment().isoWeek() === moment(firstWeekDate, "DD-MM-YYYY").isoWeek())
      ? moment().isoWeekday()
      : 1
  }

  dispatch({ type: SWITCH_WEEK, payload })
}

export const prevWeek = (weekDays) => dispatch => {
  const {selectFirst, selectLast} = weekDays;
  const firstWeekDate = moment(selectFirst, "DD-MM-YYYY").subtract(1, 'week').format("DD-MM-YYYY");
  const lastWeekDate = moment(selectLast, "DD-MM-YYYY").subtract(1, 'week').format("DD-MM-YYYY")
  const payload = {
    firstWeekDate,
    lastWeekDate,
    selectDay: (moment().isoWeek() === moment(firstWeekDate, "DD-MM-YYYY").isoWeek())
      ? moment().isoWeekday()
      : 1
  }

  dispatch({ type: SWITCH_WEEK, payload })
}
