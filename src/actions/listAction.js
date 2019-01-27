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

const searchTasks = (key) => {
  const tasks = []
  if (key === "today") tasks.push(...searchTasksToday());
  if (key === "tomorrow") tasks.push(...searchTasksTomorrow());
  if (key === "week") tasks.push(...searchTasksWeek());
  if (key === "month") tasks.push(...searchTasksMonth());
  if (key === "year") tasks.push(...searchTasksYear());
  return tasks
}
const searchTasksOneDay = (date) => getAllTasks().filter( task =>
  moment(task.dateTimeStart, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY") === date
)
const searchTasksToday = () => searchTasksOneDay(moment().format("DD-MM-YYYY"));
const searchTasksTomorrow = () => searchTasksOneDay(moment().add(1, 'day').format("DD-MM-YYYY"));
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
  const tasks = searchTasks(tabKey)
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
    payload: searchTasks("today")
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

export const sendCreate = (body, selectTabs) => dispatch => {
  try {
    postTask(body);
    dispatch({
      type: TASKS_ON_DAYS,
      payload: searchTasks(selectTabs)
    })
    dispatch({
      type: DRIWER_FORM_CLOSE
    });
    dispatch({
     type: NOTIFICATION_CREATE_OK,
   });
  } catch (e) {
    dispatch({
      type: TASKS_ON_DAYS,
      payload: []
    });
    dispatch({
     type: NOTIFICATION_ERROR,
     payload: e
   });
  }
}

export const sendEdit = (body, selectTabs) => dispatch => {
  try {
    putTask(body);
    dispatch({
      type: TASKS_ON_DAYS,
      payload: searchTasks(selectTabs)
    })
    dispatch({
     type: NOTIFICATION_EDIT_OK,
   });
  } catch (e) {
    dispatch({
      type: TASKS_ON_DAYS,
      payload: []
    });
    dispatch({
     type: NOTIFICATION_ERROR,
     payload: e
   });
  }
}

export const sendDelete = (id, selectTabs) => dispatch => {
  try {
    deleteTask(id);
    dispatch({
      type: TASKS_ON_DAYS,
      payload: searchTasks(selectTabs)
    })
    dispatch({
     type: NOTIFICATION_DELETE_OK,
   });
   dispatch({
     type: DRIWER_FORM_CLOSE
   });
  } catch (e) {
    dispatch({
      type: TASKS_ON_DAYS,
      payload: []
    });
    dispatch({
     type: NOTIFICATION_ERROR,
     payload: e
   });
  }
}
