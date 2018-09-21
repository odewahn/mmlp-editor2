import buildUrl from "build-url";
import "isomorphic-unfetch";

/*********************************************************************
||  Define the initial state
*********************************************************************/

export const INITIAL_STATE = {
  results: [],
  selectedItem: {},
  activeTab: 0,
  searchSpinner: false,
  sitb_results: [],
  segments: [],
  errorMessage: null,
  solr_results: {}
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

export function fetchSITB(query) {
  return (dispatch, getState) => {
    dispatch(setSearchField("searchSpinner", true));
    dispatch(
      fetchFromAPI(
        "https://falcon.sfo.safaribooks.com",
        "/api/v2/sitb/",
        query,
        json => {
          dispatch(setSearchField("searchSpinner", false));
          dispatch(setSITBResults(json));
        },
        err => {
          dispatch(setSearchField("searchSpinner", false));
          dispatch(setSearchField("errorMessage", err));
        }
      )
    );
  };
}

export function fetchWorks(query) {
  return (dispatch, getState) => {
    dispatch(setSearchField("searchSpinner", true));
    dispatch(
      fetchFromAPI(
        "https://falcon.sfo.safaribooks.com",
        "/api/v2/search/",
        query,
        json => {
          dispatch(setSearchField("searchSpinner", false));
          dispatch(setSearchResults(json));
        },
        err => {
          dispatch(setSearchField("searchSpinner", false));
          dispatch(setSearchField("errorMessage", err));
        }
      )
    );
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
      fq: "('video' OR 'book')"
    };
    dispatch(setSearchField("searchSpinner", true));
    dispatch(
      fetchFromAPI(
        "http://localhost:3000",
        "/test",
        q,
        json => {
          dispatch(setSearchField("searchSpinner", false));
          dispatch(setSearchField("solr_results", json));
          console.log(json);
        },
        err => {
          dispatch(setSearchField("searchSpinner", false));
          dispatch(setSearchField("errorMessage", err));
        }
      )
    );
  };
}
