import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

// this will check the admin login data
export const checkAdminLoginData = async (loginInfo) => {
    try {
        const { data } = await axios.post("https://ezserver.herokuapp.com/api/admin/login", loginInfo);

        const { token } = data;

        localStorage.setItem('adminJwtToken', token);
        setAuthToken(token);
        
        return token;
    }
    catch (err) {
        setAuthToken(false);
        return false;
    }
}

export const addNewAdmin = async (signupInfo) => {
    try{
        const { data } = await axios.post("https://ezserver.herokuapp.com/api/admin/addAdmin", signupInfo);

        console.log(data);
        return data;
    }
    catch(err)
    {
        setAuthToken(false);
        return {success: false};
    }
}
