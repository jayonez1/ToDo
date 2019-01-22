import moment from "moment"

export const SWITCH_TAB = "SWITCH_TAB";
export const SWITCH_WEEK = "SWITCH_WEEK";
export const RESET_WEEK = "RESET_WEEK";

export const switchTabs = (tabKey, firstWeekDate) => dispatch => {
  dispatch({
    type: SWITCH_TAB,
    payload:{
      selectTabs: tabKey,
      selectDay: moment(firstWeekDate, "DD-MM-YYYY").isoWeekday(+tabKey).format("DD-MM-YYYY")
    }
  })
}

export const resetWeek = () => dispatch => {
  dispatch({ type: RESET_WEEK })
}

export const nextWeek = (weekDays) => dispatch => {
  const {selectFirst, selectLast} = weekDays;
  const firstWeekDate = moment(selectFirst, "DD-MM-YYYY").add(1, 'week').format("DD-MM-YYYY");
  const lastWeekDate = moment(selectLast, "DD-MM-YYYY").add(1, 'week').format("DD-MM-YYYY");
  const selectTabs = (moment().isoWeek() === moment(firstWeekDate, "DD-MM-YYYY").isoWeek())
    ? moment().isoWeekday()
    : 1
  const payload = {
    firstWeekDate,
    lastWeekDate,
    selectTabs,
    selectDay: moment(firstWeekDate, "DD-MM-YYYY").isoWeekday(+selectTabs).format("DD-MM-YYYY")
  }

  dispatch({ type: SWITCH_WEEK, payload })
}

export const prevWeek = (weekDays) => dispatch => {
  const {selectFirst, selectLast} = weekDays;
  const firstWeekDate = moment(selectFirst, "DD-MM-YYYY").subtract(1, 'week').format("DD-MM-YYYY");
  const lastWeekDate = moment(selectLast, "DD-MM-YYYY").subtract(1, 'week').format("DD-MM-YYYY");
  const selectTabs = (moment().isoWeek() === moment(firstWeekDate, "DD-MM-YYYY").isoWeek())
    ? moment().isoWeekday()
    : 1
  const payload = {
    firstWeekDate,
    lastWeekDate,
    selectTabs,
    selectDay: moment(firstWeekDate, "DD-MM-YYYY").isoWeekday(+selectTabs).format("DD-MM-YYYY")
  }

  dispatch({ type: SWITCH_WEEK, payload })
}
