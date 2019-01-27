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
export const SWITCH_MONTH = "SWITCH-MONTH";
export const RESET_MONTH = "RESET-MONTH";
export const TASKS_ON_DAY = "TASKS_ON_DAY-MONTH";
export const NEW_EL = "NEW_EL-MONTH";
export const SET_EDIT = "SET_EDIT-MONTH";
export const EDIT_FIELD = "EDIT_FIELD-MONTH";

const searchTasks = (dateStart) => getAllTasks().filter( task =>
  moment(task.dateTimeStart, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY") === dateStart
)
const createDaysMonth = (selectDay) => {
  const daysInMonth = moment(selectDay, "DD-MM-YYYY").daysInMonth();
  const days = [];
  for (var i = 1; i <= daysInMonth; i++){
    days.push(moment(selectDay, "DD-MM-YYYY").date(i).format("DD-MM-YYYY"))
  }
  return days
}

export const switchTabs = (tabKey, selectFirst) => dispatch => {
  const selectDay = moment(selectFirst, "DD-MM-YYYY").date(+tabKey).format("DD-MM-YYYY")
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

export const resetMonth = () => dispatch => {
  const daysInMonth = moment().daysInMonth();
  const selectDay = moment().format("DD-MM-YYYY");
  const selectTabs = moment().date();
  const firstMonthDate = moment().date(1).format("DD-MM-YYYY");
  const lastMonthDate = moment().date(daysInMonth).format("DD-MM-YYYY");
  const daysMonth = createDaysMonth(selectDay);
  const tasksOnDay = searchTasks(selectDay);
  dispatch({
    type: TASKS_ON_DAY,
    payload: tasksOnDay
  })
  dispatch({
    type: RESET_MONTH,
    payload: { daysInMonth, selectDay, selectTabs, daysMonth, firstMonthDate, lastMonthDate }
  })
}

export const nextMonth = (selectFirst) => dispatch => {
  const daysInMonth = moment(selectFirst, "DD-MM-YYYY").add(1, "month").daysInMonth();
  const firstMonthDate = moment(selectFirst, "DD-MM-YYYY").add(1, "month").date(1).format("DD-MM-YYYY");
  const lastMonthDate = moment(selectFirst, "DD-MM-YYYY").add(1, "month").date(daysInMonth).format("DD-MM-YYYY");
  const selectTabs = (
    moment().month() ===  moment(firstMonthDate, "DD-MM-YYYY").month()
    && moment().year() ===  moment(firstMonthDate, "DD-MM-YYYY").year()
  ) ? moment().date() : 1;
  const selectDay = moment(firstMonthDate, "DD-MM-YYYY").date(+selectTabs).format("DD-MM-YYYY");
  const daysMonth = createDaysMonth(selectDay);
  const tasksOnDay = searchTasks(selectDay);
  dispatch({
    type: TASKS_ON_DAY,
    payload: tasksOnDay
  })
  dispatch({
    type: RESET_MONTH,
    payload: { daysInMonth, selectDay, selectTabs, daysMonth, firstMonthDate, lastMonthDate }
  })
}

export const prevMonth = (selectFirst) => dispatch => {
  const daysInMonth = moment(selectFirst, "DD-MM-YYYY").subtract(1, "month").daysInMonth();
  const firstMonthDate = moment(selectFirst, "DD-MM-YYYY").subtract(1, "month").date(1).format("DD-MM-YYYY");
  const lastMonthDate = moment(selectFirst, "DD-MM-YYYY").subtract(1, "month").date(daysInMonth).format("DD-MM-YYYY");
  const selectTabs = (
    moment().month() ===  moment(firstMonthDate, "DD-MM-YYYY").month()
    && moment().year() ===  moment(firstMonthDate, "DD-MM-YYYY").year()
  ) ? moment().date() : 1;
  const selectDay = moment(firstMonthDate, "DD-MM-YYYY").date(+selectTabs).format("DD-MM-YYYY");
  const daysMonth = createDaysMonth(selectDay);
  const tasksOnDay = searchTasks(selectDay);
  dispatch({
    type: TASKS_ON_DAY,
    payload: tasksOnDay
  })
  dispatch({
    type: RESET_MONTH,
    payload: { daysInMonth, selectDay, selectTabs, daysMonth, firstMonthDate, lastMonthDate }
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
