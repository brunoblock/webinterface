const ADD = "LOCALSTORAGE_ADD";

const ACTIONS = Object.freeze({
  // actions
  ADD,
  addAction: item => ({ type: ACTIONS.ADD, payload: item })
});

export default ACTIONS;
