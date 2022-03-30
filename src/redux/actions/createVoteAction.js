export const setPosition = (positionCridentials) => {
    return {
        type: "SET_POSITION",
        payload: positionCridentials
    }
}

export const setCandidate = (candidateCridentials) => {
    return {
        type: "SET_CANDIDATE",
        payload: candidateCridentials
    }
}

export const setstep = (step) => {
    return{
        type: "SET_STEP",
        payload: step
    }
}

export const cleanVote = () => {
    return {
        type: "CLEAN",
    }
}