const initialState = [
  "bla",
  "blabla"
]

export default function testReducers(state = initialState, action) {
  if (action.type === "add") {
    return[
      ...state,
      action.payload
    ];
  }
  if (action.type === "FETCH_SUCCESS") {
    return action.payload;
  }
  return state;
}
