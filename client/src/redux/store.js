import {createStore} from "redux";

import rootReducer from "./reducers/rootReducer";

const initialState = {};

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

// the store will hold the information in form of object
// based on the model defined in reducer