import { SprintActionType } from "../Actions/sprint-action";
import AppState from "../State";

// set the app state as the initial state of the store
const reducer = (state = AppState, action) => {
  const type = action.type;
  let sprint;

  switch (type) {
    case SprintActionType.GET_SPRINT:
      return state.sprint;
    case SprintActionType.SET_SPRINT:
      sprint = state.sprint;
      break;
    default:
      sprint = state.sprint;
  }

  return Object.assign({}, state, { sprint });
};

export default reducer;
