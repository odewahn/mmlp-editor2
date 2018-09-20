import buildUrl from "build-url";
import "isomorphic-unfetch";

/*********************************************************************
||  Define the initial state
*********************************************************************/

export const INITIAL_STATE = {
  results: [],
  sitb_results: [],
  selectedItem: {},
  activeTab: 0,
  sitbSpinner: false,
  segments: []
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

export function addSegment(val) {
  return (dispatch, getState) => {
    const x = getState().segments;
    x.push(val);
    dispatch(setSearchField("segments", x));
  };
}

// This is a private wrapper function that handles the error scenarios
// for fetch so that you can properly handle errors
// If expects the 3 functions -- one to do the actual fetch, a success handler
// and a failure handler

function fetchFromAPI(base, path, query, onSuccess, onFailure) {
  return (dispatch, getState) => {
    fetch(
      buildUrl(base, {
        path: path,
        queryParams: query
      })
    )
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then(data => {
        onSuccess(data);
      })
      .catch(err => {
        var msg;
        if (err.statusText) {
          msg =
            "An error code " +
            err.status +
            " (" +
            err.statusText +
            ") has occurred";
        } else {
          msg = "An error occurred: " + err;
        }
        onFailure(msg);
      });
  };
}

export function fetchSITB(query) {
  return (dispatch, getState) => {
    dispatch(setSearchField("sitbSpinner", true));
    dispatch(
      fetchFromAPI(
        "https://falcon.sfo.safaribooks.com",
        "/api/v2/sitb/",
        query,
        json => {
          dispatch(setSearchField("sitbSpinner", false));
          dispatch(setSITBResults(json));
          console.log("got results!", json);
        },
        msg => {
          dispatch(setSearchField("sitbSpinner", false));
          console.log("Oh no!", msg);
        }
      )
    );
  };
}

export function fetchWorks(query) {
  return (dispatch, getState) => {
    dispatch(setSearchField("sitbSpinner", true));
    dispatch(
      fetchFromAPI(
        "https://falcon.sfo.safaribooks.com",
        "/api/v2/search/",
        query,
        json => {
          dispatch(setSearchField("sitbSpinner", false));
          dispatch(setSearchResults(json));
        },
        err => {
          dispatch(setSearchField("sitbSpinner", false));
          console.log("Oh no!", err);
        }
      )
    );
  };
}
