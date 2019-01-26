export const NOTIFICATION_CREATE_OK = "NOTIFICATION_CREATE_OK"
export const NOTIFICATION_EDIT_OK = "NOTIFICATION_EDIT_OK"
export const NOTIFICATION_DELETE_OK = "NOTIFICATION_DELETE_OK"
export const NOTIFICATION_RESET = "NOTIFICATION_RESET"
export const NOTIFICATION_IMAGE_OK = "NOTIFICATION_IMAGE_OK"
export const NOTIFICATION_IMAGE_DELETE = "NOTIFICATION_IMAGE_DELETE"
export const NOTIFICATION_ERROR = "NOTIFICATION_ERROR"

export const DRIWER_FORM_OPEN = "DRIWER_FORM_OPEN"
export const DRIWER_FORM_CLOSE = "DRIWER_FORM_CLOSE"

export const openDriwerForm = () => dispatch => {
  dispatch({ type: DRIWER_FORM_OPEN })
}

export const closeDriwerForm = () => dispatch => {
  dispatch({ type: DRIWER_FORM_CLOSE })
}

// Всплывающие подсказки
export const notificationReset = () => dispatch => {
  dispatch({ type: NOTIFICATION_RESET })
}
