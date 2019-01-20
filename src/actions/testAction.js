var testApiData = [
  "bla NEW",
  "blabla NEW"
];

export const getSt = () => dispatch => {
  setTimeout(() => {
    dispatch({ type: "FETCH_SUCCESS", payload: testApiData })
  }, 2000)
}
