import { createStore } from "redux";

import rootReducer from "./Reducers/sprint-reducer";

// creates a new store with the reducer
const store = createStore(rootReducer);

export default store;
