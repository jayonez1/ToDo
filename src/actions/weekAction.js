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

export const SWITCH_TAB = "SWITCH-TAB";
export const SWITCH_WEEK = "SWITCH-WEEK";
export const RESET_WEEK = "RESET-WEEK";
export const TASKS_ON_DAY = "TASKS_ON_DAY-WEEK";
export const NEW_EL = "NEW_EL-WEEK";
export const SET_EDIT = "SET_EDIT-WEEK";
export const EDIT_FIELD = "EDIT_FIELD-WEEK";

const searchTasks = (dateStart) => getAllTasks().filter( task =>
  moment(task.dateTimeStart, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY") === dateStart
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
    payload: { selectDay, selectTabs, firstWeekDate, lastWeekDate }
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
  dispatch({
    type: SWITCH_WEEK,
    payload: { firstWeekDate, lastWeekDate, selectTabs, selectDay }
  })
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
  dispatch({
    type: SWITCH_WEEK,
    payload: { firstWeekDate, lastWeekDate, selectTabs, selectDay }
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

export const sendCreate = (body, selectDay) => dispatch => {
  try {
    postTask(body);
    dispatch({
      type: TASKS_ON_DAY,
      payload: searchTasks(selectDay)
    })
    dispatch({
      type: DRIWER_FORM_CLOSE
    });
    dispatch({
     type: NOTIFICATION_CREATE_OK,
   });
  } catch (e) {
    dispatch({
      type: TASKS_ON_DAY,
      payload: []
    });
    dispatch({
     type: NOTIFICATION_ERROR,
     payload: e
   });
  }
}

export const sendEdit = (body, selectDay) => dispatch => {
  try {
    putTask(body);
    dispatch({
      type: TASKS_ON_DAY,
      payload: searchTasks(selectDay)
    })
    dispatch({
     type: NOTIFICATION_EDIT_OK,
   });
  } catch (e) {
    dispatch({
      type: TASKS_ON_DAY,
      payload: []
    });
    dispatch({
     type: NOTIFICATION_ERROR,
     payload: e
   });
  }
}

export const sendDelete = (id, selectDay) => dispatch => {
  try {
    deleteTask(id);
    dispatch({
      type: TASKS_ON_DAY,
      payload: searchTasks(selectDay)
    })
    dispatch({
     type: NOTIFICATION_DELETE_OK,
   });
   dispatch({
     type: DRIWER_FORM_CLOSE
   });
  } catch (e) {
    dispatch({
      type: TASKS_ON_DAY,
      payload: []
    });
    dispatch({
     type: NOTIFICATION_ERROR,
     payload: e
   });
  }
}
