import setAuthToken from "../../utils/setAuthToken";

// this action will set the datail of admin to store
export const setAdmin = (adminCridentials) => {
    return {
        type: "SET_ADMIN",
        payload: adminCridentials
    }
}

export const adminLogout = () => {
    // remove the token from local storage
    localStorage.removeItem('adminJwtToken');
    // remove default header
    setAuthToken(false);

    return {
        type: "ADMIN_LOGOUT",
        payload: {}
    }
}