import moment from "moment";
import { getAllTasks } from '../fakeAPI';

export const SWITCH_TAB = "SWITCH_TAB";
export const SWITCH_WEEK = "SWITCH_WEEK";
export const RESET_WEEK = "RESET_WEEK";
export const TASKS_ON_DAY = "TASKS_ON_DAY_WEEK";

const searchTasks = (dateStart) => getAllTasks().filter( task =>
  task.dateStart === dateStart
)

export const switchTabs = (tabKey, firstWeekDate) => dispatch => {
  const selectDay = moment(firstWeekDate, "DD-MM-YYYY").isoWeekday(+tabKey).format("DD-MM-YYYY")
  const tasksOnDay = searchTasks(selectDay);
  dispatch({
    type: TASKS_ON_DAY,
    payload: tasksOnDay
  })
  dispatch({
    type: SWITCH_TAB,
    payload:{
      selectTabs: tabKey,
      selectDay
    }
  })
}

export const resetWeek = () => dispatch => {
  const selectDay = moment().format("DD-MM-YYYY");
  const selectTabs = moment().isoWeekday();
  const firstWeekDate = moment().isoWeekday(1).format("DD-MM-YYYY");
  const lastWeekDate =  moment().isoWeekday(7).format("DD-MM-YYYY");
  const tasksOnDay = searchTasks(selectDay);
  dispatch({
    type: TASKS_ON_DAY,
    payload: tasksOnDay
  })
  dispatch({
    type: RESET_WEEK,
    payload: {
      selectDay,
      selectTabs,
      firstWeekDate,
      lastWeekDate
    }
  })
}

export const nextWeek = (weekDays) => dispatch => {
  const {selectFirst, selectLast} = weekDays;
  const firstWeekDate = moment(selectFirst, "DD-MM-YYYY").add(1, 'week').format("DD-MM-YYYY");
  const lastWeekDate = moment(selectLast, "DD-MM-YYYY").add(1, 'week').format("DD-MM-YYYY");
  const selectTabs = (moment().isoWeek() === moment(firstWeekDate, "DD-MM-YYYY").isoWeek()) ? moment().isoWeekday() : 1;
  const selectDay = moment(firstWeekDate, "DD-MM-YYYY").isoWeekday(+selectTabs).format("DD-MM-YYYY");
  const tasksOnDay = searchTasks(selectDay);
  dispatch({
    type: TASKS_ON_DAY,
    payload: tasksOnDay
  })
  const payload = {
    firstWeekDate,
    lastWeekDate,
    selectTabs,
    selectDay
  }

  dispatch({ type: SWITCH_WEEK, payload })
}

export const prevWeek = (weekDays) => dispatch => {
  const {selectFirst, selectLast} = weekDays;
  const firstWeekDate = moment(selectFirst, "DD-MM-YYYY").subtract(1, 'week').format("DD-MM-YYYY");
  const lastWeekDate = moment(selectLast, "DD-MM-YYYY").subtract(1, 'week').format("DD-MM-YYYY");
  const selectTabs = (moment().isoWeek() === moment(firstWeekDate, "DD-MM-YYYY").isoWeek()) ? moment().isoWeekday() : 1;
  const selectDay = moment(firstWeekDate, "DD-MM-YYYY").isoWeekday(+selectTabs).format("DD-MM-YYYY");
  const tasksOnDay = searchTasks(selectDay);
  dispatch({
    type: TASKS_ON_DAY,
    payload: tasksOnDay
  })
  const payload = {
    firstWeekDate,
    lastWeekDate,
    selectTabs,
    selectDay
  }

  dispatch({ type: SWITCH_WEEK, payload })
}
