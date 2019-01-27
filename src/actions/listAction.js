import moment from "moment";
import { getAllTasks, postTask, putTask, deleteTask } from '../fakeAPI';
import {
  DRIWER_FORM_CLOSE,
  NOTIFICATION_CREATE_OK,
  NOTIFICATION_EDIT_OK,
  NOTIFICATION_DELETE_OK,
  NOTIFICATION_ERROR,
  DRIWER_FORM_OPEN
} from "./drawerFormActions"

export const SWITCH_TAB = "SWITCH_TAB-LIST";
export const RESET_LIST = "RESET-LIST";
export const TASKS_ON_DAYS = "TASKS_ON_DAYS-LIST";
export const NEW_EL = "NEW_EL-LIST";
export const SET_EDIT = "SET_EDIT-LIST";
export const EDIT_FIELD = "EDIT_FIELD-LIST";


const searchTasksOneDay = (date) => getAllTasks().filter( task =>
  moment(task.dateTimeStart, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY") === date
)

const searchTasksToday = () => searchTasksOneDay(moment().format("DD-MM-YYYY"));
const searchTasksTomorrow = () => searchTasksOneDay(moment().day(1).format("DD-MM-YYYY"));
const searchTasksWeek = () => {
  const week = [];
  for (var i = 1; i <= 7; i++) {
    week.push(...searchTasksOneDay(
      moment().isoWeekday(i).format("DD-MM-YYYY")
    ))
  }
  return week
}
const searchTasksMonth = () => {
  const month = [];
  for (var i = 1; i <= moment().daysInMonth(); i++) {
    month.push(...searchTasksOneDay(
      moment().date(i).format("DD-MM-YYYY")
    ))
  }
  return month
}
const searchTasksYear = () => {
  const year = [];
  for (var i = 1; i <= moment.duration({years: 1}).asDays(); i++) {
    year.push(...searchTasksOneDay(
      moment(`01-01-${moment().year()}`,"DD-MM-YYYY").date(i).format("DD-MM-YYYY")
    ))
  }
  return year
}


export const switchTabs = (tabKey) => dispatch => {
  const tasks = []
  if (tabKey === "today") tasks.push(...searchTasksToday());
  if (tabKey === "tomorrow") tasks.push(...searchTasksTomorrow());
  if (tabKey === "week") tasks.push(...searchTasksWeek());
  if (tabKey === "month") tasks.push(...searchTasksMonth());
  if (tabKey === "year") tasks.push(...searchTasksYear());
  dispatch({
    type: TASKS_ON_DAYS,
    payload: tasks
  })
  dispatch({
    type: SWITCH_TAB,
    payload:{
      selectTabs: tabKey,
    }
  })
}

export const resetList = () => dispatch => {
  dispatch({
    type: TASKS_ON_DAYS,
    payload: searchTasksToday()
  })
  dispatch({
    type: RESET_LIST,
    payload:{
      selectTabs: "today",
    }
  })
}

export const createTask = () => dispatch => {
  dispatch({ type: NEW_EL })
  dispatch({ type: DRIWER_FORM_OPEN })
}

export const editTask = (props) => dispatch => {
  const {id, editProps} = props;
  const payload = editProps.filter(prop => prop.id === id)[0];
  dispatch({ type: SET_EDIT, payload });
  dispatch({ type: DRIWER_FORM_OPEN });
}

export const onChangeForm = (changes) => dispatch => {
  dispatch({ type: EDIT_FIELD, payload: changes })
}
