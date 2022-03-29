import { combineReducers } from "redux";

import adminReducer from "./adminReducer";
import clientReducer from "./clientReducer";
import voterReducer from "./voterReducer";
import createVoteReducer from "./createVoterReducer";

const rootReducer = combineReducers({
    admin: adminReducer,
    client: clientReducer,
    voter: voterReducer,
    createVote: createVoteReducer
});

export default rootReducer;

// a application can have only one reducer therefor this
// root reducer will import all the other reducers 