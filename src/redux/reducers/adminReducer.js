const initialState = {
    isAuthenticated: false,
    admin: {}
}

const adminReducer = (state = initialState, action)=> {
    switch(action.type) {
        case "SET_ADMIN":
            return{
                ...state,
                isAuthenticated: true,
                admin: action.payload
            }
        case "ADMIN_LOGOUT":
            return{
                ...state,
                isAuthenticated: false,
                admin: action.payload
            }
        default: 
            return state;
    }
}

export default adminReducer;