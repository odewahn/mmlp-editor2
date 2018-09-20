import buildUrl from "build-url";
import fetch from "isomorphic-unfetch";

/*********************************************************************
||  Define the initial state
*********************************************************************/

export const INITIAL_STATE = {
  results: [],
  sitb_results: [],
  selectedItem: {},
  activeTab: 0,
  sitbSpinner: false
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
function setSearchField(key, val) {
  return { type: "setSearchField", key: key, val: val };
}

export function setSearchResults(val) {
  return dispatch => {
    dispatch(setSearchField("results", val));
  };
}

export function setSITBResults(val) {
  return dispatch => {
    dispatch(setSearchField("sitb_results", val));
  };
}
export function setSelectedItem(val) {
  return dispatch => {
    dispatch(setSearchField("selectedItem", val));
    dispatch(setSITBResults([]));
    dispatch(
      fetchSITB({
        identifier: val.isbn,
        query: "*"
      })
    );
  };
}

export function setActiveTab(val) {
  return dispatch => {
    dispatch(setSearchField("activeTab", val));
  };
}

export function fetchSITB(query) {
  return (dispatch, getState) => {
    dispatch(setSearchField("sitbSpinner", true));
    return fetch(
      buildUrl("https://falcon.sfo.safaribooks.com", {
        path: "/api/v2/sitb/",
        queryParams: query
      })
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(setSearchField("sitbSpinner", false));
        dispatch(setSITBResults(json));
      });
  };
}
