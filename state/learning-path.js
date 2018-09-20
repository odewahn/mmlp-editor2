import buildUrl from "build-url";
import fetch from "isomorphic-unfetch";

/*********************************************************************
||  Define the initial state
*********************************************************************/

export const INITIAL_STATE = {
  name: "Fuhggit about it",
  segments: []
};

/*********************************************************************
||  Reducer
*********************************************************************/
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "setLearningPathField":
      console.log(state);
    default:
      return INITIAL_STATE;
  }
}

/*********************************************************************
||  Actions
*********************************************************************/
// Leave this unexported so that nothing can call it directly
function setLearningPathField(key, val) {
  return { type: "setLearningPathField", key: key, val: val };
}

export function addSegment(val) {
  return (dispatch, getState) => {
    // Use the slice operator to make a deep copy of the array; otherwise
    // changing it directly introduces side effects that makes redux unhappy
    //const x = getState().LearningPath.segments.slice(0);
    //x.push(val);
    dispatch(setLearningPathField("segments", val));
    //console.log(getState());
  };
}
