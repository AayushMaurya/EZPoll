import { combineReducers } from "redux";

import adminReducer from "./adminReducer";
import clientReducer from "./clientReducer"

const rootReducer = combineReducers({
    admin: adminReducer,
    client: clientReducer
});

export default rootReducer;

// a application can have only one reducer therefor this
// root reducer will import all the other reducers 