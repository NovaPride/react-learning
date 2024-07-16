import { createStore, combineReducers } from "redux";

import heroes from "../reducers/heroes";
import elements from "../reducers/elements";
import { configureStore } from "@reduxjs/toolkit";

const store = createStore(combineReducers({ heroes, elements }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



export default store;