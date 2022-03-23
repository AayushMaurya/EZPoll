import setAuthToken from "../../utils/setAuthToken";

export const setClient = (clientCridentials) => {
    return{
        type: "SET_CLIENT",
        payload: clientCridentials
    }
}

export const clientLogout = () => {
    // remove the token from local storage
    localStorage.removeItem('clientJwtToken');
    // remove default header
    setAuthToken(false);

    return {
        type: "CLIENT_LOGOUT",
        payload: {}
    }
}