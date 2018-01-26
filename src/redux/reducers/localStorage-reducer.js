import localStorageActions from "redux/actions/localStorage-actions";

const initialState = {
  items: []
}

const LocalStorageReducer = (state = initialState, action) => {
  const {items} = state;
  const {type, payload} = action;
  switch (type) {
    case localStorageActions.ADD:
      return {
        ...state,
        items: [payload, ...items]
      };
    default:
      return state;
  }
};

export default LocalStorageReducer;
