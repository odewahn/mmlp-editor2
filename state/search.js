import buildUrl from "build-url";
import "isomorphic-unfetch";

/*********************************************************************
||  Define the initial state
*********************************************************************/

export const INITIAL_STATE = {
  loggedIn: true,
  kalturaPartnerId: "1926081",
  kalturaUiConfId: "42930101",
  kalturaSession:
    "djJ8MTkyNjA4MXzSqcD0rx6y_DTaI28DqO7Hx1delpOzaT8yXHOtSpigu5YYQOTClfKSgMxgHp2MNmg92a7IgFdgfhrntgPIlBqANOKTQ1wxHxoaazk7hAEX0w==",
  results: [],
  selectedItem: {},
  spinner: false,
  segments: [],
  errorMessage: null,
  content: {}
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
export function setSearchField(key, val) {
  return { type: "setSearchField", key: key, val: val };
}

export function setSearchResults(val) {
  return dispatch => {
    dispatch(setSearchField("results", val));
  };
}

export function setSelectedItem(val) {
  return dispatch => {
    dispatch(setSearchField("selectedItem", val));
    console.log(val);
    dispatch(fetchSOLRContent(val.id));
  };
}

export function clearErrorMessage() {
  return dispatch => {
    dispatch(setSearchField("errorMessage", null));
  };
}

export function addSegment(val) {
  return (dispatch, getState) => {
    const x = getState().segments;
    x.push(val);
    dispatch(setSearchField("segments", x));
  };
}

export function segmentInSelectedSegments(s, segments) {
  var key = s.natural_key.join("-");
  var retVal = false;
  segments.map(segment => {
    if (key == segment.natural_key.join("-")) {
      retVal = true;
    }
  });
  return retVal;
}

// The Kaltura reference ID seems to just always be based on the natural key field
// It's all the fields joined with a "-", and the extension (.html) stripped out
// This is hacky but we'll see if it works
export function computeKalturaReferenceID(result) {
  var out = "";
  if (result["natural_key"]) {
    out = result["natural_key"].join("-").split(".")[0];
  }
  return out;
}

// This is a private wrapper function that handles the error scenarios
// for fetch so that you can properly handle errors
// If expects the 3 functions -- one to do the actual fetch, a success handler
// and a failure handler
export function fetchFromAPI(base, path, query, onSuccess, onFailure) {
  return (dispatch, getState) => {
    console.log(
      query,
      buildUrl(base, {
        path: path,
        queryParams: query
      })
    );
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

export function fetchSOLRWorks(query) {
  return (dispatch, getState) => {
    var q = {
      q: query,
      fl:
        "id,authors,publishers,description,minutes_required,natural_key,subjects,title,chapter_title,format",
      wt: "json",
      indent: "true",
      fq: 'format:("book" or "video")'
    };
    dispatch(setSearchField("spinner", true));
    dispatch(
      fetchFromAPI(
        "http://localhost:3000",
        "/search",
        q,
        json => {
          dispatch(setSearchField("spinner", false));
          dispatch(setSearchField("results", json["response"]["docs"]));
        },
        err => {
          dispatch(setSearchField("spinner", false));
          dispatch(setSearchField("errorMessage", err));
        }
      )
    );
  };
}

export function fetchSOLRContent(query) {
  return (dispatch, getState) => {
    var q = {
      q: "id:" + query,
      wt: "json",
      indent: "true"
    };
    dispatch(setSearchField("spinner", true));
    dispatch(
      fetchFromAPI(
        "http://localhost:3000",
        "/search",
        q,
        json => {
          dispatch(setSearchField("spinner", false));
          if (json["response"]["docs"].length > 0) {
            dispatch(setSearchField("content", json["response"]["docs"][0]));
          }
        },
        err => {
          dispatch(setSearchField("spinner", false));
          dispatch(setSearchField("errorMessage", err));
        }
      )
    );
  };
}
