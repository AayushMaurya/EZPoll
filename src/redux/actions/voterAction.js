import setAuthToken from "../../utils/setAuthToken";

export const setVoter = (voterCridentials) => {
    return{
        type: "SET_VOTER",
        payload: voterCridentials
    }
}

export const voterLogout = () =>{
    localStorage.removeItem('voterJwtToken');
    setAuthToken(false);

    return{
        type: "VOTER_LOGOUT",
        payload: {}
    }
}