import { combineReducers } from "redux";

import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
    admin: adminReducer
});

export default rootReducer;

// a application can have only one reducer therefor this
// root reducer will import all the other reducers 