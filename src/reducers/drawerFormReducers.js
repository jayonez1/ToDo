import {
  DRIWER_FORM_OPEN,
  DRIWER_FORM_CLOSE,
  NOTIFICATION_CREATE_OK,
  NOTIFICATION_EDIT_OK,
  NOTIFICATION_DELETE_OK,
  NOTIFICATION_ERROR,
  NOTIFICATION_RESET
} from "../actions/drawerFormActions"

export function driwerForm(state = false, action) {
  switch (action.type) {
    case DRIWER_FORM_OPEN:
      return true
    case DRIWER_FORM_CLOSE:
      return false
    default:
      return state;
  }
}

const initialStateNotification = {
  open: false,
  type:"info",
  message: null,
  description: null
}
export function formNotification(state = initialStateNotification, action) {
  switch (action.type) {
    case NOTIFICATION_RESET:
      return initialStateNotification
    case NOTIFICATION_CREATE_OK:
      return {
        ...initialStateNotification,
        open: true,
        type:"success",
        message: "Задача создана"
      }
    case NOTIFICATION_EDIT_OK:
      return {
        ...initialStateNotification,
        open: true,
        type:"success",
        message: "Задача изменена"
      }
    case NOTIFICATION_DELETE_OK:
      return {
        ...initialStateNotification,
        open: true,
        type:"success",
        message: "Задача удалена"
      }
    case NOTIFICATION_ERROR:
      return {
        open: true,
        type:"error",
        message: "ОШИБКА",
        description: `Текст ошибки: ${action.payload}`
      }
    default:
      return state;
  }
}
