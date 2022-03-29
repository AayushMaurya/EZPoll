import { combineReducers } from "redux";

import adminReducer from "./adminReducer";
import clientReducer from "./clientReducer";
import voterReducer from "./voterReducer";

const rootReducer = combineReducers({
    admin: adminReducer,
    client: clientReducer,
    voter: voterReducer
});

export default rootReducer;

// a application can have only one reducer therefor this
// root reducer will import all the other reducers 