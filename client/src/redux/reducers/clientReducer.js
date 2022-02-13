const initialState = {
    isAuthenticated: false,
    client: {}
}

const clientReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case "SET_CLIENT":
            return{
                ...state,
                isAuthenticated: true,
                client: action.payload
            }
        case "CLIENT_LOGOUT":
            return{
                ...state,
                isAuthenticated: false,
                client: action.payload
            }
        default:
            return state;
    }
}

export default clientReducer;