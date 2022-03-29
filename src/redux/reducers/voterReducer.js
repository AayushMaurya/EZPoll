const initialState = {
    isAuthenticated: false,
    voter: {}
}

const voterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_VOTER":
            return {
                ...state,
                isAuthenticated: true,
                client: action.payload
            }
        case "VOTER_LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                voter: action.payload
            }
        default:
            return state;
    }
}

export default voterReducer;