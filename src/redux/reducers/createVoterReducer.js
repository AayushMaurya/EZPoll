const initialState = {
    isThere: false,
    position: {},
    candidate: [],
    step: 1
}

const createVoteReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_POSITION":
            return {
                ...state,
                isThere: true,
                position: action.payload
            }
        case "SET_CANDIDATE":
            return {
                ...state,
                isThere: true,
                candidate: action.payload
            }
        case "CLEAN":
            return {
                ...state,
                isThere: false,
                candidate: [],
                position: {}
            }
        case "SET_STEP":
            return{
                ...state,
                isThere: true,
                step: action.payload
            }
        default:
            return state;
    }
}

export default createVoteReducer;