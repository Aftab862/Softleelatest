// ** Reducers Imports
import { combineReducers } from "redux";
import appReducer from "./reducers/app.reducer.js";
const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
