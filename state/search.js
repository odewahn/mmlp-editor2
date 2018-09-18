/*********************************************************************
||  Define the initial state
*********************************************************************/

export const INITIAL_STATE = {
  query: "",
  results: [],
  spinning: false,
  selectedItem: {},
  activeTab: 0
};

/*********************************************************************
||  Reducer
*********************************************************************/
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "setSearchField":
      return Object.assign({}, state, { [action.key]: action.val });
    default:
      return INITIAL_STATE;
  }
}

/*********************************************************************
||  Actions
*********************************************************************/
// Leave this unexported so that nothing can call it directly
// Leave this unexported so that nothing can call it directly
function setSearchField(key, val) {
  return { type: "setSearchField", key: key, val: val };
}

export function setQueryTerm(val) {
  return dispatch => {
    dispatch(setSearchField("query", val));
  };
}

export function setActiveTab(val) {
  return dispatch => {
    dispatch(setSearchField("activeTab", val));
  };
}
